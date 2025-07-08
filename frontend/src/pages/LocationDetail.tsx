import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { locationData } from './Locations';

const LocationDetail = () => {
  const { locationSlug } = useParams<{ locationSlug: string }>();
  
  // Find the location data based on the slug
  const location = locationData.find(loc => loc.slug === locationSlug);

  // If location not found, show 404
  if (!location) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center bg-gray-50 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Location Not Found</h1>
            <p className="text-xl text-gray-600 mb-8">The location you're looking for doesn't exist or has been moved.</p>
            <Button asChild>
              <Link to="/locations">Back to All Locations</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src={location.image} 
            alt={`${location.name} skyline`} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Air Duct Cleaning in {location.name}
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Professional air duct and dryer vent cleaning services for homes and businesses in {location.name}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[#0A3D7C] hover:bg-[#072c5a]">
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <a href="tel:+12137924145">
                  <Phone className="w-4 h-4 mr-2" /> (213) 792-4145
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6">Air Duct Cleaning Services in {location.name}</h2>
            
            <div className="prose max-w-none mb-8">
              <p className="text-lg text-gray-700 mb-6">
                {location.description}
              </p>
              
              <h3 className="text-2xl font-semibold mt-10 mb-4">Our Services in {location.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  'Residential Air Duct Cleaning',
                  'Commercial Air Duct Cleaning',
                  'Dryer Vent Cleaning',
                  'Electrostatic Air Filters',
                  'HVAC System Cleaning',
                  'Mold Remediation'
                ].map((service) => (
                  <div key={service} className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">{service}</h4>
                      <p className="text-sm text-gray-600">Professional {service.toLowerCase()} services in {location.name}.</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-semibold mt-10 mb-4">Why Choose Us in {location.name}?</h3>
              <ul className="space-y-4 mb-8">
                {[
                  `Local experts serving ${location.name} for over 10 years`,
                  'Certified and insured technicians',
                  'State-of-the-art equipment',
                  '100% satisfaction guarantee',
                  'Competitive pricing',
                  'Same-day service available'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="text-xl font-semibold mb-4">Ready to Breathe Cleaner Air in {location.name}?</h3>
              <p className="mb-4">
                Contact us today to schedule your air duct cleaning service in {location.name}. 
                We offer free, no-obligation quotes and same-day service availability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-[#0A3D7C] hover:bg-[#072c5a]">
                  <Link to="/quote">Get a Free Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="tel:+12137924145">
                    <Phone className="w-4 h-4 mr-2" /> (213) 792-4145
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-xl font-semibold mb-4">Service Area</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-[#0A3D7C] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">{location.name}, CA</h4>
                    <p className="text-sm text-gray-600">Serving {location.name} and surrounding areas</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 my-4"></div>
                
                <h4 className="font-medium mb-2">Contact Us</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <a href="tel:+12137924145" className="text-[#0A3D7C] hover:underline">(213) 792-4145</a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <a href="mailto:info@pureaircalifornia.com" className="text-[#0A3D7C] hover:underline">info@pureaircalifornia.com</a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>Mon-Sat: 8:00 AM - 6:00 PM</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button asChild className="w-full bg-[#0A3D7C] hover:bg-[#072c5a]">
                    <Link to="/quote">Schedule Service</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LocationDetail;
