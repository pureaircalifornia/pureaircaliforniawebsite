"""
Lead Models
Pydantic models for lead/prospect management.
"""
from pydantic import (
    AwareDatetime, BaseModel, ConfigDict, EmailStr, Field,
    StrictBool, field_validator, model_validator,
)
from typing import Literal, Optional
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


class LeadAttribution(BaseModel):
    """Bounded first-party attribution; never a qualification or revenue claim."""

    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    utm_source: Optional[str] = Field(None, max_length=256)
    utm_medium: Optional[str] = Field(None, max_length=256)
    utm_campaign: Optional[str] = Field(None, max_length=256)
    utm_term: Optional[str] = Field(None, max_length=256)
    utm_content: Optional[str] = Field(None, max_length=256)
    gclid: Optional[str] = Field(None, max_length=512, pattern=r"^[A-Za-z0-9._~-]+$")
    gbraid: Optional[str] = Field(None, max_length=512, pattern=r"^[A-Za-z0-9._~-]+$")
    wbraid: Optional[str] = Field(None, max_length=512, pattern=r"^[A-Za-z0-9._~-]+$")
    landing_path: Optional[str] = Field(None, max_length=512)
    captured_at: Optional[AwareDatetime] = None
    ad_measurement_consent: StrictBool = False

    @field_validator("utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content")
    @classmethod
    def reject_control_characters(cls, value: Optional[str]) -> Optional[str]:
        if value is not None and any(ord(char) < 32 or ord(char) == 127 for char in value):
            raise ValueError("Attribution must not contain control characters")
        return value

    @field_validator("landing_path")
    @classmethod
    def validate_landing_path(cls, value: Optional[str]) -> Optional[str]:
        if value is not None and (
            not value.startswith("/") or value.startswith("//")
            or any(char in value for char in "?#\\")
            or any(ord(char) < 32 or ord(char) == 127 for char in value)
        ):
            raise ValueError("Use a local path without query parameters or fragment")
        return value

    @model_validator(mode="after")
    def require_measurement_consent(self):
        fields = ("utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
                  "gclid", "gbraid", "wbraid")
        if not self.ad_measurement_consent and any(getattr(self, key) for key in fields):
            raise ValueError("Advertising attribution requires measurement consent")
        return self


class LeadCreate(LeadBase):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    # Older open website tabs omit this field. They still receive a receipt,
    # but only clients that retain their UUID can obtain retry deduplication.
    submission_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    name: str = Field(min_length=1, max_length=200)
    phone: str = Field(min_length=3, max_length=64)
    message: Optional[str] = Field(None, max_length=10000)
    service: Optional[str] = Field(None, max_length=100)
    property_type: Optional[str] = Field(None, max_length=80)
    square_footage: Optional[str] = Field(None, max_length=32)
    address: Optional[str] = Field(None, max_length=500)
    preferred_date: Optional[str] = Field(None, max_length=100)
    estimated_price: Optional[float] = Field(None, ge=0, le=10000000, allow_inf_nan=False)
    attribution: Optional[LeadAttribution] = None


class LeadReceipt(BaseModel):
    """Public persistence acknowledgement, with no customer data or qualification."""

    accepted: Literal[True] = True
    submission_id: uuid.UUID
    id: uuid.UUID


class Lead(LeadBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    submission_id: Optional[uuid.UUID] = None
    attribution: Optional[LeadAttribution] = None
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
