tsx
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const PorterRanch = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning Services in Porter Ranch | Pure Air California</title>
        <meta
          name="description"
          content="Expert air duct and vent cleaning services for residential and commercial properties in Porter Ranch. Improve your indoor air quality today!"
        />
      </Helmet>
      <NavBar />
      {/* Hero Section */}
      <section
        className="relative py-24 bg-gray-900 overflow-hidden"
        style={{
          backgroundImage: `url(https://source.unsplash.com/random/1920x1080/?porter-ranch)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Porter Ranch Air Duct Cleaning Services
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Breathe easier with our professional air duct and vent cleaning services in Porter Ranch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[#0A3D7C] hover:bg-[#072c5a]">
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Our Services in Porter Ranch
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a full range of air duct and vent cleaning services to meet the needs of homes
              and businesses in Porter Ranch.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Residential Air Duct Cleaning</h3>
              <p className="text-gray-700 flex-grow">
                Improve your home's air quality with our thorough air duct cleaning service.
              </p>
              <Button asChild size="sm" variant="link" className="mt-4 self-start text-[#0A3D7C]">
                <Link to="/services/residential-air-duct-cleaning">Learn More</Link>
              </Button>
            </div>
            {/* Residential Dryer Vent Cleaning */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-700 flex-grow">
                Prevent fire hazards and improve dryer efficiency with our vent cleaning.
              </p>
              <Button asChild size="sm" variant="link" className="mt-4 self-start text-[#0A3D7C]">
                <Link to="/services/residential-dryer-vent-cleaning">Learn More</Link>
              </Button>
            </div>
            {/* Residential Electrostatic Filter */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Residential Electrostatic Filter</h3>
              <p className="text-gray-700 flex-grow">
                Upgrade your home's filtration system with our electrostatic filters.
              </p>
              <Button asChild size="sm" variant="link" className="mt-4 self-start text-[#0A3D7C]">
                <Link to="/services/residential-electrostatic-filter">Learn More</Link>
              </Button>
            </div>
            {/* Commercial Air Duct Cleaning */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-700 flex-grow">
                Maintain a healthy work environment with our commercial air duct cleaning.
              </p>
              <Button asChild size="sm" variant="link" className="mt-4 self-start text-[#0A3D7C]">
                <Link to="/services/commercial-air-duct-cleaning">Learn More</Link>
              </Button>
            </div>
            {/* Commercial Dryer Vent Cleaning */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-700 flex-grow">
                Ensure your commercial dryers are safe and efficient.
              </p>
              <Button asChild size="sm" variant="link" className="mt-4 self-start text-[#0A3D7C]">
                <Link to="/services/commercial-dryer-vent-cleaning">Learn More</Link>
              </Button>
            </div>
            {/* Commercial Electrostatic Filter */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Commercial Electrostatic Filter</h3>
              <p className="text-gray-700 flex-grow">
                Improve air filtration in your commercial space with electrostatic filters.
              </p>
              <Button asChild size="sm" variant="link" className="mt-4 self-start text-[#0A3D7C]">
                <Link to="/services/electrostatic-filter-program">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Get a Free Quote for Your Porter Ranch Property
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Fill out the form below to get a personalized quote for your air duct or vent cleaning
              needs.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PorterRanch;