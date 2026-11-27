import httpx
import pytest
from fastapi import HTTPException

from app.models.prospect import BusinessCategory
from app.services import osm_places as osm

LA = (34.0522, -118.2437)


def _node(osm_id, name=None, lat=34.05, lon=-118.25, **tags):
    element = {"type": "node", "id": osm_id, "lat": lat, "lon": lon, "tags": dict(tags)}
    if name:
        element["tags"]["name"] = name
    return element


def _way(osm_id, name, lat=34.05, lon=-118.25, **tags):
    return {"type": "way", "id": osm_id, "center": {"lat": lat, "lon": lon},
            "tags": {"name": name, **tags}}


def _nominatim_row(osm_id, name, category="amenity", kind="dentist", address=None, extratags=None):
    return {"osm_type": "way", "osm_id": osm_id, "lat": "34.06", "lon": "-118.25", "name": name,
            "category": category, "type": kind, "address": address or {},
            "extratags": extratags or {"phone": "213-555-0100"}}


def _reset():
    osm._geocode_cache.clear()
    osm._search_cache.clear()
    osm._mirror_rest_until.clear()
    osm._last_good_mirror.clear()


@pytest.fixture(autouse=True)
def clear_caches(monkeypatch):
    _reset()
    monkeypatch.setattr(osm, "NOMINATIM_INTERVAL", 0)
    yield
    _reset()


@pytest.fixture
def overpass(monkeypatch):
    """
    Stand in for the map servers: canned Overpass elements per radius step
    (a radius listed in "down" is busy) and canned Nominatim elements.
    """
    state = {"by_radius": {}, "down": set(), "queries": [], "nominatim": [], "phrases": []}

    async def fake_geocode(client, location):
        return LA

    async def fake_run(client, query, deadline):
        state["queries"].append(query)
        for miles in state["down"]:
            if f"(around:{int(miles * osm.METERS_PER_MILE)}," in query:
                raise osm.OsmUnavailable("busy")
        for miles, elements in state["by_radius"].items():
            if f"(around:{int(miles * osm.METERS_PER_MILE)}," in query:
                return elements
        return []

    async def fake_nominatim(client, phrases, center, radius_miles):
        state["phrases"].extend(phrases)
        if isinstance(state["nominatim"], Exception):
            raise state["nominatim"]
        return state["nominatim"]

    monkeypatch.setattr(osm, "geocode", fake_geocode)
    monkeypatch.setattr(osm, "run_overpass", fake_run)
    monkeypatch.setattr(osm, "search_nominatim", fake_nominatim)
    return state


# ── Turning map data into results ────────────────────────────────────

def test_an_element_becomes_a_result_with_address_phone_and_website():
    element = _node(42, "Sunset Hotel", tourism="hotel", phone="+1 213-555-0100;+1 213-555-0199",
                    website="www.sunsethotel.example", **{
                        "addr:housenumber": "100", "addr:street": "Sunset Blvd",
                        "addr:city": "Los Angeles", "addr:state": "CA", "addr:postcode": "90028"})
    result = osm.element_to_result(element, LA, "Los Angeles, CA")

    assert result.place_id == "osm:node/42"
    assert result.address == "100 Sunset Blvd, Los Angeles, CA 90028"
    assert result.phone == "+1 213-555-0100"
    assert result.website == "https://www.sunsethotel.example"
    assert result.types == ["tourism=hotel"]
    assert result.source == "openstreetmap"
    assert result.distance_miles is not None and result.distance_miles < 1


def test_a_building_outline_uses_its_center_point():
    result = osm.element_to_result(_way(7, "Office Tower", building="office"), LA, "LA")
    assert result.place_id == "osm:way/7"
    assert result.types == ["building=office"]


def test_unnamed_and_closed_places_are_skipped():
    assert osm.element_to_result(_node(1, None, shop="laundry"), LA, "LA") is None
    assert osm.element_to_result(_node(2, "Old Laundry", disused="yes"), LA, "LA") is None
    assert osm.element_to_result(_node(3, "Gone Cafe", **{"disused:amenity": "cafe"}), LA, "LA") is None
    assert osm.element_to_result(_node(4, "Point Only"), LA, "LA") is not None


def test_a_place_without_a_street_address_says_so():
    result = osm.element_to_result(_node(5, "Somewhere Clinic", amenity="clinic"), LA, "Pasadena, CA")
    assert result.address == "Near Pasadena, CA (no street address listed)"


