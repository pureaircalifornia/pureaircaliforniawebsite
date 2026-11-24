import React from 'react';
import { Link } from '@/components/CanonicalLink';
import { Button } from '@/components/ui/button';
import ResponsiveImage from '@/components/ResponsiveImage';
import { business } from '@/config/business';

const Hero = () => {
  return (
    <div className="relative text-white bg-[#061E3A]">
      <div className="absolute inset-0 z-0">
        <ResponsiveImage
          src="/images/coastal-v1/losAngeles-1440.webp"
          alt="Los Angeles skyline across Pure Air California's Greater Los Angeles service area"
          className="w-full h-full object-cover opacity-60"
          loading="eager"
          width={1440}
          height={960}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#061E3A]/85 via-[#0A3D7C]/65 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-24 md:py-36 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
            Air Duct &amp; Dryer Vent Cleaning in Los Angeles.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Inspection-led residential, HOA, and commercial ventilation cleaning with a clear written scope before work begins.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-[#0A3D7C] hover:bg-[#072c5a]">
              <Link to="/quote/#estimate-builder">Get a Free Estimate</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white/95 hover:bg-white/10">
              <a href={business.phoneHref}>Call {business.phone}</a>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-white/90">
            <div className="bg-white/10 backdrop-blur rounded-md px-3 py-2">Free Written Estimates</div>
            <div className="bg-white/10 backdrop-blur rounded-md px-3 py-2">Inspection-Led Scope</div>
            <div className="bg-white/10 backdrop-blur rounded-md px-3 py-2">Residential &amp; Commercial</div>
            <div className="bg-white/10 backdrop-blur rounded-md px-3 py-2">Greater Los Angeles</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
