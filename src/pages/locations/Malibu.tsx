
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Check, Phone } from 'lucide-react';
import QuoteForm from '@/components/QuoteForm';
import { Helmet } from 'react-helmet';

const Malibu = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Air Duct & Dryer Vent Cleaning Malibu | Pure Air California</title>
        <meta name="description" content="Expert air duct and dryer vent cleaning for Malibu beachfront properties. Reduce salt air corrosion and humidity issues with our specialized cleaning services." />
        <meta name="keywords" content="air duct cleaning malibu, hvac maintenance malibu, dryer vent cleaning malibu beach, beachfront property maintenance, salt air corrosion prevention, malibu air quality" />
      </Helmet>
      
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256" 
            alt="Malibu coastline" 
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
              <span>Malibu</span>
            </div>
          </div>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Air Duct & Dryer Vent Cleaning in Malibu
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Pure Air California provides specialized air duct and ventilation cleaning services for 
              beachfront properties and luxury homes throughout Malibu, addressing the unique challenges of 
              coastal living.
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
                Specialized Air Duct Cleaning Services for Malibu Properties
              </h2>
              
              <p className="text-lg text-gray-600 mb-6">
                Malibu's beautiful coastal location presents unique challenges for air quality and HVAC systems. 
                Salt air, increased humidity, and seasonal Santa Ana winds can all affect your home's ventilation system. 
                At Pure Air California, we provide tailored air duct and dryer vent cleaning services specifically 
                designed for Malibu's coastal properties.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-heading font-semibold mb-4">Coastal Air Quality Challenges in Malibu</h3>
                <p className="text-gray-600 mb-4">
                  Malibu homes face unique air quality issues that require specialized attention:
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Salt air corrosion can damage HVAC components and accumulate in ductwork</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Higher humidity levels promote mold and mildew growth in ventilation systems</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Santa Ana winds bring additional dust, pollen, and particulates into homes</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Wildfire smoke and ash can infiltrate air ducts during fire season</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Seasonal home use (vacation properties) can lead to extended periods of stagnant air</span>
                  </li>
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1594394235503-86aeb841a049" 
                  alt="Malibu beach house" 
                  className="rounded-xl shadow-lg h-full object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c" 
                  alt="Air duct cleaning in Malibu" 
                  className="rounded-xl shadow-lg h-full object-cover"
                />
              </div>
              
              <h3 className="text-xl font-heading font-semibold mb-4">Our Malibu Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-heading font-semibold mb-3">Beachfront Property Air Duct Cleaning</h4>
                  <p className="text-gray-600 mb-4">
                    Specialized cleaning for beachfront homes facing heightened salt air exposure and 
                    humidity challenges that can compromise indoor air quality.
                  </p>
                  <Button asChild variant="link" className="p-0 text-[#0A3D7C] font-medium">
                    <Link to="/services/residential">Learn More</Link>
                  </Button>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-heading font-semibold mb-3">Dryer Vent Cleaning</h4>
                  <p className="text-gray-600 mb-4">
                    Crucial fire prevention service for Malibu homes in high fire risk areas, removing lint 
                    buildup and ensuring proper ventilation.
                  </p>
                  <Button asChild variant="link" className="p-0 text-[#0A3D7C] font-medium">
                    <Link to="/services/dryer-vent">Learn More</Link>
                  </Button>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-heading font-semibold mb-3">Mold Prevention & Remediation</h4>
                  <p className="text-gray-600 mb-4">
                    Comprehensive cleaning and treatment of air ducts to remove existing mold and prevent 
                    future growth in Malibu's humid coastal environment.
                  </p>
                  <Button asChild variant="link" className="p-0 text-[#0A3D7C] font-medium">
                    <Link to="/services/mold-remediation">Learn More</Link>
                  </Button>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-heading font-semibold mb-3">Vacation Home Services</h4>
                  <p className="text-gray-600 mb-4">
                    Specialized maintenance for seasonal properties, including pre-arrival freshening and 
                    post-season cleaning to maintain air quality.
                  </p>
                  <Button asChild variant="link" className="p-0 text-[#0A3D7C] font-medium">
                    <Link to="/services/vacation-homes">Learn More</Link>
                  </Button>
                </div>
              </div>
              
              <h3 className="text-xl font-heading font-semibold mb-4">Malibu Areas We Serve</h3>
              <p className="text-gray-600 mb-4">
                Our Malibu service area includes all neighborhoods and surrounding areas:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Malibu Beach</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Point Dume</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Carbon Beach</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Broad Beach</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Malibu Colony</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Serra Retreat</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>La Costa</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Big Rock</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#0A3D7C]" />
                  <span>Las Flores</span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8">
                <h3 className="text-xl font-heading font-semibold mb-4">Benefits of Professional Air Duct Cleaning for Malibu Properties</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Protect Against Coastal Corrosion</h4>
                    <p className="text-gray-600 mb-4">
                      Salt air can accelerate corrosion in HVAC systems. Regular cleaning removes salt deposits 
                      and protects system components, extending equipment life.
                    </p>
                    
                    <h4 className="font-medium mb-2">Reduce Humidity-Related Issues</h4>
                    <p className="text-gray-600 mb-4">
                      Malibu's coastal humidity can contribute to mold growth in air ducts. Our cleaning services 
                      remove existing mold and help prevent future growth.
                    </p>
                    
                    <h4 className="font-medium mb-2">Improve Energy Efficiency</h4>
                    <p className="text-gray-600">
                      Clean air ducts allow your HVAC system to work more efficiently, particularly important in 
                      larger Malibu homes with extensive climate control needs.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Enhance Indoor Air Quality</h4>
                    <p className="text-gray-600 mb-4">
                      Remove accumulated dust, allergens, and pollutants that are common in coastal environments, 
                      allowing you to breathe cleaner, fresher air.
                    </p>
                    
                    <h4 className="font-medium mb-2">Fire Prevention</h4>
                    <p className="text-gray-600 mb-4">
                      Dryer vent cleaning is especially crucial in Malibu's fire-prone areas, as lint buildup is a 
                      leading cause of home fires.
                    </p>
                    
                    <h4 className="font-medium mb-2">Property Value Protection</h4>
                    <p className="text-gray-600">
                      Proper maintenance of air quality systems helps preserve your valuable Malibu real estate 
                      investment by preventing system damage and deterioration.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#0A3D7C]/5 p-6 rounded-lg">
                <h3 className="text-xl font-heading font-semibold mb-3">Why Choose Pure Air California in Malibu</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Specialized experience with Malibu's unique coastal environmental challenges</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Discreet, professional service for high-value properties and estates</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Advanced equipment and techniques to address salt air and humidity challenges</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Expertise in maintaining vacation properties and managing seasonal air quality issues</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center">
                      <Check size={14} className="text-[#0A3D7C]" />
                    </div>
                    <span>Fully insured, licensed, and background-checked technicians</span>
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
                        <p className="font-medium">Malibu Service Area</p>
                        <p className="text-gray-600">Serving all Malibu neighborhoods and surrounding areas</p>
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
                
                <div className="mt-8 border border-gray-100 rounded-lg overflow-hidden">
                  <div className="bg-[#0A3D7C] text-white p-4">
                    <h3 className="font-heading font-semibold">Malibu Customer Testimonial</h3>
                  </div>
                  <div className="p-6 bg-white">
                    <p className="italic text-gray-600 mb-4">
                      "After moving into our beachfront property, we noticed a persistent musty smell. Pure Air California 
                      discovered significant mold growth in our air ducts from the humid salt air. Their thorough cleaning 
                      transformed our home's air quality. We now use their services annually."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#5BBDE4] flex items-center justify-center text-white font-medium">
                        JM
                      </div>
                      <div>
                        <div className="font-medium">Jennifer M.</div>
                        <div className="text-sm text-gray-500">Malibu Colony</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 bg-gradient-to-br from-[#0A3D7C] to-[#5BBDE4] text-white p-6 rounded-lg">
                  <h3 className="font-heading font-semibold text-xl mb-4">Malibu Coastal Air Quality Facts</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p>Malibu homes can contain up to 3x more salt particles in their air ducts compared to inland properties</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p>Humidity levels averaging 75-85% near the coast can accelerate mold growth in ventilation systems</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p>Regular air duct cleaning can extend the lifespan of HVAC systems in coastal properties by up to 30%</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#0A3D7C]/10 to-[#5BBDE4]/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold mb-6">
              Experience Premier Air Duct Cleaning in Malibu
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join our satisfied Malibu customers and discover why Pure Air California is the trusted choice 
              for air duct and dryer vent cleaning for luxury coastal properties.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-[#0A3D7C] hover:bg-[#072c5a]">
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-[#0A3D7C] text-[#0A3D7C] hover:bg-[#0A3D7C] hover:text-white">
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

export default Malibu;
