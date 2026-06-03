# Local SEO Domination — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the fastest high-ROI local-SEO + conversion wins for Pure Air California: an automated review-generation engine, instant speed-to-lead notifications, a proof-led homepage, and a single-source NAP + complete LocalBusiness schema.

**Architecture:** A shared `send_transactional_email` helper (SendGrid) powers two best-effort, non-blocking flows: (1) review requests fired when an appointment is marked COMPLETED, routing customers through a tokenized `/feedback/:token` page to Google; (2) speed-to-lead auto-reply + owner alert fired on website form submit. A frontend `business.ts` becomes the single source of truth for NAP/ratings, consumed by visible UI and JSON-LD schema. SMS is abstracted behind a channel interface but stubbed (email-first, SMS-ready).

**Tech Stack:** FastAPI + Motor (MongoDB, async), Pydantic v2, pytest (backend); React + Vite + TypeScript, Vitest, react-helmet-style SEO providers (frontend). SendGrid for email.

---

## External inputs required from owner (gather before go-live; tests use placeholders)

These do not block building/testing but are needed to actually send/rank:
- `GOOGLE_REVIEW_URL` — the GBP "leave a review" short link (`https://g.page/r/...` or `https://search.google.com/local/writereview?placeid=...`).
- `OWNER_NOTIFY_EMAIL` — where instant lead/owner alerts go.
- `SENDGRID_API_KEY` + a domain-authenticated `FROM_EMAIL` (SPF/DKIM) — already in settings; confirm it's authenticated or transactional mail lands in spam.
- Real `aggregateRating` value + count, geo lat/lng, business hours, GBP categories (for `business.ts`).

---

## File Structure

**Backend (new):**
- `backend/app/services/email_sender.py` — thin `send_transactional_email(to, subject, html, settings)` SendGrid wrapper (DRY; reused by review + lead flows).
- `backend/app/services/notification_channels.py` — `NotificationChannel` protocol + `EmailChannel` + `SmsChannelStub`; `get_channel(settings)` factory.
- `backend/app/models/review_request.py` — `ReviewRequest`, `ReviewRequestCreate`, status/channel enums, feedback DTOs.
- `backend/app/services/review_engine.py` — `create_and_send`, `record_feedback`, `get_stats`.
- `backend/app/services/lead_notifications.py` — `send_lead_notifications(lead)`.
- `backend/app/routers/reviews.py` — request/feedback/stats endpoints.
- `backend/tests/__init__.py`, `backend/tests/conftest.py`, `backend/tests/test_review_engine.py`, `backend/tests/test_reviews_router.py`, `backend/tests/test_lead_notifications.py`.

**Backend (modify):**
- `backend/app/config.py` — add `GOOGLE_REVIEW_URL`, `OWNER_NOTIFY_EMAIL`, `SMS_ENABLED`, `PUBLIC_SITE_URL`.
- `backend/app/database.py` — add `get_review_requests_collection()` + indexes.
- `backend/app/routers/appointments.py` — fire review engine in the COMPLETED branch.
- `backend/app/routers/leads.py` — fire lead notifications after insert.
- `backend/app/main.py` — register `reviews` router.

**Frontend (new):**
- `frontend/src/config/business.ts` — single source of truth (NAP, geo, hours, ratings, categories, review URL).
- `frontend/src/pages/Feedback.tsx` — tokenized public feedback/review-routing page.

**Frontend (modify):**
- `frontend/src/App.tsx` — add `/feedback/:token` route.
- `frontend/src/utils/seo/seoConfig.ts` + `frontend/src/components/SchemaMarkup.tsx` — consume `business.ts`; complete LocalBusiness schema.
- `frontend/src/components/Footer.tsx` — consume `business.ts` for NAP.
- `frontend/src/pages/EnhancedLanding.tsx` — proof-led hero line + section reorder.
- `frontend/scripts/prerender.js` — ensure `/feedback` excluded (dynamic, noindex).

**Admin (modify):**
- `admin/src/pages/DashboardPage.tsx` (or the dashboard component) — review funnel widget calling `/api/reviews/stats`.

---

## Task 1: Backend config — new settings

**Files:**
- Modify: `backend/app/config.py:53-57`

- [ ] **Step 1: Add settings fields**

In `backend/app/config.py`, after the `GOOGLE_PLACES_API_KEY` line (line 54), add:

```python
    # Google Business Profile / Reviews
    GOOGLE_REVIEW_URL: Optional[str] = None  # GBP "leave a review" link
    PUBLIC_SITE_URL: str = "https://www.pureaircalifornia.com"

    # Notifications
    OWNER_NOTIFY_EMAIL: Optional[str] = None  # instant lead/owner alerts
    SMS_ENABLED: bool = False  # email-first; flip on when Twilio is live
```

- [ ] **Step 2: Verify import**

Run: `cd backend && python -c "from app.config import get_settings; s=get_settings(); print(s.SMS_ENABLED, s.PUBLIC_SITE_URL)"`
Expected: `False https://www.pureaircalifornia.com`

- [ ] **Step 3: Commit**

```bash
git add backend/app/config.py
git commit -m "feat: add review/notification settings"
```

---

## Task 2: Email sender helper (DRY SendGrid wrapper)

**Files:**
- Create: `backend/app/services/email_sender.py`
- Create: `backend/tests/__init__.py`, `backend/tests/conftest.py`, `backend/tests/test_email_sender.py`

- [ ] **Step 1: Write the failing test**

