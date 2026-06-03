import pytest
from unittest.mock import AsyncMock, patch
from fastapi import FastAPI
from httpx import AsyncClient, ASGITransport
from app.routers import reviews


@pytest.fixture
def app():
    a = FastAPI()
    a.include_router(reviews.router, prefix="/api")
    return a


@pytest.mark.asyncio
async def test_get_feedback_token_marks_clicked(app, monkeypatch):
    monkeypatch.setattr(reviews.review_engine, "mark_clicked",
                        AsyncMock(return_value={"customer_name": "Jane", "status": "clicked"}))
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        r = await ac.get("/api/reviews/feedback/tok123")
    assert r.status_code == 200
    assert r.json()["customer_name"] == "Jane"


@pytest.mark.asyncio
async def test_get_feedback_unknown_token_404(app, monkeypatch):
    monkeypatch.setattr(reviews.review_engine, "mark_clicked", AsyncMock(return_value=None))
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        r = await ac.get("/api/reviews/feedback/nope")
    assert r.status_code == 404


@pytest.mark.asyncio
async def test_post_feedback_routes_google(app, monkeypatch):
    monkeypatch.setattr(reviews.review_engine, "record_feedback",
                        AsyncMock(return_value={"route": "google", "google_review_url": "https://g"}))
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        r = await ac.post("/api/reviews/feedback/tok", json={"rating": 5})
    assert r.status_code == 200
    assert r.json()["route"] == "google"
