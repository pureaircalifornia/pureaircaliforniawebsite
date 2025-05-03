
import React from 'react';
import IndustryPageLayout from '@/components/IndustryPageLayout';
import { Check, Shield, Star, Building } from 'lucide-react';

const HealthcareFacilities = () => {
  return (
    <IndustryPageLayout
      title="Air Quality Solutions for Healthcare Facilities"
      subtitle="Creating safer, healthier environments for patients, staff, and visitors in hospitals, clinics, and medical offices."
      heroImage="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1920&q=80"
    >
      {/* Overview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">The Critical Importance of Air Quality in Healthcare</h2>
            <p className="text-lg text-gray-600 mb-6">
              In healthcare environments, air quality isn't just about comfort—it's a critical component of infection control, patient recovery, and staff wellbeing. Pure Air California provides specialized air quality services designed specifically for healthcare facilities throughout Southern California.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our hospital-grade air duct cleaning and maintenance services help healthcare facilities maintain the highest standards of air quality while complying with all relevant healthcare regulations and accreditation requirements.
            </p>
            <div className="mt-8 p-6 bg-brand-50 rounded-lg border border-brand-100">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex-shrink-0 flex items-center justify-center">
                  <Shield size={24} className="text-brand-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">HEPA-Filtered Vacuum Technology</h3>
                  <p className="text-gray-600">
                    Our healthcare-specific services utilize specialized HEPA-filtered vacuum technology that captures 99.97% of particles as small as 0.3 microns, ensuring that our cleaning process doesn't introduce contaminants into your sensitive environment.
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
          <h2 className="text-3xl font-bold mb-6 text-center">Benefits for Healthcare Facilities</h2>
          <p className="text-lg text-gray-600 mb-10 text-center max-w-3xl mx-auto">
            Our specialized air quality services provide significant benefits for healthcare environments:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Shield size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reduced Infection Risk</h3>
              <p className="text-gray-600">
                Clean air systems help reduce airborne pathogens that can contribute to healthcare-associated infections (HAIs), supporting your infection control protocols.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Building size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Regulatory Compliance</h3>
              <p className="text-gray-600">
                Our services help you meet JCAHO, OSHA, and other regulatory requirements for air quality in healthcare environments.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Star size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Patient Recovery</h3>
              <p className="text-gray-600">
                Improved air quality can positively impact patient recovery times and overall comfort during their stay.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Building size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Staff Well-being</h3>
              <p className="text-gray-600">
                Healthcare professionals work long hours in your facility. Clean air helps protect their health and can reduce sick days.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Star size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Energy Efficiency</h3>
              <p className="text-gray-600">
                Clean HVAC systems operate more efficiently, reducing energy consumption and operational costs in your facility.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Shield size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">System Longevity</h3>
              <p className="text-gray-600">
                Regular maintenance extends the life of your expensive HVAC infrastructure, maximizing your facility's investment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Healthcare-Specific Services</h2>
          <p className="text-lg text-gray-600 mb-10 text-center max-w-3xl mx-auto">
            We offer comprehensive air quality solutions tailored specifically for healthcare environments:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">HVAC and Air Duct Cleaning</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Hospital-grade sanitization protocols</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Operating room ventilation system maintenance</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Negative pressure room duct services</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Isolation room specialized cleaning</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Filtration Solutions</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>HEPA filter installation and replacement</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Electrostatic filter systems</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>UV germicidal irradiation systems</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Antimicrobial coating application</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Compliance & Documentation</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Detailed records for regulatory inspections</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Air quality testing and documentation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Compliance reports for accreditation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Regular maintenance scheduling</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Specialized Services</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Surgical suite air system maintenance</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Laboratory exhaust system cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Airborne infection isolation room services</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Emergency 24/7 service for critical facilities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Why Healthcare Facilities Trust Pure Air California</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <Shield size={28} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Healthcare Certified</h3>
              <p className="text-gray-600">
                Our technicians receive specialized training for healthcare environments and follow strict protocols designed for medical facilities.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <Building size={28} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Minimal Disruption</h3>
              <p className="text-gray-600">
                We understand healthcare facilities operate 24/7. Our services are scheduled to minimize disruption to your critical operations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <Star size={28} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
              <p className="text-gray-600">
                We've helped dozens of healthcare facilities throughout Southern California improve their air quality and maintain compliance.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white p-6 rounded-lg shadow-sm max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">Healthcare Clients We've Served</h3>
            <p className="text-gray-600 text-center mb-6">
              We're proud to work with leading healthcare providers across Southern California, including:
            </p>
            <ul className="grid grid-cols-2 gap-4">
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Major Hospital Networks</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Outpatient Surgery Centers</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Medical Office Buildings</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Rehabilitation Facilities</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Dental Practices</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Assisted Living Centers</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Urgent Care Clinics</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Medical Research Facilities</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </IndustryPageLayout>
  );
};

export default HealthcareFacilities;
