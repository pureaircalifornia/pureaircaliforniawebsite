
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Filter, Check, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ResidentialElectrostaticFilter = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-brand-700 to-brand-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Residential Electrostatic Air Filter Service</h1>
            <p className="text-xl mb-8">
              Upgrade your home's air filtration with advanced electrostatic air filters for superior indoor air quality.
            </p>
            <Button size="lg" className="bg-white text-brand-700 hover:bg-gray-100">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Advanced Filtration Technology</h2>
              <p className="text-lg text-gray-600 mb-6">
                Electrostatic air filters use an electric charge to attract and capture airborne particles, 
                offering superior filtration compared to standard filters. These advanced filters can trap 
                microscopic contaminants including dust, pollen, pet dander, mold spores, bacteria, and even smoke particles.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Superior Filtration</span> - Capture particles as small as 0.1 microns</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Cost Effective</span> - Washable and reusable filters eliminate ongoing replacement costs</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Eco-Friendly</span> - Reduce waste by eliminating disposable filters</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Improved Air Quality</span> - Breathe cleaner, healthier air in your home</p>
                </div>
              </div>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1591825729269-caeb344f6df2?auto=format&fit=crop&w=800" 
                alt="Electrostatic air filter" 
                className="rounded-lg shadow-lg w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Electrostatic Filtration Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Understanding the science behind superior air filtration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                  <div className="text-xl font-bold text-brand-600">1</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Static Charge</h3>
                <p className="text-gray-600">
                  As air passes through the filter's multiple layers of material, friction generates a static electric charge.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                  <div className="text-xl font-bold text-brand-600">2</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Particle Attraction</h3>
                <p className="text-gray-600">
                  This charge attracts and holds airborne particles to the filter media, much like a magnet attracts metal.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                  <div className="text-xl font-bold text-brand-600">3</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Continuous Filtration</h3>
                <p className="text-gray-600">
                  The filter continues to work efficiently, trapping particles throughout your home as air circulates.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Electrostatic Filter Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer complete electrostatic filter solutions for your home
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <Filter size={36} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Filter Installation</h3>
              <p className="text-gray-600 mb-4">
                Our technicians will properly measure your system and install custom-fitted electrostatic 
                filters designed specifically for your home's HVAC setup.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <ArrowRight size={14} className="text-brand-600" />
                  <span>Custom sizing for your specific system</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight size={14} className="text-brand-600" />
                  <span>Professional installation</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight size={14} className="text-brand-600" />
                  <span>System performance verification</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <Filter size={36} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Filter Maintenance</h3>
              <p className="text-gray-600 mb-4">
                Keep your electrostatic filters working at peak efficiency with our professional 
                cleaning and maintenance service.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <ArrowRight size={14} className="text-brand-600" />
                  <span>Thorough filter cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight size={14} className="text-brand-600" />
                  <span>Inspection for damage or wear</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight size={14} className "text-brand-600" />
                  <span>Performance optimization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Tips Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Maintaining Your Electrostatic Filters</h2>
            <p className="text-lg text-gray-600 mb-10 text-center">
              While our professional service ensures optimal performance, here are some tips for keeping your 
              electrostatic filters in great condition between servicing:
            </p>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Regular Cleaning Schedule</h3>
                <p className="text-gray-600">
                  Clean your electrostatic filters every 1-3 months, depending on usage, pets, and seasonal factors. 
                  More frequent cleaning might be needed during high pollen seasons or if you have multiple pets.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Proper Cleaning Method</h3>
                <p className="text-gray-600">
                  Gently rinse with warm water first to remove larger particles. For a deeper clean, use mild soap and 
                  water. Avoid harsh chemicals that can damage the filter media or reduce its electrostatic properties.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Complete Drying</h3>
                <p className="text-gray-600">
                  Allow filters to dry completely before reinstallation. Installing a damp filter can promote mold growth 
                  and reduce filtration efficiency. Lean the filter against a wall in a well-ventilated area for 24-48 hours.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Professional Service</h3>
                <p className="text-gray-600">
                  Schedule professional maintenance at least once a year. Our technicians can perform a thorough deep cleaning, 
                  inspect for any damage, and ensure your filters are working at peak efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Upgrade to Better Air Filtration Today</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Experience the difference that electrostatic air filtration can make in your home's air quality.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary">Schedule Installation</Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white hover:text-brand-600">
              Call For Consultation
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResidentialElectrostaticFilter;
