# API Routers package
from .auth import router as auth_router
from .users import router as users_router
from .customers import router as customers_router
from .appointments import router as appointments_router
from .estimates import router as estimates_router
from .invoices import router as invoices_router
from .payments import router as payments_router
from .documents import router as documents_router
from .reports import router as reports_router
from .leads import router as leads_router
from .lead_scanner import router as lead_scanner_router
from .settings import router as settings_router
from .reviews import router as reviews_router

__all__ = [
    "auth_router",
    "users_router",
    "customers_router",
    "appointments_router",
    "estimates_router",
    "invoices_router",
    "payments_router",
    "documents_router",
    "reports_router",
    "leads_router",
    "lead_scanner_router",
    "settings_router",
    "reviews_router",
]
