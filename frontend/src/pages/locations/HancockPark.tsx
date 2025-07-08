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

const HancockPark = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct Cleaning in Hancock Park | Pure Air California</title>
        <meta name="description" content="Professional air duct cleaning, dryer vent cleaning, and electrostatic filter services in Hancock Park. Improve your indoor air quality today!" />
        <meta name="keywords" content="air duct cleaning Hancock Park, dryer vent cleaning Hancock Park, electrostatic filter Hancock Park, HVAC cleaning Hancock Park, historic home air quality" />
      </Helmet>
      
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
            alt="Hancock Park Historic Home" 
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
              <span>Hancock Park</span>
            </div>
          </div>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Professional Air Duct Cleaning Services in Hancock Park
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Pure Air California provides specialized air duct cleaning, dryer vent cleaning, and electrostatic filter services for historic homes and distinguished properties in Hancock Park. Preserve your home's character while improving indoor air quality.
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
              Our Specialized Services in Hancock Park
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Residential Services */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Historic Home Air Duct Cleaning</h3>
                <p className="text-gray-600">Specialized air duct cleaning for Hancock Park's historic homes, preserving architectural integrity while improving indoor air quality.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Residential Dryer Vent Cleaning</h3>
                <p className="text-gray-600">Thorough dryer vent cleaning to prevent fire hazards and improve appliance efficiency in Hancock Park homes.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Custom Electrostatic Filter Solutions</h3>
                <p className="text-gray-600">Installation and maintenance of custom electrostatic filters designed to complement historic HVAC systems in Hancock Park residences.</p>
              </div>
              
              {/* Additional Services */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Vintage HVAC System Maintenance</h3>
                <p className="text-gray-600">Specialized cleaning and maintenance for older HVAC systems common in Hancock Park's historic properties.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Indoor Air Quality Assessment</h3>
                <p className="text-gray-600">Comprehensive air quality testing and assessment services for Hancock Park homes, with tailored recommendations.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">Allergen Reduction Services</h3>
                <p className="text-gray-600">Specialized cleaning focused on reducing allergens and improving air quality for sensitive individuals in Hancock Park properties.</p>
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
              Benefits of Professional Air Duct Cleaning in Hancock Park
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <div className="bg-brand-100 p-2 rounded-full mr-4">
                  <Check className="text-brand-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Preserve Historic Character</h3>
                  <p className="text-gray-600">Our specialized approach ensures your Hancock Park home's historic features remain intact while improving air quality throughout the property.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-100 p-2 rounded-full mr-4">
                  <Check className="text-brand-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Enhanced Energy Efficiency</h3>
                  <p className="text-gray-600">Clean air ducts allow older HVAC systems common in Hancock Park homes to operate more efficiently, potentially reducing energy costs.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-100 p-2 rounded-full mr-4">
                  <Check className="text-brand-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Extended System Lifespan</h3>
                  <p className="text-gray-600">Regular professional cleaning helps extend the life of vintage HVAC systems in historic Hancock Park properties, preserving original features.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-100 p-2 rounded-full mr-4">
                  <Check className="text-brand-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Healthier Living Environment</h3>
                  <p className="text-gray-600">Remove accumulated dust, allergens, and potential contaminants from older duct systems, creating a healthier environment in your Hancock Park home.</p>
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
              Request a Free Quote for Your Hancock Park Property
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Complete the form below to receive a customized, no-obligation quote for our specialized services in Hancock Park.
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

export default HancockPark;