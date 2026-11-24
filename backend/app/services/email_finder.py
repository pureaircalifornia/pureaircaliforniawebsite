"""
Email Finder Service

Finds contact emails and a contact name for a business by reading its own
website. Every address returned was published by the business; nothing is
invented. Pattern guesses (info@, facilities@ ...) are still offered so a person
can check one by hand, but they are marked "pattern guess", graded "guessed" and
never auto-selected or auto-sent, because mail to non-existent mailboxes bounces
and bounces are what damage a sending domain.
"""
import asyncio
import ipaddress
import json
import logging
import re
import socket
from typing import Dict, List, Optional, Tuple
from urllib.parse import urljoin, urlparse

import httpx
from bs4 import BeautifulSoup

from .prospect_quality import SENDABLE_GRADES, best_email, grade_email, normalize_domain

logger = logging.getLogger(__name__)

# The lookbehind and the length caps keep this linear: without them a long run
# of letters with no "@" makes the engine retry from every position, and one
# hostile page could pin the server for minutes.
EMAIL_REGEX = re.compile(
    r"(?<![A-Za-z0-9._%+\-])[A-Za-z0-9._%+\-]{1,64}@[A-Za-z0-9\-]{1,63}"
    r"(?:\.[A-Za-z0-9\-]{1,63}){0,4}\.[A-Za-z]{2,24}(?![A-Za-z0-9\-])"
)

# "jane [at] acme [dot] com", "jane(at)acme.com". Only bracketed forms count:
# matching the bare word "at" turns "Visit us at www.acme.com" into an address.
OBFUSCATED_REGEX = re.compile(
    r"(?<![A-Za-z0-9._%+\-])([A-Za-z0-9._%+\-]{2,40})\s{0,3}(?:\[at\]|\(at\)|\{at\})\s{0,3}"
    r"([A-Za-z0-9\-]{2,40}(?:\s{0,3}(?:\[dot\]|\(dot\)|\{dot\}|\.)\s{0,3}[A-Za-z0-9\-]{2,40}){1,3})",
    re.IGNORECASE,
)
_DOT_WORD = re.compile(r"\s*(?:\[dot\]|\(dot\)|\{dot\})\s*", re.IGNORECASE)

# Domains whose addresses show up in page source but are never the business.
SKIP_EMAIL_DOMAINS = (
    "example.com", "sentry.io", "wixpress.com", "googleapis.com", "w3.org",
    "schema.org", "facebook.com", "twitter.com", "instagram.com", "youtube.com",
    "google.com", "jquery.com", "cloudflare.com", "cloudfront.net", "amazonaws.com",
    "godaddy.com", "squarespace.com", "wix.com", "wordpress.com", "sentry-next.wixpress.com",
    "domain.com", "yourdomain.com", "email.com",
)
ASSET_SUFFIXES = (".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".css", ".js")

# Pages most likely to list a decision maker.
CONTACT_PATHS = (
    "/contact", "/contact-us", "/about", "/about-us", "/team", "/our-team",
    "/staff", "/management", "/leadership", "/board",
)

ROLE_GUESSES = ("info", "office", "facilities", "maintenance", "manager", "contact")

# Titles of the people who approve duct / dryer-vent work.
TARGET_ROLES = (
    "facilities manager", "facility manager", "director of facilities",
    "property manager", "community manager", "community association manager",
    "portfolio manager", "regional manager", "building manager", "building engineer",
    "chief engineer", "director of engineering", "maintenance manager",
    "maintenance supervisor", "maintenance director", "director of operations",
    "operations manager", "general manager", "executive director", "administrator",
    "office manager", "owner", "president", "board president", "principal",
    "practice manager", "director",
)
_NAME_RE = re.compile(r"\b([A-Z][a-z]+(?:[-'][A-Z][a-z]+)?\s+(?:[A-Z]\.\s+)?[A-Z][a-z]+(?:[-'][A-Z][a-z]+)?)\b")
_NOT_NAMES = {
    "manager", "president", "director", "welcome", "about", "contact", "home", "our",
    "team", "property", "facilities", "facility", "general", "community", "office",
    "building", "operations", "maintenance", "executive", "chief", "engineer", "owner",
    "board", "regional", "portfolio", "practice", "principal", "administrator", "the",
    "los", "angeles", "santa", "monica", "beverly", "hills", "san", "north", "south",
    "east", "west", "privacy", "policy", "terms", "service", "services", "learn", "more",
    "read", "view", "call", "email", "meet", "senior", "living", "assisted", "care",
}

MAX_PAGE_BYTES = 600_000
MAX_REDIRECTS = 5
FETCH_TIMEOUT = 10.0          # per network read
FETCH_DEADLINE = 15.0         # whole request, however slowly the body arrives
MAX_CONCURRENT_PAGES = 4

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml",
    "Accept-Language": "en-US,en;q=0.9",
}


