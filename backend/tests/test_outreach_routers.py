import base64
import hashlib
import hmac
import json
import time

import pytest
from fastapi import FastAPI
from httpx import ASGITransport, AsyncClient

from app.core.dependencies import get_current_user
from app.routers import lead_scanner, outreach, outreach_public, webhooks
from app.services import outreach_sequence as seq

TOKEN = "tok_abcdefghijklmnop"


@pytest.fixture
def app(db):
    application = FastAPI()
    for router in (lead_scanner.router, outreach.router, outreach_public.router, webhooks.router):
        application.include_router(router, prefix="/api")
    application.dependency_overrides[get_current_user] = lambda: {"email": "lou@example.com"}
    outreach_public._hits.clear()
    return application


@pytest.fixture
async def client(app):
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        yield ac


@pytest.fixture
def sent(monkeypatch):
    calls = []

    async def fake_send(**kwargs):
        calls.append(kwargs)
        return {"success": True, "dry_run": False, "provider_id": "re_1", "message": "Email sent."}

    monkeypatch.setattr(seq, "send_email", fake_send)
    object.__setattr__(seq.get_settings(), "RESEND_API_KEY", "re_test")
    return calls


# ── Admin: auth ───────────────────────────────────────────────────────

async def test_admin_endpoints_require_a_login(db):
    application = FastAPI()
    application.include_router(outreach.router, prefix="/api")
    application.include_router(lead_scanner.router, prefix="/api")
    async with AsyncClient(transport=ASGITransport(app=application), base_url="http://test") as ac:
        for method, path in [("get", "/api/lead-scanner/prospects"),
                             ("get", "/api/lead-scanner/outreach/stats"),
                             ("post", "/api/lead-scanner/outreach/send"),
                             ("post", "/api/lead-scanner/outreach/sequence/start")]:
            response = await getattr(ac, method)(path)
            assert response.status_code in (401, 403), path


# ── Admin: prospects ──────────────────────────────────────────────────

async def test_saving_a_prospect_scores_it_and_issues_a_private_token(client, db, monkeypatch):
    async def no_enrich(_id):
        return None

    monkeypatch.setattr(lead_scanner, "_background_enrich", no_enrich)
    payload = {"business_name": "Grand Hotel", "business_category": "hotel",
               "website": "https://grand.example", "phone": "(310) 555-0142",
               "place_id": "place-1", "total_ratings": 300}
    response = await client.post("/api/lead-scanner/prospects", json=payload)
    assert response.status_code == 201
    body = response.json()
    assert body["fit_score"] > 50 and len(body["public_token"]) == 32
    assert "_id" not in body

    again = await client.post("/api/lead-scanner/prospects", json=payload)
    assert again.json()["id"] == body["id"]
    assert len(db.prospects.documents) == 1


async def test_bulk_save_reports_new_and_already_saved(client, db, monkeypatch):
    async def no_enrich(_id):
        return None

    monkeypatch.setattr(lead_scanner, "_background_enrich", no_enrich)
    rows = [{"business_name": f"B{i}", "business_category": "gym", "place_id": f"pl{i}"}
            for i in range(3)]
    first = await client.post("/api/lead-scanner/prospects/bulk", json={"prospects": rows[:2]})
    second = await client.post("/api/lead-scanner/prospects/bulk", json={"prospects": rows})
    assert first.json()["created"] == 2
    assert second.json()["created"] == 1 and second.json()["already_saved"] == 2


async def test_unknown_category_is_rejected(client):
    response = await client.post("/api/lead-scanner/prospects", json={
        "business_name": "X", "business_category": "Home Owner Association"})
    assert response.status_code == 422


async def test_marking_not_interested_stops_the_sequence_and_suppresses(client, db, prospect):
    await db.prospects.insert_one({**prospect, "sequence_status": "active",
                                   "next_touch_at": "2026-11-25T00:00:00"})
    response = await client.patch("/api/lead-scanner/prospects/p1",
                                  json={"outreach_status": "not_interested"})
    body = response.json()
    assert body["sequence_status"] == "stopped" and body["next_touch_at"] is None
    assert await seq.is_suppressed(prospect["contact_email"])


async def test_typing_in_an_email_confirms_it(client, db, prospect):
    guess = "info@sunsetvillas.example"
    await db.prospects.insert_one({**prospect, "contact_email": None,
                                   "found_emails": [{"email": guess, "source": "pattern guess"}]})
    response = await client.patch("/api/lead-scanner/prospects/p1",
                                  json={"contact_email": "  Info@SunsetVillas.example "})
    assert response.json()["contact_email"] == guess
    stored = await db.prospects.find_one({"id": "p1"})
    assert await seq.check_sendable(stored, guess) is None