Create `backend/tests/__init__.py` (empty). Create `backend/tests/conftest.py`:

```python
import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
```

Create `backend/tests/test_email_sender.py`:

```python
import pytest
from unittest.mock import AsyncMock, patch
from app.services.email_sender import send_transactional_email
from app.config import get_settings


@pytest.mark.asyncio
async def test_send_skips_when_no_api_key():
    settings = get_settings()
    object.__setattr__(settings, "SENDGRID_API_KEY", None)
    ok = await send_transactional_email("a@b.com", "Hi", "<p>Hi</p>", settings)
    assert ok is False


@pytest.mark.asyncio
async def test_send_posts_to_sendgrid_when_key_present():
    settings = get_settings()
    object.__setattr__(settings, "SENDGRID_API_KEY", "SG.test")
    object.__setattr__(settings, "FROM_EMAIL", "noreply@pureaircalifornia.com")
    with patch("app.services.email_sender.httpx.AsyncClient") as MockClient:
        instance = MockClient.return_value.__aenter__.return_value
        instance.post = AsyncMock(return_value=type("R", (), {"status_code": 202})())
        ok = await send_transactional_email("a@b.com", "Hi", "<p>Hi</p>", settings)
    assert ok is True
    instance.post.assert_awaited_once()
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && python -m pytest tests/test_email_sender.py -v`
Expected: FAIL — `ModuleNotFoundError: app.services.email_sender`

- [ ] **Step 3: Write minimal implementation**

Create `backend/app/services/email_sender.py`:

```python
"""
Transactional email sender (SendGrid).
Shared by review-request and lead-notification flows. Best-effort: never raises.
"""
import logging
import httpx

logger = logging.getLogger(__name__)

SENDGRID_URL = "https://api.sendgrid.com/v3/mail/send"


async def send_transactional_email(to_email: str, subject: str, html: str, settings) -> bool:
    """Send a single transactional HTML email. Returns True on accepted (2xx)."""
    if not settings.SENDGRID_API_KEY:
        logger.warning("SENDGRID_API_KEY not set; skipping email to %s", to_email)
        return False
    payload = {
        "personalizations": [{"to": [{"email": to_email}]}],
        "from": {"email": settings.FROM_EMAIL, "name": "Pure Air California"},
        "subject": subject,
        "content": [{"type": "text/html", "value": html}],
    }
    headers = {
        "Authorization": f"Bearer {settings.SENDGRID_API_KEY}",
        "Content-Type": "application/json",
    }
    try:
        async with httpx.AsyncClient(timeout=15) as client:
            resp = await client.post(SENDGRID_URL, json=payload, headers=headers)
        if 200 <= resp.status_code < 300:
            return True
        logger.error("SendGrid error %s: %s", resp.status_code, getattr(resp, "text", ""))
        return False
    except Exception as e:  # best-effort
        logger.error("Email send failed to %s: %s", to_email, e)
        return False
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && python -m pytest tests/test_email_sender.py -v`
Expected: PASS (2 passed). If `pytest-asyncio` missing: `pip install pytest pytest-asyncio` and add `asyncio_mode = auto` to `backend/pytest.ini` (`[pytest]\nasyncio_mode = auto`).

- [ ] **Step 5: Commit**

```bash
git add backend/app/services/email_sender.py backend/tests/
git commit -m "feat: add transactional email sender"
```

---

## Task 3: Notification channel abstraction (email now, SMS stub)

**Files:**
- Create: `backend/app/services/notification_channels.py`
- Create: `backend/tests/test_notification_channels.py`

- [ ] **Step 1: Write the failing test**

Create `backend/tests/test_notification_channels.py`:

```python
import pytest
from app.services.notification_channels import get_channel, EmailChannel, SmsChannelStub
from app.config import get_settings


def test_factory_returns_email_when_sms_disabled():
    s = get_settings()
    object.__setattr__(s, "SMS_ENABLED", False)
    assert isinstance(get_channel(s), EmailChannel)


def test_factory_returns_sms_stub_when_enabled():
    s = get_settings()
    object.__setattr__(s, "SMS_ENABLED", True)
    assert isinstance(get_channel(s), SmsChannelStub)


@pytest.mark.asyncio
async def test_sms_stub_returns_false_and_does_not_raise():
    s = get_settings()
    ok = await SmsChannelStub().send("+13105551212", "subject", "<p>body</p>", "555", s)
    assert ok is False
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && python -m pytest tests/test_notification_channels.py -v`
Expected: FAIL — module not found.

- [ ] **Step 3: Write minimal implementation**

Create `backend/app/services/notification_channels.py`:

```python
"""
Notification channel abstraction. Email-first, SMS-ready.
A channel sends a message to a recipient given email + phone; it picks what it needs.
"""
import logging
from typing import Protocol
from .email_sender import send_transactional_email

logger = logging.getLogger(__name__)


class NotificationChannel(Protocol):
    async def send(self, email: str, subject: str, html: str, phone: str, settings) -> bool: ...


class EmailChannel:
    async def send(self, email: str, subject: str, html: str, phone: str, settings) -> bool:
        if not email:
            return False
        return await send_transactional_email(email, subject, html, settings)


class SmsChannelStub:
    """Placeholder until Twilio creds exist. Logs and returns False; never raises."""
    async def send(self, email: str, subject: str, html: str, phone: str, settings) -> bool:
        logger.info("SMS stub: would text %s (SMS not yet enabled)", phone)
        return False


def get_channel(settings) -> NotificationChannel:
    return SmsChannelStub() if settings.SMS_ENABLED else EmailChannel()
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && python -m pytest tests/test_notification_channels.py -v`
Expected: PASS (3 passed).

