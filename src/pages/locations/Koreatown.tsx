tsx
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Koreatown = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in Koreatown | Pure Air California</title>
        <meta name="description" content="Professional air duct cleaning services in Koreatown, Los Angeles. Residential and commercial solutions available." />
      </Helmet>

      <NavBar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://source.unsplash.com/random/1920x1080/?koreatown"
            alt="Koreatown"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning Services in Koreatown
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California offers top-quality air duct and ventilation cleaning services for homes and businesses in Koreatown.
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
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Our Services in Koreatown
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive air duct cleaning services tailored to meet the needs of both residential and commercial properties in Koreatown.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="service-card p-6 border rounded-lg shadow-md flex flex-col">
              <h3 className="text-xl font-semibold mb-2">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600 flex-grow">Thorough cleaning for cleaner, healthier air in your Koreatown home.</p>
              <Button asChild variant="link" className="mt-auto">
                <Link to="/services/residential-air-duct-cleaning">Learn More</Link>
              </Button>
            </div>
            {/* Residential Dryer Vent Cleaning */}
            <div className="service-card p-6 border rounded-lg shadow-md flex flex-col">
              <h3 className="text-xl font-semibold mb-2">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600 flex-grow">Improve efficiency and safety with our dryer vent cleaning service.</p>
              <Button asChild variant="link" className="mt-auto">
                <Link to="/services/residential-dryer-vent-cleaning">Learn More</Link>
              </Button>
            </div>
            {/* Residential Electrostatic Filter */}
            <div className="service-card p-6 border rounded-lg shadow-md flex flex-col">
              <h3 className="text-xl font-semibold mb-2">Residential Electrostatic Filter</h3>
              <p className="text-gray-600 flex-grow">Upgrade your home's air filtration with our electrostatic filters.</p>
              <Button asChild variant="link" className="mt-auto">
                <Link to="/services/residential-electrostatic-filter">Learn More</Link>
              </Button>
            </div>
             {/* Commercial Air Duct Cleaning */}
             <div className="service-card p-6 border rounded-lg shadow-md flex flex-col">
              <h3 className="text-xl font-semibold mb-2">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600 flex-grow">Maintain a healthy environment in your Koreatown business with our commercial air duct cleaning services.</p>
              <Button asChild variant="link" className="mt-auto">
                <Link to="/services/commercial-air-duct-cleaning">Learn More</Link>
              </Button>
            </div>
            {/* Commercial Dryer Vent Cleaning */}
            <div className="service-card p-6 border rounded-lg shadow-md flex flex-col">
              <h3 className="text-xl font-semibold mb-2">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600 flex-grow">Ensure the safety and efficiency of your commercial dryers with regular vent cleaning.</p>
              <Button asChild variant="link" className="mt-auto">
                <Link to="/services/commercial-dryer-vent-cleaning">Learn More</Link>
              </Button>
            </div>
            {/* Commercial Electrostatic Filter */}
            <div className="service-card p-6 border rounded-lg shadow-md flex flex-col">
              <h3 className="text-xl font-semibold mb-2">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600 flex-grow">Improve air quality in your commercial space with our advanced electrostatic filters.</p>
              <Button asChild variant="link" className="mt-auto">
                <Link to="/services/commercial-electrostatic-filter">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Get a Free Quote for Your Koreatown Property
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Request a free quote and discover how we can improve the air quality in your home or business.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Koreatown;