tsx
import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BeverlyGlen = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in Beverly Glen | Pure Air California</title>
        <meta name="description" content="Expert air duct and dryer vent cleaning services for homes and businesses in Beverly Glen. Improve your indoor air quality with Pure Air California." />
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1563431453304-92a686736508"
            alt="Beverly Glen"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Beverly Glen Air Duct Cleaning
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California offers top-notch air duct and dryer vent cleaning services for homes and businesses in Beverly Glen. Breathe easier with our expert cleaning solutions.
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Our Services in Beverly Glen
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a full range of air duct and vent cleaning services tailored to the needs of Beverly Glen residents and businesses.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="service-card p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-heading font-semibold text-xl mb-2">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">Improve your home's air quality with our thorough residential air duct cleaning services.</p>
            </div>
            {/* Residential Dryer Vent Cleaning */}
            <div className="service-card p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-heading font-semibold text-xl mb-2">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Prevent fires and improve dryer efficiency with our expert residential dryer vent cleaning.</p>
            </div>
            {/* Residential Electrostatic Filter */}
            <div className="service-card p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-heading font-semibold text-xl mb-2">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">Upgrade to an electrostatic filter for enhanced air purification in your Beverly Glen home.</p>
            </div>
            {/* Commercial Air Duct Cleaning */}
            <div className="service-card p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-heading font-semibold text-xl mb-2">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">Ensure a healthy workplace with our commercial air duct cleaning solutions.</p>
            </div>
            {/* Commercial Dryer Vent Cleaning */}
            <div className="service-card p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-heading font-semibold text-xl mb-2">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Maintain safety and efficiency in your commercial laundry facilities with our cleaning services.</p>
            </div>
            {/* Commercial Electrostatic Filter */}
            <div className="service-card p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="font-heading font-semibold text-xl mb-2">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">Improve air quality in your commercial space with our electrostatic filter options.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                Request a Free Quote for Beverly Glen
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Get a personalized estimate for your air duct or vent cleaning needs in Beverly Glen. Fill out our quick form, and we'll get back to you promptly.
              </p>
            </div>
            <QuoteForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BeverlyGlen;