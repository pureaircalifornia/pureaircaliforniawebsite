import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const Footer = () => {
  const [ref, isInView] = useScrollAnimation({ threshold: 0.2 });

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Pure Air California</h4>
            <p className="text-gray-400">
              We are dedicated to providing top-quality air duct and dryer vent cleaning services to improve your indoor air quality.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="text-gray-400 space-y-2">
              <li>
                <Link to="/services/residential-air-duct-cleaning" className="hover:text-white transition">
                  Residential Air Duct Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/commercial-air-duct-cleaning" className="hover:text-white transition">
                  Commercial Air Duct Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/dryer-vent-maintenance-program" className="hover:text-white transition">
                  Dryer Vent Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/electrostatic-filter-program" className="hover:text-white transition">
                  Electrostatic Filters
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="text-gray-400 space-y-2">
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/locations" className="hover:text-white transition">
                  Locations
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Info</h4>
            <p className="text-gray-400">
              Address: 123 Main Street, Los Angeles, CA 90001
            </p>
            <p className="text-gray-400">
              <a href="tel:+12137924145" className="hover:text-white transition-colors">Phone: (213) 792-4145</a>
            </p>
            <p className="text-gray-400">
                              Email: lou@pureaircalifornia.com
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Pure Air California. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
