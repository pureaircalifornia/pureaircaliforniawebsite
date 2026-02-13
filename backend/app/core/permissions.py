"""
Role-Based Access Control (RBAC)
Defines user roles and permissions for the application.
"""
from enum import Enum
from typing import List, Set
from functools import wraps


class UserRole(str, Enum):
    """User role enumeration."""
    SUPER_ADMIN = "super_admin"     # Full system access (franchise owner)
    ADMIN = "admin"                  # Full location access
    MANAGER = "manager"              # Manage staff, scheduling, reports
    TECHNICIAN = "technician"        # View assigned jobs, update status
    CUSTOMER = "customer"            # View own data only
    
    @classmethod
    def values(cls) -> List[str]:
        return [role.value for role in cls]


class Permission(str, Enum):
    """Permission enumeration."""
    # User management
    USER_CREATE = "user:create"
    USER_READ = "user:read"
    USER_UPDATE = "user:update"
    USER_DELETE = "user:delete"
    
    # Customer management
    CUSTOMER_CREATE = "customer:create"
    CUSTOMER_READ = "customer:read"
    CUSTOMER_UPDATE = "customer:update"
    CUSTOMER_DELETE = "customer:delete"
    
    # Appointment management
    APPOINTMENT_CREATE = "appointment:create"
    APPOINTMENT_READ = "appointment:read"
    APPOINTMENT_UPDATE = "appointment:update"
    APPOINTMENT_DELETE = "appointment:delete"
    APPOINTMENT_ASSIGN = "appointment:assign"
    
    # Estimate management
    ESTIMATE_CREATE = "estimate:create"
    ESTIMATE_READ = "estimate:read"
    ESTIMATE_UPDATE = "estimate:update"
    ESTIMATE_DELETE = "estimate:delete"
    ESTIMATE_SEND = "estimate:send"
    
    # Invoice management
    INVOICE_CREATE = "invoice:create"
    INVOICE_READ = "invoice:read"
    INVOICE_UPDATE = "invoice:update"
    INVOICE_DELETE = "invoice:delete"
    INVOICE_SEND = "invoice:send"
    
    # Payment management
    PAYMENT_PROCESS = "payment:process"
    PAYMENT_READ = "payment:read"
    PAYMENT_REFUND = "payment:refund"
    
    # Document management
    DOCUMENT_UPLOAD = "document:upload"
    DOCUMENT_READ = "document:read"
    DOCUMENT_APPROVE = "document:approve"
    
    # Marketing
    MARKETING_CREATE = "marketing:create"
    MARKETING_READ = "marketing:read"
    MARKETING_SEND = "marketing:send"
    
    # Reports
    REPORT_VIEW = "report:view"
    REPORT_EXPORT = "report:export"
    
    # Franchise management
    FRANCHISE_CREATE = "franchise:create"
    FRANCHISE_READ = "franchise:read"
    FRANCHISE_UPDATE = "franchise:update"
    FRANCHISE_DELETE = "franchise:delete"
    
    # Settings
    SETTINGS_READ = "settings:read"
    SETTINGS_UPDATE = "settings:update"


# Role to permissions mapping
ROLE_PERMISSIONS: dict[UserRole, Set[Permission]] = {
    UserRole.SUPER_ADMIN: set(Permission),  # All permissions
    
    UserRole.ADMIN: {
        # Users (limited)
        Permission.USER_CREATE,
        Permission.USER_READ,
        Permission.USER_UPDATE,
        # Customers
        Permission.CUSTOMER_CREATE,
        Permission.CUSTOMER_READ,
        Permission.CUSTOMER_UPDATE,
        Permission.CUSTOMER_DELETE,
        # Appointments
        Permission.APPOINTMENT_CREATE,
        Permission.APPOINTMENT_READ,
        Permission.APPOINTMENT_UPDATE,
        Permission.APPOINTMENT_DELETE,
        Permission.APPOINTMENT_ASSIGN,
        # Estimates
        Permission.ESTIMATE_CREATE,
        Permission.ESTIMATE_READ,
        Permission.ESTIMATE_UPDATE,
        Permission.ESTIMATE_DELETE,
        Permission.ESTIMATE_SEND,
        # Invoices
        Permission.INVOICE_CREATE,
        Permission.INVOICE_READ,
        Permission.INVOICE_UPDATE,
        Permission.INVOICE_DELETE,
        Permission.INVOICE_SEND,
        # Payments
        Permission.PAYMENT_PROCESS,
        Permission.PAYMENT_READ,
        Permission.PAYMENT_REFUND,
        # Documents
        Permission.DOCUMENT_UPLOAD,
        Permission.DOCUMENT_READ,
        Permission.DOCUMENT_APPROVE,
        # Marketing
        Permission.MARKETING_CREATE,
        Permission.MARKETING_READ,
        Permission.MARKETING_SEND,
        # Reports
        Permission.REPORT_VIEW,
        Permission.REPORT_EXPORT,
        # Settings
        Permission.SETTINGS_READ,
        Permission.SETTINGS_UPDATE,
    },
    
    UserRole.MANAGER: {
        # Users (limited)
        Permission.USER_READ,
        # Customers
        Permission.CUSTOMER_CREATE,
        Permission.CUSTOMER_READ,
        Permission.CUSTOMER_UPDATE,
        # Appointments
        Permission.APPOINTMENT_CREATE,
        Permission.APPOINTMENT_READ,
        Permission.APPOINTMENT_UPDATE,
        Permission.APPOINTMENT_ASSIGN,
        # Estimates
        Permission.ESTIMATE_CREATE,
        Permission.ESTIMATE_READ,
        Permission.ESTIMATE_UPDATE,
        Permission.ESTIMATE_SEND,
        # Invoices
        Permission.INVOICE_CREATE,
        Permission.INVOICE_READ,
        Permission.INVOICE_UPDATE,
        Permission.INVOICE_SEND,
        # Payments
        Permission.PAYMENT_PROCESS,
        Permission.PAYMENT_READ,
        # Documents
        Permission.DOCUMENT_UPLOAD,
        Permission.DOCUMENT_READ,
        # Reports (limited)
        Permission.REPORT_VIEW,
        # Settings
        Permission.SETTINGS_READ,
    },
    
    UserRole.TECHNICIAN: {
        # Appointments (own only, enforced in routes)
        Permission.APPOINTMENT_READ,
        Permission.APPOINTMENT_UPDATE,
        # Customers (read only)
        Permission.CUSTOMER_READ,
        # Documents (own only)
        Permission.DOCUMENT_UPLOAD,
        Permission.DOCUMENT_READ,
    },
    
    UserRole.CUSTOMER: {
        # Own data only (enforced in routes)
        Permission.CUSTOMER_READ,
        Permission.APPOINTMENT_READ,
        Permission.ESTIMATE_READ,
        Permission.INVOICE_READ,
        Permission.PAYMENT_READ,
    },
}


def has_permission(role: UserRole, permission: Permission) -> bool:
    """Check if a role has a specific permission."""
    return permission in ROLE_PERMISSIONS.get(role, set())


def get_permissions(role: UserRole) -> Set[Permission]:
    """Get all permissions for a role."""
    return ROLE_PERMISSIONS.get(role, set())


def can_access_franchise(user_role: UserRole, user_franchise_id: str, target_franchise_id: str) -> bool:
    """Check if a user can access data from a specific franchise."""
    # Super admins can access all franchises
    if user_role == UserRole.SUPER_ADMIN:
        return True
    
    # Other users can only access their own franchise
    return user_franchise_id == target_franchise_id
