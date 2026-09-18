
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ScrollReveal } from './ui/scroll-reveal';

const ServiceArea = () => {
  const locations = [
    { name: 'Beverly Hills', link: '/locations/beverly-hills' },
    { name: 'Hollywood', link: '/locations/hollywood' },
    { name: 'Downtown LA', link: '/locations/downtown-la' },
    { name: 'Century City', link: '/locations/century-city' },
    { name: 'Malibu', link: '/locations/malibu' },
    { name: 'Sherman Oaks', link: '/locations/sherman-oaks' },
    { name: 'Studio City', link: '/locations/studio-city' },
    { name: 'Ventura', link: '/locations/ventura' },
    { name: 'West Hollywood', link: '/locations/west-hollywood' }
  ];

  return (
    <section className="py-16 bg-slate-50 border-y border-gray-200">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Serving Greater Los Angeles</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From the Valley to the Westside, Pure Air California provides top-rated air duct and dryer vent cleaning.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          {/* High-Value SEO Hub Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
            <Link to="/locations/los-angeles" className="bg-white rounded-2xl p-6 border-2 border-brand-500 hover:shadow-lg transition-shadow group flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-brand-600 transition-colors">Los Angeles Air Duct Cleaning</h3>
                <p className="text-sm text-slate-500">Read our complete LA service guide and local expertise.</p>
              </div>
              <span className="bg-brand-50 text-brand-700 p-3 rounded-full group-hover:bg-brand-600 group-hover:text-white transition-colors">→</span>
            </Link>
            <Link to="/pricing" className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-sky-500 hover:shadow-lg transition-all group flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-sky-600 transition-colors">View Our LA Pricing</h3>
                <p className="text-sm text-slate-500">Transparent costs for residential and commercial cleaning.</p>
              </div>
              <span className="bg-gray-50 text-gray-400 p-3 rounded-full group-hover:bg-sky-500 group-hover:text-white transition-colors">→</span>
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <h3 className="text-center text-lg font-bold text-slate-700 mb-6">Popular Local Areas</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 max-w-5xl mx-auto">
            {locations.map((location, index) => (
              <Link 
                key={index} 
                to={location.link}
                className="p-4 bg-white border border-gray-100 hover:border-brand-300 hover:bg-brand-50 rounded-xl text-center transition-all shadow-sm group"
              >
                <span className="text-slate-700 group-hover:text-brand-700 font-medium">{location.name}</span>
              </Link>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="text-center">
            <Button asChild variant="outline" className="border-brand-200 text-brand-700 hover:bg-brand-50">
              <Link to="/locations">View All Service Locations</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ServiceArea;
