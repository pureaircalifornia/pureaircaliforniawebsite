import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PanoramaCity = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in Panorama City | Pure Air California</title>
        <meta name="description" content="Professional air duct and dryer vent cleaning services in Panorama City. Contact Pure Air California for expert residential and commercial solutions." />
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1520863669274-f10e748c9f1c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Panorama City"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning Services in Panorama City
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California offers professional air duct and dryer vent cleaning services in Panorama City, ensuring cleaner air and a healthier living environment.
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
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
            Our Services in Panorama City
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">Expert cleaning for your home's air ducts, improving air quality and system efficiency.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Thorough cleaning of dryer vents to prevent fire hazards and improve dryer performance.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">Installation and maintenance of high-efficiency electrostatic filters for cleaner home air.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">Comprehensive air duct cleaning services for businesses and commercial properties in Panorama City.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Specialized dryer vent cleaning for commercial buildings, ensuring safety and efficiency.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">Installation and service of commercial-grade electrostatic filters for improved air quality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
            Get a Free Quote for Your Panorama City Property
          </h2>
          <div className="max-w-2xl mx-auto">
            <QuoteForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PanoramaCity;