- [ ] **Step 5: Commit**

```bash
git add backend/app/services/notification_channels.py backend/tests/test_notification_channels.py
git commit -m "feat: add notification channel abstraction (email/sms)"
```

---

## Task 4: ReviewRequest model

**Files:**
- Create: `backend/app/models/review_request.py`
- Create: `backend/tests/test_review_request_model.py`

- [ ] **Step 1: Write the failing test**

Create `backend/tests/test_review_request_model.py`:

```python
from app.models.review_request import ReviewRequest, ReviewStatus, ReviewChannelType, FeedbackSubmission


def test_review_request_defaults():
    r = ReviewRequest(
        id="r1", customer_id="c1", appointment_id="a1",
        customer_name="Jane", customer_email="jane@x.com", customer_phone="3105551212",
        token="tok123",
    )
    assert r.status == ReviewStatus.pending
    assert r.channel == ReviewChannelType.email
    assert r.rating is None


def test_feedback_submission_validates_rating_range():
    import pytest
    with pytest.raises(Exception):
        FeedbackSubmission(rating=6)
    fs = FeedbackSubmission(rating=5)
    assert fs.rating == 5
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && python -m pytest tests/test_review_request_model.py -v`
Expected: FAIL — module not found.

- [ ] **Step 3: Write minimal implementation**

Create `backend/app/models/review_request.py`:

```python
"""Review request models — tracks automated review solicitations."""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum


class ReviewStatus(str, Enum):
    pending = "pending"
    sent = "sent"
    clicked = "clicked"
    feedback_submitted = "feedback_submitted"
    reviewed = "reviewed"


class ReviewChannelType(str, Enum):
    email = "email"
    sms = "sms"


class ReviewRequest(BaseModel):
    id: str
    customer_id: str
    appointment_id: str
    customer_name: str
    customer_email: str
    customer_phone: str = ""
    token: str
    channel: ReviewChannelType = ReviewChannelType.email
    status: ReviewStatus = ReviewStatus.pending
    rating: Optional[int] = None
    private_feedback: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    sent_at: Optional[datetime] = None
    clicked_at: Optional[datetime] = None
    responded_at: Optional[datetime] = None


class FeedbackSubmission(BaseModel):
    rating: int = Field(..., ge=1, le=5)
    private_feedback: Optional[str] = None
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && python -m pytest tests/test_review_request_model.py -v`
Expected: PASS (2 passed).

- [ ] **Step 5: Commit**

```bash
git add backend/app/models/review_request.py backend/tests/test_review_request_model.py
git commit -m "feat: add ReviewRequest model"
```

---

## Task 5: Database collection + indexes for review requests

**Files:**
- Modify: `backend/app/database.py:108` (after leads indexes) and `:182` (after `get_settings_collection`)

- [ ] **Step 1: Add indexes**

In `create_indexes()`, after the Leads indexes block (line 108), add:

```python
    # Review requests collection indexes
    await _database.review_requests.create_index("token", unique=True)
    await _database.review_requests.create_index("appointment_id")
    await _database.review_requests.create_index("status")
    await _database.review_requests.create_index("created_at")
```

- [ ] **Step 2: Add collection accessor**

After `get_settings_collection()` (line 182), add:

```python
def get_review_requests_collection():
    return get_database().review_requests
```

- [ ] **Step 3: Verify import**

Run: `cd backend && python -c "from app.database import get_review_requests_collection; print('ok')"`
Expected: `ok`

- [ ] **Step 4: Commit**

```bash
git add backend/app/database.py
git commit -m "feat: add review_requests collection + indexes"
```

---

## Task 6: Review engine service

**Files:**
- Create: `backend/app/services/review_engine.py`
- Create: `backend/tests/test_review_engine.py`

- [ ] **Step 1: Write the failing test**

Create `backend/tests/test_review_engine.py`:

```python
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && python -m pytest tests/test_review_engine.py -v`
Expected: FAIL — module not found.

- [ ] **Step 3: Write minimal implementation**

Create `backend/app/services/review_engine.py`:

