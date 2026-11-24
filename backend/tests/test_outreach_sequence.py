from datetime import datetime, timedelta

import pytest

from app.services import email_outreach, outreach_sequence as seq
from app.services.outreach_composer import TOTAL_STEPS

MONDAY_10AM_PT = datetime(2026, 11, 23, 18, 0)   # Monday 10:00 in Los Angeles
SATURDAY_10AM_PT = datetime(2026, 11, 21, 18, 0)
MONDAY_6AM_PT = datetime(2026, 11, 23, 14, 0)


@pytest.fixture
def sent(monkeypatch):
    """Capture outgoing email instead of sending it."""
    calls = []

    async def fake_send(**kwargs):
        calls.append(kwargs)
        return {"success": True, "dry_run": False, "provider_id": f"re_{len(calls)}",
                "message": "Email sent."}

    async def no_sleep(_seconds):
        return None

    monkeypatch.setattr(seq, "send_email", fake_send)
    monkeypatch.setattr(seq.asyncio, "sleep", no_sleep)
    # The runner refuses to run without a provider; send_email itself is faked.
    object.__setattr__(seq.get_settings(), "RESEND_API_KEY", "re_test")
    return calls


# ── Scheduling ────────────────────────────────────────────────────────

def test_follow_ups_land_on_day_3_7_and_14():
    start = datetime(2026, 11, 23, 18, 0)  # Monday
    first = seq.next_touch_at(0, start)
    second = seq.next_touch_at(1, first)
    third = seq.next_touch_at(2, second)
    assert (first - start).days == 3
    assert (second - start).days == 7
    assert (third - start).days == 14
    assert seq.next_touch_at(TOTAL_STEPS - 1, third) is None


def test_a_touch_due_on_a_weekend_moves_to_monday():
    thursday = datetime(2026, 11, 26, 18, 0)
    due = seq.next_touch_at(0, thursday)  # +3 days = Sunday
    assert due.weekday() == 0


@pytest.mark.parametrize("moment,expected", [
    (MONDAY_10AM_PT, True), (SATURDAY_10AM_PT, False), (MONDAY_6AM_PT, False),
    (datetime(2026, 11, 24, 0, 30), False),  # Monday 4:30pm PT, after the window
])
def test_send_window_is_weekday_business_hours_in_los_angeles(moment, expected):
    assert seq.in_send_window(moment, "America/Los_Angeles", 8, 16) is expected


# ── Send gate ─────────────────────────────────────────────────────────

async def test_a_published_address_may_be_sent_to(db, prospect):
    assert await seq.check_sendable(prospect, prospect["contact_email"]) is None


@pytest.mark.parametrize("status", ["not_interested", "bounced", "unsubscribed"])
async def test_opted_out_prospects_are_never_emailed(db, prospect, status):
    reason = await seq.check_sendable({**prospect, "outreach_status": status},
                                      prospect["contact_email"])
    assert reason and "not be emailed again" in reason


async def test_suppression_follows_the_address_not_the_record(db, prospect):
    await seq.suppress("Maria@SunsetVillas.example", "unsubscribed")
    await seq.suppress("maria@sunsetvillas.example", "again")  # idempotent
    assert len(db.outreach_suppressions.documents) == 1
    other_record = {**prospect, "id": "p2"}
    assert "do-not-contact" in await seq.check_sendable(other_record, prospect["contact_email"])


async def test_a_guessed_address_is_blocked_until_a_person_confirms_it(db, prospect):
    guess = "info@sunsetvillas.example"
    guessed = {**prospect, "contact_email": guess,
               "found_emails": [{"email": guess, "source": "pattern guess"}]}
    assert "guess" in await seq.check_sendable(guessed, guess)
    assert await seq.check_sendable({**guessed, "contact_email_confirmed": True}, guess) is None


async def test_a_dead_mailbox_is_blocked_even_when_typed_in(db, prospect):
    assert await seq.check_sendable(
        {**prospect, "contact_email_confirmed": True, "contact_email": "noreply@x.com"},
        "noreply@x.com") is not None


