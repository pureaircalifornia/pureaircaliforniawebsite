"""
Outreach Router (admin)
Preview, send and automate the email sequence; report what is working.
Shares the /lead-scanner prefix so existing admin URLs keep working.
"""
import base64
import binascii
import hmac
import logging
from collections import defaultdict
from typing import List, Optional

from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, Header, HTTPException, Query
from pydantic import BaseModel, EmailStr, Field, field_validator

from ..config import get_settings
from ..core.dependencies import get_current_user
from ..database import get_outreach_collection, get_prospects_collection
from ..models.prospect import (
    BusinessCategory, SEQUENCE_STOP_STATUSES, SUPPRESSED_STATUSES, SequenceStatus,
)
from ..services.email_outreach import (
    MAX_ATTACHMENT_BYTES, MAX_ATTACHMENTS, footer_text, get_all_templates,
    get_email_template,
)
from ..services.outreach_composer import (
    STEP_GAP_DAYS, STEP_NAMES, TOTAL_STEPS, call_script, compose_sequence, compose_step,
)
from ..services.outreach_sequence import (
    check_sendable, deliver_touch, emails_sent_last_24h, ensure_public_token,
    has_email_provider, recently_sent, run_due_touches, utcnow,
)

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/lead-scanner", tags=["Outreach"])


async def _get_prospect_or_404(prospect_id: str) -> dict:
    prospect = await get_prospects_collection().find_one({"id": prospect_id})
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found")
    return prospect


# ── Templates ─────────────────────────────────────────────────────────

@router.get("/templates", response_model=list)
async def list_templates(current_user: dict = Depends(get_current_user)):
    """The opening email for every business type."""
    return get_all_templates()


@router.get("/templates/{category}", response_model=dict)
async def get_template(category: BusinessCategory,
                       current_user: dict = Depends(get_current_user)):
    return get_email_template(category)


# ── Preview ───────────────────────────────────────────────────────────

class ComposeEmailRequest(BaseModel):
    prospect_id: str
    step: Optional[int] = Field(None, ge=0, lt=TOTAL_STEPS)


@router.post("/outreach/preview", response_model=dict)
async def preview_email(request: ComposeEmailRequest,
                        current_user: dict = Depends(get_current_user)):
    """Compose the next (or a chosen) touch for a prospect without sending it."""
    prospect = await ensure_public_token(await _get_prospect_or_404(request.prospect_id))
    step = request.step
    if step is None:
        step = min(int(prospect.get("sequence_step", 0)), TOTAL_STEPS - 1)
    composed = compose_step(prospect, step)
    to_email = prospect.get("contact_email")
    return {
        "prospect": {
            "id": prospect.get("id"),
            "business_name": prospect.get("business_name"),
            "contact_name": prospect.get("contact_name"),
            "contact_email": to_email,
        },
        **composed,
        "footer": footer_text(prospect.get("public_token")),
        "blocked_reason": await check_sendable(prospect, to_email) if to_email else
        "Add a contact email first.",
        "sequence": [
            {"step": item["step"], "step_name": item["step_name"], "subject": item["subject"]}
            for item in compose_sequence(prospect)
        ],
    }


@router.get("/outreach/call-script/{prospect_id}", response_model=dict)
async def get_call_script(prospect_id: str, current_user: dict = Depends(get_current_user)):
    """A phone script for this prospect, matched to their industry and role."""
    return call_script(await _get_prospect_or_404(prospect_id))


# ── Send ──────────────────────────────────────────────────────────────

class EmailAttachment(BaseModel):
    filename: str = Field(..., min_length=1, max_length=200)
    # 7 MB of file is about 9.4 MB of base64; refuse anything longer unparsed.
    content_base64: str = Field(..., max_length=10_000_000)
    content_type: Optional[str] = Field(None, max_length=120)

    @field_validator("filename")
    @classmethod
    def no_path_or_control_chars(cls, value: str) -> str:
        if any(char in value for char in "/\\\r\n\0"):
            raise ValueError("Attachment filename must not contain a path")
        return value


