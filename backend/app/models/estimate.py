"""
Estimate and Invoice Line Item Models
Defines quote/estimate data structures.
"""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, timedelta
from enum import Enum
import uuid


class EstimateStatus(str, Enum):
    """Estimate status enumeration."""
    DRAFT = "draft"
    SENT = "sent"
    VIEWED = "viewed"
    ACCEPTED = "accepted"
    DECLINED = "declined"
    EXPIRED = "expired"
    CONVERTED = "converted"  # Converted to invoice


class LineItem(BaseModel):
    """Line item for estimates and invoices."""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: Optional[str] = None
    quantity: float = 1.0
    unit_price: float
    tax_rate: float = 0.0  # Percentage
    discount_percent: float = 0.0
    is_taxable: bool = True
    
    @property
    def subtotal(self) -> float:
        """Calculate line item subtotal before tax."""
        base = self.quantity * self.unit_price
        discount = base * (self.discount_percent / 100)
        return base - discount
    
    @property
    def tax_amount(self) -> float:
        """Calculate tax amount."""
        if not self.is_taxable:
            return 0.0
        return self.subtotal * (self.tax_rate / 100)
    
    @property
    def total(self) -> float:
        """Calculate line item total including tax."""
        return self.subtotal + self.tax_amount


class ServiceLineItem(LineItem):
    """Pre-defined service line item templates."""
    service_type: Optional[str] = None
    estimated_duration: Optional[int] = None  # minutes


class EstimateBase(BaseModel):
    """Base estimate model."""
    customer_id: str
    property_id: str
    line_items: List[LineItem] = []
    notes: Optional[str] = None
    terms: Optional[str] = None
    valid_until: Optional[datetime] = None


class EstimateCreate(EstimateBase):
    """Estimate creation model."""
    franchise_id: str
    appointment_id: Optional[str] = None
    tax_rate: float = 9.5  # California default


class EstimateUpdate(BaseModel):
    """Estimate update model."""
    line_items: Optional[List[LineItem]] = None
    notes: Optional[str] = None
    terms: Optional[str] = None
    valid_until: Optional[datetime] = None
    status: Optional[EstimateStatus] = None
    discount_amount: Optional[float] = None
    tax_rate: Optional[float] = None


class Estimate(EstimateBase):
    """Estimate response model."""
    id: str = Field(..., alias="_id")
    franchise_id: str
    estimate_number: str
    appointment_id: Optional[str] = None
    status: EstimateStatus = EstimateStatus.DRAFT
    
    # Pricing
    subtotal: float = 0.0
    discount_amount: float = 0.0
    tax_rate: float = 9.5
    tax_amount: float = 0.0
    total: float = 0.0
    
    # Tracking
    sent_at: Optional[datetime] = None
    viewed_at: Optional[datetime] = None
    accepted_at: Optional[datetime] = None
    declined_at: Optional[datetime] = None
    
    # Conversion
    invoice_id: Optional[str] = None
    converted_at: Optional[datetime] = None
    
    # Metadata
    created_at: datetime
    updated_at: datetime
    created_by: str
    
    # Customer & property info cached
    customer_name: Optional[str] = None
    customer_email: Optional[str] = None
    property_address: Optional[str] = None
    
    class Config:
        populate_by_name = True
        from_attributes = True


# Pre-defined service templates for quick estimate creation
SERVICE_TEMPLATES = {
    "residential_air_duct": ServiceLineItem(
        name="Residential Air Duct Cleaning",
        description="Complete air duct cleaning for residential HVAC system including main trunk lines, branch runs, and registers",
        unit_price=199.00,
        estimated_duration=120,
        service_type="residential_air_duct"
    ),
    "commercial_air_duct": ServiceLineItem(
        name="Commercial Air Duct Cleaning",
        description="Commercial-grade air duct cleaning service",
        unit_price=499.00,
        estimated_duration=240,
        service_type="commercial_air_duct"
    ),
    "dryer_vent_cleaning": ServiceLineItem(
        name="Dryer Vent Cleaning",
        description="Complete dryer vent line cleaning from dryer to exterior vent",
        unit_price=89.00,
        estimated_duration=45,
        service_type="residential_dryer_vent"
    ),
    "hvac_system_cleaning": ServiceLineItem(
        name="HVAC System Cleaning",
        description="Complete HVAC unit cleaning including coils and blower assembly",
        unit_price=299.00,
        estimated_duration=180,
        service_type="hvac_system_cleaning"
    ),
    "sanitization": ServiceLineItem(
        name="Duct Sanitization Treatment",
        description="EPA-registered sanitization treatment for air duct system",
        unit_price=149.00,
        estimated_duration=30,
        service_type="sanitization"
    ),
    "electrostatic_filter": ServiceLineItem(
        name="Electrostatic Air Filter Installation",
        description="Permanent, washable electrostatic air filter installation",
        unit_price=199.00,
        estimated_duration=30,
        service_type="electrostatic_filter_install"
    ),
}
