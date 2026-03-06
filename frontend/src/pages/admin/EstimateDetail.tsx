import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
    ArrowLeft, Save, Send, Plus, Trash2, Loader2
} from 'lucide-react';
import { createEstimate, updateEstimate, getEstimates, getCustomers } from '@/utils/api';

interface LineItemForm {
    name: string;
    description: string;
    quantity: number;
    unit_price: number;
    is_taxable: boolean;
}

export default function EstimateDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const customerIdPrefix = searchParams.get('customer');

    const isNew = id === 'new';

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [customers, setCustomers] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        customer_id: customerIdPrefix || '',
        property_id: '',
        franchise_id: 'default',
        notes: '',
        terms: 'Valid for 30 days from date of estimate.',
        tax_rate: 9.5,
        line_items: [
            { name: 'Residential Air Duct Cleaning', description: 'Complete air duct cleaning for residential HVAC system', quantity: 1, unit_price: 199.00, is_taxable: true }
        ] as LineItemForm[]
    });

    useEffect(() => {
        const initData = async () => {
            try {
                const custData = await getCustomers();
                setCustomers(custData);

                if (!isNew && id) {
                    const estData = await getEstimates();
                    const est = estData.find((e: any) => e.id === id || e._id === id);
                    if (est) {
                        setFormData({
                            customer_id: est.customer_id,
                            property_id: est.property_id || '',
                            franchise_id: est.franchise_id || 'default',
                            notes: est.notes || '',
                            terms: est.terms || '',
                            tax_rate: est.tax_rate || 9.5,
                            line_items: est.line_items?.map((item: any) => ({
                                name: item.name || '',
                                description: item.description || '',
                                quantity: item.quantity || 1,
                                unit_price: item.unit_price || 0,
                                is_taxable: item.is_taxable !== false,
                            })) || []
                        });
                    } else {
                        setError('Estimate not found');
                    }
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load data.');
            } finally {
                setLoading(false);
            }
        };
        initData();
    }, [id, isNew]);

    const handleSave = async () => {
        if (!formData.customer_id) {
            alert('Please select a customer.');
            return;
        }
        if (formData.line_items.length === 0) {
            alert('Please add at least one line item.');
            return;
        }

        setSaving(true);
        try {
            const payload = {
                customer_id: formData.customer_id,
                property_id: formData.property_id || 'default',
                franchise_id: formData.franchise_id || 'default',
                notes: formData.notes,
                terms: formData.terms,
                tax_rate: formData.tax_rate,
                line_items: formData.line_items.map(item => ({
                    name: item.name,
                    description: item.description || undefined,
                    quantity: item.quantity,
                    unit_price: item.unit_price,
                    is_taxable: item.is_taxable,
                })),
            };

            if (isNew) {
                const created = await createEstimate(payload);
                const newId = created.id || created._id;
                navigate(`/admin/estimates/${newId}`, { replace: true });
            } else {
                await updateEstimate(id!, {
                    line_items: payload.line_items,
                    notes: payload.notes,
                    terms: payload.terms,
                    tax_rate: payload.tax_rate,
                });
                alert('Estimate saved!');
            }
        } catch (err: any) {
            alert(err.message || 'Failed to save estimate');
        } finally {
            setSaving(false);
        }
    };

    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            line_items: [...prev.line_items, { name: '', description: '', quantity: 1, unit_price: 0, is_taxable: true }]
        }));
    };

    const updateItem = (index: number, field: string, value: any) => {
        const newItems = [...formData.line_items];
        newItems[index] = { ...newItems[index], [field]: value };
        setFormData(prev => ({ ...prev, line_items: newItems }));
    };

    const removeItem = (index: number) => {
        setFormData(prev => ({ ...prev, line_items: prev.line_items.filter((_, idx) => idx !== index) }));
    };

    const subtotal = formData.line_items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
    const taxableSubtotal = formData.line_items.filter(i => i.is_taxable).reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
    const taxAmount = taxableSubtotal * (formData.tax_rate / 100);
    const totalAmount = subtotal + taxAmount;

    if (loading) return <div className="p-12 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-sky-500" /></div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/admin/estimates')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-500" />
                </button>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">{isNew ? 'New Estimate' : 'Edit Estimate'}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 disabled:opacity-50">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {isNew ? 'Create Estimate' : 'Save Changes'}
                    </button>
                    {!isNew && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                            <Send className="w-4 h-4" />
                            Send to Customer
                        </button>
                    )}
                </div>
            </div>

            {error && <div className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 space-y-6">
                    {/* Customer & Property Selection */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Customer *</label>
                            <select
                                value={formData.customer_id}
                                onChange={(e) => setFormData(prev => ({ ...prev, customer_id: e.target.value }))}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
                            >
                                <option value="">Select a customer...</option>
                                {customers.map((c: any) => (
                                    <option key={c.id || c._id} value={c.id || c._id}>
                                        {c.first_name || c.name} {c.last_name || ''} ({c.email})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
                            <input
                                type="number"
                                step="0.1"
                                value={formData.tax_rate}
                                onChange={(e) => setFormData(prev => ({ ...prev, tax_rate: parseFloat(e.target.value) || 0 }))}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
                            />
                        </div>
                    </div>

                    {/* Line Items */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-900">Line Items</h3>
                            <button onClick={addItem} className="text-sm text-sky-600 hover:text-sky-700 flex items-center gap-1 font-medium">
                                <Plus className="w-4 h-4" /> Add Service
                            </button>
                        </div>

                        {/* Table Header */}
                        <div className="hidden md:grid grid-cols-12 gap-3 text-xs font-medium text-gray-500 uppercase tracking-wider pb-2 border-b border-gray-100 mb-3">
                            <div className="col-span-4">Service Name</div>
                            <div className="col-span-3">Description</div>
                            <div className="col-span-1 text-right">Qty</div>
                            <div className="col-span-2 text-right">Unit Price</div>
                            <div className="col-span-1 text-right">Total</div>
                            <div className="col-span-1"></div>
                        </div>

                        <div className="space-y-3">
                            {formData.line_items.map((item, idx) => (
                                <div key={idx} className="grid grid-cols-12 gap-3 items-start">
                                    <div className="col-span-12 md:col-span-4">
                                        <input
                                            type="text"
                                            placeholder="Service name *"
                                            value={item.name}
                                            onChange={(e) => updateItem(idx, 'name', e.target.value)}
                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-3">
                                        <input
                                            type="text"
                                            placeholder="Description"
                                            value={item.description}
                                            onChange={(e) => updateItem(idx, 'description', e.target.value)}
                                            className="w-full px-3 py-2 border rounded-lg text-sm"
                                        />
                                    </div>
                                    <div className="col-span-4 md:col-span-1">
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => updateItem(idx, 'quantity', parseFloat(e.target.value) || 0)}
                                            className="w-full px-3 py-2 border rounded-lg text-sm text-right"
                                        />
                                    </div>
                                    <div className="col-span-4 md:col-span-2">
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={item.unit_price}
                                            onChange={(e) => updateItem(idx, 'unit_price', parseFloat(e.target.value) || 0)}
                                            className="w-full px-3 py-2 border rounded-lg text-sm text-right"
                                        />
                                    </div>
                                    <div className="col-span-3 md:col-span-1 py-2 text-right text-sm font-medium text-gray-900">
                                        ${(item.quantity * item.unit_price).toFixed(2)}
                                    </div>
                                    <div className="col-span-1 flex justify-end">
                                        <button onClick={() => removeItem(idx)} className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Totals */}
                        <div className="mt-6 flex justify-end pt-4 border-t border-gray-100">
                            <div className="w-72 space-y-2">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Tax ({formData.tax_rate}%)</span>
                                    <span>${taxAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                                    <span>Total</span>
                                    <span>${totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notes & Terms */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Internal Notes</label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                rows={3}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 text-sm"
                                placeholder="Private notes (not shown to customer)..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Terms & Conditions</label>
                            <textarea
                                value={formData.terms}
                                onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.value }))}
                                rows={3}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 text-sm"
                                placeholder="Shown on the estimate..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
