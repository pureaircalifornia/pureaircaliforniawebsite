import React, { useState, useEffect } from 'react';
import {
    FileText, Plus, Search, Loader2, ArrowRight,
    CheckCircle2, Clock, Ban, Send
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getEstimates } from '@/utils/api';

const STATUS_COLORS: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    sent: 'bg-blue-100 text-blue-700',
    viewed: 'bg-purple-100 text-purple-700',
    approved: 'bg-emerald-100 text-emerald-700',
    rejected: 'bg-red-100 text-red-700',
    converted_to_invoice: 'bg-amber-100 text-amber-700',
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
    draft: <FileText className="w-4 h-4" />,
    sent: <Send className="w-4 h-4" />,
    viewed: <Search className="w-4 h-4" />,
    approved: <CheckCircle2 className="w-4 h-4" />,
    rejected: <Ban className="w-4 h-4" />,
    converted_to_invoice: <ArrowRight className="w-4 h-4" />,
};

export default function Estimates() {
    const [estimates, setEstimates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEstimates = async () => {
            try {
                const data = await getEstimates();
                setEstimates(data);
            } catch (err) {
                setError('Failed to load estimates.');
            } finally {
                setLoading(false);
            }
        };
        fetchEstimates();
    }, []);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Estimates</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage project estimates and quotes.</p>
                </div>
                <Link
                    to="/admin/estimates/new"
                    className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Estimate
                </Link>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
                </div>
            ) : estimates.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No estimates found</h3>
                    <p className="text-sm text-gray-500 mb-6">Create your first estimate to send a quote to a customer.</p>
                    <Link
                        to="/admin/estimates/new"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Create Estimate
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4">Estimate #</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Amount</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {estimates.map((estimate) => (
                                    <tr key={estimate.id || estimate._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {estimate.estimate_number}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {estimate.customer_name || 'Unknown'}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(estimate.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[estimate.status] || STATUS_COLORS.draft}`}>
                                                {STATUS_ICONS[estimate.status] || <Clock className="w-3 h-3" />}
                                                {estimate.status.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium text-gray-900">
                                            {formatCurrency(estimate.total || 0)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                to={`/admin/estimates/${estimate.id || estimate._id}`}
                                                className="text-sky-600 hover:text-sky-700 font-medium text-sm"
                                            >
                                                View <span aria-hidden="true">&rarr;</span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
