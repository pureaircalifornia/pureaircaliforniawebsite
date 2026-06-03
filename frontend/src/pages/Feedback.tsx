import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API = (typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
  ? '/api' : (import.meta.env.VITE_API_BASE_URL || '/api');

const Feedback = () => {
  const { token } = useParams<{ token: string }>();
  const [name, setName] = useState('');
  const [valid, setValid] = useState<boolean | null>(null);
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [googleUrl, setGoogleUrl] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // noindex this page
    const m = document.createElement('meta');
    m.name = 'robots'; m.content = 'noindex,nofollow';
    document.head.appendChild(m);
    fetch(`${API}/reviews/feedback/${token}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => { setName(d.customer_name || 'there'); setValid(true); })
      .catch(() => setValid(false));
    return () => { document.head.removeChild(m); };
  }, [token]);

  const submit = async (stars: number, note?: string) => {
    if (submitting || stars < 1 || stars > 5) return; // guard double-submit + range
    setSubmitting(true);
    setError('');
    try {
      const r = await fetch(`${API}/reviews/feedback/${token}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: stars, private_feedback: note }),
      });
      if (!r.ok) throw new Error('request failed');
      const d = await r.json();
      setSubmitted(true);
      if (d.route === 'google' && d.google_review_url) {
        setGoogleUrl(d.google_review_url);
        window.location.href = d.google_review_url; // send happy customers straight to Google
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (valid === false) return <Centered>This link is invalid or has expired.</Centered>;
  if (valid === null) return <Centered>Loading…</Centered>;

  if (submitted && !googleUrl) return (
    <Centered>
      <h1 className="text-2xl font-bold mb-2">Thank you for your feedback</h1>
      <p className="text-slate-600">A manager will personally reach out to make this right.</p>
    </Centered>
  );

  return (
    <Centered>
      <h1 className="text-2xl font-bold mb-1">Hi {name}, how did we do?</h1>
      <p className="text-slate-600 mb-6">Tap a star — it takes 15 seconds.</p>
      <div className="flex gap-2 justify-center mb-6">
        {[1,2,3,4,5].map(s => (
          <button key={s} aria-label={`${s} stars`} onClick={() => setRating(s)}
            className={`text-4xl ${s <= rating ? 'text-yellow-400' : 'text-slate-300'}`}>★</button>
        ))}
      </div>
      {rating >= 4 && (
        <button onClick={() => submit(rating)} disabled={submitting}
          className="w-full bg-[#0A3D7C] text-white font-bold py-3 rounded-xl disabled:opacity-60">
          {submitting ? 'One moment…' : 'Leave a Google review →'}
        </button>
      )}
      {rating > 0 && rating < 4 && (
        <div className="space-y-3">
          <textarea value={feedback} onChange={e => setFeedback(e.target.value)}
            maxLength={2000}
            placeholder="What went wrong? We want to fix it."
            className="w-full border rounded-xl p-3 min-h-[120px]" />
          <button onClick={() => submit(rating, feedback)} disabled={submitting}
            className="w-full bg-[#0A3D7C] text-white font-bold py-3 rounded-xl disabled:opacity-60">
            {submitting ? 'Sending…' : 'Send private feedback'}
          </button>
        </div>
      )}
      {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
    </Centered>
  );
};

const Centered = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">{children}</div>
  </div>
);

export default Feedback;
