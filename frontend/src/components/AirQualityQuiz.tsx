import { useState } from 'react';
import { ArrowRight, CheckCircle2, Phone, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/CanonicalLink';
import { business } from '@/config/business';
import { quoteLink } from '@/utils/quoteContext.mjs';
import type { EstimateAddon, EstimateService } from '@/utils/estimate';

type QuizStep = 'space' | 'concern' | 'factors' | 'result';

interface QuizState {
  step: QuizStep;
  property: 'home' | 'commercial' | 'managed';
  service: EstimateService;
  addons: EstimateAddon[];
}

/**
 * EPA-aligned LA Indoor Air Care mini-assessment.
 * Never fabricates medical diagnoses or contamination scores; prepares a practical inspection scope.
 */
const AirQualityQuiz = () => {
  const [state, setState] = useState<QuizState>({
    step: 'space',
    property: 'home',
    service: 'air-duct',
    addons: [],
  });

  const toggleAddon = (addon: EstimateAddon) => {
    setState((prev) => ({
      ...prev,
      addons: prev.addons.includes(addon)
        ? prev.addons.filter((item) => item !== addon)
        : [...prev.addons, addon],
    }));
  };

  const resetQuiz = () => {
    setState({ step: 'space', property: 'home', service: 'air-duct', addons: [] });
  };

  const progressWidth =
    state.step === 'space'
      ? '25%'
      : state.step === 'concern'
        ? '50%'
        : state.step === 'factors'
          ? '75%'
          : '100%';

  const estimateHref = quoteLink('/air-quality-calculator/', '', {
    service: state.service,
    property: state.property,
    addons: state.addons,
  });

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden relative max-w-2xl mx-auto">
      <div className="w-full h-1.5 bg-slate-100">
        <div
          className="h-full bg-brand-600 transition-all duration-300"
          style={{ width: progressWidth }}
        />
      </div>

      <div className="p-8 sm:p-10">
        {state.step !== 'result' && (
          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
              LA Indoor Air Care Check
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Prepare your inspection scope in 30 seconds
            </h3>
          </div>
        )}

        {state.step === 'space' && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-center text-slate-800">
              What type of Los Angeles property are you planning for?
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {[
                { key: 'home' as const, label: 'Single-family home, condo, or apartment' },
                { key: 'managed' as const, label: 'Managed multifamily building or HOA' },
                { key: 'commercial' as const, label: 'Commercial facility, office, or restaurant' },
              ].map((opt) => (
                <Button
                  key={opt.key}
                  type="button"
                  variant="outline"
                  className="py-5 justify-start px-5 text-left border-slate-200 hover:border-brand-600 hover:bg-brand-50"
                  onClick={() => setState((prev) => ({ ...prev, property: opt.key, step: 'concern' }))}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {state.step === 'concern' && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-center text-slate-800">
              What prompted you to check your ventilation?
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {[
                { key: 'air-duct' as const, label: 'Dust near vents, remodeling, or overdue duct check' },
                { key: 'dryer-vent' as const, label: 'Slow drying cycles, lint buildup, or dryer exhaust safety' },
                { key: 'filter' as const, label: 'Electrostatic filter sizing or ongoing filtration care' },
              ].map((opt) => (
                <Button
                  key={opt.key}
                  type="button"
                  variant="outline"
                  className="py-5 justify-start px-5 text-left border-slate-200 hover:border-brand-600 hover:bg-brand-50"
                  onClick={() => setState((prev) => ({ ...prev, service: opt.key, step: 'factors' }))}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {state.step === 'factors' && (
          <div className="space-y-5">
            <h4 className="text-lg font-semibold text-center text-slate-800">
              Any additional items to check during the same visit? (Optional)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(
                [
                  { id: 'wildfire-smoke', label: 'LA wildfire smoke / canyon ash check' },
                  { id: 'dryer-vent', label: 'Dryer vent lint clearing' },
                  { id: 'hvac-coil', label: 'Accessible HVAC coil & blower check' },
                  { id: 'filter', label: 'Electrostatic filter inspection' },
                ] as { id: EstimateAddon; label: string }[]
              )
                .filter((item) => item.id !== state.service)
                .map((item) => {
                  const active = state.addons.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleAddon(item.id)}
                      className={`p-4 rounded-xl border text-left text-sm font-semibold transition-colors ${
                        active
                          ? 'border-brand-600 bg-brand-50 text-brand-800'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
            </div>
            <div className="flex justify-center pt-2">
              <Button
                type="button"
                className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-5"
                onClick={() => setState((prev) => ({ ...prev, step: 'result' }))}
              >
                See My Inspection Summary <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        )}

        {state.step === 'result' && (
          <div className="text-center space-y-5">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-50 text-brand-700 mx-auto">
              <CheckCircle2 className="w-9 h-9" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Your tailored LA inspection checklist is ready</h3>
            <p className="text-slate-600 leading-relaxed max-w-lg mx-auto">
              Our technicians verify duct and vent condition on site and confirm your written scope
              before any cleaning begins. Residential air ducts start at $299 and dryer vents start
              at $149 for eligible scopes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700 text-white px-7">
                <Link to={estimateHref}>
                  Pre-fill My Free Estimate <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={business.phoneHref}>
                  <Phone className="mr-2 w-4 h-4" aria-hidden="true" /> {business.phone}
                </a>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-brand-600" aria-hidden="true" />
              <span>EPA-aligned, inspection-led care · No medical claims or hidden upsells</span>
            </div>
            <button
              type="button"
              onClick={resetQuiz}
              className="text-sm font-medium text-brand-700 underline underline-offset-4"
            >
              Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AirQualityQuiz;
