"""Best-effort receipt email and owner alert after a lead is persisted.

Security: all customer-controlled values (name, email, phone, service,
address, message) are html.escape()d before interpolation into HTML to
prevent XSS / HTML-injection in owner-facing emails.  The owner subject
line has CR/LF stripped to prevent email header injection.
"""
import logging
from html import escape
from uuid import UUID

from .email_sender import send_transactional_email
from ..config import get_settings

logger = logging.getLogger(__name__)


def _autoreply_html(name: str) -> str:
    first = escape((name or "there").split(" ")[0])
    return f"""
    <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#0f172a">
      <h2 style="color:#0A3D7C">Thanks, {first} — we've got your request!</h2>
      <p>We've received your request. Our team will review the details and contact
         you about next steps. To speak with us, call
         <a href="tel:2137924145">(213) 792-4145</a>.</p>
      <p style="color:#64748b;font-size:13px">This receipt does not confirm an appointment or final price.</p>
    </div>
    """


def _owner_html(lead: dict) -> str:
    rows = "".join(
        f"<tr><td style='padding:4px 10px;font-weight:bold'>{k}</td>"
        f"<td style='padding:4px 10px'>{escape(str(lead.get(v) or '—'))}</td></tr>"
        for k, v in [("Name", "name"), ("Phone", "phone"), ("Email", "email"),
                     ("Service", "service"), ("Address", "address"), ("Message", "message"),
                     ("Submission ID", "submission_id")]
    )
    phone = escape(str(lead.get("phone") or ""))
    dialable_phone = "".join(char for char in str(lead.get("phone") or "") if char in "+0123456789")
    # Strip any query-string (?subject=&bcc=...) before the mailto href so a crafted
    # email value can't pre-populate a BCC/subject in the owner's compose window.
    raw_email = str(lead.get("email") or "").split("?", 1)[0]
    email = escape(raw_email)
    return (f"<h3>New website request — review and follow up</h3><table>{rows}</table>"
            "<p>Accepted intake only. Confirm service area, scope, price and lead quality.</p>"
            f"<p><a href='tel:{dialable_phone}'>Call {phone}</a> · "
            f"<a href='mailto:{email}'>Email</a></p>")


async def send_lead_notifications(lead: dict) -> None:
    """Best-effort; never raises into the request path."""
    settings = get_settings()
    # Only lead notifications opt into Resend; other shared-sender callers
    # retain their existing SendGrid behavior.
    use_resend = bool(settings.RESEND_API_KEY)
    # Stable, purpose-specific keys contain no customer information. Resend's
    # provider deduplication lasts 24 hours; Mongo receipt deduplication persists.
    try:
        submission_id = str(UUID(str(lead.get("submission_id", ""))))
    except ValueError:
        submission_id = None
    if lead.get("email"):
        try:
            await send_transactional_email(
                lead["email"], "We received your request — Pure Air California",
                _autoreply_html(lead.get("name", "")), settings,
                idempotency_key=f"website-lead-receipt:{submission_id}" if submission_id else None,
                use_resend=use_resend)
        except Exception:
            logger.warning("Lead receipt notification failed; not retried")
    if settings.OWNER_NOTIFY_EMAIL:
        try:
            # Strip CR/LF from customer name to prevent subject-line header injection
            raw_name = (lead.get("name") or "Unknown").replace("\r", " ").replace("\n", " ")
            raw_service = (lead.get("service") or "").replace("\r", " ").replace("\n", " ")
            subject = f"New website request: {raw_name} ({raw_service})"
            await send_transactional_email(
                settings.OWNER_NOTIFY_EMAIL,
                subject,
                _owner_html(lead), settings,
                idempotency_key=f"website-lead-owner:{submission_id}" if submission_id else None,
                use_resend=use_resend)
        except Exception:
            logger.warning("Lead owner notification failed; not retried")
