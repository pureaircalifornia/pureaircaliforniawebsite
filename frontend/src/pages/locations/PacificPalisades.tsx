tsx
import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const PacificPalisades = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning Services in Pacific Palisades | Pure Air California</title>
        <meta name="description" content="Premium air duct cleaning services for residential and commercial properties in Pacific Palisades. Contact us for expert HVAC cleaning, dryer vent cleaning, and more." />
        <meta name="keywords" content="air duct cleaning Pacific Palisades, HVAC cleaning Pacific Palisades, dryer vent cleaning Pacific Palisades, commercial air duct cleaning Pacific Palisades, residential air duct cleaning Pacific Palisades" />
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Pacific Palisades"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Premium Air Duct Cleaning in Pacific Palisades
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California offers top-tier air duct and ventilation cleaning services for the Pacific Palisades area.
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
            Our Services in Pacific Palisades
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Residential Air Duct Cleaning */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <h3 className="font-heading font-semibold text-xl mb-4">Residential Air Duct Cleaning</h3>
              <p className="text-gray-600 flex-grow">
                Thorough cleaning of your home's air ducts to improve indoor air quality and HVAC efficiency.
              </p>
              <div className="mt-4">
                <Check className="inline-block text-[#0A3D7C] mr-2" size={16}/>
                <span className='text-gray-600'>Expert Technicians</span>
                
              </div>
              <div className="mt-4">
                <Check className="inline-block text-[#0A3D7C] mr-2" size={16}/>
                <span className='text-gray-600'>Advanced Equipment</span>
                
              </div>
              <div className="mt-4">
                <Check className="inline-block text-[#0A3D7C] mr-2" size={16}/>
                <span className='text-gray-600'>Detailed Cleaning</span>
                
              </div>
            </div>

            {/* Residential Dryer Vent Cleaning */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <h3 className="font-heading font-semibold text-xl mb-4">Residential Dryer Vent Cleaning</h3>
              <p className="text-gray-600 flex-grow">
                Safe and efficient dryer vent cleaning to prevent fire hazards and improve dryer performance.
              </p>
              <div className="mt-4">
                <Check className="inline-block text-[#0A3D7C] mr-2" size={16}/>
                <span className='text-gray-600'>Lint Removal</span>
                
              </div>
              <div className="mt-4">
                <Check className="inline-block text-[#0A3D7C] mr-2" size={16}/>
                <span className='text-gray-600'>Safety Inspections</span>
                
              </div>
              <div className="mt-4">
                <Check className="inline-block text-[#0A3D7C] mr-2" size={16}/>
                <span className='text-gray-600'>Improved Efficiency</span>
                
              </div>
            </div>

            {/* Residential Electrostatic Filter */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <h3 className="font-heading font-semibold text-xl mb-4">Residential Electrostatic Filter</h3>
              <p className="text-gray-600 flex-grow">
                Installation and maintenance of electrostatic filters for enhanced air purification.
              </p>
              <div className="mt-4">
                <Check className="inline-block text-[#0A3D7C] mr-2" size={16}/>
                <span className='text-gray-600'>Superior Filtration</span>
                
              </div>
              <div className="mt-4">
                <Check className="inline-block text-[#0A3D7C] mr-2" size={16}/>
                <span className='text-gray-600'>Eco-Friendly Options</span>
                
              </div>
              <div className="mt-4">
                <Check className="inline-block text-[#0A3D7C] mr-2" size={16}/>
                <span className='text-gray-600'>Reusable Filters</span>
                
              </div>
            </div>

            {/* Commercial Air Duct Cleaning */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <h3 className="font-heading font-semibold text-xl mb-4">Commercial Air Duct Cleaning</h3>
              <p className="text-gray-600 flex-grow">
                Comprehensive air duct cleaning for businesses, offices, and commercial buildings.
              </p>
              <div className="mt-4">
                <Check className="inline-block text-[#0A3D7C] mr-2" size={16}/>
                <span className='text-gray-600'>Customized Solutions</span>
                
              </div>
              <div className="mt-4">
                <Check className="inline-block text-[#0A3D7C] mr-2" size={16}/>
                <span className='text-gray-600'>Minimal Disruption</span>
                
              </div>
              <div className="mt-4">
                <Check className="inline-block text-[#0A3D7C] mr-2" size={16}/>
                <span className='text-gray-600'>Improved Air Quality</span>
                
              </div>
            </div>

            {/* Commercial Dryer Vent Cleaning */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <h3 className="font-heading font-semibold text-xl mb-4">Commercial Dryer Vent Cleaning</h3>
              <p className="text-gray-600 flex-grow">
                Professional dryer vent cleaning to ensure safety and efficiency in commercial settings.
              </p>
              <div className="mt-4">
                <Check className="inline-block text-[#0A3D7C] mr-2" size={16}/>
                <span className='text-gray-600'>Safety Compliance</span>
                
              </div>
              <div className="mt-4">
                <Check className="inline-block text-[#0A3D7C] mr-2" size={16}/>
                <span className='text-gray-600'>Reduced Fire Risk</span>
                
              </div>
              <div className="mt-4">
                <Check className="inline-block text-[#0A3D7C] mr-2" size={16}/>
                <span className='text-gray-600'>Efficient Operations</span>
                
              </div>
            </div>

            {/* Commercial Electrostatic Filter */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <h3 className="font-heading font-semibold text-xl mb-4">Commercial Electrostatic Filter</h3>
              <p className="text-gray-600 flex-grow">
                Advanced electrostatic filtration systems for optimal air purification in commercial spaces.
              </p>
               <div className="mt-4">
                <Check className="inline-block text-[#0A3D7C] mr-2" size={16}/>
                <span className='text-gray-600'>Custom Sizing</span>
                
              </div>
              <div className="mt-4">
                <Check className="inline-block text-[#0A3D7C] mr-2" size={16}/>
                <span className='text-gray-600'>Energy Efficient</span>
                
              </div>
              <div className="mt-4">
                <Check className="inline-block text-[#0A3D7C] mr-2" size={16}/>
                <span className='text-gray-600'>Long Lasting</span>
                
              </div>
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
                Get a Free Quote for Your Pacific Palisades Property
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Ready to improve your indoor air quality? Fill out our quick quote form for a personalized estimate.
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

export default PacificPalisades;