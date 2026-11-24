import { FormEvent, useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle, Phone, Loader2 } from 'lucide-react';
import { business } from '@/config/business';
import { submitFormWithBackend } from '@/utils/api';
import { trackQuoteSubmission } from '@/utils/tracking';
import { estimateLead, estimateServices, preliminaryEstimate, type EstimateDetails, type EstimateProperty, type EstimateService } from '@/utils/estimate';

const properties: EstimateProperty[] = ['Home / apartment', 'Business / commercial', 'Managed property / HOA'];
const servicePhotos: Record<EstimateService, string> = { 'air-duct': 'residential', 'dryer-vent': 'dryerAppliance', filter: 'filter', other: 'hvac' };
const dollars = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: Number.isInteger(amount) ? 0 : 2, maximumFractionDigits: 2 }).format(amount);

export default function EstimateBuilder() {
  const id = useId();
  const [data, setData] = useState<EstimateDetails>({ property: 'Home / apartment', service: 'air-duct', sqft: '', unsure: false, zip: '', name: '', phone: '', email: '', organization: '', address: '', systems: '', access: '', timing: '', message: '' });
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(step);
  const sending = useRef(false);
  const field = <K extends keyof EstimateDetails>(key: K, value: EstimateDetails[K]) => setData(current => ({ ...current, [key]: value }));
  const amount = preliminaryEstimate(data.property, data.service, data.unsure || !data.sqft ? null : Number(data.sqft));
  useEffect(() => {
    if (previousStep.current !== step) { heading.current?.focus(); previousStep.current = step; }
  }, [step]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending.current) return;
    setError('');
    if (step === 0) { setStep(1); return; }
    if (!data.name.trim() || data.phone.replace(/\D/g, '').length < 10) {
      setError('Please enter your name and a phone number with at least 10 digits.'); setStatus('error'); return;
    }
    sending.current = true; setStatus('sending');
    try {
      const result = await submitFormWithBackend(estimateLead(data));
      if (!result.success) throw new Error('Delivery failed');
      setStatus('success'); trackQuoteSubmission();
    } catch {
      setError('We could not send your request. Your details are still here. Please try again or call ' + business.phone + '.'); setStatus('error');
    } finally { sending.current = false; }
  };

  return <section id="estimate-builder" className="pac-estimate" aria-labelledby={id + '-heading'}>
    <div className="pac-estimate-intro"><span className="pac-eyebrow">A little about your space</span><h2 id={id + '-heading'}>Your estimate. Made easy.</h2><p>Get a planning estimate before sharing contact details. Add more information if you have it.</p></div>
    {status === 'success' ? <div className="pac-estimate-success" role="status"><CheckCircle size={36} aria-hidden="true"/><h3>Thank you. Your request is in.</h3><p>We’ll review your property details and follow up about the scope and price. Your service date is confirmed directly with PAC.</p><a className="pac-button" href={business.phoneHref}><Phone size={18}/> Call {business.phone}</a></div> : <div className="pac-estimate-layout">
      <form onSubmit={submit} aria-busy={status === 'sending'}>
        <ol className="pac-estimate-progress" aria-label="Estimate progress"><li aria-current={step === 0 ? 'step' : undefined}>01 / Your space</li><li aria-current={step === 1 ? 'step' : undefined}>02 / Your estimate</li></ol>
        <h3 ref={heading} tabIndex={-1}>{step === 0 ? 'What can we help with?' : 'Let’s make it personal.'}</h3>
        <fieldset disabled={status === 'sending'} className="pac-estimate-fields">
        {step === 0 ? <>
          <fieldset className="pac-estimate-property"><legend>Your property</legend>{properties.map(property => <label key={property}><input type="radio" name={id + '-property'} checked={data.property === property} onChange={() => field('property', property)}/><span>{property}</span></label>)}</fieldset>
          <fieldset><legend>Your service</legend><div className="pac-estimate-services">{(Object.keys(estimateServices) as EstimateService[]).map(service => <label key={service} className={data.service === service ? 'is-selected' : ''}><img src={'/images/pac/' + (service === 'air-duct' && data.property !== 'Home / apartment' ? 'commercial' : servicePhotos[service]) + '.webp'} alt="" width={400} height={200} loading="lazy"/><span><input type="radio" name={id + '-service'} checked={data.service === service} onChange={() => field('service', service)}/>{estimateServices[service]}</span></label>)}</div></fieldset>
          <div className="pac-form-grid">
            {data.service === 'air-duct' && <div><label htmlFor={id + '-sqft'}>Approximate square footage</label><input id={id + '-sqft'} type="number" inputMode="numeric" min={100} max={1000000} step={1} placeholder="e.g. 1,500" value={data.sqft} disabled={data.unsure} required={!data.unsure} onChange={event => field('sqft', event.target.value)}/><label className="pac-estimate-unsure"><input type="checkbox" checked={data.unsure} onChange={event => field('unsure', event.target.checked)}/> I’m not sure</label></div>}
            <div><label htmlFor={id + '-zip'}>Property ZIP code</label><input id={id + '-zip'} name="postal-code" autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{5}" title="Enter a five-digit ZIP code" maxLength={5} placeholder="e.g. 90049" value={data.zip} required onChange={event => field('zip', event.target.value)}/></div>
          </div>
        </> : <>
          <div className="pac-estimate-result" role="status"><span>{amount === null ? 'A tailored estimate' : data.service === 'air-duct' ? 'Your preliminary estimate' : 'Starting point'}</span><strong>{amount === null ? 'Let’s review your space.' : dollars(amount)}</strong><p>{estimateServices[data.service]} · {data.property}{data.service === 'air-duct' && !data.unsure && data.sqft ? ` · ${Number(data.sqft).toLocaleString()} sq ft` : ''} · {data.zip}</p><small>Planning guidance only. PAC confirms the included work, system count, access and final price before service.</small></div>
          <p className="pac-estimate-prompt">Where can our team reach you?</p>
          <div className="pac-form-grid">
            <div><label htmlFor={id + '-name'}>Your name</label><input id={id + '-name'} autoComplete="name" required maxLength={120} value={data.name} onChange={event => field('name', event.target.value)}/></div>
            <div><label htmlFor={id + '-phone'}>Phone number</label><input id={id + '-phone'} type="tel" autoComplete="tel" required maxLength={25} value={data.phone} onChange={event => field('phone', event.target.value)}/></div>
            <div className="pac-form-wide"><label htmlFor={id + '-email'}>Email address</label><input id={id + '-email'} type="email" autoComplete="email" required maxLength={200} value={data.email} onChange={event => field('email', event.target.value)}/></div>
          </div>
          <details className="pac-estimate-more"><summary>Add property details <span>Optional · for a more complete estimate</span></summary><div className="pac-form-grid">
            <div className="pac-form-wide"><label htmlFor={id + '-organization'}>Business / property name</label><input id={id + '-organization'} autoComplete="organization" maxLength={160} value={data.organization} onChange={event => field('organization', event.target.value)}/></div>
            <div className="pac-form-wide"><label htmlFor={id + '-address'}>Street address & city</label><input id={id + '-address'} autoComplete="street-address" maxLength={300} value={data.address} onChange={event => field('address', event.target.value)}/></div>
            <div><label htmlFor={id + '-systems'}>Systems / units</label><select id={id + '-systems'} value={data.systems} onChange={event => field('systems', event.target.value)}><option value="">Not sure</option><option>1</option><option>2</option><option>3–5</option><option>6 or more</option></select></div>
            <div><label htmlFor={id + '-access'}>Equipment access</label><select id={id + '-access'} value={data.access} onChange={event => field('access', event.target.value)}><option value="">Not sure</option><option>Easy indoor access</option><option>Attic / crawlspace</option><option>Rooftop</option><option>Multiple floors / units</option></select></div>
            <div className="pac-form-wide"><label htmlFor={id + '-timing'}>Preferred timing</label><select id={id + '-timing'} value={data.timing} onChange={event => field('timing', event.target.value)}><option value="">Flexible</option><option>As soon as available</option><option>Within a few weeks</option><option>Planning ahead</option><option>Outside business hours</option></select></div>
            <div className="pac-form-wide"><label htmlFor={id + '-message'}>What should we know?</label><textarea id={id + '-message'} rows={3} maxLength={2500} placeholder="What you’ve noticed, vent count, last cleaning, access instructions…" value={data.message} onChange={event => field('message', event.target.value)}/></div>
          </div></details>
        </>}
        {error && <p className="pac-form-error" role="alert">{error}</p>}
        <div className="pac-estimate-actions">{step === 1 && <button type="button" className="pac-estimate-back" onClick={() => { setStep(0); setError(''); }}><ArrowLeft size={17}/> Edit my space</button>}<button type="submit" className="pac-button">{status === 'sending' ? <><Loader2 size={17} className="animate-spin"/> Sending…</> : step === 0 ? <>See my estimate <ArrowRight size={18}/></> : <>Request my detailed estimate <ArrowRight size={18}/></>}</button></div>
        </fieldset>
        <p className="pac-form-note">{step === 0 ? 'No contact details needed to see your planning estimate.' : <>We’ll use your details to respond to this request. <Link to="/privacy-policy/">Privacy policy</Link>.</>}</p>
      </form>
      <aside className="pac-estimate-aside"><img src="/images/pac/consultation.webp" alt="A service professional talking through paperwork with a homeowner" width={600} height={600} loading="lazy"/><div><span className="pac-eyebrow">Real people. Helpful answers.</span><h3>Rather talk it through?</h3><p>Unusual system, larger property or just a question? That’s what we’re here for.</p><a href={business.phoneHref}><Phone size={18}/> {business.phone}</a><span className="pac-estimate-no-obligation">Free estimate · No obligation</span></div></aside>
    </div>}
  </section>;
}

