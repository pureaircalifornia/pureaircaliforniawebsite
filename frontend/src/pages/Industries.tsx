import React from 'react';
import { ArrowRight, ArrowUpRight, Phone, ShieldCheck, Clock, FileCheck2, Building2 } from 'lucide-react';
import BusinessAreaDirectory from '@/components/BusinessAreaDirectory';
import { businessCatalog } from '@/data/businessLocations';
import CommercialProof from '@/components/CommercialProof';
import PageHero from '@/components/PageHero';
import { Link } from '@/components/CanonicalLink';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import RelatedLinks from '@/components/RelatedLinks';
import SEOProvider from '@/components/SEOProvider';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { business } from '@/config/business';
import { seoConfig } from '@/utils/seo/seoConfig';
import { serializeJsonLd } from '@/utils/seo/jsonLd.mjs';

const INDUSTRIES = businessCatalog.map((data) => ({
  path: data.parentPath,
  name: data.label,
  blurb: data.intro,
  image: data.image,
  alt: data.alt,
}));

const commercialPillars = [
  {
    icon: FileCheck2,
    title: 'COI & Vendor Documentation',
    detail: 'Certificates of Insurance, additional-insured endorsements, and itemized written scopes aligned to your property management rules.',
  },
  {
    icon: Clock,
    title: 'Off-Hours & Phased LA Scheduling',
    detail: 'Early-morning, evening, weekend, or floor-by-floor service windows across Los Angeles County to avoid tenant and guest disruption.',
  },
  {
    icon: ShieldCheck,
    title: 'Clear System & Scope Boundaries',
    detail: 'Explicit separation between tenant units, base-building air handlers, commercial dryer risers, and specialty exhaust.',
  },
  {
    icon: Building2,
    title: 'Multi-Building Maintenance Plans',
    detail: 'Recurring HVAC duct, coil, filter, and dryer exhaust schedules with unit-by-unit completion logs for portfolio managers.',
  },
];

