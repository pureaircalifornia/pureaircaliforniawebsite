from fastapi import FastAPI, APIRouter, HTTPException, Depends, Security
from fastapi.security.api_key import APIKeyHeader
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
from enum import Enum


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Admin Authentication - ADMIN_SECRET must be set in environment
ADMIN_SECRET = os.environ.get('ADMIN_SECRET')
if not ADMIN_SECRET:
    raise ValueError("ADMIN_SECRET environment variable must be set")
api_key_header = APIKeyHeader(name="x-admin-secret", auto_error=False)

async def get_admin_user(api_key_header: str = Security(api_key_header)):
    if api_key_header == ADMIN_SECRET:
        return True
    raise HTTPException(
        status_code=403,
        detail="Could not validate credentials"
    )

# Create the main app without a prefix
app = FastAPI(
    title="Pure Air California API",
    description="Backend API for Pure Air California website",
    version="1.0.0"
)


# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str


# Lead Status Enum
class LeadStatus(str, Enum):
    new = "new"
    contacted = "contacted"
    quoted = "quoted"
    scheduled = "scheduled"
    completed = "completed"
    cancelled = "cancelled"


# Lead Source Enum
class LeadSource(str, Enum):
    contact_form = "contact_form"
    quote_form = "quote_form"
    phone = "phone"
    referral = "referral"
    other = "other"


# Lead Models
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


class LeadCreate(LeadBase):
    pass


class Lead(LeadBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: LeadStatus = LeadStatus.new
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    notes: Optional[str] = None
    estimated_price: Optional[float] = None


class LeadUpdate(BaseModel):
    status: Optional[LeadStatus] = None
    notes: Optional[str] = None
    estimated_price: Optional[float] = None


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Pure Air California API", "version": "1.0.0"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]


# Lead Management Endpoints
@api_router.post("/leads", response_model=Lead)
async def create_lead(lead_input: LeadCreate):
    """Create a new lead from form submission"""
    lead = Lead(**lead_input.dict())
    lead_dict = lead.dict()
    await db.leads.insert_one(lead_dict)
    logger.info(f"New lead created: {lead.id} - {lead.name} ({lead.email})")
    return lead


@api_router.get("/leads", response_model=List[Lead], dependencies=[Depends(get_admin_user)])
async def get_leads(
    status: Optional[LeadStatus] = None,
    source: Optional[LeadSource] = None,
    limit: int = 100,
    skip: int = 0
):
    """Get all leads with optional filtering"""
    query = {}
    if status:
        query["status"] = status.value
    if source:
        query["source"] = source.value
    
    leads = await db.leads.find(query).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    return [Lead(**lead) for lead in leads]


@api_router.get("/leads/{lead_id}", response_model=Lead, dependencies=[Depends(get_admin_user)])
async def get_lead(lead_id: str):
    """Get a specific lead by ID"""
    lead = await db.leads.find_one({"id": lead_id})
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return Lead(**lead)


@api_router.patch("/leads/{lead_id}", response_model=Lead, dependencies=[Depends(get_admin_user)])
async def update_lead(lead_id: str, lead_update: LeadUpdate):
    """Update a lead's status, notes, or estimated price"""
    lead = await db.leads.find_one({"id": lead_id})
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    update_data = {k: v for k, v in lead_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await db.leads.update_one({"id": lead_id}, {"$set": update_data})
    
    updated_lead = await db.leads.find_one({"id": lead_id})
    logger.info(f"Lead updated: {lead_id} - Status: {update_data.get('status', 'unchanged')}")
    return Lead(**updated_lead)


@api_router.delete("/leads/{lead_id}", dependencies=[Depends(get_admin_user)])
async def delete_lead(lead_id: str):
    """Delete a lead"""
    result = await db.leads.delete_one({"id": lead_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    logger.info(f"Lead deleted: {lead_id}")
    return {"message": "Lead deleted successfully"}


@api_router.get("/leads/stats/summary")
async def get_lead_stats():
    """Get lead statistics summary"""
    total = await db.leads.count_documents({})
    new_leads = await db.leads.count_documents({"status": "new"})
    contacted = await db.leads.count_documents({"status": "contacted"})
    scheduled = await db.leads.count_documents({"status": "scheduled"})
    completed = await db.leads.count_documents({"status": "completed"})
    
    return {
        "total": total,
        "by_status": {
            "new": new_leads,
            "contacted": contacted,
            "scheduled": scheduled,
            "completed": completed
        }
    }


# Include the router in the main app
app.include_router(api_router)

# CORS Configuration - environment-aware
IS_PRODUCTION = os.environ.get('ENVIRONMENT', 'development').lower() == 'production'

# Production origins only
production_origins = [
    "https://www.pureaircalifornia.com",
    "https://pureaircalifornia.com",
]

# Development origins (only included in non-production)
development_origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
]

allowed_origins = production_origins if IS_PRODUCTION else production_origins + development_origins

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=allowed_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

