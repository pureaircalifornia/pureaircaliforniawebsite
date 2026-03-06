"""
Email Outreach Service
Composes and sends outreach emails via SendGrid for lead generation.
"""
import logging
from typing import Optional
from ..config import get_settings
from ..models.prospect import BusinessCategory

logger = logging.getLogger(__name__)

# Category-specific email templates
EMAIL_TEMPLATES = {
    BusinessCategory.hoa: {
        "id": "hoa_intro",
        "name": "HOA Introduction",
        "subject": "Professional Air Duct Cleaning for {business_name}",
        "body": """Dear {contact_name},

I hope this message finds you well. My name is Lou, and I am the owner of Pure Air California, a NADCA-certified air duct cleaning company serving the {location} area.

I'm reaching out because we specialize in providing comprehensive air duct and HVAC cleaning services for homeowner associations and residential communities like {business_name}. Clean air ducts are essential for:

• **Improved indoor air quality** for all residents
• **Reduced energy costs** — clean ducts improve HVAC efficiency by up to 30%
• **Extended HVAC system lifespan** — preventing costly replacements
• **Compliance with health and safety standards**

We currently serve several HOA communities in the {location} area and would love the opportunity to provide a complimentary assessment of your building's air duct system.

We offer competitive group pricing for HOA communities and can work around your residents' schedules to minimize disruption.

Would you have 15 minutes this week for a quick call to discuss how we can help improve the air quality for your community?

Best regards,
Lou
Pure Air California
📞 (213) 792-4145
🌐 www.pureaircalifornia.com
NADCA Certified | Licensed & Insured""",
    },
    BusinessCategory.building_management: {
        "id": "building_mgmt_intro",
        "name": "Building Management Introduction",
        "subject": "Air Duct Cleaning Services for Your Managed Properties",
        "body": """Dear {contact_name},

I hope this message finds you well. My name is Lou from Pure Air California, a NADCA-certified air duct cleaning company serving {location}.

As a building management company, you understand the importance of maintaining healthy, efficient building systems. I'd like to introduce our professional air duct cleaning services that can benefit your managed properties:

• **Improved tenant satisfaction** through better air quality
• **Lower HVAC maintenance costs** and extended equipment life
• **Compliance with indoor air quality regulations**
• **Professional documentation** for property records

We work with several property management firms in the area and offer flexible scheduling and competitive volume pricing across multiple properties.

I'd love to schedule a brief call to discuss your portfolio's air quality needs. Would you have 15 minutes available this week?

Best regards,
Lou
Pure Air California
📞 (213) 792-4145
🌐 www.pureaircalifornia.com
NADCA Certified | Licensed & Insured""",
    },
    BusinessCategory.hotel: {
        "id": "hotel_intro",
        "name": "Hotel Introduction",
        "subject": "Enhance Guest Experience at {business_name} with Clean Air",
        "body": """Dear {contact_name},

I'm Lou from Pure Air California, and I specialize in providing air duct cleaning services for hospitality properties in {location}.

Guest comfort and satisfaction are paramount in the hospitality industry. Clean air ducts directly impact:

• **Guest reviews and satisfaction** — clean air = better stays
• **Reduced allergen complaints** from guests with sensitivities
• **Energy efficiency** — lowering your utility costs by up to 30%
• **Fire safety compliance** — clean dryer vents reduce fire risk
• **Health department compliance** for HVAC systems

We work with several hotels in the {location} area, providing discreet, efficient service with minimal disruption to your operations. We can schedule cleaning during low-occupancy periods.

Would you be open to a complimentary assessment of your property's air duct system?

Best regards,
Lou
Pure Air California
📞 (213) 792-4145
🌐 www.pureaircalifornia.com
NADCA Certified | Licensed & Insured""",
    },
    BusinessCategory.senior_living: {
        "id": "senior_living_intro",
        "name": "Senior Living Introduction",
        "subject": "Clean Air Solutions for {business_name} Residents",
        "body": """Dear {contact_name},

I'm Lou from Pure Air California, a NADCA-certified air duct cleaning company. I'm reaching out because indoor air quality is especially critical for the health and wellbeing of seniors.

At {business_name}, your residents' health is your top priority. Professional air duct cleaning can:

• **Reduce airborne allergens and contaminants** that affect respiratory health
• **Minimize the spread of airborne illness** in communal living environments
• **Improve HVAC efficiency** — reducing energy costs
• **Meet healthcare facility air quality standards**
• **Provide peace of mind** to residents and their families

We have extensive experience working with senior living facilities and understand the sensitivity of serving this population. Our team is background-checked, uniformed, and trained to work quietly and efficiently.

Would you have time for a brief consultation? We offer complimentary air quality assessments.

Best regards,
Lou
Pure Air California
📞 (213) 792-4145
🌐 www.pureaircalifornia.com
NADCA Certified | Licensed & Insured""",
    },
    BusinessCategory.hospital: {
        "id": "hospital_intro",
        "name": "Hospital/Medical Introduction",
        "subject": "NADCA-Certified Air Duct Cleaning for {business_name}",
        "body": """Dear {contact_name},

I'm Lou from Pure Air California, a NADCA-certified air duct cleaning company serving healthcare facilities in {location}.

Healthcare environments require the highest standard of indoor air quality. Our services help {business_name} maintain:

• **Compliance with Joint Commission and OSHA air quality standards**
• **Reduction of hospital-acquired infections** through cleaner air circulation
• **Proper isolation room ventilation maintenance**
• **HVAC system efficiency** — reducing operational costs
• **Full documentation and certification** for compliance records

We are experienced in working within healthcare environments, following all infection control protocols and scheduling work to minimize disruption to patient care.

I'd welcome the opportunity to discuss your facility's air quality maintenance needs. May I schedule a brief call?

Best regards,
Lou
Pure Air California
📞 (213) 792-4145
🌐 www.pureaircalifornia.com
NADCA Certified | Licensed & Insured""",
    },
    BusinessCategory.restaurant: {
        "id": "restaurant_intro",
        "name": "Restaurant Introduction",
        "subject": "Kitchen Air Duct & Dryer Vent Cleaning for {business_name}",
        "body": """Dear {contact_name},

I'm Lou from Pure Air California. I specialize in air duct and dryer vent cleaning for restaurants and food service establishments in {location}.

As a restaurant operator, clean air systems are critical for:

• **Health department compliance** — clean ducts are an inspection requirement
• **Fire prevention** — grease buildup in ducts is a leading cause of restaurant fires
• **Better dining experience** — eliminate odors and improve air quality
• **Energy savings** — clean HVAC systems run up to 30% more efficiently
• **Dryer vent cleaning** — essential for laundry operations safety

We serve many restaurants in the {location} area and offer after-hours scheduling so we never disrupt your service.

Would you be interested in a complimentary assessment? I can stop by at a time that works for you.

Best regards,
Lou
Pure Air California
📞 (213) 792-4145
🌐 www.pureaircalifornia.com
NADCA Certified | Licensed & Insured""",
    },
    BusinessCategory.property_manager: {
        "id": "property_mgr_intro",
        "name": "Property Manager Introduction",
        "subject": "Air Duct Cleaning Partnership for Your Properties",
        "body": """Dear {contact_name},

I'm Lou from Pure Air California. We provide NADCA-certified air duct cleaning services for property management companies in {location}.

As a property manager, you know that tenant comfort and building maintenance are key to retention. Our services help you:

• **Reduce tenant complaints** about air quality, dust, and allergies
• **Lower HVAC repair costs** through preventive maintenance
• **Increase property value** with documented maintenance records
• **Offer a premium amenity** that sets your properties apart
• **Volume pricing** across your entire portfolio

We currently partner with several property management firms in {location} and would love to discuss how we can support your portfolio.

Can we schedule a 15-minute call to explore a partnership?

Best regards,
Lou
Pure Air California
📞 (213) 792-4145
🌐 www.pureaircalifornia.com
NADCA Certified | Licensed & Insured""",
    },
}

# Default template for categories without a specific one
DEFAULT_TEMPLATE = {
    "id": "general_intro",
    "name": "General Introduction",
    "subject": "Professional Air Duct Cleaning Services for {business_name}",
    "body": """Dear {contact_name},

I'm Lou from Pure Air California, a NADCA-certified air duct cleaning company serving {location}.

I'm reaching out because we specialize in providing professional air duct and HVAC cleaning services for commercial properties like {business_name}. Our services include:

• **Air Duct Cleaning** — Remove dust, allergens, and contaminants
• **Dryer Vent Cleaning** — Fire prevention and efficiency
• **HVAC System Cleaning** — Extend equipment life by years
• **Electrostatic Filter Installation** — Ongoing air quality improvement

Benefits for your facility:
✅ Improved indoor air quality for occupants
✅ Energy cost reduction of up to 30%
✅ Extended HVAC system lifespan
✅ Compliance with health and safety standards

We offer complimentary air quality assessments and competitive commercial pricing.

Would you have 15 minutes for a quick call this week?

Best regards,
Lou
Pure Air California
📞 (213) 792-4145
🌐 www.pureaircalifornia.com
NADCA Certified | Licensed & Insured""",
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
