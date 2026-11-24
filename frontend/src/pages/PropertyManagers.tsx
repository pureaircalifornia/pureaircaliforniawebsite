import IndustryPageLayout from '@/components/IndustryPageLayout';
import { Link } from '@/components/CanonicalLink';
import { findBusiness } from '@/data/businessLocations';
import { quoteLink } from '@/utils/quoteContext.mjs';
import {
  ArrowRight,
  Building2,
  ClipboardCheck,
  FileCheck2,
  Flame,
  Users,
} from 'lucide-react';

const market = findBusiness('property-management')!;

const hoaCapabilities = [
  {
    icon: Flame,
    title: 'Multi-Unit Dryer Vent Stacks',
    detail:
      'Roof-terminated, side-wall, and shared vertical laundry exhaust runs cleared across townhomes, condos, and apartment buildings with exterior flap checks.',
  },
  {
    icon: FileCheck2,
    title: 'COI & Vendor Onboarding Ready',
    detail:
      'Provide your certificate of insurance wording, additional-insured endorsements, and billing portal details upfront so approval never stalls dispatch.',
  },
  {
    icon: Users,
    title: 'Resident Notice Coordination',
    detail:
      'We align entry windows, building-by-building sequences, key/escort sign-outs, and missed-unit tracking so managers avoid resident friction.',
  },
  {
    icon: Building2,
    title: 'Bulk Multi-Unit Written Pricing',
    detail:
      'Clear per-stack or per-building written proposals separating HOA common-area HVAC from individual unit-owner scopes before board sign-off.',
  },
];

