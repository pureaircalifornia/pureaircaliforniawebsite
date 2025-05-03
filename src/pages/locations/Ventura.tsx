import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Check, Phone } from 'lucide-react';
import QuoteForm from '@/components/QuoteForm';

const Ventura = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1599408980126-43a9f561c7bd" 
            alt="Ventura" 
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
              <span>Ventura</span>
            </div>
          </div>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct & Dryer Vent Cleaning in Ventura
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California provides quality air duct and ventilation services for 
              homes and businesses throughout Ventura County.
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
                Professional Air Duct Cleaning Services in Ventura
              </h2>
              
              <p className="text-lg text-gray-600 mb-6">
                Ventura's unique coastal environment creates specific air quality challenges for homes and businesses.
                From beach moisture to seasonal Santa Ana winds, your property's ventilation system faces distinctive 
                local conditions. Pure Air California's specialized services help Ventura property owners maintain 
                healthy indoor air quality year-round.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-heading font-semibold mb-4">Why Ventura Properties Need Regular Air Duct Cleaning</h3>
                <p className="text-gray-600 mb-4">
                  Ventura County properties face unique air quality challenges:
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Coastal salt air can cause accelerated corrosion in ventilation systems</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Higher humidity levels near the ocean can promote mold growth in ductwork</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Santa Ana winds bring additional dust and allergens that collect in air ducts</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Older homes throughout Ventura may have outdated ventilation systems</span>
                  </li>
                </ul>
              </div>
              
              <h3 className="text-xl font-heading font-semibold mb-4">Our Ventura Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-heading font-semibold mb-3">Residential Air Duct Cleaning</h4>
                  <p className="text-gray-600 mb-4">
                    Comprehensive cleaning for homes throughout Ventura County, from beachfront properties 
                    to inland neighborhoods.
                  </p>
                  <Button asChild variant="link" className="p-0 text-[#0A3D7C] font-medium">
                    <Link to="/services/residential-air-duct-cleaning">Learn More</Link>
                  </Button>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-heading font-semibold mb-3">Commercial Duct Cleaning</h4>
                  <p className="text-gray-600 mb-4">
                    Specialized services for retail spaces, offices, restaurants, and other 
                    businesses throughout Ventura County.
                  </p>
                  <Button asChild variant="link" className="p-0 text-[#0A3D7C] font-medium">
                    <Link to="/services/commercial-air-duct-cleaning">Learn More</Link>
                  </Button>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-heading font-semibold mb-3">Dryer Vent Cleaning</h4>
                  <p className="text-gray-600 mb-4">
                    Critical fire prevention services through professional dryer vent cleaning 
                    that removes lint buildup from residential and commercial properties.
                  </p>
                  <Button asChild variant="link" className="p-0 text-[#0A3D7C] font-medium">
                    <Link to="/services/residential-dryer-vent-cleaning">Learn More</Link>
                  </Button>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-heading font-semibold mb-3">Coastal Property Specialists</h4>
                  <p className="text-gray-600 mb-4">
                    Specialized services addressing the unique challenges of beachside and 
                    coastal properties with salt air exposure.
                  </p>
                  <Button asChild variant="link" className="p-0 text-[#0A3D7C] font-medium">
                    <Link to="/services/coastal">Learn More</Link>
                  </Button>
                </div>
              </div>
              
              <h3 className="text-xl font-heading font-semibold mb-4">Ventura Areas We Serve</h3>
              <p className="text-gray-600 mb-4">
                Our Ventura service area covers the entire county, including:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Ventura City</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Oxnard</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Camarillo</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Thousand Oaks</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Simi Valley</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Ojai</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-xl font-heading font-semibold mb-3">Why Choose Pure Air California in Ventura</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Local expertise with Ventura's unique coastal and inland environments</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Customized solutions for both residential and commercial properties</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Advanced equipment designed for coastal property challenges</span>
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
                    <span>Proven track record with Ventura County's residential and business communities</span>
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
                        <p className="font-medium">Ventura County Service Area</p>
                        <p className="text-gray-600">Serving all Ventura County communities and neighborhoods</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-[#0A3D7C]" />
                      <div>
                        <p className="font-medium">(805) 555-1234</p>
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
              Experience Premium Air Duct Cleaning in Ventura County
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join our satisfied Ventura customers and discover why Pure Air California 
              is the trusted choice for air duct and dryer vent cleaning throughout the county.
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

export default Ventura;
