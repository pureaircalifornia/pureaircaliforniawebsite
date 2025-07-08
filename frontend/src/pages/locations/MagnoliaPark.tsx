tsx
import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const MagnoliaPark = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Magnolia Park Air Duct Cleaning | Pure Air California</title>
        <meta name="description" content="Professional air duct cleaning services in Magnolia Park. Residential and commercial cleaning, dryer vent cleaning, and electrostatic filter services." />
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://source.unsplash.com/random?magnolia-park"
            alt="Magnolia Park"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Magnolia Park Air Duct Cleaning
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Providing top-quality air duct cleaning services to the Magnolia Park area. We help ensure your home or business has clean, healthy air.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[#0A3D7C] hover:bg-[#072c5a]">
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">Our Services in Magnolia Park</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="service-card p-6 border rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-3">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">Thorough cleaning of your home's air ducts to remove dust, allergens, and debris.</p>
            </div>
            {/* Residential Dryer Vent Cleaning */}
            <div className="service-card p-6 border rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-3">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Cleaning of dryer vents to improve efficiency and reduce fire hazards.</p>
            </div>
            {/* Residential Electrostatic Filter */}
            <div className="service-card p-6 border rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-3">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">Installation and maintenance of electrostatic air filters for enhanced air purification.</p>
            </div>
            {/* Commercial Air Duct Cleaning */}
            <div className="service-card p-6 border rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-3">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">Comprehensive air duct cleaning for businesses and commercial properties.</p>
            </div>
            {/* Commercial Dryer Vent Cleaning */}
            <div className="service-card p-6 border rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-3">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Dryer vent cleaning services for commercial buildings, laundromats, and multi-unit residences.</p>
            </div>
            {/* Commercial Electrostatic Filter */}
            <div className="service-card p-6 border rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-3">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">Installation and servicing of commercial-grade electrostatic filters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
              Get a Free Quote for Your Magnolia Park Property
            </h2>
            <QuoteForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MagnoliaPark;