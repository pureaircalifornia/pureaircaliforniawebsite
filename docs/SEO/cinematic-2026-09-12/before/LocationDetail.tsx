import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router-dom';
import { locationData } from './locations/data';
import { getRegionContent } from './locations/regionContent';

import ResponsiveImage from '@/components/ResponsiveImage';
import HomeQuoteForm from '@/components/HomeQuoteForm';
import TestimonialCard from '@/components/TestimonialCard';
import SEOProvider from '@/components/SEOProvider';
import SchemaMarkup from '@/components/SchemaMarkup';
import { seoConfig } from '@/utils/seo/seoConfig';
import { canonicalUrl } from '@/utils/seo/canonicalUrl';
import RelatedLinks from '@/components/RelatedLinks';
import { getNearbyLocations, getServiceLinksForCity, getBlogLinksForCity, getIndustryLinksForCity } from '@/utils/internalLinks';
import { googleReviews } from '@/data/googleReviews';
import { business } from '@/config/business';
import { Phone, ArrowRight, CheckCircle } from 'lucide-react';



const LocationDetail = () => {
  const { locationSlug } = useParams<{ locationSlug: string }>();
  const location = locationData.find(loc => loc.slug === locationSlug);

  if (!location) {
    return <div>Location not found</div>;
  }

  // Keep this short and let SEOProvider decide whether the brand still fits inside
  // the ~60 char SERP cutoff. Hardcoding "| NADCA Certified | Pure Air California"
  // pushed every one of the 54 location titles to 67-74 chars, so the city name —
  // the entire point of the page — was competing for space with boilerplate.
  // NADCA certification still appears in the description and on the page itself.
  const pageTitle = `Air Duct Cleaning ${location.name} CA`;
  // Kept under the ~160 char SERP cutoff so the closing call to action survives —
  // the previous template ran 167-190 chars on every city and was always truncated
  // mid-sentence. Two ZIPs rather than three keeps the longest city names in budget.
  //
  // "#1 rated" was removed deliberately: no ranking body awards it, so it is an
  // unsubstantiated superlative. The claims here are all verifiable.
  const pageDescription = `NADCA-certified air duct & dryer vent cleaning in ${location.name}, CA. Serving ${location.zipCodes.slice(0, 2).join(', ')} and nearby. Free estimate — call (213) 792-4145.`;
  const pageUrl = `${seoConfig.siteUrl}/locations/${location.slug}`;

  // Location-specific FAQs
  const regionContent = getRegionContent(location.region);
  // Real neighbouring cities from the same dataset, reused as prose above and as
  // links below, so the two agree rather than naming different places.
  const nearbyNames = getNearbyLocations(location.slug, 4).map((l) => l.label);

  // Which of the real Google reviews to show here.
  //
  // Showing the same four on all 54 city pages put 205 words of identical text on
  // every one of them — 21% of the page, and the single largest block of shared
  // content on the site. Google's bar for indexing a page is that it is worth its
  // own slot; 54 pages that are 71% the same text do not clear it.
  //
  // Two reviews, rotated by the city's own index, so neighbouring cities show
  // different ones and the six reviews spread across the corpus instead of four of
  // them appearing 54 times. This selects which real reviews to display — it does
  // NOT attach a review to a city, which would be a fabrication (googleReviews.ts,
  // rule 2). The heading above still says plainly what these are.
  const reviewIndex = locationData.findIndex((l) => l.slug === location.slug);
  const reviewsForThisCity = [
    googleReviews[reviewIndex % googleReviews.length],
    googleReviews[(reviewIndex + 3) % googleReviews.length],
  ].filter(Boolean);

  const locationFaqs = [
    {
      question: `How much does air duct cleaning cost in ${location.name}?`,
      answer: `Air duct cleaning prices in ${location.name} typically range from $199-$499 for residential homes, depending on the size of your HVAC system and home. We offer free in-home estimates with no obligation. Call (213) 792-4145 for an accurate quote.`
    },
    {
      question: `How long does air duct cleaning take in ${location.name}?`,
      answer: `For most homes in ${location.name}, our NADCA-certified technicians complete a thorough air duct cleaning in 2-4 hours. Larger homes or commercial properties may take longer. We'll provide a time estimate when you schedule.`
    },
    // Region-keyed questions so the FAQ block — and the FAQPage schema built from
    // it — differs between a coastal page and a valley page instead of repeating
    // verbatim across all 54. Two per region rather than one: this block is the
    // largest stretch of prose on the page after the intro, so leaving it identical
    // wastes the best opportunity on the page to look like its own document.
    ...regionContent.faqs.map((f, i) => ({
      question: f.q,
      answer: i === 0
        ? `${f.a} Our technicians work across ${location.name} and know what to look for in ${location.county} County properties.`
        : f.a,
    })),
    {
      question: `Why should I choose Pure Air California for air duct cleaning in ${location.name}?`,
      answer: `We're NADCA certified, fully insured, and offer same-day service in ${location.name} — backed by 40+ years and 448K+ customers served across the LA area. ${regionContent.seasonal}`
    }
  ];

  return (
    
      <div className="min-h-screen flex flex-col">
        {/* Single SEOProvider: a second childless one previously overrode the
            city-specific title/description with site defaults (all 53 location
            pages were emitting the generic homepage title). LocalBusiness is
            provided by the city-customized SchemaMarkup below, so we don't set
            isLocalBusiness here (avoids a duplicate, conflicting business node). */}
        <SEOProvider
          title={pageTitle}
          description={pageDescription}
          path={`/locations/${location.slug}`}
        >
          {/* LocalBusiness Schema */}
          <SchemaMarkup schema={{
            ...seoConfig.schema.localBusiness,
            name: `Pure Air California - ${location.name}`,
            description: pageDescription,
            address: {
              ...seoConfig.schema.localBusiness.address,
              addressLocality: location.name,
            },
            areaServed: {
              "@type": "City",
              "name": location.name,
              "sameAs": `https://en.wikipedia.org/wiki/${location.name.replace(/ /g, '_')},_California`
            },
            hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.name + ', CA')}`
          }} />
          {/* BreadcrumbList Schema */}
          <SchemaMarkup schema={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": canonicalUrl("/")
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Locations",
                "item": canonicalUrl("/locations")
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": location.name,
                "item": canonicalUrl(pageUrl)
              }
            ]
          }} />
          {/* FAQ Schema */}
          <SchemaMarkup schema={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": locationFaqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }} />
        </SEOProvider>

        <NavBar />

        {/* Hero Section with Location Image */}
        <section className="relative pt-32 pb-16 text-white overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <ResponsiveImage
              src={location.image}
              alt={`${location.name} skyline and cityscape`}
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 via-brand-800/80 to-brand-700/70"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">Air Duct Cleaning in {location.name}</h1>
              <p className="text-xl mb-8 text-gray-100">
                Your trusted local experts for professional air duct cleaning services in {location.name}, {location.county}.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-gray-100">
                  <Link to="/quote">Get a Free Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-700">
                  <a href="tel:+12137924145">Call (213) 792-4145</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Location-specific content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Local Air Duct Cleaning Experts in {location.name}</h2>
                {/* location.description and location.localContext are per-city copy that
                    already existed (or was written) in locations/data.ts but was never
                    rendered. Without it these 54 pages were 90%+ word-for-word identical
                    to one another — the whole differentiator sat unused in the data file. */}
                <p className="text-lg text-gray-600 mb-6">{location.description}</p>
                {location.localContext && (
                  <p className="text-lg text-gray-600 mb-6">{location.localContext}</p>
                )}
                {/* Researched, area-specific profile. This is the longest genuinely
                    per-city block on the page and the main reason these 54 pages read
                    as 54 documents rather than one template with the name swapped. */}
                {location.localProfile && (
                  <p className="text-lg text-gray-600 mb-6">{location.localProfile}</p>
                )}
                {/* Region conditions sit AFTER the city profile: they are shared by
                    the 7-9 cities in the region, so they are supporting context, not
                    the lead. */}
                <p className="text-lg text-gray-600 mb-6">
                  {regionContent.conditions}
                </p>
                {/* Field notes: the crew's actual observations for this city.
                    This is the one thing on the page that cannot be derived from
                    geography or generated from a template — it comes from having
                    done the work here. Cities without it fall back to the region
                    copy above, which is why `npm run locations:report` lists which
                    entries are still empty. */}
                {location.fieldNotes && (
                  <p className="text-lg text-gray-600 mb-6">{location.fieldNotes}</p>
                )}

                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Zip codes we cover in {location.name}</h3>
                  {/* Written out as a sentence as well as chips. The ZIP list and the
                      neighbouring-city list are real, already in data.ts, and different
                      for every city — so rendering them as prose adds genuinely unique
                      wording to a page whose main weakness is shared boilerplate. */}
                  <p className="text-lg text-gray-600 mb-4">
                    We cover {location.zipCodes.length === 1 ? 'zip code' : 'all'}{' '}
                    {location.zipCodes.length > 1 ? `${location.zipCodes.length} ` : ''}
                    {location.name} zip code{location.zipCodes.length === 1 ? '' : 's'} —{' '}
                    {location.zipCodes.slice(0, -1).join(', ')}
                    {location.zipCodes.length > 1 ? ' and ' : ''}
                    {location.zipCodes[location.zipCodes.length - 1]}
                    {nearbyNames.length > 0 && (
                      <> — along with neighbouring {nearbyNames.slice(0, -1).join(', ')}
                        {nearbyNames.length > 1 ? ' and ' : ''}{nearbyNames[nearbyNames.length - 1]}</>
                    )}. {regionContent.priorityReason}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {location.zipCodes.map(zip => (
                      <span key={zip} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{zip}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="rounded-xl overflow-hidden shadow-xl h-64 md:h-96 relative border border-gray-100">
                  <iframe
                    title={`Map of ${location.name}, CA`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}&q=${encodeURIComponent(location.name + ', CA')}`}
                  ></iframe>
                  {/* Fallback image if API key is missing */}
                  {!import.meta.env.VITE_GOOGLE_MAPS_API_KEY && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100">
                      <ResponsiveImage
                        src={location.image}
                        alt={`Pure Air California service area in ${location.name}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location-Specific Challenges */}
        {location.challenges && location.challenges.length > 0 && (
          <section className="py-16 bg-brand-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">Air Quality Challenges in {location.name}</h2>
                  <p className="text-lg text-gray-600">
                    Every neighborhood has unique factors affecting indoor air quality. Here's what {location.name} residents often face:
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {location.challenges.map((challenge, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-brand-100 flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{challenge}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <p className="text-gray-600 mb-4">
                    Our NADCA-certified technicians are experienced in addressing these specific challenges for {location.name} homes and businesses.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        <HomeQuoteForm />

        {/* Reviews.
            These are the company's real Google reviews. They are deliberately NOT
            presented as being from this city: Google reviews carry no location, so
            the previous "What Your Neighbors in {city} Say" heading over invented
            named testimonials was a fabrication on all 54 location pages. The
            heading now says exactly what these are. */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-lg text-gray-600">
                Verified reviews from our{' '}
                <a
                  href={business.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 underline underline-offset-2 hover:text-brand-900"
                >
                  Google Business Profile
                </a>{' '}
                — {business.aggregateRating.ratingValue} stars from{' '}
                {business.aggregateRating.reviewCount} reviews across Los Angeles County.
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

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions About Air Duct Cleaning in {location.name}</h2>
                <p className="text-lg text-gray-600">
                  Get answers to common questions from {location.name} homeowners.
                </p>
              </div>
              <div className="space-y-6">
                {locationFaqs.map((faq, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h3 className="text-lg font-bold mb-3 text-gray-900">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Services in {location.name}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We offer a complete range of air quality services for {location.name} homes and businesses.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { title: "Residential Air Duct Cleaning", href: "/services/residential-air-duct-cleaning", desc: "Complete home duct cleaning" },
                { title: "Commercial Air Duct Cleaning", href: "/services/commercial-air-duct-cleaning", desc: "For offices and businesses" },
                { title: "Dryer Vent Cleaning", href: "/services/residential-dryer-vent-cleaning", desc: "Fire prevention service" },
              ].map((service, i) => (
                <Link key={i} to={service.href} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all group">
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-brand-600 flex-shrink-0 mt-0.5" />
                    <h3 className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{service.desc}</p>
                  <span className="text-brand-600 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-brand-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Cleaner Air in {location.name}?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-brand-100">
              Join the 448,000+ customers we have served across Los Angeles since 1993. Schedule your free estimate today!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-brand-700 hover:bg-gray-100 font-bold text-lg px-8 py-6 h-auto shadow-lg hover:scale-105 transition-transform" asChild>
                <a href="tel:2137924145" className="flex items-center gap-2">
                  <Phone className="fill-current" size={24} />
                  Call (213) 792-4145
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto" asChild>
                <Link to="/quote" className="flex items-center gap-2">
                  Get a Free Quote
                  <ArrowRight size={20} />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Contextual internal links. Location pages previously had no outbound
            links at all beyond nav and footer, which left 54 of the site's pages
            as dead ends with no topical relationship to the services they sell. */}
        <RelatedLinks
          heading={`Air Duct & Dryer Vent Services in ${location.name}`}
          intro={`${regionContent.priorityReason} Every service below is available throughout ${location.name} and the surrounding ${location.county} County area.`}
          links={getServiceLinksForCity(location.name, location.slug)}
        />

        {/* Commercial visitors need a route from a neighbourhood page to the page
            for their sector. Before this, the seven industry pages had 3-4
            contextual inbound links each and nothing outside /industries/ linked
            them at all. Rotated by city so this is not the same pair on all 54. */}
        <RelatedLinks
          heading={`Commercial Air Duct Cleaning in ${location.name}`}
          intro={`We work with businesses across ${location.name} as well as homeowners. These are the sectors we serve most often.`}
          links={getIndustryLinksForCity(location.slug, 3)}
        />

        <RelatedLinks
          heading={`Areas Near ${location.name} We Also Serve`}
          intro={`We cover the whole of ${location.county} County. Closest to ${location.name}: ${nearbyNames.join(', ')}.`}
          links={[
            ...getNearbyLocations(location.slug, 6),
            // The county hub is the site's primary money page. Linking it from all
            // 54 city pages gives it real internal authority; it previously had 8
            // inbound links all reading "Los Angeles". The anchor carries the city
            // name so the 54 links read as 54 distinct phrases rather than one
            // phrase repeated — repetition across a whole template is the thing
            // that looks manufactured.
            {
              label: `From ${location.name} to all of ${location.county} County`,
              path: '/locations/los-angeles',
            },
            { label: 'All Los Angeles areas', path: '/locations' },
          ]}
          variant="grid"
          className="bg-gray-50"
        />

        {/* The blog had a median of 2 contextual inbound links per post against
            56-76 for the service pages. These links close that gap from the 55 city
            pages, rotating by city index so each city links a different slice of the
            catalogue rather than all 55 repeating the same two articles. */}
        <RelatedLinks
          heading={`Air Quality Reading for ${location.name} Homeowners`}
          intro={`${regionContent.seasonal}`}
          links={getBlogLinksForCity(location.slug, 3)}
        />

        <Footer />
      </div>
    
  );
};

export default LocationDetail;