tsx
import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Brentwood = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Brentwood Air Duct Cleaning | Pure Air California</title>
        <meta
          name="description"
          content="Professional air duct and dryer vent cleaning services in Brentwood. Serving homes and businesses with top-quality air duct cleaning, dryer vent cleaning, and electrostatic filter installation."
        />
      </Helmet>

      <NavBar />

      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1616438758022-8c78781738c2?auto=format&fit=crop&q=80&w=1080"
            alt="Brentwood"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Brentwood Air Duct Cleaning Services
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California offers expert air duct cleaning and maintenance services in Brentwood.
              Improving your indoor air quality for a healthier living and working environment.
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
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
            Our Services in Brentwood
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="flex flex-col justify-between p-6 rounded-lg shadow-md border">
              <div>
                <h3 className="font-semibold text-xl mb-2">Residential Air Duct Cleaning</h3>
                <p className="text-gray-600">
                  Improve indoor air quality and system efficiency for your Brentwood home.
                </p>
              </div>
              <Button asChild variant="outline" className="mt-4 text-[#0A3D7C] border-[#0A3D7C] hover:bg-[#0A3D7C] hover:text-white">
                  <Link to="/services/residential-air-duct-cleaning">Learn More</Link>
                </Button>
            </div>

            {/* Residential Dryer Vent Cleaning */}
            <div className="flex flex-col justify-between p-6 rounded-lg shadow-md border">
              <div>
                <h3 className="font-semibold text-xl mb-2">Residential Dryer Vent Cleaning</h3>
                <p className="text-gray-600">
                  Enhance safety and efficiency with our dryer vent cleaning services.
                </p>
              </div>
              <Button asChild variant="outline" className="mt-4 text-[#0A3D7C] border-[#0A3D7C] hover:bg-[#0A3D7C] hover:text-white">
                  <Link to="/services/residential-dryer-vent-cleaning">Learn More</Link>
                </Button>
            </div>

            {/* Residential Electrostatic Filter */}
            <div className="flex flex-col justify-between p-6 rounded-lg shadow-md border">
              <div>
                <h3 className="font-semibold text-xl mb-2">Residential Electrostatic Filter</h3>
                <p className="text-gray-600">
                  Upgrade your home's filtration with electrostatic filters.
                </p>
              </div>
              <Button asChild variant="outline" className="mt-4 text-[#0A3D7C] border-[#0A3D7C] hover:bg-[#0A3D7C] hover:text-white">
                  <Link to="/services/electrostatic-filter-program">Learn More</Link>
                </Button>
            </div>

            {/* Commercial Air Duct Cleaning */}
            <div className="flex flex-col justify-between p-6 rounded-lg shadow-md border">
              <div>
                <h3 className="font-semibold text-xl mb-2">Commercial Air Duct Cleaning</h3>
                <p className="text-gray-600">
                  Comprehensive air duct cleaning for Brentwood businesses.
                </p>
              </div>
              <Button asChild variant="outline" className="mt-4 text-[#0A3D7C] border-[#0A3D7C] hover:bg-[#0A3D7C] hover:text-white">
                  <Link to="/services/commercial-air-duct-cleaning">Learn More</Link>
                </Button>
            </div>

            {/* Commercial Dryer Vent Cleaning */}
            <div className="flex flex-col justify-between p-6 rounded-lg shadow-md border">
              <div>
                <h3 className="font-semibold text-xl mb-2">Commercial Dryer Vent Cleaning</h3>
                <p className="text-gray-600">
                  Improve safety and efficiency for commercial properties.
                </p>
              </div>
              <Button asChild variant="outline" className="mt-4 text-[#0A3D7C] border-[#0A3D7C] hover:bg-[#0A3D7C] hover:text-white">
                  <Link to="/services/commercial-dryer-vent-cleaning">Learn More</Link>
                </Button>
            </div>

            {/* Commercial Electrostatic Filter */}
            <div className="flex flex-col justify-between p-6 rounded-lg shadow-md border">
              <div>
                <h3 className="font-semibold text-xl mb-2">Commercial Electrostatic Filter</h3>
                <p className="text-gray-600">
                  Enhance filtration with commercial electrostatic filters.
                </p>
              </div>
                <Button asChild variant="outline" className="mt-4 text-[#0A3D7C] border-[#0A3D7C] hover:bg-[#0A3D7C] hover:text-white">
                  <Link to="/services/electrostatic-filter-program">Learn More</Link>
                </Button>
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
                Request Service in Brentwood
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Ready to improve your indoor air quality? Fill out our quick quote form to get
                started.
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

export { Brentwood };