
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ScrollReveal } from './ui/scroll-reveal';

const ServiceArea = () => {
  const locations = [
    { name: 'Beverly Hills', link: '/locations/beverly-hills' },
    { name: 'Hollywood', link: '/locations/hollywood' },
    { name: 'Downtown LA', link: '/locations/downtown-los-angeles' },
    { name: 'Century City', link: '/locations/century-city' },
    { name: 'Malibu', link: '/locations/malibu' },
    { name: 'Sherman Oaks', link: '/locations/sherman-oaks' },
    { name: 'Studio City', link: '/locations/studio-city' },
    { name: 'Ventura', link: '/locations/ventura' },
    { name: 'West Hollywood', link: '/locations/west-hollywood' }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Service Area</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We proudly serve these areas in and around Los Angeles County.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {locations.map((location, index) => (
              <Link 
                key={index} 
                to={location.link}
                className="p-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-center transition-colors"
              >
                {location.name}
              </Link>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="text-center">
            <Button asChild variant="outline">
              <Link to="/locations">View All Service Locations</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ServiceArea;
