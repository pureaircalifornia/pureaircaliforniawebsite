"""
Reports Router
Handles reporting and analytics for the business.
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from datetime import datetime, timedelta
from typing import Optional
from collections import defaultdict

from ..models.user import UserRole
from ..models.appointment import AppointmentStatus
from ..models.invoice import InvoiceStatus
from ..core.dependencies import get_current_user, require_permission
from ..core.permissions import Permission
from ..database import (
    get_customers_collection, get_appointments_collection,
    get_invoices_collection, get_payments_collection, get_users_collection
)

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.get("/dashboard")
async def get_dashboard(
    current_user: dict = Depends(require_permission(Permission.REPORT_VIEW))
):
    """Get main dashboard statistics."""
    user_role = UserRole(current_user.get("role", "customer"))
    user_franchise_id = current_user.get("franchise_id")
    
    franchise_filter = {}
    if user_role != UserRole.SUPER_ADMIN:
        franchise_filter["franchise_id"] = user_franchise_id
    
    customers = get_customers_collection()
    appointments = get_appointments_collection()
    invoices = get_invoices_collection()
    payments = get_payments_collection()
    
    # Date ranges
    today = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    week_ago = today - timedelta(days=7)
    month_ago = today - timedelta(days=30)
    
    # Customer stats
    total_customers = await customers.count_documents({**franchise_filter, "is_active": True})
    new_customers_month = await customers.count_documents({
        **franchise_filter,
        "created_at": {"$gte": month_ago}
    })
    
    # Appointment stats
    todays_appointments = await appointments.count_documents({
        **franchise_filter,
        "scheduled_start": {
            "$gte": today,
            "$lt": today + timedelta(days=1)
        }
    })
    
    pending_appointments = await appointments.count_documents({
        **franchise_filter,
        "status": {"$in": [
            AppointmentStatus.SCHEDULED.value,
            AppointmentStatus.CONFIRMED.value
        ]}
    })
    
    completed_this_week = await appointments.count_documents({
        **franchise_filter,
        "status": AppointmentStatus.COMPLETED.value,
        "end_time": {"$gte": week_ago}
    })
    
    # Revenue stats
    revenue_pipeline = [
        {"$match": {**franchise_filter, "created_at": {"$gte": month_ago}}},
        {"$group": {"_id": None, "total": {"$sum": "$amount"}}}
    ]
    
    revenue_result = await payments.aggregate(revenue_pipeline).to_list(1)
    month_revenue = revenue_result[0]["total"] if revenue_result else 0
    
    # Outstanding invoices
    outstanding_pipeline = [
        {"$match": {
            **franchise_filter,
            "status": {"$in": [
                InvoiceStatus.SENT.value,
                InvoiceStatus.PARTIAL.value,
                InvoiceStatus.OVERDUE.value
            ]}
        }},
        {"$group": {"_id": None, "total": {"$sum": "$amount_due"}}}
    ]
    
    outstanding_result = await invoices.aggregate(outstanding_pipeline).to_list(1)
    outstanding_amount = outstanding_result[0]["total"] if outstanding_result else 0
    
    return {
        "customers": {
            "total": total_customers,
            "new_this_month": new_customers_month
        },
        "appointments": {
            "today": todays_appointments,
            "pending": pending_appointments,
            "completed_this_week": completed_this_week
        },
        "revenue": {
            "this_month": round(month_revenue, 2),
            "outstanding": round(outstanding_amount, 2)
        }
    }


@router.get("/revenue")
async def get_revenue_report(
    start_date: datetime,
    end_date: datetime,
    group_by: str = Query("day", regex="^(day|week|month)$"),
    current_user: dict = Depends(require_permission(Permission.REPORT_VIEW))
):
    """Get revenue report for date range."""
    user_role = UserRole(current_user.get("role", "customer"))
    user_franchise_id = current_user.get("franchise_id")
    
    payments = get_payments_collection()
    
    match_query = {
        "created_at": {"$gte": start_date, "$lte": end_date},
        "status": "completed"
    }
    
    if user_role != UserRole.SUPER_ADMIN:
        match_query["franchise_id"] = user_franchise_id
    
    # Grouping format based on group_by
    group_format = {
        "day": "%Y-%m-%d",
        "week": "%Y-W%V",
        "month": "%Y-%m"
    }
    
    pipeline = [
        {"$match": match_query},
        {"$group": {
            "_id": {"$dateToString": {"format": group_format[group_by], "date": "$created_at"}},
            "revenue": {"$sum": "$amount"},
            "refunds": {"$sum": "$refund_amount"},
            "count": {"$sum": 1}
        }},
        {"$sort": {"_id": 1}}
    ]
    
    results = await payments.aggregate(pipeline).to_list(1000)
    
    # Calculate totals
    total_revenue = sum(r["revenue"] for r in results)
    total_refunds = sum(r["refunds"] for r in results)
    total_transactions = sum(r["count"] for r in results)
    
    return {
        "period": {
            "start": start_date.isoformat(),
            "end": end_date.isoformat(),
            "group_by": group_by
        },
        "summary": {
            "total_revenue": round(total_revenue, 2),
            "total_refunds": round(total_refunds, 2),
            "net_revenue": round(total_revenue - total_refunds, 2),
            "total_transactions": total_transactions
        },
        "data": [
            {
                "period": r["_id"],
                "revenue": round(r["revenue"], 2),
                "refunds": round(r["refunds"], 2),
                "net": round(r["revenue"] - r["refunds"], 2),
                "count": r["count"]
            }
            for r in results
        ]
    }


@router.get("/technician-performance")
async def get_technician_performance(
    start_date: datetime,
    end_date: datetime,
    technician_id: Optional[str] = None,
    current_user: dict = Depends(require_permission(Permission.REPORT_VIEW))
):
    """Get technician performance metrics."""
    user_role = UserRole(current_user.get("role", "customer"))
    user_franchise_id = current_user.get("franchise_id")
    
    appointments = get_appointments_collection()
    users = get_users_collection()
    invoices = get_invoices_collection()
    
    match_query = {
        "scheduled_start": {"$gte": start_date, "$lte": end_date}
    }
    
    if user_role != UserRole.SUPER_ADMIN:
        match_query["franchise_id"] = user_franchise_id
    
    if technician_id:
        match_query["technician_id"] = technician_id
    
    # Get all relevant appointments
    apt_list = await appointments.find(match_query).to_list(10000)
    
    # Group by technician
    tech_stats = defaultdict(lambda: {
        "total_jobs": 0,
        "completed_jobs": 0,
        "cancelled_jobs": 0,
        "no_shows": 0,
        "total_duration": 0,
        "revenue": 0.0
    })
    
    for apt in apt_list:
        tech_id = apt.get("technician_id")
        if not tech_id:
            continue
        
        tech_stats[tech_id]["total_jobs"] += 1
        
        status = apt.get("status")
        if status == AppointmentStatus.COMPLETED.value:
            tech_stats[tech_id]["completed_jobs"] += 1
            tech_stats[tech_id]["total_duration"] += apt.get("actual_duration", 0)
        elif status == AppointmentStatus.CANCELLED.value:
            tech_stats[tech_id]["cancelled_jobs"] += 1
        elif status == AppointmentStatus.NO_SHOW.value:
            tech_stats[tech_id]["no_shows"] += 1
    
    # Get technician names and calculate revenue
    results = []
    for tech_id, stats in tech_stats.items():
        tech = await users.find_one({"_id": tech_id})
        tech_name = f"{tech.get('first_name', '')} {tech.get('last_name', '')}" if tech else "Unknown"
        
        # Get revenue from related invoices
        tech_invoices = await invoices.find({
            "appointment_id": {"$in": [
                apt["_id"] for apt in apt_list 
                if apt.get("technician_id") == tech_id
            ]},
            "status": InvoiceStatus.PAID.value
        }).to_list(1000)
        
        revenue = sum(inv.get("total", 0) for inv in tech_invoices)
        
        completion_rate = (stats["completed_jobs"] / stats["total_jobs"] * 100) if stats["total_jobs"] > 0 else 0
        avg_duration = (stats["total_duration"] / stats["completed_jobs"]) if stats["completed_jobs"] > 0 else 0
        
        results.append({
            "technician_id": tech_id,
            "technician_name": tech_name.strip(),
            "total_jobs": stats["total_jobs"],
            "completed_jobs": stats["completed_jobs"],
            "cancelled_jobs": stats["cancelled_jobs"],
            "no_shows": stats["no_shows"],
            "completion_rate": round(completion_rate, 1),
            "average_job_duration": round(avg_duration, 0),
            "total_revenue": round(revenue, 2)
        })
    
    return {
        "period": {
            "start": start_date.isoformat(),
            "end": end_date.isoformat()
        },
        "technicians": sorted(results, key=lambda x: x["completed_jobs"], reverse=True)
    }


@router.get("/service-breakdown")
async def get_service_breakdown(
    start_date: datetime,
    end_date: datetime,
    current_user: dict = Depends(require_permission(Permission.REPORT_VIEW))
):
    """Get breakdown of services performed."""
    user_role = UserRole(current_user.get("role", "customer"))
    user_franchise_id = current_user.get("franchise_id")
    
    appointments = get_appointments_collection()
    
    match_query = {
        "scheduled_start": {"$gte": start_date, "$lte": end_date},
        "status": AppointmentStatus.COMPLETED.value
    }
    
    if user_role != UserRole.SUPER_ADMIN:
        match_query["franchise_id"] = user_franchise_id
    
    pipeline = [
        {"$match": match_query},
        {"$unwind": "$service_types"},
        {"$group": {
            "_id": "$service_types",
            "count": {"$sum": 1}
        }},
        {"$sort": {"count": -1}}
    ]
    
    results = await appointments.aggregate(pipeline).to_list(100)
    
    total = sum(r["count"] for r in results)
    
    return {
        "period": {
            "start": start_date.isoformat(),
            "end": end_date.isoformat()
        },
        "total_services": total,
        "breakdown": [
            {
                "service_type": r["_id"],
                "count": r["count"],
                "percentage": round(r["count"] / total * 100, 1) if total > 0 else 0
            }
            for r in results
        ]
    }


@router.get("/lead-conversion")
async def get_lead_conversion(
    start_date: datetime,
    end_date: datetime,
    current_user: dict = Depends(require_permission(Permission.REPORT_VIEW))
):
    """Get lead conversion funnel metrics."""
    user_role = UserRole(current_user.get("role", "customer"))
    user_franchise_id = current_user.get("franchise_id")
    
    customers = get_customers_collection()
    estimates = get_estimates_collection()
    
    match_query = {
        "created_at": {"$gte": start_date, "$lte": end_date}
    }
    
    if user_role != UserRole.SUPER_ADMIN:
        match_query["franchise_id"] = user_franchise_id
    
    # Lead status breakdown
    lead_pipeline = [
        {"$match": match_query},
        {"$group": {
            "_id": "$lead_status",
            "count": {"$sum": 1}
        }}
    ]
    
    lead_results = await customers.aggregate(lead_pipeline).to_list(100)
    lead_by_status = {r["_id"]: r["count"] for r in lead_results}
    
    # Lead source breakdown
    source_pipeline = [
        {"$match": match_query},
        {"$group": {
            "_id": "$lead_source",
            "count": {"$sum": 1}
        }},
        {"$sort": {"count": -1}}
    ]
    
    source_results = await customers.aggregate(source_pipeline).to_list(100)
    
    total_leads = sum(lead_by_status.values())
    converted = lead_by_status.get("converted", 0)
    
    return {
        "period": {
            "start": start_date.isoformat(),
            "end": end_date.isoformat()
        },
        "summary": {
            "total_leads": total_leads,
            "converted": converted,
            "conversion_rate": round(converted / total_leads * 100, 1) if total_leads > 0 else 0
        },
        "by_status": lead_by_status,
        "by_source": [
            {
                "source": r["_id"],
                "count": r["count"],
                "percentage": round(r["count"] / total_leads * 100, 1) if total_leads > 0 else 0
            }
            for r in source_results
        ]
    }
