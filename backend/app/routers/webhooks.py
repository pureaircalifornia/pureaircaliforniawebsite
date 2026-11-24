"""
Webhooks

Resend delivery events drive the open, bounce and complaint tracking for
outreach. Every request must carry a valid Svix signature: without that check
anyone could post fake events and mark prospects as bounced or unsubscribed.
"""
import base64
import binascii
import hashlib
import hmac
import json
import logging
import time
from typing import Optional

from fastapi import APIRouter, HTTPException, Request

from ..config import get_settings
from ..database import get_outreach_collection, get_prospects_collection
from ..models.prospect import OutreachStatus
from ..services.outreach_sequence import mark_engaged, stop_sequence, suppress, utcnow

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/webhooks", tags=["webhooks"])

# Reject signed messages older than this, so a captured request cannot be replayed.
SIGNATURE_TOLERANCE_SECONDS = 5 * 60
# Resend events are a few kilobytes. Anything larger is not one.
MAX_BODY_BYTES = 256 * 1024

EVENT_FIELDS = {
    "email.delivered": "delivered_at",
    "email.opened": "opened_at",
    "email.clicked": "clicked_at",
    "email.bounced": "bounced_at",
    "email.complained": "complained_at",
}


def verify_svix_signature(secret: str, msg_id: str, timestamp: str,
                          signature_header: str, body: bytes,
                          now: Optional[float] = None) -> bool:
    """Verify a Svix-signed webhook (the scheme Resend uses)."""
    try:
        sent_at = int(timestamp)
    except (TypeError, ValueError):
        return False
    if abs((now if now is not None else time.time()) - sent_at) > SIGNATURE_TOLERANCE_SECONDS:
        return False
    try:
        key = base64.b64decode(secret.split("_", 1)[1] if secret.startswith("whsec_") else secret)
    except (binascii.Error, IndexError, ValueError):
        return False
    signed = f"{msg_id}.{timestamp}.".encode("utf-8") + body
    expected = base64.b64encode(hmac.new(key, signed, hashlib.sha256).digest())
    # The header is a space-separated list of "v1,<signature>" entries. Compare
    # as bytes: comparing str raises on non-ASCII input instead of returning False.
    for candidate in (signature_header or "").split(" "):
        version, _, signature = candidate.partition(",")
        if version == "v1" and hmac.compare_digest(
                signature.encode("utf-8", "replace"), expected):
            return True
    return False


async def _read_body(request: Request) -> bytes:
    """Read the body, refusing anything oversized before it is buffered."""
    declared = request.headers.get("content-length", "")
    if declared.isdigit() and int(declared) > MAX_BODY_BYTES:
        raise HTTPException(status_code=413, detail="Payload too large")
    chunks, size = [], 0
    async for chunk in request.stream():
        size += len(chunk)
        if size > MAX_BODY_BYTES:
            raise HTTPException(status_code=413, detail="Payload too large")
        chunks.append(chunk)
    return b"".join(chunks)


async def _find_prospect(record: Optional[dict], data: dict) -> Optional[dict]:
    prospects = get_prospects_collection()
    if record:
        return await prospects.find_one({"id": record["prospect_id"]})
    tags = data.get("tags") or {}
    prospect_id = tags.get("prospect_id") if isinstance(tags, dict) else None
    if isinstance(prospect_id, str) and prospect_id and prospect_id != "none":
        return await prospects.find_one({"id": prospect_id})
    return None


@router.post("/resend")
async def resend_webhook(request: Request):
    """Record delivery, open, click, bounce and complaint events from Resend."""
    secret = get_settings().RESEND_WEBHOOK_SECRET
    if not secret:
        # Fail closed: an unsigned endpoint would let anyone forge events.
        raise HTTPException(status_code=503, detail="Webhook secret is not configured")

    body = await _read_body(request)
    if not verify_svix_signature(
            secret,
            request.headers.get("svix-id", ""),
            request.headers.get("svix-timestamp", ""),
            request.headers.get("svix-signature", ""),
            body):
        raise HTTPException(status_code=401, detail="Invalid signature")

    try:
        payload = json.loads(body)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid JSON payload")
    if not isinstance(payload, dict):
        raise HTTPException(status_code=400, detail="Invalid JSON payload")

    event_type = payload.get("type")
    data = payload.get("data") if isinstance(payload.get("data"), dict) else {}
    field = EVENT_FIELDS.get(event_type) if isinstance(event_type, str) else None
    if not field:
        return {"status": "ignored"}

    now = utcnow().isoformat()
    outreach = get_outreach_collection()
    email_id = data.get("email_id")
    # Only a string may reach a query; a nested object here would be read by
    # MongoDB as an operator.
    record = (await outreach.find_one({"provider_id": email_id})
              if isinstance(email_id, str) and email_id else None)
    if record and not record.get(field):
        await outreach.update_one({"provider_id": email_id}, {"$set": {field: now}})

    prospect = await _find_prospect(record, data)
    if not prospect:
        return {"status": "ok"}

    if event_type == "email.opened":
        await mark_engaged(prospect, OutreachStatus.email_opened, "opened_at")
    elif event_type == "email.clicked":
        await mark_engaged(prospect, OutreachStatus.link_clicked, "clicked_at")
    elif event_type == "email.bounced":
        bounce = data.get("bounce") if isinstance(data.get("bounce"), dict) else {}
        # A temporary bounce (full mailbox, greylisting) is not a dead address.
        if str(bounce.get("type", "Permanent")).lower() != "transient":
            await suppress(record["to_email"] if record else prospect.get("contact_email"), "bounced")
            await stop_sequence(prospect["id"], OutreachStatus.bounced)
            logger.info("Prospect %s bounced; suppressed", prospect["id"])
    elif event_type == "email.complained":
        await suppress(record["to_email"] if record else prospect.get("contact_email"), "complaint")
        await stop_sequence(prospect["id"], OutreachStatus.unsubscribed)
        logger.info("Prospect %s reported spam; suppressed", prospect["id"])

    return {"status": "ok"}