def test_only_real_web_addresses_are_kept():
    assert osm._normalize_website("http://a.example/x") == "http://a.example/x"
    assert osm._normalize_website("a.example") == "https://a.example"
    assert osm._normalize_website("mailto:info@a.example") is None
    assert osm._normalize_website("not a url") is None
    assert osm._normalize_website(None) is None


# ── Building queries ─────────────────────────────────────────────────

def test_every_real_category_has_map_filters():
    for category in BusinessCategory:
        if category is not BusinessCategory.other:
            assert osm.CATEGORY_FILTERS.get(category), category.value


def test_other_category_needs_a_custom_query():
    with pytest.raises(HTTPException) as error:
        osm.build_filters(BusinessCategory.other, None)
    assert error.value.status_code == 400


def test_typed_text_cannot_break_out_of_the_query():
    filters = osm.build_filters(BusinessCategory.other, 'Joe\'s "best" (pizza).*\\')
    assert all('"name"~"Joe\'s .best. .pizza....",i]' in statement for statement in filters)
    # nwr["key"]["name"~"pattern",i]: three quoted strings, none added by the text
    assert all(statement.count('"') == 6 for statement in filters)


def test_query_limits_radius_and_result_count():
    query = osm.build_overpass_query(('nwr["amenity"="dentist"]',), LA, 5, 80)
    assert '(around:8046,34.052200,-118.243700)' in query
    assert query.endswith("out tags center 80;")


def test_searches_start_close_and_widen():
    assert osm.radius_steps(25) == [5, 15, 25]
    assert osm.radius_steps(10) == [5, 10]
    assert osm.radius_steps(5) == [5]


# ── Searching ────────────────────────────────────────────────────────

async def test_results_are_deduplicated_filtered_and_ranked(overpass):
    overpass["by_radius"] = {5: [
        _node(1, "Grand Hotel", tourism="hotel", website="https://grand.example", phone="213"),
        _way(2, "Grand Hotel", lat=34.0501, lon=-118.2502, tourism="hotel"),   # same place, outline
        _node(3, "Phone Only Inn", tourism="motel", phone="213-555-0101"),
        _node(4, None, tourism="hotel"),                                         # no name
        _node(5, "Far Resort", lat=35.4, lon=-119.0, tourism="hotel"),          # ~100 miles
    ]}
    results = await osm.search_places(BusinessCategory.hotel, "Los Angeles, CA", 5, None, 10)

    assert [r.name for r in results] == ["Grand Hotel", "Phone Only Inn"]
    assert results[0].fit_score > results[1].fit_score
    assert osm.NO_REVIEWS_REASON in results[0].fit_reasons
    assert all(r.source == "openstreetmap" for r in results)


async def test_branches_of_a_chain_far_apart_are_both_kept(overpass):
    overpass["by_radius"] = {5: [
        _node(1, "Spin Laundry", shop="laundry"),
        _node(2, "Spin Laundry", lat=34.09, lon=-118.30, shop="laundry"),
    ]}
    results = await osm.search_places(BusinessCategory.laundromat, "LA", 5, None, 10)
    assert len(results) == 2


async def test_branches_the_same_distance_out_in_different_directions_are_both_kept(overpass):
    overpass["by_radius"] = {5: [
        _node(1, "Marriott", lat=LA[0] + 0.03, lon=LA[1], tourism="hotel"),   # ~2 mi north
        _node(2, "Marriott", lat=LA[0] - 0.03, lon=LA[1], tourism="hotel"),   # ~2 mi south
    ]}
    results = await osm.search_places(BusinessCategory.hotel, "LA", 5, None, 10)
    assert len(results) == 2


async def test_busy_before_finding_anything_asks_nominatim_and_is_not_cached(overpass):
    overpass["by_radius"] = {5: []}                 # close ring answers, but empty
    overpass["down"] = {15}                         # wider ring busy
    overpass["nominatim"] = [osm.nominatim_to_element(_nominatim_row(9, "Backup Dental"))]
    results = await osm.search_places(BusinessCategory.dental, "LA", 25, None, 10)
    assert [r.name for r in results] == ["Backup Dental"]

    overpass["down"] = set()
    overpass["by_radius"] = {5: [_node(1, "Overpass Dental", amenity="dentist")]}
    again = await osm.search_places(BusinessCategory.dental, "LA", 25, None, 10)
    assert "Overpass Dental" in [r.name for r in again]   # cut-short answer wasn't cached


async def test_nothing_found_is_not_cached(overpass):
    assert await osm.search_places(BusinessCategory.dental, "LA", 5, None, 10) == []
    overpass["by_radius"] = {5: [_node(1, "New Dental", amenity="dentist")]}
    assert [r.name for r in await osm.search_places(BusinessCategory.dental, "LA", 5, None, 10)] == [
        "New Dental"]


