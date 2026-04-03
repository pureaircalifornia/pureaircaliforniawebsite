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
    "subject": "Vendor Setup: Premium Air Duct & HVAC Cleaning for {business_name}",
    "body": """Dear {contact_name},<br><br>I'm Lou, the owner of <b>Pure Air California</b>. We are the premier NADCA-certified air duct, HVAC system, and dryer vent cleaning company serving Los Angeles.<br><br>We care deeply about the quality of the air you and your tenants breathe. We specialize in partnering with commercial facilities like {business_name} to guarantee compliance, eliminate fire hazards, and drastically improve indoor air quality.<br><br>I would love to be set up as an approved vendor for your property. To make the onboarding process completely seamless, I have attached our secure links to our W-9 and Certificate of Insurance below.<br><br>Please let me know what else is required to get Pure Air California added to your vendor list.<br><br>Best regards,<br><br>Lou<br>Pure Air California<br>📞 (213) 792-4145<br>🌐 www.pureaircalifornia.com<br>NADCA Certified | Fully Licensed & Insured{vendor_docs}"""
}

EMAIL_TEMPLATES = {
    BusinessCategory.hoa: {
        "id": "hoa_vendor_intro",
        "name": "HOA Vendor Setup",
        "subject": "Vendor Approval: Premium Air Duct Cleaning for {business_name}",
        "body": """Dear {contact_name},<br><br>I'm Lou, the owner of <b>Pure Air California</b>. We are the leading NADCA-certified air duct, HVAC system, and dryer vent cleaning provider for Homeowner Associations across Los Angeles.<br><br>We care deeply about the quality of the air your community breathes. We strictly specialize in HOA residential infrastructures, ensuring maximum dryer vent safety (fire prevention) and drastic improvements in indoor air quality for your residents.<br><br>I am reaching out to formally request to be added as your approved preferred vendor for {business_name}. We offer aggressive group pricing, and to make it easy for you, our W-9 and Insurance Certificate are linked securely below.<br><br>Please let me know if there is a vendor application I can fill out.<br><br>Best regards,<br><br>Lou<br>Pure Air California<br>📞 (213) 792-4145<br>🌐 www.pureaircalifornia.com<br>NADCA Certified | Fully Licensed & Insured{vendor_docs}"""
    },
    BusinessCategory.property_manager: {
        "id": "property_mgmt_vendor",
        "name": "Property Management Vendor Setup",
        "subject": "Vendor Setup: HVAC & Air Duct Cleaning for {business_name}",
        "body": """Dear {contact_name},<br><br>My name is Lou, owner of <b>Pure Air California</b>. As the premier air duct, HVAC system, and dryer vent cleaning company in Los Angeles, we exclusively service high-volume property management portfolios.<br><br>We know that managing tenant expectations while ensuring building safety is your priority. We care incredibly about the air your tenants breathe. Clean HVAC systems reduce your overhead by 30% while guaranteeing health code compliance.<br><br>I want to make onboarding us as an approved vendor frictionless for {business_name}. You will find our secure W-9 and full Certificate of Insurance linked directly below.<br><br>What is the next step to get Pure Air California on your approved vendor list?<br><br>Best regards,<br><br>Lou<br>Pure Air California<br>📞 (213) 792-4145<br>🌐 www.pureaircalifornia.com<br>NADCA Certified | Fully Licensed & Insured{vendor_docs}"""
    },
     BusinessCategory.office_building: {
        "id": "cre_vendor",
        "name": "Commercial Real Estate Vendor Setup",
        "subject": "Vendor Setup: Commercial HVAC Cleaning for {business_name}",
        "body": """Dear {contact_name},<br><br>My name is Lou, owner of <b>Pure Air California</b>. We are Los Angeles' most trusted commercial air duct and HVAC system cleaning provider.<br><br>Large commercial footprints require pristine air quality. We care about the air your occupants breathe and the efficiency of your massive HVAC infrastructures. Professional NADCA-certified cleaning extends your equipment lifespan by years.<br><br>I would like to be added to {business_name}'s approved vendor system for all current and future property needs. My W-9 and comprehensive Insurance Certificate are linked below.<br><br>Please let me know the next steps for vendor onboarding.<br><br>Best regards,<br><br>Lou<br>Pure Air California<br>📞 (213) 792-4145<br>🌐 www.pureaircalifornia.com<br>NADCA Certified | Fully Licensed & Insured{vendor_docs}"""
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
    
    resend.api_key = settings.RESEND_API_KEY
    from_email = settings.FROM_EMAIL
    
    # Format HTML body
    html_body = body.replace("\n", "<br>")
    
    try:
        r = resend.Emails.send({
            "from": f"Lou <{from_email}>",
            "to": [to_email],
            "subject": subject,
            "html": f"<div style='font-family: sans-serif; font-size: 14px;'>{html_body}</div>",
            "text": body,
            "reply_to": "lou@pureaircalifornia.com"
        })
        logger.info(f"Email sent successfully via Resend to {to_email} (ID: {r.get('id')})")
        return {"success": True, "dry_run": False, "message": "Email sent via Resend"}
    except Exception as e:
        logger.error(f"Error sending via Resend: {e}")
        return {"success": False, "dry_run": False, "message": f"Resend error: {str(e)}"}


async def _send_email_sendgrid(to_email: str, to_name: str, subject: str, body: str, settings) -> dict:
    import httpx
    
    api_key = settings.SENDGRID_API_KEY
    from_email = settings.FROM_EMAIL
    
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
            {"type": "text/plain", "value": body},
        ],
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
