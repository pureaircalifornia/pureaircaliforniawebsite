
import React from 'react';
import IndustryPageLayout from '@/components/IndustryPageLayout';
import { Check, Shield, Star, Building } from 'lucide-react';

const Hospitality = () => {
  return (
    <IndustryPageLayout
      title="Air Quality Solutions for Hospitality"
      subtitle="Enhancing guest experience and operational efficiency in hotels, resorts, and conference centers."
      heroImage="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80"
    >
      {/* Overview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Elevating Guest Experience Through Superior Air Quality</h2>
            <p className="text-lg text-gray-600 mb-6">
              In the hospitality industry, guest comfort is paramount. Clean, fresh air is an often overlooked but essential component of creating exceptional guest experiences. Pure Air California provides specialized air quality services designed specifically for hotels, resorts, and conference centers throughout Southern California.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our hospitality-focused air duct cleaning and ventilation services help maintain pristine indoor environments while improving energy efficiency and operational costs.
            </p>
            <div className="mt-8 p-6 bg-brand-50 rounded-lg border border-brand-100">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex-shrink-0 flex items-center justify-center">
                  <Star size={24} className="text-brand-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Low-Disruption Service Methodology</h3>
                  <p className="text-gray-600">
                    Our specialized approach minimizes disruption to your operations and guest experience. We can work during off-peak hours or in sections to ensure your property continues to deliver exceptional service during maintenance.
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
          <h2 className="text-3xl font-bold mb-6 text-center">Benefits for Hospitality Properties</h2>
          <p className="text-lg text-gray-600 mb-10 text-center max-w-3xl mx-auto">
            Our specialized air quality services provide significant benefits for hotels, resorts, and hospitality venues:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Star size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Enhanced Guest Experience</h3>
              <p className="text-gray-600">
                Clean air creates more comfortable rooms and common areas, leading to better guest reviews and increased satisfaction.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Shield size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Odor Elimination</h3>
              <p className="text-gray-600">
                Our thorough cleaning processes remove dust, mold, and other contaminants that can cause unpleasant odors in guest rooms.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Building size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Energy Efficiency</h3>
              <p className="text-gray-600">
                Clean HVAC systems require less energy to operate, reducing utility costs in your high-occupancy property.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Star size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Allergen Reduction</h3>
              <p className="text-gray-600">
                Cleaner air ducts mean fewer allergens, creating a more comfortable environment for sensitive guests.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Shield size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Extended Equipment Life</h3>
              <p className="text-gray-600">
                Regular maintenance extends the life of your HVAC infrastructure, reducing capital expenditure needs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Building size={24} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sustainability Credentials</h3>
              <p className="text-gray-600">
                Enhanced air quality can support your property's green initiatives and sustainability certifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Hospitality-Specific Services</h2>
          <p className="text-lg text-gray-600 mb-10 text-center max-w-3xl mx-auto">
            We offer comprehensive air quality solutions tailored specifically for hospitality environments:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Guest Room Air Systems</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Individual room PTAC unit cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>In-room ventilation system sanitization</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Bathroom exhaust cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Air filtration system upgrades</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Common Area Solutions</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Lobby and reception area duct cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Conference center ventilation services</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Restaurant and dining area exhaust systems</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Spa and pool area specialized services</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Kitchen Exhaust Services</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Commercial kitchen hood cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Exhaust fan maintenance</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Grease filter replacement</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Fire safety compliance services</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Laundry Ventilation</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Commercial dryer vent cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Lint removal and fire prevention</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Exhaust system efficiency optimization</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Energy efficiency improvements</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Why Hospitality Venues Trust Pure Air California</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <Star size={28} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Hospitality Experience</h3>
              <p className="text-gray-600">
                We understand the unique needs of hotels and resorts, from scheduling around guest occupancy to maintaining pristine environments.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <Shield size={28} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Discrete Service</h3>
              <p className="text-gray-600">
                Our professional teams work quietly and efficiently, maintaining your property's ambiance while improving its air quality.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <Building size={28} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Solutions</h3>
              <p className="text-gray-600">
                From guest rooms to kitchens to common areas, we provide complete air quality management for your entire property.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white p-6 rounded-lg shadow-sm max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">Hospitality Clients We've Served</h3>
            <p className="text-gray-600 text-center mb-6">
              We're proud to work with leading hospitality properties across Southern California, including:
            </p>
            <ul className="grid grid-cols-2 gap-4">
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Luxury Hotels & Resorts</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Boutique Properties</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Major Hotel Chains</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Conference Centers</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Bed & Breakfasts</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Vacation Rentals</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Casino Resorts</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-brand-600" />
                <span>Spa Retreats</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </IndustryPageLayout>
  );
};

export default Hospitality;
