"""
Documents Router
Handles W9, insurance, and document management.
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query, UploadFile, File
from datetime import datetime, date, timedelta
from typing import List, Optional
import uuid

from ..models.document import (
    Document, DocumentCreate, DocumentUpdate, DocumentType,
    DocumentStatus, DocumentSearch, ExpiringDocumentAlert
)
from ..models.user import UserRole
from ..core.dependencies import get_current_user, require_permission
from ..core.permissions import Permission
from ..database import get_documents_collection, get_users_collection
from ..config import get_settings
from ..services.storage import upload_file, delete_file

router = APIRouter(prefix="/documents", tags=["Documents"])


@router.get("", response_model=List[Document])
async def list_documents(
    user_id: Optional[str] = None,
    customer_id: Optional[str] = None,
    document_type: Optional[DocumentType] = None,
    status: Optional[DocumentStatus] = None,
    is_expired: Optional[bool] = None,
    expiring_within_days: Optional[int] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    current_user: dict = Depends(require_permission(Permission.DOCUMENT_READ))
):
    """List documents with optional filters."""
    documents = get_documents_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    user_franchise_id = current_user.get("franchise_id")
    
    query = {}
    
    if user_role != UserRole.SUPER_ADMIN:
        query["franchise_id"] = user_franchise_id
    
    # Technicians can only see their own documents
    if user_role == UserRole.TECHNICIAN:
        query["user_id"] = current_user["_id"]
    elif user_id:
        query["user_id"] = user_id
    
    if customer_id:
        query["customer_id"] = customer_id
    
    if document_type:
        query["document_type"] = document_type.value
    
    if status:
        query["status"] = status.value
    
    today = date.today()
    
    if is_expired:
        query["expiration_date"] = {"$lt": today.isoformat()}
    
    if expiring_within_days:
        future_date = today + timedelta(days=expiring_within_days)
        query["expiration_date"] = {
            "$gte": today.isoformat(),
            "$lte": future_date.isoformat()
        }
    
    skip = (page - 1) * page_size
    cursor = documents.find(query).skip(skip).limit(page_size).sort("created_at", -1)
    
    result = []
    async for doc in cursor:
        # Calculate expiration status
        if doc.get("expiration_date"):
            exp_date = doc["expiration_date"]
            if isinstance(exp_date, str):
                exp_date = date.fromisoformat(exp_date)
            elif isinstance(exp_date, datetime):
                exp_date = exp_date.date()
            
            doc["is_expired"] = exp_date < today
            doc["days_until_expiry"] = (exp_date - today).days if exp_date >= today else 0
        
        result.append(Document(**doc))
    
    return result


@router.post("/upload", response_model=Document, status_code=status.HTTP_201_CREATED)
async def upload_document(
    document_type: DocumentType,
    name: str,
    file: UploadFile = File(...),
    description: Optional[str] = None,
    expiration_date: Optional[date] = None,
    user_id: Optional[str] = None,
    customer_id: Optional[str] = None,
    related_entity_id: Optional[str] = None,
    current_user: dict = Depends(require_permission(Permission.DOCUMENT_UPLOAD))
):
    """Upload a document."""
    settings = get_settings()
    documents = get_documents_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    
    # Validate file
    allowed_types = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]
    
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File type {file.content_type} not allowed"
        )
    
    # Max file size: 10MB
    max_size = 10 * 1024 * 1024
    file_content = await file.read()
    
    if len(file_content) > max_size:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File size exceeds 10MB limit"
        )
    
    # Generate unique filename
    file_ext = file.filename.split(".")[-1] if "." in file.filename else ""
    unique_filename = f"{uuid.uuid4().hex}.{file_ext}"
    
    # Upload to storage (S3 or local fallback)
    file_url = await upload_file(file_content, unique_filename, file.content_type)
    
    # If technician, can only upload for themselves
    if user_role == UserRole.TECHNICIAN:
        user_id = current_user["_id"]
    
    document_id = str(uuid.uuid4())
    document_dict = {
        "_id": document_id,
        "franchise_id": current_user.get("franchise_id"),
        "document_type": document_type.value,
        "name": name,
        "description": description,
        "file_name": file.filename,
        "file_size": len(file_content),
        "file_type": file.content_type,
        "file_url": file_url,
        "thumbnail_url": None,
        "status": DocumentStatus.PENDING.value,
        "rejection_reason": None,
        "expiration_date": expiration_date.isoformat() if expiration_date else None,
        "is_expired": False,
        "days_until_expiry": None,
        "user_id": user_id,
        "customer_id": customer_id,
        "related_entity_id": related_entity_id,
        "related_entity_type": None,
        "uploaded_by": current_user["_id"],
        "uploaded_at": datetime.utcnow(),
        "reviewed_by": None,
        "reviewed_at": None,
    }
    
    await documents.insert_one(document_dict)
    
    return Document(**document_dict)


@router.get("/expiring", response_model=List[ExpiringDocumentAlert])
async def get_expiring_documents(
    days: int = Query(30, ge=1, le=365),
    current_user: dict = Depends(require_permission(Permission.DOCUMENT_READ))
):
    """Get documents expiring within specified days."""
    documents = get_documents_collection()
    users = get_users_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    user_franchise_id = current_user.get("franchise_id")
    
    today = date.today()
    future_date = today + timedelta(days=days)
    
    query = {
        "expiration_date": {
            "$gte": today.isoformat(),
            "$lte": future_date.isoformat()
        },
        "status": {"$ne": DocumentStatus.EXPIRED.value}
    }
    
    if user_role != UserRole.SUPER_ADMIN:
        query["franchise_id"] = user_franchise_id
    
    expiring_docs = await documents.find(query).to_list(1000)
    
    alerts = []
    for doc in expiring_docs:
        exp_date = doc.get("expiration_date")
        if isinstance(exp_date, str):
            exp_date = date.fromisoformat(exp_date)
        elif isinstance(exp_date, datetime):
            exp_date = exp_date.date()
        
        user_name = None
        if doc.get("user_id"):
            user = await users.find_one({"_id": doc["user_id"]})
            if user:
                user_name = f"{user.get('first_name', '')} {user.get('last_name', '')}"
        
        alerts.append(ExpiringDocumentAlert(
            document_id=doc["_id"],
            document_name=doc.get("name", ""),
            document_type=DocumentType(doc.get("document_type")),
            user_id=doc.get("user_id"),
            user_name=user_name,
            expiration_date=exp_date,
            days_until_expiry=(exp_date - today).days
        ))
    
    return sorted(alerts, key=lambda x: x.days_until_expiry)


@router.get("/{document_id}", response_model=Document)
async def get_document(
    document_id: str,
    current_user: dict = Depends(require_permission(Permission.DOCUMENT_READ))
):
    """Get document by ID."""
    documents = get_documents_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    
    document = await documents.find_one({"_id": document_id})
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    # Access control
    if user_role != UserRole.SUPER_ADMIN:
        if document.get("franchise_id") != current_user.get("franchise_id"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
    
    if user_role == UserRole.TECHNICIAN:
        if document.get("user_id") != current_user["_id"]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
    
    return Document(**document)


@router.put("/{document_id}", response_model=Document)
async def update_document(
    document_id: str,
    document_data: DocumentUpdate,
    current_user: dict = Depends(require_permission(Permission.DOCUMENT_APPROVE))
):
    """Update document (for review/approval)."""
    documents = get_documents_collection()
    
    document = await documents.find_one({"_id": document_id})
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    update_data = document_data.dict(exclude_unset=True)
    
    if "status" in update_data:
        update_data["status"] = update_data["status"].value
        update_data["reviewed_by"] = current_user["_id"]
        update_data["reviewed_at"] = datetime.utcnow()
    
    await documents.update_one({"_id": document_id}, {"$set": update_data})
    
    updated_document = await documents.find_one({"_id": document_id})
    return Document(**updated_document)


@router.delete("/{document_id}")
async def delete_document(
    document_id: str,
    current_user: dict = Depends(require_permission(Permission.DOCUMENT_APPROVE))
):
    """Delete a document."""
    documents = get_documents_collection()
    
    document = await documents.find_one({"_id": document_id})
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    # Delete file from storage
    if document.get("file_url"):
        await delete_file(document.get("file_url"))
    
    await documents.delete_one({"_id": document_id})
    
    return {"message": "Document deleted successfully"}


@router.get("/types/required")
async def get_required_documents(
    role: Optional[UserRole] = None,
    current_user: dict = Depends(require_permission(Permission.DOCUMENT_READ))
):
    """Get list of required document types by role."""
    
    # Define required documents by role
    required_by_role = {
        UserRole.TECHNICIAN: [
            {"type": DocumentType.W9, "description": "W9 Tax Form", "required": True},
            {"type": DocumentType.DRIVER_LICENSE, "description": "Valid Driver's License", "required": True},
            {"type": DocumentType.BACKGROUND_CHECK, "description": "Background Check", "required": True},
            {"type": DocumentType.DRUG_TEST, "description": "Drug Test Results", "required": True},
            {"type": DocumentType.ID_VERIFICATION, "description": "Government ID", "required": True},
        ],
        UserRole.ADMIN: [
            {"type": DocumentType.W9, "description": "W9 Tax Form", "required": True},
            {"type": DocumentType.ID_VERIFICATION, "description": "Government ID", "required": True},
        ],
        UserRole.MANAGER: [
            {"type": DocumentType.W9, "description": "W9 Tax Form", "required": True},
            {"type": DocumentType.ID_VERIFICATION, "description": "Government ID", "required": True},
        ],
    }
    
    # Franchise-level documents
    franchise_documents = [
        {"type": DocumentType.BUSINESS_LICENSE, "description": "Business License", "required": True},
        {"type": DocumentType.LIABILITY_INSURANCE, "description": "Liability Insurance Certificate", "required": True},
        {"type": DocumentType.WORKERS_COMP, "description": "Workers Compensation Insurance", "required": True},
        {"type": DocumentType.AUTO_INSURANCE, "description": "Commercial Auto Insurance", "required": True},
        {"type": DocumentType.NADCA_CERTIFICATION, "description": "NADCA Certification", "required": False},
    ]
    
    if role:
        return {
            "employee_documents": required_by_role.get(role, []),
            "franchise_documents": franchise_documents
        }
    
    return {
        "by_role": required_by_role,
        "franchise_documents": franchise_documents
    }