```python
"""
Review generation engine. Fired when a job completes: creates a tokenized
review request and sends it (email now, SMS-ready). Routes ratings:
>=4 -> Google review; <4 -> private feedback + owner alert.
Compliant: every customer is asked and always sees the Google option.
"""
import logging
import secrets
from datetime import datetime

from ..config import get_settings
from ..database import get_review_requests_collection
from .notification_channels import get_channel
from .email_sender import send_transactional_email

logger = logging.getLogger(__name__)

HIGH_RATING_THRESHOLD = 4


def _full_name(customer: dict) -> str:
    name = f"{customer.get('first_name','')} {customer.get('last_name','')}".strip()
    return name or customer.get("name") or "there"


def _review_email_html(name: str, feedback_url: str) -> str:
    return f"""
    <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#0f172a">
      <h2 style="color:#0A3D7C">Thanks for choosing Pure Air California, {name}!</h2>
      <p>We hope you're breathing easier. Your feedback means the world to our small team —
         it takes 15 seconds and helps your neighbors find us.</p>
      <p style="text-align:center;margin:28px 0">
        <a href="{feedback_url}" style="background:#0A3D7C;color:#fff;padding:14px 28px;
           border-radius:10px;text-decoration:none;font-weight:bold;font-size:16px">
           Rate your experience
        </a>
      </p>
      <p style="color:#64748b;font-size:13px">Pure Air California · NADCA Certified · (213) 792-4145</p>
    </div>
    """


async def create_and_send(appointment: dict, customer: dict):
    """Idempotently create + send one review request for a completed appointment.
    Returns the stored doc dict, or None if one already exists / no email.
    Best-effort: logs and returns None on failure (never raises)."""
    try:
        col = get_review_requests_collection()
        appt_id = appointment.get("_id") or appointment.get("id")
        existing = await col.find_one({"appointment_id": appt_id})
        if existing:
            return None
        email = customer.get("email")
        if not email:
            logger.info("No email for customer %s; skipping review request", customer.get("_id"))
            return None

        settings = get_settings()
        token = secrets.token_urlsafe(24)
        name = _full_name(customer)
        doc = {
            "id": secrets.token_urlsafe(12),
            "customer_id": customer.get("_id") or appointment.get("customer_id"),
            "appointment_id": appt_id,
            "customer_name": name,
            "customer_email": email,
            "customer_phone": customer.get("phone", ""),
            "token": token,
            "channel": "email",
            "status": "pending",
            "rating": None,
            "private_feedback": None,
            "created_at": datetime.utcnow().isoformat(),
            "sent_at": None,
            "clicked_at": None,
            "responded_at": None,
        }
        await col.insert_one(dict(doc))

        feedback_url = f"{settings.PUBLIC_SITE_URL}/feedback/{token}"
        channel = get_channel(settings)
        ok = await channel.send(email, "How did we do?", _review_email_html(name, feedback_url),
                                customer.get("phone", ""), settings)
        doc["status"] = "sent" if ok else "pending"
        doc["sent_at"] = datetime.utcnow().isoformat() if ok else None
        await col.update_one({"token": token},
                             {"$set": {"status": doc["status"], "sent_at": doc["sent_at"]}})
        return doc
    except Exception as e:
        logger.error("create_and_send failed: %s", e)
        return None


async def mark_clicked(token: str) -> dict | None:
    col = get_review_requests_collection()
    req = await col.find_one({"token": token})
    if not req:
        return None
    if req.get("status") in ("sent", "pending"):
        await col.update_one({"token": token},
                             {"$set": {"status": "clicked",
                                       "clicked_at": datetime.utcnow().isoformat()}})
    req.pop("_id", None)
    return req


async def record_feedback(token: str, rating: int, private_feedback: str | None) -> dict | None:
    col = get_review_requests_collection()
    req = await col.find_one({"token": token})
    if not req:
        return None
    settings = get_settings()
    high = rating >= HIGH_RATING_THRESHOLD
    new_status = "reviewed" if high else "feedback_submitted"
    await col.update_one({"token": token}, {"$set": {
        "rating": rating,
        "private_feedback": private_feedback,
        "status": new_status,
        "responded_at": datetime.utcnow().isoformat(),
    }})
    if high:
        return {"route": "google", "google_review_url": settings.GOOGLE_REVIEW_URL or ""}
    await _notify_owner_of_feedback(req, rating, private_feedback, settings)
    return {"route": "private"}


async def _notify_owner_of_feedback(req: dict, rating: int, feedback: str | None, settings) -> None:
    if not settings.OWNER_NOTIFY_EMAIL:
        return
    html = (f"<h3>⚠️ {rating}-star private feedback</h3>"
            f"<p><b>Customer:</b> {req.get('customer_name')} ({req.get('customer_email')})</p>"
            f"<p><b>Feedback:</b> {feedback or '(none provided)'}</p>"
            f"<p>Reach out to recover this customer before they post publicly.</p>")
    await send_transactional_email(settings.OWNER_NOTIFY_EMAIL,
                                   f"Service recovery: {rating}★ from {req.get('customer_name')}",
                                   html, settings)


async def get_stats() -> dict:
    col = get_review_requests_collection()
    async def c(q): return await col.count_documents(q)
    total = await c({})
    return {
        "total_requests": total,
        "sent": await c({"status": {"$in": ["sent", "clicked", "feedback_submitted", "reviewed"]}}),
        "clicked": await c({"status": {"$in": ["clicked", "feedback_submitted", "reviewed"]}}),
        "reviewed": await c({"status": "reviewed"}),
        "private_feedback": await c({"status": "feedback_submitted"}),
    }
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && python -m pytest tests/test_review_engine.py -v`
Expected: PASS (4 passed).

- [ ] **Step 5: Commit**

```bash
git add backend/app/services/review_engine.py backend/tests/test_review_engine.py
git commit -m "feat: add review generation engine"
```

---

## Task 7: Reviews router

**Files:**
- Create: `backend/app/routers/reviews.py`
- Modify: `backend/app/main.py` (register router)
- Create: `backend/tests/test_reviews_router.py`

- [ ] **Step 1: Write the failing test**

Create `backend/tests/test_reviews_router.py`:

```python
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && python -m pytest tests/test_reviews_router.py -v`
Expected: FAIL — module not found. (If `httpx` ASGITransport import fails, `pip install httpx` — already a dep.)

- [ ] **Step 3: Write minimal implementation**

Create `backend/app/routers/reviews.py`:

