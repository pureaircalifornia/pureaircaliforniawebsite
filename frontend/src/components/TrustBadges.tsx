import React from 'react';
import { Shield, Award, Star, CheckCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import ResponsiveImage from './ResponsiveImage';

const TrustBadges = () => {
  const clientLogos = [
    { name: 'Ford', logo: '/logo/VectorWiki-WfVlH__ford-logo-flat.svg', alt: 'Ford logo - Trusted client of Pure Air California' },
    { name: 'Four Seasons', logo: '/logo/VectorWiki-8ZQSp__four-seasons-hotels-and-resorts.svg', alt: 'Four Seasons Hotels and Resorts - Luxury hotel client' },
    { name: 'USPS', logo: '/logo/VectorWiki-ZUgI8__united-states-postal-service.svg', alt: 'United States Postal Service - Government facility client' },
    { name: 'Taco Bell', logo: '/logo/VectorWiki-N35KO__taco-bell.svg', alt: 'Taco Bell - Restaurant chain client' },
    { name: 'Warner Bros', logo: '/logo/VectorWiki-9Z0W8__the-wb-television-network.svg', alt: 'Warner Bros - Entertainment industry client' },
    { name: 'Panera Bread', logo: '/logo/Panera_Bread_wordmark.svg.png', alt: 'Panera Bread - Restaurant chain client' },
    { name: 'YMCA', logo: '/logo/ymca.png', alt: 'YMCA - Non-profit organization client' },
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-6">
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold text-brand-600 mb-2">184K+ Satisfied Customers</p>
            <p className="text-gray-600">Trusted by Los Angeles homeowners and businesses</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-green-600" size={24} />
              <span className="font-semibold text-green-700">100% Satisfaction Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500 fill-current" size={24} />
              <span className="font-semibold">4.9/5 Rating</span>
            </div>
          </div>
        </div>

        {/* Certifications and Trust Markers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            className="flex flex-col items-center justify-center bg-blue-50 border border-blue-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Award className="text-blue-600 mb-2" size={32} />
            <span className="text-center font-bold text-blue-900">NADCA Certified</span>
            <span className="text-center text-xs text-blue-700 mt-1">Air Duct Cleaners Association</span>
          </motion.div>

          <motion.div
            className="flex flex-col items-center justify-center bg-yellow-50 border border-yellow-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Star className="text-yellow-500 fill-yellow-500 mb-2" size={32} />
            <span className="text-center font-bold text-yellow-900">5-Star Rated</span>
            <span className="text-center text-xs text-yellow-700 mt-1">1,200+ Google Reviews</span>
          </motion.div>

          <motion.div
            className="flex flex-col items-center justify-center bg-green-50 border border-green-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Shield className="text-green-600 mb-2" size={32} />
            <span className="text-center font-bold text-green-900">Licensed & Insured</span>
            <span className="text-center text-xs text-green-700 mt-1">Full Coverage Protection</span>
          </motion.div>

          <motion.div
            className="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <CheckCircle className="text-gray-600 mb-2" size={32} />
            <span className="text-center font-bold text-gray-900">BBB Accredited</span>
            <span className="text-center text-xs text-gray-600 mt-1">A+ Rating</span>
          </motion.div>
        </div>

        {/* Client Logos */}
        <div className="pt-4 border-t border-gray-100">
          <p className="text-center text-sm font-medium text-gray-500 mb-4">Trusted by leading brands</p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {clientLogos.map((client, index) => (
              <motion.div
                key={index}
                className="h-12 grayscale hover:grayscale-0 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ResponsiveImage
                  src={client.logo}
                  alt={client.alt}
                  className="h-full w-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;