async def test_a_management_company_address_on_another_domain_is_allowed(db, prospect):
    assert await seq.check_sendable(prospect, "jane@bigmanagementco.example") is None


async def test_daily_limit_blocks_further_sends(db, prospect, monkeypatch):
    settings = seq.get_settings()
    object.__setattr__(settings, "OUTREACH_DAILY_LIMIT", 2)
    now = seq.utcnow().isoformat()
    for index in range(2):
        await db.outreach.insert_one({"id": str(index), "sent_at": now, "status": "sent"})
    await db.outreach.insert_one({"id": "old", "status": "sent",
                                  "sent_at": (seq.utcnow() - timedelta(days=2)).isoformat()})
    await db.outreach.insert_one({"id": "f", "sent_at": now, "status": "failed"})
    await db.outreach.insert_one({"id": "d", "sent_at": now, "status": "sent", "dry_run": True})
    assert await seq.emails_sent_last_24h() == 2
    assert "Daily limit" in await seq.check_sendable(prospect, prospect["contact_email"])


# ── Delivery ──────────────────────────────────────────────────────────

async def test_first_send_records_the_email_and_schedules_the_next_touch(db, prospect, sent):
    await db.prospects.insert_one(prospect)
    result, record = await seq.deliver_touch(
        prospect, to_email=prospect["contact_email"], subject="s", body="b", step=0,
        template_id="hoa.s0.v1", variant=1, sent_by="lou@example.com")

    assert result["success"] and record["status"] == "sent"
    assert sent[0]["unsubscribe_token"] == prospect["public_token"]
    stored = await db.prospects.find_one({"id": "p1"})
    assert stored["outreach_status"] == "email_sent"
    assert stored["emails_sent"] == 1 and stored["sequence_step"] == 1
    assert stored["sequence_status"] == "active" and stored["next_touch_at"]
    saved = await db.outreach.find_one({"prospect_id": "p1"})
    assert saved["provider_id"] == "re_1" and saved["template_id"] == "hoa.s0.v1"
    assert saved["step"] == 0 and saved["business_category"] == "hoa"


async def test_a_follow_up_does_not_pull_an_engaged_prospect_back_down(db, prospect, sent):
    engaged = {**prospect, "outreach_status": "link_clicked", "sequence_step": 1}
    await db.prospects.insert_one(engaged)
    await seq.deliver_touch(engaged, to_email=engaged["contact_email"],
                            subject="s", body="b", step=1)
    assert (await db.prospects.find_one({"id": "p1"}))["outreach_status"] == "link_clicked"


async def test_the_last_touch_completes_the_sequence(db, prospect, sent):
    await db.prospects.insert_one(prospect)
    await seq.deliver_touch(prospect, to_email=prospect["contact_email"],
                            subject="s", body="b", step=TOTAL_STEPS - 1)
    stored = await db.prospects.find_one({"id": "p1"})
    assert stored["sequence_status"] == "completed" and stored["next_touch_at"] is None


async def test_one_off_send_does_not_start_automation(db, prospect, sent):
    await db.prospects.insert_one(prospect)
    await seq.deliver_touch(prospect, to_email=prospect["contact_email"], subject="s",
                            body="b", step=0, continue_sequence=False)
    stored = await db.prospects.find_one({"id": "p1"})
    assert stored["sequence_status"] == "paused" and stored["next_touch_at"] is None


async def test_a_failed_send_is_recorded_and_not_counted_as_contact(db, prospect, monkeypatch):
    async def failing(**kwargs):
        return {"success": False, "dry_run": False, "provider_id": None, "message": "no"}

    monkeypatch.setattr(seq, "send_email", failing)
    await db.prospects.insert_one(prospect)
    result, record = await seq.deliver_touch(
        prospect, to_email=prospect["contact_email"], subject="s", body="b", step=0)
    stored = await db.prospects.find_one({"id": "p1"})
    assert not result["success"] and record["status"] == "failed"
    assert stored["emails_sent"] == 0 and stored["outreach_status"] == "not_contacted"


