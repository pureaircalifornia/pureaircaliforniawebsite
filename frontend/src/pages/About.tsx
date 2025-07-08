import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Clock, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-12">About Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At Pure Air California, we're dedicated to improving indoor air quality for homes and businesses throughout Southern California. Our NADCA-certified technicians use the latest equipment and techniques to ensure your HVAC systems are clean and efficient.
              </p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Over 10 years of experience</li>
                <li>Fully licensed and insured</li>
                <li>NADCA certified technicians</li>
                <li>24/7 emergency service</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Why Choose Us</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-brand-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Professional Service</h3>
                    <p className="text-gray-600">Our team undergoes extensive training and certification to ensure the highest quality service.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-brand-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Fast Response</h3>
                    <p className="text-gray-600">We offer same-day service and quick turnaround times for all our cleaning services.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-brand-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Guaranteed Results</h3>
                    <p className="text-gray-600">We stand behind our work with a satisfaction guarantee on all our services.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mt-12">
            <h2 className="text-2xl font-bold mb-6">Contact Our Team</h2>
            <p className="text-gray-600 mb-6">
              Ready to learn more about our services? Contact us today to schedule a consultation or request a quote.
            </p>
            <Button asChild variant="outline">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
