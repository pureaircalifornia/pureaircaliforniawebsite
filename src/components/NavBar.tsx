import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isIndustriesDropdownOpen, setIsIndustriesDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId?: string) => {
    e.preventDefault();
    if (sectionId) {
      // If we're on a different page, navigate first then scroll
      const currentPath = window.location.pathname;
      const targetPath = e.currentTarget.getAttribute('href');
      
      if (currentPath !== targetPath) {
        // Navigate to the new page
        window.location.href = `${targetPath}#${sectionId}`;
      } else {
        // We're already on the right page, just scroll
        scrollToSection(sectionId);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
              src="/lovable-uploads/72fdde68-6f0b-49b3-ae09-0c49f6d931dd.png" 
              alt="Pure Air California Logo" 
              className={`h-10 w-auto ${isScrolled ? '' : 'brightness-0 invert'}`} 
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className={`font-medium hover:text-brand-500 transition ${isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'}`} onClick={(e) => handleLinkClick(e)}>
            Home
          </Link>
          <Link to="/services" className={`font-medium hover:text-brand-500 transition ${isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'}`} onClick={(e) => handleLinkClick(e, 'services')}>
            Services
          </Link>
          <Link to="/locations" className={`font-medium hover:text-brand-500 transition ${isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'}`} onClick={(e) => handleLinkClick(e, 'locations')}>
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
          <Link to="/health-benefits" className={`font-medium hover:text-brand-500 transition ${isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'}`} onClick={(e) => handleLinkClick(e, 'health-benefits')}>
            Health Benefits
          </Link>
          <Link to="/about" className={`font-medium hover:text-brand-500 transition ${isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'}`} onClick={(e) => handleLinkClick(e, 'about')}>
            About Us
          </Link>
          <Link to="/contact" className={`font-medium hover:text-brand-500 transition ${isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'}`} onClick={(e) => handleLinkClick(e, 'contact')}>
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
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <div className={`${isScrolled ? 'text-gray-800' : 'text-white'}`}>
            {isMobileMenuOpen ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>}
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col px-4 pt-2 pb-4 space-y-1">
            <Link to="/" className="px-4 py-2 text-gray-700 hover:bg-brand-100 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/services" className="px-4 py-2 text-gray-700 hover:bg-brand-100 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
              Services
            </Link>
            <Link to="/locations" className="px-4 py-2 text-gray-700 hover:bg-brand-100 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
              Locations
            </Link>
            <div className="px-4 py-2 text-gray-700">
              <button 
                onClick={() => document.getElementById('industries-mobile')?.classList.toggle('hidden')}
                className="flex items-center justify-between w-full"
              >
                Industries
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div id="industries-mobile" className="hidden pl-4 mt-2 space-y-1">
                <Link to="/industries/healthcare" className="block py-2 text-gray-600 hover:text-brand-600" onClick={() => setIsMobileMenuOpen(false)}>
                  Healthcare Facilities
                </Link>
                <Link to="/industries/hospitality" className="block py-2 text-gray-600 hover:text-brand-600" onClick={() => setIsMobileMenuOpen(false)}>
                  Hospitality
                </Link>
                <Link to="/industries/restaurants" className="block py-2 text-gray-600 hover:text-brand-600" onClick={() => setIsMobileMenuOpen(false)}>
                  Restaurants
                </Link>
                <Link to="/industries/education" className="block py-2 text-gray-600 hover:text-brand-600" onClick={() => setIsMobileMenuOpen(false)}>
                  Educational Institutions
                </Link>
                <Link to="/industries/retail" className="block py-2 text-gray-600 hover:text-brand-600" onClick={() => setIsMobileMenuOpen(false)}>
                  Retail Spaces
                </Link>
                <Link to="/industries/manufacturing" className="block py-2 text-gray-600 hover:text-brand-600" onClick={() => setIsMobileMenuOpen(false)}>
                  Manufacturing
                </Link>
              </div>
            </div>
            <Link to="/health-benefits" className="px-4 py-2 text-gray-700 hover:bg-brand-100 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
              Health Benefits
            </Link>
            <Link to="/about" className="px-4 py-2 text-gray-700 hover:bg-brand-100 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
              About Us
            </Link>
            <Link to="/contact" className="px-4 py-2 text-gray-700 hover:bg-brand-100 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </Link>
            <div className="pt-2">
              <Button className="w-full bg-brand-600 hover:bg-brand-700" asChild>
                <Link to="/quote">Get a Quote</Link>
              </Button>
            </div>
            <div className="flex justify-center pt-2">
              <Button variant="outline" className="flex items-center gap-2 w-full" asChild>
                <a href="tel:2137924145">
                  <Phone size={18} />
                  <span className="text-gray-800">(213) 792-4145</span>
                </a>
              </Button>
            </div>
          </div>
        </div>}
    </header>;
};
export default NavBar;
