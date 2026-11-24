import React from 'react';
import { ClipboardCheck, ShieldCheck, MapPin, CheckCircle } from 'lucide-react';
import { Link } from '@/components/CanonicalLink';
import logos from '@/data/commercialWorkLogos.json';
import { business } from '@/config/business';

const featuredClients = logos.slice(0, 6);

const EnhancedTrustBadges = () => {
  const standards = [
    {
      icon: ClipboardCheck,
      text: 'Free Written Estimates',
      description: 'Clear scope and confirmed pricing agreed in writing before work begins.',
    },
    {
      icon: ShieldCheck,
      text: 'Inspection-Led Process',
      description: 'Every visit starts by checking accessible ductwork, venting, and site access.',
    },
    {
      icon: CheckCircle,
      text: 'Transparent Starting Prices',
      description: 'Residential air duct cleaning from $299; dryer vent cleaning from $149.',
    },
    {
      icon: MapPin,
      text: 'Greater Los Angeles Team',
      description: 'Serving LA homes, estates, HOAs, apartments, and commercial facilities.',
    },
  ];

  return (
    <div className="bg-white py-10 border-b border-[#dce7ee]">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-center text-lg font-semibold text-[#123b56] mb-5">
            How Pure Air California Approaches Every Visit
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {standards.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.text}
                  className="flex flex-col items-center bg-[#f2f8fc] border border-[#dce7ee] p-5 rounded-xl text-center transition-shadow hover:shadow-md"
                >
                  <Icon className="text-[#0a3d7c] mb-2" size={28} aria-hidden="true" />
                  <span className="font-semibold text-[#123b56] mb-1">{item.text}</span>
                  <p className="text-xs text-[#536b79]">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-5 border-t border-[#dce7ee]">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#536b79] mb-4">
            Selected commercial locations served
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {featuredClients.map((client) => (
              <div key={client.name} className="h-12 flex items-center">
                <img
                  src={client.src}
                  alt={client.name}
                  width={120}
                  height={48}
                  className="h-full w-auto max-w-[130px] object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-5 text-xs text-[#536b79] flex flex-wrap justify-center gap-4">
            <a href={business.googleProfileUrl} target="_blank" rel="noreferrer" className="underline text-[#0a3d7c] font-medium">
              Read our Google reviews
            </a>
            <Link to="/project-stories/" className="underline text-[#0a3d7c] font-medium">
              Explore project stories
            </Link>
            <Link to="/pricing/" className="underline text-[#0a3d7c] font-medium">
              View pricing guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTrustBadges;
