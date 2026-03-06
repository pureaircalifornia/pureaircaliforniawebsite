/**
 * Prospects Page
 * View and manage saved prospects from lead scanner, compose and send emails
 */
import React, { useState, useEffect } from 'react';
import {
    Building2, Mail, Phone, Globe, Star, Trash2, Pencil, Send,
    Loader2, RefreshCw, Eye, ChevronDown, ChevronUp, X, Check, Search, UserPlus, FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
    getProspects, updateProspect, deleteProspect,
    previewEmail, sendOutreachEmail, getOutreachHistory,
    findEmails, createCustomer,
    Prospect, OutreachRecord
} from '@/utils/api';

const STATUS_COLORS: Record<string, string> = {
    not_contacted: 'bg-gray-100 text-gray-700',
    email_sent: 'bg-blue-100 text-blue-700',
    email_opened: 'bg-indigo-100 text-indigo-700',
    replied: 'bg-purple-100 text-purple-700',
    interested: 'bg-emerald-100 text-emerald-700',
    not_interested: 'bg-red-100 text-red-700',
    meeting_scheduled: 'bg-amber-100 text-amber-700',
    converted: 'bg-green-100 text-green-700',
};

const STATUS_LABELS: Record<string, string> = {
    not_contacted: 'Not Contacted',
    email_sent: 'Email Sent',
    email_opened: 'Opened',
    replied: 'Replied',
    interested: 'Interested',
    not_interested: 'Not Interested',
    meeting_scheduled: 'Meeting Set',
    converted: 'Converted',
};

