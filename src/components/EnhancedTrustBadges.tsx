import React from 'react';
import { Shield, Award, Star, CheckCircle, ShieldCheck, Users, ThumbsUp, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const EnhancedTrustBadges = () => {
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
    { icon: Shield, text: 'Licensed & Insured', description: 'Fully licensed and insured for your protection' },
    { icon: Award, text: 'NADCA Certified', description: 'National Air Duct Cleaners Association certified technicians' },
    { icon: BadgeCheck, text: 'EPA Approved', description: 'Using EPA approved cleaning products and methods' },
    { icon: Star, text: '5-Star Rated', description: '4.9/5 average rating across 1,200+ reviews' },
  ];

  const testimonialHighlights = [
    { name: 'Sarah J.', location: 'Beverly Hills', text: 'Incredible service, immediate improvement in air quality!', rating: 5 },
    { name: 'Michael R.', location: 'Sherman Oaks', text: 'Professional team, efficient service, cleaner air!', rating: 5 },
    { name: 'Jennifer T.', location: 'Malibu', text: 'Amazed at how much dust they removed from our ducts!', rating: 5 },
  ];

  const trustMetrics = [
    { icon: Users, value: '138K+', label: 'Satisfied Customers' },
    { icon: CheckCircle, value: '15+', label: 'Years Experience' },
    { icon: ThumbsUp, value: '99%', label: 'Customer Satisfaction' },
  ];

  return (
    <div className="bg-white py-8 border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* Trust Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {trustMetrics.map((metric, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <metric.icon className="text-brand-600 mb-2" size={28} />
              <span className="text-3xl font-bold text-brand-700">{metric.value}</span>
              <span className="text-gray-600">{metric.label}</span>
            </motion.div>
          ))}
        </div>
        
        {/* Certifications with descriptions */}
        <div className="mb-8">
          <h3 className="text-center text-lg font-semibold text-gray-800 mb-4">Industry Certifications & Standards</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <cert.icon className="text-brand-600 mb-2" size={28} />
                <span className="text-center font-medium text-gray-800 mb-1">{cert.text}</span>
                <p className="text-center text-xs text-gray-500">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Testimonial Highlights */}
        <div className="mb-8">
          <h3 className="text-center text-lg font-semibold text-gray-800 mb-4">What Our Customers Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonialHighlights.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex mb-2">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-2">"{testimonial.text}"</p>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{testimonial.name}</span> • {testimonial.location}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-3">
            <a href="/testimonials" className="text-brand-600 hover:text-brand-700 text-sm font-medium inline-flex items-center">
              Read more customer reviews
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        
        {/* Satisfaction Guarantee */}
        <div className="flex justify-center mb-8">
          <motion.div 
            className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-100 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <ShieldCheck className="text-green-600" size={24} />
            <span className="font-semibold text-green-700">100% Satisfaction Guarantee</span>
          </motion.div>
        </div>
        
        {/* Client Logos */}
        <div className="pt-4 border-t border-gray-100">
          <p className="text-center text-sm font-medium text-gray-500 mb-4">Trusted by leading brands and organizations</p>
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
                <img 
                  src={client.logo} 
                  alt={client.alt} 
                  className="h-full w-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Security Badges */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
          <motion.div 
            className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded text-xs font-medium text-gray-600 border border-gray-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Shield size={14} className="text-gray-500" />
            <span>Secure Payments</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded text-xs font-medium text-gray-600 border border-gray-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <CheckCircle size={14} className="text-gray-500" />
            <span>Privacy Protected</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded text-xs font-medium text-gray-600 border border-gray-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Award size={14} className="text-gray-500" />
            <span>BBB Accredited</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTrustBadges;