tsx
import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const VanNuys = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Van Nuys Air Duct Cleaning Services | Pure Air California</title>
        <meta
          name="description"
          content="Expert air duct cleaning, dryer vent cleaning, and electrostatic filter services in Van Nuys. Serving both residential and commercial properties."
        />
      </Helmet>

      <NavBar />

      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://source.unsplash.com/random/1920x1080/?van-nuys"
            alt="Van Nuys"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Van Nuys Air Duct and Vent Cleaning Services
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California offers top-quality air duct and vent cleaning services in Van Nuys.
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Our Services in Van Nuys
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a full range of air duct and vent cleaning services in Van Nuys to meet all your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-2">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">
                Improve your home's air quality with our professional residential air duct cleaning services.
              </p>
            </div>
            {/* Residential Dryer Vent Cleaning */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-2">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">
                Ensure the safety and efficiency of your home with our residential dryer vent cleaning services.
              </p>
            </div>
            {/* Residential Electrostatic Filter */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-2">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">
                Upgrade your home's air filtration with our residential electrostatic filter installation.
              </p>
            </div>
            {/* Commercial Air Duct Cleaning */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-2">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">
                Maintain a healthy environment in your commercial space with our air duct cleaning services.
              </p>
            </div>
            {/* Commercial Dryer Vent Cleaning */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-2">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">
                Ensure safety and efficiency in your commercial property with our dryer vent cleaning.
              </p>
            </div>
            {/* Commercial Electrostatic Filter */}
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-2">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">
                Improve the air quality in your business with our commercial electrostatic filter services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Get a Free Quote for Van Nuys
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Contact us for a free, no-obligation quote for our air duct and vent cleaning services in Van Nuys.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VanNuys;