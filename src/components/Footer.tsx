import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Clock, Shield, Award, Star, ChevronRight, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer } from '@/components/ui/scroll-reveal';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [footerRef, isFooterInView] = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    once: true,
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1000);
  };

  const socialLinks = [
    { name: 'Facebook', icon: <Facebook className="h-5 w-5" />, url: '#' },
    { name: 'Instagram', icon: <Instagram className="h-5 w-5" />, url: '#' },
    { name: 'Twitter', icon: <Twitter className="h-5 w-5" />, url: '#' },
    { name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, url: '#' }
  ];

  const quickLinks = [
    { name: 'Services', path: '/services' },
    { name: 'Service Areas', path: '/locations' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Get a Quote', path: '/quote' },
    { name: 'Blog', path: '/blog' }
  ];

  const serviceLinks = [
    { name: 'Residential Air Duct Cleaning', path: '/services/residential-air-duct-cleaning' },
    { name: 'Commercial Air Duct Cleaning', path: '/services/commercial-air-duct-cleaning' },
    { name: 'Residential Dryer Vent Cleaning', path: '/services/residential-dryer-vent-cleaning' },
    { name: 'Commercial Dryer Vent Cleaning', path: '/services/commercial-dryer-vent-cleaning' },
    { name: 'Residential Electrostatic Filter', path: '/services/residential-electrostatic-filter' },
    { name: 'Commercial Electrostatic Filter', path: '/services/commercial-electrostatic-filter' }
  ];

  const trustBadges = [
    { name: 'Licensed & Insured', icon: <Shield className="h-5 w-5" /> },
    { name: 'NADCA Certified', icon: <Award className="h-5 w-5" /> },
    { name: '5-Star Rated Service', icon: <Star className="h-5 w-5" /> },
    { name: '24/7 Emergency Service', icon: <Clock className="h-5 w-5" /> }
  ];

  // Wave SVG for the footer top
  const WavePattern = () => (
    <div className="absolute top-0 left-0 right-0 transform -translate-y-full h-16 overflow-hidden">
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 25H48C96 25 192 25 288 39.2C384 53.3 480 81.7 576 81.7C672 81.7 768 53.3 864 46.7C960 39.2 1056 53.3 1152 60C1248 67.5 1344 67.5 1392 67.5H1440V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V25Z"
          fill="#111827" // bg-gray-900
        />
      </svg>
    </div>
  );

  return (
    <footer className="bg-gray-900 text-gray-300 relative" ref={footerRef}>
      <WavePattern />
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-brand-500/10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: Math.random() * 5 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <ScrollReveal animation="fadeInUp" delay={0.1}>
            <div>
              <div className="flex items-center gap-2 mb-6">
                <img src="/logo/pac-logo.png" alt="Pure Air California" className="h-8 brightness-200" />
              </div>
              <div className="space-y-4">
                <motion.p 
                  className="flex items-center gap-3"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin className="h-5 w-5 text-brand-500" />
                  <span>1550 N Poinsettia Pl, Los Angeles, CA 90046</span>
                </motion.p>
                <motion.p 
                  className="flex items-center gap-3"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <Phone className="h-5 w-5 text-brand-500" />
                  <a href="tel:2137924145" className="hover:text-white transition-colors">(213) 792-4145</a>
                </motion.p>
                <motion.p 
                  className="flex items-center gap-3"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail className="h-5 w-5 text-brand-500" />
                  <a href="mailto:info@pureaircalifornia.com" className="hover:text-white transition-colors">
                    info@pureaircalifornia.com
                  </a>
                </motion.p>
                <motion.p 
                  className="flex items-center gap-3"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <Clock className="h-5 w-5 text-brand-500" />
                  <span>Mon-Sat: 8AM - 6PM</span>
                </motion.p>
              </div>
            </div>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal animation="fadeInUp" delay={0.2}>
            <div>
              <h3 className="text-white font-bold text-xl mb-5 border-b border-gray-800 pb-2">Quick Links</h3>
              <StaggerContainer className="space-y-3" staggerDelay={0.05}>
                {quickLinks.map((link, index) => (
                  <motion.div key={index} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link 
                      to={link.path} 
                      className="flex items-center gap-2 hover:text-white group transition-all duration-300"
                    >
                      <ChevronRight size={14} className="text-brand-500 transform group-hover:translate-x-1 transition-transform" />
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>

          {/* Services */}
          <ScrollReveal animation="fadeInUp" delay={0.3}>
            <div>
              <h3 className="text-white font-bold text-xl mb-5 border-b border-gray-800 pb-2">Our Services</h3>
              <StaggerContainer className="space-y-3" staggerDelay={0.05}>
                {serviceLinks.map((link, index) => (
                  <motion.div key={index} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link 
                      to={link.path} 
                      className="flex items-center gap-2 hover:text-white group transition-all duration-300"
                    >
                      <ChevronRight size={14} className="text-brand-500 transform group-hover:translate-x-1 transition-transform" />
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>

          {/* Newsletter */}
          <ScrollReveal animation="fadeInUp" delay={0.4}>
            <div className="relative">
              <h3 className="text-white font-bold text-xl mb-5 border-b border-gray-800 pb-2">Stay Updated</h3>
              <p className="mb-4">Subscribe to our newsletter for tips, news, and special offers.</p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 pr-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Mail size={16} />
                  </div>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full bg-brand-600 hover:bg-brand-700 transition-all duration-300 shadow-lg hover:shadow-brand-600/20"
                    disabled={isSubmitting || isSubmitted}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Subscribing...</span>
                      </div>
                    ) : isSubmitted ? (
                      <div className="flex items-center gap-2">
                        <Check size={16} />
                        <span>Thank you!</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Subscribe</span>
                        <ArrowRight size={16} />
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* Social Links */}
              <div className="mt-8">
                <p className="mb-3 text-sm">Follow us on social media:</p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-600/30 transition-all duration-300"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + (index * 0.1) }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Trust Badges */}
        <ScrollReveal animation="fadeIn" delay={0.6}>
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {trustBadges.map((badge, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.7 + (index * 0.1) } }}
                >
                  <div className="text-brand-500">{badge.icon}</div>
                  <span>{badge.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-5 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <motion.div 
              className="mb-4 md:mb-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              © {new Date().getFullYear()} Pure Air California. All rights reserved.
            </motion.div>
            
            <motion.div 
              className="flex gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((item, index) => (
                <Link 
                  key={index}
                  to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="hover:text-white text-gray-400 transition-colors duration-300"
                >
                  {item}
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
