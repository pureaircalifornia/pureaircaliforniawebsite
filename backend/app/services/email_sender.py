"""
Transactional email sender (SendGrid).
Shared by review-request and lead-notification flows. Best-effort: never raises.
"""
import logging
import httpx

logger = logging.getLogger(__name__)

SENDGRID_URL = "https://api.sendgrid.com/v3/mail/send"


async def send_transactional_email(to_email: str, subject: str, html: str, settings) -> bool:
    """Send a single transactional HTML email. Returns True on accepted (2xx)."""
    if not settings.SENDGRID_API_KEY:
        logger.warning("SENDGRID_API_KEY not set; skipping email to %s", to_email)
        return False
    payload = {
        "personalizations": [{"to": [{"email": to_email}]}],
        "from": {"email": settings.FROM_EMAIL, "name": "Pure Air California"},
        "subject": subject,
        "content": [{"type": "text/html", "value": html}],
    }
    headers = {
        "Authorization": f"Bearer {settings.SENDGRID_API_KEY}",
        "Content-Type": "application/json",
    }
    try:
        async with httpx.AsyncClient(timeout=15) as client:
            resp = await client.post(SENDGRID_URL, json=payload, headers=headers)
        if 200 <= resp.status_code < 300:
            return True
        logger.error("SendGrid error %s: %s", resp.status_code, getattr(resp, "text", ""))
        return False
    except Exception as e:  # best-effort
        logger.error("Email send failed to %s: %s", to_email, e)
        return False
