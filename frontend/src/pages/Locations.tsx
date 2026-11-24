import WestsideGuides from '@/components/WestsideGuides';
import PageHero from '@/components/PageHero';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Link } from '@/components/CanonicalLink';
import { ArrowUpRight, CheckCircle, MapPin, Phone } from 'lucide-react';
import EnhancedQuoteForm from '@/components/EnhancedQuoteForm';
import { locationData } from './locations/data';
import ResponsiveImage from '@/components/ResponsiveImage';
import SEOProvider from '@/components/SEOProvider';
import NeighborhoodFinder from './locations/NeighborhoodFinder';
import { buildLocationQuoteHref } from './locations/locationSeo';
import { canonicalUrl } from '@/utils/seo/canonicalUrl';
import { serializeJsonLd } from '@/utils/seo/jsonLd.mjs';
import { business } from '@/config/business';

const Locations = () => {
  const pageUrl = canonicalUrl('/locations');
  const itemListId = `${pageUrl}#locations`;

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': itemListId,
    name: 'Pure Air California Los Angeles Service Areas',
    description:
      'Neighborhood-specific air duct, HVAC component, and dryer vent cleaning guides across Greater Los Angeles and Ventura.',
    numberOfItems: locationData.length + 1,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Los Angeles Air Duct & Dryer Vent Cleaning Guide',
        url: canonicalUrl('/locations/los-angeles'),
      },
      ...locationData.map((loc, idx) => ({
        '@type': 'ListItem',
        position: idx + 2,
        name: `${loc.name} Air Duct Cleaning`,
        url: canonicalUrl(`/locations/${loc.slug}`),
      })),
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOProvider
        title="Los Angeles Air Duct Cleaning Locations | Pure Air CA"
        description="Air duct cleaning (from $299) & dryer vents across 54 Los Angeles neighborhoods — Beverly Hills, Santa Monica, Pasadena & the Valley. Call (213) 792-4145."
        path="/locations"
        mainEntityId={itemListId}
        isLocalBusiness={true}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListSchema) }} />

      <NavBar />

      <main>
        <PageHero
          eyebrow="GREATER LOS ANGELES SERVICE AREAS · 54 LOCAL GUIDES"
          title={
            <>
              Los Angeles Air Duct &amp; Dryer Vent
              <br />
              <em>Cleaning Service Areas.</em>
            </>
          }
          description="Search by neighborhood, region, or ZIP code for inspection-led residential air duct cleaning (starting at $299), dryer vent cleaning (starting at $149), and commercial HOA HVAC care across Greater Los Angeles."
          estimateHref={buildLocationQuoteHref({ locationSlug: 'los-angeles', service: 'air-duct', property: 'home' })}
          estimateLabel="Get your free LA estimate"
          caption="Serving Westside, Coastal, Central LA, San Fernando Valley, San Gabriel Foothills, and South Bay corridors."
          reassurance="Transparent written scope before work begins · Call (213) 792-4145"
        />

        {/* Los Angeles Pillar Guide Spotlight */}
        <section className="pac-loc-pillar-band" aria-label="Greater Los Angeles pillar guide">
          <div className="pac-container pac-loc-pillar-inner">
            <div>
              <span className="pac-eyebrow">REGIONAL HUB GUIDE</span>
              <h2>Start with our complete Greater Los Angeles Service Guide</h2>
              <p>
                Compare LA micro-climate ductwork realities—from Santa Monica marine layers and 1920s Los Feliz plaster
                homes to San Fernando Valley summer AC runs and Pasadena foothill smoke care—plus transparent starting
                rates and FAQs.
              </p>
            </div>
            <div className="pac-loc-pillar-actions">
              <Link to="/locations/los-angeles/" className="pac-button">
                Read the Los Angeles guide <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <Link to="/pricing/" className="pac-text-link">
                See LA starting prices ($299 / $149) <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Neighborhood, Region & ZIP Directory */}
        <section className="pac-section pac-container" id="service-area-directory">
          <NeighborhoodFinder
            variant="cards"
            heading="Find air duct & dryer vent cleaning near you"
            intro="Filter all 54 local service guides by region, neighborhood name, or 5-digit ZIP code—or launch a pre-filled estimate directly for your area."
          />
        </section>

        {/* Featured Westside Guides */}
        <WestsideGuides />

        {/* Greater LA Coverage Summary & Service Map */}
        <section className="pac-process-section">
          <div className="pac-container pac-loc-coverage-grid">
            <div>
              <span className="pac-eyebrow">COUNTY-WIDE DISPATCH</span>
              <h2>
                Comprehensive coverage across
                <br />
                <em>Greater Los Angeles.</em>
              </h2>
              <p>
                Beyond our 54 dedicated neighborhood guides, Pure Air California serves residential homes,
                condominiums, HOA portfolios, and commercial properties across Los Angeles County—including Bel Air,
                Silver Lake, Venice, Marina del Rey, Altadena, San Gabriel Valley, Torrance, and Long Beach—as well as
                extended Ventura coastal routes.
              </p>
              <ul className="pac-loc-coverage-bullets">
                {[
                  'Free, inspection-led written estimates with zero bait-and-switch coupon upsells',
                  'Residential air duct cleaning from $299 & dryer vent cleaning from $149',
                  'Portable HEPA equipment for hillside canyon streets, condos, and historic homes',
                  'COI-ready scheduling for HOA boards, commercial offices, studios, and restaurants',
                ].map((item) => (
                  <li key={item}>
                    <CheckCircle size={18} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pac-actions" style={{ marginTop: 26 }}>
                <Link
                  to={buildLocationQuoteHref({ locationSlug: 'los-angeles', service: 'air-duct', property: 'home' })}
                  className="pac-button"
                >
                  Schedule your estimate <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
                <a href={business.phoneHref} className="pac-text-link">
                  <Phone size={15} aria-hidden="true" /> Confirm coverage: {business.phone}
                </a>
              </div>
            </div>

            <div className="pac-loc-map-frame">
              <ResponsiveImage
                src="/images/locations/service-map.webp"
                alt="Greater Los Angeles and Ventura service area coverage map for Pure Air California"
                width={1024}
                height={1024}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-full object-cover"
              />
              <span className="pac-loc-map-caption">
                <MapPin size={15} aria-hidden="true" />
                Greater Los Angeles · Westside · Valley · Foothills · South Bay
              </span>
            </div>
          </div>
        </section>

        {/* Direct Quote Form Section */}
        <section className="pac-section pac-container">
          <div className="pac-loc-quote-grid">
            <div>
              <span className="pac-eyebrow">CONFIRM YOUR ADDRESS &amp; SCOPE</span>
              <h2>
                Ready for a clear written
                <br />
                <em>local estimate?</em>
              </h2>
              <p>
                Share your ZIP code, property type, HVAC system count, and whether you need air duct cleaning, dryer
                vent care, or post-smoke inspection. We review access details upfront and confirm your written price on
                site before work begins.
              </p>
              <div className="pac-loc-quick-links">
                <Link to="/services/residential-air-duct-cleaning/" className="pac-text-link">
                  Residential air ducts (from $299) <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
                <Link to="/services/residential-dryer-vent-cleaning/" className="pac-text-link">
                  Dryer vent cleaning (from $149) <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
                <Link to="/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles/" className="pac-text-link">
                  Wildfire smoke &amp; hillside ducts <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
                <Link to="/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/" className="pac-text-link">
                  Commercial &amp; HOA portfolios <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <EnhancedQuoteForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Locations;