const Industries = () => {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${seoConfig.siteUrl}/industries/#list`,
    name: 'Industries served by Pure Air California',
    itemListElement: INDUSTRIES.map((i, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: i.name,
      url: `${seoConfig.siteUrl}${i.path.replace(/\/+$/, '')}/`,
    })),
  };

  return (
    <div className="pac-business-page min-h-screen flex flex-col">
      <SEOProvider
        title="Commercial Duct Cleaning by Industry"
        description="Duct and ventilation cleaning for LA healthcare, hospitality, restaurants, schools, retail and manufacturing facilities. Call (213) 792-4145."
        path="/industries/"
        mainEntityId={`${seoConfig.siteUrl}/industries/#list`}
        isLocalBusiness
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Industries', item: '/industries/' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemList) }}
      />

      <NavBar alwaysOpaque />

      <main className="flex-grow">
        <PageHero
          title={
            <>
              Commercial Air Duct &amp; HVAC Cleaning
              <br />
              <em>by Industry in Los Angeles.</em>
            </>
          }
          description="Site-specific air duct cleaning, commercial dryer exhaust maintenance, and HVAC component hygiene for Los Angeles offices, healthcare clinics, hotels, restaurants, schools, retail showrooms, HOAs, and industrial facilities."
          estimateHref="/quote/?service=air-duct&property=commercial#estimate-builder"
          estimateLabel="Get a commercial quote"
          reassurance="All Los Angeles County · COI-ready · Off-hours & weekend windows · Written scope before work"
        />

        {/* Commercial B2B Readiness Bar */}
        <section className="bg-slate-900 text-white py-10 border-b border-slate-800" aria-label="Commercial facility standards">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {commercialPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className="flex items-start gap-3.5">
                    <span className="p-2.5 rounded-lg bg-cyan-500/15 text-cyan-300 flex-shrink-0 mt-0.5">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="text-sm font-bold text-white tracking-wide">{pillar.title}</h2>
                      <p className="text-xs text-slate-300 leading-relaxed mt-1">{pillar.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-10">
              <span className="pac-eyebrow">SELECT YOUR FACILITY TYPE</span>
              <h2 className="text-3xl font-bold mt-2 mb-3 text-gray-900">
                Facility-Specific Scopes Across Los Angeles
              </h2>
              <p className="text-lg text-gray-600">
                Choose your property type to review equipment checklists, scheduling logistics, scope boundaries, and documented Los Angeles case studies.
              </p>
            </div>

            <div className="pac-business-cards">
              {INDUSTRIES.map((i) => (
                <article key={i.path} className="pac-business-card">
                  <Link to={i.path} tabIndex={-1} aria-hidden="true">
                    <img
                      src={i.image}
                      alt={i.alt}
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                    />
                  </Link>
                  <h2 className="text-2xl font-bold mb-3">
                    <Link to={i.path} className="hover:text-brand-700">
                      {i.name}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-5">{i.blurb}</p>
                  <Link
                    to={i.path}
                    className="inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-900"
                  >
                    {i.name} air care <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>

            {/* Direct links to core commercial services */}
            <div className="mt-16 bg-brand-50 border border-brand-100 rounded-2xl p-8 md:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <span className="pac-eyebrow">MIXED-USE &amp; MULTI-SYSTEM BUILDINGS</span>
                  <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-3 text-gray-900">
                    Operate a property that spans multiple systems?
                  </h2>
                  <p className="text-gray-600 text-lg mb-6">
                    Most Los Angeles commercial buildings combine tenant comfort HVAC with central air handlers, shared dryer exhaust risers, or garage ventilation. Tell us what you operate and we will prepare an itemized written proposal.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/quote/?service=air-duct&property=commercial#estimate-builder"
                      className="inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                      Get a commercial quote <ArrowUpRight size={17} aria-hidden="true" />
                    </Link>
                    <a
                      href={business.phoneHref}
                      className="inline-flex items-center gap-2 border border-brand-700 text-brand-700 hover:bg-white font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                      <Phone size={17} aria-hidden="true" /> {business.phone}
                    </a>
                    <Link
                      to="/case-studies/"
                      className="inline-flex items-center gap-2 text-brand-700 font-semibold py-3 px-4 hover:underline"
                    >
                      See documented LA projects →
                    </Link>
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
                    Core Commercial &amp; HOA Programs
                  </h3>
                  <ul className="space-y-2.5">
                    {[
                      ['Commercial Air Duct Cleaning', '/services/commercial-air-duct-cleaning/'],
                      [
                        'Commercial & HOA Air Duct + Dryer Vent Programs',
                        '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/',
                      ],
                      ['Commercial Dryer Vent Cleaning', '/services/commercial-dryer-vent-cleaning/'],
                      ['Property Managers & HOA Boards', '/property-managers/'],
                      ['Scheduled Dryer Vent Maintenance Plans', '/services/dryer-vent-maintenance-program/'],
                      ['Commercial Electrostatic Filter Service', '/services/commercial-electrostatic-filter/'],
                    ].map(([label, href]) => (
                      <li key={href}>
                        <Link
                          to={href}
                          className="flex items-center justify-between gap-2 bg-white rounded-lg border border-brand-100 px-4 py-2.5 text-sm font-semibold text-brand-800 hover:border-brand-300 transition-colors"
                        >
                          <span>{label}</span>
                          <ArrowUpRight size={15} aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BusinessAreaDirectory />
        <CommercialProof />
      </main>

      <RelatedLinks
        heading="Related services and proof"
        links={[
          { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning/' },
          {
            label: 'Commercial & HOA air duct + dryer vent care',
            path: '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/',
          },
          { label: 'Commercial dryer vent cleaning', path: '/services/commercial-dryer-vent-cleaning/' },
          { label: 'Commercial case studies', path: '/case-studies/' },
          { label: 'Property managers and HOAs', path: '/property-managers/' },
          { label: 'Los Angeles service coverage', path: '/locations/los-angeles/' },
        ]}
      />

      <Footer />
    </div>
  );
};

export default Industries;
