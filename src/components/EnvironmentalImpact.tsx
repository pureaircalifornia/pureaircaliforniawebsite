import React from 'react';
import { Leaf, Zap, Recycle, Droplets } from 'lucide-react';

const EnvironmentalImpact = () => {
  const features = [
    {
      icon: Leaf,
      title: 'Eco-Friendly Cleaning Solutions',
      description: 'We use environmentally safe cleaning products that are effective yet gentle on the environment.'
    },
    {
      icon: Zap,
      title: 'Energy Efficiency',
      description: 'Clean air ducts can improve HVAC efficiency by up to 40%, reducing energy consumption.'
    },
    {
      icon: Recycle,
      title: 'Waste Management',
      description: 'All waste materials are properly disposed of and recycled whenever possible.'
    },
    {
      icon: Droplets,
      title: 'Water Conservation',
      description: 'Our cleaning methods minimize water usage while maintaining high cleaning standards.'
    }
  ];

  const benefits = [
    {
      title: 'Reduced Carbon Footprint',
      value: '25%',
      description: 'Average reduction in HVAC energy consumption after cleaning'
    },
    {
      title: 'Air Quality Improvement',
      value: '90%',
      description: 'Reduction in airborne contaminants'
    },
    {
      title: 'System Longevity',
      value: '30%',
      description: 'Extended HVAC system lifespan with regular maintenance'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Environmental Impact</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to providing eco-friendly air duct cleaning services that not only
            improve your indoor air quality but also contribute to a healthier environment.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 text-center"
              >
                <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-brand-50 rounded-lg p-8 text-center"
            >
              <div className="text-4xl font-bold text-brand-600 mb-2">
                {benefit.value}
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Environmental Commitment */}
        <div className="max-w-3xl mx-auto bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Our Environmental Commitment</h3>
          <div className="space-y-4 text-gray-600">
            <p>
              At our company, we understand that environmental responsibility is crucial
              in today's world. That's why we've implemented several eco-friendly practices:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Use of biodegradable cleaning solutions</li>
              <li>Energy-efficient cleaning equipment</li>
              <li>Proper waste disposal and recycling programs</li>
              <li>Regular training on environmental best practices</li>
              <li>Investment in sustainable technologies</li>
            </ul>
            <p>
              By choosing our services, you're not only improving your indoor air quality
              but also contributing to a more sustainable future.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <a
            href="tel:2137924145"
            className="inline-flex items-center gap-2 bg-brand-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-brand-700 transition-colors"
          >
            Schedule Eco-Friendly Service
          </a>
        </div>
      </div>
    </section>
  );
};

export default EnvironmentalImpact; 