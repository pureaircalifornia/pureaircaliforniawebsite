/**
 * Customer Detail Page
 * Shows complete customer profile with properties, notes, and history
 */
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    Edit,
    Phone,
    Mail,
    MapPin,
    Calendar,
    DollarSign,
    Plus,
    Home,
    FileText,
    Clock,
    MessageSquare,
    MoreVertical,
} from 'lucide-react';

// Mock customer data
const mockCustomer = {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '(213) 555-1234',
    secondaryPhone: '(213) 555-5678',
    preferredContact: 'phone',
    leadStatus: 'converted',
    leadSource: 'website',
    totalSpent: 1250.00,
    totalAppointments: 3,
    lifetimeValue: 1250.00,
    createdAt: '2024-01-15',
    properties: [
        {
            id: 'p1',
            addressLine1: '1550 N Poinsettia Pl',
            city: 'Los Angeles',
            state: 'CA',
            zipCode: '90001',
            propertyType: 'residential',
            squareFootage: 2500,
            numFloors: 2,
            numHvacUnits: 1,
            hasPets: true,
            hasSmokers: false,
            isPrimary: true,
        },
        {
            id: 'p2',
            addressLine1: '456 Oak Avenue',
            city: 'Pasadena',
            state: 'CA',
            zipCode: '91101',
            propertyType: 'residential',
            squareFootage: 1800,
            numFloors: 1,
            numHvacUnits: 1,
            hasPets: false,
            hasSmokers: false,
            isPrimary: false,
        },
    ],
    notes: [
        {
            id: 'n1',
            content: 'Customer prefers morning appointments. Has two dogs.',
            createdBy: 'Admin',
            createdAt: '2024-12-20T10:30:00Z',
            noteType: 'general',
        },
        {
            id: 'n2',
            content: 'Called to follow up on estimate. Customer is considering the full HVAC cleaning package.',
            createdBy: 'Sarah',
            createdAt: '2024-12-18T14:15:00Z',
            noteType: 'call',
        },
    ],
    appointments: [
        {
            id: 'a1',
            serviceTypes: ['Air Duct Cleaning'],
            scheduledStart: '2024-12-20T09:00:00Z',
            status: 'completed',
            technician: 'Mike Johnson',
            total: 450.00,
        },
        {
            id: 'a2',
            serviceTypes: ['Dryer Vent Cleaning'],
            scheduledStart: '2024-06-15T10:00:00Z',
            status: 'completed',
            technician: 'Mike Johnson',
            total: 89.00,
        },
    ],
};

