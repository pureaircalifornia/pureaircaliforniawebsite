import pytest
from fastapi import HTTPException

from app.models.prospect import BusinessCategory, PlaceSearchResult
from app.services import google_places as gp
from app.services import lead_search
from app.services import osm_places as osm
from app.services.google_places import GoogleUnavailable

ARGS = dict(category=BusinessCategory.hotel, location="Los Angeles, CA",
            radius_miles=25, custom_query=None, max_results=20)


def _result(name, source="google"):
    return PlaceSearchResult(place_id=f"{source}:{name}", name=name, address="1 Main St",
                             fit_score=50, source=source)


@pytest.fixture
def providers(monkeypatch):
    """Control what each provider does; record which were asked."""
    state = {"google": [], "osm": [], "calls": []}

    async def fake_google(**kwargs):
        state["calls"].append("google")
        if isinstance(state["google"], Exception):
            raise state["google"]
        return state["google"]

    async def fake_osm(**kwargs):
        state["calls"].append("osm")
        if isinstance(state["osm"], Exception):
            raise state["osm"]
        return state["osm"]

    monkeypatch.setattr(gp, "search_places", fake_google)
    monkeypatch.setattr(osm, "search_places", fake_osm)
    return state


async def test_google_results_are_used_when_google_works(providers):
    providers["google"] = [_result("Grand Hotel")]
    results = await lead_search.search_businesses(**ARGS)
    assert [r.name for r in results] == ["Grand Hotel"]
    assert results[0].source_note is None
    assert providers["calls"] == ["google"]


async def test_billing_off_falls_back_and_says_why(providers):
    providers["google"] = GoogleUnavailable(GoogleUnavailable.DENIED, 502, "REQUEST_DENIED")
    providers["osm"] = [_result("Map Hotel", source="openstreetmap")]
    results = await lead_search.search_businesses(**ARGS)

    assert providers["calls"] == ["google", "osm"]
    assert results[0].source == "openstreetmap"
    assert "billing" in results[0].source_note
    assert "OpenStreetMap" in results[0].source_note


@pytest.mark.parametrize("reason", [GoogleUnavailable.NO_KEY, GoogleUnavailable.QUOTA,
                                    GoogleUnavailable.UNREACHABLE])
async def test_every_kind_of_google_outage_falls_back(providers, reason):
    providers["google"] = GoogleUnavailable(reason, 502, "down")
    providers["osm"] = [_result("Map Hotel", source="openstreetmap")]
    results = await lead_search.search_businesses(**ARGS)
    assert results[0].source_note
    assert providers["calls"] == ["google", "osm"]


async def test_a_bad_request_is_not_hidden_by_the_backup(providers):
    providers["google"] = HTTPException(status_code=400, detail="Enter a custom search")
    with pytest.raises(HTTPException) as error:
        await lead_search.search_businesses(**ARGS)
    assert error.value.status_code == 400
    assert providers["calls"] == ["google"]


async def test_nothing_on_the_backup_map_explains_both_problems(providers):
    providers["google"] = GoogleUnavailable(GoogleUnavailable.DENIED, 502, "REQUEST_DENIED")
    providers["osm"] = []
    with pytest.raises(HTTPException) as error:
        await lead_search.search_businesses(**{**ARGS, "category": BusinessCategory.hoa})
    assert error.value.status_code == 404
    assert "billing" in error.value.detail
    assert "hoa" in error.value.detail
    assert "Property manager" in error.value.detail


async def test_a_busy_backup_is_reported_with_the_google_reason(providers):
    providers["google"] = GoogleUnavailable(GoogleUnavailable.NO_KEY, 500, "no key")
    providers["osm"] = osm.OsmUnavailable("busy")
    with pytest.raises(HTTPException) as error:
        await lead_search.search_businesses(**ARGS)
    assert error.value.status_code == 503
    assert "no API key" in error.value.detail


# ── Google reports outages as GoogleUnavailable ──────────────────────

async def test_missing_google_key_is_an_outage():
    object.__setattr__(gp.get_settings(), "GOOGLE_PLACES_API_KEY", None)
    with pytest.raises(GoogleUnavailable) as error:
        await gp.search_places(BusinessCategory.hotel)
    assert error.value.reason == GoogleUnavailable.NO_KEY


def test_request_denied_and_over_quota_are_outages():
    with pytest.raises(GoogleUnavailable) as error:
        gp._raise_for_status({"status": "REQUEST_DENIED", "error_message": "Billing"}, first_page=False)
    assert error.value.reason == GoogleUnavailable.DENIED

    with pytest.raises(GoogleUnavailable) as error:
        gp._raise_for_status({"status": "OVER_QUERY_LIMIT"}, first_page=True)
    assert error.value.reason == GoogleUnavailable.QUOTA


def test_an_invalid_request_is_not_an_outage():
    with pytest.raises(HTTPException) as error:
        gp._raise_for_status({"status": "INVALID_REQUEST"}, first_page=True)
    assert not isinstance(error.value, GoogleUnavailable)
    assert error.value.status_code == 400
