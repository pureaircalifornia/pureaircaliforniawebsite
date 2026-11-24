"""
Regression tests for the problems found in the security and correctness
reviews. Each test names the failure it prevents.
"""
import base64
import hashlib
import hmac
import json
import time
from datetime import datetime, timedelta

import pytest
from fastapi import FastAPI
from httpx import ASGITransport, AsyncClient

from app.core.dependencies import get_current_user
from app.models.prospect import ProspectCreate, ProspectUpdate
from app.routers import lead_scanner, outreach, outreach_public, webhooks
from app.services import outreach_sequence as seq

MONDAY_10AM_PT = datetime(2026, 11, 23, 18, 0)
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
        return {"success": True, "dry_run": False, "provider_id": f"re_{len(calls)}",
                "message": "Email sent."}

    async def no_sleep(_seconds):
        return None

    monkeypatch.setattr(seq, "send_email", fake_send)
    monkeypatch.setattr(seq.asyncio, "sleep", no_sleep)
    object.__setattr__(seq.get_settings(), "RESEND_API_KEY", "re_test")
    return calls


@pytest.fixture
def quiet_notifications(monkeypatch):
    notified = []

    async def fake_notify(lead):
        notified.append(lead)

    monkeypatch.setattr(outreach_public, "send_lead_notifications", fake_notify)
    return notified


def _due(prospect, **overrides):
    return {**prospect, "sequence_status": "active",
            "next_touch_at": (MONDAY_10AM_PT - timedelta(hours=1)).isoformat(), **overrides}


# ── No double sends ───────────────────────────────────────────────────

async def test_two_overlapping_runs_send_each_email_once(db, prospect, sent):
    """A scheduler retry or a second caller must not email the same step twice."""
    await db.prospects.insert_one(_due(prospect))
    stale_read = await db.prospects.find_one({"id": "p1"})

    first = await seq.run_due_touches(MONDAY_10AM_PT)
    assert first["sent"] == 1

    # A second run that read the prospect before the first one finished.
    assert await seq._claim(stale_read, MONDAY_10AM_PT) is False
    second = await seq.run_due_touches(MONDAY_10AM_PT)
    assert second["sent"] == 0 and len(sent) == 1


async def test_a_claimed_prospect_is_not_picked_up_by_the_next_run(db, prospect, sent, monkeypatch):
    await db.prospects.insert_one(_due(prospect))
    held = []

    async def slow_send(**kwargs):
        # While this send is in flight, another run starts.
        held.append(await seq.run_due_touches(MONDAY_10AM_PT))
        return {"success": True, "dry_run": False, "provider_id": "re_1", "message": "ok"}

    monkeypatch.setattr(seq, "send_email", slow_send)
    summary = await seq.run_due_touches(MONDAY_10AM_PT)
    assert summary["sent"] == 1 and held[0]["sent"] == 0
    assert len(db.outreach.documents) == 1


async def test_a_double_click_does_not_send_twice(client, db, prospect, sent):
    await db.prospects.insert_one(prospect)
    payload = {"prospect_id": "p1", "to_email": prospect["contact_email"], "subject": "Hi",
               "body": "Body", "step": 0}
    assert (await client.post("/api/lead-scanner/outreach/send", json=payload)).status_code == 200
    again = await client.post("/api/lead-scanner/outreach/send", json=payload)
    assert again.status_code == 409 and len(sent) == 1


async def test_a_record_that_always_fails_is_pushed_back_not_retried_forever(
        db, prospect, sent, monkeypatch):
    def broken(_prospect, _step):
        raise RuntimeError("bad data")

    monkeypatch.setattr(seq, "compose_step", broken)
    await db.prospects.insert_one(_due(prospect))
    for _ in range(seq.MAX_SEND_FAILURES):
        stored = await db.prospects.find_one({"id": "p1"})
        if stored["sequence_status"] != "active":
            break
        await db.prospects.update_one(
            {"id": "p1"}, {"$set": {"next_touch_at": (MONDAY_10AM_PT - timedelta(hours=1)).isoformat()}})
        summary = await seq.run_due_touches(MONDAY_10AM_PT)
        assert summary["errors"] == 1
    stored = await db.prospects.find_one({"id": "p1"})
    assert stored["sequence_status"] == "stopped" and stored["send_failures"] == seq.MAX_SEND_FAILURES


# ── Sequence state ────────────────────────────────────────────────────

