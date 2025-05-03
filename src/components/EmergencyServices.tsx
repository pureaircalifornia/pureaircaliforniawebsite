import React from 'react';
import { Clock, Phone, Shield, AlertTriangle } from 'lucide-react';

const EmergencyServices = () => {
  const features = [
    {
      icon: Clock,
      title: '24/7 Emergency Response',
      description: 'Available around the clock for urgent air duct cleaning needs'
    },
    {
      icon: Shield,
      title: 'Licensed & Insured',
      description: 'Fully certified technicians for your peace of mind'
    },
    {
      icon: AlertTriangle,
      title: 'Rapid Response',
      description: 'Guaranteed response within 2 hours for emergency situations'
    }
  ];

  return (
    <section className="py-16 bg-brand-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">24/7 Emergency Air Duct Cleaning</h2>
            <p className="text-xl text-brand-100">
              When you need immediate air duct cleaning services, we're here to help
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 rounded-lg p-6 backdrop-blur-sm"
                >
                  <Icon className="w-8 h-8 text-brand-200 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-brand-100">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8 text-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">Emergency Hotline</h3>
                <p className="text-gray-600 mb-4">
                  Available 24/7 for immediate assistance with your air duct cleaning needs
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Phone className="w-5 h-5 text-brand-600" />
                  <a
                    href="tel:2137924145"
                    className="text-2xl font-bold text-brand-600 hover:text-brand-700"
                  >
                    (213) 792-4145
                  </a>
                </div>
              </div>
              <div className="bg-brand-50 rounded-lg p-6 text-center">
                <h4 className="font-semibold mb-2">Response Time Guarantee</h4>
                <p className="text-4xl font-bold text-brand-600">2 Hours</p>
                <p className="text-sm text-gray-600">Maximum response time</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-brand-100 mb-4">
              Don't wait for regular business hours. Call now for immediate assistance.
            </p>
            <a
              href="tel:2137924145"
              className="inline-flex items-center gap-2 bg-white text-brand-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-brand-50 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call Emergency Hotline
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyServices; 