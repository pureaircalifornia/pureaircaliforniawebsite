tsx
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Westwood = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in Westwood | Pure Air California</title>
        <meta name="description" content="Professional air duct cleaning services in Westwood, CA. Serving residential and commercial clients." />
        <meta name="keywords" content="air duct cleaning Westwood, HVAC cleaning Westwood, dryer vent cleaning Westwood, commercial duct cleaning Westwood" />
      </Helmet>

      <NavBar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1544413695-ecd4d1e09c77" 
            alt="Westwood"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning Services in Westwood
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California offers top-notch air duct and ventilation cleaning services in Westwood. Ensure your home or business has clean, healthy air.
            </p>
            <Button asChild size="lg" className="bg-[#0A3D7C] hover:bg-[#072c5a]">
              <Link to="/quote">Get a Free Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">Our Westwood Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-xl mb-4">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">Keep your home's air clean and healthy with our residential air duct cleaning service.</p>
            </div>

            {/* Residential Dryer Vent Cleaning */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-xl mb-4">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Improve dryer efficiency and safety with our residential dryer vent cleaning service.</p>
            </div>
              {/* Residential Electrostatic Filter */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-xl mb-4">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">Upgrade your home's air filtration system with our residential electrostatic filter installation.</p>
            </div>

            {/* Commercial Air Duct Cleaning */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-xl mb-4">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">Ensure your business has clean air for employees and customers with our commercial air duct cleaning service.</p>
            </div>

            {/* Commercial Dryer Vent Cleaning */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-xl mb-4">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Maintain safety and efficiency in your commercial laundry with our commercial dryer vent cleaning.</p>
            </div>
               {/* Commercial Electrostatic Filter */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-xl mb-4">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">Improve your commercial building's air quality with our commercial electrostatic filter installations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
            Get a Free Quote for Your Westwood Property
          </h2>
          <QuoteForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Westwood;