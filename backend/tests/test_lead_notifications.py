import pytest
from unittest.mock import AsyncMock
from app.services import lead_notifications as ln


@pytest.mark.asyncio
async def test_sends_autoreply_and_owner_alert(monkeypatch):
    calls = []
    async def fake_send(to, subject, html, settings):
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
    async def fake_send(to, subject, html, settings): calls.append(to); return True
    monkeypatch.setattr(ln, "send_transactional_email", fake_send)
    s = ln.get_settings()
    object.__setattr__(s, "OWNER_NOTIFY_EMAIL", None)
    await ln.send_lead_notifications({"name": "J", "email": "j@x.com", "phone": ""})
    assert calls == ["j@x.com"]
