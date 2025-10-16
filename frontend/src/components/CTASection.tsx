
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ScrollReveal } from './ui/scroll-reveal';
import { Phone, ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#061E3A] to-[#0A3D7C] text-white shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-white/5"></div>
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-sm">Your Air, Cared For.</h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
              Friendly experts. Respect for your home. Clear communication. Schedule a visit when it feels right for you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button asChild size="xl" variant="white" className="font-medium shadow-md">
                <Link to="/quote" className="flex items-center">
                  Book a Friendly Consultation <ArrowRight className="ml-1" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="border-white text-white hover:bg-white/20 hover:text-white font-medium shadow-md">
                <a href="tel:+12137924145" className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (213) 792-4145
                </a>
              </Button>
            </div>
            <div className="mt-6 text-white/80 text-sm">No pressure, ever—just helpful guidance.</div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTASection;
