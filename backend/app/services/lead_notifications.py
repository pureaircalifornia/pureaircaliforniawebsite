"""Speed-to-lead: instant auto-reply to the lead + instant owner alert.

Security: all customer-controlled values (name, email, phone, service,
address, message) are html.escape()d before interpolation into HTML to
prevent XSS / HTML-injection in owner-facing emails.  The owner subject
line has CR/LF stripped to prevent email header injection.
"""
import logging
from html import escape

from .email_sender import send_transactional_email
from ..config import get_settings

logger = logging.getLogger(__name__)


def _autoreply_html(name: str) -> str:
    first = escape((name or "there").split(" ")[0])
    return f"""
    <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#0f172a">
      <h2 style="color:#0A3D7C">Thanks, {first} — we've got your request!</h2>
      <p>A Pure Air California specialist will call you shortly (usually within
         15 minutes during business hours). Need us now? Call
         <a href="tel:2137924145">(213) 792-4145</a>.</p>
      <p style="color:#64748b;font-size:13px">NADCA Certified · Licensed &amp; Insured · 5-Star Rated</p>
    </div>
    """


def _owner_html(lead: dict) -> str:
    rows = "".join(
        f"<tr><td style='padding:4px 10px;font-weight:bold'>{k}</td>"
        f"<td style='padding:4px 10px'>{escape(str(lead.get(v) or '—'))}</td></tr>"
        for k, v in [("Name", "name"), ("Phone", "phone"), ("Email", "email"),
                     ("Service", "service"), ("Address", "address"), ("Message", "message")]
    )
    # Use raw (unescaped) phone/email only in the href/mailto attributes, not visible text.
    # The href values are controlled by us in the link text; phone is numeric-only in practice,
    # but we still escape just the display text portion above.
    phone = escape(str(lead.get("phone") or ""))
    # Strip any query-string (?subject=&bcc=...) before the mailto href so a crafted
    # email value can't pre-populate a BCC/subject in the owner's compose window.
    raw_email = str(lead.get("email") or "").split("?", 1)[0]
    email = escape(raw_email)
    return (f"<h3>&#128293; New website lead — call now</h3><table>{rows}</table>"
            f"<p><a href='tel:{phone}'>Call {phone}</a> · "
            f"<a href='mailto:{email}'>Email</a></p>")


async def send_lead_notifications(lead: dict) -> None:
    """Best-effort; never raises into the request path."""
    settings = get_settings()
    try:
        if lead.get("email"):
            await send_transactional_email(
                lead["email"], "We received your request — Pure Air California",
                _autoreply_html(lead.get("name", "")), settings)
        if settings.OWNER_NOTIFY_EMAIL:
            # Strip CR/LF from customer name to prevent subject-line header injection
            raw_name = (lead.get("name") or "Unknown").replace("\r", " ").replace("\n", " ")
            raw_service = (lead.get("service") or "").replace("\r", " ").replace("\n", " ")
            subject = f"\U0001f525 New lead: {raw_name} ({raw_service})"
            await send_transactional_email(
                settings.OWNER_NOTIFY_EMAIL,
                subject,
                _owner_html(lead), settings)
    except Exception:
        logger.exception("lead notification failed")
