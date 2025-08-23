import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Filter, Check, ArrowRight, Home, Shield, Award, Clock, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ResidentialElectrostaticFilter = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Residential Electrostatic Air Filter Services | Pure Air California</title>
        <meta name="description" content="Upgrade your home's air filtration with advanced electrostatic air filters. Superior filtration, washable filters, improved air quality. Get a free consultation today." />
        <meta name="keywords" content="electrostatic air filter, residential air filter, washable air filter, air filtration system, indoor air quality, HVAC filter, air purifier" />
        <meta property="og:title" content="Residential Electrostatic Air Filter Services | Pure Air California" />
        <meta property="og:description" content="Upgrade your home's air filtration with advanced electrostatic air filters. Superior filtration, washable filters, improved air quality." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pureairca.com/services/residential-electrostatic-filter" />
        <link rel="canonical" href="https://pureairca.com/services/residential-electrostatic-filter" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Residential Electrostatic Air Filter",
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
            "description": "Upgrade your home's air filtration with advanced electrostatic air filters. Superior filtration, washable filters, improved air quality.",
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Residential Electrostatic Air Filter Services</h1>
            <p className="text-xl mb-8">
              Upgrade your home's air filtration with advanced electrostatic air filters for superior indoor air quality. 
              Washable, reusable filters that capture microscopic particles and improve your family's health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-gray-100">
                <Link to="/quote">Get Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-700">
                <Link to="/contact">Schedule Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Advanced Filtration Technology for Your Home</h2>
              <p className="text-lg text-gray-600 mb-6">
                Electrostatic air filters use an electric charge to attract and capture airborne particles, 
                offering superior filtration compared to standard filters. These advanced filters can trap 
                microscopic contaminants including dust, pollen, pet dander, mold spores, bacteria, and even smoke particles, 
                providing cleaner, healthier air for your family.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Superior Filtration</span> - Capture particles as small as 0.1 microns with 95%+ efficiency</p>
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
                  <p><span className="font-medium">Eco-Friendly</span> - Reduce waste by eliminating disposable filters and their packaging</p>
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
                src="https://images.unsplash.com/photo-1631392561719-acb5c75c3ad5?auto=format&fit=crop&w=800&q=80"
                alt="Professional technician installing electrostatic filter"
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                loading="lazy"
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
              Understanding the science behind superior air filtration and how electrostatic technology captures even the smallest particles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                  <Zap size={24} className="text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Static Charge Generation</h3>
                <p className="text-gray-600">
                  As air passes through the filter, it creates a static electrical charge that attracts and captures airborne particles.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                  <Filter size={24} className="text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Particle Capture</h3>
                <p className="text-gray-600">
                  Microscopic particles including dust, pollen, pet dander, and even bacteria are attracted to and held by the charged filter media.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                  <Home size={24} className="text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Clean Air Delivery</h3>
                <p className="text-gray-600">
                  Filtered, clean air is distributed throughout your home, providing a healthier environment for your family.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Benefits of Electrostatic Air Filters</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover why electrostatic air filters are the superior choice for residential air filtration and indoor air quality improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Filter size={48} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Superior Filtration Efficiency</h3>
              <p className="text-gray-600">
                Capture particles as small as 0.1 microns with 95%+ efficiency, far exceeding standard disposable filters.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Shield size={48} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Health Benefits</h3>
              <p className="text-gray-600">
                Reduce allergens, asthma triggers, and respiratory irritants for improved family health and comfort.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Award size={48} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Cost Savings</h3>
              <p className="text-gray-600">
                Eliminate ongoing filter replacement costs. Washable filters last for years with proper maintenance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Home size={48} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Environmental Impact</h3>
              <p className="text-gray-600">
                Reduce waste by eliminating disposable filters and their packaging from landfills.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Clock size={48} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Low Maintenance</h3>
              <p className="text-gray-600">
                Easy cleaning process that can be done at home. No need to remember filter replacement schedules.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Zap size={48} className="text-brand-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">HVAC Protection</h3>
              <p className="text-gray-600">
                Protect your HVAC system from dust and debris buildup, potentially extending its lifespan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Professional Installation Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our certified technicians ensure proper installation and setup of your electrostatic air filter system for optimal performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Assessment</h3>
              <p className="text-gray-600">
                Evaluate your current HVAC system and determine the best electrostatic filter solution for your home.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Installation</h3>
              <p className="text-gray-600">
                Professional installation of the electrostatic filter system with proper sizing and fitment.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Testing</h3>
              <p className="text-gray-600">
                Verify proper operation and airflow to ensure optimal performance of your new filter system.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-600">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Education</h3>
              <p className="text-gray-600">
                Provide detailed instructions on maintenance and cleaning procedures for long-term performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Guide */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Maintenance & Care Guide</h2>
              <p className="text-lg text-gray-600">
                Keep your electrostatic air filter performing at peak efficiency with proper maintenance and cleaning.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Cleaning Frequency</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Clean every 1-3 months depending on usage</li>
                  <li>• More frequent cleaning if you have pets</li>
                  <li>• Check monthly during allergy season</li>
                  <li>• Clean when airflow seems restricted</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Cleaning Process</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Remove filter from HVAC system</li>
                  <li>• Rinse with warm water and mild soap</li>
                  <li>• Allow to air dry completely</li>
                  <li>• Reinstall when fully dry</li>
                </ul>
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
              Get answers to common questions about electrostatic air filters and their benefits.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">How do electrostatic filters compare to HEPA filters?</h3>
              <p className="text-gray-600">
                Electrostatic filters offer similar filtration efficiency to HEPA filters but are more cost-effective long-term. 
                They're washable and reusable, eliminating ongoing replacement costs while providing excellent particle capture.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">How often do I need to clean my electrostatic filter?</h3>
              <p className="text-gray-600">
                Most homeowners should clean their electrostatic filter every 1-3 months. If you have pets, allergies, 
                or live in a dusty environment, more frequent cleaning may be necessary.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Can electrostatic filters help with allergies?</h3>
              <p className="text-gray-600">
                Yes! Electrostatic filters are excellent for allergy sufferers. They capture pollen, pet dander, 
                dust mites, and other common allergens, significantly reducing their presence in your home's air.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Do electrostatic filters affect HVAC efficiency?</h3>
              <p className="text-gray-600">
                When properly maintained, electrostatic filters have minimal impact on HVAC efficiency. 
                In fact, they can improve system performance by preventing dust buildup on internal components.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">How long do electrostatic filters last?</h3>
              <p className="text-gray-600">
                With proper care and regular cleaning, electrostatic filters can last 5-10 years or more. 
                The washable design eliminates the need for replacement, making them a long-term investment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Are electrostatic filters safe for children and pets?</h3>
              <p className="text-gray-600">
                Absolutely! Electrostatic filters are completely safe for children and pets. They don't produce ozone 
                or harmful byproducts and actually improve air quality for everyone in your home.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">What's included in your installation service?</h3>
              <p className="text-gray-600">
                Our installation service includes system assessment, professional installation, performance testing, 
                and detailed maintenance instructions. We also provide ongoing support and maintenance guidance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Do you offer maintenance services?</h3>
              <p className="text-gray-600">
                Yes, we offer maintenance programs that include regular filter cleaning, system inspections, 
                and performance optimization to ensure your electrostatic filter continues to work effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Upgrade Your Home's Air Quality Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the difference that advanced electrostatic air filtration can make in your home. 
            Contact us for a free consultation and quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-gray-100">
              <Link to="/quote">Get Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-700">
              <Link to="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResidentialElectrostaticFilter;
