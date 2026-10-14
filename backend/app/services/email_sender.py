"""Best-effort transactional email, with one provider attempt per message.

Existing callers retain SendGrid. Lead notifications can explicitly choose
Resend. A timeout may follow acceptance, so never retry or switch providers.
"""
import logging
from typing import Optional

import httpx

logger = logging.getLogger(__name__)
RESEND_URL = "https://api.resend.com/emails"
SENDGRID_URL = "https://api.sendgrid.com/v3/mail/send"


async def send_transactional_email(
    to_email: str,
    subject: str,
    html: str,
    settings,
    *,
    idempotency_key: Optional[str] = None,
    use_resend: bool = False,
) -> bool:
    """Return whether provider acceptance was confirmed, not inbox delivery."""
    resend_key = getattr(settings, "RESEND_API_KEY", None)
    sendgrid_key = getattr(settings, "SENDGRID_API_KEY", None)
    if use_resend and resend_key:
        provider, url, api_key = "Resend", RESEND_URL, resend_key
        payload = {
            "from": f"Pure Air California <{settings.FROM_EMAIL}>",
            "to": [to_email],
            "subject": subject,
            "html": html,
        }
    elif not use_resend and sendgrid_key:
        provider, url, api_key = "SendGrid", SENDGRID_URL, sendgrid_key
        payload = {
            "personalizations": [{"to": [{"email": to_email}]}],
            "from": {"email": settings.FROM_EMAIL, "name": "Pure Air California"},
            "subject": subject,
            "content": [{"type": "text/html", "value": html}],
        }
    else:
        logger.warning("Transactional email skipped: no provider configured")
        return False

    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    if provider == "Resend" and idempotency_key:
        headers["Idempotency-Key"] = idempotency_key
    try:
        async with httpx.AsyncClient(timeout=15) as client:
            response = await client.post(url, json=payload, headers=headers)
        if not 200 <= response.status_code < 300:
            # Provider bodies and exception strings may echo customer data or credentials.
            logger.warning("%s acceptance not confirmed (HTTP %s); not retried", provider, response.status_code)
            return False
        if provider == "Resend":
            result = response.json()
            if not isinstance(result, dict) or not isinstance(result.get("id"), str) or not result["id"]:
                logger.warning("Resend acceptance not confirmed (invalid receipt); not retried")
                return False
        return True
    except Exception:
        logger.warning("%s acceptance not confirmed (transport or response error); not retried", provider)
        return False
