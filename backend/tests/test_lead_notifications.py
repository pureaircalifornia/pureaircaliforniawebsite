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
    assert 'href="tel:+12137924145"' in html
    assert "9 a.m.–10 p.m. Pacific" in html
    assert 'href="https://www.pureaircalifornia.com/"' in html
    assert "reply to" not in html.lower()  # Transport does not provide Reply-To.
    assert 'role="presentation"' in html


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


def test_receipt_reference_is_escaped_and_blank_names_are_readable():
    html = ln._autoreply_html(" \t ", '<script>bad</script>"')
    assert "Thank you, there." in html
    assert "Request reference" in html
    assert "&lt;script&gt;bad&lt;/script&gt;&quot;" in html
    assert "<script>" not in html
    assert "property ZIP code, number of systems" in html
    assert "Request reference<br>" not in ln._autoreply_html("Jane")


def test_owner_details_include_only_supplied_fields_and_preserve_plain_message_lines():
    html = ln._owner_html({
        "name": "Jane", "phone": "+1 (213) 555-0100", "email": "jane+home@example.com",
        "service": "Air duct cleaning", "property_type": "Private home / estate",
        "square_footage": "4500", "address": "ZIP 90210", "preferred_date": "Planning ahead",
        "source": "quote_form", "message": "Systems: 3–5\nAccess: gated entrance",
        "submission_id": "request-reference", "id": "record-reference",
        "estimated_price": 999999,
    })
    for text in ["Private home / estate", "4500", "ZIP 90210", "Planning ahead",
                 "quote_form", "request-reference", "record-reference",
                 "Systems: 3–5\nAccess: gated entrance", "qualification outcome"]:
        assert text in html
    assert "white-space:pre-wrap" in html
    assert "href='tel:+12135550100'" in html
    assert "href='mailto:jane%2Bhome@example.com'" in html
    assert "999999" not in html  # Unverified submitted prices are not revenue.
    minimal = ln._owner_html({"name": "Jane"})
    assert "Approx. sq. ft." not in minimal
    assert "Requested timing" not in minimal
    assert "Customer details" not in minimal


def test_owner_escapes_every_display_value_and_blocks_encoded_mailto_controls():
    attack = '<svg onload="bad">'
    html = ln._owner_html({key: attack for key in (
        "name", "service", "property_type", "square_footage", "address",
        "preferred_date", "source", "submission_id", "id", "message",
    )} | {"email": "qa@example.com%0d%0a?bcc=other@example.com"})
    assert "<svg" not in html
    assert html.count("&lt;svg onload=&quot;bad&quot;&gt;") == 10
    assert "href='mailto:qa@example.com%250d%250a'" in html
    assert "href='mailto:qa@example.com%0d%0a" not in html
    assert "href='mailto:qa@example.com?bcc=" not in html


@pytest.mark.parametrize("address, encoded", [
    ("jane#estate@example.com", "jane%23estate@example.com"),
    ("jane?estate@example.com", "jane%3Festate@example.com"),
    ("jane%estate@example.com", "jane%25estate@example.com"),
])
def test_owner_mailto_preserves_legal_reserved_characters_in_local_part(address, encoded):
    html = ln._owner_html({"email": address})
    assert f"href='mailto:{encoded}'" in html


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
    assert submission in first.args[2] and submission in second.args[2]
    assert "\r" not in second.args[1] and "\n" not in second.args[1]

