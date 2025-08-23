import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { AirVent, Check, Building, ArrowRight, Shield, Award, Clock, Users, Home, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const HVACSystemCleaning = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>HVAC System Cleaning Services | Pure Air California</title>
        <meta name="description" content="Professional HVAC system cleaning services for residential and commercial properties. Improve efficiency, indoor air quality, and extend system life. Get a free quote today." />
        <meta name="keywords" content="HVAC system cleaning, air conditioning cleaning, heating system cleaning, HVAC maintenance, indoor air quality, system efficiency" />
        <meta property="og:title" content="HVAC System Cleaning Services | Pure Air California" />
        <meta property="og:description" content="Professional HVAC system cleaning services for residential and commercial properties. Improve efficiency, indoor air quality, and extend system life." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pureairca.com/services/hvac-system-cleaning" />
        <link rel="canonical" href="https://pureairca.com/services/hvac-system-cleaning" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "HVAC System Cleaning",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Pure Air California",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Airway Blvd",
                "addressLocality": "Los Angeles",
                "addressRegion": "CA",
                "postalCode": "90001",
                "addressCountry": "US"
              },
              "telephone": "+18005551234"
            },
            "description": "Professional HVAC system cleaning services for residential and commercial properties. Improve efficiency, indoor air quality, and extend system life.",
            "areaServed": {
              "@type": "State",
              "name": "California"
            }
          })}
        </script>
      </Helmet>

      <NavBar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-brand-700 to-brand-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">HVAC System Cleaning Services</h1>
            <p className="text-xl mb-8">
              Complete cleaning and maintenance for your heating and cooling system. Improve efficiency, 
              indoor air quality, and extend the life of your HVAC equipment with our professional cleaning services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-gray-100">
                <Link to="/quote">Get Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-700">
                <Link to="/contact">Schedule Service</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Complete HVAC System Cleaning & Maintenance</h2>
              <p className="text-lg text-gray-600 mb-6">
                Your HVAC system is the heart of your home's comfort and air quality. Over time, dust, debris, 
                and contaminants accumulate throughout the system, reducing efficiency and potentially causing 
                health issues. Our comprehensive HVAC cleaning service restores your system to peak performance.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Improved Efficiency</span> - Clean systems operate more efficiently, reducing energy costs by 15-25%</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Better Air Quality</span> - Remove allergens, dust, and contaminants from your indoor air</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Extended Equipment Life</span> - Reduce wear and tear, potentially adding years to your system's lifespan</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Preventive Maintenance</span> - Identify and address potential issues before they become costly problems</p>
                </div>
              </div>
            </div>
            
            <div>
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
                alt="Professional technician cleaning HVAC system"
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Clean */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Clean</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive HVAC cleaning service addresses every component of your heating and cooling system 
              to ensure optimal performance and air quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <AirVent size={48} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Air Ducts & Vents</h3>
              <p className="text-gray-600">
                Thorough cleaning of all supply and return air ducts, removing dust, debris, and contaminants 
                that can affect air quality and system efficiency.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Building size={48} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Air Handlers & Coils</h3>
              <p className="text-gray-600">
                Deep cleaning of evaporator and condenser coils to improve heat transfer efficiency 
                and prevent system strain and breakdowns.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Zap size={48} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Blower Motors & Fans</h3>
              <p className="text-gray-600">
                Cleaning of blower assemblies and fan blades to ensure proper airflow and reduce 
                energy consumption while improving system performance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Home size={48} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Drain Pans & Lines</h3>
              <p className="text-gray-600">
                Cleaning and sanitizing of condensate drain pans and lines to prevent clogs, 
                water damage, and mold growth in your system.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Shield size={48} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Filters & Media</h3>
              <p className="text-gray-600">
                Inspection and replacement of air filters, plus cleaning of electrostatic filter media 
                to maintain optimal filtration efficiency.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Users size={48} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Registers & Grilles</h3>
              <p className="text-gray-600">
                Cleaning of all air registers, grilles, and diffusers to ensure proper air distribution 
                and improve the appearance of your vents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Professional Cleaning Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We follow a comprehensive, step-by-step process to ensure your HVAC system is thoroughly cleaned 
              and operating at peak efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">System Assessment</h3>
              <p className="text-gray-600">
                Comprehensive inspection of your HVAC system to identify cleaning needs and potential issues.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Equipment Setup</h3>
              <p className="text-gray-600">
                Set up professional cleaning equipment including HEPA vacuums and specialized tools.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Deep Cleaning</h3>
              <p className="text-gray-600">
                Thorough cleaning of all system components using professional-grade equipment and techniques.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-600">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Performance Testing</h3>
              <p className="text-gray-600">
                Test system performance and provide recommendations for optimal operation and maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Benefits of Professional HVAC Cleaning</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Regular HVAC system cleaning provides numerous benefits for your home, health, and wallet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Award size={48} className="text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Energy Savings</h3>
              <p className="text-gray-600">
                Clean systems operate more efficiently, reducing energy consumption and lowering utility bills by 15-25%.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Shield size={48} className="text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Better Air Quality</h3>
              <p className="text-gray-600">
                Remove allergens, dust, mold spores, and other contaminants that can affect respiratory health.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Clock size={48} className="text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Extended Equipment Life</h3>
              <p className="text-gray-600">
                Reduce wear and tear on system components, potentially extending your HVAC system's lifespan by years.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Home size={48} className="text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Improved Comfort</h3>
              <p className="text-gray-600">
                Better airflow and temperature distribution throughout your home for enhanced comfort.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Users size={48} className="text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Health Benefits</h3>
              <p className="text-gray-600">
                Reduce allergy symptoms, respiratory issues, and other health problems related to poor indoor air quality.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <ArrowRight size={48} className="text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Preventive Maintenance</h3>
              <p className="text-gray-600">
                Identify potential issues early and prevent costly repairs and system breakdowns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* When to Clean */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">When Should You Clean Your HVAC System?</h2>
              <p className="text-lg text-gray-600">
                Regular HVAC cleaning is essential for optimal performance and air quality. Here are the recommended intervals:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Residential Properties</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Every 3-5 years for standard homes</li>
                    <li>• Every 2-3 years if you have pets</li>
                    <li>• Every 1-2 years if family members have allergies</li>
                    <li>• After home renovations or construction</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Commercial Properties</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Every 2-3 years for office buildings</li>
                    <li>• Annually for healthcare facilities</li>
                    <li>• Every 1-2 years for retail spaces</li>
                    <li>• After major renovations or tenant changes</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Warning Signs</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Visible dust or debris around vents</li>
                    <li>• Unusual odors from HVAC system</li>
                    <li>• Increased allergy symptoms</li>
                    <li>• Reduced airflow from vents</li>
                    <li>• Higher energy bills</li>
                    <li>• System running longer than usual</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Special Circumstances</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• After water damage or flooding</li>
                    <li>• If mold is detected</li>
                    <li>• After pest infestations</li>
                    <li>• When moving into a new home</li>
                    <li>• After major air quality issues</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about our HVAC system cleaning services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">How often should I have my HVAC system cleaned?</h3>
              <p className="text-gray-600">
                We recommend cleaning every 3-5 years for most residential properties. However, if you have pets, 
                allergies, or live in a dusty environment, more frequent cleaning may be necessary. Commercial 
                properties typically need cleaning every 1-3 years depending on usage and industry.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">How long does HVAC system cleaning take?</h3>
              <p className="text-gray-600">
                The duration depends on the size and complexity of your system. Most residential cleanings take 4-8 hours, 
                while larger commercial systems may require multiple days. We'll provide a time estimate during our initial assessment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">What equipment do you use for cleaning?</h3>
              <p className="text-gray-600">
                We use professional-grade equipment including HEPA vacuums, rotary brushes, compressed air systems, 
                and specialized cleaning tools designed specifically for HVAC systems. All equipment is designed to 
                clean thoroughly without damaging your system.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Will the cleaning process disrupt my home or business?</h3>
              <p className="text-gray-600">
                We minimize disruption by working efficiently and cleanly. For residential services, we can work around 
                your schedule. For commercial properties, we offer after-hours service to avoid disrupting business operations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Do you provide maintenance programs?</h3>
              <p className="text-gray-600">
                Yes, we offer comprehensive maintenance programs that include regular inspections, cleaning schedules, 
                and priority service. These programs help maintain optimal system performance and prevent costly repairs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">How much does HVAC system cleaning cost?</h3>
              <p className="text-gray-600">
                Our pricing is competitive and depends on the size and complexity of your system. We provide free, 
                no-obligation quotes and transparent pricing with no hidden fees. The investment typically pays for 
                itself through energy savings and extended equipment life.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">What's included in your HVAC cleaning service?</h3>
              <p className="text-gray-600">
                Our service includes cleaning of all major system components: air ducts, coils, blower assemblies, 
                drain pans, filters, and registers. We also provide a comprehensive inspection and performance testing 
                to ensure optimal operation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Do you offer emergency service?</h3>
              <p className="text-gray-600">
                Yes, we offer emergency HVAC cleaning services for urgent situations such as mold contamination, 
                water damage, or severe air quality issues. Contact us immediately for same-day service availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Improve Your HVAC System Performance Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the benefits of professional HVAC system cleaning. Contact us for a free consultation 
            and quote to restore your system to peak performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-gray-100">
              <Link to="/quote">Get Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-700">
              <Link to="/contact">Schedule Service</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HVACSystemCleaning;