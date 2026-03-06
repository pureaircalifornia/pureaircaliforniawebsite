/**
 * Lead Scanner Page
 * Search Google Maps for businesses, save as prospects for outreach.
 * Shows existing prospect / outreach status for each search result.
 */
import React, { useState } from 'react';
import {
    Search, MapPin, Save, Star, Phone, Globe, Building2,
    Loader2, CheckCircle, Mail, Clock, UserCheck, XCircle, CalendarCheck, Eye
} from 'lucide-react';
import { searchBusinesses, saveProspect, checkProspectStatus, getProspects, updateProspectOutreach, sendProspectOutreach } from '@/utils/api';

const BUSINESS_CATEGORIES = [
    { value: 'Home Owner Association', label: 'Home Owner Associations (HOA)' },
    { value: 'Building Management Company', label: 'Building Management Companies' },
    { value: 'Hotel', label: 'Hotels' },
    { value: 'Senior Living / Assisted Living', label: 'Senior Living / Assisted Living' },
    { value: 'Hospital / Medical Facility', label: 'Hospitals / Medical Facilities' },
    { value: 'Restaurant', label: 'Restaurants' },
    { value: 'Property Management Company', label: 'Property Managers' },
    { value: 'Office Building', label: 'Office Buildings' },
    { value: 'School / University', label: 'Schools / Universities' },
    { value: 'Gym / Fitness Center', label: 'Gyms / Fitness Centers' },
    { value: 'Shopping Center / Mall', label: 'Shopping Centers / Malls' },
    { value: 'Warehouse / Industrial', label: 'Warehouses / Industrial' },
    { value: 'Church / Religious Building', label: 'Churches / Religious Buildings' },
    { value: 'Daycare / Childcare Center', label: 'Daycares / Childcare Centers' },
    { value: 'Other', label: 'Other' },
];

interface PlaceSearchResult {
    name: string;
    address: string;
    rating?: number;
    total_ratings?: number;
    business_status?: string;
    phone?: string;
    website?: string;
    email?: string | null;
    place_id: string;
}

