import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Check, Phone } from 'lucide-react';
import QuoteForm from '@/components/QuoteForm';

const BeverlyHills = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="/gallery/Photos/IMG-20250505-WA0140.jpg" 
            alt="Beverly Hills - Premium air duct cleaning services" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center text-white mb-4">
            <MapPin size={20} className="mr-2 text-brand-400" />
            <div className="text-sm">
              <Link to="/" className="hover:text-brand-400 transition">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/locations" className="hover:text-brand-400 transition">Locations</Link>
              <span className="mx-2">/</span>
              <span>Beverly Hills</span>
            </div>
          </div>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct & Dryer Vent Cleaning in Beverly Hills
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California provides premium air duct and ventilation cleaning services for 
              luxury homes and exclusive commercial properties throughout Beverly Hills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700">
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-heading font-bold mb-6">
                Premium Air Duct Cleaning Services in Beverly Hills
              </h2>
              
              <p className="text-lg text-gray-600 mb-6">
                Beverly Hills residents and business owners understand the value of maintaining a pristine environment. 
                Your HVAC system's air ducts play a crucial role in your property's air quality, comfort, and 
                energy efficiency. At Pure Air California, we provide specialized air duct and dryer vent cleaning 
                services tailored to the unique needs of Beverly Hills' luxury homes and high-end commercial properties.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-heading font-semibold mb-4">Why Beverly Hills Properties Need Regular Air Duct Cleaning</h3>
                <p className="text-gray-600 mb-4">
                  Beverly Hills properties face unique air quality challenges:
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <span>Canyon microclimates can introduce more dust and pollen into luxury homes</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <span>Larger properties with extensive HVAC systems require specialized cleaning approaches</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <span>High-end retail and business spaces need discreet, thorough vent cleaning that doesn't disrupt operations</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <span>Historic properties require careful handling to preserve architectural features</span>
                  </li>
                </ul>
              </div>
              
              <h3 className="text-xl font-heading font-semibold mb-4">Our Beverly Hills Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-heading font-semibold mb-3">Residential Air Duct Cleaning</h4>
                  <p className="text-gray-600 mb-4">
                    Specialized cleaning for luxury homes, mansions, and multi-level properties with 
                    sophisticated HVAC systems.
                  </p>
                  <Button asChild variant="link" className="p-0 text-brand-600 font-medium">
                    <Link to="/services/residential-air-duct-cleaning">Learn More</Link>
                  </Button>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-heading font-semibold mb-3">Commercial Duct Cleaning</h4>
                  <p className="text-gray-600 mb-4">
                    Discrete, efficient cleaning for high-end retail spaces, offices, and mixed-use 
                    properties on Rodeo Drive and throughout Beverly Hills.
                  </p>
                  <Button asChild variant="link" className="p-0 text-brand-600 font-medium">
                    <Link to="/services/commercial-air-duct-cleaning">Learn More</Link>
                  </Button>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-heading font-semibold mb-3">Dryer Vent Cleaning</h4>
                  <p className="text-gray-600 mb-4">
                    Prevent fire hazards in your Beverly Hills property with professional dryer vent cleaning 
                    that removes lint buildup and improves efficiency.
                  </p>
                  <Button asChild variant="link" className="p-0 text-brand-600 font-medium">
                    <Link to="/services/residential-dryer-vent-cleaning">Learn More</Link>
                  </Button>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-heading font-semibold mb-3">HVAC System Cleaning</h4>
                  <p className="text-gray-600 mb-4">
                    Comprehensive cleaning of your entire HVAC system, ensuring optimal performance and air quality 
                    throughout your property.
                  </p>
                  <Button asChild variant="link" className="p-0 text-brand-600 font-medium">
                    <Link to="/services/residential-electrostatic-filter">Learn More</Link>
                  </Button>
                </div>
              </div>
              
              <h3 className="text-xl font-heading font-semibold mb-4">Beverly Hills Areas We Serve</h3>
              <p className="text-gray-600 mb-4">
                Our Beverly Hills service area includes all neighborhoods and commercial districts:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-brand-600" />
                  <span>The Flats</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-brand-600" />
                  <span>Trousdale Estates</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-brand-600" />
                  <span>Beverly Hills Gateway</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-brand-600" />
                  <span>Beverly Hills Triangle</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-brand-600" />
                  <span>Rodeo Drive</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-brand-600" />
                  <span>Benedict Canyon</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-xl font-heading font-semibold mb-3">Why Choose Pure Air California in Beverly Hills</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <span>Specialized experience with luxury properties and high-end commercial spaces</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <span>Discreet, professional service with minimal disruption</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <span>Advanced equipment and techniques for the most thorough cleaning</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <span>Fully insured, licensed, and background-checked technicians</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <span>Flexible scheduling to accommodate your busy lifestyle</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <QuoteForm />
                
                <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h3 className="text-xl font-heading font-semibold mb-4">Contact Us</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-brand-600 mt-1" />
                      <div>
                        <p className="font-medium">Beverly Hills Service Area</p>
                        <p className="text-gray-600">Serving all Beverly Hills neighborhoods and commercial districts</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-brand-600" />
                      <div>
                        <p className="font-medium">(310) 555-1234</p>
                        <p className="text-gray-600">Mon-Sat: 8AM - 6PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-cta-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold mb-6">
              Experience Premium Air Duct Cleaning in Beverly Hills
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join our satisfied Beverly Hills customers and discover why Pure Air California 
              is the trusted choice for air duct and dryer vent cleaning in luxury properties.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700">
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BeverlyHills;
