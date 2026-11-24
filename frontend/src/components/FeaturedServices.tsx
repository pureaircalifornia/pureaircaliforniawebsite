import React from 'react';
import { Link } from '@/components/CanonicalLink';
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
              Inspection-Led <span className="text-sky-600">Los Angeles</span> Air Care
            </h2>
            <div className="w-24 h-1.5 bg-sky-600 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Negative-pressure air duct cleaning, full-path dryer vent extraction, and commercial HVAC ventilation hygiene with clear written scopes confirmed before work starts.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ScrollReveal animation="slideInLeft" delay={0.1}>
            <ServiceCard
              title="Commercial Air Duct Cleaning"
              description="Building-specific HVAC ductwork, air handler, and exhaust cleaning coordinated around tenants and operating hours across LA County."
              link="/services/commercial-air-duct-cleaning/"
              icon={Filter}
              imageSrc="/images/pac/commercial.webp"
            />
          </ScrollReveal>

          <ScrollReveal animation="fadeInUp" delay={0.2}>
            <ServiceCard
              title="Residential Air Duct Cleaning"
              description="Inspection-led source removal for supply and return ducts, registers, and trunk lines in Los Angeles homes and estates. Starting at $299."
              link="/services/residential-air-duct-cleaning/"
              icon={Fan}
              imageSrc="/images/pac/residential.webp"
            />
          </ScrollReveal>

          <ScrollReveal animation="slideInRight" delay={0.3}>
            <ServiceCard
              title="Residential Dryer Vent Cleaning"
              description="Clear compacted lint from behind the dryer to the exterior wall or roof termination hood to help restore safe exhaust flow. Starting at $149."
              link="/services/residential-dryer-vent-cleaning/"
              icon={Wind}
              imageSrc="/images/pac/dryer.webp"
            />
          </ScrollReveal>
        </div>

        <div className="text-center mt-12">
          <ScrollReveal>
            <Link to="/services/" className="text-blue-600 hover:text-blue-700 font-medium">
              Explore All 12 Services →
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
