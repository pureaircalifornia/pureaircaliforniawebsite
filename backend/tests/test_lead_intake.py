"""Lead-intake contract tests: fake Mongo and email only, no external services."""

import asyncio
import copy
from types import SimpleNamespace
from unittest.mock import AsyncMock
from uuid import uuid4

import pytest
from fastapi import BackgroundTasks, FastAPI, HTTPException, Request
from httpx import ASGITransport, AsyncClient
from pydantic import ValidationError
from pymongo.errors import AutoReconnect, DuplicateKeyError

from app.models.lead import LeadCreate
from app.routers import leads


class FakeLeads:
    """Model Mongo's durable unique _id constraint independently of route state."""

    def __init__(self):
        self.documents = {}
        self.lock = asyncio.Lock()
        self.fail_insert = False

    async def insert_one(self, document):
        await asyncio.sleep(0)
        if self.fail_insert:
            raise AutoReconnect("simulated database failure")
        async with self.lock:
            if document["_id"] in self.documents:
                raise DuplicateKeyError("duplicate _id")
            self.documents[document["_id"]] = copy.deepcopy(document)
        return SimpleNamespace(inserted_id=document["_id"])

    async def find_one(self, query, projection=None):
        result = self.documents.get(query["_id"])
        if result is None:
            return None
        if projection:
            return {key: copy.deepcopy(result[key]) for key in projection if key in result}
        return copy.deepcopy(result)


@pytest.fixture
def intake(monkeypatch):
    store = FakeLeads()
    notify = AsyncMock()
    leads._rate_limit_store.clear()
    monkeypatch.setattr(leads, "get_leads_collection", lambda: store)
    monkeypatch.setattr(leads, "send_lead_notifications", notify)
    request = Request({"type": "http", "client": ("127.0.0.1", 9000), "headers": []})
    yield store, notify, request
    leads._rate_limit_store.clear()


def payload(**updates):
    data = {
        "submission_id": str(uuid4()), "name": "Local QA", "email": "qa@example.com",
        "phone": "2025550142", "source": "quote_form", "estimated_price": 650.0,
        "attribution": {
            "utm_source": "google", "utm_medium": "cpc", "utm_campaign": "LA Search",
            "gclid": "fixture-click-id", "landing_path": "/services/residential-air-duct-cleaning/",
            "captured_at": "2026-10-12T18:00:00Z", "ad_measurement_consent": True,
        },
    }
    return {**data, **updates}


@pytest.mark.asyncio
async def test_persisted_receipt_is_minimal_json_before_notifications(intake):
    store, notify, request = intake
    tasks = BackgroundTasks()
    data = LeadCreate(**payload())
    receipt = await leads.create_lead(data, request, tasks)
    assert set(receipt.model_dump(mode="json")) == {"accepted", "submission_id", "id"}
    assert receipt.accepted is True
    document = next(iter(store.documents.values()))
    assert document["status"] == "new"
    assert document["estimated_price"] == 650.0
    assert document["attribution"]["gclid"] == "fixture-click-id"
    assert isinstance(document["created_at"], str)
    assert document["submission_id"] == str(data.submission_id)
    notify.assert_not_awaited()
    assert len(tasks.tasks) == 1
    await tasks()
    notify.assert_awaited_once()
    assert "_id" not in notify.call_args.args[0]
    assert "submission_fingerprint" not in notify.call_args.args[0]


@pytest.mark.asyncio
async def test_concurrent_identical_retries_persist_and_notify_once(intake):
    store, notify, request = intake
    data = LeadCreate(**payload())
    tasks = [BackgroundTasks(), BackgroundTasks()]
    first, second = await asyncio.gather(*(
        leads.create_lead(data, request, task) for task in tasks
    ))
    assert first == second
    assert len(store.documents) == 1
    assert sum(len(task.tasks) for task in tasks) == 1
    await asyncio.gather(*(task() for task in tasks))
    notify.assert_awaited_once()
    # Simulate process-local limiter state disappearing; persistence still deduplicates.
    leads._rate_limit_store.clear()
    retry_tasks = BackgroundTasks()
    assert await leads.create_lead(data, request, retry_tasks) == first
    assert not retry_tasks.tasks


@pytest.mark.asyncio
async def test_reused_id_with_changed_person_fails_closed_without_pii(intake):
    store, notify, request = intake
    original = payload()
    first_tasks = BackgroundTasks()
    await leads.create_lead(LeadCreate(**original), request, first_tasks)
    changed = LeadCreate(**{**original, "email": "different@example.com"})
    retry_tasks = BackgroundTasks()
    with pytest.raises(HTTPException) as error:
        await leads.create_lead(changed, request, retry_tasks)
    assert error.value.status_code == 409
    assert "qa@example.com" not in error.value.detail
    assert "different@example.com" not in error.value.detail
    assert len(store.documents) == 1
    assert not retry_tasks.tasks
    notify.assert_not_awaited()


@pytest.mark.asyncio
async def test_insert_failure_has_no_receipt_or_notification(intake):
    store, notify, request = intake
    store.fail_insert = True
    tasks = BackgroundTasks()
    with pytest.raises(HTTPException) as error:
        await leads.create_lead(LeadCreate(**payload()), request, tasks)
    assert error.value.status_code == 503
    assert not store.documents
    assert not tasks.tasks
    notify.assert_not_awaited()


