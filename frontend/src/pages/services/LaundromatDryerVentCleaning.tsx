import IndustryPageLayout from '@/components/IndustryPageLayout';
import { Link } from '@/components/CanonicalLink';
import { findBusiness } from '@/data/businessLocations';
import { Check } from 'lucide-react';

const market = findBusiness('laundromats')!;

export default function LaundromatDryerVentCleaning() {
  return (
    <IndustryPageLayout
      title="Laundromat Dryer Vent Cleaning in Los Angeles"
      subtitle="Keep high-volume dryer banks, shared exhaust manifolds, booster fans, and rooftop terminations clear of compacted lint—scheduled around your laundromat’s operating hours so machines dry quickly and safely."
      seoTitle="Laundromat Dryer Vent Cleaning Los Angeles | Pure Air CA"
      seoDescription="High-volume laundromat dryer vent, manifold & roof exhaust cleaning in Los Angeles. Off-hours scheduling & written scopes. Call (213) 792-4145."
      path="/services/laundromat-dryer-vent-cleaning"
      breadcrumbLabel={market.label}
      serviceName={market.service}
      heroReassurance="High-volume dryer banks · Shared manifolds · Early-morning & phased LA scheduling"
      estimateLabel="Get a laundromat vent quote"
      process={[
        {
          step: 'Map the dryer banks, manifolds & roof exits',
          detail:
            'Review machine count, single vs. stacked tumbler configurations, individual vs. shared overhead manifolds, cleanout hatches, and roof/wall terminations.',
        },
        {
          step: 'Confirm a written scope & off-peak work window',
          detail:
            'Agree on phased bank shutdowns or early-morning/overnight hours, COI documentation if leased, and confirmed pricing before any work starts.',
        },
        {
          step: 'Clear the full accessible path & log findings',
          detail:
            'Extract compacted lint across machine chases, manifolds, and accessible booster fans/caps, then review completion records and recommended cleaning intervals.',
        },
      ]}
      faqs={[
        { question: market.question, answer: market.answer },
        {
          question: 'What details help speed up a Los Angeles laundromat vent estimate?',
          answer:
            'Share your city/ZIP, total number of dryer pockets/stacks, whether exhaust ties into a common overhead manifold, roof or alley termination access, and your preferred off-peak work hours.',
        },
        {
          question: 'Can you clean one dryer bank at a time so our store stays open?',
          answer:
            'Yes—when machine layout and exhaust manifolds allow phased isolation, we can coordinate bank-by-bank windows or schedule outside peak customer hours.',
        },
        {
          question: 'How often should a busy Los Angeles laundromat clean its exhaust manifolds?',
          answer:
            'High-turnover coin and wash-and-fold laundromats typically need quarterly or semi-annual exhaust cleaning depending on daily load volume, lint-box design, and manifold length. Base your interval on actual inspected buildup.',
        },
        {
          question: 'Does exhaust cleaning include dryer repair, gas work, or duct fabrication?',
          answer: market.boundary,
        },
      ]}
    >
      <section className="pac-business-intro pac-container">
        <div>
          <span className="pac-eyebrow">FOR HIGH-VOLUME LAUNDRY OPERATORS</span>
          <h2>{market.promise}</h2>
          <p>{market.intro}</p>

          <h3 className="text-xl font-semibold mt-7 mb-3 text-gray-900">
            Warning signs your laundromat exhaust manifold is restricting airflow
          </h3>
          <ul className="space-y-2.5 mb-7">
            {[
              'Customers report machines taking extra quarters or cycles to dry normal loads',
              'Dryer pockets overheating, tripping high-limit switches, or throwing airflow fault codes',
              'Visible lint dust accumulating behind bulkheads, around cleanout doors, or on the roof',
              'Heavy heat buildup in the rear service aisle despite daily lint-drawer emptying',
            ].map((item) => (
              <li key={item} className="flex gap-2.5 text-gray-700">
                <Check size={18} className="text-brand-600 flex-shrink-0 mt-1" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mb-2 text-gray-900">A work window built around your customers</h3>
          <p className="mb-6">{market.schedule}</p>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Link className="pac-text-link" to="/services/dryer-vent-maintenance-program/">
              Recurring maintenance programs →
            </Link>
            <Link className="pac-text-link" to="/services/commercial-dryer-vent-cleaning/">
              Commercial dryer vent cleaning →
            </Link>
            <Link className="pac-text-link" to="/blog/laundromat-dryer-vent-cleaning-safety/">
              Laundromat exhaust planning guide →
            </Link>
            <Link className="pac-text-link" to="/pricing/">
              Pricing &amp; written estimates →
            </Link>
          </div>
        </div>
        <figure>
          <img
            src={market.image}
            alt={market.alt}
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            className="w-full rounded-sm"
          />
        </figure>
      </section>

      <section className="pac-business-scope">
        <div className="pac-container">
          <span className="pac-eyebrow">FULL-PATH EXHAUST CARE</span>
          <h2>Follow the exhaust path from tumbler bank to roof cap.</h2>
          <div className="pac-business-scope-grid">
            {market.scope.map((part, index) => (
              <article key={part.name}>
                <span className="pac-scope-number">0{index + 1}</span>
                <h3>{part.name}</h3>
                <p>{part.detail}</p>
              </article>
            ))}
          </div>
          <p className="pac-scope-boundary">{market.boundary}</p>
        </div>
      </section>
    </IndustryPageLayout>
  );
}
