"""
Email Outreach Service

Sends cold outreach through Resend (preferred) or SendGrid. Every message gets:

* a plain-text part and a near-plain HTML part (no images, no styling tricks)
* a footer with the physical postal address and an unsubscribe link, which
  CAN-SPAM requires and which the composer cannot remove
* List-Unsubscribe + List-Unsubscribe-Post headers for one-click unsubscribe
  (RFC 8058), which Gmail and Yahoo expect from senders
"""
import asyncio
import logging
import re
from html import escape
from typing import List, Optional
from urllib.parse import quote

import httpx

from ..config import get_settings
from ..models.prospect import BusinessCategory
from .outreach_composer import compose_step
from .outreach_playbooks import PLAYBOOKS

logger = logging.getLogger(__name__)

MAX_ATTACHMENTS = 5
MAX_ATTACHMENT_BYTES = 7 * 1024 * 1024
_URL_RE = re.compile(r"(https?://[^\s<>\"']+)")


# ── Templates (read-only views used by the admin UI) ──────────────────

def _sample_prospect(category: BusinessCategory) -> dict:
    return {"id": "sample", "business_name": "{business_name}",
            "business_category": category.value, "contact_name": None}


def get_email_template(category: BusinessCategory) -> dict:
    """The opening email for a category, with placeholders left in."""
    composed = compose_step(_sample_prospect(category), 0)
    playbook = PLAYBOOKS.get(category, PLAYBOOKS[BusinessCategory.other])
    return {
        "id": composed["template_id"],
        "name": playbook.label,
        "category": category.value,
        "subject": composed["subject"],
        "body": composed["body"],
        "buyer": playbook.buyer,
    }


def get_all_templates() -> list:
    return [get_email_template(category) for category in PLAYBOOKS]


# ── Rendering ─────────────────────────────────────────────────────────

def unsubscribe_page_url(token: str) -> str:
    return f"{get_settings().PUBLIC_SITE_URL.rstrip('/')}/unsubscribe/?t={quote(token)}"


def unsubscribe_api_url(token: str) -> str:
    return f"{get_settings().PUBLIC_API_URL.rstrip('/')}/outreach/unsubscribe/{quote(token)}"


def footer_text(unsubscribe_token: Optional[str]) -> str:
    settings = get_settings()
    lines = [f"Pure Air California, {settings.OUTREACH_POSTAL_ADDRESS}"]
    if unsubscribe_token:
        lines.append("Not the right person, or not interested? Reply \"no thanks\" or "
                     f"unsubscribe: {unsubscribe_page_url(unsubscribe_token)}")
    else:
        lines.append("Not the right person, or not interested? Reply \"no thanks\" and "
                     "I won't write again.")
    return "\n".join(lines)


def to_plain_text(body: str) -> str:
    """Normalise a body that may contain legacy <br> markup to plain text."""
    text = re.sub(r"<br\s*/?>", "\n", body, flags=re.IGNORECASE)
    text = re.sub(r"<[^>]+>", "", text)
    return text.replace("\r\n", "\n").strip()


def render_html(text: str, footer: str) -> str:
    """Escape the text and turn bare URLs into links. Nothing else."""
    def linkify(chunk: str) -> str:
        parts = _URL_RE.split(chunk)
        return "".join(
            f'<a href="{escape(part, quote=True)}">{escape(part)}</a>' if index % 2
            else escape(part)
            for index, part in enumerate(parts)
        )

    body_html = linkify(text).replace("\n", "<br>")
    footer_html = linkify(footer).replace("\n", "<br>")
    return (
        '<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;'
        f'line-height:1.5;color:#111">{body_html}'
        f'<br><br><span style="font-size:12px;color:#777">{footer_html}</span></div>'
    )


def list_unsubscribe_headers(unsubscribe_token: Optional[str]) -> dict:
    settings = get_settings()
    mailto = f"<mailto:{settings.OUTREACH_REPLY_TO}?subject=unsubscribe>"
    if not unsubscribe_token:
        return {"List-Unsubscribe": mailto}
    return {
        "List-Unsubscribe": f"<{unsubscribe_api_url(unsubscribe_token)}>, {mailto}",
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    }


def _clean_header(value: str) -> str:
    """Subjects and names must never carry a line break into a mail header."""
    return re.sub(r"[\r\n]+", " ", value or "").strip()


# ── Sending ───────────────────────────────────────────────────────────