async def test_enrichment_fills_blanks_but_keeps_what_a_person_entered(client, db, prospect, monkeypatch):
    async def fake_find(website, name, phone):
        return {"emails": [{"email": "gm@sunsetvillas.example", "source": "homepage",
                            "confidence": 80, "grade": "named"}],
                "best": {"email": "gm@sunsetvillas.example", "grade": "named"},
                "domain": "sunsetvillas.example", "mx_valid": True, "contacts": [],
                "top_contact_name": "Dana Reed", "top_contact_title": "General Manager",
                "pages_scraped": 3}

    monkeypatch.setattr(lead_scanner, "find_emails_for_business", fake_find)
    await db.prospects.insert_one(prospect)
    response = await client.post("/api/lead-scanner/find-emails/p1")
    saved = response.json()["prospect"]
    assert saved["contact_email"] == "maria@sunsetvillas.example"   # untouched
    assert saved["contact_name"] == "Maria Lopez"                   # untouched
    assert saved["found_emails"][0]["email"] == "gm@sunsetvillas.example"
    assert saved["mx_valid"] is True and saved["fit_score"] > 0


# ── Admin: outreach ───────────────────────────────────────────────────

async def test_preview_returns_copy_footer_and_whole_sequence(client, db, prospect):
    await db.prospects.insert_one(prospect)
    body = (await client.post("/api/lead-scanner/outreach/preview",
                              json={"prospect_id": "p1"})).json()
    assert body["step"] == 0 and body["blocked_reason"] is None
    assert "Hi Maria," in body["body"] and "PO Box 3842" in body["footer"]
    assert [s["step_name"] for s in body["sequence"]] == ["Opener", "Reason", "What you get", "Break-up"]


async def test_send_delivers_and_starts_the_sequence(client, db, prospect, sent):
    await db.prospects.insert_one(prospect)
    response = await client.post("/api/lead-scanner/outreach/send", json={
        "prospect_id": "p1", "to_email": prospect["contact_email"], "subject": "Hi",
        "body": "Body", "template_id": "hoa.s0.v0", "variant": 0,
        "attachments": [{"filename": "coi.pdf", "content_base64": base64.b64encode(b"pdf").decode()}]})
    assert response.status_code == 200 and response.json()["success"]
    assert sent[0]["attachments"][0]["filename"] == "coi.pdf"
    stored = await db.prospects.find_one({"id": "p1"})
    assert stored["sequence_status"] == "active" and stored["emails_sent"] == 1


async def test_send_refuses_an_opted_out_prospect(client, db, prospect, sent):
    await db.prospects.insert_one({**prospect, "outreach_status": "unsubscribed"})
    response = await client.post("/api/lead-scanner/outreach/send", json={
        "prospect_id": "p1", "to_email": prospect["contact_email"], "subject": "Hi", "body": "B"})
    assert response.status_code == 409 and sent == []


@pytest.mark.parametrize("attachment,code", [
    ({"filename": "../../etc/passwd", "content_base64": "QQ=="}, 422),
    ({"filename": "a.pdf", "content_base64": "not base64!!"}, 422),
])
async def test_bad_attachments_are_rejected(client, db, prospect, sent, attachment, code):
    await db.prospects.insert_one(prospect)
    response = await client.post("/api/lead-scanner/outreach/send", json={
        "prospect_id": "p1", "to_email": prospect["contact_email"], "subject": "Hi",
        "body": "B", "attachments": [attachment]})
    assert response.status_code == code and sent == []


async def test_queueing_takes_safe_prospects_and_explains_the_rest(client, db, prospect):
    await db.prospects.insert_one(prospect)
    await db.prospects.insert_one({**prospect, "id": "p2", "contact_email": None,
                                   "public_token": "tok_2222222222222222"})
    await db.prospects.insert_one({**prospect, "id": "p3", "outreach_status": "replied",
                                   "public_token": "tok_3333333333333333"})
    body = (await client.post("/api/lead-scanner/outreach/sequence/start",
                              json={"prospect_ids": ["p1", "p2", "p3"]})).json()
    assert body["queued"] == ["p1"]
    assert {row["id"] for row in body["skipped"]} == {"p2", "p3"}
    assert (await db.prospects.find_one({"id": "p1"}))["sequence_status"] == "active"

    paused = (await client.post("/api/lead-scanner/outreach/sequence/stop",
                                json={"prospect_ids": ["p1"]})).json()
    assert paused["paused"] == 1


