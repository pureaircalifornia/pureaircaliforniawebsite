"""
FastAPI Dependencies
Common dependencies used across routes for authentication and authorization.
"""
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional, List

from .security import decode_token, TokenData
from .permissions import UserRole, Permission, has_permission, can_access_franchise
from ..database import get_users_collection

# HTTP Bearer token security scheme
security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> dict:
    """
    Dependency to get the current authenticated user.
    Validates the JWT token and returns the user document.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    token = credentials.credentials
    token_data = decode_token(token)
    
    if token_data is None:
        raise credentials_exception
    
    # Get user from database
    users = get_users_collection()
    user = await users.find_one({"_id": token_data.user_id})
    
    if user is None:
        raise credentials_exception
    
    if not user.get("is_active", False):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is deactivated"
        )
    
    return user


async def get_current_active_user(
    current_user: dict = Depends(get_current_user)
) -> dict:
    """Dependency to get current active user (alias for clarity)."""
    return current_user


def require_role(allowed_roles: List[UserRole]):
    """
    Dependency factory to require specific roles.
    
    Usage:
        @router.get("/admin-only")
        async def admin_route(user: dict = Depends(require_role([UserRole.ADMIN]))):
            pass
    """
    async def role_checker(
        current_user: dict = Depends(get_current_user)
    ) -> dict:
        user_role = UserRole(current_user.get("role", "customer"))
        
        if user_role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Required roles: {[r.value for r in allowed_roles]}"
            )
        
        return current_user
    
    return role_checker


def require_permission(permission: Permission):
    """
    Dependency factory to require a specific permission.
    
    Usage:
        @router.post("/customers")
        async def create_customer(user: dict = Depends(require_permission(Permission.CUSTOMER_CREATE))):
            pass
    """
    async def permission_checker(
        current_user: dict = Depends(get_current_user)
    ) -> dict:
        user_role = UserRole(current_user.get("role", "customer"))
        
        if not has_permission(user_role, permission):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Required permission: {permission.value}"
            )
        
        return current_user
    
    return permission_checker


def require_franchise_access(franchise_id_param: str = "franchise_id"):
    """
    Dependency factory to verify franchise access.
    Ensures users can only access data within their franchise.
    
    Usage:
        @router.get("/customers/{franchise_id}")
        async def get_customers(
            franchise_id: str,
            user: dict = Depends(require_franchise_access("franchise_id"))
        ):
            pass
    """
    async def franchise_checker(
        current_user: dict = Depends(get_current_user),
        **path_params
    ) -> dict:
        user_role = UserRole(current_user.get("role", "customer"))
        user_franchise_id = current_user.get("franchise_id")
        target_franchise_id = path_params.get(franchise_id_param)
        
        if target_franchise_id and not can_access_franchise(
            user_role, user_franchise_id, target_franchise_id
        ):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied to this franchise"
            )
        
        return current_user
    
    return franchise_checker


class RoleChecker:
    """
    Class-based dependency for role checking.
    Allows more flexible role requirements.
    """
    def __init__(self, allowed_roles: List[UserRole]):
        self.allowed_roles = allowed_roles
    
    async def __call__(
        self,
        current_user: dict = Depends(get_current_user)
    ) -> dict:
        user_role = UserRole(current_user.get("role", "customer"))
        
        if user_role not in self.allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
        
        return current_user


# Common role requirement shortcuts
require_admin = RoleChecker([UserRole.SUPER_ADMIN, UserRole.ADMIN])
require_manager_or_above = RoleChecker([UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER])
require_staff = RoleChecker([UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER, UserRole.TECHNICIAN])
