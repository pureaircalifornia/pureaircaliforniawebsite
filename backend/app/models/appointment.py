"""
Appointment Models
Defines scheduling and dispatching data structures.
"""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, timedelta
from enum import Enum
import uuid


class ServiceType(str, Enum):
    """Service type enumeration."""
    # Air Duct Services
    RESIDENTIAL_AIR_DUCT = "residential_air_duct"
    COMMERCIAL_AIR_DUCT = "commercial_air_duct"
    
    # Dryer Vent Services
    RESIDENTIAL_DRYER_VENT = "residential_dryer_vent"
    COMMERCIAL_DRYER_VENT = "commercial_dryer_vent"
    DRYER_VENT_REPAIR = "dryer_vent_repair"
    
    # HVAC Services
    HVAC_SYSTEM_CLEANING = "hvac_system_cleaning"
    COIL_CLEANING = "coil_cleaning"
    
    # Filter Services
    ELECTROSTATIC_FILTER_INSTALL = "electrostatic_filter_install"
    FILTER_REPLACEMENT = "filter_replacement"
    
    # Specialty Services
    SANITIZATION = "sanitization"
    MOLD_REMEDIATION = "mold_remediation"
    INSULATION = "insulation"
    
    # Inspection
    INSPECTION = "inspection"
    MAINTENANCE = "maintenance"


class AppointmentStatus(str, Enum):
    """Appointment status enumeration."""
    SCHEDULED = "scheduled"
    CONFIRMED = "confirmed"
    EN_ROUTE = "en_route"
    ARRIVED = "arrived"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    NO_SHOW = "no_show"
    RESCHEDULED = "rescheduled"


class AppointmentPriority(str, Enum):
    """Appointment priority enumeration."""
    LOW = "low"
    NORMAL = "normal"
    HIGH = "high"
    URGENT = "urgent"


class TimeSlot(BaseModel):
    """Available time slot model."""
    start_time: datetime
    end_time: datetime
    technician_id: Optional[str] = None
    is_available: bool = True


class AppointmentBase(BaseModel):
    """Base appointment model."""
    customer_id: str
    property_id: str
    service_types: List[ServiceType]
    scheduled_start: datetime
    scheduled_end: datetime
    notes: Optional[str] = None
    priority: AppointmentPriority = AppointmentPriority.NORMAL


class AppointmentCreate(AppointmentBase):
    """Appointment creation model."""
    franchise_id: str
    technician_id: Optional[str] = None
    estimated_duration: int = 120  # minutes
    reminder_sent: bool = False


class AppointmentUpdate(BaseModel):
    """Appointment update model - all fields optional."""
    customer_id: Optional[str] = None
    property_id: Optional[str] = None
    service_types: Optional[List[ServiceType]] = None
    scheduled_start: Optional[datetime] = None
    scheduled_end: Optional[datetime] = None
    technician_id: Optional[str] = None
    status: Optional[AppointmentStatus] = None
    notes: Optional[str] = None
    priority: Optional[AppointmentPriority] = None
    estimated_duration: Optional[int] = None
    actual_duration: Optional[int] = None
    completion_notes: Optional[str] = None


class Appointment(AppointmentBase):
    """Appointment response model."""
    id: str = Field(..., alias="_id")
    franchise_id: str
    technician_id: Optional[str] = None
    status: AppointmentStatus = AppointmentStatus.SCHEDULED
    estimated_duration: int  # minutes
    actual_duration: Optional[int] = None
    
    # Tracking
    confirmation_sent: bool = False
    reminder_sent: bool = False
    en_route_time: Optional[datetime] = None
    arrival_time: Optional[datetime] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    
    # Completion
    completion_notes: Optional[str] = None
    customer_signature: Optional[str] = None  # Base64 or URL
    before_photos: List[str] = []  # URLs
    after_photos: List[str] = []  # URLs
    
    # Invoice link
    estimate_id: Optional[str] = None
    invoice_id: Optional[str] = None
    
    # Timestamps
    created_at: datetime
    updated_at: datetime
    created_by: str
    
    class Config:
        populate_by_name = True
        from_attributes = True


class AppointmentSearch(BaseModel):
    """Appointment search/filter model."""
    customer_id: Optional[str] = None
    technician_id: Optional[str] = None
    status: Optional[List[AppointmentStatus]] = None
    service_types: Optional[List[ServiceType]] = None
    date_from: Optional[datetime] = None
    date_to: Optional[datetime] = None
    priority: Optional[AppointmentPriority] = None
    page: int = 1
    page_size: int = 20


class TechnicianSchedule(BaseModel):
    """Technician daily schedule model."""
    technician_id: str
    technician_name: str
    date: datetime
    appointments: List[Appointment] = []
    available_slots: List[TimeSlot] = []
    total_hours: float = 0.0


class DispatchBoard(BaseModel):
    """Dispatch board model for daily view."""
    date: datetime
    technicians: List[TechnicianSchedule] = []
    unassigned_appointments: List[Appointment] = []
    total_appointments: int = 0
    completed_appointments: int = 0