async def test_stats_report_the_funnel(client, db, prospect):
    await db.prospects.insert_one({**prospect, "emails_sent": 1, "opened_at": "x",
                                   "clicked_at": "x", "outreach_status": "meeting_scheduled"})
    await db.prospects.insert_one({**prospect, "id": "p2", "emails_sent": 1,
                                   "outreach_status": "email_sent",
                                   "public_token": "tok_2222222222222222"})
    await db.outreach.insert_one({"prospect_id": "p1", "step": 0, "template_id": "hoa.s0.v0",
                                  "status": "sent", "opened_at": "x", "sent_at": "2026-01-01"})
    await db.outreach.insert_one({"prospect_id": "p2", "step": 0, "template_id": "hoa.s0.v0",
                                  "status": "sent", "sent_at": "2026-01-01"})
    stats = (await client.get("/api/lead-scanner/outreach/stats")).json()
    assert stats["totals"]["contacted"] == 2 and stats["totals"]["booked"] == 1
    assert stats["totals"]["open_rate"] == 50.0 and stats["totals"]["booking_rate"] == 50.0
    assert stats["by_template"][0] == {"template_id": "hoa.s0.v0", "sent": 2, "opened": 1,
                                       "replied": 1, "booked": 1, "open_rate": 50.0,
                                       "reply_rate": 50.0}
    assert stats["by_category"][0]["category"] == "hoa"
    assert set(stats["readiness"]) >= {"email_provider", "open_tracking_webhook", "automation_secret"}


# ── Automation endpoint ───────────────────────────────────────────────

async def test_scheduler_endpoint_has_no_default_key(client, monkeypatch):
    settings = outreach.get_settings()
    object.__setattr__(settings, "CRON_SECRET", None)
    object.__setattr__(settings, "ADMIN_SECRET", "admin-secret")
    # The key that used to be hard-coded, and the admin secret, must both fail.
    for key in ("pac-cron-secret-2026", "admin-secret"):
        response = await client.post(f"/api/lead-scanner/outreach/run-drip?cron_key={key}")
        assert response.status_code == 503


async def test_scheduler_endpoint_checks_the_configured_secret(client, monkeypatch):
    settings = outreach.get_settings()
    secret = "a-long-random-scheduler-secret-0001"
    object.__setattr__(settings, "CRON_SECRET", secret)
    called = []

    async def fake_run():
        called.append(True)
        return {"sent": 0}

    monkeypatch.setattr(outreach, "run_due_touches", fake_run)
    assert (await client.post("/api/lead-scanner/outreach/run-drip")).status_code == 401
    assert (await client.post("/api/lead-scanner/outreach/run-drip",
                              headers={"X-Cron-Key": "wrong"})).status_code == 401
    # The secret is not accepted in the URL, where it would land in access logs.
    assert (await client.post(f"/api/lead-scanner/outreach/run-drip?cron_key={secret}")
            ).status_code == 401
    assert (await client.post("/api/lead-scanner/outreach/run-drip",
                              headers={"X-Cron-Key": "é-not-ascii".encode("latin-1")}
                              )).status_code == 401
    assert called == []
    ok = await client.post("/api/lead-scanner/outreach/run-drip", headers={"X-Cron-Key": secret})
    assert ok.status_code == 200 and called == [True]


async def test_scheduler_endpoint_refuses_a_short_secret(client):
    object.__setattr__(outreach.get_settings(), "CRON_SECRET", "short")
    response = await client.post("/api/lead-scanner/outreach/run-drip",
                                 headers={"X-Cron-Key": "short"})
    assert response.status_code == 503


# ── Public: booking ───────────────────────────────────────────────────

async def test_opening_the_link_records_a_click_and_reveals_only_the_name(client, db, prospect):
    await db.prospects.insert_one({**prospect, "outreach_status": "email_sent"})
    response = await client.get(f"/api/outreach/p/{TOKEN}")
    assert response.json() == {"business_name": "Sunset Villas HOA", "city": "Santa Monica"}
    stored = await db.prospects.find_one({"id": "p1"})
    assert stored["outreach_status"] == "link_clicked" and stored["clicked_at"]


@pytest.mark.parametrize("token", ["tok_unknown_0000000000", "short", "bad token!"])
async def test_unknown_token_looks_the_same_as_no_prospect(client, db, prospect, token):
    await db.prospects.insert_one(prospect)
    response = await client.get(f"/api/outreach/p/{token}")
    assert response.status_code == 200
    assert response.json() == {"business_name": None, "city": None}


