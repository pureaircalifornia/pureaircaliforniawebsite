tsx
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const MissionHills = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Mission Hills Air Duct Cleaning | Pure Air California</title>
        <meta
          name="description"
          content="Expert air duct cleaning services in Mission Hills. Improve your indoor air quality with our residential and commercial cleaning services."
        />
        <meta
          name="keywords"
          content="air duct cleaning Mission Hills, Mission Hills HVAC cleaning, dryer vent cleaning Mission Hills, Mission Hills air quality"
        />
      </Helmet>

      <NavBar />

      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1542601906997-b67e50e0d708?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Mission Hills"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Breathe Easier in Mission Hills
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California provides top-notch air duct cleaning services for residents and businesses in Mission Hills.
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
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
            Our Services in Mission Hills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="font-heading font-semibold text-xl mb-3">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600">
                Improve your home's air quality with our thorough residential air duct cleaning services.
              </p>
            </div>

            {/* Residential Dryer Vent Cleaning */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="font-heading font-semibold text-xl mb-3">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600">
                Ensure safety and efficiency with our professional residential dryer vent cleaning.
              </p>
            </div>

            {/* Residential Electrostatic Filter */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="font-heading font-semibold text-xl mb-3">Residential Electrostatic Filter</h3>
              <p className="text-gray-600">
                Enhance air filtration with our high-quality residential electrostatic filters.
              </p>
            </div>

            {/* Commercial Air Duct Cleaning */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="font-heading font-semibold text-xl mb-3">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600">
                Maintain a healthy workplace with our commercial air duct cleaning services.
              </p>
            </div>

            {/* Commercial Dryer Vent Cleaning */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="font-heading font-semibold text-xl mb-3">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600">
                Prevent hazards and improve efficiency with our commercial dryer vent cleaning.
              </p>
            </div>

            {/* Commercial Electrostatic Filter */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="font-heading font-semibold text-xl mb-3">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600">
                Upgrade your commercial property with our advanced electrostatic filter solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                Get a Free Quote for Your Mission Hills Property
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Fill out the form below to receive a free, no-obligation quote for air duct cleaning services in Mission Hills.
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

export default MissionHills;