```python
"""Reviews router — public feedback page endpoints + admin stats."""
from fastapi import APIRouter, HTTPException, Depends
from ..models.review_request import FeedbackSubmission
from ..core.dependencies import get_current_user
from ..services import review_engine

router = APIRouter(prefix="/reviews", tags=["Reviews"])


@router.get("/feedback/{token}", response_model=dict)
async def get_feedback(token: str):
    """PUBLIC: resolve a review token, mark it clicked, return minimal context."""
    req = await review_engine.mark_clicked(token)
    if not req:
        raise HTTPException(status_code=404, detail="Invalid or expired link")
    return {"customer_name": req.get("customer_name"), "status": req.get("status")}


@router.post("/feedback/{token}", response_model=dict)
async def submit_feedback(token: str, body: FeedbackSubmission):
    """PUBLIC: record rating. >=4 -> google route; <4 -> private + owner alert."""
    out = await review_engine.record_feedback(token, body.rating, body.private_feedback)
    if out is None:
        raise HTTPException(status_code=404, detail="Invalid or expired link")
    return out


@router.post("/request", response_model=dict)
async def request_review(appointment_id: str, customer_id: str,
                         current_user: dict = Depends(get_current_user)):
    """AUTH: manually trigger a review request for an appointment/customer."""
    from ..database import get_appointments_collection, get_customers_collection
    appt = await get_appointments_collection().find_one({"_id": appointment_id})
    cust = await get_customers_collection().find_one({"_id": customer_id})
    if not appt or not cust:
        raise HTTPException(status_code=404, detail="Appointment or customer not found")
    doc = await review_engine.create_and_send(appt, cust)
    return {"created": bool(doc), "request": doc}


@router.get("/stats", response_model=dict)
async def review_stats(current_user: dict = Depends(get_current_user)):
    """AUTH: review funnel stats for the admin dashboard."""
    return await review_engine.get_stats()
```

- [ ] **Step 4: Register the router**

In `backend/app/main.py`, find where routers are included (e.g. `app.include_router(leads.router, ...)`). Add an import alongside the others (`from .routers import ... reviews`) and register it with the same `/api` prefix the other routers use. Match the existing pattern exactly (read the file first).

- [ ] **Step 5: Run test to verify it passes**

Run: `cd backend && python -m pytest tests/test_reviews_router.py -v`
Expected: PASS (3 passed).

- [ ] **Step 6: Commit**

```bash
git add backend/app/routers/reviews.py backend/app/main.py backend/tests/test_reviews_router.py
git commit -m "feat: add reviews router + register"
```

---

## Task 8: Fire review engine on appointment completion

**Files:**
- Modify: `backend/app/routers/appointments.py:321` (the `update_status` COMPLETED branch)

- [ ] **Step 1: Add the trigger**

In `update_status`, after `await appointments.update_one(...)` (line 321) and before re-fetching, add a best-effort hook. Insert:

```python
    # Speed-to-reviews: fire review request when a job is completed (best-effort)
    if new_status == AppointmentStatus.COMPLETED:
        try:
            from ..services import review_engine
            from ..database import get_customers_collection
            customer = await get_customers_collection().find_one(
                {"_id": appointment.get("customer_id")}
            )
            if customer:
                await review_engine.create_and_send(appointment, customer)
        except Exception:
            import logging
            logging.getLogger(__name__).exception("review request trigger failed")
```

- [ ] **Step 2: Verify import & app boot**

Run: `cd backend && python -c "import app.main; print('boot ok')"`
Expected: `boot ok` (no import errors).

- [ ] **Step 3: Commit**

```bash
git add backend/app/routers/appointments.py
git commit -m "feat: trigger review request on appointment completion"
```

---

## Task 9: Speed-to-lead notifications

**Files:**
- Create: `backend/app/services/lead_notifications.py`
- Modify: `backend/app/routers/leads.py:67` (after `insert_one` in `create_lead`)
- Create: `backend/tests/test_lead_notifications.py`

- [ ] **Step 1: Write the failing test**

Create `backend/tests/test_lead_notifications.py`:

```python
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && python -m pytest tests/test_lead_notifications.py -v`
Expected: FAIL — module not found.

- [ ] **Step 3: Write minimal implementation**

Create `backend/app/services/lead_notifications.py`:

```python
"""Speed-to-lead: instant auto-reply to the lead + instant owner alert."""
import logging
from .email_sender import send_transactional_email
from ..config import get_settings

logger = logging.getLogger(__name__)


def _autoreply_html(name: str) -> str:
    first = (name or "there").split(" ")[0]
    return f"""
    <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#0f172a">
      <h2 style="color:#0A3D7C">Thanks, {first} — we've got your request!</h2>
      <p>A Pure Air California specialist will call you shortly (usually within
         15 minutes during business hours). Need us now? Call
         <a href="tel:2137924145">(213) 792-4145</a>.</p>
      <p style="color:#64748b;font-size:13px">NADCA Certified · Licensed &amp; Insured · 5-Star Rated</p>
    </div>
    """


def _owner_html(lead: dict) -> str:
    rows = "".join(
        f"<tr><td style='padding:4px 10px;font-weight:bold'>{k}</td>"
        f"<td style='padding:4px 10px'>{lead.get(v) or '—'}</td></tr>"
        for k, v in [("Name", "name"), ("Phone", "phone"), ("Email", "email"),
                     ("Service", "service"), ("Address", "address"), ("Message", "message")]
    )
    phone = lead.get("phone") or ""
    return (f"<h3>🔥 New website lead — call now</h3><table>{rows}</table>"
            f"<p><a href='tel:{phone}'>Call {phone}</a> · "
            f"<a href='mailto:{lead.get('email','')}'>Email</a></p>")


async def send_lead_notifications(lead: dict) -> None:
    """Best-effort; never raises into the request path."""
    settings = get_settings()
    try:
        if lead.get("email"):
            await send_transactional_email(
                lead["email"], "We received your request — Pure Air California",
                _autoreply_html(lead.get("name", "")), settings)
        if settings.OWNER_NOTIFY_EMAIL:
            await send_transactional_email(
                settings.OWNER_NOTIFY_EMAIL,
                f"🔥 New lead: {lead.get('name','Unknown')} ({lead.get('service','')})",
                _owner_html(lead), settings)
    except Exception:
        logger.exception("lead notification failed")
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && python -m pytest tests/test_lead_notifications.py -v`
Expected: PASS (2 passed).

- [ ] **Step 5: Wire into create_lead**

In `backend/app/routers/leads.py`, in `create_lead`, after `await collection.insert_one(lead_dict)` (line 67) and before `return lead_dict`, add:

```python
    # Speed-to-lead: fire instant auto-reply + owner alert (best-effort, non-blocking)
    try:
        from ..services.lead_notifications import send_lead_notifications
        await send_lead_notifications(lead_dict)
    except Exception:
        import logging
        logging.getLogger(__name__).exception("lead notification dispatch failed")
```

- [ ] **Step 6: Verify app boots & all backend tests pass**

Run: `cd backend && python -c "import app.main; print('ok')" && python -m pytest tests/ -v`
Expected: `ok` then all tests PASS.

- [ ] **Step 7: Commit**

```bash
git add backend/app/services/lead_notifications.py backend/app/routers/leads.py backend/tests/test_lead_notifications.py
git commit -m "feat: speed-to-lead auto-reply + owner alert"
```

---

## Task 10: Frontend business.ts (single source of truth)

**Files:**
- Create: `frontend/src/config/business.ts`

- [ ] **Step 1: Create the config**

Create `frontend/src/config/business.ts` (replace placeholder rating/geo/hours with real owner-provided values before go-live — see "External inputs"):

```typescript
/**
 * Single source of truth for business identity (NAP), ratings, and GBP data.
 * Consumed by visible UI (hero, footer) AND JSON-LD schema so Google sees
 * perfectly consistent local signals. Update ratings here and everywhere updates.
 */
export const business = {
  legalName: 'Pure Air California',
  phone: '(213) 792-4145',
  phoneHref: 'tel:2137924145',
  email: 'lou@pureaircalifornia.com',
  url: 'https://www.pureaircalifornia.com',
  // TODO(owner): confirm real street address / suite
  address: {
    streetAddress: '', // GBP service-area business may hide street; keep city/region
    addressLocality: 'Los Angeles',
    addressRegion: 'CA',
    postalCode: '',
    addressCountry: 'US',
  },
  geo: { latitude: 34.0522, longitude: -118.2437 }, // TODO(owner): real coords
  priceRange: '$$',
  // TODO(owner): real aggregate from GBP
  aggregateRating: { ratingValue: 4.9, reviewCount: 1200 },
  googleReviewUrl: 'https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID', // TODO(owner)
  hours: [
    { days: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '07:00', closes: '19:00' },
    { days: ['Saturday'], opens: '08:00', closes: '17:00' },
  ],
  categories: ['Air duct cleaning service', 'HVAC contractor', 'Dryer vent cleaning service'],
  sameAs: [
    // TODO(owner): GBP, Facebook, Instagram, Yelp URLs
  ],
} as const;

export const ratingDisplay = `${business.aggregateRating.ratingValue} ★ · ${business.aggregateRating.reviewCount.toLocaleString()}+ reviews`;
```

- [ ] **Step 2: Typecheck**

Run: `cd frontend && npx tsc --noEmit`
Expected: no new errors referencing `business.ts`.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/config/business.ts
git commit -m "feat: add business.ts single source of truth"
```

---

## Task 11: Complete LocalBusiness schema from business.ts

**Files:**
- Modify: `frontend/src/utils/seo/seoConfig.ts` and/or `frontend/src/components/SchemaMarkup.tsx`

- [ ] **Step 1: Read both files first**

Read `frontend/src/utils/seo/seoConfig.ts` and `frontend/src/components/SchemaMarkup.tsx` to find where `localBusiness` schema is defined and how it's injected.

- [ ] **Step 2: Build schema from business.ts**

Refactor the `localBusiness` schema object to import `business` and emit a complete `HVACBusiness` LocalBusiness node. The shape:

```typescript
import { business } from '@/config/business';

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HVACBusiness',
  name: business.legalName,
  telephone: business.phone,
  email: business.email,
  url: business.url,
  priceRange: business.priceRange,
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.address.streetAddress || undefined,
    addressLocality: business.address.addressLocality,
    addressRegion: business.address.addressRegion,
    postalCode: business.address.postalCode || undefined,
    addressCountry: business.address.addressCountry,
  },
  geo: { '@type': 'GeoCoordinates', latitude: business.geo.latitude, longitude: business.geo.longitude },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: business.aggregateRating.ratingValue,
    reviewCount: business.aggregateRating.reviewCount,
  },
  areaServed: { '@type': 'City', name: 'Los Angeles' },
  openingHoursSpecification: business.hours.map(h => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days, opens: h.opens, closes: h.closes,
  })),
  sameAs: business.sameAs,
};
```

Wire this into wherever the homepage `SchemaMarkup schema={...}` prop is fed (currently `seoConfig.schema.localBusiness` per `EnhancedLanding.tsx:37`). Keep existing review/serviceArea/FAQ schema behavior.

- [ ] **Step 3: Typecheck + build**

Run: `cd frontend && npx tsc --noEmit && npm run build`
Expected: build succeeds; prerendered `frontend/build/index.html` contains the `aggregateRating` JSON-LD (grep for `"AggregateRating"`).

- [ ] **Step 4: Validate**

Confirm: `grep -o '"@type":"HVACBusiness"' frontend/build/index.html` returns a match (schema is in prerendered HTML, so Google sees it without JS).

- [ ] **Step 5: Commit**

```bash
git add frontend/src/utils/seo/seoConfig.ts frontend/src/components/SchemaMarkup.tsx
git commit -m "feat: complete LocalBusiness schema from business.ts"
```

---

## Task 12: Footer NAP from business.ts

**Files:**
- Modify: `frontend/src/components/Footer.tsx`

- [ ] **Step 1: Read Footer.tsx**, locate hardcoded phone/address/email.

- [ ] **Step 2: Replace literals** with `business.phone`, `business.phoneHref`, `business.email`, and the address fields (import `{ business } from '@/config/business'`). Keep markup/styles identical.

- [ ] **Step 3: Typecheck**

Run: `cd frontend && npx tsc --noEmit`
Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/Footer.tsx
git commit -m "refactor: footer NAP from business.ts"
```

