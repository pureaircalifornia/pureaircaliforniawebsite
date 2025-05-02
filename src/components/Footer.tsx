
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Home, AirVent } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">Pure Air California</h3>
            <p className="mb-6 text-gray-300 max-w-xs">
              Professional air duct and dryer vent cleaning services in Los Angeles, 
              helping you breathe better and live healthier.
            </p>
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={18} className="text-brand-400" />
              <span className="text-gray-300">Los Angeles, CA</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Phone size={18} className="text-brand-400" />
              <span className="text-gray-300">(310) 555-1234</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Mail size={18} className="text-brand-400" />
              <span className="text-gray-300">info@pureaircalifornia.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-brand-400" />
              <span className="text-gray-300">Mon-Sat: 8AM - 6PM</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-brand-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-brand-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/locations" className="text-gray-300 hover:text-brand-400 transition-colors">
                  Service Areas
                </Link>
              </li>
              <li>
                <Link to="/health-benefits" className="text-gray-300 hover:text-brand-400 transition-colors">
                  Health Benefits
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-brand-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-brand-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <AirVent size={16} className="text-brand-400" />
                <Link to="/services/residential" className="text-gray-300 hover:text-brand-400 transition-colors">
                  Residential Duct Cleaning
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Home size={16} className="text-brand-400" />
                <Link to="/services/commercial" className="text-gray-300 hover:text-brand-400 transition-colors">
                  Commercial Duct Cleaning
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <AirVent size={16} className="text-brand-400" />
                <Link to="/services/dryer-vent" className="text-gray-300 hover:text-brand-400 transition-colors">
                  Dryer Vent Cleaning
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Home size={16} className="text-brand-400" />
                <Link to="/services/hvac" className="text-gray-300 hover:text-brand-400 transition-colors">
                  HVAC System Cleaning
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-4">Service Areas</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/locations/beverly-hills" className="text-gray-300 hover:text-brand-400 transition-colors">
                Beverly Hills
              </Link>
              <Link to="/locations/malibu" className="text-gray-300 hover:text-brand-400 transition-colors">
                Malibu
              </Link>
              <Link to="/locations/hollywood" className="text-gray-300 hover:text-brand-400 transition-colors">
                Hollywood
              </Link>
              <Link to="/locations/downtown-la" className="text-gray-300 hover:text-brand-400 transition-colors">
                Downtown LA
              </Link>
              <Link to="/locations/santa-monica" className="text-gray-300 hover:text-brand-400 transition-colors">
                Santa Monica
              </Link>
              <Link to="/locations/ventura" className="text-gray-300 hover:text-brand-400 transition-colors">
                Ventura
              </Link>
              <Link to="/locations/century-city" className="text-gray-300 hover:text-brand-400 transition-colors">
                Century City
              </Link>
              <Link to="/locations" className="text-brand-400 hover:text-brand-300 transition-colors">
                View All →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Pure Air California. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-brand-400">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-400">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-400">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
