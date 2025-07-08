
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';
import QuoteForm from '@/components/QuoteForm';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Calabasas = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning Services in Calabasas | Pure Air California</title>
        <meta name="description" content="Professional air duct cleaning, dryer vent cleaning, and electrostatic filter services for homes and businesses in Calabasas." />
        <meta name="keywords" content="air duct cleaning Calabasas, dryer vent cleaning Calabasas, electrostatic filter Calabasas, HVAC cleaning Calabasas" />
      </Helmet>

      <NavBar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://source.unsplash.com/random/1920x1080?calabasas"
            alt="Calabasas"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning Services in Calabasas
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California offers premium air duct, dryer vent, and electrostatic filter cleaning services to homes and businesses in Calabasas.
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
            Our Services in Calabasas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Residential Air Duct Cleaning</h3>
              <p>Thorough air duct cleaning for homes in Calabasas to improve air quality and HVAC efficiency.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Residential Dryer Vent Cleaning</h3>
              <p>Expert dryer vent cleaning to reduce fire hazards and improve dryer performance for Calabasas residents.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Residential Electrostatic Filter</h3>
              <p>Installation and maintenance of electrostatic filters for cleaner air in Calabasas homes.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Commercial Air Duct Cleaning</h3>
              <p>Comprehensive air duct cleaning for businesses in Calabasas, ensuring a healthy environment for employees and customers.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Commercial Dryer Vent Cleaning</h3>
              <p>Reliable dryer vent cleaning for commercial properties in Calabasas, improving safety and efficiency.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Commercial Electrostatic Filter</h3>
              <p>High-quality electrostatic filter systems for commercial buildings in Calabasas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
            Request a Free Quote
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

export default Calabasas;
