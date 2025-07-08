tsx
import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const LosFeliz = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning Services in Los Feliz | Pure Air California</title>
        <meta
          name="description"
          content="Expert air duct cleaning and dryer vent cleaning services in Los Feliz. Residential and commercial solutions available. Call for a free estimate!"
        />
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://source.unsplash.com/random/1920x1080/?los-feliz"
            alt="Los Feliz skyline"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning Services in Los Feliz
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California provides top-quality air duct and ventilation cleaning services to homes and businesses throughout Los Feliz.
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Our Services in Los Feliz
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a wide range of air duct and vent cleaning services to meet the needs of Los Feliz residents and businesses.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="font-heading font-semibold text-xl mb-3">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">Improve your home's air quality with our thorough residential air duct cleaning services.</p>
            </div>
            {/* Residential Dryer Vent Cleaning */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="font-heading font-semibold text-xl mb-3">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Prevent fire hazards and improve efficiency with our residential dryer vent cleaning services.</p>
            </div>
            {/* Residential Electrostatic Filter */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="font-heading font-semibold text-xl mb-3">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">Upgrade your home's air filtration with our residential electrostatic filter solutions.</p>
            </div>
            {/* Commercial Air Duct Cleaning */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="font-heading font-semibold text-xl mb-3">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">Maintain a healthy workplace with our professional commercial air duct cleaning services.</p>
            </div>
            {/* Commercial Dryer Vent Cleaning */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="font-heading font-semibold text-xl mb-3">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Ensure the safety and efficiency of your commercial property with our dryer vent cleaning.</p>
            </div>
            {/* Commercial Electrostatic Filter */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="font-heading font-semibold text-xl mb-3">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">Improve the air quality of your business with our commercial electrostatic filter options.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Get a Free Quote for Los Feliz
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Fill out the form below to get a free, no-obligation quote for air duct cleaning services in Los Feliz.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LosFeliz;