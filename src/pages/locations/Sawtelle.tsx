tsx
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Sawtelle = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Sawtelle Air Duct Cleaning Services | Pure Air California</title>
        <meta
          name="description"
          content="Professional air duct cleaning, dryer vent cleaning, and electrostatic filter services in Sawtelle, CA."
        />
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://source.unsplash.com/random/1920x1080/?sawtelle"
            alt="Sawtelle"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Sawtelle Air Duct Cleaning Services
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Expert air duct and vent cleaning services for homes and businesses in Sawtelle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[#0A3D7C] hover:bg-[#072c5a]">
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10"
              >
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
            Our Sawtelle Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">
                Improve your home's air quality with our thorough residential air duct cleaning services.
              </p>
            </div>
            {/* Residential Dryer Vent Cleaning */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">
                Keep your home safe and efficient with our residential dryer vent cleaning.
              </p>
            </div>
            {/* Residential Electrostatic Filter */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">
                Upgrade your home's air filtration system with our electrostatic filters.
              </p>
            </div>
            {/* Commercial Air Duct Cleaning */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">
                Ensure a healthy workplace with our professional commercial air duct cleaning.
              </p>
            </div>
            {/* Commercial Dryer Vent Cleaning */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">
                Maintain safety and efficiency with our commercial dryer vent cleaning services.
              </p>
            </div>
            {/* Commercial Electrostatic Filter */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">
                Improve your business's air quality with our commercial electrostatic filters.
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
                Request a Free Quote in Sawtelle
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Fill out our quick form to receive a free, no-obligation quote for your air duct
                cleaning needs in Sawtelle.
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

export default Sawtelle;