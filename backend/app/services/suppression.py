"""
Email suppression + unsubscribe tokens.

Deliverability + CAN-SPAM compliance: every recipient who unsubscribes (or whose
address hard-bounces) is recorded in the `email_suppressions` collection and must
never be emailed again. Unsubscribe links are signed with an HMAC of the address
so the public endpoint can't be abused to suppress arbitrary inboxes.
"""
import hashlib
import hmac
import logging
from datetime import datetime
from typing import Optional
from urllib.parse import quote

from ..config import get_settings
from ..database import get_suppressions_collection

logger = logging.getLogger(__name__)


def _normalize(email: str) -> str:
    return (email or "").strip().lower()


def make_unsubscribe_token(email: str) -> str:
    """Deterministic HMAC-SHA256 token tying an unsubscribe link to one address."""
    settings = get_settings()
    secret = (settings.JWT_SECRET_KEY or "pac-unsub").encode("utf-8")
    return hmac.new(secret, _normalize(email).encode("utf-8"), hashlib.sha256).hexdigest()


def verify_unsubscribe_token(email: str, token: str) -> bool:
    """Constant-time comparison so the public endpoint can't be brute-forced."""
    return hmac.compare_digest(make_unsubscribe_token(email), token or "")


def build_unsubscribe_url(email: str) -> Optional[str]:
    """Full one-click unsubscribe URL, or None if no public API URL is configured."""
    settings = get_settings()
    base = getattr(settings, "API_PUBLIC_URL", None)
    if not base:
        return None
    token = make_unsubscribe_token(email)
    return f"{base.rstrip('/')}/api/unsubscribe?email={quote(_normalize(email))}&token={token}"


async def is_suppressed(email: str) -> bool:
    """True if this address has unsubscribed or hard-bounced."""
    normalized = _normalize(email)
    if not normalized:
        return False
    doc = await get_suppressions_collection().find_one({"email": normalized})
    return doc is not None


async def add_suppression(email: str, reason: str = "unsubscribe") -> None:
    """Idempotently add an address to the suppression list."""
    normalized = _normalize(email)
    if not normalized:
        return
    await get_suppressions_collection().update_one(
        {"email": normalized},
        {"$set": {"email": normalized, "reason": reason, "created_at": datetime.utcnow().isoformat()}},
        upsert=True,
    )
    logger.info("Suppressed %s (reason=%s)", normalized, reason)
