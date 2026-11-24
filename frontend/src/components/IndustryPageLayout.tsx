import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { ShieldCheck, Clock, FileCheck2, Building2, Phone, ArrowUpRight, MapPin } from 'lucide-react';
import { businessCatalog } from '@/data/businessLocations';
import BusinessAreaDirectory from './BusinessAreaDirectory';
import PageHero from '@/components/PageHero';
import { getPageHero } from '@/data/pageHeroes';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/CanonicalLink';
import QuoteForm from '@/components/QuoteForm';
import SEOProvider from '@/components/SEOProvider';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { business } from '@/config/business';
import { seoConfig } from '@/utils/seo/seoConfig';
import { canonicalUrl } from '@/utils/seo/canonicalUrl';
import { serializeJsonLd } from '@/utils/seo/jsonLd.mjs';
import RelatedLinks from '@/components/RelatedLinks';
import { RELATED_BY_INDUSTRY, getAreaLinksForIndustry } from '@/utils/internalLinks';
import { quoteContext, quoteLink } from '@/utils/quoteContext.mjs';
import { COMMERCIAL_QUOTE_URL } from '@/components/BookingLink';

interface IndustryPageLayoutProps {
  /** Visible <h1> for the page. */
  title: string;
  subtitle: string;
  heroImage?: string;
  heroReassurance?: string;
  estimateLabel?: string;
  /** <title> tag. Keep at or under 60 characters so it is not truncated in results. */
  seoTitle: string;
  /** Meta description. Aim for 140-155 characters. */
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
   * How a job actually runs in this vertical.
   */
  process?: { step: string; detail: string }[];
  children: ReactNode;
}

const commercialReadinessItems = [
  {
    icon: FileCheck2,
    title: 'COI & Vendor Docs Ready',
    detail: 'Certificates of Insurance, additional-insured wording, and itemized written scopes before dispatch.',
  },
  {
    icon: Clock,
    title: 'After-Hours & Phased LA Windows',
    detail: 'Early-morning, evening, weekend, or wing-by-wing scheduling tailored to occupied facilities.',
  },
  {
    icon: ShieldCheck,
    title: 'Containment & Closeout Logs',
    detail: 'Negative-pressure extraction, protected work zones, and per-unit/zone completion records.',
  },
  {
    icon: Building2,
    title: 'Multi-Building Programs',
    detail: 'Coordinated HVAC duct, coil, filter, and commercial dryer exhaust plans across LA portfolios.',
  },
];

