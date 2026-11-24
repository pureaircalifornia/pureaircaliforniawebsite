import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Provide minimum required env vars so Settings() can be instantiated in any
# environment (CI has no backend/.env). Set before get_settings() is ever called.
os.environ.setdefault("MONGO_URL", "mongodb://localhost:27017")
os.environ.setdefault("JWT_SECRET_KEY", "test-secret-key")
os.environ.setdefault("GOOGLE_REVIEW_URL", "https://g.page/r/test-review-url")

import pytest
from app.config import get_settings


@pytest.fixture(autouse=True)
def clear_settings_cache():
    """get_settings() is lru_cached; tests mutate the singleton, so reset it
    after each test to keep tests order-independent."""
    yield
    get_settings.cache_clear()


@pytest.fixture
def db(monkeypatch):
    """An empty in-memory database wired in place of MongoDB."""
    from app import database
    from tests.fake_mongo import FakeDatabase

    fake = FakeDatabase()
    monkeypatch.setattr(database, "_database", fake)
    return fake


@pytest.fixture
def prospect():
    """A saved prospect with a published, on-domain contact email."""
    return {
        "id": "p1",
        "business_name": "Sunset Villas HOA, Inc.",
        "business_category": "hoa",
        "address": "1 Main St, Santa Monica, CA 90401, USA",
        "website": "https://sunsetvillas.example",
        "phone": "(310) 555-0142",
        "contact_name": "Maria Lopez",
        "contact_title": "Board President",
        "contact_email": "maria@sunsetvillas.example",
        "found_emails": [{"email": "maria@sunsetvillas.example", "source": "contact page (/board)",
                          "confidence": 95, "grade": "named"}],
        "outreach_status": "not_contacted",
        "emails_sent": 0,
        "sequence_status": "none",
        "sequence_step": 0,
        "public_token": "tok_abcdefghijklmnop",
    }
