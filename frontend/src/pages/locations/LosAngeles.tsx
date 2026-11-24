import WestsideGuides from '@/components/WestsideGuides';
import PageHero from '@/components/PageHero';
import { Link } from '@/components/CanonicalLink';
import {
  ArrowUpRight,
  Check,
  Flame,
  Building2,
  Sun,
  Waves,
  Landmark,
  ShieldCheck,
  Phone,
} from 'lucide-react';
import SEOProvider from '@/components/SEOProvider';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { locationData } from './data';
import { business } from '@/config/business';
import { buildFaqSchema } from '@/data/faqs';
import { canonicalUrl } from '@/utils/seo/canonicalUrl';
import { seoConfig } from '@/utils/seo/seoConfig';
import { serializeJsonLd } from '@/utils/seo/jsonLd.mjs';
import NeighborhoodFinder from './NeighborhoodFinder';
import { buildLocationQuoteHref } from './locationSeo';

const regions: Record<string, string> = {
  westside: 'The Westside',
  coastal: 'Coastal Communities',
  'urban-core': 'Central & Metro Los Angeles',
  historic: 'Historic Districts',
  'san-fernando-valley': 'San Fernando Valley',
  foothill: 'Foothill Communities',
  canyon: 'Hills & Canyons',
};

const laMicroClimates = [
  {
    id: 'westside-coastal',
    icon: Waves,
    title: 'Westside & Coastal',
    corridor: 'Santa Monica · Brentwood · Malibu · Pacific Palisades · Culver City · Venice',
    summary:
      'Daily Pacific marine layers and salt-laden breezes interact with rooftop HVAC condensers, attic insulation, and exterior dryer vent flaps, while Westside architectural estates and coastal canyons combine multi-zone air handlers with hillside staging requirements.',
    priorities: [
      'Exterior vent-cap corrosion & damp-coil checks',
      'Multi-zone estate mapping & finish protection',
      'Condo HOA dryer stack & rooftop access',
    ],
    links: [
      { label: 'Santa Monica', to: '/locations/santa-monica/' },
      { label: 'Brentwood', to: '/locations/brentwood/' },
      { label: 'Malibu', to: '/locations/malibu/' },
      { label: 'Culver City', to: '/locations/culver-city/' },
      { label: 'Pacific Palisades', to: '/locations/pacific-palisades/' },
    ],
    serviceLink: { label: 'Residential air duct cleaning', to: '/services/residential-air-duct-cleaning/' },
  },
  {
    id: 'central-metro',
    icon: Landmark,
    title: 'Central & Metro LA',
    corridor: 'Beverly Hills · West Hollywood · Hollywood · Downtown LA · Koreatown · Los Feliz · Silver Lake',
    summary:
      'Historic 1920s–40s Spanish, Tudor, and Craftsman homes with retrofitted crawlspace ductwork sit minutes from Arts District spiral-duct lofts and Wilshire high-rises—all exposed to I-10, US-101, and I-110 freeway PM2.5 traffic particulate and long multi-unit dryer risers.',
    priorities: [
      'Plaster, hardwood & vintage register protection',
      'Freeway PM2.5 return-plenum & filter-fit care',
      'High-rise COI, freight elevator & HOA dryer risers',
    ],
    links: [
      { label: 'Beverly Hills', to: '/locations/beverly-hills/' },
      { label: 'Downtown LA', to: '/locations/downtown-la/' },
      { label: 'West Hollywood', to: '/locations/west-hollywood/' },
      { label: 'Koreatown', to: '/locations/koreatown/' },
      { label: 'Los Feliz', to: '/locations/los-feliz/' },
    ],
    serviceLink: {
      label: 'Commercial & HOA duct & dryer vent care',
      to: '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/',
    },
  },
  {
    id: 'san-fernando-valley',
    icon: Sun,
    title: 'San Fernando Valley',
    corridor: 'Studio City · Sherman Oaks · Encino · Burbank · Woodland Hills · Van Nuys · North Hollywood',
    summary:
      'Triple-digit summer heatwaves keep Valley central air conditioners cycling for months on end, pulling airborne dust and yard pollen through long horizontal attic trunk lines, post-war ranch remodels, backyard ADUs, and heavy-use commercial rooftop units.',
    priorities: [
      'Heavy-AC cooling coil, blower & return cleaning',
      'Post-war ranch attic trunk & ADU system scoping',
      'Pre-summer & post-Santa Ana wind maintenance',
    ],
    links: [
      { label: 'Sherman Oaks', to: '/locations/sherman-oaks/' },
      { label: 'Studio City', to: '/locations/studio-city/' },
      { label: 'Encino', to: '/locations/encino/' },
      { label: 'Burbank', to: '/locations/burbank/' },
      { label: 'Woodland Hills', to: '/locations/woodland-hills/' },
    ],
    serviceLink: { label: 'HVAC system, coil & blower cleaning', to: '/services/hvac-system-cleaning/' },
  },
  {
    id: 'sgv-foothills',
    icon: Flame,
    title: 'San Gabriel Valley & Foothills',
    corridor: 'Pasadena · Glendale · Altadena Corridor · Granada Hills · Porter Ranch · Calabasas',
    summary:
      'Neighborhoods below the San Gabriel, Verdugo, and Santa Susana mountains sit in high-velocity Santa Ana wind corridors where fine canyon ash, regional wildfire smoke plumes, and brush dust enter attic chases and filter housings.',
    priorities: [
      'Inspection-first post-smoke & canyon ash removal',
      'Craftsman basement/attic & hillside portable HEPA',
      'Two-story pitched-roof dryer exhaust clearing',
    ],
    links: [
      { label: 'Pasadena', to: '/locations/pasadena/' },
      { label: 'Glendale', to: '/locations/glendale/' },
      { label: 'Granada Hills', to: '/locations/granada-hills/' },
      { label: 'Porter Ranch', to: '/locations/porter-ranch/' },
      { label: 'Calabasas', to: '/locations/calabasas/' },
    ],
    serviceLink: {
      label: 'Wildfire smoke & hillside duct care',
      to: '/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles/',
    },
  },
  {
    id: 'south-bay-harbor',
    icon: Building2,
    title: 'South Bay & Harbor Corridor',
    corridor: 'Torrance · Long Beach · El Segundo · Coastal & Industrial Commercial Corridors',
    summary:
      'Properties across the South Bay and Harbor corridor balance ocean breezes with coastal-industrial, aerospace, and port-corridor airborne particulate—making tight filtration, showroom/office commercial HVAC care, and clear dryer exhaust vital.',
    priorities: [
      'Coastal & industrial-corridor fine dust filtration',
      'Commercial showroom, retail & office duct care',
      'Scheduled multi-unit dryer vent maintenance',
    ],
    links: [
      { label: 'Torrance showroom case study', to: '/case-studies/bassett-torrance-showroom/' },
      { label: 'Commercial HVAC cleaning', to: '/services/commercial-air-duct-cleaning/' },
      { label: 'Property managers & HOAs', to: '/property-managers/' },
    ],
    serviceLink: { label: 'Electrostatic air filters', to: '/services/residential-electrostatic-filter/' },
  },
];