# ── Network safety ────────────────────────────────────────────────────

_NAT64_PREFIX = ipaddress.ip_network("64:ff9b::/96")


def _is_public_address(raw: str) -> bool:
    try:
        address = ipaddress.ip_address(raw)
    except ValueError:
        return False
    if isinstance(address, ipaddress.IPv6Address):
        if address.ipv4_mapped:
            address = address.ipv4_mapped
        elif address in _NAT64_PREFIX:
            # The low 32 bits are an IPv4 address reached through a gateway.
            address = ipaddress.IPv4Address(int(address) & 0xFFFFFFFF)
    # is_global is False for private, loopback, link-local, carrier-grade NAT,
    # reserved and multicast ranges alike.
    return address.is_global


def resolve_public_ip(host: Optional[str]) -> Optional[str]:
    """
    Resolve a host and return one address to connect to, or None unless every
    address it resolves to is publicly routable.

    The website field is editable and comes from third parties, so without this
    the scraper could be pointed at localhost, a cloud metadata address or
    another internal service.
    """
    if not host:
        return None
    try:
        infos = socket.getaddrinfo(host, None, type=socket.SOCK_STREAM)
    except (socket.gaierror, UnicodeError):
        return None
    addresses = [info[4][0] for info in infos]
    if not addresses or not all(_is_public_address(address) for address in addresses):
        return None
    return addresses[0]


def is_public_host(host: Optional[str]) -> bool:
    return resolve_public_ip(host) is not None


async def domain_accepts_mail(domain: Optional[str]) -> Optional[bool]:
    """True/False when DNS gives a clear answer on MX records, None when unknown."""
    if not domain:
        return False
    try:
        import dns.asyncresolver
        import dns.exception
        import dns.resolver
    except ImportError:  # dnspython ships with pymongo; treat absence as "unknown"
        return None
    try:
        resolver = dns.asyncresolver.Resolver()
        resolver.lifetime = 5.0
        answers = await resolver.resolve(domain, "MX")
        # A single "." exchange is a null MX: the domain declares it takes no mail.
        return any(str(record.exchange).strip(".") for record in answers)
    except (dns.resolver.NXDOMAIN, dns.resolver.NoAnswer):
        return False
    except dns.exception.DNSException:
        return None
    except Exception as exc:  # resolver misconfiguration must not break enrichment
        logger.debug("MX lookup failed for %s: %s", domain, exc)
        return None


# ── Extraction (pure) ─────────────────────────────────────────────────

def decode_cloudflare_email(encoded: str) -> Optional[str]:
    """Decode Cloudflare's data-cfemail obfuscation (XOR with the first byte)."""
    try:
        key = int(encoded[:2], 16)
        decoded = "".join(
            chr(int(encoded[i:i + 2], 16) ^ key) for i in range(2, len(encoded), 2)
        )
    except (ValueError, IndexError):
        return None
    return decoded if "@" in decoded else None


def _clean_email(raw: str) -> Optional[str]:
    email = raw.strip().strip(".,;:()<>[]\"'").lower()
    if email.startswith("mailto:"):
        email = email[7:]
    email = email.split("?")[0]
    if "@" not in email or len(email) > 80 or email.endswith(ASSET_SUFFIXES):
        return None
    domain = email.split("@", 1)[1]
    if any(domain == skip or domain.endswith("." + skip) for skip in SKIP_EMAIL_DOMAINS):
        return None
    if not EMAIL_REGEX.fullmatch(email):
        return None
    return email


