
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

        {/* Simple before/after preview with placeholders to convey results */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">See the Difference</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Clean, healthy vents help you breathe easy. Here’s a sample before and after to preview the layout.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Before</h3>
                <img src="/images/before-after/placeholder-before.jpg" alt="Before placeholder" className="w-full h-auto rounded" />
              </div>
              <div className="bg-gray-50 border rounded-lg p-4">
                <h3 className="font-semibold mb-2">After</h3>
                <img src="/images/before-after/placeholder-after.jpg" alt="After placeholder" className="w-full h-auto rounded" />
              </div>
            </div>
          </div>
        </section>
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