export default function Prospects() {
    const [prospects, setProspects] = useState<Prospect[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [convertingId, setConvertingId] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({ contact_name: '', contact_email: '', contact_title: '', notes: '' });

    // Email composer state
    const [composingId, setComposingId] = useState<string | null>(null);
    const [emailPreview, setEmailPreview] = useState<{ subject: string; body: string } | null>(null);
    const [emailLoading, setEmailLoading] = useState(false);
    const [sendingEmail, setSendingEmail] = useState(false);
    const [emailSubject, setEmailSubject] = useState('');
    const [emailBody, setEmailBody] = useState('');
    const [emailResult, setEmailResult] = useState<{ success: boolean; message: string } | null>(null);

    // Outreach history
    const [historyId, setHistoryId] = useState<string | null>(null);
    const [history, setHistory] = useState<OutreachRecord[]>([]);

    const [findingEmailsFor, setFindingEmailsFor] = useState<string | null>(null);

    const fetchProspects = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getProspects({ limit: 200 });
            setProspects(data);
        } catch (err) {
            setError('Failed to load prospects.');
        } finally {
            setLoading(false);
        }
    };

    const handleFindEmails = async (prospect: Prospect) => {
        setFindingEmailsFor(prospect.id);
        try {
            const result = await findEmails(prospect.id);
            if (result.emails && result.emails.length > 0) {
                setProspects(prev => prev.map(p =>
                    p.id === prospect.id ? { ...p, found_emails: result.emails } : p
                ));
            } else {
                alert('No emails found on the website.');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to find emails.');
        } finally {
            setFindingEmailsFor(null);
        }
    };

    useEffect(() => { fetchProspects(); }, []);

    const handleEdit = (prospect: Prospect) => {
        setEditingId(prospect.id);
        setEditForm({
            contact_name: prospect.contact_name || '',
            contact_email: prospect.contact_email || '',
            contact_title: prospect.contact_title || '',
            notes: prospect.notes || '',
        });
    };

    const handleSaveEdit = async (prospectId: string) => {
        try {
            const payload = {
                contact_name: editForm.contact_name?.trim() || undefined,
                contact_email: editForm.contact_email?.trim() || undefined,
                contact_title: editForm.contact_title?.trim() || undefined,
                notes: editForm.notes?.trim() || undefined,
            };
            await updateProspect(prospectId, payload);
            // Optimistic update
            setProspects(prev => prev.map(p =>
                p.id === prospectId ? { ...p, ...editForm } : p
            ));
            setEditingId(null);
            // Optionally still fetch in background to sync any server-side changes
            fetchProspects();
        } catch (err) {
            console.error('Failed to update prospect:', err);
            alert('Failed to save changes.');
        }
    };

    const handleDelete = async (prospectId: string) => {
        if (!confirm('Delete this prospect?')) return;
        try {
            await deleteProspect(prospectId);
            setProspects(prev => prev.filter(p => p.id !== prospectId));
        } catch (err) {
            console.error('Failed to delete:', err);
        }
    };

    const handleComposeEmail = async (prospect: Prospect) => {
        setComposingId(prospect.id);
        setEmailLoading(true);
        setEmailResult(null);
        try {
            const preview = await previewEmail({ prospect_id: prospect.id });
            setEmailSubject(preview.subject);
            setEmailBody(preview.body);
            setEmailPreview(preview);
        } catch (err) {
            setEmailSubject(`Professional Air Duct Cleaning for ${prospect.business_name}`);
            setEmailBody(`Dear ${prospect.contact_name || 'Hiring Manager'},\n\nI'm reaching out about our professional air duct cleaning services...\n\nBest regards,\nLou\nPure Air California`);
        } finally {
            setEmailLoading(false);
        }
    };

    const handleSendEmail = async (prospect: Prospect) => {
        if (!prospect.contact_email) {
            alert('Please add a contact email first by clicking the edit button.');
            return;
        }
        setSendingEmail(true);
        try {
            const result = await sendOutreachEmail({
                prospect_id: prospect.id,
                to_email: prospect.contact_email,
                to_name: prospect.contact_name || undefined,
                subject: emailSubject,
                body: emailBody,
            });
            setEmailResult({ success: result.success, message: result.message });
            if (result.success) {
                fetchProspects();
            }
        } catch (err) {
            setEmailResult({ success: false, message: err instanceof Error ? err.message : 'Failed to send' });
        } finally {
            setSendingEmail(false);
        }
    };

    const handleViewHistory = async (prospectId: string) => {
        if (historyId === prospectId) {
            setHistoryId(null);
            return;
        }
        setHistoryId(prospectId);
        try {
            const h = await getOutreachHistory(prospectId);
            setHistory(h);
        } catch {
            setHistory([]);
        }
    };

    const handleCreateEstimate = async (prospect: Prospect) => {
        setConvertingId(prospect.id);
        try {
            // First we must convert them to a customer to create an estimate
            const splitName = (name: string) => {
                const parts = (name || '').trim().split(' ');
                return { first: parts[0] || 'Unknown', last: parts.slice(1).join(' ') || 'Contact' };
            };
            const { first, last } = splitName(prospect.contact_name || '');

            const customerPayload = {
                first_name: first,
                last_name: last,
                email: prospect.contact_email || undefined,
                phone: prospect.phone || undefined,
                company: prospect.business_name || undefined,
                lead_status: 'converted',
                properties: prospect.address ? [{
                    address_line1: prospect.address,
                    city: '', zip_code: '', property_type: 'commercial'
                }] : []
            };

            const newCustomer = await createCustomer(customerPayload);

            // Navigate to new estimate with the customer pre-selected
            navigate(`/admin/estimates/new?customer=${newCustomer.id || newCustomer._id}`);
        } catch (err: any) {
            console.error(err);
            alert(`Failed to convert prospect to customer automatically: ${err.message}`);
        } finally {
            setConvertingId(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Prospects</h1>
                    <p className="text-sm text-gray-500 mt-1">{prospects.length} saved prospects for outreach</p>
                </div>
                <button onClick={fetchProspects} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{error}</div>
            )}

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
                </div>
            ) : prospects.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
                    <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Prospects Yet</h3>
                    <p className="text-sm text-gray-500">Use the Lead Scanner to search for businesses and save them as prospects.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {prospects.map((prospect) => (
                        <div key={prospect.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            {/* Main Row */}
                            <div className="px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Building2 className="w-5 h-5 text-sky-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="font-semibold text-gray-900 text-sm truncate">{prospect.business_name}</div>
                                        <div className="text-xs text-gray-400 truncate">{prospect.business_category} • {prospect.address}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {/* Status Badge */}
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[prospect.outreach_status] || 'bg-gray-100 text-gray-700'}`}>
                                        {STATUS_LABELS[prospect.outreach_status] || prospect.outreach_status}
                                    </span>

                                    {/* Contact info indicators */}
                                    {prospect.contact_email && <span aria-label="Has email"><Mail className="w-4 h-4 text-emerald-500" /></span>}
                                    {prospect.phone && <span aria-label="Has phone"><Phone className="w-4 h-4 text-blue-500" /></span>}
                                    {prospect.rating && (
                                        <div className="flex items-center gap-0.5">
                                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                            <span className="text-xs text-gray-500">{prospect.rating}</span>
                                        </div>
                                    )}

                                    {/* Action buttons */}
                                    <button onClick={() => handleEdit(prospect)} className="p-1.5 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors" title="Edit contact info">
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleComposeEmail(prospect)} className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Compose email">
                                        <Mail className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleViewHistory(prospect.id)} className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Outreach history">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => setExpandedId(expandedId === prospect.id ? null : prospect.id)} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
                                        {expandedId === prospect.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => navigate('/admin/customers/new', { state: { prospect } })}
                                        className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                        title="Convert to Customer"
                                    >
                                        <UserPlus className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleCreateEstimate(prospect)}
                                        disabled={convertingId === prospect.id}
                                        className="p-1.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50"
                                        title="Create Estimate (auto-converts to Customer)"
                                    >
                                        {convertingId === prospect.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                                    </button>
                                    <button onClick={() => handleDelete(prospect.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Expanded Details */}
                            {expandedId === prospect.id && (
                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col gap-4 text-sm">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div>
                                            <span className="text-gray-400 text-xs block">Contact</span>
                                            <span className="text-gray-800 font-medium">{prospect.contact_name || '—'}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 text-xs block">Email</span>
                                            <span className="text-gray-800">{prospect.contact_email || '—'}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 text-xs block">Phone</span>
                                            {prospect.phone ? (
                                                <a href={`tel:${prospect.phone}`} className="text-sky-600 hover:underline">{prospect.phone}</a>
                                            ) : '—'}
                                        </div>
                                        <div>
                                            <span className="text-gray-400 text-xs block">Website</span>
                                            {prospect.website ? (
                                                <a href={prospect.website} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline flex items-center gap-1">
                                                    <Globe className="w-3 h-3" /> Visit site
                                                </a>
                                            ) : '—'}
                                        </div>
                                        {prospect.notes && (
                                            <div className="col-span-full">
                                                <span className="text-gray-400 text-xs block">Notes</span>
                                                <span className="text-gray-700">{prospect.notes}</span>
                                            </div>
                                        )}
                                        <div className="col-span-full text-xs text-gray-400">
                                            Emails sent: {prospect.emails_sent} • Last contacted: {prospect.last_contacted_at ? new Date(prospect.last_contacted_at).toLocaleDateString() : 'Never'}
                                        </div>
                                    </div>

                                    {/* Auto-discovered emails */}
                                    {prospect.website && (
                                        <div className="mt-2 pt-4 border-t border-gray-200">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                                                    <Globe className="w-4 h-4 text-sky-500" />
                                                    Discovered Emails
                                                </h4>
                                                <button
                                                    onClick={() => handleFindEmails(prospect)}
                                                    disabled={findingEmailsFor === prospect.id}
                                                    className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                                                >
                                                    {findingEmailsFor === prospect.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Search className="w-3 h-3" />}
                                                    {findingEmailsFor === prospect.id ? 'Scraping...' : 'Find Emails via AI'}
                                                </button>
                                            </div>

                                            {!prospect.found_emails || prospect.found_emails.length === 0 ? (
                                                <p className="text-xs text-gray-500 italic">No emails discovered yet or none found on website.</p>
                                            ) : (
                                                <div className="flex flex-wrap gap-2">
                                                    {prospect.found_emails.map((fe, idx) => (
                                                        <div key={idx} className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
                                                            <div className="flex flex-col">
                                                                <span className="text-xs font-medium text-gray-800">{fe.email}</span>
                                                                <span className="text-[10px] text-gray-400">Score {fe.confidence} • {fe.source}</span>
                                                            </div>
                                                            <button
                                                                onClick={() => {
                                                                    handleEdit(prospect);
                                                                    setEditForm(prev => ({ ...prev, contact_email: fe.email }));
                                                                }}
                                                                title="Use this email"
                                                                className="ml-1 p-1 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-full transition-colors"
                                                            >
                                                                <Check className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Edit Form */}
                            {editingId === prospect.id && (
                                <div className="px-6 py-4 bg-blue-50 border-t border-blue-100">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                        <div>
                                            <label className="text-xs font-medium text-gray-600 block mb-1">Contact Name</label>
                                            <input type="text" value={editForm.contact_name} onChange={(e) => setEditForm({ ...editForm, contact_name: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Jane Smith" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-600 block mb-1">Contact Email</label>
                                            <input type="email" value={editForm.contact_email} onChange={(e) => setEditForm({ ...editForm, contact_email: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="jane@company.com" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-600 block mb-1">Title</label>
                                            <input type="text" value={editForm.contact_title} onChange={(e) => setEditForm({ ...editForm, contact_title: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Property Manager" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-600 block mb-1">Notes</label>
                                            <input type="text" value={editForm.notes} onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Spoke to receptionist..." />
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <button onClick={() => handleSaveEdit(prospect.id)} className="flex items-center gap-1 px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700">
                                            <Check className="w-3 h-3" /> Save
                                        </button>
                                        <button onClick={() => setEditingId(null)} className="flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300">
                                            <X className="w-3 h-3" /> Cancel
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Email Composer */}
                            {composingId === prospect.id && (
                                <div className="px-6 py-4 bg-emerald-50 border-t border-emerald-100">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="font-semibold text-gray-900 text-sm">Compose Outreach Email</h3>
                                        <button onClick={() => { setComposingId(null); setEmailResult(null); }} className="text-gray-400 hover:text-gray-600">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {emailLoading ? (
                                        <div className="flex items-center gap-2 py-4 text-gray-500 text-sm">
                                            <Loader2 className="w-4 h-4 animate-spin" /> Loading template...
                                        </div>
                                    ) : (
                                        <>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="text-xs font-medium text-gray-600 block mb-1">To</label>
                                                    <div className="text-sm text-gray-800 px-3 py-2 bg-white border rounded-lg">
                                                        {prospect.contact_email || <span className="text-red-500">⚠ No email — click Edit to add one</span>}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-medium text-gray-600 block mb-1">Subject</label>
                                                    <input type="text" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-medium text-gray-600 block mb-1">Body</label>
                                                    <textarea value={emailBody} onChange={(e) => setEmailBody(e.target.value)} rows={12} className="w-full px-3 py-2 border rounded-lg text-sm font-mono leading-relaxed" />
                                                </div>
                                            </div>

                                            {emailResult && (
                                                <div className={`mt-3 p-3 rounded-lg text-sm ${emailResult.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {emailResult.message}
                                                </div>
                                            )}

                                            <div className="flex gap-2 mt-3">
                                                <button
                                                    onClick={() => handleSendEmail(prospect)}
                                                    disabled={sendingEmail || !prospect.contact_email}
                                                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                                                >
                                                    {sendingEmail ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                                    {sendingEmail ? 'Sending...' : 'Send Email'}
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}

                            {/* Outreach History */}
                            {historyId === prospect.id && (
                                <div className="px-6 py-4 bg-purple-50 border-t border-purple-100">
                                    <h3 className="font-semibold text-gray-900 text-sm mb-3">Outreach History</h3>
                                    {history.length === 0 ? (
                                        <p className="text-sm text-gray-500">No emails sent yet.</p>
                                    ) : (
                                        <div className="space-y-2">
                                            {history.map((record) => (
                                                <div key={record.id} className="bg-white border rounded-lg p-3 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="font-medium text-gray-800">{record.subject}</span>
                                                        <span className="text-xs text-gray-400">{new Date(record.sent_at).toLocaleString()}</span>
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        To: {record.to_email} • Status: {record.status}
                                                        {record.dry_run && ' (dry run)'}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
