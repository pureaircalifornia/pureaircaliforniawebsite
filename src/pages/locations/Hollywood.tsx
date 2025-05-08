import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Check, Phone } from 'lucide-react';
import QuoteForm from '@/components/QuoteForm';
import TrustBadges from '@/components/TrustBadges';
import CTASection from '@/components/CTASection';
import { Helmet } from 'react-helmet-async';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

const Hollywood = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct & Dryer Vent Cleaning in Hollywood | Pure Air California</title>
        <meta name="description" content="Professional air duct and dryer vent cleaning services for entertainment venues, studios, and residential properties in Hollywood. Improve indoor air quality today with our expert technicians!" />
        <meta name="keywords" content="air duct cleaning Hollywood, dryer vent cleaning Hollywood, commercial air duct cleaning, residential air duct cleaning, HVAC maintenance Hollywood, entertainment studio air quality, historic building ventilation" />
        <meta name="author" content="Pure Air California" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Air Duct & Dryer Vent Cleaning in Hollywood | Pure Air California" />
        <meta property="og:description" content="Professional air duct and dryer vent cleaning services for entertainment venues, studios, and residential properties in Hollywood." />
        <meta property="og:image" content="/gallery/jeremy-bishop-zCFt2Rzcv_c-unsplash (Large).jpg" />
        <meta property="og:url" content="https://pureair-california.com/locations/hollywood" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Air Duct & Dryer Vent Cleaning in Hollywood | Pure Air California" />
        <meta name="twitter:description" content="Professional air duct and dryer vent cleaning services for entertainment venues, studios, and residential properties in Hollywood." />
        <meta name="twitter:image" content="/gallery/jeremy-bishop-zCFt2Rzcv_c-unsplash (Large).jpg" />
        <link rel="canonical" href="https://pureair-california.com/locations/hollywood" />
        {/* Structured Data for Local Business */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Pure Air California - Hollywood",
            "image": "/gallery/jeremy-bishop-zCFt2Rzcv_c-unsplash (Large).jpg",
            "@id": "https://pureair-california.com/locations/hollywood",
            "url": "https://pureair-california.com/locations/hollywood",
            "telephone": "(323) 555-1234",
            "description": "Professional air duct and dryer vent cleaning services for entertainment venues, studios, and residential properties in Hollywood.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Hollywood Service Area",
              "addressLocality": "Hollywood",
              "addressRegion": "CA",
              "postalCode": "90028",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 34.0928,
              "longitude": -118.3287
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
              ],
              "opens": "08:00",
              "closes": "18:00"
            },
            "sameAs": [
              "https://www.facebook.com/pureairca",
              "https://www.instagram.com/pureairca"
            ],
            "priceRange": "$$",
            "areaServed": ["Hollywood", "Hollywood Hills", "Sunset Boulevard", "Studio District", "Hollywood & Vine", "East Hollywood"],
            "serviceType": ["Air Duct Cleaning", "Dryer Vent Cleaning", "Historic Building Ventilation", "Commercial HVAC Maintenance"],
            "review": {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "author": {
                "@type": "Person",
                "name": "Hollywood Customer"
              },
              "reviewBody": "Excellent service for our historic building. The technicians were knowledgeable and careful with our vintage ductwork."
            }
          })}
        </script>
      </Helmet>
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="/gallery/jeremy-bishop-zCFt2Rzcv_c-unsplash (Large).jpg" 
            alt="Hollywood skyline with iconic palm trees and entertainment district panorama - Pure Air California service area" 
            className="w-full h-full object-cover"
            loading="eager"
            width="1920"
            height="1080"
            fetchpriority="high"
            aria-hidden="false"
            decoding="async"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center text-white mb-4">
            <MapPin size={20} className="mr-2 text-brand-400" />
            <div className="text-sm">
              <Link to="/" className="hover:text-brand-400 transition">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/locations" className="hover:text-brand-400 transition">Locations</Link>
              <span className="mx-2">/</span>
              <span>Hollywood</span>
            </div>
          </div>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct & Dryer Vent Cleaning in Hollywood
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California provides specialized air duct and ventilation cleaning services for 
              historic buildings, studios, and residential properties throughout Hollywood.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700">
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20 hover:text-white">
                <Link to="/services">Explore Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-heading font-bold mb-6">
                Expert Air Duct Cleaning Services in Hollywood
              </h2>
              
              <p className="text-lg text-gray-600 mb-6">
                Hollywood's unique blend of historic buildings, entertainment studios, and modern residential 
                developments demands specialized air quality solutions. Our experienced technicians understand 
                the unique ventilation challenges of this iconic neighborhood and provide tailored services to 
                meet your specific needs.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-heading font-semibold mb-4">Why Hollywood Properties Need Regular Air Duct Cleaning</h3>
                <p className="text-gray-600 mb-4">
                  Hollywood properties face unique air quality challenges:
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <span>Historic buildings with original ductwork require careful, specialized attention</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <span>Entertainment studios need clean air for optimal equipment performance and set conditions</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <span>Mixed-use buildings face complex ventilation challenges that require expert solutions</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <span>Urban location with high traffic introduces additional air quality concerns</span>
                  </li>
                </ul>
              </div>
              
              <h3 className="text-xl font-heading font-semibold mb-4">Our Hollywood Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                  <h4 className="font-heading font-semibold mb-3 text-brand-800">Residential Air Duct Cleaning</h4>
                  <p className="text-gray-600 mb-4">
                    Comprehensive cleaning for apartments, condos, and single-family homes throughout 
                    the Hollywood area. Improves indoor air quality and reduces allergens.
                  </p>
                  <Button asChild variant="link" className="p-0 text-brand-600 font-medium hover:text-brand-800 transition-colors">
                    <Link to="/services" aria-label="Learn more about residential air duct cleaning services">Learn More</Link>
                  </Button>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                  <h4 className="font-heading font-semibold mb-3 text-brand-800">Commercial Duct Cleaning</h4>
                  <p className="text-gray-600 mb-4">
                    Specialized services for studios, theaters, retail spaces, and office buildings 
                    with minimal disruption to operations. Perfect for entertainment industry facilities.
                  </p>
                  <Button asChild variant="link" className="p-0 text-brand-600 font-medium hover:text-brand-800 transition-colors">
                    <Link to="/services" aria-label="Learn more about commercial duct cleaning services">Learn More</Link>
                  </Button>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                  <h4 className="font-heading font-semibold mb-3 text-brand-800">Dryer Vent Cleaning</h4>
                  <p className="text-gray-600 mb-4">
                    Essential fire prevention services for residential and commercial properties 
                    through professional dryer vent cleaning. Improves efficiency and reduces hazards.
                  </p>
                  <Button asChild variant="link" className="p-0 text-brand-600 font-medium hover:text-brand-800 transition-colors">
                    <Link to="/services" aria-label="Learn more about dryer vent cleaning services">Learn More</Link>
                  </Button>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                  <h4 className="font-heading font-semibold mb-3 text-brand-800">Historic Building Specialists</h4>
                  <p className="text-gray-600 mb-4">
                    Careful cleaning and maintenance for vintage and historic Hollywood buildings
                    with specialized air duct systems. Preserves architectural integrity while improving air quality.
                  </p>
                  <Button asChild variant="link" className="p-0 text-brand-600 font-medium hover:text-brand-800 transition-colors">
                    <Link to="/services" aria-label="Learn more about historic building air duct services">Learn More</Link>
                  </Button>
                </div>
              </div>
              
              <h3 className="text-xl font-heading font-semibold mb-4 text-brand-800">Hollywood Areas We Serve</h3>
              <p className="text-gray-600 mb-4">
                Our Hollywood service area covers the entire neighborhood, including:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md border border-gray-100 hover:bg-brand-50 transition-colors">
                  <MapPin size={16} className="text-brand-600 flex-shrink-0" aria-hidden="true" />
                  <span className="font-medium">Hollywood Boulevard</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md border border-gray-100 hover:bg-brand-50 transition-colors">
                  <MapPin size={16} className="text-brand-600 flex-shrink-0" aria-hidden="true" />
                  <span className="font-medium">Hollywood Hills</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md border border-gray-100 hover:bg-brand-50 transition-colors">
                  <MapPin size={16} className="text-brand-600 flex-shrink-0" aria-hidden="true" />
                  <span className="font-medium">Sunset Boulevard</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md border border-gray-100 hover:bg-brand-50 transition-colors">
                  <MapPin size={16} className="text-brand-600 flex-shrink-0" aria-hidden="true" />
                  <span className="font-medium">Studio District</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md border border-gray-100 hover:bg-brand-50 transition-colors">
                  <MapPin size={16} className="text-brand-600 flex-shrink-0" aria-hidden="true" />
                  <span className="font-medium">Hollywood & Vine</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md border border-gray-100 hover:bg-brand-50 transition-colors">
                  <MapPin size={16} className="text-brand-600 flex-shrink-0" aria-hidden="true" />
                  <span className="font-medium">East Hollywood</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-xl font-heading font-semibold mb-3">Why Choose Pure Air California in Hollywood</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <span>Specialized experience with historic and entertainment industry buildings</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <span>Flexible scheduling to accommodate filming schedules and business hours</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <span>Advanced equipment designed for all building types and ventilation systems</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <span>Fully insured, licensed, and background-checked technicians</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <span>Proven track record with Hollywood's most prestigious properties</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <QuoteForm />
                
                <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h3 className="text-xl font-heading font-semibold mb-4">Contact Us</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-brand-600 mt-1" />
                      <div>
                        <p className="font-medium">Hollywood Service Area</p>
                        <p className="text-gray-600">Serving all Hollywood neighborhoods and business districts</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-brand-600" />
                      <div>
                        <p className="font-medium">(323) 555-1234</p>
                        <p className="text-gray-600">Mon-Sat: 8AM - 6PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>
      
      <TrustBadges />
      
      <CTASection />
      
      <Footer />
    </div>
  );
};

export default Hollywood;
