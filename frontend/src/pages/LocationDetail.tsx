import { locationImageAlt } from '@/data/locationImageAlts';
import BusinessAreaDirectory from '@/components/BusinessAreaDirectory';
import { localGuides } from '@/data/localGuides';
import LocalServiceGuide from '@/components/LocalServiceGuide';
import PageHero from '@/components/PageHero';
import NotFound from './NotFound';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import { Link } from '@/components/CanonicalLink';
import { locationData } from './locations/data';
import { getRegionContent } from './locations/regionContent';
import {
  buildLocationDescription,
  buildLocationQuoteHref,
  buildLocationTitle,
} from './locations/locationSeo';
import { REGION_LABELS } from './locations/NeighborhoodFinder';

import ResponsiveImage from '@/components/ResponsiveImage';
import HomeQuoteForm from '@/components/HomeQuoteForm';
import TestimonialCard from '@/components/TestimonialCard';
import SEOProvider from '@/components/SEOProvider';
import SchemaMarkup from '@/components/SchemaMarkup';
import { seoConfig } from '@/utils/seo/seoConfig';
import { canonicalUrl } from '@/utils/seo/canonicalUrl';
import RelatedLinks from '@/components/RelatedLinks';
import {
  getNearbyLocations,
  getServiceLinksForCity,
  getBlogLinksForCity,
  getIndustryLinksForCity,
} from '@/utils/internalLinks';
import { googleReviews } from '@/data/googleReviews';
import { business } from '@/config/business';
import { Phone, ArrowRight, ArrowUpRight, CheckCircle, MapPin, ShieldCheck } from 'lucide-react';

