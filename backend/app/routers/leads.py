"""
Leads Router
Handles lead CRUD operations for the CRM.
Public endpoint for form submissions, authenticated endpoints for admin management.
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query, Request
from datetime import datetime
from typing import List, Optional
from collections import defaultdict
import logging
import uuid
import time

from ..models.lead import Lead, LeadCreate, LeadUpdate, LeadStatus, LeadSource
from ..core.dependencies import get_current_user
from ..database import get_leads_collection

router = APIRouter(prefix="/leads", tags=["Leads"])

# --- Simple In-Memory Rate Limiter ---
# Limits: 5 lead submissions per IP per 5-minute window
RATE_LIMIT_MAX = 5
RATE_LIMIT_WINDOW = 300  # seconds (5 minutes)
_rate_limit_store: dict[str, list[float]] = defaultdict(list)


def _check_rate_limit(client_ip: str) -> bool:
    """Returns True if the request is allowed, False if rate-limited."""
    now = time.time()
    # Clean old entries
    _rate_limit_store[client_ip] = [
        t for t in _rate_limit_store[client_ip] if now - t < RATE_LIMIT_WINDOW
    ]
    if len(_rate_limit_store[client_ip]) >= RATE_LIMIT_MAX:
        return False
    _rate_limit_store[client_ip].append(now)
    return True


@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_lead(lead_input: LeadCreate, request: Request):
    """
    Create a new lead from form submission.
    This endpoint is PUBLIC — no auth required for website form submissions.
    Rate limited to 5 submissions per IP per 5-minute window.
    """
    # Rate limit check
    client_ip = request.client.host if request.client else "unknown"
    if not _check_rate_limit(client_ip):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many submissions. Please try again in a few minutes."
        )
    collection = get_leads_collection()
    
    lead = Lead(
        **lead_input.model_dump(),
        id=str(uuid.uuid4()),
        status=LeadStatus.new,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    
    lead_dict = lead.model_dump()
    lead_dict["created_at"] = lead_dict["created_at"].isoformat()
    lead_dict["updated_at"] = lead_dict["updated_at"].isoformat()
    
    await collection.insert_one(lead_dict)

    # Speed-to-lead: fire instant auto-reply + owner alert (best-effort, non-blocking)
    try:
        from ..services.lead_notifications import send_lead_notifications
        await send_lead_notifications(lead_dict)
    except Exception:
        logging.getLogger(__name__).exception("lead notification dispatch failed")

    return lead_dict


@router.get("", response_model=List[dict])
async def get_leads(
    status_filter: Optional[LeadStatus] = Query(None, alias="status"),
    source: Optional[LeadSource] = None,
    limit: int = Query(100, ge=1, le=500),
    skip: int = Query(0, ge=0),
    current_user: dict = Depends(get_current_user),
):
    """Get all leads with optional filtering. Requires authentication."""
    collection = get_leads_collection()
    
    query = {}
    if status_filter:
        query["status"] = status_filter.value
    if source:
        query["source"] = source.value
    
    cursor = collection.find(query).sort("created_at", -1).skip(skip).limit(limit)
    leads = await cursor.to_list(length=limit)
    
    # Remove MongoDB _id field
    for lead in leads:
        lead.pop("_id", None)
    
    return leads


@router.get("/stats", response_model=dict)
async def get_lead_stats(
    current_user: dict = Depends(get_current_user),
):
    """Get lead statistics summary."""
    collection = get_leads_collection()
    
    total = await collection.count_documents({})
    new_count = await collection.count_documents({"status": "new"})
    contacted = await collection.count_documents({"status": "contacted"})
    quoted = await collection.count_documents({"status": "quoted"})
    scheduled = await collection.count_documents({"status": "scheduled"})
    completed = await collection.count_documents({"status": "completed"})
    cancelled = await collection.count_documents({"status": "cancelled"})
    
    return {
        "total": total,
        "by_status": {
            "new": new_count,
            "contacted": contacted,
            "quoted": quoted,
            "scheduled": scheduled,
            "completed": completed,
            "cancelled": cancelled,
        },
        "conversion_rate": round((completed / total * 100) if total > 0 else 0, 1),
    }


@router.get("/{lead_id}", response_model=dict)
async def get_lead(
    lead_id: str,
    current_user: dict = Depends(get_current_user),
):
    """Get a specific lead by ID."""
    collection = get_leads_collection()
    lead = await collection.find_one({"id": lead_id})
    
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    lead.pop("_id", None)
    return lead


@router.patch("/{lead_id}", response_model=dict)
async def update_lead(
    lead_id: str,
    lead_update: LeadUpdate,
    current_user: dict = Depends(get_current_user),
):
    """Update a lead's status, notes, or estimated price."""
    collection = get_leads_collection()
    
    existing = await collection.find_one({"id": lead_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    update_data = {k: v for k, v in lead_update.model_dump().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow().isoformat()
    
    await collection.update_one({"id": lead_id}, {"$set": update_data})
    
    updated = await collection.find_one({"id": lead_id})
    updated.pop("_id", None)
    return updated


@router.delete("/{lead_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_lead(
    lead_id: str,
    current_user: dict = Depends(get_current_user),
):
    """Delete a lead."""
    collection = get_leads_collection()
    result = await collection.delete_one({"id": lead_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")


# ── Webhook for External Integrations (n8n, Zapier) ──────────────
from pydantic import BaseModel, EmailStr as WebhookEmail
from ..config import get_settings


class WebhookLeadPayload(BaseModel):
    """Incoming lead from external webhook (n8n, Zapier, etc.)."""
    name: str
    email: str
    phone: str
    message: Optional[str] = None
    service: Optional[str] = None
    address: Optional[str] = None
    source: str = "other"
    webhook_secret: Optional[str] = None  # For simple auth


@router.post("/webhook", response_model=dict, status_code=status.HTTP_201_CREATED)
async def webhook_create_lead(payload: WebhookLeadPayload, request: Request):
    """
    Webhook endpoint for external lead sources (n8n, Zapier, CRM integrations).
    Authenticates via x-admin-secret header OR webhook_secret in body.
    """
    settings = get_settings()
    admin_secret = settings.ADMIN_SECRET

    # Validate webhook auth
    header_secret = request.headers.get("x-admin-secret", "")
    body_secret = payload.webhook_secret or ""

    if admin_secret and header_secret != admin_secret and body_secret != admin_secret:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid webhook secret"
        )

    # Rate limit check
    client_ip = request.client.host if request.client else "unknown"
    if not _check_rate_limit(client_ip):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many submissions. Please try again later."
        )

    collection = get_leads_collection()

    # Map source string to enum (fallback to "other")
    try:
        lead_source = LeadSource(payload.source)
    except ValueError:
        lead_source = LeadSource.other

    lead_id = str(uuid.uuid4())
    now = datetime.utcnow()

    lead_dict = {
        "id": lead_id,
        "name": payload.name,
        "email": payload.email,
        "phone": payload.phone,
        "message": payload.message,
        "service": payload.service,
        "address": payload.address,
        "source": lead_source.value,
        "status": LeadStatus.new.value,
        "created_at": now.isoformat(),
        "updated_at": now.isoformat(),
        "property_type": None,
        "square_footage": None,
        "preferred_date": None,
        "notes": "Received via webhook",
        "estimated_price": None,
    }

    await collection.insert_one(lead_dict)

    import logging
    logging.getLogger(__name__).info(
        f"Webhook lead created: {lead_id} - {payload.name} ({payload.email})"
    )

    lead_dict.pop("_id", None)
    return lead_dict


# ── Lead → Customer Conversion ───────────────────────────────────
from ..database import get_customers_collection


@router.post("/{lead_id}/convert", response_model=dict)
async def convert_lead_to_customer(
    lead_id: str,
    current_user: dict = Depends(get_current_user),
):
    """
    Convert a lead into a customer record.
    Sets lead status to 'completed' and creates a customer document.
    """
    leads_collection = get_leads_collection()
    customers_collection = get_customers_collection()

    lead = await leads_collection.find_one({"id": lead_id})
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    # Check if customer already exists with this email
    existing_customer = await customers_collection.find_one({"email": lead.get("email")})
    if existing_customer:
        # Update lead status to completed
        await leads_collection.update_one(
            {"id": lead_id},
            {"$set": {"status": "completed", "updated_at": datetime.utcnow().isoformat()}}
        )
        existing_customer.pop("_id", None)
        return {
            "message": "Customer already exists with this email",
            "customer": existing_customer,
            "created": False,
        }

    # Parse name into first/last
    name_parts = (lead.get("name") or "").strip().split(" ", 1)
    first_name = name_parts[0] if name_parts else "Unknown"
    last_name = name_parts[1] if len(name_parts) > 1 else ""

    now = datetime.utcnow()
    customer_id = str(uuid.uuid4())

    customer_doc = {
        "_id": customer_id,
        "email": lead.get("email"),
        "first_name": first_name,
        "last_name": last_name,
        "phone": lead.get("phone"),
        "secondary_phone": None,
        "preferred_contact": "phone",
        "lead_source": "website",
        "lead_status": "converted",
        "tags": ["from_lead"],
        "franchise_id": current_user.get("franchise_id", "default"),
        "properties": [],
        "notes": [{
            "id": str(uuid.uuid4()),
            "content": f"Converted from lead. Original message: {lead.get('message', 'N/A')}",
            "created_by": current_user.get("_id", "system"),
            "created_at": now.isoformat(),
            "note_type": "general",
        }],
        "total_spent": 0.0,
        "total_appointments": 0,
        "last_appointment_date": None,
        "next_appointment_date": None,
        "lifetime_value": 0.0,
        "created_at": now,
        "updated_at": now,
        "is_active": True,
    }

    # Add address as property if available
    if lead.get("address"):
        customer_doc["properties"].append({
            "id": str(uuid.uuid4()),
            "address_line1": lead["address"],
            "city": None,
            "state": "CA",
            "zip_code": None,
            "property_type": lead.get("property_type", "residential"),
            "square_footage": int(lead["square_footage"]) if lead.get("square_footage") else None,
            "is_primary": True,
        })

    await customers_collection.insert_one(customer_doc)

    # Update lead status to completed
    await leads_collection.update_one(
        {"id": lead_id},
        {"$set": {"status": "completed", "updated_at": now.isoformat()}}
    )

    customer_doc.pop("_id", None)
    customer_doc["id"] = customer_id

    return {
        "message": "Lead successfully converted to customer",
        "customer": customer_doc,
        "created": True,
    }