async def test_resending_an_earlier_touch_does_not_rewind_the_sequence(db, prospect, sent):
    later = "2026-12-01T18:00:00"
    advanced = {**prospect, "sequence_status": "active", "sequence_step": 3,
                "outreach_status": "email_sent", "next_touch_at": later}
    await db.prospects.insert_one(advanced)
    await seq.deliver_touch(advanced, to_email=advanced["contact_email"],
                            subject="s", body="b", step=0)
    stored = await db.prospects.find_one({"id": "p1"})
    assert stored["sequence_step"] == 3 and stored["next_touch_at"] == later
    assert stored["sequence_status"] == "active"


async def test_a_one_off_send_keeps_a_running_sequence_on_schedule(db, prospect, sent):
    running = {**prospect, "sequence_status": "active", "sequence_step": 1,
               "outreach_status": "email_sent", "next_touch_at": "2026-11-20T00:00:00"}
    await db.prospects.insert_one(running)
    await seq.deliver_touch(running, to_email=running["contact_email"], subject="s",
                            body="b", step=1, continue_sequence=False)
    stored = await db.prospects.find_one({"id": "p1"})
    # Still active, and the next touch is timed from this send, not the stale due date.
    assert stored["sequence_status"] == "active" and stored["sequence_step"] == 2
    assert stored["next_touch_at"] > seq.utcnow().isoformat()


async def test_a_dry_run_changes_nothing_about_the_prospect(db, prospect, monkeypatch):
    async def dry(**kwargs):
        return {"success": True, "dry_run": True, "provider_id": None, "message": "dry"}

    monkeypatch.setattr(seq, "send_email", dry)
    await db.prospects.insert_one(prospect)
    await seq.deliver_touch(prospect, to_email=prospect["contact_email"],
                            subject="s", body="b", step=0)
    stored = await db.prospects.find_one({"id": "p1"})
    assert stored["outreach_status"] == "not_contacted" and stored["emails_sent"] == 0
    assert stored["sequence_step"] == 0 and stored["sequence_status"] == "none"
    assert (await db.outreach.find_one({"prospect_id": "p1"}))["dry_run"] is True


async def test_the_runner_will_not_run_without_an_email_provider(db, prospect, monkeypatch):
    settings = seq.get_settings()
    object.__setattr__(settings, "RESEND_API_KEY", None)
    object.__setattr__(settings, "SENDGRID_API_KEY", None)
    await db.prospects.insert_one(_due(prospect))
    summary = await seq.run_due_touches(MONDAY_10AM_PT)
    assert summary["sent"] == 0 and "provider" in summary["message"]
    assert (await db.prospects.find_one({"id": "p1"}))["sequence_step"] == 0


async def test_restarting_a_paused_sequence_waits_out_the_normal_gap(client, db, prospect):
    yesterday = (seq.utcnow() - timedelta(days=1)).isoformat()
    await db.prospects.insert_one({**prospect, "sequence_status": "paused", "sequence_step": 1,
                                   "outreach_status": "email_sent", "emails_sent": 1,
                                   "last_contacted_at": yesterday, "send_failures": 2})
    body = (await client.post("/api/lead-scanner/outreach/sequence/start",
                              json={"prospect_ids": ["p1"]})).json()
    stored = await db.prospects.find_one({"id": "p1"})
    assert body["queued"] == ["p1"] and stored["send_failures"] == 0
    # Touch 2 is due three days after touch 1, so roughly two days from now.
    assert stored["next_touch_at"] > (seq.utcnow() + timedelta(days=1)).isoformat()


async def test_starting_an_already_running_sequence_does_not_reset_it(client, db, prospect):
    due = "2026-12-01T18:00:00"
    await db.prospects.insert_one({**prospect, "sequence_status": "active", "sequence_step": 2,
                                   "next_touch_at": due})
    body = (await client.post("/api/lead-scanner/outreach/sequence/start",
                              json={"prospect_ids": ["p1"]})).json()
    assert body["queued"] == [] and body["skipped"][0]["reason"] == "Already in the sequence."
    assert (await db.prospects.find_one({"id": "p1"}))["next_touch_at"] == due


# ── Records saved by the previous scanner ─────────────────────────────

def _legacy(prospect, **overrides):
    record = {k: v for k, v in prospect.items()
              if k not in ("public_token", "sequence_status", "sequence_step")}
    # The old scanner stored found emails as bare strings and no enrichment date.
    return {**record, "found_emails": ["facilities@sunsetvillas.example"],
            "contact_email": "facilities@sunsetvillas.example", **overrides}


