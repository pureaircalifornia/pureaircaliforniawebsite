import { canonicalUrl } from '@/utils/seo/canonicalUrl';
import { serializeJsonLd } from '@/utils/seo/jsonLd.mjs';
import { Link } from '@/components/CanonicalLink';
import { ArrowUpRight, Phone } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import Gallery from '@/components/Gallery';
import SEOProvider from '@/components/SEOProvider';
import { business } from '@/config/business';

const groups = [
  {
    id: 'home',
    eyebrow: 'FOR YOUR HOME',
    title: 'Comfort starts behind the scenes.',
    text: 'Inspection-led residential air duct, dryer vent, and filter care for Los Angeles houses, condos, and estates.',
    services: [
      [
        'residential-air-duct-cleaning',
        'Residential air duct cleaning',
        'Starting at $299 for eligible scopes. Remove settled dust and remodel debris from accessible supply and return ductwork.',
        'residential',
        'A technician cleaning a ceiling ventilation opening',
      ],
      [
        'residential-dryer-vent-cleaning',
        'Residential dryer vent cleaning',
        'Starting at $149 for eligible vents. Clear compacted lint from behind your dryer to the exterior wall or roof termination.',
        'dryer',
        'Lint and a cleaning brush at a dryer exhaust connection',
      ],
      [
        'residential-electrostatic-filter',
        'Residential electrostatic filters',
        'Inspect, wash, and size compatible reusable collector cells and air filters matched to your return dimensions.',
        'duct-interior-clean-v2',
        'Clean interior of a metal HVAC air duct',
      ],
      [
        'wildfire-smoke-hillside-air-duct-cleaning-los-angeles',
        'Wildfire smoke & hillside ducts',
        'Inspection-first assessment and negative-pressure source removal of ash, soot, and remodel dust for hillside and canyon homes.',
        'hvac',
        'Air duct and HVAC system care',
      ],
    ],
  },
  {
    id: 'business',
    eyebrow: 'FOR YOUR BUSINESS & HOA',
    title: 'Your operation. Our attention to detail.',
    text: 'A clear written scope, COI documentation, coordinated access, and off-hours scheduling for Los Angeles commercial and multifamily properties.',
    services: [
      [
        'commercial-air-duct-cleaning',
        'Commercial air duct cleaning',
        'Site-specific HVAC and ventilation cleaning for offices, healthcare clinics, hotels, retail showrooms, and industrial spaces.',
        'commercial',
        'Technician inspecting commercial metal ductwork',
      ],
      [
        'commercial-dryer-vent-cleaning',
        'Commercial dryer vent cleaning',
        'Scheduled dryer exhaust line, riser, and manifold clearing planned around busy apartment laundry rooms, hotels, and gyms.',
        'laundromat',
        'Laundry machines and overhead exhaust ductwork',
      ],
      [
        'commercial-electrostatic-filter',
        'Commercial electrostatic filters',
        'Collector-cell washing, filter-bank inventories, and maintenance logs for multi-unit commercial HVAC equipment.',
        'office',
        'Modern commercial office with exposed HVAC ductwork',
      ],
      [
        'commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles',
        'Commercial & HOA air care',
        'Coordinate multi-unit dryer exhaust stacks, common-area HVAC, resident notices, COI compliance, and board-ready scopes.',
        'building',
        'Commercial building exterior in Los Angeles',
      ],
    ],
  },
  {
    id: 'system-care',
    eyebrow: 'KEEP IT WORKING TOGETHER',
    title: 'Care for the whole system.',
    text: 'Component-level HVAC hygiene, odor assessments, and recurring maintenance programs for homes and commercial facilities.',
    services: [
      [
        'hvac-system-cleaning',
        'HVAC system cleaning',
        'Component-by-component inspection and cleaning for accessible evaporator coils, blower assemblies, plenums, and ductwork.',
        'hvac',
        'Technicians working on HVAC equipment',
      ],
      [
        'dryer-vent-maintenance-program',
        'Dryer vent maintenance program',
        'Scheduled quarterly, semi-annual, or annual dryer exhaust inspections and lint removal with dated completion logs.',
        'dryerAppliance',
        'Dryer with its exhaust connection',
      ],
      [
        'air-duct-sanitizing',
        'Air duct sanitizing',
        'Inspection-first evaluation of duct materials, moisture sources, and EPA-registered treatment labels after mechanical cleaning.',
        'cleanDuct',
        'Interior of a clean metal air duct',
      ],
      [
        'laundromat-dryer-vent-cleaning',
        'Laundromat dryer vent cleaning',
        'High-volume dryer bank, shared overhead manifold, booster fan, and roof cap cleaning scheduled around store operating hours.',
        'laundromat',
        'Commercial laundry machines and exhaust ductwork',
      ],
    ],
  },
];

