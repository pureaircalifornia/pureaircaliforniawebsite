"""
Customers Router
Handles CRM operations for customer management.
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from datetime import datetime
from typing import List, Optional
import uuid

from ..models.customer import (
    Customer, CustomerCreate, CustomerUpdate, CustomerSearch,
    Property, Note, LeadStatus, LeadSource
)
from ..models.user import UserRole
from ..core.dependencies import get_current_user, require_permission
from ..core.permissions import Permission
from ..database import get_customers_collection

router = APIRouter(prefix="/customers", tags=["Customers"])


@router.get("", response_model=List[Customer])
async def list_customers(
    query: Optional[str] = None,
    lead_status: Optional[LeadStatus] = None,
    lead_source: Optional[LeadSource] = None,
    city: Optional[str] = None,
    tags: Optional[str] = None,  # Comma-separated
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    current_user: dict = Depends(require_permission(Permission.CUSTOMER_READ))
):
    """
    List customers with optional filters.
    
    - **query**: Search by name, email, or phone
    - **lead_status**: Filter by lead status
    - **lead_source**: Filter by lead source
    - **city**: Filter by city
    - **tags**: Filter by tags (comma-separated)
    """
    customers = get_customers_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    user_franchise_id = current_user.get("franchise_id")
    
    # Build query
    filter_query = {"is_active": True}
    
    # Franchise filtering
    if user_role != UserRole.SUPER_ADMIN:
        filter_query["franchise_id"] = user_franchise_id
    
    if query:
        filter_query["$or"] = [
            {"first_name": {"$regex": query, "$options": "i"}},
            {"last_name": {"$regex": query, "$options": "i"}},
            {"email": {"$regex": query, "$options": "i"}},
            {"phone": {"$regex": query, "$options": "i"}}
        ]
    
    if lead_status:
        filter_query["lead_status"] = lead_status.value
    
    if lead_source:
        filter_query["lead_source"] = lead_source.value
    
    if city:
        filter_query["properties.city"] = {"$regex": city, "$options": "i"}
    
    if tags:
        tag_list = [t.strip() for t in tags.split(",")]
        filter_query["tags"] = {"$in": tag_list}
    
    # Execute query with pagination
    skip = (page - 1) * page_size
    cursor = customers.find(filter_query).skip(skip).limit(page_size).sort("created_at", -1)
    
    result = []
    async for customer in cursor:
        result.append(Customer(**customer))
    
    return result


@router.post("", response_model=Customer, status_code=status.HTTP_201_CREATED)
async def create_customer(
    customer_data: CustomerCreate,
    current_user: dict = Depends(require_permission(Permission.CUSTOMER_CREATE))
):
    """
    Create a new customer.
    """
    customers = get_customers_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    
    franchise_id = customer_data.franchise_id
    if user_role != UserRole.SUPER_ADMIN:
        franchise_id = current_user.get("franchise_id", "default")
    elif not franchise_id:
        franchise_id = "default"
        
    # Create customer document
    customer_id = str(uuid.uuid4())
    
    # Convert properties and notes to dicts
    properties = [p.dict() for p in customer_data.properties] if customer_data.properties else []
    notes = [n.dict() for n in customer_data.notes] if customer_data.notes else []
    
    customer_dict = {
        "_id": customer_id,
        "email": customer_data.email,
        "first_name": customer_data.first_name,
        "last_name": customer_data.last_name,
        "phone": customer_data.phone or "",
        "secondary_phone": customer_data.secondary_phone,
        "preferred_contact": customer_data.preferred_contact,
        "lead_source": customer_data.lead_source.value if hasattr(customer_data.lead_source, 'value') else customer_data.lead_source,
        "lead_status": customer_data.lead_status.value if hasattr(customer_data.lead_status, 'value') else customer_data.lead_status,
        "tags": customer_data.tags,
        "franchise_id": franchise_id,
        "properties": properties,
        "notes": notes,
        "total_spent": 0.0,
        "total_appointments": 0,
        "last_appointment_date": None,
        "next_appointment_date": None,
        "lifetime_value": 0.0,
        "is_active": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
    
    await customers.insert_one(customer_dict)
    
    return Customer(**customer_dict)


@router.get("/{customer_id}", response_model=Customer)
async def get_customer(
    customer_id: str,
    current_user: dict = Depends(require_permission(Permission.CUSTOMER_READ))
):
    """
    Get customer by ID.
    """
    customers = get_customers_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    
    customer = await customers.find_one({"_id": customer_id})
    
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )
    
    # Check franchise access
    if user_role != UserRole.SUPER_ADMIN:
        if customer.get("franchise_id") != current_user.get("franchise_id"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
    
    return Customer(**customer)


@router.put("/{customer_id}", response_model=Customer)
async def update_customer(
    customer_id: str,
    customer_data: CustomerUpdate,
    current_user: dict = Depends(require_permission(Permission.CUSTOMER_UPDATE))
):
    """
    Update customer information.
    """
    customers = get_customers_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    
    # Get existing customer
    customer = await customers.find_one({"_id": customer_id})
    
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )
    
    # Check franchise access
    if user_role != UserRole.SUPER_ADMIN:
        if customer.get("franchise_id") != current_user.get("franchise_id"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
    
    # Build update document
    update_data = customer_data.dict(exclude_unset=True)
    
    # Convert enums to values
    if "lead_status" in update_data and update_data["lead_status"]:
        update_data["lead_status"] = update_data["lead_status"].value
    if "lead_source" in update_data and update_data["lead_source"]:
        update_data["lead_source"] = update_data["lead_source"].value
    
    update_data["updated_at"] = datetime.utcnow()
    
    # Update customer
    await customers.update_one({"_id": customer_id}, {"$set": update_data})
    
    # Get updated customer
    updated_customer = await customers.find_one({"_id": customer_id})
    
    return Customer(**updated_customer)


@router.delete("/{customer_id}")
async def delete_customer(
    customer_id: str,
    current_user: dict = Depends(require_permission(Permission.CUSTOMER_DELETE))
):
    """
    Soft delete a customer.
    """
    customers = get_customers_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    
    customer = await customers.find_one({"_id": customer_id})
    
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )
    
    # Check franchise access
    if user_role != UserRole.SUPER_ADMIN:
        if customer.get("franchise_id") != current_user.get("franchise_id"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
    
    # Soft delete
    await customers.update_one(
        {"_id": customer_id},
        {"$set": {"is_active": False, "updated_at": datetime.utcnow()}}
    )
    
    return {"message": "Customer deleted successfully"}


# Property management
@router.post("/{customer_id}/properties", response_model=Customer)
async def add_property(
    customer_id: str,
    property_data: Property,
    current_user: dict = Depends(require_permission(Permission.CUSTOMER_UPDATE))
):
    """
    Add a property to a customer.
    """
    customers = get_customers_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    
    customer = await customers.find_one({"_id": customer_id})
    
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )
    
    # Check franchise access
    if user_role != UserRole.SUPER_ADMIN:
        if customer.get("franchise_id") != current_user.get("franchise_id"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
    
    # Add property
    await customers.update_one(
        {"_id": customer_id},
        {
            "$push": {"properties": property_data.dict()},
            "$set": {"updated_at": datetime.utcnow()}
        }
    )
    
    updated_customer = await customers.find_one({"_id": customer_id})
    return Customer(**updated_customer)


# Notes management
@router.post("/{customer_id}/notes", response_model=Customer)
async def add_note(
    customer_id: str,
    note_data: Note,
    current_user: dict = Depends(require_permission(Permission.CUSTOMER_UPDATE))
):
    """
    Add a note to a customer.
    """
    customers = get_customers_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    
    customer = await customers.find_one({"_id": customer_id})
    
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )
    
    # Check franchise access
    if user_role != UserRole.SUPER_ADMIN:
        if customer.get("franchise_id") != current_user.get("franchise_id"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
    
    # Set created_by if not set
    note_dict = note_data.dict()
    if not note_dict.get("created_by"):
        note_dict["created_by"] = current_user["_id"]
    
    # Add note
    await customers.update_one(
        {"_id": customer_id},
        {
            "$push": {"notes": note_dict},
            "$set": {"updated_at": datetime.utcnow()}
        }
    )
    
    updated_customer = await customers.find_one({"_id": customer_id})
    return Customer(**updated_customer)


@router.get("/{customer_id}/history")
async def get_customer_history(
    customer_id: str,
    current_user: dict = Depends(require_permission(Permission.CUSTOMER_READ))
):
    """
    Get customer's complete history including appointments, estimates, and invoices.
    """
    from ..database import get_appointments_collection, get_estimates_collection, get_invoices_collection
    
    customers = get_customers_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    
    customer = await customers.find_one({"_id": customer_id})
    
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )
    
    # Check franchise access
    if user_role != UserRole.SUPER_ADMIN:
        if customer.get("franchise_id") != current_user.get("franchise_id"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
    
    # Get related data
    appointments = await get_appointments_collection().find(
        {"customer_id": customer_id}
    ).sort("scheduled_start", -1).to_list(100)
    
    estimates = await get_estimates_collection().find(
        {"customer_id": customer_id}
    ).sort("created_at", -1).to_list(100)
    
    invoices = await get_invoices_collection().find(
        {"customer_id": customer_id}
    ).sort("created_at", -1).to_list(100)
    
    return {
        "customer": Customer(**customer),
        "appointments": appointments,
        "estimates": estimates,
        "invoices": invoices
    }
