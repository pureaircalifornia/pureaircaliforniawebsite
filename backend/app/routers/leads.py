"""
Leads Router
Handles lead CRUD operations for the CRM.
Public endpoint for form submissions, authenticated endpoints for admin management.
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query, Request
from datetime import datetime
from typing import List, Optional
from collections import defaultdict
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
