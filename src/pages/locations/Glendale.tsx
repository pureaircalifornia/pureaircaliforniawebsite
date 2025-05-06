tsx
import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ServiceCard from '@/components/ServiceCard';

const Glendale = () => {
  const services = [
    {
      title: 'Residential Air Duct Cleaning',
      description: 'Comprehensive air duct cleaning for homes in Glendale.',
      link: '/services/ResidentialAirDuctCleaning',
    },
    {
      title: 'Residential Dryer Vent Cleaning',
      description: 'Expert dryer vent cleaning services for Glendale residents.',
      link: '/services/ResidentialDryerVentCleaning',
    },
    {
      title: 'Residential Electrostatic Filter',
      description: 'High-quality electrostatic filter installation and maintenance for homes.',
      link: '/services/ResidentialElectrostaticFilter',
    },
    {
      title: 'Commercial Air Duct Cleaning',
      description: 'Professional air duct cleaning for businesses and commercial spaces in Glendale.',
      link: '/services/CommercialAirDuctCleaning',
    },
    {
      title: 'Commercial Dryer Vent Cleaning',
      description: 'Reliable dryer vent cleaning services for commercial properties.',
      link: '/services/CommercialDryerVentCleaning',
    },
    {
      title: 'Commercial Electrostatic Filter',
      description: 'Installation and maintenance of electrostatic filters for commercial buildings.',
      link: '/services/CommercialElectrostaticFilter',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Glendale Air Duct Cleaning | Pure Air California</title>
        <meta
          name="description"
          content="Professional air duct cleaning services in Glendale, CA. We offer residential and commercial air duct and dryer vent cleaning."
        />
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1501862700950-71992d7f39d3?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Glendale"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning in Glendale
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California provides expert air duct and ventilation cleaning services to
              residents and businesses in Glendale, CA.
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Our Services in Glendale
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our range of air duct and vent cleaning services designed for Glendale homes
              and businesses.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                link={service.link}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                Request a Free Quote
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Get a free, no-obligation quote for air duct cleaning services in Glendale.
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

export default Glendale;