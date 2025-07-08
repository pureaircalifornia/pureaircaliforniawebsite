import React from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Check, Star, Shield, Award } from 'lucide-react';
import QuoteForm from '@/components/QuoteForm';
import TrustBadges from '@/components/TrustBadges';
import CTASection from '@/components/CTASection';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

const BelAir = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in Bel Air | Pure Air California</title>
        <meta name="description" content="Professional air duct cleaning, dryer vent cleaning, and electrostatic filter services in Bel Air. Improve your indoor air quality today!" />
        <meta name="keywords" content="air duct cleaning Bel Air, dryer vent cleaning Bel Air, electrostatic filter Bel Air, HVAC cleaning Bel Air, luxury home air quality" />
      </Helmet>
      
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
            alt="Bel Air Luxury Home" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center text-white mb-4">
            <MapPin size={20} className="mr-2 text-brand-400" />
            <div className="text-sm">
              <Link to="/" className="hover:text-brand-400 transition">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/locations" className="hover:text-brand-400 transition">Locations</Link>
              <span className="mx-2">/</span>
              <span>Bel Air</span>
            </div>
          </div>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Premium Air Duct Cleaning Services in Bel Air
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Pure Air California offers exclusive air duct cleaning, dryer vent cleaning, and electrostatic filter services for luxury homes and estates in Bel Air. Experience the difference that professional air quality management makes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700">
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20 hover:text-white">
                <Link to="/services">Explore Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <TrustBadges />
      
      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our Premium Services in Bel Air
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Residential Services */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Luxury Home Air Duct Cleaning</h3>
                <p className="text-gray-600">Comprehensive air duct cleaning for Bel Air estates and luxury homes, improving air quality and HVAC efficiency with minimal disruption.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Residential Dryer Vent Cleaning</h3>
                <p className="text-gray-600">Thorough dryer vent cleaning to prevent fire hazards and improve dryer performance in Bel Air residences, protecting your valuable property.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Premium Electrostatic Filter Installation</h3>
                <p className="text-gray-600">Installation and maintenance of high-end electrostatic filters for enhanced air purification in Bel Air luxury homes and estates.</p>
              </div>
              
              {/* Commercial Services */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Estate Air Quality Management</h3>
                <p className="text-gray-600">Comprehensive air quality management services for large estates and properties throughout Bel Air.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">HVAC System Optimization</h3>
                <p className="text-gray-600">Professional HVAC system cleaning and optimization services for improved efficiency and performance in Bel Air properties.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Indoor Air Quality Assessment</h3>
                <p className="text-gray-600">Detailed air quality assessments and recommendations for Bel Air homes and estates, ensuring optimal indoor environments.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Benefits of Professional Air Duct Cleaning in Bel Air
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <div className="bg-brand-100 p-2 rounded-full mr-4">
                  <Check className="text-brand-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Superior Indoor Air Quality</h3>
                  <p className="text-gray-600">Remove dust, allergens, and contaminants from your air ducts for cleaner, healthier air throughout your Bel Air property, essential for luxury living.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-100 p-2 rounded-full mr-4">
                  <Check className="text-brand-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Enhanced Energy Efficiency</h3>
                  <p className="text-gray-600">Clean air ducts allow your HVAC system to operate more efficiently in your Bel Air home, potentially reducing energy costs while maintaining comfort.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-100 p-2 rounded-full mr-4">
                  <Check className="text-brand-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Extended HVAC System Life</h3>
                  <p className="text-gray-600">Regular cleaning helps prevent wear and tear on your heating and cooling systems in Bel Air properties, extending their operational life and protecting your investment.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-100 p-2 rounded-full mr-4">
                  <Check className="text-brand-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Reduced Allergens and Irritants</h3>
                  <p className="text-gray-600">Minimize dust, pollen, pet dander, and other allergens that can accumulate in your air duct system, creating a healthier environment in your Bel Air home.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Quote Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
              Request a Free Quote for Your Bel Air Property
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Fill out the form below to receive a free, no-obligation quote for our premium services in Bel Air.
            </p>
            
            <div className="max-w-2xl mx-auto">
              <QuoteForm />
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      <CTASection />
      <Footer />
    </div>
  );
};

export default BelAir;