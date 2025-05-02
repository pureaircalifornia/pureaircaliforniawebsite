
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Fan, Check, AlertTriangle } from 'lucide-react';

const ResidentialDryerVentCleaning = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-brand-700 to-brand-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Residential Dryer Vent Cleaning</h1>
            <p className="text-xl mb-8">
              Prevent fire hazards and improve dryer efficiency with our professional dryer vent cleaning service.
            </p>
            <Button size="lg" className="bg-white text-brand-700 hover:bg-gray-100">
              Schedule Service
            </Button>
          </div>
        </div>
      </section>

      {/* Safety First Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block p-4 bg-red-100 rounded-lg mb-6">
                <AlertTriangle size={42} className="text-red-600" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Safety First: Prevent Dryer Fires</h2>
              <p className="text-lg text-gray-600 mb-6">
                Did you know that clogged dryer vents are responsible for thousands of house fires annually? 
                Lint buildup in dryer vents is highly flammable and restricts airflow, creating dangerous conditions 
                that can lead to fires. Our professional dryer vent cleaning service removes this hazardous buildup, 
                significantly reducing fire risk in your home.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Fire Prevention</span> - Remove flammable lint buildup from your entire vent system</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Improved Efficiency</span> - Reduce drying times and save on energy costs</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Extended Appliance Life</span> - Less strain on your dryer means longer equipment life</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Carbon Monoxide Prevention</span> - Ensure proper venting of gas dryers to prevent CO buildup</p>
                </div>
              </div>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=800" 
                alt="Dryer vent cleaning" 
                className="rounded-lg shadow-lg w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Warning Signs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Warning Signs You Need Dryer Vent Cleaning</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Watch for these telltale signs that your dryer vent needs professional cleaning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Fan size={32} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Longer Drying Times</h3>
              <p className="text-gray-600">
                Clothes taking more than one cycle to dry completely is a clear indicator of restricted airflow in your dryer vent.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Fan size={32} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Excessive Heat</h3>
              <p className="text-gray-600">
                When your dryer or laundry room becomes unusually hot during operation, it may indicate that hot air isn't properly venting.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Fan size={32} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Burning Smell</h3>
              <p className="text-gray-600">
                A burning odor during dryer operation can indicate dangerously overheated lint in your vent system.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Fan size={32} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visible Lint Buildup</h3>
              <p className="text-gray-600">
                Lint accumulating around the dryer vent cover outside your home is a sign of an obstructed system.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Fan size={32} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Regular Maintenance</h3>
              <p className="text-gray-600">
                If it's been more than a year since your last dryer vent cleaning, it's time to schedule service.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Fan size={32} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Dryer Shutting Off</h3>
              <p className="text-gray-600">
                A dryer that automatically shuts off before cycles complete may be overheating due to poor ventilation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Thorough Cleaning Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We follow a comprehensive, multi-step approach to ensure your dryer vent system is completely clean and safe.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 h-full w-0.5 bg-gray-200"></div>
              
              <div className="relative mb-12">
                <div className="flex">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center text-white text-xl font-bold z-10">1</div>
                  <div className="ml-8 pt-3">
                    <h3 className="text-xl font-semibold mb-2">Inspection</h3>
                    <p className="text-gray-600 mb-4">
                      We begin with a thorough inspection of your dryer and vent system to assess the level of 
                      lint buildup and identify any potential obstructions or damage.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative mb-12">
                <div className="flex">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center text-white text-xl font-bold z-10">2</div>
                  <div className="ml-8 pt-3">
                    <h3 className="text-xl font-semibold mb-2">Dryer Disconnection</h3>
                    <p className="text-gray-600 mb-4">
                      We safely disconnect your dryer from the vent to allow access for our specialized cleaning equipment, 
                      ensuring all safety protocols are followed.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative mb-12">
                <div className="flex">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center text-white text-xl font-bold z-10">3</div>
                  <div className="ml-8 pt-3">
                    <h3 className="text-xl font-semibold mb-2">Powerful Cleaning</h3>
                    <p className="text-gray-600 mb-4">
                      Using professional-grade rotary brushes and high-powered vacuum systems, we remove lint, debris, 
                      and obstructions from the entire length of your dryer vent.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative mb-12">
                <div className="flex">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center text-white text-xl font-bold z-10">4</div>
                  <div className="ml-8 pt-3">
                    <h3 className="text-xl font-semibold mb-2">Exterior Vent Cleaning</h3>
                    <p className="text-gray-600 mb-4">
                      We clean the exterior vent cover and ensure it opens and closes properly, 
                      preventing birds, rodents, and insects from entering your vent system.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="flex">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center text-white text-xl font-bold z-10">5</div>
                  <div className="ml-8 pt-3">
                    <h3 className="text-xl font-semibold mb-2">Final Testing</h3>
                    <p className="text-gray-600 mb-4">
                      After reconnecting your dryer, we test the system to verify proper airflow and ensure 
                      your dryer is operating safely and efficiently.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Protect Your Home & Family</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Don't wait for warning signs. Schedule your dryer vent cleaning today and enjoy peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary">Schedule Now</Button>
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

export default ResidentialDryerVentCleaning;
