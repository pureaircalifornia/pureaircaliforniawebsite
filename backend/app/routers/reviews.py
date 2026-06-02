"""Reviews router — public feedback page endpoints + admin stats."""
import time
from collections import defaultdict
from fastapi import APIRouter, HTTPException, Depends, Request, status
from ..models.review_request import FeedbackSubmission
from ..core.dependencies import get_current_user
from ..services import review_engine

router = APIRouter(prefix="/reviews", tags=["Reviews"])

# Simple in-memory rate limiter for the PUBLIC feedback endpoints (mirrors the
# leads router): 10 requests per IP per 5-minute window. The token itself is
# unguessable, but these endpoints write + can trigger owner emails.
_RATE_LIMIT_MAX = 10
_RATE_LIMIT_WINDOW = 300  # seconds
_rate_limit_store: dict[str, list[float]] = defaultdict(list)


def _check_rate_limit(client_ip: str) -> bool:
    now = time.time()
    _rate_limit_store[client_ip] = [
        t for t in _rate_limit_store[client_ip] if now - t < _RATE_LIMIT_WINDOW
    ]
    if len(_rate_limit_store[client_ip]) >= _RATE_LIMIT_MAX:
        return False
    _rate_limit_store[client_ip].append(now)
    return True


def _enforce_rate_limit(request: Request) -> None:
    client_ip = request.client.host if request.client else "unknown"
    if not _check_rate_limit(client_ip):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many requests. Please try again in a few minutes.",
        )


@router.get("/feedback/{token}", response_model=dict)
async def get_feedback(token: str, request: Request):
    """PUBLIC: resolve a review token, mark it clicked, return minimal context."""
    _enforce_rate_limit(request)
    req = await review_engine.mark_clicked(token)
    if not req:
        raise HTTPException(status_code=404, detail="Invalid or expired link")
    return {"customer_name": req.get("customer_name"), "status": req.get("status")}


@router.post("/feedback/{token}", response_model=dict)
async def submit_feedback(token: str, body: FeedbackSubmission, request: Request):
    """PUBLIC: record rating. >=4 -> google route; <4 -> private + owner alert."""
    _enforce_rate_limit(request)
    out = await review_engine.record_feedback(token, body.rating, body.private_feedback)
    if out is None:
        raise HTTPException(status_code=404, detail="Invalid or expired link")
    return out


@router.post("/request/{appointment_id}/{customer_id}", response_model=dict)
async def request_review(appointment_id: str, customer_id: str,
                         current_user: dict = Depends(get_current_user)):
    """AUTH: manually trigger a review request for an appointment/customer.
    IDs are path params so they don't leak into query/access logs."""
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
