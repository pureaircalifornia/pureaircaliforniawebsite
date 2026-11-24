"""
Lead Scanner Router
Google Maps business search, prospect management and contact enrichment.
Email outreach lives in routers/outreach.py.
"""
import asyncio
import logging
import uuid
from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field

from ..core.dependencies import get_current_user
from ..database import get_prospects_collection
from ..models.prospect import (
    BusinessCategory, OutreachStatus, PlaceSearchRequest, PlaceSearchResult,
    Prospect, ProspectBulkCreate, ProspectCreate, ProspectUpdate, SequenceStatus,
    SEQUENCE_STOP_STATUSES, SUPPRESSED_STATUSES,
)
from ..services.email_finder import find_emails_for_business
from ..services.google_places import search_places
from ..services.outreach_sequence import suppress
from ..services.prospect_quality import score_prospect

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/lead-scanner", tags=["Lead Scanner"])

# Enrichment reads up to a dozen pages per site; cap how many sites at once.
_enrich_semaphore = asyncio.Semaphore(3)


def _public(prospect: dict) -> dict:
    """Strip Mongo's _id before a document leaves the API."""
    return {key: value for key, value in prospect.items() if key != "_id"}


def _rescore(prospect: dict) -> int:
    try:
        category = BusinessCategory(prospect.get("business_category", "other"))
    except ValueError:
        category = BusinessCategory.other
    score, _ = score_prospect(
        category,
        website=prospect.get("website"),
        phone=prospect.get("phone"),
        rating=prospect.get("rating"),
        total_ratings=prospect.get("total_ratings"),
        business_status=prospect.get("business_status"),
        email_grade=prospect.get("email_quality") if prospect.get("contact_email") else None,
        has_contact_name=bool(prospect.get("contact_name")),
    )
    return score


# ── Search ────────────────────────────────────────────────────────────

@router.post("/search", response_model=List[PlaceSearchResult])
async def search_businesses(
    request: PlaceSearchRequest,
    current_user: dict = Depends(get_current_user),
):
    """Search Google Maps for businesses, ranked by how good a prospect each is."""
    return await search_places(
        category=request.category,
        location=request.location,
        radius_miles=request.radius_miles,
        custom_query=request.query or None,
        max_results=request.max_results,
    )


class PlaceIdCheckRequest(BaseModel):
    place_ids: List[str] = Field(..., max_length=200)


@router.post("/check-prospects", response_model=dict)
async def check_prospect_status(
    request: PlaceIdCheckRequest,
    current_user: dict = Depends(get_current_user),
):
    """Report which place_ids are already saved, and where each stands."""
    cursor = get_prospects_collection().find(
        {"place_id": {"$in": request.place_ids}},
        {"_id": 0, "place_id": 1, "outreach_status": 1, "id": 1,
         "emails_sent": 1, "last_contacted_at": 1},
    )
    status_map = {
        p["place_id"]: {
            "prospect_id": p.get("id"),
            "outreach_status": p.get("outreach_status", "not_contacted"),
            "emails_sent": p.get("emails_sent", 0),
            "last_contacted_at": p.get("last_contacted_at"),
        }
        for p in await cursor.to_list(length=500)
    }
    return {"status_map": status_map}


# ── Enrichment ────────────────────────────────────────────────────────

