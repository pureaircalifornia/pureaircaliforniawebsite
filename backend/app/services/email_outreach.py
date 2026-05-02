"""
Email Outreach Service
Composes and sends outreach emails via SendGrid for lead generation.
"""
import logging
import httpx
from typing import Optional
from ..config import get_settings
from ..models.prospect import BusinessCategory

logger = logging.getLogger(__name__)

# Category-specific email templates

# Configure signature with Document Links if they exist
from app.config import get_settings
settings = get_settings()

def get_vendor_documents_html() -> str:
    links = []
    if settings.W9_DOCUMENT_LINK:
        links.append(f'<a href="{settings.W9_DOCUMENT_LINK}" style="color: #0ea5e9; text-decoration: none; font-weight: bold;">[Download Our W-9]</a>')
    if settings.INSURANCE_DOCUMENT_LINK:
        links.append(f'<a href="{settings.INSURANCE_DOCUMENT_LINK}" style="color: #0ea5e9; text-decoration: none; font-weight: bold;">[Download Our Certificate of Insurance]</a>')
    
    if not links:
        return ""
    
    return "<br><br><b>Vendor Setup Documents:</b><br>" + "<br>".join(links)

DEFAULT_TEMPLATE = {
    "id": "general_vendor_intro",
    "name": "General Vendor Introduction",
    "subject": "Quick question about {business_name}'s HVAC & Air Quality",
    "body": """Hi {contact_name},<br><br>I'm Lou, owner of Pure Air California.<br><br>I'm reaching out because we help properties like {business_name} reduce HVAC energy costs by up to 30% and ensure full safety compliance through professional air duct and dryer vent cleaning.<br><br>Many of our clients in Los Angeles didn't realize how much buildup was in their systems until they saw our before/after photos.<br><br>Are you open to a brief chat to see if we'd be a good fit for your vendor list?<br><br>Best,<br><br>Lou<br>Pure Air California<br>📞 (213) 792-4145<br>🌐 www.pureaircalifornia.com<br><br><span style="font-size:12px; color:#666;">P.S. To make things frictionless, I've included our vendor setup documents below if you'd like to keep us on file.</span>{vendor_docs}"""
}

EMAIL_TEMPLATES = {
    BusinessCategory.hoa: {
        "id": "hoa_vendor_intro",
        "name": "HOA Vendor Setup",
        "subject": "Dryer Vent & HVAC Safety for {business_name}",
        "body": """Hi {contact_name},<br><br>I'm Lou, owner of Pure Air California. We specialize in partnering with HOAs across Los Angeles to prevent dryer vent fires and improve resident air quality.<br><br>We handle the heavy lifting of coordinating with residents while offering aggressive group pricing that keeps your board happy.<br><br>Would you be open to keeping our information on file for your next HOA meeting or upcoming maintenance needs?<br><br>Best,<br><br>Lou<br>Pure Air California<br>📞 (213) 792-4145<br>🌐 www.pureaircalifornia.com<br><br><span style="font-size:12px; color:#666;">P.S. I've attached our W-9 and Insurance below so you have everything you need upfront.</span>{vendor_docs}"""
    },
    BusinessCategory.property_manager: {
        "id": "property_mgmt_vendor",
        "name": "Property Management Vendor Setup",
        "subject": "HVAC Cleaning Vendor for {business_name}",
        "body": """Hi {contact_name},<br><br>I'm Lou, owner of Pure Air California. We help property managers in Los Angeles reduce tenant complaints and lower HVAC overhead by keeping air ducts and dryer vents pristine.<br><br>We know managing multiple properties is stressful, so we make our vendor process completely frictionless—we handle the tenant scheduling and guarantee compliance.<br><br>Are you open to comparing our rates against your current provider?<br><br>Best,<br><br>Lou<br>Pure Air California<br>📞 (213) 792-4145<br>🌐 www.pureaircalifornia.com<br><br><span style="font-size:12px; color:#666;">P.S. I've included our W-9 and Insurance links below if you'd like to add us to your approved list.</span>{vendor_docs}"""
    },
     BusinessCategory.office_building: {
        "id": "cre_vendor",
        "name": "Commercial Real Estate Vendor Setup",
        "subject": "HVAC Efficiency at {business_name}",
        "body": """Hi {contact_name},<br><br>I'm Lou, owner of Pure Air California. We help commercial facilities like {business_name} extend the lifespan of massive HVAC infrastructures through NADCA-certified cleaning.<br><br>Clean systems drastically improve indoor air quality for your occupants while lowering energy consumption by up to 30%.<br><br>Would you be opposed to a quick introductory call to see if we'd be a valuable addition to your vendor roster?<br><br>Best,<br><br>Lou<br>Pure Air California<br>📞 (213) 792-4145<br>🌐 www.pureaircalifornia.com<br><br><span style="font-size:12px; color:#666;">P.S. I've linked our compliance documents (W-9 and Insurance) below for your records.</span>{vendor_docs}"""
    }
}

