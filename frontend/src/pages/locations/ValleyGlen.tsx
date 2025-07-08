tsx
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import QuoteForm from '@/components/QuoteForm';
import { Helmet } from 'react-helmet';

const ValleyGlen = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in Valley Glen | Pure Air California</title>
        <meta
          name="description"
          content="Professional air duct cleaning services in Valley Glen. We offer residential and commercial air duct cleaning, dryer vent cleaning, and electrostatic filter services."
        />
        <meta
          name="keywords"
          content="air duct cleaning Valley Glen, dryer vent cleaning Valley Glen, electrostatic filter Valley Glen, residential air duct cleaning Valley Glen, commercial air duct cleaning Valley Glen"
        />
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1563431453304-92a686736508"
            alt="Valley Glen"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning Services in Valley Glen
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California provides top-tier air duct and ventilation cleaning services to homes and businesses in Valley Glen.
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
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-center">
            Our Services in Valley Glen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="font-semibold text-xl mb-2">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">Improve your home's air quality with our professional residential air duct cleaning services.</p>
            </div>
            {/* Residential Dryer Vent Cleaning */}
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="font-semibold text-xl mb-2">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Ensure your dryer operates safely and efficiently with our residential dryer vent cleaning services.</p>
            </div>
            {/* Residential Electrostatic Filter */}
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="font-semibold text-xl mb-2">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">Upgrade your home's air filtration with our high-quality residential electrostatic filters.</p>
            </div>
            {/* Commercial Air Duct Cleaning */}
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="font-semibold text-xl mb-2">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">Maintain a healthy workplace with our comprehensive commercial air duct cleaning services.</p>
            </div>
            {/* Commercial Dryer Vent Cleaning */}
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="font-semibold text-xl mb-2">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">Keep your business's laundry operations safe with our commercial dryer vent cleaning services.</p>
            </div>
            {/* Commercial Electrostatic Filter */}
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="font-semibold text-xl mb-2">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">Improve your building's air quality with our effective commercial electrostatic filters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-center">
              Get a Free Quote for Valley Glen
            </h2>
            <QuoteForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ValleyGlen;