"""
Google Places API Service
Searches for businesses using Google Places Text Search API.
"""
import httpx
import logging
from typing import List, Optional
from ..config import get_settings
from ..models.prospect import PlaceSearchResult, BusinessCategory

logger = logging.getLogger(__name__)

# Category-specific search queries for air duct cleaning prospects
CATEGORY_SEARCH_QUERIES = {
    BusinessCategory.hoa: "homeowner association",
    BusinessCategory.building_management: "building management company",
    BusinessCategory.hotel: "hotel",
    BusinessCategory.senior_living: "senior living assisted living facility",
    BusinessCategory.hospital: "hospital medical center",
    BusinessCategory.restaurant: "restaurant",
    BusinessCategory.property_manager: "property management company",
    BusinessCategory.office_building: "office building commercial office",
    BusinessCategory.school: "school university",
    BusinessCategory.gym: "gym fitness center",
    BusinessCategory.shopping_center: "shopping center mall",
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
        logger.warning("GOOGLE_PLACES_API_KEY not configured, returning mock data")
        return _get_mock_results(category, location)
    
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
        except Exception as e:
            logger.error(f"Error searching places: {e}")
            if not results:
                raise HTTPException(status_code=500, detail=f"An unexpected error occurred while searching places: {e}")
    
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


def _get_mock_results(category: BusinessCategory, location: str) -> List[PlaceSearchResult]:
    """Return mock results when API key is not configured or API fails."""
    mock_businesses = {
        BusinessCategory.hoa: [
            ("Sunset Towers HOA", "1234 Sunset Blvd, Los Angeles, CA 90028"),
            ("Pacific Heights Community Association", "5678 Pacific Ave, Los Angeles, CA 90045"),
            ("Downtown LA Homeowners Association", "900 Figueroa St, Los Angeles, CA 90017"),
            ("Beverly Glen HOA", "1200 Beverly Glen Blvd, Los Angeles, CA 90024"),
            ("Westwood Village Owners Association", "10850 Wilshire Blvd, Los Angeles, CA 90024"),
        ],
        BusinessCategory.building_management: [
            ("CBRE Group LA", "400 S Hope St, Los Angeles, CA 90071"),
            ("JLL Property Management", "515 S Flower St, Los Angeles, CA 90071"),
            ("Cushman & Wakefield", "601 S Figueroa St, Los Angeles, CA 90017"),
            ("Greystar Management", "777 S Figueroa St, Los Angeles, CA 90017"),
            ("Lincoln Property Company", "1999 Avenue of the Stars, Los Angeles, CA 90067"),
        ],
        BusinessCategory.hotel: [
            ("The Grand Hotel LA", "333 S Grand Ave, Los Angeles, CA 90071"),
            ("Beverly Hills Luxury Resort", "9876 Wilshire Blvd, Beverly Hills, CA 90210"),
            ("Santa Monica Ocean View Hotel", "1515 Ocean Ave, Santa Monica, CA 90401"),
            ("Hollywood Roosevelt Hotel", "7000 Hollywood Blvd, Los Angeles, CA 90028"),
            ("The Standard Downtown LA", "550 S Flower St, Los Angeles, CA 90071"),
        ],
        BusinessCategory.senior_living: [
            ("Sunrise Senior Living LA", "1900 Pico Blvd, Los Angeles, CA 90006"),
            ("Belmont Village Senior Living", "10475 Wilshire Blvd, Los Angeles, CA 90024"),
            ("Brookdale Santa Monica", "1540 7th St, Santa Monica, CA 90401"),
            ("Silverado Beverly Place", "1249 S Camden Dr, Los Angeles, CA 90035"),
            ("Pacifica Senior Living", "12000 Washington Blvd, Los Angeles, CA 90066"),
        ],
        BusinessCategory.hospital: [
            ("LA General Medical Center", "2051 Marengo St, Los Angeles, CA 90033"),
            ("Westside Community Hospital", "8900 W Pico Blvd, Los Angeles, CA 90035"),
            ("Valley Health Center", "14500 Roscoe Blvd, Van Nuys, CA 91402"),
            ("Cedars-Sinai Medical Center", "8700 Beverly Blvd, Los Angeles, CA 90048"),
            ("UCLA Medical Center", "757 Westwood Plaza, Los Angeles, CA 90095"),
        ],
        BusinessCategory.restaurant: [
            ("Golden Dragon Restaurant", "960 N Broadway, Los Angeles, CA 90012"),
            ("Sunset Grill & Bar", "7439 Sunset Blvd, Los Angeles, CA 90046"),
            ("Pacific Coast Kitchen", "2800 Main St, Santa Monica, CA 90405"),
            ("The Ivy", "113 N Robertson Blvd, Los Angeles, CA 90048"),
            ("Nobu Malibu", "22706 Pacific Coast Hwy, Malibu, CA 90265"),
        ],
        BusinessCategory.property_manager: [
            ("Westside Property Management", "11661 San Vicente Blvd, Los Angeles, CA 90049"),
            ("LA Property Solutions", "3699 Wilshire Blvd, Los Angeles, CA 90010"),
            ("Pacific Property Group", "2600 Michelson Dr, Irvine, CA 92612"),
            ("Elite Property Management", "433 N Camden Dr, Beverly Hills, CA 90210"),
            ("Urban Living Properties", "1800 N Highland Ave, Los Angeles, CA 90028"),
        ],
        BusinessCategory.office_building: [
            ("US Bank Tower", "633 W 5th St, Los Angeles, CA 90071"),
            ("Two California Plaza", "350 S Grand Ave, Los Angeles, CA 90071"),
            ("Century Park Towers", "2049 Century Park E, Los Angeles, CA 90067"),
            ("Wilshire Grand Center", "900 Wilshire Blvd, Los Angeles, CA 90017"),
            ("AON Center", "707 Wilshire Blvd, Los Angeles, CA 90017"),
        ],
        BusinessCategory.school: [
            ("Harvard-Westlake School", "3700 Coldwater Canyon Ave, Studio City, CA 91604"),
            ("Loyola High School", "1901 Venice Blvd, Los Angeles, CA 90006"),
            ("Windward School", "11350 Palms Blvd, Los Angeles, CA 90066"),
            ("Brentwood School", "100 S Barrington Pl, Los Angeles, CA 90049"),
            ("Marlborough School", "250 S Rossmore Ave, Los Angeles, CA 90004"),
        ],
        BusinessCategory.gym: [
            ("Equinox Sports Club LA", "1835 S Sepulveda Blvd, Los Angeles, CA 90025"),
            ("Gold's Gym Venice", "360 Hampton Dr, Venice, CA 90291"),
            ("LA Fitness Hollywood", "6633 Hollywood Blvd, Los Angeles, CA 90028"),
            ("CrossFit Santa Monica", "2901 Ocean Park Blvd, Santa Monica, CA 90405"),
            ("Bay Club Santa Monica", "2215 Main St, Santa Monica, CA 90405"),
        ],
        BusinessCategory.shopping_center: [
            ("The Grove", "189 The Grove Dr, Los Angeles, CA 90036"),
            ("Beverly Center", "8500 Beverly Blvd, Los Angeles, CA 90048"),
            ("Westfield Century City", "10250 Santa Monica Blvd, Los Angeles, CA 90067"),
            ("Santa Monica Place", "395 Santa Monica Pl, Santa Monica, CA 90401"),
            ("The Americana at Brand", "889 Americana Way, Glendale, CA 91210"),
        ],
        BusinessCategory.warehouse: [
            ("Downtown LA Arts District Warehouse", "1800 Industrial St, Los Angeles, CA 90021"),
            ("South Bay Industrial Complex", "19000 S Western Ave, Torrance, CA 90501"),
            ("Vernon Industrial Center", "5000 S Soto St, Vernon, CA 90058"),
            ("Commerce Business Park", "5900 S Eastern Ave, Commerce, CA 90040"),
            ("Prologis LA South", "14800 S Broadway, Gardena, CA 90248"),
        ],
        BusinessCategory.church: [
            ("First AME Church of Los Angeles", "2270 S Harvard Blvd, Los Angeles, CA 90018"),
            ("Cathedral of Our Lady of the Angels", "555 W Temple St, Los Angeles, CA 90012"),
            ("Hillsong LA", "950 Laurel Canyon Blvd, Studio City, CA 91604"),
            ("West Angeles Cathedral", "3045 Crenshaw Blvd, Los Angeles, CA 90016"),
            ("Mosaic Church", "145 N Raymond Ave, Pasadena, CA 91103"),
        ],
        BusinessCategory.daycare: [
            ("Bright Horizons Downtown LA", "333 S Grand Ave, Los Angeles, CA 90071"),
            ("KinderCare Westwood", "1500 Westwood Blvd, Los Angeles, CA 90024"),
            ("La Petite Academy Santa Monica", "2828 Colorado Ave, Santa Monica, CA 90404"),
            ("The Learning Experience", "6200 Wilshire Blvd, Los Angeles, CA 90048"),
            ("Children's Creative Center", "1400 N Cahuenga Blvd, Los Angeles, CA 90028"),
        ],
    }
    
    businesses = mock_businesses.get(category, [
        (f"Sample {category.value} Business 1", f"123 Main St, {location}"),
        (f"Sample {category.value} Business 2", f"456 Oak Ave, {location}"),
        (f"Sample {category.value} Business 3", f"789 Elm Dr, {location}"),
        (f"Sample {category.value} Business 4", f"1010 Pine St, {location}"),
        (f"Sample {category.value} Business 5", f"2020 Cedar Ln, {location}"),
    ])
    
    results = []
    for i, (name, address) in enumerate(businesses):
        results.append(PlaceSearchResult(
            place_id=f"mock_{category.value}_{i}",
            name=name,
            address=address,
            phone="(213) 555-0" + str(100 + i),
            website=f"https://www.{name.lower().replace(' ', '').replace('&', 'and')}.com",
            rating=round(3.5 + (i * 0.3), 1),
            total_ratings=50 + (i * 25),
            business_status="OPERATIONAL",
            types=["establishment"],
        ))
    
    return results
