"""
Payments Router
Handles payment processing with Stripe integration.
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query, Request
from datetime import datetime
from typing import List, Optional
import uuid

from ..models.payment import (
    Payment, PaymentCreate, PaymentRefund, PaymentStatus,
    PaymentMethod, PaymentSearch, PaymentSummary, StripePaymentIntent,
    StripeCheckoutSession
)
from ..models.invoice import InvoiceStatus
from ..models.user import UserRole
from ..core.dependencies import get_current_user, require_permission
from ..core.permissions import Permission
from ..database import get_payments_collection, get_invoices_collection, get_customers_collection
from ..config import get_settings

router = APIRouter(prefix="/payments", tags=["Payments"])


@router.get("", response_model=List[Payment])
async def list_payments(
    customer_id: Optional[str] = None,
    invoice_id: Optional[str] = None,
    status: Optional[PaymentStatus] = None,
    date_from: Optional[datetime] = None,
    date_to: Optional[datetime] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    current_user: dict = Depends(require_permission(Permission.PAYMENT_READ))
):
    """List payments with optional filters."""
    payments = get_payments_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    user_franchise_id = current_user.get("franchise_id")
    
    query = {}
    
    if user_role != UserRole.SUPER_ADMIN:
        query["franchise_id"] = user_franchise_id
    
    if customer_id:
        query["customer_id"] = customer_id
    
    if invoice_id:
        query["invoice_id"] = invoice_id
    
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
    cursor = payments.find(query).skip(skip).limit(page_size).sort("created_at", -1)
    
    result = []
    async for payment in cursor:
        result.append(Payment(**payment))
    
    return result


@router.post("/intent", response_model=StripePaymentIntent)
async def create_payment_intent(
    invoice_id: str,
    current_user: dict = Depends(require_permission(Permission.PAYMENT_PROCESS))
):
    """Create a Stripe payment intent for an invoice."""
    settings = get_settings()
    invoices = get_invoices_collection()
    
    invoice = await invoices.find_one({"_id": invoice_id})
    
    if not invoice:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invoice not found"
        )
    
    if invoice.get("status") in [InvoiceStatus.PAID.value, InvoiceStatus.VOID.value]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invoice is already paid or voided"
        )
    
    amount_due = invoice.get("amount_due", 0)
    
    if amount_due <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invoice has no amount due"
        )
    
    # Convert to cents for Stripe
    amount_cents = int(amount_due * 100)
    
    # Check if Stripe is configured
    if not settings.STRIPE_SECRET_KEY:
        # Return mock data for development
        return StripePaymentIntent(
            client_secret="mock_client_secret_for_development",
            payment_intent_id=f"pi_mock_{uuid.uuid4().hex[:24]}",
            amount=amount_cents,
            currency="usd",
            status="requires_payment_method"
        )
    
    # Real Stripe integration
    try:
        import stripe
        stripe.api_key = settings.STRIPE_SECRET_KEY
        
        payment_intent = stripe.PaymentIntent.create(
            amount=amount_cents,
            currency="usd",
            metadata={
                "invoice_id": invoice_id,
                "customer_id": invoice.get("customer_id"),
                "franchise_id": invoice.get("franchise_id")
            }
        )
        
        return StripePaymentIntent(
            client_secret=payment_intent.client_secret,
            payment_intent_id=payment_intent.id,
            amount=payment_intent.amount,
            currency=payment_intent.currency,
            status=payment_intent.status
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create payment intent: {str(e)}"
        )


@router.post("/checkout-session", response_model=StripeCheckoutSession)
async def create_checkout_session(
    invoice_id: str,
    current_user: dict = Depends(require_permission(Permission.PAYMENT_PROCESS))
):
    """Create a Stripe Checkout Session (Shareable Payment Link) for an invoice."""
    settings = get_settings()
    invoices = get_invoices_collection()
    
    invoice = await invoices.find_one({"_id": invoice_id})
    if not invoice:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invoice not found")
    
    if invoice.get("status") in [InvoiceStatus.PAID.value, InvoiceStatus.VOID.value]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invoice is already paid or voided")
    
    amount_due = invoice.get("amount_due", 0)
    if amount_due <= 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invoice has no amount due")
    
    amount_cents = int(amount_due * 100)
    
    if not settings.STRIPE_SECRET_KEY:
        # Mock for development
        return StripeCheckoutSession(
            url=f"https://checkout.stripe.mock/pay/{invoice_id}",
            session_id=f"cs_mock_{uuid.uuid4().hex[:24]}"
        )
    
    try:
        import stripe
        stripe.api_key = settings.STRIPE_SECRET_KEY
        
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': f"Invoice {invoice.get('invoice_number', invoice_id)}",
                    },
                    'unit_amount': amount_cents,
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=f"{settings.FRONTEND_URL}/admin/invoices/{invoice_id}?payment=success",
            cancel_url=f"{settings.FRONTEND_URL}/admin/invoices/{invoice_id}?payment=cancelled",
            metadata={
                "invoice_id": invoice_id,
                "customer_id": invoice.get("customer_id"),
                "franchise_id": invoice.get("franchise_id")
            }
        )
        
        return StripeCheckoutSession(
            url=session.url,
            session_id=session.id
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create checkout session: {str(e)}"
        )


@router.post("", response_model=Payment, status_code=status.HTTP_201_CREATED)
async def record_payment(
    payment_data: PaymentCreate,
    current_user: dict = Depends(require_permission(Permission.PAYMENT_PROCESS))
):
    """Record a payment (for manual payments like cash/check)."""
    payments = get_payments_collection()
    invoices = get_invoices_collection()
    customers = get_customers_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    
    invoice = await invoices.find_one({"_id": payment_data.invoice_id})
    
    if not invoice:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invoice not found"
        )
    
    if invoice.get("status") in [InvoiceStatus.PAID.value, InvoiceStatus.VOID.value]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invoice is already paid or voided"
        )
    
    payment_id = str(uuid.uuid4())
    receipt_number = f"RCP-{datetime.utcnow().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"
    
    payment_dict = {
        "_id": payment_id,
        "franchise_id": invoice.get("franchise_id"),
        "invoice_id": payment_data.invoice_id,
        "customer_id": invoice.get("customer_id"),
        "amount": payment_data.amount,
        "currency": "usd",
        "payment_method": payment_data.payment_method.value,
        "card_brand": None,
        "card_last_four": None,
        "status": PaymentStatus.COMPLETED.value,
        "stripe_payment_id": None,
        "stripe_payment_intent_id": None,
        "stripe_charge_id": None,
        "stripe_refund_id": None,
        "refund_amount": 0.0,
        "refund_reason": None,
        "refunded_at": None,
        "receipt_url": None,
        "receipt_number": receipt_number,
        "notes": payment_data.notes,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "processed_by": current_user["_id"],
    }
    
    await payments.insert_one(payment_dict)
    
    # Update invoice
    new_amount_paid = invoice.get("amount_paid", 0) + payment_data.amount
    new_amount_due = invoice.get("total", 0) - new_amount_paid
    
    new_status = invoice.get("status")
    if new_amount_due <= 0:
        new_status = InvoiceStatus.PAID.value
    elif new_amount_paid > 0:
        new_status = InvoiceStatus.PARTIAL.value
    
    await invoices.update_one(
        {"_id": payment_data.invoice_id},
        {
            "$set": {
                "amount_paid": new_amount_paid,
                "amount_due": max(0, new_amount_due),
                "status": new_status,
                "paid_at": datetime.utcnow() if new_status == InvoiceStatus.PAID.value else None,
                "updated_at": datetime.utcnow()
            },
            "$push": {"payment_ids": payment_id}
        }
    )
    
    # Update customer total spent
    await customers.update_one(
        {"_id": invoice.get("customer_id")},
        {
            "$inc": {"total_spent": payment_data.amount, "lifetime_value": payment_data.amount}
        }
    )
    
    return Payment(**payment_dict)


@router.post("/webhook")
async def stripe_webhook(request: Request):
    """Handle Stripe webhook events."""
    settings = get_settings()
    
    if not settings.STRIPE_WEBHOOK_SECRET:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Stripe webhook not configured"
        )
    
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")
    
    try:
        import stripe
        stripe.api_key = settings.STRIPE_SECRET_KEY
        
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
        
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")
    
    # Handle events
    if event["type"] == "payment_intent.succeeded":
        payment_intent = event["data"]["object"]
        await handle_successful_payment(payment_intent)
        
    elif event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        # checkout session succeeded
        # Check if we already handled the payment intent
        if session.get("payment_intent"):
            import stripe
            try:
                pi = stripe.PaymentIntent.retrieve(session["payment_intent"])
                # We can handle it here or let the payment_intent.succeeded event handle it.
                # Usually better to let payment_intent.succeeded handle it if both are sent.
            except Exception:
                pass
    
    elif event["type"] == "payment_intent.payment_failed":
        payment_intent = event["data"]["object"]
        await handle_failed_payment(payment_intent)
    
    return {"status": "success"}


async def handle_successful_payment(payment_intent: dict):
    """Process successful Stripe payment."""
    payments = get_payments_collection()
    invoices = get_invoices_collection()
    customers = get_customers_collection()
    
    invoice_id = payment_intent.get("metadata", {}).get("invoice_id")
    
    if not invoice_id:
        return
    
    invoice = await invoices.find_one({"_id": invoice_id})
    
    if not invoice:
        return
    
    amount = payment_intent.get("amount", 0) / 100  # Convert from cents
    
    payment_id = str(uuid.uuid4())
    receipt_number = f"RCP-{datetime.utcnow().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"
    
    # Get card details if available
    card_brand = None
    card_last_four = None
    if payment_intent.get("charges", {}).get("data"):
        charge = payment_intent["charges"]["data"][0]
        if charge.get("payment_method_details", {}).get("card"):
            card = charge["payment_method_details"]["card"]
            card_brand = card.get("brand")
            card_last_four = card.get("last4")
    
    payment_dict = {
        "_id": payment_id,
        "franchise_id": invoice.get("franchise_id"),
        "invoice_id": invoice_id,
        "customer_id": invoice.get("customer_id"),
        "amount": amount,
        "currency": payment_intent.get("currency", "usd"),
        "payment_method": PaymentMethod.CREDIT_CARD.value,
        "card_brand": card_brand,
        "card_last_four": card_last_four,
        "status": PaymentStatus.COMPLETED.value,
        "stripe_payment_id": payment_intent.get("id"),
        "stripe_payment_intent_id": payment_intent.get("id"),
        "stripe_charge_id": payment_intent.get("latest_charge"),
        "receipt_number": receipt_number,
        "receipt_url": payment_intent.get("charges", {}).get("data", [{}])[0].get("receipt_url"),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
    
    await payments.insert_one(payment_dict)
    
    # Update invoice
    new_amount_paid = invoice.get("amount_paid", 0) + amount
    new_amount_due = invoice.get("total", 0) - new_amount_paid
    
    new_status = InvoiceStatus.PAID.value if new_amount_due <= 0 else InvoiceStatus.PARTIAL.value
    
    await invoices.update_one(
        {"_id": invoice_id},
        {
            "$set": {
                "amount_paid": new_amount_paid,
                "amount_due": max(0, new_amount_due),
                "status": new_status,
                "paid_at": datetime.utcnow() if new_status == InvoiceStatus.PAID.value else None,
                "updated_at": datetime.utcnow()
            },
            "$push": {"payment_ids": payment_id}
        }
    )
    
    # Update customer
    await customers.update_one(
        {"_id": invoice.get("customer_id")},
        {"$inc": {"total_spent": amount, "lifetime_value": amount}}
    )


async def handle_failed_payment(payment_intent: dict):
    """Log failed payment attempt and notify admin."""
    from ..config import get_settings
    from ..services.email_outreach import send_email
    
    settings = get_settings()
    admin_email = settings.FROM_EMAIL
    
    amount = payment_intent.get("amount", 0) / 100
    customer_id = payment_intent.get("metadata", {}).get("customer_id", "Unknown")
    invoice_id = payment_intent.get("metadata", {}).get("invoice_id", "Unknown")
    
    body = f"""A Stripe payment intent has failed.
    
