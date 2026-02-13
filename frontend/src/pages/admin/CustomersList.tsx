/**
 * Customers List Page
 * CRM module - displays customer list with search, filters, and actions
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Search,
    Plus,
    Filter,
    MoreVertical,
    Phone,
    Mail,
    MapPin,
    ChevronLeft,
    ChevronRight,
    Eye,
    Edit,
    Trash2,
    Download,
} from 'lucide-react';

interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    leadStatus: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
    leadSource: string;
    totalSpent: number;
    lastAppointment: string | null;
    createdAt: string;
}

// Mock data for demonstration
const mockCustomers: Customer[] = [
    {
        id: '1',
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@email.com',
        phone: '(213) 555-1234',
        city: 'Los Angeles',
        leadStatus: 'converted',
        leadSource: 'website',
        totalSpent: 1250.00,
        lastAppointment: '2024-12-20',
        createdAt: '2024-01-15',
    },
    {
        id: '2',
        firstName: 'Maria',
        lastName: 'Garcia',
        email: 'maria.garcia@email.com',
        phone: '(310) 555-5678',
        city: 'Santa Monica',
        leadStatus: 'qualified',
        leadSource: 'referral',
        totalSpent: 450.00,
        lastAppointment: '2024-12-18',
        createdAt: '2024-06-20',
    },
    {
        id: '3',
        firstName: 'David',
        lastName: 'Chen',
        email: 'david.chen@email.com',
        phone: '(818) 555-9012',
        city: 'Burbank',
        leadStatus: 'new',
        leadSource: 'google_ads',
        totalSpent: 0,
        lastAppointment: null,
        createdAt: '2024-12-22',
    },
    {
        id: '4',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.j@email.com',
        phone: '(626) 555-3456',
        city: 'Pasadena',
        leadStatus: 'contacted',
        leadSource: 'yelp',
        totalSpent: 0,
        lastAppointment: null,
        createdAt: '2024-12-21',
    },
    {
        id: '5',
        firstName: 'Michael',
        lastName: 'Brown',
        email: 'm.brown@email.com',
        phone: '(562) 555-7890',
        city: 'Long Beach',
        leadStatus: 'converted',
        leadSource: 'website',
        totalSpent: 2890.00,
        lastAppointment: '2024-12-15',
        createdAt: '2024-03-10',
    },
];

const leadStatusStyles: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    qualified: 'bg-purple-100 text-purple-700',
    converted: 'bg-green-100 text-green-700',
    lost: 'bg-red-100 text-red-700',
};

export default function CustomersList() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

    const filteredCustomers = mockCustomers.filter((customer) => {
        const matchesSearch =
            `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.phone.includes(searchQuery);

        const matchesStatus = selectedStatus === 'all' || customer.leadStatus === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    const toggleSelectAll = () => {
        if (selectedCustomers.length === filteredCustomers.length) {
            setSelectedCustomers([]);
        } else {
            setSelectedCustomers(filteredCustomers.map((c) => c.id));
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedCustomers((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
                    <p className="text-gray-600">Manage your customer database and leads</p>
                </div>
                <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <Link
                        to="/admin/customers/new"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 rounded-lg text-sm font-medium text-white hover:bg-sky-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Customer
                    </Link>
                </div>
            </div>

            {/* Search and filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search customers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        />
                    </div>

                    {/* Status filter */}
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    >
                        <option value="all">All Statuses</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="converted">Converted</option>
                        <option value="lost">Lost</option>
                    </select>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <Filter className="w-4 h-4" />
                        More Filters
                    </button>
                </div>
            </div>

            {/* Customers table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        checked={selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0}
                                        onChange={toggleSelectAll}
                                        className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                                    />
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contact
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Spent
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Last Appointment
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredCustomers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedCustomers.includes(customer.id)}
                                            onChange={() => toggleSelect(customer.id)}
                                            className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                                        />
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-medium text-gray-600">
                                                    {customer.firstName[0]}{customer.lastName[0]}
                                                </span>
                                            </div>
                                            <div>
                                                <Link
                                                    to={`/admin/customers/${customer.id}`}
                                                    className="font-medium text-gray-900 hover:text-sky-600"
                                                >
                                                    {customer.firstName} {customer.lastName}
                                                </Link>
                                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                                    <MapPin className="w-3 h-3" />
                                                    {customer.city}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1 text-sm text-gray-900">
                                                <Phone className="w-3 h-3 text-gray-400" />
                                                {customer.phone}
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                <Mail className="w-3 h-3 text-gray-400" />
                                                {customer.email}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${leadStatusStyles[customer.leadStatus]
                                                }`}
                                        >
                                            {customer.leadStatus.charAt(0).toUpperCase() + customer.leadStatus.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="font-medium text-gray-900">
                                            ${customer.totalSpent.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-600">
                                        {customer.lastAppointment || 'Never'}
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link
                                                to={`/admin/customers/${customer.id}`}
                                                className="p-2 text-gray-600 hover:text-sky-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                title="View"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                            <Link
                                                to={`/admin/customers/${customer.id}/edit`}
                                                className="p-2 text-gray-600 hover:text-sky-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Showing <span className="font-medium">1</span> to{' '}
                        <span className="font-medium">{filteredCustomers.length}</span> of{' '}
                        <span className="font-medium">{mockCustomers.length}</span> customers
                    </p>
                    <div className="flex gap-2">
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