# ── Runner ────────────────────────────────────────────────────────────

def _queued(prospect, **overrides):
    return {**prospect, "sequence_status": "active",
            "next_touch_at": (MONDAY_10AM_PT - timedelta(hours=1)).isoformat(), **overrides}


async def test_runner_sends_the_due_touch_with_the_right_copy(db, prospect, sent):
    await db.prospects.insert_one(_queued(prospect, sequence_step=1, outreach_status="email_sent"))
    summary = await seq.run_due_touches(MONDAY_10AM_PT)
    assert summary["sent"] == 1
    assert "How does the association decide" in sent[0]["body"]   # touch 2 = calibrated question
    assert (await db.prospects.find_one({"id": "p1"}))["sequence_step"] == 2
    assert (await db.outreach.find_one({"prospect_id": "p1"}))["automated"] is True


async def test_runner_does_nothing_outside_the_window(db, prospect, sent):
    await db.prospects.insert_one(_queued(prospect))
    for moment in (SATURDAY_10AM_PT, MONDAY_6AM_PT):
        summary = await seq.run_due_touches(moment)
        assert summary["sent"] == 0 and "window" in summary["message"]
    assert sent == []


async def test_runner_skips_prospects_not_yet_due(db, prospect, sent):
    later = (MONDAY_10AM_PT + timedelta(days=2)).isoformat()
    await db.prospects.insert_one(_queued(prospect, next_touch_at=later))
    assert (await seq.run_due_touches(MONDAY_10AM_PT))["processed"] == 0


@pytest.mark.parametrize("status", ["replied", "interested", "meeting_scheduled",
                                    "not_interested", "bounced", "unsubscribed", "converted"])
async def test_runner_stops_once_someone_has_answered_or_opted_out(db, prospect, sent, status):
    await db.prospects.insert_one(_queued(prospect, sequence_step=1, outreach_status=status))
    summary = await seq.run_due_touches(MONDAY_10AM_PT)
    stored = await db.prospects.find_one({"id": "p1"})
    assert sent == [] and summary["stopped"] == 1
    assert stored["sequence_status"] == "stopped" and stored["outreach_status"] == status


async def test_runner_stops_for_a_suppressed_address(db, prospect, sent):
    await seq.suppress(prospect["contact_email"], "unsubscribed")
    await db.prospects.insert_one(_queued(prospect))
    await seq.run_due_touches(MONDAY_10AM_PT)
    assert sent == []
    assert (await db.prospects.find_one({"id": "p1"}))["sequence_status"] == "stopped"


async def test_runner_respects_the_daily_limit(db, prospect, sent):
    settings = seq.get_settings()
    object.__setattr__(settings, "OUTREACH_DAILY_LIMIT", 2)
    for index in range(5):
        await db.prospects.insert_one(_queued(
            prospect, id=f"p{index}", contact_email=f"person{index}@biz{index}.example",
            found_emails=[], public_token=f"tok_{index:016d}"))
    summary = await seq.run_due_touches(MONDAY_10AM_PT)
    assert summary["sent"] == 2 and len(sent) == 2


async def test_runner_never_sends_more_than_one_batch(db, prospect, sent):
    for index in range(seq.BATCH_PER_RUN + 6):
        await db.prospects.insert_one(_queued(
            prospect, id=f"p{index}", contact_email=f"person{index}@biz{index}.example",
            found_emails=[], public_token=f"tok_{index:016d}"))
    summary = await seq.run_due_touches(MONDAY_10AM_PT)
    assert summary["sent"] == seq.BATCH_PER_RUN


# ── Engagement ────────────────────────────────────────────────────────

