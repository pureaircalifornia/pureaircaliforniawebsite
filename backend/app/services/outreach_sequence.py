"""
Outreach sequence engine.

One place decides whether an email may go out (`check_sendable`), sends it and
records it (`deliver_touch`), and works through due follow-ups
(`run_due_touches`). Manual sends and the automated runner share the same gate,
so neither can email a suppressed, bounced or unverified address.
"""
import asyncio
import logging
import random
import uuid
from datetime import datetime, timedelta
from typing import List, Optional, Tuple
from zoneinfo import ZoneInfo

from ..config import get_settings
from ..database import (
    get_outreach_collection, get_prospects_collection, get_suppressions_collection,
)
from ..models.prospect import (
    ENGAGEMENT_RANK, SEQUENCE_STOP_STATUSES, SUPPRESSED_STATUSES,
    OutreachStatus, SequenceStatus,
)
from .email_outreach import send_email
from .outreach_composer import STEP_GAP_DAYS, TOTAL_STEPS, compose_step
from .prospect_quality import SENDABLE_GRADES, grade_email

logger = logging.getLogger(__name__)

# Automated sends per runner invocation. The scheduler calls the runner every
# 15-30 minutes, so a small batch spreads the day's mail out instead of
# sending it in one burst, which is what a spam filter looks for.
BATCH_PER_RUN = 8
MAX_SEND_FAILURES = 3
# How long a runner holds a prospect it has picked up. If the process dies
# mid-send the prospect becomes due again after this, instead of being lost.
CLAIM_MINUTES = 30
# A second manual send of the same step inside this window is a double click.
DUPLICATE_SEND_MINUTES = 10

# A booking or a won job is the outcome that matters; a later bounce or
# unsubscribe still suppresses the address but does not erase it.
_WON_STATUSES = frozenset({OutreachStatus.meeting_scheduled.value,
                           OutreachStatus.converted.value})


def utcnow() -> datetime:
    return datetime.utcnow()


def has_email_provider() -> bool:
    settings = get_settings()
    return bool(settings.RESEND_API_KEY or settings.SENDGRID_API_KEY)


# ── Scheduling (pure) ─────────────────────────────────────────────────

def next_touch_at(step_just_sent: int, sent_at: datetime) -> Optional[datetime]:
    """When the touch after `step_just_sent` is due, or None if that was the last."""
    following = step_just_sent + 1
    if following >= TOTAL_STEPS:
        return None
    due = sent_at + timedelta(days=STEP_GAP_DAYS[following])
    # Never schedule onto a weekend; business inboxes are read on weekdays.
    while due.weekday() >= 5:
        due += timedelta(days=1)
    return due


def in_send_window(now_utc: datetime, timezone: str, start_hour: int, end_hour: int) -> bool:
    """True on a weekday between start_hour and end_hour, local time."""
    local = now_utc.replace(tzinfo=ZoneInfo("UTC")).astimezone(ZoneInfo(timezone))
    return local.weekday() < 5 and start_hour <= local.hour < end_hour


# ── Suppression ───────────────────────────────────────────────────────

async def is_suppressed(email: str) -> bool:
    record = await get_suppressions_collection().find_one({"email": email.strip().lower()})
    return record is not None


async def suppress(email: Optional[str], reason: str) -> None:
    """Record that an address must never be emailed again. Idempotent."""
    if not email:
        return
    await get_suppressions_collection().update_one(
        {"email": email.strip().lower()},
        {"$setOnInsert": {"email": email.strip().lower(), "reason": reason,
                          "created_at": utcnow().isoformat()}},
        upsert=True,
    )


async def stop_sequence(prospect_id: str, status: Optional[OutreachStatus] = None,
                        sequence_status: SequenceStatus = SequenceStatus.stopped) -> None:
    """End automated follow-ups, optionally recording why."""
    prospects = get_prospects_collection()
    update = {"sequence_status": sequence_status.value, "next_touch_at": None,
              "updated_at": utcnow().isoformat()}
    if status:
        current = await prospects.find_one({"id": prospect_id}, {"_id": 0, "outreach_status": 1})
        already_won = bool(current) and current.get("outreach_status") in _WON_STATUSES
        if not already_won or status.value in _WON_STATUSES:
            update["outreach_status"] = status.value
    await prospects.update_one({"id": prospect_id}, {"$set": update})


