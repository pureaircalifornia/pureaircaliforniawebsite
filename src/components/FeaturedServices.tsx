
import React from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from './ServiceCard';
import { ScrollReveal } from './ui/scroll-reveal';
import { Fan, Wind, Filter } from 'lucide-react';

const FeaturedServices = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Featured Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive air duct cleaning and ventilation solutions for both residential and commercial properties.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ScrollReveal animation="slideInLeft" delay={0.1}>
            <ServiceCard 
              title="Residential Air Duct Cleaning" 
              description="Improve your home's air quality with our thorough air duct cleaning services."
              link="/services/residential-air-duct-cleaning"
              icon={Fan}
            />
          </ScrollReveal>

          <ScrollReveal animation="fadeInUp" delay={0.2}>
            <ServiceCard 
              title="Residential Dryer Vent Cleaning" 
              description="Protect your home from fire hazards with our professional dryer vent cleaning."
              link="/services/residential-dryer-vent-cleaning"
              icon={Wind}
            />
          </ScrollReveal>

          <ScrollReveal animation="slideInRight" delay={0.3}>
            <ServiceCard 
              title="Commercial Air Duct Cleaning" 
              description="Ensure a healthy environment for your employees and customers."
              link="/services/commercial-air-duct-cleaning"
              icon={Filter}
            />
          </ScrollReveal>
        </div>

        <div className="text-center mt-12">
          <ScrollReveal>
            <Link to="/services" className="text-blue-600 hover:text-blue-700 font-medium">
              View All Services →
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