export default function CustomerDetail() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'history' | 'notes'>('overview');
    const [showAddNote, setShowAddNote] = useState(false);
    const [newNote, setNewNote] = useState('');

    const customer = mockCustomer; // In real app, fetch based on id

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'properties', label: 'Properties' },
        { id: 'history', label: 'History' },
        { id: 'notes', label: 'Notes' },
    ];

    return (
        <div className="space-y-6">
            {/* Back button and actions */}
            <div className="flex items-center justify-between">
                <Link
                    to="/admin/customers"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Customers
                </Link>
                <div className="flex gap-3">
                    <Link
                        to={`/admin/appointments/new?customer=${id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        <Calendar className="w-4 h-4" />
                        Schedule Appointment
                    </Link>
                    <Link
                        to={`/admin/estimates/new?customer=${id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        <FileText className="w-4 h-4" />
                        Create Estimate
                    </Link>
                    <Link
                        to={`/admin/customers/${id}/edit`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 rounded-lg text-sm font-medium text-white hover:bg-sky-700"
                    >
                        <Edit className="w-4 h-4" />
                        Edit Customer
                    </Link>
                </div>
            </div>

            {/* Customer header card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-sky-600">
                            {customer.firstName[0]}{customer.lastName[0]}
                        </span>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {customer.firstName} {customer.lastName}
                            </h1>
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                                {customer.leadStatus}
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                {customer.phone}
                            </div>
                            <div className="flex items-center gap-1">
                                <Mail className="w-4 h-4" />
                                {customer.email}
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {customer.properties[0]?.city}, {customer.properties[0]?.state}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">${customer.totalSpent.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">Total Spent</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{customer.totalAppointments}</p>
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
                            className={`pb-4 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                                ? 'border-sky-600 text-sky-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
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
                            <div className="flex justify-between">
                                <dt className="text-gray-600">Primary Phone</dt>
                                <dd className="font-medium text-gray-900">{customer.phone}</dd>
                            </div>
                            {customer.secondaryPhone && (
                                <div className="flex justify-between">
                                    <dt className="text-gray-600">Secondary Phone</dt>
                                    <dd className="font-medium text-gray-900">{customer.secondaryPhone}</dd>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <dt className="text-gray-600">Email</dt>
                                <dd className="font-medium text-gray-900">{customer.email}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-600">Preferred Contact</dt>
                                <dd className="font-medium text-gray-900 capitalize">{customer.preferredContact}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-600">Lead Source</dt>
                                <dd className="font-medium text-gray-900 capitalize">{customer.leadSource.replace('_', ' ')}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-600">Customer Since</dt>
                                <dd className="font-medium text-gray-900">{new Date(customer.createdAt).toLocaleDateString()}</dd>
                            </div>
                        </dl>
                    </div>

                    {/* Primary Property */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Primary Property</h3>
                            <Link to={`/admin/customers/${id}?tab=properties`} className="text-sm text-sky-600 hover:text-sky-700">
                                View all ({customer.properties.length})
                            </Link>
                        </div>
                        {customer.properties[0] && (
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <Home className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-gray-900">{customer.properties[0].addressLine1}</p>
                                        <p className="text-sm text-gray-600">
                                            {customer.properties[0].city}, {customer.properties[0].state} {customer.properties[0].zipCode}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
                                    <div>
                                        <p className="text-sm text-gray-600">Square Footage</p>
                                        <p className="font-medium text-gray-900">{customer.properties[0].squareFootage?.toLocaleString()} sq ft</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">HVAC Units</p>
                                        <p className="font-medium text-gray-900">{customer.properties[0].numHvacUnits}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Has Pets</p>
                                        <p className="font-medium text-gray-900">{customer.properties[0].hasPets ? 'Yes' : 'No'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Floors</p>
                                        <p className="font-medium text-gray-900">{customer.properties[0].numFloors}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Recent Notes */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Recent Notes</h3>
                            <button
                                onClick={() => setShowAddNote(true)}
                                className="text-sm text-sky-600 hover:text-sky-700 font-medium"
                            >
                                Add Note
                            </button>
                        </div>
                        <div className="space-y-4">
                            {customer.notes.slice(0, 2).map((note) => (
                                <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-900">{note.content}</p>
                                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                                        <span>{note.createdBy}</span>
                                        <span>•</span>
                                        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                                        <span className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600">{note.noteType}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Appointments */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Recent Appointments</h3>
                            <Link to={`/admin/customers/${id}?tab=history`} className="text-sm text-sky-600 hover:text-sky-700">
                                View all
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {customer.appointments.map((apt) => (
                                <div key={apt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-900">{apt.serviceTypes.join(', ')}</p>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(apt.scheduledStart).toLocaleDateString()}
                                            <span className="text-gray-400">•</span>
                                            {apt.technician}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">${apt.total}</p>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${apt.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
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
                            <Plus className="w-4 h-4" />
                            Add Property
                        </button>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {customer.properties.map((property) => (
                            <div key={property.id} className="p-6 hover:bg-gray-50">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <Home className="w-6 h-6 text-gray-600" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-gray-900">{property.addressLine1}</p>
                                                {property.isPrimary && (
                                                    <span className="px-2 py-0.5 text-xs font-medium bg-sky-100 text-sky-700 rounded-full">
                                                        Primary
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {property.city}, {property.state} {property.zipCode}
                                            </p>
                                            <div className="flex gap-4 mt-2 text-sm text-gray-600">
                                                <span>{property.squareFootage?.toLocaleString()} sq ft</span>
                                                <span>{property.numFloors} floor(s)</span>
                                                <span>{property.numHvacUnits} HVAC unit(s)</span>
                                                {property.hasPets && <span className="text-orange-600">🐾 Has pets</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'notes' && (
                <div className="bg-white rounded-xl border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Notes & Communication</h3>
                            <button
                                onClick={() => setShowAddNote(!showAddNote)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 rounded-lg text-sm font-medium text-white hover:bg-sky-700"
                            >
                                <Plus className="w-4 h-4" />
                                Add Note
                            </button>
                        </div>
                        {showAddNote && (
                            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                                <textarea
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                    placeholder="Enter your note..."
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                    rows={3}
                                />
                                <div className="flex justify-end gap-2 mt-3">
                                    <button
                                        onClick={() => setShowAddNote(false)}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button className="px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg">
                                        Save Note
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="divide-y divide-gray-100">
                        {customer.notes.map((note) => (
                            <div key={note.id} className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-gray-100 rounded-full">
                                        <MessageSquare className="w-4 h-4 text-gray-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-900">{note.content}</p>
                                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                            <span className="font-medium">{note.createdBy}</span>
                                            <span>•</span>
                                            <span>{new Date(note.createdAt).toLocaleString()}</span>
                                            <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">{note.noteType}</span>
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
