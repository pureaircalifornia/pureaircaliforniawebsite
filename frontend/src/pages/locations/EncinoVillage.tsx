tsx
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const EncinoVillage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning Services in Encino Village | Pure Air California</title>
        <meta name="description" content="Professional air duct cleaning, dryer vent cleaning, and electrostatic filter services for homes and businesses in Encino Village." />
      </Helmet>

      <NavBar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://source.unsplash.com/random?encino-village"
            alt="Encino Village"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning Services in Encino Village
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California offers top-quality air duct and vent cleaning services for residential and commercial properties in Encino Village.
            </p>
            <Button asChild size="lg" className="bg-[#0A3D7C] hover:bg-[#072c5a]">
              <Link to="/quote">Get a Free Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-center">
            Our Services in Encino Village
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-heading font-semibold text-xl mb-3">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">Comprehensive air duct cleaning for homes in Encino Village to improve air quality and HVAC efficiency.</p>
            </div>
            {/* Residential Dryer Vent Cleaning */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-heading font-semibold text-xl mb-3">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Thorough dryer vent cleaning services to reduce fire risks and enhance dryer performance.</p>
            </div>
            {/* Residential Electrostatic Filter */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-heading font-semibold text-xl mb-3">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">Installation and maintenance of high-efficiency electrostatic filters for cleaner home air.</p>
            </div>
            {/* Commercial Air Duct Cleaning */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-heading font-semibold text-xl mb-3">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">Professional air duct cleaning for businesses and commercial properties in Encino Village.</p>
            </div>
            {/* Commercial Dryer Vent Cleaning */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-heading font-semibold text-xl mb-3">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Expert dryer vent cleaning services to ensure safety and efficiency for commercial buildings.</p>
            </div>
            {/* Commercial Electrostatic Filter */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-heading font-semibold text-xl mb-3">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">High-performance electrostatic filter solutions for improved air quality in commercial settings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-center">
            Get a Free Quote for Your Encino Village Property
          </h2>
          <QuoteForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EncinoVillage;