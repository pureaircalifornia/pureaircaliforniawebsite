import React, { useState, useEffect } from 'react';
import { CreditCard, Download, Search, Loader2, Eye, MapPin, Mail, Phone, Calendar } from 'lucide-react';
import { getInvoices, getCustomers } from '@/utils/api';
import { Link } from 'react-router-dom';

const statusStyles: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    sent: 'bg-blue-100 text-blue-700',
    viewed: 'bg-indigo-100 text-indigo-700',
    paid: 'bg-green-100 text-green-700',
    partial: 'bg-yellow-100 text-yellow-700',
    overdue: 'bg-red-100 text-red-700',
    void: 'bg-gray-200 text-gray-500',
    refunded: 'bg-orange-100 text-orange-700',
};

export default function Payments() {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [customers, setCustomers] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');

    useEffect(() => {
        const fetchInvoices = async () => {
            setLoading(true);
            try {
                const [invData, custData] = await Promise.all([
                    getInvoices(),
                    getCustomers()
                ]);
                setInvoices(invData);

                const custMap = custData.reduce((acc: any, c: any) => {
                    acc[c.id || c._id] = c;
                    return acc;
                }, {});
                setCustomers(custMap);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchInvoices();
    }, []);

    const filteredInvoices = invoices.filter((inv) => {
        const custName = inv.customer_name || 'Unknown';
        const matchesSearch = custName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (inv.invoice_number || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || inv.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Payments & Invoices</h1>
                    <p className="text-gray-600 mt-1">Manage billing, invoices, and received payments.</p>
                </div>
                <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4" /> Export
                    </button>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by customer or invoice #"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                        />
                    </div>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                    >
                        <option value="all">All Statuses</option>
                        <option value="draft">Draft</option>
                        <option value="sent">Sent</option>
                        <option value="viewed">Viewed</option>
                        <option value="paid">Paid</option>
                        <option value="partial">Partial</option>
                        <option value="overdue">Overdue</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
                </div>
            ) : filteredInvoices.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CreditCard className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No invoices found</h3>
                    <p className="text-sm text-gray-500">Converted estimates and generated invoices will appear here.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-900">Invoice</th>
                                    <th className="px-6 py-4 font-semibold text-gray-900">Customer</th>
                                    <th className="px-6 py-4 font-semibold text-gray-900">Dates</th>
                                    <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
                                    <th className="px-6 py-4 text-right font-semibold text-gray-900">Amount Due</th>
                                    <th className="px-6 py-4 text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredInvoices.map((inv) => {
                                    const cust = customers[inv.customer_id];
                                    const isOverdue = inv.status !== 'paid' && inv.due_date && new Date() > new Date(inv.due_date);
                                    const displayStatus = isOverdue ? 'overdue' : inv.status;

                                    return (
                                        <tr key={inv.id || inv._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{inv.invoice_number || (inv.id || inv._id).slice(0, 8)}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                        <span className="text-xs font-medium text-gray-600">
                                                            {inv.customer_name ? inv.customer_name[0] : (cust?.first_name?.[0] || '?')}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <Link to={`/admin/customers/${inv.customer_id}`} className="font-medium text-gray-900 hover:text-sky-600">
                                                            {inv.customer_name || (cust ? `${cust.first_name} ${cust.last_name}` : 'Unknown')}
                                                        </Link>
                                                        {cust?.email && <div className="text-xs text-gray-500">{cust.email}</div>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-gray-900">{new Date(inv.created_at).toLocaleDateString()}</div>
                                                {inv.due_date && (
                                                    <div className={`text-xs ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                                                        Due: {new Date(inv.due_date).toLocaleDateString()}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[displayStatus] || statusStyles['draft']}`}>
                                                    {displayStatus.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="font-medium text-gray-900">${(inv.amount_due ?? inv.total ?? 0).toFixed(2)}</div>
                                                {inv.amount_paid > 0 && (
                                                    <div className="text-xs text-green-600 mt-0.5">Paid: ${(inv.amount_paid).toFixed(2)}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-2 text-gray-400 hover:text-sky-600 rounded-lg transition-colors" title="View Invoice">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
