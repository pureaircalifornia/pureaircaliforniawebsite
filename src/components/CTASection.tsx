
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ScrollReveal } from './ui/scroll-reveal';
import { Phone } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-16 bg-[#0A3D7C] text-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for Cleaner, Healthier Air?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Contact Pure Air California today for a free quote on our professional air duct and dryer vent cleaning services.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#0A3D7C]">
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-[#0A3D7C] hover:bg-gray-100">
                <a href="tel:+13105551234" className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (310) 555-1234
                </a>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTASection;
