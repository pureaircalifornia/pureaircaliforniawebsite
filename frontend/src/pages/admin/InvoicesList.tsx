/**
 * Invoices List Page
 * Displays all invoices with status filters and payment tracking
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Plus,
    Search,
    Filter,
    Download,
    Send,
    Eye,
    MoreVertical,
    DollarSign,
    AlertCircle,
    CheckCircle,
    Clock,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

interface Invoice {
    id: string;
    invoiceNumber: string;
    customerName: string;
    customerEmail: string;
    total: number;
    amountPaid: number;
    amountDue: number;
    status: 'draft' | 'sent' | 'viewed' | 'partial' | 'paid' | 'overdue' | 'void';
    dueDate: string;
    createdAt: string;
}

const mockInvoices: Invoice[] = [
    {
        id: '1',
        invoiceNumber: 'INV-20241220-ABC123',
        customerName: 'John Smith',
        customerEmail: 'john.smith@email.com',
        total: 450.00,
        amountPaid: 450.00,
        amountDue: 0,
        status: 'paid',
        dueDate: '2024-12-20',
        createdAt: '2024-12-18',
    },
    {
        id: '2',
        invoiceNumber: 'INV-20241219-DEF456',
        customerName: 'Maria Garcia',
        customerEmail: 'maria.garcia@email.com',
        total: 890.00,
        amountPaid: 0,
        amountDue: 890.00,
        status: 'sent',
        dueDate: '2024-12-26',
        createdAt: '2024-12-19',
    },
    {
        id: '3',
        invoiceNumber: 'INV-20241215-GHI789',
        customerName: 'David Chen',
        customerEmail: 'david.chen@email.com',
        total: 250.00,
        amountPaid: 100.00,
        amountDue: 150.00,
        status: 'partial',
        dueDate: '2024-12-22',
        createdAt: '2024-12-15',
    },
    {
        id: '4',
        invoiceNumber: 'INV-20241210-JKL012',
        customerName: 'Sarah Johnson',
        customerEmail: 'sarah.j@email.com',
        total: 1250.00,
        amountPaid: 0,
        amountDue: 1250.00,
        status: 'overdue',
        dueDate: '2024-12-17',
        createdAt: '2024-12-10',
    },
];

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
    draft: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Draft' },
    sent: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Sent' },
    viewed: { bg: 'bg-cyan-100', text: 'text-cyan-700', label: 'Viewed' },
    partial: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Partial' },
    paid: { bg: 'bg-green-100', text: 'text-green-700', label: 'Paid' },
    overdue: { bg: 'bg-red-100', text: 'text-red-700', label: 'Overdue' },
    void: { bg: 'bg-gray-100', text: 'text-gray-500', label: 'Void' },
};

export default function InvoicesList() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');

    const filteredInvoices = mockInvoices.filter((inv) => {
        const matchesSearch =
            inv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || inv.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    // Summary stats
    const stats = {
        total: mockInvoices.reduce((sum, inv) => sum + inv.total, 0),
        outstanding: mockInvoices.reduce((sum, inv) => sum + inv.amountDue, 0),
        overdue: mockInvoices.filter((inv) => inv.status === 'overdue').length,
    };

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
                    <p className="text-gray-600">Manage billing and track payments</p>
                </div>
                <div className="flex gap-3">
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <Link
                        to="/admin/invoices/new"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 rounded-lg text-sm font-medium text-white hover:bg-sky-700"
                    >
                        <Plus className="w-4 h-4" />
                        Create Invoice
                    </Link>
                </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <DollarSign className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Invoiced</p>
                            <p className="text-xl font-bold text-gray-900">${stats.total.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Outstanding</p>
                            <p className="text-xl font-bold text-gray-900">${stats.outstanding.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Overdue</p>
                            <p className="text-xl font-bold text-gray-900">{stats.overdue} invoices</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search invoices..."
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
                        <option value="paid">Paid</option>
                        <option value="partial">Partial</option>
                        <option value="overdue">Overdue</option>
                    </select>
                </div>
            </div>

            {/* Invoices table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Balance</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredInvoices.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-4">
                                        <Link
                                            to={`/admin/invoices/${invoice.id}`}
                                            className="font-medium text-sky-600 hover:text-sky-700"
                                        >
                                            {invoice.invoiceNumber}
                                        </Link>
                                        <p className="text-xs text-gray-500">{invoice.createdAt}</p>
                                    </td>
                                    <td className="px-4 py-4">
                                        <p className="font-medium text-gray-900">{invoice.customerName}</p>
                                        <p className="text-sm text-gray-500">{invoice.customerEmail}</p>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusConfig[invoice.status].bg} ${statusConfig[invoice.status].text}`}>
                                            {statusConfig[invoice.status].label}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-right font-medium text-gray-900">
                                        ${invoice.total.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <span className={invoice.amountDue > 0 ? 'text-red-600 font-medium' : 'text-green-600'}>
                                            ${invoice.amountDue.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-gray-600">
                                        {invoice.dueDate}
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link
                                                to={`/admin/invoices/${invoice.id}`}
                                                className="p-2 text-gray-600 hover:text-sky-600 hover:bg-gray-100 rounded-lg"
                                                title="View"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                            {invoice.status === 'draft' && (
                                                <button
                                                    className="p-2 text-gray-600 hover:text-sky-600 hover:bg-gray-100 rounded-lg"
                                                    title="Send"
                                                >
                                                    <Send className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                                                <MoreVertical className="w-4 h-4" />
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
                        <span className="font-medium">{filteredInvoices.length}</span> of{' '}
                        <span className="font-medium">{mockInvoices.length}</span> invoices
                    </p>
                    <div className="flex gap-2">
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
