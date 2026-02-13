import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Filter, Check, Building, ArrowRight, Shield, Award, Clock, Zap, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ResponsiveImage from '@/components/ResponsiveImage';
import HomeQuoteForm from '@/components/HomeQuoteForm';
import TestimonialCard from '@/components/TestimonialCard';
import SEOProvider from '@/components/SEOProvider';
import SchemaMarkup from '@/components/SchemaMarkup';
import { seoConfig } from '@/utils/seo/seoConfig';

const CommercialElectrostaticFilter = () => {
  const faqs = [
    {
      question: "How do electrostatic filters compare to HEPA filters for commercial use?",
      answer: "Electrostatic filters offer similar filtration efficiency to HEPA filters but are more cost-effective for commercial applications. They're washable, reusable, and have lower maintenance costs while providing excellent particle capture for most commercial environments."
    },
    {
      question: "What maintenance is required for commercial electrostatic filters?",
      answer: "Commercial electrostatic filters require regular cleaning every 1-3 months depending on usage and environment. We offer maintenance programs that include professional cleaning, inspection, and performance optimization."
    },
    {
      question: "Can electrostatic filters help with compliance requirements?",
      answer: "Yes, our electrostatic filter systems can help meet various industry compliance requirements including healthcare, manufacturing, and office building standards. We provide documentation for compliance purposes."
    }
  ];
  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Commercial Electrostatic Air Filters Los Angeles | HVAC Filtration | Pure Air California</title>
          <meta name="description" content="Commercial electrostatic air filters in Los Angeles for offices & businesses. Lower costs, LEED compliance & better air quality. Free commercial quotes! (213) 792-4145" />
          <meta name="keywords" content="commercial electrostatic air filter Los Angeles, office air filtration LA, business air quality systems, reusable commercial filters, HVAC compliance Los Angeles" />
          <meta name="robots" content="index, follow, max-image-preview:large" />
          <meta name="geo.region" content="US-CA" />
          <meta name="geo.placename" content="Los Angeles" />
          <meta property="og:title" content="Commercial Electrostatic Air Filters Los Angeles | Pure Air California" />
          <meta property="og:description" content="Advanced commercial electrostatic air filter systems in Los Angeles. Reduce operating costs, improve HVAC efficiency, and ensure compliance." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.pureaircalifornia.com/services/commercial-electrostatic-filter" />
          <meta property="og:site_name" content="Pure Air California" />
          <link rel="canonical" href="https://www.pureaircalifornia.com/services/commercial-electrostatic-filter" />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Commercial Electrostatic Air Filter",
              "provider": {
                "@type": "HVACBusiness",
                "name": "Pure Air California",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "1550 N Poinsettia Pl",
                  "addressLocality": "Los Angeles",
                  "addressRegion": "CA",
                  "postalCode": "90046",
                  "addressCountry": "US"
                },
                "telephone": "+1-213-792-4145"
              },
              "description": "Advanced commercial electrostatic air filter systems for superior indoor air quality in Los Angeles. Reduce operating costs, improve HVAC efficiency, and ensure compliance.",
              "areaServed": {
                "@type": "City",
                "name": "Los Angeles"
              }
            })}
          </script>
        </Helmet>
        <SEOProvider>
          <SchemaMarkup schema={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }} />
        </SEOProvider>

        <NavBar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-r from-brand-700 to-brand-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(100,180,255,0.2), 0 0 60px rgba(100,180,255,0.1)' }}>Commercial Electrostatic Air Filter Systems</h1>
              <p className="text-xl mb-8">
                Advanced air filtration solutions for businesses seeking superior indoor air quality and HVAC efficiency.
                Reduce operating costs, improve employee health, and ensure compliance with industry standards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-gray-100">
                  <Link to="/quote">Get Commercial Quote</Link>
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
                <h2 className="text-3xl font-bold mb-6">Superior Filtration for Commercial Environments</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Commercial buildings face unique air quality challenges due to high occupancy, diverse activities,
                  and complex HVAC systems. Our commercial electrostatic filter systems provide an advanced,
                  cost-effective solution that captures a higher percentage of airborne contaminants compared to
                  standard filters, while reducing ongoing maintenance costs and improving system efficiency.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <p><span className="font-medium">Enhanced Filtration Efficiency</span> - Capture particles as small as 0.1 microns, including bacteria, pollen, dust, and smoke</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <p><span className="font-medium">Reduced Operating Costs</span> - Eliminate the need for frequent disposable filter replacements</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <p><span className="font-medium">Lower Energy Consumption</span> - Improve HVAC efficiency and reduce utility costs by up to 25%</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <p><span className="font-medium">Environmentally Responsible</span> - Washable, reusable filters reduce landfill waste from disposable filters</p>
                  </div>
                </div>
              </div>

              <div>
                <ResponsiveImage
                  src="/images/hero/commercial-filter-system-Main.jpg"
                  alt="Professional technician installing commercial electrostatic filter"
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        <HomeQuoteForm />

        {/* Industries Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Industry-Specific Solutions</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our commercial electrostatic filter systems are tailored to meet the specific needs of different industries,
                ensuring optimal air quality and compliance with industry standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <Building size={36} className="text-brand-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Office Buildings</h3>
                  <p className="text-gray-600 mb-4">
                    Improve employee productivity and reduce sick days with superior air filtration. Meet LEED certification requirements and create a healthier work environment.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Reduce absenteeism</li>
                    <li>• Improve focus and productivity</li>
                    <li>• Meet green building standards</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <Building size={36} className="text-brand-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Healthcare Facilities</h3>
                  <p className="text-gray-600 mb-4">
                    Critical air quality for patient safety and recovery. Our systems meet strict healthcare regulations and reduce infection transmission risks.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• HIPAA-compliant procedures</li>
                    <li>• Hospital-grade filtration</li>
                    <li>• Enhanced infection control</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <Building size={36} className="text-brand-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Retail & Hospitality</h3>
                  <p className="text-gray-600 mb-4">
                    Enhance customer experience with cleaner air. Reduce odors, improve comfort, and maintain property value with superior filtration.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Improve guest satisfaction</li>
                    <li>• Reduce allergy complaints</li>
                    <li>• Maintain property value</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <Building size={36} className="text-brand-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Manufacturing</h3>
                  <p className="text-gray-600 mb-4">
                    Remove industrial contaminants and protect equipment. Meet OSHA requirements and improve worker safety with advanced filtration.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Remove industrial contaminants</li>
                    <li>• Meet OSHA requirements</li>
                    <li>• Protect equipment lifespan</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <Building size={36} className="text-brand-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Educational Facilities</h3>
                  <p className="text-gray-600 mb-4">
                    Create healthier learning environments for students and staff. Reduce allergens and improve concentration in classrooms.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Healthier learning environments</li>
                    <li>• Reduce student absenteeism</li>
                    <li>• Improve concentration</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <Building size={36} className="text-brand-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Data Centers</h3>
                  <p className="text-gray-600 mb-4">
                    Protect sensitive equipment from dust and contaminants. Maintain optimal operating conditions and extend equipment life.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Protect sensitive equipment</li>
                    <li>• Maintain optimal conditions</li>
                    <li>• Extend equipment life</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Commercial Clients Say</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Hear from satisfied business owners who are breathing easier with Pure Air California.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                name="John D."
                location="Office Manager, Downtown LA"
                quote="We had Pure Air California install electrostatic filters in our office building, and the difference is night and day. Our employees have noticed a significant improvement in air quality, and we're already seeing savings on our HVAC maintenance costs."
                rating={5}
              />
              <TestimonialCard
                name="Maria S."
                location="Restaurant Owner, Beverly Hills"
                quote="The electrostatic filters have been a game-changer for our restaurant. They've helped us eliminate cooking odors in the dining area and keep our kitchen's air clean. A fantastic investment for any food service business."
                rating={5}
              />
              <TestimonialCard
                name="David L."
                location="Facility Manager, Glendale"
                quote="I was skeptical about the cost savings, but these filters have paid for themselves in less than a year. The fact that they're washable and reusable is a huge plus for our maintenance budget. Highly recommend."
                rating={5}
              />
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Advanced Electrostatic Technology</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Understanding how electrostatic filtration technology provides superior air quality for commercial applications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap size={32} className="text-brand-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Static Charge Generation</h3>
                  <p className="text-gray-600">
                    As air passes through the filter media, it creates a powerful static electrical charge that attracts and captures airborne particles.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter size={32} className="text-brand-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Superior Particle Capture</h3>
                  <p className="text-gray-600">
                    Captures particles as small as 0.1 microns with 95%+ efficiency, including bacteria, viruses, pollen, and industrial contaminants.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users size={32} className="text-brand-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Healthier Environment</h3>
                  <p className="text-gray-600">
                    Delivers cleaner, healthier air throughout your commercial space, improving occupant health and productivity.
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
              <h2 className="text-3xl font-bold mb-4">Commercial Benefits</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover the comprehensive benefits that electrostatic air filtration provides for commercial properties and businesses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <Award size={48} className="text-brand-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Cost Savings</h3>
                <p className="text-gray-600">
                  Eliminate ongoing filter replacement costs and reduce energy consumption by up to 25%, providing significant long-term savings.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <Users size={48} className="text-brand-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Employee Health</h3>
                <p className="text-gray-600">
                  Improve employee health and productivity by reducing allergens, respiratory irritants, and airborne contaminants.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <Shield size={48} className="text-brand-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Compliance</h3>
                <p className="text-gray-600">
                  Meet industry-specific air quality standards and regulations for healthcare, manufacturing, and other sectors.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <Clock size={48} className="text-brand-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Low Maintenance</h3>
                <p className="text-gray-600">
                  Washable filters require minimal maintenance and can be cleaned on-site, reducing service calls and downtime.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <Building size={48} className="text-brand-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">HVAC Protection</h3>
                <p className="text-gray-600">
                  Protect your HVAC system from dust and debris buildup, potentially extending equipment life and reducing repair costs.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <ArrowRight size={48} className="text-brand-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Environmental Impact</h3>
                <p className="text-gray-600">
                  Reduce environmental impact by eliminating disposable filter waste and improving energy efficiency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Installation & Service */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Professional Installation & Service</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our certified technicians ensure proper installation and provide ongoing maintenance services for optimal performance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-brand-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">System Assessment</h3>
                <p className="text-gray-600">
                  Comprehensive evaluation of your current HVAC system and air quality needs to determine optimal filter solutions.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-brand-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Professional Installation</h3>
                <p className="text-gray-600">
                  Certified technicians install your electrostatic filter system with proper sizing and integration.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-brand-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Performance Testing</h3>
                <p className="text-gray-600">
                  Verify optimal operation and airflow to ensure your system is performing at peak efficiency.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-brand-600">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Ongoing Support</h3>
                <p className="text-gray-600">
                  Maintenance programs and technical support to keep your system operating effectively long-term.
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
                Get answers to common questions about our commercial electrostatic air filter systems.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Upgrade Your Commercial Air Quality Today</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Experience the benefits of advanced electrostatic air filtration for your business.
              Contact us for a free consultation and customized quote for your commercial property.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-gray-100">
                <Link to="/quote">Get Commercial Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-700">
                <Link to="/contact">Schedule Consultation</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default CommercialElectrostaticFilter;