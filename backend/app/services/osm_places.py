"""
OpenStreetMap business search: the lead scanner's fallback when Google Places
is unavailable (no key, billing off, or unreachable).

Free and keyless, but with limits the scanner has to be honest about:
  * no ratings or review counts, so ranking leans on fit, website and phone;
  * thin coverage for some markets (HOAs barely appear on the map), so HOA
    searches also look for the property-management offices that run them;
  * shared volunteer servers that are often busy, so every query has a short
    timeout, falls through a list of mirrors, and results are cached. When
    every Overpass mirror is busy, Nominatim (the OpenStreetMap Foundation's
    own search, far steadier but capped at 40 results a phrase) answers.

Usage policies: Nominatim allows at most one request a second from an
identified application; Overpass asks for modest, identified use. Geocodes
and searches are cached so repeated scans do not hit either service again.
"""
import asyncio
import logging
import math
import re
import time
from typing import Dict, Iterable, List, Optional, Tuple

import httpx
from fastapi import HTTPException

from ..models.prospect import BusinessCategory, PlaceSearchResult
from .prospect_quality import score_prospect

logger = logging.getLogger(__name__)

SOURCE = "openstreetmap"
USER_AGENT = "PureAirCaliforniaLeadScanner/1.0 (+https://www.pureaircalifornia.com)"
NOMINATIM_URL = "https://nominatim.openstreetmap.org/search"
# Public Overpass servers (wiki.openstreetmap.org/wiki/Overpass_API). They
# are often at capacity, so a failing one is rested and the last one that
# answered is tried first.
OVERPASS_URLS: Tuple[str, ...] = (
    "https://overpass-api.de/api/interpreter",
    "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://overpass.private.coffee/api/interpreter",
)
GEOCODE_TIMEOUT = 15.0
OVERPASS_TIMEOUT = 20.0          # per mirror, seconds on the wire
OVERPASS_SERVER_TIMEOUT = 18     # seconds the server may spend on one query
MIRROR_COOLDOWN = 5 * 60         # seconds a failing mirror is skipped
OVERPASS_BUDGET = 45.0           # seconds for Overpass before Nominatim takes over
NOMINATIM_TIMEOUT = 10.0
NOMINATIM_INTERVAL = 1.1         # seconds between Nominatim requests (policy: 1/s)
NOMINATIM_LIMIT = 40             # the most Nominatim returns for one phrase
CACHE_SECONDS = 30 * 60
CACHE_MAX_ENTRIES = 100
METERS_PER_MILE = 1609.34
EARTH_RADIUS_MILES = 3958.8
# Search close in first and widen only if needed: dense categories over a
# 50-mile circle are too heavy for the shared servers, and nearer is better.
RADIUS_STEPS_MILES = (5, 15)

NO_REVIEWS_REASON = "From OpenStreetMap: no ratings or reviews to judge by"

