
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative bg-gray-900 text-white">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/gallery/jason-hawke-fu7pSuUa2PE-unsplash (Large).jpg"
          alt="Professional air duct cleaning services in California"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-4 py-24 md:py-36 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Breathe Easier with Professional Air Duct & Dryer Vent Cleaning
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Improve your indoor air quality and energy efficiency with Pure Air California's expert cleaning services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-[#0A3D7C] hover:bg-[#072c5a]">
              <Link to="/quote">Get a Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
