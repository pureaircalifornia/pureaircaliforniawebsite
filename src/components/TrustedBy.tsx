import React from 'react';
import { motion } from 'framer-motion';

// Official SVGs sourced from company websites or logo databases
const clients = [
  {
    name: 'Ford',
    logo: '/logo/ford-logo.svg',
    alt: 'Ford logo',
  },
  {
    name: 'Four Seasons',
    logo: '/logo/four-seasons-logo.svg',
    alt: 'Four Seasons Hotels and Resorts logo',
  },
  {
    name: 'USPS',
    logo: '/logo/usps-logo.svg',
    alt: 'United States Postal Service logo',
  },
  {
    name: 'Warner Bros',
    logo: '/logo/warner-bros-logo.svg',
    alt: 'Warner Bros logo',
  },
  {
    name: 'CBRE',
    logo: '/logo/cbre-logo.svg',
    alt: 'CBRE logo',
  },
  {
    name: 'Hilton',
    logo: '/logo/hilton-logo.svg',
    alt: 'Hilton Hotels logo',
  },
  {
    name: 'UCLA',
    logo: '/logo/ucla-logo.svg',
    alt: 'UCLA logo',
  },
  {
    name: 'Beverly Hills Hotel',
    logo: '/logo/beverly-hills-hotel-logo.svg',
    alt: 'Beverly Hills Hotel logo',
  },
  {
    name: 'Kaiser Permanente',
    logo: '/logo/kaiser-permanente-logo.svg',
    alt: 'Kaiser Permanente logo',
  },
  {
    name: 'Cedars-Sinai',
    logo: '/logo/cedars-sinai-logo.svg',
    alt: 'Cedars-Sinai Medical Center logo',
  }
];

const TrustedBy = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-8 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-lg font-semibold text-gray-700 mb-6 tracking-wide uppercase">Trusted by Leading Brands</h2>
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {clients.map((client) => (
            <motion.div
              key={client.name}
              className="flex items-center justify-center h-14 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
              variants={logoVariants}
              whileHover={{ scale: 1.1 }}
            >
              <div
                className="flex items-center justify-center h-full px-4 py-2"
                aria-label={client.alt}
                title={client.name}
                tabIndex={0}
              >
                <img 
                  src={client.logo} 
                  alt={client.alt} 
                  className="h-8 md:h-10 w-auto mx-auto object-contain" 
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to a colored div with text if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `<div class="h-8 md:h-10 w-24 bg-gray-100 rounded flex items-center justify-center text-xs font-medium text-gray-500">${client.name}</div>`;
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
        <p className="text-center text-sm text-gray-500 mt-6">
          Serving Southern California's premier residential and commercial properties since 1993
        </p>
      </div>
    </section>
  );
};

export default TrustedBy; 