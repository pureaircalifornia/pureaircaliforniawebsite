import pytest
from unittest.mock import AsyncMock, patch
from app.services import review_engine


@pytest.mark.asyncio
async def test_create_and_send_inserts_and_sends(monkeypatch):
    inserted = {}
    fake_col = AsyncMock()
    async def fake_insert(doc): inserted.update(doc)
    fake_col.find_one = AsyncMock(return_value=None)  # no existing request
    fake_col.insert_one = AsyncMock(side_effect=fake_insert)
    fake_col.update_one = AsyncMock()
    monkeypatch.setattr(review_engine, "get_review_requests_collection", lambda: fake_col)

    sent = {}
    class FakeChannel:
        async def send(self, email, subject, html, phone, settings):
            sent["email"] = email; sent["html"] = html; return True
    monkeypatch.setattr(review_engine, "get_channel", lambda s: FakeChannel())

    appointment = {"_id": "a1", "customer_id": "c1"}
    customer = {"_id": "c1", "first_name": "Jane", "last_name": "Doe",
                "email": "jane@x.com", "phone": "3105551212"}
    req = await review_engine.create_and_send(appointment, customer)

    assert inserted["appointment_id"] == "a1"
    assert sent["email"] == "jane@x.com"
    assert "/feedback/" in sent["html"]
    assert req["status"] == "sent"


@pytest.mark.asyncio
async def test_create_and_send_is_idempotent(monkeypatch):
    fake_col = AsyncMock()
    fake_col.find_one = AsyncMock(return_value={"id": "existing", "appointment_id": "a1"})
    monkeypatch.setattr(review_engine, "get_review_requests_collection", lambda: fake_col)
    res = await review_engine.create_and_send({"_id": "a1", "customer_id": "c1"},
                                              {"email": "j@x.com", "first_name": "J"})
    assert res is None  # already exists, no duplicate


@pytest.mark.asyncio
async def test_record_feedback_high_rating_returns_google_url(monkeypatch):
    fake_col = AsyncMock()
    fake_col.find_one = AsyncMock(return_value={"id": "r1", "token": "t", "status": "clicked",
                                                "customer_name": "J", "customer_email": "j@x.com"})
    fake_col.update_one = AsyncMock()
    monkeypatch.setattr(review_engine, "get_review_requests_collection", lambda: fake_col)
    monkeypatch.setattr(review_engine, "_notify_owner_of_feedback", AsyncMock())
    out = await review_engine.record_feedback("t", rating=5, private_feedback=None)
    assert out["route"] == "google"
    assert out["google_review_url"]


@pytest.mark.asyncio
async def test_record_feedback_low_rating_routes_private(monkeypatch):
    fake_col = AsyncMock()
    fake_col.find_one = AsyncMock(return_value={"id": "r1", "token": "t", "status": "clicked",
                                                "customer_name": "J", "customer_email": "j@x.com"})
    fake_col.update_one = AsyncMock()
    notify = AsyncMock()
    monkeypatch.setattr(review_engine, "get_review_requests_collection", lambda: fake_col)
    monkeypatch.setattr(review_engine, "_notify_owner_of_feedback", notify)
    out = await review_engine.record_feedback("t", rating=2, private_feedback="late")
    assert out["route"] == "private"
    notify.assert_awaited_once()