---

## Task 13: Proof-led homepage hero + section reorder (CRO)

**Files:**
- Modify: `frontend/src/pages/EnhancedLanding.tsx:56-65` (hero) and the section order (`:144-249`)

- [ ] **Step 1: Add the proof line under the H1**

In `EnhancedLanding.tsx`, import `{ ratingDisplay, business } from '@/config/business'`. Directly under the `<h1>` (after line 60) and above the `<p>` subhead, add:

```tsx
                <div className="flex items-center gap-2 mb-4 text-yellow-400">
                  <span className="text-2xl tracking-tight">★★★★★</span>
                  <span className="text-white font-semibold">{ratingDisplay}</span>
                  <span className="text-white/70 text-sm hidden sm:inline">· NADCA Certified</span>
                </div>
```

- [ ] **Step 2: Add speed-to-lead microcopy near the form**

Inside the hero form column (after `<EnhancedQuoteForm />`, line 112) add a reassurance caption:

```tsx
                <p className="text-center text-white/70 text-xs mt-3">
                  ⚡ We respond within 15 minutes during business hours
                </p>
```

- [ ] **Step 3: Reorder — proof before philosophy**

Move the `<ReviewMarquee />` (line 147) and `<EnhancedTrustBadges />` (line 144) ABOVE the "Words of Wisdom" `<section>` (lines 150-239). Shorten the quotes section from 6 quotes to 3 (keep the array's first 3 entries) so it stops occupying prime real estate. Preserve all imports.

- [ ] **Step 4: Build & visually verify**

Run: `cd frontend && npm run build`
Then preview (e.g. `npm run preview`) and confirm: hero shows the star rating line above the fold; reviews/badges appear before the quotes; quotes block shows 3 cards.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/pages/EnhancedLanding.tsx
git commit -m "feat: proof-led hero + conversion-focused section order"
```

---

## Task 14: Feedback page + route (frontend)

**Files:**
- Create: `frontend/src/pages/Feedback.tsx`
- Modify: `frontend/src/App.tsx:153` (routes array) and `frontend/scripts/prerender.js` (do NOT add — keep dynamic/noindex)

- [ ] **Step 1: Create the page**

Create `frontend/src/pages/Feedback.tsx`:

```tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API = (typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
  ? '/api' : (import.meta.env.VITE_API_BASE_URL || '/api');

const Feedback = () => {
  const { token } = useParams<{ token: string }>();
  const [name, setName] = useState('');
  const [valid, setValid] = useState<boolean | null>(null);
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [googleUrl, setGoogleUrl] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // noindex this page
    const m = document.createElement('meta');
    m.name = 'robots'; m.content = 'noindex,nofollow';
    document.head.appendChild(m);
    fetch(`${API}/reviews/feedback/${token}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => { setName(d.customer_name || 'there'); setValid(true); })
      .catch(() => setValid(false));
    return () => { document.head.removeChild(m); };
  }, [token]);

  const submit = async (stars: number, note?: string) => {
    const r = await fetch(`${API}/reviews/feedback/${token}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating: stars, private_feedback: note }),
    });
    const d = await r.json();
    setSubmitted(true);
    if (d.route === 'google' && d.google_review_url) {
      setGoogleUrl(d.google_review_url);
      window.location.href = d.google_review_url; // send happy customers straight to Google
    }
  };

  if (valid === false) return <Centered>This link is invalid or has expired.</Centered>;
  if (valid === null) return <Centered>Loading…</Centered>;

  if (submitted && !googleUrl) return (
    <Centered>
      <h1 className="text-2xl font-bold mb-2">Thank you for your feedback</h1>
      <p className="text-slate-600">A manager will personally reach out to make this right.</p>
    </Centered>
  );

  return (
    <Centered>
      <h1 className="text-2xl font-bold mb-1">Hi {name}, how did we do?</h1>
      <p className="text-slate-600 mb-6">Tap a star — it takes 15 seconds.</p>
      <div className="flex gap-2 justify-center mb-6">
        {[1,2,3,4,5].map(s => (
          <button key={s} aria-label={`${s} stars`} onClick={() => setRating(s)}
            className={`text-4xl ${s <= rating ? 'text-yellow-400' : 'text-slate-300'}`}>★</button>
        ))}
      </div>
      {rating >= 4 && (
        <button onClick={() => submit(rating)}
          className="w-full bg-[#0A3D7C] text-white font-bold py-3 rounded-xl">
          Leave a Google review →
        </button>
      )}
      {rating > 0 && rating < 4 && (
        <div className="space-y-3">
          <textarea value={feedback} onChange={e => setFeedback(e.target.value)}
            placeholder="What went wrong? We want to fix it."
            className="w-full border rounded-xl p-3 min-h-[120px]" />
          <button onClick={() => submit(rating, feedback)}
            className="w-full bg-[#0A3D7C] text-white font-bold py-3 rounded-xl">
            Send private feedback
          </button>
        </div>
      )}
    </Centered>
  );
};