export default function PropertyManagers() {
  return (
    <IndustryPageLayout
      title="Air Duct & Dryer Vent Cleaning for Property Managers & HOAs"
      subtitle="Give your Los Angeles County property a clear ventilation maintenance plan—coordinating multi-unit dryer vent stacks, common-area HVAC ductwork, COI compliance, and resident notice schedules before work begins."
      heroReassurance="All Los Angeles County · Units & shared systems · Clear approvals"
      estimateLabel="Get a property estimate"
      seoTitle="HOA & Property Manager Duct Cleaning Los Angeles County"
      seoDescription="Duct and dryer vent cleaning for LA County apartments, HOAs, and managed buildings. Coordinate resident notices, COI paperwork, and bulk written quotes."
      path="/property-managers"
      breadcrumbLabel={market.label}
      serviceName={market.service}
      process={[
        { step: 'Identify the systems & ownership boundary', detail: market.checklist[0] },
        { step: 'Coordinate resident access & COI paperwork', detail: market.schedule },
        { step: 'Confirm the written multi-unit scope', detail: market.boundary },
      ]}
      faqs={[
        { question: market.question, answer: market.answer },
        {
          question: 'Can you provide a COI and separate HOA vs. unit-owner invoices?',
          answer:
            'Yes. Share your management company COI requirements and how costs are split between HOA common areas and individual units so our written proposal matches your accounting workflow.',
        },
        {
          question: 'What information helps prepare a fast bulk multi-unit estimate?',
          answer: market.checklist.join('. '),
        },
        {
          question: 'Are all building systems included automatically?',
          answer: market.boundary,
        },
      ]}
    >
      <section className="pac-business-intro pac-container">
        <div>
          <span className="pac-eyebrow">BUILT FOR LA COUNTY HOAs &amp; PROPERTY TEAMS</span>
          <h2>{market.promise}</h2>
          <p>{market.intro}</p>
          <h3>Planning around occupied LA County properties</h3>
          <p>{market.schedule}</p>
          <div className="pac-hoa-quick-links">
            <Link
              to={quoteLink('/property-managers/', '', {
                service: 'dryer-vent',
                property: 'managed',
              })}
              className="pac-button"
            >
              Quote multi-unit dryer vents <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link
              to={quoteLink('/property-managers/', '', {
                service: 'air-duct',
                property: 'managed',
              })}
              className="pac-text-link"
            >
              Quote common-area HVAC ducts ↗
            </Link>
          </div>
          <p className="mt-4">
            <Link
              to="/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/"
              className="pac-text-link"
            >
              Explore full HOA &amp; multi-family dryer vent specifications ↗
            </Link>
          </p>
        </div>
        <figure>
          <img
            src="/images/locations/century-city.webp"
            srcSet="/images/locations/century-city-640.webp 640w, /images/locations/century-city.webp 1024w"
            sizes="(max-width: 900px) 100vw, 560px"
            alt="Commercial and multifamily buildings in Los Angeles"
            width={1024}
            height={1024}
            loading="lazy"
          />
        </figure>
      </section>

      <section className="pac-section pac-hoa-ops-band" aria-labelledby="hoa-ops-heading">
        <div className="pac-container">
          <div className="pac-section-heading">
            <div>
              <span className="pac-eyebrow">MULTI-UNIT COMPLIANCE &amp; OPERATIONS</span>
              <h2 id="hoa-ops-heading">
                Everything your board needs
                <br />
                <em>before approving dispatch.</em>
              </h2>
            </div>
            <p>
              From LA County condo associations to multifamily portfolios, we structure quotes so
              boards, asset managers, and onsite supers have zero surprises.
            </p>
          </div>
          <div className="pac-hoa-ops-grid">
            {hoaCapabilities.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="pac-hoa-ops-card">
                  <Icon size={22} aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </article>
              );
            })}
          </div>
          <div className="pac-hoa-checklist-download">
            <ClipboardCheck size={20} aria-hidden="true" />
            <div>
              <strong>Preparing a board packet or multi-building RFP?</strong>
              <span>
                Download our plain-text HOA &amp; facility planning checklist to gather unit counts,
                roof access, and approval contacts.
              </span>
            </div>
            <a
              className="pac-text-link"
              href="/resources/hoa-facility-planning-checklist.txt"
              download
            >
              Download planning checklist ↗
            </a>
          </div>
        </div>
      </section>

      <section className="pac-business-scope">
        <div className="pac-container">
          <h2>Care for the systems residents rely on.</h2>
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

      <section className="pac-section pac-container" aria-labelledby="property-handoff-heading">
        <div className="pac-section-heading">
          <div>
            <span className="pac-eyebrow">FROM APPROVAL TO COMPLETION</span>
            <h2 id="property-handoff-heading">
              A clear handoff.
              <br />
              <em>For every property.</em>
            </h2>
          </div>
          <p>
            Share the building ZIP code, system list, and authorized contact so the proposed work
            fits your responsibility.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <article>
            <h3 className="text-xl font-semibold mb-3">Approval &amp; responsibility</h3>
            <p className="text-gray-600 leading-relaxed">
              Identify who can approve the estimate and any additional work. Separate owner, HOA,
              and resident responsibilities before combining individual and common-area systems
              into a proposal.
            </p>
          </article>
          <article>
            <h3 className="text-xl font-semibold mb-3">Access &amp; scheduling</h3>
            <p className="text-gray-600 leading-relaxed">
              Discuss resident notices, keys or escorts, occupied units, and restricted work hours.
              Confirm the sequence and availability with PAC; record any missed access for
              follow-up.
            </p>
          </article>
          <article>
            <h3 className="text-xl font-semibold mb-3">Records for your team</h3>
            <p className="text-gray-600 leading-relaxed">
              Agree what the completion record should identify: serviced systems or units,
              inaccessible areas, and findings that need a separate decision. Request any photo or
              invoice requirements when the scope is prepared.
            </p>
          </article>
        </div>
        <div className="mt-10 border-t border-gray-200 pt-8">
          <h3 className="text-xl font-semibold mb-3">
            A documented scope for a housing organization’s office
          </h3>
          <p className="text-gray-600 leading-relaxed">
            The 2026 West Hollywood Community Housing Corporation record identifies four HVAC
            systems in its office. It offers a concrete example of component lists and access
            planning; it describes office work, not cleaning every residential property managed by
            the organization.
          </p>
          <Link className="pac-text-link" to="/case-studies/nonprofit-housing-office-hvac/">
            Read the recorded office scope ↗
          </Link>
        </div>
      </section>
    </IndustryPageLayout>
  );
}
