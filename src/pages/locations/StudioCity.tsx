tsx
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ServiceCard from '@/components/ServiceCard';

const StudioCity = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in Studio City | Pure Air California</title>
        <meta
          name="description"
          content="Professional air duct cleaning services in Studio City. Residential and commercial services available. Get a free quote today!"
        />
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://source.unsplash.com/random?studio-city"
            alt="Studio City"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning Services in Studio City
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California offers top-quality air duct cleaning, dryer vent cleaning, and electrostatic filter services in Studio City. Improve your indoor air quality today!
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
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
            Our Services in Studio City
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Residential Air Duct Cleaning"
              description="Improve your home's air quality with our thorough residential air duct cleaning service."
              link="/services/residential-air-duct-cleaning"
            />
            <ServiceCard
              title="Residential Dryer Vent Cleaning"
              description="Ensure the safety and efficiency of your home with our professional dryer vent cleaning service."
              link="/services/residential-dryer-vent-cleaning"
            />
            <ServiceCard
              title="Residential Electrostatic Filter"
              description="Upgrade your home's filtration system with our residential electrostatic filter installation."
              link="/services/residential-electrostatic-filter"
            />
            <ServiceCard
              title="Commercial Air Duct Cleaning"
              description="Maintain a healthy work environment with our comprehensive commercial air duct cleaning service."
              link="/services/commercial-air-duct-cleaning"
            />
            <ServiceCard
              title="Commercial Dryer Vent Cleaning"
              description="Prevent fire hazards and improve efficiency with our commercial dryer vent cleaning service."
              link="/services/commercial-dryer-vent-cleaning"
            />
            <ServiceCard
              title="Commercial Electrostatic Filter"
              description="Enhance your business's air quality with our advanced commercial electrostatic filter solutions."
              link="/services/commercial-electrostatic-filter"
            />
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                Get a Free Quote for Your Studio City Property
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Improve your Studio City home or business's indoor air quality today. Fill out our quick form for a free estimate.
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

export default StudioCity;
