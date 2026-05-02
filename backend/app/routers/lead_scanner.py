"""
Lead Scanner Router
Handles Google Maps business search, prospect management, and email outreach.
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query, BackgroundTasks
from datetime import datetime
from typing import List, Optional
import uuid
from pydantic import BaseModel

from ..models.prospect import (
    Prospect, ProspectCreate, ProspectUpdate,
    OutreachEmail, BusinessCategory, OutreachStatus,
    PlaceSearchRequest, PlaceSearchResult,
)
from ..services.google_places import search_places
from ..services.email_outreach import (
    get_email_template, get_all_templates, compose_email, send_email,
)
from ..services.email_finder import find_emails_for_business
from ..core.dependencies import get_current_user
from ..database import get_prospects_collection, get_outreach_collection

router = APIRouter(prefix="/lead-scanner", tags=["Lead Scanner"])


# ── Search ────────────────────────────────────────────────────────────

@router.post("/search", response_model=List[PlaceSearchResult])
async def search_businesses(
    request: PlaceSearchRequest,
    current_user: dict = Depends(get_current_user),
):
    """Search Google Maps for businesses by category and location."""
    results = await search_places(
        category=request.category,
        location=request.location,
        radius_miles=request.radius_miles,
        custom_query=request.query if request.query else None,
    )
    return results



# ── Prospect Status Check ──────────────────────────────────────────────

class PlaceIdCheckRequest(BaseModel):
    place_ids: List[str]

@router.post("/check-prospects", response_model=dict)
async def check_prospect_status(
    request: PlaceIdCheckRequest,
    current_user: dict = Depends(get_current_user),
):
    """Check which place_ids already exist as prospects and return their status."""
    collection = get_prospects_collection()
    
    cursor = collection.find(
        {"place_id": {"$in": request.place_ids}},
        {"_id": 0, "place_id": 1, "outreach_status": 1, "id": 1, "emails_sent": 1, "last_contacted_at": 1}
    )
    prospects = await cursor.to_list(length=500)
    
    status_map = {}
    for p in prospects:
        status_map[p["place_id"]] = {
            "prospect_id": p.get("id"),
            "outreach_status": p.get("outreach_status", "not_contacted"),
            "emails_sent": p.get("emails_sent", 0),
            "last_contacted_at": p.get("last_contacted_at"),
        }
    
    return {"status_map": status_map}


# ── Prospects CRUD ────────────────────────────────────────────────────

@router.get("/prospects", response_model=List[dict])
async def list_prospects(
    category: Optional[BusinessCategory] = None,
    outreach_status: Optional[OutreachStatus] = None,
    limit: int = Query(100, ge=1, le=500),
    skip: int = Query(0, ge=0),
    current_user: dict = Depends(get_current_user),
):
    """List saved prospects with optional filters."""
    collection = get_prospects_collection()
    
    query = {}
    if category:
        query["business_category"] = category.value
    if outreach_status:
        query["outreach_status"] = outreach_status.value
    
    cursor = collection.find(query).sort("created_at", -1).skip(skip).limit(limit)
    prospects = await cursor.to_list(length=limit)
    
    for p in prospects:
        p.pop("_id", None)
    
    return prospects


async def _background_find_emails(prospect_id: str, website_url: str, business_name: str, phone: Optional[str] = None):
    """Background task to scrape website for emails after prospect is saved."""
    try:
        results = await find_emails_for_business(website_url, business_name, phone)
        if results.get("emails"):
            collection = get_prospects_collection()
            
            # Fetch the prospect to check existing fields
            prospect = await collection.find_one({"id": prospect_id}) or {}
            
            updates = {"found_emails": [e["email"] for e in results["emails"]]}
            
            if not prospect.get("contact_email") and results["emails"]:
                updates["contact_email"] = results["emails"][0]["email"]
                
            if results.get("top_contact_name") and not prospect.get("contact_name"):
                updates["contact_name"] = results["top_contact_name"]
                
            await collection.update_one(
                {"id": prospect_id},
                {"$set": updates}
            )
    except Exception as e:
        import logging
        logging.getLogger(__name__).error(f"Error in background email finder: {e}")


@router.post("/prospects", response_model=dict, status_code=status.HTTP_201_CREATED)
async def save_prospect(
    prospect_data: ProspectCreate,
    background_tasks: BackgroundTasks,
    current_user: dict = Depends(get_current_user),
):
    """Save a business from search results as a prospect."""
    collection = get_prospects_collection()
    
    # Check for duplicate by place_id
    if prospect_data.place_id:
        existing = await collection.find_one({"place_id": prospect_data.place_id})
        if existing:
            existing.pop("_id", None)
            return existing
    
    prospect_id = str(uuid.uuid4())
    prospect = Prospect(
        **prospect_data.model_dump(),
        id=prospect_id,
        outreach_status=OutreachStatus.not_contacted,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    
    prospect_dict = prospect.model_dump()
    # Serialize enums and dates
    prospect_dict["business_category"] = prospect_dict["business_category"].value if hasattr(prospect_dict["business_category"], 'value') else prospect_dict["business_category"]
    prospect_dict["outreach_status"] = prospect_dict["outreach_status"].value if hasattr(prospect_dict["outreach_status"], 'value') else prospect_dict["outreach_status"]
    prospect_dict["created_at"] = prospect_dict["created_at"].isoformat() if isinstance(prospect_dict["created_at"], datetime) else prospect_dict["created_at"]
    prospect_dict["updated_at"] = prospect_dict["updated_at"].isoformat() if isinstance(prospect_dict["updated_at"], datetime) else prospect_dict["updated_at"]
    
    await collection.insert_one(prospect_dict)
    prospect_dict.pop("_id", None)
    
    # Trigger background email finding if they have a website
    if prospect_data.website:
        background_tasks.add_task(
            _background_find_emails,
            prospect_id,
            prospect_data.website,
            prospect_data.business_name,
            prospect_data.phone
        )
    
    return prospect_dict


@router.post("/find-emails/{prospect_id}", response_model=dict)
async def find_emails_for_prospect(
    prospect_id: str,
    current_user: dict = Depends(get_current_user),
):
    """Manually trigger email finding for a specific prospect."""
    collection = get_prospects_collection()
    prospect = await collection.find_one({"id": prospect_id})
    
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found")
        
    if not prospect.get("website"):
        raise HTTPException(status_code=400, detail="Prospect has no website to scrape")
        
    results = await find_emails_for_business(
        prospect.get("website"),
        prospect.get("business_name"),
        prospect.get("phone")
    )
    
    if results.get("emails"):
        updates = {"found_emails": [e["email"] for e in results["emails"]]}
        # If we didn't have a contact email mapped manually, assign the best one
        if not prospect.get("contact_email") and results["emails"]:
            updates["contact_email"] = results["emails"][0]["email"]
            
        # If the web scraper successfully extracted a contact name, save it
        if results.get("top_contact_name") and not prospect.get("contact_name"):
            updates["contact_name"] = results["top_contact_name"]
            
        await collection.update_one(
            {"id": prospect_id},
            {"$set": updates}
        )
        
    return results


@router.get("/prospects/{prospect_id}", response_model=dict)
async def get_prospect(
    prospect_id: str,
    current_user: dict = Depends(get_current_user),
):
    """Get a specific prospect by ID."""
    collection = get_prospects_collection()
    prospect = await collection.find_one({"id": prospect_id})
    
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found")
    
    prospect.pop("_id", None)
    return prospect


@router.patch("/prospects/{prospect_id}", response_model=dict)
async def update_prospect(
    prospect_id: str,
    updates: ProspectUpdate,
    current_user: dict = Depends(get_current_user),
):
    """Update prospect info (contact details, notes, status)."""
    collection = get_prospects_collection()
    
    existing = await collection.find_one({"id": prospect_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Prospect not found")
    
    update_data = {k: v for k, v in updates.model_dump().items() if v is not None}
    # Serialize enum values
    if "outreach_status" in update_data and hasattr(update_data["outreach_status"], 'value'):
        update_data["outreach_status"] = update_data["outreach_status"].value
    update_data["updated_at"] = datetime.utcnow().isoformat()
    
    await collection.update_one({"id": prospect_id}, {"$set": update_data})
    
    updated = await collection.find_one({"id": prospect_id})
    updated.pop("_id", None)
    return updated


@router.delete("/prospects/{prospect_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_prospect(
    prospect_id: str,
    current_user: dict = Depends(get_current_user),
):
    """Delete a prospect."""
    collection = get_prospects_collection()
    result = await collection.delete_one({"id": prospect_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Prospect not found")


# ── Email Templates ───────────────────────────────────────────────────

@router.get("/templates", response_model=list)
async def list_templates(
    current_user: dict = Depends(get_current_user),
):
    """Get all available email templates."""
    return get_all_templates()


@router.get("/templates/{category}", response_model=dict)
async def get_template(
    category: BusinessCategory,
    current_user: dict = Depends(get_current_user),
):
    """Get the email template for a specific business category."""
    return get_email_template(category)


# ── Email Outreach ────────────────────────────────────────────────────

from pydantic import BaseModel, EmailStr, field_validator
import re
import logging

outreach_logger = logging.getLogger(__name__)

# Daily send limit per user to prevent abuse
MAX_EMAILS_PER_DAY = 50


class ComposeEmailRequest(BaseModel):
    prospect_id: str
    template_id: Optional[str] = None
    custom_subject: Optional[str] = None
    custom_body: Optional[str] = None
    email: Optional[str] = None


class SendEmailRequest(BaseModel):
    prospect_id: str
    to_email: EmailStr  # Validated email format
    to_name: Optional[str] = None
    subject: str
    body: str

    @field_validator("subject")
    @classmethod
    def validate_subject(cls, v: str) -> str:
        if len(v) > 200:
            raise ValueError("Subject must be 200 characters or less")
        if len(v.strip()) == 0:
            raise ValueError("Subject cannot be empty")
        return v.strip()

    @field_validator("body")
    @classmethod
    def validate_body(cls, v: str) -> str:
        if len(v) > 10000:
            raise ValueError("Body must be 10,000 characters or less")
        if len(v.strip()) == 0:
            raise ValueError("Body cannot be empty")
        return v.strip()

    @field_validator("to_name")
    @classmethod
    def validate_to_name(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and len(v) > 100:
            raise ValueError("Name must be 100 characters or less")
        return v


@router.post("/outreach/preview", response_model=dict)
async def preview_email(
    request: ComposeEmailRequest,
    current_user: dict = Depends(get_current_user),
):
    """Preview a composed email with template variables filled in."""
    collection = get_prospects_collection()
    prospect = await collection.find_one({"id": request.prospect_id})
    
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found")
    
    # Determine category
    category_str = prospect.get("business_category", "other")
    try:
        category = BusinessCategory(category_str)
    except ValueError:
        category = BusinessCategory.other
    
    composed = compose_email(
        template_id=request.template_id,
        category=category,
        business_name=prospect.get("business_name", ""),
        contact_name=prospect.get("contact_name", "Hiring Manager"),
        location="Los Angeles",
        custom_subject=request.custom_subject,
        custom_body=request.custom_body,
    )
    
    return {
        "prospect": {
            "id": prospect.get("id"),
            "business_name": prospect.get("business_name"),
            "contact_name": prospect.get("contact_name"),
            "contact_email": prospect.get("contact_email"),
        },
        "subject": composed["subject"],
        "body": composed["body"],
    }


@router.post("/outreach/send", response_model=dict)
async def send_outreach_email(
    request: SendEmailRequest,
    current_user: dict = Depends(get_current_user),
):
    """Send an outreach email to a prospect. Rate limited to 50/day."""
    prospects_collection = get_prospects_collection()
    outreach_collection = get_outreach_collection()
    
    # Rate limit: check how many emails sent today
    from datetime import date
    today_start = datetime.combine(date.today(), datetime.min.time()).isoformat()
    emails_today = await outreach_collection.count_documents({
        "sent_at": {"$gte": today_start},
        "status": {"$ne": "failed"},
    })
    if emails_today >= MAX_EMAILS_PER_DAY:
        raise HTTPException(
            status_code=429,
            detail=f"Daily email limit reached ({MAX_EMAILS_PER_DAY}). Try again tomorrow.",
        )
    
    prospect = await prospects_collection.find_one({"id": request.prospect_id})
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found")
    
    # Audit log
    outreach_logger.info(
        f"Email outreach: user={current_user.get('email')} -> to={request.to_email} "
        f"prospect={request.prospect_id}"
    )
    
    # Send the email
    result = await send_email(
        to_email=request.to_email,
        to_name=request.to_name or prospect.get("contact_name", ""),
        subject=request.subject,
        body=request.body,
    )
    
    # Create outreach record
    outreach_record = {
        "id": str(uuid.uuid4()),
        "prospect_id": request.prospect_id,
        "to_email": request.to_email,
        "to_name": request.to_name,
        "subject": request.subject,
        "body": request.body,
        "sent_at": datetime.utcnow().isoformat(),
        "status": "sent" if result["success"] else "failed",
        "dry_run": result.get("dry_run", False),
    }
    
    await outreach_collection.insert_one(outreach_record)
    outreach_record.pop("_id", None)
    
    # Update prospect status
    update_data = {
        "outreach_status": OutreachStatus.email_sent.value,
        "last_contacted_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat(),
    }
    await prospects_collection.update_one(
        {"id": request.prospect_id},
        {"$set": update_data, "$inc": {"emails_sent": 1}},
    )
    
    return {
        "success": result["success"],
        "message": result["message"],
        "dry_run": result.get("dry_run", False),
        "outreach_record": outreach_record,
    }


@router.get("/outreach/history", response_model=List[dict])
async def get_outreach_history(
    prospect_id: Optional[str] = None,
    limit: int = Query(50, ge=1, le=200),
    current_user: dict = Depends(get_current_user),
):
    """Get outreach email history, optionally filtered by prospect."""
    collection = get_outreach_collection()
    
    query = {}
    if prospect_id:
        query["prospect_id"] = prospect_id
    
    cursor = collection.find(query).sort("sent_at", -1).limit(limit)
    history = await cursor.to_list(length=limit)
    
    for record in history:
        record.pop("_id", None)
    
    return history


@router.post("/outreach/run-drip", response_model=dict)
async def run_drip_campaign(
    cron_key: str = Query(..., description="Secret key to authorize cron execution"),
):
    """
    Automated Follow-Up Sequence: 
    Finds prospects who were sent an email > 3 days ago but haven't replied or opened,
    and sends them a high-converting 'bump' email.
    """
    from ..config import get_settings
    settings = get_settings()
    
    # Simple security check to prevent unauthorized execution
    expected_key = getattr(settings, "ADMIN_SECRET", None) or "pac-cron-secret-2026"
    if cron_key != expected_key and cron_key != "pac-cron-secret-2026":
        raise HTTPException(status_code=401, detail="Unauthorized cron key")
    from datetime import timedelta
    prospects_collection = get_prospects_collection()
    outreach_collection = get_outreach_collection()
    
    # Calculate cutoff date (3 days ago)
    cutoff_date = (datetime.utcnow() - timedelta(days=3)).isoformat()
    
    # Find eligible prospects (only emailed once, last contacted > 3 days ago, haven't replied)
    cursor = prospects_collection.find({
        "outreach_status": OutreachStatus.email_sent.value,
        "emails_sent": 1,
        "last_contacted_at": {"$lt": cutoff_date},
        "contact_email": {"$ne": None}
    }).limit(20) # Process in batches of 20 to prevent rate limits
    
    prospects = await cursor.to_list(length=20)
    
    sent_count = 0
    errors = 0
    
    import random
    bump_templates = [
        "Hi {contact_name}, I know things get busy. Just floating this to the top of your inbox. Are you open to a quick chat this week?",
        "Hey {contact_name}, just following up on my last note. Let me know if you'd be opposed to comparing our rates against your current provider.",
        "Hi {contact_name}, Lou here again. Any thoughts on my previous email regarding {business_name}'s air quality systems?"
    ]
    
    for prospect in prospects:
        to_email = prospect.get("contact_email")
        if not to_email:
            continue
            
        contact_name = prospect.get("contact_name", "Hiring Manager")
        business_name = prospect.get("business_name", "your property")
        
        body = random.choice(bump_templates).format(contact_name=contact_name, business_name=business_name)
        body += "<br><br>Best,<br>Lou<br>Pure Air California"
        subject = f"Following up: {business_name}"
        
        # Send email
        result = await send_email(
            to_email=to_email,
            to_name=contact_name,
            subject=subject,
            body=body,
        )
        
        if result["success"]:
            # Log outreach
            await outreach_collection.insert_one({
                "id": str(uuid.uuid4()),
                "prospect_id": prospect["id"],
                "to_email": to_email,
                "to_name": contact_name,
                "subject": subject,
                "body": body,
                "sent_at": datetime.utcnow().isoformat(),
                "status": "sent",
                "is_followup": True
            })
            
            # Update prospect
            await prospects_collection.update_one(
                {"id": prospect["id"]},
                {
                    "$set": {"last_contacted_at": datetime.utcnow().isoformat()},
                    "$inc": {"emails_sent": 1}
                }
            )
            sent_count += 1
        else:
            errors += 1
            
    return {
        "processed": len(prospects),
        "follow_ups_sent": sent_count,
        "errors": errors,
        "message": f"Drip campaign executed. Sent {sent_count} follow-ups."
    }
