"""Reviews router — public feedback page endpoints + admin stats."""
from fastapi import APIRouter, HTTPException, Depends
from ..models.review_request import FeedbackSubmission
from ..core.dependencies import get_current_user
from ..services import review_engine

router = APIRouter(prefix="/reviews", tags=["Reviews"])


@router.get("/feedback/{token}", response_model=dict)
async def get_feedback(token: str):
    """PUBLIC: resolve a review token, mark it clicked, return minimal context."""
    req = await review_engine.mark_clicked(token)
    if not req:
        raise HTTPException(status_code=404, detail="Invalid or expired link")
    return {"customer_name": req.get("customer_name"), "status": req.get("status")}


@router.post("/feedback/{token}", response_model=dict)
async def submit_feedback(token: str, body: FeedbackSubmission):
    """PUBLIC: record rating. >=4 -> google route; <4 -> private + owner alert."""
    out = await review_engine.record_feedback(token, body.rating, body.private_feedback)
    if out is None:
        raise HTTPException(status_code=404, detail="Invalid or expired link")
    return out


@router.post("/request", response_model=dict)
async def request_review(appointment_id: str, customer_id: str,
                         current_user: dict = Depends(get_current_user)):
    """AUTH: manually trigger a review request for an appointment/customer."""
    from ..database import get_appointments_collection, get_customers_collection
    appt = await get_appointments_collection().find_one({"_id": appointment_id})
    cust = await get_customers_collection().find_one({"_id": customer_id})
    if not appt or not cust:
        raise HTTPException(status_code=404, detail="Appointment or customer not found")
    doc = await review_engine.create_and_send(appt, cust)
    return {"created": bool(doc), "request": doc}


@router.get("/stats", response_model=dict)
async def review_stats(current_user: dict = Depends(get_current_user)):
    """AUTH: review funnel stats for the admin dashboard."""
    return await review_engine.get_stats()