async def test_a_contact_from_the_old_scanner_must_be_rechecked_before_sending(db, prospect):
    legacy = _legacy(prospect)
    reason = await seq.check_sendable(legacy, legacy["contact_email"])
    assert reason and "old scanner" in reason
    # Re-enriching, or a person re-saving the address, clears the block.
    assert await seq.check_sendable({**legacy, "enriched_at": "2026-11-22T00:00:00",
                                     "found_emails": []}, legacy["contact_email"]) is None
    assert await seq.check_sendable({**legacy, "contact_email_confirmed": True},
                                    legacy["contact_email"]) is None


async def test_a_record_without_a_token_gets_one_before_any_email(client, db, prospect, sent):
    legacy = _legacy(prospect, contact_email_confirmed=True)
    await db.prospects.insert_one(legacy)

    preview = (await client.post("/api/lead-scanner/outreach/preview",
                                 json={"prospect_id": "p1"})).json()
    token = (await db.prospects.find_one({"id": "p1"}))["public_token"]
    assert len(token) == 32
    assert f"/free-inspection/?t={token}" in preview["body"]
    assert f"/unsubscribe/?t={token}" in preview["footer"]

    await client.post("/api/lead-scanner/outreach/send", json={
        "prospect_id": "p1", "to_email": legacy["contact_email"],
        "subject": preview["subject"], "body": preview["body"]})
    assert sent[0]["unsubscribe_token"] == token


async def test_the_runner_mints_a_token_for_a_queued_legacy_record(db, prospect, sent):
    legacy = _legacy(prospect, contact_email_confirmed=True)
    await db.prospects.insert_one(_due(legacy, sequence_step=0))
    await seq.run_due_touches(MONDAY_10AM_PT)
    token = (await db.prospects.find_one({"id": "p1"}))["public_token"]
    assert sent[0]["unsubscribe_token"] == token and f"?t={token}" in sent[0]["body"]


async def test_legacy_record_lists_without_error(client, db, prospect):
    await db.prospects.insert_one(_legacy(prospect))
    rows = (await client.get("/api/lead-scanner/prospects")).json()
    assert rows[0]["found_emails"] == ["facilities@sunsetvillas.example"]
    assert rows[0]["fit_score"] > 0          # scored for display, not shown as zero
    stats = (await client.get("/api/lead-scanner/outreach/stats")).json()
    assert stats["totals"]["prospects"] == 1


# ── Public booking endpoint cannot be abused ──────────────────────────

async def test_a_spoofed_forwarded_header_does_not_reset_the_rate_limit(
        client, db, quiet_notifications):
    payload = {"name": "Sam Park", "phone": "(213) 555-0100"}
    codes = []
    for index in range(8):
        # The caller invents a new "client" each time; the proxy's entry is last.
        headers = {"X-Forwarded-For": f"1.2.3.{index}, 203.0.113.9"}
        codes.append((await client.post("/api/outreach/book", json=payload,
                                        headers=headers)).status_code)
    assert codes[:5] == [201] * 5 and set(codes[5:]) == {429}


async def test_bookings_have_a_ceiling_across_all_clients(client, db, quiet_notifications,
                                                          monkeypatch):
    monkeypatch.setitem(outreach_public._GLOBAL_LIMITS, "book", (6, 3600))
    payload = {"name": "Sam Park", "phone": "(213) 555-0100"}
    codes = [(await client.post("/api/outreach/book", json=payload,
                                headers={"X-Forwarded-For": f"198.51.100.{i}"})).status_code
             for i in range(9)]
    assert codes.count(201) == 6 and codes.count(429) == 3
    assert len(db.leads.documents) == 6


async def test_the_rate_limiter_does_not_grow_without_bound(monkeypatch):
    monkeypatch.setattr(outreach_public, "MAX_TRACKED_CLIENTS", 50)
    outreach_public._hits.clear()
    for index in range(400):
        outreach_public._allow(f"view:10.0.{index // 250}.{index % 250}", 60, 300)
    assert len(outreach_public._hits) <= 50


