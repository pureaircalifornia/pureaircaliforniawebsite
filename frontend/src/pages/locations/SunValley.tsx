tsx
import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SunValley = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in Sun Valley | Pure Air California</title>
        <meta name="description" content="Professional air duct cleaning services in Sun Valley. Residential and commercial cleaning, dryer vent cleaning, and electrostatic filter services." />
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://source.unsplash.com/random/1920x1080/?city,sunvalley"
            alt="Sun Valley"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning in Sun Valley
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California provides expert air duct cleaning services in Sun Valley. We offer residential and commercial solutions to improve your indoor air quality.
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">
              Our Services in Sun Valley
            </h2>
            <p className="text-lg text-gray-600">
              We offer a wide range of air duct cleaning services to meet your needs in Sun Valley.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-xl mb-2">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">Improve your home's air quality with our thorough air duct cleaning service.</p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-xl mb-2">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Ensure safety and efficiency with our residential dryer vent cleaning.</p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-xl mb-2">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">Upgrade your home's air filtration with our electrostatic filter service.</p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-xl mb-2">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">Maintain a healthy workplace with our commercial air duct cleaning service.</p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-xl mb-2">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Keep your commercial dryer vents clean and safe.</p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold text-xl mb-2">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">Enhance your business's air quality with our electrostatic filter service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">
              Get a Free Quote for Sun Valley
            </h2>
            <p className="text-lg text-gray-600">
              Ready to improve your air quality? Fill out the form below to get a free quote.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SunValley;