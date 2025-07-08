tsx
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const MidWilshire = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning Services in Mid Wilshire | Pure Air California</title>
        <meta name="description" content="Expert air duct cleaning, dryer vent cleaning, and electrostatic filter services for homes and businesses in Mid Wilshire. Contact us for a free quote!" />
      </Helmet>

      <NavBar />

      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://source.unsplash.com/random/1920x1080/?mid-wilshire"
            alt="Mid Wilshire"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning Services in Mid Wilshire
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California offers professional air duct cleaning, dryer vent cleaning, and electrostatic filter services for homes and businesses in Mid Wilshire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[#0A3D7C] hover:bg-[#072c5a]">
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
            Our Services in Mid Wilshire
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">Comprehensive air duct cleaning for homes in Mid Wilshire, improving indoor air quality and HVAC efficiency.</p>
            </div>
            {/* Residential Dryer Vent Cleaning */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Thorough dryer vent cleaning to prevent fire hazards and improve dryer performance in Mid Wilshire homes.</p>
            </div>
            {/* Residential Electrostatic Filter */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">Installation and maintenance of electrostatic filters for enhanced air purification in Mid Wilshire residences.</p>
            </div>
            {/* Commercial Air Duct Cleaning */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">Professional air duct cleaning services for businesses and commercial properties in Mid Wilshire.</p>
            </div>
            {/* Commercial Dryer Vent Cleaning */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Reliable dryer vent cleaning services for commercial buildings and facilities in Mid Wilshire.</p>
            </div>
            {/* Commercial Electrostatic Filter */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">Installation and upkeep of commercial-grade electrostatic filters in Mid Wilshire.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
            Request a Free Quote for Your Mid Wilshire Property
          </h2>
          <QuoteForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MidWilshire;