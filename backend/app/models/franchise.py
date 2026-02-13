"""
Franchise Models
Defines multi-location and franchise management data structures.
"""
from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime, date
from enum import Enum
import uuid


class FranchiseStatus(str, Enum):
    """Franchise status enumeration."""
    ACTIVE = "active"
    PENDING = "pending"
    SUSPENDED = "suspended"
    TERMINATED = "terminated"


class FranchiseBase(BaseModel):
    """Base franchise model."""
    name: str = Field(..., min_length=1, max_length=200)
    dba_name: Optional[str] = None  # Doing Business As
    email: EmailStr
    phone: str
    
    # Address
    address_line1: str
    address_line2: Optional[str] = None
    city: str
    state: str = "CA"
    zip_code: str
    
    # Service area
    service_area_cities: List[str] = []
    service_area_zip_codes: List[str] = []
    
    # Business info
    tax_id: Optional[str] = None  # EIN
    business_license: Optional[str] = None


class FranchiseCreate(FranchiseBase):
    """Franchise creation model."""
    owner_user_id: str
    
    # Franchise agreement
    franchise_fee: float = 0.0
    royalty_percentage: float = 6.0
    marketing_fee_percentage: float = 2.0
    agreement_start_date: Optional[date] = None
    agreement_end_date: Optional[date] = None


class FranchiseUpdate(BaseModel):
    """Franchise update model."""
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    dba_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    
    # Address
    address_line1: Optional[str] = None
    address_line2: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    
    # Service area
    service_area_cities: Optional[List[str]] = None
    service_area_zip_codes: Optional[List[str]] = None
    
    # Business info
    tax_id: Optional[str] = None
    business_license: Optional[str] = None
    
    # Status
    status: Optional[FranchiseStatus] = None
    
    # Fees
    royalty_percentage: Optional[float] = None
    marketing_fee_percentage: Optional[float] = None


class Franchise(FranchiseBase):
    """Franchise response model."""
    id: str = Field(..., alias="_id")
    owner_user_id: str
    status: FranchiseStatus = FranchiseStatus.PENDING
    
    # Franchise agreement
    franchise_fee: float = 0.0
    royalty_percentage: float = 6.0
    marketing_fee_percentage: float = 2.0
    agreement_start_date: Optional[date] = None
    agreement_end_date: Optional[date] = None
    
    # Stats (calculated)
    total_customers: int = 0
    total_employees: int = 0
    total_revenue: float = 0.0
    total_royalties_paid: float = 0.0
    
    # Settings
    timezone: str = "America/Los_Angeles"
    currency: str = "USD"
    default_tax_rate: float = 9.5
    
    # Branding (for white-label)
    logo_url: Optional[str] = None
    primary_color: Optional[str] = None
    secondary_color: Optional[str] = None
    
    # Metadata
    created_at: datetime
    updated_at: datetime
    
    class Config:
        populate_by_name = True
        from_attributes = True


class RoyaltyPayment(BaseModel):
    """Royalty payment record."""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    franchise_id: str
    period_start: date
    period_end: date
    gross_revenue: float
    royalty_amount: float
    marketing_fee_amount: float
    total_due: float
    total_paid: float = 0.0
    status: str = "pending"  # pending, paid, overdue
    due_date: date
    paid_at: Optional[datetime] = None
    payment_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


class FranchiseStats(BaseModel):
    """Franchise statistics model."""
    franchise_id: str
    period: str  # e.g., "2024-01" for monthly
    
    # Revenue
    gross_revenue: float = 0.0
    net_revenue: float = 0.0
    royalties_due: float = 0.0
    marketing_fees_due: float = 0.0
    
    # Customers
    new_customers: int = 0
    total_customers: int = 0
    repeat_customers: int = 0
    
    # Appointments
    total_appointments: int = 0
    completed_appointments: int = 0
    cancelled_appointments: int = 0
    
    # Efficiency
    average_job_value: float = 0.0
    average_job_duration: float = 0.0
    conversion_rate: float = 0.0
