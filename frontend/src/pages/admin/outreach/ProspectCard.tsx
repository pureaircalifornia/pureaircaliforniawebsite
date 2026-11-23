/**
 * One prospect in the pipeline: who they are, how reachable they are, where
 * they stand, and the three things you do next (email, call, record outcome).
 */
import React, { useEffect, useState } from 'react';
import {
    Building2, ChevronDown, ChevronUp, FileText, Globe, Loader2, Mail, Pencil, Phone,
    Search, Trash2, UserPlus,
} from 'lucide-react';
import {
    findEmails, getOutreachHistory, normalizeFoundEmails, safeUrl, updateProspect,
    type OutreachRecord, type OutreachStatus, type Prospect, type ProspectUpdate,
} from '@/utils/outreachApi';
import {
    GRADE, OUTCOMES, SEQUENCE_STEPS, categoryLabel, dialable, formatDate, scoreClass, statusInfo,
} from './constants';
import EmailComposer from './EmailComposer';
import CallScriptPanel from './CallScriptPanel';

type Panel = 'details' | 'email' | 'call' | null;

interface Props {
    prospect: Prospect;
    selected: boolean;
    onSelect: (id: string) => void;
    onChanged: (prospect: Prospect) => void;
    onReload: () => void;
    onDelete: (prospect: Prospect) => void;
    onConvert: (prospect: Prospect) => void;
    onEstimate: (prospect: Prospect) => void;
}

function sequenceLabel(prospect: Prospect): string | null {
    const step = prospect.sequence_step ?? 0;
    switch (prospect.sequence_status) {
        case 'active':
            return step === 0
                ? 'Queued: first email goes out in the next send window'
                : `Touch ${step} of ${SEQUENCE_STEPS.length} sent · next ${formatDate(prospect.next_touch_at) || 'soon'}`;
        case 'completed': return 'Sequence finished, no reply';
        case 'paused': return step > 0 ? `Paused after touch ${step}` : null;
        default: return null;
    }
}

