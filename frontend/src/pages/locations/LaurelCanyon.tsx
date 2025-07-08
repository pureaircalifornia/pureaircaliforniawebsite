
import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import QuoteForm from '@/components/QuoteForm';
import ServiceCard from '@/components/ServiceCard';

const LaurelCanyon = () => {
  // This is just representative - you would need to fix all location files
  const services = [
    {
      title: "Residential Air Duct Cleaning",
      description: "Professional cleaning for your home's air ducts to improve air quality.",
      link: "/services/residential-air-duct-cleaning"
    },
    {
      title: "Commercial Air Duct Cleaning",
      description: "Keep your business environment clean and healthy with our commercial services.",
      link: "/services/commercial-air-duct-cleaning"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in Laurel Canyon | Pure Air California</title>
        <meta name="description" content="Expert air duct and dryer vent cleaning in Laurel Canyon. Improve indoor air quality and energy efficiency." />
      </Helmet>
      <NavBar />
      
      {/* Hero Section */}
      <section
        className="relative py-24 bg-gray-900 overflow-hidden"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1504193173173-90e094a5f99d?auto=format&fit=crop&q=80&w=1080)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 z-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning Services in Laurel Canyon
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Breathe cleaner air in your Laurel Canyon home. Pure Air California provides
              expert air duct and vent cleaning services.
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
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Our Services in Laurel Canyon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index.toString()}
                title={service.title}
                description={service.description}
                link={service.link}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Quote Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Request a Free Quote
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started with cleaner air today. Fill out the form below to receive a free, no-obligation
              quote for your home or business.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LaurelCanyon;
