tsx
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';
import QuoteForm from '@/components/QuoteForm';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Tarzana = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in Tarzana | Pure Air California</title>
        <meta
          name="description"
          content="Expert air duct and vent cleaning services in Tarzana. Residential and commercial solutions for cleaner, healthier air."
        />
        <meta name="keywords" content="air duct cleaning Tarzana, vent cleaning Tarzana, residential air duct cleaning Tarzana, commercial air duct cleaning Tarzana" />
      </Helmet>

      <NavBar />

      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://source.unsplash.com/random?tarzana"
            alt="Tarzana skyline"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning in Tarzana
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California provides top-notch air duct cleaning services for homes and businesses in Tarzana.
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
              Our Services in Tarzana
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a full range of air duct and ventilation cleaning services to residents and businesses in Tarzana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">
                Improve your home's air quality with our thorough residential air duct cleaning service.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">
                Ensure safety and efficiency with our residential dryer vent cleaning service.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">
                Enhance your home's air filtration with our residential electrostatic filter service.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">
                Keep your business's air clean and healthy with our commercial air duct cleaning.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">
                Maintain safety and efficiency with our commercial dryer vent cleaning service.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">
                Improve your business's air filtration with our commercial electrostatic filter service.
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
              Get a Free Quote for Your Tarzana Home or Business
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Contact us today to schedule your air duct cleaning service in Tarzana.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tarzana;