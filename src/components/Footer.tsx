import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Clock, Shield, Award, Star } from 'lucide-react';

const Footer = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add newsletter signup logic here
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Pure Air California</h3>
            <div className="space-y-3">
              <p className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-brand-500" />
                1550 N Poinsettia Pl, Los Angeles, CA 90046
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-brand-500" />
                <a href="tel:2137924145" className="hover:text-white">(213) 792-4145</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-brand-500" />
                <a href="mailto:info@pureaircalifornia.com" className="hover:text-white">
                  info@pureaircalifornia.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-brand-500" />
                Mon-Sat: 8AM - 6PM
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="hover:text-white">Services</Link>
              </li>
              <li>
                <Link to="/locations" className="hover:text-white">Service Areas</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">Contact</Link>
              </li>
              <li>
                <Link to="/quote" className="hover:text-white">Get a Quote</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/residential-air-duct-cleaning" className="hover:text-white">
                  Residential Air Duct Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/commercial-air-duct-cleaning" className="hover:text-white">
                  Commercial Air Duct Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/dryer-vent-cleaning" className="hover:text-white">
                  Dryer Vent Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/electrostatic-filter" className="hover:text-white">
                  Electrostatic Filter Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Stay Updated</h3>
            <p className="mb-4">Subscribe to our newsletter for tips, news, and special offers.</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700">
                Subscribe
              </Button>
            </form>

            {/* Social Links */}
            <div className="mt-6">
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-brand-500" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-brand-500" />
              <span>NADCA Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-brand-500" />
              <span>5-Star Rated Service</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-brand-500" />
              <span>24/7 Emergency Service</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="mb-4 md:mb-0">
              © {new Date().getFullYear()} Pure Air California. All rights reserved.
            </div>
            <div className="flex gap-4">
              <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-white">Terms of Service</Link>
              <Link to="/sitemap" className="hover:text-white">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