def extract_emails(html: str) -> List[str]:
    """Pull every published address out of a page, including obfuscated ones."""
    found: List[str] = []
    try:
        soup = BeautifulSoup(html, "html.parser")
    except Exception:
        soup = None

    if soup is not None:
        for link in soup.find_all("a", href=True):
            href = link["href"]
            if href.lower().startswith("mailto:"):
                found.append(href)
            elif "/cdn-cgi/l/email-protection#" in href:
                decoded = decode_cloudflare_email(href.split("#", 1)[1])
                if decoded:
                    found.append(decoded)
        for node in soup.find_all(attrs={"data-cfemail": True}):
            decoded = decode_cloudflare_email(node["data-cfemail"])
            if decoded:
                found.append(decoded)
        for script in soup.find_all("script", type="application/ld+json"):
            found.extend(_emails_from_json_ld(script.string or ""))
        text = soup.get_text(separator=" ")
    else:
        text = re.sub(r"<[^>]{0,2000}>", " ", html)

    # Visible text only. Raw markup is full of escapes and script noise that
    # look like addresses and are not.
    found.extend(EMAIL_REGEX.findall(text))
    for local, domain in OBFUSCATED_REGEX.findall(text):
        found.append(f"{local}@{_DOT_WORD.sub('.', domain).replace(' ', '')}")

    cleaned: List[str] = []
    for raw in found:
        email = _clean_email(raw)
        if email and email not in cleaned:
            cleaned.append(email)
    return cleaned


def _emails_from_json_ld(payload: str) -> List[str]:
    try:
        data = json.loads(payload)
    except (ValueError, TypeError):
        return []
    emails: List[str] = []

    def walk(node):
        if isinstance(node, dict):
            for key, value in node.items():
                if key == "email" and isinstance(value, str):
                    emails.append(value)
                else:
                    walk(value)
        elif isinstance(node, list):
            for item in node:
                walk(item)

    walk(data)
    return emails


def extract_contacts(html: str) -> List[Dict]:
    """Find "Name - Title" pairs on a page: [{name, title, score}]."""
    try:
        soup = BeautifulSoup(html, "html.parser")
    except Exception:
        return []
    contacts: Dict[str, Dict] = {}
    for element in soup.find_all(["div", "p", "span", "li", "td", "h2", "h3", "h4", "h5", "figcaption"]):
        text = " ".join(element.get_text(separator=" ").split())
        if not (8 <= len(text) <= 160):
            continue
        lowered = text.lower()
        role = next((r for r in TARGET_ROLES if re.search(rf"\b{re.escape(r)}\b", lowered)), None)
        if not role:
            continue
        for name in _NAME_RE.findall(text):
            words = [w.strip(".").lower() for w in name.split()]
            if any(word in _NOT_NAMES for word in words):
                continue
            # Earlier roles in TARGET_ROLES are closer to the buying decision.
            score = 100 - TARGET_ROLES.index(role)
            existing = contacts.get(name)
            if not existing or existing["score"] < score:
                contacts[name] = {"name": name, "title": role.title(), "score": score}
    return sorted(contacts.values(), key=lambda c: c["score"], reverse=True)


def match_name_to_email(email: str, contacts: List[Dict]) -> Optional[Dict]:
    """Return the contact whose name matches the mailbox (jsmith@, jane.smith@)."""
    local = email.split("@", 1)[0].lower()
    for contact in contacts:
        parts = contact["name"].lower().replace(".", "").split()
        first, last = parts[0], parts[-1]
        patterns = {first, last, f"{first}.{last}", f"{first}{last}", f"{first[0]}{last}",
                    f"{first}{last[0]}", f"{first}_{last}", f"{first[0]}.{last}"}
        if local in patterns:
            return contact
    return None


