import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router-dom';
import { locationData } from './locations/data';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ResponsiveImage from '@/components/ResponsiveImage';
import HomeQuoteForm from '@/components/HomeQuoteForm';
import TestimonialCard from '@/components/TestimonialCard';
import SEOProvider from '@/components/SEOProvider';
import SchemaMarkup from '@/components/SchemaMarkup';
import { seoConfig } from '@/utils/seo/seoConfig';
import { Phone, ArrowRight, CheckCircle } from 'lucide-react';

const LocationDetail = () => {
  const { locationSlug } = useParams<{ locationSlug: string }>();
  const location = locationData.find(loc => loc.slug === locationSlug);

  if (!location) {
    return <div>Location not found</div>;
  }

  const pageTitle = `Air Duct Cleaning ${location.name} CA | NADCA Certified | Pure Air California`;
  const pageDescription = `#1 rated air duct cleaning in ${location.name}, California. NADCA certified, 1,200+ 5-star reviews. Serving ${location.zipCodes.slice(0, 3).join(', ')} and more. Free estimates - call (213) 792-4145!`;
  const pageUrl = `${seoConfig.siteUrl}/locations/${location.slug}`;

  // Location-specific FAQs
  const locationFaqs = [
    {
      question: `How much does air duct cleaning cost in ${location.name}?`,
      answer: `Air duct cleaning prices in ${location.name} typically range from $199-$499 for residential homes, depending on the size of your HVAC system and home. We offer free in-home estimates with no obligation. Call (213) 792-4145 for an accurate quote.`
    },
    {
      question: `How long does air duct cleaning take in ${location.name}?`,
      answer: `For most homes in ${location.name}, our NADCA-certified technicians complete a thorough air duct cleaning in 2-4 hours. Larger homes or commercial properties may take longer. We'll provide a time estimate when you schedule.`
    },
    {
      question: `Why should I choose Pure Air California for air duct cleaning in ${location.name}?`,
      answer: `We're the #1 rated air duct cleaning company in ${location.name} with 1,200+ 5-star reviews. We're NADCA certified, fully insured, and offer same-day service. Our technicians live in the LA area and understand the unique air quality challenges in ${location.name}.`
    }
  ];

  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <meta name="keywords" content={`air duct cleaning ${location.name}, ${location.name} air duct cleaning, hvac cleaning ${location.name}, air quality ${location.name}, dryer vent cleaning ${location.name}, best air duct cleaning ${location.name}, ${location.name} CA duct cleaning`} />
          <meta name="robots" content="index, follow, max-image-preview:large" />
          <meta name="geo.region" content="US-CA" />
          <meta name="geo.placename" content={location.name} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:url" content={pageUrl} />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Pure Air California" />
          <link rel="canonical" href={pageUrl} />
        </Helmet>
        <SEOProvider>
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
                "item": seoConfig.siteUrl
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Locations",
                "item": `${seoConfig.siteUrl}/locations`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": location.name,
                "item": pageUrl
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(100,180,255,0.2), 0 0 60px rgba(100,180,255,0.1)' }}>Air Duct Cleaning in {location.name}</h1>
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
                <p className="text-lg text-gray-600 mb-6">
                  Pure Air California is proud to serve the {location.name} community. We are a local, family-owned business dedicated to providing the highest quality air duct cleaning services to our neighbors.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  We understand the unique air quality challenges in {location.name} and have the expertise to address them. Whether you're dealing with dust, allergens, or just want to improve your home's air quality, we're here to help.
                </p>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">We serve the following zip codes in {location.name}:</h3>
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
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
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

        {/* Testimonials Section */}
        {location.testimonials && location.testimonials.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">What Your Neighbors in {location.name} Say</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {location.testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={index}
                    name={testimonial.name}
                    location={location.name}
                    quote={testimonial.quote}
                    rating={testimonial.rating}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

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
              Join 1,200+ satisfied customers in the Los Angeles area. Schedule your free estimate today!
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

        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default LocationDetail;