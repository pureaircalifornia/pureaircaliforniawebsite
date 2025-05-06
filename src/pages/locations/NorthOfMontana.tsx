tsx
import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import QuoteForm from '@/components/QuoteForm';
import ServiceCard from '@/components/ServiceCard';

const NorthOfMontana = () => {
  const services = [
    {
      title: 'Residential Air Duct Cleaning',
      description: 'Thorough cleaning of your home\'s air ducts to remove dust, allergens, and debris.',
      slug: 'residential-air-duct-cleaning',
    },
    {
      title: 'Residential Dryer Vent Cleaning',
      description: 'Cleaning of dryer vents to improve efficiency and reduce fire hazards.',
      slug: 'residential-dryer-vent-cleaning',
    },
    {
      title: 'Residential Electrostatic Filter',
      description: 'Installation and maintenance of electrostatic filters for improved air quality.',
      slug: 'residential-electrostatic-filter',
    },
    {
      title: 'Commercial Air Duct Cleaning',
      description: 'Professional air duct cleaning for businesses and commercial properties.',
      slug: 'commercial-air-duct-cleaning',
    },
    {
      title: 'Commercial Dryer Vent Cleaning',
      description: 'Cleaning of commercial dryer vents to ensure safety and efficiency.',
      slug: 'commercial-dryer-vent-cleaning',
    },
    {
      title: 'Commercial Electrostatic Filter',
      description: 'Installation and maintenance of electrostatic filters for commercial air systems.',
      slug: 'commercial-electrostatic-filter',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning North of Montana | Pure Air California</title>
        <meta name="description" content="Professional air duct cleaning services in North of Montana. Residential and commercial cleaning available." />
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://source.unsplash.com/random/1920x1080?north-of-montana"
            alt="North of Montana"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning in North of Montana
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California provides top-quality air duct and ventilation cleaning services in North of Montana and the surrounding areas.
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
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Our Services in North of Montana</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a comprehensive range of air duct and ventilation cleaning services to meet the needs of North of Montana residents and businesses.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                title={service.title}
                description={service.description}
                slug={`/services/${service.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                Get a Free Quote for Your North of Montana Property
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Contact us today to receive a no-obligation quote for your air duct or ventilation cleaning needs in North of Montana.
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

export default NorthOfMontana;