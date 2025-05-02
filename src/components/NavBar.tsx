
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto flex items-center justify-between px-4 bg-[#000a0e]/0">
        <Link to="/" className="flex items-center gap-3">
          <img src="/lovable-uploads/72fdde68-6f0b-49b3-ae09-0c49f6d931dd.png" alt="Pure Air California Logo" className="h-10 w-auto" />
          
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className={`font-medium hover:text-brand-500 transition ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
            Home
          </Link>
          <Link to="/services" className={`font-medium hover:text-brand-500 transition ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
            Services
          </Link>
          <Link to="/locations" className={`font-medium hover:text-brand-500 transition ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
            Locations
          </Link>
          <Link to="/health-benefits" className={`font-medium hover:text-brand-500 transition ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
            Health Benefits
          </Link>
          <Link to="/about" className={`font-medium hover:text-brand-500 transition ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
            About Us
          </Link>
          <Link to="/contact" className={`font-medium hover:text-brand-500 transition ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="flex items-center gap-2">
            <Phone size={18} />
            <span className={isScrolled ? "text-gray-800" : "text-white"}>
              (213) 792-4145
            </span>
          </Button>
          <Button variant="default" className="bg-brand-600 hover:bg-brand-700">
            Get a Quote
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
              <Button className="w-full bg-brand-600 hover:bg-brand-700">
                Get a Quote
              </Button>
            </div>
            <div className="flex justify-center pt-2">
              <Button variant="outline" className="flex items-center gap-2 w-full">
                <Phone size={18} />
                <span className="text-gray-800">(213) 792-4145</span>
              </Button>
            </div>
          </div>
        </div>}
    </header>;
};
export default NavBar;
