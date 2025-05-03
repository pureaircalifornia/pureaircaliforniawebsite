import React, { useState } from 'react';
import { MapPin, Clock, Car } from 'lucide-react';

const ServiceAreaMap = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const areas = [
    {
      name: 'Beverly Hills',
      travelTime: '15-20 minutes',
      description: 'Premium residential and commercial services',
      coordinates: { lat: 34.0736, lng: -118.4004 }
    },
    {
      name: 'Santa Monica',
      travelTime: '20-25 minutes',
      description: 'Beachfront properties and commercial spaces',
      coordinates: { lat: 34.0195, lng: -118.4912 }
    },
    {
      name: 'Malibu',
      travelTime: '30-35 minutes',
      description: 'Luxury homes and estates',
      coordinates: { lat: 34.0259, lng: -118.7798 }
    },
    {
      name: 'West Hollywood',
      travelTime: '10-15 minutes',
      description: 'Commercial and residential services',
      coordinates: { lat: 34.0900, lng: -118.3617 }
    },
    {
      name: 'Century City',
      travelTime: '15-20 minutes',
      description: 'Commercial office buildings and high-rises',
      coordinates: { lat: 34.0556, lng: -118.4174 }
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Service Area</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We proudly serve the greater Los Angeles area, with special focus on high-end residential
          and commercial properties. Our team is ready to provide exceptional service throughout
          these premium locations.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map Placeholder */}
          <div className="bg-gray-100 rounded-lg overflow-hidden h-[500px] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-brand-600 mx-auto mb-4" />
                <p className="text-gray-600">Interactive Map Coming Soon</p>
              </div>
            </div>
          </div>

          {/* Area Information */}
          <div className="space-y-6">
            {areas.map((area) => (
              <div
                key={area.name}
                className={`p-6 rounded-lg border ${
                  selectedArea === area.name
                    ? 'border-brand-600 bg-brand-50'
                    : 'border-gray-200 hover:border-brand-600 hover:bg-brand-50/50'
                } transition-colors duration-200 cursor-pointer`}
                onClick={() => setSelectedArea(area.name)}
              >
                <h3 className="text-xl font-semibold mb-2">{area.name}</h3>
                <p className="text-gray-600 mb-4">{area.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{area.travelTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Car className="w-4 h-4" />
                    <span>From our location</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Don't see your area? Contact us to check availability
          </p>
          <a
            href="tel:2137924145"
            className="inline-flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-full hover:bg-brand-700 transition-colors"
          >
            <MapPin className="w-5 h-5" />
            Check Your Area
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaMap; 