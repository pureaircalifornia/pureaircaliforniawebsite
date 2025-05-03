import React from 'react';
import { Shield, Award, Star, CheckCircle } from 'lucide-react';

const TrustBadges = () => {
  const clientLogos = [
    { name: 'Ford', logo: '/logo/VectorWiki-WfVlH__ford-logo-flat.svg', alt: 'Ford logo' },
    { name: 'Four Seasons', logo: '/logo/VectorWiki-8ZQSp__four-seasons-hotels-and-resorts.svg', alt: 'Four Seasons Hotels and Resorts logo' },
    { name: 'USPS', logo: '/logo/VectorWiki-ZUgI8__united-states-postal-service.svg', alt: 'United States Postal Service logo' },
    { name: 'Two Rodeo', logo: '/logo/VectorWiki-N35KO__taco-bell.svg', alt: 'Two Rodeo logo' },
    { name: 'Warner Bros', logo: '/logo/VectorWiki-9Z0W8__the-wb-television-network.svg', alt: 'Warner Bros logo' },
    { name: 'CBRE', logo: '/logo/VectorWiki-s2d88__united-states-postal-service.svg', alt: 'CBRE logo' },
  ];

  const certifications = [
    { icon: Shield, text: 'Licensed & Insured' },
    { icon: Award, text: 'NADCA Certified' },
    { icon: Star, text: '5-Star Rated on Google' },
    { icon: CheckCircle, text: 'BBB Accredited Business' },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Trusted By Industry Leaders</h2>
        
        {/* Client Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {clientLogos.map((client) => (
            <div key={client.name} className="flex items-center justify-center">
              <img
                src={client.logo}
                alt={client.alt}
                className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {certifications.map((cert) => (
            <div key={cert.text} className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm">
              <cert.icon className="h-8 w-8 text-brand-600 mb-3" />
              <span className="font-medium text-gray-900">{cert.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges; 