export default function Services() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${canonicalUrl('/services')}#services`,
    name: 'Pure Air California services',
    itemListElement: groups
      .flatMap((group) => group.services)
      .map(([slug, title], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: title,
        url: canonicalUrl(`/services/${slug}`),
      })),
  };

  return (
    <div className="pac-services-page">
      <SEOProvider
        title="Air Duct Cleaning Services Los Angeles"
        description="Explore residential and commercial air duct, dryer vent, HVAC and electrostatic filter services in Los Angeles. Call PAC for a clear, free estimate."
        path="/services/"
        mainEntityId={`${canonicalUrl('/services')}#services`}
        isLocalBusiness
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemList) }}
      />
      <NavBar alwaysOpaque />
      <main>
        <PageHero
          title={
            <>
              Los Angeles Air Duct, Dryer Vent
              <br />
              <em>&amp; HVAC Cleaning Services.</em>
            </>
          }
          description="Inspection-led air duct cleaning (from $299), full-path dryer vent lint extraction (from $149), HVAC component cleaning, and commercial/HOA programs across Greater Los Angeles."
        />
        <nav className="pac-service-jump pac-container" aria-label="Browse services">
          <Link to="/home-services/">For your home →</Link>
          <a href="#business">For your business &amp; HOA ↓</a>
          <a href="#system-care">Complete system care ↓</a>
          <Link to="/pricing/">Pricing guide →</Link>
          <Link to="/locations/los-angeles/">Los Angeles coverage →</Link>
        </nav>
        {groups.map((group) => (
          <section className="pac-catalog-section pac-container" id={group.id} key={group.id}>
            <div className="pac-catalog-heading">
              <span className="pac-eyebrow">{group.eyebrow}</span>
              <h2>{group.title}</h2>
              <p>{group.text}</p>
            </div>
            <div className="pac-catalog-grid">
              {group.services.map(([slug, title, description, img, alt]) => (
                <Link className="pac-catalog-card" to={`/services/${slug}/`} key={slug}>
                  <div className="pac-catalog-photo">
                    <img
                      src={`/images/pac/${img}.webp`}
                      alt={alt}
                      width={720}
                      height={520}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="pac-catalog-body">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <span>
                      Explore service <ArrowUpRight size={19} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
        <Gallery />
        <section className="pac-services-cta">
          <div className="pac-container">
            <span className="pac-eyebrow">LET’S FIND THE RIGHT NEXT STEP</span>
            <h2>
              A home, a business,
              <br />
              or a question? Call PAC.
            </h2>
            <p>
              Tell us about your space, system count, and what you’ve noticed. We’ll confirm a clear written scope and price before any work begins.
            </p>
            <div className="pac-actions">
              <Link
                className="pac-button pac-button-light"
                to="/quote/?service=air-duct&property=home#estimate-builder"
              >
                Build your free estimate <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <a className="pac-button pac-button-outline" href={business.phoneHref}>
                <Phone size={18} aria-hidden="true" /> Call {business.phone}
              </a>
              <Link className="pac-text-link" to="/pricing/">
                See LA pricing &amp; starting rates →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
