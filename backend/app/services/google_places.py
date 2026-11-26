"""
Google Places API Service

Finds businesses for the lead scanner. Each search runs several phrasings of
the category (Google caps one query at 60 results and different phrasings
surface different businesses), drops places that are closed or outside the
radius, fills in phone and website, then ranks by fit score so the best
prospects are at the top of the list.
"""
import asyncio
import logging
import math
from typing import Dict, List, Optional, Tuple

import httpx
from fastapi import HTTPException

from ..config import get_settings
from ..models.prospect import BusinessCategory, PlaceSearchResult
from .prospect_quality import score_prospect

logger = logging.getLogger(__name__)

TEXT_SEARCH_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json"
DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json"

# Phrasings per category, most productive first. The first phrasing alone is
# used for small searches; more are added only when more results are wanted.
CATEGORY_SEARCH_QUERIES: Dict[BusinessCategory, Tuple[str, ...]] = {
    BusinessCategory.hoa: (
        "homeowners association", "HOA management company", "condominium association"),
    BusinessCategory.building_management: (
        "building management company", "apartment building management", "facilities management company"),
    BusinessCategory.property_manager: (
        "property management company", "apartment property management", "residential property manager"),
    BusinessCategory.hotel: ("hotel", "boutique hotel", "extended stay hotel"),
    BusinessCategory.senior_living: (
        "assisted living facility", "senior living community", "skilled nursing facility"),
    BusinessCategory.medical: ("medical clinic", "urgent care center", "outpatient surgery center"),
    BusinessCategory.dental: ("dental office", "dental clinic"),
    BusinessCategory.restaurant: ("restaurant", "banquet hall"),
    BusinessCategory.office_building: ("office building", "commercial office space", "coworking space"),
    BusinessCategory.school: ("private school", "charter school", "college"),
    BusinessCategory.gym: ("gym", "fitness center", "yoga studio"),
    BusinessCategory.salon: ("hair salon", "day spa"),
    BusinessCategory.retail: ("shopping center", "shopping mall"),
    BusinessCategory.warehouse: ("warehouse", "distribution center", "manufacturing facility"),
    BusinessCategory.church: ("church", "synagogue", "temple"),
    BusinessCategory.daycare: ("daycare center", "preschool", "child care center"),
    BusinessCategory.laundromat: ("laundromat", "coin laundry", "laundry service"),
    BusinessCategory.other: (),
}

DETAILS_CONCURRENCY = 8
EARTH_RADIUS_MILES = 3958.8
_center_cache: Dict[str, Optional[Tuple[float, float]]] = {}


class GoogleUnavailable(HTTPException):
    """
    Google could not serve the search at all, as opposed to a bad request.
    The lead scanner falls back to OpenStreetMap when it sees one of these.
    """
    NO_KEY = "no_key"
    DENIED = "denied"
    QUOTA = "quota"
    UNREACHABLE = "unreachable"

    def __init__(self, reason: str, status_code: int, detail: str):
        super().__init__(status_code=status_code, detail=detail)
        self.reason = reason


def haversine_miles(a: Tuple[float, float], b: Tuple[float, float]) -> float:
    lat1, lng1, lat2, lng2 = map(math.radians, (a[0], a[1], b[0], b[1]))
    h = (math.sin((lat2 - lat1) / 2) ** 2
         + math.cos(lat1) * math.cos(lat2) * math.sin((lng2 - lng1) / 2) ** 2)
    return 2 * EARTH_RADIUS_MILES * math.asin(math.sqrt(h))


def build_queries(category: BusinessCategory, location: str,
                  custom_query: Optional[str], max_results: int) -> List[str]:
    """Return the search phrasings to run, fewest that can reach max_results."""
    if custom_query and custom_query.strip():
        return [f"{custom_query.strip()} in {location}"]
    phrasings = CATEGORY_SEARCH_QUERIES.get(category, ())
    if not phrasings:
        raise HTTPException(
            status_code=400,
            detail="Enter a custom search for the 'Other' category.",
        )
    # One phrasing yields at most 60; use a second and third for larger pulls.
    wanted = 1 if max_results <= 20 else 2 if max_results <= 40 else 3
    return [f"{phrase} in {location}" for phrase in phrasings[:wanted]]


def _raise_for_status(data: dict, first_page: bool) -> bool:
    """Raise on a hard API error; return False when paging should just stop."""
    status = data.get("status")
    if status in ("OK", "ZERO_RESULTS"):
        return True
    message = data.get("error_message") or status or "Unknown error"
    logger.error("Places API %s: %s", status, message)
    if status == "REQUEST_DENIED":
        raise GoogleUnavailable(GoogleUnavailable.DENIED, 502,
                                f"Google API Error: REQUEST_DENIED. {message}")
    if status == "OVER_QUERY_LIMIT" and first_page:
        raise GoogleUnavailable(GoogleUnavailable.QUOTA, 502, f"Google API Error: {message}")
    if first_page:
        code = 400 if status == "INVALID_REQUEST" else 502
        raise HTTPException(status_code=code, detail=f"Google API Error: {message}")
    return False


