tsx
import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HiddenHills = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning Services in Hidden Hills | Pure Air California</title>
        <meta
          name="description"
          content="Expert air duct cleaning services for residential and commercial properties in Hidden Hills. Improve your indoor air quality with Pure Air California."
        />
      </Helmet>

      <NavBar />

      {/* Hero Section */}
      <section
        className="relative py-24 bg-gray-900 overflow-hidden"
        style={{
          backgroundImage: `url('https://source.unsplash.com/random?hidden-hills')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning Services in Hidden Hills
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California offers premium air duct cleaning, dryer vent cleaning, and electrostatic filter services to residents and businesses in Hidden Hills.
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">Our Services in Hidden Hills</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide a wide range of air duct and ventilation services to meet the unique needs of Hidden Hills homes and businesses.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-heading font-semibold text-xl mb-2">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">
                Comprehensive cleaning for your home's air ducts, improving air quality and system efficiency.
              </p>
            </div>

            {/* Residential Dryer Vent Cleaning */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-heading font-semibold text-xl mb-2">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">
                Reduce fire risk and improve dryer efficiency with our expert vent cleaning services.
              </p>
            </div>

            {/* Residential Electrostatic Filter */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-heading font-semibold text-xl mb-2">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">
                Upgrade to an electrostatic filter for enhanced air purification in your home.
              </p>
            </div>

            {/* Commercial Air Duct Cleaning */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-heading font-semibold text-xl mb-2">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">
                Maintain a healthy and productive work environment with our commercial air duct cleaning.
              </p>
            </div>

            {/* Commercial Dryer Vent Cleaning */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-heading font-semibold text-xl mb-2">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">
                Ensure your commercial laundry facilities are safe and efficient with regular vent cleaning.
              </p>
            </div>

            {/* Commercial Electrostatic Filter */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-heading font-semibold text-xl mb-2">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">
                Improve air quality in your commercial space with our advanced electrostatic filter solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">Get a Free Quote</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Improve your indoor air quality today. Fill out the form below to get a free, no-obligation quote for your Hidden Hills property.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HiddenHills;