const LocationDetail = () => {
  const { locationSlug } = useParams<{ locationSlug: string }>();
  const location = locationData.find((loc) => loc.slug === locationSlug);

  if (!location) {
    return <NotFound />;
  }

  const guide = localGuides[location.slug];
  const regionContent = getRegionContent(location.region);
  const regionLabel = REGION_LABELS[location.region] || regionContent.label;
  const municipality = guide?.municipality || location.municipality;
  const mapQuery =
    municipality === location.name
      ? `${location.name}, California`
      : `${location.name}, ${municipality}, California`;

  const areaServed = {
    '@type': 'Place',
    name: location.name,
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name:
        municipality === 'Los Angeles'
          ? 'Los Angeles, California'
          : `${location.county} County, California`,
    },
  };

  const pageTitle = buildLocationTitle(location);
  const pageDescription = buildLocationDescription(location);
  const pageUrl = `${seoConfig.siteUrl}/locations/${location.slug}`;
  const canonicalPageUrl = canonicalUrl(pageUrl);

  const nearbyLocations = getNearbyLocations(location.slug, 6);
  const nearbyNames = nearbyLocations.slice(0, 4).map((l) => l.label);

  // Rotate two real Google reviews per city so neighboring pages don't duplicate
  // the exact same testimonial block, while never fabricating city attribution.
  const reviewIndex = locationData.findIndex((l) => l.slug === location.slug);
  const reviewsForThisCity = [
    googleReviews[reviewIndex % googleReviews.length],
    googleReviews[(reviewIndex + 3) % googleReviews.length],
  ].filter(Boolean);

  // Combine tailored city cost FAQ + unique per-city FAQs + unique region FAQ (4-5 total).
  const citySpecificFaqs = guide?.faqs ?? location.localFaqs ?? [];
  const regionalFaq = regionContent.faqs[0]
    ? [{ question: regionContent.faqs[0].q, answer: regionContent.faqs[0].a }]
    : [];

  const zipListShort = location.zipCodes.slice(0, 3).join(', ');
  const locationFaqs = [
    {
      question: `How much does air duct and dryer vent cleaning cost in ${location.name}?`,
      answer: `Residential air duct cleaning in ${location.name}${zipListShort ? ` (${zipListShort})` : ''} starts at $299 for a single accessible HVAC system, and residential dryer vent cleaning starts at $149. Final written pricing follows your physical HVAC unit count, register layout, and access—confirmed on site before work begins. Call ${business.phone} or request a free estimate online.`,
    },
    ...citySpecificFaqs,
    ...regionalFaq,
  ];

  // Tailor the 6 local service cards to highlight region-relevant priorities first.
  const allLocalServices = [
    {
      key: 'residential-duct',
      title: 'Residential Air Duct Cleaning',
      priceCue: 'From $299',
      href: '/services/residential-air-duct-cleaning/',
      quoteHref: buildLocationQuoteHref({ locationSlug: location.slug, service: 'air-duct', property: 'home' }),
      desc: `HEPA negative-pressure supply, return, plenum, and grille cleaning tailored for ${location.name} homes and condos.`,
    },
    {
      key: 'dryer-vent',
      title: 'Residential Dryer Vent Cleaning',
      priceCue: 'From $149',
      href: '/services/residential-dryer-vent-cleaning/',
      quoteHref: buildLocationQuoteHref({ locationSlug: location.slug, service: 'dryer-vent', property: 'home' }),
      desc: `Mechanical lint extraction and wall or roof exhaust airflow verification for ${location.name} laundry runs.`,
    },
    {
      key: 'wildfire-smoke',
      title: 'Wildfire Smoke & Hillside Duct Care',
      priceCue: 'Inspection-led',
      href: '/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles/',
      quoteHref: buildLocationQuoteHref({
        locationSlug: location.slug,
        service: 'air-duct',
        property: 'home',
        addons: ['wildfire-smoke'],
      }),
      desc: `Honest inspection and HEPA removal for canyon ash, regional smoke odors, and post-remodel dust in ${location.name}.`,
    },
    {
      key: 'commercial-hoa',
      title: 'Commercial & HOA Air Ducts & Vents',
      priceCue: 'Building scope',
      href: '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/',
      quoteHref: buildLocationQuoteHref({ locationSlug: location.slug, service: 'air-duct', property: 'managed' }),
      desc: `Multi-unit HOA dryer risers, common-area HVAC ducts, and COI-ready scheduling for ${location.name} properties.`,
    },
    {
      key: 'hvac-system',
      title: 'HVAC System, Coil & Blower Cleaning',
      priceCue: 'Component scope',
      href: '/services/hvac-system-cleaning/',
      quoteHref: buildLocationQuoteHref({
        locationSlug: location.slug,
        service: 'other',
        property: 'home',
        addons: ['hvac-coil'],
      }),
      desc: `Accessible evaporator coil, blower wheel, and air-handler cabinet cleaning to support steady ${location.name} airflow.`,
    },
    {
      key: 'electrostatic-filter',
      title: 'Electrostatic Air Filters',
      priceCue: 'Washable & custom',
      href: '/services/residential-electrostatic-filter/',
      quoteHref: buildLocationQuoteHref({ locationSlug: location.slug, service: 'filter', property: 'home' }),
      desc: `Custom-fit washable electrostatic filters sized to curb bypass dust in ${location.name} return chases.`,
    },
  ];

  // Prioritize Wildfire or Commercial/HOA into slot 3 depending on the neighborhood's region.
  const localServices =
    location.region === 'urban-core' || location.region === 'westside'
      ? [
          allLocalServices[0],
          allLocalServices[1],
          allLocalServices[3],
          allLocalServices[4],
          allLocalServices[2],
          allLocalServices[5],
        ]
      : allLocalServices;

  const primaryQuoteHref = buildLocationQuoteHref({
    locationSlug: location.slug,
    service: 'air-duct',
    property: 'home',
  });

  return (
    <div className="min-h-screen flex flex-col">
      <SEOProvider
        title={pageTitle}
        description={pageDescription}
        path={`/locations/${location.slug}`}
        image={location.image}
        imageAlt={locationImageAlt(location.slug)}
        mainEntityId={`${canonicalPageUrl}#service`}
        isLocalBusiness
      >
        <SchemaMarkup
          schema={{
            '@context': 'https://schema.org',
            '@type': 'Service',
            '@id': `${canonicalPageUrl}#service`,
            name: `Air duct cleaning in ${location.name}`,
            serviceType: 'Residential and commercial air duct and dryer vent cleaning',
            description: guide?.summary ?? pageDescription,
            url: canonicalPageUrl,
            provider: { '@id': seoConfig.schema.localBusiness['@id'] },
            areaServed,
            offers: [
              {
                '@type': 'Offer',
                name: `Residential Air Duct Cleaning in ${location.name}`,
                price: '299',
                priceCurrency: 'USD',
                url: canonicalUrl('/services/residential-air-duct-cleaning'),
              },
              {
                '@type': 'Offer',
                name: `Residential Dryer Vent Cleaning in ${location.name}`,
                price: '149',
                priceCurrency: 'USD',
                url: canonicalUrl('/services/residential-dryer-vent-cleaning'),
              },
            ],
          }}
        />
        <SchemaMarkup
          schema={{
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            '@id': `${canonicalPageUrl}#breadcrumb`,
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: canonicalUrl('/'),
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Locations',
                item: canonicalUrl('/locations'),
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: location.name,
                item: canonicalPageUrl,
              },
            ],
          }}
        />
        <SchemaMarkup
          schema={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': `${canonicalPageUrl}#faq`,
            mainEntity: locationFaqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }}
        />
      </SEOProvider>

      <NavBar />

      <main>
        <PageHero
          image={location.image}
          srcSet={`/images/locations/${location.slug}-640.webp 640w, ${location.image} 1024w`}
          alt={locationImageAlt(location.slug)}
          eyebrow={`AIR DUCT & DRYER VENT CLEANING · ${location.name.toUpperCase()}, CA`}
          title={
            <>
              Air Duct &amp; Dryer Vent Cleaning
              <br />
              <em>in {location.name}.</em>
            </>
          }
          description={guide?.summary ?? location.description}
          estimateHref={primaryQuoteHref}
          estimateLabel={`Free ${location.name} estimate`}
          caption={`Residential air ducts from $299 · Dryer vents from $149 · Covering ${location.name}${
            location.zipCodes.length ? ` (${location.zipCodes.slice(0, 4).join(', ')})` : ''
          }.`}
          reassurance={`${regionLabel} · Written scope confirmed before work begins`}
        />

        {/* Local Housing Stock, Micro-Climate & ZIP Coverage */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <span className="pac-eyebrow text-brand-700 mb-3">
                  <MapPin size={14} aria-hidden="true" />
                  {regionLabel.toUpperCase()} · {municipality.toUpperCase()}, CA
                </span>
                <h2 className="text-3xl font-bold mb-4 text-slate-900">
                  Local Air Duct &amp; Dryer Vent Care in {location.name}
                </h2>
                <p className="text-sm font-semibold text-brand-700 bg-brand-50 border border-brand-100 rounded-lg px-4 py-3 mb-6">
                  Typical local properties: {location.housingProfile}
                </p>

                {location.localProfile && (
                  <p className="text-lg text-gray-700 leading-relaxed mb-5">{location.localProfile}</p>
                )}
                {location.localContext && (
                  <p className="text-lg text-gray-600 leading-relaxed mb-5">{location.localContext}</p>
                )}
                <p className="text-base text-gray-600 leading-relaxed mb-5">{regionContent.conditions}</p>
                {location.fieldNotes && (
                  <p className="text-base text-gray-700 leading-relaxed mb-5">{location.fieldNotes}</p>
                )}

                <div className="flex flex-wrap gap-3 my-6">
                  <Link to={primaryQuoteHref} className="pac-button">
                    Get a {location.name} estimate <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                  <a
                    href={business.phoneHref}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-brand-200 text-brand-700 font-semibold hover:bg-brand-50 transition-colors"
                  >
                    <Phone size={16} aria-hidden="true" /> {business.phone}
                  </a>
                  <Link
                    to="/pricing/"
                    className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
                  >
                    See LA pricing ($299 / $149)
                  </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-semibold mb-3 text-slate-900">
                    ZIP codes we serve in {location.name}
                  </h3>
                  <p className="text-base text-gray-600 mb-4 leading-relaxed">
                    We cover {location.zipCodes.length === 1 ? 'ZIP code' : 'all'}{' '}
                    {location.zipCodes.length > 1 ? `${location.zipCodes.length} ` : ''}
                    {location.name} ZIP code{location.zipCodes.length === 1 ? '' : 's'} —{' '}
                    {location.zipCodes.slice(0, -1).join(', ')}
                    {location.zipCodes.length > 1 ? ' and ' : ''}
                    {location.zipCodes[location.zipCodes.length - 1]}
                    {nearbyNames.length > 0 && (
                      <>
                        {' '}
                        — along with neighboring {nearbyNames.slice(0, -1).join(', ')}
                        {nearbyNames.length > 1 ? ' and ' : ''}
                        {nearbyNames[nearbyNames.length - 1]}
                      </>
                    )}
                    . Share your address and access notes when requesting an estimate.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {location.zipCodes.map((zip) => (
                      <span
                        key={zip}
                        className="bg-brand-50 text-brand-800 border border-brand-100 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {zip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-xl overflow-hidden shadow-xl h-72 md:h-96 relative border border-gray-100">
                  {import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? (
                    <iframe
                      title={`Map of ${mapQuery}`}
                      className="w-full h-full border-0"
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps/embed/v1/place?key=${
                        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
                      }&q=${encodeURIComponent(mapQuery)}`}
                    ></iframe>
                  ) : (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100">
                      <ResponsiveImage
                        src={location.image}
                        alt={locationImageAlt(location.slug)}
                        width={1024}
                        height={1024}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>

                {/* Transparent Starting-Price & Inspection Card */}
                <aside className="bg-brand-50 border border-brand-100 rounded-xl p-6">
                  <div className="flex items-center gap-2 text-brand-700 font-semibold text-sm mb-3">
                    <ShieldCheck size={18} aria-hidden="true" />
                    <span>{location.name} Inspection-Led Standards</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-4 border border-brand-100">
                      <span className="block text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        Air Duct Cleaning
                      </span>
                      <strong className="text-xl text-slate-900">From $299</strong>
                      <span className="block text-xs text-gray-600 mt-1">Single accessible HVAC system</span>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-brand-100">
                      <span className="block text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        Dryer Vent Cleaning
                      </span>
                      <strong className="text-xl text-slate-900">From $149</strong>
                      <span className="block text-xs text-gray-600 mt-1">Rotary lint extraction &amp; flow check</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {regionContent.seasonal} Final pricing is confirmed in writing on site before work begins.
                  </p>
                  <Link to={primaryQuoteHref} className="pac-text-link">
                    Customize a {location.name} estimate <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {guide && <LocalServiceGuide guide={guide} citySlug={location.slug} />}

        {/* Location-Specific Visit Planning Challenges (all non-guide cities) */}
        {!guide && location.challenges && location.challenges.length > 0 && (
          <section className="py-16 bg-brand-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <span className="pac-eyebrow text-brand-700">PREPARING FOR YOUR VISIT</span>
                  <h2 className="text-3xl font-bold mt-2 mb-4 text-slate-900">
                    Planning air duct &amp; dryer vent service in {location.name}
                  </h2>
                  <p className="text-lg text-gray-600">
                    Four local property details that help us confirm an accurate written scope on the first visit:
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {location.challenges.map((challenge, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-sm border border-brand-100 flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed">{challenge}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tailored Services Available in This Area */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="pac-eyebrow text-brand-700">SERVICES IN {location.name.toUpperCase()}</span>
              <h2 className="text-3xl font-bold mt-2 mb-4 text-slate-900">
                Our Services in {location.name}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {regionContent.priorityReason} Choose a service below to review scope details or launch an estimate
                pre-filled for {location.name}.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {localServices.map((service) => (
                <article
                  key={service.key}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all flex flex-col"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-600 flex-shrink-0 mt-1" aria-hidden="true" />
                      <h3 className="font-bold text-lg text-gray-900">
                        <Link to={service.href} className="hover:text-brand-700 transition-colors">
                          {service.title}
                        </Link>
                      </h3>
                    </div>
                    <span className="text-xs font-semibold text-brand-800 bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {service.priceCue}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-grow">{service.desc}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-sm font-semibold">
                    <Link
                      to={service.href}
                      className="text-brand-700 inline-flex items-center gap-1 hover:underline underline-offset-4"
                    >
                      Scope details <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                    <Link
                      to={service.quoteHref}
                      className="text-slate-700 hover:text-brand-700 inline-flex items-center gap-1"
                    >
                      Quote <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <HomeQuoteForm />

        {/* Real Google Reviews (rotated by city, truthfully attributed to GBP — never fabricated per-city) */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-slate-900">What Our Customers Say</h2>
              <p className="text-lg text-gray-600">
                Selected reviews from our{' '}
                <a
                  href={business.googleProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 underline underline-offset-2 hover:text-brand-900"
                >
                  Google Business Profile
                </a>
                . Visit the profile for all reviews and the current rating.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {reviewsForThisCity.map((review) => (
                <TestimonialCard
                  key={review.name}
                  name={review.name}
                  location={`Google review · ${review.when}`}
                  quote={review.text}
                  rating={review.rating}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Visible Hyperlocal FAQ Section (kept openly visible so FAQPage JSON-LD matches innerText verbatim) */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-slate-900">
                  Frequently Asked Questions About Air Duct Cleaning in {location.name}
                </h2>
                <p className="text-lg text-gray-600">
                  Local scope, pricing, and property-access answers for {location.name} homeowners and managers.
                </p>
              </div>
              <div className="space-y-6">
                {locationFaqs.map((faq, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-bold mb-3 text-gray-900">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final Conversion CTA */}
        <section className="py-16 bg-brand-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for Cleaner Ducts &amp; Dryer Vents in {location.name}?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-brand-100">
              Residential air duct cleaning starts at $299 and dryer vents start at $149—always confirmed in writing on
              site before work begins.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-brand-700 hover:bg-gray-100 font-bold text-lg px-8 py-6 h-auto shadow-lg"
                asChild
              >
                <a href={business.phoneHref} className="flex items-center gap-2">
                  <Phone className="fill-current" size={22} aria-hidden="true" />
                  Call {business.phone}
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white hover:text-brand-700 text-lg px-8 py-6 h-auto"
                asChild
              >
                <Link to={primaryQuoteHref} className="flex items-center gap-2">
                  Build a {location.name} Estimate
                  <ArrowRight size={20} aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Internal Link Mesh: Services, Commercial Sectors, Nearby Neighborhoods & Articles */}
        <RelatedLinks
          heading={`Air Duct & Dryer Vent Services in ${location.name}`}
          intro={`${regionContent.priorityReason} Every service below is available throughout ${location.name} and the surrounding ${location.county} County area.`}
          links={getServiceLinksForCity(location.name, location.slug)}
        />

        <RelatedLinks
          heading={`Commercial Air Duct Cleaning in ${location.name}`}
          intro={`We work with businesses across ${location.name} as well as homeowners. These are the sectors we serve most often.`}
          links={getIndustryLinksForCity(location.slug, 3)}
        />

        <RelatedLinks
          heading={`Areas Near ${location.name} We Also Serve`}
          intro={`Explore other service areas around ${location.name}: ${nearbyNames.join(', ')}.`}
          links={[
            ...nearbyLocations,
            {
              label: `Greater Los Angeles guide from ${location.name}`,
              path: '/locations/los-angeles',
            },
            { label: 'All 54 Los Angeles service areas', path: '/locations' },
          ]}
          variant="grid"
          className="bg-gray-50"
        />

        <RelatedLinks
          heading={`Air Quality Reading for ${location.name} Homeowners`}
          intro={regionContent.seasonal}
          links={getBlogLinksForCity(location.slug, 3)}
        />

        <BusinessAreaDirectory citySlug={location.slug} />
      </main>

      <Footer />
    </div>
  );
};

export default LocationDetail;