const coreCommercialServiceLinks = [
  { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning/' },
  {
    label: 'Commercial & HOA air duct + dryer vent programs',
    path: '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/',
  },
  { label: 'Commercial dryer vent cleaning', path: '/services/commercial-dryer-vent-cleaning/' },
  { label: 'Property managers & HOA boards', path: '/property-managers/' },
  { label: 'Complete HVAC system & coil cleaning', path: '/services/hvac-system-cleaning/' },
  { label: 'Commercial electrostatic filter service', path: '/services/commercial-electrostatic-filter/' },
  { label: 'Documented LA commercial project stories', path: '/project-stories/' },
  { label: 'Transparent LA pricing & estimate guide', path: '/pricing/' },
];

const IndustryPageLayout = ({
  title,
  subtitle,
  heroReassurance = 'All Los Angeles County · COI-ready · After-hours & weekend scheduling · Written scope before work',
  estimateLabel = 'Request a commercial estimate',
  seoTitle,
  seoDescription,
  path,
  breadcrumbLabel,
  serviceName,
  faqs,
  process,
  children,
}: IndustryPageLayoutProps) => {
  const { search } = useLocation();
  const cleanPath = path.replace(/\/+$/, '');
  const normalizedPath = `${cleanPath}/`;
  const canonical = canonicalUrl(cleanPath);
  const hero = getPageHero(cleanPath);
  const estimateHref = quoteLink(cleanPath, search);
  const isServiceRoute = cleanPath.startsWith('/services/');
  const areaLinks = getAreaLinksForIndustry(cleanPath, 8);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonical}#service`,
    name: serviceName,
    serviceType: serviceName,
    description: seoDescription,
    url: canonical,
    mainEntityOfPage: { '@id': `${canonical}#webpage` },
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
      sameAs: 'https://www.wikidata.org/wiki/Q65',
      containedInPlace: {
        '@type': 'State',
        name: 'California',
        sameAs: 'https://www.wikidata.org/wiki/Q99',
      },
    },
    audience: { '@type': 'BusinessAudience', name: breadcrumbLabel },
  };

  return (
    <div className="pac-industry-page pac-business-page min-h-screen flex flex-col">
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
          isServiceRoute
            ? { name: 'Services', item: '/services/' }
            : { name: 'Industries', item: '/industries/' },
          { name: breadcrumbLabel, item: normalizedPath },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }}
      />

      <NavBar alwaysOpaque />

      <main className="flex-grow">
        {/* Hero Section */}
        <PageHero
          title={title}
          description={subtitle}
          reassurance={heroReassurance}
          estimateLabel={estimateLabel}
          estimateHref={estimateHref}
        />

        {/* Commercial B2B Facility Readiness Strip */}
        <section
          className="bg-slate-900 text-white py-8 border-b border-slate-800"
          aria-label="Commercial facility readiness"
        >
          <div className="pac-container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {commercialReadinessItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3.5">
                    <span className="p-2.5 rounded-lg bg-cyan-500/15 text-cyan-300 flex-shrink-0 mt-0.5">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="text-sm font-bold text-white tracking-wide">{item.title}</h2>
                      <p className="text-xs text-slate-300 leading-relaxed mt-1">{item.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Content */}
        {children}

        {/* How a job runs in this vertical */}
        {process && process.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <span className="pac-eyebrow">INSPECTION-LED COMMERCIAL WORKFLOW</span>
                <h2 className="text-3xl font-bold mt-2 mb-3">
                  How We Work in {breadcrumbLabel} Facilities
                </h2>
                <p className="text-lg text-gray-600 mb-10">
                  We coordinate access, COI documentation, scheduling windows, and work-area protection before the visit so the plan fits both your equipment and the people who use the building.
                </p>
                <ol className="space-y-6">
                  {process.map((s2, i) => (
                    <li
                      key={s2.step}
                      className="flex gap-5 bg-white p-6 rounded-xl border border-gray-200/80 shadow-sm"
                    >
                      <span
                        className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-1.5 text-gray-900">{s2.step}</h3>
                        <p className="text-gray-600 leading-relaxed">{s2.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        )}

        {/* Core Commercial & HOA Service Cross-Links + Indexable LA Hubs */}
        <section className="py-14 bg-white border-t border-gray-100" aria-label="Commercial services and Los Angeles coverage">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <span className="pac-eyebrow">COMMERCIAL &amp; MULTIFAMILY SERVICES</span>
                <h2 className="text-2xl font-bold mt-2 mb-3 text-gray-900">
                  Related Commercial Scopes &amp; Programs
                </h2>
                <p className="text-gray-600 mb-5">
                  Most Los Angeles commercial facilities combine comfort-HVAC ductwork with coil/blower maintenance, filtration, or commercial dryer exhaust care.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {coreCommercialServiceLinks.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50 hover:border-brand-200 transition-colors"
                      >
                        <span>{item.label}</span>
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="pac-eyebrow">
                  <MapPin size={14} aria-hidden="true" /> GREATER LOS ANGELES COVERAGE
                </span>
                <h2 className="text-2xl font-bold mt-2 mb-3 text-gray-900">
                  {breadcrumbLabel} Service Areas Across LA
                </h2>
                <p className="text-gray-600 mb-5">
                  We dispatch commercial crews across Los Angeles County and parts of Ventura County. Explore local planning guides for major commercial districts:
                </p>
                <ul className="grid grid-cols-2 gap-2.5 mb-4">
                  {areaLinks.map((area) => (
                    <li key={area.path}>
                      <Link
                        to={`${area.path.replace(/\/+$/, '')}/`}
                        className="flex items-center justify-between gap-2 rounded-lg bg-gray-50 border border-gray-200/80 px-3.5 py-2.5 text-sm font-medium text-gray-800 hover:text-brand-700 hover:border-brand-200 transition-colors"
                      >
                        <span>{area.label}</span>
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link to="/locations/" className="pac-text-link">
                  Browse all 54 Los Angeles County service areas →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Vertical-specific FAQ. Visible content + matching FAQPage schema. */}
        {faqs && faqs.length > 0 && (
          <section className="py-16 bg-gray-50 border-t border-gray-200/70">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <span className="pac-eyebrow">FREQUENTLY ASKED QUESTIONS</span>
                <h2 className="text-3xl font-bold mt-2 mb-8">
                  {breadcrumbLabel} Ventilation &amp; Duct Cleaning: Common Questions
                </h2>
                <dl className="space-y-6">
                  {faqs.map((faq) => (
                    <div
                      key={faq.question}
                      className="bg-white rounded-xl border border-gray-200/80 p-6 shadow-sm"
                    >
                      <dt className="text-xl font-semibold mb-2 text-gray-900">{faq.question}</dt>
                      <dd className="text-lg text-gray-600 leading-relaxed">{faq.answer}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: serializeJsonLd({
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
          links={RELATED_BY_INDUSTRY[cleanPath] || []}
        />

        <BusinessAreaDirectory
          marketSlug={
            businessCatalog.find((market) => market.parentPath.replace(/\/$/, '') === cleanPath)
              ?.slug
          }
        />

        {/* CTA and Quote Form Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="pac-eyebrow">COMMERCIAL ESTIMATE &amp; SCOPE REVIEW</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                  Plan the work for your Los Angeles property.
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Share the systems, unit or zone counts, access requirements, and preferred work window. We’ll review the cleaning scope, COI requirements, scheduling options, and completion records before you decide to book.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link to={estimateHref}>Build a commercial estimate</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="flex items-center gap-2" asChild>
                    <a href={business.phoneHref}>
                      <Phone size={18} aria-hidden="true" />
                      {business.phone}
                    </a>
                  </Button>
                </div>
                <p className="mt-5 text-sm text-gray-600">
                  Prefer our direct commercial dispatch form?{' '}
                  <a
                    className="pac-text-link"
                    href={COMMERCIAL_QUOTE_URL}
                    data-pac-booking="housecall-pro"
                    data-pac-service="commercial"
                  >
                    Submit via commercial portal →
                  </a>
                </p>
              </div>
              <div>
                <QuoteForm initialProperty={quoteContext(cleanPath, search).propertyLabel} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IndustryPageLayout;
