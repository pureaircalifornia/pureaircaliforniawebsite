import { useState, useRef } from 'react';
import { Link } from '@/components/CanonicalLink';
import { ArrowRight, Check, Flame, Home, Phone, ShieldCheck, Wind } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import SEOProvider from '@/components/SEOProvider';
import { business } from '@/config/business';
import { quoteLink } from '@/utils/quoteContext.mjs';
import type { EstimateAddon, EstimateService } from '@/utils/estimate';

const questions = [
  {
    title: 'What kind of space do you look after?',
    options: [
      'Home or apartment',
      'Business or commercial property',
      'Managed building or HOA',
    ],
  },
  {
    title: 'What would you like help with first?',
    options: [
      'Dust or debris near vents',
      'Dryer exhaust or lint',
      'Filter or HVAC maintenance',
      'Planning ahead or getting advice',
    ],
  },
  {
    title: 'What do you know about the system history?',
    options: [
      'I have service records',
      'The service history is unclear',
      'I need help identifying the system',
    ],
  },
];

type FactorId =
  | 'wildfire'
  | 'renovation'
  | 'pets'
  | 'dryer-slow'
  | 'dryer-roof'
  | 'older-home'
  | 'coil-odor';

const laFactors: { id: FactorId; label: string; detail: string }[] = [
  {
    id: 'wildfire',
    label: 'LA wildfire smoke or canyon ash',
    detail: 'Smoke odor, soot, or fine ash exposure in the past 2 years',
  },
  {
    id: 'renovation',
    label: 'Recent remodeling or drywall work',
    detail: 'Sanding, flooring, or construction while vents were uncovered',
  },
  {
    id: 'pets',
    label: 'Indoor pets or fast dust buildup',
    detail: 'Visible pet hair or recurring lint/dust around return grilles',
  },
  {
    id: 'dryer-slow',
    label: 'Slow clothes drying or warm laundry room',
    detail: 'Loads taking >1 cycle, hot dryer exterior, or lint near the hood',
  },
  {
    id: 'dryer-roof',
    label: 'Multi-story or roof dryer exhaust',
    detail: 'Vent travels upward through a ceiling, attic, or shared stack',
  },
  {
    id: 'older-home',
    label: 'Home or ducts older than 15 years',
    detail: 'Historic LA ductwork, attic trunk runs, or unsealed plenums',
  },
  {
    id: 'coil-odor',
    label: 'Musty startup odor or uneven airflow',
    detail: 'Worth visually inspecting accessible coils, drain pans & blowers',
  },
];

