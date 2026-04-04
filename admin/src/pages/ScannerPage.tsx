import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Radar, Search, MapPin, Globe, Phone, Star, Mail,
  Save, Send, Eye, ChevronDown, Loader2, Building2,
  ExternalLink, RefreshCw, X, Inbox, FileText, ArrowRight, BookmarkPlus,
} from 'lucide-react';
import api from '../api/client';

/* ── Types ────────────────────────────────────────────── */

interface PlaceResult {
  place_id: string;
  name?: string;
  business_name?: string;
  address: string;
  phone?: string;
  website?: string;
  rating?: number;
  total_ratings?: number;
  business_category?: string;
  types?: string[];
}

interface Prospect {
  id: string;
  place_id?: string;
  business_name: string;
  address?: string;
  phone?: string;
  website?: string;
  contact_email?: string;
  contact_name?: string;
  business_category: string;
  outreach_status: string;
  found_emails?: string[];
  emails_sent?: number;
  created_at: string;
  notes?: string;
}

interface EmailPreview {
  subject: string;
  body: string;
  prospect: { id: string; business_name: string; contact_name?: string; contact_email?: string };
}

/* ── Constants ────────────────────────────────────────── */

const CATEGORIES = [
  { value: 'hoa', label: 'Homeowner Associations' },
  { value: 'property_manager', label: 'Property Management' },
  { value: 'building_management', label: 'Facility Management' },
  { value: 'office_building', label: 'Office Buildings' },
  { value: 'restaurant', label: 'Restaurants' },
  { value: 'gym', label: 'Gyms & Fitness' },
  { value: 'salon', label: 'Salons & Spas' },
  { value: 'dental', label: 'Dental Offices' },
  { value: 'medical', label: 'Medical Facilities' },
  { value: 'hotel', label: 'Hotels' },
  { value: 'senior_living', label: 'Senior Living' },
  { value: 'school', label: 'Schools' },
  { value: 'daycare', label: 'Daycare Centers' },
  { value: 'church', label: 'Churches' },
  { value: 'retail', label: 'Retail Stores' },
  { value: 'warehouse', label: 'Warehouses' },
  { value: 'other', label: 'Other' },
];

const OUTREACH_LABELS: Record<string, { text: string; cls: string }> = {
  not_contacted: { text: 'Not Contacted', cls: 'bg-surface-700 text-surface-300' },
  email_sent: { text: 'Email Sent', cls: 'bg-blue-500/20 text-blue-400' },
  opened: { text: 'Opened (Hot)', cls: 'bg-yellow-500/20 text-yellow-400' },
  responded: { text: 'Responded', cls: 'bg-emerald-500/20 text-emerald-400' },
  follow_up: { text: 'Follow-up Required', cls: 'bg-orange-500/20 text-orange-400' },
  interested: { text: 'Interested', cls: 'bg-purple-500/20 text-purple-400' },
  not_interested: { text: 'Not Interested', cls: 'bg-red-500/20 text-red-400' },
  customer: { text: 'Customer', cls: 'bg-brand-500/20 text-brand-400' },
};

/* ── Component ────────────────────────────────────────── */

export default function ScannerPage() {
  const qc = useQueryClient();

  // Tab state
  const [tab, setTab] = useState<'search' | 'pipeline' | 'prospects' | 'outreach'>('search');

  // ---- Search state ----
  const [category, setCategory] = useState('restaurant');
  const [location, setLocation] = useState('Los Angeles, CA');
  const [radius, setRadius] = useState(10);
  const [customQuery, setCustomQuery] = useState('');
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [savedMap, setSavedMap] = useState<Record<string, string>>({});

  // ---- Outreach state ----
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [emailPreview, setEmailPreview] = useState<EmailPreview | null>(null);
  const [sendEmail, setSendEmail] = useState('');
  const [sendName, setSendName] = useState('');
  const [expandedHistory, setExpandedHistory] = useState<Record<string, boolean>>({});

  /* ── Search mutation ─────────────────────────────────── */

  const searchMutation = useMutation({
    mutationFn: () =>
      api.post<PlaceResult[]>('/lead-scanner/search', {
        category,
        location,
        radius_miles: radius,
        query: customQuery || undefined,
      }),
    onSuccess: async (data) => {
      setResults(data);
      toast.success(`Found ${data.length} businesses`);
      // Check which are already saved
      const placeIds = data.map((r) => r.place_id).filter(Boolean);
      if (placeIds.length) {
        try {
          const check = await api.post<{ status_map: Record<string, { prospect_id: string; outreach_status: string }> }>(
            '/lead-scanner/check-prospects',
            { place_ids: placeIds }
          );
          const map: Record<string, string> = {};
          for (const [pid, info] of Object.entries(check.status_map)) {
            map[pid] = info.prospect_id;
          }
          setSavedMap(map);
        } catch { /* ignore */ }
      }
    },
    onError: (err: Error) => toast.error(err.message),
  });

  /* ── Save prospect mutation ──────────────────────────── */

  const saveMutation = useMutation({
    mutationFn: (place: PlaceResult) =>
      api.post<Prospect>('/lead-scanner/prospects', {
        place_id: place.place_id,
        business_name: place.business_name || place.name || 'Unknown Business',
        address: place.address,
        phone: place.phone,
        website: place.website,
        business_category: category,
      }),
    onSuccess: (data, place) => {
      toast.success(`Saved ${place.business_name}`);
      setSavedMap((prev) => ({ ...prev, [place.place_id]: data.id }));
      qc.invalidateQueries({ queryKey: ['prospects'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  /* ── Prospects query ─────────────────────────────────── */

  const { data: prospects = [], isLoading: prospectsLoading } = useQuery<Prospect[]>({
    queryKey: ['prospects'],
    queryFn: () => api.get('/lead-scanner/prospects?limit=200'),
    enabled: tab === 'pipeline' || tab === 'prospects' || tab === 'outreach',
  });

  /* ── Find emails mutation ────────────────────────────── */

  const findEmailsMutation = useMutation({
    mutationFn: (prospectId: string) =>
      api.post<{ emails: string[] }>(`/lead-scanner/find-emails/${prospectId}`),
    onSuccess: (data) => {
      toast.success(
        data.emails?.length
          ? `Found ${data.emails.length} email(s)`
          : 'No emails found'
      );
      qc.invalidateQueries({ queryKey: ['prospects'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  /* ── Email preview mutation ──────────────────────────── */

  const previewMutation = useMutation({
    mutationFn: (prospectId: string) =>
      api.post<EmailPreview>('/lead-scanner/outreach/preview', {
        prospect_id: prospectId,
      }),
    onSuccess: (data) => {
      setEmailPreview(data);
      setSendEmail(data.prospect.contact_email || '');
      setSendName(data.prospect.contact_name || '');
    },
    onError: (err: Error) => toast.error(err.message),
  });

  /* ── Send email mutation ─────────────────────────────── */

  const sendMutation = useMutation({
    mutationFn: () => {
      if (!emailPreview || !selectedProspect) throw new Error('No email to send');
      return api.post<{ success: boolean; message: string; dry_run?: boolean }>(
        '/lead-scanner/outreach/send',
        {
          prospect_id: selectedProspect.id,
          to_email: sendEmail,
          to_name: sendName || undefined,
          subject: emailPreview.subject,
          body: emailPreview.body,
        }
      );
    },
    onSuccess: (data) => {
      toast.success(data.dry_run ? 'Email preview sent (dry run)' : 'Email sent!');
      setEmailPreview(null);
      setSelectedProspect(null);
      qc.invalidateQueries({ queryKey: ['prospects'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  /* ── Outreach history ────────────────────────────────── */

  const { data: outreachHistory = [] } = useQuery<Array<{
    id: string;
    prospect_id: string;
    to_email: string;
    subject: string;
    body: string;
    sent_at: string;
    status: string;
    dry_run?: boolean;
  }>>({
    queryKey: ['outreach-history'],
    queryFn: () => api.get('/lead-scanner/outreach/history?limit=30'),
    enabled: tab === 'outreach',
  });

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }); }
    catch { return d; }
  };

  /* ── Render ──────────────────────────────────────────── */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Radar className="w-7 h-7 text-brand-400" />
          Lead Scanner
        </h1>
        <p className="text-sm text-surface-400 mt-0.5">
          Find local businesses, save prospects, and launch email outreach
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-800/50 p-1 rounded-xl w-fit">
        {(['search', 'pipeline', 'prospects', 'outreach'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all
              ${tab === t
                ? 'bg-brand-600/20 text-brand-400 shadow-sm'
                : 'text-surface-400 hover:text-white hover:bg-surface-700/50'
              }`}
          >
            {t === 'search' && <Search className="w-4 h-4 inline mr-1.5 -mt-0.5" />}
            {t === 'pipeline' && <Radar className="w-4 h-4 inline mr-1.5 -mt-0.5" />}
            {t === 'prospects' && <Building2 className="w-4 h-4 inline mr-1.5 -mt-0.5" />}
            {t === 'outreach' && <Mail className="w-4 h-4 inline mr-1.5 -mt-0.5" />}
            {t}
          </button>
        ))}
      </div>

      {/* ── SEARCH TAB ──────────────────────────────────── */}
      {tab === 'search' && (
        <>
          {/* Search Form */}
          <div className="glass-card p-6">
            <h3 className="text-base font-semibold text-white mb-4">Search Local Businesses</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-2">Category</label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="input-field appearance-none pr-10 cursor-pointer"
                    title="Business category"
                    aria-label="Business category"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="input-field pl-10"
                    placeholder="Los Angeles, CA"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-2">Radius: {radius} mi</label>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={radius}
                  onChange={(e) => setRadius(+e.target.value)}
                  className="w-full h-2 rounded-full appearance-none bg-surface-700 accent-brand-500 cursor-pointer"
                  title="Search radius in miles"
                  aria-label="Search radius in miles"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-2">Custom Query</label>
                <input
                  value={customQuery}
                  onChange={(e) => setCustomQuery(e.target.value)}
                  className="input-field"
                  placeholder="e.g. pizza near downtown"
                />
              </div>
            </div>
            <button
              onClick={() => searchMutation.mutate()}
              disabled={searchMutation.isPending || !location}
              className="btn-primary mt-4 flex items-center gap-2"
            >
              {searchMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              {searchMutation.isPending ? 'Searching...' : 'Search Google Maps'}
            </button>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-surface-400">
                Found {results.length} results
              </h3>
              {results.length > 0 && results.filter(r => !savedMap[r.place_id]).length > 0 && (
                <button
                  onClick={async () => {
                    const unsaved = results.filter(r => !savedMap[r.place_id]);
                    for (const place of unsaved) {
                      await saveMutation.mutateAsync(place);
                    }
                    toast.success(`Bulk saved ${unsaved.length} prospects!`);
                  }}
                  disabled={saveMutation.isPending}
                  className="btn-secondary text-xs py-1.5 flex items-center gap-2"
                >
                  <BookmarkPlus className="w-3.5 h-3.5" />
                  Save All Unsaved to CRM
                </button>
              )}
            </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {results.map((place, i) => {
                  const isSaved = !!savedMap[place.place_id];
                  return (
                    <div
                      key={place.place_id || i}
                      className="glass-card p-5 animate-slide-up"
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-white leading-tight">{place.business_name || place.name || 'Unknown Business'}</h4>
                        {place.rating && (
                          <div className="flex items-center gap-1 text-amber-400 text-xs flex-shrink-0">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            {place.rating}
                            {place.total_ratings && (
                              <span className="text-surface-500">({place.total_ratings})</span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="space-y-1.5 mt-3 text-sm text-surface-400">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-surface-500" />
                          <span className="line-clamp-2">{place.address}</span>
                        </div>
                        {place.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-surface-500" />
                            <a href={`tel:${place.phone}`} className="hover:text-brand-400 transition-colors">{place.phone}</a>
                          </div>
                        )}
                        {place.website && (
                          <div className="flex items-center gap-2">
                            <Globe className="w-3.5 h-3.5 text-surface-500" />
                            <a
                              href={place.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="truncate hover:text-brand-400 transition-colors"
                            >
                              {place.website.replace(/^https?:\/\/(www\.)?/, '').slice(0, 35)}
                              <ExternalLink className="w-3 h-3 inline ml-1 -mt-0.5" />
                            </a>
                          </div>
                        )}
                      </div>
                      <div className="mt-4 pt-3 border-t border-surface-700/50">
                        <button
                          onClick={() => !isSaved && saveMutation.mutate(place)}
                          disabled={isSaved || saveMutation.isPending}
                          className={`w-full text-sm font-medium py-2 rounded-xl flex items-center justify-center gap-2 transition-all
                            ${isSaved
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default'
                              : 'btn-primary'
                            }`}
                        >
                          {isSaved ? (
                            <><Save className="w-4 h-4" /> Saved</>
                          ) : (
                            <><Save className="w-4 h-4" /> Save as Prospect</>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {results.length === 0 && !searchMutation.isPending && (
            <div className="glass-card p-16 text-center">
              <Radar className="w-12 h-12 mx-auto mb-3 text-surface-600 animate-pulse" />
              <p className="text-surface-400">Configure your search above and hit "Search Google Maps"</p>
            </div>
          )}
        </>
      )}

      {/* ── PIPELINE TAB ────────────────────────────────── */}
      {tab === 'pipeline' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Radar className="w-5 h-5 text-brand-400" />
              Daily Follow-up Pipeline
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-surface-700/50 pt-4">
            {/* Columns: Follow Up, Opened, Responded */}
            {['follow_up', 'opened', 'responded'].map(status => {
              const colProspects = prospects.filter((p: Prospect) => p.outreach_status === status);
              const label = OUTREACH_LABELS[status];
              return (
                <div key={status} className="glass-card p-4 min-h-[300px]">
                  <h3 className={`text-sm font-bold mb-4 px-3 py-1.5 rounded-md w-fit ${label.cls}`}>
                    {label.text} ({colProspects.length})
                  </h3>
                  <div className="space-y-3">
                    {colProspects.length === 0 ? (
                      <p className="text-center text-surface-500 text-sm py-8 border border-dashed border-surface-700/50 rounded-lg">No prospects here</p>
                    ) : (
                      colProspects.map((p: Prospect) => (
                        <div key={p.id} className="bg-surface-800/80 p-3 rounded-xl border border-surface-700/50 hover:border-surface-600 transition-colors cursor-pointer" onClick={() => { setSelectedProspect(p); setTab('outreach'); }}>
                          <h4 className="text-sm font-semibold text-white">{p.business_name}</h4>
                          {p.contact_name && <p className="text-xs text-surface-400 mt-0.5">{p.contact_name}</p>}
                          {p.contact_email ? (
                            <p className="text-xs text-brand-400 mt-2 truncate w-full">{p.contact_email}</p>
                          ) : (
                            <p className="text-xs text-red-400 mt-2">Missing Email</p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── PROSPECTS TAB ───────────────────────────────── */}
      {tab === 'prospects' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-white">{prospects.length} Saved Prospects</h3>
          </div>

          {prospectsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-card p-5 animate-pulse">
                  <div className="h-5 bg-surface-700 rounded-lg w-3/4 mb-3" />
                  <div className="h-4 bg-surface-700 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : prospects.length === 0 ? (
            <div className="glass-card p-16 text-center">
              <Building2 className="w-12 h-12 mx-auto mb-3 text-surface-600" />
              <p className="text-surface-400">No prospects saved yet</p>
              <p className="text-surface-500 text-sm mt-1">Go to the Search tab to find businesses</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {prospects.map((p, i) => {
                const label = OUTREACH_LABELS[p.outreach_status] || OUTREACH_LABELS.not_contacted;
                return (
                  <div
                    key={p.id}
                    className="glass-card p-5 animate-slide-up"
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-white leading-tight">{p.business_name}</h4>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${label.cls}`}>
                        {label.text}
                      </span>
                    </div>
                    <div className="space-y-1.5 mt-3 text-sm text-surface-400">
                      {p.address && (
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 mt-0.5 text-surface-500" />
                          <span className="line-clamp-1">{p.address}</span>
                        </div>
                      )}
                      {p.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-surface-500" />
                          {p.phone}
                        </div>
                      )}
                      {p.found_emails && p.found_emails.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-400">{p.found_emails.join(', ')}</span>
                        </div>
                      )}
                      {p.emails_sent != null && p.emails_sent > 0 && (
                        <div className="flex items-center gap-2 text-xs">
                          <Send className="w-3 h-3 text-blue-400" />
                          <span className="text-blue-400">{p.emails_sent} email(s) sent</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 mt-4 pt-3 border-t border-surface-700/50">
                      <button
                        onClick={() => findEmailsMutation.mutate(p.id)}
                        disabled={findEmailsMutation.isPending || !p.website}
                        className="btn-secondary text-xs flex-1 flex items-center justify-center gap-1.5 py-2"
                        title={!p.website ? 'No website to scrape' : 'Find emails from website'}
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${findEmailsMutation.isPending ? 'animate-spin' : ''}`} />
                        Find Emails
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProspect(p);
                          previewMutation.mutate(p.id);
                          setTab('outreach');
                        }}
                        className="btn-primary text-xs flex-1 flex items-center justify-center gap-1.5 py-2"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        Email
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── OUTREACH TAB ────────────────────────────────── */}
      {tab === 'outreach' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Compose / Preview */}
          <div className="glass-card p-6">
            <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-400" />
              Email Compose
            </h3>

            {!selectedProspect ? (
              <div className="text-center py-12 text-surface-500">
                <Mail className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p>Select a prospect from the Prospects tab to compose an email</p>
                <button
                  onClick={() => setTab('prospects')}
                  className="btn-secondary mt-4 text-sm inline-flex items-center gap-2"
                >
                  Go to Prospects <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : previewMutation.isPending ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
              </div>
            ) : emailPreview ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-surface-800/50 border border-surface-700/50">
                  <p className="text-xs text-surface-500 mb-1">To</p>
                  <div className="flex gap-2">
                    <input
                      value={sendEmail}
                      onChange={(e) => setSendEmail(e.target.value)}
                      className="input-field text-sm flex-1"
                      placeholder="email@example.com"
                    />
                    <input
                      value={sendName}
                      onChange={(e) => setSendName(e.target.value)}
                      className="input-field text-sm w-32"
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-surface-800/50 border border-surface-700/50">
                  <p className="text-xs text-surface-500 mb-1">Subject</p>
                  <p className="text-sm text-white font-medium">{emailPreview.subject}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-800/50 border border-surface-700/50 max-h-[300px] overflow-y-auto">
                  <p className="text-xs text-surface-500 mb-2">Body</p>
                  <div 
                    className="text-sm text-surface-300 font-sans leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: emailPreview.body }}
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      setEmailPreview(null);
                      setSelectedProspect(null);
                    }}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => sendMutation.mutate()}
                    disabled={sendMutation.isPending || !sendEmail}
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    {sendMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    {sendMutation.isPending ? 'Sending...' : 'Send Email'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-surface-500">
                <p>Preview loading failed. Try selecting another prospect.</p>
              </div>
            )}
          </div>

          {/* Outreach History */}
          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-surface-700/50">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Inbox className="w-5 h-5 text-brand-400" />
                Outreach History
              </h3>
            </div>
            <div className="divide-y divide-surface-800/50 max-h-[500px] overflow-y-auto">
              {outreachHistory.length === 0 ? (
                <div className="p-12 text-center text-surface-500">
                  <Send className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p>No emails sent yet</p>
                </div>
              ) : (
                outreachHistory.map((entry) => (
                  <div key={entry.id} className="px-6 py-4 hover:bg-surface-800/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white truncate">{entry.to_email}</p>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium
                        ${entry.status === 'sent' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}
                      >
                        {entry.status}
                        {entry.dry_run && ' (dry)'}
                      </span>
                    </div>
                    <p className="text-xs text-surface-400 mt-1 truncate">{entry.subject}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-[11px] text-surface-500">{formatDate(entry.sent_at)}</p>
                      {entry.body && (
                        <button 
                          onClick={() => setExpandedHistory(prev => ({ ...prev, [entry.id]: !prev[entry.id] }))}
                          className="text-[11px] text-brand-400 hover:text-brand-300 underline"
                        >
                          {expandedHistory[entry.id] ? 'Hide Mail' : 'View Mail'}
                        </button>
                      )}
                    </div>
                    {expandedHistory[entry.id] && entry.body && (
                      <div className="mt-3 p-3 bg-surface-900/50 rounded-lg border border-surface-700/30 text-xs text-surface-300 max-h-64 overflow-y-auto font-sans leading-relaxed">
                        <div dangerouslySetInnerHTML={{ __html: entry.body }} />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
