import React from 'react';
import logos from '@/data/commercialWorkLogos.json';

const featuredClients = logos.slice(0, 6);

const TrustedBy = () => {
  return (
    <section className="py-10 bg-white border-b border-[#dce7ee]" aria-label="Selected commercial work">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-sm font-semibold text-[#536b79] mb-6 tracking-widest uppercase">
          Selected Commercial Work in Los Angeles
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {featuredClients.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-center h-14 px-4 py-2 transition-transform duration-200 hover:-translate-y-0.5"
              title={client.name}
            >
              <img
                src={client.src}
                alt={client.name}
                width={140}
                height={56}
                className="h-9 md:h-11 w-auto max-w-[140px] object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-[#536b79] mt-6">
          Past work at selected Los Angeles locations. Logos belong to their respective owners and do not imply a current or brand-wide partnership.
        </p>
      </div>
    </section>
  );
};

export default TrustedBy;