# Overpass filters per category. Each string is one statement; the search
# appends the radius. Tag-only filters use the server's index and stay fast.
_OFFICE_NAME = 'nwr["office"]["name"~"{pattern}",i]'
CATEGORY_FILTERS: Dict[BusinessCategory, Tuple[str, ...]] = {
    BusinessCategory.hoa: (
        # office=association covers every kind of association (charities,
        # trade groups), so only names that read like an HOA are kept.
        'nwr["office"="property_management"]',
        _OFFICE_NAME.format(
            pattern="homeowner|owners association|community association|"
                    "maintenance association|condominium|HOA"),
    ),
    BusinessCategory.property_manager: (
        'nwr["office"="property_management"]',
        # Most estate agents sell homes; keep the ones that manage or lease.
        'nwr["office"="estate_agent"]["name"~"propert|management|rental|leasing|apartment",i]',
    ),
    BusinessCategory.building_management: (
        'nwr["office"="property_management"]',
        _OFFICE_NAME.format(pattern="building management|facilit(y|ies) management"),
        'nwr["building"="apartments"]["name"]',
    ),
    BusinessCategory.hotel: ('nwr["tourism"~"^(hotel|motel)$"]',),
    BusinessCategory.senior_living: (
        'nwr["social_facility"~"^(assisted_living|nursing_home)$"]',
        'nwr["amenity"="nursing_home"]',
        'nwr["social_facility:for"="senior"]',
    ),
    BusinessCategory.medical: (
        'nwr["amenity"~"^(clinic|doctors|hospital)$"]',
        'nwr["healthcare"~"^(clinic|doctor|centre)$"]',
    ),
    BusinessCategory.dental: ('nwr["amenity"="dentist"]', 'nwr["healthcare"="dentist"]'),
    BusinessCategory.restaurant: ('nwr["amenity"~"^(restaurant|food_court)$"]',),
    BusinessCategory.office_building: (
        'nwr["building"="office"]["name"]',
        'nwr["office"~"^(company|coworking)$"]',
        'nwr["amenity"="coworking_space"]',
    ),
    BusinessCategory.school: ('nwr["amenity"~"^(school|college|university)$"]',),
    BusinessCategory.gym: ('nwr["leisure"="fitness_centre"]', 'nwr["sport"="yoga"]["name"]'),
    BusinessCategory.salon: ('nwr["shop"~"^(hairdresser|beauty|massage)$"]', 'nwr["leisure"="spa"]'),
    BusinessCategory.retail: ('nwr["shop"~"^(mall|department_store)$"]', 'nwr["landuse"="retail"]["name"]'),
    BusinessCategory.warehouse: (
        'nwr["building"~"^(warehouse|industrial)$"]["name"]',
        'nwr["landuse"="industrial"]["name"]',
    ),
    BusinessCategory.church: ('nwr["amenity"="place_of_worship"]',),
    BusinessCategory.daycare: ('nwr["amenity"~"^(childcare|kindergarten)$"]',),
    BusinessCategory.laundromat: ('nwr["shop"~"^(laundry|dry_cleaning)$"]',),
    BusinessCategory.other: (),
}

# Phrasings for Nominatim, the backup when every Overpass mirror is busy. It
# recognises plain category words ("dentist", "hotel") within an area.
NOMINATIM_PHRASES: Dict[BusinessCategory, Tuple[str, ...]] = {
    BusinessCategory.hoa: ("homeowners association", "property management"),
    BusinessCategory.property_manager: ("property management",),
    BusinessCategory.building_management: ("property management", "apartments"),
    BusinessCategory.hotel: ("hotel", "motel"),
    BusinessCategory.senior_living: ("nursing home", "retirement home"),
    BusinessCategory.medical: ("clinic", "doctors"),
    BusinessCategory.dental: ("dentist",),
    BusinessCategory.restaurant: ("restaurant",),
    BusinessCategory.office_building: ("office", "coworking space"),
    BusinessCategory.school: ("school", "college"),
    BusinessCategory.gym: ("gym", "fitness centre"),
    BusinessCategory.salon: ("hairdresser", "beauty salon"),
    BusinessCategory.retail: ("shopping mall", "department store"),
    BusinessCategory.warehouse: ("warehouse",),
    BusinessCategory.church: ("church", "place of worship"),
    BusinessCategory.daycare: ("child care", "kindergarten"),
    BusinessCategory.laundromat: ("laundry", "dry cleaning"),
    BusinessCategory.other: (),
}

# Keys that mark an object as a business, used for free-text (custom) searches.
_BUSINESS_KEYS = ("amenity", "shop", "office", "tourism", "leisure", "healthcare", "craft")
_CLOSED_KEYS = ("disused", "abandoned", "demolished")
_CLOSED_PREFIXES = ("disused:", "abandoned:", "was:", "demolished:", "removed:")

