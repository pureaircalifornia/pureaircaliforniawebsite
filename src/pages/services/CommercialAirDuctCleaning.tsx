import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Building, Check, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

const CommercialAirDuctCleaning = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-brand-700 to-brand-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Commercial Air Duct Cleaning</h1>
            <p className="text-xl mb-8">
              Professional air duct cleaning services for offices, retail spaces, restaurants, and all commercial properties.
            </p>
            <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-gray-100">
              <Link to="/quote">Request Commercial Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Improve Indoor Air Quality for Your Business</h2>
              <p className="text-lg text-gray-600 mb-6">
                Commercial buildings face unique air quality challenges due to high occupancy, diverse activities, 
                and complex HVAC systems. Our commercial air duct cleaning service addresses these challenges, 
                providing a healthier environment for employees, customers, and visitors while optimizing your 
                HVAC system's performance and energy efficiency.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Healthier Work Environment</span> - Reduce allergens, dust, and pollutants that can affect productivity and health</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Energy Savings</span> - Improve HVAC efficiency and potentially reduce energy costs</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Extended System Life</span> - Reduce wear and tear on your valuable HVAC equipment</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Compliance</span> - Meet indoor air quality standards and regulations</p>
                </div>
              </div>
            </div>
            
            <div>
              <img
                src="https://images.unsplash.com/photo-1551639325-8f2e71afa1fc?auto=format&fit=crop&w=800&q=80"
                alt="Professional technician cleaning commercial air ducts"
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commercial air duct cleaning services are tailored to meet the specific needs of various industries.
            </p>
          </div>

          <Tabs defaultValue="office" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
              <TabsTrigger value="office" className="py-3">Office Buildings</TabsTrigger>
              <TabsTrigger value="retail" className="py-3">Retail</TabsTrigger>
              <TabsTrigger value="healthcare" className="py-3">Healthcare</TabsTrigger>
              <TabsTrigger value="hospitality" className="py-3">Hospitality</TabsTrigger>
              <TabsTrigger value="education" className="py-3">Education</TabsTrigger>
            </TabsList>
            
            <TabsContent value="office" className="p-6 bg-white rounded-md mt-4 shadow-sm">
              <div className="flex gap-6 items-start">
                <Building size={48} className="text-brand-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Office Buildings</h3>
                  <p className="text-gray-600 mb-4">
                    Our comprehensive cleaning service for office buildings helps create a healthier work environment 
                    for employees, potentially reducing sick days and improving productivity. We schedule services to 
                    minimize disruption to your business operations.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Users size={16} className="text-brand-600" />
                      <span>Improve employee health and productivity</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users size={16} className="text-brand-600" />
                      <span>Flexible scheduling to minimize business disruption</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users size={16} className="text-brand-600" />
                      <span>Comprehensive service for multi-story buildings</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="retail" className="p-6 bg-white rounded-md mt-4 shadow-sm">
              <div className="flex gap-6 items-start">
                <Building size={48} className="text-brand-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Retail Spaces</h3>
                  <p className="text-gray-600 mb-4">
                    Create a more comfortable shopping environment with clean, fresh air. Our retail services 
                    are scheduled around your hours of operation to ensure zero impact on your customers' 
                    shopping experience.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Users size={16} className="text-brand-600" />
                      <span>Enhanced customer comfort and experience</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users size={16} className="text-brand-600" />
                      <span>After-hours service availability</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users size={16} className="text-brand-600" />
                      <span>Special attention to sales floor and customer areas</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="healthcare" className="p-6 bg-white rounded-md mt-4 shadow-sm">
              <div className="flex gap-6 items-start">
                <Building size={48} className="text-brand-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Healthcare Facilities</h3>
                  <p className="text-gray-600 mb-4">
                    We understand the critical importance of air quality in healthcare settings. Our specialized 
                    healthcare facility cleaning follows strict protocols to ensure safety, compliance with 
                    healthcare regulations, and minimal disruption to patient care.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Users size={16} className="text-brand-600" />
                      <span>Compliance with healthcare facility standards</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users size={16} className="text-brand-600" />
                      <span>Specialized equipment for sensitive environments</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users size={16} className="text-brand-600" />
                      <span>Enhanced infection control measures</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="hospitality" className="p-6 bg-white rounded-md mt-4 shadow-sm">
              <div className="flex gap-6 items-start">
                <Building size={48} className="text-brand-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Hotels & Restaurants</h3>
                  <p className="text-gray-600 mb-4">
                    Guest comfort is paramount in hospitality settings. Our services help eliminate odors, 
                    improve air quality, and ensure your HVAC systems are operating efficiently for guest comfort.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Users size={16} className="text-brand-600" />
                      <span>Odor elimination and improved guest experience</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users size={16} className="text-brand-600" />
                      <span>Kitchen exhaust system cleaning for restaurants</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users size={16} className="text-brand-600" />
                      <span>Scheduling that accommodates occupancy patterns</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="education" className="p-6 bg-white rounded-md mt-4 shadow-sm">
              <div className="flex gap-6 items-start">
                <Building size={48} className="text-brand-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Schools & Universities</h3>
                  <p className="text-gray-600 mb-4">
                    Create healthier learning environments with our educational facility cleaning services. 
                    We schedule around academic calendars to ensure minimal disruption to educational activities.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Users size={16} className="text-brand-600" />
                      <span>Healthier classrooms and study areas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users size={16} className="text-brand-600" />
                      <span>Services scheduled during breaks and off-hours</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users size={16} className="text-brand-600" />
                      <span>Special attention to high-occupancy areas</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Commercial Cleaning Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We follow a systematic approach to ensure thorough cleaning of your commercial duct systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-xl mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Initial Assessment</h3>
              <p className="text-gray-600">
                We conduct a thorough inspection of your HVAC system, including all accessible ductwork, to create a customized cleaning plan.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-xl mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">System Preparation</h3>
              <p className="text-gray-600">
                We protect your commercial space, set up specialized equipment, and create negative pressure to prevent dust dispersal.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-xl mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Deep Cleaning</h3>
              <p className="text-gray-600">
                Using commercial-grade equipment, we remove accumulated dust, debris, and contaminants from your entire duct system.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-xl mb-4">4</div>
              <h3 className="text-xl font-semibold mb-2">Final Verification</h3>
              <p className="text-gray-600">
                We inspect the system after cleaning, restore all access points, and provide documentation of service performed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Benefits for Your Business</h2>
            
            <div className="space-y-6 mt-10">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                  <Users size={24} className="text-brand-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Employee Productivity</h3>
                  <p className="text-gray-600">
                    Studies have shown that improved indoor air quality can lead to increased productivity and 
                    decreased absenteeism in the workplace. Clean air ducts help reduce airborne irritants that 
                    can cause fatigue, headaches, and respiratory issues.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                  <Building size={24} className="text-brand-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Energy Cost Reduction</h3>
                  <p className="text-gray-600">
                    Clean ductwork allows your HVAC system to operate more efficiently, potentially reducing 
                    energy consumption by up to 30%. This translates to lower utility bills and a smaller 
                    carbon footprint for your business.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                  <Building size={24} className="text-brand-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Extended Equipment Life</h3>
                  <p className="text-gray-600">
                    Regular duct cleaning reduces strain on your HVAC system, potentially extending its operational 
                    life and reducing the frequency of costly repairs and equipment replacement.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                  <Users size={24} className="text-brand-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Customer Experience</h3>
                  <p className="text-gray-600">
                    For businesses that serve customers on-premises, clean air contributes to a more pleasant 
                    experience. Eliminating odors, dust, and allergens creates a more comfortable environment 
                    that customers will appreciate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Improve Your Commercial Space?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today for a free consultation and customized quote for your business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link to="/quote">Get Commercial Quote</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white hover:text-brand-600">
              Call (310) 555-1234
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommercialAirDuctCleaning;
