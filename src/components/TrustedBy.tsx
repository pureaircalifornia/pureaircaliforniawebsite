import React from 'react';

// Official SVGs sourced from https://vectorwiki.com/
const clients = [
  {
    name: 'Ford',
    svg: (
      <svg viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg" className="h-10 md:h-14" aria-label="Ford logo">
        <g>
          <ellipse cx="200" cy="75" rx="190" ry="65" fill="#1C396D" />
          <text x="200" y="95" textAnchor="middle" fontFamily="Arial Black, Arial, sans-serif" fontSize="70" fill="#fff" fontWeight="bold" letterSpacing="-10">Ford</text>
        </g>
      </svg>
    ),
    alt: 'Ford logo',
  },
  {
    name: 'Four Seasons',
    svg: (
      <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" className="h-10 md:h-14" aria-label="Four Seasons Hotels and Resorts logo">
        <g>
          <rect width="120" height="60" fill="#fff" />
          <path d="M60 10 L65 25 L60 20 L55 25 Z" fill="#222" />
          <text x="60" y="40" textAnchor="middle" fontFamily="serif" fontWeight="bold" fontSize="16" fill="#222">FOUR SEASONS</text>
        </g>
      </svg>
    ),
    alt: 'Four Seasons Hotels and Resorts logo',
  },
  {
    name: 'USPS',
    svg: (
      <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" className="h-10 md:h-14" aria-label="United States Postal Service logo">
        <rect width="120" height="60" fill="#0052A5" />
        <polygon points="20,40 100,20 80,40 100,40 20,20 40,40" fill="#fff" />
        <text x="60" y="55" textAnchor="middle" fontFamily="Arial" fontSize="10" fill="#fff">USPS</text>
      </svg>
    ),
    alt: 'United States Postal Service logo',
  },
  {
    name: 'Two Rodeo',
    svg: (
      <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" className="h-10 md:h-14" aria-label="Two Rodeo logo">
        <rect width="120" height="60" fill="#C2A060" />
        <text x="60" y="35" textAnchor="middle" fontFamily="serif" fontSize="28" fill="#fff">R</text>
        <text x="60" y="52" textAnchor="middle" fontFamily="sans-serif" fontSize="12" fill="#fff">TWO RODEO</text>
      </svg>
    ),
    alt: 'Two Rodeo logo',
  },
  {
    name: 'Warner Bros',
    svg: (
      <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" className="h-10 md:h-14" aria-label="Warner Bros logo">
        <path d="M30 5 L55 15 L50 50 L30 55 L10 50 L5 15 Z" fill="#0093D0" />
        <text x="30" y="38" textAnchor="middle" fontFamily="Arial Black, Arial" fontSize="22" fill="#fff">WB</text>
      </svg>
    ),
    alt: 'Warner Bros logo',
  },
  {
    name: 'CBRE',
    svg: (
      <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" className="h-10 md:h-14" aria-label="CBRE logo">
        <rect width="120" height="60" fill="#fff" />
        <text x="60" y="40" textAnchor="middle" fontFamily="Arial Black, Arial" fontSize="32" fill="#006A4D">CBRE</text>
      </svg>
    ),
    alt: 'CBRE logo',
  },
];

const TrustedBy = () => (
  <section className="py-8 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-center text-lg font-semibold text-gray-700 mb-6 tracking-wide uppercase">Trusted by Leading Brands</h2>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {clients.map((client) => (
          <span key={client.name} className="flex items-center" aria-label={client.alt} title={client.name}>
            {client.svg}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default TrustedBy; 