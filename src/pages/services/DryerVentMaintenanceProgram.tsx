
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import TrustBadges from '@/components/TrustBadges';
import { Check, Calendar, Clock, Shield, ArrowRight } from 'lucide-react';

const DryerVentMaintenanceProgram = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-brand-700 to-brand-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Dryer Vent Maintenance Program</h1>
            <p className="text-xl mb-8">
              Prevent fire hazards and maintain optimal efficiency with our professional dryer vent maintenance program.
            </p>
            <Button asChild size="lg" className="bg-white text-brand-600 hover:bg-gray-100">
              <Link to="/quote">Enroll Now</Link>
            </Button>
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
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Clock className="text-brand-600" /> Priority Scheduling
                </h3>
                <p className="text-gray-600">
                  Program members receive priority scheduling for all services, minimizing wait times.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Shield className="text-brand-600" /> Preventive Maintenance
                </h3>
                <p className="text-gray-600">
                  Regular cleaning to prevent lint build-up, improving efficiency and reducing fire risks.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <ArrowRight className="text-brand-600" /> Discounted Services
                </h3>
                <p className="text-gray-600">
                  Exclusive discounts on repairs and additional services for maintenance program members.
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
                  <p><span className="font-medium">Fire Prevention</span> - Lint buildup in dryer vents is a leading cause of house fires</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Energy Efficiency</span> - Clean vents allow your dryer to operate at peak efficiency</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Extended Appliance Life</span> - Reduce wear and tear on your dryer</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Peace of Mind</span> - Know your home is protected with regular professional service</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700">
                <Link to="/quote">Enroll in Our Maintenance Program</Link>
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                We recommend annual dryer vent cleaning for most households. Contact us for a personalized recommendation.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default DryerVentMaintenanceProgram;
