
import React from 'react';
import { ScrollReveal } from './ui/scroll-reveal';
import { Clock, Award, ThumbsUp, CheckCircle } from 'lucide-react';

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature = ({ icon, title, description }: FeatureProps) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div className="text-blue-600 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Clock className="h-12 w-12" />,
      title: "Timely Service",
      description: "We value your time and always arrive promptly for scheduled appointments."
    },
    {
      icon: <Award className="h-12 w-12" />,
      title: "Licensed Professionals",
      description: "Our team consists of certified technicians with years of experience."
    },
    {
      icon: <ThumbsUp className="h-12 w-12" />,
      title: "Quality Guaranteed",
      description: "We stand behind our work with a 100% satisfaction guarantee."
    },
    {
      icon: <CheckCircle className="h-12 w-12" />,
      title: "Thorough Process",
      description: "Our comprehensive cleaning process ensures no detail is overlooked."
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Pure Air California</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing exceptional air duct and dryer vent cleaning services that improve your indoor air quality.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Feature {...feature} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
