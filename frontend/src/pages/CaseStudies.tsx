import React, { useState } from 'react';
import { ArrowRight, Building2, MapPin, Phone } from 'lucide-react';
import PageHero from '@/components/PageHero';
import { Link } from '@/components/CanonicalLink';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import RelatedLinks from '@/components/RelatedLinks';
import SEOProvider from '@/components/SEOProvider';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { Button } from '@/components/ui/button';
import { caseStudies } from './caseStudies/data';
import { seoConfig } from '@/utils/seo/seoConfig';
import { business } from '@/config/business';
import { serializeJsonLd } from '@/utils/seo/jsonLd.mjs';

const verticalFilters = [
  'All',
  'Hospitality',
  'Multifamily / Property Management',
  'Commercial Office / Nonprofit',
  'Restaurant / Café',
  'Restaurant / HVAC',
  'Retail / Showroom',
  'Fitness / Commercial Laundry',
  'Community / Recreation',
];

const CaseStudies = () => {
  const [selectedVertical, setSelectedVertical] = useState('All');

  const filteredStudies =
    selectedVertical === 'All'
      ? caseStudies
      : caseStudies.filter((c) => c.vertical === selectedVertical);

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${seoConfig.siteUrl}/case-studies/#list`,
    name: 'Pure Air California commercial case studies',
    itemListElement: caseStudies.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.title,
      url: `${seoConfig.siteUrl}/case-studies/${c.slug}/`,
    })),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOProvider
        title="Commercial Duct Cleaning Case Studies"
        description="Explore documented Los Angeles commercial air duct & dryer vent project records for Four Seasons, SoulCycle, Bassett, WHCHC & a 42-unit apartment."
        path="/case-studies/"
        mainEntityId={`${seoConfig.siteUrl}/case-studies/#list`}
        isLocalBusiness
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Case Studies', item: '/case-studies/' },
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
              Commercial &amp; Multifamily
              <br />
              <em>Air Duct Cleaning Case Studies.</em>
            </>
          }
          description="Explore documented Los Angeles scopes for hotels, fitness studios, retail showrooms, restaurants, offices, and multifamily apartment communities."
          estimateHref="/quote/?service=air-duct&property=commercial#estimate-builder"
          estimateLabel="Get a commercial quote"
        />

        <section className="bg-slate-900 text-white py-6 border-b border-slate-800">
          <div className="container mx-auto px-4 max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-cyan-400">
                Featured Case Studies Hub
              </span>
              <p className="text-sm text-slate-200 mt-0.5">
                Explore detailed scopes for Four Seasons Hotel LA, SoulCycle, Westchester YMCA, JJC Foods, WHCHC, and multi-family HOAs.
              </p>
            </div>
            <Link
              to="/project-stories/"
              className="inline-flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm px-5 py-2.5 rounded-lg whitespace-nowrap transition-colors"
            >
              View Project Stories Hub <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* Vertical Filter Bar */}
        <section className="py-6 bg-gray-50 border-b border-gray-200" aria-label="Filter case studies by facility type">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-wrap items-center gap-2">
              {verticalFilters.map((vertical) => {
                const active = selectedVertical === vertical;
                return (
                  <Button
                    key={vertical}
                    size="sm"
                    variant={active ? 'default' : 'outline'}
                    onClick={() => setSelectedVertical(vertical)}
                    aria-pressed={active}
                    className={
                      active
                        ? 'bg-brand-700 hover:bg-brand-800 text-white rounded-full'
                        : 'rounded-full bg-white text-gray-700 hover:text-brand-700'
                    }
                  >
                    {vertical}
                  </Button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {filteredStudies.map((c) => (
                <article
                  key={c.slug}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 flex flex-col hover:border-brand-300 transition-colors"
                >
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                    <span className="inline-flex items-center gap-1.5 font-medium text-brand-700">
                      <Building2 size={15} aria-hidden="true" /> {c.vertical}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={15} aria-hidden="true" /> {c.location}
                      {c.year ? ` · ${c.year}` : ''}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold mb-3">
                    <Link to={`/case-studies/${c.slug}/`} className="hover:text-brand-700">
                      {c.title}
                    </Link>
                  </h2>

                  <p className="text-gray-600 mb-6 leading-relaxed">{c.seoDescription}</p>

                  <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 mt-auto pt-4 border-t border-gray-100">
                    {c.stats.map((s) => (
                      <div key={s.label}>
                        <dt className="text-xs uppercase tracking-wide text-gray-500">{s.label}</dt>
                        <dd className="text-lg font-semibold text-brand-800">{s.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <Link
                    to={`/case-studies/${c.slug}/`}
                    className="inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-900"
                  >
                    Read the full project scope <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>

            <div className="max-w-3xl mx-auto mt-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-5">
                The right scope starts with the property.
              </h2>
              <p className="text-lg text-gray-600 mb-5">
                A studio dryer exhaust, a showroom HVAC system, a 42-unit apartment building, and an office with four units call for different plans. These selected past projects show the systems included and the Los Angeles locations served.
              </p>
              <p className="text-gray-600">
                For your project, we review equipment, COI paperwork, access, scheduling, and closeout documentation before you book. Named project summaries are based on PAC service records; they do not imply a current maintenance contract or a client endorsement.
              </p>
            </div>

            <div className="max-w-3xl mx-auto mt-14 text-center bg-brand-50 border border-brand-100 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-3">Have a commercial or HOA property in Los Angeles?</h2>
              <p className="text-lg text-gray-600 mb-6">
                Tell us about your systems, access requirements, and preferred schedule. We will prepare a clear written scope before work starts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/quote/?service=air-duct&property=commercial#estimate-builder"
                  className="bg-brand-700 hover:bg-brand-800 text-white font-bold py-3 px-7 rounded-lg transition-colors"
                >
                  Get a commercial quote
                </Link>
                <a
                  href={business.phoneHref}
                  className="inline-flex items-center justify-center gap-2 border border-brand-700 text-brand-700 hover:bg-white font-bold py-3 px-7 rounded-lg transition-colors"
                >
                  <Phone size={18} aria-hidden="true" /> Call {business.phone}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <RelatedLinks
        heading="Related pages"
        links={[
          { label: 'Project stories & case studies', path: '/project-stories/' },
          {
            label: 'Commercial & HOA air care',
            path: '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/',
          },
          { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning/' },
          { label: 'Commercial dryer vent cleaning', path: '/services/commercial-dryer-vent-cleaning/' },
          { label: 'Industries we serve', path: '/industries/' },
          { label: 'Property managers and HOAs', path: '/property-managers/' },
        ]}
      />

      <Footer />
    </div>
  );
};

export default CaseStudies;
