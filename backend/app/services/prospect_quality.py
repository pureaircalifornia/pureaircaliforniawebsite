"""
Prospect data quality.

Pure functions (no I/O) that decide how good a prospect record is: how well the
business fits what Pure Air California sells, and how safe the email address is
to send to. Sending to bad addresses is what burns a sending domain, so the
email grading here is the gate the outreach sender relies on.
"""
import re
from typing import Iterable, List, Optional, Tuple
from urllib.parse import urlparse

from ..models.prospect import BusinessCategory

# How much recurring duct / dryer-vent work each kind of property tends to
# carry. Multi-unit and laundry-heavy properties rank highest because they have
# many vents under one decision maker.
CATEGORY_WEIGHT = {
    BusinessCategory.hoa: 30,
    BusinessCategory.property_manager: 30,
    BusinessCategory.building_management: 30,
    BusinessCategory.senior_living: 28,
    BusinessCategory.hotel: 28,
    BusinessCategory.laundromat: 28,
    BusinessCategory.medical: 24,
    BusinessCategory.office_building: 22,
    BusinessCategory.school: 22,
    BusinessCategory.daycare: 20,
    BusinessCategory.gym: 20,
    BusinessCategory.church: 16,
    BusinessCategory.restaurant: 16,
    BusinessCategory.retail: 14,
    BusinessCategory.warehouse: 14,
    BusinessCategory.salon: 12,
    BusinessCategory.dental: 18,
    BusinessCategory.other: 10,
}

FREE_MAIL_DOMAINS = frozenset({
    "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com", "icloud.com",
    "me.com", "msn.com", "live.com", "ymail.com", "sbcglobal.net", "att.net",
    "comcast.net", "verizon.net", "protonmail.com", "proton.me", "mail.com",
})

# Mailboxes that are read by nobody or by a ticketing system.
DEAD_LOCAL_PARTS = (
    "noreply", "no-reply", "no_reply", "donotreply", "do-not-reply", "mailer-daemon",
    "postmaster", "abuse", "bounce", "unsubscribe", "privacy", "legal", "dmca",
    "webmaster", "hostmaster", "press", "media", "careers", "jobs", "hr", "recruiting",
    "billing", "invoices", "accounting", "ar", "ap",
)

# Shared inboxes. Deliverable, but lower reply rates than a named person.
ROLE_LOCAL_PARTS = (
    "info", "contact", "hello", "office", "admin", "support", "help", "sales",
    "inquiries", "enquiries", "general", "frontdesk", "front.desk", "reception",
    "team", "mail", "service", "customerservice",
)

# Role inboxes that reach the person who actually buys this service.
BUYER_ROLE_LOCAL_PARTS = (
    "facilities", "facility", "maintenance", "operations", "ops", "manager",
    "management", "property", "building", "engineering", "gm", "leasing", "community",
)

EMAIL_RE = re.compile(r"^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")

# Grades, best first. "guessed" and "invalid" are never sent to.
EMAIL_GRADES = ("named", "buyer_role", "role", "free_mail", "other_domain", "guessed", "invalid")
SENDABLE_GRADES = frozenset({"named", "buyer_role", "role", "free_mail"})

_COMPANY_SUFFIX_RE = re.compile(
    r"[,\s]+(llc|l\.l\.c\.|inc|inc\.|incorporated|corp|corp\.|corporation|co\.|ltd|ltd\.|"
    r"lp|llp|pllc|pc|p\.c\.)\s*$",
    re.IGNORECASE,
)


def normalize_domain(website: Optional[str]) -> Optional[str]:
    """Return the bare registrable host for a website URL, or None."""
    if not website:
        return None
    candidate = website.strip()
    if not candidate.startswith(("http://", "https://")):
        candidate = "https://" + candidate
    host = (urlparse(candidate).hostname or "").lower()
    if host.startswith("www."):
        host = host[4:]
    return host or None


def normalize_phone(phone: Optional[str]) -> Optional[str]:
    """Return a US phone as +1XXXXXXXXXX, or None when it is not dialable."""
    if not phone:
        return None
    digits = re.sub(r"\D", "", phone)
    if len(digits) == 11 and digits.startswith("1"):
        digits = digits[1:]
    if len(digits) != 10 or digits[0] in "01":
        return None
    return "+1" + digits


def clean_business_name(name: str) -> str:
    """Drop legal suffixes and location tails so the name reads like speech."""
    cleaned = (name or "").strip()
    # "Acme Hotel - Downtown Los Angeles" / "Acme Hotel | LA" -> "Acme Hotel"
    cleaned = re.split(r"\s+[\-–—|]\s+", cleaned, maxsplit=1)[0]
    previous = None
    while previous != cleaned:
        previous = cleaned
        cleaned = _COMPANY_SUFFIX_RE.sub("", cleaned).strip(" ,")
    return cleaned or (name or "").strip()


