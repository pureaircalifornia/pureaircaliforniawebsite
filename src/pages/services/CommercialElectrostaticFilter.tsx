
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Filter, Check, Building, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const CommercialElectrostaticFilter = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-brand-700 to-brand-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Commercial Electrostatic Air Filter Systems</h1>
            <p className="text-xl mb-8">
              Advanced air filtration solutions for businesses seeking superior indoor air quality and HVAC efficiency.
            </p>
            <Button size="lg" className="bg-white text-brand-700 hover:bg-gray-100">
              Get a Commercial Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Superior Filtration for Commercial Environments</h2>
              <p className="text-lg text-gray-600 mb-6">
                Commercial buildings face unique air quality challenges due to high occupancy, diverse activities, 
                and complex HVAC systems. Our commercial electrostatic filter systems provide an advanced, 
                cost-effective solution that captures a higher percentage of airborne contaminants compared to 
                standard filters, while reducing ongoing maintenance costs.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Enhanced Filtration Efficiency</span> - Capture particles as small as 0.1 microns, including bacteria, pollen, dust, and smoke</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Reduced Operating Costs</span> - Eliminate the need for frequent disposable filter replacements</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Lower Energy Consumption</span> - Improve HVAC efficiency and reduce utility costs</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Environmentally Responsible</span> - Washable, reusable filters reduce landfill waste from disposable filters</p>
                </div>
              </div>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800" 
                alt="Commercial building with clean air" 
                className="rounded-lg shadow-lg w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Industry-Specific Solutions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commercial electrostatic filter systems are tailored to meet the specific needs of different industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <Building size={36} className="text-brand-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Office Buildings</h3>
                <p className="text-gray-600 mb-4">
                  Create healthier work environments that can reduce employee sick days and increase productivity.
                </p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li className="flex items-start gap-2">
                    <ArrowRight size={14} className="text-brand-600 mt-1 flex-shrink-0" />
                    <span>Improve air quality in open office plans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight size={14} className="text-brand-600 mt-1 flex-shrink-0" />
                    <span>Reduce dust on equipment and surfaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight size={14} className="text-brand-600 mt-1 flex-shrink-0" />
                    <span>Scale solutions for buildings of any size</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <Building size={36} className="text-brand-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Healthcare Facilities</h3>
                <p className="text-gray-600 mb-4">
                  Enhance infection control measures with superior filtration designed for medical environments.
                </p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li className="flex items-start gap-2">
                    <ArrowRight size={14} className="text-brand-600 mt-1 flex-shrink-0" />
                    <span>Capture airborne pathogens and allergens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight size={14} className="text-brand-600 mt-1 flex-shrink-0" />
                    <span>HEPA-equivalent filtration options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight size={14} className="text-brand-600 mt-1 flex-shrink-0" />
                    <span>Compatible with hospital-grade HVAC systems</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <Building size={36} className="text-brand-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Educational Institutions</h3>
                <p className="text-gray-600 mb-4">
                  Create healthier learning environments with cleaner air for students, faculty, and staff.
                </p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li className="flex items-start gap-2">
                    <ArrowRight size={14} className="text-brand-600 mt-1 flex-shrink-0" />
                    <span>Reduce spread of airborne illnesses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight size={14} className="text-brand-600 mt-1 flex-shrink-0" />
                    <span>Cost-effective for school budgets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight size={14} className="text-brand-600 mt-1 flex-shrink-0" />
                    <span>Easy maintenance for facility staff</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <Building size={36} className="text-brand-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Retail Spaces</h3>
                <p className="text-gray-600 mb-4">
                  Enhance customer comfort while protecting merchandise from dust and pollutants.
                </p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li className="flex items-start gap-2">
                    <ArrowRight size={14} className="text-brand-600 mt-1 flex-shrink-0" />
                    <span>Reduce dust accumulation on merchandise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight size={14} className="text-brand-600 mt-1 flex-shrink-0" />
                    <span>Create a more comfortable shopping environment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight size={14} className="text-brand-600 mt-1 flex-shrink-0" />
                    <span>Modular solutions for spaces of any size</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <Building size={36} className="text-brand-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Manufacturing Facilities</h3>
                <p className="text-gray-600 mb-4">
                  Manage industrial dust and particulates with heavy-duty filtration systems.
                </p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li className="flex items-start gap-2">
                    <ArrowRight size={14} className="text-brand-600 mt-1 flex-shrink-0" />
                    <span>High-capacity systems for industrial settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight size={14} className="text-brand-600 mt-1 flex-shrink-0" />
                    <span>Capture process-specific particulates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight size={14} className="text-brand-600 mt-1 flex-shrink-0" />
                    <span>Durable filters for demanding environments</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <Building size={36} className="text-brand-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Hospitality</h3>
                <p className="text-gray-600 mb-4">
                  Enhance guest experience with superior air quality in hotels and restaurants.
                </p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li className="flex items-start gap-2">
                    <ArrowRight size={14} className="text-brand-600 mt-1 flex-shrink-0" />
                    <span>Eliminate odors and airborne contaminants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight size={14} className="text-brand-600 mt-1 flex-shrink-0" />
                    <span>Special solutions for kitchen exhaust systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight size={14} className="text-brand-600 mt-1 flex-shrink-0" />
                    <span>Customizable filtration for guest areas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Our Commercial Electrostatic Filters Work</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Understanding the science behind this advanced filtration technology
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-semibold mb-4">The Electrostatic Advantage</h3>
                <p className="text-gray-600 mb-4">
                  Commercial electrostatic filters utilize the principles of static electricity to capture airborne 
                  particles more efficiently than conventional filters. As air passes through multiple layers of 
                  filter media, an electrostatic charge is created that attracts and holds particulates.
                </p>
                <p className="text-gray-600">
                  This passive electrostatic process requires no electricity and creates a stronger attraction to 
                  airborne particles than mechanical filtration alone, resulting in superior air cleaning performance.
                </p>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1535350356005-fd52b3b524fb?auto=format&fit=crop&w=800" 
                  alt="Electrostatic filter technology" 
                  className="rounded-lg shadow-lg w-full h-auto" 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                  <div className="text-xl font-bold text-brand-600">1</div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Particle Charging</h3>
                <p className="text-gray-600">
                  As air enters the filter, the first layer of specialized media imparts a slight electrical charge 
                  to airborne particles of all sizes.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                  <div className="text-xl font-bold text-brand-600">2</div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Magnetic-Like Attraction</h3>
                <p className="text-gray-600">
                  Subsequent layers of the filter contain oppositely charged media that attract and capture the 
                  charged particles, similar to how a magnet attracts metal.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                  <div className="text-xl font-bold text-brand-600">3</div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Enhanced Particle Retention</h3>
                <p className="text-gray-600">
                  The electrostatic bond holds captured particles securely within the filter, preventing them 
                  from becoming dislodged even under high air flow conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Commercial Filter Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive electrostatic filter solutions for commercial properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <Filter size={36} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Custom System Design</h3>
              <p className="text-gray-600 mb-4">
                We evaluate your facility's specific needs and design a custom electrostatic filtration system 
                that integrates seamlessly with your existing HVAC infrastructure.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-600" />
                  <span>Comprehensive HVAC system evaluation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-600" />
                  <span>Custom filtration specifications</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-600" />
                  <span>Engineered solutions for any size facility</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-600" />
                  <span>Professional installation</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <Filter size={36} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Maintenance Programs</h3>
              <p className="text-gray-600 mb-4">
                Keep your electrostatic filters operating at peak efficiency with our professional cleaning 
                and maintenance service plans tailored to your facility's needs.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-600" />
                  <span>Scheduled filter cleaning and maintenance</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-600" />
                  <span>System performance verification</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-600" />
                  <span>Filter replacement when necessary</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-600" />
                  <span>Documentation for facility records</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Return on Investment</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Commercial electrostatic filters provide significant long-term cost savings and efficiency benefits
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 mb-8">
              <h3 className="text-xl font-semibold mb-4">Cost Analysis: Disposable vs. Electrostatic</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3">Cost Factor</th>
                      <th className="px-4 py-3">Disposable Filters</th>
                      <th className="px-4 py-3">Electrostatic Filters</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3">Initial Investment</td>
                      <td className="px-4 py-3">Low</td>
                      <td className="px-4 py-3">Moderate</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3">Annual Replacement Costs</td>
                      <td className="px-4 py-3">High (4-12 changes/year)</td>
                      <td className="px-4 py-3">None</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3">Maintenance Costs</td>
                      <td className="px-4 py-3">Labor for frequent changes</td>
                      <td className="px-4 py-3">Periodic cleaning</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3">Energy Efficiency</td>
                      <td className="px-4 py-3">Decreases as filter loads</td>
                      <td className="px-4 py-3">Consistent</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3">Average Lifespan</td>
                      <td className="px-4 py-3">1-3 months</td>
                      <td className="px-4 py-3">5-10 years</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">5-Year Total Cost</td>
                      <td className="px-4 py-3">$7,500 - $15,000*</td>
                      <td className="px-4 py-3">$3,000 - $5,000*</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mt-3">*Estimated costs for a mid-sized commercial building. Actual savings will vary based on facility size and specific requirements.</p>
            </div>
            
            <div className="bg-brand-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Additional ROI Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-brand-600 mt-1 flex-shrink-0" />
                  <span><span className="font-medium">Reduced HVAC Maintenance Costs</span> - Cleaner systems require less frequent servicing and repair</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-brand-600 mt-1 flex-shrink-0" />
                  <span><span className="font-medium">Extended Equipment Life</span> - Properly filtered systems can last years longer</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-brand-600 mt-1 flex-shrink-0" />
                  <span><span className="font-medium">Productivity Gains</span> - Better air quality can reduce sick days and improve worker performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-brand-600 mt-1 flex-shrink-0" />
                  <span><span className="font-medium">Environmental Impact</span> - Reduced waste from disposable filters</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Upgrade Your Commercial Filtration</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today for a consultation and custom quote for your commercial property.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary">Request a Consultation</Button>
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

export default CommercialElectrostaticFilter;