def get_email_template(category: BusinessCategory) -> dict:
    """Get the email template for a given business category."""
    template = EMAIL_TEMPLATES.get(category, DEFAULT_TEMPLATE)
    return {
        "id": template["id"],
        "name": template["name"],
        "category": category.value,
        "subject": template["subject"],
        "body": template["body"],
    }


def get_all_templates() -> list:
    """Get all available email templates."""
    templates = []
    for category, template in EMAIL_TEMPLATES.items():
        templates.append({
            "id": template["id"],
            "name": template["name"],
            "category": category.value,
            "subject": template["subject"],
            "body": template["body"],
        })
    # Add default template
    templates.append({
        "id": DEFAULT_TEMPLATE["id"],
        "name": DEFAULT_TEMPLATE["name"],
        "category": "other",
        "subject": DEFAULT_TEMPLATE["subject"],
        "body": DEFAULT_TEMPLATE["body"],
    })
    return templates


def compose_email(
    template_id: Optional[str],
    category: BusinessCategory,
    business_name: str,
    contact_name: str,
    location: str = "Los Angeles",
    custom_subject: Optional[str] = None,
    custom_body: Optional[str] = None,
) -> dict:
    """
    Compose an email using a template with variable substitution.
    Returns subject and body with variables filled in.
    """
    if custom_subject and custom_body:
        subject = custom_subject
        body = custom_body
    else:
        template = EMAIL_TEMPLATES.get(category, DEFAULT_TEMPLATE)
        subject = template["subject"]
        body = template["body"]
    
    # Variable substitution
    variables = {
        "{business_name}": business_name,
        "{contact_name}": contact_name or "Hiring Manager",
        "{location}": location,
        "{vendor_docs}": get_vendor_documents_html(),
    }
    
    for var, value in variables.items():
        subject = subject.replace(var, value)
        body = body.replace(var, value)
    
    return {
        "subject": subject,
        "body": body,
    }


async def send_email(
    to_email: str,
    to_name: str,
    subject: str,
    body: str,
) -> dict:
    """
    Send an email via Resend or SendGrid API based on what's configured.
    Prefers Resend if available.
    """
    settings = get_settings()
    
    if settings.RESEND_API_KEY:
        return await _send_email_resend(to_email, to_name, subject, body, settings)
    elif settings.SENDGRID_API_KEY:
        return await _send_email_sendgrid(to_email, to_name, subject, body, settings)
    else:
        logger.warning("No email API configured — running in dry-run mode")
        logger.info(f"[DRY RUN] Email to: {to_email} | Subject: {subject}")
        return {
            "success": True,
            "dry_run": True,
            "message": "Email logged (No API configured). Configure RESEND_API_KEY.",
        }