async def test_odd_server_replies_count_as_busy_not_as_crashes():
    with pytest.raises(osm.OsmUnavailable):
        await osm.geocode(FakeClient(geocode={"error": "Unable to geocode"}), "Burbank, CA")
    with pytest.raises(HTTPException):
        await osm.geocode(FakeClient(geocode=[{"display_name": "no coordinates"}]), "Van Nuys, CA")

    first = osm.OVERPASS_URLS[0]
    client = FakeClient({url: ["not", "an", "object"] for url in osm.OVERPASS_URLS})
    with pytest.raises(osm.OsmUnavailable):
        await osm.run_overpass(client, "q", deadline=osm.time.monotonic() + 60)
    assert first in client.posted


async def test_search_widens_only_when_the_close_ring_is_thin(overpass):
    overpass["by_radius"] = {
        5: [_node(1, "Near Dental", amenity="dentist")],
        15: [_node(1, "Near Dental", amenity="dentist"), _node(2, "Mid Dental", amenity="dentist")],
    }
    results = await osm.search_places(BusinessCategory.dental, "LA", 25, None, 10)
    assert len(overpass["queries"]) == 3          # 5, 15 and 25 miles
    assert {r.name for r in results} == {"Near Dental", "Mid Dental"}

    overpass["queries"].clear()
    overpass["by_radius"] = {5: [_node(i, f"Dentist {i}", amenity="dentist", lat=34.05 + i / 1000)
                                 for i in range(10)]}
    await osm.search_places(BusinessCategory.dental, "Pasadena, CA", 25, None, 5)
    assert len(overpass["queries"]) == 1          # enough close by; no wider query


async def test_when_every_overpass_mirror_is_busy_nominatim_answers(overpass):
    overpass["down"] = {5, 15, 25}
    overpass["nominatim"] = [osm.nominatim_to_element(_nominatim_row(9, "Backup Dental"))]
    results = await osm.search_places(BusinessCategory.dental, "LA", 25, None, 10)

    assert [r.name for r in results] == ["Backup Dental"]
    assert overpass["phrases"] == ["dentist"]
    assert len(overpass["queries"]) == 1          # gave up on Overpass after the first ring


async def test_a_busy_wider_ring_keeps_what_the_closer_ring_found(overpass):
    overpass["by_radius"] = {5: [_node(1, "Close Gym", leisure="fitness_centre")]}
    overpass["down"] = {15}
    results = await osm.search_places(BusinessCategory.gym, "LA", 25, None, 10)
    assert [r.name for r in results] == ["Close Gym"]
    assert overpass["phrases"] == []              # no need for the backup's backup


async def test_both_backups_busy_is_reported(overpass):
    overpass["down"] = {5, 15, 25}
    overpass["nominatim"] = osm.OsmUnavailable("busy")
    with pytest.raises(osm.OsmUnavailable):
        await osm.search_places(BusinessCategory.hotel, "LA", 25, None, 10)


def test_custom_text_is_searched_as_typed_on_nominatim():
    assert osm.nominatim_phrases(BusinessCategory.other, " dry clean ") == ("dry clean",)
    for category in BusinessCategory:
        if category is not BusinessCategory.other:
            assert osm.nominatim_phrases(category, None), category.value


def test_a_nominatim_row_reads_like_a_map_element():
    element = osm.nominatim_to_element(_nominatim_row(
        77, "Glendale Care Home", category="amenity", kind="nursing_home",
        address={"house_number": "5", "road": "Brand Blvd", "town": "Glendale",
                 "ISO3166-2-lvl4": "US-CA", "postcode": "91203"},
        extratags={"phone": "+1 818-555-0100", "website": "https://care.example"}))
    result = osm.element_to_result(element, LA, "Glendale, CA")

    assert result.place_id == "osm:way/77"
    assert result.address == "5 Brand Blvd, Glendale, CA 91203"
    assert result.phone == "+1 818-555-0100"
    assert result.website == "https://care.example"
    assert result.types == ["amenity=nursing_home"]


async def test_nominatim_requests_are_spaced_out(monkeypatch):
    monkeypatch.setattr(osm, "NOMINATIM_INTERVAL", 0.3)
    client = FakeClient(geocode=[])
    started = osm.time.monotonic()
    await osm.search_nominatim(client, ("hotel", "motel"), LA, 5)
    assert client.gets == 2
    # 0.3s apart, less the ~16ms a Windows timer can wake early
    assert osm.time.monotonic() - started >= 0.25