async def test_one_link_cannot_flood_the_owner(client, db, prospect, quiet_notifications,
                                               monkeypatch):
    monkeypatch.setitem(outreach_public._LIMITS, "book", (100, 600))
    await db.prospects.insert_one(prospect)
    payload = {"token": TOKEN, "name": "Maria Lopez", "phone": "310-555-0142"}
    for _ in range(6):
        assert (await client.post("/api/outreach/book", json=payload)).status_code == 201
    assert len(db.leads.documents) == outreach_public.BOOKINGS_PER_TOKEN_PER_DAY
    assert len(quiet_notifications) == outreach_public.BOOKINGS_PER_TOKEN_PER_DAY


async def test_the_form_can_never_choose_who_gets_emailed(client, db, prospect,
                                                          quiet_notifications):
    await db.prospects.insert_one(prospect)
    await client.post("/api/outreach/book", json={
        "token": TOKEN, "name": "Maria Lopez", "phone": "310-555-0142",
        "email": "victim@elsewhere.example"})
    await client.post("/api/outreach/book", json={
        "name": "No Token", "phone": "310-555-0143", "email": "victim@elsewhere.example"})
    with_token, without_token = db.leads.documents
    assert with_token["email"] == prospect["contact_email"]
    assert without_token["email"] == ""
    assert all("victim" not in json.dumps(lead) for lead in quiet_notifications)


@pytest.mark.parametrize("status", ["converted", "unsubscribed", "bounced"])
async def test_a_booking_does_not_erase_a_final_outcome(client, db, prospect,
                                                        quiet_notifications, status):
    await db.prospects.insert_one({**prospect, "outreach_status": status})
    await client.post("/api/outreach/book", json={
        "token": TOKEN, "name": "Maria Lopez", "phone": "310-555-0142"})
    stored = await db.prospects.find_one({"id": "p1"})
    assert stored["outreach_status"] == status and stored["booked_at"]
    assert len(db.leads.documents) == 1   # the request itself is still recorded


async def test_a_late_bounce_does_not_erase_a_booking(db, prospect):
    from app.models.prospect import OutreachStatus
    await db.prospects.insert_one({**prospect, "outreach_status": "meeting_scheduled"})
    await seq.stop_sequence("p1", OutreachStatus.bounced)
    assert (await db.prospects.find_one({"id": "p1"}))["outreach_status"] == "meeting_scheduled"


async def test_unsubscribe_covers_every_address_that_was_written_to(client, db, prospect):
    await db.prospects.insert_one({**prospect, "outreach_status": "email_sent"})
    await db.outreach.insert_one({"id": "o1", "prospect_id": "p1", "status": "sent",
                                  "to_email": "old.manager@sunsetvillas.example"})
    await client.post(f"/api/outreach/unsubscribe/{TOKEN}")
    assert await seq.is_suppressed("old.manager@sunsetvillas.example")
    assert await seq.is_suppressed(prospect["contact_email"])


async def test_shared_mail_provider_addresses_can_unsubscribe_many_people(client, db):
    codes = {(await client.post("/api/outreach/unsubscribe/tok_unknown_0000000000")).status_code
             for _ in range(60)}
    assert codes == {200}


# ── Webhook ───────────────────────────────────────────────────────────

SECRET_BYTES = b"super-secret-signing-key"
SECRET = "whsec_" + base64.b64encode(SECRET_BYTES).decode()


def _signed(payload: dict):
    body = json.dumps(payload).encode()
    timestamp = str(int(time.time()))
    digest = hmac.new(SECRET_BYTES, f"msg_1.{timestamp}.".encode() + body, hashlib.sha256).digest()
    return body, {"svix-id": "msg_1", "svix-timestamp": timestamp,
                  "svix-signature": "v1," + base64.b64encode(digest).decode(),
                  "Content-Type": "application/json"}


@pytest.fixture
def webhook_secret():
    object.__setattr__(webhooks.get_settings(), "RESEND_WEBHOOK_SECRET", SECRET)


def test_a_non_ascii_signature_is_rejected_not_an_error():
    now = time.time()
    assert webhooks.verify_svix_signature(SECRET, "msg_1", str(int(now)), "v1,é", b"{}", now) is False
    assert webhooks.verify_svix_signature(SECRET, "msg_1", "é", "v1,x", b"{}", now) is False
    assert webhooks.verify_svix_signature("whsec_!!!", "msg_1", str(int(now)), "v1,x", b"{}", now) is False


async def test_an_oversized_webhook_is_refused_before_it_is_read(client, webhook_secret):
    big = b"x" * (webhooks.MAX_BODY_BYTES + 1)
    response = await client.post("/api/webhooks/resend", content=big,
                                 headers={"svix-id": "m", "svix-timestamp": "1", "svix-signature": "v1,x"})
    assert response.status_code == 413


