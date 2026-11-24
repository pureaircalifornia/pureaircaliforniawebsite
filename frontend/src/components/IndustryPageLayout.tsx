import PageHero from '@/components/PageHero';

import React, { ReactNode } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import QuoteForm from '@/components/QuoteForm';
import SEOProvider from '@/components/SEOProvider';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { business } from '@/config/business';
import { seoConfig } from '@/utils/seo/seoConfig';
import RelatedLinks from '@/components/RelatedLinks';
import { RELATED_BY_INDUSTRY, getAreaLinksForIndustry } from '@/utils/internalLinks';

interface IndustryPageLayoutProps {
  /** Visible <h1> for the page. */
  title: string;
  subtitle: string;
  heroImage?: string;
  /** <title> tag. Keep at or under 60 characters so it is not truncated in results. */
  seoTitle: string;
  /** Meta description. Aim for 140-160 characters. */
  seoDescription: string;
  /** Route path, e.g. "/industries/healthcare". Drives canonical + breadcrumbs. */
  path: string;
  /** Short label used in the breadcrumb trail, e.g. "Healthcare". */
  breadcrumbLabel: string;
  /** The commercial service this page sells, used for Service schema. */
  serviceName: string;
  /**
   * Vertical-specific Q&A. Rendered visibly AND as FAQPage schema — Google
   * requires FAQ structured data to match content the visitor can actually see.
   */
  faqs?: { question: string; answer: string }[];
  /**
   * How a job actually runs in this vertical. Ordered because it is a real
   * sequence — the numbering carries information rather than decorating.
   */
  process?: { step: string; detail: string }[];
  children: ReactNode;
}

const IndustryPageLayout = ({
  title,
  subtitle,
  heroImage,
  seoTitle,
  seoDescription,
  path,
  breadcrumbLabel,
  serviceName,
  faqs,
  process,
  children,
}: IndustryPageLayoutProps) => {
  const canonical = `${seoConfig.siteUrl}${path}/`;

  // Service schema so these commercial/industrial pages can rank for
  // "<industry> air duct cleaning Los Angeles" rather than being treated as
  // generic marketing pages.
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonical}#service`,
    name: serviceName,
    serviceType: serviceName,
    description: seoDescription,
    url: canonical,
    provider: {
      '@type': 'HVACBusiness',
      '@id': `${seoConfig.siteUrl}/#business`,
      name: 'Pure Air California',
      telephone: business.phone,
      url: seoConfig.siteUrl,
    },
    areaServed: {
      '@type': 'City',
      name: 'Los Angeles',
      containedInPlace: { '@type': 'State', name: 'California' },
    },
    audience: { '@type': 'BusinessAudience', name: breadcrumbLabel },
  };

  return (
    <div className="pac-industry-page min-h-screen flex flex-col">
      <SEOProvider
        title={seoTitle}
        description={seoDescription}
        path={path}
        mainEntityId={canonical + "#service"}
        isLocalBusiness
      />
      {/* /industries/ now exists as a real hub page, so the trail reflects the true
          hierarchy again rather than detouring through /services/. */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Industries', item: '/industries/' },
          { name: breadcrumbLabel, item: `${path}/` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <NavBar />

      {/* Hero Section */}
      <PageHero title={title} description={subtitle}/>

      {/* Main Content */}
      {children}

      {/* How a job runs in this vertical. */}
      {process && process.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-3">
                How We Work in {breadcrumbLabel} Facilities
              </h2>
              <p className="text-lg text-gray-600 mb-10">
                We discuss access, scheduling and work-area requirements before the visit. The plan should fit your equipment and the people who use the building.
              </p>
              <ol className="space-y-6">
                {process.map((s2, i) => (
                  <li key={s2.step} className="flex gap-5">
                    <span
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-gray-900">{s2.step}</h3>
                      <p className="text-gray-600">{s2.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* Vertical-specific FAQ. Visible content + matching FAQPage schema. */}
      {faqs && faqs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">
                {breadcrumbLabel} Air Duct Cleaning: Common Questions
              </h2>
              <dl className="space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.question} className="border-b border-gray-200 pb-6">
                    <dt className="text-xl font-semibold mb-2 text-gray-900">{faq.question}</dt>
                    <dd className="text-lg text-gray-600">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                '@id': `${canonical}#faq`,
                mainEntity: faqs.map((faq) => ({
                  '@type': 'Question',
                  name: faq.question,
                  acceptedAnswer: { '@type': 'Answer', text: faq.answer },
                })),
              }),
            }}
          />
        </section>
      )}

      {/* Contextual links out to the services and proof this vertical relates to. */}
      <RelatedLinks
        heading={`Related to ${breadcrumbLabel}`}
        links={RELATED_BY_INDUSTRY[path] || []}
      />

      {/* Service areas.
          City pages now link out to the industry pages, but the return path did not
          exist: every industry page linked to exactly one location, /locations/
          los-angeles/. A restaurant owner arriving here from a Sherman Oaks search
          had no route to anything local, and the industry pages carried no topical
          connection to the 54 city pages they are supposed to serve.

          Rotated by path so the seven industry pages do not all list the same
          cities, which would be a template footprint rather than a signal. */}
      <RelatedLinks
        heading={`${breadcrumbLabel} We Serve Across Los Angeles`}
        intro="We cover the whole of Los Angeles County. These are some of the areas we work in most often."
        links={getAreaLinksForIndustry(path, 8)}
        variant="grid"
      />

      {/* CTA and Quote Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Improve Your Indoor Air Quality?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Get a customized air quality solution for your specific needs. Our team of experts is ready to help your business maintain clean, healthy air.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
                <Button size="lg" variant="outline" className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  (213) 792-4145
                </Button>
              </div>
            </div>
            <div>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndustryPageLayout;
