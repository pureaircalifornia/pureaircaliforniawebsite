/**
 * Prospects
 * The outreach pipeline: every saved business, ranked, with one-click email,
 * call and outcome logging, bulk sequence control and the funnel numbers.
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Loader2, Pause, Play, RefreshCw } from 'lucide-react';
import { createCustomer } from '@/utils/api';
import {
    deleteProspect, getOutreachStats, getProspects, startSequences, stopSequences,
    type OutreachStats, type Prospect,
} from '@/utils/outreachApi';
import { PIPELINE_FILTERS, type PipelineFilter } from './outreach/constants';
import ProspectCard from './outreach/ProspectCard';
import StatsStrip from './outreach/StatsStrip';

type Sort = 'score' | 'recent' | 'next_touch';
const PAGE_SIZE = 500;

export default function Prospects() {
    const navigate = useNavigate();
    const [prospects, setProspects] = useState<Prospect[]>([]);
    const [stats, setStats] = useState<OutreachStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [notice, setNotice] = useState<string | null>(null);
    const [filter, setFilter] = useState<PipelineFilter>('all');
    const [sort, setSort] = useState<Sort>('score');
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [busy, setBusy] = useState(false);

    const load = useCallback(async (quiet = false) => {
        if (!quiet) setLoading(true);
        setError(null);
        try {
            const [list, funnel] = await Promise.all([
                getProspects({ limit: PAGE_SIZE, sort }),
                getOutreachStats().catch(() => null),
            ]);
            setProspects(list);
            setStats(funnel);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load prospects.');
        } finally {
            setLoading(false);
        }
    }, [sort]);

    useEffect(() => { load(); }, [load]);

    const counts = useMemo(() => Object.fromEntries(
        PIPELINE_FILTERS.map((f) => [f.key, prospects.filter(f.test).length]),
    ) as Record<PipelineFilter, number>, [prospects]);

    const visible = useMemo(() => {
        const test = PIPELINE_FILTERS.find((f) => f.key === filter)?.test ?? (() => true);
        return prospects.filter(test);
    }, [prospects, filter]);

    const toggleSelect = (id: string) => setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id); else next.add(id);
        return next;
    });
    const allVisibleSelected = visible.length > 0 && visible.every((p) => selected.has(p.id));
    const toggleAll = () => setSelected(allVisibleSelected ? new Set() : new Set(visible.map((p) => p.id)));

    const replace = (updated: Prospect) =>
        setProspects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));

    const handleStart = async () => {
        setBusy(true);
        setNotice(null);
        setError(null);
        try {
            const result = await startSequences(Array.from(selected));
            const skipped = result.skipped.length
                ? ` ${result.skipped.length} skipped: ${result.skipped.slice(0, 3).map((s) => `${s.business_name} (${s.reason})`).join('; ')}${result.skipped.length > 3 ? '…' : ''}`
                : '';
            setNotice(`${result.queued.length} prospect${result.queued.length === 1 ? '' : 's'} queued. ` +
                `The first email goes out in the next weekday send window, then follow-ups on day 3, 7 and 14.${skipped}`);
            setSelected(new Set());
            await load(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Could not start the sequence.');
        } finally {
            setBusy(false);
        }
    };

    const handlePause = async () => {
        setBusy(true);
        setNotice(null);
        try {
            const result = await stopSequences(Array.from(selected));
            setNotice(`Paused automatic emails for ${result.paused} prospect${result.paused === 1 ? '' : 's'}.`);
            setSelected(new Set());
            await load(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Could not pause.');
        } finally {
            setBusy(false);
        }
    };

    const handleDelete = async (prospect: Prospect) => {
        if (!window.confirm(`Delete ${prospect.business_name}? This cannot be undone.`)) return;
        try {
            await deleteProspect(prospect.id);
            setProspects((prev) => prev.filter((p) => p.id !== prospect.id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Could not delete.');
        }
    };

    const handleEstimate = async (prospect: Prospect) => {
        try {
            const parts = (prospect.contact_name || '').trim().split(' ');
            const customer = await createCustomer({
                first_name: parts[0] || 'Unknown',
                last_name: parts.slice(1).join(' ') || 'Contact',
                email: prospect.contact_email || undefined,
                phone: prospect.phone || undefined,
                company: prospect.business_name || undefined,
                lead_status: 'converted',
                properties: prospect.address
                    ? [{ address_line1: prospect.address, city: '', zip_code: '', property_type: 'commercial' }]
                    : [],
            });
            navigate(`/admin/estimates/new?customer=${customer.id || customer._id}`);
        } catch (err) {
            setError(err instanceof Error ? `Could not create the customer: ${err.message}` : 'Could not create the customer.');
        }
    };

    return (
        <div className="space-y-5">
            <div className="flex flex-wrap justify-between items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Prospects</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {prospects.length} saved · {counts.ready} ready to email · {counts.sequence} in sequence · {counts.booked} booked
                    </p>
                </div>
                <button onClick={() => load()} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" /> Refresh
                </button>
            </div>

            <StatsStrip stats={stats} />

            {prospects.length >= PAGE_SIZE && (
                <div role="status" className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-amber-900 text-sm">
                    Showing the first {PAGE_SIZE} prospects in this order. Change the sort to see others.
                </div>
            )}

            {error && <div role="alert" className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{error}</div>}
            {notice && <div role="status" className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-emerald-800 text-sm">{notice}</div>}

            <div className="flex flex-wrap items-center gap-2">
                {PIPELINE_FILTERS.map((f) => (
                    <button key={f.key} onClick={() => { setFilter(f.key); setSelected(new Set()); }} aria-pressed={filter === f.key}
                        className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${filter === f.key ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}>
                        {f.label} <span className={filter === f.key ? 'text-gray-300' : 'text-gray-400'}>{counts[f.key]}</span>
                    </button>
                ))}
                <label className="ml-auto flex items-center gap-2 text-sm text-gray-600">
                    Sort
                    <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="px-2 py-1.5 border border-gray-300 rounded-lg bg-white text-sm">
                        <option value="score">Best fit first</option>
                        <option value="recent">Newest first</option>
                        <option value="next_touch">Next email due</option>
                    </select>
                </label>
            </div>

            {visible.length > 0 && (
                <div className="flex flex-wrap items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" checked={allVisibleSelected} onChange={toggleAll} className="accent-sky-600" />
                        {selected.size > 0 ? `${selected.size} selected` : 'Select all shown'}
                    </label>
                    <button onClick={handleStart} disabled={busy || selected.size === 0}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-40">
                        {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />} Start automatic sequence
                    </button>
                    <button onClick={handlePause} disabled={busy || selected.size === 0}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40">
                        <Pause className="w-4 h-4" aria-hidden="true" /> Pause
                    </button>
                    <span className="text-xs text-gray-500">Only prospects with a confirmed, published email are queued; the rest are reported back. Replies arrive in your inbox: record them under Outcome so the follow-ups stop.</span>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 text-sky-500 animate-spin" /></div>
            ) : visible.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
                    <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {prospects.length === 0 ? 'No prospects yet' : 'Nothing in this view'}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {prospects.length === 0
                            ? 'Use the Lead Scanner to find businesses and save the good ones here.'
                            : 'Pick another filter above.'}
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {visible.map((prospect) => (
                        <ProspectCard
                            key={prospect.id}
                            prospect={prospect}
                            selected={selected.has(prospect.id)}
                            onSelect={toggleSelect}
                            onChanged={replace}
                            onReload={() => load(true)}
                            onDelete={handleDelete}
                            onConvert={(p) => navigate('/admin/customers/new', { state: { prospect: p } })}
                            onEstimate={handleEstimate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
