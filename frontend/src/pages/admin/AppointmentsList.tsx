/**
 * Appointments List Page
 * Displays appointments with dispatch board fetching real data
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Calendar, Plus, Search, ChevronLeft, ChevronRight,
    Clock, MapPin, Phone, MoreVertical, List, Grid,
    CheckCircle, AlertCircle, Truck, Loader2
} from 'lucide-react';
import { getAppointments, getCustomers, getUsers } from '@/utils/api';

const statusStyles: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
    scheduled: { bg: 'bg-gray-100', text: 'text-gray-700', icon: Clock },
    confirmed: { bg: 'bg-blue-100', text: 'text-blue-700', icon: CheckCircle },
    en_route: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Truck },
    in_progress: { bg: 'bg-purple-100', text: 'text-purple-700', icon: AlertCircle },
    completed: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
    cancelled: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertCircle },
    no_show: { bg: 'bg-orange-100', text: 'text-orange-700', icon: AlertCircle },
    rescheduled: { bg: 'bg-indigo-100', text: 'text-indigo-700', icon: Clock },
};

export default function AppointmentsList() {
    const [view, setView] = useState<'list' | 'calendar'>('list');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');

    const [appointments, setAppointments] = useState<any[]>([]);
    const [customers, setCustomers] = useState<Record<string, any>>({});
    const [technicians, setTechnicians] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);

    const formatTime = (dateString: string) => {
        if (!dateString) return 'TBD';
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: 'numeric', minute: '2-digit', hour12: true,
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [aptData, custData, techData] = await Promise.all([
                    getAppointments(),
                    getCustomers(),
                    getUsers().catch(() => []) // Fallback if team fails
                ]);

                setAppointments(aptData);

                const custMap = custData.reduce((acc: any, c: any) => {
                    acc[c.id || c._id] = c;
                    return acc;
                }, {});
                setCustomers(custMap);

                const techMap = techData.reduce((acc: any, t: any) => {
                    acc[t.id || t._id] = t;
                    return acc;
                }, {});
                setTechnicians(techMap);
            } catch (err) {
                console.error("Failed to fetch appointments data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [selectedDate]); // Refetch if date context changes (currently simplistic)

    const filteredAppointments = appointments.filter((apt) => {
        const cust = customers[apt.customer_id];
        const custName = cust ? `${cust.first_name} ${cust.last_name}` : 'Unknown';
        const matchesSearch = custName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || apt.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const activeTechs = Object.values(technicians).filter((t: any) => ['admin', 'manager', 'technician'].includes(t.role));

    if (loading) {
        return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-sky-500" /></div>;
    }

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
                    <p className="text-gray-600">Schedule and manage service appointments</p>
                </div>
                <Link to="/admin/appointments/new" className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 rounded-lg text-sm font-medium text-white hover:bg-sky-700">
                    <Plus className="w-4 h-4" /> New Appointment
                </Link>
            </div>

            {/* Date navigation and view toggle */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-5 h-5" /></button>
                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                                <Calendar className="w-5 h-5 text-gray-600" />
                                <span className="font-medium">
                                    {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                </span>
                            </div>
                            <button className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight className="w-5 h-5" /></button>
                        </div>
                        <button onClick={() => setSelectedDate(new Date())} className="px-4 py-2 text-sm font-medium text-sky-600 hover:bg-sky-50 rounded-lg">Today</button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button onClick={() => setView('list')} className={`p-2 rounded-lg ${view === 'list' ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'}`}><List className="w-5 h-5" /></button>
                        <button onClick={() => setView('calendar')} className={`p-2 rounded-lg ${view === 'calendar' ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'}`}><Grid className="w-5 h-5" /></button>
                    </div>
                </div>
            </div>

            {/* Search and filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text" placeholder="Search appointments by customer..."
                            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                        />
                    </div>
                    <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500">
                        <option value="all">All Statuses</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="en_route">En Route</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Appointments list */}
            {view === 'list' && (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="divide-y divide-gray-100">
                        {filteredAppointments.map((apt) => {
                            const StatusIcon = statusStyles[apt.status]?.icon || statusStyles['scheduled'].icon;
                            const statusBg = statusStyles[apt.status]?.bg || 'bg-gray-100';
                            const statusText = statusStyles[apt.status]?.text || 'text-gray-700';

                            const cust = customers[apt.customer_id];
                            const prop = cust?.properties?.find((p: any) => p.id === apt.property_id || p._id === apt.property_id) || cust?.properties?.[0];
                            const tech = technicians[apt.technician_id];

                            return (
                                <div key={apt.id || apt._id} className="p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            {/* Time column */}
                                            <div className="text-center min-w-[80px]">
                                                <p className="text-lg font-bold text-gray-900">{formatTime(apt.scheduled_start)}</p>
                                                <p className="text-sm text-gray-500">{apt.estimated_duration} min</p>
                                            </div>

                                            {/* Status indicator */}
                                            <div className={`mt-1 p-1.5 rounded-full ${statusBg}`}>
                                                <StatusIcon className={`w-4 h-4 ${statusText}`} />
                                            </div>

                                            {/* Main content */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <Link to={`/admin/customers/${apt.customer_id}`} className="font-semibold text-gray-900 hover:text-sky-600">
                                                        {cust ? `${cust.first_name} ${cust.last_name}` : 'Unknown Customer'}
                                                    </Link>
                                                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusBg} ${statusText} capitalize`}>
                                                        {(apt.status || 'scheduled').replace(/_/g, ' ')}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                    {prop ? (
                                                        <div className="flex items-center gap-1">
                                                            <MapPin className="w-4 h-4 text-gray-400" />
                                                            {prop.address_line1}, {prop.city}
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400 italic">No address selected</span>
                                                    )}
                                                    {cust?.phone && (
                                                        <div className="flex items-center gap-1">
                                                            <Phone className="w-4 h-4 text-gray-400" />
                                                            {cust.phone}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {apt.service_types?.map((service: string, idx: number) => (
                                                        <span key={idx} className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded capitalize">
                                                            {service.replace(/_/g, ' ')}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right side - technician and actions */}
                                        <div className="flex items-center gap-4">
                                            {tech ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                                        <span className="text-white text-xs font-medium">
                                                            {tech.first_name?.[0]}{tech.last_name?.[0]}
                                                        </span>
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700">{tech.first_name} {tech.last_name}</span>
                                                </div>
                                            ) : (
                                                <button className="px-3 py-1.5 text-sm font-medium text-sky-600 border border-sky-600 rounded-lg hover:bg-sky-50">
                                                    Assign Tech
                                                </button>
                                            )}
                                            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredAppointments.length === 0 && (
                        <div className="p-8 text-center">
                            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
                            <p className="text-gray-600 mb-4">There are no appointments matching your criteria.</p>
                            <Link to="/admin/appointments/new" className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 rounded-lg text-sm font-medium text-white hover:bg-sky-700">
                                <Plus className="w-4 h-4" /> Schedule Appointment
                            </Link>
                        </div>
                    )}
                </div>
            )}

            {/* Calendar view placeholder */}
            {view === 'calendar' && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="text-center py-12">
                        <Grid className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Calendar View</h3>
                        <p className="text-gray-600">Full calendar view with drag-and-drop scheduling coming soon.</p>
                    </div>
                </div>
            )}

            {/* Dispatch board summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeTechs.map((tech: any, idx: number) => {
                    const techId = tech.id || tech._id;
                    const techAppointments = appointments.filter((apt) => apt.technician_id === techId);
                    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'];
                    const color = colors[idx % colors.length];

                    return (
                        <div key={techId} className="bg-white rounded-xl border border-gray-200 p-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center`}>
                                    <span className="text-white font-medium">{tech.first_name?.[0]}{tech.last_name?.[0]}</span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{tech.first_name} {tech.last_name}</p>
                                    <p className="text-sm text-gray-600">{techAppointments.length} appointments</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {techAppointments.slice(0, 3).map((apt) => {
                                    const cust = customers[apt.customer_id];
                                    const statusStyle = statusStyles[apt.status] || statusStyles['scheduled'];
                                    return (
                                        <div key={apt.id || apt._id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{formatTime(apt.scheduled_start)}</p>
                                                <p className="text-xs text-gray-600 truncate max-w-[120px]">
                                                    {cust ? `${cust.first_name} ${cust.last_name}` : 'Unknown'}
                                                </p>
                                            </div>
                                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusStyle.bg} ${statusStyle.text} capitalize`}>
                                                {(apt.status || 'scheduled').replace(/_/g, ' ')}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
