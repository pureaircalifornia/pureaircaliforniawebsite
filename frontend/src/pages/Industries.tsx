import { industryContent } from '@/data/industryContent';
import CommercialProof from '@/components/CommercialProof';
import PageHero from '@/components/PageHero';
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import RelatedLinks from '@/components/RelatedLinks';
import SEOProvider from '@/components/SEOProvider';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { seoConfig } from '@/utils/seo/seoConfig';
import { ArrowRight } from 'lucide-react';

/**
 * Hub page for the seven /industries/* verticals.
 *
 * These pages previously had no parent at all: there was no /industries/ route,
 * so nothing consolidated link equity across the commercial cluster and the
 * breadcrumb trail had to point at /services/ instead.
 */
const INDUSTRIES = Object.entries(industryContent).map(([slug, data]) => ({ path: '/industries/' + slug, name: data.label, blurb: data.intro }));

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
      url: `${seoConfig.siteUrl}${i.path}/`,
    })),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOProvider
        title="Commercial Duct Cleaning by Industry"
        description="Duct and ventilation cleaning for LA healthcare, hospitality, restaurants, schools, retail and manufacturing facilities. Call (213) 792-4145."
        path="/industries"
        mainEntityId={seoConfig.siteUrl + "/industries/#list"}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />

      <NavBar alwaysOpaque />

      <main className="flex-grow">
        <PageHero title="Your business deserves personal attention." description="Air duct and ventilation care for the places Los Angeles works, shops, learns and stays. A thoughtful plan starts with understanding your operation."/>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-5xl mx-auto">
              {INDUSTRIES.map((i) => (
                <article key={i.path} className="bg-white border border-gray-200 rounded-xl p-7 shadow-sm">
                  <h2 className="text-2xl font-bold mb-3">
                    <Link to={i.path} className="hover:text-brand-700">{i.name}</Link>
                  </h2>
                  <p className="text-gray-600 mb-5">{i.blurb}</p>
                  <Link
                    to={i.path}
                    className="inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-900"
                  >
                    {i.name} duct cleaning <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>

            <div className="max-w-3xl mx-auto mt-14 text-center">
              <h2 className="text-2xl font-bold mb-4">Not sure which applies to your property?</h2>
              <p className="text-lg text-gray-600 mb-6">
                Most commercial buildings span more than one of these. Tell us what you operate and we
                will scope it properly — including the systems that usually get missed, like parking
                garage exhaust and shared laundry vents.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/quote" className="bg-brand-700 hover:bg-brand-800 text-white font-bold py-3 px-7 rounded-lg transition-colors">
                  Get a commercial quote
                </Link>
                <Link to="/case-studies" className="border border-brand-700 text-brand-700 hover:bg-brand-50 font-bold py-3 px-7 rounded-lg transition-colors">
                  See completed projects
                </Link>
              </div>
            </div>
          </div>
        </section>
        <CommercialProof />
      </main>

      <RelatedLinks heading="Related services and proof" links={[{ label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' }, { label: 'Commercial dryer vent cleaning', path: '/services/commercial-dryer-vent-cleaning' }, { label: 'Commercial case studies', path: '/case-studies' }, { label: 'Property managers and HOAs', path: '/property-managers' }]} />

      <Footer />
    </div>
  );
};

export default Industries;
