"""
Prospect Models
Pydantic models for lead scanner prospects and outreach tracking.
"""
from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional, List
from datetime import datetime
from enum import Enum
import uuid


def normalize_website(value):
    """
    Accept only web addresses. The site is shown as a link in the admin UI and
    fetched by the server, so "javascript:", "file:" and the like are refused.
    """
    if value is None:
        return None
    if not isinstance(value, str):
        raise ValueError("Website must be text")
    candidate = value.strip()
    if not candidate:
        return None
    if "://" not in candidate and ":" not in candidate.split("/")[0]:
        candidate = "https://" + candidate
    if not candidate.lower().startswith(("http://", "https://")):
        raise ValueError("Website must start with http:// or https://")
    if any(ord(char) < 33 for char in candidate):
        raise ValueError("Website must not contain spaces or control characters")
    return candidate


class BusinessCategory(str, Enum):
    hoa = "hoa"
    property_manager = "property_manager"
    building_management = "building_management"
    restaurant = "restaurant"
    gym = "gym"
    salon = "salon"
    dental = "dental"
    medical = "medical"
    hotel = "hotel"
    senior_living = "senior_living"
    school = "school"
    church = "church"
    office_building = "office_building"
    retail = "retail"
    warehouse = "warehouse"
    daycare = "daycare"
    laundromat = "laundromat"
    other = "other"


class OutreachStatus(str, Enum):
    not_contacted = "not_contacted"
    email_sent = "email_sent"
    email_opened = "email_opened"
    link_clicked = "link_clicked"
    replied = "replied"
    interested = "interested"
    not_interested = "not_interested"
    meeting_scheduled = "meeting_scheduled"
    converted = "converted"
    bounced = "bounced"
    unsubscribed = "unsubscribed"


# Statuses a tracking event (open / click) may move a prospect *up* through.
# Anything not listed here is a human or terminal decision and is never
# overwritten by an automated event.
ENGAGEMENT_RANK = {
    OutreachStatus.not_contacted.value: 0,
    OutreachStatus.email_sent.value: 1,
    OutreachStatus.email_opened.value: 2,
    OutreachStatus.link_clicked.value: 3,
}

# Statuses that end an automated sequence. Nobody in these states is emailed
# again by the drip runner.
SEQUENCE_STOP_STATUSES = frozenset({
    OutreachStatus.replied.value,
    OutreachStatus.interested.value,
    OutreachStatus.not_interested.value,
    OutreachStatus.meeting_scheduled.value,
    OutreachStatus.converted.value,
    OutreachStatus.bounced.value,
    OutreachStatus.unsubscribed.value,
})

# Statuses that mean "never email this address again", full stop.
SUPPRESSED_STATUSES = frozenset({
    OutreachStatus.not_interested.value,
    OutreachStatus.bounced.value,
    OutreachStatus.unsubscribed.value,
})


class SequenceStatus(str, Enum):
    none = "none"
    active = "active"
    paused = "paused"
    completed = "completed"
    stopped = "stopped"


class ProspectBase(BaseModel):
    business_name: str = Field(..., min_length=1, max_length=200)
    business_category: BusinessCategory
    address: Optional[str] = Field(None, max_length=300)
    phone: Optional[str] = Field(None, max_length=40)
    website: Optional[str] = Field(None, max_length=500)
    rating: Optional[float] = None
    total_ratings: Optional[int] = None
    place_id: Optional[str] = Field(None, max_length=300)
    business_status: Optional[str] = Field(None, max_length=40)
    types: List[str] = []
    # Contact info (found by enrichment or entered by hand)
    contact_name: Optional[str] = Field(None, max_length=100)
    contact_email: Optional[str] = Field(None, max_length=254)
    contact_title: Optional[str] = Field(None, max_length=100)
    notes: Optional[str] = Field(None, max_length=2000)
    # One true, specific sentence about this prospect, written by a person.
    # Used as the opening line of the first email when present.
    personal_note: Optional[str] = Field(None, max_length=300)


    @field_validator("website", mode="before")
    @classmethod
    def website_is_http(cls, value):
        return normalize_website(value)


class ProspectCreate(ProspectBase):
    pass


class ProspectBulkCreate(BaseModel):
    prospects: List[ProspectCreate] = Field(..., min_length=1, max_length=60)


class Prospect(ProspectBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    outreach_status: OutreachStatus = OutreachStatus.not_contacted
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    last_contacted_at: Optional[datetime] = None
    emails_sent: int = 0
    found_emails: List[dict] = []
    # Data quality
    fit_score: int = 0
    email_quality: Optional[str] = None
    # Opaque public token used in booking / unsubscribe links.
    public_token: str = Field(default_factory=lambda: uuid.uuid4().hex)
    # Sequence automation
    sequence_status: SequenceStatus = SequenceStatus.none
    sequence_step: int = 0
    next_touch_at: Optional[datetime] = None


class ProspectUpdate(BaseModel):
    contact_name: Optional[str] = Field(None, max_length=100)
    contact_email: Optional[EmailStr] = None
    contact_title: Optional[str] = Field(None, max_length=100)
    notes: Optional[str] = Field(None, max_length=2000)
    personal_note: Optional[str] = Field(None, max_length=300)
    outreach_status: Optional[OutreachStatus] = None
    phone: Optional[str] = Field(None, max_length=40)
    website: Optional[str] = Field(None, max_length=500)

    @field_validator("contact_email", "contact_name", "contact_title", "notes",
                     "personal_note", mode="before")
    @classmethod
    def blank_is_none(cls, value):
        if isinstance(value, str) and not value.strip():
            return None
        return value

    @field_validator("website", mode="before")
    @classmethod
    def website_is_http(cls, value):
        return normalize_website(value)


class OutreachEmail(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    prospect_id: str
    to_email: str
    to_name: Optional[str] = None
    subject: str
    body: str
    template_id: Optional[str] = None
    sent_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "sent"  # sent, delivered, opened, clicked, bounced, complained, failed


class EmailTemplate(BaseModel):
    id: str
    name: str
    category: BusinessCategory
    subject: str
    body: str
    description: Optional[str] = None


class PlaceSearchRequest(BaseModel):
    query: Optional[str] = Field(None, max_length=120)  # e.g., "luxury hotel"
    category: BusinessCategory
    location: str = Field("Los Angeles, CA", min_length=2, max_length=120)
    radius_miles: int = Field(25, ge=1, le=50)
    max_results: int = Field(20, ge=1, le=60)


class PlaceSearchResult(BaseModel):
    place_id: str
    name: str
    address: str
    phone: Optional[str] = None
    website: Optional[str] = None
    rating: Optional[float] = None
    total_ratings: Optional[int] = None
    business_status: Optional[str] = None
    types: List[str] = []
    distance_miles: Optional[float] = None
    fit_score: int = 0
    fit_reasons: List[str] = []
