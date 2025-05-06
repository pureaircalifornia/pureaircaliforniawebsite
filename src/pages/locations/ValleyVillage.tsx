
import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import QuoteForm from '@/components/QuoteForm';
import ServiceCard from '@/components/ServiceCard';

const ValleyVillage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in Valley Village | Pure Air California</title>
        <meta
          name="description"
          content="Professional air duct cleaning services in Valley Village. Residential and commercial services available. Contact us today for a free quote!"
        />
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://source.unsplash.com/random/1920x1080?valley-village"
            alt="Valley Village"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning in Valley Village
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California provides top-quality air duct cleaning services in Valley Village for both residential and commercial properties.
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
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">Our Services in Valley Village</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Residential Air Duct Cleaning"
              description="Improve your home's air quality with our professional residential air duct cleaning service."
              link="/services/residential-air-duct-cleaning"
            />
            <ServiceCard
              title="Residential Dryer Vent Cleaning"
              description="Ensure safety and efficiency with our residential dryer vent cleaning service."
              link="/services/residential-dryer-vent-cleaning"
            />
            <ServiceCard
              title="Residential Electrostatic Filter"
              description="Upgrade your home's air filtration system with our residential electrostatic filter service."
              link="/services/residential-electrostatic-filter"
            />
            <ServiceCard
              title="Commercial Air Duct Cleaning"
              description="Maintain a healthy environment in your business with our commercial air duct cleaning service."
              link="/services/commercial-air-duct-cleaning"
            />
            <ServiceCard
              title="Commercial Dryer Vent Cleaning"
              description="Keep your commercial dryers safe and efficient with our dryer vent cleaning service."
              link="/services/commercial-dryer-vent-cleaning"
            />
            <ServiceCard
              title="Commercial Electrostatic Filter"
              description="Improve your business's air quality with our commercial electrostatic filter service."
              link="/services/commercial-electrostatic-filter"
            />
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">Get a Free Quote Today</h2>
          <QuoteForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ValleyVillage;