_geocode_cache: Dict[str, Tuple[float, float]] = {}
_search_cache: Dict[tuple, Tuple[float, List[PlaceSearchResult]]] = {}
_mirror_rest_until: Dict[str, float] = {}
_last_good_mirror: List[str] = []   # zero or one URL
_nominatim_lock = asyncio.Lock()
_nominatim_last: List[float] = [0.0]


class OsmUnavailable(Exception):
    """Every OpenStreetMap server failed or timed out."""


def haversine_miles(a: Tuple[float, float], b: Tuple[float, float]) -> float:
    lat1, lng1, lat2, lng2 = map(math.radians, (a[0], a[1], b[0], b[1]))
    h = (math.sin((lat2 - lat1) / 2) ** 2
         + math.cos(lat1) * math.cos(lat2) * math.sin((lng2 - lng1) / 2) ** 2)
    return 2 * EARTH_RADIUS_MILES * math.asin(math.sqrt(h))


def _escape_regex(text: str) -> str:
    """
    Make typed text safe inside an Overpass "..." regular expression. Overpass
    reads backslashes in strings itself, so instead of escaping, every regex
    or quoting character becomes "." (any one character): slightly looser
    matching, but nothing typed can change the query.
    """
    return re.sub(r'[\\^$.|?*+()\[\]{}"]', ".", text.strip())


def build_filters(category: BusinessCategory, custom_query: Optional[str]) -> Tuple[str, ...]:
    """Overpass statements for a search, or 400 if nothing can be searched."""
    if custom_query and custom_query.strip():
        pattern = _escape_regex(custom_query)[:120]
        return tuple(f'nwr["{key}"]["name"~"{pattern}",i]' for key in _BUSINESS_KEYS)
    filters = CATEGORY_FILTERS.get(category, ())
    if not filters:
        raise HTTPException(status_code=400, detail="Enter a custom search for the 'Other' category.")
    return filters


def build_overpass_query(filters: Iterable[str], center: Tuple[float, float],
                         radius_miles: float, limit: int) -> str:
    meters = int(radius_miles * METERS_PER_MILE)
    around = f"(around:{meters},{center[0]:.6f},{center[1]:.6f})"
    body = "".join(f"{statement}{around};" for statement in filters)
    return f"[out:json][timeout:{OVERPASS_SERVER_TIMEOUT}];({body});out tags center {limit};"


def radius_steps(radius_miles: int) -> List[int]:
    steps = [step for step in RADIUS_STEPS_MILES if step < radius_miles]
    return steps + [radius_miles]


def _normalize_website(value: Optional[str]) -> Optional[str]:
    if not value:
        return None
    url = value.strip().split(";")[0].strip()
    if not url or " " in url:
        return None
    if not re.match(r"^https?://", url, re.I):
        if url.lower().startswith(("mailto:", "tel:")) or "." not in url:
            return None
        url = "https://" + url
    return url[:300]


def _first(tags: dict, *keys: str) -> Optional[str]:
    for key in keys:
        value = (tags.get(key) or "").strip()
        if value:
            return value.split(";")[0].strip()
    return None


def _address(tags: dict, searched_location: str) -> str:
    street = " ".join(part for part in (tags.get("addr:housenumber"), tags.get("addr:street")) if part)
    city = tags.get("addr:city")
    region = " ".join(part for part in (tags.get("addr:state"), tags.get("addr:postcode")) if part)
    parts = [part for part in (street, city, region) if part]
    if street and city:
        return ", ".join(parts)
    if parts:
        return ", ".join(parts + ([searched_location] if not city else []))
    return f"Near {searched_location} (no street address listed)"


def _is_closed(tags: dict) -> bool:
    if any(tags.get(key) == "yes" for key in _CLOSED_KEYS):
        return True
    if any(key.startswith(_CLOSED_PREFIXES) for key in tags):
        return not any(key in tags for key in _BUSINESS_KEYS)
    return (tags.get("opening_hours") or "").strip().lower() == "closed"


def _kind(tags: dict) -> List[str]:
    for key in _BUSINESS_KEYS + ("social_facility", "building", "landuse", "sport"):
        if tags.get(key):
            return [f"{key}={tags[key]}"]
    return []