def first_name(contact_name: Optional[str]) -> Optional[str]:
    """Extract a usable first name, or None when the value is not a person."""
    if not contact_name:
        return None
    token = contact_name.strip().split(" ")[0].strip(",.")
    if not re.fullmatch(r"[A-Za-z][A-Za-z'\-]{1,20}", token):
        return None
    if token.lower() in {"hiring", "manager", "office", "admin", "team", "the", "info",
                         "contact", "property", "front", "general", "dr", "mr", "mrs", "ms"}:
        return None
    return token[0].upper() + token[1:]


def grade_email(email: Optional[str], business_domain: Optional[str] = None,
                source: str = "") -> str:
    """
    Grade an address for cold outreach.

    named       a person's mailbox on the business's own domain
    buyer_role  a role inbox that reaches the buyer (facilities@, maintenance@)
    role        a shared inbox (info@, office@)
    free_mail   a gmail/yahoo address published on the business's own site
    other_domain  published on their site, but on a different domain
    guessed     generated from a pattern, never seen published anywhere
    invalid     malformed or a dead mailbox
    """
    if not email:
        return "invalid"
    address = email.strip().lower()
    if not EMAIL_RE.match(address) or len(address) > 254 or ".." in address:
        return "invalid"
    local, _, domain = address.partition("@")
    if any(local == dead or local.startswith(dead + ".") or local.startswith(dead + "-")
           for dead in DEAD_LOCAL_PARTS):
        return "invalid"
    if "guess" in source:
        return "guessed"
    if domain in FREE_MAIL_DOMAINS:
        return "free_mail"
    if business_domain and not _same_site(domain, business_domain):
        # Could be a parent or management company, could be the web designer.
        # Kept for a person to judge; never selected or sent to automatically.
        return "other_domain"
    if any(_is_role_mailbox(local, role) for role in BUYER_ROLE_LOCAL_PARTS):
        return "buyer_role"
    if any(local == role for role in ROLE_LOCAL_PARTS):
        return "role"
    return "named"


def _is_role_mailbox(local: str, role: str) -> bool:
    """facilities@ and facilities.la@ are role inboxes; gmartinez@ is not "gm"."""
    if local == role or local.startswith((role + ".", role + "-", role + "_")):
        return True
    # Short roles ("gm", "ops") are too easily the start of a surname.
    return len(role) >= 7 and local.startswith(role)


def _same_site(email_domain: str, business_domain: str) -> bool:
    return (email_domain == business_domain
            or email_domain.endswith("." + business_domain)
            or business_domain.endswith("." + email_domain))


def best_email(candidates: Iterable[dict], business_domain: Optional[str]) -> Optional[dict]:
    """Pick the best sendable address from finder results, or None."""
    graded: List[Tuple[int, int, dict]] = []
    for candidate in candidates:
        grade = grade_email(candidate.get("email"), business_domain, candidate.get("source", ""))
        if grade not in SENDABLE_GRADES:
            continue
        graded.append((EMAIL_GRADES.index(grade), -int(candidate.get("confidence", 0)),
                       {**candidate, "grade": grade}))
    if not graded:
        return None
    graded.sort(key=lambda item: (item[0], item[1]))
    return graded[0][2]


def score_prospect(
    category: BusinessCategory,
    *,
    website: Optional[str] = None,
    phone: Optional[str] = None,
    rating: Optional[float] = None,
    total_ratings: Optional[int] = None,
    business_status: Optional[str] = None,
    email_grade: Optional[str] = None,
    has_contact_name: bool = False,
) -> Tuple[int, List[str]]:
    """
    Score a prospect 0-100 and explain why.

    The score answers "how worth an email is this record", combining fit (what
    kind of property it is) with reachability (can we get to a real person).
    """
    if business_status and business_status != "OPERATIONAL":
        return 0, ["Not operational on Google Maps"]

    score = CATEGORY_WEIGHT.get(category, 10)
    reasons: List[str] = []
    if score >= 28:
        reasons.append("High-volume vent/duct property type")

    if website:
        score += 15
        reasons.append("Has a website (email can be found)")
    else:
        reasons.append("No website: phone outreach only")

    if normalize_phone(phone):
        score += 10
        reasons.append("Has a direct phone")

    reviews = total_ratings or 0
    if reviews >= 200:
        score += 10
        reasons.append("Large, established operation")
    elif reviews >= 25:
        score += 6
    elif reviews >= 1:
        score += 2

    if rating is not None and reviews >= 10 and rating < 3.6:
        # Low-rated properties often have exactly the complaints clean air fixes.
        score += 4
        reasons.append("Low public rating: likely fielding complaints")

    if email_grade == "named":
        score += 25
        reasons.append("Named contact email")
    elif email_grade == "buyer_role":
        score += 20
        reasons.append("Facilities/management inbox")
    elif email_grade in ("role", "free_mail"):
        score += 12
        reasons.append("Shared inbox only")

    if has_contact_name:
        score += 6
        reasons.append("Contact name known")

    return max(0, min(100, score)), reasons
