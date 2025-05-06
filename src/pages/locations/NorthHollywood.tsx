tsx
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const NorthHollywood = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in North Hollywood | Pure Air California</title>
        <meta
          name="description"
          content="Expert air duct and dryer vent cleaning services in North Hollywood. Residential and commercial solutions for cleaner air."
        />
      </Helmet>

      <NavBar />

      {/* Hero Section */}
      <div
        className="relative py-24 bg-gray-900 overflow-hidden"
      >
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://source.unsplash.com/random?north-hollywood"
            alt="North Hollywood skyline"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning in North Hollywood
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California provides expert air duct and ventilation cleaning services for homes and businesses in North Hollywood.
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-center">
            Our Services in North Hollywood
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-2">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">Improve your home's air quality with our professional residential air duct cleaning services.</p>
            </div>
            {/* Residential Dryer Vent Cleaning */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-2">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Enhance safety and efficiency with our residential dryer vent cleaning services.</p>
            </div>
            {/* Residential Electrostatic Filter */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-2">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">Upgrade your home's air filtration with our residential electrostatic filter solutions.</p>
            </div>
             {/* Commercial Air Duct Cleaning */}
             <div className="p-6 border rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-2">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">Maintain a healthy workplace with our comprehensive commercial air duct cleaning services.</p>
            </div>
            {/* Commercial Dryer Vent Cleaning */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-2">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Ensure safety and efficiency for your commercial property with our expert dryer vent cleaning.</p>
            </div>
            {/* Commercial Electrostatic Filter */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-2">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">Enhance your commercial property's air filtration with our electrostatic filter installation and maintenance.</p>
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
                Get a Free Quote for North Hollywood
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Fill out the form to get a free, no-obligation quote for air duct cleaning in North Hollywood.
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

export default NorthHollywood;