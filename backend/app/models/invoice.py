"""
Invoice Models
Defines billing and invoicing data structures.
"""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, timedelta
from enum import Enum
import uuid

from .estimate import LineItem


class InvoiceStatus(str, Enum):
    """Invoice status enumeration."""
    DRAFT = "draft"
    SENT = "sent"
    VIEWED = "viewed"
    PAID = "paid"
    PARTIAL = "partial"  # Partially paid
    OVERDUE = "overdue"
    VOID = "void"
    REFUNDED = "refunded"


class PaymentTerms(str, Enum):
    """Payment terms enumeration."""
    DUE_ON_RECEIPT = "due_on_receipt"
    NET_7 = "net_7"
    NET_15 = "net_15"
    NET_30 = "net_30"
    NET_60 = "net_60"


class InvoiceBase(BaseModel):
    """Base invoice model."""
    customer_id: str
    property_id: str
    line_items: List[LineItem] = []
    notes: Optional[str] = None
    terms: Optional[str] = None
    payment_terms: PaymentTerms = PaymentTerms.DUE_ON_RECEIPT


class InvoiceCreate(InvoiceBase):
    """Invoice creation model."""
    franchise_id: str
    estimate_id: Optional[str] = None
    appointment_id: Optional[str] = None
    tax_rate: float = 9.5
    due_date: Optional[datetime] = None


class InvoiceUpdate(BaseModel):
    """Invoice update model."""
    line_items: Optional[List[LineItem]] = None
    notes: Optional[str] = None
    terms: Optional[str] = None
    status: Optional[InvoiceStatus] = None
    payment_terms: Optional[PaymentTerms] = None
    due_date: Optional[datetime] = None
    discount_amount: Optional[float] = None
    tax_rate: Optional[float] = None


class Invoice(InvoiceBase):
    """Invoice response model."""
    id: str = Field(..., alias="_id")
    franchise_id: str
    invoice_number: str
    estimate_id: Optional[str] = None
    appointment_id: Optional[str] = None
    status: InvoiceStatus = InvoiceStatus.DRAFT
    
    # Pricing
    subtotal: float = 0.0
    discount_amount: float = 0.0
    tax_rate: float = 9.5
    tax_amount: float = 0.0
    total: float = 0.0
    
    # Payment tracking
    amount_paid: float = 0.0
    amount_due: float = 0.0
    due_date: Optional[datetime] = None
    
    # Tracking
    sent_at: Optional[datetime] = None
    viewed_at: Optional[datetime] = None
    paid_at: Optional[datetime] = None
    
    # Linked payments
    payment_ids: List[str] = []
    
    # Metadata
    created_at: datetime
    updated_at: datetime
    created_by: str
    
    # Cached customer info
    customer_name: Optional[str] = None
    customer_email: Optional[str] = None
    property_address: Optional[str] = None
    
    class Config:
        populate_by_name = True
        from_attributes = True

    def calculate_due_date(self) -> datetime:
        """Calculate due date based on payment terms."""
        base_date = self.created_at
        days = {
            PaymentTerms.DUE_ON_RECEIPT: 0,
            PaymentTerms.NET_7: 7,
            PaymentTerms.NET_15: 15,
            PaymentTerms.NET_30: 30,
            PaymentTerms.NET_60: 60,
        }
        return base_date + timedelta(days=days.get(self.payment_terms, 0))
    
    @property
    def is_overdue(self) -> bool:
        """Check if invoice is overdue."""
        if self.status in [InvoiceStatus.PAID, InvoiceStatus.VOID, InvoiceStatus.REFUNDED]:
            return False
        if self.due_date:
            return datetime.utcnow() > self.due_date
        return False


class InvoiceSearch(BaseModel):
    """Invoice search/filter model."""
    customer_id: Optional[str] = None
    status: Optional[List[InvoiceStatus]] = None
    date_from: Optional[datetime] = None
    date_to: Optional[datetime] = None
    due_date_from: Optional[datetime] = None
    due_date_to: Optional[datetime] = None
    min_amount: Optional[float] = None
    max_amount: Optional[float] = None
    is_overdue: Optional[bool] = None
    page: int = 1
    page_size: int = 20


class InvoiceSummary(BaseModel):
    """Invoice summary for reporting."""
    total_invoices: int = 0
    total_amount: float = 0.0
    total_paid: float = 0.0
    total_outstanding: float = 0.0
    overdue_count: int = 0
    overdue_amount: float = 0.0
