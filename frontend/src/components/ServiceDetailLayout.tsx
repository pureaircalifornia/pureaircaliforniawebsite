import { ReactNode, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Check, Phone, Plus, Search, ClipboardCheck, Wind, ArrowUpRight, ShieldCheck, MapPin, DollarSign } from 'lucide-react';
import BusinessAreaDirectory from './BusinessAreaDirectory';
import ServiceFieldPhotos from '@/components/ServiceFieldPhotos';
import ServiceResources from '@/components/ServiceResources';
import PageHero from '@/components/PageHero';
import { getPageHero } from '@/data/pageHeroes';
import { Link } from '@/components/CanonicalLink';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SEOProvider from '@/components/SEOProvider';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { Button } from '@/components/ui/button';
import { business } from '@/config/business';
import { canonicalUrl } from '@/utils/seo/canonicalUrl';
import { serializeJsonLd } from '@/utils/seo/jsonLd.mjs';
import { buildProcessHowToSchema, buildServiceSchema } from '@/utils/seo/serviceSchema';
import { quoteContext, quoteLink } from '@/utils/quoteContext.mjs';
import { COMMERCIAL_QUOTE_URL } from '@/components/BookingLink';

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
  sources?: { label: string; url: string }[];
  children?: ReactNode;
  estimateLabel?: string;
  coverageText?: string;
  heroReassurance?: string;
  estateStory?: boolean;
  /** Published starting price from /pricing/ (e.g., 299 or 149). Only set for published rates. */
  startingPrice?: number;
  startingPriceLabel?: string;
  startingPriceNote?: string;
  quickFacts?: { label: string; value: string }[];
}

