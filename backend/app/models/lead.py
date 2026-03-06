"""
Lead Models
Pydantic models for lead/prospect management.
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from enum import Enum
import uuid


class LeadStatus(str, Enum):
    new = "new"
    contacted = "contacted"
    quoted = "quoted"
    scheduled = "scheduled"
    completed = "completed"
    cancelled = "cancelled"


class LeadSource(str, Enum):
    contact_form = "contact_form"
    quote_form = "quote_form"
    phone = "phone"
    referral = "referral"
    google_maps = "google_maps"
    outreach = "outreach"
    other = "other"


class LeadBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: Optional[str] = None
    service: Optional[str] = None
    property_type: Optional[str] = None
    square_footage: Optional[str] = None
    address: Optional[str] = None
    preferred_date: Optional[str] = None
    source: LeadSource = LeadSource.contact_form


class LeadCreate(LeadBase):
    pass


class Lead(LeadBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: LeadStatus = LeadStatus.new
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    notes: Optional[str] = None
    estimated_price: Optional[float] = None


class LeadUpdate(BaseModel):
    status: Optional[LeadStatus] = None
    notes: Optional[str] = None
    estimated_price: Optional[float] = None
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    message: Optional[str] = None
    service: Optional[str] = None
    address: Optional[str] = None
