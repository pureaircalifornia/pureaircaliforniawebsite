
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CentralLA = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in Central LA | Pure Air California</title>
        <meta
          name="description"
          content="Expert air duct cleaning services in Central LA. We offer residential and commercial air duct cleaning, dryer vent cleaning, and electrostatic filter services."
        />
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://source.unsplash.com/random/1920x1080/?los-angeles"
            alt="Central LA"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning Services in Central LA
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California provides top-quality air duct cleaning, dryer vent cleaning, and electrostatic filter services for homes and businesses in Central LA.
            </p>
            <Button asChild size="lg" className="bg-[#0A3D7C] hover:bg-[#072c5a]">
              <Link to="/quote">Get a Free Quote</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
            Our Services in Central LA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="service-card p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">Improve your home's air quality with our thorough residential air duct cleaning.</p>
            </div>

            {/* Residential Dryer Vent Cleaning */}
            <div className="service-card p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Ensure your dryer operates safely and efficiently with our residential dryer vent cleaning services.</p>
            </div>

            {/* Residential Electrostatic Filter */}
            <div className="service-card p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">Upgrade your home's air filtration with our residential electrostatic filter installation and maintenance.</p>
            </div>

            {/* Commercial Air Duct Cleaning */}
            <div className="service-card p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">Maintain a healthy workplace with our commercial air duct cleaning services.</p>
            </div>

            {/* Commercial Dryer Vent Cleaning */}
            <div className="service-card p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Keep your commercial laundry facilities safe and efficient with our dryer vent cleaning services.</p>
            </div>

            {/* Commercial Electrostatic Filter */}
            <div className="service-card p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">Improve air quality in your commercial space with our electrostatic filter solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-8">
              Request a Free Quote
            </h2>
            <QuoteForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CentralLA;