def element_to_result(element: dict, center: Tuple[float, float],
                      searched_location: str) -> Optional[PlaceSearchResult]:
    """Turn one Overpass element into a search result, or None if unusable."""
    tags = element.get("tags") or {}
    name = (tags.get("name") or "").strip()
    if not name or _is_closed(tags):
        return None
    point = element.get("center") or element
    if "lat" not in point or "lon" not in point:
        return None
    lat, lon = float(point["lat"]), float(point["lon"])
    return PlaceSearchResult(
        place_id=f"osm:{element.get('type', 'node')}/{element.get('id')}",
        name=name[:200],
        address=_address(tags, searched_location)[:300],
        phone=_first(tags, "phone", "contact:phone"),
        website=_normalize_website(_first(tags, "website", "contact:website", "url")),
        types=_kind(tags),
        distance_miles=round(haversine_miles(center, (lat, lon)), 1),
        source=SOURCE,
    )


SAME_PLACE_MILES = 0.3


def _name_key(name: str) -> str:
    return re.sub(r"[^a-z0-9]", "", name.lower())


Point = Tuple[float, float]


def element_point(element: dict) -> Optional[Point]:
    point = element.get("center") or element
    try:
        return float(point["lat"]), float(point["lon"])
    except (KeyError, TypeError, ValueError):
        return None


def _add_unique(by_name: Dict[str, List[Tuple[PlaceSearchResult, Point]]],
                result: PlaceSearchResult, point: Point) -> None:
    """
    Keep one copy of each business. The same place is often mapped both as a
    point and as a building outline; branches of a chain elsewhere are kept.
    """
    copies = by_name.setdefault(_name_key(result.name), [])
    if any(haversine_miles(point, other_point) <= SAME_PLACE_MILES for _, other_point in copies):
        return
    copies.append((result, point))


async def _nominatim_get(client: httpx.AsyncClient, params: dict, timeout: float):
    """One Nominatim request, spaced out to respect its one-a-second policy."""
    async with _nominatim_lock:
        wait = NOMINATIM_INTERVAL - (time.monotonic() - _nominatim_last[0])
        if wait > 0:
            await asyncio.sleep(wait)
        try:
            response = await client.get(NOMINATIM_URL, params=params, timeout=timeout)
        finally:
            _nominatim_last[0] = time.monotonic()
    response.raise_for_status()
    return response.json()


async def geocode(client: httpx.AsyncClient, location: str) -> Tuple[float, float]:
    key = location.strip().lower()
    if key in _geocode_cache:
        return _geocode_cache[key]
    try:
        matches = await _nominatim_get(
            client, {"q": location, "format": "json", "limit": 1, "countrycodes": "us"},
            GEOCODE_TIMEOUT)
    except (httpx.HTTPError, ValueError) as exc:
        logger.warning("OpenStreetMap geocoding failed for %r (%s)", location, type(exc).__name__)
        raise OsmUnavailable("geocoding failed") from exc
    if not isinstance(matches, list):
        logger.warning("OpenStreetMap geocoding for %r returned an unexpected reply", location)
        raise OsmUnavailable("unexpected geocoding reply")
    center = element_point(matches[0]) if matches and isinstance(matches[0], dict) else None
    if center is None:
        raise HTTPException(
            status_code=400,
            detail=f"Could not find '{location}' on the map. Try a city name or ZIP code.")
    _geocode_cache[key] = center
    return center


def mirror_order(now: float) -> List[str]:
    """Last mirror that answered first, then rested ones last."""
    rested = [url for url in OVERPASS_URLS if _mirror_rest_until.get(url, 0) <= now]
    resting = [url for url in OVERPASS_URLS if url not in rested]
    for url in _last_good_mirror:
        if url in rested:
            rested.remove(url)
            rested.insert(0, url)
    return rested + resting


