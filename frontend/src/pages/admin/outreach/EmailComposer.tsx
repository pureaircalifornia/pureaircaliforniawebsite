/**
 * Review, edit and send one email of the sequence. The copy is written for
 * this prospect's industry and role; the compliance footer is shown but is
 * added by the server so it cannot be removed.
 */
import React, { useEffect, useState } from 'react';
import { FileText, Loader2, Send, X } from 'lucide-react';
import {
    previewEmail, sendOutreachEmail,
    type EmailAttachment, type EmailPreview, type Prospect,
} from '@/utils/outreachApi';
import { SEQUENCE_STEPS } from './constants';

// Must match the backend limits.
const MAX_ATTACHMENT_BYTES = 7 * 1024 * 1024;
const MAX_ATTACHMENTS = 5;

function readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = String(reader.result);
            resolve(result.includes(',') ? result.split(',')[1] : result);
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}

interface Props {
    prospect: Prospect;
    onClose: () => void;
    onSent: () => void;
}

export default function EmailComposer({ prospect, onClose, onSent }: Props) {
    const [step, setStep] = useState(Math.min(prospect.sequence_step ?? 0, SEQUENCE_STEPS.length - 1));
    const [preview, setPreview] = useState<EmailPreview | null>(null);
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [attachments, setAttachments] = useState<EmailAttachment[]>([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);
        setResult(null);
        previewEmail(prospect.id, step)
            .then((data) => {
                if (cancelled) return;
                setPreview(data);
                setSubject(data.subject);
                setBody(data.body);
            })
            .catch((err) => { if (!cancelled) setError(err instanceof Error ? err.message : 'Could not load the email.'); })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, [prospect.id, step]);

    const attach = async (files: FileList | null) => {
        if (!files || files.length === 0) return;
        setError(null);
        try {
            const incoming = await Promise.all(Array.from(files).map(async (file) => ({
                filename: file.name,
                content_base64: await readFileAsBase64(file),
                content_type: file.type || 'application/octet-stream',
            })));
            const next = [...attachments, ...incoming];
            if (next.length > MAX_ATTACHMENTS) { setError(`A maximum of ${MAX_ATTACHMENTS} attachments is allowed.`); return; }
            const bytes = next.reduce((sum, a) => sum + Math.floor(a.content_base64.length * 0.75), 0);
            if (bytes > MAX_ATTACHMENT_BYTES) { setError('Attachments exceed the 7 MB total limit.'); return; }
            setAttachments(next);
        } catch {
            setError('Could not read one of the selected files.');
        }
    };

    const send = async (continueSequence: boolean) => {
        if (!prospect.contact_email || !preview) return;
        setSending(true);
        setResult(null);
        try {
            const response = await sendOutreachEmail({
                prospect_id: prospect.id,
                to_email: prospect.contact_email,
                to_name: prospect.contact_name || undefined,
                subject,
                body,
                step,
                template_id: preview.template_id,
                variant: preview.variant,
                continue_sequence: continueSequence,
                attachments: attachments.length > 0 ? attachments : undefined,
            });
            setResult({ ok: response.success, message: response.dry_run ? `${response.message} (dry run)` : response.message });
            if (response.success) onSent();
        } catch (err) {
            setResult({ ok: false, message: err instanceof Error ? err.message : 'Failed to send.' });
        } finally {
            setSending(false);
        }
    };

    const words = body.trim() ? body.trim().split(/\s+/).length : 0;
    const blocked = preview?.blocked_reason;
    // Once this email has gone, the buttons stay off so a second click cannot resend it.
    const done = result?.ok === true;
    const isLast = step === SEQUENCE_STEPS.length - 1;

    return (
        <div className="px-6 py-4 bg-emerald-50/60 border-t border-emerald-100">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-900 text-sm">Email to {prospect.contact_name || prospect.business_name}</h3>
                <button onClick={onClose} aria-label="Close email composer" className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
            </div>

            <div role="tablist" aria-label="Sequence step" className="flex flex-wrap gap-2 mb-3">
                {SEQUENCE_STEPS.map((name, index) => (
                    <button key={name} role="tab" aria-selected={step === index} onClick={() => setStep(index)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${step === index ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'}`}>
                        {index + 1}. {name}
                        {index < (prospect.sequence_step ?? 0) && ' ✓'}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex items-center gap-2 py-4 text-gray-500 text-sm"><Loader2 className="w-4 h-4 animate-spin" /> Writing the email…</div>
            ) : (
                <div className="space-y-3">
                    {blocked && <div role="alert" className="p-3 rounded-lg text-sm bg-red-50 border border-red-200 text-red-700">{blocked}</div>}
                    <div className="text-sm text-gray-700">
                        <span className="text-xs font-medium text-gray-500">To </span>
                        {prospect.contact_email || <span className="text-red-600">No email yet. Add one under Edit.</span>}
                    </div>
                    <div>
                        <label htmlFor={`subject-${prospect.id}`} className="text-xs font-medium text-gray-600 block mb-1">Subject</label>
                        <input id={`subject-${prospect.id}`} type="text" value={subject} maxLength={200} onChange={(e) => setSubject(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-sm bg-white" />
                    </div>
                    <div>
                        <div className="flex justify-between items-baseline mb-1">
                            <label htmlFor={`body-${prospect.id}`} className="text-xs font-medium text-gray-600">Message</label>
                            <span className={`text-xs ${words > 150 ? 'text-amber-600' : 'text-gray-400'}`}>
                                {words} words{words > 150 ? ' · shorter emails get more replies' : ''}
                            </span>
                        </div>
                        <textarea id={`body-${prospect.id}`} value={body} onChange={(e) => setBody(e.target.value)} rows={14}
                            className="w-full px-3 py-2 border rounded-lg text-sm leading-relaxed bg-white" />
                        <pre className="mt-1 px-3 py-2 text-xs text-gray-500 bg-white/70 border border-dashed border-gray-200 rounded-lg whitespace-pre-wrap font-sans">
                            {preview?.footer}
                        </pre>
                        <p className="text-[11px] text-gray-400 mt-1">The address and unsubscribe line above are added to every email automatically and are required by law.</p>
                    </div>
                    <div>
                        <label className="inline-flex items-center gap-2 px-3 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-600 cursor-pointer hover:border-sky-400 hover:text-sky-600 transition-colors bg-white">
                            <FileText className="w-4 h-4" aria-hidden="true" /> Attach W-9 or insurance certificate
                            <input type="file" multiple className="hidden" onChange={(e) => { attach(e.target.files); e.target.value = ''; }} />
                        </label>
                        {attachments.length > 0 && (
                            <ul className="mt-2 space-y-1">
                                {attachments.map((file, index) => (
                                    <li key={`${file.filename}-${index}`} className="flex items-center justify-between gap-2 px-3 py-1.5 bg-white border rounded-lg text-xs text-gray-700">
                                        <span className="truncate">{file.filename}</span>
                                        <button type="button" aria-label={`Remove ${file.filename}`} onClick={() => setAttachments((prev) => prev.filter((_, i) => i !== index))}
                                            className="text-gray-400 hover:text-red-500"><X className="w-3.5 h-3.5" /></button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
                    {result && (
                        <div role="status" className={`p-3 rounded-lg text-sm ${result.ok ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`}>{result.message}</div>
                    )}

                    <div className="flex flex-wrap items-center gap-2">
                        <button onClick={() => send(true)} disabled={sending || done || !!blocked || !prospect.contact_email || !subject.trim() || !body.trim()}
                            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 transition-colors">
                            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            {isLast ? 'Send' : 'Send and schedule follow-ups'}
                        </button>
                        {!isLast && (
                            <button onClick={() => send(false)} disabled={sending || done || !!blocked || !prospect.contact_email}
                                className="px-4 py-2.5 border border-gray-300 bg-white rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50">
                                Send this one only
                            </button>
                        )}
                        {!isLast && <span className="text-xs text-gray-500">Follow-ups go out on day 3, 7 and 14. They stop by themselves when the prospect books or opts out. A reply lands in your own inbox, so record it under Outcome to stop them.</span>}
                    </div>
                </div>
            )}
        </div>
    );
}
