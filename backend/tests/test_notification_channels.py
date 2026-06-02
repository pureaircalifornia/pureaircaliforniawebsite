import pytest
from app.services.notification_channels import get_channel, EmailChannel, SmsChannelStub
from app.config import get_settings


def test_factory_returns_email_when_sms_disabled():
    s = get_settings()
    object.__setattr__(s, "SMS_ENABLED", False)
    assert isinstance(get_channel(s), EmailChannel)


def test_factory_returns_sms_stub_when_enabled():
    s = get_settings()
    object.__setattr__(s, "SMS_ENABLED", True)
    assert isinstance(get_channel(s), SmsChannelStub)


@pytest.mark.asyncio
async def test_sms_stub_returns_false_and_does_not_raise():
    s = get_settings()
    ok = await SmsChannelStub().send("+13105551212", "subject", "<p>body</p>", "555", s)
    assert ok is False