def _score(email: str, business_domain: Optional[str], on_contact_page: bool) -> Tuple[int, str]:
    grade = grade_email(email, business_domain, "website")
    base = {"named": 90, "buyer_role": 80, "role": 60, "free_mail": 50,
            "other_domain": 25}.get(grade, 0)
    return (base + (5 if on_contact_page and base else 0), grade)


# ── Fetching ──────────────────────────────────────────────────────────

async def _read_capped(client: httpx.AsyncClient, url: str) -> Optional[Tuple[int, dict, str]]:
    """
    GET one URL without following redirects. Returns (status, headers, text),
    reading at most MAX_PAGE_BYTES of the decoded body.

    The connection goes to the address that was just validated, not to
    whatever the name resolves to a moment later, so a DNS answer that changes
    between the check and the request cannot redirect us somewhere internal.
    """
    parsed = urlparse(url)
    if parsed.scheme not in ("http", "https") or not parsed.hostname:
        return None
    host = parsed.hostname
    address = await asyncio.to_thread(resolve_public_ip, host)
    if not address:
        return None
    netloc = f"[{address}]" if ":" in address else address
    if parsed.port:
        netloc += f":{parsed.port}"
    target = parsed._replace(netloc=netloc).geturl()
    host_header = host if not parsed.port else f"{host}:{parsed.port}"

    async with client.stream(
        "GET", target, headers={"Host": host_header},
        extensions={"sni_hostname": host}, timeout=FETCH_TIMEOUT,
    ) as response:
        headers = dict(response.headers)
        if response.is_redirect or response.status_code != 200:
            return response.status_code, headers, ""
        content_type = headers.get("content-type", "")
        if "html" not in content_type and "text/plain" not in content_type:
            return response.status_code, headers, ""
        chunks: List[bytes] = []
        size = 0
        async for chunk in response.aiter_bytes():
            chunks.append(chunk)
            size += len(chunk)
            if size >= MAX_PAGE_BYTES:
                break
        body = b"".join(chunks)[:MAX_PAGE_BYTES]
        return response.status_code, headers, body.decode(response.encoding or "utf-8", "replace")


async def _fetch(client: httpx.AsyncClient, url: str) -> Optional[str]:
    """Fetch a page, following up to MAX_REDIRECTS redirects one checked hop at a time."""
    async def run() -> Optional[str]:
        current = url
        for _ in range(MAX_REDIRECTS + 1):
            result = await _read_capped(client, current)
            if result is None:
                return None
            status, headers, text = result
            location = headers.get("location")
            if 300 <= status < 400 and location:
                current = urljoin(current, location)
                continue
            return (text or None) if status == 200 else None
        return None

    try:
        return await asyncio.wait_for(run(), timeout=FETCH_DEADLINE)
    except Exception as exc:  # timeouts, TLS and protocol errors: this page is skipped
        logger.debug("Could not fetch %s: %s", urlparse(url).hostname, type(exc).__name__)
        return None


def _discover_contact_links(html: str, base_url: str, site_host: str) -> List[str]:
    """Same-site links whose text or path suggests a contact / team page."""
    try:
        soup = BeautifulSoup(html, "html.parser")
    except Exception:
        return []
    links: List[str] = []
    for anchor in soup.find_all("a", href=True):
        label = (anchor.get_text() or "").lower()
        href = anchor["href"]
        haystack = f"{label} {href.lower()}"
        if not any(word in haystack for word in ("contact", "about", "team", "staff",
                                                 "management", "leadership", "board")):
            continue
        absolute = urljoin(base_url, href).split("#")[0]
        host = (urlparse(absolute).hostname or "").lower()
        if host.replace("www.", "") == site_host and absolute not in links:
            links.append(absolute)
    return links[:6]