async def mark_engaged(prospect: dict, status: OutreachStatus, timestamp_field: str) -> None:
    """
    Record an open or a click. Moves the status up the engagement ladder only;
    a prospect a person has already marked replied, booked or not interested
    is never changed by a tracking event.
    """
    now = utcnow().isoformat()
    update = {"updated_at": now}
    if not prospect.get(timestamp_field):
        update[timestamp_field] = now
    current = ENGAGEMENT_RANK.get(prospect.get("outreach_status", "not_contacted"))
    if current is not None and current < ENGAGEMENT_RANK[status.value]:
        update["outreach_status"] = status.value
    await get_prospects_collection().update_one({"id": prospect["id"]}, {"$set": update})


async def ensure_public_token(prospect: dict) -> dict:
    """
    Give a prospect its link token if it has none, and return the prospect.

    Records saved before tokens existed have none; without one their emails
    would carry no unsubscribe link and their booking would not be recognised.
    """
    if prospect.get("public_token"):
        return prospect
    token = uuid.uuid4().hex
    await get_prospects_collection().update_one(
        {"id": prospect["id"]}, {"$set": {"public_token": token}})
    return {**prospect, "public_token": token}


# ── Send gate ─────────────────────────────────────────────────────────

async def emails_sent_last_24h() -> int:
    since = (utcnow() - timedelta(hours=24)).isoformat()
    return await get_outreach_collection().count_documents({
        "sent_at": {"$gte": since}, "status": {"$ne": "failed"}, "dry_run": {"$ne": True},
    })


def _is_confirmed(prospect: dict, address: str) -> bool:
    return bool(prospect.get("contact_email_confirmed")
                and (prospect.get("contact_email") or "").lower() == address)


def email_grade_for(prospect: dict, to_email: str) -> str:
    """
    Grade an address for sending.

    Only two things block a send: a malformed or dead mailbox, and an address
    that enrichment generated from a pattern and nobody has confirmed. An
    address a person typed in or explicitly confirmed is their call, even when
    it lives on a different domain from the property's website (a management
    company's address, for example).
    """
    address = to_email.strip().lower()
    source = ""
    for found in prospect.get("found_emails") or []:
        if isinstance(found, dict) and (found.get("email") or "").lower() == address:
            source = found.get("source", "")
            break
    return grade_email(address, None, "" if _is_confirmed(prospect, address) else source)


def _is_unverified_legacy(prospect: dict, to_email: str) -> bool:
    """
    True for a contact stored by the previous scanner and not checked since.
    That version saved a guessed address as the contact when it found nothing,
    and kept no record of which addresses were guesses.
    """
    address = to_email.strip().lower()
    if _is_confirmed(prospect, address) or prospect.get("enriched_at"):
        return False
    found = prospect.get("found_emails") or []
    return any(isinstance(entry, str) for entry in found) and (
        (prospect.get("contact_email") or "").lower() == address)


async def check_sendable(prospect: dict, to_email: str) -> Optional[str]:
    """Return a human-readable reason this email must not be sent, or None."""
    if prospect.get("outreach_status") in SUPPRESSED_STATUSES:
        return "This prospect opted out, bounced or said no. They will not be emailed again."
    if await is_suppressed(to_email):
        return "This address is on the do-not-contact list."
    if _is_unverified_legacy(prospect, to_email):
        return ("This contact was saved by the old scanner, which sometimes stored a "
                "guessed address. Use \"Look up contacts again\" or re-save the email to "
                "confirm it before sending.")
    grade = email_grade_for(prospect, to_email)
    if grade not in SENDABLE_GRADES:
        return ("This address is a guess or is not a real mailbox. Sending to it risks a "
                "bounce. Confirm the address on their website or by phone first.")
    limit = get_settings().OUTREACH_DAILY_LIMIT
    if await emails_sent_last_24h() >= limit:
        return f"Daily limit of {limit} outreach emails reached. Try again tomorrow."
    return None


