import re
import os

file_path = r"c:\Users\IMAGINE360\Documents\PAC\Website\pureaircaliforniawebsite\backend\app\services\email_outreach.py"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# We need to replace EMAIL_TEMPLATES and DEFAULT_TEMPLATE, and update compose_email.
# We will use simple regex or string split.
import ast
# Let's generate the new code to inject.

new_code = '''
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
    BusinessCategory.commercial_real_estate: {
        "id": "cre_vendor",
        "name": "Commercial Real Estate Vendor Setup",
        "subject": "Vendor Setup: Commercial HVAC Cleaning for {business_name}",
        "body": """Dear {contact_name},<br><br>My name is Lou, owner of <b>Pure Air California</b>. We are Los Angeles' most trusted commercial air duct and HVAC system cleaning provider.<br><br>Large commercial footprints require pristine air quality. We care about the air your occupants breathe and the efficiency of your massive HVAC infrastructures. Professional NADCA-certified cleaning extends your equipment lifespan by years.<br><br>I would like to be added to {business_name}'s approved vendor system for all current and future property needs. My W-9 and comprehensive Insurance Certificate are linked below.<br><br>Please let me know the next steps for vendor onboarding.<br><br>Best regards,<br><br>Lou<br>Pure Air California<br>📞 (213) 792-4145<br>🌐 www.pureaircalifornia.com<br>NADCA Certified | Fully Licensed & Insured{vendor_docs}"""
    }
}

def get_email_template(category: BusinessCategory) -> dict:
'''

# Find the start of EMAIL_TEMPLATES
start_idx = content.find("EMAIL_TEMPLATES = {")
if start_idx == -1:
    print("Could not find EMAIL_TEMPLATES")
    exit(1)

# Find where get_email_template starts
end_idx = content.find("def get_email_template(")
if end_idx == -1:
    print("Could not find get_email_template")
    exit(1)

# we also need to change compose_email to inject {vendor_docs}
# Let's replace the block
new_content = content[:start_idx] + new_code + content[end_idx+len("def get_email_template("):]

# Now let's fix the variable substitution in compose_email
compose_start = new_content.find("def compose_email(")
compose_end = new_content.find("return {", compose_start)

compose_block = new_content[compose_start:compose_end]
new_compose_block = compose_block.replace(
    '"{location}": location,',
    '"{location}": location,\n        "{vendor_docs}": get_vendor_documents_html(),'
)
new_content = new_content.replace(compose_block, new_compose_block)

# Since we switched to HTML tags in templates, let's make sure it knows to format them properly.
# Actually Resend accepts HTML bodies! In send_email, it uses 'html': body. So HTML tags work natively.

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Successfully overhauled templates and injected dynamic vendor document links.")
