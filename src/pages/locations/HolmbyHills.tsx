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

const HolmbyHills = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in Holmby Hills | Pure Air California</title>
        <meta name="description" content="Professional air duct cleaning, dryer vent cleaning, and electrostatic filter services in Holmby Hills. Improve your indoor air quality today!" />
        <meta name="keywords" content="air duct cleaning Holmby Hills, dryer vent cleaning Holmby Hills, electrostatic filter Holmby Hills, HVAC cleaning Holmby Hills, luxury estate air quality" />
      </Helmet>
      
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
            alt="Holmby Hills Luxury Estate" 
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
              <span>Holmby Hills</span>
            </div>
          </div>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Elite Air Duct Cleaning Services in Holmby Hills
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Pure Air California delivers exceptional air duct cleaning, dryer vent cleaning, and electrostatic filter services for prestigious estates and luxury properties in Holmby Hills. Experience the highest standard of indoor air quality.
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
              Our Elite Services in Holmby Hills
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Residential Services */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Estate Air Duct Cleaning</h3>
                <p className="text-gray-600">Comprehensive air duct cleaning for Holmby Hills estates and mansions, ensuring pristine air quality throughout your luxury property.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Premium Dryer Vent Cleaning</h3>
                <p className="text-gray-600">Meticulous dryer vent cleaning to eliminate fire hazards and enhance appliance performance in Holmby Hills luxury residences.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Advanced Electrostatic Filtration</h3>
                <p className="text-gray-600">Installation and maintenance of state-of-the-art electrostatic filters for superior air purification in Holmby Hills estates.</p>
              </div>
              
              {/* Additional Services */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Whole-Estate Air Quality Management</h3>
                <p className="text-gray-600">Comprehensive air quality solutions for large estates and multi-building properties throughout Holmby Hills.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">HVAC System Enhancement</h3>
                <p className="text-gray-600">Professional HVAC system cleaning and optimization for peak performance and efficiency in Holmby Hills luxury properties.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Customized Air Quality Solutions</h3>
                <p className="text-gray-600">Tailored air quality assessments and bespoke solutions for the unique needs of Holmby Hills estates and historic properties.</p>
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
              Benefits of Elite Air Duct Cleaning in Holmby Hills
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <div className="bg-brand-100 p-2 rounded-full mr-4">
                  <Check className="text-brand-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Exceptional Air Quality</h3>
                  <p className="text-gray-600">Eliminate dust, allergens, and contaminants from your air ducts for the purest possible air throughout your Holmby Hills estate, essential for luxury living standards.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-100 p-2 rounded-full mr-4">
                  <Check className="text-brand-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Optimized Energy Efficiency</h3>
                  <p className="text-gray-600">Pristine air ducts allow your sophisticated HVAC systems to operate at peak efficiency in your Holmby Hills property, reducing energy consumption while maintaining perfect comfort.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-100 p-2 rounded-full mr-4">
                  <Check className="text-brand-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">HVAC System Longevity</h3>
                  <p className="text-gray-600">Regular professional cleaning extends the life of premium HVAC systems in Holmby Hills estates, protecting your significant investment and ensuring consistent performance.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-100 p-2 rounded-full mr-4">
                  <Check className="text-brand-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Healthier Living Environment</h3>
                  <p className="text-gray-600">Eliminate allergens, dust, and potential irritants from your air circulation system, creating the healthiest possible environment in your Holmby Hills residence.</p>
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
              Request a Personalized Quote for Your Holmby Hills Estate
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Complete the form below to receive a customized, no-obligation quote for our premium services in Holmby Hills.
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

export default HolmbyHills;