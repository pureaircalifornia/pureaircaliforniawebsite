import { useState } from 'react';
import { ArrowRight, Building2, Check, Home, Phone, ShieldCheck, Wind } from 'lucide-react';
import { Link } from '@/components/CanonicalLink';
import { business } from '@/config/business';
import { quoteLink } from '@/utils/quoteContext.mjs';
import {
  estimatePlanningGuide,
  type EstimateProperty,
  type EstimateService,
} from '@/utils/estimate';

const serviceOptions: { id: EstimateService; label: string; cue: string; icon: typeof Home }[] = [
  { id: 'air-duct', label: 'Air Duct Cleaning', cue: 'From $299 residential', icon: Home },
  { id: 'dryer-vent', label: 'Dryer Vent Cleaning', cue: 'From $149 residential', icon: Wind },
  { id: 'filter', label: 'Electrostatic Filter Care', cue: 'Written scope', icon: ShieldCheck },
  { id: 'other', label: 'Commercial / HVAC Scope', cue: 'Written proposal', icon: Building2 },
];

const propertyOptions: { key: 'home' | 'estate' | 'managed' | 'commercial'; label: EstimateProperty }[] = [
  { key: 'home', label: 'Home / apartment' },
  { key: 'estate', label: 'Private home / estate' },
  { key: 'managed', label: 'Managed property / HOA' },
  { key: 'commercial', label: 'Business / commercial' },
];

/**
 * Transparent LA planning guide widget.
 * Never manufactures binding prices or submits fake estimated_price values; routes straight into
 * /quote/#estimate-builder with the user's selected service and property type.
 */
const PricingEstimator = () => {
  const [service, setService] = useState<EstimateService>('air-duct');
  const [propertyKey, setPropertyKey] = useState<'home' | 'estate' | 'managed' | 'commercial'>('home');
  const [systems, setSystems] = useState('1');

  const propertyLabel =
    propertyOptions.find((item) => item.key === propertyKey)?.label || 'Home / apartment';
  const guide = estimatePlanningGuide({
    property: propertyLabel,
    service,
    systems,
    sqft: '',
    unsure: true,
    access: '',
    addons: [],
  });

  const estimateHref = quoteLink('/pricing/', '', { service, property: propertyKey });

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-8 border border-slate-200 rounded-2xl shadow-lg bg-white">
      <span className="pac-eyebrow">TRANSPARENT LA STARTING GUIDE</span>
      <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-6 text-slate-900">
        Explore Your Starting Scope
      </h2>

      <fieldset className="mb-5">
        <legend className="text-sm font-semibold text-slate-700 mb-2">Property type</legend>
        <div className="grid grid-cols-2 gap-2">
          {propertyOptions.map((opt) => (
            <button
              key={opt.key}
              type="button"
              aria-pressed={propertyKey === opt.key}
              onClick={() => setPropertyKey(opt.key)}
              className={`px-3 py-2.5 rounded-lg border text-sm font-semibold text-left transition-colors ${
                propertyKey === opt.key
                  ? 'border-brand-600 bg-brand-50 text-brand-800'
                  : 'border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mb-5">
        <legend className="text-sm font-semibold text-slate-700 mb-2">Service</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {serviceOptions.map((opt) => {
            const Icon = opt.icon;
            const selected = service === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setService(opt.id)}
                className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-colors ${
                  selected
                    ? 'border-brand-600 bg-brand-50 text-brand-800'
                    : 'border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <Icon className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <strong className="block text-sm">{opt.label}</strong>
                  <small className="text-xs text-slate-500">{opt.cue}</small>
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mb-6">
        <label htmlFor="pricing-estimator-systems" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Approximate HVAC systems / units
        </label>
        <select
          id="pricing-estimator-systems"
          value={systems}
          onChange={(e) => setSystems(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 bg-white"
        >
          <option value="1">1 system</option>
          <option value="2">2 systems</option>
          <option value="3–5">3–5 systems</option>
          <option value="6 or more">6 or more / multi-unit</option>
          <option value="">Not sure</option>
        </select>
      </div>

      <div className="p-5 rounded-xl bg-brand-50 border border-brand-100 mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-700">{guide.badge}</span>
        <p className="text-2xl font-bold text-slate-900 mt-1 mb-2">{guide.headline}</p>
        <p className="text-sm text-slate-600 mb-4">{guide.subline}</p>
        <ul className="space-y-1.5 text-sm text-slate-700">
          {guide.included.slice(0, 3).map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link className="pac-button flex-1 justify-center" to={estimateHref}>
          Continue in Estimate Builder <ArrowRight size={17} aria-hidden="true" />
        </Link>
        <a className="pac-text-link justify-center" href={business.phoneHref}>
          <Phone size={16} aria-hidden="true" /> {business.phone}
        </a>
      </div>
    </div>
  );
};

export default PricingEstimator;
