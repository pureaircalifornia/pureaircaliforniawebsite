"""
Customer Models
Defines customer and CRM-related data structures.
"""
from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum
import uuid


class LeadStatus(str, Enum):
    """Customer lead status enumeration."""
    NEW = "new"
    CONTACTED = "contacted"
    QUALIFIED = "qualified"
    PROPOSAL_SENT = "proposal_sent"
    NEGOTIATION = "negotiation"
    CONVERTED = "converted"
    LOST = "lost"


class LeadSource(str, Enum):
    """Lead source enumeration."""
    WEBSITE = "website"
    PHONE = "phone"
    REFERRAL = "referral"
    GOOGLE_ADS = "google_ads"
    FACEBOOK = "facebook"
    YELP = "yelp"
    THUMBTACK = "thumbtack"
    ANGIES_LIST = "angies_list"
    HOME_ADVISOR = "home_advisor"
    REPEAT_CUSTOMER = "repeat_customer"
    OTHER = "other"


class PropertyType(str, Enum):
    """Property type enumeration."""
    RESIDENTIAL = "residential"
    COMMERCIAL = "commercial"
    INDUSTRIAL = "industrial"


class Property(BaseModel):
    """Customer property model."""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    address_line1: str
    address_line2: Optional[str] = None
    city: str
    state: str = "CA"
    zip_code: str
    property_type: PropertyType = PropertyType.RESIDENTIAL
    square_footage: Optional[int] = None
    num_floors: Optional[int] = None
    num_hvac_units: Optional[int] = None
    has_pets: bool = False
    has_smokers: bool = False
    last_cleaning_date: Optional[datetime] = None
    notes: Optional[str] = None
    is_primary: bool = False


class Note(BaseModel):
    """Customer note model."""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    content: str
    created_by: str  # User ID
    created_at: datetime = Field(default_factory=datetime.utcnow)
    note_type: str = "general"  # general, call, email, appointment, complaint


class CustomerBase(BaseModel):
    """Base customer model."""
    email: Optional[EmailStr] = None
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    phone: str = Field(..., min_length=10, max_length=20)
    secondary_phone: Optional[str] = None
    preferred_contact: str = "phone"  # phone, email, text
    lead_source: LeadSource = LeadSource.WEBSITE
    lead_status: LeadStatus = LeadStatus.NEW
    tags: List[str] = []


class CustomerCreate(CustomerBase):
    """Customer creation model."""
    franchise_id: str
    properties: List[Property] = []
    notes: List[Note] = []


class CustomerUpdate(BaseModel):
    """Customer update model - all fields optional."""
    email: Optional[EmailStr] = None
    first_name: Optional[str] = Field(None, min_length=1, max_length=100)
    last_name: Optional[str] = Field(None, min_length=1, max_length=100)
    phone: Optional[str] = Field(None, min_length=10, max_length=20)
    secondary_phone: Optional[str] = None
    preferred_contact: Optional[str] = None
    lead_source: Optional[LeadSource] = None
    lead_status: Optional[LeadStatus] = None
    tags: Optional[List[str]] = None
    is_active: Optional[bool] = None


class Customer(CustomerBase):
    """Customer response model."""
    id: str = Field(..., alias="_id")
    franchise_id: str
    properties: List[Property] = []
    notes: List[Note] = []
    
    # Computed/tracked fields
    total_spent: float = 0.0
    total_appointments: int = 0
    last_appointment_date: Optional[datetime] = None
    next_appointment_date: Optional[datetime] = None
    lifetime_value: float = 0.0
    
    # Timestamps
    created_at: datetime
    updated_at: datetime
    is_active: bool = True
    
    class Config:
        populate_by_name = True
        from_attributes = True


class CustomerSearch(BaseModel):
    """Customer search/filter model."""
    query: Optional[str] = None  # Search name, email, phone
    lead_status: Optional[LeadStatus] = None
    lead_source: Optional[LeadSource] = None
    tags: Optional[List[str]] = None
    city: Optional[str] = None
    created_after: Optional[datetime] = None
    created_before: Optional[datetime] = None
    min_total_spent: Optional[float] = None
    max_total_spent: Optional[float] = None
    page: int = 1
    page_size: int = 20