class SendEmailRequest(BaseModel):
    prospect_id: str
    to_email: EmailStr
    to_name: Optional[str] = Field(None, max_length=100)
    subject: str = Field(..., min_length=1, max_length=200)
    body: str = Field(..., min_length=1, max_length=10000)
    step: Optional[int] = Field(None, ge=0, lt=TOTAL_STEPS)
    template_id: Optional[str] = Field(None, max_length=80)
    variant: Optional[int] = Field(None, ge=0, le=20)
    # Schedule the remaining touches automatically after this one.
    continue_sequence: bool = True
    attachments: List[EmailAttachment] = Field(default_factory=list, max_length=MAX_ATTACHMENTS)

    @field_validator("subject", "body")
    @classmethod
    def not_blank(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("Must not be empty")
        return value.strip()


def _validated_attachments(attachments: List[EmailAttachment]) -> List[dict]:
    total = 0
    validated = []
    for attachment in attachments:
        try:
            total += len(base64.b64decode(attachment.content_base64, validate=True))
        except (binascii.Error, ValueError):
            raise HTTPException(status_code=422,
                                detail=f"{attachment.filename} is not valid base64.")
        validated.append(attachment.model_dump())
    if total > MAX_ATTACHMENT_BYTES:
        raise HTTPException(status_code=413, detail="Attachments exceed the 7 MB total limit.")
    return validated


@router.post("/outreach/send", response_model=dict)
async def send_outreach_email(request: SendEmailRequest,
                              current_user: dict = Depends(get_current_user)):
    """Send one reviewed email. Refuses suppressed, bounced or unverified addresses."""
    prospect = await _get_prospect_or_404(request.prospect_id)
    to_email = str(request.to_email).lower()

    blocked = await check_sendable(prospect, to_email)
    if blocked:
        code = 429 if "Daily limit" in blocked else 409
        raise HTTPException(status_code=code, detail=blocked)

    step = request.step
    if step is None:
        step = min(int(prospect.get("sequence_step") or 0), TOTAL_STEPS - 1)

    if await recently_sent(request.prospect_id, step):
        raise HTTPException(
            status_code=409,
            detail="This email was already sent to them a moment ago. Nothing was sent again.")

    logger.info("Outreach send: user=%s prospect=%s step=%s",
                current_user.get("email"), request.prospect_id, step)
    result, record = await deliver_touch(
        {**prospect, "contact_name": request.to_name or prospect.get("contact_name")},
        to_email=to_email, subject=request.subject, body=request.body, step=step,
        template_id=request.template_id, variant=request.variant,
        attachments=_validated_attachments(request.attachments),
        sent_by=current_user.get("email"), continue_sequence=request.continue_sequence,
    )
    return {
        "success": result["success"],
        "message": result["message"],
        "dry_run": result.get("dry_run", False),
        "outreach_record": record,
    }


# ── Sequence control ──────────────────────────────────────────────────

class ProspectIdsRequest(BaseModel):
    prospect_ids: List[str] = Field(..., min_length=1, max_length=200)


@router.post("/outreach/sequence/start", response_model=dict)
async def start_sequences(request: ProspectIdsRequest,
                          current_user: dict = Depends(get_current_user)):
    """
    Queue prospects for the automated sequence. The first email goes out on the
    next runner pass inside the send window; follow-ups are scheduled from there.
    Prospects without a safe address are reported back, not queued.
    """
    collection = get_prospects_collection()
    now = utcnow()
    queued, skipped = [], []
    cursor = collection.find({"id": {"$in": request.prospect_ids}})
    for prospect in await cursor.to_list(length=len(request.prospect_ids)):
        name = prospect.get("business_name")
        to_email = prospect.get("contact_email")
        step = int(prospect.get("sequence_step") or 0)
        if prospect.get("sequence_status") == SequenceStatus.active.value:
            skipped.append({"id": prospect["id"], "business_name": name,
                            "reason": "Already in the sequence."})
            continue
        if not to_email:
            skipped.append({"id": prospect["id"], "business_name": name,
                            "reason": "No contact email yet."})
            continue
        if prospect.get("outreach_status") in SEQUENCE_STOP_STATUSES:
            skipped.append({"id": prospect["id"], "business_name": name,
                            "reason": "Already replied, booked or opted out."})
            continue
        if step >= TOTAL_STEPS:
            skipped.append({"id": prospect["id"], "business_name": name,
                            "reason": "Sequence already finished."})
            continue
        blocked = await check_sendable(prospect, to_email)
        if blocked and "Daily limit" not in blocked:
            skipped.append({"id": prospect["id"], "business_name": name, "reason": blocked})
            continue
        await ensure_public_token(prospect)
        await collection.update_one(
            {"id": prospect["id"]},
            {"$set": {"sequence_status": SequenceStatus.active.value,
                      "sequence_step": step, "send_failures": 0,
                      "next_touch_at": _resume_at(prospect, step, now).isoformat(),
                      "updated_at": now.isoformat()}},
        )
        queued.append(prospect["id"])
    return {"queued": queued, "skipped": skipped}


def _resume_at(prospect: dict, step: int, now: datetime) -> datetime:
    """
    When a (re)started sequence should send next. A fresh prospect goes out in
    the next window; one that already received a touch waits out the normal
    gap from that email, so pausing and restarting never sends two days early.
    """
    last = prospect.get("last_contacted_at")
    if step == 0 or not last:
        return now
    try:
        due = datetime.fromisoformat(str(last)) + timedelta(days=STEP_GAP_DAYS[step])
    except ValueError:
        return now
    return max(now, due)


@router.post("/outreach/sequence/stop", response_model=dict)
async def stop_sequences(request: ProspectIdsRequest,
                         current_user: dict = Depends(get_current_user)):
    """Pause automated follow-ups for these prospects."""
    result = await get_prospects_collection().update_many(
        {"id": {"$in": request.prospect_ids},
         "sequence_status": SequenceStatus.active.value},
        {"$set": {"sequence_status": SequenceStatus.paused.value, "next_touch_at": None,
                  "updated_at": utcnow().isoformat()}},
    )
    return {"paused": result.modified_count}


# ── History & stats ───────────────────────────────────────────────────

@router.get("/outreach/history", response_model=List[dict])
async def get_outreach_history(
    prospect_id: Optional[str] = None,
    limit: int = Query(50, ge=1, le=200),
    current_user: dict = Depends(get_current_user),
):
    query = {"prospect_id": prospect_id} if prospect_id else {}
    cursor = get_outreach_collection().find(query, {"_id": 0}).sort("sent_at", -1).limit(limit)
    return await cursor.to_list(length=limit)


def _rate(part: int, whole: int) -> float:
    return round(100 * part / whole, 1) if whole else 0.0


REPLIED = {"replied", "interested", "not_interested", "meeting_scheduled", "converted"}
BOOKED = {"meeting_scheduled", "converted"}


@router.get("/outreach/stats", response_model=dict)
async def get_outreach_stats(current_user: dict = Depends(get_current_user)):
    """The funnel from email sent to inspection booked, overall and by segment."""
    settings = get_settings()
    prospects = await get_prospects_collection().find(
        {}, {"_id": 0, "id": 1, "business_category": 1, "outreach_status": 1,
             "emails_sent": 1, "opened_at": 1, "clicked_at": 1, "contact_email": 1,
             "sequence_status": 1}).to_list(length=5000)
    records = await get_outreach_collection().find(
        {"status": {"$ne": "failed"}, "dry_run": {"$ne": True}},
        {"_id": 0, "prospect_id": 1, "template_id": 1, "step": 1,
         "opened_at": 1, "clicked_at": 1}).to_list(length=20000)

    by_id = {p["id"]: p for p in prospects}

    def tally(group: List[dict]) -> dict:
        contacted = [p for p in group if p.get("emails_sent", 0) > 0]
        opened = sum(1 for p in contacted if p.get("opened_at"))
        clicked = sum(1 for p in contacted if p.get("clicked_at"))
        replied = sum(1 for p in contacted if p.get("outreach_status") in REPLIED)
        booked = sum(1 for p in contacted if p.get("outreach_status") in BOOKED)
        total = len(contacted)
        return {"contacted": total, "opened": opened, "clicked": clicked,
                "replied": replied, "booked": booked,
                "open_rate": _rate(opened, total), "click_rate": _rate(clicked, total),
                "reply_rate": _rate(replied, total), "booking_rate": _rate(booked, total)}

    categories = defaultdict(list)
    for prospect in prospects:
        categories[prospect.get("business_category", "other")].append(prospect)

    # Which opening email earns replies: group first-touch sends by template.
    templates = defaultdict(lambda: {"sent": 0, "opened": 0, "replied": 0, "booked": 0})
    for record in records:
        if record.get("step") != 0 or not record.get("template_id"):
            continue
        bucket = templates[record["template_id"]]
        bucket["sent"] += 1
        bucket["opened"] += 1 if record.get("opened_at") else 0
        status = by_id.get(record["prospect_id"], {}).get("outreach_status")
        bucket["replied"] += 1 if status in REPLIED else 0
        bucket["booked"] += 1 if status in BOOKED else 0

    sent_24h = await emails_sent_last_24h()
    return {
        "totals": {
            "prospects": len(prospects),
            "with_email": sum(1 for p in prospects if p.get("contact_email")),
            "in_sequence": sum(1 for p in prospects
                               if p.get("sequence_status") == SequenceStatus.active.value),
            "emails_sent": len(records),
            "suppressed": sum(1 for p in prospects
                              if p.get("outreach_status") in SUPPRESSED_STATUSES),
            **tally(prospects),
        },
        "by_category": sorted(
            ({"category": key, **tally(group)} for key, group in categories.items()),
            key=lambda row: row["contacted"], reverse=True),
        "by_template": sorted(
            ({"template_id": key, **value,
              "open_rate": _rate(value["opened"], value["sent"]),
              "reply_rate": _rate(value["replied"], value["sent"])}
             for key, value in templates.items()),
            key=lambda row: row["sent"], reverse=True),
        "sending": {
            "sent_last_24h": sent_24h,
            "daily_limit": settings.OUTREACH_DAILY_LIMIT,
            "remaining_today": max(0, settings.OUTREACH_DAILY_LIMIT - sent_24h),
            "steps": list(STEP_NAMES),
        },
        # What has to be configured for each part of the system to work.
        "readiness": {
            "email_provider": has_email_provider(),
            "open_tracking_webhook": bool(settings.RESEND_WEBHOOK_SECRET),
            "automation_secret": len(settings.CRON_SECRET or "") >= MIN_CRON_SECRET_LENGTH,
            "google_places": bool(settings.GOOGLE_PLACES_API_KEY),
            "owner_alerts": bool(settings.OWNER_NOTIFY_EMAIL),
        },
    }


# ── Automation ────────────────────────────────────────────────────────

MIN_CRON_SECRET_LENGTH = 24


@router.post("/outreach/run-drip", response_model=dict)
async def run_drip_campaign(x_cron_key: Optional[str] = Header(None)):
    """
    Send every sequence email that is due. Called by a scheduler every 15-30
    minutes. Authorised by a shared secret sent in the X-Cron-Key header; it is
    never accepted in the URL, where it would end up in access logs. There is
    no built-in default, so an unconfigured server refuses to run.
    """
    settings = get_settings()
    # Deliberately not ADMIN_SECRET: a scheduler URL is the wrong place for an
    # admin credential to travel.
    expected = settings.CRON_SECRET
    if not expected or len(expected) < MIN_CRON_SECRET_LENGTH:
        raise HTTPException(
            status_code=503,
            detail=f"Automation is not configured. Set CRON_SECRET to a random string "
                   f"of at least {MIN_CRON_SECRET_LENGTH} characters.")
    supplied = x_cron_key or ""
    if not hmac.compare_digest(supplied.encode("utf-8"), expected.encode("utf-8")):
        raise HTTPException(status_code=401, detail="Unauthorized")
    return await run_due_touches()
