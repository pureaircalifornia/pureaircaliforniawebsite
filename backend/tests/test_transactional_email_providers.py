"""Mock provider boundaries; no real email or HTTP requests."""
from types import SimpleNamespace
from unittest.mock import AsyncMock

import httpx
import pytest

from app.services import email_sender as sender


def settings(**overrides):
    return SimpleNamespace(**{
        "RESEND_API_KEY": "fixture-resend-secret",
        "SENDGRID_API_KEY": "fixture-sendgrid-secret",
        "FROM_EMAIL": "noreply@example.com",
        **overrides,
    })


@pytest.fixture
def provider(monkeypatch):
    client = AsyncMock()
    client.__aenter__.return_value = client
    client.post.return_value = httpx.Response(200, json={"id": "provider-fixture-id"})
    factory = lambda **kwargs: client
    monkeypatch.setattr(sender.httpx, "AsyncClient", factory)
    return client


@pytest.mark.asyncio
async def test_resend_uses_documented_payload_and_stable_key(provider):
    accepted = await sender.send_transactional_email(
        "customer@example.com", "Receipt", "<p>Received</p>", settings(),
        idempotency_key="website-lead-receipt:fixture",
        use_resend=True,
    )
    assert accepted is True
    provider.post.assert_awaited_once()
    args = provider.post.call_args
    assert args.args == ("https://api.resend.com/emails",)
    assert args.kwargs["json"] == {
        "from": "Pure Air California <noreply@example.com>",
        "to": ["customer@example.com"], "subject": "Receipt", "html": "<p>Received</p>",
    }
    assert args.kwargs["headers"]["Idempotency-Key"] == "website-lead-receipt:fixture"
    assert args.kwargs["headers"]["Authorization"] == "Bearer fixture-resend-secret"


@pytest.mark.asyncio
async def test_sendgrid_only_configuration_is_retained(provider):
    provider.post.return_value = httpx.Response(202)
    assert await sender.send_transactional_email(
        "customer@example.com", "Receipt", "<p>Received</p>", settings(RESEND_API_KEY=None),
        idempotency_key="website-lead-receipt:fixture",
    ) is True
    args = provider.post.call_args
    assert args.args == ("https://api.sendgrid.com/v3/mail/send",)
    assert args.kwargs["json"]["personalizations"] == [{"to": [{"email": "customer@example.com"}]}]
    assert "Idempotency-Key" not in args.kwargs["headers"]
    provider.post.assert_awaited_once()


@pytest.mark.asyncio
@pytest.mark.parametrize("status", [400, 401, 403, 409, 422, 429, 500, 503])
async def test_rejection_or_server_failure_never_falls_back_or_retries(provider, caplog, status):
    provider.post.return_value = httpx.Response(status, text="private@example.com fixture-resend-secret")
    assert await sender.send_transactional_email("private@example.com", "Private", "private body", settings(), use_resend=True) is False
    provider.post.assert_awaited_once()
    assert provider.post.call_args.args == (sender.RESEND_URL,)
    assert "private@example.com" not in caplog.text
    assert "fixture-resend-secret" not in caplog.text


@pytest.mark.asyncio
@pytest.mark.parametrize("error", [httpx.ReadTimeout, httpx.ConnectError])
async def test_ambiguous_transport_failure_never_falls_back_or_retries(provider, caplog, error):
    provider.post.side_effect = error("private@example.com fixture-resend-secret")
    assert await sender.send_transactional_email("private@example.com", "Private", "body", settings(), use_resend=True) is False
    provider.post.assert_awaited_once()
    assert "private@example.com" not in caplog.text
    assert "fixture-resend-secret" not in caplog.text


@pytest.mark.asyncio
@pytest.mark.parametrize("response", [
    httpx.Response(200, text="not JSON"),
    httpx.Response(200, json={}),
    httpx.Response(200, json={"id": ""}),
    httpx.Response(200, json={"id": 123}),
    httpx.Response(200, json=[]),
])
async def test_ambiguous_resend_success_body_is_not_confirmation(provider, response):
    provider.post.return_value = response
    assert await sender.send_transactional_email("a@example.com", "Receipt", "body", settings(), use_resend=True) is False
    provider.post.assert_awaited_once()


@pytest.mark.asyncio
async def test_missing_provider_skips_without_http(provider):
    assert await sender.send_transactional_email(
        "a@example.com", "Receipt", "body", settings(RESEND_API_KEY=None, SENDGRID_API_KEY=None),
    ) is False
    provider.post.assert_not_awaited()


@pytest.mark.asyncio
async def test_existing_callers_keep_sendgrid_when_both_keys_exist(provider):
    provider.post.return_value = httpx.Response(202)
    assert await sender.send_transactional_email("a@example.com", "Receipt", "body", settings()) is True
    assert provider.post.call_args.args == (sender.SENDGRID_URL,)
    provider.post.assert_awaited_once()


@pytest.mark.asyncio
async def test_existing_callers_do_not_gain_resend_side_effects(provider):
    assert await sender.send_transactional_email(
        "a@example.com", "Receipt", "body", settings(SENDGRID_API_KEY=None),
    ) is False
    provider.post.assert_not_awaited()


@pytest.mark.asyncio
async def test_explicit_resend_without_key_never_switches_to_sendgrid(provider):
    assert await sender.send_transactional_email(
        "a@example.com", "Receipt", "body", settings(RESEND_API_KEY=None), use_resend=True,
    ) is False
    provider.post.assert_not_awaited()
