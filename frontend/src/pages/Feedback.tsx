import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { business } from '@/config/business';

const API = (typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
  ? '/api' : (import.meta.env.VITE_API_BASE_URL || '/api');

export default function Feedback() {
  const { token } = useParams<{ token: string }>();
  const [name, setName] = useState('');
  const [valid, setValid] = useState<boolean | null>(null);
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    let disposed = false;
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    setValid(null);
    setSubmitted(false);
    setRating(0);
    setFeedback('');
    setError('');
    fetch(`${API}/reviews/feedback/${encodeURIComponent(token || '')}`, { signal: controller.signal })
      .then(response => response.ok ? response.json() : Promise.reject(new Error('Invalid link')))
      .then(data => { if (!disposed) { setName(data.customer_name || 'there'); setValid(true); } })
      .catch(() => { if (!disposed) setValid(false); })
      .finally(() => window.clearTimeout(timeout));
    return () => { disposed = true; window.clearTimeout(timeout); controller.abort(); };
  }, [token]);

  const submit = async () => {
    if (submitting || submitted || rating < 1 || rating > 5) return;
    setSubmitting(true);
    setError('');
    try {
      const response = await fetch(`${API}/reviews/feedback/${encodeURIComponent(token || '')}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({ rating, private_feedback: feedback.trim() || undefined }),
      });
      if (!response.ok) throw new Error('Request failed');
      setSubmitted(true);
      // A private rating never chooses a public review destination or redirects.
      // The same Google link is available before and after every rating.
    } catch {
      setError('We could not send your feedback. Please try again or call us.');
    } finally {
      setSubmitting(false);
    }
  };

  return <Centered>
    <Helmet>
      <title>Share your experience | Pure Air California</title>
      <meta name="robots" content="noindex, nofollow" />
      <meta name="referrer" content="no-referrer" />
    </Helmet>
    <h1 className="text-2xl font-bold mb-3">{valid === true
      ? (submitted ? 'Thank you for your feedback' : `Hi ${name}, how did we do?`)
      : 'Share your experience'}</h1>
    <p className="text-slate-600 mb-5">Your honest experience matters. The public review option is always available. You can also send a private note when your feedback link is ready.</p>
    <a href={business.googleReviewUrl} target="_blank" rel="noopener noreferrer"
      className="block w-full bg-[#0A3D7C] text-white font-bold py-3 rounded-xl mb-6">
      Share an honest Google review ↗
    </a>
    {valid === null ? <p role="status">Checking your private feedback link…</p> : valid === false ? <>
      <p className="font-semibold mb-3">The private feedback form is unavailable.</p>
      <p>Please contact <a href={business.phoneHref} className="underline">{business.phone}</a> for help.</p>
    </> : <>
      {!submitted && <>
        <fieldset className="mb-5" disabled={submitting}>
          <legend className="font-semibold mb-3">Optional private feedback to PAC</legend>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map(stars => <button key={stars} type="button"
              aria-label={`${stars} ${stars === 1 ? 'star' : 'stars'}`} aria-pressed={stars === rating}
              onClick={() => setRating(stars)} className={`text-4xl ${stars <= rating ? 'text-amber-600' : 'text-slate-400'}`}>★</button>)}
          </div>
          <label htmlFor="private-feedback" className="block text-left mt-4 mb-2">Your message (optional)</label>
          <textarea id="private-feedback" value={feedback} onChange={event => setFeedback(event.target.value)}
            maxLength={2000} className="w-full border rounded-xl p-3 min-h-[120px]" />
        </fieldset>
        <button type="button" onClick={submit} disabled={submitting || rating === 0}
          className="w-full border-2 border-[#0A3D7C] text-[#0A3D7C] font-bold py-3 rounded-xl disabled:opacity-50">
          {submitting ? 'Sending…' : 'Send private feedback'}
        </button>
        {error && <p role="alert" className="text-red-700 text-sm mt-3">{error}</p>}
      </>}
      <p className="text-sm text-slate-600 mt-4">Private feedback is sent to our team and is not posted as a Google review.</p>
    </>}
  </Centered>;
}

const Centered = ({ children }: { children: React.ReactNode }) => (
  <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">{children}</div>
  </main>
);
