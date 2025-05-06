import React from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Check, Star, Shield, Award } from 'lucide-react';
import QuoteForm from '@/components/QuoteForm';
import TrustBadges from '@/components/TrustBadges';
import CTASection from '@/components/CTASection';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

// This is a template file for creating new location pages
// Replace 'LocationName' with the actual location name throughout the file
// Update the meta information, image URLs, and content to be specific to the location

const LocationPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in LocationName | Pure Air California</title>
        <meta name="description" content="Professional air duct cleaning, dryer vent cleaning, and electrostatic filter services in LocationName. Improve your indoor air quality today!" />
        <meta name="keywords" content="air duct cleaning LocationName, dryer vent cleaning LocationName, electrostatic filter LocationName, HVAC cleaning LocationName" />
      </Helmet>
      
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="https://source.unsplash.com/random/1920x1080/?los-angeles" 
            alt="LocationName" 
            className="w-full h-full object-cover"
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
              <span>LocationName</span>
            </div>
          </div>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Air Duct Cleaning Services in LocationName
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Pure Air California offers professional air duct cleaning, dryer vent cleaning, and electrostatic filter services for homes and businesses in LocationName. Improve your indoor air quality today!
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our Services in LocationName
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Residential Services */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Residential Air Duct Cleaning</h3>
                <p className="text-gray-600">Comprehensive air duct cleaning for homes in LocationName to improve air quality and HVAC efficiency.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Residential Dryer Vent Cleaning</h3>
                <p className="text-gray-600">Thorough dryer vent cleaning to prevent fire hazards and improve dryer performance in LocationName homes.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Residential Electrostatic Filter</h3>
                <p className="text-gray-600">Installation and maintenance of electrostatic filters for enhanced air purification in LocationName residences.</p>
              </div>
              
              {/* Commercial Services */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Commercial Air Duct Cleaning</h3>
                <p className="text-gray-600">Professional air duct cleaning services for businesses and commercial properties in LocationName.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Commercial Dryer Vent Cleaning</h3>
                <p className="text-gray-600">Reliable dryer vent cleaning services for commercial buildings and facilities in LocationName.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Commercial Electrostatic Filter</h3>
                <p className="text-gray-600">Installation and upkeep of commercial-grade electrostatic filters in LocationName.</p>
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
              Benefits of Professional Air Duct Cleaning
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <div className="bg-brand-100 p-2 rounded-full mr-4">
                  <Check className="text-brand-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Improved Indoor Air Quality</h3>
                  <p className="text-gray-600">Remove dust, allergens, and contaminants from your air ducts for cleaner, healthier air throughout your property.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-100 p-2 rounded-full mr-4">
                  <Check className="text-brand-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Enhanced Energy Efficiency</h3>
                  <p className="text-gray-600">Clean air ducts allow your HVAC system to operate more efficiently, potentially reducing energy costs.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-100 p-2 rounded-full mr-4">
                  <Check className="text-brand-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Extended HVAC System Life</h3>
                  <p className="text-gray-600">Regular cleaning helps prevent wear and tear on your heating and cooling systems, extending their operational life.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-100 p-2 rounded-full mr-4">
                  <Check className="text-brand-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Reduced Allergens and Irritants</h3>
                  <p className="text-gray-600">Minimize dust, pollen, pet dander, and other allergens that can accumulate in your air duct system.</p>
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
              Request a Free Quote for Your LocationName Property
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Fill out the form below to receive a free, no-obligation quote for our services in LocationName.
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

export default LocationPage;