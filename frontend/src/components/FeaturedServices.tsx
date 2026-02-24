
import React from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from './ServiceCard';
import { ScrollReveal } from './ui/scroll-reveal';
import { Fan, Wind, Filter } from 'lucide-react';

const FeaturedServices = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-50">
      <div className="absolute inset-0 bg-mesh opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-slate-900 tracking-tight">
              Premium <span className="text-sky-600">Health-First</span> Services
            </h2>
            <div className="w-24 h-1.5 bg-sky-600 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We leverage state-of-the-art technology and NADCA-certified protocols to ensure the highest standard of indoor air quality for your property.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ScrollReveal animation="slideInLeft" delay={0.1}>
            <ServiceCard
              title="Commercial Air Duct Cleaning"
              description="Ensure a healthy environment for your employees and customers."
              link="/services/commercial-air-duct-cleaning"
              icon={Filter}
              imageSrc="/images/hero/commercial-duct-v2.png"
            />
          </ScrollReveal>

          <ScrollReveal animation="fadeInUp" delay={0.2}>
            <ServiceCard
              title="Residential Air Duct Cleaning"
              description="Improve your home's air quality with our thorough air duct cleaning services."
              link="/services/residential-air-duct-cleaning"
              icon={Fan}
              imageSrc="/images/hero/residential-duct-v2.png"
            />
          </ScrollReveal>

          <ScrollReveal animation="slideInRight" delay={0.3}>
            <ServiceCard
              title="Residential Dryer Vent Cleaning"
              description="Protect your home from fire hazards with our professional dryer vent cleaning."
              link="/services/residential-dryer-vent-cleaning"
              icon={Wind}
              imageSrc="/images/hero/dryer-vent-v2.png"
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
