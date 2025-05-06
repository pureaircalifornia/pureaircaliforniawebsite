
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
      <Hero />
      <FeaturedServices />
      <WhyChooseUs />
      <ServiceArea />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;
