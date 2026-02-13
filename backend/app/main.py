"""
Pure Air California Business Management System
Main FastAPI Application Entry Point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from .config import get_settings
from .database import connect_to_database, close_database_connection
from .routers import (
    auth_router,
    users_router,
    customers_router,
    appointments_router,
    estimates_router,
    invoices_router,
    payments_router,
    documents_router,
    reports_router,
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events."""
    # Startup
    logger.info("Starting Pure Air California Business Management System...")
    await connect_to_database()
    logger.info("Application startup complete.")
    
    yield
    
    # Shutdown
    logger.info("Shutting down application...")
    await close_database_connection()
    logger.info("Application shutdown complete.")


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    settings = get_settings()
    
    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        description="""
        ## Pure Air California Business Management System
        
        A comprehensive business management platform for air duct cleaning services.
        
        ### Features:
        - **Authentication**: JWT-based authentication with role-based access control
        - **CRM**: Customer and lead management
        - **Scheduling**: Appointment scheduling and dispatching
        - **Estimates**: Quote creation and management
        - **Invoicing**: Billing and payment tracking
        - **Payments**: Stripe integration for payment processing
        - **Documents**: W9, insurance, and certification management
        - **Reports**: Business analytics and reporting
        
        ### Roles:
        - **Super Admin**: Full system access (franchise owner)
        - **Admin**: Full location access
        - **Manager**: Staff and operations management
        - **Technician**: Field operations
        - **Customer**: Self-service portal
        """,
        lifespan=lifespan,
        docs_url="/api/docs",
        redoc_url="/api/redoc",
        openapi_url="/api/openapi.json"
    )
    
    # Add CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Include routers
    app.include_router(auth_router, prefix="/api")
    app.include_router(users_router, prefix="/api")
    app.include_router(customers_router, prefix="/api")
    app.include_router(appointments_router, prefix="/api")
    app.include_router(estimates_router, prefix="/api")
    app.include_router(invoices_router, prefix="/api")
    app.include_router(payments_router, prefix="/api")
    app.include_router(documents_router, prefix="/api")
    app.include_router(reports_router, prefix="/api")
    
    @app.get("/api/health")
    async def health_check():
        """Health check endpoint."""
        return {
            "status": "healthy",
            "app": settings.APP_NAME,
            "version": settings.APP_VERSION
        }
    
    @app.get("/")
    async def root():
        """Root endpoint."""
        return {
            "message": "Pure Air California Business Management API",
            "docs": "/api/docs",
            "health": "/api/health"
        }
    
    return app


# Create the application instance
app = create_app()
