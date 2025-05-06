import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollIndicatorVisible(false);
      } else {
        setScrollIndicatorVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    const contentSection = document.querySelector('.section-padding');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="hero-section relative bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex items-center">
      {/* Parallax background effect */}
      <motion.div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1631392561719-acb5c75c3ad5?auto=format&fit=crop&q=80&w=1080&ixlib=rb-4.0.3')`,
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      {/* Darker overlay with premium gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-gray-900/70 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10 pt-24 pb-16 md:pt-32 md:pb-24">
        <motion.div 
          className="max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-4 font-heading drop-shadow-md">
              Breathe Cleaner, <span className="text-brand-400 relative">
                Live Better
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-1 bg-brand-400 rounded-full" 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                />
              </span>
            </h1>
          </motion.div>
          
          <motion.p 
            variants={itemVariants}  
            className="text-xl text-gray-100 mb-8 max-w-2xl drop-shadow"
          >
            Professional air duct cleaning and dryer vent services for residential and 
            commercial properties across Los Angeles. Experience the difference clean air makes.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button 
              size="lg" 
              asChild
              className="bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
            >
              <Link to="/quote" className="flex items-center gap-2">
                Get a Free Quote
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>
            </Button>
            <Button 
              size="lg"
              variant="outline" 
              asChild
              className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm font-medium rounded-md transition-all duration-300"
            >
              <Link to="/services">
                Explore Services
              </Link>
            </Button>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-12 flex flex-col sm:flex-row items-center gap-6 bg-white/10 backdrop-blur-lg p-6 rounded-xl max-w-xl border border-white/10 shadow-xl"
          >
            {[
              { number: "25K+", text: "Happy Customers" },
              { number: "30+", text: "Years of Experience" },
              { number: "100%", text: "Satisfaction Guaranteed" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="text-brand-400 text-4xl font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (index * 0.1), duration: 0.6 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-white">
                  {stat.text.split(' ').map((word, i) => (
                    <div key={i}>{word}</div>
                  ))}
                </div>
                {index < 2 && (
                  <div className="w-px h-12 bg-white/20 hidden sm:block ml-3"></div>
                )}
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {[
              "Improve air quality & reduce allergens",
              "NADCA certified professionals",
              "Energy-efficient HVAC performance",
              "Same-day service available"
            ].map((benefit, index) => (
              <motion.div 
                key={index}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + (index * 0.1), duration: 0.4 }}
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-400 flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
                <p className="text-white/90 text-sm">{benefit}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      {scrollIndicatorVisible && (
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="text-white/70 text-sm mb-2">Discover More</span>
          <ChevronDown className="text-white/70" size={24} />
        </motion.div>
      )}
    </div>
  );
};

export default Hero;
