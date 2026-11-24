import ServiceFieldPhotos from '@/components/ServiceFieldPhotos';
import ServiceResources from '@/components/ServiceResources';
import PageHero from '@/components/PageHero';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SEOProvider from '@/components/SEOProvider';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { Button } from '@/components/ui/button';
import { seoConfig } from '@/utils/seo/seoConfig';
import { business } from '@/config/business';
import { canonicalUrl } from '@/utils/seo/canonicalUrl';
import { Check, Phone } from 'lucide-react';

/**
 * Layout for service pages built from structured content rather than bespoke JSX.
 *
 * The original eight service pages are ~400 lines of hand-written markup each.
 * New pages use this instead so the SEO scaffolding (canonical, Service schema,
 * breadcrumbs, visible FAQ matched by FAQPage schema) is guaranteed present and
 * correct rather than re-implemented per page.
 */
export interface ServiceDetailProps {
  seoTitle: string;
  seoDescription: string;
  path: string;
  h1: string;
  intro: string;
  serviceName: string;
  breadcrumbLabel: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
  faqs: { question: string; answer: string }[];
  relatedLinks?: { label: string; path: string }[];
  children?: ReactNode;
}

const ServiceDetailLayout = ({
  seoTitle,
  seoDescription,
  path,
  h1,
  intro,
  serviceName,
  breadcrumbLabel,
  sections,
  faqs,
  relatedLinks = [],
}: ServiceDetailProps) => {
  const canonical = canonicalUrl(path);

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
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${canonical}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <div className="pac-service-detail min-h-screen flex flex-col">
      <SEOProvider title={seoTitle} description={seoDescription} path={path} mainEntityId={canonical + "#service"} isLocalBusiness />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Services', item: '/services/' },
          { name: breadcrumbLabel, item: `${path}/` },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <NavBar alwaysOpaque />

      <main className="flex-grow">
        <PageHero title={h1} description={intro}/>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {sections.map((s, index) => (
                <div key={s.heading} className="mb-12">
                  <h2 className="text-3xl font-bold mb-5">{s.heading}</h2>
                  <p className="text-lg text-gray-600 mb-5">{s.body}</p>
                  {s.bullets && (
                    <ul className="space-y-3">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-lg text-gray-600">
                          <Check size={20} className="text-brand-600 flex-shrink-0 mt-1.5" aria-hidden="true" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {index === 0 && /(?:residential-air-duct-cleaning|commercial-air-duct-cleaning|hvac-system-cleaning)/.test(path) && <ServiceFieldPhotos />}
                </div>
              ))}

              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                <dl className="space-y-6">
                  {faqs.map((f) => (
                    <div key={f.question} className="border-b border-gray-200 pb-6">
                      <dt className="text-xl font-semibold mb-2 text-gray-900">{f.question}</dt>
                      <dd className="text-lg text-gray-600">{f.answer}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {relatedLinks.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-4">Related services</h2>
                  <ul className="space-y-2">
                    {relatedLinks.map((r) => (
                      <li key={r.path}>
                        <Link to={r.path} className="text-brand-700 font-semibold hover:text-brand-900">
                          {r.label} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-brand-50 border border-brand-100 rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-3">Get a free estimate</h2>
                <p className="text-lg text-gray-600 mb-6">
                  No obligation, and the price is confirmed before any work starts. Serving Los Angeles
                  County and parts of Ventura County.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg">
                    <Link to="/quote">Request a quote</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href={business.phoneHref} className="flex items-center gap-2">
                      <Phone size={18} aria-hidden="true" /> Call {business.phone}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ServiceResources path={path}/>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetailLayout;

