/**
 * Unsubscribe page for outreach emails. One button, then done. The button
 * (rather than unsubscribing on page load) keeps email security scanners that
 * pre-open links from unsubscribing people by accident; mailbox providers use
 * the one-click header instead and never see this page.
 */
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Link } from '@/components/CanonicalLink';
import SEOProvider from '@/components/SEOProvider';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { business } from '@/config/business';
import { unsubscribe } from '@/utils/outreachApi';

const TOKEN_PATTERN = /^[A-Za-z0-9_-]{16,64}$/;
type Status = 'idle' | 'sending' | 'done' | 'error';

export default function Unsubscribe() {
  const [params] = useSearchParams();
  const rawToken = params.get('t') || '';
  const token = TOKEN_PATTERN.test(rawToken) ? rawToken : '';
  const [status, setStatus] = useState<Status>('idle');

  const confirm = async () => {
    setStatus('sending');
    try {
      await unsubscribe(token);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  return <>
    <SEOProvider title="Unsubscribe | Pure Air California" description="Stop receiving emails from Pure Air California. One click and you will not hear from us by email again." path="/unsubscribe/" noIndex />
    <NavBar />
    <main className="pac-booking-thanks">
      <section className="pac-container" aria-labelledby="unsubscribe-title" style={{ maxWidth: 640 }}>
        <span className="pac-eyebrow">EMAIL PREFERENCES</span>
        <h1 id="unsubscribe-title" style={{ fontSize: 'clamp(32px, 4vw, 46px)', lineHeight: 1.15, letterSpacing: '-.035em', margin: '18px 0 20px' }}>
          {status === 'done' ? 'You are unsubscribed.' : 'Stop emails from Pure Air California'}
        </h1>

        {status === 'done' ? (
          <div className="pac-form-success" role="status">
            <CheckCircle size={30} aria-hidden="true" />
            <p style={{ marginTop: 12 }}>We won't email you again. Sorry for the interruption.</p>
          </div>
        ) : !token ? (
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#425f70' }}>
            This link is missing its code. Reply to the email with the word “unsubscribe”, or email{' '}
            <a href={`mailto:${business.email}?subject=unsubscribe`} style={{ textDecoration: 'underline' }}>{business.email}</a>, and we'll remove you.
          </p>
        ) : (
          <>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: '#425f70', marginBottom: 24 }}>
              Press the button and we won't email this address again.
            </p>
            <button className="pac-button" type="button" onClick={confirm} disabled={status === 'sending'}>
              {status === 'sending' ? <><Loader2 size={17} className="animate-spin" aria-hidden="true" /> Unsubscribing…</> : 'Unsubscribe me'}
            </button>
            {status === 'error' && (
              <p className="pac-form-error" role="alert">
                That didn't go through. Please try again, or reply to the email with the word “unsubscribe”.
              </p>
            )}
          </>
        )}
        <p style={{ marginTop: 40 }}><Link to="/">Back to Pure Air California</Link></p>
      </section>
    </main>
    <Footer showBreathingMoment={false} />
  </>;
}