const Centered = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">{children}</div>
  </div>
);

export default Feedback;
```

- [ ] **Step 2: Add the route**

In `frontend/src/App.tsx`, add a lazy import near the other page imports:

```tsx
const Feedback = React.lazy(() => import('./pages/Feedback'));
```

And add to the `routes` array (after line 152):

```tsx
  { path: "/feedback/:token", element: <Feedback /> },
```

- [ ] **Step 3: Confirm prerender excludes it**

Confirm `frontend/scripts/prerender.js` does NOT list `/feedback` (it shouldn't — it's dynamic). No change needed. The page self-applies `noindex`.

- [ ] **Step 4: Build**

Run: `cd frontend && npx tsc --noEmit && npm run build`
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/pages/Feedback.tsx frontend/src/App.tsx
git commit -m "feat: tokenized customer feedback/review-routing page"
```

---

## Task 15: Admin review-funnel widget

**Files:**
- Modify: the admin dashboard component (`admin/src/pages/DashboardPage.tsx` — confirm exact file)

- [ ] **Step 1: Read the dashboard** to match its data-fetch + card patterns and how it calls the API (it uses the same JWT `authFetch` pattern as `frontend/src/utils/api.ts`).

- [ ] **Step 2: Add a stats fetch + card** calling `GET /api/reviews/stats`, rendering a small funnel: Requests → Sent → Clicked → Reviewed, plus a "private feedback (needs recovery)" count. Match existing card styling.

- [ ] **Step 3: Build admin**

Run: `cd admin && npx tsc --noEmit && npm run build`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add admin/src/pages/DashboardPage.tsx
git commit -m "feat: admin review funnel widget"
```

---

## Task 16: Verify prerender ships in production

**Files:** none (verification + risk resolution)

- [ ] **Step 1: Full build with prerender**

Run: `cd frontend && npm run build`
Expected: console shows `Prerendering /locations/<slug>...` for many cities and `✅ Saved` lines; no `Timeout waiting for #root` warnings.

- [ ] **Step 2: Confirm rendered content (not empty SPA shell)**

Check a location page: `grep -c "Beverly Hills" frontend/build/locations/beverly-hills/index.html`
Expected: > 0 (real content present in static HTML).

- [ ] **Step 3: Confirm schema in static HTML**

`grep -o '"AggregateRating"' frontend/build/index.html`
Expected: a match.

- [ ] **Step 4: Document Vercel risk**

If the build's prerender step fails in Vercel's environment (Puppeteer needs system libs), note the remediation in `docs/superpowers/specs/2026-06-02-local-seo-domination-design.md` risks section: switch to `@sparticuz/chromium` + `puppeteer-core` in `scripts/prerender.js`, or move prerender to a Vercel build with the chromium layer. Verify by inspecting a deployed page's "View Source" for rendered `<h1>` content after deploy.

- [ ] **Step 5: Commit (if any doc change)**

```bash
git add docs/superpowers/specs/2026-06-02-local-seo-domination-design.md
git commit -m "docs: note prerender-on-vercel remediation"
```

---

## Final verification

- [ ] **Backend:** `cd backend && python -m pytest tests/ -v` → all pass.
- [ ] **Frontend:** `cd frontend && npx tsc --noEmit && npm run build` → succeeds, prerender runs.
- [ ] **Admin:** `cd admin && npx tsc --noEmit && npm run build` → succeeds.
- [ ] **Manual E2E (staging, once SendGrid + GOOGLE_REVIEW_URL set):**
  - Mark an appointment COMPLETED → customer receives review email → open `/feedback/:token` → 5★ redirects to Google; 2★ stores feedback + owner gets alert.
  - Submit a website quote → customer gets auto-reply, owner gets instant alert.
- [ ] Hero shows star rating above the fold; reviews precede the quotes block.

---

## Self-review notes (author)

- **Spec coverage:** Pillar 1 review engine → Tasks 4–9, 14, 15. Speed-to-lead → Task 9. Homepage CRO → Task 13. NAP+schema → Tasks 10–12. Prerender verify → Task 16. All Phase 1 spec sections covered.
- **Type consistency:** `create_and_send(appointment, customer)`, `record_feedback(token, rating, private_feedback)`, `mark_clicked(token)`, `get_stats()`, `send_transactional_email(to, subject, html, settings)`, `get_channel(settings)`, `send(email, subject, html, phone, settings)` — names consistent across tasks/tests.
- **Deferred:** Twilio live send (stub only), location-content rewrite + service×city (Phase 2), GBP/citations doc (Phase 3).