async def test_nominatim_not_answering_any_phrase_is_reported():
    client = FakeClient(geocode=httpx.ConnectError("down"))
    with pytest.raises(osm.OsmUnavailable):
        await osm.search_nominatim(client, ("hotel", "motel"), LA, 5)


async def test_repeat_searches_are_served_from_cache(overpass):
    overpass["by_radius"] = {5: [_node(1, "Cached Gym", leisure="fitness_centre")]}
    first = await osm.search_places(BusinessCategory.gym, "LA", 5, None, 10)
    second = await osm.search_places(BusinessCategory.gym, "la ", 5, None, 10)
    assert first == second
    assert len(overpass["queries"]) == 1


# ── Talking to the servers ───────────────────────────────────────────

class FakeClient:
    """Answers POSTs per mirror URL and GETs with a canned geocode."""

    def __init__(self, by_url=None, geocode=None):
        self.by_url = by_url or {}
        self.geocode = geocode
        self.posted = []
        self.gets = 0

    async def post(self, url, data=None, timeout=None):
        self.posted.append(url)
        answer = self.by_url.get(url)
        if isinstance(answer, Exception):
            raise answer
        return httpx.Response(200, json=answer, request=httpx.Request("POST", url))

    async def get(self, url, params=None, timeout=None):
        self.gets += 1
        if isinstance(self.geocode, Exception):
            raise self.geocode
        return httpx.Response(200, json=self.geocode, request=httpx.Request("GET", url))


async def test_a_busy_mirror_falls_through_to_the_next():
    first, second, third = osm.OVERPASS_URLS[:3]
    client = FakeClient({
        first: httpx.ConnectError("down"),
        second: {"elements": [], "remark": "runtime error: Query timed out"},
        third: {"elements": [_node(1, "Found It")]},
    })
    elements = await osm.run_overpass(client, "q", deadline=osm.time.monotonic() + 60)
    assert [e["id"] for e in elements] == [1]
    assert client.posted == [first, second, third]


async def test_the_mirror_that_answered_is_tried_first_and_failures_rest():
    first, second, third = osm.OVERPASS_URLS[:3]
    client = FakeClient({first: httpx.ReadTimeout("slow"), second: httpx.ConnectError("down"),
                         third: {"elements": []}})
    await osm.run_overpass(client, "q", deadline=osm.time.monotonic() + 60)

    client.posted.clear()
    await osm.run_overpass(client, "q", deadline=osm.time.monotonic() + 60)
    assert client.posted == [third]             # no time wasted on the busy ones

    order = osm.mirror_order(osm.time.monotonic())
    assert order[0] == third and order[-2:] == [first, second]   # rested ones last
    assert osm.mirror_order(osm.time.monotonic() + osm.MIRROR_COOLDOWN + 1)[:3] == [
        third, first, second]                   # back in rotation after the rest


async def test_no_mirror_answering_is_reported_and_not_retried_straight_away():
    client = FakeClient({url: httpx.ReadTimeout("slow") for url in osm.OVERPASS_URLS})
    with pytest.raises(osm.OsmUnavailable):
        await osm.run_overpass(client, "q", deadline=osm.time.monotonic() + 60)
    assert len(client.posted) == len(osm.OVERPASS_URLS)

    client.posted.clear()
    with pytest.raises(osm.OsmUnavailable):
        await osm.run_overpass(client, "q", deadline=osm.time.monotonic() + 60)
    assert client.posted == []                  # all resting: go straight to the backup


def test_hoa_search_does_not_take_every_association():
    assert 'nwr["office"="association"]' not in osm.CATEGORY_FILTERS[BusinessCategory.hoa]


async def test_an_expired_deadline_stops_trying_mirrors():
    client = FakeClient()
    with pytest.raises(osm.OsmUnavailable):
        await osm.run_overpass(client, "q", deadline=osm.time.monotonic())
    assert client.posted == []


async def test_geocoding_is_cached_and_unknown_places_are_reported():
    client = FakeClient(geocode=[{"lat": "34.1", "lon": "-118.1"}])
    assert await osm.geocode(client, "Pasadena, CA") == (34.1, -118.1)
    assert await osm.geocode(client, " pasadena, ca") == (34.1, -118.1)
    assert client.gets == 1

    with pytest.raises(HTTPException) as error:
        await osm.geocode(FakeClient(geocode=[]), "Nowhereville")
    assert error.value.status_code == 400

    with pytest.raises(osm.OsmUnavailable):
        await osm.geocode(FakeClient(geocode=httpx.ConnectError("down")), "Glendale, CA")
