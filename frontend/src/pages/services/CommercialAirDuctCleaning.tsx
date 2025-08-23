import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Building, Check, Users, Clock, Shield, Award, ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const CommercialAirDuctCleaning = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Commercial Air Duct Cleaning Services | Pure Air California</title>
        <meta name="description" content="Professional commercial air duct cleaning services for offices, retail, healthcare, and hospitality. Improve indoor air quality, reduce energy costs, and ensure compliance. Get a free quote today." />
        <meta name="keywords" content="commercial air duct cleaning, office air duct cleaning, retail air duct cleaning, healthcare air duct cleaning, indoor air quality, HVAC cleaning, business air duct cleaning" />
        <meta property="og:title" content="Commercial Air Duct Cleaning Services | Pure Air California" />
        <meta property="og:description" content="Professional commercial air duct cleaning services for offices, retail, healthcare, and hospitality. Improve indoor air quality, reduce energy costs, and ensure compliance." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pureairca.com/services/commercial-air-duct-cleaning" />
        <link rel="canonical" href="https://pureairca.com/services/commercial-air-duct-cleaning" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Commercial Air Duct Cleaning",
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
            "description": "Professional commercial air duct cleaning services for offices, retail, healthcare, and hospitality. Improve indoor air quality, reduce energy costs, and ensure compliance.",
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Commercial Air Duct Cleaning Services</h1>
            <p className="text-xl mb-8">
              Professional air duct cleaning services for offices, retail spaces, restaurants, healthcare facilities, and all commercial properties. Improve indoor air quality, reduce energy costs, and ensure compliance with industry standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-gray-100">
                <Link to="/quote">Request Commercial Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-700">
                <Link to="/contact">Schedule Consultation</Link>
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
              <h2 className="text-3xl font-bold mb-6">Improve Indoor Air Quality for Your Business</h2>
              <p className="text-lg text-gray-600 mb-6">
                Commercial buildings face unique air quality challenges due to high occupancy, diverse activities, 
                and complex HVAC systems. Our commercial air duct cleaning service addresses these challenges, 
                providing a healthier environment for employees, customers, and visitors while optimizing your 
                HVAC system's performance and energy efficiency.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Healthier Work Environment</span> - Reduce allergens, dust, and pollutants that can affect productivity and health</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Energy Savings</span> - Improve HVAC efficiency and potentially reduce energy costs by 15-25%</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Extended System Life</span> - Reduce wear and tear on your valuable HVAC equipment</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Compliance & Safety</span> - Meet indoor air quality standards and regulations for commercial properties</p>
                </div>
              </div>
            </div>
            
            <div>
              <img
                src="https://images.unsplash.com/photo-1551639325-8f2e71afa1fc?auto=format&fit=crop&w=800&q=80"
                alt="Professional technician cleaning commercial air ducts"
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commercial air duct cleaning services are tailored to meet the specific needs of various industries, 
              ensuring optimal indoor air quality and compliance with industry standards.
            </p>
          </div>

          <Tabs defaultValue="office" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
              <TabsTrigger value="office" className="py-3">Office Buildings</TabsTrigger>
              <TabsTrigger value="retail" className="py-3">Retail</TabsTrigger>
              <TabsTrigger value="healthcare" className="py-3">Healthcare</TabsTrigger>
              <TabsTrigger value="hospitality" className="py-3">Hospitality</TabsTrigger>
              <TabsTrigger value="industrial" className="py-3">Industrial</TabsTrigger>
            </TabsList>

            <TabsContent value="office" className="mt-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <Building size={48} className="text-brand-600" />
                  <div>
                    <h3 className="text-2xl font-bold">Office Buildings</h3>
                    <p className="text-gray-600">Creating healthier work environments for improved productivity</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Benefits:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Reduce sick days and improve employee health</li>
                      <li>• Enhance productivity and focus</li>
                      <li>• Meet LEED certification requirements</li>
                      <li>• Improve energy efficiency</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Our Process:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Comprehensive duct inspection</li>
                      <li>• Advanced cleaning equipment</li>
                      <li>• Sanitization treatment</li>
                      <li>• Post-cleaning verification</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="retail" className="mt-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <Building size={48} className="text-brand-600" />
                  <div>
                    <h3 className="text-2xl font-bold">Retail Spaces</h3>
                    <p className="text-gray-600">Maintaining clean air for better customer experience</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Benefits:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Improve customer comfort and satisfaction</li>
                      <li>• Reduce odors and allergens</li>
                      <li>• Protect merchandise from dust damage</li>
                      <li>• Enhance shopping experience</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Special Considerations:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• After-hours service available</li>
                      <li>• Minimal disruption to business</li>
                      <li>• Flexible scheduling options</li>
                      <li>• Emergency service for urgent needs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="healthcare" className="mt-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <Building size={48} className="text-brand-600" />
                  <div>
                    <h3 className="text-2xl font-bold">Healthcare Facilities</h3>
                    <p className="text-gray-600">Critical air quality for patient safety and recovery</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Benefits:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Reduce infection transmission risks</li>
                      <li>• Improve patient recovery rates</li>
                      <li>• Meet strict healthcare regulations</li>
                      <li>• Protect vulnerable patients</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Compliance Features:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• HIPAA-compliant procedures</li>
                      <li>• Hospital-grade sanitization</li>
                      <li>• Detailed documentation</li>
                      <li>• Certified technicians</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hospitality" className="mt-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <Building size={48} className="text-brand-600" />
                  <div>
                    <h3 className="text-2xl font-bold">Hospitality & Hotels</h3>
                    <p className="text-gray-600">Ensuring guest comfort and satisfaction</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Benefits:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Improve guest comfort and satisfaction</li>
                      <li>• Reduce allergy complaints</li>
                      <li>• Maintain property value</li>
                      <li>• Enhance reputation and reviews</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Service Features:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Flexible scheduling around guests</li>
                      <li>• Quiet, non-disruptive equipment</li>
                      <li>• Comprehensive room coverage</li>
                      <li>• Regular maintenance programs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="industrial" className="mt-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <Building size={48} className="text-brand-600" />
                  <div>
                    <h3 className="text-2xl font-bold">Industrial Facilities</h3>
                    <p className="text-gray-600">Managing complex air quality challenges</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Benefits:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Remove industrial contaminants</li>
                      <li>• Improve worker safety</li>
                      <li>• Meet OSHA requirements</li>
                      <li>• Optimize equipment performance</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Specialized Services:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Heavy-duty cleaning equipment</li>
                      <li>• Chemical-resistant materials</li>
                      <li>• Safety protocol compliance</li>
                      <li>• 24/7 emergency service</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Professional Cleaning Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We follow a comprehensive, industry-standard process to ensure your commercial air ducts are thoroughly cleaned and sanitized.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Inspection & Assessment</h3>
              <p className="text-gray-600">
                Comprehensive evaluation of your HVAC system using advanced inspection tools to identify contamination levels and access points.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Preparation & Protection</h3>
              <p className="text-gray-600">
                Protect your property with drop cloths and containment barriers. Set up negative air pressure to prevent cross-contamination.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Advanced Cleaning</h3>
              <p className="text-gray-600">
                Use professional-grade equipment including HEPA vacuums, rotary brushes, compressed air systems, 
                and advanced inspection cameras to remove all contaminants.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-600">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Sanitization & Verification</h3>
              <p className="text-gray-600">
                Apply EPA-approved sanitizers and conduct post-cleaning inspection to ensure complete removal of contaminants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Pure Air California</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're the trusted choice for commercial air duct cleaning across California, with over 15 years of experience and thousands of satisfied customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Award size={48} className="text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Certified & Insured</h3>
              <p className="text-gray-600">
                NADCA certified technicians with comprehensive liability insurance and workers' compensation coverage.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Clock size={48} className="text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Flexible Scheduling</h3>
              <p className="text-gray-600">
                After-hours and weekend service available to minimize disruption to your business operations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Shield size={48} className="text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Guaranteed Results</h3>
              <p className="text-gray-600">
                100% satisfaction guarantee with detailed before-and-after documentation of our work.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Users size={48} className="text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Experienced Team</h3>
              <p className="text-gray-600">
                Trained professionals with extensive experience in commercial HVAC systems and air quality management.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Building size={48} className="text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Industry Expertise</h3>
              <p className="text-gray-600">
                Specialized knowledge of different industry requirements and compliance standards.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <ArrowRight size={48} className="text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Ongoing Support</h3>
              <p className="text-gray-600">
                Maintenance programs and ongoing support to keep your air quality optimal year-round.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about our commercial air duct cleaning services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">How often should commercial air ducts be cleaned?</h3>
              <p className="text-gray-600">
                The frequency depends on your industry and building usage. Generally, we recommend every 3-5 years for office buildings, 
                every 2-3 years for healthcare facilities, and annually for high-traffic retail or hospitality locations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">How long does commercial air duct cleaning take?</h3>
              <p className="text-gray-600">
                The duration varies based on the size and complexity of your HVAC system. A typical commercial building takes 4-8 hours, 
                while larger facilities may require multiple days. We provide detailed time estimates during our initial assessment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Will the cleaning process disrupt our business operations?</h3>
              <p className="text-gray-600">
                We minimize disruption by offering after-hours and weekend service. Our technicians work efficiently and cleanly, 
                and we can work around your business hours when necessary.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">What equipment do you use for commercial cleaning?</h3>
              <p className="text-gray-600">
                We use professional-grade equipment including HEPA vacuums, rotary brushes, compressed air systems, 
                and advanced inspection cameras. All equipment is designed for commercial applications and efficiency.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Do you provide maintenance programs for commercial clients?</h3>
              <p className="text-gray-600">
                Yes, we offer comprehensive maintenance programs that include regular inspections, cleaning schedules, 
                and priority service. These programs help maintain optimal air quality and prevent costly repairs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Are your services compliant with industry regulations?</h3>
              <p className="text-gray-600">
                Absolutely. We follow NADCA standards and are familiar with industry-specific regulations including 
                healthcare, hospitality, and industrial requirements. We provide documentation for compliance purposes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Commercial Air Quality?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote. Our team will assess your needs and provide a customized solution for your commercial property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-gray-100">
              <Link to="/quote">Get Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-700">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommercialAirDuctCleaning;
