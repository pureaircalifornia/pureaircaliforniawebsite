"""
Authentication Router
Handles user registration, login, token refresh, and password management.
"""
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from fastapi.security import HTTPAuthorizationCredentials
from datetime import datetime, timedelta
from typing import Optional
import uuid

from ..models.user import (
    User, UserCreate, UserLogin, UserInDB,
    PasswordReset, PasswordResetConfirm, ChangePassword, UserRole
)
from ..core.security import (
    verify_password, get_password_hash, 
    create_access_token, create_refresh_token,
    decode_token, generate_password_reset_token, Token
)
from ..core.dependencies import get_current_user, security
from ..database import get_users_collection

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=User, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate):
    """
    Register a new user account.
    
    - **email**: Unique email address
    - **password**: Minimum 8 characters
    - **first_name**: User's first name
    - **last_name**: User's last name
    """
    users = get_users_collection()
    
    # Check if email already exists
    existing_user = await users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
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
        "role": user_data.role.value if user_data.role else UserRole.CUSTOMER.value,
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


@router.post("/login", response_model=Token)
async def login(credentials: UserLogin):
    """
    Authenticate user and return access token.
    
    - **email**: Registered email address
    - **password**: User password
    """
    users = get_users_collection()
    
    # Find user by email
    user = await users.find_one({"email": credentials.email})
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Verify password
    if not verify_password(credentials.password, user.get("password_hash", "")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Check if user is active
    if not user.get("is_active", False):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated"
        )
    
    # Update last login
    await users.update_one(
        {"_id": user["_id"]},
        {"$set": {"last_login": datetime.utcnow()}}
    )
    
    # Create tokens
    token_data = {
        "sub": user["_id"],
        "email": user["email"],
        "role": user.get("role", "customer"),
        "franchise_id": user.get("franchise_id")
    }
    
    access_token = create_access_token(token_data)
    refresh_token = create_refresh_token(token_data)
    
    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer"
    )


@router.post("/refresh", response_model=Token)
async def refresh_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Refresh access token using refresh token.
    """
    token = credentials.credentials
    token_data = decode_token(token)
    
    if token_data is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token"
        )
    
    # Verify user still exists and is active
    users = get_users_collection()
    user = await users.find_one({"_id": token_data.user_id})
    
    if not user or not user.get("is_active", False):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or deactivated"
        )
    
    # Create new tokens
    new_token_data = {
        "sub": user["_id"],
        "email": user["email"],
        "role": user.get("role", "customer"),
        "franchise_id": user.get("franchise_id")
    }
    
    access_token = create_access_token(new_token_data)
    refresh_token = create_refresh_token(new_token_data)
    
    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer"
    )


@router.get("/me", response_model=User)
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """
    Get current authenticated user's information.
    """
    return User(**current_user)


@router.post("/forgot-password")
async def forgot_password(request: PasswordReset, background_tasks: BackgroundTasks):
    """
    Request password reset email.
    
    - **email**: Registered email address
    """
    users = get_users_collection()
    user = await users.find_one({"email": request.email})
    
    # Always return success to prevent email enumeration
    if not user:
        return {"message": "If the email exists, a password reset link will be sent"}
    
    # Generate reset token
    reset_token = generate_password_reset_token()
    reset_expires = datetime.utcnow() + timedelta(hours=24)
    
    # Store reset token
    await users.update_one(
        {"_id": user["_id"]},
        {
            "$set": {
                "password_reset_token": reset_token,
                "password_reset_expires": reset_expires
            }
        }
    )
    
    # TODO: Send email with reset link
    # background_tasks.add_task(send_password_reset_email, user["email"], reset_token)
    
    return {"message": "If the email exists, a password reset link will be sent"}


@router.post("/reset-password")
async def reset_password(request: PasswordResetConfirm):
    """
    Reset password using reset token.
    
    - **token**: Password reset token from email
    - **new_password**: New password (minimum 8 characters)
    """
    users = get_users_collection()
    
    # Find user with valid reset token
    user = await users.find_one({
        "password_reset_token": request.token,
        "password_reset_expires": {"$gt": datetime.utcnow()}
    })
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )
    
    # Update password
    await users.update_one(
        {"_id": user["_id"]},
        {
            "$set": {
                "password_hash": get_password_hash(request.new_password),
                "updated_at": datetime.utcnow()
            },
            "$unset": {
                "password_reset_token": "",
                "password_reset_expires": ""
            }
        }
    )
    
    return {"message": "Password successfully reset"}


@router.post("/change-password")
async def change_password(
    request: ChangePassword,
    current_user: dict = Depends(get_current_user)
):
    """
    Change password for authenticated user.
    
    - **current_password**: Current password
    - **new_password**: New password (minimum 8 characters)
    """
    # Verify current password
    if not verify_password(request.current_password, current_user.get("password_hash", "")):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect"
        )
    
    users = get_users_collection()
    
    # Update password
    await users.update_one(
        {"_id": current_user["_id"]},
        {
            "$set": {
                "password_hash": get_password_hash(request.new_password),
                "updated_at": datetime.utcnow()
            }
        }
    )
    
    return {"message": "Password successfully changed"}


@router.post("/logout")
async def logout(current_user: dict = Depends(get_current_user)):
    """
    Logout current user (client should discard tokens).
    Note: For true token invalidation, implement token blacklisting.
    """
    # TODO: Implement token blacklisting for true logout
    return {"message": "Successfully logged out"}
