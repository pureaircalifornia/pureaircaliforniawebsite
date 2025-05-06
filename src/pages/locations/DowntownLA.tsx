import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Check, Phone } from 'lucide-react';
import QuoteForm from '@/components/QuoteForm';

const DowntownLA = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1580655653885-65763b2597d0" 
            alt="Downtown Los Angeles" 
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
              <span>Downtown Los Angeles</span>
            </div>
          </div>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct & Dryer Vent Cleaning in Downtown Los Angeles
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California provides expert air duct and ventilation cleaning services for 
              mixed-use buildings, lofts, and commercial spaces throughout Downtown Los Angeles.
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
      
      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-heading font-bold mb-6">
                Professional Air Duct Cleaning Services in Downtown Los Angeles
              </h2>
              
              <p className="text-lg text-gray-600 mb-6">
                Downtown LA's diverse architectural landscape includes historical buildings, converted lofts, 
                modern high-rises, and commercial spaces. This unique urban environment requires specialized 
                ventilation solutions to maintain optimal air quality. Pure Air California's expert team 
                understands the specific challenges of Downtown properties.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-heading font-semibold mb-4">Why Downtown LA Properties Need Regular Air Duct Cleaning</h3>
                <p className="text-gray-600 mb-4">
                  Downtown Los Angeles properties face unique air quality challenges:
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Historic buildings with retrofitted HVAC systems require specialized attention</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Urban environment brings increased pollutants and particulate matter</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Converted lofts and mixed-use buildings face complex ventilation challenges</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>High-density living and working environments require optimized air flow</span>
                  </li>
                </ul>
              </div>
              
              <h3 className="text-xl font-heading font-semibold mb-4">Our Downtown LA Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-heading font-semibold mb-3">Commercial Air Duct Cleaning</h4>
                  <p className="text-gray-600 mb-4">
                    Specialized cleaning for office towers, retail spaces, and mixed-use commercial buildings 
                    with minimal disruption to operations.
                  </p>
                  <Button asChild variant="link" className="p-0 text-[#0A3D7C] font-medium">
                    <Link to="/services/commercial-air-duct-cleaning">Learn More</Link>
                  </Button>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-heading font-semibold mb-3">Loft & Apartment Cleaning</h4>
                  <p className="text-gray-600 mb-4">
                    Tailored cleaning solutions for Downtown's unique residential spaces, including 
                    converted lofts and modern apartment buildings.
                  </p>
                  <Button asChild variant="link" className="p-0 text-[#0A3D7C] font-medium">
                    <Link to="/services/residential-air-duct-cleaning">Learn More</Link>
                  </Button>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-heading font-semibold mb-3">Historic Building Specialists</h4>
                  <p className="mb-3 text-gray-600">
                    Expert cleaning for historic Downtown buildings with original or modified
                    ventilation systems.
                  </p>
                  <Link to="/services/commercial-air-duct-cleaning">Learn More</Link>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-heading font-semibold mb-3">Dryer Vent Cleaning</h4>
                  <p className="text-gray-600 mb-4">
                    Essential fire prevention services for residential and commercial properties 
                    through professional dryer vent cleaning.
                  </p>
                  <Button asChild variant="link" className="p-0 text-[#0A3D7C] font-medium">
                    <Link to="/services/residential-dryer-vent-cleaning">Learn More</Link>
                  </Button>
                </div>
              </div>
              
              <h3 className="text-xl font-heading font-semibold mb-4">Downtown Los Angeles Areas We Serve</h3>
              <p className="text-gray-600 mb-4">
                Our Downtown LA service area includes all districts and neighborhoods:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Financial District</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Arts District</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Historic Core</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>South Park</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Little Tokyo</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Bunker Hill</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-xl font-heading font-semibold mb-3">Why Choose Pure Air California in Downtown LA</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Experience with Downtown's diverse building types and ventilation systems</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Flexible scheduling to accommodate business hours and resident lifestyles</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Advanced equipment designed for urban environmental challenges</span>
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
                    <span>Proven track record with Downtown's most prestigious properties</span>
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
                        <p className="font-medium">Downtown LA Service Area</p>
                        <p className="text-gray-600">Serving all Downtown Los Angeles districts and neighborhoods</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-[#0A3D7C]" />
                      <div>
                        <p className="font-medium">(213) 555-1234</p>
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold mb-6">
              Experience Premium Air Duct Cleaning in Downtown Los Angeles
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join our satisfied Downtown LA customers and discover why Pure Air California 
              is the trusted choice for air duct and dryer vent cleaning in this vibrant urban center.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-[#0A3D7C] hover:bg-[#072c5a]">
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

export default DowntownLA;
