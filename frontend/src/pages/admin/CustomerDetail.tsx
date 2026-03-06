/**
 * Customer Detail Page
 * Fetches real customer data from backend /customers/:id endpoint
 */
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Edit, Phone, Mail, MapPin, Calendar,
    Plus, Home, FileText, MessageSquare, Loader2
} from 'lucide-react';
import { getCustomer, getCustomerHistory } from '@/utils/api';

export default function CustomerDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<any>(null);
    const [history, setHistory] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'history' | 'notes'>('overview');
    const [showAddNote, setShowAddNote] = useState(false);
    const [newNote, setNewNote] = useState('');

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            setLoading(true);
            try {
                const [cust, hist] = await Promise.all([
                    getCustomer(id),
                    getCustomerHistory(id).catch(() => null),
                ]);
                setCustomer(cust);
                setHistory(hist);
            } catch (err: any) {
                setError(err.message || 'Failed to load customer');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 text-sky-500 animate-spin" /></div>;
    if (error || !customer) return (
        <div className="p-12 text-center">
            <p className="text-red-500 mb-4">{error || 'Customer not found'}</p>
            <button onClick={() => navigate('/admin/customers')} className="text-sky-600 hover:underline">Back to Customers</button>
        </div>
    );

    const primaryProperty = customer.properties?.find((p: any) => p.is_primary) || customer.properties?.[0];
    const appointments = history?.appointments || [];
    const estimates = history?.estimates || [];
    const notes = customer.notes || [];

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'properties', label: `Properties (${customer.properties?.length || 0})` },
        { id: 'history', label: 'History' },
        { id: 'notes', label: `Notes (${notes.length})` },
    ];

    return (
        <div className="space-y-6">
            {/* Back button and actions */}
            <div className="flex items-center justify-between">
                <Link to="/admin/customers" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="w-4 h-4" /> Back to Customers
                </Link>
                <div className="flex gap-3">
                    <Link to={`/admin/appointments/new?customer=${id}`} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <Calendar className="w-4 h-4" /> Schedule Appointment
                    </Link>
                    <Link to={`/admin/estimates/new?customer=${id}`} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <FileText className="w-4 h-4" /> Create Estimate
                    </Link>
                    <Link to={`/admin/customers/${id}/edit`} className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 rounded-lg text-sm font-medium text-white hover:bg-sky-700">
                        <Edit className="w-4 h-4" /> Edit Customer
                    </Link>
                </div>
            </div>

            {/* Customer header card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-sky-600">
                            {customer.first_name?.[0]}{customer.last_name?.[0]}
                        </span>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {customer.first_name} {customer.last_name}
                            </h1>
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 capitalize">
                                {(customer.lead_status || 'new').replace(/_/g, ' ')}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            {customer.phone && <div className="flex items-center gap-1"><Phone className="w-4 h-4" />{customer.phone}</div>}
                            {customer.email && <div className="flex items-center gap-1"><Mail className="w-4 h-4" />{customer.email}</div>}
                            {primaryProperty && <div className="flex items-center gap-1"><MapPin className="w-4 h-4" />{primaryProperty.city}, {primaryProperty.state}</div>}
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">${(customer.total_spent || 0).toLocaleString()}</p>
                            <p className="text-sm text-gray-600">Total Spent</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{customer.total_appointments || 0}</p>
                            <p className="text-sm text-gray-600">Appointments</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex gap-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`pb-4 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? 'border-sky-600 text-sky-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab content */}
            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Contact Information */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                        <dl className="space-y-3">
                            <div className="flex justify-between"><dt className="text-gray-600">Primary Phone</dt><dd className="font-medium text-gray-900">{customer.phone}</dd></div>
                            {customer.secondary_phone && <div className="flex justify-between"><dt className="text-gray-600">Secondary Phone</dt><dd className="font-medium text-gray-900">{customer.secondary_phone}</dd></div>}
                            <div className="flex justify-between"><dt className="text-gray-600">Email</dt><dd className="font-medium text-gray-900">{customer.email || 'N/A'}</dd></div>
                            <div className="flex justify-between"><dt className="text-gray-600">Preferred Contact</dt><dd className="font-medium text-gray-900 capitalize">{customer.preferred_contact}</dd></div>
                            <div className="flex justify-between"><dt className="text-gray-600">Lead Source</dt><dd className="font-medium text-gray-900 capitalize">{(customer.lead_source || '').replace(/_/g, ' ')}</dd></div>
                            <div className="flex justify-between"><dt className="text-gray-600">Customer Since</dt><dd className="font-medium text-gray-900">{new Date(customer.created_at).toLocaleDateString()}</dd></div>
                        </dl>
                    </div>

                    {/* Primary Property */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Primary Property</h3>
                            <button onClick={() => setActiveTab('properties')} className="text-sm text-sky-600 hover:text-sky-700">View all ({customer.properties?.length || 0})</button>
                        </div>
                        {primaryProperty ? (
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <Home className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-gray-900">{primaryProperty.address_line1}</p>
                                        <p className="text-sm text-gray-600">{primaryProperty.city}, {primaryProperty.state} {primaryProperty.zip_code}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
                                    <div><p className="text-sm text-gray-600">Square Footage</p><p className="font-medium text-gray-900">{primaryProperty.square_footage?.toLocaleString() || 'N/A'} sq ft</p></div>
                                    <div><p className="text-sm text-gray-600">HVAC Units</p><p className="font-medium text-gray-900">{primaryProperty.num_hvac_units || 'N/A'}</p></div>
                                    <div><p className="text-sm text-gray-600">Has Pets</p><p className="font-medium text-gray-900">{primaryProperty.has_pets ? 'Yes' : 'No'}</p></div>
                                    <div><p className="text-sm text-gray-600">Floors</p><p className="font-medium text-gray-900">{primaryProperty.num_floors || 'N/A'}</p></div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No properties on file.</p>
                        )}
                    </div>

                    {/* Recent Notes */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Recent Notes</h3>
                            <button onClick={() => { setActiveTab('notes'); setShowAddNote(true); }} className="text-sm text-sky-600 hover:text-sky-700 font-medium">Add Note</button>
                        </div>
                        <div className="space-y-4">
                            {notes.length === 0 ? (
                                <p className="text-sm text-gray-500">No notes yet.</p>
                            ) : notes.slice(0, 2).map((note: any) => (
                                <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-900">{note.content}</p>
                                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                                        <span>{note.created_by}</span><span>•</span>
                                        <span>{new Date(note.created_at).toLocaleDateString()}</span>
                                        <span className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600">{note.note_type}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Appointments */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Recent Appointments</h3>
                            <button onClick={() => setActiveTab('history')} className="text-sm text-sky-600 hover:text-sky-700">View all</button>
                        </div>
                        <div className="space-y-3">
                            {appointments.length === 0 ? (
                                <p className="text-sm text-gray-500">No appointments yet.</p>
                            ) : appointments.slice(0, 3).map((apt: any) => (
                                <div key={apt.id || apt._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900">{apt.service_types?.join(', ') || apt.service_type || 'Service'}</p>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(apt.scheduled_start || apt.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">${apt.total || 0}</p>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${apt.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {apt.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'properties' && (
                <div className="bg-white rounded-xl border border-gray-200">
                    <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Properties</h3>
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 rounded-lg text-sm font-medium text-white hover:bg-sky-700">
                            <Plus className="w-4 h-4" /> Add Property
                        </button>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {(customer.properties || []).length === 0 ? (
                            <div className="p-6 text-center text-sm text-gray-500">No properties on file.</div>
                        ) : customer.properties.map((prop: any) => (
                            <div key={prop.id} className="p-6 hover:bg-gray-50">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-gray-100 rounded-lg"><Home className="w-6 h-6 text-gray-600" /></div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-gray-900">{prop.address_line1}</p>
                                            {prop.is_primary && <span className="px-2 py-0.5 text-xs font-medium bg-sky-100 text-sky-700 rounded-full">Primary</span>}
                                        </div>
                                        <p className="text-sm text-gray-600">{prop.city}, {prop.state} {prop.zip_code}</p>
                                        <div className="flex gap-4 mt-2 text-sm text-gray-600">
                                            <span>{prop.square_footage?.toLocaleString()} sq ft</span>
                                            <span>{prop.num_floors} floor(s)</span>
                                            <span>{prop.num_hvac_units} HVAC unit(s)</span>
                                            {prop.has_pets && <span className="text-orange-600">🐾 Has pets</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'history' && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Service History</h3>
                    {appointments.length === 0 && estimates.length === 0 ? (
                        <p className="text-sm text-gray-500">No service history yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {appointments.map((apt: any) => (
                                <div key={apt.id || apt._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900">{apt.service_types?.join(', ') || 'Appointment'}</p>
                                        <p className="text-sm text-gray-600">{new Date(apt.scheduled_start || apt.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">${apt.total || 0}</p>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${apt.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{apt.status}</span>
                                    </div>
                                </div>
                            ))}
                            {estimates.map((est: any) => (
                                <div key={est.id || est._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900">Estimate #{est.estimate_number}</p>
                                        <p className="text-sm text-gray-600">{new Date(est.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">${est.total || 0}</p>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${est.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{est.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'notes' && (
                <div className="bg-white rounded-xl border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Notes & Communication</h3>
                            <button onClick={() => setShowAddNote(!showAddNote)} className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 rounded-lg text-sm font-medium text-white hover:bg-sky-700">
                                <Plus className="w-4 h-4" /> Add Note
                            </button>
                        </div>
                        {showAddNote && (
                            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                                <textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Enter your note..." className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500" rows={3} />
                                <div className="flex justify-end gap-2 mt-3">
                                    <button onClick={() => setShowAddNote(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg">Cancel</button>
                                    <button className="px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg">Save Note</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="divide-y divide-gray-100">
                        {notes.length === 0 ? (
                            <div className="p-6 text-center text-sm text-gray-500">No notes yet.</div>
                        ) : notes.map((note: any) => (
                            <div key={note.id} className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-gray-100 rounded-full"><MessageSquare className="w-4 h-4 text-gray-600" /></div>
                                    <div className="flex-1">
                                        <p className="text-gray-900">{note.content}</p>
                                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                            <span className="font-medium">{note.created_by}</span><span>•</span>
                                            <span>{new Date(note.created_at).toLocaleString()}</span>
                                            <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">{note.note_type}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
