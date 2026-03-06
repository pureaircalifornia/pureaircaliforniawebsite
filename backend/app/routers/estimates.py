"""
Estimates Router
Handles quote/estimate creation and management.
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from datetime import datetime, timedelta
from typing import List, Optional
import uuid

from ..models.estimate import (
    Estimate, EstimateCreate, EstimateUpdate, EstimateStatus, 
    LineItem, SERVICE_TEMPLATES
)
from ..models.user import UserRole
from ..core.dependencies import get_current_user, require_permission
from ..core.permissions import Permission
from ..database import get_estimates_collection, get_customers_collection
from ..services.email_outreach import send_email

router = APIRouter(prefix="/estimates", tags=["Estimates"])


def generate_estimate_number() -> str:
    """Generate unique estimate number."""
    timestamp = datetime.utcnow().strftime("%Y%m%d")
    unique_id = str(uuid.uuid4())[:6].upper()
    return f"EST-{timestamp}-{unique_id}"


def calculate_totals(line_items: List[dict], discount_amount: float = 0.0, tax_rate: float = 9.5) -> dict:
    """Calculate estimate totals."""
    subtotal = sum(
        item.get("quantity", 1) * item.get("unit_price", 0) * (1 - item.get("discount_percent", 0) / 100)
        for item in line_items
    )
    
    taxable_amount = sum(
        item.get("quantity", 1) * item.get("unit_price", 0) * (1 - item.get("discount_percent", 0) / 100)
        for item in line_items if item.get("is_taxable", True)
    )
    
    tax_amount = taxable_amount * (tax_rate / 100)
    total = subtotal - discount_amount + tax_amount
    
    return {
        "subtotal": round(subtotal, 2),
        "tax_amount": round(tax_amount, 2),
        "total": round(total, 2)
    }


@router.get("", response_model=List[Estimate])
async def list_estimates(
    customer_id: Optional[str] = None,
    status: Optional[EstimateStatus] = None,
    date_from: Optional[datetime] = None,
    date_to: Optional[datetime] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    current_user: dict = Depends(require_permission(Permission.ESTIMATE_READ))
):
    """List estimates with optional filters."""
    estimates = get_estimates_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    user_franchise_id = current_user.get("franchise_id")
    
    query = {}
    
    if user_role != UserRole.SUPER_ADMIN:
        query["franchise_id"] = user_franchise_id
    
    if customer_id:
        query["customer_id"] = customer_id
    
    if status:
        query["status"] = status.value
    
    if date_from:
        query["created_at"] = {"$gte": date_from}
    
    if date_to:
        if "created_at" in query:
            query["created_at"]["$lte"] = date_to
        else:
            query["created_at"] = {"$lte": date_to}
    
    skip = (page - 1) * page_size
    cursor = estimates.find(query).skip(skip).limit(page_size).sort("created_at", -1)
    
    result = []
    async for estimate in cursor:
        result.append(Estimate(**estimate))
    
    return result


@router.post("", response_model=Estimate, status_code=status.HTTP_201_CREATED)
async def create_estimate(
    estimate_data: EstimateCreate,
    current_user: dict = Depends(require_permission(Permission.ESTIMATE_CREATE))
):
    """Create a new estimate."""
    estimates = get_estimates_collection()
    customers = get_customers_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    
    if user_role != UserRole.SUPER_ADMIN:
        estimate_data.franchise_id = current_user.get("franchise_id")
    
    # Verify customer
    customer = await customers.find_one({"_id": estimate_data.customer_id})
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )
    
    # Get property address
    property_address = None
    for prop in customer.get("properties", []):
        if prop.get("id") == estimate_data.property_id:
            property_address = f"{prop.get('address_line1')}, {prop.get('city')}, {prop.get('state')} {prop.get('zip_code')}"
            break
    
    # Convert line items
    line_items = [item.dict() for item in estimate_data.line_items]
    
    # Calculate totals
    totals = calculate_totals(line_items, 0, estimate_data.tax_rate)
    
    # Set default valid_until (30 days from now)
    valid_until = estimate_data.valid_until or (datetime.utcnow() + timedelta(days=30))
    
    estimate_id = str(uuid.uuid4())
    estimate_dict = {
        "_id": estimate_id,
        "franchise_id": estimate_data.franchise_id,
        "estimate_number": generate_estimate_number(),
        "customer_id": estimate_data.customer_id,
        "property_id": estimate_data.property_id,
        "appointment_id": estimate_data.appointment_id,
        "line_items": line_items,
        "notes": estimate_data.notes,
        "terms": estimate_data.terms,
        "valid_until": valid_until,
        "status": EstimateStatus.DRAFT.value,
        "subtotal": totals["subtotal"],
        "discount_amount": 0.0,
        "tax_rate": estimate_data.tax_rate,
        "tax_amount": totals["tax_amount"],
        "total": totals["total"],
        "sent_at": None,
        "viewed_at": None,
        "accepted_at": None,
        "declined_at": None,
        "invoice_id": None,
        "converted_at": None,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "created_by": current_user["_id"],
        "customer_name": f"{customer.get('first_name')} {customer.get('last_name')}",
        "customer_email": customer.get("email"),
        "property_address": property_address,
    }
    
    await estimates.insert_one(estimate_dict)
    
    return Estimate(**estimate_dict)


@router.get("/templates")
async def get_service_templates(
    current_user: dict = Depends(require_permission(Permission.ESTIMATE_CREATE))
):
    """Get pre-defined service line item templates."""
    return SERVICE_TEMPLATES


@router.get("/{estimate_id}", response_model=Estimate)
async def get_estimate(
    estimate_id: str,
    current_user: dict = Depends(require_permission(Permission.ESTIMATE_READ))
):
    """Get estimate by ID."""
    estimates = get_estimates_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    
    estimate = await estimates.find_one({"_id": estimate_id})
    
    if not estimate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Estimate not found"
        )
    
    if user_role != UserRole.SUPER_ADMIN:
        if estimate.get("franchise_id") != current_user.get("franchise_id"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
    
    return Estimate(**estimate)


@router.put("/{estimate_id}", response_model=Estimate)
async def update_estimate(
    estimate_id: str,
    estimate_data: EstimateUpdate,
    current_user: dict = Depends(require_permission(Permission.ESTIMATE_UPDATE))
):
    """Update estimate."""
    estimates = get_estimates_collection()
    
    estimate = await estimates.find_one({"_id": estimate_id})
    
    if not estimate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Estimate not found"
        )
    
    # Cannot update accepted or converted estimates
    if estimate.get("status") in [EstimateStatus.ACCEPTED.value, EstimateStatus.CONVERTED.value]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot modify accepted or converted estimates"
        )
    
    update_data = estimate_data.dict(exclude_unset=True)
    
    # Recalculate totals if line items changed
    if "line_items" in update_data:
        line_items = [item.dict() if hasattr(item, 'dict') else item for item in update_data["line_items"]]
        update_data["line_items"] = line_items
        totals = calculate_totals(
            line_items,
            update_data.get("discount_amount", estimate.get("discount_amount", 0)),
            update_data.get("tax_rate", estimate.get("tax_rate", 9.5))
        )
        update_data.update(totals)
    
    if "status" in update_data:
        update_data["status"] = update_data["status"].value
    
    update_data["updated_at"] = datetime.utcnow()
    
    await estimates.update_one({"_id": estimate_id}, {"$set": update_data})
    
    updated_estimate = await estimates.find_one({"_id": estimate_id})
    return Estimate(**updated_estimate)


@router.post("/{estimate_id}/send", response_model=Estimate)
async def send_estimate(
    estimate_id: str,
    current_user: dict = Depends(require_permission(Permission.ESTIMATE_SEND))
):
    """Send estimate to customer via email."""
    estimates = get_estimates_collection()
    
    estimate = await estimates.find_one({"_id": estimate_id})
    
    if not estimate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Estimate not found"
        )
    
    customers = get_customers_collection()
    customer = await customers.find_one({"_id": estimate.get("customer_id")})
    
    if customer and customer.get("email"):
        body = f"""Dear {customer.get('first_name')},

