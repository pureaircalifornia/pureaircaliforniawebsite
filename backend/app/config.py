"""
Application Configuration Management
Centralizes all environment variables and configuration settings.
"""
from pydantic_settings import BaseSettings
from typing import Optional
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Application
    APP_NAME: str = "Pure Air California Business Management"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # Database
    MONGO_URL: str
    DB_NAME: str = "pureaircalifornia"
    
    # Authentication
    JWT_SECRET_KEY: str  # REQUIRED — must be set in .env
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # Stripe (Payment Processing)
    STRIPE_SECRET_KEY: Optional[str] = None
    STRIPE_WEBHOOK_SECRET: Optional[str] = None
    STRIPE_PUBLISHABLE_KEY: Optional[str] = None
    
    # Advanced Outreach Configuration
    W9_DOCUMENT_LINK: Optional[str] = None
    INSURANCE_DOCUMENT_LINK: Optional[str] = None
    
    # Email Services (SendGrid / Resend)
    SENDGRID_API_KEY: Optional[str] = None
    RESEND_API_KEY: Optional[str] = None
    FROM_EMAIL: str = "noreply@pureaircalifornia.com"
    
    # Twilio (SMS)
    TWILIO_ACCOUNT_SID: Optional[str] = None
    TWILIO_AUTH_TOKEN: Optional[str] = None
    TWILIO_PHONE_NUMBER: Optional[str] = None
    
    # AWS S3 (Document Storage)
    AWS_ACCESS_KEY_ID: Optional[str] = None
    AWS_SECRET_ACCESS_KEY: Optional[str] = None
    S3_BUCKET_NAME: str = "pac-documents"
    AWS_REGION: str = "us-west-2"
    
    # Google Places API (Lead Scanner)
    GOOGLE_PLACES_API_KEY: Optional[str] = None

    # Google Business Profile / Reviews
    GOOGLE_REVIEW_URL: Optional[str] = None  # GBP "leave a review" link
    PUBLIC_SITE_URL: str = "https://www.pureaircalifornia.com"

    # Notifications
    OWNER_NOTIFY_EMAIL: Optional[str] = None  # instant lead/owner alerts
    SMS_ENABLED: bool = False  # email-first; flip on when Twilio is live

    # Admin Secret (backward compat)
    ADMIN_SECRET: Optional[str] = None

    # Cold outreach (lead scanner)
    OUTREACH_FROM_EMAIL: str = "lou@pureaircalifornia.com"
    OUTREACH_FROM_NAME: str = "Lou at Pure Air California"
    OUTREACH_REPLY_TO: str = "lou@pureaircalifornia.com"
    OUTREACH_SENDER_FIRST_NAME: str = "Lou"
    OUTREACH_PHONE: str = "(213) 792-4145"
    # CAN-SPAM requires a valid physical postal address in every commercial email.
    OUTREACH_POSTAL_ADDRESS: str = "PO Box 3842, Valley Village, CA 91617"
    # Hard ceiling on outreach emails per rolling 24 hours (manual + automated).
    OUTREACH_DAILY_LIMIT: int = 40
    # Automated follow-ups only go out Monday-Friday inside this local window.
    OUTREACH_TIMEZONE: str = "America/Los_Angeles"
    OUTREACH_WINDOW_START_HOUR: int = 8
    OUTREACH_WINDOW_END_HOUR: int = 16
    # Public base URL of this API, used for one-click unsubscribe headers.
    PUBLIC_API_URL: str = "https://pac-crm-backend.onrender.com/api"
    # Shared secret the scheduler sends to /lead-scanner/outreach/run-drip.
    CRON_SECRET: Optional[str] = None
    # Signing secret from the Resend webhook settings ("whsec_...").
    RESEND_WEBHOOK_SECRET: Optional[str] = None
    
    # CORS
    CORS_ORIGINS: list = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "https://pureaircalifornia.com",
        "https://www.pureaircalifornia.com",
        "https://admin.pureaircalifornia.com",
    ]
    
    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "ignore"  # Allow extra fields in .env file


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()