@pytest.mark.asyncio
async def test_http_receipt_serializes_without_mongo_id(intake):
    store, notify, _ = intake
    app = FastAPI()
    app.include_router(leads.router, prefix="/api")
    data = payload()
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        first = await client.post("/api/leads", json=data)
        retry = await client.post("/api/leads", json=data)
    assert first.status_code == retry.status_code == 201
    assert first.json() == retry.json()
    assert set(first.json()) == {"accepted", "submission_id", "id"}
    assert len(store.documents) == 1
    notify.assert_awaited_once()


@pytest.mark.asyncio
async def test_legacy_client_without_submission_id_still_receives_receipt(intake):
    store, notify, _ = intake
    app = FastAPI()
    app.include_router(leads.router, prefix="/api")
    data = {"name": "Legacy QA", "email": "qa@example.com", "phone": "2025550142"}
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        first = await client.post("/api/leads", json=data)
        second = await client.post("/api/leads", json=data)
    assert first.status_code == second.status_code == 201
    assert first.json()["accepted"] is True
    assert first.json()["submission_id"] != second.json()["submission_id"]
    assert len(store.documents) == 2  # Legacy clients have no stable retry key.
    assert notify.await_count == 2


@pytest.mark.asyncio
async def test_http_response_is_sent_before_background_email(intake, monkeypatch):
    _, _, _ = intake
    events = []
    app = FastAPI()
    app.include_router(leads.router, prefix="/api")

    async def notify(lead):
        events.append("notification")

    async def observe_app(scope, receive, send):
        async def observe_send(message):
            await send(message)
            if message["type"] == "http.response.body" and not message.get("more_body", False):
                events.append("response_complete")
        await app(scope, receive, observe_send)

    monkeypatch.setattr(leads, "send_lead_notifications", notify)
    async with AsyncClient(transport=ASGITransport(app=observe_app), base_url="http://test") as client:
        response = await client.post("/api/leads", json=payload())
    assert response.status_code == 201
    assert events == ["response_complete", "notification"]


@pytest.mark.asyncio
async def test_duplicate_lookup_failure_has_no_new_notification(intake, monkeypatch):
    store, notify, request = intake
    data = LeadCreate(**payload())
    await leads.create_lead(data, request, BackgroundTasks())
    monkeypatch.setattr(store, "find_one", AsyncMock(side_effect=AutoReconnect("unavailable")))
    tasks = BackgroundTasks()
    with pytest.raises(HTTPException) as error:
        await leads.create_lead(data, request, tasks)
    assert error.value.status_code == 503
    assert len(store.documents) == 1
    assert not tasks.tasks
    notify.assert_not_awaited()


@pytest.mark.asyncio
async def test_existing_rate_limit_is_retained(intake):
    store, notify, request = intake
    for _ in range(5):
        await leads.create_lead(LeadCreate(**payload()), request, BackgroundTasks())
    with pytest.raises(HTTPException) as error:
        await leads.create_lead(LeadCreate(**payload()), request, BackgroundTasks())
    assert error.value.status_code == 429
    assert len(store.documents) == 5
    notify.assert_not_awaited()


@pytest.mark.parametrize("changes", [
    {"submission_id": "not-a-uuid"},
    {"name": " "},
    {"estimated_price": -1},
    {"estimated_price": float("nan")},
    {"estimated_price": float("inf")},
    {"estimated_price": 10000001},
    {"unexpected": "unallowlisted"},
    {"attribution": {"ad_measurement_consent": True, "email": "private@example.com"}},
    {"attribution": {"gclid": "no-consent"}},
    {"attribution": {"utm_source": "no-consent"}},
    {"attribution": {"ad_measurement_consent": "true"}},
    {"attribution": {"ad_measurement_consent": True, "gclid": "x" * 513}},
    {"attribution": {"ad_measurement_consent": True, "utm_source": "x\nspoof"}},
    {"attribution": {"landing_path": "https://example.com/path"}},
    {"attribution": {"landing_path": "//example.com/path"}},
    {"attribution": {"landing_path": "/quote/?email=private@example.com"}},
    {"attribution": {"landing_path": "/quote/#private"}},
    {"attribution": {"captured_at": "2026-10-12T18:00:00"}},
])
def test_invalid_intake_is_rejected_before_persistence(changes):
    with pytest.raises(ValidationError):
        LeadCreate(**payload(**changes))


def test_unattributed_lead_does_not_require_advertising_consent():
    data = LeadCreate(**payload(attribution=None))
    assert data.attribution is None


def test_database_and_jwt_settings_remain_required(monkeypatch):
    from app.config import Settings

    monkeypatch.delenv("MONGO_URL", raising=False)
    monkeypatch.delenv("JWT_SECRET_KEY", raising=False)
    monkeypatch.delenv("OWNER_NOTIFY_EMAIL", raising=False)
    with pytest.raises(ValidationError) as error:
        Settings(_env_file=None)
    missing = {item["loc"][0] for item in error.value.errors() if item["type"] == "missing"}
    assert {"MONGO_URL", "JWT_SECRET_KEY"} <= missing
    config = Settings(MONGO_URL="mongodb://127.0.0.1:1/test", JWT_SECRET_KEY="test-only", _env_file=None)
    assert config.OWNER_NOTIFY_EMAIL is None
