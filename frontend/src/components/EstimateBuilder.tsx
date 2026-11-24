import { FormEvent, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Link } from '@/components/CanonicalLink';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle,
  MessageSquare,
  Phone,
  Loader2,
  MapPin,
  ShieldCheck,
  X,
} from 'lucide-react';
import { business } from '@/config/business';
import { submitFormWithBackend, prepareSubmission, type SubmissionDraft } from '@/utils/api';
import { useLocation } from 'react-router-dom';
import { quoteContext } from '@/utils/quoteContext.mjs';
import { trackQuoteSubmission, trackEvent } from '@/utils/tracking';
import { analyticsAllowed } from '@/utils/privacy.mjs';
import {
  estimateAddons,
  estimateLead,
  estimatePlanningGuide,
  estimateServiceMeta,
  estimateServices,
  type EstimateAddon,
  type EstimateDetails,
  type EstimateProperty,
  type EstimateService,
} from '@/utils/estimate';
import { formatPhoneInput, isValidEmail, isValidUSPhone, isValidZip } from '@/utils/validation';
import BookingLink from './BookingLink';

const properties: EstimateProperty[] = [
  'Business / commercial',
  'Managed property / HOA',
  'Private home / estate',
  'Home / apartment',
];

const servicePhotos: Record<EstimateService, string> = {
  'air-duct': 'residential',
  'dryer-vent': 'dryerAppliance',
  filter: 'filter',
  other: 'hvac',
};

const systemChoices = [
  { value: '1', label: '1 system' },
  { value: '2', label: '2 systems' },
  { value: '3–5', label: '3–5 systems' },
  { value: '6 or more', label: '6+ / multi-unit' },
  { value: '', label: 'Not sure' },
];

const sqftPresets = [
  { value: '1200', label: 'Under 1,500' },
  { value: '2000', label: '1,500–2,500' },
  { value: '3200', label: '2,500–4,000' },
  { value: '4800', label: '4,000+' },
];

const allAddons: EstimateAddon[] = ['dryer-vent', 'filter', 'hvac-coil', 'wildfire-smoke'];

