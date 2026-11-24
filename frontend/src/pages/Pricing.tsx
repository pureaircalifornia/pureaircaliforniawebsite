import PageHero from '@/components/PageHero';
import SEOProvider from '@/components/SEOProvider';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import RelatedLinks from '@/components/RelatedLinks';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { Link } from '@/components/CanonicalLink';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Flame,
  Home,
  Phone,
  ShieldCheck,
  SlidersHorizontal,
  Wind,
} from 'lucide-react';
import { business } from '@/config/business';
import { quoteLink } from '@/utils/quoteContext.mjs';
import { serializeJsonLd } from '@/utils/seo/jsonLd.mjs';

const pricingTiers = [
  {
    id: 'residential-ducts',
    eyebrow: 'RESIDENTIAL · SINGLE SYSTEM',
    name: 'Home Air Duct Cleaning',
    amount: '$299',
    unit: 'Starting at',
    note: 'Starting rate for eligible single-system Los Angeles residential scopes. Multi-system homes, attic/crawlspace complexity, and vent count affect the final written price.',
    included: [
      'Walkthrough of accessible supply & return ductwork',
      'Register removal, agitation & negative-pressure source removal',
      'Drop-cloth floor and vent area protection',
      'Written price approved by you before cleaning begins',
    ],
    ctaLabel: 'Build air duct estimate',
    quoteHref: quoteLink('/pricing/', '', { service: 'air-duct', property: 'home' }),
    servicePath: '/services/residential-air-duct-cleaning/',
    serviceLabel: 'Explore residential duct cleaning',
    image: 'residential',
    alt: 'Technician cleaning a ceiling duct opening in a Los Angeles home',
  },
  {
    id: 'residential-dryer',
    eyebrow: 'RESIDENTIAL · FIRE SAFETY & EFFICIENCY',
    name: 'Home Dryer Vent Cleaning',
    amount: '$149',
    unit: 'Starting at',
    note: 'Starting rate for eligible standard residential dryer exhaust runs. Total duct length, bends, multi-story routing, and rooftop exits determine the confirmed quote.',
    included: [
      'Full exhaust line clearing from laundry box to exterior termination',
      'Exterior wall hood or roof vent flap airflow verification',
      'Visual check of the transition hose behind the dryer',
      'Written price approved by you before service begins',
    ],
    ctaLabel: 'Build dryer vent estimate',
    quoteHref: quoteLink('/pricing/', '', { service: 'dryer-vent', property: 'home' }),
    servicePath: '/services/residential-dryer-vent-cleaning/',
    serviceLabel: 'Explore dryer vent cleaning',
    image: 'dryerAppliance',
    alt: 'Clothes dryer and exhaust connection in a residential laundry area',
  },
  {
    id: 'commercial-hoa',
    eyebrow: 'ESTATES · HOAs · COMMERCIAL',
    name: 'Multi-System, HOA & Commercial',
    amount: 'Custom',
    unit: 'Written proposal',
    note: 'Site-specific proposals for multi-zone estates, apartment communities, HOA dryer vent stacks, restaurants, hotels, offices, and medical suites across LA County.',
    included: [
      'Air handler, rooftop unit & shared-stack scope mapping',
      'COI / certificate of insurance & vendor onboarding support',
      'Resident notice coordination & after-hours window planning',
      'Closeout notes and accessible before/after photos on request',
    ],
    ctaLabel: 'Request commercial / HOA scope',
    quoteHref: quoteLink('/pricing/', '', { service: 'air-duct', property: 'commercial' }),
    servicePath: '/property-managers/',
    serviceLabel: 'HOA & property manager programs',
    image: 'commercial',
    alt: 'Technician inspecting metal ductwork in a commercial building',
  },
];

const quickPresets = [
  {
    icon: Home,
    title: 'Air Duct + Dryer Vent Combo',
    detail: 'Bundle residential air ducts (from $299) and dryer exhaust (from $149) in one visit.',
    href: quoteLink('/pricing/', '', {
      service: 'air-duct',
      property: 'home',
      addons: ['dryer-vent'],
    }),
  },
  {
    icon: Flame,
    title: 'Post-Wildfire Smoke & Ash Check',
    detail: 'Inspect return plenums, trunk lines & filters after LA wildfire smoke events.',
    href: quoteLink('/pricing/', '', {
      service: 'air-duct',
      property: 'home',
      addons: ['wildfire-smoke'],
    }),
  },
  {
    icon: Building2,
    title: 'HOA Multi-Unit Dryer Vent Stacks',
    detail: 'Bulk scheduling, roof/wall terminations & resident coordination for LA communities.',
    href: quoteLink('/pricing/', '', { service: 'dryer-vent', property: 'managed' }),
  },
  {
    icon: SlidersHorizontal,
    title: 'Private Home / Multi-System Estate',
    detail: '2+ HVAC zones, guest houses & protected interior finishes with written scope.',
    href: quoteLink('/pricing/', '', { service: 'air-duct', property: 'estate' }),
  },
  {
    icon: Wind,
    title: 'Electrostatic Filter Service',
    detail: 'Custom-fit washable filter sizing, replacement, or inspection.',
    href: quoteLink('/pricing/', '', { service: 'filter', property: 'home' }),
  },
];

const costFactors = [
  {
    title: 'Number of HVAC Systems & Zones',
    detail:
      'Many Los Angeles homes and Valley properties run two or more separate air handlers (upstairs/downstairs, additions, or ADUs). Each independent trunk system requires its own hookup and cleaning time.',
  },
  {
    title: 'Attic, Crawlspace & Rooftop Access',
    detail:
      '1920s–1950s Spanish, Craftsman, and hillside homes often place air handlers in tight attics, closets, or sub-floors, while condos and commercial buildings frequently require roof or mechanical-room access.',
  },
  {
    title: 'Dryer Vent Length & Roof Terminations',
    detail:
      'A short ground-floor exterior wall run is straightforward; long second- or third-story runs, multiple 90° turns, booster fans, or steep roof vents take specialized rotary equipment and ladder safety.',
  },
  {
    title: 'Condition, Remodeling & Wildfire Ash',
    detail:
      'Heavy post-construction drywall dust, canyon wildfire smoke residue, or years of lint compaction require slower, methodical agitation and careful containment compared with routine maintenance.',
  },
  {
    title: 'Optional Add-On Components',
    detail:
      'Combining dryer vent cleaning, electrostatic filter inspection, or accessible blower/coil hygiene in one appointment saves a separate trip and is itemized clearly on your written estimate.',
  },
  {
    title: 'Building Rules, Parking & Off-Hours',
    detail:
      'High-rise condos, HOAs, healthcare suites, and restaurants may need loading-zone permits, resident notices, COI paperwork, or evening/weekend scheduling—all confirmed upfront in writing.',
  },
];

const faqs = [
  {
    question: 'How much does air duct cleaning cost in Los Angeles?',
    answer:
      'PAC residential air duct cleaning starts at $299 for eligible single-system scopes. Your final written estimate depends on the number of HVAC systems, duct access, condition, and components included. We confirm the scope and price in writing before work begins.',
  },
  {
    question: 'How much does residential dryer vent cleaning cost?',
    answer:
      'PAC residential dryer vent cleaning starts at $149 for eligible standard exhaust runs. Vent length, bends, roof vs. wall termination, and multi-story access affect the confirmed price.',
  },
  {
    question: 'Does the starting price cover every home?',
    answer:
      'No. Starting prices are a transparent planning baseline, not a one-size-fits-all package. Larger, multi-system, hillside, or difficult-access properties receive a clear property-specific written estimate before any work starts.',
  },
  {
    question: 'Why do some companies advertise $49 or $99 air duct cleaning coupons?',
    answer:
      'Ultra-low coupon ads often cover only a quick vacuum pass at a few vents—or use high-pressure on-site upsells once inside the home. Pure Air California quotes the real scope up front and never adds charges without your written approval.',
  },
  {
    question: 'Can I bundle air duct cleaning and dryer vent cleaning in one visit?',
    answer:
      'Yes. Many Los Angeles homeowners schedule residential air duct cleaning and dryer vent cleaning together—and optionally add an electrostatic filter or HVAC coil check—so we outline one clear combined scope before starting.',
  },
  {
    question: 'How are HOA and commercial projects priced?',
    answer:
      'Commercial and HOA projects receive a written custom proposal based on building layout, system or unit count, access rules, COI requirements, and approved working hours. Share your property details online or by phone so we can plan the right scope.',
  },
  {
    question: 'Will the final price change once the technicians arrive?',
    answer:
      'Not without your written agreement. If the on-site walkthrough reveals an additional air handler, concealed damage, or heavy buildup outside the initial description, we explain what we found and confirm any change before doing extra work.',
  },
];