def _mirror_failed(url: str, why: str) -> None:
    logger.warning("Overpass mirror %s failed (%s)", url, why)
    _mirror_rest_until[url] = time.monotonic() + MIRROR_COOLDOWN


def _mirror_answered(url: str) -> None:
    _mirror_rest_until.pop(url, None)
    _last_good_mirror[:] = [url]


async def run_overpass(client: httpx.AsyncClient, query: str, deadline: float) -> List[dict]:
    """Run a query on the first mirror that answers in time."""
    now = time.monotonic()
    if all(_mirror_rest_until.get(url, 0) > now for url in OVERPASS_URLS):
        # All failed in the last few minutes: don't make the person wait for
        # them again; the caller goes straight to Nominatim.
        raise OsmUnavailable("every Overpass mirror is resting")
    for url in mirror_order(now):
        remaining = deadline - time.monotonic()
        if remaining <= 2:
            break
        try:
            response = await client.post(
                url, data={"data": query}, timeout=min(OVERPASS_TIMEOUT, remaining))
            response.raise_for_status()
            payload = response.json()
        except (httpx.HTTPError, ValueError) as exc:
            _mirror_failed(url, type(exc).__name__)
            continue
        if not isinstance(payload, dict) or not isinstance(payload.get("elements", []), list):
            _mirror_failed(url, "unexpected reply")
            continue
        if payload.get("remark") and not payload.get("elements"):
            # The server ran out of time or memory; try the next mirror.
            _mirror_failed(url, str(payload["remark"])[:120])
            continue
        _mirror_answered(url)
        return payload.get("elements", [])
    raise OsmUnavailable("no Overpass mirror answered")


def nominatim_phrases(category: BusinessCategory, custom_query: Optional[str]) -> Tuple[str, ...]:
    if custom_query and custom_query.strip():
        return (custom_query.strip()[:120],)
    return NOMINATIM_PHRASES.get(category, ())


def _viewbox(center: Tuple[float, float], radius_miles: float) -> str:
    lat_delta = radius_miles / 69.0
    lon_delta = radius_miles / (69.0 * max(math.cos(math.radians(center[0])), 0.2))
    return (f"{center[1] - lon_delta:.5f},{center[0] + lat_delta:.5f},"
            f"{center[1] + lon_delta:.5f},{center[0] - lat_delta:.5f}")


def nominatim_to_element(row: dict) -> dict:
    """Reshape a Nominatim result so element_to_result can read it."""
    address = row.get("address") or {}
    state = (address.get("ISO3166-2-lvl4") or "").rpartition("-")[2] or address.get("state")
    tags = {
        **(row.get("extratags") or {}),
        "name": row.get("name") or "",
        "addr:housenumber": address.get("house_number"),
        "addr:street": address.get("road"),
        "addr:city": address.get("city") or address.get("town") or address.get("village"),
        "addr:state": state,
        "addr:postcode": address.get("postcode"),
    }
    if row.get("category") and row.get("type"):
        tags.setdefault(row["category"], row["type"])
    return {
        "type": row.get("osm_type", "node"), "id": row.get("osm_id"),
        "lat": row.get("lat"), "lon": row.get("lon"),
        "tags": {key: value for key, value in tags.items() if value},
    }


async def search_nominatim(client: httpx.AsyncClient, phrases: Iterable[str],
                           center: Tuple[float, float], radius_miles: float) -> List[dict]:
    """Business search on Nominatim inside the radius's bounding box."""
    elements: List[dict] = []
    answered = False
    for phrase in phrases:
        params = {"q": phrase, "format": "jsonv2", "limit": NOMINATIM_LIMIT, "extratags": 1,
                  "addressdetails": 1, "countrycodes": "us", "bounded": 1,
                  "viewbox": _viewbox(center, radius_miles)}
        try:
            rows = await _nominatim_get(client, params, NOMINATIM_TIMEOUT)
        except (httpx.HTTPError, ValueError) as exc:
            logger.warning("Nominatim search failed for %r (%s)", phrase, type(exc).__name__)
            continue
        if not isinstance(rows, list):
            logger.warning("Nominatim search for %r returned an unexpected reply", phrase)
            continue
        answered = True
        elements.extend(nominatim_to_element(row) for row in rows
                        if isinstance(row, dict) and row.get("name"))
    if not answered:
        raise OsmUnavailable("Nominatim did not answer")
    return elements


