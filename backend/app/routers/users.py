"""
Users Router
Handles employee and user management operations.
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from datetime import datetime
from typing import List, Optional
import uuid

from ..models.user import User, UserCreate, UserUpdate, UserRole
from ..core.security import get_password_hash
from ..core.dependencies import get_current_user, require_permission, require_admin
from ..core.permissions import Permission, can_access_franchise
from ..database import get_users_collection

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("", response_model=List[User])
async def list_users(
    role: Optional[UserRole] = None,
    franchise_id: Optional[str] = None,
    is_active: Optional[bool] = None,
    search: Optional[str] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    current_user: dict = Depends(require_permission(Permission.USER_READ))
):
    """
    List users with optional filters.
    
    - **role**: Filter by user role
    - **franchise_id**: Filter by franchise
    - **is_active**: Filter by active status
    - **search**: Search by name or email
    """
    users = get_users_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    user_franchise_id = current_user.get("franchise_id")
    
    # Build query
    query = {}
    
    # Role-based filtering
    if user_role != UserRole.SUPER_ADMIN:
        query["franchise_id"] = user_franchise_id
    elif franchise_id:
        query["franchise_id"] = franchise_id
    
    if role:
        query["role"] = role.value
    
    if is_active is not None:
        query["is_active"] = is_active
    
    if search:
        query["$or"] = [
            {"first_name": {"$regex": search, "$options": "i"}},
            {"last_name": {"$regex": search, "$options": "i"}},
            {"email": {"$regex": search, "$options": "i"}}
        ]
    
    # Execute query with pagination
    skip = (page - 1) * page_size
    cursor = users.find(query).skip(skip).limit(page_size).sort("created_at", -1)
    
    result = []
    async for user in cursor:
        result.append(User(**user))
    
    return result


@router.post("", response_model=User, status_code=status.HTTP_201_CREATED)
async def create_user(
    user_data: UserCreate,
    current_user: dict = Depends(require_permission(Permission.USER_CREATE))
):
    """
    Create a new user (admin only).
    
    Used for creating employees, technicians, and managers.
    """
    users = get_users_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    
    # Check franchise access
    if user_role != UserRole.SUPER_ADMIN:
        if user_data.franchise_id and user_data.franchise_id != current_user.get("franchise_id"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Cannot create users for other franchises"
            )
        user_data.franchise_id = current_user.get("franchise_id")
    
    # Check if email already exists
    existing_user = await users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Prevent creating higher-privilege users
    if user_role != UserRole.SUPER_ADMIN:
        if user_data.role in [UserRole.SUPER_ADMIN, UserRole.ADMIN]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Cannot create admin users"
            )
    
    # Create user document
    user_id = str(uuid.uuid4())
    user_dict = {
        "_id": user_id,
        "email": user_data.email,
        "password_hash": get_password_hash(user_data.password),
        "first_name": user_data.first_name,
        "last_name": user_data.last_name,
        "phone": user_data.phone,
        "role": user_data.role.value,
        "franchise_id": user_data.franchise_id,
        "is_active": True,
        "is_verified": False,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "last_login": None,
        "skills": [],
        "certifications": [],
    }
    
    await users.insert_one(user_dict)
    
    return User(**user_dict)


@router.get("/{user_id}", response_model=User)
async def get_user(
    user_id: str,
    current_user: dict = Depends(require_permission(Permission.USER_READ))
):
    """
    Get user by ID.
    """
    users = get_users_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    
    user = await users.find_one({"_id": user_id})
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Check franchise access
    if user_role != UserRole.SUPER_ADMIN:
        if user.get("franchise_id") != current_user.get("franchise_id"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
    
    return User(**user)


@router.put("/{user_id}", response_model=User)
async def update_user(
    user_id: str,
    user_data: UserUpdate,
    current_user: dict = Depends(require_permission(Permission.USER_UPDATE))
):
    """
    Update user information.
    """
    users = get_users_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    
    # Get existing user
    user = await users.find_one({"_id": user_id})
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Check franchise access
    if user_role != UserRole.SUPER_ADMIN:
        if user.get("franchise_id") != current_user.get("franchise_id"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
    
    # Build update document
    update_data = user_data.dict(exclude_unset=True)
    
    # Handle password update
    if "password" in update_data:
        update_data["password_hash"] = get_password_hash(update_data.pop("password"))
    
    # Handle role update - only super admin can change roles to admin
    if "role" in update_data:
        if user_role != UserRole.SUPER_ADMIN and update_data["role"] in [UserRole.SUPER_ADMIN.value, UserRole.ADMIN.value]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Cannot assign admin roles"
            )
        update_data["role"] = update_data["role"].value if isinstance(update_data["role"], UserRole) else update_data["role"]
    
    update_data["updated_at"] = datetime.utcnow()
    
    # Update user
    await users.update_one({"_id": user_id}, {"$set": update_data})
    
    # Get updated user
    updated_user = await users.find_one({"_id": user_id})
    
    return User(**updated_user)


@router.delete("/{user_id}")
async def delete_user(
    user_id: str,
    current_user: dict = Depends(require_permission(Permission.USER_DELETE))
):
    """
    Deactivate a user (soft delete).
    """
    users = get_users_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    
    # Get existing user
    user = await users.find_one({"_id": user_id})
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Cannot delete yourself
    if user_id == current_user["_id"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot deactivate your own account"
        )
    
    # Check franchise access
    if user_role != UserRole.SUPER_ADMIN:
        if user.get("franchise_id") != current_user.get("franchise_id"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
    
    # Soft delete
    await users.update_one(
        {"_id": user_id},
        {"$set": {"is_active": False, "updated_at": datetime.utcnow()}}
    )
    
    return {"message": "User deactivated successfully"}


@router.get("/technicians/available", response_model=List[User])
async def get_available_technicians(
    date: Optional[str] = None,
    current_user: dict = Depends(require_permission(Permission.APPOINTMENT_ASSIGN))
):
    """
    Get available technicians for scheduling.
    """
    users = get_users_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    
    query = {
        "role": UserRole.TECHNICIAN.value,
        "is_active": True
    }
    
    # Franchise filtering
    if user_role != UserRole.SUPER_ADMIN:
        query["franchise_id"] = current_user.get("franchise_id")
    
    cursor = users.find(query).sort("first_name", 1)
    
    result = []
    async for user in cursor:
        result.append(User(**user))
    
    return result
