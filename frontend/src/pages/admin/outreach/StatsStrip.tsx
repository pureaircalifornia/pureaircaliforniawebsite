/**
 * The outreach funnel at a glance, plus anything that still needs setting up
 * before a part of the system can work.
 */
import React, { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import type { OutreachStats } from '@/utils/outreachApi';
import { categoryLabel } from './constants';

const SETUP: Array<{ key: keyof OutreachStats['readiness']; missing: string }> = [
    { key: 'email_provider', missing: 'No email provider key is set, so sends are dry runs. Add RESEND_API_KEY on the server.' },
    { key: 'automation_secret', missing: 'Automatic follow-ups are off. Set CRON_SECRET on the server and point a scheduler at the run-drip endpoint.' },
    { key: 'open_tracking_webhook', missing: 'Opens and bounces are not being recorded. Add a Resend webhook and set RESEND_WEBHOOK_SECRET.' },
    { key: 'owner_alerts', missing: 'New inspection requests are not emailed to you. Set OWNER_NOTIFY_EMAIL.' },
    { key: 'google_places', missing: 'The scanner cannot search. Set GOOGLE_PLACES_API_KEY.' },
];

function Metric({ label, value, sub }: { label: string; value: string; sub?: string }) {
    return (
        <div className="px-4 py-3">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</div>
            <div className="text-2xl font-semibold text-gray-900 mt-0.5">{value}</div>
            {sub && <div className="text-xs text-gray-400">{sub}</div>}
        </div>
    );
}

export default function StatsStrip({ stats }: { stats: OutreachStats | null }) {
    const [open, setOpen] = useState(false);
    if (!stats) return null;
    const { totals, sending, readiness } = stats;
    const missing = SETUP.filter((item) => !readiness[item.key]);
    const categories = stats.by_category.filter((row) => row.contacted > 0);
    const templates = stats.by_template.filter((row) => row.sent > 0);

    return (
        <div className="space-y-3">
            {missing.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
                    <div className="flex items-center gap-2 font-medium mb-1">
                        <AlertTriangle className="w-4 h-4" aria-hidden="true" /> Setup still needed
                    </div>
                    <ul className="list-disc pl-5 space-y-0.5">
                        {missing.map((item) => <li key={item.key}>{item.missing}</li>)}
                    </ul>
                </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-gray-100">
                    <Metric label="Contacted" value={String(totals.contacted)} sub={`${totals.in_sequence} in sequence`} />
                    <Metric label="Opened" value={`${totals.open_rate}%`} sub={`${totals.opened} prospects`} />
                    <Metric label="Clicked" value={`${totals.click_rate}%`} sub={`${totals.clicked} opened the booking page`} />
                    <Metric label="Replied" value={`${totals.reply_rate}%`} sub={`${totals.replied} prospects`} />
                    <Metric label="Booked" value={String(totals.booked)} sub={`${totals.booking_rate}% of contacted`} />
                    <Metric label="Sent today" value={`${sending.sent_last_24h}/${sending.daily_limit}`} sub={`${sending.remaining_today} left in 24h`} />
                </div>
                {(categories.length > 0 || templates.length > 0) && (
                    <div className="border-t border-gray-100">
                        <button onClick={() => setOpen(!open)} aria-expanded={open}
                            className="w-full px-4 py-2 flex items-center justify-between text-xs font-medium text-gray-500 hover:text-gray-700">
                            What is working
                            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                        {open && (
                            <div className="px-4 pb-4 grid md:grid-cols-2 gap-6 text-sm">
                                <table className="w-full">
                                    <caption className="text-left text-xs font-semibold text-gray-500 uppercase mb-1">By business type</caption>
                                    <thead><tr className="text-xs text-gray-400 text-left"><th className="py-1 font-normal">Type</th><th className="font-normal">Sent to</th><th className="font-normal">Open</th><th className="font-normal">Reply</th><th className="font-normal">Booked</th></tr></thead>
                                    <tbody>
                                        {categories.map((row) => (
                                            <tr key={row.category} className="border-t border-gray-100">
                                                <td className="py-1 text-gray-800">{categoryLabel(row.category)}</td>
                                                <td>{row.contacted}</td><td>{row.open_rate}%</td><td>{row.reply_rate}%</td><td>{row.booked}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <table className="w-full">
                                    <caption className="text-left text-xs font-semibold text-gray-500 uppercase mb-1">By opening email (subject line test)</caption>
                                    <thead><tr className="text-xs text-gray-400 text-left"><th className="py-1 font-normal">Version</th><th className="font-normal">Sent</th><th className="font-normal">Open</th><th className="font-normal">Reply</th><th className="font-normal">Booked</th></tr></thead>
                                    <tbody>
                                        {templates.map((row) => (
                                            <tr key={row.template_id} className="border-t border-gray-100">
                                                <td className="py-1 font-mono text-xs text-gray-800">{row.template_id}</td>
                                                <td>{row.sent}</td><td>{row.open_rate}%</td><td>{row.reply_rate}%</td><td>{row.booked}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
