
import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import FeaturedServices from '@/components/FeaturedServices';
import TestimonialSection from '@/components/TestimonialSection';
import CTASection from '@/components/CTASection';
import ServiceArea from '@/components/ServiceArea';
import WhyChooseUs from '@/components/WhyChooseUs';
import FAQSection from '@/components/FAQSection';
import { Phone, Calendar, CheckCircle } from 'lucide-react';

// Renamed to HomePage to avoid case sensitivity issues
const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Pure Air California | Air Duct & Dryer Vent Cleaning</title>
        <meta
          name="description"
          content="Professional air duct and dryer vent cleaning services in Los Angeles. Improve your indoor air quality today!"
        />
      </Helmet>
      <NavBar />
      
      <main>
        <Hero />
        
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
        
        <FeaturedServices />
        <WhyChooseUs />
        <ServiceArea />
        <TestimonialSection />
        <FAQSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