Amount: ${amount:.2f}
Customer ID: {customer_id}
Invoice ID: {invoice_id}
Payment Intent ID: {payment_intent.get("id")}
Reason: {payment_intent.get("last_payment_error", {}).get("message", "Unknown")}

Please review this in the Stripe Dashboard.
"""
    await send_email(
        to_email=admin_email,
        to_name="Pure Air Admin",
        subject=f"Failed Payment Alert (${amount:.2f})",
        body=body
    )


@router.post("/{payment_id}/refund", response_model=Payment)
async def refund_payment(
    payment_id: str,
    refund_data: PaymentRefund,
    current_user: dict = Depends(require_permission(Permission.PAYMENT_REFUND))
):
    """Process a refund."""
    settings = get_settings()
    payments = get_payments_collection()
    invoices = get_invoices_collection()
    customers = get_customers_collection()
    
    payment = await payments.find_one({"_id": payment_id})
    
    if not payment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found"
        )
    
    if payment.get("status") == PaymentStatus.REFUNDED.value:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Payment already refunded"
        )
    
    refund_amount = refund_data.amount or payment.get("amount", 0)
    
    if refund_amount > payment.get("amount", 0) - payment.get("refund_amount", 0):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Refund amount exceeds available amount"
        )
    
    # Process Stripe refund if applicable
    stripe_refund_id = None
    if payment.get("stripe_charge_id") and settings.STRIPE_SECRET_KEY:
        try:
            import stripe
            stripe.api_key = settings.STRIPE_SECRET_KEY
            
            refund = stripe.Refund.create(
                charge=payment["stripe_charge_id"],
                amount=int(refund_amount * 100),
                reason="requested_by_customer"
            )
            stripe_refund_id = refund.id
            
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to process Stripe refund: {str(e)}"
            )
    
    # Update payment
    new_refund_total = payment.get("refund_amount", 0) + refund_amount
    new_status = PaymentStatus.REFUNDED.value if new_refund_total >= payment.get("amount", 0) else PaymentStatus.PARTIAL_REFUND.value
    
    await payments.update_one(
        {"_id": payment_id},
        {
            "$set": {
                "refund_amount": new_refund_total,
                "refund_reason": refund_data.reason,
                "refunded_at": datetime.utcnow(),
                "stripe_refund_id": stripe_refund_id,
                "status": new_status,
                "updated_at": datetime.utcnow()
            }
        }
    )
    
    # Update invoice
    invoice = await invoices.find_one({"_id": payment.get("invoice_id")})
    if invoice:
        new_amount_paid = invoice.get("amount_paid", 0) - refund_amount
        new_amount_due = invoice.get("total", 0) - new_amount_paid
        
        new_invoice_status = InvoiceStatus.REFUNDED.value if new_amount_paid <= 0 else InvoiceStatus.PARTIAL.value
        
        await invoices.update_one(
            {"_id": payment.get("invoice_id")},
            {
                "$set": {
                    "amount_paid": max(0, new_amount_paid),
                    "amount_due": new_amount_due,
                    "status": new_invoice_status,
                    "updated_at": datetime.utcnow()
                }
            }
        )
    
    # Update customer
    await customers.update_one(
        {"_id": payment.get("customer_id")},
        {"$inc": {"total_spent": -refund_amount, "lifetime_value": -refund_amount}}
    )
    
    updated_payment = await payments.find_one({"_id": payment_id})
    return Payment(**updated_payment)


@router.get("/summary")
async def get_payment_summary(
    date_from: Optional[datetime] = None,
    date_to: Optional[datetime] = None,
    current_user: dict = Depends(require_permission(Permission.REPORT_VIEW))
):
    """Get payment summary statistics."""
    payments = get_payments_collection()
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
    
    all_payments = await payments.find(query).to_list(10000)
    
    total_payments = len(all_payments)
    total_amount = sum(p.get("amount", 0) for p in all_payments if p.get("status") == PaymentStatus.COMPLETED.value)
    total_refunds = sum(p.get("refund_amount", 0) for p in all_payments)
    
    by_method = {}
    by_status = {}
    
    for payment in all_payments:
        method = payment.get("payment_method", "unknown")
        status = payment.get("status", "unknown")
        
        by_method[method] = by_method.get(method, 0) + payment.get("amount", 0)
        by_status[status] = by_status.get(status, 0) + 1
    
    return PaymentSummary(
        total_payments=total_payments,
        total_amount=round(total_amount, 2),
        total_refunds=round(total_refunds, 2),
        net_amount=round(total_amount - total_refunds, 2),
        by_method=by_method,
        by_status=by_status
    )
