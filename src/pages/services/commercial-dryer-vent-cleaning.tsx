
import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import QuoteForm from '@/components/QuoteForm';
import { CheckCircle, AlertTriangle, Sparkles, Clock } from 'lucide-react';

const CommercialDryerVentCleaning = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Commercial Dryer Vent Cleaning | Pure Air California</title>
        <meta
          name="description"
          content="Professional commercial dryer vent cleaning services. Prevent fire hazards, improve efficiency, and extend equipment life. Serving Los Angeles and Southern California."
        />
      </Helmet>
      <NavBar />

      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-gray-900">
          <div className="absolute inset-0 z-0 opacity-50">
            <img
              src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              alt="Commercial Laundry Facility"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Commercial Dryer Vent Cleaning Services
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Keep your commercial laundry facilities safe, efficient, and code-compliant with our professional dryer vent cleaning services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-[#0A3D7C] hover:bg-[#072c5a]">
                  <Link to="/quote">Get a Free Quote</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                  <a href="tel:+12137924145">Call (213) 792-4145</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Benefits of Professional Commercial Dryer Vent Cleaning
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-6 border rounded-lg text-center">
                <AlertTriangle size={48} className="mx-auto text-red-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Fire Prevention</h3>
                <p className="text-gray-600">Reduce fire hazards by removing highly combustible lint buildup.</p>
              </div>
              <div className="p-6 border rounded-lg text-center">
                <Sparkles size={48} className="mx-auto text-blue-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Improved Efficiency</h3>
                <p className="text-gray-600">Reduce drying times and lower energy costs with clean, efficient vents.</p>
              </div>
              <div className="p-6 border rounded-lg text-center">
                <Clock size={48} className="mx-auto text-green-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Extended Equipment Life</h3>
                <p className="text-gray-600">Prolong the lifespan of your commercial dryers and reduce repairs.</p>
              </div>
              <div className="p-6 border rounded-lg text-center">
                <CheckCircle size={48} className="mx-auto text-purple-500 mb-4" />
                <h3 className="font-semibold text-xl mb-2">Code Compliance</h3>
                <p className="text-gray-600">Meet fire safety codes and insurance requirements for commercial properties.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Our Commercial Dryer Vent Cleaning Process
            </h2>
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-[#0A3D7C] text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Inspection</h3>
                  <p className="text-gray-600">We thoroughly assess your commercial dryer vents, identifying lint buildup, blockages, and any potential issues.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-[#0A3D7C] text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Commercial-Grade Cleaning</h3>
                  <p className="text-gray-600">Using specialized equipment designed for commercial applications, we remove all lint, debris, and blockages from your dryer vents.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-[#0A3D7C] text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">System Testing</h3>
                  <p className="text-gray-600">We verify proper airflow and ensure all components are functioning correctly after cleaning.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-[#0A3D7C] text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0">4</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Documentation & Recommendations</h3>
                  <p className="text-gray-600">We provide detailed reports for your records and offer recommendations for maintenance schedules and system improvements.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industries Served */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Industries We Serve</h2>
            <p className="text-lg text-gray-600 mb-12 text-center max-w-4xl mx-auto">
              We provide commercial dryer vent cleaning services for a wide range of industries and property types.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold text-xl mb-2">Hotels & Hospitality</h3>
                <p className="text-gray-600">Keep your hotel laundry operations running efficiently and safely.</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold text-xl mb-2">Apartment Complexes</h3>
                <p className="text-gray-600">Maintain safe laundry facilities for your tenants in multi-family housing.</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold text-xl mb-2">Laundromats</h3>
                <p className="text-gray-600">Maximize efficiency and safety in your commercial laundromat.</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold text-xl mb-2">Healthcare Facilities</h3>
                <p className="text-gray-600">Meet strict cleanliness and safety standards for hospitals and care centers.</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold text-xl mb-2">Educational Institutions</h3>
                <p className="text-gray-600">Keep dormitory and athletic facility laundry systems clean and efficient.</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold text-xl mb-2">Restaurants & Hospitality</h3>
                <p className="text-gray-600">Ensure your linen cleaning systems operate safely and efficiently.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Form Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Request a Commercial Service Quote
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Ready to improve the safety and efficiency of your commercial dryer vents? Fill out our form to receive a customized quote for your business.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 shrink-0 mt-1" />
                    <p>Free, no-obligation estimates for commercial properties</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 shrink-0 mt-1" />
                    <p>Flexible scheduling to minimize business interruption</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 shrink-0 mt-1" />
                    <p>Maintenance plans available for regular service</p>
                  </div>
                </div>
              </div>
              <div>
                <QuoteForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CommercialDryerVentCleaning;
