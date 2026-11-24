import type { ReactNode } from 'react';
import { ArrowUpRight, Phone } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SEOProvider from '@/components/SEOProvider';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import PageHero from '@/components/PageHero';
import { Link } from '@/components/CanonicalLink';
import { business } from '@/config/business';
import { buildFaqSchema, type FAQ } from '@/data/faqs';
import { getPageHero } from '@/data/pageHeroes';
import { serializeJsonLd } from '@/utils/seo/jsonLd.mjs';
import { quoteLink } from '@/utils/quoteContext.mjs';
import '@/lead-landing.css';

type Props = {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: ReactNode;
  intro: string;
  children: ReactNode;
  faqs?: readonly FAQ[];
  quoteHref?: string;
  serviceName?: string;
};

export default function LeadLanding({
  path,
  title,
  description,
  eyebrow,
  heading,
  intro,
  children,
  faqs = [],
  quoteHref,
  serviceName,
}: Props) {
  const resolvedQuoteHref = quoteHref || quoteLink(path);
  const canonical = business.url + path;
  const hero = getPageHero(path);
  const service = serviceName
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': canonical + '#service',
        name: serviceName,
        serviceType: serviceName,
        description,
        url: canonical,
        provider: { '@id': business.url + '/#business' },
        areaServed: { '@type': 'City', name: 'Los Angeles' },
        mainEntityOfPage: { '@id': canonical + '#webpage' },
      }
    : undefined;

  return (
    <div className="pac-lead-page">
      <SEOProvider
        title={title}
        description={description}
        path={path}
        isLocalBusiness
        image={hero.image}
        imageAlt={hero.alt}
        mainEntityId={serviceName ? canonical + '#service' : canonical + '#projects'}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          {
            name: serviceName ? 'Services' : 'Case studies',
            item: serviceName ? '/services/' : '/case-studies/',
          },
          { name: eyebrow, item: path },
        ]}
      />
      {service && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(service) }}
        />
      )}
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqs)) }}
        />
      )}
      <NavBar alwaysOpaque />
      <main>
        <PageHero
          title={heading}
          description={intro}
          eyebrow={hero.eyebrow || `${eyebrow} · LOS ANGELES`}
          caption={hero.caption}
          estimateHref={resolvedQuoteHref}
          estimateLabel="Request a written estimate"
          reassurance="Homes, businesses & managed properties across Greater Los Angeles"
        />
        <div className="pac-container pac-lead-content">{children}</div>
        {faqs.length > 0 && (
          <section className="pac-container pac-lead-faq">
            <span className="pac-eyebrow">BEFORE YOU BOOK</span>
            <h2>
              Clear answers.
              <br />
              <em>A confident next step.</em>
            </h2>
            <div className="pac-faq-list">
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}
        <section className="pac-lead-close">
          <div className="pac-container">
            <span className="pac-eyebrow">LET’S TALK ABOUT YOUR SPACE</span>
            <h2>
              Good care starts
              <br />
              <em>with a conversation.</em>
            </h2>
            <p>
              Tell Lou your city, property type and what you’ve noticed. We’ll help define the next
              step.
            </p>
            <div className="pac-actions">
              <a
                className="pac-button"
                href={business.phoneHref}
                data-call-location="service-close"
              >
                <Phone size={18} aria-hidden="true" />
                {business.phone}
              </a>
              <Link className="pac-text-link" to={resolvedQuoteHref}>
                Request an estimate <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <a className="pac-text-link" href={`mailto:${business.email}`}>
              {business.email}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