async def test_booking_creates_a_lead_alerts_the_owner_and_ends_the_sequence(
        client, db, prospect, monkeypatch):
    notified = []

    async def fake_notify(lead):
        notified.append(lead)

    monkeypatch.setattr(outreach_public, "send_lead_notifications", fake_notify)
    await db.prospects.insert_one({**prospect, "outreach_status": "link_clicked",
                                   "sequence_status": "active",
                                   "next_touch_at": "2026-11-25T00:00:00"})
    response = await client.post("/api/outreach/book", json={
        "token": TOKEN, "name": "Maria Lopez", "phone": "310-555-0142",
        "preferred_time": "Weekday morning", "notes": "Gate code at the front desk"})
    assert response.status_code == 201 and response.json() == {"accepted": True}

    lead = db.leads.documents[0]
    assert lead["source"] == "outreach" and lead["status"] == "new"
    assert lead["company"] == "Sunset Villas HOA, Inc." and lead["prospect_id"] == "p1"
    assert lead["email"] == "maria@sunsetvillas.example"
    assert "Weekday morning" in lead["message"] and "Gate code" in lead["message"]
    assert notified and notified[0]["phone"] == "310-555-0142"

    stored = await db.prospects.find_one({"id": "p1"})
    assert stored["outreach_status"] == "meeting_scheduled"
    assert stored["sequence_status"] == "stopped" and stored["next_touch_at"] is None
    assert stored["booking_lead_id"] == lead["id"]


async def test_booking_without_a_token_still_becomes_a_lead(client, db, monkeypatch):
    async def fake_notify(lead):
        return None

    monkeypatch.setattr(outreach_public, "send_lead_notifications", fake_notify)
    response = await client.post("/api/outreach/book", json={
        "name": "Sam Park", "phone": "(213) 555-0100", "business_name": "Park Dental"})
    assert response.status_code == 201
    assert db.leads.documents[0]["company"] == "Park Dental"


@pytest.mark.parametrize("payload", [
    {"name": "Maria", "phone": "12345"},
    {"name": "M", "phone": "310-555-0142"},
    {"phone": "310-555-0142"},
    {"name": "   ", "phone": "310-555-0142"},
])
async def test_incomplete_bookings_are_rejected(client, db, payload):
    response = await client.post("/api/outreach/book", json=payload)
    assert response.status_code == 422 and db.leads.documents == []


async def test_a_bot_filling_the_hidden_field_stores_nothing(client, db):
    response = await client.post("/api/outreach/book", json={
        "name": "Bot Bot", "phone": "310-555-0142", "hp": "http://spam.example"})
    assert response.status_code == 201 and db.leads.documents == []


async def test_booking_is_rate_limited(client, db, monkeypatch):
    async def fake_notify(lead):
        return None

    monkeypatch.setattr(outreach_public, "send_lead_notifications", fake_notify)
    payload = {"name": "Sam Park", "phone": "(213) 555-0100"}
    codes = [(await client.post("/api/outreach/book", json=payload)).status_code for _ in range(7)]
    assert codes[:5] == [201] * 5 and codes[5:] == [429, 429]


# ── Public: unsubscribe ───────────────────────────────────────────────

async def test_one_click_unsubscribe_suppresses_and_stops(client, db, prospect):
    await db.prospects.insert_one({**prospect, "outreach_status": "email_sent",
                                   "sequence_status": "active"})
    # Mail providers POST form-encoded "List-Unsubscribe=One-Click".
    response = await client.post(f"/api/outreach/unsubscribe/{TOKEN}",
                                 content="List-Unsubscribe=One-Click",
                                 headers={"Content-Type": "application/x-www-form-urlencoded"})
    assert response.json() == {"unsubscribed": True}
    stored = await db.prospects.find_one({"id": "p1"})
    assert stored["outreach_status"] == "unsubscribed" and stored["sequence_status"] == "stopped"
    assert await seq.is_suppressed(prospect["contact_email"])
    assert await seq.check_sendable(stored, prospect["contact_email"]) is not None


async def test_unsubscribe_with_a_bad_token_answers_the_same(client, db):
    response = await client.post("/api/outreach/unsubscribe/tok_unknown_0000000000")
    assert response.status_code == 200 and response.json() == {"unsubscribed": True}


# ── Webhook ───────────────────────────────────────────────────────────

SECRET_BYTES = b"super-secret-signing-key"
SECRET = "whsec_" + base64.b64encode(SECRET_BYTES).decode()