export default function EstimateBuilder() {
  const id = useId();
  const location = useLocation();
  const context = useMemo(
    () => quoteContext(location.pathname, location.search),
    [location.pathname, location.search]
  );

  const [data, setData] = useState<EstimateDetails>({
    property: context.propertyLabel as EstimateProperty,
    service: context.service as EstimateService,
    sqft: '',
    unsure: true,
    zip: context.locationZip || '',
    name: '',
    phone: '',
    email: '',
    organization: '',
    address: '',
    systems: '',
    access: '',
    timing: '',
    message: '',
    location: context.locationLabel || '',
    addons: (context.addons || []) as EstimateAddon[],
  });

  const draft = useRef<SubmissionDraft | null>(null);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'uncertain'>('idle');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const heading = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(step);
  const sending = useRef(false);
  const started = useRef(false);

  // Sync URL preset changes if the visitor navigates here with different query parameters
  useEffect(() => {
    if (status === 'success' || started.current) return;
    setData((current) => ({
      ...current,
      property: context.propertyLabel as EstimateProperty,
      service: context.service as EstimateService,
      location: context.locationLabel || current.location || '',
      zip: current.zip || context.locationZip || '',
      addons: (context.addons || []) as EstimateAddon[],
    }));
  }, [context, status]);

  const measure = (event: string, extra = {}) =>
    trackEvent(event, {
      form_type: 'quote_form',
      service_type: data.service,
      property_type: data.property,
      step_number: step + 1,
      ...extra,
    });

  const start = () => {
    if (!started.current && analyticsAllowed()) {
      started.current = true;
      measure('lead_form_start');
    }
  };

  const field = <K extends keyof EstimateDetails>(key: K, value: EstimateDetails[K]) => {
    setData((current) => {
      const next = { ...current, [key]: value };
      if (key === 'service' && current.addons?.length) {
        next.addons = current.addons.filter(
          (addon) =>
            !(value === 'dryer-vent' && addon === 'dryer-vent') &&
            !(value === 'filter' && addon === 'filter')
        );
      }
      return next;
    });
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const toggleAddon = (addon: EstimateAddon) => {
    start();
    setData((current) => {
      const existing = current.addons || [];
      const next = existing.includes(addon)
        ? existing.filter((item) => item !== addon)
        : [...existing, addon];
      return { ...current, addons: next };
    });
  };

  useEffect(() => {
    if (previousStep.current !== step) {
      heading.current?.focus();
      previousStep.current = step;
    }
  }, [step]);

  const availableAddons = allAddons.filter(
    (addon) =>
      !(data.service === 'dryer-vent' && addon === 'dryer-vent') &&
      !(data.service === 'filter' && addon === 'filter')
  );

  const guide = useMemo(() => estimatePlanningGuide(data), [data]);
  const isCommercialContext =
    data.property === 'Business / commercial' || data.property === 'Managed property / HOA';

  const smsBody = encodeURIComponent(
    `Hi Pure Air California, I'd like an estimate for ${estimateServices[data.service]} (${data.property}${data.location ? ` in ${data.location}` : data.zip ? ` - ZIP ${data.zip}` : ''}).`
  );

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending.current || status === 'uncertain') return;
    setError('');

    if (step === 0) {
      const stepErrors: Record<string, string> = {};
      if (!isValidZip(data.zip)) {
        stepErrors.zip = 'Please enter a 5-digit Los Angeles / Southern California ZIP code.';
      }
      if (data.service === 'air-duct' && !data.unsure) {
        const num = Number(data.sqft);
        if (!data.sqft || Number.isNaN(num) || num < 100) {
          stepErrors.sqft = 'Enter approximate square footage (100+) or select “I’m not sure.”';
        }
      }
      if (Object.keys(stepErrors).length > 0) {
        setFieldErrors(stepErrors);
        setError(Object.values(stepErrors)[0]);
        measure('lead_form_error', { error_type: 'validation' });
        return;
      }
      setFieldErrors({});
      measure('lead_form_step', { step_number: 2 });
      setStep(1);
      return;
    }

    const contactErrors: Record<string, string> = {};
    if (data.name.trim().length < 2) {
      contactErrors.name = 'Please enter your name so our team knows who to ask for.';
    }
    if (!isValidUSPhone(data.phone)) {
      contactErrors.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (!isValidEmail(data.email)) {
      contactErrors.email = 'Please enter a valid email address for your written estimate.';
    }

    if (Object.keys(contactErrors).length > 0) {
      setFieldErrors(contactErrors);
      measure('lead_form_error', { error_type: 'validation' });
      setError('Please enter your name, a 10-digit phone number, and a valid email address.');
      setStatus('error');
      return;
    }

    setFieldErrors({});
    sending.current = true;
    setStatus('sending');
    measure('lead_form_attempt');
    try {
      draft.current = prepareSubmission(estimateLead(data), draft.current);
      const result = await submitFormWithBackend(draft.current.payload);
      if (!result.success) {
        measure('lead_form_error', {
          error_type: result.acceptance_unknown ? 'uncertain' : 'delivery',
        });
        setError(
          result.error || 'We could not send your request. Please call ' + business.phone + '.'
        );
        setStatus(result.acceptance_unknown ? 'uncertain' : 'error');
        return;
      }
      setStatus('success');
      trackQuoteSubmission(result, estimateServices[data.service], data.property);
    } catch {
      measure('lead_form_error', { error_type: 'delivery' });
      setError(
        'We could not send your request. Your details are still here. Please try again or call ' +
          business.phone +
          '.'
      );
      setStatus('error');
    } finally {
      sending.current = false;
    }
  };

  return (
    <section id="estimate-builder" className="pac-estimate" aria-labelledby={id + '-heading'}>
      <div className="pac-estimate-intro">
        <span className="pac-eyebrow">A LITTLE ABOUT YOUR SPACE</span>
        <h2 id={id + '-heading'}>
          {data.location
            ? `Estimate for ${data.location} · ${estimateServices[data.service]}.`
            : 'An estimate for your property.'}
        </h2>
        <p>
          Select your property type, systems, and service scope to see transparent Los Angeles
          starting guidance and request a written estimate before any work begins.
        </p>
        {data.location && (
          <div className="pac-estimate-context-chip">
            <MapPin size={15} aria-hidden="true" />
            <span>
              Personalized for <strong>{data.location}</strong> · {data.property}
            </span>
            <button
              type="button"
              onClick={() => field('location', '')}
              aria-label={`Clear ${data.location} area tag`}
            >
              <X size={14} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {status === 'success' ? (
        <div className="pac-estimate-success" role="status">
          <CheckCircle size={38} aria-hidden="true" />
          <h3>Thank you. Your estimate request is in.</h3>
          <p>
            Our Los Angeles team received your request for{' '}
            <strong>{estimateServices[data.service]}</strong> ({data.property}
            {data.location ? ` in ${data.location}` : ''} · ZIP {data.zip}). We review every
            property directly and follow up to confirm scope, pricing, and available appointment
            windows.
          </p>
          <ul className="pac-estimate-next-list">
            <li>
              <Check size={16} aria-hidden="true" />
              <span>We review your system count, access notes, and any requested add-ons.</span>
            </li>
            <li>
              <Check size={16} aria-hidden="true" />
              <span>You receive a clear written scope before approving or scheduling work.</span>
            </li>
            <li>
              <Check size={16} aria-hidden="true" />
              <span>Submitting this request does not book an appointment or obligate you.</span>
            </li>
          </ul>
          <div className="pac-estimate-success-actions">
            <a className="pac-button" href={business.phoneHref} data-call-location="estimate-success">
              <Phone size={18} aria-hidden="true" /> Call {business.phone}
            </a>
            <button
              type="button"
              className="pac-estimate-back"
              onClick={() => {
                draft.current = null;
                setStatus('idle');
                setStep(0);
              }}
            >
              Build another estimate
            </button>
          </div>
        </div>
      ) : (
        <div className="pac-estimate-layout">
          <form
            onSubmit={submit}
            onFocusCapture={start}
            onChangeCapture={start}
            onInvalidCapture={() => measure('lead_form_error', { error_type: 'validation' })}
            aria-busy={status === 'sending'}
            noValidate
          >
            <ol className="pac-estimate-progress" aria-label="Estimate progress">
              <li aria-current={step === 0 ? 'step' : undefined}>01 / Your space &amp; scope</li>
              <li aria-current={step === 1 ? 'step' : undefined}>02 / Your contact details</li>
            </ol>

            <h3 ref={heading} tabIndex={-1}>
              {step === 0 ? 'What can we help with?' : 'Where should we send your written estimate?'}
            </h3>

            <fieldset
              disabled={status === 'sending' || status === 'uncertain'}
              className="pac-estimate-fields"
            >
              {step === 0 ? (
                <>
                  <fieldset className="pac-estimate-property">
                    <legend>Your property</legend>
                    {properties.map((property) => (
                      <label key={property}><input type="radio" name={id + '-property'} checked={data.property === property} onChange={() => field('property', property)}/><span>{property}</span></label>
                    ))}
                  </fieldset>

                  <fieldset>
                    <legend>Primary service</legend>
                    <div className="pac-estimate-services">
                      {(Object.keys(estimateServices) as EstimateService[]).map((service) => (
                        <label key={service} className={data.service === service ? 'is-selected' : ''}>
                          <img
                            src={
                              '/images/pac/' +
                              (service === 'air-duct' &&
                              ['Business / commercial', 'Managed property / HOA'].includes(
                                data.property
                              )
                                ? 'commercial'
                                : servicePhotos[service]) +
                              '.webp'
                            }
                            alt=""
                            aria-hidden="true"
                            width={400}
                            height={200}
                            loading="lazy"
                          />
                          <span>
                            <input
                              type="radio"
                              name={id + '-service'}
                              checked={data.service === service}
                              onChange={() => field('service', service)}
                            />
                            <span className="pac-service-choice-copy">
                              <strong>{estimateServices[service]}</strong>
                              <small>{estimateServiceMeta[service].startingCue}</small>
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="pac-estimate-pills-group">
                    <legend>How many HVAC systems or zones?</legend>
                    <div className="pac-estimate-pills" role="group" aria-label="Systems or zones">
                      {systemChoices.map((choice) => (
                        <button
                          key={choice.label}
                          type="button"
                          className={
                            'pac-estimate-pill' + (data.systems === choice.value ? ' is-active' : '')
                          }
                          aria-pressed={data.systems === choice.value}
                          onClick={() => field('systems', choice.value)}
                        >
                          {choice.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div className="pac-form-grid">
                    {data.service === 'air-duct' && (
                      <div>
                        <label htmlFor={id + '-sqft'}>Approximate square footage</label>
                        <input
                          id={id + '-sqft'}
                          type="number"
                          inputMode="numeric"
                          min={100}
                          max={1000000}
                          step={1}
                          placeholder="e.g. 1,800"
                          value={data.sqft}
                          disabled={data.unsure}
                          required={!data.unsure}
                          aria-invalid={Boolean(fieldErrors.sqft)}
                          aria-describedby={fieldErrors.sqft ? id + '-sqft-err' : undefined}
                          onChange={(event) => field('sqft', event.target.value)}
                        />
                        <div className="pac-sqft-presets" aria-label="Quick square footage presets">
                          {sqftPresets.map((preset) => (
                            <button
                              key={preset.value}
                              type="button"
                              className={
                                'pac-mini-chip' +
                                (!data.unsure && data.sqft === preset.value ? ' is-active' : '')
                              }
                              onClick={() => {
                                setData((prev) => ({
                                  ...prev,
                                  unsure: false,
                                  sqft: preset.value,
                                }));
                              }}
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>
                        <label className="pac-estimate-unsure">
                          <input
                            type="checkbox"
                            checked={data.unsure}
                            onChange={(event) => field('unsure', event.target.checked)}
                          />{' '}
                          I’m not sure
                        </label>
                        {fieldErrors.sqft && (
                          <span id={id + '-sqft-err'} className="pac-field-error">
                            {fieldErrors.sqft}
                          </span>
                        )}
                      </div>
                    )}

                    <div>
                      <label htmlFor={id + '-zip'}>Property ZIP code</label>
                      <input
                        id={id + '-zip'}
                        name="postal-code"
                        autoComplete="postal-code"
                        inputMode="numeric"
                        pattern="[0-9]{5}"
                        title="Enter a five-digit ZIP code"
                        maxLength={5}
                        placeholder={context.locationZip ? `e.g. ${context.locationZip}` : 'e.g. 90049'}
                        value={data.zip}
                        required
                        aria-invalid={Boolean(fieldErrors.zip)}
                        aria-describedby={fieldErrors.zip ? id + '-zip-err' : undefined}
                        onChange={(event) =>
                          field('zip', event.target.value.replace(/\D/g, '').slice(0, 5))
                        }
                      />
                      {fieldErrors.zip && (
                        <span id={id + '-zip-err'} className="pac-field-error">
                          {fieldErrors.zip}
                        </span>
                      )}
                    </div>
                  </div>

                  <fieldset className="pac-estimate-addons">
                    <legend>
                      Optional add-on care items <span>(optional · bundle in one visit)</span>
                    </legend>
                    <div className="pac-addon-grid">
                      {availableAddons.map((addonKey) => {
                        const selected = (data.addons || []).includes(addonKey);
                        const meta = estimateAddons[addonKey];
                        return (
                          <button
                            key={addonKey}
                            type="button"
                            className={'pac-addon-chip' + (selected ? ' is-active' : '')}
                            aria-pressed={selected}
                            onClick={() => toggleAddon(addonKey)}
                          >
                            <span className="pac-addon-check" aria-hidden="true">
                              {selected && <Check size={13} />}
                            </span>
                            <span>
                              <strong>{meta.label}</strong>
                              <small>{meta.note}</small>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                </>
              ) : (
                <>
                  <div className="pac-estimate-result" role="status">
                    <span>{guide.badge}</span>
                    <strong>{guide.headline}</strong>
                    <p>
                      {estimateServices[data.service]} · {data.property}
                      {data.location ? ` · ${data.location}` : ''}
                      {data.systems ? ` · ${data.systems} system(s)` : ''}
                      {data.service === 'air-duct' && !data.unsure && data.sqft
                        ? ` · ${Number(data.sqft).toLocaleString()} sq ft`
                        : ''}{' '}
                      · ZIP {data.zip}
                      {data.addons && data.addons.length > 0
                        ? ` · + ${data.addons.map((key) => estimateAddons[key].label).join(', ')}`
                        : ''}
                    </p>
                    <small>
                      No hidden upsells: PAC confirms the included work, system count, access, and
                      final price in writing before service starts. Submitting this request does not
                      book an appointment.
                    </small>
                  </div>

                  <p className="pac-estimate-prompt">
                    Where can our Los Angeles team reach you?
                  </p>

                  <div className="pac-form-grid">
                    <div>
                      <label htmlFor={id + '-name'}>Your name</label>
                      <input
                        id={id + '-name'}
                        autoComplete="name"
                        required
                        maxLength={120}
                        placeholder="Full name"
                        value={data.name}
                        aria-invalid={Boolean(fieldErrors.name)}
                        aria-describedby={fieldErrors.name ? id + '-name-err' : undefined}
                        onChange={(event) => field('name', event.target.value)}
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
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        maxLength={25}
                        placeholder="(213) 555-0145"
                        value={data.phone}
                        aria-invalid={Boolean(fieldErrors.phone)}
                        aria-describedby={fieldErrors.phone ? id + '-phone-err' : undefined}
                        onChange={(event) => field('phone', formatPhoneInput(event.target.value))}
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
                        type="email"
                        autoComplete="email"
                        required
                        maxLength={200}
                        placeholder="you@example.com"
                        value={data.email}
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={fieldErrors.email ? id + '-email-err' : undefined}
                        onChange={(event) => field('email', event.target.value)}
                      />
                      {fieldErrors.email && (
                        <span id={id + '-email-err'} className="pac-field-error">
                          {fieldErrors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <details className="pac-estimate-more">
                    <summary>
                      Add property, access &amp; timing details{' '}
                      <span>Optional · helps us prepare an even faster written scope</span>
                    </summary>
                    <div className="pac-form-grid">
                      <div className="pac-form-wide">
                        <label htmlFor={id + '-organization'}>Business, HOA, or property name</label>
                        <input
                          id={id + '-organization'}
                          autoComplete="organization"
                          maxLength={160}
                          value={data.organization}
                          onChange={(event) => field('organization', event.target.value)}
                        />
                      </div>
                      <div className="pac-form-wide">
                        <label htmlFor={id + '-address'}>Street address &amp; city</label>
                        <input
                          id={id + '-address'}
                          autoComplete="street-address"
                          maxLength={300}
                          placeholder={data.location ? `e.g. Street address, ${data.location}` : ''}
                          value={data.address}
                          onChange={(event) => field('address', event.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor={id + '-systems'}>Systems / units</label>
                        <select
                          id={id + '-systems'}
                          value={data.systems}
                          onChange={(event) => field('systems', event.target.value)}
                        >
                          <option value="">Not sure</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3–5</option>
                          <option>6 or more</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor={id + '-access'}>Equipment access</label>
                        <select
                          id={id + '-access'}
                          value={data.access}
                          onChange={(event) => field('access', event.target.value)}
                        >
                          <option value="">Not sure</option>
                          <option>Easy indoor access</option>
                          <option>Attic / crawlspace</option>
                          <option>Rooftop</option>
                          <option>Multiple floors / units</option>
                        </select>
                      </div>
                      <div className="pac-form-wide">
                        <label htmlFor={id + '-timing'}>Preferred timing</label>
                        <select
                          id={id + '-timing'}
                          value={data.timing}
                          onChange={(event) => field('timing', event.target.value)}
                        >
                          <option value="">Flexible</option>
                          <option>As soon as available</option>
                          <option>Within a few weeks</option>
                          <option>Planning ahead</option>
                          <option>Outside business hours</option>
                        </select>
                      </div>
                      <div className="pac-form-wide">
                        <label htmlFor={id + '-message'}>What should we know?</label>
                        <textarea
                          id={id + '-message'}
                          rows={3}
                          maxLength={2500}
                          placeholder="What you’ve noticed, vent count, last cleaning, wildfire smoke, gate/parking notes…"
                          value={data.message}
                          onChange={(event) => field('message', event.target.value)}
                        />
                      </div>
                    </div>
                  </details>
                </>
              )}

              {error && (
                <p className="pac-form-error" role="alert">
                  {error}{' '}
                  {status === 'uncertain' && (
                    <a href={business.phoneHref}>Call {business.phone} to confirm.</a>
                  )}
                </p>
              )}

              <div className="pac-estimate-actions">
                {step === 1 && (
                  <button
                    type="button"
                    className="pac-estimate-back"
                    onClick={() => {
                      setStep(0);
                      setError('');
                      setFieldErrors({});
                    }}
                  >
                    <ArrowLeft size={17} aria-hidden="true" /> Edit my space
                  </button>
                )}
                <button type="submit" className="pac-button">
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={17} className="animate-spin" aria-hidden="true" /> Sending…
                    </>
                  ) : step === 0 ? (
                    <>
                      Continue to contact details <ArrowRight size={18} aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      Request my free written estimate <ArrowRight size={18} aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>
            </fieldset>

            <p className="pac-form-note">
              {step === 0 ? (
                'No obligation and no credit card needed. Share what you know—our team confirms the rest.'
              ) : (
                <>
                  Handled directly by our Los Angeles team (no call centers). We use your details
                  only to respond to this request. <Link to="/privacy-policy/">Privacy policy</Link>.
                </>
              )}
            </p>
          </form>

          <aside className="pac-estimate-aside" aria-label="Live planning guide and direct contact">
            <div className="pac-estimate-live-guide">
              <span className="pac-eyebrow">{guide.badge}</span>
              <strong className="pac-guide-headline">{guide.headline}</strong>
              <p className="pac-guide-subline">{guide.subline}</p>

              <div className="pac-guide-section">
                <h4>What affects final LA pricing</h4>
                <ul>
                  {guide.costDrivers.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="pac-guide-section">
                <h4>Included in every PAC visit</h4>
                <ul className="pac-guide-checks">
                  {guide.included.map((item) => (
                    <li key={item}>
                      <Check size={15} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="pac-guide-guarantee">
                <ShieldCheck size={16} aria-hidden="true" />
                <span>No hidden upsells — final scope confirmed in writing on site.</span>
              </p>
            </div>

            <div className="pac-estimate-talk">
              <span className="pac-eyebrow">PREFER A DIRECT ANSWER?</span>
              <h3>Talk with our LA team.</h3>
              <p>
                Have a quick question about system access, condo HOA rules, or multi-unit timing?
                Call or text us directly.
              </p>
              <a
                className="pac-estimate-phone-link"
                href={business.phoneHref}
                data-call-location="estimate-aside"
              >
                <Phone size={18} aria-hidden="true" /> {business.phone}
              </a>
              <div className="pac-estimate-alt-actions">
                <a
                  className="pac-estimate-sms-link"
                  href={`sms:${business.phoneE164}?&body=${smsBody}`}
                >
                  <MessageSquare size={15} aria-hidden="true" /> Text our team
                </a>
                <BookingLink
                  className="pac-estimate-hcp-link"
                  service={isCommercialContext ? 'commercial' : 'residential'}
                  compact
                />
              </div>
              <span className="pac-estimate-no-obligation">
                Free written estimates · Serving Greater Los Angeles
              </span>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