def _rank(category: BusinessCategory, results: List[PlaceSearchResult]) -> List[PlaceSearchResult]:
    ranked = []
    for result in results:
        score, reasons = score_prospect(category, website=result.website, phone=result.phone)
        if score == 0:
            continue
        ranked.append(result.model_copy(update={
            "fit_score": score, "fit_reasons": reasons + [NO_REVIEWS_REASON]}))
    # Best fit first; among equals, nearest first.
    ranked.sort(key=lambda r: (-r.fit_score, r.distance_miles if r.distance_miles is not None else 999))
    return ranked


def _cache_get(key: tuple) -> Optional[List[PlaceSearchResult]]:
    hit = _search_cache.get(key)
    if hit and time.monotonic() - hit[0] < CACHE_SECONDS:
        return hit[1]
    _search_cache.pop(key, None)
    return None


def _cache_put(key: tuple, results: List[PlaceSearchResult]) -> None:
    if len(_search_cache) >= CACHE_MAX_ENTRIES:
        oldest = min(_search_cache, key=lambda k: _search_cache[k][0])
        _search_cache.pop(oldest, None)
    _search_cache[key] = (time.monotonic(), results)


async def search_places(
    category: BusinessCategory,
    location: str = "Los Angeles, CA",
    radius_miles: int = 25,
    custom_query: Optional[str] = None,
    max_results: int = 20,
) -> List[PlaceSearchResult]:
    """Search OpenStreetMap. Raises OsmUnavailable when no server answers."""
    filters = build_filters(category, custom_query)
    cache_key = (category.value, location.strip().lower(), radius_miles,
                 (custom_query or "").strip().lower(), max_results)
    cached = _cache_get(cache_key)
    if cached is not None:
        return cached

    deadline = time.monotonic() + OVERPASS_BUDGET
    # Fetch more than asked for so ranking has something to choose from.
    fetch_limit = min(max(max_results * 4, 80), 400)
    by_name: Dict[str, List[Tuple[PlaceSearchResult, Point]]] = {}

    def keep(elements: Iterable[dict]) -> int:
        for element in elements:
            if not isinstance(element, dict):
                continue
            result = element_to_result(element, center, location)
            point = element_point(element)
            if result is not None and point and result.distance_miles <= radius_miles:
                _add_unique(by_name, result, point)
        return sum(len(copies) for copies in by_name.values())

    complete = True
    async with httpx.AsyncClient(headers={"User-Agent": USER_AGENT}) as client:
        center = await geocode(client, location)
        for step in radius_steps(radius_miles):
            query = build_overpass_query(filters, center, step, fetch_limit)
            try:
                elements = await run_overpass(client, query, deadline)
            except OsmUnavailable:
                complete = False   # keep whatever the closer rings found
                break
            if keep(elements) >= max_results * 2:
                break
        if not by_name and not complete:
            # Overpass was busy before it found anything: "nothing found"
            # would be wrong, so ask Nominatim.
            logger.warning("Overpass is busy; asking Nominatim instead")
            keep(await search_nominatim(
                client, nominatim_phrases(category, custom_query), center, radius_miles))

    unique = [result for copies in by_name.values() for result, _ in copies]
    ranked = _rank(category, unique)[:max_results]
    logger.info("OpenStreetMap returned %d ranked results for %s near %r",
                len(ranked), category.value, location)
    # Only cache a full answer: a search cut short by a busy server, or one
    # that found nothing, should be tried again next time.
    if complete and ranked:
        _cache_put(cache_key, ranked)
    return ranked
