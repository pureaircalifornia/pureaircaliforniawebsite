import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MenuIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const mainNavItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Locations', href: '/locations' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const handleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-primary">Pure Air California</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 font-medium text-gray-500 hover:text-primary hover:border-primary ${
                      location.pathname === item.href
                        ? 'border-primary text-primary'
                        : 'border-transparent'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Button
                variant="outline"
                onClick={() => navigate('/quote')}
                className="ml-4"
              >
                Get a Quote
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="sm:hidden">
        <button
          onClick={handleMobileMenu}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
        >
          <span className="sr-only">Open main menu</span>
          {isMobileMenuOpen ? (
            <XIcon className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
          )}
        </button>

        {isMobileMenuOpen && (
          <div className="px-2 pt-2 pb-3 space-y-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-primary hover:bg-gray-50 ${
                  location.pathname === item.href
                    ? 'bg-primary text-white'
                    : 'bg-white'
                }`}
                onClick={handleMobileMenu}
              >
                {item.name}
              </Link>
            ))}
            <Button
              variant="outline"
              onClick={() => {
                navigate('/quote');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-center"
            >
              Get a Quote
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navigation;
