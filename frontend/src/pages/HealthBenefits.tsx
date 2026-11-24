import { NaturePhoto } from '@/components/BreathMission';
import PageHero from '@/components/PageHero';
import { Link } from '@/components/CanonicalLink';
import SEOProvider from '@/components/SEOProvider';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { business } from '@/config/business';
import { serializeJsonLd } from '@/utils/seo/jsonLd.mjs';
import { Check, Phone, Plus, ArrowUpRight, ExternalLink } from 'lucide-react';

const faqs = [
  {
    question: 'Does the EPA recommend routine air duct cleaning for every home?',
    answer:
      'No. The EPA states that duct cleaning has never been shown to actually prevent health problems and does not recommend that air ducts be cleaned except on an as-needed basis—such as when there is substantial visible mold growth (verified and with the moisture source corrected), pest infestation, or ducts are clogged with excessive dust and debris actually released into the home from supply registers.',
  },
  {
    question: 'Can air duct cleaning cure allergies, asthma, or respiratory symptoms?',
    answer:
      'No. Air duct cleaning is a mechanical maintenance service for your HVAC system—not a medical treatment. While removing heavy dust or renovation debris from accessible ductwork clears the air pathway, indoor symptoms depend on many factors including outdoor pollen, pets, bedding, humidity, and ventilation. Always consult a physician for medical or allergy concerns.',
  },
  {
    question: 'What affects indoor air quality most in Los Angeles homes?',
    answer:
      'In Greater Los Angeles, indoor air is shaped by outdoor wildfire smoke (PM2.5), canyon and Santa Ana wind dust, freeway particulate, coastal marine moisture, indoor cooking and remodeling dust, and how well your HVAC return filter fits. Source control, proper ventilation, moisture management, and appropriately rated filtration work together alongside condition-based duct cleaning.',
  },
  {
    question: 'Should chemical biocides or sanitizers be sprayed inside air ducts for health reasons?',
    answer:
      'EPA guidance notes that the benefits and potential adverse effects of applying chemical biocides inside air ducts have not been fully established, and that no chemical biocides are registered for internally insulated ductwork. Always prioritize mechanical source removal and verify any proposed product’s EPA registration label and material compatibility first.',
  },
];

