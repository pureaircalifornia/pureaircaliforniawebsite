/**
 * Customers List Page
 * CRM module - fetches real customer data from backend API
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Search, Plus, Filter, Phone, Mail, MapPin,
    ChevronLeft, ChevronRight, Eye, Edit, Trash2, Download, Loader2
} from 'lucide-react';
import { getCustomers, deleteCustomer } from '@/utils/api';

const leadStatusStyles: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    qualified: 'bg-purple-100 text-purple-700',
    proposal_sent: 'bg-indigo-100 text-indigo-700',
    negotiation: 'bg-orange-100 text-orange-700',
    converted: 'bg-green-100 text-green-700',
    lost: 'bg-red-100 text-red-700',
};

export default function CustomersList() {
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
    const [page, setPage] = useState(1);

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const params: Record<string, any> = { page, page_size: 20 };
            if (searchQuery) params.query = searchQuery;
            if (selectedStatus !== 'all') params.lead_status = selectedStatus;
            const data = await getCustomers(params);
            setCustomers(data);
        } catch (err) {
            console.error('Failed to load customers:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCustomers(); }, [page, selectedStatus]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchCustomers();
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this customer?')) return;
        try {
            await deleteCustomer(id);
            setCustomers(prev => prev.filter(c => (c.id || c._id) !== id));
        } catch (err) {
            alert('Failed to delete customer');
        }
    };

    const toggleSelectAll = () => {
        if (selectedCustomers.length === customers.length) {
            setSelectedCustomers([]);
        } else {
            setSelectedCustomers(customers.map(c => c.id || c._id));
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedCustomers(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
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
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
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
                    <select
                        value={selectedStatus}
                        onChange={(e) => { setSelectedStatus(e.target.value); setPage(1); }}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    >
                        <option value="all">All Statuses</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="proposal_sent">Proposal Sent</option>
                        <option value="converted">Converted</option>
                        <option value="lost">Lost</option>
                    </select>
                    <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 text-sm font-medium">Search</button>
                </form>
            </div>

            {/* Loading */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
                </div>
            ) : customers.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No customers found</h3>
                    <p className="text-sm text-gray-500">Try adjusting your search or add a new customer.</p>
                </div>
            ) : (
                /* Customers table */
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            checked={selectedCustomers.length === customers.length && customers.length > 0}
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
                                {customers.map((customer) => {
                                    const cid = customer.id || customer._id;
                                    return (
                                        <tr key={cid} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCustomers.includes(cid)}
                                                    onChange={() => toggleSelect(cid)}
                                                    className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                                                />
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                        <span className="text-sm font-medium text-gray-600">
                                                            {customer.first_name?.[0]}{customer.last_name?.[0]}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <Link
                                                            to={`/admin/customers/${cid}`}
                                                            className="font-medium text-gray-900 hover:text-sky-600"
                                                        >
                                                            {customer.first_name} {customer.last_name}
                                                        </Link>
                                                        {customer.properties?.[0]?.city && (
                                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                                <MapPin className="w-3 h-3" />
                                                                {customer.properties[0].city}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="space-y-1">
                                                    {customer.phone && (
                                                        <div className="flex items-center gap-1 text-sm text-gray-900">
                                                            <Phone className="w-3 h-3 text-gray-400" />
                                                            {customer.phone}
                                                        </div>
                                                    )}
                                                    {customer.email && (
                                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                                            <Mail className="w-3 h-3 text-gray-400" />
                                                            {customer.email}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${leadStatusStyles[customer.lead_status] || 'bg-gray-100 text-gray-700'}`}>
                                                    {(customer.lead_status || 'new').replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className="font-medium text-gray-900">
                                                    ${(customer.total_spent || 0).toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-600">
                                                {customer.last_appointment_date ? new Date(customer.last_appointment_date).toLocaleDateString() : 'Never'}
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Link to={`/admin/customers/${cid}`} className="p-2 text-gray-600 hover:text-sky-600 hover:bg-gray-100 rounded-lg transition-colors" title="View">
                                                        <Eye className="w-4 h-4" />
                                                    </Link>
                                                    <button onClick={() => handleDelete(cid)} className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors" title="Delete">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            Showing page <span className="font-medium">{page}</span> ({customers.length} results)
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(Math.max(1, page - 1))}
                                disabled={page === 1}
                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setPage(page + 1)}
                                disabled={customers.length < 20}
                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
