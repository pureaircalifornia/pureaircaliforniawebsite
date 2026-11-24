/**
 * Free inspection request page: the destination of the link in outreach
 * emails. Two ways to book and nothing else: tap to call, or a short
 * form. The link's token only pre-fills the business name; the page works
 * the same without it.
 */
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Check, CheckCircle, Loader2, Phone } from 'lucide-react';
import { Link } from '@/components/CanonicalLink';
import SEOProvider from '@/components/SEOProvider';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { business } from '@/config/business';
import { requestInspection, viewBookingPage } from '@/utils/outreachApi';
import { formatPhoneInput, isValidUSPhone } from '@/utils/validation';

const TIME_WINDOWS = [
  'Weekday morning',
  'Weekday afternoon',
  'As soon as possible',
  'Call me to arrange',
];
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{16,64}$/;

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function FreeInspection() {
  const [params] = useSearchParams();
  const rawToken = params.get('t') || '';
  const token = TOKEN_PATTERN.test(rawToken) ? rawToken : '';

  const [greeting, setGreeting] = useState<string | null>(null);
  const [data, setData] = useState({
    name: '',
    phone: '',
    business_name: '',
    preferred_time: TIME_WINDOWS[0],
    notes: '',
    hp: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const sending = useRef(false);

  // Greets by business name, and wakes the API so the form submits quickly.
  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    viewBookingPage(token)
      .then((result) => {
        if (!cancelled && result.business_name) setGreeting(result.business_name);
      })
      .catch(() => {
        /* The page is fully usable without the greeting. */
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  const field = (key: keyof typeof data, value: string) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (sending.current) return;

    if (data.name.trim().length < 2) {
      setError('Please enter your name so we know who to ask for.');
      setStatus('error');
      return;
    }
    if (!isValidUSPhone(data.phone)) {
      setError('Please enter a 10-digit phone number so we can reach you.');
      setStatus('error');
      return;
    }

    sending.current = true;
    setStatus('sending');
    setError('');
    try {
      await requestInspection({
        token: token || undefined,
        name: data.name.trim(),
        phone: data.phone.trim(),
        business_name: (greeting || data.business_name).trim() || undefined,
        preferred_time: data.preferred_time,
        notes: data.notes.trim() || undefined,
        hp: data.hp || undefined,
      });
      setStatus('success');
    } catch (err) {
      const detail = err instanceof Error ? err.message : '';
      setError(
        /phone/i.test(detail)
          ? 'Please enter a 10-digit phone number so we can reach you.'
          : `Your request could not be sent. Your details are still here. Please try again, or call ${business.phone}.`
      );
      setStatus('error');
    } finally {
      sending.current = false;
    }
  };

  return (
    <>
      <SEOProvider
        title="Request a Free Inspection | Pure Air California"
        description="Request a free, no-obligation inspection of your building's air ducts and dryer vents in Los Angeles County. Call or send three quick details."
        path="/free-inspection/"
        noIndex
      />
      <NavBar />
      <main className="pac-booking-thanks">
        <section className="pac-container pac-booking-welcome" aria-labelledby="inspection-title">
          <div className="pac-booking-welcome-copy">
            <span className="pac-eyebrow">FREE INSPECTION · NO OBLIGATION</span>
            <h1 id="inspection-title">
              {greeting ? (
                <>
                  A free inspection
                  <br />
                  <em>for {greeting}.</em>
                </>
              ) : (
                <>
                  A free look at your
                  <br />
                  <em>ducts and dryer vents.</em>
                </>
              )}
            </h1>
            <p className="pac-booking-lead">
              We come out, look at the accessible air ducts and dryer vents, take clear photos, and
              tell you plainly what we find. If nothing needs doing, we’ll say so.
            </p>
            <a
              className="pac-button"
              href={business.phoneHref}
              data-call-location="free-inspection-hero"
            >
              <Phone size={17} aria-hidden="true" />
              Call {business.phone}
            </a>
            <ul className="pac-inspection-points">
              <li>
                <Check size={16} aria-hidden="true" />
                <span>Visual walkthrough of accessible ducts, plenums, and dryer exhausts</span>
              </li>
              <li>
                <Check size={16} aria-hidden="true" />
                <span>Photos of what we find plus a clear written price before any work</span>
              </li>
              <li>
                <Check size={16} aria-hidden="true" />
                <span>Zero charge for the inspection and zero obligation to proceed</span>
              </li>
            </ul>
            <p>Prefer not to call? Send the short form and our LA team will call you.</p>
          </div>

          <div className="pac-callback">
            {status === 'success' ? (
              <div className="pac-form-success" role="status">
                <CheckCircle size={32} aria-hidden="true" />
                <h3>Thanks. We’ll call you to set the time.</h3>
                <p>
                  We have your request. It is not a confirmed appointment yet—we’ll phone you
                  directly to agree on a convenient inspection window.
                </p>
                <a className="pac-button" href={business.phoneHref}>
                  <Phone size={17} aria-hidden="true" /> Call {business.phone}
                </a>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h2>Request your free inspection</h2>
                <p>Three quick details and we’ll take it from there.</p>
                <div className="pac-form-grid">
                  <div className="pac-form-wide">
                    <label htmlFor="inspection-name">Your name</label>
                    <input
                      id="inspection-name"
                      name="name"
                      autoComplete="name"
                      placeholder="Full name"
                      required
                      minLength={2}
                      maxLength={100}
                      value={data.name}
                      onChange={(e) => field('name', e.target.value)}
                    />
                  </div>
                  <div className="pac-form-wide">
                    <label htmlFor="inspection-phone">Best phone number</label>
                    <input
                      id="inspection-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="(213) 555-0145"
                      required
                      maxLength={30}
                      value={data.phone}
                      onChange={(e) => field('phone', formatPhoneInput(e.target.value))}
                    />
                  </div>
                  {!greeting && (
                    <div className="pac-form-wide">
                      <label htmlFor="inspection-business">
                        Business or property <span>(optional)</span>
                      </label>
                      <input
                        id="inspection-business"
                        name="organization"
                        autoComplete="organization"
                        maxLength={200}
                        value={data.business_name}
                        onChange={(e) => field('business_name', e.target.value)}
                      />
                    </div>
                  )}
                  <div className="pac-form-wide">
                    <label htmlFor="inspection-time">When suits you?</label>
                    <select
                      id="inspection-time"
                      value={data.preferred_time}
                      onChange={(e) => field('preferred_time', e.target.value)}
                    >
                      {TIME_WINDOWS.map((windowLabel) => (
                        <option key={windowLabel}>{windowLabel}</option>
                      ))}
                    </select>
                  </div>
                  <div className="pac-form-wide">
                    <label htmlFor="inspection-notes">
                      Anything we should know? <span>(optional)</span>
                    </label>
                    <textarea
                      id="inspection-notes"
                      name="notes"
                      rows={2}
                      maxLength={1000}
                      value={data.notes}
                      onChange={(e) => field('notes', e.target.value)}
                      placeholder="Number of units, access, what you've noticed…"
                    />
                  </div>
                  {/* Hidden from people; only automated form-fillers complete it. */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '-9999px',
                      width: 1,
                      height: 1,
                      overflow: 'hidden',
                    }}
                  >
                    <label htmlFor="inspection-hp">Leave this field empty</label>
                    <input
                      id="inspection-hp"
                      tabIndex={-1}
                      autoComplete="off"
                      value={data.hp}
                      onChange={(e) => field('hp', e.target.value)}
                    />
                  </div>
                </div>
                {status === 'error' && (
                  <p className="pac-form-error" role="alert">
                    {error}
                  </p>
                )}
                <button className="pac-button" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={17} className="animate-spin" aria-hidden="true" /> Sending…
                    </>
                  ) : (
                    <>
                      Request my free inspection <ArrowUpRight size={17} aria-hidden="true" />
                    </>
                  )}
                </button>
                <p className="pac-form-note">
                  We’ll use these details only to arrange your inspection. See our{' '}
                  <Link to="/privacy-policy/">privacy policy</Link>.
                </p>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer showBreathingMoment={false} />
    </>
  );
}
