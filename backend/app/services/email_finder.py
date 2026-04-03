"""
Email Finder Service
Automatically discovers contact emails for businesses by scraping their websites
and generating common email patterns.
"""
import re
import logging
from typing import List, Optional, Dict
from urllib.parse import urlparse, urljoin
import httpx
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)

# Email regex pattern
EMAIL_REGEX = re.compile(
    r'[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}',
    re.IGNORECASE,
)

# Emails to skip (generic, not useful)
SKIP_EMAILS = {
    "example.com", "sentry.io", "wixpress.com", "googleapis.com",
    "w3.org", "schema.org", "facebook.com", "twitter.com",
    "instagram.com", "youtube.com", "google.com", "jquery.com",
    "cloudflare.com", "cloudfront.net", "amazonaws.com",
}

# Pages most likely to contain contact emails
CONTACT_PATHS = [
    "/contact", "/contact-us", "/about", "/about-us",
    "/team", "/our-team", "/staff", "/management",
    "/careers", "/jobs", "/support", "/help",
]

# Role-based prefixes ranked by relevance for facility management outreach
ROLE_PREFIXES = [
    "facilities", "maintenance", "operations", "manager",
    "director", "admin", "office", "general",
    "building", "property", "management",
    "info", "contact", "hello", "inquiries", "enquiries",
    "front.desk", "frontdesk", "reception",
]


async def find_emails_for_business(
    website_url: Optional[str],
    business_name: Optional[str] = None,
    phone: Optional[str] = None,
) -> Dict:
    """
    Find contact emails for a business.
    
    Strategy:
    1. Scrape the business website homepage + contact pages
    2. Extract all email addresses found
    3. Generate common pattern guesses from the domain
    4. Rank and deduplicate results
    
    Returns dict with:
        - emails: list of {email, source, confidence} dicts
        - domain: the business domain
        - top_contact_name: optional, best guess for contact name
        - pages_scraped: number of pages checked
    """
    if not website_url:
        return {"emails": [], "domain": None, "pages_scraped": 0}
    
    # Normalize URL
    if not website_url.startswith(("http://", "https://")):
        website_url = "https://" + website_url
    
    parsed = urlparse(website_url)
    domain = parsed.hostname
    if not domain:
        return {"emails": [], "domain": None, "pages_scraped": 0}
    
    # Strip www. for email domain
    email_domain = domain.replace("www.", "")
    
    found_emails: Dict[str, Dict] = {}  # email -> {source, confidence}
    found_names: Dict[str, int] = {}    # name -> confidence score
    pages_scraped = 0
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
    }
    
    async with httpx.AsyncClient(
        follow_redirects=True,
        timeout=12.0,
        headers=headers,
        verify=False,  # Some business sites have bad SSL
    ) as client:
        # 1. Scrape homepage
        emails_from_page, names_from_page = await _scrape_page_for_emails_and_names(client, website_url)
        pages_scraped += 1
        for email in emails_from_page:
            if _is_valid_business_email(email, email_domain):
                found_emails[email.lower()] = {
                    "source": "homepage",
                    "confidence": _score_email(email, email_domain),
                }
        for name, score in names_from_page.items():
            found_names[name] = max(found_names.get(name, 0), score)

        # 2. Scrape contact/about pages
        for path in CONTACT_PATHS:
            contact_url = urljoin(website_url, path)
            try:
                emails_from_page, names_from_page = await _scrape_page_for_emails_and_names(client, contact_url)
                pages_scraped += 1
                for email in emails_from_page:
                    if _is_valid_business_email(email, email_domain):
                        existing = found_emails.get(email.lower())
                        score = _score_email(email, email_domain) + 10  # Bonus for contact page
                        if not existing or existing["confidence"] < score:
                            found_emails[email.lower()] = {
                                "source": f"contact page ({path})",
                                "confidence": score,
                            }
                for name, score in names_from_page.items():
                    found_names[name] = max(found_names.get(name, 0), score + 10) # Bonus for contact page
            except Exception:
                continue  # Skip pages that don't exist
            
            # Stop if we found enough emails
            if len(found_emails) >= 5 and len(found_names) > 0:
                break
    
    # 3. Fallback: DuckDuckGo Deep Search if no emails found natively
    if not found_emails:
        logger.info(f"Native site scrape failed for {email_domain}. Falling back to DuckDuckGo search.")
        try:
            from duckduckgo_search import AsyncDDGS
            search_query = f'"{business_name}" email OR contact "@{email_domain}"' if business_name else f'contact email "@{email_domain}"'
            async with AsyncDDGS() as ddgs:
                results = [r async for r in ddgs.text(search_query, max_results=5)]
                for r in results:
                    snippet = r.get("body", "") + " " + r.get("title", "")
                    ddg_emails = EMAIL_REGEX.findall(snippet)
                    for email in ddg_emails:
                        if _is_valid_business_email(email, email_domain):
                            existing = found_emails.get(email.lower())
                            score = _score_email(email, email_domain) + 15  # Good confidence for public web listing
                            if not existing or existing["confidence"] < score:
                                found_emails[email.lower()] = {
                                    "source": "web directory search",
                                    "confidence": score,
                                }
        except Exception as e:
            logger.warning(f"DuckDuckGo fallback failed: {e}")
            
    # 4. Generate common pattern guesses if STILL no emails found
    if not found_emails:
        for prefix in ROLE_PREFIXES[:8]:  # Top 8 most likely
            guess = f"{prefix}@{email_domain}"
            found_emails[guess] = {
                "source": "pattern guess",
                "confidence": _score_email(guess, email_domain) - 20,  # Lower confidence
            }
    
    # Sort by confidence
    email_list = [
        {"email": email, **info}
        for email, info in sorted(
            found_emails.items(),
            key=lambda x: x[1]["confidence"],
            reverse=True,
        )
    ]
    
    # Extract best name
    top_contact_name = None
    if found_names:
        top_name_tuple = sorted(found_names.items(), key=lambda x: x[1], reverse=True)[0]
        if top_name_tuple[1] > 20: # Must be somewhat confident
            top_contact_name = top_name_tuple[0]

    # Return top 10
    return {
        "emails": email_list[:10],
        "domain": email_domain,
        "top_contact_name": top_contact_name,
        "pages_scraped": pages_scraped,
    }


