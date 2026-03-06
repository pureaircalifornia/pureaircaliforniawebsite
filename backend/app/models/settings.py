from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime

class ContactInfo(BaseModel):
    email: EmailStr
    phone: str

class CompanySettingsUpdate(BaseModel):
    company_name: Optional[str] = None
    contact: Optional[ContactInfo] = None

class CompanySettings(BaseModel):
    id: str = Field(alias="_id")
    company_name: str
    contact: ContactInfo
    updated_at: datetime
    
    class Config:
        populate_by_name = True
