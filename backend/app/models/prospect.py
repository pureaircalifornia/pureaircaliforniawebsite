"""
Prospect Models
Pydantic models for lead scanner prospects and outreach tracking.
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum
import uuid


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
    other = "other"


class OutreachStatus(str, Enum):
    not_contacted = "not_contacted"
    email_sent = "email_sent"
    email_opened = "email_opened"
    replied = "replied"
    interested = "interested"
    not_interested = "not_interested"
    meeting_scheduled = "meeting_scheduled"
    converted = "converted"


class ProspectBase(BaseModel):
    business_name: str
    business_category: BusinessCategory
    address: Optional[str] = None
    phone: Optional[str] = None
    website: Optional[str] = None
    rating: Optional[float] = None
    total_ratings: Optional[int] = None
    place_id: Optional[str] = None
    # Contact info (manually entered)
    contact_name: Optional[str] = None
    contact_email: Optional[str] = None
    contact_title: Optional[str] = None
    notes: Optional[str] = None


class ProspectCreate(ProspectBase):
    pass


class Prospect(ProspectBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    outreach_status: OutreachStatus = OutreachStatus.not_contacted
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    last_contacted_at: Optional[datetime] = None
    emails_sent: int = 0
    found_emails: List[dict] = []


class ProspectUpdate(BaseModel):
    contact_name: Optional[str] = None
    contact_email: Optional[str] = None
    contact_title: Optional[str] = None
    notes: Optional[str] = None
    outreach_status: Optional[OutreachStatus] = None
    phone: Optional[str] = None
    website: Optional[str] = None


class OutreachEmail(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    prospect_id: str
    to_email: str
    to_name: Optional[str] = None
    subject: str
    body: str
    template_id: Optional[str] = None
    sent_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "sent"  # sent, delivered, opened, clicked, bounced


class EmailTemplate(BaseModel):
    id: str
    name: str
    category: BusinessCategory
    subject: str
    body: str
    description: Optional[str] = None


class PlaceSearchRequest(BaseModel):
    query: Optional[str] = None  # e.g., "hotels in Los Angeles"
    category: BusinessCategory
    location: str = "Los Angeles, CA"
    radius_miles: int = 25


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
