import pytest
from fastapi import HTTPException

from app.models.prospect import BusinessCategory
from app.services import google_places as gp

LA = (34.0522, -118.2437)


def _place(place_id, name, lat=34.05, lng=-118.25, status="OPERATIONAL", ratings=50):
    return {"place_id": place_id, "name": name, "formatted_address": f"{name} St, Los Angeles, CA",
            "business_status": status, "user_ratings_total": ratings, "rating": 4.2,
            "geometry": {"location": {"lat": lat, "lng": lng}}, "types": ["lodging"]}


@pytest.fixture
def places(monkeypatch):
    """Stand in for Google: canned search pages and details per place."""
    object.__setattr__(gp.get_settings(), "GOOGLE_PLACES_API_KEY", "test-key")
    state = {"pages": {}, "details": {}, "queries": []}

    async def fake_locate(client, location, api_key):
        return LA

    async def fake_text_search(client, query, api_key, center, radius_meters, limit):
        state["queries"].append(query)
        return state["pages"].get(query, [])

    async def fake_details(client, place_id, api_key):
        return state["details"].get(place_id, {})

    monkeypatch.setattr(gp, "_locate", fake_locate)
    monkeypatch.setattr(gp, "_text_search", fake_text_search)
    monkeypatch.setattr(gp, "_get_place_details", fake_details)
    return state


def test_small_searches_use_one_phrasing_and_large_ones_use_more():
    assert len(gp.build_queries(BusinessCategory.hoa, "Los Angeles, CA", None, 20)) == 1
    assert len(gp.build_queries(BusinessCategory.hoa, "Los Angeles, CA", None, 40)) == 2
    assert len(gp.build_queries(BusinessCategory.hoa, "Los Angeles, CA", None, 60)) == 3


def test_custom_query_replaces_the_category_phrasing():
    assert gp.build_queries(BusinessCategory.hotel, "Pasadena, CA", " luxury hotel ", 60) == [
        "luxury hotel in Pasadena, CA"]


def test_other_category_needs_a_custom_query():
    with pytest.raises(HTTPException) as error:
        gp.build_queries(BusinessCategory.other, "Los Angeles, CA", None, 20)
    assert error.value.status_code == 400


def test_every_real_category_can_be_searched():
    for category in BusinessCategory:
        if category is not BusinessCategory.other:
            assert gp.CATEGORY_SEARCH_QUERIES.get(category), category.value


def test_haversine_matches_a_known_distance():
    santa_monica = (34.0195, -118.4912)
    assert 13 < gp.haversine_miles(LA, santa_monica) < 16


async def test_missing_api_key_is_reported_clearly():
    object.__setattr__(gp.get_settings(), "GOOGLE_PLACES_API_KEY", None)
    with pytest.raises(HTTPException) as error:
        await gp.search_places(BusinessCategory.hotel)
    assert error.value.status_code == 500


async def test_results_are_deduplicated_filtered_and_ranked(places):
    places["pages"] = {
        "hotel in Los Angeles, CA": [
            _place("a", "No Website Inn"),
            _place("b", "Grand Hotel", ratings=400),
            _place("c", "Closed Hotel", status="CLOSED_PERMANENTLY"),
            _place("d", "Far Away Resort", lat=35.4, lng=-119.0),   # ~100 miles out
        ],
        "boutique hotel in Los Angeles, CA": [
            _place("b", "Grand Hotel", ratings=400),                # duplicate
            _place("e", "Boutique Stay"),
        ],
    }
    places["details"] = {
        "b": {"phone": "(213) 555-0100", "website": "https://grand.example"},
        "e": {"phone": "(213) 555-0101", "website": "https://boutique.example"},
        "a": {"phone": "(213) 555-0102"},
    }
    results = await gp.search_places(BusinessCategory.hotel, "Los Angeles, CA", 25, None, 40)

    assert [r.place_id for r in results] == ["b", "e", "a"]
    assert results[0].fit_score > results[1].fit_score > results[2].fit_score
    assert results[0].website == "https://grand.example"
    assert results[0].distance_miles is not None and results[0].distance_miles < 25
    assert "No website: phone outreach only" in results[2].fit_reasons


async def test_a_place_that_details_report_closed_is_dropped(places):
    places["pages"] = {"hotel in Los Angeles, CA": [_place("a", "Looks Open")]}
    places["details"] = {"a": {"business_status": "CLOSED_TEMPORARILY"}}
    assert await gp.search_places(BusinessCategory.hotel, max_results=20) == []


async def test_max_results_caps_the_list_and_the_number_of_queries(places):
    places["pages"] = {"hotel in Los Angeles, CA": [_place(str(i), f"H{i}") for i in range(30)]}
    results = await gp.search_places(BusinessCategory.hotel, max_results=10)
    assert len(results) == 10
    assert places["queries"] == ["hotel in Los Angeles, CA"]
