"""
Notification channel abstraction. Email-first, SMS-ready.
A channel sends a message to a recipient given email + phone; it picks what it needs.
"""
import logging
from typing import Protocol
from .email_sender import send_transactional_email

logger = logging.getLogger(__name__)


class NotificationChannel(Protocol):
    async def send(self, email: str, subject: str, html: str, phone: str, settings) -> bool: ...


class EmailChannel:
    async def send(self, email: str, subject: str, html: str, phone: str, settings) -> bool:
        if not email:
            return False
        return await send_transactional_email(email, subject, html, settings)


class SmsChannelStub:
    """Placeholder until Twilio creds exist. Logs and returns False; never raises."""
    async def send(self, email: str, subject: str, html: str, phone: str, settings) -> bool:
        logger.info("SMS stub: would text %s (SMS not yet enabled)", phone)
        return False


def get_channel(settings) -> NotificationChannel:
    return SmsChannelStub() if settings.SMS_ENABLED else EmailChannel()
