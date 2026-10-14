import pytest
from unittest.mock import AsyncMock
from app.services import lead_notifications as ln


@pytest.mark.asyncio
async def test_sends_autoreply_and_owner_alert(monkeypatch):
    calls = []
    async def fake_send(to, subject, html, settings, **kwargs):
        calls.append(to); return True
    monkeypatch.setattr(ln, "send_transactional_email", fake_send)
    s = ln.get_settings()
    object.__setattr__(s, "OWNER_NOTIFY_EMAIL", "owner@pac.com")
    lead = {"name": "Jane", "email": "jane@x.com", "phone": "3105551212",
            "service": "Air Duct", "address": "1 Main St", "message": "help"}
    await ln.send_lead_notifications(lead)
    assert "jane@x.com" in calls       # customer auto-reply
    assert "owner@pac.com" in calls    # owner alert


@pytest.mark.asyncio
async def test_no_owner_email_still_sends_autoreply(monkeypatch):
    calls = []
    async def fake_send(to, subject, html, settings, **kwargs): calls.append(to); return True
    monkeypatch.setattr(ln, "send_transactional_email", fake_send)
    s = ln.get_settings()
    object.__setattr__(s, "OWNER_NOTIFY_EMAIL", None)
    await ln.send_lead_notifications({"name": "J", "email": "j@x.com", "phone": ""})
    assert calls == ["j@x.com"]


@pytest.mark.asyncio
async def test_failed_autoreply_does_not_block_owner_alert(monkeypatch):
    calls = []

    async def fake_send(to, subject, html, settings, **kwargs):
        calls.append(to)
        if to == "qa@example.com":
            raise RuntimeError("simulated customer email failure")
        return True

    monkeypatch.setattr(ln, "send_transactional_email", fake_send)
    settings = ln.get_settings()
    object.__setattr__(settings, "OWNER_NOTIFY_EMAIL", "owner@example.com")
    await ln.send_lead_notifications({"name": "QA", "email": "qa@example.com"})
    assert calls == ["qa@example.com", "owner@example.com"]


def test_receipt_has_no_unverified_promises_and_escapes_names():
    html = ln._autoreply_html("<script>alert(1)</script>")
    assert "<script>" not in html
    assert "&lt;script&gt;" in html
    assert "15 minutes" not in html
    assert "NADCA" not in html
    assert "5-Star" not in html
    assert "does not confirm an appointment or final price" in html


def test_owner_email_escapes_input_and_is_not_a_qualified_lead_claim():
    html = ln._owner_html({
        "name": "<img src=x onerror=alert(1)>", "phone": "123' onclick='bad",
        "email": "qa@example.com?bcc=other@example.com", "submission_id": "fixture-id",
    })
    assert "<img" not in html
    assert "href='tel:123'" in html
    assert "href='mailto:qa@example.com'" in html
    assert "Accepted intake only" in html
    assert "fixture-id" in html


@pytest.mark.asyncio
async def test_stable_distinct_keys_and_false_receipt_still_attempts_owner(monkeypatch):
    send = AsyncMock(return_value=False)
    monkeypatch.setattr(ln, "send_transactional_email", send)
    settings = ln.get_settings()
    object.__setattr__(settings, "OWNER_NOTIFY_EMAIL", "owner@example.com")
    object.__setattr__(settings, "RESEND_API_KEY", "fixture-resend-key")
    submission = "99169d30-cb91-4d87-99ef-c180a635ecea"
    await ln.send_lead_notifications({
        "name": "Name\r\nBcc: bad", "service": "Duct\nFake header", "email": "customer@example.com",
        "submission_id": submission,
    })
    assert send.await_count == 2
    first, second = send.call_args_list
    assert first.kwargs["idempotency_key"] == f"website-lead-receipt:{submission}"
    assert second.kwargs["idempotency_key"] == f"website-lead-owner:{submission}"
    assert first.kwargs["use_resend"] is second.kwargs["use_resend"] is True
    assert first.args[0] == "customer@example.com"
    assert second.args[0] == "owner@example.com"
    assert "\r" not in second.args[1] and "\n" not in second.args[1]

