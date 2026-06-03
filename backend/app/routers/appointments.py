"""
Appointments Router
Handles scheduling and dispatching operations.
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from datetime import datetime, timedelta
from typing import List, Optional
import logging
import uuid

from ..models.appointment import (
    Appointment, AppointmentCreate, AppointmentUpdate, AppointmentSearch,
    AppointmentStatus, ServiceType, TechnicianSchedule, DispatchBoard
)
from ..models.user import UserRole, User
from ..core.dependencies import get_current_user, require_permission
from ..core.permissions import Permission
from ..database import get_appointments_collection, get_users_collection, get_customers_collection

router = APIRouter(prefix="/appointments", tags=["Appointments"])


@router.get("", response_model=List[Appointment])
async def list_appointments(
    customer_id: Optional[str] = None,
    technician_id: Optional[str] = None,
    status: Optional[AppointmentStatus] = None,
    date_from: Optional[datetime] = None,
    date_to: Optional[datetime] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    current_user: dict = Depends(require_permission(Permission.APPOINTMENT_READ))
):
    """
    List appointments with optional filters.
    """
    appointments = get_appointments_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    user_franchise_id = current_user.get("franchise_id")
    
    # Build query
    query = {}
    
    # Franchise filtering
    if user_role != UserRole.SUPER_ADMIN:
        query["franchise_id"] = user_franchise_id
    
    # Technician can only see their own appointments
    if user_role == UserRole.TECHNICIAN:
        query["technician_id"] = current_user["_id"]
    elif technician_id:
        query["technician_id"] = technician_id
    
    if customer_id:
        query["customer_id"] = customer_id
    
    if status:
        query["status"] = status.value
    
    if date_from:
        query["scheduled_start"] = {"$gte": date_from}
    
    if date_to:
        if "scheduled_start" in query:
            query["scheduled_start"]["$lte"] = date_to
        else:
            query["scheduled_start"] = {"$lte": date_to}
    
    # Execute query with pagination
    skip = (page - 1) * page_size
    cursor = appointments.find(query).skip(skip).limit(page_size).sort("scheduled_start", 1)
    
    result = []
    async for appointment in cursor:
        result.append(Appointment(**appointment))
    
    return result


@router.post("", response_model=Appointment, status_code=status.HTTP_201_CREATED)
async def create_appointment(
    appointment_data: AppointmentCreate,
    current_user: dict = Depends(require_permission(Permission.APPOINTMENT_CREATE))
):
    """
    Create a new appointment.
    """
    appointments = get_appointments_collection()
    customers = get_customers_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    
    # Franchise handling
    if user_role != UserRole.SUPER_ADMIN:
        appointment_data.franchise_id = current_user.get("franchise_id")
    
    # Verify customer exists
    customer = await customers.find_one({"_id": appointment_data.customer_id})
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found"
        )
    
    # Create appointment document
    appointment_id = str(uuid.uuid4())
    appointment_dict = {
        "_id": appointment_id,
        "franchise_id": appointment_data.franchise_id,
        "customer_id": appointment_data.customer_id,
        "property_id": appointment_data.property_id,
        "service_types": [st.value for st in appointment_data.service_types],
        "scheduled_start": appointment_data.scheduled_start,
        "scheduled_end": appointment_data.scheduled_end,
        "technician_id": appointment_data.technician_id,
        "status": AppointmentStatus.SCHEDULED.value,
        "notes": appointment_data.notes,
        "priority": appointment_data.priority.value,
        "estimated_duration": appointment_data.estimated_duration,
        "actual_duration": None,
        "confirmation_sent": False,
        "reminder_sent": appointment_data.reminder_sent,
        "en_route_time": None,
        "arrival_time": None,
        "start_time": None,
        "end_time": None,
        "completion_notes": None,
        "customer_signature": None,
        "before_photos": [],
        "after_photos": [],
        "estimate_id": None,
        "invoice_id": None,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "created_by": current_user["_id"],
    }
    
    await appointments.insert_one(appointment_dict)
    
    # Update customer's next appointment date
    await customers.update_one(
        {"_id": appointment_data.customer_id},
        {
            "$set": {"next_appointment_date": appointment_data.scheduled_start},
            "$inc": {"total_appointments": 1}
        }
    )
    
    return Appointment(**appointment_dict)


@router.get("/{appointment_id}", response_model=Appointment)
async def get_appointment(
    appointment_id: str,
    current_user: dict = Depends(require_permission(Permission.APPOINTMENT_READ))
):
    """
    Get appointment by ID.
    """
    appointments = get_appointments_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    
    appointment = await appointments.find_one({"_id": appointment_id})
    
    if not appointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found"
        )
    
    # Check access
    if user_role != UserRole.SUPER_ADMIN:
        if appointment.get("franchise_id") != current_user.get("franchise_id"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
    
    # Technician can only see their own appointments
    if user_role == UserRole.TECHNICIAN:
        if appointment.get("technician_id") != current_user["_id"]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
    
    return Appointment(**appointment)


@router.put("/{appointment_id}", response_model=Appointment)
async def update_appointment(
    appointment_id: str,
    appointment_data: AppointmentUpdate,
    current_user: dict = Depends(require_permission(Permission.APPOINTMENT_UPDATE))
):
    """
    Update appointment information.
    """
    appointments = get_appointments_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    
    appointment = await appointments.find_one({"_id": appointment_id})
    
    if not appointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found"
        )
    
    # Check access
    if user_role != UserRole.SUPER_ADMIN:
        if appointment.get("franchise_id") != current_user.get("franchise_id"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied"
            )
    
    # Build update document
    update_data = appointment_data.dict(exclude_unset=True)
    
    # Convert enums to values
    if "service_types" in update_data and update_data["service_types"]:
        update_data["service_types"] = [st.value for st in update_data["service_types"]]
    if "status" in update_data and update_data["status"]:
        update_data["status"] = update_data["status"].value
    if "priority" in update_data and update_data["priority"]:
        update_data["priority"] = update_data["priority"].value
    
    update_data["updated_at"] = datetime.utcnow()
    
    await appointments.update_one({"_id": appointment_id}, {"$set": update_data})
    
    updated_appointment = await appointments.find_one({"_id": appointment_id})
    return Appointment(**updated_appointment)


@router.post("/{appointment_id}/assign", response_model=Appointment)
async def assign_technician(
    appointment_id: str,
    technician_id: str,
    current_user: dict = Depends(require_permission(Permission.APPOINTMENT_ASSIGN))
):
    """
    Assign a technician to an appointment.
    """
    appointments = get_appointments_collection()
    users = get_users_collection()
    
    appointment = await appointments.find_one({"_id": appointment_id})
    if not appointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found"
        )
    
    # Verify technician exists and is a technician
    technician = await users.find_one({
        "_id": technician_id,
        "role": UserRole.TECHNICIAN.value,
        "is_active": True
    })
    
    if not technician:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Technician not found"
        )
    
    await appointments.update_one(
        {"_id": appointment_id},
        {
            "$set": {
                "technician_id": technician_id,
                "updated_at": datetime.utcnow()
            }
        }
    )
    
    updated_appointment = await appointments.find_one({"_id": appointment_id})
    return Appointment(**updated_appointment)


@router.put("/{appointment_id}/status", response_model=Appointment)
async def update_status(
    appointment_id: str,
    new_status: AppointmentStatus,
    notes: Optional[str] = None,
    current_user: dict = Depends(require_permission(Permission.APPOINTMENT_UPDATE))
):
    """
    Update appointment status with optional notes.
    """
    appointments = get_appointments_collection()
    
    appointment = await appointments.find_one({"_id": appointment_id})
    if not appointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found"
        )
    
    update_data = {
        "status": new_status.value,
        "updated_at": datetime.utcnow()
    }
    
    # Set timestamps based on status
    now = datetime.utcnow()
    if new_status == AppointmentStatus.EN_ROUTE:
        update_data["en_route_time"] = now
    elif new_status == AppointmentStatus.ARRIVED:
        update_data["arrival_time"] = now
    elif new_status == AppointmentStatus.IN_PROGRESS:
        update_data["start_time"] = now
    elif new_status == AppointmentStatus.COMPLETED:
        update_data["end_time"] = now
        if appointment.get("start_time"):
            duration = (now - appointment["start_time"]).total_seconds() / 60
            update_data["actual_duration"] = int(duration)
        if notes:
            update_data["completion_notes"] = notes

    await appointments.update_one({"_id": appointment_id}, {"$set": update_data})

    # Speed-to-reviews: fire review request when a job is completed (best-effort)
    if new_status == AppointmentStatus.COMPLETED:
        try:
            from ..services import review_engine
            from ..database import get_customers_collection
            customer = await get_customers_collection().find_one(
                {"_id": appointment.get("customer_id")}
            )
            if customer:
                await review_engine.create_and_send(appointment, customer)
        except Exception:
            logging.getLogger(__name__).exception("review request trigger failed")

    updated_appointment = await appointments.find_one({"_id": appointment_id})
    return Appointment(**updated_appointment)


@router.get("/calendar/view")
async def get_calendar(
    start_date: datetime,
    end_date: datetime,
    technician_id: Optional[str] = None,
    current_user: dict = Depends(require_permission(Permission.APPOINTMENT_READ))
):
    """
    Get calendar view of appointments.
    """
    appointments = get_appointments_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    user_franchise_id = current_user.get("franchise_id")
    
    query = {
        "scheduled_start": {"$gte": start_date, "$lte": end_date}
    }
    
    if user_role != UserRole.SUPER_ADMIN:
        query["franchise_id"] = user_franchise_id
    
    if user_role == UserRole.TECHNICIAN:
        query["technician_id"] = current_user["_id"]
    elif technician_id:
        query["technician_id"] = technician_id
    
    cursor = appointments.find(query).sort("scheduled_start", 1)
    
    result = []
    async for appointment in cursor:
        result.append(Appointment(**appointment))
    
    return result


@router.get("/dispatch/board")
async def get_dispatch_board(
    date: datetime,
    current_user: dict = Depends(require_permission(Permission.APPOINTMENT_ASSIGN))
):
    """
    Get dispatch board for a specific date.
    """
    appointments = get_appointments_collection()
    users = get_users_collection()
    user_role = UserRole(current_user.get("role", "customer"))
    user_franchise_id = current_user.get("franchise_id")
    
    # Get date range for the day
    start_of_day = date.replace(hour=0, minute=0, second=0, microsecond=0)
    end_of_day = start_of_day + timedelta(days=1)
    
    # Get all appointments for the day
    query = {
        "scheduled_start": {"$gte": start_of_day, "$lt": end_of_day}
    }
    
    if user_role != UserRole.SUPER_ADMIN:
        query["franchise_id"] = user_franchise_id
    
    day_appointments = await appointments.find(query).to_list(1000)
    
    # Get all technicians
    tech_query = {
        "role": UserRole.TECHNICIAN.value,
        "is_active": True
    }
    
    if user_role != UserRole.SUPER_ADMIN:
        tech_query["franchise_id"] = user_franchise_id
    
    technicians = await users.find(tech_query).to_list(100)
    
    # Group appointments by technician
    tech_schedules = []
    unassigned = []
    
    for tech in technicians:
        tech_appointments = [
            Appointment(**apt) for apt in day_appointments 
            if apt.get("technician_id") == tech["_id"]
        ]
        
        tech_schedules.append(TechnicianSchedule(
            technician_id=tech["_id"],
            technician_name=f"{tech['first_name']} {tech['last_name']}",
            date=date,
            appointments=tech_appointments,
            total_hours=sum(apt.estimated_duration for apt in tech_appointments) / 60
        ))
    
    # Get unassigned appointments
    unassigned = [
        Appointment(**apt) for apt in day_appointments 
        if not apt.get("technician_id")
    ]
    
    completed = sum(
        1 for apt in day_appointments 
        if apt.get("status") == AppointmentStatus.COMPLETED.value
    )
    
    return DispatchBoard(
        date=date,
        technicians=tech_schedules,
        unassigned_appointments=unassigned,
        total_appointments=len(day_appointments),
        completed_appointments=completed
    )
