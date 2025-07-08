tsx
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LakeBalboa = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning Services in Lake Balboa | Pure Air California</title>
        <meta name="description" content="Professional air duct cleaning, dryer vent cleaning, and electrostatic filter services in Lake Balboa. Call us for a free quote!" />
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1563431453304-92a686736508"
            alt="Lake Balboa"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning in Lake Balboa
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California provides expert air duct cleaning, dryer vent cleaning, and electrostatic filter services in Lake Balboa.
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
            Our Services in Lake Balboa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-xl mb-4">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">
                Enhance your home's air quality with our residential air duct cleaning services.
              </p>
            </div>
            {/* Residential Dryer Vent Cleaning */}
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-xl mb-4">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">
                Improve your dryer's efficiency and safety with our residential dryer vent cleaning.
              </p>
            </div>
             {/* Residential Electrostatic Filter */}
             <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-xl mb-4">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">
              Upgrade your home's air filtration with our residential electrostatic filter services.
              </p>
            </div>
             {/* Commercial Air Duct Cleaning */}
             <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-xl mb-4">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">
              Improve indoor air quality in your business with our commercial air duct cleaning services.
              </p>
            </div>
             {/* Commercial Dryer Vent Cleaning */}
             <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-xl mb-4">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">
              Ensure the safety and efficiency of your commercial dryer with our dryer vent cleaning services.
              </p>
            </div>
             {/* Commercial Electrostatic Filter */}
             <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-xl mb-4">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">
                Boost your business's air quality with our electrostatic filter cleaning and maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
            Get a Free Quote for Lake Balboa Services
          </h2>
          <QuoteForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LakeBalboa;