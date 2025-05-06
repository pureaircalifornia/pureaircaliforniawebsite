tsx
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Winnetka = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Winnetka Air Duct Cleaning Services | Pure Air California</title>
        <meta
          name="description"
          content="Expert air duct cleaning, dryer vent cleaning, and electrostatic filter services in Winnetka, CA. Serving homes and businesses."
        />
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://source.unsplash.com/random?winnetka"
            alt="Winnetka"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning in Winnetka
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California provides professional air duct cleaning, dryer vent cleaning, and electrostatic filter services in Winnetka. Breathe cleaner air with our expert solutions.
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
            Our Services in Winnetka
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Residential Air Duct Cleaning */}
          <div className="border p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">
              Improve the air quality in your Winnetka home with our thorough air duct cleaning services.
              </p>
            </div>

            {/* Residential Dryer Vent Cleaning */}
            <div className="border p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">
              Ensure the safety and efficiency of your dryer with our professional dryer vent cleaning service for Winnetka residents.
              </p>
            </div>

            {/* Residential Electrostatic Filter */}
            <div className="border p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">
              Upgrade your home's air filtration system with our residential electrostatic filter installation and maintenance services.
              </p>
            </div>

            {/* Commercial Air Duct Cleaning */}
            <div className="border p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">
              Ensure a healthy and productive environment in your Winnetka commercial space with our air duct cleaning services.
              </p>
            </div>
            {/* Commercial Dryer Vent Cleaning */}
            <div className="border p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">
              Keep your commercial laundry facilities safe and efficient with our professional dryer vent cleaning service.
              </p>
            </div>
            {/* Commercial Electrostatic Filter */}
            <div className="border p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">
              Enhance the air quality in your commercial building with our electrostatic filter services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
            Get a Free Quote for Air Duct Cleaning in Winnetka
          </h2>
          <QuoteForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Winnetka;