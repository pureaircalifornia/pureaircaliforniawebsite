import React from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Phone, Calendar, CheckCircle, ArrowRight, Shield, Award, Star, MapPin, Clock, Users } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { motion } from 'framer-motion';
import EnhancedTrustBadges from '@/components/EnhancedTrustBadges';
import EnhancedQuoteForm from '@/components/EnhancedQuoteForm';
import FeaturedServices from '@/components/FeaturedServices';
import ServiceArea from '@/components/ServiceArea';
import WhyChooseUs from '@/components/WhyChooseUs';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const EnhancedLanding = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Pure Air California - Professional Air Duct & Dryer Vent Cleaning in Los Angeles</title>
        <meta
          name="description"
          content="Professional air duct and dryer vent cleaning services in Los Angeles. NADCA certified, licensed & insured. Free estimates, same-day service available."
        />
        <meta name="keywords" content="air duct cleaning, dryer vent cleaning, Los Angeles, indoor air quality, HVAC cleaning, mold removal, allergen reduction" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Pure Air California - Air Duct & Dryer Vent Cleaning" />
        <meta property="og:description" content="Professional air duct and dryer vent cleaning services in Los Angeles. NADCA certified, licensed & insured." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/gallery/jason-hawke-fu7pSuUa2PE-unsplash.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pure Air California - Air Duct & Dryer Vent Cleaning" />
        <meta name="twitter:description" content="Professional air duct and dryer vent cleaning services in Los Angeles. NADCA certified, licensed & insured." />
        <meta name="twitter:image" content="/gallery/jason-hawke-fu7pSuUa2PE-unsplash.jpg" />
      </Helmet>
      
      <NavBar />
      <main>
        {/* Enhanced Hero Section */}
        <div className="relative bg-gray-900 text-white">
          {/* Background image with overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/gallery/jason-hawke-fu7pSuUa2PE-unsplash (Large).jpg"
              alt="Professional air duct cleaning services in California"
              className="w-full h-full object-cover opacity-40"
              loading="eager"
              width="1920"
              height="1080"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
          </div>

          {/* Hero content */}
          <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Breathe Easier with Professional Air Duct & Dryer Vent Cleaning
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl mb-8 text-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Improve your indoor air quality and energy efficiency with Pure Air California's expert cleaning services.
                </motion.p>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Button asChild size="lg" className="bg-[#0A3D7C] hover:bg-[#072c5a]">
                    <Link to="/quote">
                      <Phone className="mr-2" size={16} />
                      Schedule Your Free Estimate
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Link to="/services">
                      <ArrowRight className="mr-2" size={16} />
                      View All Services
                    </Link>
                  </Button>
                </motion.div>
                
                {/* Trust indicators */}
                <motion.div 
                  className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                    <Shield className="text-brand-400" size={20} />
                    <div>
                      <span className="text-sm font-medium">Licensed & Insured</span>
                      <p className="text-xs text-gray-400">Fully bonded and insured</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                    <Star className="text-yellow-400" size={20} />
                    <div>
                      <span className="text-sm font-medium">5-Star Service</span>
                      <p className="text-xs text-gray-400">1,200+ 5-star reviews</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                    <Award className="text-brand-400" size={20} />
                    <div>
                      <span className="text-sm font-medium">NADCA Certified</span>
                      <p className="text-xs text-gray-400">Professional certification</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                    <Clock className="text-brand-400" size={20} />
                    <div>
                      <span className="text-sm font-medium">Same-Day Service</span>
                      <p className="text-xs text-gray-400">Available in most areas</p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Hero Form */}
              <motion.div
                className="hidden lg:block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <EnhancedQuoteForm />
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Benefits Banner */}
        <div className="bg-[#0A3D7C] text-white py-4">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center">
              <div className="flex items-center justify-center gap-2">
                <Phone size={20} />
                <span>24/7 Emergency Service</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Calendar size={20} />
                <span>Flexible Scheduling</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle size={20} />
                <span>100% Satisfaction Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Trust Badges */}
        <EnhancedTrustBadges />
        
        {/* Mobile Quote Form (visible only on mobile) */}
        <div className="lg:hidden py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-2xl font-bold text-center mb-6">Get Your Free Quote</h2>
              <EnhancedQuoteForm />
            </ScrollReveal>
          </div>
        </div>
        
        <FeaturedServices />
        <WhyChooseUs />
        
        {/* Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Simple Process</h2>
              <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                Getting cleaner air in your home or business is easy with our straightforward process
              </p>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollReveal delay={0.1}>
                <div className="bg-white p-6 rounded-lg shadow-md relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-brand-600 text-white flex items-center justify-center text-xl font-bold">1</div>
                  <h3 className="text-xl font-semibold mb-3 mt-2">Schedule a Free Quote</h3>
                  <p className="text-gray-600 mb-4">Fill out our simple form or give us a call to schedule your free, no-obligation quote.</p>
                  <Button asChild variant="link" className="p-0 text-brand-600 font-medium hover:text-brand-800 transition-colors">
                    <Link to="/quote" className="inline-flex items-center">
                      Get Started <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2}>
                <div className="bg-white p-6 rounded-lg shadow-md relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-brand-600 text-white flex items-center justify-center text-xl font-bold">2</div>
                  <h3 className="text-xl font-semibold mb-3 mt-2">Professional Inspection</h3>
                  <p className="text-gray-600 mb-4">Our certified technicians will inspect your system and provide a detailed assessment and quote.</p>
                  <Button asChild variant="link" className="p-0 text-brand-600 font-medium hover:text-brand-800 transition-colors">
                    <Link to="/services" className="inline-flex items-center">
                      Our Approach <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.3}>
                <div className="bg-white p-6 rounded-lg shadow-md relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-brand-600 text-white flex items-center justify-center text-xl font-bold">3</div>
                  <h3 className="text-xl font-semibold mb-3 mt-2">Thorough Cleaning</h3>
                  <p className="text-gray-600 mb-4">We'll perform a comprehensive cleaning of your system using state-of-the-art equipment and techniques.</p>
                  <Button asChild variant="link" className="p-0 text-brand-600 font-medium hover:text-brand-800 transition-colors">
                    <Link to="/services" className="inline-flex items-center">
                      Our Services <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
        
        <ServiceArea />
        <FAQSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default EnhancedLanding;