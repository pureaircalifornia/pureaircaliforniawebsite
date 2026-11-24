import os
import httpx
import logging
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)

HOUSECALL_PRO_API_URL = "https://api.housecallpro.com"

class HousecallProService:
    def __init__(self):
        self.api_token = os.environ.get("HOUSECALL_PRO_TOKEN")
        
    @property
    def headers(self) -> Dict[str, str]:
        if not self.api_token:
            return {}
        return {
            "Authorization": f"Token {self.api_token}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

    async def create_customer(self, lead_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Create a new customer in Housecall Pro from a website lead.
        """
        if not self.api_token:
            logger.warning("Housecall Pro token not found. Skipping Housecall Pro integration.")
            return None

        # Try to split name into first and last
        name_parts = lead_data.get("name", "").split(" ", 1)
        first_name = name_parts[0] if len(name_parts) > 0 else "Unknown"
        last_name = name_parts[1] if len(name_parts) > 1 else "Unknown"

        payload = {
            "first_name": first_name,
            "last_name": last_name,
            "email": lead_data.get("email"),
            "mobile_number": lead_data.get("phone"),
            "tags": ["website_lead", lead_data.get("source", "contact_form")],
            "notes": f"Service Requested: {lead_data.get('service', 'General')}\n"
                     f"Message: {lead_data.get('message', 'No message provided')}"
        }

        # Add address if provided
        if lead_data.get("address"):
            # A simple assumption for address string, ideally this would be parsed better
            payload["addresses"] = [
                {
                    "street": lead_data.get("address"),
                    "city": "Unknown",
                    "state": "CA",
                    "zip": ""
                }
            ]

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{HOUSECALL_PRO_API_URL}/customers",
                    json=payload,
                    headers=self.headers,
                    timeout=10.0
                )
                
                if response.status_code in (200, 201):
                    logger.info("Successfully created customer in Housecall Pro")
                    return response.json()
                else:
                    logger.error(f"Failed to create customer in HCP. Status: {response.status_code}, Response: {response.text}")
                    return None
                    
        except Exception as e:
            logger.error(f"Error communicating with Housecall Pro API: {str(e)}")
            return None

housecall_pro = HousecallProService()