async def send_email(
    to_email: str,
    to_name: str,
    subject: str,
    body: str,
    *,
    unsubscribe_token: Optional[str] = None,
    attachments: Optional[List[dict]] = None,
    prospect_id: Optional[str] = None,
    template_id: Optional[str] = None,
) -> dict:
    """
    Send one outreach email. Returns {success, dry_run, message, provider_id}.

    With no provider configured this logs and reports a dry run, so the rest of
    the workflow can be exercised without sending anything.
    """
    settings = get_settings()
    subject = _clean_header(subject)
    text = to_plain_text(body)
    footer = footer_text(unsubscribe_token)
    message = {
        "to_email": to_email,
        "to_name": _clean_header(to_name or ""),
        "subject": subject,
        "text": f"{text}\n\n--\n{footer}",
        "html": render_html(text, footer),
        "headers": list_unsubscribe_headers(unsubscribe_token),
        "attachments": attachments or [],
        "prospect_id": prospect_id,
        "template_id": template_id,
    }

    if settings.RESEND_API_KEY:
        return await _send_resend(message, settings)
    if settings.SENDGRID_API_KEY:
        return await _send_sendgrid(message, settings)

    logger.warning("No email provider configured; dry run to %s: %s", to_email, subject)
    return {"success": True, "dry_run": True, "provider_id": None,
            "message": "Dry run: no email provider is configured, so nothing was sent."}


def _tag(value: Optional[str]) -> str:
    """Resend tag values allow only letters, digits, underscore and dash."""
    return re.sub(r"[^A-Za-z0-9_-]", "_", value or "none")[:256]


async def _send_resend(message: dict, settings) -> dict:
    import resend

    resend.api_key = settings.RESEND_API_KEY
    payload = {
        "from": f"{settings.OUTREACH_FROM_NAME} <{settings.OUTREACH_FROM_EMAIL}>",
        "to": [message["to_email"]],
        "subject": message["subject"],
        "html": message["html"],
        "text": message["text"],
        "reply_to": settings.OUTREACH_REPLY_TO,
        "headers": message["headers"],
        "tags": [
            {"name": "campaign", "value": "outreach"},
            {"name": "prospect_id", "value": _tag(message["prospect_id"])},
            {"name": "template", "value": _tag(message["template_id"])},
        ],
    }
    if message["attachments"]:
        payload["attachments"] = [
            {"filename": item["filename"], "content": item["content_base64"]}
            for item in message["attachments"]
        ]
    try:
        # The Resend SDK is synchronous; keep it off the event loop.
        result = await asyncio.to_thread(resend.Emails.send, payload)
        provider_id = result.get("id") if isinstance(result, dict) else getattr(result, "id", None)
        logger.info("Outreach email accepted by Resend (id=%s)", provider_id)
        return {"success": True, "dry_run": False, "provider_id": provider_id,
                "message": "Email sent."}
    except Exception as exc:
        logger.error("Resend send failed: %s", exc)
        return {"success": False, "dry_run": False, "provider_id": None,
                "message": "The email provider rejected the message. Check the server log."}


async def _send_sendgrid(message: dict, settings) -> dict:
    payload = {
        "personalizations": [{
            "to": [{"email": message["to_email"], "name": message["to_name"] or None}],
            "subject": message["subject"],
        }],
        "from": {"email": settings.OUTREACH_FROM_EMAIL, "name": settings.OUTREACH_FROM_NAME},
        "reply_to": {"email": settings.OUTREACH_REPLY_TO},
        "content": [
            {"type": "text/plain", "value": message["text"]},
            {"type": "text/html", "value": message["html"]},
        ],
        "headers": message["headers"],
        # Link rewriting swaps our domain for SendGrid's in every URL, which
        # hurts both trust and deliverability. Clicks are tracked first-party.
        "tracking_settings": {
            "click_tracking": {"enable": False, "enable_text": False},
            "open_tracking": {"enable": True},
        },
    }
    if not message["to_name"]:
        del payload["personalizations"][0]["to"][0]["name"]
    if message["attachments"]:
        payload["attachments"] = [
            {"content": item["content_base64"], "filename": item["filename"],
             "type": item.get("content_type") or "application/octet-stream"}
            for item in message["attachments"]
        ]
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(
                "https://api.sendgrid.com/v3/mail/send",
                headers={"Authorization": f"Bearer {settings.SENDGRID_API_KEY}",
                         "Content-Type": "application/json"},
                json=payload,
            )
        if response.status_code in (200, 201, 202):
            return {"success": True, "dry_run": False, "message": "Email sent.",
                    "provider_id": response.headers.get("x-message-id")}
        logger.error("SendGrid error %s: %s", response.status_code, response.text)
        return {"success": False, "dry_run": False, "provider_id": None,
                "message": "The email provider rejected the message. Check the server log."}
    except httpx.HTTPError as exc:
        logger.error("SendGrid send failed: %s", exc)
        return {"success": False, "dry_run": False, "provider_id": None,
                "message": "Could not reach the email provider. Try again shortly."}
