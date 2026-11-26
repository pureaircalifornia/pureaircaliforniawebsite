/**
 * Lead Scanner
 * Search Google Maps (or OpenStreetMap, when Google is unavailable) for
 * businesses, ranked by how good a prospect each one is, and save the best
 * ones to the Prospects pipeline in bulk.
 */
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    AlertTriangle, ArrowRight, Building2, CheckCircle, Globe, Loader2, MapPin, Phone, Save, Search, Star,
} from 'lucide-react';
import {
    checkProspectStatus, safeUrl, saveProspectsBulk, searchBusinesses,
    type PlaceSearchResult, type ProspectStatusInfo,
} from '@/utils/outreachApi';
import { BUSINESS_CATEGORIES, dialable, scoreClass, statusInfo } from './outreach/constants';

const RESULT_SIZES = [10, 20, 40, 60];

export default function LeadScanner() {
    const [category, setCategory] = useState(BUSINESS_CATEGORIES[0].value);
    const [location, setLocation] = useState('Los Angeles, CA');
    const [radius, setRadius] = useState(25);
    const [maxResults, setMaxResults] = useState(20);
    const [customQuery, setCustomQuery] = useState('');
    const [searchedCategory, setSearchedCategory] = useState(category);

    const [results, setResults] = useState<PlaceSearchResult[]>([]);
    const [saved, setSaved] = useState<Record<string, ProspectStatusInfo>>({});
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [websiteOnly, setWebsiteOnly] = useState(false);

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [notice, setNotice] = useState<string | null>(null);
    const [searched, setSearched] = useState(false);

    const needsCustomQuery = category === 'other' && !customQuery.trim();
    const visible = useMemo(
        () => (websiteOnly ? results.filter((r) => r.website) : results),
        [results, websiteOnly],
    );
    const backupNote = results.find((r) => r.source === 'openstreetmap')?.source_note;
    const selectable = visible.filter((r) => !saved[r.place_id]);
    const allSelected = selectable.length > 0 && selectable.every((r) => selected.has(r.place_id));

    const handleSearch = async (event?: React.FormEvent) => {
        event?.preventDefault();
        if (needsCustomQuery) {
            setError('Type what to search for when the category is "Other".');
            return;
        }
        setLoading(true);
        setError(null);
        setNotice(null);
        setResults([]);
        setSaved({});
        setSelected(new Set());
        try {
            const data = await searchBusinesses({
                query: customQuery.trim() || undefined,
                category,
                location: location.trim(),
                radius_miles: radius,
                max_results: maxResults,
            });
            setResults(data);
            setSearchedCategory(category);
            setSearched(true);

            let statusMap: Record<string, ProspectStatusInfo> = {};
            if (data.length > 0) {
                try {
                    statusMap = (await checkProspectStatus(data.map((r) => r.place_id))).status_map || {};
                } catch {
                    // Saving still de-duplicates on the server; the badges are a convenience.
                }
            }
            setSaved(statusMap);
            // Pre-select the strong prospects that are not saved yet.
            setSelected(new Set(data.filter((r) => r.fit_score >= 60 && !statusMap[r.place_id]).map((r) => r.place_id)));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Search failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const toggle = (placeId: string) => {
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(placeId)) next.delete(placeId); else next.add(placeId);
            return next;
        });
    };

    const toggleAll = () => {
        setSelected(allSelected ? new Set() : new Set(selectable.map((r) => r.place_id)));
    };

    const handleSaveSelected = async () => {
        const chosen = results.filter((r) => selected.has(r.place_id) && !saved[r.place_id]);
        if (chosen.length === 0) return;
        setSaving(true);
        setError(null);
        try {
            const response = await saveProspectsBulk(chosen.map((r) => ({
                business_name: r.name,
                business_category: searchedCategory,
                address: r.address,
                phone: r.phone,
                website: r.website,
                rating: r.rating,
                total_ratings: r.total_ratings,
                place_id: r.place_id,
                business_status: r.business_status,
                types: r.types,
            })));
            setSaved((prev) => {
                const next = { ...prev };
                response.saved.forEach((p) => {
                    if (p.place_id) {
                        next[p.place_id] = { prospect_id: p.id, outreach_status: p.outreach_status, emails_sent: p.emails_sent };
                    }
                });
                return next;
            });
            setSelected(new Set());
            setNotice(`Saved ${response.created} prospect${response.created === 1 ? '' : 's'}. ` +
                'Their websites are being read for a contact email now; it takes a minute or two.');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Could not save the selected businesses.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Lead Scanner</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Find businesses on Google Maps, ranked by fit. Save the good ones and their contact details are looked up automatically.
                    If Google is unavailable, the free OpenStreetMap map is searched instead.
                </p>
            </div>

            <form onSubmit={handleSearch} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div>
                        <label htmlFor="scan-category" className="block text-sm font-medium text-gray-700 mb-1">Business type</label>
                        <select id="scan-category" value={category} onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white">
                            {BUSINESS_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="scan-location" className="block text-sm font-medium text-gray-700 mb-1">City or ZIP</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                            <input id="scan-location" type="text" required value={location} onChange={(e) => setLocation(e.target.value)}
                                placeholder="Los Angeles, CA"
                                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="scan-radius" className="block text-sm font-medium text-gray-700 mb-1">Within {radius} miles</label>
                        <input id="scan-radius" type="range" min={5} max={50} step={5} value={radius}
                            onChange={(e) => setRadius(parseInt(e.target.value, 10))} className="w-full mt-2 accent-sky-500" />
                    </div>
                    <div>
                        <label htmlFor="scan-size" className="block text-sm font-medium text-gray-700 mb-1">How many</label>
                        <select id="scan-size" value={maxResults} onChange={(e) => setMaxResults(parseInt(e.target.value, 10))}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white">
                            {RESULT_SIZES.map((n) => <option key={n} value={n}>{n} businesses</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="scan-query" className="block text-sm font-medium text-gray-700 mb-1">
                            Custom search {category === 'other' ? '(required)' : '(optional)'}
                        </label>
                        <input id="scan-query" type="text" value={customQuery} onChange={(e) => setCustomQuery(e.target.value)}
                            placeholder="e.g. luxury apartment complex"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-4">
                    <button type="submit" disabled={loading}
                        className="flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                        {loading ? 'Searching…' : 'Search'}
                    </button>
                    {loading && (
                        <span className="text-xs text-gray-500">
                            {maxResults > 20 ? 'Larger searches run several queries and can take 20–30 seconds. ' : ''}
                            If Google is off, the backup map can take a minute or more.
                        </span>
                    )}
                </div>
            </form>

            {error && <div role="alert" className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{error}</div>}
            {notice && (
                <div role="status" className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-emerald-800 text-sm flex flex-wrap items-center justify-between gap-3">
                    <span>{notice}</span>
                    <Link to="/admin/prospects" className="inline-flex items-center gap-1 font-medium text-emerald-800 underline">
                        Go to Prospects <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            )}

            {backupNote && (
                <div role="status" className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-900 text-sm flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-500" aria-hidden="true" />
                    <span>{backupNote}</span>
                </div>
            )}

            {results.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">{visible.length} businesses, best fit first</h2>
                            <p className="text-xs text-gray-500 mt-0.5">
                                Closed businesses and anything outside the radius are already removed.
                                {Object.keys(saved).length > 0 && ` ${Object.keys(saved).length} already in your prospects.`}
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <label className="flex items-center gap-2 text-sm text-gray-600">
                                <input type="checkbox" checked={websiteOnly} onChange={(e) => setWebsiteOnly(e.target.checked)} className="accent-sky-600" />
                                Has a website
                            </label>
                            <button onClick={handleSaveSelected} disabled={saving || selected.size === 0}
                                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Save {selected.size || ''} selected
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="px-4 py-3 w-10">
                                        <input type="checkbox" checked={allSelected} onChange={toggleAll} disabled={selectable.length === 0}
                                            aria-label="Select all unsaved businesses" className="accent-sky-600" />
                                    </th>
                                    <th className="px-4 py-3">Fit</th>
                                    <th className="px-4 py-3">Business</th>
                                    <th className="px-4 py-3">Contact</th>
                                    <th className="px-4 py-3">Reviews</th>
                                    <th className="px-4 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {visible.map((result) => {
                                    const existing = saved[result.place_id];
                                    const info = existing ? statusInfo(existing.outreach_status) : null;
                                    return (
                                        <tr key={result.place_id} className={`hover:bg-gray-50 transition-colors ${existing ? 'bg-gray-50/60' : ''}`}>
                                            <td className="px-4 py-4">
                                                {existing ? (
                                                    <CheckCircle className="w-4 h-4 text-emerald-500" aria-label="Already saved" />
                                                ) : (
                                                    <input type="checkbox" checked={selected.has(result.place_id)} onChange={() => toggle(result.place_id)}
                                                        aria-label={`Select ${result.name}`} className="accent-sky-600" />
                                                )}
                                            </td>
                                            <td className="px-4 py-4">
                                                <span title={result.fit_reasons.join('\n')}
                                                    className={`inline-flex items-center justify-center min-w-[2.5rem] px-2 py-1 rounded-md border text-sm font-semibold ${scoreClass(result.fit_score)}`}>
                                                    {result.fit_score}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-9 h-9 bg-sky-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <Building2 className="w-4 h-4 text-sky-600" aria-hidden="true" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="font-semibold text-gray-900 text-sm">{result.name}</div>
                                                        <div className="text-xs text-gray-500 max-w-xs truncate">{result.address}</div>
                                                        <div className="text-xs text-gray-400 mt-0.5">
                                                            {result.distance_miles != null && `${result.distance_miles} mi · `}
                                                            {result.fit_reasons[0]}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm">
                                                <div className="flex flex-col gap-1">
                                                    {result.phone
                                                        ? <a href={`tel:${dialable(result.phone)}`} className="inline-flex items-center gap-1 text-sky-600 hover:text-sky-700"><Phone className="w-3 h-3" />{result.phone}</a>
                                                        : <span className="text-gray-400">No phone</span>}
                                                    {safeUrl(result.website)
                                                        ? <a href={safeUrl(result.website)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sky-600 hover:text-sky-700"><Globe className="w-3 h-3" />Website</a>
                                                        : <span className="text-gray-400">No website</span>}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm">
                                                {result.rating
                                                    ? <span className="inline-flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />{result.rating}<span className="text-xs text-gray-400">({result.total_ratings})</span></span>
                                                    : <span className="text-gray-400">{result.source === 'openstreetmap' ? 'Not listed' : 'None'}</span>}
                                            </td>
                                            <td className="px-4 py-4">
                                                {info && <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${info.className}`}>Saved · {info.label}</span>}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {!loading && results.length === 0 && !error && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
                    <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-sky-400" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {searched ? 'No businesses found' : 'Start with a business type and a city'}
                    </h3>
                    <p className="text-sm text-gray-500 max-w-md mx-auto">
                        {searched
                            ? 'Try a wider radius, a nearby city, or a custom search phrase.'
                            : 'Results come back ranked: property types with the most vents and ducts, and businesses you can actually reach, are at the top.'}
                    </p>
                </div>
            )}
        </div>
    );
}