async def recently_sent(prospect_id: str, step: int) -> bool:
    """True when this step went to this prospect in the last few minutes."""
    since = (utcnow() - timedelta(minutes=DUPLICATE_SEND_MINUTES)).isoformat()
    return await get_outreach_collection().count_documents({
        "prospect_id": prospect_id, "step": step, "status": "sent",
        "dry_run": {"$ne": True}, "sent_at": {"$gte": since},
    }) > 0


async def deliver_touch(
    prospect: dict,
    *,
    to_email: str,
    subject: str,
    body: str,
    step: int,
    template_id: Optional[str] = None,
    variant: Optional[int] = None,
    attachments: Optional[List[dict]] = None,
    automated: bool = False,
    sent_by: Optional[str] = None,
    continue_sequence: bool = True,
) -> Tuple[dict, dict]:
    """
    Send one email and record it. Returns (send_result, outreach_record).

    The caller must have passed `check_sendable` first.
    """
    prospect = await ensure_public_token(prospect)
    now = utcnow()
    result = await send_email(
        to_email=to_email,
        to_name=prospect.get("contact_name") or "",
        subject=subject,
        body=body,
        unsubscribe_token=prospect.get("public_token"),
        attachments=attachments,
        prospect_id=prospect.get("id"),
        template_id=template_id,
    )
    record = {
        "id": str(uuid.uuid4()),
        "prospect_id": prospect["id"],
        "to_email": to_email,
        "to_name": prospect.get("contact_name"),
        "subject": subject,
        "body": body,
        "sent_at": now.isoformat(),
        "status": "sent" if result["success"] else "failed",
        "dry_run": bool(result.get("dry_run")),
        "provider_id": result.get("provider_id"),
        "step": step,
        "template_id": template_id,
        "variant": variant,
        "business_category": prospect.get("business_category"),
        "automated": automated,
        "sent_by": sent_by,
        "attachment_names": [a["filename"] for a in attachments or []],
    }
    await get_outreach_collection().insert_one(dict(record))

    prospects = get_prospects_collection()
    if not result["success"]:
        failures = int(prospect.get("send_failures", 0)) + 1
        update = {"send_failures": failures, "updated_at": now.isoformat()}
        if automated:
            # Try again tomorrow, and give up after repeated failures.
            if failures >= MAX_SEND_FAILURES:
                update.update(sequence_status=SequenceStatus.stopped.value, next_touch_at=None)
            else:
                update["next_touch_at"] = (now + timedelta(days=1)).isoformat()
        await prospects.update_one({"id": prospect["id"]}, {"$set": update})
        return result, record

    if result.get("dry_run"):
        # Nothing reached the prospect, so nothing about them has changed.
        return result, record

    current_step = int(prospect.get("sequence_step") or 0)
    was_active = prospect.get("sequence_status") == SequenceStatus.active.value
    update = {
        "last_contacted_at": now.isoformat(),
        "updated_at": now.isoformat(),
        "send_failures": 0,
        # Re-sending an earlier touch must not rewind the sequence.
        "sequence_step": max(current_step, step + 1),
        "contact_email": prospect.get("contact_email") or to_email,
    }
    # A first email moves the prospect to "sent"; later touches must not pull
    # an "opened" or "clicked" prospect back down.
    if ENGAGEMENT_RANK.get(prospect.get("outreach_status", "not_contacted"), 99) < 1:
        update["outreach_status"] = OutreachStatus.email_sent.value

    if step + 1 > current_step:
        # This send moved the sequence forward, so the next touch is timed from
        # now. An already-running sequence keeps running even for a one-off send;
        # otherwise the old due date would fire the next email straight away.
        following = next_touch_at(step, now)
        if continue_sequence or was_active:
            if following:
                update.update(sequence_status=SequenceStatus.active.value,
                              next_touch_at=following.isoformat())
            else:
                update.update(sequence_status=SequenceStatus.completed.value, next_touch_at=None)
        else:
            update.update(sequence_status=SequenceStatus.paused.value, next_touch_at=None)

    await prospects.update_one({"id": prospect["id"]}, {"$set": update, "$inc": {"emails_sent": 1}})
    return result, record


# ── Automated runner ──────────────────────────────────────────────────

async def _claim(prospect: dict, now: datetime) -> bool:
    """
    Take ownership of a due prospect so that an overlapping run cannot send to
    it as well. Succeeds only if nobody else has moved its due time since we
    read it.
    """
    result = await get_prospects_collection().update_one(
        {"id": prospect["id"], "sequence_status": SequenceStatus.active.value,
         "next_touch_at": prospect.get("next_touch_at")},
        {"$set": {"next_touch_at": (now + timedelta(minutes=CLAIM_MINUTES)).isoformat()}},
    )
    return result.modified_count == 1


async def run_due_touches(now: Optional[datetime] = None, *, force_window: bool = False) -> dict:
    """Send every follow-up that is due. Safe to call as often as you like."""
    settings = get_settings()
    now = now or utcnow()
    summary = {"processed": 0, "sent": 0, "skipped": 0, "errors": 0, "stopped": 0}

    if not has_email_provider():
        # A dry run must not walk prospects through a sequence nobody received.
        return {**summary, "message": "No email provider is configured; nothing sent."}

    if not force_window and not in_send_window(
            now, settings.OUTREACH_TIMEZONE,
            settings.OUTREACH_WINDOW_START_HOUR, settings.OUTREACH_WINDOW_END_HOUR):
        return {**summary, "message": "Outside the weekday send window; nothing sent."}

    remaining = settings.OUTREACH_DAILY_LIMIT - await emails_sent_last_24h()
    if remaining <= 0:
        return {**summary, "message": "Daily limit reached; nothing sent."}

    prospects = get_prospects_collection()
    cursor = prospects.find({
        "sequence_status": SequenceStatus.active.value,
        "next_touch_at": {"$lte": now.isoformat()},
    }).sort("next_touch_at", 1).limit(min(BATCH_PER_RUN, remaining))
    due = await cursor.to_list(length=BATCH_PER_RUN)

    for index, prospect in enumerate(due):
        if not await _claim(prospect, now):
            summary["skipped"] += 1
            continue
        summary["processed"] += 1
        step = int(prospect.get("sequence_step") or 0)
        to_email = prospect.get("contact_email")

        if prospect.get("outreach_status") in SEQUENCE_STOP_STATUSES:
            await stop_sequence(prospect["id"])
            summary["stopped"] += 1
            continue
        if step >= TOTAL_STEPS:
            await stop_sequence(prospect["id"], sequence_status=SequenceStatus.completed)
            summary["stopped"] += 1
            continue
        if not to_email:
            await stop_sequence(prospect["id"])
            summary["stopped"] += 1
            continue

        blocked = await check_sendable(prospect, to_email)
        if blocked:
            if "Daily limit" in blocked:
                # Release the claim so the next run picks this prospect up.
                await prospects.update_one(
                    {"id": prospect["id"]},
                    {"$set": {"next_touch_at": prospect.get("next_touch_at")}})
                summary["skipped"] += 1
                break
            logger.info("Sequence stopped for %s: %s", prospect["id"], blocked)
            await stop_sequence(prospect["id"])
            summary["stopped"] += 1
            continue

        try:
            prospect = await ensure_public_token(prospect)
            composed = compose_step(prospect, step)
            result, _ = await deliver_touch(
                prospect, to_email=to_email, subject=composed["subject"],
                body=composed["body"], step=step, template_id=composed["template_id"],
                variant=composed["variant"], automated=True,
            )
        except Exception:
            # Push the prospect out a day and count the failure; otherwise a
            # record that always raises would be retried on every run and
            # crowd everyone else out of the batch.
            logger.exception("Automated touch failed for prospect %s", prospect.get("id"))
            failures = int(prospect.get("send_failures", 0)) + 1
            update = {"send_failures": failures,
                      "next_touch_at": (now + timedelta(days=1)).isoformat()}
            if failures >= MAX_SEND_FAILURES:
                update.update(sequence_status=SequenceStatus.stopped.value, next_touch_at=None)
            await prospects.update_one({"id": prospect["id"]}, {"$set": update})
            summary["errors"] += 1
            continue

        if result["success"]:
            summary["sent"] += 1
        else:
            summary["errors"] += 1
        if index < len(due) - 1:
            # A human does not send eight emails in the same second.
            await asyncio.sleep(random.uniform(1.0, 3.0))

    summary["message"] = f"Sent {summary['sent']} follow-up(s)."
    return summary
