import React from 'react';

// Official SVGs sourced from https://vectorwiki.com/
const clients = [
  {
    name: 'Ford',
    logo: '/logo/VectorWiki-WfVlH__ford-logo-flat.svg',
    alt: 'Ford logo',
  },
  {
    name: 'Four Seasons',
    logo: '/logo/VectorWiki-8ZQSp__four-seasons-hotels-and-resorts.svg',
    alt: 'Four Seasons Hotels and Resorts logo',
  },
  {
    name: 'USPS',
    logo: '/logo/VectorWiki-ZUgI8__united-states-postal-service.svg',
    alt: 'United States Postal Service logo',
  },
  {
    name: 'Two Rodeo',
    logo: '/logo/VectorWiki-N35KO__taco-bell.svg', // Placeholder, replace with correct logo if available
    alt: 'Two Rodeo logo',
  },
  {
    name: 'Warner Bros',
    logo: '/logo/VectorWiki-9Z0W8__the-wb-television-network.svg',
    alt: 'Warner Bros logo',
  },
  {
    name: 'CBRE',
    logo: '/logo/VectorWiki-s2d88__united-states-postal-service.svg', // Placeholder, replace with correct logo if available
    alt: 'CBRE logo',
  },
];

const TrustedBy = () => (
  <section className="py-8 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-center text-lg font-semibold text-gray-700 mb-6 tracking-wide uppercase">Trusted by Leading Brands</h2>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {clients.map((client) => (
          <span
            key={client.name}
            className="flex items-center h-14 grayscale hover:grayscale-0 transition-all duration-300 bg-white rounded-lg px-4 py-2 shadow-sm"
            aria-label={client.alt}
            title={client.name}
            tabIndex={0}
          >
            <img src={client.logo} alt={client.alt} className="h-10 md:h-14 w-auto mx-auto" loading="lazy" />
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default TrustedBy; 