async def test_a_signed_event_cannot_inject_a_query_operator(client, db, prospect, webhook_secret):
    await db.prospects.insert_one({**prospect, "outreach_status": "email_sent"})
    await db.outreach.insert_one({"id": "o1", "prospect_id": "p1", "provider_id": "re_1",
                                  "to_email": prospect["contact_email"], "status": "sent"})
    body, headers = _signed({"type": "email.bounced",
                             "data": {"email_id": {"$ne": None}, "tags": {"prospect_id": {"$ne": None}}}})
    response = await client.post("/api/webhooks/resend", content=body, headers=headers)
    assert response.status_code == 200
    assert (await db.prospects.find_one({"id": "p1"}))["outreach_status"] == "email_sent"


# ── Admin data handling ───────────────────────────────────────────────

@pytest.mark.parametrize("website", ["javascript:alert(1)", "file:///etc/passwd",
                                     "data:text/html,x", "https://exa mple.com"])
def test_only_web_addresses_are_accepted_as_a_website(website):
    with pytest.raises(ValueError):
        ProspectCreate(business_name="X", business_category="gym", website=website)
    with pytest.raises(ValueError):
        ProspectUpdate(website=website)


def test_a_bare_domain_becomes_an_https_address():
    saved = ProspectCreate(business_name="X", business_category="gym", website=" acme.com/contact ")
    assert saved.website == "https://acme.com/contact"
    assert ProspectCreate(business_name="X", business_category="gym", website="").website is None


async def test_a_wrong_contact_can_be_cleared(client, db, prospect):
    await db.prospects.insert_one({**prospect, "notes": "old note", "contact_email_confirmed": True})
    body = (await client.patch("/api/lead-scanner/prospects/p1",
                               json={"contact_email": None, "notes": ""})).json()
    assert body["contact_email"] is None and body["notes"] is None
    assert body["contact_email_confirmed"] is False
    # A field that was not sent is left alone.
    assert body["contact_name"] == "Maria Lopez"


async def test_enrichment_does_not_overwrite_a_contact_typed_while_it_ran(
        client, db, prospect, monkeypatch):
    await db.prospects.insert_one({**prospect, "contact_email": None, "contact_name": None})

    async def slow_find(website, name, phone):
        # A person fills in the contact while the website is being read.
        await db.prospects.update_one({"id": "p1"}, {"$set": {
            "contact_email": "typed@sunsetvillas.example", "contact_name": "Typed By Hand"}})
        return {"emails": [{"email": "gm@sunsetvillas.example", "source": "homepage",
                            "confidence": 90, "grade": "named"}],
                "best": {"email": "gm@sunsetvillas.example", "grade": "named"},
                "domain": "sunsetvillas.example", "mx_valid": True, "contacts": [],
                "top_contact_name": "Found Online", "top_contact_title": "Manager",
                "pages_scraped": 2}

    monkeypatch.setattr(lead_scanner, "find_emails_for_business", slow_find)
    await client.post("/api/lead-scanner/find-emails/p1")
    stored = await db.prospects.find_one({"id": "p1"})
    assert stored["contact_email"] == "typed@sunsetvillas.example"
    assert stored["contact_name"] == "Typed By Hand"


async def test_two_prospects_without_a_place_id_can_both_be_saved(client, db, monkeypatch):
    async def no_enrich(_id):
        return None

    monkeypatch.setattr(lead_scanner, "_background_enrich", no_enrich)
    for name in ("First", "Second"):
        response = await client.post("/api/lead-scanner/prospects",
                                     json={"business_name": name, "business_category": "gym"})
        assert response.status_code == 201
    assert all("place_id" not in doc for doc in db.prospects.documents)


async def test_next_touch_sort_lists_only_scheduled_prospects(client, db, prospect):
    await db.prospects.insert_one({**prospect, "next_touch_at": "2026-12-02T00:00:00"})
    await db.prospects.insert_one({**prospect, "id": "p2", "next_touch_at": None,
                                   "public_token": "tok_2222222222222222"})
    await db.prospects.insert_one({**prospect, "id": "p3", "next_touch_at": "2026-12-01T00:00:00",
                                   "public_token": "tok_3333333333333333"})
    rows = (await client.get("/api/lead-scanner/prospects?sort=next_touch")).json()
    assert [row["id"] for row in rows] == ["p3", "p1"]
