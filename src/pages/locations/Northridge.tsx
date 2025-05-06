tsx
import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Northridge = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in Northridge | Pure Air California</title>
        <meta name="description" content="Professional air duct cleaning services in Northridge, CA. Residential and commercial air duct cleaning, dryer vent cleaning, and electrostatic filter services." />
        <meta name="keywords" content="air duct cleaning Northridge, dryer vent cleaning Northridge, electrostatic filter Northridge, residential air duct cleaning Northridge, commercial air duct cleaning Northridge" />
      </Helmet>

      <NavBar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://source.unsplash.com/random/1920x1080/?northridge"
            alt="Northridge"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning in Northridge
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California offers top-quality air duct and vent cleaning services in Northridge. Breathe easier with our expert services.
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
            Our Services in Northridge
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="p-6 border border-gray-200 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">
                Improve your home's air quality with our professional residential air duct cleaning services in Northridge.
              </p>
            </div>
            {/* Residential Dryer Vent Cleaning */}
            <div className="p-6 border border-gray-200 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">
                Prevent fire hazards and improve dryer efficiency with our residential dryer vent cleaning services in Northridge.
              </p>
            </div>
            {/* Residential Electrostatic Filter */}
            <div className="p-6 border border-gray-200 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">
                Enhance your home's air filtration with our residential electrostatic filter services in Northridge.
              </p>
            </div>
            {/* Commercial Air Duct Cleaning */}
            <div className="p-6 border border-gray-200 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">
                Ensure a healthy and productive environment with our commercial air duct cleaning services in Northridge.
              </p>
            </div>
            {/* Commercial Dryer Vent Cleaning */}
            <div className="p-6 border border-gray-200 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">
                Maintain safety and efficiency for your commercial property with our dryer vent cleaning services in Northridge.
              </p>
            </div>
            {/* Commercial Electrostatic Filter */}
            <div className="p-6 border border-gray-200 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">
                Upgrade your commercial property's air filtration with our electrostatic filter services in Northridge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-8">
              Get a Free Quote for Northridge
            </h2>
            <QuoteForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Northridge;