const laCoreServices = [
  {
    num: '01',
    title: 'Residential Air Duct Cleaning',
    priceCue: 'Starting at $299',
    text: 'Negative-pressure HEPA source removal for accessible supply and return trunks, registers, and plenums in Los Angeles houses, condos, and apartments.',
    to: '/services/residential-air-duct-cleaning/',
    quoteHref: buildLocationQuoteHref({ locationSlug: 'los-angeles', service: 'air-duct', property: 'home' }),
  },
  {
    num: '02',
    title: 'Residential Dryer Vent Cleaning',
    priceCue: 'Starting at $149',
    text: 'Mechanical rotary brushing and lint extraction for ground-level, multi-story, and pitched-roof dryer exhaust runs across Greater LA.',
    to: '/services/residential-dryer-vent-cleaning/',
    quoteHref: buildLocationQuoteHref({ locationSlug: 'los-angeles', service: 'dryer-vent', property: 'home' }),
  },
  {
    num: '03',
    title: 'Wildfire Smoke & Hillside Ducts',
    priceCue: 'Inspection-led scope',
    text: 'Honest assessment and HEPA extraction for canyon ash, regional smoke residue, and post-renovation drywall dust in LA foothill and hillside homes.',
    to: '/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles/',
    quoteHref: buildLocationQuoteHref({
      locationSlug: 'los-angeles',
      service: 'air-duct',
      property: 'home',
      addons: ['wildfire-smoke'],
    }),
  },
  {
    num: '04',
    title: 'Commercial & HOA Air Duct & Dryer Vents',
    priceCue: 'Custom building scope',
    text: 'Multi-unit dryer vent stacks, common-area HVAC ducts, COI paperwork, resident notices, and documented closeout records for LA HOA boards and managers.',
    to: '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/',
    quoteHref: buildLocationQuoteHref({ locationSlug: 'los-angeles', service: 'air-duct', property: 'managed' }),
  },
  {
    num: '05',
    title: 'HVAC System, Coil & Blower Cleaning',
    priceCue: 'Component-itemized',
    text: 'Targeted cleaning of accessible evaporator coils, blower wheels, drain pans, and air-handler cabinets stressed by long Southern California cooling seasons.',
    to: '/services/hvac-system-cleaning/',
    quoteHref: buildLocationQuoteHref({
      locationSlug: 'los-angeles',
      service: 'other',
      property: 'home',
      addons: ['hvac-coil'],
    }),
  },
  {
    num: '06',
    title: 'Commercial Air Duct & Laundromat Exhaust',
    priceCue: 'Off-hours available',
    text: 'Offices, studios, restaurants (comfort air), clinics, hotels, and high-volume laundromat dryer manifolds scheduled around your operating hours.',
    to: '/services/commercial-air-duct-cleaning/',
    quoteHref: buildLocationQuoteHref({ locationSlug: 'los-angeles', service: 'air-duct', property: 'commercial' }),
  },
  {
    num: '07',
    title: 'Electrostatic Air Filters',
    priceCue: 'Residential & commercial',
    text: 'Washable, custom-fit electrostatic air filtration sized to seal filter-frame bypass leaks common in freeway-adjacent and windy LA corridors.',
    to: '/services/residential-electrostatic-filter/',
    quoteHref: buildLocationQuoteHref({ locationSlug: 'los-angeles', service: 'filter', property: 'home' }),
  },
  {
    num: '08',
    title: 'Commercial Dryer Vent & Maintenance Plans',
    priceCue: 'Recurring schedules',
    text: 'Scheduled lint extraction for apartments, hotels, fitness studios, and commercial laundry rooms to prevent slow dry times and exhaust blockages.',
    to: '/services/commercial-dryer-vent-cleaning/',
    quoteHref: buildLocationQuoteHref({ locationSlug: 'los-angeles', service: 'dryer-vent', property: 'commercial' }),
  },
];

