"""
Google Places API Service
Searches for businesses using Google Places Text Search API.
"""
import httpx
import logging
from typing import List, Optional
from fastapi import HTTPException
from ..config import get_settings
from ..models.prospect import PlaceSearchResult, BusinessCategory

logger = logging.getLogger(__name__)

# Category-specific search queries for air duct cleaning prospects
CATEGORY_SEARCH_QUERIES = {
    BusinessCategory.hoa: "homeowner association",
    BusinessCategory.building_management: "building management company",
    BusinessCategory.hotel: "hotel",
    BusinessCategory.senior_living: "senior living assisted living facility",
    BusinessCategory.medical: "hospital medical center",
    BusinessCategory.restaurant: "restaurant",
    BusinessCategory.property_manager: "property management company",
    BusinessCategory.office_building: "office building commercial office",
    BusinessCategory.school: "school university",
    BusinessCategory.gym: "gym fitness center",
    BusinessCategory.retail: "shopping center mall",
    BusinessCategory.warehouse: "warehouse industrial building",
    BusinessCategory.church: "church religious building",
    BusinessCategory.daycare: "daycare childcare center",
    BusinessCategory.other: "",
}


async def search_places(
    category: BusinessCategory,
    location: str = "Los Angeles, CA",
    radius_miles: int = 25,
    custom_query: Optional[str] = None,
    max_results: int = 60,
) -> List[PlaceSearchResult]:
    """
    Search Google Places API for businesses by category and location.
    
    Uses the Places API Text Search endpoint.
    Falls back to mock data if the API key is missing or the call fails.
    """
    settings = get_settings()
    api_key = settings.GOOGLE_PLACES_API_KEY
    
    if not api_key:
        logger.error("GOOGLE_PLACES_API_KEY not configured")
        raise HTTPException(status_code=500, detail="Google Places API Key is not configured in the backend environment.")
    
    # Build search query
    category_query = CATEGORY_SEARCH_QUERIES.get(category, "")
    if custom_query:
        search_query = f"{custom_query} in {location}"
    else:
        search_query = f"{category_query} in {location}"
    
    radius_meters = int(radius_miles * 1609.34)
    
    url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    params = {
        "query": search_query,
        "radius": radius_meters,
        "key": api_key,
    }
    
    results: List[PlaceSearchResult] = []
    
    async with httpx.AsyncClient() as client:
        try:
            # Fetch up to 3 pages of results (Google returns 20 per page)
            next_page_token = None
            pages_fetched = 0
            
            while pages_fetched < 3 and len(results) < max_results:
                if next_page_token:
                    params["pagetoken"] = next_page_token
                    # Google requires a short delay before using next_page_token
                    import asyncio
                    await asyncio.sleep(2)
                
                response = await client.get(url, params=params, timeout=15.0)
                response.raise_for_status()
                data = response.json()
                
                logger.info(f"Places API response status: {data.get('status')}, results count: {len(data.get('results', []))}")
                
                if data.get("status") == "REQUEST_DENIED":
                    error_msg = data.get('error_message', 'No error message')
                    logger.error(f"Places API REQUEST_DENIED: {error_msg}")
                    raise HTTPException(status_code=502, detail=f"Google API Error: REQUEST_DENIED. {error_msg}")
                
                if data.get("status") == "INVALID_REQUEST":
                    error_msg = data.get('error_message', 'No error message')
                    logger.error(f"Places API INVALID_REQUEST: {error_msg}")
                    if pages_fetched == 0:
                        raise HTTPException(status_code=400, detail=f"Google API Error: INVALID_REQUEST. {error_msg}")
                    break
                
                if data.get("status") not in ("OK", "ZERO_RESULTS"):
                    error_msg = data.get('error_message', data.get('status', 'Unknown error'))
                    logger.error(f"Places API error: {data.get('status')} - {error_msg}")
                    if pages_fetched == 0:
                        raise HTTPException(status_code=502, detail=f"Google API Error: {error_msg}")
                    break
                
                for place in data.get("results", []):
                    if len(results) >= max_results:
                        break
                    result = PlaceSearchResult(
                        place_id=place.get("place_id", ""),
                        name=place.get("name", ""),
                        address=place.get("formatted_address", ""),
                        rating=place.get("rating"),
                        total_ratings=place.get("user_ratings_total"),
                        business_status=place.get("business_status"),
                        types=place.get("types", []),
                    )
                    results.append(result)
                
                next_page_token = data.get("next_page_token")
                pages_fetched += 1
                
                if not next_page_token:
                    break
            
            # Get phone/website details for each place (batch)
            for result in results:
                if result.place_id:
                    details = await _get_place_details(client, result.place_id, api_key)
                    if details:
                        result.phone = details.get("phone")
                        result.website = details.get("website")
                    
        except httpx.HTTPError as e:
            logger.error(f"HTTP error searching places: {e}")
            if not results:
                raise HTTPException(status_code=502, detail=f"Failed to connect to Google Places API: {e}")
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Error searching places: {e}")
            if not results:
                raise HTTPException(status_code=500, detail=f"An unexpected error occurred while searching places: {e}")
    
    if not results:
        logger.warning("0 results found via Google. Expand search radius or change category.")
        
    logger.info(f"Returning {len(results)} search results for '{search_query}'")
    return results


import re
from bs4 import BeautifulSoup

async def _scrape_email_from_website(client: httpx.AsyncClient, website: str) -> Optional[str]:
    """Extremely lightweight web scraper to find an email address on a homepage."""
    if not website:
        return None
        
    try:
        # Some simple headers to bypass basic anti-bot blocks
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
        }
        res = await client.get(website, headers=headers, timeout=5.0, follow_redirects=True)
        if res.status_code != 200:
            return None
            
        soup = BeautifulSoup(res.text, "html.parser")
        
        # Method 1: Look for mailto: links (most reliable)
        mailto_links = soup.select('a[href^="mailto:"]')
        for link in mailto_links:
            href = link.get('href', '')
            email_match = re.search(r'mailto:([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})', href, re.I)
            if email_match:
                return email_match.group(1)
                
        # Method 2: Look for email strings in the text body
        text = soup.get_text(separator=' ')
        email_matches = re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', text)
        for email in email_matches:
            # Filter out common false positives (like example.com or image files like @2x.png)
            email_lower = email.lower()
            if not any(x in email_lower for x in ['.png', '.jpg', '.jpeg', '.gif', '.svg', 'example.com', 'yourdomain.com']):
                return email
                
    except Exception as e:
        logger.debug(f"Failed to scrape email from {website}: {str(e)}")
        
    return None

async def _get_place_details(
    client: httpx.AsyncClient,
    place_id: str,
    api_key: str,
) -> Optional[dict]:
    """Get phone and website details for a specific place, and scrape email if website is returned."""
    url = "https://maps.googleapis.com/maps/api/place/details/json"
    params = {
        "place_id": place_id,
        "fields": "formatted_phone_number,website,name",
        "key": api_key,
    }
    
    try:
        response = await client.get(url, params=params, timeout=10.0)
        response.raise_for_status()
        data = response.json()
        
        if data.get("status") == "OK":
            result = data.get("result", {})
            website = result.get("website")
            
            # Auto-scrape email from the website if we have one
            email = None
            if website:
                email = await _scrape_email_from_website(client, website)
                
            return {
                "phone": result.get("formatted_phone_number"),
                "website": website,
                "email": email,
            }
    except Exception as e:
        logger.warning(f"Error getting place details for {place_id}: {e}")
    
    return None


