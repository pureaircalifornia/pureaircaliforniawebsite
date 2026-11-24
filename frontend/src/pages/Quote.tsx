import PageHero from '@/components/PageHero';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import RelatedLinks from '@/components/RelatedLinks';
import EstimateBuilder from '@/components/EstimateBuilder';
import SEOProvider from '@/components/SEOProvider';
import { Link } from '@/components/CanonicalLink';
import { CheckCircle2, ClipboardCheck, ShieldCheck, Phone } from 'lucide-react';
import { business } from '@/config/business';
import { serializeJsonLd } from '@/utils/seo/jsonLd.mjs';

const quoteFaqs = [
  {
    question: 'Is the estimate really free?',
    answer:
      'Yes, and there is no obligation attached to it. We review your layout and give you a clear written scope so you can decide at your own pace.',
  },
  {
    question: 'How long does air duct or dryer vent cleaning take?',
    answer:
      'The number of systems, duct condition, and access determine the time required. Larger homes, hillside estates, and multi-unit or commercial properties receive their own work plan and expected time window when scope is confirmed.',
  },
  {
    question: 'Do I need to be home for the visit?',
    answer:
      'A homeowner, estate manager, or authorized property contact needs to arrange access and approve the written scope. Let us know who will meet the crew and remain reachable if inspection turns up any additional findings.',
  },
  {
    question: 'Will the price change once you arrive?',
    answer:
      'Not without your written agreement. If the on-site walkthrough uncovers an extra system, inaccessible trunk line, or unusual buildup that changes the scope, we explain it clearly and requote before doing any additional work.',
  },
  {
    question: 'Do you serve my area of Los Angeles?',
    answer:
      'We serve Greater Los Angeles County and parts of Ventura County—including the Westside, Central LA, San Fernando Valley, San Gabriel Valley, South Bay, and hillside canyon communities. Share your 5-digit ZIP code in the estimator to confirm coverage.',
  },
  {
    question: 'Can you quote a commercial building or HOA community?',
    answer:
      'Yes. Share the building type, approximate system or unit count, site contact, and required work hours. We coordinate COI paperwork, resident notices, and evening or weekend windows subject to availability.',
  },
];

const QuotePage = () => {
  const pageTitle = 'Free Air Duct Cleaning Quote Los Angeles | Pure Air CA';
  const pageDescription =
    'Request a free air duct or dryer vent cleaning estimate in Los Angeles. Residential ducts from $299, dryer vents from $149, plus custom HOA & commercial quotes.';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: quoteFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOProvider
        title={pageTitle}
        description={pageDescription}
        keywords={[
          'free air duct cleaning quote Los Angeles',
          'air duct cleaning estimate LA',
          'dryer vent cleaning quote Los Angeles',
          'commercial property duct cleaning quote',
        ]}
        path="/quote/"
        isLocalBusiness
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />

      <NavBar alwaysOpaque />

      <PageHero
        title={
          <>
            Request a Free Air Duct or
            <br />
            <em>Dryer Vent Cleaning Estimate.</em>
          </>
        }
        description="Share your Los Angeles property type, system count, and what you’ve noticed. See transparent starting guidance immediately and receive a clear written scope before any work begins."
        compact
        meta={
          <div className="pac-hero-compact-actions">
            <a className="pac-button" href="#estimate-builder">
              Start my estimate
            </a>
            <a
              className="pac-hero-compact-secondary"
              href={business.phoneHref}
              data-call-location="quote-hero"
            >
              <Phone size={16} aria-hidden="true" /> Call {business.phone}
            </a>
          </div>
        }
      />

      <main className="flex-grow bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="pac-quote-trust-bar" aria-label="Estimate commitments">
            <div>
              <ShieldCheck size={18} aria-hidden="true" />
              <span>Written scope &amp; price confirmed before work begins</span>
            </div>
            <div>
              <ClipboardCheck size={18} aria-hidden="true" />
              <span>Residential ducts from $299 · Dryer vents from $149</span>
            </div>
            <div>
              <CheckCircle2 size={18} aria-hidden="true" />
              <span>Homes, estates, HOAs &amp; commercial buildings across LA</span>
            </div>
          </div>

          <EstimateBuilder />

          <div className="pac-quote-post-sections">
            <section className="pac-quote-steps" aria-labelledby="quote-next-heading">
              <span className="pac-eyebrow">SIMPLE, TRANSPARENT PROCESS</span>
              <h2 id="quote-next-heading">What happens after you request a quote</h2>
              <ol>
                {[
                  [
                    'Our LA team reviews your space',
                    'We look at your property type, ZIP code, system count, and access notes—then follow up directly without call-center handoffs.',
                  ],
                  [
                    'We confirm the written scope and price',
                    'We clarify what components are included, whether a site inspection is helpful, and confirm pricing before any work starts.',
                  ],
                  [
                    'You approve, then we schedule',
                    'Pick a work window that fits your household, tenants, or business hours. Submitting this form never locks you into an appointment.',
                  ],
                  [
                    'Walkthrough & completion record',
                    'Review the completed work with our technicians, including requested before/after photos of accessible areas and notes on any unreachable runs.',
                  ],
                ].map(([t, d], i) => (
                  <li key={t}>
                    <span className="pac-quote-step-num" aria-hidden="true">
                      0{i + 1}
                    </span>
                    <div>
                      <h3>{t}</h3>
                      <p>{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="pac-quote-faq" aria-labelledby="quote-faq-heading">
              <span className="pac-eyebrow">BEFORE YOU BOOK</span>
              <h2 id="quote-faq-heading">Common questions about our estimates</h2>
              <div className="pac-faq-list">
                {quoteFaqs.map((faq) => (
                  <details key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
              <div className="pac-quote-faq-cta">
                <p>
                  Not sure which systems need attention yet? Try our{' '}
                  <Link to="/air-quality-calculator/">LA Indoor Air Care Checklist</Link> or call{' '}
                  <a href={business.phoneHref}>
                    <Phone size={14} aria-hidden="true" /> {business.phone}
                  </a>
                  .
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <RelatedLinks
        heading="Learn more before you book"
        links={[
          { label: 'Air duct cleaning cost in Los Angeles', path: '/pricing/' },
          { label: 'LA indoor air care checklist', path: '/air-quality-calculator/' },
          { label: 'Residential air duct cleaning', path: '/services/residential-air-duct-cleaning/' },
          { label: 'Commercial & HOA air duct cleaning', path: '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/' },
        ]}
      />

      <Footer />
    </div>
  );
};

export default QuotePage;
