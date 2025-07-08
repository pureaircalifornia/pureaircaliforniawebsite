
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';
import QuoteForm from '@/components/QuoteForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CulverCity = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in Culver City | Pure Air California</title>
        <meta
          name="description"
          content="Professional air duct cleaning services in Culver City. We offer residential and commercial air duct cleaning, dryer vent cleaning, and electrostatic filter services."
        />
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://source.unsplash.com/random?culver-city"
            alt="Culver City"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning in Culver City
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California offers expert air duct cleaning and ventilation services in Culver City.
              Improve your indoor air quality today!
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
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-center">
            Our Services in Culver City
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-4">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">
                Improve your home's air quality with our residential air duct cleaning services.
              </p>
            </div>

            {/* Residential Dryer Vent Cleaning */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-4">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">
                Prevent fire hazards and improve dryer efficiency with our dryer vent cleaning.
              </p>
            </div>

            {/* Residential Electrostatic Filter */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-4">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">
                Upgrade your home's filtration system with our electrostatic filter installation.
              </p>
            </div>

            {/* Commercial Air Duct Cleaning */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-4">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">
                Maintain a healthy work environment with our commercial air duct cleaning.
              </p>
            </div>

            {/* Commercial Dryer Vent Cleaning */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-4">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">
                Ensure safety and efficiency in your commercial laundry facilities.
              </p>
            </div>

            {/* Commercial Electrostatic Filter */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-4">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">
                Enhance air quality in your commercial space with our electrostatic filter services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 text-center">
              Request a Free Quote
            </h2>
            <p className="text-lg text-gray-600 mb-8 text-center">
              Get a customized estimate for your air duct or ventilation cleaning needs in Culver City.
            </p>
            <QuoteForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CulverCity;
