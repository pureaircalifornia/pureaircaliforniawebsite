
import React from 'react';
import IndustryPageLayout from '@/components/IndustryPageLayout';
import { Check, Shield, Star, Building } from 'lucide-react';

const Restaurants = () => {
  return (
    <IndustryPageLayout
      title="Air Quality Solutions for Restaurants"
      subtitle="Specialized commercial kitchen ventilation and air duct cleaning services for dining establishments."
      heroImage="https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=1920&q=80"
    >
      {/* Overview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Kitchen Ventilation Excellence for Restaurants</h2>
            <p className="text-lg text-gray-600 mb-6">
              In restaurant environments, proper ventilation is essential for food quality, customer comfort, staff health, and fire safety. Pure Air California provides specialized air quality and exhaust system cleaning services designed specifically for restaurants, cafes, and commercial kitchens throughout Southern California.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our restaurant-focused services ensure your kitchen ventilation systems operate efficiently while meeting all health and safety regulations, protecting your business and enhancing your dining environment.
            </p>
            <div className="mt-8 p-6 bg-brand-50 rounded-lg border border-brand-100">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex-shrink-0 flex items-center justify-center">
                  <Shield size={24} className="text-brand-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Fire Prevention Focus</h3>
                  <p className="text-gray-600">
                    Kitchen exhaust systems can accumulate grease that presents a serious fire hazard. Our thorough cleaning processes remove this buildup, significantly reducing fire risk and helping you maintain compliance with fire codes and insurance requirements.
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
          <h2 className="text-3xl font-bold mb-6 text-center">Benefits for Restaurant Operations</h2>
          <p className="text-lg text-gray-600 mb-10 text-center max-w-3xl mx-auto">
            Our specialized air quality and exhaust cleaning services provide significant benefits for restaurants and commercial kitchens:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Shield size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fire Risk Reduction</h3>
              <p className="text-gray-600">
                Regular cleaning of kitchen exhaust systems dramatically reduces the risk of grease fires that can devastate your business.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Building size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Health Code Compliance</h3>
              <p className="text-gray-600">
                Our services help ensure your restaurant meets all local health department requirements for ventilation and air quality.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Star size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Improved Dining Experience</h3>
              <p className="text-gray-600">
                Clean air systems help eliminate cooking odors and improve the overall atmosphere for your guests.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Building size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Enhanced Staff Comfort</h3>
              <p className="text-gray-600">
                Properly functioning ventilation creates a more comfortable working environment for kitchen staff, potentially improving retention.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Shield size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Insurance Compliance</h3>
              <p className="text-gray-600">
                Many insurance policies require regular exhaust cleaning. We provide detailed documentation of all services performed.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Star size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Energy Efficiency</h3>
              <p className="text-gray-600">
                Clean systems operate more efficiently, potentially reducing the energy costs associated with your kitchen ventilation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Restaurant-Specific Services</h2>
          <p className="text-lg text-gray-600 mb-10 text-center max-w-3xl mx-auto">
            We offer comprehensive air quality and ventilation solutions tailored specifically for restaurant environments:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Kitchen Exhaust Cleaning</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Hood and duct degreasing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Exhaust fan maintenance</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Grease filter service and replacement</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Rooftop grease containment</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Dining Area Air Quality</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>HVAC system cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Air duct sanitization</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Air filtration upgrades</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Odor control solutions</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Compliance Services</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>NFPA 96 standard compliance</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Health department certification</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Insurance documentation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>System inspection reports</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Specialized Equipment</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Make-up air system cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Commercial dryer vent cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Walk-in refrigeration system maintenance</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>UV system installation for hood systems</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Why Restaurants Trust Pure Air California</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <Shield size={28} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Industry Expertise</h3>
              <p className="text-gray-600">
                We understand the unique challenges and requirements of restaurant ventilation systems and the critical importance of cleanliness.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <Star size={28} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Restaurant-Friendly Scheduling</h3>
              <p className="text-gray-600">
                We work around your business hours to minimize disruption, with overnight and early morning service options available.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <Building size={28} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete Documentation</h3>
              <p className="text-gray-600">
                We provide thorough documentation of all services for your records, inspections, and insurance requirements.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white p-6 rounded-lg shadow-sm max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">Restaurant Clients We've Served</h3>
            <p className="text-gray-600 text-center mb-6">
              We're proud to work with dining establishments across Southern California, including:
            </p>
            <ul className="grid grid-cols-2 gap-4">
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Fine Dining Restaurants</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Fast Casual Chains</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Food Halls & Markets</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Hotel Restaurants</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Cafes & Bakeries</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Institutional Kitchens</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Catering Companies</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Breweries & Wineries</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </IndustryPageLayout>
  );
};

export default Restaurants;
