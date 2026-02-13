import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Phone } from 'lucide-react';
import { trackPhoneCall } from '@/utils/analytics';

const Footer = () => {

  return (
    <footer className="bg-gray-900 text-white py-10 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Pure Air California</h4>
            <p className="text-gray-400 text-sm">
              We are dedicated to providing top-quality air duct and dryer vent cleaning services to improve your indoor air quality.
            </p>
            <div className="mt-3 sm:mt-4 flex space-x-4">
              <a href="https://facebook.com/pureaircalifornia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/pureaircalifornia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/pureaircalifornia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services/residential-air-duct-cleaning" className="text-gray-400 hover:text-white transition-colors">
                  Residential Air Duct Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/commercial-air-duct-cleaning" className="text-gray-400 hover:text-white transition-colors">
                  Commercial Air Duct Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/residential-dryer-vent-cleaning" className="text-gray-400 hover:text-white transition-colors">
                  Dryer Vent Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/hvac-system-cleaning" className="text-gray-400 hover:text-white transition-colors">
                  HVAC System Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/dryer-vent-maintenance-program" className="text-gray-400 hover:text-white transition-colors">
                  Maintenance Program
                </Link>
              </li>
              <li>
                <Link to="/services/residential-electrostatic-filter" className="text-gray-400 hover:text-white transition-colors">
                  Electrostatic Filters
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Industries We Serve</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/industries/healthcare" className="text-gray-400 hover:text-white transition-colors">
                  Healthcare Facilities
                </Link>
              </li>
              <li>
                <Link to="/industries/commercial-real-estate" className="text-gray-400 hover:text-white transition-colors">
                  Commercial Real Estate
                </Link>
              </li>
              <li>
                <Link to="/industries/restaurants" className="text-gray-400 hover:text-white transition-colors">
                  Restaurants & Food Service
                </Link>
              </li>
              <li>
                <Link to="/industries/hospitality" className="text-gray-400 hover:text-white transition-colors">
                  Hotels & Hospitality
                </Link>
              </li>
              <li>
                <Link to="/industries/education" className="text-gray-400 hover:text-white transition-colors">
                  Schools & Education
                </Link>
              </li>
              <li>
                <Link to="/industries/manufacturing" className="text-gray-400 hover:text-white transition-colors">
                  Manufacturing & Industrial
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/locations" className="text-gray-400 hover:text-white transition-colors">
                  Locations
                </Link>
              </li>
              <li>
                <Link to="/health-benefits" className="text-gray-400 hover:text-white transition-colors">
                  Health Benefits
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/quote" className="text-gray-400 hover:text-white transition-colors">
                  Get a Free Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Info</h4>
            <p className="text-gray-400">
              Address: 1550 N Poinsettia Pl, Los Angeles, CA 90046
            </p>
            <p className="mt-2">
              <a
                href="tel:2137924145"
                onClick={() => trackPhoneCall('footer')}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-all hover:scale-105 shadow-md hover:shadow-lg"
              >
                <Phone size={18} className="fill-current" />
                Call (213) 792-4145
              </a>
            </p>
            <p className="text-gray-400">
              <a href="mailto:info@pureaircalifornia.com" className="hover:text-white transition-colors">Email: info@pureaircalifornia.com</a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center">
          &copy; {new Date().getFullYear()} Pure Air California. All rights reserved.
        </div>
        <div className="flex justify-center gap-6 mt-4 text-sm text-gray-500">
          <Link to="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
