"""
Payment Models
Defines payment processing and transaction data structures.
"""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum
import uuid


class PaymentMethod(str, Enum):
    """Payment method enumeration."""
    CREDIT_CARD = "credit_card"
    DEBIT_CARD = "debit_card"
    ACH = "ach"
    CHECK = "check"
    CASH = "cash"
    OTHER = "other"


class PaymentStatus(str, Enum):
    """Payment status enumeration."""
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"
    REFUNDED = "refunded"
    PARTIAL_REFUND = "partial_refund"


class CardBrand(str, Enum):
    """Card brand enumeration."""
    VISA = "visa"
    MASTERCARD = "mastercard"
    AMEX = "amex"
    DISCOVER = "discover"
    OTHER = "other"


class PaymentCreate(BaseModel):
    """Payment creation model."""
    invoice_id: str
    amount: float
    payment_method: PaymentMethod
    notes: Optional[str] = None
    
    # For card payments (optional, usually handled by Stripe)
    stripe_payment_method_id: Optional[str] = None


class PaymentRefund(BaseModel):
    """Payment refund request model."""
    reason: str
    amount: Optional[float] = None  # None = full refund


class Payment(BaseModel):
    """Payment response model."""
    id: str = Field(..., alias="_id")
    franchise_id: str
    invoice_id: str
    customer_id: str
    
    # Amount
    amount: float
    currency: str = "usd"
    
    # Method
    payment_method: PaymentMethod
    card_brand: Optional[CardBrand] = None
    card_last_four: Optional[str] = None
    
    # Status
    status: PaymentStatus = PaymentStatus.PENDING
    
    # Stripe
    stripe_payment_id: Optional[str] = None
    stripe_payment_intent_id: Optional[str] = None
    stripe_charge_id: Optional[str] = None
    stripe_refund_id: Optional[str] = None
    
    # Refund
    refund_amount: float = 0.0
    refund_reason: Optional[str] = None
    refunded_at: Optional[datetime] = None
    
    # Receipt
    receipt_url: Optional[str] = None
    receipt_number: Optional[str] = None
    
    # Notes
    notes: Optional[str] = None
    
    # Metadata
    created_at: datetime
    updated_at: datetime
    processed_by: Optional[str] = None  # User ID who processed
    
    class Config:
        populate_by_name = True
        from_attributes = True


class PaymentSearch(BaseModel):
    """Payment search/filter model."""
    customer_id: Optional[str] = None
    invoice_id: Optional[str] = None
    status: Optional[List[PaymentStatus]] = None
    payment_method: Optional[List[PaymentMethod]] = None
    date_from: Optional[datetime] = None
    date_to: Optional[datetime] = None
    min_amount: Optional[float] = None
    max_amount: Optional[float] = None
    page: int = 1
    page_size: int = 20


class StripePaymentIntent(BaseModel):
    """Stripe payment intent creation response."""
    client_secret: str
    payment_intent_id: str
    amount: int  # In cents
    currency: str
    status: str


class StripeCheckoutSession(BaseModel):
    """Stripe checkout session creation response."""
    url: str
    session_id: str


class PaymentSummary(BaseModel):
    """Payment summary for reporting."""
    total_payments: int = 0
    total_amount: float = 0.0
    total_refunds: float = 0.0
    net_amount: float = 0.0
    by_method: dict = {}
    by_status: dict = {}