export default function HealthBenefits() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${business.url}/health-benefits/#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <SEOProvider
        title="Air Duct Cleaning & Indoor Air Quality: What to Know"
        description="Understand the role of duct cleaning, filtration, ventilation and moisture control in your Los Angeles home. Clear EPA-aligned guidance before you book."
        path="/health-benefits/"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Indoor air quality', item: '/health-benefits/' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />
      <NavBar alwaysOpaque />

      <PageHero
        title={
          <>
            Air Duct Cleaning &amp; Indoor Air Quality
            <br />
            <em>in Los Angeles Homes.</em>
          </>
        }
        description="Understand how source-removal air duct cleaning, HVAC filtration, and moisture control work together—and what questions to ask before booking an inspection."
        compact
      />

      <main className="pac-article pac-container pac-has-photo-hero">
        <div className="pac-health-opening">
          <span className="pac-eyebrow">EVERYDAY AIR. EVERYDAY LIFE.</span>
          <h2>Something so essential deserves honest information.</h2>
          <p>
            Breathing carries us through our days, often without a second thought. We believe caring for the air in the places we live and work starts with clear, science-backed guidance—never exaggerated promises or fear-driven sales pitches.
          </p>
          <NaturePhoto
            name="california-palms"
            alt="Sunlight falling through an open canopy of California palms"
          />
          <p>
            Understanding what your HVAC system actually needs—and where duct cleaning fits alongside filtration, ventilation, and moisture control—is how Pure Air California puts that belief into practice across Greater Los Angeles.
          </p>
        </div>

        <h2>What air duct cleaning can—and cannot—do</h2>
        <p>
          Air duct cleaning removes accumulated loose dust, construction debris, and particulate from the accessible supply and return ducts, registers, and HVAC components included in your written scope. It does <strong>not</strong> diagnose indoor air quality, cure allergies or asthma, or guarantee lower utility bills.
        </p>
        <p>
          The U.S. Environmental Protection Agency (EPA) does not recommend routine duct cleaning for every home on a fixed calendar. Instead, the EPA advises considering duct cleaning when specific, observable conditions exist inside the system:
        </p>
        <ul>
          <li>
            <strong>Excessive dust and debris</strong> clogging ductwork and actually being released into rooms from supply registers.
          </li>
          <li>
            <strong>Post-renovation or construction dust</strong> (drywall sanding, flooring, masonry) that entered open returns or supply runs.
          </li>
          <li>
            <strong>Evidence of vermin or pest infestation</strong> (rodents or insects) inside ductwork or accessible air-handler chases.
          </li>
          <li>
            <strong>Substantial visible mold growth</strong> on hard sheet-metal ducts or HVAC components—verified after the underlying moisture or condensation cause is identified and corrected.
          </li>
        </ul>

        {/* Side-by-side comparison grid */}
        <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <div className="rounded-xl border border-brand-200 bg-brand-50/70 p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
              ADDRESSED BY SOURCE-REMOVAL CLEANING
            </span>
            <h3 className="text-xl font-bold text-gray-900 mt-1 mb-4">
              When Mechanical Cleaning Helps
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-700">
              {[
                'Clearing settled remodel dust, drywall fines, and construction debris from ducts',
                'Extracting visible loose dust and pet hair from accessible supply and return trunks',
                'Cleaning accessible evaporator coil faces, blower wheels, and plenums',
                'Removing flammable lint accumulation from residential and commercial dryer exhaust runs',
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check size={17} className="text-brand-700 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
              REQUIRES OTHER SOLUTIONS OR SPECIALISTS
            </span>
            <h3 className="text-xl font-bold text-gray-900 mt-1 mb-4">
              What Duct Cleaning Does Not Replace
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-700">
              {[
                'Medical care or clinical advice for allergies, asthma, or respiratory conditions',
                'Fixing active roof leaks, clogged condensate drains, or coastal crawlspace dampness',
                'Replacing wet or mold-damaged fiberglass duct board and porous insulation',
                'Portable HEPA room filtration and tight window sealing during active wildfire smoke',
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check size={17} className="text-gray-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2>Los Angeles indoor air considerations</h2>
        <p>
          Homes and buildings across Los Angeles County face distinct environmental conditions depending on neighborhood micro-climate and construction era:
        </p>
        <ul>
          <li>
            <strong>Wildfire smoke &amp; canyon ash (Hillsides &amp; Foothills):</strong> Properties near the Santa Monica Mountains, Hollywood Hills, Pacific Palisades, Malibu, and Pasadena/Altadena foothills can experience fine smoke particulate and ash around exterior intakes and attic returns.{' '}
            <Link to="/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles/">
              See our wildfire smoke &amp; hillside assessment guide →
            </Link>
          </li>
          <li>
            <strong>High cooling-season runtime &amp; Santa Ana winds (Valleys):</strong> San Fernando Valley and San Gabriel Valley systems run heavily through hot summer and autumn wind months, making return-filter fit and coil cleanliness critical.{' '}
            <Link to="/services/hvac-system-cleaning/">Explore whole-system HVAC &amp; coil care →</Link>
          </li>
          <li>
            <strong>Marine layer humidity (Coastal &amp; Westside):</strong> Homes in Santa Monica, Venice, Brentwood, and the South Bay should monitor condensate drainage and attic insulation for moisture before considering any duct treatment.{' '}
            <Link to="/services/air-duct-sanitizing/">Read our sanitizing &amp; moisture guidance →</Link>
          </li>
          <li>
            <strong>Properly sized filtration:</strong> A snug, equipment-compatible air filter keeps everyday household dust from re-accumulating on coils and ducts.{' '}
            <Link to="/services/residential-electrostatic-filter/">
              Learn about electrostatic &amp; reusable filter care →
            </Link>
          </li>
        </ul>

        <h2>Five questions to ask before booking any duct service</h2>
        <ul>
          <li>What specific condition was observed inside my system, and where can I see it?</li>
          <li>Which exact ducts, registers, plenums, blowers, or coils are included in the written price?</li>
          <li>How will floors, furnishings, and occupied rooms be protected during negative-pressure extraction?</li>
          <li>Are any chemical treatments being proposed—and if so, why, what is the EPA registration label, and is it compatible with my duct material?</li>
          <li>What issues require an HVAC repair technician or restoration specialist instead of cleaning?</li>
        </ul>

        <h2>Independent public health &amp; safety resources</h2>
        <ul>
          <li>
            <a
              href="https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1"
            >
              U.S. EPA: Should You Have the Air Ducts in Your Home Cleaned?{' '}
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href="https://www.epa.gov/indoor-air-quality-iaq/air-cleaners-and-air-filters-home"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1"
            >
              U.S. EPA: Guide to Air Cleaners and Air Filters in the Home{' '}
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href="https://www.epa.gov/emergencies-iaq/wildfires-and-indoor-air-quality-iaq"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1"
            >
              U.S. EPA: Wildfires and Indoor Air Quality (IAQ){' '}
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          </li>
        </ul>

        {/* Visible FAQ Section matching FAQPage schema */}
        <section className="my-12 not-prose" aria-labelledby="iaq-faq-heading">
          <span className="pac-eyebrow">COMMON QUESTIONS</span>
          <h2 id="iaq-faq-heading" className="text-2xl md:text-3xl font-bold mt-2 mb-6 text-gray-900">
            Indoor Air Quality &amp; Duct Cleaning FAQs
          </h2>
          <div className="pac-service-faq-list border-t border-gray-200">
            {faqs.map((f) => (
              <details key={f.question}>
                <summary>
                  <h3>{f.question}</h3>
                  <Plus size={20} aria-hidden="true" />
                </summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="pac-article-cta">
          <span className="pac-eyebrow">INSPECTION-LED LOS ANGELES AIR CARE</span>
          <h2>Let’s start with your home and what you’ve noticed.</h2>
          <p>
            Eligible residential air duct cleaning starts at $299 and dryer vent cleaning starts at $149, with your written scope confirmed before any work begins. Or use our interactive checklist to prepare for your visit.
          </p>
          <div className="pac-actions">
            <Link
              className="pac-button"
              to="/quote/?service=air-duct&property=home#estimate-builder"
            >
              Build a free written estimate <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <a className="pac-text-link" href={business.phoneHref}>
              <Phone size={16} aria-hidden="true" /> Call {business.phone}
            </a>
            <Link className="pac-text-link" to="/air-quality-calculator/">
              Interactive indoor air checklist ↗
            </Link>
            <Link className="pac-text-link" to="/pricing/">
              See LA pricing guide ↗
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
