
import React from 'react';
import { ScrollReveal, StaggerContainer } from './ui/scroll-reveal';
import { Shield, Clock, Check, Award, ThumbsUp, Zap } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Our technicians are fully licensed and insured for your peace of mind."
  },
  {
    icon: Clock,
    title: "Prompt Service",
    description: "We respect your time and always arrive within our scheduled appointment window."
  },
  {
    icon: Check,
    title: "Quality Guaranteed",
    description: "We guarantee the quality of our work with a satisfaction guarantee."
  },
  {
    icon: Award,
    title: "Certified Technicians",
    description: "Our team is certified and extensively trained in modern cleaning techniques."
  },
  {
    icon: ThumbsUp,
    title: "5-Star Rated",
    description: "We maintain a 5-star rating across Google, Yelp, and other platforms."
  },
  {
    icon: Zap,
    title: "Energy Efficiency",
    description: "Our services help improve your HVAC system's energy efficiency, saving you money."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pure Air California is committed to excellence in every aspect of our service.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={index} animation="fadeInUp" className="bg-gray-50 p-6 rounded-lg">
                <Icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </ScrollReveal>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default WhyChooseUs;