const faqs = [
  {
    question: 'How much does air duct and dryer vent cleaning cost in Los Angeles?',
    answer:
      'Pure Air California residential air duct cleaning starts at $299 for a single accessible HVAC system, and residential dryer vent cleaning starts at $149. Final written pricing reflects your physical HVAC unit count, register layout, attic or roof access, and any optional coil, blower, or filter add-ons—confirmed on site before work begins with zero hidden upsells.',
  },
  {
    question: 'How does the EPA recommend deciding whether Los Angeles air ducts need cleaning?',
    answer:
      'Consistent with U.S. EPA guidance, duct cleaning should be inspection-led rather than sold on a blanket calendar or unproven health promises. Cleaning makes practical sense when an inspection reveals substantial dust or debris accumulation, visible buildup after remodeling or wildfire smoke infiltration, clogged return plenums, or vermin/nesting material.',
  },
  {
    question: 'Can you clean air ducts after Los Angeles wildfire smoke or Santa Ana ash?',
    answer:
      'Yes, once local safety advisories clear and property access is safe. We inspect accessible return trunks, plenums, and blower housings first, replace clogged filters, and perform mechanical HEPA negative-pressure source removal. We also tell you candidly if smoke damaged soft insulation or flexible ducts that require HVAC replacement or structural remediation rather than routine cleaning.',
  },
  {
    question: 'Can you service Los Angeles apartments, condos, and HOA multi-unit dryer vents?',
    answer:
      'Yes. For individual condos or apartments, confirm whether the HVAC unit and dryer vent belong to your residence or connect to shared HOA shafts. For property managers and HOA boards, we coordinate resident access notices, building COI documentation, freight elevators, and rooftop vent-stack cleaning across multi-unit Los Angeles portfolios.',
  },
  {
    question: 'How do you access hillside canyon homes or historic 1920s Los Angeles residences?',
    answer:
      'When narrow canyon streets, steep stairs, or gated courtyards limit large trucks, we bring high-efficiency portable HEPA negative-pressure equipment. In 1920s–40s Spanish, Craftsman, and Tudor homes, we protect hardwood floors and plaster walls, inspect register fasteners before removal, and match agitation tools to rigid metal or flex duct materials.',
  },
  {
    question: 'How often should dryer vents be cleaned in Los Angeles homes and condos?',
    answer:
      'Most active households benefit from annual dryer vent inspection and lint clearing—and more frequently for large families or condos with long multi-turn interior chases leading to the roof. Watch for clothes taking longer than one cycle, hot laundry closets, or weak exterior hood airflow.',
  },
  {
    question: 'How do I book an air duct or dryer vent appointment in Greater Los Angeles?',
    answer:
      'Use our online Estimate Builder with your Los Angeles neighborhood and property type, or call (213) 792-4145 directly. Share your ZIP code, number of HVAC systems, whether dryer vent cleaning is needed, and any parking or access details so we can confirm scope and appointment availability.',
  },
];