function ServiceDetailCard({
  section,
  index,
  defaultOpen,
  showFieldPhotos,
}: {
  section: { heading: string; body: string; bullets?: string[] };
  index: number;
  defaultOpen: boolean;
  showFieldPhotos: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const firstSentence = section.body.match(/^.*?[.!?](?:\s|$)/)?.[0].trim() || section.body;
  const remainder = section.body.replace(/^.*?[.!?](?:\s|$)/, '').trim();

  return (
    <details
      className="pac-service-detail-card"
      open={isOpen}
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
    >
      <summary>
        <span className="pac-service-detail-number">{String(index + 1).padStart(2, '0')}</span>
        <div>
          <h2>{section.heading}</h2>
          <p>{firstSentence}</p>
        </div>
        <Plus size={22} aria-hidden="true" />
      </summary>
      <div className="pac-service-detail-body">
        {remainder && <p>{remainder}</p>}
        {section.bullets && (
          <ul className="space-y-3">
            {section.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-lg text-gray-600">
                <Check size={20} className="text-brand-600 flex-shrink-0 mt-1.5" aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
        {showFieldPhotos && <ServiceFieldPhotos />}
      </div>
    </details>
  );
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
  sources = [],
  children,
  estimateLabel = 'Get a free estimate',
  coverageText = 'Serving Los Angeles County and parts of Ventura County.',
  heroReassurance,
  estateStory = false,
  startingPrice,
  startingPriceLabel,
  startingPriceNote,
  quickFacts,
}: ServiceDetailProps) => {
  const { search } = useLocation();
  const normalizedPath = `${path.replace(/\/+$/, '')}/`;
  const canonical = canonicalUrl(path);
  const hero = getPageHero(path);
  const commercial = ['commercial', 'managed'].includes(quoteContext(path, search).property);
  const estimateHref = quoteLink(path, search);

  const processSteps = [
    {
      icon: Search,
      image: /dryer/.test(path)
        ? '/images/pac/dryer.webp'
        : '/images/pac/duct-cleaning-interior-v2.webp',
      title: 'Inspect the system',
      text: 'We check access points, duct or exhaust routing, and current buildup so the scope matches what your system actually needs.',
      alt: 'Inspecting ventilation and exhaust ductwork condition before service',
    },
    {
      icon: ClipboardCheck,
      image: '/images/visual-story/consultation-pac-v3-1280.webp',
      title: 'Confirm scope & pricing',
      text: 'You review an itemized written scope, access plan, and confirmed price before any cleaning begins.',
      alt: 'Pure Air California technician reviewing a written scope of work with a client',
    },
    {
      icon: Wind,
      image: /filter/.test(path)
        ? '/images/pac/commercialFilter.webp'
        : /dryer/.test(path)
          ? '/images/pac/dryerAppliance.webp'
          : '/images/pac/duct-interior-clean-v2.webp',
      title: 'Complete & verify',
      text: 'We protect surrounding areas, complete the source-removal service, and walk through the results and any follow-up notes with you.',
      alt: /filter/.test(path)
        ? 'Properly fitted electrostatic HVAC air filter'
        : /dryer/.test(path)
          ? 'Clean dryer appliance and exhaust vent connection'
          : 'Spotless interior of a clean metal air duct after service',
    },
  ];

  const resolvedFacts =
    quickFacts ||
    [
      {
        label: 'Transparent pricing',
        value:
          startingPriceLabel ||
          (startingPrice
            ? `Starting at $${startingPrice} for eligible scopes`
            : commercial
              ? 'Custom building-specific written quote'
              : 'Written scope & price confirmed upfront'),
      },
      {
        label: 'Service approach',
        value: 'Inspection-led · No surprise upsells',
      },
      {
        label: 'Service area',
        value: 'Greater Los Angeles & Ventura County',
      },
    ];

  const serviceSchema = buildServiceSchema({
    name: serviceName,
    serviceType: serviceName,
    path: normalizedPath,
    description: seoDescription,
    startingPrice,
    startingPriceNote,
  });

  const howToSchema = buildProcessHowToSchema({
    path: normalizedPath,
    name: `How Pure Air California completes ${serviceName.toLowerCase()} in Los Angeles`,
    description: `Three-step inspection-led process for ${serviceName.toLowerCase()} with written scope confirmation before work begins.`,
    steps: processSteps.map((step) => ({
      name: step.title,
      text: step.text,
      image: step.image,
    })),
  });

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
      <SEOProvider
        title={seoTitle}
        description={seoDescription}
        path={normalizedPath}
        image={hero.image}
        imageAlt={hero.alt}
        mainEntityId={`${canonical}#service`}
        isLocalBusiness
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Services', item: '/services/' },
          { name: breadcrumbLabel, item: normalizedPath },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />

      <NavBar alwaysOpaque />

      <main className="flex-grow">
        <PageHero
          title={h1}
          description={intro}
          estimateHref={estimateHref}
          estimateLabel={estimateLabel}
          reassurance={heroReassurance}
          estateStory={estateStory}
        />

        {/* At-a-glance service facts & transparent starting cost strip */}
        <section className="pac-service-facts" aria-label="Service overview highlights">
          <div className="pac-container pac-service-facts-grid">
            {resolvedFacts.map((fact, idx) => (
              <div key={fact.label} className="pac-service-fact-item">
                <span className="pac-service-fact-icon" aria-hidden="true">
                  {idx === 0 ? (
                    <DollarSign size={17} />
                  ) : idx === 1 ? (
                    <ShieldCheck size={17} />
                  ) : (
                    <MapPin size={17} />
                  )}
                </span>
                <div>
                  <span className="pac-service-fact-label">{fact.label}</span>
                  <strong className="pac-service-fact-value">{fact.value}</strong>
                </div>
              </div>
            ))}
            <div className="pac-service-fact-cta">
              <Link to="/pricing/" className="pac-text-link">
                View LA pricing guide <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {children}

        <section
          className="pac-service-process pac-section pac-container"
          aria-labelledby="service-process-heading"
        >
          <div className="pac-section-heading">
            <div>
              <span className="pac-eyebrow">WHAT YOUR VISIT LOOKS LIKE</span>
              <h2 id="service-process-heading">
                See the plan.
                <br />
                <em>Know what comes next.</em>
              </h2>
            </div>
            <p>Three straightforward steps—shaped around your Los Angeles property and equipment.</p>
          </div>
          <ol className="pac-service-process-grid">
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <img
                  src={step.image}
                  alt={step.alt}
                  width={600}
                  height={400}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <span className="pac-service-step-icon">
                    <step.icon size={20} aria-hidden="true" />
                  </span>
                  <span className="pac-service-step-number">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="pac-service-reading pac-section pac-container"
          aria-label="Service scope and practical details"
        >
          <div className="pac-service-reading-intro">
            <span className="pac-eyebrow">SCOPE, SIGNS &amp; LOS ANGELES CONSIDERATIONS</span>
            <p>What is included, when to inspect, and how we plan around LA buildings.</p>
          </div>
          <div className="pac-service-details-list">
            {sections.map((s, index) => (
              <ServiceDetailCard
                key={s.heading}
                section={s}
                index={index}
                defaultOpen={index < 2}
                showFieldPhotos={
                  index === 0 &&
                  /(?:residential-air-duct-cleaning|commercial-air-duct-cleaning|hvac-system-cleaning)/.test(
                    path
                  )
                }
              />
            ))}
          </div>

          <div className="pac-service-faq">
            <span className="pac-eyebrow">COMMON QUESTIONS</span>
            <h2 className="text-3xl font-bold mb-6 mt-2">Frequently Asked Questions</h2>
            <div className="pac-service-faq-list">
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
          </div>

          {sources.length > 0 && (
            <aside className="mb-12" aria-label="Service information sources">
              <h2 className="text-2xl font-bold mb-4">Independent public guidance</h2>
              <ul className="space-y-2">
                {sources.map((source) => (
                  <li key={source.url}>
                    <a
                      className="text-brand-700 underline"
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-gray-600">
                Information reviewed October 12, 2026. Your system condition and product labeling determine whether any treatment is appropriate.
              </p>
            </aside>
          )}

          {relatedLinks.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Related services &amp; planning guides</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedLinks.map((r) => (
                  <li key={r.path}>
                    <Link
                      to={r.path}
                      className="flex items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-brand-700 font-semibold hover:border-brand-300 hover:bg-brand-50/40 transition-colors"
                    >
                      <span>{r.label}</span>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-brand-50 border border-brand-100 rounded-xl p-8">
            <span className="pac-eyebrow">FREE WRITTEN ESTIMATE</span>
            <h2 className="text-2xl font-bold mt-2 mb-3">{estimateLabel}</h2>
            <p className="text-lg text-gray-600 mb-6">
              {startingPrice
                ? `Eligible residential scopes start at $${startingPrice}, with your exact written price confirmed before any work begins. `
                : 'No obligation, and your itemized scope and price are confirmed in writing before any work starts. '}
              {coverageText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link to={estimateHref}>Build your free estimate</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={business.phoneHref} className="flex items-center gap-2">
                  <Phone size={18} aria-hidden="true" /> Call {business.phone}
                </a>
              </Button>
            </div>
            {commercial && (
              <p className="mt-5 text-sm text-gray-600">
                Need to submit a commercial facility request directly?{' '}
                <a
                  className="pac-text-link"
                  href={COMMERCIAL_QUOTE_URL}
                  data-pac-booking="housecall-pro"
                  data-pac-service="commercial"
                >
                  Open commercial intake form →
                </a>
              </p>
            )}
          </div>
        </section>

        <ServiceResources path={normalizedPath} coverageText={coverageText} />
        {path.replace(/\/+$/, '') === '/services/laundromat-dryer-vent-cleaning' && (
          <BusinessAreaDirectory marketSlug="laundromats" />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetailLayout;
