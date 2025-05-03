import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, Menu, X, ChevronDown, ChevronRight, Shield, Clock } from 'lucide-react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isIndustriesDropdownOpen, setIsIndustriesDropdownOpen] = useState(false);
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
  };

  const handleIndustriesMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsIndustriesDropdownOpen(false);
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

  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-gradient-to-b from-black/60 to-transparent py-4'}`}>
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3" onClick={(e) => handleLinkClick(e)}>
          <div className={`p-1 rounded ${isScrolled ? 'bg-white' : 'bg-transparent'}`}>
            <img 
              src="/logo.svg" 
              alt="Pure Air California Logo" 
              className={`h-8 w-auto ${isScrolled ? '' : 'brightness-0 invert'}`} 
              loading="eager"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className={`font-medium hover:text-brand-500 transition ${isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'}`} onClick={(e) => handleLinkClick(e)}>
            Home
          </Link>
          <Link to="/services" className={`font-medium hover:text-brand-500 transition ${isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'}`} onClick={(e) => handleLinkClick(e, 'services', '/services')}>
            Services
          </Link>
          <Link to="/locations" className={`font-medium hover:text-brand-500 transition ${isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'}`} onClick={(e) => handleLinkClick(e, 'locations', '/locations')}>
            Locations
          </Link>
          <div 
            className="relative"
            onMouseEnter={handleIndustriesMouseEnter}
            onMouseLeave={handleIndustriesMouseLeave}
          >
            <button className={`font-medium hover:text-brand-500 transition flex items-center ${isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'}`}>
              Industries
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            
            {isIndustriesDropdownOpen && (
              <div 
                className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <Link to="/industries/healthcare" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsIndustriesDropdownOpen(false)}>
                    Healthcare Facilities
                  </Link>
                  <Link to="/industries/hospitality" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsIndustriesDropdownOpen(false)}>
                    Hospitality
                  </Link>
                  <Link to="/industries/restaurants" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsIndustriesDropdownOpen(false)}>
                    Restaurants
                  </Link>
                  <Link to="/industries/education" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsIndustriesDropdownOpen(false)}>
                    Educational Institutions
                  </Link>
                  <Link to="/industries/retail" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsIndustriesDropdownOpen(false)}>
                    Retail Spaces
                  </Link>
                  <Link to="/industries/manufacturing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsIndustriesDropdownOpen(false)}>
                    Manufacturing
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link to="/health-benefits" className={`font-medium hover:text-brand-500 transition ${isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'}`} onClick={(e) => handleLinkClick(e, 'health-benefits', '/health-benefits')}>
            Health Benefits
          </Link>
          <Link to="/about" className={`font-medium hover:text-brand-500 transition ${isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'}`} onClick={(e) => handleLinkClick(e, 'about', '/about')}>
            About Us
          </Link>
          <Link to="/contact" className={`font-medium hover:text-brand-500 transition ${isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'}`} onClick={(e) => handleLinkClick(e, 'contact', '/contact')}>
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <a href="tel:2137924145" className="text-decoration-none">
            <Button variant="ghost" className="flex items-center gap-2">
              <Phone size={18} />
              <span className={isScrolled ? "text-gray-800" : "text-white drop-shadow-md"}>
                (213) 792-4145
              </span>
            </Button>
          </a>
          <Button 
            variant="default" 
            className="bg-brand-600 hover:bg-brand-700"
            asChild
          >
            <Link to="/quote">Get a Quote</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100/10 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
          ) : (
            <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Enhanced Mobile Navigation */}
      <div 
        className={`md:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '64px' }}
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
              <Link 
                to="/services" 
                className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
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
                  <ChevronDown 
                    className={`ml-2 h-5 w-5 transition-transform ${
                      openMobileSubmenu === 'industries' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div className={`pl-4 space-y-1 overflow-hidden transition-all duration-300 ${
                  openMobileSubmenu === 'industries' ? 'max-h-96 py-2' : 'max-h-0'
                }`}>
                  {[
                    ['Healthcare Facilities', '/industries/healthcare'],
                    ['Hospitality', '/industries/hospitality'],
                    ['Restaurants', '/industries/restaurants'],
                    ['Educational Institutions', '/industries/education'],
                    ['Retail Spaces', '/industries/retail'],
                    ['Manufacturing', '/industries/manufacturing']
                  ].map(([name, path]) => (
                    <Link
                      key={path}
                      to={path}
                      className="flex items-center px-4 py-2 text-gray-600 hover:text-brand-600 hover:bg-gray-50 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ChevronRight className="h-4 w-4 mr-2" />
                      {name}
                    </Link>
                  ))}
                </div>
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
              <Button className="w-full bg-brand-600 hover:bg-brand-700 text-lg py-6" asChild>
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
      </div>
    </header>;
};
export default NavBar;
