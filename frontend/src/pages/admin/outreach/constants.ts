/**
 * Shared labels for the Lead Scanner and Prospects pages.
 * Category values must match the backend BusinessCategory enum exactly.
 */
import type { EmailGrade, OutreachStatus, Prospect } from '@/utils/outreachApi';

export const BUSINESS_CATEGORIES: Array<{ value: string; label: string }> = [
    { value: 'hoa', label: 'HOAs & condo associations' },
    { value: 'property_manager', label: 'Property management companies' },
    { value: 'building_management', label: 'Building management' },
    { value: 'hotel', label: 'Hotels' },
    { value: 'senior_living', label: 'Senior & assisted living' },
    { value: 'laundromat', label: 'Laundromats' },
    { value: 'medical', label: 'Medical & outpatient' },
    { value: 'dental', label: 'Dental offices' },
    { value: 'office_building', label: 'Office buildings' },
    { value: 'school', label: 'Schools & colleges' },
    { value: 'daycare', label: 'Daycares & preschools' },
    { value: 'gym', label: 'Gyms & fitness studios' },
    { value: 'salon', label: 'Salons & spas' },
    { value: 'restaurant', label: 'Restaurants' },
    { value: 'retail', label: 'Shopping centers & retail' },
    { value: 'warehouse', label: 'Warehouses & industrial' },
    { value: 'church', label: 'Churches & houses of worship' },
    { value: 'other', label: 'Other (custom search)' },
];

export const categoryLabel = (value: string): string =>
    BUSINESS_CATEGORIES.find((c) => c.value === value)?.label ?? value;

export const STATUS: Record<OutreachStatus, { label: string; className: string }> = {
    not_contacted: { label: 'Not contacted', className: 'bg-gray-100 text-gray-700' },
    email_sent: { label: 'Email sent', className: 'bg-blue-100 text-blue-700' },
    email_opened: { label: 'Opened', className: 'bg-indigo-100 text-indigo-700' },
    link_clicked: { label: 'Clicked booking link', className: 'bg-violet-100 text-violet-700' },
    replied: { label: 'Replied', className: 'bg-purple-100 text-purple-700' },
    interested: { label: 'Interested', className: 'bg-emerald-100 text-emerald-700' },
    not_interested: { label: 'Not interested', className: 'bg-red-100 text-red-700' },
    meeting_scheduled: { label: 'Inspection requested', className: 'bg-amber-100 text-amber-800' },
    converted: { label: 'Won', className: 'bg-green-100 text-green-800' },
    bounced: { label: 'Bounced', className: 'bg-red-100 text-red-700' },
    unsubscribed: { label: 'Unsubscribed', className: 'bg-red-100 text-red-700' },
};

export const statusInfo = (status: string) =>
    STATUS[status as OutreachStatus] ?? { label: status, className: 'bg-gray-100 text-gray-700' };

/** Outcomes a person records by hand; each one ends the automated follow-ups. */
export const OUTCOMES: Array<{ status: OutreachStatus; label: string }> = [
    { status: 'replied', label: 'They replied (stops follow-ups)' },
    { status: 'interested', label: 'Interested' },
    { status: 'meeting_scheduled', label: 'Inspection booked' },
    { status: 'converted', label: 'Won the job' },
    { status: 'not_interested', label: 'Not interested' },
];

export const GRADE: Record<EmailGrade, { label: string; className: string; hint: string }> = {
    named: { label: 'Named person', className: 'bg-emerald-50 text-emerald-700 border-emerald-200', hint: "A person's own mailbox. Best reply rate." },
    buyer_role: { label: 'Facilities inbox', className: 'bg-emerald-50 text-emerald-700 border-emerald-200', hint: 'Reaches the team that buys this service.' },
    role: { label: 'Shared inbox', className: 'bg-amber-50 text-amber-700 border-amber-200', hint: 'info@ / office@. Deliverable, lower reply rate.' },
    free_mail: { label: 'Gmail-type', className: 'bg-amber-50 text-amber-700 border-amber-200', hint: 'Published on their site, not on their domain.' },
    other_domain: { label: 'Different domain', className: 'bg-amber-50 text-amber-700 border-amber-200', hint: 'Published on their site but on another domain: maybe the management company, maybe the web designer. Check before using.' },
    guessed: { label: 'Guess', className: 'bg-red-50 text-red-700 border-red-200', hint: 'Never seen published. Confirm before using; a bounce hurts deliverability.' },
    invalid: { label: 'Unusable', className: 'bg-red-50 text-red-700 border-red-200', hint: 'Not a real mailbox for this business.' },
};

export const SEQUENCE_STEPS = ['Opener', 'Reason', 'What you get', 'Break-up'];

const CLOSED: OutreachStatus[] = ['not_interested', 'bounced', 'unsubscribed'];
const ANSWERED: OutreachStatus[] = ['replied', 'interested'];
const BOOKED: OutreachStatus[] = ['meeting_scheduled', 'converted'];

export type PipelineFilter = 'all' | 'ready' | 'needs_email' | 'sequence' | 'engaged' | 'answered' | 'booked' | 'closed';

export const PIPELINE_FILTERS: Array<{ key: PipelineFilter; label: string; test: (p: Prospect) => boolean }> = [
    { key: 'all', label: 'All', test: () => true },
    { key: 'ready', label: 'Ready to email', test: (p) => !!p.contact_email && p.outreach_status === 'not_contacted' && p.sequence_status !== 'active' },
    { key: 'needs_email', label: 'Needs an email', test: (p) => !p.contact_email && !CLOSED.includes(p.outreach_status) },
    { key: 'sequence', label: 'In sequence', test: (p) => p.sequence_status === 'active' },
    { key: 'engaged', label: 'Opened or clicked', test: (p) => p.outreach_status === 'email_opened' || p.outreach_status === 'link_clicked' },
    { key: 'answered', label: 'Replied', test: (p) => ANSWERED.includes(p.outreach_status) },
    { key: 'booked', label: 'Booked', test: (p) => BOOKED.includes(p.outreach_status) },
    { key: 'closed', label: 'Closed', test: (p) => CLOSED.includes(p.outreach_status) },
];

export function scoreClass(score = 0): string {
    if (score >= 70) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (score >= 45) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-gray-100 text-gray-600 border-gray-200';
}

export function formatDate(value?: string | null): string {
    if (!value) return '';
    const date = new Date(value.endsWith('Z') || value.includes('+') ? value : `${value}Z`);
    return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

/** Digits only, for tel: links. */
export const dialable = (phone?: string): string => (phone || '').replace(/[^0-9+]/g, '');