export default function AirQualityCalculator() {
  const [answers, setAnswers] = useState<string[]>(['', '', '']);
  const [factors, setFactors] = useState<FactorId[]>([]);
  const [done, setDone] = useState(false);
  const result = useRef<HTMLDivElement>(null);

  function toggleFactor(id: FactorId) {
    setFactors((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }

  function finish(event: React.FormEvent) {
    event.preventDefault();
    setDone(true);
    requestAnimationFrame(() => {
      result.current?.focus({ preventScroll: true });
      result.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
  }

  const isDryerPrimary = answers[1] === 'Dryer exhaust or lint';
  const isFilterPrimary = answers[1] === 'Filter or HVAC maintenance';
  const isManaged = answers[0] === 'Managed building or HOA';
  const isCommercial = answers[0] === 'Business or commercial property';
  const isB2B = isManaged || isCommercial;

  const hasWildfire = factors.includes('wildfire');
  const hasRenovation = factors.includes('renovation');
  const hasPets = factors.includes('pets');
  const hasDryerSignals = factors.includes('dryer-slow') || factors.includes('dryer-roof');
  const hasOlderHome = factors.includes('older-home');
  const hasCoilOdor = factors.includes('coil-odor');

  const recommendedProperty = isManaged ? 'managed' : isCommercial ? 'commercial' : 'home';
  const recommendedService: EstimateService = isDryerPrimary
    ? 'dryer-vent'
    : isFilterPrimary && !hasWildfire && !hasRenovation
      ? 'filter'
      : 'air-duct';

  const recommendedAddons: EstimateAddon[] = [];
  if ((hasDryerSignals || isDryerPrimary) && recommendedService !== 'dryer-vent') {
    recommendedAddons.push('dryer-vent');
  }
  if (hasWildfire) recommendedAddons.push('wildfire-smoke');
  if (hasCoilOdor) recommendedAddons.push('hvac-coil');
  if ((hasPets || isFilterPrimary) && recommendedService !== 'filter') {
    recommendedAddons.push('filter');
  }

  const prefilledQuoteHref = quoteLink('/air-quality-calculator/', '', {
    service: recommendedService,
    property: recommendedProperty,
    addons: recommendedAddons,
  });

  const recommendedServicePage = hasWildfire && !isDryerPrimary
    ? {
        path: '/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles/',
        label: 'Explore wildfire smoke & hillside duct cleaning',
      }
    : isManaged
      ? {
          path: '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/',
          label: 'Explore HOA & multi-family ventilation specs',
        }
      : isDryerPrimary
        ? {
            path: isB2B
              ? '/services/commercial-dryer-vent-cleaning/'
              : '/services/residential-dryer-vent-cleaning/',
            label: 'Explore dryer vent cleaning',
          }
        : isB2B
          ? {
              path: '/services/commercial-air-duct-cleaning/',
              label: 'Explore commercial air duct cleaning',
            }
          : {
              path: '/services/residential-air-duct-cleaning/',
              label: 'Explore residential air duct cleaning',
            };

  const recommendedServicesSummary: { name: string; detail: string; badge: string }[] = [];
  if (recommendedService === 'air-duct') {
    recommendedServicesSummary.push({
      name: isB2B ? 'Commercial / HOA Air Duct Inspection & Cleaning' : 'Residential Air Duct Cleaning',
      detail: hasRenovation
        ? 'Focus on clearing remodeling dust from returns, supply boots, and main trunk lines.'
        : hasWildfire
          ? 'Inspect return plenums, filter racks, and ductwork for canyon smoke ash before cleaning.'
          : 'Walkthrough of accessible supply/return ducts, registers, and air handler cabinet.',
      badge: isB2B ? 'Written custom scope' : 'Starting at $299',
    });
  } else if (recommendedService === 'dryer-vent') {
    recommendedServicesSummary.push({
      name: isB2B ? 'Commercial / Multi-Unit Dryer Exhaust Cleaning' : 'Residential Dryer Vent Cleaning',
      detail: factors.includes('dryer-roof')
        ? 'Full lint clearing along vertical or roof-terminated runs plus exterior hood flap verification.'
        : 'Source removal of compacted lint from behind the dryer to the exterior termination.',
      badge: isB2B ? 'Written custom scope' : 'Starting at $149',
    });
  } else {
    recommendedServicesSummary.push({
      name: 'Electrostatic Filter & HVAC Component Check',
      detail: 'Verify filter sizing/seal and review accessible blower & coil cleanliness before committing to full duct cleaning.',
      badge: 'Inspection-led scope',
    });
  }

  if (recommendedAddons.includes('dryer-vent')) {
    recommendedServicesSummary.push({
      name: 'Add-On: Dryer Vent Cleaning',
      detail: 'Recommended alongside duct care based on your drying-time or vent-routing flags.',
      badge: isB2B ? 'Bundled scope' : 'From $149 residential',
    });
  }
  if (recommendedAddons.includes('wildfire-smoke')) {
    recommendedServicesSummary.push({
      name: 'Add-On: Post-Wildfire Smoke & Ash Walkthrough',
      detail: 'Check return filters, plenums, and insulation for residual ash before running AC/heat heavily.',
      badge: 'LA wildfire protocol',
    });
  }
  if (recommendedAddons.includes('hvac-coil')) {
    recommendedServicesSummary.push({
      name: 'Add-On: Accessible Coil & Blower Review',
      detail: 'Inspect visible evaporator coil, condensate pan, and blower wheel for dust buildup or moisture signs.',
      badge: 'Confirmed on site',
    });
  }
  if (recommendedAddons.includes('filter')) {
    recommendedServicesSummary.push({
      name: 'Add-On: Filter Fit & Electrostatic Upgrade Check',
      detail: 'Verify return filter seal so pet hair and fine dust stop bypassing into the air handler.',
      badge: 'Confirmed on site',
    });
  }

  const prioritizedSteps: string[] = [
    'Have your Los Angeles ZIP code and best callback number ready so we can confirm scheduling coverage.',
    isB2B
      ? 'Note total systems or units, who approves the written proposal, COI requirements, and permitted work hours.'
      : 'Count how many thermostats or air handlers serve the home (e.g., main house vs. upstairs zone or ADU) and where they are accessed.',
  ];
  if (hasWildfire) {
    prioritizedSteps.push(
      'Check your current HVAC air filter for grey/black soot discoloration and note if smoke odor intensifies when the fan turns on.'
    );
  }
  if (hasRenovation) {
    prioritizedSteps.push(
      'Mention which rooms were remodeled and whether the HVAC fan ran during drywall sanding or demolition.'
    );
  }
  if (isDryerPrimary || hasDryerSignals) {
    prioritizedSteps.push(
      'Note whether the dryer exhaust exits through a side wall or up through the roof, and whether a booster fan or stacked unit is present.'
    );
  }
  if (hasOlderHome) {
    prioritizedSteps.push(
      'Flag older attic or crawlspace ductwork, tight closet hatches, or delicate interior finishes so our crew plans protective access.'
    );
  }
  if (hasCoilOdor) {
    prioritizedSteps.push(
      'Ask our technician to check accessible return air filters, condensate drain pan, and blower housing during the initial walkthrough.'
    );
  }
  prioritizedSteps.push(
    answers[2] === 'I have service records'
      ? 'Keep your last service invoice or equipment model numbers handy to compare prior scope.'
      : 'Take a quick phone photo of your air handler or laundry hookup if convenient—not required, just helpful for faster scoping.'
  );

  return (
    <>
      <SEOProvider
        title="LA Air Duct & Dryer Vent Checklist | Pure Air California"
        description="Use our interactive Los Angeles indoor air care assessment to build an EPA-aligned maintenance checklist and pre-fill a free written estimate."
        path="/air-quality-calculator/"
      />
      <NavBar />
      <main>
        <PageHero
          title={
            <>
              Los Angeles Indoor Air &amp;
              <br />
              <em>Dryer Vent Care Checklist.</em>
            </>
          }
          description="Answer three quick questions and flag any Los Angeles property conditions—from wildfire smoke to roof dryer vents—to generate an EPA-aligned maintenance checklist and pre-fill your free estimate."
          compact
        />

        <section className="pac-checklist pac-container">
          {!done ? (
            <form onSubmit={finish}>
              <h2>Build your personalized LA maintenance checklist.</h2>
              <p className="pac-checklist-sub">
                Takes under 60 seconds. No email required to view your tailored checklist.
              </p>

              {questions.map((question, i) => (
                <fieldset key={question.title}>
                  <legend>
                    <span>0{i + 1}</span> {question.title}
                  </legend>
                  {question.options.map((option) => (
                    <label key={option}>
                      <input
                        type="radio"
                        name={'question-' + i}
                        required
                        checked={answers[i] === option}
                        onChange={() =>
                          setAnswers((previous) =>
                            previous.map((value, j) => (j === i ? option : value))
                          )
                        }
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </fieldset>
              ))}

              <div className="pac-checklist-factors">
                <div className="pac-checklist-factors-head">
                  <span>04</span>
                  <div>
                    <h3>Any of these Los Angeles conditions apply? (Optional)</h3>
                    <p>Select all that match your home or building to tailor your checklist.</p>
                  </div>
                </div>
                <div className="pac-factor-grid" role="group" aria-label="Los Angeles property conditions">
                  {laFactors.map((factor) => {
                    const active = factors.includes(factor.id);
                    return (
                      <button
                        key={factor.id}
                        type="button"
                        className={'pac-factor-card' + (active ? ' is-active' : '')}
                        aria-pressed={active}
                        onClick={() => toggleFactor(factor.id)}
                      >
                        <span className="pac-factor-check" aria-hidden="true">
                          {active && <Check size={14} />}
                        </span>
                        <span>
                          <strong>{factor.label}</strong>
                          <small>{factor.detail}</small>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button className="pac-button" type="submit">
                See my personalized LA checklist <ArrowRight size={18} aria-hidden="true" />
              </button>
            </form>
          ) : (
            <div ref={result} tabIndex={-1} className="pac-checklist-result">
              <span className="pac-eyebrow">YOUR EPA-ALIGNED LA AIR CARE PLAN</span>
              <h2>Here’s what to prioritize for your space.</h2>
              <p className="pac-checklist-selected">
                Based on: <strong>{answers.join(' · ')}</strong>
                {factors.length > 0 && (
                  <>
                    {' '}
                    + {factors.length} LA condition{factors.length === 1 ? '' : 's'} flagged
                  </>
                )}
                .
              </p>

              <div className="pac-checklist-recs">
                <h3>Recommended services to discuss</h3>
                <div className="pac-checklist-rec-grid">
                  {recommendedServicesSummary.map((item) => (
                    <article key={item.name} className="pac-checklist-rec-card">
                      <span className="pac-rec-badge">{item.badge}</span>
                      <h4>{item.name}</h4>
                      <p>{item.detail}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="pac-checklist-priority">
                <h3>Your pre-visit checklist</h3>
                <ul>
                  {prioritizedSteps.map((stepText) => (
                    <li key={stepText}>{stepText}</li>
                  ))}
                </ul>
              </div>

              <div className="pac-checklist-cta-box">
                <div>
                  <span className="pac-eyebrow">READY FOR A WRITTEN SCOPE?</span>
                  <h3>Get a free estimate pre-filled with these items.</h3>
                  <p>
                    We carry your selected property type and recommended items straight into our LA
                    Estimate Builder—no need to re-enter them.
                  </p>
                </div>
                <div className="pac-actions">
                  <Link className="pac-button" to={prefilledQuoteHref}>
                    Get an estimate for these items <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                  <a
                    href={business.phoneHref}
                    className="pac-text-link"
                    data-call-location="calculator-result"
                  >
                    <Phone size={16} aria-hidden="true" /> Call {business.phone}
                  </a>
                </div>
              </div>

              <div className="pac-checklist-footer-links">
                <Link className="pac-text-link" to={recommendedServicePage.path}>
                  {recommendedServicePage.label} →
                </Link>
                <button
                  type="button"
                  className="pac-text-link"
                  onClick={() => setDone(false)}
                >
                  Edit my answers
                </button>
              </div>
            </div>
          )}

          <aside>
            <div className="pac-checklist-trust-note">
              <ShieldCheck size={20} aria-hidden="true" />
              <div>
                <h2>Inspection-led. EPA-aligned. Zero scare tactics.</h2>
                <p>
                  No online quiz can measure indoor air quality or diagnose hidden ductwork—and air
                  duct cleaning is not a medical treatment for allergies or asthma. This checklist
                  helps you organize real physical signs (dust, remodeling debris, wildfire ash,
                  lint buildup) so our technicians can verify what actually needs attention before
                  quoting.
                </p>
              </div>
            </div>

            <div className="pac-checklist-guides">
              <article>
                <Home size={18} aria-hidden="true" />
                <h3>Air Duct Cleaning</h3>
                <p>
                  Note thermostat/air-handler count, recent filter changes, and any remodeling or
                  smoke events. <Link to="/services/residential-air-duct-cleaning/">Residential</Link>{' '}
                  (from $299) or <Link to="/services/commercial-air-duct-cleaning/">Commercial</Link>.
                </p>
              </article>
              <article>
                <Flame size={18} aria-hidden="true" />
                <h3>Dryer Vent Safety</h3>
                <p>
                  Watch for cycles taking over 45 minutes, excess laundry heat, or lint near exterior
                  hoods. <Link to="/services/residential-dryer-vent-cleaning/">Residential</Link>{' '}
                  (from $149) or{' '}
                  <Link to="/services/commercial-dryer-vent-cleaning/">Commercial / HOA</Link>.
                </p>
              </article>
              <article>
                <Wind size={18} aria-hidden="true" />
                <h3>EPA Indoor Air Guidance</h3>
                <p>
                  Learn when cleaning is recommended versus filter upgrades or moisture fixes in our{' '}
                  <Link to="/health-benefits/">indoor air guide</Link> and{' '}
                  <Link to="/pricing/">Los Angeles pricing breakdown</Link>.
                </p>
              </article>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
