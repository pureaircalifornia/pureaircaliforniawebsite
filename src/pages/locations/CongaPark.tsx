tsx
import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CongaPark = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Conga Park Air Duct Cleaning | Pure Air California</title>
        <meta
          name="description"
          content="Professional air duct and dryer vent cleaning services in Conga Park. Enhance your home's air quality with our expert solutions."
        />
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <section
        className="relative py-24 bg-gray-900 overflow-hidden"
        style={{
          backgroundImage: `url(https://source.unsplash.com/random?conga-park)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning Services in Conga Park
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California offers top-notch air duct and dryer vent cleaning services in Conga Park.
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
          <h2 className="text-3xl md:text-4xl font-bold text-center font-heading mb-12">
            Our Services in Conga Park
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="service-card bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2">Residential Air Duct Cleaning</h3>
              <p className="text-gray-700">
                Improve the air quality in your Conga Park home with our professional residential air duct cleaning services.
              </p>
            </div>
            {/* Residential Dryer Vent Cleaning */}
            <div className="service-card bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-700">
                Ensure the safety and efficiency of your dryer with our thorough dryer vent cleaning services.
              </p>
            </div>
            {/* Residential Electrostatic Filter */}
            <div className="service-card bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2">Residential Electrostatic Filter</h3>
              <p className="text-gray-700">
                Upgrade your home's filtration system with our high-quality residential electrostatic filters.
              </p>
            </div>
             {/* Commercial Air Duct Cleaning */}
             <div className="service-card bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-700">
              Keep your business healthy with our expert commercial air duct cleaning services in Conga Park.
              </p>
            </div>
             {/* Commercial Dryer Vent Cleaning */}
             <div className="service-card bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-700">
              Our commercial dryer vent cleaning services help businesses in Conga Park stay safe and efficient.
              </p>
            </div>
             {/* Commercial Electrostatic Filter */}
             <div className="service-card bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2">Commercial Electrostatic Filter</h3>
              <p className="text-gray-700">
              Enhance your commercial property’s air quality with our durable commercial electrostatic filters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center font-heading mb-12">
            Get a Free Quote for Your Conga Park Property
          </h2>
          <QuoteForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CongaPark;