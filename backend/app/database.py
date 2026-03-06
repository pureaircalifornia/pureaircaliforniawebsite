"""
Database Connection Management
Handles MongoDB connection with Motor async driver.
"""
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from typing import Optional
import logging

from .config import get_settings

logger = logging.getLogger(__name__)

# Global database client
_client: Optional[AsyncIOMotorClient] = None
_database: Optional[AsyncIOMotorDatabase] = None


async def connect_to_database() -> None:
    """Initialize database connection."""
    global _client, _database
    
    settings = get_settings()
    
    try:
        _client = AsyncIOMotorClient(settings.MONGO_URL)
        _database = _client[settings.DB_NAME]
        
        # Verify connection
        await _client.admin.command('ping')
        logger.info(f"Connected to MongoDB database: {settings.DB_NAME}")
        
        # Create indexes for performance
        await create_indexes()
        
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        raise


async def close_database_connection() -> None:
    """Close database connection."""
    global _client
    
    if _client:
        _client.close()
        logger.info("Closed MongoDB connection")


async def create_indexes() -> None:
    """Create database indexes for performance optimization."""
    global _database
    
    if _database is None:
        return
    
    # Users collection indexes
    await _database.users.create_index("email", unique=True)
    await _database.users.create_index("role")
    await _database.users.create_index("franchise_id")
    
    # Customers collection indexes
    await _database.customers.create_index("email")
    await _database.customers.create_index("phone")
    await _database.customers.create_index("franchise_id")
    await _database.customers.create_index([("first_name", 1), ("last_name", 1)])
    
    # Appointments collection indexes
    await _database.appointments.create_index("customer_id")
    await _database.appointments.create_index("technician_id")
    await _database.appointments.create_index("scheduled_start")
    await _database.appointments.create_index("status")
    await _database.appointments.create_index("franchise_id")
    
    # Estimates collection indexes
    await _database.estimates.create_index("customer_id")
    await _database.estimates.create_index("status")
    await _database.estimates.create_index("created_at")
    
    # Invoices collection indexes
    await _database.invoices.create_index("customer_id")
    await _database.invoices.create_index("status")
    await _database.invoices.create_index("invoice_number", unique=True)
    await _database.invoices.create_index("due_date")
    
    # Payments collection indexes
    await _database.payments.create_index("invoice_id")
    await _database.payments.create_index("stripe_payment_id")
    await _database.payments.create_index("created_at")
    
    # Documents collection indexes
    await _database.documents.create_index("user_id")
    await _database.documents.create_index("document_type")
    await _database.documents.create_index("expiration_date")
    
    # Leads collection indexes
    await _database.leads.create_index("status")
    await _database.leads.create_index("source")
    await _database.leads.create_index("created_at")
    await _database.leads.create_index("email")
    
    # Prospects collection indexes
    await _database.prospects.create_index("business_category")
    await _database.prospects.create_index("outreach_status")
    await _database.prospects.create_index("place_id", unique=True, sparse=True)
    await _database.prospects.create_index("created_at")
    
    # Outreach collection indexes
    await _database.outreach.create_index("prospect_id")
    await _database.outreach.create_index("sent_at")
    
    logger.info("Database indexes created successfully")


def get_database() -> AsyncIOMotorDatabase:
    """Get database instance."""
    global _database
    
    if _database is None:
        raise RuntimeError("Database not initialized. Call connect_to_database() first.")
    
    return _database


# Collection accessors for convenience
def get_users_collection():
    return get_database().users


def get_customers_collection():
    return get_database().customers


def get_appointments_collection():
    return get_database().appointments


def get_estimates_collection():
    return get_database().estimates


def get_invoices_collection():
    return get_database().invoices


def get_payments_collection():
    return get_database().payments


def get_documents_collection():
    return get_database().documents


def get_franchises_collection():
    return get_database().franchises


def get_audit_logs_collection():
    return get_database().audit_logs


def get_leads_collection():
    return get_database().leads


def get_prospects_collection():
    return get_database().prospects


def get_outreach_collection():
    return get_database().outreach

def get_settings_collection():
    return get_database().settings