async def _locate(client: httpx.AsyncClient, location: str, api_key: str) -> Optional[Tuple[float, float]]:
    """Resolve a typed location to coordinates so the radius can be enforced."""
    key = location.strip().lower()
    if key in _center_cache:
        return _center_cache[key]
    center = None
    try:
        response = await client.get(
            TEXT_SEARCH_URL, params={"query": location, "key": api_key}, timeout=15.0)
        response.raise_for_status()
        results = response.json().get("results", [])
        if results:
            point = results[0].get("geometry", {}).get("location", {})
            if "lat" in point and "lng" in point:
                center = (float(point["lat"]), float(point["lng"]))
    except (httpx.HTTPError, ValueError) as exc:
        # Never log the exception text: it contains the request URL, and the
        # URL contains the API key.
        logger.warning("Could not locate %r; radius will not be enforced (%s)",
                       location, type(exc).__name__)
        return None  # do not cache a transient failure
    _center_cache[key] = center
    return center


async def _text_search(client: httpx.AsyncClient, query: str, api_key: str,
                       center: Optional[Tuple[float, float]], radius_meters: int,
                       limit: int) -> List[dict]:
    params = {"query": query, "key": api_key}
    if center:
        params["location"] = f"{center[0]},{center[1]}"
        params["radius"] = radius_meters
    places: List[dict] = []
    for page in range(3):  # Google returns 20 per page, 3 pages maximum
        response = await client.get(TEXT_SEARCH_URL, params=params, timeout=15.0)
        response.raise_for_status()
        data = response.json()
        if not _raise_for_status(data, first_page=(page == 0)):
            break
        places.extend(data.get("results", []))
        token = data.get("next_page_token")
        if not token or len(places) >= limit:
            break
        # A page token only becomes valid a moment after it is issued.
        await asyncio.sleep(2)
        params = {"pagetoken": token, "key": api_key}
    return places


async def _get_place_details(client: httpx.AsyncClient, place_id: str, api_key: str) -> dict:
    params = {
        "place_id": place_id,
        "fields": "formatted_phone_number,website,business_status",
        "key": api_key,
    }
    try:
        response = await client.get(DETAILS_URL, params=params, timeout=10.0)
        response.raise_for_status()
        data = response.json()
        if data.get("status") == "OK":
            result = data.get("result", {})
            return {
                "phone": result.get("formatted_phone_number"),
                "website": result.get("website"),
                "business_status": result.get("business_status"),
            }
    except (httpx.HTTPError, ValueError) as exc:
        logger.warning("Place details failed for %s (%s)", place_id, type(exc).__name__)
    return {}


def _to_result(place: dict, center: Optional[Tuple[float, float]]) -> PlaceSearchResult:
    distance = None
    point = place.get("geometry", {}).get("location", {})
    if center and "lat" in point and "lng" in point:
        distance = round(haversine_miles(center, (float(point["lat"]), float(point["lng"]))), 1)
    return PlaceSearchResult(
        place_id=place.get("place_id", ""),
        name=place.get("name", ""),
        address=place.get("formatted_address", ""),
        rating=place.get("rating"),
        total_ratings=place.get("user_ratings_total"),
        business_status=place.get("business_status"),
        types=place.get("types", []),
        distance_miles=distance,
    )


async def search_places(
    category: BusinessCategory,
    location: str = "Los Angeles, CA",
    radius_miles: int = 25,
    custom_query: Optional[str] = None,
    max_results: int = 20,
) -> List[PlaceSearchResult]:
    """Search Google Places and return ranked, de-duplicated, open businesses."""
    api_key = get_settings().GOOGLE_PLACES_API_KEY
    if not api_key:
        logger.error("GOOGLE_PLACES_API_KEY not configured")
        raise GoogleUnavailable(
            GoogleUnavailable.NO_KEY, 500,
            "Google Places API Key is not configured in the backend environment.",
        )

    queries = build_queries(category, location, custom_query, max_results)
    radius_meters = int(radius_miles * 1609.34)
    by_id: Dict[str, PlaceSearchResult] = {}

    async with httpx.AsyncClient() as client:
        try:
            center = await _locate(client, location, api_key)
            for query in queries:
                if len(by_id) >= max_results:
                    break
                for place in await _text_search(
                        client, query, api_key, center, radius_meters, max_results):
                    place_id = place.get("place_id")
                    if not place_id or place_id in by_id:
                        continue
                    if place.get("business_status") not in (None, "OPERATIONAL"):
                        continue
                    result = _to_result(place, center)
                    # Google treats the radius as a bias, not a limit; enforce it.
                    if result.distance_miles is not None and result.distance_miles > radius_miles:
                        continue
                    by_id[place_id] = result
        except httpx.HTTPError as exc:
            logger.error("HTTP error searching places (%s)", type(exc).__name__)
            if not by_id:
                raise GoogleUnavailable(
                    GoogleUnavailable.UNREACHABLE, 502,
                    "Could not reach Google Places. Try again shortly.")

        results = list(by_id.values())[:max_results]
        semaphore = asyncio.Semaphore(DETAILS_CONCURRENCY)

        async def enrich(result: PlaceSearchResult) -> PlaceSearchResult:
            async with semaphore:
                details = await _get_place_details(client, result.place_id, api_key)
            return result.model_copy(update={
                "phone": details.get("phone"),
                "website": details.get("website"),
                "business_status": details.get("business_status") or result.business_status,
            })

        results = list(await asyncio.gather(*(enrich(r) for r in results)))

    ranked: List[PlaceSearchResult] = []
    for result in results:
        score, reasons = score_prospect(
            category, website=result.website, phone=result.phone, rating=result.rating,
            total_ratings=result.total_ratings, business_status=result.business_status,
        )
        if score == 0:
            continue
        ranked.append(result.model_copy(update={"fit_score": score, "fit_reasons": reasons}))
    ranked.sort(key=lambda r: r.fit_score, reverse=True)

    logger.info("Returning %d ranked results for %s", len(ranked), queries)
    return ranked
