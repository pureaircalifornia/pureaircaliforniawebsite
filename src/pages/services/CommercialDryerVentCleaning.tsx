import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Fan, Check, AlertTriangle, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const CommercialDryerVentCleaning = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-brand-700 to-brand-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Commercial Dryer Vent Cleaning</h1>
            <p className="text-xl mb-8">
              Specialized dryer vent cleaning services for laundromats, hotels, multi-unit buildings, and all commercial laundry operations.
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
              <div className="inline-block p-4 bg-red-100 rounded-lg mb-6">
                <AlertTriangle size={42} className="text-red-600" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Commercial Dryer Vent Safety</h2>
              <p className="text-lg text-gray-600 mb-6">
                Commercial dryer systems present significant fire risks if not properly maintained. 
                The high volume of use in commercial settings leads to faster lint accumulation, 
                creating dangerous conditions. Our specialized commercial dryer vent cleaning service
                is designed for the unique needs of businesses with laundry operations.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Fire Prevention</span> - Eliminate lint buildup that creates serious fire hazards</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Operational Efficiency</span> - Reduce drying times and energy consumption</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Equipment Longevity</span> - Extended lifespan for your commercial dryers</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Compliance</span> - Meet fire code requirements and insurance standards</p>
                </div>
              </div>
            </div>
            
            <div>
              <img
                src="https://images.unsplash.com/photo-1635274605638-d44babc08a4f?auto=format&fit=crop&w=800&q=80"
                alt="Professional technician cleaning commercial dryer vent"
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
              We provide specialized commercial dryer vent cleaning for various industries with laundry operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Building size={36} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Laundromats</h3>
              <p className="text-gray-600 mb-4">
                High-volume laundry facilities require regular maintenance to ensure safe and efficient operation. 
                We provide specialized cleaning for multiple dryer units and complex ventilation systems.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>Multi-unit dryer vent systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>Minimal business disruption</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>Scheduled maintenance programs</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Building size={36} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Hotels & Hospitality</h3>
              <p className="text-gray-600 mb-4">
                Keep your hotel laundry operations running safely and efficiently with our specialized cleaning services 
                designed for hospitality facilities.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>Industrial-sized dryer systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>Flexible scheduling around guest needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>Improved energy efficiency</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Building size={36} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Multi-Family Housing</h3>
              <p className="text-gray-600 mb-4">
                Ensure the safety of your apartment complex or condominium building with professional dryer 
                vent cleaning for common laundry facilities or individual units.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>Common laundry room maintenance</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>In-unit dryer vent cleaning</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>Resident safety assurance</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Building size={36} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Healthcare Facilities</h3>
              <p className="text-gray-600 mb-4">
                Hospitals and healthcare facilities with on-site laundry operations require specialized 
                attention to maintain safety and hygiene standards.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>Compliance with healthcare regulations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>Specialized cleaning for medical environments</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>Minimal disruption to operations</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Building size={36} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Restaurants & Food Service</h3>
              <p className="text-gray-600 mb-4">
                Restaurants with on-site laundry for linens and uniforms need regular maintenance to 
                prevent fire hazards in these high-risk environments.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>Kitchen-adjacent dryer safety</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>After-hours service available</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>Fire prevention in high-risk settings</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Building size={36} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Schools & Universities</h3>
              <p className="text-gray-600 mb-4">
                Educational institutions with athletic departments, dormitories, or culinary programs 
                benefit from our specialized cleaning services.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>Athletic department laundry facilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>Dormitory laundry rooms</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>Scheduled during breaks and low-usage periods</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Commercial Dryer Vent Cleaning Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We follow a thorough process to ensure your commercial dryer vents are completely clean and safe.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-600 to-brand-300"></div>
              
              <div className="relative mb-12 pl-20">
                <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center text-white text-xl font-bold">1</div>
                <h3 className="text-xl font-semibold mb-3">Initial Assessment</h3>
                <p className="text-gray-600">
                  Our technicians conduct a thorough inspection of your commercial dryer systems, vent lines, 
                  and exterior termination points to evaluate the extent of lint buildup and any potential obstructions.
                </p>
              </div>
              
              <div className="relative mb-12 pl-20">
                <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center text-white text-xl font-bold">2</div>
                <h3 className="text-xl font-semibold mb-3">Equipment Setup</h3>
                <p className="text-gray-600">
                  We use commercial-grade equipment specially designed for high-capacity dryer systems. 
                  Our setup process includes protecting the surrounding area and preparing for lint containment.
                </p>
              </div>
              
              <div className="relative mb-12 pl-20">
                <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center text-white text-xl font-bold">3</div>
                <h3 className="text-xl font-semibold mb-3">Comprehensive Cleaning</h3>
                <p className="text-gray-600">
                  Using specialized rotary brushes and powerful vacuum systems, we thoroughly clean the entire length 
                  of your vent lines, removing lint buildup, debris, and obstructions that restrict airflow and create fire hazards.
                </p>
              </div>
              
              <div className="relative mb-12 pl-20">
                <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center text-white text-xl font-bold">4</div>
                <h3 className="text-xl font-semibold mb-3">Exterior Vent Maintenance</h3>
                <p className="text-gray-600">
                  We clean and inspect exterior vent terminations, ensuring they open and close properly 
                  and are free from obstructions that could impede airflow or create safety issues.
                </p>
              </div>
              
              <div className="relative pl-20">
                <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center text-white text-xl font-bold">5</div>
                <h3 className="text-xl font-semibold mb-3">Final Inspection & Documentation</h3>
                <p className="text-gray-600">
                  We verify the system is completely clean, properly reconnect all components, and provide 
                  detailed documentation of the service for your facility maintenance records and insurance requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Plans */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Commercial Maintenance Programs</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Keep your commercial dryer systems operating safely with our scheduled maintenance programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md border border-brand-100">
              <h3 className="text-xl font-semibold mb-4">Quarterly Service</h3>
              <p className="text-gray-600 mb-6">
                Ideal for high-volume laundromats and facilities with continuous daily operation.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>Four scheduled cleanings per year</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>Priority emergency service</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>15% discount on additional services</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>Detailed documentation for compliance</span>
                </li>
              </ul>
              <Button className="w-full bg-brand-600 hover:bg-brand-700">Contact for Pricing</Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md border border-brand-100">
              <h3 className="text-xl font-semibold mb-4">Semi-Annual Service</h3>
              <p className="text-gray-600 mb-6">
                Perfect for hotels, healthcare facilities, and moderate-use commercial operations.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>Two scheduled cleanings per year</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>48-hour emergency service response</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>10% discount on additional services</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>Annual compliance reporting</span>
                </li>
              </ul>
              <Button className="w-full bg-brand-600 hover:bg-brand-700">Contact for Pricing</Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md border border-brand-100">
              <h3 className="text-xl font-semibold mb-4">Annual Service</h3>
              <p className="text-gray-600 mb-6">
                Suitable for apartment complexes, schools, and lower-volume operations.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>One comprehensive cleaning per year</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>Standard emergency service</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>5% discount on additional services</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-brand-600 mt-1" />
                  <span>Basic service documentation</span>
                </li>
              </ul>
              <Button className="w-full bg-brand-600 hover:bg-brand-700">Contact for Pricing</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Protect Your Business & Equipment</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Don't risk a fire hazard in your commercial facility. Schedule professional dryer vent cleaning today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link to="/quote">Schedule Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white hover:text-brand-600">
              Call (213) 792-4145
            </Button>
            <a href="tel:+12137924145" className="inline-block mt-2 text-brand-600 hover:text-brand-800 transition-colors font-medium">Call Now</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommercialDryerVentCleaning;
