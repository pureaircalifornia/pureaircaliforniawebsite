
import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AlertTriangle, Timer, BatteryCharging, Gauge, CheckCircle } from 'lucide-react';

const ResidentialDryerVentCleaningPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Residential Dryer Vent Cleaning | Pure Air California</title>
        <meta
          name="description"
          content="Professional residential dryer vent cleaning services in Los Angeles. Prevent fire hazards, reduce energy costs, and extend dryer life with Pure Air California."
        />
        <meta
          name="keywords"
          content="dryer vent cleaning, residential dryer vent, lint removal, dryer fire prevention, Los Angeles dryer vent cleaning"
        />
      </Helmet>

      <NavBar />

      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
            alt="Dryer vent cleaning"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Residential Dryer Vent Cleaning
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Protect your home from fire hazards and improve your dryer's efficiency with our professional dryer vent cleaning services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[#0A3D7C] hover:bg-[#072c5a]">
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <a href="tel:+13105551234">Call (310) 555-1234</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Clean Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Why Clean Your Dryer Vents?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <AlertTriangle size={48} className="text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Prevent Fire Hazards</h3>
              <p className="text-gray-600">
                Lint buildup in dryer vents is highly flammable and is a leading cause of house fires. Regular cleaning significantly reduces this risk.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <Timer size={48} className="text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Reduce Drying Time</h3>
              <p className="text-gray-600">
                Clean vents allow for proper airflow, reducing the time needed to dry your clothes and saving you valuable time.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <BatteryCharging size={48} className="text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Save on Energy Costs</h3>
              <p className="text-gray-600">
                When your dryer operates efficiently, it uses less energy, helping you save on utility bills.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <Gauge size={48} className="text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Extend Dryer Lifespan</h3>
              <p className="text-gray-600">
                Regularly cleaned vents reduce strain on your dryer, helping it last longer and perform better.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <CheckCircle size={48} className="text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Prevent Carbon Monoxide Risks</h3>
              <p className="text-gray-600">
                For gas dryers, blocked vents can cause carbon monoxide to back up into your home, creating a serious health hazard.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <AlertTriangle size={48} className="text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Eliminate Mold Growth</h3>
              <p className="text-gray-600">
                Humid air trapped in clogged vents creates ideal conditions for mold, which can affect your health and clothing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Our Dryer Vent Cleaning Process
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-[#0A3D7C] text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0">1</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Inspection</h3>
                <p className="text-gray-600">We begin with a thorough inspection of your dryer vent system, identifying any lint buildup, blockages, or damage.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-[#0A3D7C] text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0">2</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Professional Cleaning</h3>
                <p className="text-gray-600">Using specialized tools and equipment, we remove all lint, debris, and blockages from your dryer vent, ensuring complete cleaning from the dryer to the exterior vent.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-[#0A3D7C] text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0">3</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">System Testing</h3>
                <p className="text-gray-600">After cleaning, we test your dryer to verify proper airflow and ensure everything is functioning correctly.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-[#0A3D7C] text-white rounded-full w-12 h-12 flex items-center justify-center shrink-0">4</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Final Inspection & Recommendations</h3>
                <p className="text-gray-600">We conduct a final inspection and provide you with maintenance recommendations to help keep your dryer running safely and efficiently.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0A3D7C] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Protect Your Home with Regular Dryer Vent Cleaning
            </h2>
            <p className="text-xl mb-8">
              The National Fire Protection Association recommends having your dryer vents cleaned at least once a year to prevent fire hazards.
            </p>
            <Button asChild size="lg" className="bg-white text-[#0A3D7C] hover:bg-gray-100">
              <Link to="/quote">Schedule Your Cleaning Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Request a Free Quote
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Ready to improve the safety and efficiency of your dryer? Fill out our form to receive a free, no-obligation quote for our residential dryer vent cleaning service.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 shrink-0 mt-1" />
                  <p>Professional technicians with years of experience</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 shrink-0 mt-1" />
                  <p>Thorough cleaning with specialized equipment</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 shrink-0 mt-1" />
                  <p>100% satisfaction guarantee</p>
                </div>
              </div>
            </div>
            <div>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResidentialDryerVentCleaningPage;
