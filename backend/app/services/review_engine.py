"""
Review generation engine. Fired when a job completes: creates a tokenized
review request and sends it (email now, SMS-ready). Routes ratings:
>=4 -> Google review; <4 -> private feedback + owner alert.
Compliant: every customer is asked and always sees the Google option.
"""
import logging
import secrets
from datetime import datetime

from ..config import get_settings
from ..database import get_review_requests_collection
from .notification_channels import get_channel
from .email_sender import send_transactional_email

logger = logging.getLogger(__name__)

HIGH_RATING_THRESHOLD = 4


def _full_name(customer: dict) -> str:
    name = f"{customer.get('first_name','')} {customer.get('last_name','')}".strip()
    return name or customer.get("name") or "there"


def _review_email_html(name: str, feedback_url: str) -> str:
    return f"""
    <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#0f172a">
      <h2 style="color:#0A3D7C">Thanks for choosing Pure Air California, {name}!</h2>
      <p>We hope you're breathing easier. Your feedback means the world to our small team —
         it takes 15 seconds and helps your neighbors find us.</p>
      <p style="text-align:center;margin:28px 0">
        <a href="{feedback_url}" style="background:#0A3D7C;color:#fff;padding:14px 28px;
           border-radius:10px;text-decoration:none;font-weight:bold;font-size:16px">
           Rate your experience
        </a>
      </p>
      <p style="color:#64748b;font-size:13px">Pure Air California · NADCA Certified · (213) 792-4145</p>
    </div>
    """


async def create_and_send(appointment: dict, customer: dict):
    """Idempotently create + send one review request for a completed appointment.
    Returns the stored doc dict, or None if one already exists / no email.
    Best-effort: logs and returns None on failure (never raises)."""
    try:
        col = get_review_requests_collection()
        appt_id = appointment.get("_id") or appointment.get("id")
        existing = await col.find_one({"appointment_id": appt_id})
        if existing:
            return None
        email = customer.get("email")
        if not email:
            logger.info("No email for customer %s; skipping review request", customer.get("_id"))
            return None

        settings = get_settings()
        token = secrets.token_urlsafe(24)
        name = _full_name(customer)
        doc = {
            "id": secrets.token_urlsafe(12),
            "customer_id": customer.get("_id") or appointment.get("customer_id"),
            "appointment_id": appt_id,
            "customer_name": name,
            "customer_email": email,
            "customer_phone": customer.get("phone", ""),
            "token": token,
            "channel": "email",
            "status": "pending",
            "rating": None,
            "private_feedback": None,
            "created_at": datetime.utcnow().isoformat(),
            "sent_at": None,
            "clicked_at": None,
            "responded_at": None,
        }
        await col.insert_one(dict(doc))

        feedback_url = f"{settings.PUBLIC_SITE_URL}/feedback/{token}"
        channel = get_channel(settings)
        ok = await channel.send(email, "How did we do?", _review_email_html(name, feedback_url),
                                customer.get("phone", ""), settings)
        doc["status"] = "sent" if ok else "pending"
        doc["sent_at"] = datetime.utcnow().isoformat() if ok else None
        await col.update_one({"token": token},
                             {"$set": {"status": doc["status"], "sent_at": doc["sent_at"]}})
        return doc
    except Exception as e:
        logger.error("create_and_send failed: %s", e)
        return None


async def mark_clicked(token: str) -> dict | None:
    col = get_review_requests_collection()
    req = await col.find_one({"token": token})
    if not req:
        return None
    if req.get("status") in ("sent", "pending"):
        await col.update_one({"token": token},
                             {"$set": {"status": "clicked",
                                       "clicked_at": datetime.utcnow().isoformat()}})
    req.pop("_id", None)
    return req


async def record_feedback(token: str, rating: int, private_feedback: str | None) -> dict | None:
    col = get_review_requests_collection()
    req = await col.find_one({"token": token})
    if not req:
        return None
    settings = get_settings()
    high = rating >= HIGH_RATING_THRESHOLD
    new_status = "reviewed" if high else "feedback_submitted"
    await col.update_one({"token": token}, {"$set": {
        "rating": rating,
        "private_feedback": private_feedback,
        "status": new_status,
        "responded_at": datetime.utcnow().isoformat(),
    }})
    if high:
        return {"route": "google", "google_review_url": settings.GOOGLE_REVIEW_URL or ""}
    await _notify_owner_of_feedback(req, rating, private_feedback, settings)
    return {"route": "private"}


async def _notify_owner_of_feedback(req: dict, rating: int, feedback: str | None, settings) -> None:
    if not settings.OWNER_NOTIFY_EMAIL:
        return
    html = (f"<h3>&#9888;&#65039; {rating}-star private feedback</h3>"
            f"<p><b>Customer:</b> {req.get('customer_name')} ({req.get('customer_email')})</p>"
            f"<p><b>Feedback:</b> {feedback or '(none provided)'}</p>"
            f"<p>Reach out to recover this customer before they post publicly.</p>")
    await send_transactional_email(settings.OWNER_NOTIFY_EMAIL,
                                   f"Service recovery: {rating}star from {req.get('customer_name')}",
                                   html, settings)


async def get_stats() -> dict:
    col = get_review_requests_collection()
    async def c(q): return await col.count_documents(q)
    total = await c({})
    return {
        "total_requests": total,
        "sent": await c({"status": {"$in": ["sent", "clicked", "feedback_submitted", "reviewed"]}}),
        "clicked": await c({"status": {"$in": ["clicked", "feedback_submitted", "reviewed"]}}),
        "reviewed": await c({"status": "reviewed"}),
        "private_feedback": await c({"status": "feedback_submitted"}),
    }