def _signed(payload: dict, timestamp=None, key: bytes = SECRET_BYTES):
    body = json.dumps(payload).encode()
    timestamp = str(int(timestamp if timestamp is not None else time.time()))
    digest = hmac.new(key, f"msg_1.{timestamp}.".encode() + body, hashlib.sha256).digest()
    headers = {"svix-id": "msg_1", "svix-timestamp": timestamp,
               "svix-signature": "v1," + base64.b64encode(digest).decode(),
               "Content-Type": "application/json"}
    return body, headers


@pytest.fixture
def webhook_secret():
    object.__setattr__(webhooks.get_settings(), "RESEND_WEBHOOK_SECRET", SECRET)


async def _seed_sent(db, prospect, status="email_sent"):
    await db.prospects.insert_one({**prospect, "outreach_status": status,
                                   "sequence_status": "active"})
    await db.outreach.insert_one({"id": "o1", "prospect_id": "p1", "provider_id": "re_1",
                                  "to_email": prospect["contact_email"], "status": "sent"})


async def test_webhook_refuses_everything_until_a_secret_is_set(client, db):
    object.__setattr__(webhooks.get_settings(), "RESEND_WEBHOOK_SECRET", None)
    body, headers = _signed({"type": "email.opened", "data": {}})
    assert (await client.post("/api/webhooks/resend", content=body, headers=headers)).status_code == 503


async def test_webhook_rejects_forged_and_replayed_requests(client, db, prospect, webhook_secret):
    await _seed_sent(db, prospect)
    event = {"type": "email.bounced", "data": {"email_id": "re_1"}}

    body, headers = _signed(event, key=b"attacker-key")
    assert (await client.post("/api/webhooks/resend", content=body, headers=headers)).status_code == 401

    body, headers = _signed(event, timestamp=time.time() - 3600)
    assert (await client.post("/api/webhooks/resend", content=body, headers=headers)).status_code == 401

    body, headers = _signed(event)
    tampered = body.replace(b"re_1", b"re_2")
    assert (await client.post("/api/webhooks/resend", content=tampered, headers=headers)).status_code == 401

    assert (await client.post("/api/webhooks/resend", content=b"{}")).status_code == 401
    assert (await db.prospects.find_one({"id": "p1"}))["outreach_status"] == "email_sent"


async def test_open_event_is_recorded_against_the_email_and_prospect(client, db, prospect, webhook_secret):
    await _seed_sent(db, prospect)
    body, headers = _signed({"type": "email.opened", "data": {"email_id": "re_1"}})
    assert (await client.post("/api/webhooks/resend", content=body, headers=headers)).status_code == 200
    assert (await db.outreach.find_one({"id": "o1"}))["opened_at"]
    stored = await db.prospects.find_one({"id": "p1"})
    assert stored["outreach_status"] == "email_opened" and stored["opened_at"]


async def test_open_event_never_overwrites_a_reply(client, db, prospect, webhook_secret):
    await _seed_sent(db, prospect, status="replied")
    body, headers = _signed({"type": "email.opened", "data": {"email_id": "re_1"}})
    await client.post("/api/webhooks/resend", content=body, headers=headers)
    assert (await db.prospects.find_one({"id": "p1"}))["outreach_status"] == "replied"


async def test_hard_bounce_and_complaint_suppress_the_address(client, db, prospect, webhook_secret):
    await _seed_sent(db, prospect)
    body, headers = _signed({"type": "email.bounced",
                             "data": {"email_id": "re_1", "bounce": {"type": "Permanent"}}})
    await client.post("/api/webhooks/resend", content=body, headers=headers)
    stored = await db.prospects.find_one({"id": "p1"})
    assert stored["outreach_status"] == "bounced" and stored["sequence_status"] == "stopped"
    assert await seq.is_suppressed(prospect["contact_email"])


async def test_temporary_bounce_does_not_kill_the_address(client, db, prospect, webhook_secret):
    await _seed_sent(db, prospect)
    body, headers = _signed({"type": "email.bounced",
                             "data": {"email_id": "re_1", "bounce": {"type": "Transient"}}})
    await client.post("/api/webhooks/resend", content=body, headers=headers)
    stored = await db.prospects.find_one({"id": "p1"})
    assert stored["outreach_status"] == "email_sent" and stored["sequence_status"] == "active"
    assert not await seq.is_suppressed(prospect["contact_email"])


async def test_spam_complaint_is_treated_as_an_unsubscribe(client, db, prospect, webhook_secret):
    await _seed_sent(db, prospect)
    body, headers = _signed({"type": "email.complained", "data": {"email_id": "re_1"}})
    await client.post("/api/webhooks/resend", content=body, headers=headers)
    assert (await db.prospects.find_one({"id": "p1"}))["outreach_status"] == "unsubscribed"
    assert await seq.is_suppressed(prospect["contact_email"])
