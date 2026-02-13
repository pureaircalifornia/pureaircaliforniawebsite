"""
Document Models
Defines document management for W9, insurance, and other files.
"""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, date
from enum import Enum
import uuid


class DocumentType(str, Enum):
    """Document type enumeration."""
    # Tax documents
    W9 = "w9"
    W2 = "w2"
    FORM_1099 = "1099"
    
    # Insurance
    LIABILITY_INSURANCE = "liability_insurance"
    WORKERS_COMP = "workers_comp"
    AUTO_INSURANCE = "auto_insurance"
    BONDING = "bonding"
    
    # Certifications
    NADCA_CERTIFICATION = "nadca_certification"
    EPA_CERTIFICATION = "epa_certification"
    HVAC_LICENSE = "hvac_license"
    BUSINESS_LICENSE = "business_license"
    
    # Employment
    ID_VERIFICATION = "id_verification"
    BACKGROUND_CHECK = "background_check"
    DRUG_TEST = "drug_test"
    DRIVER_LICENSE = "driver_license"
    
    # Customer documents
    SIGNED_CONTRACT = "signed_contract"
    SIGNED_ESTIMATE = "signed_estimate"
    CUSTOMER_ID = "customer_id"
    
    # Other
    PHOTO = "photo"
    RECEIPT = "receipt"
    OTHER = "other"


class DocumentStatus(str, Enum):
    """Document status enumeration."""
    PENDING = "pending"
    UNDER_REVIEW = "under_review"
    APPROVED = "approved"
    REJECTED = "rejected"
    EXPIRED = "expired"


class DocumentCreate(BaseModel):
    """Document upload model."""
    document_type: DocumentType
    name: str
    description: Optional[str] = None
    expiration_date: Optional[date] = None
    user_id: Optional[str] = None  # For employee documents
    customer_id: Optional[str] = None  # For customer documents
    related_entity_id: Optional[str] = None  # e.g., appointment_id, invoice_id


class DocumentUpdate(BaseModel):
    """Document update model."""
    name: Optional[str] = None
    description: Optional[str] = None
    expiration_date: Optional[date] = None
    status: Optional[DocumentStatus] = None
    rejection_reason: Optional[str] = None


class Document(BaseModel):
    """Document response model."""
    id: str = Field(..., alias="_id")
    franchise_id: str
    document_type: DocumentType
    name: str
    description: Optional[str] = None
    
    # File info
    file_name: str
    file_size: int  # bytes
    file_type: str  # MIME type
    file_url: str  # S3 URL or local path
    thumbnail_url: Optional[str] = None
    
    # Status
    status: DocumentStatus = DocumentStatus.PENDING
    rejection_reason: Optional[str] = None
    
    # Expiration
    expiration_date: Optional[date] = None
    is_expired: bool = False
    days_until_expiry: Optional[int] = None
    
    # Relations
    user_id: Optional[str] = None
    customer_id: Optional[str] = None
    related_entity_id: Optional[str] = None
    related_entity_type: Optional[str] = None
    
    # Audit
    uploaded_by: str
    uploaded_at: datetime
    reviewed_by: Optional[str] = None
    reviewed_at: Optional[datetime] = None
    
    class Config:
        populate_by_name = True
        from_attributes = True

    def check_expiration(self) -> None:
        """Check and update expiration status."""
        if self.expiration_date:
            today = date.today()
            if self.expiration_date < today:
                self.is_expired = True
                self.days_until_expiry = 0
            else:
                self.is_expired = False
                self.days_until_expiry = (self.expiration_date - today).days


class DocumentSearch(BaseModel):
    """Document search/filter model."""
    user_id: Optional[str] = None
    customer_id: Optional[str] = None
    document_type: Optional[List[DocumentType]] = None
    status: Optional[List[DocumentStatus]] = None
    is_expired: Optional[bool] = None
    expiring_within_days: Optional[int] = None  # e.g., 30 days
    page: int = 1
    page_size: int = 20


class ExpiringDocumentAlert(BaseModel):
    """Alert for expiring documents."""
    document_id: str
    document_name: str
    document_type: DocumentType
    user_id: Optional[str] = None
    user_name: Optional[str] = None
    expiration_date: date
    days_until_expiry: int