type ProspectInfo = {
    prospect_id: string;
    outreach_status: string;
    emails_sent: number;
    last_contacted_at?: string;
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: any }> = {
    not_contacted: { label: 'Prospect (Not Contacted)', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', icon: Eye },
    email_sent: { label: 'Email Sent', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', icon: Mail },
    email_opened: { label: 'Email Opened', color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200', icon: Mail },
    replied: { label: 'Replied', color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200', icon: Mail },
    interested: { label: 'Interested', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', icon: UserCheck },
    not_interested: { label: 'Not Interested', color: 'text-red-700', bg: 'bg-red-50 border-red-200', icon: XCircle },
    meeting_scheduled: { label: 'Meeting Scheduled', color: 'text-sky-700', bg: 'bg-sky-50 border-sky-200', icon: CalendarCheck },
    converted: { label: 'Converted ✓', color: 'text-emerald-700', bg: 'bg-emerald-100 border-emerald-300', icon: CheckCircle },
};

export default function LeadScanner() {
    const [category, setCategory] = useState(BUSINESS_CATEGORIES[0].value);
    const [location, setLocation] = useState('Los Angeles, CA');
    const [radius, setRadius] = useState(25);
    const [customQuery, setCustomQuery] = useState('');
    const [results, setResults] = useState<PlaceSearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
    const [savingId, setSavingId] = useState<string | null>(null);
    // Prospect status map: place_id -> ProspectInfo
    const [prospectMap, setProspectMap] = useState<Record<string, ProspectInfo>>({});

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        setResults([]);
        setSavedIds(new Set());
        setProspectMap({});

        try {
            const data = await searchBusinesses({
                query: customQuery || '',
                category,
                location,
                radius_miles: radius,
            });
            setResults(data);

            if (data.length === 0) {
                setError('No businesses found. Try adjusting your search criteria.');
            } else {
                // Cross-reference with existing prospects
                const placeIds = data.map(r => r.place_id).filter(Boolean);
                if (placeIds.length > 0) {
                    try {
                        const { status_map } = await checkProspectStatus(placeIds);
                        setProspectMap(status_map || {});
                        // Pre-populate savedIds for businesses already saved as prospects
                        const alreadySaved = new Set<string>();
                        for (const pid of Object.keys(status_map || {})) {
                            alreadySaved.add(pid);
                        }
                        setSavedIds(alreadySaved);
                    } catch (err) {
                        console.warn('Could not check prospect statuses:', err);
                    }
                }
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Search failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (result: PlaceSearchResult) => {
        setSavingId(result.place_id);
        try {
            await saveProspect({
                business_name: result.name,
                business_category: category,
                address: result.address,
                phone: result.phone,
                website: result.website,
                email: result.email,
                rating: result.rating,
                total_ratings: result.total_ratings,
                place_id: result.place_id,
            });
            setSavedIds(prev => new Set(prev).add(result.place_id));
            setProspectMap(prev => ({
                ...prev,
                [result.place_id]: {
                    prospect_id: '',
                    outreach_status: 'not_contacted',
                    emails_sent: 0,
                },
            }));
        } catch (err) {
            console.error('Failed to save prospect:', err);
        } finally {
            setSavingId(null);
        }
    };

    const handleSaveAll = async () => {
        for (const result of results) {
            if (!savedIds.has(result.place_id)) {
                await handleSave(result);
            }
        }
    };

    const unsavedCount = results.filter(r => !savedIds.has(r.place_id)).length;

    const renderStatusBadge = (placeId: string) => {
        const info = prospectMap[placeId];
        if (!info) return null;

        const cfg = STATUS_CONFIG[info.outreach_status] || STATUS_CONFIG.not_contacted;
        const Icon = cfg.icon;

        return (
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${cfg.bg} ${cfg.color}`}>
                <Icon className="w-3 h-3" />
                {cfg.label}
                {info.emails_sent > 0 && (
                    <span className="ml-1 opacity-70">({info.emails_sent} sent)</span>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Lead Scanner</h1>
                    <p className="text-sm text-gray-500 mt-1">Search Google Maps for potential commercial clients</p>
                </div>
            </div>

            {/* Search Controls */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Business Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
                        >
                            {BUSINESS_CATEGORIES.map((cat) => (
                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Los Angeles, CA"
                                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                            />
                        </div>
                    </div>

                    {/* Radius */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Radius: {radius} miles</label>
                        <input
                            type="range"
                            min={5}
                            max={50}
                            value={radius}
                            onChange={(e) => setRadius(parseInt(e.target.value))}
                            className="w-full mt-2 accent-sky-500"
                        />
                    </div>

                    {/* Custom Query */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Custom Search (optional)</label>
                        <input
                            type="text"
                            value={customQuery}
                            onChange={(e) => setCustomQuery(e.target.value)}
                            placeholder="e.g., luxury hotel Beverly Hills"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        />
                    </div>
                </div>

                <div className="flex gap-3 mt-4">
                    <button
                        onClick={handleSearch}
                        disabled={loading}
                        className="flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                        {loading ? 'Searching...' : 'Search Google Maps'}
                    </button>

                    {results.length > 0 && unsavedCount > 0 && (
                        <button
                            onClick={handleSaveAll}
                            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            Save All ({unsavedCount} remaining)
                        </button>
                    )}
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                    {error}
                </div>
            )}

            {/* Results */}
            {results.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Search Results ({results.length})
                        </h2>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                            {Object.keys(prospectMap).length > 0 && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-200">
                                    <Eye className="w-3 h-3" />
                                    {Object.keys(prospectMap).length} already saved as prospects
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Business</th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Address</th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Info</th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {results.map((result) => (
                                    <tr
                                        key={result.place_id}
                                        className={`hover:bg-gray-50 transition-colors ${prospectMap[result.place_id] ? 'bg-sky-50/30' : ''}`}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <Building2 className="w-5 h-5 text-sky-600" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900 text-sm">{result.name}</div>
                                                    <div className="text-xs text-gray-400">{result.business_status}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{result.address}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-2">
                                                {result.phone ? (
                                                    <a href={`tel:${result.phone}`} className="flex items-center gap-1 text-sm text-sky-600 hover:text-sky-700">
                                                        <Phone className="w-3 h-3" />
                                                        {result.phone}
                                                    </a>
                                                ) : (
                                                    <span className="text-sm text-gray-400">— Phone</span>
                                                )}
                                                {result.website ? (
                                                    <a href={result.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-sky-600 hover:text-sky-700">
                                                        <Globe className="w-3 h-3" />
                                                        Website
                                                    </a>
                                                ) : (
                                                    <span className="text-sm text-gray-400">— Website</span>
                                                )}
                                                {result.email && (
                                                    <a href={`mailto:${result.email}`} className="flex items-center gap-1.5 text-gray-600 hover:text-sky-600 truncate bg-sky-50 px-2 py-0.5 rounded-full" title={result.email}>
                                                        <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                                                        <span className="truncate">{result.email}</span>
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {result.rating ? (
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                                    <span className="text-sm font-medium text-gray-700">{result.rating}</span>
                                                    <span className="text-xs text-gray-400">({result.total_ratings})</span>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-400">—</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {renderStatusBadge(result.place_id)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {savedIds.has(result.place_id) ? (
                                                <span className="inline-flex items-center gap-1 text-sm text-emerald-600 font-medium">
                                                    <CheckCircle className="w-4 h-4" />
                                                    Saved
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => handleSave(result)}
                                                    disabled={savingId === result.place_id}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                                >
                                                    {savingId === result.place_id ? (
                                                        <Loader2 className="w-3 h-3 animate-spin" />
                                                    ) : (
                                                        <Save className="w-3 h-3" />
                                                    )}
                                                    Save
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!loading && results.length === 0 && !error && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
                    <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-sky-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Search for Businesses</h3>
                    <p className="text-sm text-gray-500 max-w-md mx-auto">
                        Select a business category and location, then click "Search Google Maps" to find potential clients for air duct cleaning services.
                    </p>
                </div>
            )}
        </div>
    );
}
