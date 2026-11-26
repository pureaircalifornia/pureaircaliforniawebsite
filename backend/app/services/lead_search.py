"""
Lead scanner search: Google Places first, OpenStreetMap when Google can't
serve the search at all (no key, billing off, over quota, unreachable).

A bad request (for example "Other" with no search text) is not a reason to
fall back; it is reported as is.
"""
import logging
from typing import List, Optional

from fastapi import HTTPException

from ..models.prospect import BusinessCategory, PlaceSearchResult
from . import google_places, osm_places
from .google_places import GoogleUnavailable

logger = logging.getLogger(__name__)

# Why Google is off, in words for the person running the search.
GOOGLE_OFF_REASONS = {
    GoogleUnavailable.NO_KEY: "Google Maps search isn't set up on the server (no API key)",
    GoogleUnavailable.DENIED: ("Google Maps search is turned off: Google refused the request, "
                               "usually because billing isn't enabled on the Google Cloud project"),
    GoogleUnavailable.QUOTA: "Google Maps search has used up its quota for now",
    GoogleUnavailable.UNREACHABLE: "Google Maps couldn't be reached",
}
BACKUP_NOTE = ("{reason}. These results come from OpenStreetMap, a free map that lists fewer "
               "businesses and has no ratings or reviews.")
THIN_CATEGORIES = {BusinessCategory.hoa: (
    "OpenStreetMap lists very few HOAs; try the Property manager category, which finds the "
    "companies that run them.")}


def _reason(error: GoogleUnavailable) -> str:
    return GOOGLE_OFF_REASONS.get(error.reason, "Google Maps search isn't working right now")


def _category_label(category: BusinessCategory) -> str:
    return category.value.replace("_", " ")


async def search_businesses(
    category: BusinessCategory,
    location: str,
    radius_miles: int,
    custom_query: Optional[str],
    max_results: int,
) -> List[PlaceSearchResult]:
    """Ranked businesses from Google, or from OpenStreetMap if Google is down."""
    try:
        return await google_places.search_places(
            category=category, location=location, radius_miles=radius_miles,
            custom_query=custom_query, max_results=max_results)
    except GoogleUnavailable as error:
        reason = _reason(error)
        logger.warning("Google Places unavailable (%s); searching OpenStreetMap instead",
                       error.reason)

    try:
        results = await osm_places.search_places(
            category=category, location=location, radius_miles=radius_miles,
            custom_query=custom_query, max_results=max_results)
    except osm_places.OsmUnavailable:
        raise HTTPException(
            status_code=503,
            detail=(f"{reason}, and the free OpenStreetMap backup is busy right now. "
                    "Try again in a minute."))

    if not results:
        what = f"'{custom_query.strip()}'" if custom_query and custom_query.strip() \
            else _category_label(category)
        hint = THIN_CATEGORIES.get(category, "Try a larger radius or a nearby city.")
        raise HTTPException(
            status_code=404,
            detail=(f"{reason}. The free OpenStreetMap backup found no {what} within "
                    f"{radius_miles} miles of {location}. {hint}"))

    note = BACKUP_NOTE.format(reason=reason)
    return [result.model_copy(update={"source_note": note}) for result in results]
