
import React from 'react';
import IndustryPageLayout from '@/components/IndustryPageLayout';
import { Check, Shield, Star, Building } from 'lucide-react';

const Retail = () => {
  return (
    <IndustryPageLayout
      title="Air Quality Solutions for Retail Spaces"
      subtitle="Creating comfortable shopping environments that enhance customer experience and protect merchandise."
      heroImage="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1920&q=80"
    >
      {/* Overview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Enhancing Customer Experience Through Superior Air Quality</h2>
            <p className="text-lg text-gray-600 mb-6">
              In retail environments, air quality directly impacts the customer experience, staff comfort, and even merchandise condition. Pure Air California provides specialized air quality services designed specifically for retail spaces throughout Southern California.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our retail-focused services help maintain pristine indoor environments while improving energy efficiency and supporting your brand's commitment to customer comfort.
            </p>
            <div className="mt-8 p-6 bg-brand-50 rounded-lg border border-brand-100">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex-shrink-0 flex items-center justify-center">
                  <Star size={24} className="text-brand-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Minimal Disruption Service</h3>
                  <p className="text-gray-600">
                    Our specialized approach for retail spaces ensures minimal disruption to your business operations. We can work during off-hours to ensure your customers enjoy a comfortable shopping experience without interruption.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services and Benefits Sections */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Retail-Specific Services</h2>
          <p className="text-lg text-gray-600 mb-10 text-center max-w-3xl mx-auto">
            We provide comprehensive air quality solutions tailored for retail environments:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">HVAC and Air Duct Services</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Shopping center HVAC system cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Air duct inspection and cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Odor elimination solutions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Post-construction cleanup for new retail spaces</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Environmental Quality Enhancement</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Air filtration system upgrades</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Mall and shopping center common area services</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Indoor air quality testing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Preventative maintenance programs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Why Retail Businesses Trust Pure Air California</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <Shield size={28} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Retail Experience</h3>
              <p className="text-gray-600">
                We understand the unique challenges of retail environments and the importance of maintaining a comfortable shopping atmosphere.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <Star size={28} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">
                Our teams can work during off-hours to ensure zero disruption to your business operations and customer experience.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <Building size={28} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Brand Protection</h3>
              <p className="text-gray-600">
                Our discreet and professional service helps maintain your brand image while improving your facility's air quality.
              </p>
            </div>
          </div>
        </div>
      </section>
    </IndustryPageLayout>
  );
};

export default Retail;
