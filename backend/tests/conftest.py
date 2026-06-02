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
