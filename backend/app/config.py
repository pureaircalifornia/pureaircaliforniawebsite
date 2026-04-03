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
    
    # Admin Secret (backward compat)
    ADMIN_SECRET: Optional[str] = None
    
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