async def test_tracking_events_only_move_status_upward(db, prospect):
    from app.models.prospect import OutreachStatus
    await db.prospects.insert_one({**prospect, "outreach_status": "email_sent"})
    stored = await db.prospects.find_one({"id": "p1"})
    await seq.mark_engaged(stored, OutreachStatus.link_clicked, "clicked_at")
    stored = await db.prospects.find_one({"id": "p1"})
    assert stored["outreach_status"] == "link_clicked" and stored["clicked_at"]

    await seq.mark_engaged(stored, OutreachStatus.email_opened, "opened_at")
    stored = await db.prospects.find_one({"id": "p1"})
    assert stored["outreach_status"] == "link_clicked" and stored["opened_at"]

    await db.prospects.update_one({"id": "p1"}, {"$set": {"outreach_status": "replied"}})
    stored = await db.prospects.find_one({"id": "p1"})
    await seq.mark_engaged(stored, OutreachStatus.link_clicked, "clicked_at")
    assert (await db.prospects.find_one({"id": "p1"}))["outreach_status"] == "replied"


# ── Rendering ─────────────────────────────────────────────────────────

def test_footer_carries_postal_address_and_unsubscribe_link():
    footer = email_outreach.footer_text("tok_abcdefghijklmnop")
    assert "PO Box 3842, Valley Village, CA 91617" in footer
    assert "https://www.pureaircalifornia.com/unsubscribe/?t=tok_abcdefghijklmnop" in footer


def test_one_click_unsubscribe_headers():
    headers = email_outreach.list_unsubscribe_headers("tok_abcdefghijklmnop")
    assert "/outreach/unsubscribe/tok_abcdefghijklmnop>" in headers["List-Unsubscribe"]
    assert "mailto:" in headers["List-Unsubscribe"]
    assert headers["List-Unsubscribe-Post"] == "List-Unsubscribe=One-Click"


def test_html_part_escapes_markup_and_links_only_urls():
    html = email_outreach.render_html("Hi <b>Maria</b>\nBook: https://x.example/a?t=1&u=2", "footer")
    assert "<b>" not in html and "&lt;b&gt;" in html
    assert '<a href="https://x.example/a?t=1&amp;u=2">' in html
    assert "<img" not in html and "<script" not in html


def test_legacy_br_markup_becomes_plain_text():
    assert email_outreach.to_plain_text("Hi<br>there<br/><b>x</b>") == "Hi\nthere\nx"


async def test_without_a_provider_nothing_is_sent(monkeypatch):
    settings = email_outreach.get_settings()
    object.__setattr__(settings, "RESEND_API_KEY", None)
    object.__setattr__(settings, "SENDGRID_API_KEY", None)
    result = await email_outreach.send_email("a@b.co", "A", "s", "b")
    assert result["dry_run"] is True and result["provider_id"] is None


async def test_resend_payload_is_plain_tagged_and_header_safe(monkeypatch):
    import resend

    captured = {}
    monkeypatch.setattr(resend.Emails, "send", lambda payload: captured.update(payload) or {"id": "re_9"})
    settings = email_outreach.get_settings()
    object.__setattr__(settings, "RESEND_API_KEY", "re_test")
    result = await email_outreach.send_email(
        "maria@x.example", "Maria", "hello\r\nBcc: evil@x.example", "Body text",
        unsubscribe_token="tok_abcdefghijklmnop", prospect_id="p1", template_id="hoa.s0.v1",
        attachments=[{"filename": "w9.pdf", "content_base64": "QQ==", "content_type": "application/pdf"}])

    assert result == {"success": True, "dry_run": False, "provider_id": "re_9", "message": "Email sent."}
    assert "\r" not in captured["subject"] and "\n" not in captured["subject"]
    assert captured["from"] == "Lou at Pure Air California <lou@pureaircalifornia.com>"
    assert captured["text"].startswith("Body text") and "PO Box 3842" in captured["text"]
    assert captured["headers"]["List-Unsubscribe-Post"] == "List-Unsubscribe=One-Click"
    assert {"name": "prospect_id", "value": "p1"} in captured["tags"]
    assert {"name": "template", "value": "hoa_s0_v1"} in captured["tags"]
    assert captured["attachments"] == [{"filename": "w9.pdf", "content": "QQ=="}]