async def _scrape_page_for_emails_and_names(
    client: httpx.AsyncClient,
    url: str,
) -> tuple[List[str], Dict[str, int]]:
    """Fetch a page and extract email addresses and potential contact names."""
    try:
        response = await client.get(url, timeout=10.0)
        if response.status_code != 200:
            return [], {}
        
        content_type = response.headers.get("content-type", "")
        if "text/html" not in content_type and "text/plain" not in content_type:
            return [], {}
        
        html = response.text
        
        # Extract from raw HTML (catches mailto: links and text)
        raw_emails = EMAIL_REGEX.findall(html)
        
        # Extract names using heuristic approach near target titles
        found_names = {}
        target_roles = [
            "facilities manager", "property manager", "facility manager",
            "director of operations", "general manager", "president",
            "hoa president", "community manager", "maintenance manager",
            "building manager", "chief engineer",
        ]
        
        try:
            soup = BeautifulSoup(html, "html.parser")
            for link in soup.find_all("a", href=True):
                href = link["href"]
                if href.startswith("mailto:"):
                    email = href.replace("mailto:", "").split("?")[0].strip()
                    if email and "@" in email:
                        raw_emails.append(email)
                        
            # Simplistic Name Extraction: look for elements containing target roles
            for elem in soup.find_all(['div', 'p', 'span', 'li', 'td', 'h3', 'h4', 'strong', 'b']):
                text = elem.get_text().strip()
                if len(text) < 150: # Short block of text (like a team card)
                    text_lower = text.lower()
                    for role in target_roles:
                        if role in text_lower:
                            # Use regex to find capitalized words near the role
                            import re
                            # Looks for 2-3 capitalized words
                            names = re.findall(r'([A-Z][a-z]+ [A-Z][a-z]+(?: [A-Z][a-z]+)?)', text)
                            for name in names:
                                # Penalize very short or very long
                                if 4 < len(name) < 25 and not any(x in name.lower() for x in ["manager", "president", "director", "welcome", "about", "contact", "home"]):
                                    found_names[name] = found_names.get(name, 0) + 50
                            break
        except Exception:
            pass
        
        return list(set(raw_emails)), found_names
        
    except Exception as e:
        logger.debug(f"Could not scrape {url}: {e}")
        return [], {}


def _is_valid_business_email(email: str, expected_domain: str) -> bool:
    """Check if an email is a valid business email (not spam/generic)."""
    email = email.lower().strip()
    
    # Must have @ and a dot in domain
    if "@" not in email or "." not in email.split("@")[1]:
        return False
    
    # Skip emails from known non-business domains
    email_domain = email.split("@")[1]
    for skip in SKIP_EMAILS:
        if skip in email_domain:
            return False
    
    # Skip common false positives
    if email.endswith(".png") or email.endswith(".jpg") or email.endswith(".gif"):
        return False
    
    # Skip very long emails (likely scraping artifacts)
    if len(email) > 60:
        return False
    
    return True


def _score_email(email: str, expected_domain: str) -> int:
    """
    Score an email by relevance for business outreach.
    Higher = more relevant.
    """
    score = 50  # Base score
    email_lower = email.lower()
    local_part = email_lower.split("@")[0]
    email_domain = email_lower.split("@")[1]
    
    # Exact domain match is a big bonus
    if email_domain == expected_domain:
        score += 30
    
    # Role-based scoring
    high_value = ["manager", "facilities", "maintenance", "operations", "director", "building", "property"]
    medium_value = ["admin", "office", "general", "gm", "front"]
    low_value = ["info", "contact", "hello", "inquiries", "support", "help"]
    
    for keyword in high_value:
        if keyword in local_part:
            score += 25
            break
    else:
        for keyword in medium_value:
            if keyword in local_part:
                score += 15
                break
        else:
            for keyword in low_value:
                if keyword in local_part:
                    score += 5
                    break
    
    # Personal name emails (e.g., john@) are good
    if re.match(r'^[a-z]{2,15}$', local_part):
        score += 10
    if "." in local_part and len(local_part.split(".")) == 2:
        # firstname.lastname pattern
        score += 20
    
    # Penalty for noreply/unsubscribe
    if any(x in local_part for x in ["noreply", "no-reply", "unsubscribe", "do-not-reply", "mailer-daemon"]):
        score -= 100
    
    return score
