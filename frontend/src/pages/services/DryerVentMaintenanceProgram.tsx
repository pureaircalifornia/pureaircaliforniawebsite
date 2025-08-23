
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import TrustBadges from '@/components/TrustBadges';
import { Check, Calendar, Clock, Shield, ArrowRight, Home, Award, Users, AlertTriangle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const DryerVentMaintenanceProgram = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Dryer Vent Maintenance Program | Pure Air California</title>
        <meta name="description" content="Professional dryer vent maintenance program to prevent fire hazards and maintain optimal efficiency. Annual inspections, priority scheduling, and preventive maintenance included. Enroll today." />
        <meta name="keywords" content="dryer vent maintenance program, dryer vent cleaning service, fire prevention, dryer efficiency, maintenance plan, dryer safety" />
        <meta property="og:title" content="Dryer Vent Maintenance Program | Pure Air California" />
        <meta property="og:description" content="Professional dryer vent maintenance program to prevent fire hazards and maintain optimal efficiency. Annual inspections, priority scheduling, and preventive maintenance included." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pureairca.com/services/dryer-vent-maintenance-program" />
        <link rel="canonical" href="https://pureairca.com/services/dryer-vent-maintenance-program" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Dryer Vent Maintenance Program",
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
            "description": "Professional dryer vent maintenance program to prevent fire hazards and maintain optimal efficiency. Annual inspections, priority scheduling, and preventive maintenance included.",
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Dryer Vent Maintenance Program</h1>
            <p className="text-xl mb-8">
              Prevent fire hazards and maintain optimal efficiency with our comprehensive dryer vent maintenance program. 
              Annual inspections, priority scheduling, and preventive maintenance to keep your home safe and your dryer running efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-brand-600 hover:bg-gray-100">
                <Link to="/quote">Enroll Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-700">
                <Link to="/contact">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <TrustBadges />
      
      {/* Program Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Maintenance Program Includes</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="text-brand-600" /> Annual Inspections
                </h3>
                <p className="text-gray-600">
                  Regular professional inspections to identify potential issues before they become hazardous. 
                  Our certified technicians use advanced equipment to thoroughly assess your dryer vent system.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Clock className="text-brand-600" /> Priority Scheduling
                </h3>
                <p className="text-gray-600">
                  Program members receive priority scheduling for all services, minimizing wait times and ensuring 
                  your dryer vent maintenance is never delayed.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Shield className="text-brand-600" /> Preventive Maintenance
                </h3>
                <p className="text-gray-600">
                  Regular cleaning to prevent lint build-up, improving efficiency and reducing fire risks. 
                  Professional cleaning using industry-standard equipment and techniques.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <ArrowRight className="text-brand-600" /> Discounted Services
                </h3>
                <p className="text-gray-600">
                  Exclusive discounts on repairs and additional services for maintenance program members. 
                  Save money while ensuring your dryer vent system remains in optimal condition.
                </p>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-6">Why Regular Maintenance Matters</h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Fire Prevention</span> - Lint buildup in dryer vents is a leading cause of house fires, with thousands of incidents annually</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Energy Efficiency</span> - Clean vents allow your dryer to operate at peak efficiency, reducing energy costs by up to 30%</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Extended Appliance Life</span> - Reduce wear and tear on your dryer, potentially extending its lifespan by years</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Carbon Monoxide Safety</span> - Ensure proper venting of gas dryers to prevent dangerous CO buildup in your home</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Program Benefits</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join our maintenance program and enjoy comprehensive protection for your dryer vent system with exclusive benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Shield size={48} className="text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Fire Safety</h3>
              <p className="text-gray-600">
                Regular maintenance significantly reduces the risk of dryer fires by preventing dangerous lint buildup.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Award size={48} className="text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Cost Savings</h3>
              <p className="text-gray-600">
                Save money on energy bills and avoid costly repairs with preventive maintenance and member discounts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Clock size={48} className="text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Convenience</h3>
              <p className="text-gray-600">
                Priority scheduling and automatic reminders ensure your maintenance is never forgotten or delayed.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Home size={48} className="text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Home Protection</h3>
              <p className="text-gray-600">
                Protect your home and family with professional maintenance and comprehensive safety inspections.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Users size={48} className="text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Expert Service</h3>
              <p className="text-gray-600">
                Certified technicians with specialized equipment provide thorough, professional maintenance services.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <ArrowRight size={48} className="text-brand-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Peace of Mind</h3>
              <p className="text-gray-600">
                Know your dryer vent is properly maintained and your home is protected from fire hazards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Warning Signs You Need Maintenance</h2>
              <p className="text-lg text-gray-600">
                Watch for these signs that indicate your dryer vent needs immediate attention.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Longer Drying Times</h4>
                    <p className="text-gray-600 text-sm">Clothes taking longer than usual to dry completely</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Hot Dryer Exterior</h4>
                    <p className="text-gray-600 text-sm">Unusually hot dryer or laundry room during operation</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Burning Smell</h4>
                    <p className="text-gray-600 text-sm">Burning odor during dryer operation</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Lint Around Vent</h4>
                    <p className="text-gray-600 text-sm">Visible lint accumulation around exterior vent opening</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Musty Odors</h4>
                    <p className="text-gray-600 text-sm">Unpleasant odors from your dryer</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">No Recent Maintenance</h4>
                    <p className="text-gray-600 text-sm">It's been more than a year since last cleaning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Levels */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Maintenance Program Levels</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the maintenance program that best fits your needs and budget.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-center">Basic Plan</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-600" />
                  <span>Annual inspection</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-600" />
                  <span>Annual cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-600" />
                  <span>Priority scheduling</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-600" />
                  <span>10% service discounts</span>
                </li>
              </ul>
              <Button asChild className="w-full">
                <Link to="/quote">Get Quote</Link>
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-brand-600">
              <h3 className="text-xl font-semibold mb-4 text-center">Standard Plan</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-600" />
                  <span>Bi-annual inspection</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-600" />
                  <span>Bi-annual cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-600" />
                  <span>Priority scheduling</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-600" />
                  <span>15% service discounts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-600" />
                  <span>Emergency service</span>
                </li>
              </ul>
              <Button asChild className="w-full bg-brand-600 hover:bg-brand-700">
                <Link to="/quote">Get Quote</Link>
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-center">Premium Plan</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-600" />
                  <span>Quarterly inspection</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-600" />
                  <span>Quarterly cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-600" />
                  <span>Priority scheduling</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-600" />
                  <span>20% service discounts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-600" />
                  <span>24/7 emergency service</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-brand-600" />
                  <span>Annual system assessment</span>
                </li>
              </ul>
              <Button asChild className="w-full">
                <Link to="/quote">Get Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about our dryer vent maintenance program.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">How often should I have my dryer vent cleaned?</h3>
              <p className="text-gray-600">
                We recommend annual cleaning for most households, but frequency depends on usage, family size, and pets. 
                Our maintenance program ensures you never miss important maintenance intervals.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">What's included in the maintenance program?</h3>
              <p className="text-gray-600">
                Our program includes regular inspections, professional cleaning, priority scheduling, 
                member discounts, and comprehensive safety assessments of your dryer vent system.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Can I cancel my maintenance program?</h3>
              <p className="text-gray-600">
                Yes, you can cancel your maintenance program at any time. However, we recommend maintaining 
                regular service to ensure your dryer vent remains safe and efficient.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Do you provide emergency service?</h3>
              <p className="text-gray-600">
                Yes, program members receive priority emergency service. If you notice warning signs like 
                burning smells or excessive heat, contact us immediately for same-day service.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">How much does the maintenance program cost?</h3>
              <p className="text-gray-600">
                Program costs vary based on the level you choose and your specific needs. 
                Contact us for a personalized quote that includes all program benefits and services.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">What if I need repairs outside of maintenance?</h3>
              <p className="text-gray-600">
                Program members receive exclusive discounts on all repairs and additional services. 
                We'll provide transparent pricing and ensure your dryer vent system is properly maintained.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Protect Your Home with Our Maintenance Program</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't wait for warning signs. Enroll in our dryer vent maintenance program today and enjoy 
            peace of mind knowing your home is protected from fire hazards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-gray-100">
              <Link to="/quote">Enroll Now</Link>
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

export default DryerVentMaintenanceProgram;
