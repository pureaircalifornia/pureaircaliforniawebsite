import logging
from fastapi import APIRouter, Request, HTTPException, Depends
from bson.objectid import ObjectId
from datetime import datetime
from ..database import get_prospects_collection

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/webhooks", tags=["webhooks"])

@router.post("/resend")
async def resend_webhook(request: Request):
    """
    Listen to Resend Webhooks for Email Tracking.
    We track types: email.opened, email.clicked
    """
    try:
        payload = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON payload")
    
    event_type = payload.get("type")
    data = payload.get("data", {})
    
    logger.info(f"Received Resend Webhook: {event_type}")
    
    # We primarily care about open and click events
    if event_type in ["email.opened", "email.clicked"]:
        # The trick: you can pass 'tags' or tracking 'headers' in Resend payload.
        # Alternatively, find the prospect by the 'to' email address.
        to_email = data.get("to", [])
        if isinstance(to_email, list) and to_email:
            target_email = to_email[0].lower()
            
            # Find the prospect that has this email in found_emails or contact_email
            collection = get_prospects_collection()
            
            prospect = await collection.find_one({
                "$or": [
                    {"contact_email": target_email},
                    {"found_emails": target_email}
                ]
            })
            
            if prospect:
                # Update their status to 'opened' if they are currently just 'email_sent'
                current_status = prospect.get("outreach_status", "not_contacted")
                
                # We don't want to downgrade them from 'responded' back to 'opened' if they re-open old email.
                if current_status == "email_sent":
                    await collection.update_one(
                        {"_id": prospect["_id"]},
                        {"$set": {
                            "outreach_status": "opened",
                            "last_opened_at": datetime.utcnow().isoformat()
                        }}
                    )
                    logger.info(f"Updated prospect {prospect['_id']} status to OPENED.")
    
    return {"status": "ok"}
