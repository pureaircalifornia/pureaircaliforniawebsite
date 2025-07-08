tsx
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ShermanOaks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Sherman Oaks Air Duct Cleaning | Pure Air California</title>
        <meta
          name="description"
          content="Professional air duct and dryer vent cleaning services in Sherman Oaks. Enhance your home or business's air quality with Pure Air California."
        />
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1583618088269-e82e4987b6e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Sherman Oaks"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning Services in Sherman Oaks
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California provides expert air duct and ventilation cleaning services for homes and businesses in Sherman Oaks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-[#0A3D7C] hover:bg-[#072c5a]">
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
            Our Services in Sherman Oaks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">
                Improve your home's air quality with our thorough residential air duct cleaning service.
              </p>
            </div>
            {/* Residential Dryer Vent Cleaning */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">
                Ensure the safety and efficiency of your dryer with our residential dryer vent cleaning service.
              </p>
            </div>
            {/* Residential Electrostatic Filter */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">
                Upgrade your home's air filtration with our residential electrostatic filter installation and maintenance.
              </p>
            </div>
            {/* Commercial Air Duct Cleaning */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">
                Maintain a healthy work environment with our commercial air duct cleaning service.
              </p>
            </div>
            {/* Commercial Dryer Vent Cleaning */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">
                Keep your commercial laundry operations safe and efficient with our dryer vent cleaning service.
              </p>
            </div>
            {/* Commercial Electrostatic Filter */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">
                Improve the air quality in your business with our commercial electrostatic filter solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-6">
              Get a Free Quote for Your Sherman Oaks Property
            </h2>
            <p className="text-lg text-gray-600 text-center mb-8">
              Fill out the form below to receive a free, no-obligation quote for our air duct and ventilation cleaning services in Sherman Oaks.
            </p>
            <QuoteForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ShermanOaks;