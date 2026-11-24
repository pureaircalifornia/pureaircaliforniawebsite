import React from 'react';
import { ClipboardCheck, MapPin, ShieldCheck, CheckCircle } from 'lucide-react';
import logos from '@/data/commercialWorkLogos.json';
import { business } from '@/config/business';

const featuredClients = logos.slice(0, 6);

const TrustBadges = () => {
  const standards = [
    { icon: ClipboardCheck, title: 'Free Written Estimates', subtitle: 'Clear scope agreed before work starts' },
    { icon: ShieldCheck, title: 'Inspection-Led Care', subtitle: 'Method matched to your duct system' },
    { icon: CheckCircle, title: 'Transparent Starting Rates', subtitle: 'Home ducts from $299 · Dryer vents from $149' },
    { icon: MapPin, title: 'Greater Los Angeles', subtitle: 'Homes, HOAs & commercial facilities' },
  ];

  return (
    <div className="bg-white py-10 border-b border-[#dce7ee]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {standards.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col items-center justify-center bg-[#f2f8fc] border border-[#dce7ee] p-5 rounded-xl text-center"
              >
                <Icon className="text-[#0a3d7c] mb-2" size={28} aria-hidden="true" />
                <span className="font-semibold text-[#123b56]">{item.title}</span>
                <span className="text-xs text-[#536b79] mt-1">{item.subtitle}</span>
              </div>
            );
          })}
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
          <p className="text-center text-xs text-[#536b79] mt-4">
            Past work at selected locations. Read customer reviews on our{' '}
            <a href={business.googleProfileUrl} target="_blank" rel="noreferrer" className="underline text-[#0a3d7c]">
              Google Business Profile
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
