"""
Outreach Router (public)

The three things a prospect can do from an email, none of which need a login:
open the booking page, request the free inspection, or unsubscribe.

The only credential is the opaque token from the link. It identifies a
prospect record; it exposes nothing but the business name and city, and a wrong
token gets the same answer as no token.

Because anyone can call these, each one is bounded three ways: per client
address, per token, and by a global ceiling that holds even if the per-client
limit is evaded. No email is ever sent to an address supplied by the caller.
"""
import logging
import re
import time
import uuid
from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, BackgroundTasks, HTTPException, Request, status
from pydantic import BaseModel, ConfigDict, Field, field_validator

from ..database import (
    get_leads_collection, get_outreach_collection, get_prospects_collection,
)
from ..models.prospect import OutreachStatus
from ..services.lead_notifications import send_lead_notifications
from ..services.outreach_composer import extract_city
from ..services.outreach_sequence import mark_engaged, stop_sequence, suppress
from ..services.prospect_quality import clean_business_name, normalize_phone

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/outreach", tags=["Outreach (public)"])

TOKEN_RE = re.compile(r"^[A-Za-z0-9_-]{16,64}$")

# (max requests, window seconds) per client address. Unsubscribe is generous:
# mailbox providers send one-click requests for many people from shared
# addresses, and losing an unsubscribe is worse than serving a few extra.
_LIMITS = {"view": (60, 300), "book": (5, 600), "unsubscribe": (300, 600)}
# Ceilings across all clients, so rotating addresses cannot flood the owner.
_GLOBAL_LIMITS = {"book": (40, 3600)}
BOOKINGS_PER_TOKEN_PER_DAY = 3
MAX_TRACKED_CLIENTS = 5000

_hits: dict[str, list[float]] = {}


def _client_ip(request: Request) -> str:
    """
    The address our own proxy saw. Proxies append to X-Forwarded-For, so the
    last entry is the one the platform wrote; earlier entries are whatever the
    caller chose to send and cannot be trusted for rate limiting.
    """
    forwarded = request.headers.get("x-forwarded-for", "")
    if forwarded:
        return forwarded.split(",")[-1].strip()[:64]
    return request.client.host if request.client else "unknown"


def _allow(key: str, limit: int, window: int) -> bool:
    now = time.time()
    recent = [t for t in _hits.get(key, ()) if now - t < window]
    if len(recent) >= limit:
        _hits[key] = recent
        return False
    recent.append(now)
    if key not in _hits and len(_hits) >= MAX_TRACKED_CLIENTS:
        # Bound memory: drop idle entries, and start over if that is not enough.
        longest = max(w for _, w in list(_LIMITS.values()) + list(_GLOBAL_LIMITS.values()))
        for stale in [k for k, v in _hits.items() if not v or now - v[-1] > longest]:
            del _hits[stale]
        if len(_hits) >= MAX_TRACKED_CLIENTS:
            _hits.clear()
    _hits[key] = recent
    return True


def _rate_limit(request: Request, action: str) -> None:
    limit, window = _LIMITS[action]
    allowed = _allow(f"{action}:{_client_ip(request)}", limit, window)
    if allowed and action in _GLOBAL_LIMITS:
        allowed = _allow(f"{action}:*", *_GLOBAL_LIMITS[action])
    if not allowed:
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                            detail="Too many requests. Please call us instead.")


async def _find_by_token(token: Optional[str]) -> Optional[dict]:
    if not isinstance(token, str) or not TOKEN_RE.match(token):
        return None
    return await get_prospects_collection().find_one({"public_token": token})


# ── Booking page ──────────────────────────────────────────────────────

@router.get("/p/{token}", response_model=dict)
async def view_booking_page(token: str, request: Request):
    """
    Called when a prospect opens the booking link. Records the click and
    returns just enough to greet them by business name.
    """
    _rate_limit(request, "view")
    prospect = await _find_by_token(token)
    if not prospect:
        # Same shape as a hit, so a token cannot be probed for validity.
        return {"business_name": None, "city": None}
    await mark_engaged(prospect, OutreachStatus.link_clicked, "clicked_at")
    return {"business_name": clean_business_name(prospect.get("business_name") or "") or None,
            "city": extract_city(prospect.get("address"))}


TIME_WINDOWS = ("Weekday morning", "Weekday afternoon", "As soon as possible", "Call me to arrange")

# A booking is good news, but it must not erase an outcome a person recorded
# or reopen an address that opted out.
_KEEP_STATUS_ON_BOOKING = frozenset({
    OutreachStatus.converted.value, OutreachStatus.unsubscribed.value,
    OutreachStatus.bounced.value,
})


class BookingRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    token: Optional[str] = Field(None, max_length=64)
    name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=7, max_length=30)
    business_name: Optional[str] = Field(None, max_length=200)
    preferred_time: str = Field("Call me to arrange", max_length=40)
    notes: Optional[str] = Field(None, max_length=1000)
    # Honeypot: real visitors never see or fill this field. Named so that
    # browser autofill has no reason to populate it.
    hp: Optional[str] = Field(None, max_length=200)

    @field_validator("name", "business_name", "notes", "preferred_time")
    @classmethod
    def no_control_characters(cls, value):
        if value is not None and any(ord(c) < 32 and c not in "\n\t" for c in value):
            raise ValueError("Remove control characters")
        return value

    @field_validator("phone")
    @classmethod
    def dialable_phone(cls, value: str) -> str:
        if not normalize_phone(value):
            raise ValueError("Enter a 10-digit US phone number")
        return value

    @field_validator("preferred_time")
    @classmethod
    def known_window(cls, value: str) -> str:
        return value if value in TIME_WINDOWS else "Call me to arrange"


@router.post("/book", response_model=dict, status_code=status.HTTP_201_CREATED)
async def request_inspection(booking: BookingRequest, request: Request,
                             background_tasks: BackgroundTasks):
    """
    Record a free-inspection request as a lead and alert the owner.
    Accepted means "we have your request", not a confirmed appointment.
    """
    _rate_limit(request, "book")
    if booking.hp:
        # A bot filled the hidden field. Answer as if it worked; store nothing.
        return {"accepted": True}

    prospect = await _find_by_token(booking.token)
    leads = get_leads_collection()
    now = datetime.utcnow()

    if prospect:
        since = (now - timedelta(hours=24)).isoformat()
        recent = await leads.count_documents(
            {"prospect_id": prospect["id"], "created_at": {"$gte": since}})
        if recent >= BOOKINGS_PER_TOKEN_PER_DAY:
            # They are already in the queue; do not alert the owner again.
            return {"accepted": True}

    business = (prospect or {}).get("business_name") or booking.business_name or ""
    lead_id = str(uuid.uuid4())
    message_lines = [f"Free inspection request for {business or 'a business'}.",
                     f"Preferred time: {booking.preferred_time}."]
    if booking.notes:
        message_lines.append(f"Notes: {booking.notes}")
    message_lines.append("Came from an outreach email." if prospect
                         else "Submitted on the free-inspection page without an email link.")

    lead = {
        "id": lead_id,
        "name": booking.name,
        # Never an address typed into the form: the only address we will write
        # to is one we already hold for this prospect.
        "email": (prospect or {}).get("contact_email") or "",
        "phone": booking.phone,
        "message": "\n".join(message_lines),
        "service": "Free inspection (commercial outreach)",
        "property_type": "commercial",
        "address": (prospect or {}).get("address"),
        "preferred_date": booking.preferred_time,
        "source": "outreach",
        "status": "new",
        "company": business or None,
        "prospect_id": (prospect or {}).get("id"),
        "submission_id": lead_id,
        "created_at": now.isoformat(),
        "updated_at": now.isoformat(),
    }
    await leads.insert_one({**lead, "_id": f"outreach-booking:{lead_id}"})

    if prospect:
        keep = prospect.get("outreach_status") in _KEEP_STATUS_ON_BOOKING
        await stop_sequence(prospect["id"], None if keep else OutreachStatus.meeting_scheduled)
        await get_prospects_collection().update_one(
            {"id": prospect["id"]},
            {"$set": {"booked_at": now.isoformat(), "booking_lead_id": lead_id,
                      "booking_contact": {"name": booking.name, "phone": booking.phone}}},
        )

    # Alert the owner (and send the prospect's known address a receipt) after responding.
    background_tasks.add_task(send_lead_notifications, lead)
    return {"accepted": True}


# ── Unsubscribe ───────────────────────────────────────────────────────

@router.post("/unsubscribe/{token}", response_model=dict)
async def unsubscribe(token: str, request: Request):
    """
    One-click unsubscribe (RFC 8058). Mail providers POST here straight from
    the List-Unsubscribe header, and the unsubscribe page posts here too.
    Always answers the same way, whether or not the token matched.
    """
    _rate_limit(request, "unsubscribe")
    prospect = await _find_by_token(token)
    if prospect:
        # Suppress every address this prospect was actually written to, not
        # only the one currently on the record.
        addresses = {prospect.get("contact_email")}
        cursor = get_outreach_collection().find(
            {"prospect_id": prospect["id"]}, {"_id": 0, "to_email": 1})
        addresses.update(r.get("to_email") for r in await cursor.to_list(length=200))
        for address in filter(None, addresses):
            await suppress(address, "unsubscribed")
        await stop_sequence(prospect["id"], OutreachStatus.unsubscribed)
        await get_prospects_collection().update_one(
            {"id": prospect["id"]},
            {"$set": {"unsubscribed_at": datetime.utcnow().isoformat()}},
        )
        logger.info("Prospect %s unsubscribed", prospect["id"])
    return {"unsubscribed": True}
