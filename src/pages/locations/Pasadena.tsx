tsx
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import QuoteForm from '@/components/QuoteForm';
import { Helmet } from 'react-helmet';

const Pasadena = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in Pasadena | Pure Air California</title>
        <meta name="description" content="Professional air duct cleaning services in Pasadena, CA. Residential and commercial services available. Get a free quote today!" />
        <meta name="keywords" content="air duct cleaning Pasadena, dryer vent cleaning Pasadena, HVAC cleaning Pasadena, commercial air duct cleaning Pasadena" />
      </Helmet>

      <NavBar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1576836922178-12d03b8f7935?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Pasadena Skyline"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning in Pasadena
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California offers top-notch air duct and ventilation cleaning services for homes and businesses in Pasadena.
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
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-center">
            Our Services in Pasadena
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg shadow-md bg-gray-50">
              <h3 className="font-semibold text-xl mb-4">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">Improve your home's air quality with our thorough residential air duct cleaning services.</p>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-gray-50">
              <h3 className="font-semibold text-xl mb-4">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Ensure safety and efficiency with our expert residential dryer vent cleaning services.</p>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-gray-50">
              <h3 className="font-semibold text-xl mb-4">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">Upgrade your home's filtration system with our advanced residential electrostatic filters.</p>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-gray-50">
              <h3 className="font-semibold text-xl mb-4">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">Maintain a healthy environment in your business with our professional commercial air duct cleaning.</p>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-gray-50">
              <h3 className="font-semibold text-xl mb-4">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Ensure safety and compliance with our commercial dryer vent cleaning services.</p>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-gray-50">
              <h3 className="font-semibold text-xl mb-4">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">Enhance air quality in your commercial space with our commercial electrostatic filter solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                Get a Free Quote for Your Pasadena Property
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Fill out the form below to get a free, no-obligation quote for air duct cleaning services in Pasadena.
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

export default Pasadena;