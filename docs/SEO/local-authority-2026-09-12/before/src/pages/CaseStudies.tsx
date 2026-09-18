import PageHero from '@/components/PageHero';
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import RelatedLinks from '@/components/RelatedLinks';
import SEOProvider from '@/components/SEOProvider';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { caseStudies } from './caseStudies/data';
import { seoConfig } from '@/utils/seo/seoConfig';
import { ArrowRight, Building2, MapPin } from 'lucide-react';

const CaseStudies = () => {
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
        description="Real Pure Air California commercial projects in Los Angeles — a 42-unit apartment community and a 3,137 sq ft office, with full scope, approach and outcomes."
        path="/case-studies"
       isLocalBusiness />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Case Studies', item: '/case-studies/' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />

      <NavBar alwaysOpaque />

      <main className="flex-grow">
        <PageHero title="A closer look at commercial air care." description="Explore how property access, service scope and coordination come together for commercial and multifamily projects."/>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {caseStudies.map((c) => (
                <article
                  key={c.slug}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 flex flex-col"
                >
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 size={15} aria-hidden="true" /> {c.vertical}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={15} aria-hidden="true" /> {c.location}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold mb-3">
                    <Link to={`/case-studies/${c.slug}`} className="hover:text-brand-700">
                      {c.title}
                    </Link>
                  </h2>

                  <p className="text-gray-600 mb-6">{c.seoDescription}</p>

                  <dl className="grid grid-cols-3 gap-4 mb-6 mt-auto">
                    {c.stats.map((s) => (
                      <div key={s.label}>
                        <dt className="text-xs uppercase tracking-wide text-gray-500">{s.label}</dt>
                        <dd className="text-lg font-semibold text-brand-800">{s.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <Link
                    to={`/case-studies/${c.slug}`}
                    className="inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-900"
                  >
                    Read the full project <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>

            <div className="max-w-3xl mx-auto mt-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-5">What these projects have in common</h2>
              <p className="text-lg text-gray-600 mb-5">
                Commercial ventilation work is rarely limited by the cleaning itself. It is limited by
                access: the building is occupied, the tenants or guests or patients are still in it, and
                the work has to happen without anyone losing a working day. Every project on this page
                was scoped around that constraint first.
              </p>
              <ul className="space-y-4 text-lg text-gray-600 mb-6">
                <li>
                  <strong className="text-gray-900">Scheduled around occupancy.</strong> Overnight,
                  weekends, term breaks or phased zone-by-zone — whatever keeps the building running.
                </li>
                <li>
                  <strong className="text-gray-900">Priced as a fixed figure up front.</strong> The
                  scope is agreed before work starts, and it does not move without your approval.
                </li>
                <li>
                  <strong className="text-gray-900">Documented per area.</strong> Before-and-after
                  photographs for each space, so what you receive is evidence rather than an invoice
                  line saying the job is done.
                </li>
                <li>
                  <strong className="text-gray-900">Whole-system, not just the ducts.</strong> Dryer
                  vents, garage exhaust and kitchen extraction are the systems no individual occupant
                  reports, so they are the ones most often left uncleaned for years.
                </li>
              </ul>
              <p className="text-lg text-gray-600">
                Clients here are described by property type rather than named. We publish a client's
                name only with their written permission, and we never publish contract or contact
                details from a job.
              </p>
            </div>

            <div className="max-w-3xl mx-auto mt-14 text-center">
              <h2 className="text-2xl font-bold mb-4">Have a commercial property in Los Angeles?</h2>
              <p className="text-lg text-gray-600 mb-6">
                We work around occupied buildings — evenings, weekends and phased schedules — so your
                tenants, guests or staff are not disrupted.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/quote"
                  className="bg-brand-700 hover:bg-brand-800 text-white font-bold py-3 px-7 rounded-lg transition-colors"
                >
                  Get a commercial quote
                </Link>
                <a
                  href="tel:2137924145"
                  className="border border-brand-700 text-brand-700 hover:bg-brand-50 font-bold py-3 px-7 rounded-lg transition-colors"
                >
                  Call (213) 792-4145
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <RelatedLinks heading="Related pages" links={[{ label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' }, { label: 'Industries we serve', path: '/industries' }, { label: 'Property managers and HOAs', path: '/property-managers' }]} />

      <Footer />
    </div>
  );
};

export default CaseStudies;
