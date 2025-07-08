import React from 'react';
import { motion } from 'framer-motion';

// Updated client list with available logo files
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
    logo: '/logo/VectorWiki-s2d88__united-states-postal-service.svg',
    alt: 'United States Postal Service logo',
  },
  {
    name: 'Warner Bros',
    logo: '/logo/VectorWiki-9Z0W8__the-wb-television-network.svg',
    alt: 'Warner Bros logo',
  },
  {
    name: 'YMCA',
    logo: '/logo/ymca.png',
    alt: 'YMCA logo',
  },
  {
    name: 'Taco Bell',
    logo: '/logo/VectorWiki-N35KO__taco-bell.svg',
    alt: 'Taco Bell logo',
  },
  {
    name: 'Pure Air California',
    logo: '/logo/pac-logo.png',
    alt: 'Pure Air California logo',
  },
  // Placeholder for remaining logos - will use name fallback when images fail to load
  {
    name: 'Beverly Hills Hotel',
    logo: '/placeholder.svg',
    alt: 'Beverly Hills Hotel logo',
  },
  {
    name: 'Kaiser Permanente',
    logo: '/placeholder.svg',
    alt: 'Kaiser Permanente logo',
  },
  {
    name: 'Cedars-Sinai',
    logo: '/placeholder.svg',
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