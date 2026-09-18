import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from app.services.email_outreach import compose_email, extract_neighborhood
from app.models.prospect import BusinessCategory

def test_pipeline():
    print("==================================================")
    print("🧪 PIPELINE TEST: HYPER-PERSONALIZATION & SPINTAX")
    print("==================================================\n")
    
    test_address = "456 Wilshire Blvd, Beverly Hills, CA 90210, USA"
    neighborhood = extract_neighborhood(test_address)
    print(f"Original Raw Address: {test_address}")
    print(f"Extracted Neighborhood: {neighborhood}\n")

    print("Generating 2 variations of the same email to prove Spintax works...\n")
    
    for i in range(2):
        result = compose_email(
            template_id=None,
            category=BusinessCategory.property_manager,
            business_name="Wilshire Estates",
            contact_name="Sarah",
            location=test_address
        )
        print(f"--- VARIATION {i+1} ---")
        print(f"SUBJECT: {result['subject']}")
        body_text = result['body'].replace("<br>", "\n").replace("<b>", "").replace("</b>", "").replace("</span>", "").split("<span")[0]
        print(f"BODY:\n{body_text}\n")

if __name__ == "__main__":
    test_pipeline()
