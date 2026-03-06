/**
 * Invoices List Page
 * Fetches real invoice data from backend API with functional buttons
 */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Plus, Search, Download, Send, Eye, Trash2,
    DollarSign, AlertCircle, CheckCircle, Clock,
    ChevronLeft, ChevronRight, Loader2, FileText, MailCheck
} from 'lucide-react';
import { getInvoices, getCustomers } from '@/utils/api';

const statusConfig: Record<string, { bg: string; text: string; label: string; icon: React.ElementType }> = {
    draft: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Draft', icon: FileText },
    sent: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Sent', icon: Send },
    viewed: { bg: 'bg-cyan-100', text: 'text-cyan-700', label: 'Viewed', icon: Eye },
    partial: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Partial', icon: Clock },
    paid: { bg: 'bg-green-100', text: 'text-green-700', label: 'Paid', icon: CheckCircle },
    overdue: { bg: 'bg-red-100', text: 'text-red-700', label: 'Overdue', icon: AlertCircle },
    void: { bg: 'bg-gray-100', text: 'text-gray-500', label: 'Void', icon: FileText },
};

export default function InvoicesList() {
    const navigate = useNavigate();
    const [invoices, setInvoices] = useState<any[]>([]);
    const [customers, setCustomers] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [page, setPage] = useState(1);
    const pageSize = 20;

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [invoiceData, customerData] = await Promise.all([
                getInvoices({ page, page_size: pageSize }),
                getCustomers().catch(() => []),
            ]);
            setInvoices(invoiceData);
            const custMap = customerData.reduce((acc: any, c: any) => {
                acc[c.id || c._id] = c;
                return acc;
            }, {} as Record<string, any>);
            setCustomers(custMap);
        } catch (err) {
            setError('Failed to load invoices. Please try again.');
            console.error('Failed to fetch invoices:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, [page]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchData();
    };

    // Filter locally on loaded data
    const filteredInvoices = invoices.filter((inv) => {
        const cust = customers[inv.customer_id];
        const custName = cust ? `${cust.first_name || ''} ${cust.last_name || ''}` : '';
        const matchesSearch =
            custName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (inv.invoice_number || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || inv.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    // Summary stats
    const stats = {
        total: invoices.reduce((sum, inv) => sum + (inv.total || 0), 0),
        outstanding: invoices.reduce((sum, inv) => sum + (inv.amount_due || inv.balance || 0), 0),
        overdue: invoices.filter((inv) => inv.status === 'overdue').length,
        paid: invoices.filter((inv) => inv.status === 'paid').length,
    };

    const handleExportCSV = () => {
        const headers = ['Invoice #', 'Customer', 'Status', 'Total', 'Balance', 'Due Date', 'Created'];
        const rows = filteredInvoices.map((inv) => {
            const cust = customers[inv.customer_id];
            const custName = cust ? `${cust.first_name || ''} ${cust.last_name || ''}` : 'Unknown';
            return [
                inv.invoice_number || inv.id,
                custName,
                inv.status,
                inv.total || 0,
                inv.amount_due || inv.balance || 0,
                inv.due_date || '',
                inv.created_at ? new Date(inv.created_at).toLocaleDateString() : '',
            ].join(',');
        });
        const csv = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoices_export_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount || 0);
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
                    <button
                        onClick={handleExportCSV}
                        disabled={filteredInvoices.length === 0}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                    <Link
                        to="/admin/estimates"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 rounded-lg text-sm font-medium text-white hover:bg-sky-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Create Estimate → Invoice
                    </Link>
                </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <DollarSign className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Invoiced</p>
                            <p className="text-xl font-bold text-gray-900">{formatCurrency(stats.total)}</p>
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
                            <p className="text-xl font-bold text-gray-900">{formatCurrency(stats.outstanding)}</p>
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
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Paid</p>
                            <p className="text-xl font-bold text-gray-900">{stats.paid} invoices</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by invoice # or customer name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        />
                    </div>
                    <select
                        value={selectedStatus}
                        onChange={(e) => { setSelectedStatus(e.target.value); setPage(1); }}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 bg-white"
                    >
                        <option value="all">All Statuses</option>
                        <option value="draft">Draft</option>
                        <option value="sent">Sent</option>
                        <option value="paid">Paid</option>
                        <option value="partial">Partial</option>
                        <option value="overdue">Overdue</option>
                        <option value="void">Void</option>
                    </select>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 text-sm font-medium transition-colors"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                    {error}
                </div>
            )}

            {/* Loading */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
                </div>
            ) : filteredInvoices.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No invoices found</h3>
                    <p className="text-sm text-gray-500 mb-6">
                        {invoices.length === 0
                            ? 'Create an estimate first, then convert it to an invoice.'
                            : 'Try adjusting your search or filters.'}
                    </p>
                    <Link
                        to="/admin/estimates"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Go to Estimates
                    </Link>
                </div>
            ) : (
                /* Invoices table */
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
                                {filteredInvoices.map((invoice) => {
                                    const invId = invoice.id || invoice._id;
                                    const cust = customers[invoice.customer_id];
                                    const custName = cust ? `${cust.first_name || ''} ${cust.last_name || ''}` : 'Unknown Customer';
                                    const custEmail = cust?.email || '';
                                    const status = statusConfig[invoice.status] || statusConfig.draft;
                                    const StatusIcon = status.icon;
                                    const balance = invoice.amount_due ?? invoice.balance ?? 0;

                                    return (
                                        <tr key={invId} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-4">
                                                <button
                                                    onClick={() => navigate(`/admin/invoices/${invId}`)}
                                                    className="font-medium text-sky-600 hover:text-sky-700 text-left"
                                                >
                                                    {invoice.invoice_number || `INV-${invId?.slice(0, 8)}`}
                                                </button>
                                                <p className="text-xs text-gray-500">
                                                    {invoice.created_at ? new Date(invoice.created_at).toLocaleDateString() : ''}
                                                </p>
                                            </td>
                                            <td className="px-4 py-4">
                                                <p className="font-medium text-gray-900">{custName}</p>
                                                {custEmail && <p className="text-sm text-gray-500">{custEmail}</p>}
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${status.bg} ${status.text}`}>
                                                    <StatusIcon className="w-3 h-3" />
                                                    {status.label}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-right font-medium text-gray-900">
                                                {formatCurrency(invoice.total)}
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <span className={balance > 0 ? 'text-red-600 font-medium' : 'text-green-600'}>
                                                    {formatCurrency(balance)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-gray-600">
                                                {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : '—'}
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => navigate(`/admin/invoices/${invId}`)}
                                                        className="p-2 text-gray-600 hover:text-sky-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                        title="View Invoice"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    {cust?.email && (
                                                        <a
                                                            href={`mailto:${cust.email}?subject=Invoice ${invoice.invoice_number || invId}`}
                                                            className="p-2 text-gray-600 hover:text-sky-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                            title="Email Customer"
                                                        >
                                                            <MailCheck className="w-4 h-4" />
                                                        </a>
                                                    )}
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
                            Showing page <span className="font-medium">{page}</span> ({filteredInvoices.length} results)
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(Math.max(1, page - 1))}
                                disabled={page === 1}
                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setPage(page + 1)}
                                disabled={invoices.length < pageSize}
                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
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