async def enrich_prospect(prospect_id: str) -> Optional[dict]:
    """
    Read the prospect's website for a contact email and decision maker, then
    re-score. Never overwrites something a person entered by hand.
    """
    collection = get_prospects_collection()
    prospect = await collection.find_one({"id": prospect_id})
    if not prospect or not prospect.get("website"):
        return None

    async with _enrich_semaphore:
        results = await find_emails_for_business(
            prospect["website"], prospect.get("business_name"), prospect.get("phone"))

    updates = {
        "found_emails": results["emails"],
        "found_contacts": results["contacts"],
        "email_domain": results["domain"],
        "mx_valid": results["mx_valid"],
        "enriched_at": datetime.utcnow().isoformat(),
    }
    best = results.get("best")
    if best and not prospect.get("contact_email"):
        updates["contact_email"] = best["email"]
        updates["email_quality"] = best["grade"]
    elif prospect.get("contact_email") and not prospect.get("email_quality"):
        match = next((e for e in results["emails"]
                      if e["email"] == prospect["contact_email"].lower()), None)
        if match:
            updates["email_quality"] = match["grade"]
    if results.get("top_contact_name") and not prospect.get("contact_name"):
        updates["contact_name"] = results["top_contact_name"]
        if results.get("top_contact_title") and not prospect.get("contact_title"):
            updates["contact_title"] = results["top_contact_title"]

    # Enrichment can take a minute. Re-read, and leave alone any contact field
    # a person filled in while it ran.
    latest = await collection.find_one({"id": prospect_id}) or prospect
    for field in ("contact_email", "contact_name", "contact_title"):
        if latest.get(field) and field in updates:
            del updates[field]
            if field == "contact_email":
                updates.pop("email_quality", None)

    updates["fit_score"] = _rescore({**latest, **updates})
    await collection.update_one({"id": prospect_id}, {"$set": updates})
    return results


async def _background_enrich(prospect_id: str) -> None:
    try:
        await enrich_prospect(prospect_id)
    except Exception:
        logger.exception("Background enrichment failed for prospect %s", prospect_id)


# ── Prospects CRUD ────────────────────────────────────────────────────

CLEARABLE_FIELDS = frozenset({
    "contact_name", "contact_email", "contact_title", "notes", "personal_note"})

SORT_OPTIONS = {
    "score": [("fit_score", -1), ("created_at", -1)],
    "recent": [("created_at", -1)],
    "next_touch": [("next_touch_at", 1)],
}


@router.get("/prospects", response_model=List[dict])
async def list_prospects(
    category: Optional[BusinessCategory] = None,
    outreach_status: Optional[OutreachStatus] = None,
    sequence_status: Optional[SequenceStatus] = None,
    has_email: Optional[bool] = None,
    sort: str = Query("score", pattern="^(score|recent|next_touch)$"),
    limit: int = Query(100, ge=1, le=500),
    skip: int = Query(0, ge=0),
    current_user: dict = Depends(get_current_user),
):
    """List saved prospects, best first by default."""
    query: dict = {}
    if category:
        query["business_category"] = category.value
    if outreach_status:
        query["outreach_status"] = outreach_status.value
    if sequence_status:
        query["sequence_status"] = sequence_status.value
    if has_email is True:
        query["contact_email"] = {"$nin": [None, ""]}
    elif has_email is False:
        query["contact_email"] = {"$in": [None, ""]}
    if sort == "next_touch":
        # MongoDB sorts missing values first; without this the list would open
        # with every prospect that has nothing scheduled.
        query["next_touch_at"] = {"$ne": None}

    cursor = (get_prospects_collection().find(query)
              .sort(SORT_OPTIONS[sort]).skip(skip).limit(limit))
    # Records saved before scoring existed have no score; work one out for
    # display instead of showing them as zero.
    return [_public(p) if "fit_score" in p else {**_public(p), "fit_score": _rescore(p)}
            for p in await cursor.to_list(length=limit)]


def _new_prospect_document(data: ProspectCreate) -> dict:
    prospect = Prospect(**data.model_dump())
    document = prospect.model_dump(mode="json")
    if document.get("place_id") is None:
        # A unique sparse index skips a missing field but not a null one.
        document.pop("place_id", None)
    document["fit_score"] = _rescore(document)
    return document


async def _insert_prospect(data: ProspectCreate) -> tuple[dict, bool]:
    """Insert unless the place is already saved. Returns (document, created)."""
    collection = get_prospects_collection()
    if data.place_id:
        existing = await collection.find_one({"place_id": data.place_id})
        if existing:
            return _public(existing), False
    document = _new_prospect_document(data)
    await collection.insert_one(dict(document))
    return document, True


