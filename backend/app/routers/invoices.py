"""
Invoices Router
Handles billing and invoice management.
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from datetime import datetime, timedelta
from typing import List, Optional
import uuid

from ..models.invoice import (
    Invoice, InvoiceCreate, InvoiceUpdate, InvoiceStatus,
    InvoiceSearch, InvoiceSummary, PaymentTerms
)
from ..models.estimate import LineItem
from ..models.user import UserRole
from ..core.dependencies import get_current_user, require_permission
from ..core.permissions import Permission
from ..database import get_invoices_collection, get_customers_collection
from ..services.email_outreach import send_email

router = APIRouter(prefix="/invoices", tags=["Invoices"])


def generate_invoice_number() -> str:
    """Generate unique invoice number."""
    timestamp = datetime.utcnow().strftime("%Y%m%d")
    unique_id = str(uuid.uuid4())[:6].upper()
    return f"INV-{timestamp}-{unique_id}"


def calculate_due_date(payment_terms: PaymentTerms, created_at: datetime) -> datetime:
    """Calculate due date based on payment terms."""
    days = {
        PaymentTerms.DUE_ON_RECEIPT: 0,
        PaymentTerms.NET_7: 7,
        PaymentTerms.NET_15: 15,
        PaymentTerms.NET_30: 30,
        PaymentTerms.NET_60: 60,
    }
    return created_at + timedelta(days=days.get(payment_terms, 0))


def calculate_totals(line_items: List[dict], discount_amount: float = 0.0, tax_rate: float = 9.5) -> dict:
    """Calculate invoice totals."""
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
        "total": round(total, 2),
        "amount_due": round(total, 2)
    }


@router.get("", response_model=List[Invoice])
async def list_invoices(
    customer_id: Optional[str] = None,
    status: Optional[InvoiceStatus] = None,
    is_overdue: Optional[bool] = None,
    date_from: Optional[datetime] = None,
    date_to: Optional[datetime] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    current_user: dict = Depends(require_permission(Permission.INVOICE_READ))
):
    """List invoices with optional filters."""
    invoices = get_invoices_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    user_franchise_id = current_user.get("franchise_id")
    
    query = {}
    
    if user_role != UserRole.SUPER_ADMIN:
        query["franchise_id"] = user_franchise_id
    
    if customer_id:
        query["customer_id"] = customer_id
    
    if status:
        query["status"] = status.value
    
    if is_overdue:
        query["due_date"] = {"$lt": datetime.utcnow()}
        query["status"] = {"$nin": [InvoiceStatus.PAID.value, InvoiceStatus.VOID.value]}
    
    if date_from:
        query["created_at"] = {"$gte": date_from}
    
    if date_to:
        if "created_at" in query:
            query["created_at"]["$lte"] = date_to
        else:
            query["created_at"] = {"$lte": date_to}
    
    skip = (page - 1) * page_size
    cursor = invoices.find(query).skip(skip).limit(page_size).sort("created_at", -1)
    
    result = []
    async for invoice in cursor:
        result.append(Invoice(**invoice))
    
    return result


@router.post("", response_model=Invoice, status_code=status.HTTP_201_CREATED)
async def create_invoice(
    invoice_data: InvoiceCreate,
    current_user: dict = Depends(require_permission(Permission.INVOICE_CREATE))
):
    """Create a new invoice."""
    invoices_coll = get_invoices_collection()
    customers = get_customers_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    
    if user_role != UserRole.SUPER_ADMIN:
        invoice_data.franchise_id = current_user.get("franchise_id")
    
    # Verify customer
    customer = await customers.find_one({"_id": invoice_data.customer_id})
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )
    
    # Get property address
    property_address = None
    for prop in customer.get("properties", []):
        if prop.get("id") == invoice_data.property_id:
            property_address = f"{prop.get('address_line1')}, {prop.get('city')}, {prop.get('state')} {prop.get('zip_code')}"
            break
    
    # Convert line items
    line_items = [item.dict() for item in invoice_data.line_items]
    
    # Calculate totals
    totals = calculate_totals(line_items, 0, invoice_data.tax_rate)
    
    now = datetime.utcnow()
    due_date = invoice_data.due_date or calculate_due_date(invoice_data.payment_terms, now)
    
    invoice_id = str(uuid.uuid4())
    invoice_dict = {
        "_id": invoice_id,
        "franchise_id": invoice_data.franchise_id,
        "invoice_number": generate_invoice_number(),
        "estimate_id": invoice_data.estimate_id,
        "appointment_id": invoice_data.appointment_id,
        "customer_id": invoice_data.customer_id,
        "property_id": invoice_data.property_id,
        "line_items": line_items,
        "notes": invoice_data.notes,
        "terms": invoice_data.terms,
        "payment_terms": invoice_data.payment_terms.value,
        "status": InvoiceStatus.DRAFT.value,
        "subtotal": totals["subtotal"],
        "discount_amount": 0.0,
        "tax_rate": invoice_data.tax_rate,
        "tax_amount": totals["tax_amount"],
        "total": totals["total"],
        "amount_paid": 0.0,
        "amount_due": totals["amount_due"],
        "due_date": due_date,
        "sent_at": None,
        "viewed_at": None,
        "paid_at": None,
        "payment_ids": [],
        "created_at": now,
        "updated_at": now,
        "created_by": current_user["_id"],
        "customer_name": f"{customer.get('first_name')} {customer.get('last_name')}",
        "customer_email": customer.get("email"),
        "property_address": property_address,
    }
    
    await invoices_coll.insert_one(invoice_dict)
    
    return Invoice(**invoice_dict)


@router.get("/summary")
async def get_invoice_summary(
    date_from: Optional[datetime] = None,
    date_to: Optional[datetime] = None,
    current_user: dict = Depends(require_permission(Permission.REPORT_VIEW))
):
    """Get invoice summary statistics."""
    invoices = get_invoices_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    user_franchise_id = current_user.get("franchise_id")
    
    query = {}
    
    if user_role != UserRole.SUPER_ADMIN:
        query["franchise_id"] = user_franchise_id
    
    if date_from:
        query["created_at"] = {"$gte": date_from}
    
    if date_to:
        if "created_at" in query:
            query["created_at"]["$lte"] = date_to
        else:
            query["created_at"] = {"$lte": date_to}
    
    all_invoices = await invoices.find(query).to_list(10000)
    
    total_invoices = len(all_invoices)
    total_amount = sum(inv.get("total", 0) for inv in all_invoices)
    total_paid = sum(inv.get("amount_paid", 0) for inv in all_invoices)
    total_outstanding = total_amount - total_paid
    
    now = datetime.utcnow()
    overdue_invoices = [
        inv for inv in all_invoices
        if inv.get("due_date") and inv["due_date"] < now
        and inv.get("status") not in [InvoiceStatus.PAID.value, InvoiceStatus.VOID.value]
    ]
    
    return InvoiceSummary(
        total_invoices=total_invoices,
        total_amount=round(total_amount, 2),
        total_paid=round(total_paid, 2),
        total_outstanding=round(total_outstanding, 2),
        overdue_count=len(overdue_invoices),
        overdue_amount=round(sum(inv.get("amount_due", 0) for inv in overdue_invoices), 2)
    )


@router.get("/{invoice_id}", response_model=Invoice)
async def get_invoice(
    invoice_id: str,
    current_user: dict = Depends(require_permission(Permission.INVOICE_READ))
):
    """Get invoice by ID."""
    invoices = get_invoices_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    
    invoice = await invoices.find_one({"_id": invoice_id})
    
    if not invoice:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invoice not found"
        )
    
    if user_role != UserRole.SUPER_ADMIN:
        if invoice.get("franchise_id") != current_user.get("franchise_id"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
    
    return Invoice(**invoice)


@router.put("/{invoice_id}", response_model=Invoice)
async def update_invoice(
    invoice_id: str,
    invoice_data: InvoiceUpdate,
    current_user: dict = Depends(require_permission(Permission.INVOICE_UPDATE))
):
    """Update invoice."""
    invoices = get_invoices_collection()
    
    invoice = await invoices.find_one({"_id": invoice_id})
    
    if not invoice:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invoice not found"
        )
    
    # Cannot update paid or void invoices
    if invoice.get("status") in [InvoiceStatus.PAID.value, InvoiceStatus.VOID.value]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot modify paid or void invoices"
        )
    
    update_data = invoice_data.dict(exclude_unset=True)
    
    # Recalculate totals if line items changed
    if "line_items" in update_data:
        line_items = [item.dict() if hasattr(item, 'dict') else item for item in update_data["line_items"]]
        update_data["line_items"] = line_items
        totals = calculate_totals(
            line_items,
            update_data.get("discount_amount", invoice.get("discount_amount", 0)),
            update_data.get("tax_rate", invoice.get("tax_rate", 9.5))
        )
        update_data.update(totals)
    
    if "status" in update_data:
        update_data["status"] = update_data["status"].value
    
    if "payment_terms" in update_data:
        update_data["payment_terms"] = update_data["payment_terms"].value
    
    update_data["updated_at"] = datetime.utcnow()
    
    await invoices.update_one({"_id": invoice_id}, {"$set": update_data})
    
    updated_invoice = await invoices.find_one({"_id": invoice_id})
    return Invoice(**updated_invoice)


@router.post("/{invoice_id}/send", response_model=Invoice)
async def send_invoice(
    invoice_id: str,
    current_user: dict = Depends(require_permission(Permission.INVOICE_SEND))
):
    """Send invoice to customer via email."""
    invoices = get_invoices_collection()
    
    invoice = await invoices.find_one({"_id": invoice_id})
    
    if not invoice:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invoice not found"
        )
    
    customers = get_customers_collection()
    customer = await customers.find_one({"_id": invoice.get("customer_id")})
    
    if customer and customer.get("email"):
        body = f"""Dear {customer.get('first_name')},

Your invoice from Pure Air California is ready.

Amount Due: ${invoice.get('amount_due', 0):.2f}
Invoice Number: {invoice.get('invoice_number')}
Due Date: {invoice.get('due_date').strftime('%B %d, %Y') if invoice.get('due_date') else 'Upon Receipt'}

We appreciate your business! Please reply to this email or call us at (213) 792-4145 with any questions.

Thank you,
Lou
Pure Air California
"""
        await send_email(
            to_email=customer.get("email"),
            to_name=f"{customer.get('first_name')} {customer.get('last_name')}",
            subject=f"Invoice from Pure Air California ({invoice.get('invoice_number')})",
            body=body
        )
    
    await invoices.update_one(
        {"_id": invoice_id},
        {
            "$set": {
                "status": InvoiceStatus.SENT.value,
                "sent_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        }
    )
    
    updated_invoice = await invoices.find_one({"_id": invoice_id})
    return Invoice(**updated_invoice)


@router.post("/{invoice_id}/void", response_model=Invoice)
async def void_invoice(
    invoice_id: str,
    reason: Optional[str] = None,
    current_user: dict = Depends(require_permission(Permission.INVOICE_DELETE))
):
    """Void an invoice."""
    invoices = get_invoices_collection()
    
    invoice = await invoices.find_one({"_id": invoice_id})
    
    if not invoice:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invoice not found"
        )
    
    if invoice.get("amount_paid", 0) > 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot void invoice with payments. Issue a refund instead."
        )
    
    await invoices.update_one(
        {"_id": invoice_id},
        {
            "$set": {
                "status": InvoiceStatus.VOID.value,
                "notes": f"{invoice.get('notes', '')}\n\nVOIDED: {reason or 'No reason provided'}",
                "updated_at": datetime.utcnow()
            }
        }
    )
    
    updated_invoice = await invoices.find_one({"_id": invoice_id})
    return Invoice(**updated_invoice)
