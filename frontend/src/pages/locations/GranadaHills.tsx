tsx
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const GranadaHills = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in Granada Hills | Pure Air California</title>
        <meta name="description" content="Professional air duct cleaning services in Granada Hills. Residential and commercial solutions available." />
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
            alt="Granada Hills"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning in Granada Hills
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California offers top-notch air duct cleaning services in Granada Hills, ensuring your home or business has clean, healthy air.
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
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
            Our Services in Granada Hills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-2">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">Keep your home's air clean and healthy with our residential air duct cleaning service.</p>
            </div>
            {/* Residential Dryer Vent Cleaning */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-2">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Improve your dryer's efficiency and safety with our residential dryer vent cleaning service.</p>
            </div>
            {/* Residential Electrostatic Filter */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-2">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">Upgrade to an electrostatic filter for better air quality in your home.</p>
            </div>
            {/* Commercial Air Duct Cleaning */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-2">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">Ensure a healthy environment for your employees and customers with our commercial air duct cleaning.</p>
            </div>
            {/* Commercial Dryer Vent Cleaning */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-2">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Maintain safety and efficiency in your business with our commercial dryer vent cleaning.</p>
            </div>
            {/* Commercial Electrostatic Filter */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-2">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">Enhance the air quality in your commercial space with our electrostatic filter solutions.</p>
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
                Request a Free Quote in Granada Hills
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Get a customized estimate for your air duct cleaning needs in Granada Hills. Fill out the form below, and our team will get back to you shortly.
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

export default GranadaHills;