import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/ServiceCard';

const NorthOfMontana = () => {
  const services = [
    {
      key: "0",
      title: "Residential Air Duct Cleaning",
      description: "Professional cleaning for your home's air ducts.",
      link: "/services/residential-air-duct-cleaning"
    },
    {
      key: "1",
      title: "Commercial Air Duct Cleaning",
      description: "Keep your business environment clean and healthy.",
      link: "/services/commercial-air-duct-cleaning" 
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in North of Montana | Pure Air California</title>
        <meta name="description" content="Expert air duct cleaning services in North of Montana area. Improve your indoor air quality and energy efficiency." />
      </Helmet>
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1563431453304-92a686736508"
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
              Pure Air California offers top-quality air duct cleaning and maintenance services in the North of Montana area.
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
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Our Services in North of Montana
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.key}
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
                Get a free, no-obligation quote for air duct cleaning services in North of Montana.
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
