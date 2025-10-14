import React from 'react';
import IndustryPageLayout from '@/components/IndustryPageLayout';
import { Check, Shield, Star, Building, Factory } from 'lucide-react';

const Manufacturing = () => {
  return (
    <IndustryPageLayout
      title="Air Quality Solutions for Manufacturing Facilities"
      subtitle="Industrial-grade ventilation and air quality services for manufacturing environments."
      heroImage="https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?auto=format&fit=crop&w=1920&q=80"
    >
      {/* Overview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Industrial Air Quality Management for Manufacturing</h2>
            <p className="text-lg text-gray-600 mb-6">
              In manufacturing environments, air quality impacts worker health, regulatory compliance, product quality, and equipment longevity. Pure Air California provides specialized industrial-grade air quality solutions designed specifically for manufacturing facilities throughout Southern California.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our manufacturing-focused services help maintain optimal air quality while supporting operational efficiency, worker safety, and compliance with regulatory requirements.
            </p>
            <div className="mt-8 p-6 bg-brand-50 rounded-lg border border-brand-100">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex-shrink-0 flex items-center justify-center">
                  <Factory size={24} className="text-brand-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Specialized Industrial Equipment</h3>
                  <p className="text-gray-600">
                    Our industrial-grade equipment and specialized techniques are designed to handle the unique challenges of manufacturing environments, including heavy particulate loads, process contaminants, and large-scale ventilation systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Benefits for Manufacturing Operations</h2>
          <p className="text-lg text-gray-600 mb-10 text-center max-w-3xl mx-auto">
            Our specialized air quality solutions provide significant benefits for manufacturing facilities:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Shield size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Worker Health & Safety</h3>
              <p className="text-gray-600">
                Improved air quality helps protect workers from airborne contaminants and potentially reduces respiratory issues among staff.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Factory size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Regulatory Compliance</h3>
              <p className="text-gray-600">
                Our services help ensure your facility meets OSHA, EPA, and local air quality requirements for industrial operations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Star size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Improved Product Quality</h3>
              <p className="text-gray-600">
                For sensitive manufacturing processes, cleaner air can help maintain product quality and reduce contamination risks.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Building size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Equipment Protection</h3>
              <p className="text-gray-600">
                Clean air systems help protect precision machinery from dust and particulate buildup that can cause premature wear.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Factory size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Energy Efficiency</h3>
              <p className="text-gray-600">
                Properly maintained ventilation systems operate more efficiently, potentially reducing energy consumption and costs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Shield size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fire Risk Reduction</h3>
              <p className="text-gray-600">
                Regular cleaning of dust collection systems and air ducts helps reduce combustible dust hazards in industrial settings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Manufacturing-Specific Services</h2>
          <p className="text-lg text-gray-600 mb-10 text-center max-w-3xl mx-auto">
            We offer comprehensive air quality solutions tailored specifically for manufacturing environments:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Industrial Ventilation Systems</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Air makeup unit maintenance</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Process exhaust cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Industrial hood and fan servicing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Large-scale HVAC system cleaning</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Dust Collection Systems</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Dust collector cleaning and maintenance</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Ductwork for dust extraction systems</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Filter replacement programs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Combustible dust hazard reduction</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Environmental Compliance</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Air quality testing and documentation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Regulatory inspection preparation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Emissions control system maintenance</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Compliance documentation and reporting</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Specialized Industrial Services</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Clean room air system maintenance</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Paint booth ventilation cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Welding fume extraction system service</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Industrial dryer vent maintenance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Why Manufacturing Facilities Trust Pure Air California</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <Factory size={28} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Industrial Experience</h3>
              <p className="text-gray-600">
                Our technicians are specifically trained to handle the unique challenges and scale of manufacturing facilities.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <Shield size={28} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safety-First Approach</h3>
              <p className="text-gray-600">
                We maintain strict safety protocols and are familiar with industrial safety requirements for servicing manufacturing environments.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <Star size={28} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Minimal Production Disruption</h3>
              <p className="text-gray-600">
                We schedule our services around your production requirements to minimize or eliminate operational downtime.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white p-6 rounded-lg shadow-sm max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">Manufacturing Sectors We Serve</h3>
            <p className="text-gray-600 text-center mb-6">
              We provide specialized air quality services to manufacturing facilities across numerous sectors:
            </p>
            <ul className="grid grid-cols-2 gap-4">
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Aerospace & Defense</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Electronics Manufacturing</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Food & Beverage Production</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Pharmaceutical Production</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Automotive Parts Production</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Plastics & Composites</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Metal Fabrication</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Woodworking Facilities</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </IndustryPageLayout>
  );
};

export default Manufacturing;
