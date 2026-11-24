import { FormEvent, useId, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from '@/components/CanonicalLink';
import { CheckCircle, Loader2, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { submitFormWithBackend, prepareSubmission, type SubmissionDraft } from '@/utils/api';
import { business } from '@/config/business';
import { trackContactSubmission, trackQuoteSubmission, trackEvent } from '@/utils/tracking';
import { analyticsAllowed } from '@/utils/privacy.mjs';
import { quoteContext } from '@/utils/quoteContext.mjs';
import { formatPhoneInput, isValidEmail, isValidUSPhone, isValidZip } from '@/utils/validation';

type Props = {
  source?: 'quote_form' | 'contact_form';
  title?: string;
  initialMessage?: string;
  initialProperty?: string;
  initialService?: string;
};

export default function CallbackForm({
  source = 'quote_form',
  title = 'Let’s plan your clean.',
  initialMessage = '',
  initialProperty,
  initialService = 'Air duct cleaning',
}: Props) {
  const id = useId();
  const location = useLocation();
  const sending = useRef(false);
  const draft = useRef<SubmissionDraft | null>(null);
  const started = useRef(false);

  const routeContext = useMemo(
    () => quoteContext(location.pathname, location.search),
    [location.pathname, location.search]
  );
  const commercial = /industries|commercial|property-managers|partners/.test(location.pathname);

  const [data, setData] = useState({
    name: '',
    phone: '',
    email: '',
    zip: routeContext.locationZip || '',
    property: initialProperty ?? (commercial ? 'Business / commercial' : ''),
    service: initialService,
    message: initialMessage,
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'uncertain'>('idle');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const field = (key: keyof typeof data, value: string) => {
    setData((previous) => ({ ...previous, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const measure = (event: string, extra = {}) =>
    trackEvent(event, {
      form_type: source,
      property_type: data.property,
      service_type: data.service,
      ...extra,
    });

  const start = () => {
    if (!started.current && analyticsAllowed()) {
      started.current = true;
      measure('lead_form_start');
    }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending.current || status === 'uncertain') return;

    const nextErrors: Record<string, string> = {};
    if (data.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name.';
    }
    if (!isValidUSPhone(data.phone)) {
      nextErrors.phone = 'Please enter a phone number with at least 10 digits.';
    }
    if (!isValidEmail(data.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (data.zip.trim() && !isValidZip(data.zip)) {
      nextErrors.zip = 'Please enter a 5-digit ZIP code or leave blank.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      measure('lead_form_error', { error_type: 'validation' });
      setError(Object.values(nextErrors)[0]);
      setStatus('error');
      return;
    }

    setFieldErrors({});
    sending.current = true;
    setStatus('sending');
    setError('');
    measure('lead_form_attempt');

    const addressParts = [
      routeContext.locationLabel || '',
      data.zip.trim() ? `ZIP ${data.zip.trim()}` : '',
    ].filter(Boolean);
    const fullMessage = [
      routeContext.locationLabel ? `Area / neighborhood: ${routeContext.locationLabel}` : '',
      data.message.trim(),
    ]
      .filter(Boolean)
      .join('\n');

    try {
      draft.current = prepareSubmission(
        {
          name: data.name.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          property_type: data.property || 'Not sure yet',
          service: data.service,
          address: addressParts.join(', ') || undefined,
          message: fullMessage,
          source,
        },
        draft.current
      );
      const result = await submitFormWithBackend(draft.current.payload);
      if (!result.success) {
        measure('lead_form_error', {
          error_type: result.acceptance_unknown ? 'uncertain' : 'delivery',
        });
        setError(
          result.error || 'Your request could not be sent. Please call ' + business.phone + '.'
        );
        setStatus(result.acceptance_unknown ? 'uncertain' : 'error');
        return;
      }
      setStatus('success');
      if (source === 'contact_form') trackContactSubmission(result, data.service, data.property);
      else trackQuoteSubmission(result, data.service, data.property);
    } catch {
      measure('lead_form_error', { error_type: 'delivery' });
      setError(
        'Your request could not be sent. Your details are still here—please try again or call ' +
          business.phone +
          '.'
      );
      setStatus('error');
    } finally {
      sending.current = false;
    }
  };

  return (
    <div className="pac-callback" id={source === 'contact_form' ? 'contact-callback-form' : undefined}>
      {status === 'success' ? (
        <div className="pac-form-success" role="status">
          <CheckCircle size={32} aria-hidden="true" />
          <h3>Thanks. We’ll be in touch.</h3>
          <p>
            The Pure Air California team has received your request. We’ll follow up directly to
            discuss your property, scope, and next steps. A requested visit is confirmed directly
            with our team.
          </p>
          <a className="pac-button" href={business.phoneHref} data-call-location="callback-success">
            <Phone size={17} aria-hidden="true" /> Call {business.phone}
          </a>
        </div>
      ) : (
        <>
          <h2>{title}</h2>
          <p>
            Tell us a little about your space. Our Los Angeles team will help you work out a clear
            scope and next step—no obligation.
          </p>
          {routeContext.locationLabel && (
            <p className="pac-callback-location-pill">
              <MapPin size={14} aria-hidden="true" />
              <span>Serving {routeContext.locationLabel} &amp; Greater Los Angeles</span>
            </p>
          )}
          <form
            onSubmit={submit}
            onFocusCapture={start}
            onChangeCapture={start}
            onInvalidCapture={() => measure('lead_form_error', { error_type: 'validation' })}
            aria-busy={status === 'sending'}
            noValidate
          >
            <div className="pac-form-grid">
              <div>
                <label htmlFor={id + '-name'}>Your name</label>
                <input
                  id={id + '-name'}
                  name="name"
                  autoComplete="name"
                  placeholder="Full name"
                  value={data.name}
                  onChange={(e) => field('name', e.target.value)}
                  required
                  maxLength={120}
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? id + '-name-err' : undefined}
                />
                {fieldErrors.name && (
                  <span id={id + '-name-err'} className="pac-field-error">
                    {fieldErrors.name}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor={id + '-phone'}>Phone number</label>
                <input
                  id={id + '-phone'}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="(213) 555-0145"
                  value={data.phone}
                  onChange={(e) => field('phone', formatPhoneInput(e.target.value))}
                  required
                  maxLength={25}
                  aria-invalid={Boolean(fieldErrors.phone)}
                  aria-describedby={fieldErrors.phone ? id + '-phone-err' : undefined}
                />
                {fieldErrors.phone && (
                  <span id={id + '-phone-err'} className="pac-field-error">
                    {fieldErrors.phone}
                  </span>
                )}
              </div>

              <div className="pac-form-wide">
                <label htmlFor={id + '-email'}>Email address</label>
                <input
                  id={id + '-email'}
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={data.email}
                  onChange={(e) => field('email', e.target.value)}
                  required
                  maxLength={200}
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? id + '-email-err' : undefined}
                />
                {fieldErrors.email && (
                  <span id={id + '-email-err'} className="pac-field-error">
                    {fieldErrors.email}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor={id + '-zip'}>
                  Property ZIP code <span>(optional)</span>
                </label>
                <input
                  id={id + '-zip'}
                  name="postal-code"
                  autoComplete="postal-code"
                  inputMode="numeric"
                  pattern="[0-9]{5}"
                  maxLength={5}
                  placeholder={routeContext.locationZip || 'e.g. 90049'}
                  value={data.zip}
                  onChange={(e) => field('zip', e.target.value.replace(/\D/g, '').slice(0, 5))}
                  aria-invalid={Boolean(fieldErrors.zip)}
                  aria-describedby={fieldErrors.zip ? id + '-zip-err' : undefined}
                />
                {fieldErrors.zip && (
                  <span id={id + '-zip-err'} className="pac-field-error">
                    {fieldErrors.zip}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor={id + '-property'}>Your space</label>
                <select
                  id={id + '-property'}
                  value={data.property}
                  onChange={(e) => field('property', e.target.value)}
                >
                  <option value="">Select, or tell us later</option>
                  <option>Business / commercial</option>
                  <option>Managed property / HOA</option>
                  <option>Private home / estate</option>
                  <option>Home / apartment</option>
                </select>
              </div>

              <div className="pac-form-wide">
                <label htmlFor={id + '-service'}>How can we help?</label>
                <select
                  id={id + '-service'}
                  value={data.service}
                  onChange={(e) => field('service', e.target.value)}
                >
                  <option>Air duct cleaning</option>
                  <option>Dryer vent cleaning</option>
                  <option>HVAC system cleaning</option>
                  <option>Filters &amp; maintenance</option>
                  <option>Not sure—please advise</option>
                </select>
              </div>

              <div className="pac-form-wide">
                <label htmlFor={id + '-message'}>
                  Anything we should know? <span>(optional)</span>
                </label>
                <textarea
                  id={id + '-message'}
                  name="message"
                  rows={3}
                  value={data.message}
                  onChange={(e) => field('message', e.target.value)}
                  placeholder="Your neighborhood, system count, access notes, or what you’ve noticed…"
                  maxLength={3000}
                />
              </div>
            </div>

            {(status === 'error' || status === 'uncertain') && (
              <p className="pac-form-error" role="alert">
                {error}{' '}
                {status === 'uncertain' && (
                  <a href={business.phoneHref}>Call {business.phone} to confirm.</a>
                )}
              </p>
            )}

            <button
              className="pac-button"
              type="submit"
              disabled={status === 'sending' || status === 'uncertain'}
            >
              {status === 'sending' ? (
                <>
                  <Loader2 size={17} className="animate-spin" aria-hidden="true" /> Sending…
                </>
              ) : (
                <>
                  Request a call back <ArrowUpRight size={18} aria-hidden="true" />
                </>
              )}
            </button>

            <p className="pac-form-note">
              Direct response from our LA team—never shared or sold.{' '}
              <Link to="/privacy-policy/">Privacy policy</Link>. Prefer to talk now?{' '}
              <a href={business.phoneHref}>Call {business.phone}</a>.
            </p>
          </form>
        </>
      )}
    </div>
  );
}