Your estimate for Pure Air California services is ready for review.

Estimate Amount: ${estimate.get('total', 0):.2f}
Estimate Number: {estimate.get('estimate_number')}

Please reply to this email or call us at (213) 792-4145 if you have any questions or to approve this estimate.

Thank you,
Lou
Pure Air California
"""
        await send_email(
            to_email=customer.get("email"),
            to_name=f"{customer.get('first_name')} {customer.get('last_name')}",
            subject=f"Your Estimate from Pure Air California ({estimate.get('estimate_number')})",
            body=body
        )
    
    await estimates.update_one(
        {"_id": estimate_id},
        {
            "$set": {
                "status": EstimateStatus.SENT.value,
                "sent_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        }
    )
    
    updated_estimate = await estimates.find_one({"_id": estimate_id})
    return Estimate(**updated_estimate)


@router.post("/{estimate_id}/convert")
async def convert_to_invoice(
    estimate_id: str,
    current_user: dict = Depends(require_permission(Permission.INVOICE_CREATE))
):
    """Convert estimate to invoice."""
    from ..database import get_invoices_collection
    
    estimates = get_estimates_collection()
    invoices = get_invoices_collection()
    
    estimate = await estimates.find_one({"_id": estimate_id})
    
    if not estimate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Estimate not found"
        )
    
    if estimate.get("status") == EstimateStatus.CONVERTED.value:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Estimate already converted"
        )
    
    # Create invoice from estimate
    invoice_id = str(uuid.uuid4())
    timestamp = datetime.utcnow().strftime("%Y%m%d")
    unique_id = str(uuid.uuid4())[:6].upper()
    
    invoice_dict = {
        "_id": invoice_id,
        "franchise_id": estimate["franchise_id"],
        "invoice_number": f"INV-{timestamp}-{unique_id}",
        "estimate_id": estimate_id,
        "customer_id": estimate["customer_id"],
        "property_id": estimate["property_id"],
        "appointment_id": estimate.get("appointment_id"),
        "line_items": estimate["line_items"],
        "notes": estimate.get("notes"),
        "terms": estimate.get("terms"),
        "payment_terms": "due_on_receipt",
        "status": "draft",
        "subtotal": estimate["subtotal"],
        "discount_amount": estimate.get("discount_amount", 0),
        "tax_rate": estimate["tax_rate"],
        "tax_amount": estimate["tax_amount"],
        "total": estimate["total"],
        "amount_paid": 0.0,
        "amount_due": estimate["total"],
        "due_date": datetime.utcnow(),
        "sent_at": None,
        "viewed_at": None,
        "paid_at": None,
        "payment_ids": [],
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "created_by": current_user["_id"],
        "customer_name": estimate.get("customer_name"),
        "customer_email": estimate.get("customer_email"),
        "property_address": estimate.get("property_address"),
    }
    
    await invoices.insert_one(invoice_dict)
    
    # Update estimate status
    await estimates.update_one(
        {"_id": estimate_id},
        {
            "$set": {
                "status": EstimateStatus.CONVERTED.value,
                "invoice_id": invoice_id,
                "converted_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        }
    )
    
    return {"message": "Estimate converted to invoice", "invoice_id": invoice_id}
