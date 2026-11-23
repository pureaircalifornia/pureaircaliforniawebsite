/**
 * A phone script for this prospect, in the same voice as the emails, with a
 * tap-to-call button and one-tap outcome logging.
 */
import React, { useEffect, useState } from 'react';
import { Loader2, Phone, X } from 'lucide-react';
import { getCallScript, type CallScript, type OutreachStatus, type Prospect } from '@/utils/outreachApi';
import { OUTCOMES, dialable } from './constants';

interface Props {
    prospect: Prospect;
    onClose: () => void;
    onOutcome: (status: OutreachStatus) => Promise<void>;
}

export default function CallScriptPanel({ prospect, onClose, onOutcome }: Props) {
    const [script, setScript] = useState<CallScript | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState<OutreachStatus | null>(null);

    useEffect(() => {
        let cancelled = false;
        getCallScript(prospect.id)
            .then((data) => { if (!cancelled) setScript(data); })
            .catch((err) => { if (!cancelled) setError(err instanceof Error ? err.message : 'Could not load the script.'); });
        return () => { cancelled = true; };
    }, [prospect.id]);

    const record = async (status: OutreachStatus) => {
        setSaving(status);
        try { await onOutcome(status); } finally { setSaving(null); }
    };

    return (
        <div className="px-6 py-4 bg-sky-50/60 border-t border-sky-100">
            <div className="flex justify-between items-start gap-3 mb-3">
                <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Call {prospect.contact_name || prospect.business_name}</h3>
                    {script && (
                        <p className="text-xs text-gray-500 mt-0.5">
                            {script.playbook}. Usually decided by: {script.buyer.toLowerCase()}.
                            {script.persona && ` Speaking to: ${script.persona.toLowerCase()}.`}
                        </p>
                    )}
                </div>
                <button onClick={onClose} aria-label="Close call script" className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
            </div>

            {prospect.phone ? (
                <a href={`tel:${dialable(prospect.phone)}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 mb-4">
                    <Phone className="w-4 h-4" aria-hidden="true" /> Call {prospect.phone}
                </a>
            ) : (
                <p className="text-sm text-red-600 mb-4">No phone number on file.</p>
            )}

            {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
            {!script && !error && <div className="flex items-center gap-2 text-sm text-gray-500"><Loader2 className="w-4 h-4 animate-spin" /> Loading script…</div>}

            {script && (
                <ol className="space-y-2">
                    {script.lines.map((line, index) => (
                        <li key={line.label} className="bg-white border border-gray-200 rounded-lg p-3">
                            <div className="text-xs font-semibold text-sky-700 uppercase tracking-wide">{index + 1}. {line.label}</div>
                            <p className="text-sm text-gray-900 mt-1">“{line.say}”</p>
                            <p className="text-xs text-gray-500 mt-1">{line.why}</p>
                        </li>
                    ))}
                    {script.persona_line && (
                        <li className="bg-white border border-gray-200 rounded-lg p-3">
                            <div className="text-xs font-semibold text-sky-700 uppercase tracking-wide">For this role</div>
                            <p className="text-sm text-gray-900 mt-1">“{script.persona_line}”</p>
                        </li>
                    )}
                </ol>
            )}

            <div className="mt-4">
                <div className="text-xs font-medium text-gray-600 mb-2">How did it go? Recording an outcome stops the automatic emails.</div>
                <div className="flex flex-wrap gap-2">
                    {OUTCOMES.map((outcome) => (
                        <button key={outcome.status} onClick={() => record(outcome.status)} disabled={saving !== null}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50">
                            {saving === outcome.status && <Loader2 className="w-3 h-3 animate-spin" />}
                            {outcome.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
