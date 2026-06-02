import pytest
from unittest.mock import AsyncMock, patch
from app.services.email_sender import send_transactional_email
from app.config import get_settings


@pytest.mark.asyncio
async def test_send_skips_when_no_api_key():
    settings = get_settings()
    object.__setattr__(settings, "SENDGRID_API_KEY", None)
    ok = await send_transactional_email("a@b.com", "Hi", "<p>Hi</p>", settings)
    assert ok is False


@pytest.mark.asyncio
async def test_send_posts_to_sendgrid_when_key_present():
    settings = get_settings()
    object.__setattr__(settings, "SENDGRID_API_KEY", "SG.test")
    object.__setattr__(settings, "FROM_EMAIL", "noreply@pureaircalifornia.com")
    with patch("app.services.email_sender.httpx.AsyncClient") as MockClient:
        instance = MockClient.return_value.__aenter__.return_value
        instance.post = AsyncMock(return_value=type("R", (), {"status_code": 202})())
        ok = await send_transactional_email("a@b.com", "Hi", "<p>Hi</p>", settings)
    assert ok is True
    instance.post.assert_awaited_once()
