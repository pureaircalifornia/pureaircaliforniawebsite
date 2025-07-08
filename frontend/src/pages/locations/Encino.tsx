
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Encino = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in Encino | Pure Air California</title>
        <meta
          name="description"
          content="Professional air duct cleaning services in Encino, California. Residential and commercial air duct and dryer vent cleaning."
        />
        <meta
          name="keywords"
          content="air duct cleaning Encino, dryer vent cleaning Encino, HVAC cleaning Encino, commercial duct cleaning Encino, residential duct cleaning Encino"
        />
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1563431453304-92a686736508"
            alt="Encino"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning in Encino
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California provides expert air duct cleaning and maintenance services in Encino and the surrounding areas.
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
            Our Services in Encino
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">
                Enhance your home's air quality with our residential air duct cleaning services.
              </p>
            </div>
            {/* Residential Dryer Vent Cleaning */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">
                Improve the efficiency and safety of your dryer with our residential dryer vent cleaning.
              </p>
            </div>
            {/* Residential Electrostatic Filter */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">
              Upgrade your home's air filtration with our residential electrostatic filter solutions.
              </p>
            </div>
            {/* Commercial Air Duct Cleaning */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">
                Keep your business's air clean with our commercial air duct cleaning services.
              </p>
            </div>
            {/* Commercial Dryer Vent Cleaning */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">
                Ensure the safety and efficiency of your commercial dryer vents with our cleaning services.
              </p>
            </div>
            {/* Commercial Electrostatic Filter */}
             <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">
              Improve the air quality of your business with our commercial electrostatic filter solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                Request a Quote for Encino
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Fill out our quick quote form and our team will confirm availability and provide you with a customized estimate for your property in Encino.
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

export default Encino;
