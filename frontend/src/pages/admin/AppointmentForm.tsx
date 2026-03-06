import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Save, Calendar, Clock, MapPin, User, CheckSquare, Loader2 } from 'lucide-react';
import { createAppointment, getCustomers, getUsers } from '@/utils/api';

const SERVICE_OPTIONS = [
    { value: 'residential_air_duct_cleaning', label: 'Residential Air Duct Cleaning' },
    { value: 'commercial_air_duct_cleaning', label: 'Commercial Air Duct Cleaning' },
    { value: 'residential_dryer_vent_cleaning', label: 'Residential Dryer Vent Cleaning' },
    { value: 'commercial_dryer_vent_cleaning', label: 'Commercial Dryer Vent Cleaning' },
    { value: 'hvac_system_cleaning', label: 'HVAC System Cleaning' },
    { value: 'electrostatic_filter', label: 'Electrostatic Filter Installation' },
];

export default function AppointmentForm() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const preselectedCustomerId = searchParams.get('customer');

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [customers, setCustomers] = useState<any[]>([]);
    const [technicians, setTechnicians] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        customer_id: preselectedCustomerId || '',
        property_id: '',
        technician_id: '',
        service_types: [] as string[],
        scheduled_start: '',
        scheduled_end: '',
        estimated_duration: 120,
        status: 'scheduled',
        notes: '',
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const [custData, userData] = await Promise.all([
                    getCustomers({ page_size: 100 }), // Fetching latest 100 customers for dropdown
                    getUsers().catch(() => [])
                ]);
                setCustomers(custData);
                // Filter users to only show admins, managers, and technicians as assignable
                setTechnicians(userData.filter((u: any) => ['admin', 'manager', 'technician'].includes(u.role)));

                // If preselected, select their first property automatically
                if (preselectedCustomerId) {
                    const cust = custData.find((c: any) => (c.id || c._id) === preselectedCustomerId);
                    if (cust && cust.properties?.length > 0) {
                        setFormData(prev => ({ ...prev, property_id: cust.properties[0].id || cust.properties[0]._id }));
                    }
                }
            } catch (err) {
                console.error("Error loading form data", err);
                setError("Failed to load customers and technicians");
            } finally {
                setFetching(false);
            }
        };
        loadData();
    }, [preselectedCustomerId]);

    const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const custId = e.target.value;
        const cust = customers.find(c => (c.id || c._id) === custId);
        setFormData(prev => ({
            ...prev,
            customer_id: custId,
            property_id: cust?.properties?.[0]?.id || cust?.properties?.[0]?._id || ''
        }));
    };

    const handleServiceToggle = (serviceValue: string) => {
        setFormData(prev => {
            const current = new Set(prev.service_types);
            if (current.has(serviceValue)) {
                current.delete(serviceValue);
            } else {
                current.add(serviceValue);
            }
            return { ...prev, service_types: Array.from(current) };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!formData.customer_id) {
            setError("Please select a customer");
            setLoading(false);
            return;
        }

        if (formData.service_types.length === 0) {
            setError("Please select at least one service");
            setLoading(false);
            return;
        }

        if (!formData.scheduled_start) {
            setError("Please schedule a date and time");
            setLoading(false);
            return;
        }

        try {
            // Calculate end time based on duration
            const start = new Date(formData.scheduled_start);
            const end = new Date(start.getTime() + formData.estimated_duration * 60000);

            const payload = {
                ...formData,
                scheduled_start: start.toISOString(),
                scheduled_end: end.toISOString()
            };

            await createAppointment(payload);
            navigate('/admin/appointments');
        } catch (err: any) {
            setError(err.message || 'Failed to schedule appointment');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-sky-500" /></div>;
    }

    const selectedCustomer = customers.find(c => (c.id || c._id) === formData.customer_id);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Schedule Appointment</h1>
                        <p className="text-sm text-gray-500 mt-1">Book a new service appointment</p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Main Settings (2 cols) */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Customer & Location */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-6">
                                    <User className="w-5 h-5 text-sky-500" />
                                    Customer & Location
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Customer *</label>
                                        <select
                                            name="customer_id"
                                            required
                                            value={formData.customer_id}
                                            onChange={handleCustomerChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 bg-white"
                                        >
                                            <option value="">Select a customer...</option>
                                            {customers.map(c => (
                                                <option key={c.id || c._id} value={c.id || c._id}>
                                                    {c.first_name} {c.last_name} {c.company ? `(${c.company})` : ''}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {selectedCustomer && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Service Location *</label>
                                            <select
                                                name="property_id"
                                                required
                                                value={formData.property_id}
                                                onChange={(e) => setFormData(prev => ({ ...prev, property_id: e.target.value }))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 bg-white"
                                            >
                                                <option value="">Select an address...</option>
                                                {selectedCustomer.properties?.map((p: any) => (
                                                    <option key={p.id || p._id} value={p.id || p._id}>
                                                        {p.address_line1}, {p.city}, {p.state} {p.zip_code} - {p.property_type}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Schedule & Assignment */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-6">
                                    <Calendar className="w-5 h-5 text-sky-500" />
                                    Schedule & Technicians
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time *</label>
                                        <div className="relative">
                                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="datetime-local"
                                                required
                                                value={formData.scheduled_start}
                                                onChange={(e) => setFormData(prev => ({ ...prev, scheduled_start: e.target.value }))}
                                                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                                        <input
                                            type="number"
                                            min="30"
                                            step="30"
                                            value={formData.estimated_duration}
                                            onChange={(e) => setFormData(prev => ({ ...prev, estimated_duration: parseInt(e.target.value) }))}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Assign Technician</label>
                                        <select
                                            name="technician_id"
                                            value={formData.technician_id}
                                            onChange={(e) => setFormData(prev => ({ ...prev, technician_id: e.target.value }))}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 bg-white"
                                        >
                                            <option value="">Unassigned</option>
                                            {technicians.map(t => (
                                                <option key={t.id || t._id} value={t.id || t._id}>
                                                    {t.first_name} {t.last_name} ({t.role})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Notes for Technician</label>
                                        <textarea
                                            value={formData.notes}
                                            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                            rows={3}
                                            placeholder="Gate codes, special instructions, etc."
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Setup (1 col) */}
                    <div className="space-y-6">
                        {/* Service Selection */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                                    <CheckSquare className="w-5 h-5 text-sky-500" />
                                    Services *
                                </div>
                                <div className="space-y-3">
                                    {SERVICE_OPTIONS.map(service => (
                                        <label key={service.value} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={formData.service_types.includes(service.value)}
                                                onChange={() => handleServiceToggle(service.value)}
                                                className="mt-1 w-4 h-4 text-sky-600 rounded border-gray-300 focus:ring-sky-500"
                                            />
                                            <span className="text-sm font-medium text-gray-700">{service.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2.5 bg-sky-600 rounded-lg text-sm font-medium text-white hover:bg-sky-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {loading ? 'Scheduling...' : 'Schedule Appointment'}
                    </button>
                </div>
            </form>
        </div>
    );
}
