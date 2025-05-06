tsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import ServiceCard from '@/components/ServiceCard';

const SepulvedaBasin = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Sepulveda Basin Air Duct Cleaning | Pure Air California</title>
        <meta
          name="description"
          content="Expert air duct cleaning services in Sepulveda Basin. Improve your home's air quality with our professional cleaning."
        />
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1542364819-b6b1a5f0d70d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Sepulveda Basin"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Sepulveda Basin Air Duct Cleaning
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California offers professional air duct cleaning services in the Sepulveda Basin area, ensuring your home's air is clean and healthy.
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">
              Our Services in Sepulveda Basin
            </h2>
            <p className="text-lg text-gray-600">
              We provide a variety of air duct and ventilation cleaning services in Sepulveda Basin.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Residential Air Duct Cleaning"
              description="Improve your home's air quality with our thorough residential air duct cleaning."
              link="/services/ResidentialAirDuctCleaning"
            />
            <ServiceCard
              title="Residential Dryer Vent Cleaning"
              description="Ensure your dryer runs efficiently and safely with our residential dryer vent cleaning service."
              link="/services/ResidentialDryerVentCleaning"
            />
            <ServiceCard
              title="Residential Electrostatic Filter"
              description="Upgrade your home's air filtration with our high-quality residential electrostatic filter installation."
              link="/services/ResidentialElectrostaticFilter"
            />
             <ServiceCard
              title="Commercial Air Duct Cleaning"
              description="Maintain a healthy environment for your business with our professional commercial air duct cleaning."
              link="/services/CommercialAirDuctCleaning"
            />
            <ServiceCard
              title="Commercial Dryer Vent Cleaning"
              description="Keep your commercial dryer vents clean and safe with our expert cleaning service."
              link="/services/CommercialDryerVentCleaning"
            />
            <ServiceCard
              title="Commercial Electrostatic Filter"
              description="Improve your commercial space's air quality with our commercial electrostatic filter installation."
              link="/services/CommercialElectrostaticFilter"
            />
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">
              Get a Free Quote for Your Sepulveda Basin Property
            </h2>
            <p className="text-lg text-gray-600">
              Fill out the form below to receive a personalized quote for our air duct cleaning services in Sepulveda Basin.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SepulvedaBasin;