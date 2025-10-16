
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ResponsiveImage from '@/components/ResponsiveImage';

const Hero = () => {
  return (
    <div className="relative text-white bg-[#061E3A]">
      {/* Soft trust-focused background */}
      <div className="absolute inset-0 z-0">
        <ResponsiveImage
          src="/images/hero/placeholder.jpg"
          alt="Calm blue background representing clean, healthy air"
          className="w-full h-full opacity-35"
          loading="eager"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#061E3A]/80 via-[#0A3D7C]/60 to-transparent"></div>
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-4 py-24 md:py-36 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Feel Safe. Breathe Easy.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            NADCA-certified technicians, hospital-grade standards, and transparent care—so your family and customers can relax.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-[#0A3D7C] hover:bg-[#072c5a]">
              <Link to="/quote">Book a Friendly Consultation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white/95 hover:bg-white/10">
              <Link to="/services">See How We Care</Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-white/90">
            <div className="bg-white/10 backdrop-blur rounded-md px-3 py-2">NADCA Certified</div>
            <div className="bg-white/10 backdrop-blur rounded-md px-3 py-2">Licensed & Insured</div>
            <div className="bg-white/10 backdrop-blur rounded-md px-3 py-2">EPA-Registered Sanitizers</div>
            <div className="bg-white/10 backdrop-blur rounded-md px-3 py-2">5-Star Reviews</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