export default function ProspectCard({
    prospect, selected, onSelect, onChanged, onReload, onDelete, onConvert, onEstimate,
}: Props) {
    const [panel, setPanel] = useState<Panel>(null);
    const fromProspect = () => ({
        contact_name: prospect.contact_name || '',
        contact_email: prospect.contact_email || '',
        contact_title: prospect.contact_title || '',
        personal_note: prospect.personal_note || '',
        notes: prospect.notes || '',
    });
    const [form, setForm] = useState(fromProspect);
    const [history, setHistory] = useState<OutreachRecord[] | null>(null);
    const [saving, setSaving] = useState(false);

    // The record changes underneath the card (background contact lookup, a
    // reload after sending). Pick those values up unless the form is open and
    // possibly mid-edit.
    useEffect(() => {
        if (panel !== 'details') setForm(fromProspect());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prospect.contact_name, prospect.contact_email, prospect.contact_title, prospect.personal_note, prospect.notes]);

    // Load the email history whenever the details are open, and again after
    // every send, so it never shows "nothing sent" next to a sent email.
    useEffect(() => {
        if (panel !== 'details') return undefined;
        let cancelled = false;
        getOutreachHistory(prospect.id)
            .then((records) => { if (!cancelled) setHistory(records); })
            .catch(() => { if (!cancelled) setHistory([]); });
        return () => { cancelled = true; };
    }, [panel, prospect.id, prospect.emails_sent]);
    const [finding, setFinding] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const info = statusInfo(prospect.outreach_status);
    const website = safeUrl(prospect.website);
    const grade = prospect.contact_email && prospect.email_quality ? GRADE[prospect.email_quality] : null;
    const found = normalizeFoundEmails(prospect.found_emails);
    const sequence = sequenceLabel(prospect);
    const toggle = (next: Panel) => setPanel((current) => (current === next ? null : next));

    const openDetails = () => toggle('details');

    const save = async () => {
        setSaving(true);
        setError(null);
        try {
            const updates: ProspectUpdate = {};
            (Object.keys(form) as Array<keyof typeof form>).forEach((key) => {
                const value = form[key].trim();
                // An emptied field is sent as null so a wrong value can be removed.
                if (value !== (prospect[key] || '')) updates[key] = value || null;
            });
            if (Object.keys(updates).length > 0) onChanged(await updateProspect(prospect.id, updates));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Could not save changes.');
        } finally {
            setSaving(false);
        }
    };

    const recordOutcome = async (status: OutreachStatus) => {
        setError(null);
        try {
            onChanged(await updateProspect(prospect.id, { outreach_status: status }));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Could not update the status.');
        }
    };

    const lookUp = async () => {
        setFinding(true);
        setError(null);
        try {
            const result = await findEmails(prospect.id);
            onChanged(result.prospect);
            setForm((prev) => ({
                ...prev,
                contact_name: prev.contact_name || result.prospect.contact_name || '',
                contact_email: prev.contact_email || result.prospect.contact_email || '',
                contact_title: prev.contact_title || result.prospect.contact_title || '',
            }));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Could not read their website.');
        } finally {
            setFinding(false);
        }
    };

    return (
        <div className={`bg-white rounded-xl border shadow-sm overflow-hidden ${selected ? 'border-sky-400' : 'border-gray-200'}`}>
            <div className="px-4 sm:px-6 py-4 flex flex-wrap items-center gap-4">
                <input type="checkbox" checked={selected} onChange={() => onSelect(prospect.id)}
                    aria-label={`Select ${prospect.business_name}`} className="accent-sky-600" />
                <span title="Fit score: property type plus how reachable they are"
                    className={`inline-flex items-center justify-center min-w-[2.5rem] px-2 py-1 rounded-md border text-sm font-semibold ${scoreClass(prospect.fit_score)}`}>
                    {prospect.fit_score ?? 0}
                </span>
                <div className="w-9 h-9 bg-sky-50 rounded-lg hidden sm:flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4 text-sky-600" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1 basis-56">
                    <div className="font-semibold text-gray-900 text-sm truncate">{prospect.business_name}</div>
                    <div className="text-xs text-gray-500 truncate">{categoryLabel(prospect.business_category)} · {prospect.address}</div>
                    <div className="text-xs mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                        {prospect.contact_email ? (
                            <>
                                <span className="text-gray-700">
                                    {prospect.contact_name ? `${prospect.contact_name}${prospect.contact_title ? `, ${prospect.contact_title}` : ''} · ` : ''}
                                    {prospect.contact_email}
                                </span>
                                {grade && <span title={grade.hint} className={`px-1.5 py-0.5 rounded border ${grade.className}`}>{grade.label}</span>}
                            </>
                        ) : (
                            <span className="text-amber-700">
                                {prospect.enriched_at || !prospect.website ? 'No email found. Call, or add one by hand.' : 'Looking up contact details…'}
                            </span>
                        )}
                    </div>
                    {sequence && <div className="text-xs text-sky-700 mt-1">{sequence}</div>}
                    {prospect.booking_contact && (
                        <div className="text-xs text-amber-800 mt-1">
                            Requested by {prospect.booking_contact.name}, {prospect.booking_contact.phone}. See Leads for details.
                        </div>
                    )}
                </div>

                <span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${info.className}`}>{info.label}</span>

                <div className="flex items-center gap-2">
                    <button onClick={() => toggle('email')} aria-expanded={panel === 'email'}
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">
                        <Mail className="w-4 h-4" aria-hidden="true" /> Email
                    </button>
                    <button onClick={() => toggle('call')} aria-expanded={panel === 'call'} disabled={!prospect.phone}
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 disabled:opacity-40">
                        <Phone className="w-4 h-4" aria-hidden="true" /> Call
                    </button>
                    <select aria-label={`Record an outcome for ${prospect.business_name}`} value=""
                        onChange={(e) => { if (e.target.value) recordOutcome(e.target.value as OutreachStatus); }}
                        className="px-2 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700">
                        <option value="">Outcome…</option>
                        {OUTCOMES.map((o) => <option key={o.status} value={o.status}>{o.label}</option>)}
                    </select>
                    <button onClick={openDetails} aria-expanded={panel === 'details'} aria-label="Details and editing"
                        className="p-2 text-gray-400 hover:text-gray-700 rounded-lg">
                        {panel === 'details' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {error && <div role="alert" className="px-6 py-2 bg-red-50 text-red-700 text-sm border-t border-red-100">{error}</div>}

            {panel === 'email' && <EmailComposer prospect={prospect} onClose={() => setPanel(null)} onSent={onReload} />}
            {panel === 'call' && <CallScriptPanel prospect={prospect} onClose={() => setPanel(null)} onOutcome={recordOutcome} />}

            {panel === 'details' && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 space-y-5 text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                            <label htmlFor={`name-${prospect.id}`} className="text-xs font-medium text-gray-600 block mb-1">Contact name</label>
                            <input id={`name-${prospect.id}`} type="text" value={form.contact_name} maxLength={100}
                                onChange={(e) => setForm({ ...form, contact_name: e.target.value })} className="w-full px-3 py-2 border rounded-lg bg-white" placeholder="Jane Smith" />
                        </div>
                        <div>
                            <label htmlFor={`title-${prospect.id}`} className="text-xs font-medium text-gray-600 block mb-1">Job title (sets the tone of the emails)</label>
                            <input id={`title-${prospect.id}`} type="text" value={form.contact_title} maxLength={100}
                                onChange={(e) => setForm({ ...form, contact_title: e.target.value })} className="w-full px-3 py-2 border rounded-lg bg-white" placeholder="Property Manager" />
                        </div>
                        <div>
                            <label htmlFor={`email-${prospect.id}`} className="text-xs font-medium text-gray-600 block mb-1">Email</label>
                            <input id={`email-${prospect.id}`} type="email" value={form.contact_email}
                                onChange={(e) => setForm({ ...form, contact_email: e.target.value })} className="w-full px-3 py-2 border rounded-lg bg-white" placeholder="jane@company.com" />
                        </div>
                        <div className="md:col-span-3">
                            <label htmlFor={`note-${prospect.id}`} className="text-xs font-medium text-gray-600 block mb-1">
                                Personal opening line (optional, one true sentence about them; replaces the stock opener)
                            </label>
                            <input id={`note-${prospect.id}`} type="text" value={form.personal_note} maxLength={300}
                                onChange={(e) => setForm({ ...form, personal_note: e.target.value })} className="w-full px-3 py-2 border rounded-lg bg-white"
                                placeholder="I drove past the new building on Wilshire last week." />
                        </div>
                        <div className="md:col-span-3">
                            <label htmlFor={`notes-${prospect.id}`} className="text-xs font-medium text-gray-600 block mb-1">Private notes</label>
                            <input id={`notes-${prospect.id}`} type="text" value={form.notes} maxLength={2000}
                                onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full px-3 py-2 border rounded-lg bg-white" placeholder="Spoke to the front desk; manager is in on Tuesdays." />
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <button onClick={save} disabled={saving}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 disabled:opacity-50">
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Pencil className="w-4 h-4" />} Save changes
                        </button>
                        {website && (
                            <>
                                <button onClick={lookUp} disabled={finding}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50">
                                    {finding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                                    {finding ? 'Reading their website…' : 'Look up contacts again'}
                                </button>
                                <a href={website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sky-600 hover:underline">
                                    <Globe className="w-4 h-4" aria-hidden="true" /> Website
                                </a>
                            </>
                        )}
                        {prospect.phone && <a href={`tel:${dialable(prospect.phone)}`} className="inline-flex items-center gap-1 text-sky-600 hover:underline"><Phone className="w-4 h-4" aria-hidden="true" />{prospect.phone}</a>}
                    </div>

                    {found.length > 0 && (
                        <div>
                            <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Addresses found on their website</h4>
                            <div className="flex flex-wrap gap-2">
                                {found.map((entry) => {
                                    const g = entry.grade ? GRADE[entry.grade] : null;
                                    return (
                                        <button key={entry.email} title={g?.hint}
                                            onClick={() => setForm((prev) => ({
                                                ...prev, contact_email: entry.email,
                                                contact_name: entry.contact_name || prev.contact_name,
                                                contact_title: entry.contact_title || prev.contact_title,
                                            }))}
                                            className="text-left bg-white border border-gray-200 rounded-lg px-3 py-1.5 hover:border-sky-400">
                                            <span className="block text-xs font-medium text-gray-800">{entry.email}</span>
                                            <span className="block text-[11px] text-gray-500">
                                                {g ? g.label : 'Found'} · {entry.source}{entry.contact_name ? ` · ${entry.contact_name}` : ''}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                            {found.some((entry) => entry.grade === 'guessed' || entry.grade === 'other_domain') && (
                                <p className="text-xs text-amber-700 mt-2">
                                    Addresses marked Guess or Different domain are not confirmed. Only use one after checking it by phone: a bounced email hurts delivery of every other email you send. Saving one here counts as confirming it.
                                </p>
                            )}
                        </div>
                    )}

                    {prospect.found_contacts && prospect.found_contacts.length > 0 && (
                        <div>
                            <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">People listed on their website</h4>
                            <div className="flex flex-wrap gap-2">
                                {prospect.found_contacts.map((person) => (
                                    <button key={person.name} onClick={() => setForm((prev) => ({ ...prev, contact_name: person.name, contact_title: person.title }))}
                                        className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs hover:border-sky-400">
                                        <span className="font-medium text-gray-800">{person.name}</span> <span className="text-gray-500">{person.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Email history</h4>
                        {history === null ? <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                            : history.length === 0 ? <p className="text-gray-500">Nothing sent yet.</p>
                                : (
                                    <ul className="space-y-1">
                                        {history.map((record) => (
                                            <li key={record.id} className="bg-white border rounded-lg px-3 py-2 flex flex-wrap justify-between gap-2">
                                                <span className="text-gray-800">{record.subject}</span>
                                                <span className="text-xs text-gray-500">
                                                    {formatDate(record.sent_at)} · {record.status}
                                                    {record.automated ? ' · automatic' : ''}
                                                    {record.opened_at ? ' · opened' : ''}
                                                    {record.bounced_at ? ' · bounced' : ''}
                                                    {record.dry_run ? ' · dry run' : ''}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
                        <button onClick={() => onConvert(prospect)} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                            <UserPlus className="w-4 h-4" aria-hidden="true" /> Convert to customer
                        </button>
                        <button onClick={() => onEstimate(prospect)} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                            <FileText className="w-4 h-4" aria-hidden="true" /> Create estimate
                        </button>
                        <button onClick={() => onDelete(prospect)} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-red-200 rounded-lg text-red-600 hover:bg-red-50 ml-auto">
                            <Trash2 className="w-4 h-4" aria-hidden="true" /> Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
