import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Phone } from 'lucide-react';
import { trackPhoneCall } from '@/utils/analytics';
import { business } from '@/config/business';

const Footer = () => {

  return (
    <footer className="bg-gray-900 text-white py-10 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Pure Air California</h3>
            <p className="text-gray-400 text-sm">
              We are dedicated to providing top-quality air duct and dryer vent cleaning services to improve your indoor air quality.
            </p>
            <div className="mt-3 sm:mt-4 flex space-x-4">
              <a href="https://facebook.com/pureaircalifornia" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href="https://instagram.com/pureaircalifornia" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram profile" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href="https://twitter.com/pureaircalifornia" target="_blank" rel="noopener noreferrer" aria-label="Visit our Twitter feed" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Our Services</h3>
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
            <h3 className="font-bold text-lg mb-4 text-white">Industries We Serve</h3>
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
            <h3 className="font-bold text-lg mb-4 text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/locations/los-angeles" className="text-brand-400 font-medium hover:text-white transition-colors">
                  Los Angeles Service Area
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-brand-400 font-medium hover:text-white transition-colors">
                  LA Pricing & Cost
                </Link>
              </li>
              <li>
                <Link to="/locations" className="text-gray-400 hover:text-white transition-colors">
                  All Locations
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
              <li>
                <Link to="/air-quality-calculator" className="text-brand-300 font-medium hover:text-white transition-colors">
                  Air Quality Calculator
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-brand-300 font-medium hover:text-white transition-colors">
                  Referral Partners
                </Link>
              </li>
              <li>
                <Link to="/property-managers" className="text-brand-300 font-medium hover:text-white transition-colors">
                  HOAs & Property Managers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Info</h3>
            <address className="not-italic text-gray-400 space-y-2 text-sm">
              <p>
                {[
                  business.address.streetAddress,
                  business.address.addressLocality,
                  `${business.address.addressRegion} ${business.address.postalCode}`.trim(),
                ]
                  .filter(Boolean)
                  .join(', ')}
              </p>
              <p className="mt-2">
                <a
                  href={business.phoneHref}
                  onClick={() => trackPhoneCall('footer')}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-all hover:scale-105 shadow-md hover:shadow-lg"
                >
                  <Phone size={18} className="fill-current" />
                  Call {business.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${business.email}`} className="hover:text-white transition-colors break-all">Email: {business.email}</a>
              </p>
            </address>
            <div className="mt-4 text-sm text-gray-400">
              <p className="font-medium text-gray-300 mb-1">Business Hours</p>
              <p>Mon–Fri: 7:00 AM – 7:00 PM</p>
              <p>Sat: 8:00 AM – 5:00 PM</p>
              <p>Sun: By Appointment</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center text-gray-300">
          &copy; {new Date().getFullYear()} Pure Air California. All rights reserved.
        </div>
        <div className="flex justify-center gap-6 mt-4 text-sm text-gray-300">
          <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
