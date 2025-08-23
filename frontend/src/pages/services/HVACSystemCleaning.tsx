import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Shield, Clock, Users, Building, Fan, Zap, Award } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import TrustBadges from '@/components/TrustBadges';

const HVACSystemCleaning = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Professional HVAC System Cleaning Services | Pure Air California</title>
        <meta 
          name="description" 
          content="Complete HVAC system cleaning services to improve efficiency, indoor air quality, and system longevity. Serving residential and commercial customers across California with certified technicians." 
        />
        <meta name="keywords" content="HVAC system cleaning, air conditioning cleaning, heating system cleaning, ductwork cleaning, indoor air quality, California HVAC services" />
        <meta property="og:title" content="Professional HVAC System Cleaning Services | Pure Air California" />
        <meta property="og:description" content="Complete HVAC system cleaning services to improve efficiency and indoor air quality. Certified technicians serving California." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pureaircalifornia.com/services/hvac-system-cleaning" />
        <link rel="canonical" href="https://pureaircalifornia.com/services/hvac-system-cleaning" />
      </Helmet>

      <NavBar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional HVAC System Cleaning Services
            </h1>
            <p className="text-xl mb-8">
              Complete HVAC system cleaning and maintenance to improve efficiency, indoor air quality, and extend the lifespan of your heating and cooling equipment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                <Link to="/quote">Get Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
                <Link to="/contact">Schedule Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Complete HVAC System Cleaning & Maintenance</h2>
              <p className="text-lg text-gray-600 mb-6">
                Your HVAC system is the heart of your indoor environment, circulating air throughout your home or business. 
                Over time, dust, debris, allergens, and microbial growth accumulate throughout the system, reducing efficiency 
                and compromising indoor air quality. Our comprehensive HVAC system cleaning service addresses every component 
                to restore optimal performance and create a healthier environment.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <span className="font-medium">Improved System Efficiency</span>
                    <p className="text-gray-600">Clean components reduce energy consumption by up to 40%</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <span className="font-medium">Enhanced Indoor Air Quality</span>
                    <p className="text-gray-600">Remove allergens, dust, and contaminants from circulating air</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <span className="font-medium">Extended Equipment Life</span>
                    <p className="text-gray-600">Reduce wear and tear on expensive HVAC components</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <span className="font-medium">Preventive Maintenance</span>
                    <p className="text-gray-600">Identify and address issues before they become costly problems</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <img
                src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80"
                alt="Professional HVAC system cleaning and maintenance"
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          </div>

          {/* What We Clean */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Complete HVAC System Components We Clean</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <div className="flex items-center mb-4">
                  <Fan className="text-blue-600 mr-3" size={24} />
                  <h3 className="text-xl font-semibold">Air Handlers & Blowers</h3>
                </div>
                <p className="text-gray-600">
                  Thorough cleaning of fan blades, motors, and housing to restore optimal airflow and efficiency.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border">
                <div className="flex items-center mb-4">
                  <Building className="text-blue-600 mr-3" size={24} />
                  <h3 className="text-xl font-semibold">Ductwork & Vents</h3>
                </div>
                <p className="text-gray-600">
                  Complete duct cleaning using negative air pressure technology to remove all accumulated debris.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border">
                <div className="flex items-center mb-4">
                  <Zap className="text-blue-600 mr-3" size={24} />
                  <h3 className="text-xl font-semibold">Coils & Heat Exchangers</h3>
                </div>
                <p className="text-gray-600">
                  Professional cleaning of evaporator and condenser coils to restore heat transfer efficiency.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border">
                <div className="flex items-center mb-4">
                  <Shield className="text-blue-600 mr-3" size={24} />
                  <h3 className="text-xl font-semibold">Drain Pans & Lines</h3>
                </div>
                <p className="text-gray-600">
                  Cleaning and sanitizing of condensate drain systems to prevent clogs and microbial growth.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border">
                <div className="flex items-center mb-4">
                  <Clock className="text-blue-600 mr-3" size={24} />
                  <h3 className="text-xl font-semibold">Thermostats & Controls</h3>
                </div>
                <p className="text-gray-600">
                  Inspection and cleaning of control systems to ensure accurate temperature regulation.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border">
                <div className="flex items-center mb-4">
                  <Award className="text-blue-600 mr-3" size={24} />
                  <h3 className="text-xl font-semibold">Air Filters & Media</h3>
                </div>
                <p className="text-gray-600">
                  Assessment and replacement of filtration systems for optimal air quality protection.
                </p>
              </div>
            </div>
          </div>

          {/* Our Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Professional HVAC Cleaning Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 text-blue-800 rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold mb-3">Comprehensive Inspection</h3>
                <p className="text-gray-600">
                  We begin with a thorough assessment of your entire HVAC system to identify areas needing attention.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 text-blue-800 rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold mb-3">Advanced Equipment Setup</h3>
                <p className="text-gray-600">
                  Our certified technicians use state-of-the-art cleaning equipment and containment systems.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 text-blue-800 rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold mb-3">Thorough Cleaning</h3>
                <p className="text-gray-600">
                  Every component is meticulously cleaned using industry-best practices and EPA-approved methods.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 text-blue-800 rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl mx-auto mb-4">4</div>
                <h3 className="text-xl font-semibold mb-3">Quality Assurance</h3>
                <p className="text-gray-600">
                  Final inspection and testing to ensure your system is operating at peak performance.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-gray-50 p-8 rounded-lg mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Benefits of Professional HVAC System Cleaning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Energy Efficiency & Cost Savings</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                    <span>Reduce energy consumption by up to 40%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                    <span>Lower monthly utility bills</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                    <span>Improve system performance and reliability</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                    <span>Extend equipment lifespan by 3-5 years</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Health & Indoor Air Quality</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                    <span>Remove allergens, dust, and contaminants</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                    <span>Reduce respiratory issues and allergies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                    <span>Eliminate microbial growth and odors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                    <span>Create a healthier living environment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Residential & Commercial HVAC Cleaning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <div className="flex items-center mb-4">
                  <Users className="text-blue-600 mr-3" size={24} />
                  <h3 className="text-xl font-semibold">Residential HVAC Cleaning</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Keep your family healthy and comfortable with our residential HVAC system cleaning services. 
                  We clean all components of your home's heating and cooling system to ensure optimal performance.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Single-family homes and townhouses</li>
                  <li>• Multi-family residential buildings</li>
                  <li>• Custom homes and luxury properties</li>
                  <li>• Seasonal maintenance programs</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border">
                <div className="flex items-center mb-4">
                  <Building className="text-blue-600 mr-3" size={24} />
                  <h3 className="text-xl font-semibold">Commercial HVAC Cleaning</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Maintain optimal indoor air quality and system efficiency for your business. Our commercial 
                  HVAC cleaning services are designed to meet the unique needs of commercial properties.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Office buildings and retail spaces</li>
                  <li>• Healthcare facilities and schools</li>
                  <li>• Restaurants and hospitality venues</li>
                  <li>• Manufacturing and industrial facilities</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-700 text-white p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Improve Your HVAC System Performance?</h2>
            <p className="text-xl mb-6">
              Contact Pure Air California today for professional HVAC system cleaning services. 
              Our certified technicians are ready to help you breathe easier and save money on energy costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                <Link to="/quote">Get Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
                <Link to="/contact">Schedule Service</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HVACSystemCleaning;