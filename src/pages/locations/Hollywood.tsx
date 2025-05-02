
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Check, Phone } from 'lucide-react';
import QuoteForm from '@/components/QuoteForm';

const Hollywood = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1608632706351-8689bbcd61b3" 
            alt="Hollywood" 
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
              <span>Hollywood</span>
            </div>
          </div>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct & Dryer Vent Cleaning in Hollywood
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California provides specialized air duct and ventilation cleaning services for 
              historic buildings, studios, and residential properties throughout Hollywood.
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
                Expert Air Duct Cleaning Services in Hollywood
              </h2>
              
              <p className="text-lg text-gray-600 mb-6">
                Hollywood's unique blend of historic buildings, entertainment studios, and modern residential 
                developments demands specialized air quality solutions. Our experienced technicians understand 
                the unique ventilation challenges of this iconic neighborhood and provide tailored services to 
                meet your specific needs.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-heading font-semibold mb-4">Why Hollywood Properties Need Regular Air Duct Cleaning</h3>
                <p className="text-gray-600 mb-4">
                  Hollywood properties face unique air quality challenges:
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Historic buildings with original ductwork require careful, specialized attention</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Entertainment studios need clean air for optimal equipment performance and set conditions</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Mixed-use buildings face complex ventilation challenges that require expert solutions</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Urban location with high traffic introduces additional air quality concerns</span>
                  </li>
                </ul>
              </div>
              
              <h3 className="text-xl font-heading font-semibold mb-4">Our Hollywood Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-heading font-semibold mb-3">Residential Air Duct Cleaning</h4>
                  <p className="text-gray-600 mb-4">
                    Comprehensive cleaning for apartments, condos, and single-family homes throughout 
                    the Hollywood area.
                  </p>
                  <Button asChild variant="link" className="p-0 text-[#0A3D7C] font-medium">
                    <Link to="/services/residential">Learn More</Link>
                  </Button>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-heading font-semibold mb-3">Commercial Duct Cleaning</h4>
                  <p className="text-gray-600 mb-4">
                    Specialized services for studios, theaters, retail spaces, and office buildings 
                    with minimal disruption to operations.
                  </p>
                  <Button asChild variant="link" className="p-0 text-[#0A3D7C] font-medium">
                    <Link to="/services/commercial">Learn More</Link>
                  </Button>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-heading font-semibold mb-3">Dryer Vent Cleaning</h4>
                  <p className="text-gray-600 mb-4">
                    Essential fire prevention services for residential and commercial properties 
                    through professional dryer vent cleaning.
                  </p>
                  <Button asChild variant="link" className="p-0 text-[#0A3D7C] font-medium">
                    <Link to="/services/dryer-vent">Learn More</Link>
                  </Button>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-heading font-semibold mb-3">Historic Building Specialists</h4>
                  <p className="text-gray-600 mb-4">
                    Careful cleaning and maintenance for vintage and historic Hollywood buildings 
                    with original or modified ventilation systems.
                  </p>
                  <Button asChild variant="link" className="p-0 text-[#0A3D7C] font-medium">
                    <Link to="/services/historic">Learn More</Link>
                  </Button>
                </div>
              </div>
              
              <h3 className="text-xl font-heading font-semibold mb-4">Hollywood Areas We Serve</h3>
              <p className="text-gray-600 mb-4">
                Our Hollywood service area covers the entire neighborhood, including:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Hollywood Boulevard</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Hollywood Hills</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Sunset Boulevard</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Studio District</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Hollywood & Vine</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>East Hollywood</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-xl font-heading font-semibold mb-3">Why Choose Pure Air California in Hollywood</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Specialized experience with historic and entertainment industry buildings</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Flexible scheduling to accommodate filming schedules and business hours</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Advanced equipment designed for all building types and ventilation systems</span>
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
                    <span>Proven track record with Hollywood's most prestigious properties</span>
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
                        <p className="font-medium">Hollywood Service Area</p>
                        <p className="text-gray-600">Serving all Hollywood neighborhoods and business districts</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-[#0A3D7C]" />
                      <div>
                        <p className="font-medium">(323) 555-1234</p>
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
              Experience Premium Air Duct Cleaning in Hollywood
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join our satisfied Hollywood customers and discover why Pure Air California 
              is the trusted choice for air duct and dryer vent cleaning in this iconic neighborhood.
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

export default Hollywood;
