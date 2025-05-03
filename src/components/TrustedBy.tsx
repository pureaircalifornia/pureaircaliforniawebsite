import React from 'react';

const clients = [
  {
    name: 'Ford',
    img: '/public/lovable-uploads/ford-logo.png',
    alt: 'Ford logo',
  },
  {
    name: 'Four Seasons',
    img: '/public/lovable-uploads/four-seasons-logo.png',
    alt: 'Four Seasons Hotels and Resorts logo',
  },
  {
    name: 'USPS',
    img: '/public/lovable-uploads/usps-logo.png',
    alt: 'United States Postal Service logo',
  },
  {
    name: 'Two Rodeo',
    img: '/public/lovable-uploads/two-rodeo-logo.png',
    alt: 'Two Rodeo logo',
  },
  {
    name: 'Warner Bros',
    img: '/public/lovable-uploads/warner-bros-logo.png',
    alt: 'Warner Bros logo',
  },
  {
    name: 'CBRE',
    img: '/public/lovable-uploads/cbre-logo.png',
    alt: 'CBRE logo',
  },
];

const TrustedBy = () => (
  <section className="py-8 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-center text-lg font-semibold text-gray-700 mb-6 tracking-wide uppercase">Trusted by Leading Brands</h2>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {clients.map((client) => (
          <img
            key={client.name}
            src={client.img}
            alt={client.alt}
            className="h-12 md:h-16 object-contain grayscale hover:grayscale-0 transition duration-300"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  </section>
);

export default TrustedBy; 