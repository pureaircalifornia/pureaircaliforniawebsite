/**
 * Lead Scanner + outreach API client.
 * Admin calls go through authFetch; the booking and unsubscribe calls are
 * public and carry only the opaque token from the email link.
 */
import { API_BASE_URL, authFetch } from './api';

// ── Types ────────────────────────────────────────────────────────────

export type OutreachStatus =
    | 'not_contacted' | 'email_sent' | 'email_opened' | 'link_clicked' | 'replied'
    | 'interested' | 'not_interested' | 'meeting_scheduled' | 'converted'
    | 'bounced' | 'unsubscribed';

export type SequenceStatus = 'none' | 'active' | 'paused' | 'completed' | 'stopped';
export type EmailGrade = 'named' | 'buyer_role' | 'role' | 'free_mail' | 'other_domain' | 'guessed' | 'invalid';

export interface FoundEmail {
    email: string;
    source: string;
    confidence: number;
    grade?: EmailGrade;
    contact_name?: string;
    contact_title?: string;
}

export interface Prospect {
    id: string;
    business_name: string;
    business_category: string;
    address?: string;
    phone?: string;
    website?: string;
    rating?: number;
    total_ratings?: number;
    place_id?: string;
    contact_name?: string;
    contact_email?: string;
    contact_title?: string;
    notes?: string;
    personal_note?: string;
    outreach_status: OutreachStatus;
    created_at: string;
    updated_at: string;
    last_contacted_at?: string;
    emails_sent: number;
    // Older records stored bare strings here; normalizeFoundEmails() handles both.
    found_emails?: Array<FoundEmail | string>;
    found_contacts?: Array<{ name: string; title: string }>;
    fit_score?: number;
    email_quality?: EmailGrade;
    mx_valid?: boolean | null;
    enriched_at?: string;
    sequence_status?: SequenceStatus;
    sequence_step?: number;
    next_touch_at?: string | null;
    opened_at?: string;
    clicked_at?: string;
    booked_at?: string;
    booking_contact?: { name: string; phone: string };
}

export interface PlaceSearchResult {
    place_id: string;
    name: string;
    address: string;
    phone?: string;
    website?: string;
    rating?: number;
    total_ratings?: number;
    business_status?: string;
    types: string[];
    distance_miles?: number;
    fit_score: number;
    fit_reasons: string[];
    /** 'openstreetmap' when Google was unavailable and the free backup answered. */
    source?: 'google' | 'openstreetmap';
    /** Why the backup was used; set on backup results only. */
    source_note?: string;
}

export interface ProspectStatusInfo {
    prospect_id: string;
    outreach_status: string;
    emails_sent: number;
    last_contacted_at?: string;
}

export interface EmailAttachment {
    filename: string;
    content_base64: string;
    content_type: string;
}

export interface OutreachRecord {
    id: string;
    prospect_id: string;
    to_email: string;
    to_name?: string;
    subject: string;
    body: string;
    sent_at: string;
    status: string;
    dry_run: boolean;
    step?: number;
    automated?: boolean;
    opened_at?: string;
    clicked_at?: string;
    bounced_at?: string;
}

export interface EmailPreview {
    subject: string;
    body: string;
    footer: string;
    step: number;
    step_name: string;
    variant: number;
    template_id: string;
    persona: string | null;
    blocked_reason: string | null;
    sequence: Array<{ step: number; step_name: string; subject: string }>;
}

export interface CallScript {
    playbook: string;
    buyer: string;
    persona: string | null;
    persona_line: string | null;
    lines: Array<{ label: string; say: string; why: string }>;
}

export interface FunnelCounts {
    contacted: number;
    opened: number;
    clicked: number;
    replied: number;
    booked: number;
    open_rate: number;
    click_rate: number;
    reply_rate: number;
    booking_rate: number;
}

export interface OutreachStats {
    totals: FunnelCounts & {
        prospects: number; with_email: number; in_sequence: number;
        emails_sent: number; suppressed: number;
    };
    by_category: Array<FunnelCounts & { category: string }>;
    by_template: Array<{
        template_id: string; sent: number; opened: number; replied: number;
        booked: number; open_rate: number; reply_rate: number;
    }>;
    sending: { sent_last_24h: number; daily_limit: number; remaining_today: number; steps: string[] };
    readiness: {
        email_provider: boolean; open_tracking_webhook: boolean; automation_secret: boolean;
        google_places: boolean; owner_alerts: boolean;
    };
}

export interface ProspectInput {
    business_name: string;
    business_category: string;
    address?: string;
    phone?: string;
    website?: string;
    rating?: number;
    total_ratings?: number;
    place_id?: string;
    business_status?: string;
    types?: string[];
}

// ── Helpers ──────────────────────────────────────────────────────────

/** Turn a failed response into an Error carrying the server's explanation. */
async function fail(response: Response): Promise<never> {
    let detail = '';
    try {
        const data = await response.json();
        if (typeof data?.detail === 'string') detail = data.detail;
        else if (Array.isArray(data?.detail)) detail = data.detail.map((d: any) => d?.msg).filter(Boolean).join('; ');
    } catch {
        // Not JSON; fall through to the status line.
    }
    throw new Error(detail || `Request failed (${response.status})`);
}

async function json<T>(response: Response): Promise<T> {
    if (!response.ok) await fail(response);
    return response.json();
}

const post = (path: string, body?: unknown) =>
    authFetch(`${API_BASE_URL}${path}`, { method: 'POST', body: body === undefined ? undefined : JSON.stringify(body) });