async def find_emails_for_business(
    website_url: Optional[str],
    business_name: Optional[str] = None,
    phone: Optional[str] = None,
) -> Dict:
    """
    Find contact emails for a business.

    Returns:
        emails            [{email, source, confidence, grade}] best first
        best              the best *sendable* entry, or None
        domain            the business's own domain
        mx_valid          True / False / None (unknown)
        top_contact_name  best decision-maker name found, or None
        top_contact_title that person's title, or None
        contacts          every {name, title} found
        pages_scraped     how many pages were read
    """
    empty = {"emails": [], "best": None, "domain": None, "mx_valid": None,
             "top_contact_name": None, "top_contact_title": None,
             "contacts": [], "pages_scraped": 0}
    domain = normalize_domain(website_url)
    if not website_url or not domain:
        return empty

    base_url = website_url.strip()
    if not base_url.startswith(("http://", "https://")):
        base_url = "https://" + base_url

    found: Dict[str, Dict] = {}
    contacts: Dict[str, Dict] = {}
    pages_scraped = 0

    def absorb(html: str, source: str, on_contact_page: bool) -> None:
        for email in extract_emails(html):
            confidence, grade = _score(email, domain, on_contact_page)
            # "other_domain" is kept for a person to judge (a parent company, or
            # the web designer); it is never selected automatically.
            if grade not in SENDABLE_GRADES and grade != "other_domain":
                continue
            if email not in found or found[email]["confidence"] < confidence:
                found[email] = {"email": email, "source": source,
                                "confidence": confidence, "grade": grade}
        for contact in extract_contacts(html):
            existing = contacts.get(contact["name"])
            if not existing or existing["score"] < contact["score"]:
                contacts[contact["name"]] = contact

    # verify=False: plenty of small-business sites serve expired certificates,
    # and this client only ever reads public pages.
    async with httpx.AsyncClient(
        follow_redirects=False, timeout=FETCH_TIMEOUT, headers=HEADERS, verify=False,
    ) as client:
        homepage = await _fetch(client, base_url)
        if homepage:
            pages_scraped += 1
            # HTML parsing is CPU-bound; keep it off the event loop so one big
            # page cannot stall every other request on the server.
            await asyncio.to_thread(absorb, homepage, "homepage", False)

        candidates = await asyncio.to_thread(
            _discover_contact_links, homepage or "", base_url, domain)
        for path in CONTACT_PATHS:
            url = urljoin(base_url, path)
            if url not in candidates:
                candidates.append(url)
        candidates = candidates[:12]

        semaphore = asyncio.Semaphore(MAX_CONCURRENT_PAGES)

        async def read(url: str) -> Tuple[str, Optional[str]]:
            async with semaphore:
                return url, await _fetch(client, url)

        for url, html in await asyncio.gather(*(read(u) for u in candidates)):
            if not html:
                continue
            pages_scraped += 1
            await asyncio.to_thread(
                absorb, html, f"contact page ({urlparse(url).path or '/'})", True)

    mx_valid = await domain_accepts_mail(domain)
    contact_list = sorted(contacts.values(), key=lambda c: c["score"], reverse=True)

    # A mailbox that matches a named decision maker is the best possible result.
    for entry in found.values():
        match = match_name_to_email(entry["email"], contact_list)
        if match:
            entry["confidence"] += 10
            entry["contact_name"] = match["name"]
            entry["contact_title"] = match["title"]

    emails = sorted(found.values(), key=lambda e: e["confidence"], reverse=True)

    # On-domain addresses cannot be delivered if the domain takes no mail.
    if mx_valid is False:
        emails = [e for e in emails if e["grade"] in ("free_mail", "other_domain")]

    if not any(e["grade"] in SENDABLE_GRADES for e in emails) and mx_valid is not False:
        emails = emails + [
            {"email": f"{prefix}@{domain}", "source": "pattern guess",
             "confidence": 10, "grade": "guessed"}
            for prefix in ROLE_GUESSES
        ]

    best = best_email(emails, domain)
    top = None
    if best and best.get("contact_name"):
        top = {"name": best["contact_name"], "title": best.get("contact_title")}
    elif contact_list:
        top = contact_list[0]

    return {
        "emails": emails[:10],
        "best": best,
        "domain": domain,
        "mx_valid": mx_valid,
        "top_contact_name": top["name"] if top else None,
        "top_contact_title": top.get("title") if top else None,
        "contacts": [{"name": c["name"], "title": c["title"]} for c in contact_list[:8]],
        "pages_scraped": pages_scraped,
    }
