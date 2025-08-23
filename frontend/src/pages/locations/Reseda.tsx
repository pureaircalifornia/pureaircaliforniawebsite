tsx
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';
import QuoteForm from '@/components/QuoteForm';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Reseda = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in Reseda | Pure Air California</title>
        <meta name="description" content="Professional air duct and dryer vent cleaning services in Reseda. Contact Pure Air California for cleaner air." />
      </Helmet>

      <NavBar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1563431453304-92a686736508" // Placeholder image - Replace with Reseda specific image
            alt="Reseda"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct Cleaning in Reseda
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California provides expert air duct and ventilation services for homes and businesses in Reseda.
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
            Our Services in Reseda
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="border border-gray-300 rounded-lg p-6 flex flex-col">
              <h3 className="font-bold text-xl mb-2">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600 flex-grow">
                Comprehensive air duct cleaning to improve the air quality in your Reseda home.
              </p>
                <Button asChild variant="outline" className="mt-4 text-[#0A3D7C] border-[#0A3D7C] hover:bg-[#0A3D7C] hover:text-white">
                    <Link to={`/services/residential-air-duct-cleaning`}>
                    Learn More
                    </Link>
                </Button>
            </div>

            {/* Residential Dryer Vent Cleaning */}
            <div className="border border-gray-300 rounded-lg p-6 flex flex-col">
              <h3 className="font-bold text-xl mb-2">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600 flex-grow">
                Ensure the safety and efficiency of your dryer with our professional cleaning services.
              </p>
                <Button asChild variant="outline" className="mt-4 text-[#0A3D7C] border-[#0A3D7C] hover:bg-[#0A3D7C] hover:text-white">
                    <Link to={`/services/residential-dryer-vent-cleaning`}>
                    Learn More
                    </Link>
                </Button>
            </div>

            {/* Residential Electrostatic Filter */}
            <div className="border border-gray-300 rounded-lg p-6 flex flex-col">
              <h3 className="font-bold text-xl mb-2">Residential Electrostatic Filter</h3>
              <p className="text-gray-600 flex-grow">
                Upgrade your home's air filtration with our high-quality electrostatic filters.
              </p>
                <Button asChild variant="outline" className="mt-4 text-[#0A3D7C] border-[#0A3D7C] hover:bg-[#0A3D7C] hover:text-white">
                    <Link to={`/services/electrostatic-filter-program`}>
                    Learn More
                    </Link>
                </Button>
            </div>

            {/* Commercial Air Duct Cleaning */}
            <div className="border border-gray-300 rounded-lg p-6 flex flex-col">
              <h3 className="font-bold text-xl mb-2">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600 flex-grow">
                Maintain a healthy work environment with our commercial air duct cleaning services.
              </p>
                <Button asChild variant="outline" className="mt-4 text-[#0A3D7C] border-[#0A3D7C] hover:bg-[#0A3D7C] hover:text-white">
                    <Link to={`/services/commercial-air-duct-cleaning`}>
                    Learn More
                    </Link>
                </Button>
            </div>

            {/* Commercial Dryer Vent Cleaning */}
            <div className="border border-gray-300 rounded-lg p-6 flex flex-col">
              <h3 className="font-bold text-xl mb-2">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600 flex-grow">
                Keep your commercial dryer vents clean and safe with our professional cleaning.
              </p>
                <Button asChild variant="outline" className="mt-4 text-[#0A3D7C] border-[#0A3D7C] hover:bg-[#0A3D7C] hover:text-white">
                    <Link to={`/services/commercial-dryer-vent-cleaning`}>
                    Learn More
                    </Link>
                </Button>
            </div>

            {/* Commercial Electrostatic Filter */}
            <div className="border border-gray-300 rounded-lg p-6 flex flex-col">
              <h3 className="font-bold text-xl mb-2">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600 flex-grow">
                Improve the air quality in your Reseda business with our electrostatic filter solutions.
              </p>
                <Button asChild variant="outline" className="mt-4 text-[#0A3D7C] border-[#0A3D7C] hover:bg-[#0A3D7C] hover:text-white">
                    <Link to={`/services/electrostatic-filter-program`}>
                    Learn More
                    </Link>
                </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
            Get a Free Quote for Air Duct Cleaning in Reseda
          </h2>
          <QuoteForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Reseda;