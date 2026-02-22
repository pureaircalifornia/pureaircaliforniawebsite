import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ChevronDown, ChevronRight, Shield, Clock, MapPin, Star } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import ResponsiveImage from './ResponsiveImage';
import { trackPhoneCall, trackCTAClick } from '@/utils/analytics';

interface NavBarProps {
  alwaysOpaque?: boolean;
}

const NavBar = ({ alwaysOpaque = false }: NavBarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isOpaque = alwaysOpaque || isScrolled;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isIndustriesDropdownOpen, setIsIndustriesDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleDropdownHover = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    isOpen: boolean
  ) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    if (isOpen) {
      // Close other dropdowns
      if (setter === setIsIndustriesDropdownOpen) setIsServicesDropdownOpen(false);
      if (setter === setIsServicesDropdownOpen) setIsIndustriesDropdownOpen(false);
      setter(true);
    } else {
      const timeout = setTimeout(() => {
        setter(false);
      }, 300);
      setDropdownTimeout(timeout);
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95, pointerEvents: 'none' as const },
    visible: { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' as const, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: 5, scale: 0.98, transition: { duration: 0.15, ease: "easeIn" } }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isOpaque
          ? 'bg-white/80 backdrop-blur-2xl border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] py-1'
          : 'bg-transparent border-transparent py-4'
          }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo Section */}
            <Link to="/" className="relative z-50 group">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2"
              >
                <ResponsiveImage
                  src="/logo/pac-logo.png"
                  alt="Pure Air California"
                  className={`h-10 w-auto transition-all duration-300 ${isOpaque ? '' : 'brightness-0 invert'}`}
                  loading="eager"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center space-x-1 bg-gray-100/5 backdrop-blur-md rounded-full px-2 py-1 mx-4">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About' },
                { path: '/health-benefits', label: 'Health Benefits' },
                {
                  label: 'Services',
                  type: 'dropdown',
                  isOpen: isServicesDropdownOpen,
                  setIsOpen: setIsServicesDropdownOpen,
                  items: [
                    { path: '/services/residential-air-duct-cleaning', label: 'Residential Air Duct Cleaning' },
                    { path: '/services/commercial-air-duct-cleaning', label: 'Commercial Air Duct Cleaning' },
                    { path: '/services/hvac-system-cleaning', label: 'HVAC System Cleaning' },
                    { path: '/services/dryer-vent-maintenance-program', label: 'Dryer Vent Maintenance' },
                    { path: '/services/residential-dryer-vent-cleaning', label: 'Residential Dryer Vent' },
                    { path: '/services/commercial-dryer-vent-cleaning', label: 'Commercial Dryer Vent' }
                  ]
                },
                {
                  label: 'Industries',
                  type: 'dropdown',
                  isOpen: isIndustriesDropdownOpen,
                  setIsOpen: setIsIndustriesDropdownOpen,
                  items: [
                    { path: '/industries/healthcare', label: 'Healthcare' },
                    { path: '/industries/hospitality', label: 'Hospitality' },
                    { path: '/industries/restaurants', label: 'Restaurants' },
                    { path: '/industries/education', label: 'Education' },
                    { path: '/industries/commercial-real-estate', label: 'Commercial Real Estate' } // Fixed label
                  ]
                },
                { path: '/locations', label: 'Locations' },
                { path: '/blog', label: 'Blog' }
              ].map((item, idx) => (
                item.type === 'dropdown' ? (
                  <div
                    key={idx}
                    className="relative group"
                    onMouseEnter={() => handleDropdownHover(item.setIsOpen!, true)}
                    onMouseLeave={() => handleDropdownHover(item.setIsOpen!, false)}
                  >
                    <button
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1
                      ${isOpaque
                          ? 'text-gray-700 hover:text-brand-600 hover:bg-brand-50'
                          : 'text-white hover:text-brand-200 hover:bg-white/10'}`}
                    >
                      {item.label}
                      <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${item.isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {item.isOpen && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute top-full left-0 mt-2 w-72 p-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 ring-1 ring-black/5 overflow-hidden"
                        >
                          <div className="flex flex-col gap-1">
                            {item.items?.map((subItem) => (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                className="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-brand-600 hover:bg-brand-50/80 rounded-xl transition-all duration-200 flex items-center justify-between group"
                              >
                                {subItem.label}
                                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={idx}
                    to={item.path!}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group
                    ${isOpaque
                        ? 'text-gray-700 hover:text-brand-600 hover:bg-brand-50'
                        : 'text-white hover:text-brand-200 hover:bg-white/10'}`}
                  >
                    {item.label}
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="activeNav"
                        className={`absolute bottom-1.5 left-4 right-4 h-0.5 rounded-full ${isOpaque ? 'bg-brand-600' : 'bg-white'}`}
                      />
                    )}
                  </Link>
                )
              ))}
            </nav>

            {/* Right Section: Call to Action */}
            <div className="flex items-center gap-4 lg:gap-6">

              {/* Phone Number - The Highlight */}
              <a
                href="tel:2137924145"
                onClick={() => trackPhoneCall('navbar_desktop')}
                className="hidden lg:flex flex-col items-end group text-right"
              >
                <div className="hidden xl:flex items-center gap-1.5 mb-0.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                  </span>
                  <span className={`text-[10px] font-bold tracking-widest uppercase ${isOpaque ? 'text-sky-600' : 'text-sky-400'}`}>
                    24/7 Premium Support
                  </span>
                </div>
                <div className={`flex items-center gap-2 font-black text-lg xl:text-2xl leading-none transition-all duration-300 ${isOpaque ? 'text-slate-900 group-hover:text-sky-600' : 'text-white group-hover:text-sky-300 drop-shadow-md'}`}>
                  <Phone className={`w-5 h-5 fill-current transition-transform duration-300 group-hover:rotate-12 ${isOpaque ? 'text-sky-500' : 'text-sky-400'}`} />
                  <span>(213) 792-4145</span>
                </div>
              </a>

              {/* CTA Button */}
              <Button
                className={`hidden md:flex items-center gap-2 rounded-full px-6 py-6 font-bold text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 ${isOpaque
                  ? 'btn-premium text-white'
                  : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20'
                  }`}
                asChild
              >
                <Link to="/quote">
                  Get a Quote
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`lg:hidden p-2 rounded-xl transition-colors ${isOpaque ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/20'
                  }`}
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-[160] shadow-2xl lg:hidden overflow-hidden flex flex-col"
            >
              {/* Mobile Menu Header */}
              <div className="p-5 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
                <span className="font-bold text-xl text-gray-900 flex items-center gap-2">
                  <Star className="w-5 h-5 text-brand-500 fill-brand-500" />
                  Menu
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-200/50 transition-colors text-gray-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Menu Content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-2">

                {/* Primary Nav Links */}
                {[
                  { path: '/', label: 'Home' },
                  { path: '/about', label: 'About Us' },
                  { path: '/locations', label: 'Service Areas' },
                  { path: '/health-benefits', label: 'Health Benefits' },
                  { path: '/blog', label: 'Blog' },
                ].map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3.5 rounded-xl text-gray-700 hover:bg-brand-50 hover:text-brand-700 font-medium transition-all"
                  >
                    {link.label}
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                ))}

                <hr className="my-4 border-gray-100" />

                {/* Services Section */}
                <div className="space-y-2">
                  <div className="px-3.5 text-xs font-bold text-gray-400 uppercase tracking-wider">Services</div>
                  {[
                    ['Commercial Air Ducts', '/services/commercial-air-duct-cleaning'],
                    ['Residential Air Ducts', '/services/residential-air-duct-cleaning'],
                    ['Dryer Vent Cleaning', '/services/residential-dryer-vent-cleaning'],
                    ['HVAC Cleaning', '/services/hvac-system-cleaning'],
                  ].map(([label, path]) => (
                    <Link
                      key={path}
                      to={path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block p-3.5 rounded-xl text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all text-sm font-medium"
                    >
                      {label}
                    </Link>
                  ))}
                  <Link
                    to="/services"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3.5 py-2 text-brand-600 text-sm font-bold hover:underline"
                  >
                    View All Services →
                  </Link>
                </div>

              </div>

              {/* Mobile Menu Footer */}
              <div className="p-5 border-t border-gray-100 bg-gray-50 space-y-3">
                <Button className="w-full bg-brand-600 text-white font-bold py-6 rounded-xl shadow-lg" asChild>
                  <a href="tel:2137924145" onClick={() => trackPhoneCall('navbar_mobile')} className="flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5 fill-current" />
                    Call (213) 792-4145
                  </a>
                </Button>
                <Button variant="outline" className="w-full border-brand-200 text-brand-700 hover:bg-brand-50 font-bold py-6 rounded-xl" asChild>
                  <Link to="/quote" onClick={() => setIsMobileMenuOpen(false)}>
                    Get a Free Quote
                  </Link>
                </Button>
                <div className="grid grid-cols-2 gap-3 text-center text-xs text-gray-500 font-medium">
                  <div className="flex flex-col items-center gap-1 bg-white p-2 rounded-lg border border-gray-100">
                    <Clock className="w-4 h-4 text-brand-500" />
                    24/7 Available
                  </div>
                  <div className="flex flex-col items-center gap-1 bg-white p-2 rounded-lg border border-gray-100">
                    <Shield className="w-4 h-4 text-brand-500" />
                    Licensed & Insured
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;