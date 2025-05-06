tsx
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Fairfax = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in Fairfax | Pure Air California</title>
        <meta name="description" content="Professional air duct cleaning services in Fairfax. Residential and commercial air duct and dryer vent cleaning. Electrostatic filter services available." />
        <meta name="keywords" content="air duct cleaning fairfax, dryer vent cleaning fairfax, electrostatic filter fairfax, residential air duct cleaning fairfax, commercial air duct cleaning fairfax" />
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1544413695-ecd4d1e09c77"
            alt="Fairfax"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning Services in Fairfax
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California offers expert air duct cleaning, dryer vent cleaning, and electrostatic filter services to residents and businesses in Fairfax.
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
            Our Services in Fairfax
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="service-card p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">Improve your home's air quality with our residential air duct cleaning services in Fairfax.</p>
            </div>
            {/* Residential Dryer Vent Cleaning */}
            <div className="service-card p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Ensure safety and efficiency with our residential dryer vent cleaning services in Fairfax.</p>
            </div>
            {/* Residential Electrostatic Filter */}
            <div className="service-card p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">Upgrade your home with our residential electrostatic filter installation services in Fairfax.</p>
            </div>
            {/* Commercial Air Duct Cleaning */}
            <div className="service-card p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">Maintain a healthy environment in your commercial space with our air duct cleaning services in Fairfax.</p>
            </div>
            {/* Commercial Dryer Vent Cleaning */}
            <div className="service-card p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Protect your business with our commercial dryer vent cleaning services in Fairfax.</p>
            </div>
            {/* Commercial Electrostatic Filter */}
            <div className="service-card p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">Improve air quality in your commercial building with our electrostatic filter services in Fairfax.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-8">
              Get a Free Quote in Fairfax
            </h2>
            <QuoteForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fairfax;