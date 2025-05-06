
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeaturedServices from '@/components/FeaturedServices';
import WhyChooseUs from '@/components/WhyChooseUs';
import TestimonialSection from '@/components/TestimonialSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import ServiceArea from '@/components/ServiceArea';
import BlogSection from '@/components/BlogSection';
import TrustedBy from '@/components/TrustedBy';
import { Helmet } from 'react-helmet';
import { Phone, Calendar, CheckCircle } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Pure Air California | Air Duct & Dryer Vent Cleaning Services</title>
        <meta
          name="description"
          content="Expert air duct and dryer vent cleaning services in Los Angeles and Southern California. Improve air quality & reduce energy costs."
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
        <TrustedBy />
        <TestimonialSection />
        <ServiceArea />
        <FAQSection />
        <BlogSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
