import os
import logging
import httpx
from typing import Dict, Any, Optional
from datetime import datetime

logger = logging.getLogger(__name__)

class HousecallProService:
    """Service to interact with the Housecall Pro API"""
    
    def __init__(self):
        self.api_key = os.environ.get('HOUSECALL_PRO_API_KEY')
        self.base_url = "https://api.housecallpro.com/v1"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    
    async def create_customer(self, lead_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Creates a new customer in Housecall Pro from a lead
        
        Args:
            lead_data: Dictionary containing lead information (name, email, phone, etc.)
            
        Returns:
            Dict containing the created customer data from HCP, or None if failed
        """
        if not self.api_key:
            logger.warning("HOUSECALL_PRO_API_KEY not set, skipping sync")
            return None
            
        try:
            # Parse full name
            name_parts = lead_data.get('name', '').split(' ', 1)
            first_name = name_parts[0] if name_parts else 'Unknown'
            last_name = name_parts[1] if len(name_parts) > 1 else ''
            
            payload = {
                "first_name": first_name,
                "last_name": last_name,
                "email": lead_data.get('email'),
                "mobile_number": lead_data.get('phone'),
                "notifications_enabled": True
            }
            
            # Add company if it's commercial
            if lead_data.get('property_type') == 'commercial' and 'company_name' in lead_data:
                payload["company"] = lead_data.get('company_name')

            # Add address if provided
            if lead_data.get('address'):
                # Note: This is an approximation. A real implementation might need to 
                # parse the address string into street, city, state, zip.
                payload["addresses"] = [
                    {
                        "street": lead_data.get('address'),
                        "city": "Los Angeles", # Defaulting to service area
                        "state": "CA",
                        "country": "US"
                    }
                ]

            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/customers",
                    json=payload,
                    headers=self.headers,
                    timeout=10.0
                )
                
                if response.status_code in (200, 201):
                    logger.info("Successfully synced lead to Housecall Pro")
                    return response.json()
                else:
                    logger.error(f"Failed to sync to Housecall Pro: {response.text}")
                    return None
                    
        except Exception as e:
            logger.error(f"Error syncing with Housecall Pro API: {str(e)}")
            return None

# Singleton instance
housecall_pro_service = HousecallProService()
