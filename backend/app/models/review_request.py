"""Review request models — tracks automated review solicitations."""
import secrets
import uuid
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum


class ReviewStatus(str, Enum):
    pending = "pending"
    sent = "sent"
    clicked = "clicked"
    feedback_submitted = "feedback_submitted"
    reviewed = "reviewed"


class ReviewChannelType(str, Enum):
    email = "email"
    sms = "sms"


class ReviewRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer_id: str
    appointment_id: str
    customer_name: str
    customer_email: str
    customer_phone: str = ""
    # URL-safe auth token; always server-generated. default_factory is a safety
    # net so a request can never be persisted with an empty/predictable token.
    token: str = Field(default_factory=lambda: secrets.token_urlsafe(32))
    channel: ReviewChannelType = ReviewChannelType.email
    status: ReviewStatus = ReviewStatus.pending
    rating: Optional[int] = None
    private_feedback: Optional[str] = Field(None, max_length=2000)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    sent_at: Optional[datetime] = None
    clicked_at: Optional[datetime] = None
    responded_at: Optional[datetime] = None


class FeedbackSubmission(BaseModel):
    rating: int = Field(..., ge=1, le=5)
    private_feedback: Optional[str] = Field(None, max_length=2000)