export default function LosAngeles() {
  const pageUrl = canonicalUrl('/locations/los-angeles');
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: 'Air Duct & Dryer Vent Cleaning in Los Angeles, CA',
    serviceType: 'Residential and commercial air duct and dryer vent cleaning',
    description:
      'Inspection-led residential, HOA, and commercial air duct cleaning (starting at $299), dryer vent lint removal (starting at $149), wildfire smoke/ash duct care, and HVAC component cleaning across Greater Los Angeles.',
    url: pageUrl,
    provider: { '@id': seoConfig.schema.localBusiness['@id'] },
    areaServed: [
      { '@type': 'City', name: 'Los Angeles', sameAs: 'https://www.wikidata.org/wiki/Q65' },
      { '@type': 'Place', name: 'Westside, Los Angeles, CA' },
      { '@type': 'Place', name: 'San Fernando Valley, Los Angeles, CA' },
      { '@type': 'Place', name: 'San Gabriel Valley & Foothills, Los Angeles County, CA' },
      { '@type': 'Place', name: 'South Bay, Los Angeles County, CA' },
      { '@type': 'Place', name: 'Central Los Angeles, CA' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Los Angeles Air Duct & Dryer Vent Cleaning Services',
      itemListElement: [
        {
          '@type': 'Offer',
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '299',
            priceCurrency: 'USD',
            description: 'Starting price for single-system residential air duct cleaning in Los Angeles',
          },
          itemOffered: {
            '@type': 'Service',
            name: 'Residential Air Duct Cleaning in Los Angeles',
            url: canonicalUrl('/services/residential-air-duct-cleaning'),
          },
        },
        {
          '@type': 'Offer',
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '149',
            priceCurrency: 'USD',
            description: 'Starting price for accessible residential dryer vent cleaning in Los Angeles',
          },
          itemOffered: {
            '@type': 'Service',
            name: 'Residential Dryer Vent Cleaning in Los Angeles',
            url: canonicalUrl('/services/residential-dryer-vent-cleaning'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Wildfire Smoke & Hillside Air Duct Cleaning in Los Angeles',
            url: canonicalUrl('/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Commercial & HOA Air Duct & Dryer Vent Cleaning in Los Angeles',
            url: canonicalUrl('/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles'),
          },
        },
      ],
    },
  };

  return (
    <>
      <SEOProvider
        title="Air Duct & Dryer Vent Cleaning Los Angeles | Local Guide"
        description="Los Angeles air duct cleaning (from $299) & dryer vent cleaning (from $149) for homes, HOAs & businesses. Regional LA guide & free quote: (213) 792-4145."
        path="/locations/los-angeles/"
        mainEntityId={`${pageUrl}#service`}
        isLocalBusiness
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Service areas', item: '/locations/' },
          { name: 'Los Angeles', item: '/locations/los-angeles/' },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqs)) }} />
      <NavBar />
      <main>
        <PageHero
          eyebrow="LOS ANGELES AIR DUCT & DRYER VENT CLEANING · GREATER LA"
          title={
            <>
              Air Duct &amp; Dryer Vent Cleaning
              <br />
              <em>in Los Angeles, CA.</em>
            </>
          }
          description="Inspection-led residential, HOA, and commercial air duct cleaning (starting at $299) and dryer vent cleaning (starting at $149) across Greater Los Angeles—with a written scope and confirmed price before work begins."
          estimateHref={buildLocationQuoteHref({ locationSlug: 'los-angeles', service: 'air-duct', property: 'home' })}
          estimateLabel="Build your LA estimate"
          caption="Transparent Greater LA starting rates: $299 residential air ducts · $149 dryer vents · Custom commercial & HOA scopes."
          reassurance="Serving Westside, Central LA, San Fernando Valley, San Gabriel Foothills & South Bay · Call (213) 792-4145"
        />

        {/* On-page quick jump bar */}
        <nav className="pac-container pac-guide-nav" aria-label="On this Los Angeles guide">
          <a href="#la-regions">LA Micro-Climates</a>
          <a href="#la-finder">Neighborhood &amp; ZIP Finder</a>
          <a href="#la-services">Core LA Services</a>
          <a href="#la-cost">LA Pricing &amp; Scope</a>
          <a href="#la-areas">All 54 Local Guides</a>
          <a href="#la-questions">LA FAQs</a>
        </nav>

        {/* Transparent Starting-Rate Proof Strip */}
        <section className="pac-la-pricing-strip" aria-label="Los Angeles starting rates and inspection standards">
          <div className="pac-container pac-la-strip-grid">
            <div>
              <span className="pac-eyebrow">RESIDENTIAL AIR DUCTS</span>
              <strong>From $299</strong>
              <p>Single accessible HVAC system · Negative-pressure HEPA source removal</p>
            </div>
            <div>
              <span className="pac-eyebrow">DRYER VENT CLEANING</span>
              <strong>From $149</strong>
              <p>Rotary lint extraction · Wall &amp; roof termination airflow check</p>
            </div>
            <div>
              <span className="pac-eyebrow">HOA &amp; COMMERCIAL</span>
              <strong>Written building scope</strong>
              <p>Multi-unit dryer risers · Off-hours access · COI-ready scheduling</p>
            </div>
            <div className="pac-la-strip-cta">
              <Link
                to={buildLocationQuoteHref({ locationSlug: 'los-angeles', service: 'air-duct', property: 'home' })}
                className="pac-button"
              >
                Get free written estimate <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <a href={business.phoneHref} className="pac-text-link">
                <Phone size={15} aria-hidden="true" /> {business.phone}
              </a>
            </div>
          </div>
        </section>

        {/* Regional LA Micro-Climates & Housing Stock */}
        <section id="la-regions" className="pac-section pac-container">
          <div className="pac-section-heading">
            <div>
              <span className="pac-eyebrow">FIVE MICRO-CLIMATES. ONE INSPECTION-LED STANDARD.</span>
              <h2>
                How Los Angeles neighborhoods
                <br />
                <em>shape your ductwork.</em>
              </h2>
            </div>
            <p>
              An ocean-facing Santa Monica condo, a 1928 Los Feliz Craftsman, a triple-digit Woodland Hills attic trunk,
              and a foothill Pasadena house face completely different dust, moisture, wind, and access realities. We
              tailor every inspection and tool setup to your neighborhood’s building stock.
            </p>
          </div>

          <div className="pac-la-micro-grid">
            {laMicroClimates.map((zone) => {
              const Icon = zone.icon;
              return (
                <article key={zone.id} className="pac-la-micro-card">
                  <div className="pac-la-micro-head">
                    <span className="pac-la-micro-icon" aria-hidden="true">
                      <Icon size={22} />
                    </span>
                    <div>
                      <h3>{zone.title}</h3>
                      <p className="pac-la-micro-corridor">{zone.corridor}</p>
                    </div>
                  </div>
                  <p className="pac-la-micro-summary">{zone.summary}</p>
                  <ul className="pac-la-micro-list">
                    {zone.priorities.map((item) => (
                      <li key={item}>
                        <Check size={16} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pac-la-micro-links">
                    {zone.links.map((item) => (
                      <Link key={item.to} to={item.to} className="pac-la-micro-chip">
                        {item.label} <ArrowUpRight size={13} aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                  <Link to={zone.serviceLink.to} className="pac-text-link pac-la-micro-service">
                    {zone.serviceLink.label} <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        {/* Interactive LA Neighborhood & ZIP Finder */}
        <section id="la-finder" className="pac-process-section">
          <div className="pac-container">
            <NeighborhoodFinder
              variant="compact"
              heading="Search your Los Angeles neighborhood or ZIP code"
              intro="Type your city, neighborhood, or 5-digit ZIP code to jump straight to your hyperlocal HVAC guide or start an estimate pre-filled for your area."
            />
          </div>
        </section>

        {/* Core LA Services */}
        <section id="la-services" className="pac-section pac-container">
          <div className="pac-section-heading">
            <div>
              <span className="pac-eyebrow">COMPLETE LOS ANGELES AIR CARE</span>
              <h2>
                The right service.
                <br />
                <em>For your LA property.</em>
              </h2>
            </div>
            <p>
              Whether you own a single-family home, manage an HOA portfolio, or run a commercial studio or office, every
              service starts with an inspection and an itemized written scope.
            </p>
          </div>
          <div className="pac-service-grid">
            {laCoreServices.map((svc) => (
              <article className="pac-service-tile pac-la-service-tile" key={svc.to}>
                <div className="pac-la-service-top">
                  <span className="pac-eyebrow">{svc.num}</span>
                  <span className="pac-la-price-pill">{svc.priceCue}</span>
                </div>
                <h3>
                  <Link to={svc.to}>{svc.title}</Link>
                </h3>
                <p>{svc.text}</p>
                <div className="pac-la-service-actions">
                  <Link to={svc.to} className="pac-service-link">
                    Service details <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                  <Link to={svc.quoteHref} className="pac-la-inline-quote">
                    Estimate →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Pricing & Scope Verification */}
        <section id="la-cost" className="pac-process-section">
          <div className="pac-container pac-process-grid">
            <div>
              <span className="pac-eyebrow">CLEAR SCOPE. ZERO BAIT-AND-SWITCH.</span>
              <h2>
                What does air duct
                <br />
                cleaning <em>cost in LA?</em>
              </h2>
              <p>
                Transparent residential air duct cleaning starts at <strong>$299</strong> for a single accessible HVAC
                system, and residential dryer vent cleaning starts at <strong>$149</strong>. Final pricing depends on
                the number of independent air handlers, total accessible supply and return runs, attic or roof access,
                and any coil, blower, or filtration add-ons you choose.
              </p>
              <p>
                Beware of teaser $49 or $79 blow-and-go coupons that exclude return trunks, plenums, or HEPA negative
                pressure—our crew inspects your system first and confirms the complete written scope before starting.
              </p>
              <div className="pac-actions" style={{ marginTop: 22 }}>
                <Link className="pac-text-link" to="/pricing/">
                  Read full LA pricing guide <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
                <Link className="pac-text-link" to="/air-quality-calculator/">
                  Run LA indoor air checklist <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div>
              <h3 className="pac-guide-subtitle">
                <ShieldCheck size={20} style={{ display: 'inline', marginRight: 8, verticalAlign: 'text-bottom' }} aria-hidden="true" />
                5 details to confirm before booking in Los Angeles
              </h3>
              <ul className="pac-guide-checklist">
                {[
                  'Number of physical HVAC systems (not just thermostat zones)',
                  'Whether supply trunks, return chases, plenums, and grilles are included',
                  'Attic, crawlspace, roof, HOA freight-elevator, or hillside access rules',
                  'Whether dryer exhaust runs are scoped separately with termination checks',
                  'Exact written price confirmed on site before any equipment starts',
                ].map((item) => (
                  <li key={item}>
                    <Check size={18} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Share your Los Angeles ZIP code, property type, system count, and any smoke, dust, or slow-dryer
                concerns to receive a property-specific estimate.
              </p>
              <Link
                className="pac-button"
                to={buildLocationQuoteHref({ locationSlug: 'los-angeles', service: 'air-duct', property: 'home' })}
              >
                Build your Los Angeles estimate <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Westside Featured Guides */}
        <WestsideGuides />

        {/* Complete 54-Area Regional Directory */}
        <section id="la-areas" className="pac-process-section">
          <div className="pac-container">
            <span className="pac-eyebrow">COMPLETE GREATER LOS ANGELES COVERAGE</span>
            <h2>
              From the San Fernando Valley
              <br />
              <em>to the Pacific Coast.</em>
            </h2>
            <p>
              Browse all {locationData.length} dedicated local guides grouped by region. Don’t see your exact
              neighborhood? Call <a href={business.phoneHref} className="underline font-semibold">{business.phone}</a>{' '}
              with your ZIP code to confirm scheduling.
            </p>
            <div className="pac-region-grid">
              {Object.entries(regions).map(([key, label]) => (
                <div key={key}>
                  <h3>{label}</h3>
                  <ul>
                    {locationData
                      .filter((l) => l.region === key)
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((l) => (
                        <li key={l.slug}>
                          <Link to={`/locations/${l.slug}/`}>
                            <span>{l.name}</span>
                            <ArrowUpRight size={13} aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Los Angeles FAQs */}
        <section id="la-questions" className="pac-section pac-container pac-faq-grid">
          <div>
            <span className="pac-eyebrow">BEFORE WE VISIT</span>
            <h2>
              Los Angeles
              <br />
              <em>service questions.</em>
            </h2>
            <p>
              Straightforward, EPA-aligned answers to the most common air duct and dryer vent questions across Greater
              Los Angeles.
            </p>
            <div className="pac-actions" style={{ marginTop: 20 }}>
              <Link
                className="pac-button"
                to={buildLocationQuoteHref({ locationSlug: 'los-angeles', service: 'air-duct', property: 'home' })}
              >
                Request free estimate <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <Link className="pac-text-link" to="/contact/">
                Ask about your property <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="pac-faq-list">
            {faqs.map((faq, idx) => (
              <details key={faq.question} open={idx === 0}>
                <summary>
                  {faq.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