export default function Pricing() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <div className="pac-pricing-page min-h-screen flex flex-col">
      <SEOProvider
        title="Air Duct Cleaning Cost Los Angeles | Starting at $299"
        description="Los Angeles home air duct cleaning starts at $299; dryer vent cleaning starts at $149. See transparent LA cost factors and request a free written estimate."
        path="/pricing/"
        isLocalBusiness
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Pricing & estimates', item: '/pricing/' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />
      <NavBar />
      <main>
        <PageHero
          title={
            <>
              Air Duct &amp; Dryer Vent Cleaning
              <br />
              <em>Pricing in Los Angeles.</em>
            </>
          }
          description="Transparent starting prices for eligible residential scopes ($299 air duct cleaning, $149 dryer vent cleaning) and written site-specific proposals for estates, HOAs, and commercial buildings—with zero hidden upsells."
        />

        <section className="pac-section pac-price-intro" aria-labelledby="starting-prices-heading">
          <div className="pac-container">
            <div className="pac-section-heading">
              <div>
                <span className="pac-eyebrow">01 / TRANSPARENT STARTING TIERS</span>
                <h2 id="starting-prices-heading">
                  Honest pricing.
                  <br />
                  <em>Confirmed in writing first.</em>
                </h2>
              </div>
              <p>
                Every Los Angeles property is different, so we publish clear starting rates for
                standard residential scopes and put every included component in writing before work
                begins.
              </p>
            </div>

            <div className="pac-pricing-tiers">
              {pricingTiers.map((tier) => (
                <article key={tier.id} className="pac-pricing-card">
                  <div className="pac-pricing-card-media">
                    <img
                      src={`/images/pac/${tier.image}.webp`}
                      alt={tier.alt}
                      width="400"
                      height="240"
                      loading="lazy"
                    />
                    <span className="pac-pricing-card-badge">{tier.eyebrow}</span>
                  </div>
                  <div className="pac-pricing-card-body">
                    <div className="pac-pricing-card-head">
                      <h3>{tier.name}</h3>
                      <div className="pac-pricing-card-price">
                        <span>{tier.unit}</span>
                        <strong>{tier.amount}</strong>
                      </div>
                    </div>
                    <p className="pac-pricing-card-note">{tier.note}</p>
                    <ul className="pac-pricing-card-list">
                      {tier.included.map((item) => (
                        <li key={item}>
                          <Check size={16} aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pac-pricing-card-actions">
                      <Link className="pac-button" to={tier.quoteHref}>
                        {tier.ctaLabel} <ArrowRight size={17} aria-hidden="true" />
                      </Link>
                      <Link className="pac-text-link" to={tier.servicePath}>
                        {tier.serviceLabel} <ArrowUpRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="pac-pricing-guarantee-strip">
              <ShieldCheck size={22} aria-hidden="true" />
              <p>
                <strong>No bait-and-switch pricing:</strong> Starting prices are a transparent
                planning guide, not a surprise teaser. Your written estimate defines every system,
                vent, and optional add-on before any equipment comes off the truck.{' '}
                <Link to="/compare/">Learn how to compare LA duct quotes →</Link>
              </p>
            </div>
          </div>
        </section>

        <section className="pac-section pac-pricing-presets-section" aria-labelledby="presets-heading">
          <div className="pac-container">
            <div className="pac-section-heading">
              <div>
                <span className="pac-eyebrow">02 / ONE-CLICK ESTIMATE PRESETS</span>
                <h2 id="presets-heading">
                  Start with your
                  <br />
                  <em>exact LA scenario.</em>
                </h2>
              </div>
              <p>
                Select the option closest to your property to open our Estimate Builder pre-filled
                with your service and add-ons.
              </p>
            </div>
            <div className="pac-preset-grid">
              {quickPresets.map((preset) => {
                const Icon = preset.icon;
                return (
                  <Link key={preset.title} to={preset.href} className="pac-preset-card">
                    <span className="pac-preset-icon" aria-hidden="true">
                      <Icon size={20} />
                    </span>
                    <div>
                      <h3>{preset.title}</h3>
                      <p>{preset.detail}</p>
                    </div>
                    <ArrowRight size={18} className="pac-preset-arrow" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="pac-price-business pac-section" aria-labelledby="cost-factors-heading">
          <div className="pac-container">
            <div className="pac-section-heading">
              <div>
                <span className="pac-eyebrow">03 / LOS ANGELES COST FACTORS</span>
                <h2 id="cost-factors-heading">
                  What actually affects
                  <br />
                  <em>your final quote.</em>
                </h2>
              </div>
              <p>
                From 1930s Hancock Park attics to Valley dual-zone homes and Westside condo roofs,
                six practical factors determine the labor and equipment required.
              </p>
            </div>
            <div className="pac-cost-factors-grid">
              {costFactors.map((factor, index) => (
                <article key={factor.title} className="pac-cost-factor-card">
                  <span className="pac-cost-factor-num" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3>{factor.title}</h3>
                  <p>{factor.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pac-section">
          <div className="pac-container pac-price-plan">
            <div>
              <span className="pac-eyebrow">04 / BEFORE WE BEGIN</span>
              <h2>
                A clear scope.
                <br />
                <em>A comfortable decision.</em>
              </h2>
              <p>
                Start with your neighborhood, property type, and what you’ve noticed. You don’t need
                to count every register or know your exact duct layout—we help walk through that
                with you.
              </p>
              <div className="pac-price-plan-actions">
                <Link className="pac-button" to="/quote/#estimate-builder">
                  Open the Estimate Builder <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <a
                  className="pac-text-link"
                  href={business.phoneHref}
                  data-call-location="pricing-plan"
                >
                  <Phone size={18} aria-hidden="true" />
                  Talk to PAC · {business.phone}
                </a>
              </div>
            </div>
            <ol>
              {[
                [
                  'Share your LA space & goals',
                  'Tell us your ZIP code, property type, system count if known, and any access or scheduling needs.',
                ],
                [
                  'Review the included components',
                  'We clarify what is included, whether an inspection visit is helpful, and how optional add-ons are priced.',
                ],
                [
                  'Approve your written estimate',
                  'Confirm the written scope and price before work starts. Any newly discovered work is approved separately.',
                ],
              ].map(([title, body], i) => (
                <li key={title}>
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                  <Check size={18} aria-hidden="true" />
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="pac-section pac-price-faq" aria-labelledby="pricing-faq-heading">
          <div className="pac-container pac-faq-grid">
            <div>
              <span className="pac-eyebrow">A FEW GOOD QUESTIONS</span>
              <h2 id="pricing-faq-heading">
                Before
                <br />
                <em>you book.</em>
              </h2>
              <p>Straightforward answers on how air duct and dryer vent cleaning is quoted in LA.</p>
            </div>
            <div className="pac-faq-list">
              {faqs.map((f) => (
                <details key={f.question}>
                  <summary>{f.question}</summary>
                  <p>{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <RelatedLinks
        heading="Find the right care for your space"
        links={[
          { label: 'Residential air duct cleaning', path: '/services/residential-air-duct-cleaning/' },
          { label: 'Dryer vent cleaning', path: '/services/residential-dryer-vent-cleaning/' },
          { label: 'LA indoor air care checklist', path: '/air-quality-calculator/' },
          { label: 'Request a free estimate', path: '/quote/' },
        ]}
      />
      <Footer />
    </div>
  );
}
