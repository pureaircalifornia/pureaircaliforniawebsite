tsx
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Larchmont = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Larchmont Air Duct Cleaning Services | Pure Air California</title>
        <meta name="description" content="Professional air duct cleaning services in Larchmont. Pure Air California offers residential and commercial air duct and dryer vent cleaning." />
      </Helmet>

      <NavBar />

      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://source.unsplash.com/random?larchmont"
            alt="Larchmont"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Larchmont Air Duct Cleaning Services
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California provides top-tier air duct cleaning and dryer vent services in Larchmont.
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
      </div>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Our Services in Larchmont
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a wide range of air duct and dryer vent cleaning services in Larchmont.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg shadow-md bg-white">
              <h3 className="font-heading font-semibold text-xl mb-2">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">
                Thorough cleaning of your home's air duct system for improved air quality.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md bg-white">
              <h3 className="font-heading font-semibold text-xl mb-2">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">
                Prevent fire hazards and improve dryer efficiency with our cleaning service.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md bg-white">
              <h3 className="font-heading font-semibold text-xl mb-2">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">
                Upgrade to an electrostatic filter for superior air filtration.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md bg-white">
              <h3 className="font-heading font-semibold text-xl mb-2">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">
                Maintain a healthy indoor environment for your employees and clients.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md bg-white">
              <h3 className="font-heading font-semibold text-xl mb-2">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">
                Ensure your commercial dryers operate safely and efficiently.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md bg-white">
              <h3 className="font-heading font-semibold text-xl mb-2">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">
                Install electrostatic filters for improved air quality in your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                Request a Free Quote
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Get in touch with us today for a free, no-obligation quote for our services in Larchmont.
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

export default Larchmont;