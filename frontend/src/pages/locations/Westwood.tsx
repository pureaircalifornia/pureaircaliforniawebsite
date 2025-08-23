tsx
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Check } from 'lucide-react';
import TrustBadges from '@/components/TrustBadges';
import CTASection from '@/components/CTASection';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

const Westwood = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in Westwood | Pure Air California</title>
        <meta name="description" content="Professional air duct cleaning services in Westwood, CA. Serving residential and commercial clients." />
        <meta name="keywords" content="air duct cleaning Westwood, HVAC cleaning Westwood, dryer vent cleaning Westwood, commercial duct cleaning Westwood" />
      </Helmet>

      <NavBar />

      {/* Hero Section */}
      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="/gallery/Photos/IMG-20250505-WA0130.jpg" 
            alt="Westwood Neighborhood - Pure Air California service area" 
            className="w-full h-full object-cover"
            loading="lazy"
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
              <span>Westwood</span>
            </div>
          </div>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Air Duct Cleaning Services in Westwood
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Pure Air California offers professional air duct cleaning, dryer vent cleaning, and electrostatic filter services for homes, apartments, and businesses in Westwood. Serving the UCLA area with exceptional indoor air quality solutions.
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

      <TrustBadges />

      {/* Services Section */}
      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our Services in Westwood
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Residential Services */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Residential Air Duct Cleaning</h3>
                <p className="text-gray-600">Comprehensive air duct cleaning for Westwood homes and apartments, improving air quality and HVAC efficiency.</p>
                <Button asChild variant="outline" className="mt-4 text-[#0A3D7C] border-[#0A3D7C] hover:bg-[#0A3D7C] hover:text-white">
                  <Link to="/services/residential-air-duct-cleaning">
                    Learn More
                  </Link>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Residential Dryer Vent Cleaning</h3>
                <p className="text-gray-600">Specialized dryer vent cleaning for Westwood apartments and condos, preventing fire hazards in multi-unit buildings.</p>
                <Button asChild variant="outline" className="mt-4 text-[#0A3D7C] border-[#0A3D7C] hover:bg-[#0A3D7C] hover:text-white">
                  <Link to="/services/residential-dryer-vent-cleaning">
                    Learn More
                  </Link>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Residential Electrostatic Filter</h3>
                <p className="text-gray-600">Installation and maintenance of electrostatic filters for enhanced air purification in Westwood residences.</p>
                <Button asChild variant="outline" className="mt-4 text-[#0A3D7C] border-[#0A3D7C] hover:bg-[#0A3D7C] hover:text-white">
                  <Link to="/services/electrostatic-filter-program">
                    Learn More
                  </Link>
                </Button>
              </div>
              
              {/* Commercial Services */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Commercial Air Duct Cleaning</h3>
                <p className="text-gray-600">Professional air duct cleaning services for businesses, restaurants, and retail spaces throughout Westwood Village.</p>
                <Button asChild variant="outline" className="mt-4 text-[#0A3D7C] border-[#0A3D7C] hover:bg-[#0A3D7C] hover:text-white">
                  <Link to="/services/commercial-air-duct-cleaning">
                    Learn More
                  </Link>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Commercial Dryer Vent Cleaning</h3>
                <p className="text-gray-600">Maintain safety and efficiency in your commercial laundry with our commercial dryer vent cleaning services.</p>
                <Button asChild variant="outline" className="mt-4 text-[#0A3D7C] border-[#0A3D7C] hover:bg-[#0A3D7C] hover:text-white">
                  <Link to="/services/commercial-dryer-vent-cleaning">
                    Learn More
                  </Link>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Commercial Electrostatic Filter</h3>
                <p className="text-gray-600">Improve your commercial building's air quality with our commercial electrostatic filter installations.</p>
                <Button asChild variant="outline" className="mt-4 text-[#0A3D7C] border-[#0A3D7C] hover:bg-[#0A3D7C] hover:text-white">
                  <Link to="/services/electrostatic-filter-program">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Benefits of Professional Air Duct Cleaning in Westwood
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <div className="bg-brand-100 p-2 rounded-full mr-4">
                  <Check className="text-brand-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Improved Indoor Air Quality</h3>
                  <p className="text-gray-600">Remove dust, allergens, and contaminants from your air ducts for cleaner, healthier air throughout your Westwood property.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-100 p-2 rounded-full mr-4">
                  <Check className="text-brand-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Enhanced Energy Efficiency</h3>
                  <p className="text-gray-600">Clean air ducts allow your HVAC system to operate more efficiently, potentially reducing energy costs in your Westwood home or business.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-100 p-2 rounded-full mr-4">
                  <Check className="text-brand-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Extended HVAC System Life</h3>
                  <p className="text-gray-600">Regular cleaning helps prevent wear and tear on your heating and cooling systems, extending their operational life in Westwood's climate.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-100 p-2 rounded-full mr-4">
                  <Check className="text-brand-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Allergy Relief for Students</h3>
                  <p className="text-gray-600">Minimize dust, pollen, and allergens that can accumulate in your air duct system, especially important for Westwood's student population.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Quote Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
              Request a Free Quote for Your Westwood Property
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Fill out the form below to receive a free, no-obligation quote for our services in Westwood.
            </p>
            
            <div className="max-w-2xl mx-auto">
              <QuoteForm />
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      <CTASection />
      <Footer />
    </div>
  );
};

export default Westwood;