@router.post("/prospects", response_model=dict, status_code=status.HTTP_201_CREATED)
async def save_prospect(
    prospect_data: ProspectCreate,
    background_tasks: BackgroundTasks,
    current_user: dict = Depends(get_current_user),
):
    """Save a business from search results and start finding its contact."""
    document, created = await _insert_prospect(prospect_data)
    if created and document.get("website"):
        background_tasks.add_task(_background_enrich, document["id"])
    return document


@router.post("/prospects/bulk", response_model=dict, status_code=status.HTTP_201_CREATED)
async def save_prospects_bulk(
    request: ProspectBulkCreate,
    background_tasks: BackgroundTasks,
    current_user: dict = Depends(get_current_user),
):
    """Save many search results in one request."""
    saved: List[dict] = []
    created_count = 0
    for prospect_data in request.prospects:
        document, created = await _insert_prospect(prospect_data)
        saved.append(document)
        if created:
            created_count += 1
            if document.get("website"):
                background_tasks.add_task(_background_enrich, document["id"])
    return {"saved": saved, "created": created_count,
            "already_saved": len(saved) - created_count}


@router.post("/find-emails/{prospect_id}", response_model=dict)
async def find_emails_for_prospect(
    prospect_id: str,
    current_user: dict = Depends(get_current_user),
):
    """Re-run contact enrichment for one prospect and return what was found."""
    collection = get_prospects_collection()
    prospect = await collection.find_one({"id": prospect_id})
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found")
    if not prospect.get("website"):
        raise HTTPException(status_code=400, detail="Prospect has no website to read")

    results = await enrich_prospect(prospect_id)
    updated = await collection.find_one({"id": prospect_id})
    return {**(results or {}), "prospect": _public(updated)}


@router.get("/prospects/{prospect_id}", response_model=dict)
async def get_prospect(
    prospect_id: str,
    current_user: dict = Depends(get_current_user),
):
    prospect = await get_prospects_collection().find_one({"id": prospect_id})
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found")
    return _public(prospect)


@router.patch("/prospects/{prospect_id}", response_model=dict)
async def update_prospect(
    prospect_id: str,
    updates: ProspectUpdate,
    current_user: dict = Depends(get_current_user),
):
    """Update contact details, notes or pipeline status."""
    collection = get_prospects_collection()
    existing = await collection.find_one({"id": prospect_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Prospect not found")

    update_data = updates.model_dump(exclude_unset=True, mode="json")
    # An explicit null clears a contact or note field; for anything else a
    # null means "leave it alone".
    update_data = {key: value for key, value in update_data.items()
                   if value is not None or key in CLEARABLE_FIELDS}

    if "contact_email" in update_data and update_data["contact_email"] is None:
        update_data["contact_email_confirmed"] = False
        update_data["email_quality"] = None
    elif "contact_email" in update_data:
        update_data["contact_email"] = update_data["contact_email"].strip().lower()
        # Someone chose this address deliberately; see email_grade_for().
        update_data["contact_email_confirmed"] = True
        update_data["email_quality"] = "named"

    new_status = update_data.get("outreach_status")
    if new_status in SEQUENCE_STOP_STATUSES:
        # A reply, a booking or a "no" ends the automated follow-ups.
        update_data["sequence_status"] = SequenceStatus.stopped.value
        update_data["next_touch_at"] = None
    if new_status in SUPPRESSED_STATUSES:
        await suppress(update_data.get("contact_email") or existing.get("contact_email"),
                       f"marked {new_status}")

    update_data["updated_at"] = datetime.utcnow().isoformat()
    update_data["fit_score"] = _rescore({**existing, **update_data})
    await collection.update_one({"id": prospect_id}, {"$set": update_data})
    return _public(await collection.find_one({"id": prospect_id}))


@router.delete("/prospects/{prospect_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_prospect(
    prospect_id: str,
    current_user: dict = Depends(get_current_user),
):
    """Delete a prospect. Their address stays on the do-not-contact list if it was there."""
    result = await get_prospects_collection().delete_one({"id": prospect_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Prospect not found")
