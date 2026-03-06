import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Send, CreditCard, Download, FileText, CheckCircle } from 'lucide-react';
import { getInvoices, createCheckoutSession } from '@/utils/api';

export default function InvoiceDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sending, setSending] = useState(false);
    const [sendingSuccess, setSendingSuccess] = useState(false);
    const [creatingLink, setCreatingLink] = useState(false);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                // For simplicity, we fetch all and find the one. 
                // A better approach is an endpoint for a single invoice if available.
                const data = await getInvoices();
                const found = data.find((i: any) => i.id === id || i._id === id);
                if (found) {
                    setInvoice(found);
                } else {
                    setError('Invoice not found');
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load invoice');
            } finally {
                setLoading(false);
            }
        };
        fetchInvoice();
    }, [id]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const handleSendInvoice = async () => {
        setSending(true);
        try {
            // Simulated API call to send invoice
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSendingSuccess(true);
            setTimeout(() => setSendingSuccess(false), 3000);

            // Optimistic stat update
            setInvoice(prev => ({ ...prev, status: 'sent' }));
        } catch (err) {
            console.error(err);
            alert('Failed to send invoice');
        } finally {
            setSending(false);
        }
    };

    const handleCreatePaymentLink = async () => {
        setCreatingLink(true);
        try {
            const { url } = await createCheckoutSession(invoice.id || invoice._id);
            // Open the Stripe checkout page in a new tab
            window.open(url, '_blank');
        } catch (err: any) {
            console.error(err);
            alert(`Failed to create payment link: ${err.message}`);
        } finally {
            setCreatingLink(false);
        }
    };

    if (loading) return <div className="p-12 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-sky-500" /></div>;
    if (error || !invoice) return <div className="p-12 text-red-500 text-center">{error}</div>;

    const subtotal = invoice.total / (1 + (invoice.tax_rate || 0) / 100) || 0;
    const taxAmount = invoice.total - subtotal;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/admin/invoices')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-500" />
                </button>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">Invoice {invoice.invoice_number}</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium uppercase
                            ${invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                                invoice.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                                    'bg-gray-100 text-gray-800'}`}
                        >
                            {invoice.status}
                        </span>
                        <span className="text-sm text-gray-500">Created: {new Date(invoice.created_at).toLocaleDateString()}</span>
                        <span className="text-sm text-gray-500">Due: {new Date(invoice.due_date).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSendInvoice}
                        disabled={sending || sendingSuccess}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50"
                    >
                        {sending ? <Loader2 className="w-4 h-4 animate-spin" /> :
                            sendingSuccess ? <CheckCircle className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                        {sendingSuccess ? 'Sent!' : 'Send to Customer'}
                    </button>
                    <button
                        onClick={handleCreatePaymentLink}
                        disabled={creatingLink}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                        {creatingLink ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
                        {creatingLink ? 'Creating...' : 'Create Payment Link'}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-8">
                <div className="flex justify-between items-start border-b border-gray-100 pb-8 mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-sky-900 tracking-tight">INVOICE</h2>
                        <p className="text-gray-500 mt-1">{invoice.invoice_number}</p>
                    </div>
                    <div className="text-right">
                        <h3 className="font-semibold text-gray-900 text-lg">Pure Air California</h3>
                        <p className="text-gray-500 text-sm mt-1">123 Air Duct Way<br />Los Angeles, CA 90001<br />lou@pureaircalifornia.com</p>
                    </div>
                </div>

                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Billed To</h4>
                        <div className="font-semibold text-gray-900">{invoice.customer_name || 'Customer Name'}</div>
                    </div>
                    <div className="text-right">
                        <div className="flex justify-end gap-8 mb-2">
                            <span className="text-gray-500">Invoice Date</span>
                            <span className="font-medium text-gray-900">{new Date(invoice.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-end gap-8">
                            <span className="text-gray-500">Due Date</span>
                            <span className="font-medium text-gray-900">{new Date(invoice.due_date).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 rounded-lg overflow-hidden border border-gray-200">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-3">Description</th>
                                <th className="px-6 py-3 text-right">Qty</th>
                                <th className="px-6 py-3 text-right">Price</th>
                                <th className="px-6 py-3 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {invoice.line_items?.map((item: any, idx: number) => (
                                <tr key={idx}>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{item.name}</div>
                                        {item.description && <div className="text-gray-500 text-xs mt-1">{item.description}</div>}
                                    </td>
                                    <td className="px-6 py-4 text-right text-gray-600">{item.quantity}</td>
                                    <td className="px-6 py-4 text-right text-gray-600">{formatCurrency(item.unit_price)}</td>
                                    <td className="px-6 py-4 text-right font-medium text-gray-900">{formatCurrency(item.quantity * item.unit_price)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-end">
                    <div className="w-72 space-y-3">
                        <div className="flex justify-between text-gray-600 text-sm">
                            <span>Subtotal</span>
                            <span>{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 text-sm">
                            <span>Tax ({invoice.tax_rate || 0}%)</span>
                            <span>{formatCurrency(taxAmount)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                            <span>Total</span>
                            <span>{formatCurrency(invoice.total || 0)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 text-sm pt-2">
                            <span>Amount Paid</span>
                            <span>{formatCurrency(invoice.amount_paid || 0)}</span>
                        </div>
                        <div className="flex justify-between text-md font-bold text-sky-700 pb-2">
                            <span>Balance Due</span>
                            <span>{formatCurrency((invoice.total || 0) - (invoice.amount_paid || 0))}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                    <p className="text-gray-500 text-sm whitespace-pre-line">{invoice.notes || 'Thank you for your business!'}</p>
                </div>

                <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-2">Terms & Conditions</h4>
                    <p className="text-gray-500 text-sm whitespace-pre-line">{invoice.terms || 'Payment is due within 30 days.'}</p>
                </div>
            </div>
        </div>
    );
}
