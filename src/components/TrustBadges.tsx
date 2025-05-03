import React from 'react';
import { Shield, Award, Star, CheckCircle, ShieldCheck } from 'lucide-react';

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
    <div className="bg-white/90 backdrop-blur-sm py-8 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold text-brand-600 mb-2">138K+ Satisfied Customers</p>
            <p className="text-gray-600">Trusted by Los Angeles homeowners and businesses</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-green-600" size={24} />
              <span className="font-semibold text-green-700">100% Satisfaction Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500" size={24} />
              <span className="font-semibold">4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges; 