
import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import QuoteForm from '@/components/QuoteForm';
import ServiceCard from '@/components/ServiceCard';

const Chatsworth = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in Chatsworth | Pure Air California</title>
        <meta
          name="description"
          content="Expert air duct cleaning services in Chatsworth. Residential and commercial cleaning for improved air quality. Schedule your service today!"
        />
        <meta
          name="keywords"
          content="air duct cleaning Chatsworth, dryer vent cleaning Chatsworth, HVAC cleaning Chatsworth, indoor air quality Chatsworth"
        />
      </Helmet>
      <NavBar />
      <div
        className="relative py-24 bg-gray-900 overflow-hidden"
      >
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://source.unsplash.com/random/1200x400/?chatsworth"
            alt="Chatsworth"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning Services in Chatsworth
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Breathe easier with Pure Air California's expert air duct cleaning
              services in Chatsworth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#0A3D7C] hover:bg-[#072c5a]"
              >
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

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Our Services in Chatsworth
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a full range of air duct and ventilation services to meet
              your needs in Chatsworth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Residential Air Duct Cleaning"
              description="Improve your home's air quality with our thorough residential air duct cleaning services."
              link="/services/residential-air-duct-cleaning"
            />
            <ServiceCard
              title="Residential Dryer Vent Cleaning"
              description="Ensure safety and efficiency with our residential dryer vent cleaning services."
              link="/services/residential-dryer-vent-cleaning"
            />
            <ServiceCard
              title="Electrostatic Filter Program"
              description="Upgrade to an electrostatic filter for cleaner air in your home."
              link="/services/electrostatic-filter-program"
            />
            <ServiceCard
              title="Commercial Air Duct Cleaning"
              description="Maintain a healthy workplace with our commercial air duct cleaning services."
              link="/services/commercial-air-duct-cleaning"
            />
            <ServiceCard
              title="Commercial Dryer Vent Cleaning"
              description="Keep your commercial dryer vents clean and safe with our professional cleaning."
              link="/services/commercial-dryer-vent-cleaning"
            />
            <ServiceCard
              title="Electrostatic Filter Program"
              description="Optimize air quality in your business with our electrostatic filter program."
              link="/services/electrostatic-filter-program"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="p-6">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                Request a Quote for Your Chatsworth Property
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Get in touch for a free estimate on our services in Chatsworth.
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

export default Chatsworth;