async def _send_email_resend(to_email: str, to_name: str, subject: str, body: str, settings) -> dict:
    import resend
    import re
    
    resend.api_key = settings.RESEND_API_KEY
    from_email = "lou@pureaircalifornia.com"
    
    # Format HTML body
    html_body = body.replace("\n", "<br>")
    
    # Create clean plain text version (prevents spam filters flagging HTML in plain text)
    text_body = body.replace("<br>", "\n").replace("<br/>", "\n")
    text_body = re.sub(r'<[^>]+>', '', text_body)
    
    # Anti-spam compliant opt-out message
    footer_html = "<br><br><span style='font-size: 11px; color: #999999;'>If you are not the correct contact or wish to opt-out, please reply with 'Unsubscribe'.</span>"
    footer_text = "\n\nIf you are not the correct contact or wish to opt-out, please reply with 'Unsubscribe'."
    
    try:
        r = resend.Emails.send({
            "from": f"Lou <{from_email}>",
            "to": [to_email],
            "subject": subject,
            "html": f"<div style='font-family: sans-serif; font-size: 14px;'>{html_body}{footer_html}</div>",
            "text": text_body + footer_text,
            "reply_to": "lou@pureaircalifornia.com",
            "tags": [{"name": "campaign", "value": "vendor_outreach"}],
            "headers": {
                "List-Unsubscribe": "<mailto:lou@pureaircalifornia.com?subject=Unsubscribe>"
            }
        })
        logger.info(f"Email sent successfully via Resend to {to_email} (ID: {r.get('id')})")
        return {"success": True, "dry_run": False, "message": "Email sent via Resend"}
    except Exception as e:
        logger.error(f"Error sending via Resend: {e}")
        return {"success": False, "dry_run": False, "message": f"Resend error: {str(e)}"}


async def _send_email_sendgrid(to_email: str, to_name: str, subject: str, body: str, settings) -> dict:
    import httpx
    import re
    
    api_key = settings.SENDGRID_API_KEY
    from_email = "lou@pureaircalifornia.com"
    
    # Format HTML body
    html_body = body.replace("\n", "<br>")
    
    # Create clean plain text version (prevents spam filters flagging HTML in plain text)
    text_body = body.replace("<br>", "\n").replace("<br/>", "\n")
    text_body = re.sub(r'<[^>]+>', '', text_body)
    
    # Anti-spam compliant opt-out message
    footer_html = "<br><br><span style='font-size: 11px; color: #999999;'>If you are not the correct contact or wish to opt-out, please reply with 'Unsubscribe'.</span>"
    footer_text = "\n\nIf you are not the correct contact or wish to opt-out, please reply with 'Unsubscribe'."
    
    payload = {
        "personalizations": [
            {
                "to": [{"email": to_email, "name": to_name}],
                "subject": subject,
            }
        ],
        "from": {"email": from_email, "name": "Lou"},
        "reply_to": {"email": "lou@pureaircalifornia.com", "name": "Lou"},
        "content": [
            {"type": "text/plain", "value": text_body + footer_text},
            {"type": "text/html", "value": f"<div style='font-family: sans-serif; font-size: 14px;'>{html_body}{footer_html}</div>"},
        ],
        "headers": {
            "List-Unsubscribe": "<mailto:lou@pureaircalifornia.com?subject=Unsubscribe>"
        },
        "tracking_settings": {
            "click_tracking": {
                "enable": True,
                "enable_text": False
            },
            "open_tracking": {
                "enable": True
            }
        }
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                "https://api.sendgrid.com/v3/mail/send",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                json=payload,
                timeout=15.0,
            )
            
            if response.status_code in (200, 201, 202):
                logger.info(f"Email sent successfully to {to_email}")
                return {"success": True, "dry_run": False, "message": "Email sent successfully"}
            else:
                error_msg = response.text
                logger.error(f"SendGrid error ({response.status_code}): {error_msg}")
                return {
                    "success": False,
                    "dry_run": False,
                    "message": f"SendGrid error: {response.status_code}",
                }
        except Exception as e:
            logger.error(f"Error sending email: {e}")
            return {"success": False, "dry_run": False, "message": str(e)}
