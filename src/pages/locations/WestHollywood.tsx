tsx

import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';
import QuoteForm from '@/components/QuoteForm';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const WestHollywood = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in West Hollywood | Pure Air California</title>
        <meta
          name="description"
          content="Expert air duct cleaning services in West Hollywood. Improve your indoor air quality with our residential and commercial cleaning services."
        />
      </Helmet>

      <NavBar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://source.unsplash.com/random/1920x1080/?west-hollywood"
            alt="West Hollywood"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning in West Hollywood
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Breathe easier with Pure Air California's professional air duct cleaning services in West Hollywood. We offer residential and commercial cleaning solutions tailored to your needs.
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
            Our Services in West Hollywood
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-xl mb-4">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">Improve your home's air quality with our thorough residential air duct cleaning services.</p>
            </div>
            {/* Residential Dryer Vent Cleaning */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-xl mb-4">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Keep your home safe and efficient with our residential dryer vent cleaning services.</p>
            </div>
            {/* Residential Electrostatic Filter */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-xl mb-4">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">Enhance your home's air filtration with our residential electrostatic filter services.</p>
            </div>
            {/* Commercial Air Duct Cleaning */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-xl mb-4">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">Maintain a healthy and productive workplace with our commercial air duct cleaning services.</p>
            </div>
            {/* Commercial Dryer Vent Cleaning */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-xl mb-4">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Ensure safety and efficiency for your commercial property with our dryer vent cleaning services.</p>
            </div>
            {/* Commercial Electrostatic Filter */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-xl mb-4">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">Improve air quality and reduce costs with our commercial electrostatic filter services.</p>
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
                Request a Free Quote for West Hollywood
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Get a free, no-obligation quote for your air duct cleaning needs in West Hollywood. Fill out the form, and we'll be in touch promptly.
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

export default WestHollywood;