from fastapi import APIRouter, Depends, HTTPException, status
from datetime import datetime
from typing import Optional

from ..models.settings import CompanySettings, CompanySettingsUpdate
from ..core.dependencies import get_current_user, require_permission
from ..core.permissions import Permission
from ..database import get_settings_collection

router = APIRouter(prefix="/settings", tags=["Settings"])

DEFAULT_SETTINGS_ID = "default_company_settings"

async def init_default_settings():
    settings_coll = get_settings_collection()
    existing = await settings_coll.find_one({"_id": DEFAULT_SETTINGS_ID})
    if not existing:
        default_data = {
            "_id": DEFAULT_SETTINGS_ID,
            "company_name": "Pure Air California",
            "contact": {
                "email": "lou@pureaircalifornia.com",
                "phone": "(800) 555-0199"
            },
            "updated_at": datetime.utcnow()
        }
        await settings_coll.insert_one(default_data)
        return default_data
    return existing

@router.get("", response_model=CompanySettings)
async def get_settings(
    current_user: dict = Depends(get_current_user)
):
    settings_coll = get_settings_collection()
    settings = await settings_coll.find_one({"_id": DEFAULT_SETTINGS_ID})
    
    if not settings:
        settings = await init_default_settings()
        
    return CompanySettings(**settings)


@router.put("", response_model=CompanySettings)
async def update_settings(
    updates: CompanySettingsUpdate,
    current_user: dict = Depends(require_permission(Permission.USER_CREATE)) # Basic admin check
):
    settings_coll = get_settings_collection()
    
    # Ensure default exists
    await init_default_settings()
    
    update_data = updates.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    await settings_coll.update_one(
        {"_id": DEFAULT_SETTINGS_ID},
        {"$set": update_data}
    )
    
    updated = await settings_coll.find_one({"_id": DEFAULT_SETTINGS_ID})
    return CompanySettings(**updated)
