import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Check, Phone } from 'lucide-react';
import QuoteForm from '@/components/QuoteForm';
import { Helmet } from 'react-helmet-async';

const CenturyCity = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct & Dryer Vent Cleaning in Century City | Pure Air California</title>
        <meta name="description" content="Professional air duct and dryer vent cleaning services for high-rise offices and luxury residential buildings in Century City. Improve indoor air quality today!" />
        <meta name="keywords" content="air duct cleaning Century City, dryer vent cleaning Century City, commercial air duct cleaning, residential air duct cleaning, HVAC maintenance Century City" />
      </Helmet>
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="/gallery/gerson-repreza-tNQ2tmQiC6g-unsplash (Large).jpg" 
            alt="Century City skyline with modern high-rise buildings" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center text-white mb-4">
            <MapPin size={20} className="mr-2 text-[#5BBDE4]" />
            <div className="text-sm">
              <Link to="/" className="hover:text-[#5BBDE4] transition">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/locations" className="hover:text-[#5BBDE4] transition">Locations</Link>
              <span className="mx-2">/</span>
              <span>Century City</span>
            </div>
          </div>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct & Dryer Vent Cleaning in Century City
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California provides premium air duct and ventilation cleaning services for 
              high-rise offices and luxury residential buildings throughout Century City.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[#0A3D7C] hover:bg-[#072c5a]">
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <TrustBadges />
      
      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-heading font-bold mb-6">
                Professional Air Duct Cleaning Services in Century City
              </h2>
              
              <p className="text-lg text-gray-600 mb-6">
                Century City's modern high-rises and corporate offices demand specialized air ventilation solutions.
                With Pure Air California's expertise, you can ensure that your commercial or residential property 
                maintains the highest air quality standards. Our specialized cleaning services are designed for 
                the unique challenges of Century City's architectural landscape.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-heading font-semibold mb-4">Why Century City Properties Need Regular Air Duct Cleaning</h3>
                <p className="text-gray-600 mb-4">
                  Century City properties face unique air quality challenges:
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>High-rise buildings with complex HVAC systems require specialized cleaning approaches</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Corporate environments need low-disruption cleaning services that don't interfere with business</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Modern residential towers must maintain pristine air quality for discerning residents</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Urban location demands extra attention to filtering outdoor pollutants</span>
                  </li>
                </ul>
              </div>
              
              <h3 className="text-xl font-heading font-semibold mb-4">Our Century City Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-heading font-semibold mb-3">Commercial Air Duct Cleaning</h4>
                  <p className="mb-3 text-gray-600">
                    Comprehensive cleaning services for office buildings, retail spaces, and
                    commercial properties in Century City.
                  </p>
                  <Link to="/services/commercial-air-duct-cleaning">Learn More</Link>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-heading font-semibold mb-3">Residential Air Duct Cleaning</h4>
                  <p className="mb-3 text-gray-600">
                    Professional cleaning services for luxury condominiums and apartments
                    in the Century City area.
                  </p>
                  <Link to="/services/residential-air-duct-cleaning">Learn More</Link>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-heading font-semibold mb-3">Dryer Vent Cleaning</h4>
                  <p className="mb-3 text-gray-600">
                    Essential fire prevention services for residential and commercial
                    properties with on-site laundry facilities.
                  </p>
                  <Link to="/services/residential-dryer-vent-cleaning">Learn More</Link>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-heading font-semibold mb-3">HVAC Maintenance</h4>
                  <p className="mb-3 text-gray-600">
                    Comprehensive HVAC system inspection, cleaning, and maintenance for
                    optimal indoor air quality and energy efficiency.
                  </p>
                  <Link to="/services/commercial-air-duct-cleaning">Learn More</Link>
                </div>
              </div>
              
              <h3 className="text-xl font-heading font-semibold mb-4">Century City Areas We Serve</h3>
              <p className="text-gray-600 mb-4">
                Our Century City service area includes all commercial and residential buildings:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Century Plaza Towers</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Century City Mall</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Avenue of the Stars</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Century Park East</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Century Park West</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Fox Plaza</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-xl font-heading font-semibold mb-3">Why Choose Pure Air California in Century City</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Experience with large-scale commercial and high-rise residential buildings</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Non-disruptive service schedules for busy corporate environments</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Advanced equipment designed for high-efficiency commercial systems</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Fully insured, licensed, and background-checked technicians</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Compliance with all commercial building codes and regulations</span>
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
                      <MapPin size={18} className="text-[#0A3D7C] mt-1" />
                      <div>
                        <p className="font-medium">Century City Service Area</p>
                        <p className="text-gray-600">Serving all Century City commercial and residential buildings</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-[#0A3D7C]" />
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
      
      <CTASection />
      
      <Footer />
    </div>
  );
};

export default CenturyCity;
