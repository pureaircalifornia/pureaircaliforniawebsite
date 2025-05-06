tsx
import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ServiceCard from '@/components/ServiceCard';

const DeerLakeHighlands = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in Deer Lake Highlands | Pure Air California</title>
        <meta
          name="description"
          content="Expert air duct cleaning services for homes and businesses in Deer Lake Highlands. Schedule your service today!"
        />
      </Helmet>

      <NavBar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1601992191007-97f8e8df8883?auto=format&fit=crop&q=80&w=1080"
            alt="Deer Lake Highlands"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning in Deer Lake Highlands
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California offers professional air duct and ventilation cleaning services in Deer Lake Highlands.
              Breathe easier with our expert cleaning solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[#0A3D7C] hover:bg-[#072c5a]">
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <Link to="/contact">Contact Us</Link>
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
              Our Services in Deer Lake Highlands
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide a range of air duct and ventilation cleaning services for both residential and commercial properties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Residential Air Duct Cleaning"
              description="Improve your home's air quality with our thorough air duct cleaning services."
              link="/services/ResidentialAirDuctCleaning"
            />
            <ServiceCard
              title="Residential Dryer Vent Cleaning"
              description="Prevent hazards and improve efficiency with our residential dryer vent cleaning."
              link="/services/ResidentialDryerVentCleaning"
            />
            <ServiceCard
              title="Residential Electrostatic Filter"
              description="Upgrade your home with our advanced electrostatic filter installation."
              link="/services/ResidentialElectrostaticFilter"
            />
             <ServiceCard
              title="Commercial Air Duct Cleaning"
              description="Ensure a healthy work environment with our commercial air duct cleaning services."
              link="/services/CommercialAirDuctCleaning"
            />
             <ServiceCard
              title="Commercial Dryer Vent Cleaning"
              description="Maintain safety and efficiency with our commercial dryer vent cleaning services."
              link="/services/CommercialDryerVentCleaning"
            />
              <ServiceCard
              title="Commercial Electrostatic Filter"
              description="Enhance your business's air quality with our commercial electrostatic filters."
              link="/services/CommercialElectrostaticFilter"
            />
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                Get a Free Quote for Deer Lake Highlands
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Fill out our quick quote form to get a personalized estimate for your air duct or ventilation cleaning service.
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

export default DeerLakeHighlands;