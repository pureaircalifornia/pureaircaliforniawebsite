import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, Menu, X, ChevronDown, ChevronRight, Shield, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isIndustriesDropdownOpen, setIsIndustriesDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleIndustriesMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setIsIndustriesDropdownOpen(true);
    setIsServicesDropdownOpen(false);
  };

  const handleIndustriesMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsIndustriesDropdownOpen(false);
    }, 300); // 300ms delay before closing
    setDropdownTimeout(timeout);
  };

  const handleServicesMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setIsServicesDropdownOpen(true);
    setIsIndustriesDropdownOpen(false);
  };

  const handleServicesMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 300); // 300ms delay before closing
    setDropdownTimeout(timeout);
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
  };

  const handleDropdownMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsIndustriesDropdownOpen(false);
      setIsServicesDropdownOpen(false);
    }, 300);
    setDropdownTimeout(timeout);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId?: string, targetPath?: string) => {
    const currentPath = window.location.pathname;
    // If a sectionId is provided and we're on the correct page, scroll to section
    if (sectionId && currentPath === (targetPath || currentPath)) {
      e.preventDefault();
      scrollToSection(sectionId);
    }
    // If a sectionId is provided and we're NOT on the correct page, let the router handle navigation (do not preventDefault)
    // For all other links, let the router handle navigation
  };

  // Handle hash changes for direct URL navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        scrollToSection(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Animation variants
  const navbarVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { 
      x: "100%",
      opacity: 0.4
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: { 
      x: "100%",
      opacity: 0.4,
      transition: {
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const logoContainerVariants = {
    normal: {
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-gradient-to-b from-black/60 to-transparent py-4'}`}>
      <motion.div 
        className="container mx-auto flex items-center justify-between px-4"
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
      >
        <motion.div
          initial="normal"
          whileHover="hover"
          variants={logoContainerVariants}
        >
          <Link to="/" className="flex items-center gap-3" onClick={(e) => handleLinkClick(e)}>
            <div className={`p-1 rounded ${isScrolled ? 'bg-white' : 'bg-transparent'}`}>
              <img 
                src="/logo/pac-logo.png" 
                alt="Pure Air California Logo" 
                className={`h-8 w-auto ${isScrolled ? '' : 'filter brightness-0 invert'}`} 
                loading="eager"
              />
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {[
            { path: '/', label: 'Home', id: null }
          ].map((item, index) => (
            <motion.div key={item.path} variants={navItemVariants}>
              <Link 
                to={item.path} 
                className={`font-medium hover:text-brand-500 transition ${isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'}`} 
                onClick={(e) => handleLinkClick(e, item.id, item.path)}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
          
          {/* Services Dropdown */}
          <motion.div 
            className="relative"
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
            variants={navItemVariants}
          >
            <Link 
              to="/services"
              className={`font-medium hover:text-brand-500 transition flex items-center ${isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'}`}
            >
              Services
              <motion.div
                animate={{ rotate: isServicesDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m6 9 6 6 6-6"/></svg>
              </motion.div>
            </Link>
            
            <AnimatePresence>
              {isServicesDropdownOpen && (
                <motion.div 
                  className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 overflow-hidden"
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {[
                      { path: '/services/residential-air-duct-cleaning', label: 'Residential Air Duct Cleaning' },
                      { path: '/services/commercial-air-duct-cleaning', label: 'Commercial Air Duct Cleaning' },
                      { path: '/services/residential-dryer-vent-cleaning', label: 'Residential Dryer Vent Cleaning' },
                      { path: '/services/commercial-dryer-vent-cleaning', label: 'Commercial Dryer Vent Cleaning' },
                      { path: '/services/DryerVentMaintenanceProgram', label: 'Dryer Vent Maintenance Program' },
                      { path: '/services/residential-electrostatic-filter', label: 'Residential Electrostatic Filter' },
                      { path: '/services/commercial-electrostatic-filter', label: 'Commercial Electrostatic Filter' }
                    ].map((item, index) => (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: index * 0.05,
                          duration: 0.2
                        }}
                      >
                        <Link 
                          to={item.path} 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                          onClick={() => setIsServicesDropdownOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.div 
            className="relative"
            onMouseEnter={handleIndustriesMouseEnter}
            onMouseLeave={handleIndustriesMouseLeave}
            variants={navItemVariants}
          >
            <button className={`font-medium hover:text-brand-500 transition flex items-center ${isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'}`}>
              Industries
              <motion.div
                animate={{ rotate: isIndustriesDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m6 9 6 6 6-6"/></svg>
              </motion.div>
            </button>
            
            <AnimatePresence>
              {isIndustriesDropdownOpen && (
                <motion.div 
                  className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 overflow-hidden"
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {[
                      { path: '/industries/healthcare', label: 'Healthcare Facilities' },
                      { path: '/industries/hospitality', label: 'Hospitality' },
                      { path: '/industries/restaurants', label: 'Restaurants' },
                      { path: '/industries/education', label: 'Educational Institutions' },
                      { path: '/industries/retail', label: 'Retail Spaces' },
                      { path: '/industries/manufacturing', label: 'Manufacturing' }
                    ].map((item, index) => (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: index * 0.05,
                          duration: 0.2
                        }}
                      >
                        <Link 
                          to={item.path} 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                          onClick={() => setIsIndustriesDropdownOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.div variants={navItemVariants}>
            <Link 
              to="/locations" 
              className={`font-medium hover:text-brand-500 transition ${isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'}`} 
            >
              Locations
            </Link>
          </motion.div>
          
          {[
            { path: '/health-benefits', label: 'Health Benefits', id: 'health-benefits' },
            { path: '/about', label: 'About Us', id: 'about' },
            { path: '/contact', label: 'Contact', id: 'contact' }
          ].map((item, index) => (
            <motion.div key={item.path} variants={navItemVariants}>
              <Link 
                to={item.path} 
                className={`font-medium hover:text-brand-500 transition ${isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'}`} 
                onClick={(e) => handleLinkClick(e, item.id, item.path)}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.div className="hidden md:flex items-center space-x-4" variants={navItemVariants}>
          <a href="tel:2137924145" className="text-decoration-none">
            <Button variant="ghost" className="flex items-center gap-2 transition-all hover:scale-105">
              <Phone size={18} />
              <span className={isScrolled ? "text-gray-800" : "text-white drop-shadow-md"}>
                (213) 792-4145
              </span>
            </Button>
          </a>
          <Button 
            variant="default" 
            className="bg-brand-600 hover:bg-brand-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            asChild
          >
            <Link to="/quote">Get a Quote</Link>
          </Button>
        </motion.div>

        {/* Mobile menu button */}
        <motion.button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100/10 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.95 }}
        >
          {isMobileMenuOpen ? (
            <X className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
          ) : (
            <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
          )}
        </motion.button>
      </motion.div>

      {/* Enhanced Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className={`md:hidden fixed inset-0 bg-white z-40`}
            style={{ top: '64px' }}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="h-full overflow-y-auto pb-32">
              <nav className="px-4 py-2">
                <div className="space-y-1">
                  <Link 
                    to="/" 
                    className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  
                  {/* Services Dropdown */}
                  <div className="relative">
                    <button
                      className="w-full px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg flex items-center justify-between"
                      onClick={() => setOpenMobileSubmenu(openMobileSubmenu === 'services' ? null : 'services')}
                    >
                      Services
                      <motion.div
                        animate={{ rotate: openMobileSubmenu === 'services' ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="ml-2 h-5 w-5" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {openMobileSubmenu === 'services' && (
                        <motion.div 
                          className="pl-4 space-y-1 overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {[
                            ['Residential Air Duct Cleaning', '/services/residential-air-duct-cleaning'],
                            ['Commercial Air Duct Cleaning', '/services/commercial-air-duct-cleaning'],
                            ['Residential Dryer Vent Cleaning', '/services/residential-dryer-vent-cleaning'],
                            ['Commercial Dryer Vent Cleaning', '/services/commercial-dryer-vent-cleaning'],
                            ['Dryer Vent Maintenance Program', '/services/DryerVentMaintenanceProgram'],
                            ['Residential Electrostatic Filter', '/services/residential-electrostatic-filter'],
                            ['Commercial Electrostatic Filter', '/services/commercial-electrostatic-filter']
                          ].map(([name, path], index) => (
                            <motion.div
                              key={path}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05, duration: 0.2 }}
                            >
                              <Link
                                to={path}
                                className="flex items-center px-4 py-2 text-gray-600 hover:text-brand-600 hover:bg-gray-50 rounded-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <ChevronRight className="h-4 w-4 mr-2" />
                                {name}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <Link 
                    to="/locations" 
                    className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Locations
                  </Link>

                  {/* Industries Dropdown */}
                  <div className="relative">
                    <button
                      className="w-full px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg flex items-center justify-between"
                      onClick={() => setOpenMobileSubmenu(openMobileSubmenu === 'industries' ? null : 'industries')}
                    >
                      Industries
                      <motion.div
                        animate={{ rotate: openMobileSubmenu === 'industries' ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="ml-2 h-5 w-5" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {openMobileSubmenu === 'industries' && (
                        <motion.div 
                          className="pl-4 space-y-1 overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {[
                            ['Healthcare Facilities', '/industries/healthcare'],
                            ['Hospitality', '/industries/hospitality'],
                            ['Restaurants', '/industries/restaurants'],
                            ['Educational Institutions', '/industries/education'],
                            ['Retail Spaces', '/industries/retail'],
                            ['Manufacturing', '/industries/manufacturing']
                          ].map(([name, path], index) => (
                            <motion.div
                              key={path}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05, duration: 0.2 }}
                            >
                              <Link
                                to={path}
                                className="flex items-center px-4 py-2 text-gray-600 hover:text-brand-600 hover:bg-gray-50 rounded-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <ChevronRight className="h-4 w-4 mr-2" />
                                {name}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link 
                    to="/health-benefits" 
                    className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Health Benefits
                  </Link>
                  <Link 
                    to="/about" 
                    className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link 
                    to="/contact" 
                    className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 space-y-4 border-t border-gray-200 pt-6">
                  <Button className="w-full bg-brand-600 hover:bg-brand-700 text-lg py-6 shadow-md" asChild>
                    <Link to="/quote" onClick={() => setIsMobileMenuOpen(false)}>
                      Get a Free Quote
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full text-lg py-6 border-brand-600" asChild>
                    <a href="tel:2137924145">
                      <Phone size={20} className="mr-2" />
                      (213) 792-4145
                    </a>
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-1 text-brand-600" />
                    Licensed & Insured
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-brand-600" />
                    24/7 Service
                  </div>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>;
};
export default NavBar;