/** Only http(s) links are ever rendered as clickable. */
export function safeUrl(url?: string | null): string | undefined {
    return url && /^https?:\/\//i.test(url) ? url : undefined;
}

export function normalizeFoundEmails(found?: Array<FoundEmail | string>): FoundEmail[] {
    return (found || []).map((entry) =>
        typeof entry === 'string' ? { email: entry, source: 'website', confidence: 0 } : entry);
}

// ── Search & prospects ───────────────────────────────────────────────

export async function searchBusinesses(data: {
    query?: string; category: string; location: string; radius_miles: number; max_results: number;
}): Promise<PlaceSearchResult[]> {
    return json(await post('/lead-scanner/search', data));
}

export async function checkProspectStatus(placeIds: string[]): Promise<{ status_map: Record<string, ProspectStatusInfo> }> {
    return json(await post('/lead-scanner/check-prospects', { place_ids: placeIds }));
}

export async function getProspects(params: {
    category?: string; outreach_status?: OutreachStatus; sort?: 'score' | 'recent' | 'next_touch'; limit?: number;
} = {}): Promise<Prospect[]> {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => { if (value !== undefined && value !== '') search.set(key, String(value)); });
    const query = search.toString();
    return json(await authFetch(`${API_BASE_URL}/lead-scanner/prospects${query ? `?${query}` : ''}`));
}

export async function saveProspect(data: ProspectInput): Promise<Prospect> {
    return json(await post('/lead-scanner/prospects', data));
}

export async function saveProspectsBulk(prospects: ProspectInput[]): Promise<{ saved: Prospect[]; created: number; already_saved: number }> {
    return json(await post('/lead-scanner/prospects/bulk', { prospects }));
}

/** Text fields accept null, which clears them. */
export type ProspectUpdate = {
    contact_name?: string | null;
    contact_email?: string | null;
    contact_title?: string | null;
    notes?: string | null;
    personal_note?: string | null;
    outreach_status?: OutreachStatus;
    phone?: string;
    website?: string;
};

export async function updateProspect(prospectId: string, updates: ProspectUpdate): Promise<Prospect> {
    return json(await authFetch(`${API_BASE_URL}/lead-scanner/prospects/${encodeURIComponent(prospectId)}`, {
        method: 'PATCH', body: JSON.stringify(updates),
    }));
}

export async function deleteProspect(prospectId: string): Promise<void> {
    const response = await authFetch(`${API_BASE_URL}/lead-scanner/prospects/${encodeURIComponent(prospectId)}`, { method: 'DELETE' });
    if (!response.ok) await fail(response);
}

export async function findEmails(prospectId: string): Promise<{ emails: FoundEmail[]; best: FoundEmail | null; prospect: Prospect; pages_scraped: number }> {
    return json(await post(`/lead-scanner/find-emails/${encodeURIComponent(prospectId)}`));
}

// ── Outreach ─────────────────────────────────────────────────────────

export async function previewEmail(prospectId: string, step?: number): Promise<EmailPreview> {
    return json(await post('/lead-scanner/outreach/preview', { prospect_id: prospectId, step }));
}

export async function getCallScript(prospectId: string): Promise<CallScript> {
    return json(await authFetch(`${API_BASE_URL}/lead-scanner/outreach/call-script/${encodeURIComponent(prospectId)}`));
}

export async function sendOutreachEmail(data: {
    prospect_id: string; to_email: string; to_name?: string; subject: string; body: string;
    step?: number; template_id?: string; variant?: number; continue_sequence?: boolean;
    attachments?: EmailAttachment[];
}): Promise<{ success: boolean; message: string; dry_run: boolean; outreach_record: OutreachRecord }> {
    return json(await post('/lead-scanner/outreach/send', data));
}

export async function startSequences(prospectIds: string[]): Promise<{ queued: string[]; skipped: Array<{ id: string; business_name: string; reason: string }> }> {
    return json(await post('/lead-scanner/outreach/sequence/start', { prospect_ids: prospectIds }));
}

export async function stopSequences(prospectIds: string[]): Promise<{ paused: number }> {
    return json(await post('/lead-scanner/outreach/sequence/stop', { prospect_ids: prospectIds }));
}

export async function getOutreachHistory(prospectId?: string): Promise<OutreachRecord[]> {
    const query = prospectId ? `?prospect_id=${encodeURIComponent(prospectId)}` : '';
    return json(await authFetch(`${API_BASE_URL}/lead-scanner/outreach/history${query}`));
}

export async function getOutreachStats(): Promise<OutreachStats> {
    return json(await authFetch(`${API_BASE_URL}/lead-scanner/outreach/stats`));
}

// ── Public (no login): booking page and unsubscribe ──────────────────

export interface BookingGreeting { business_name: string | null; city: string | null }

export async function viewBookingPage(token: string): Promise<BookingGreeting> {
    const response = await fetch(`${API_BASE_URL}/outreach/p/${encodeURIComponent(token)}`);
    return json(response);
}

export async function requestInspection(data: {
    token?: string; name: string; phone: string; business_name?: string;
    preferred_time: string; notes?: string; hp?: string;
}): Promise<{ accepted: boolean }> {
    const response = await fetch(`${API_BASE_URL}/outreach/book`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
    });
    return json(response);
}

export async function unsubscribe(token: string): Promise<{ unsubscribed: boolean }> {
    const response = await fetch(`${API_BASE_URL}/outreach/unsubscribe/${encodeURIComponent(token)}`, { method: 'POST' });
    return json(response);
}
