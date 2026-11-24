import React from 'react';
import { Clock, ClipboardCheck, ShieldCheck, CheckCircle } from 'lucide-react';

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const Feature = ({ icon, title, description }: FeatureProps) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#dce7ee]">
    <div className="text-[#0a3d7c] mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-[#123b56]">{title}</h3>
    <p className="text-[#536b79]">{description}</p>
  </div>
);

const WhyChooseUs = () => {
  const features = [
    {
      icon: <ClipboardCheck className="h-10 w-10" aria-hidden="true" />,
      title: 'Inspection-Led Scope',
      description: 'We review accessible ducts, vents, and equipment access with you before confirming a written price.',
    },
    {
      icon: <ShieldCheck className="h-10 w-10" aria-hidden="true" />,
      title: 'Space Protection',
      description: 'Technicians protect surrounding floors and furnishings and leave work areas clean when service concludes.',
    },
    {
      icon: <Clock className="h-10 w-10" aria-hidden="true" />,
      title: 'Coordinated Scheduling',
      description: 'Appointments planned around household routines, HOA notices, or commercial operating hours.',
    },
    {
      icon: <CheckCircle className="h-10 w-10" aria-hidden="true" />,
      title: 'Clear Walkthrough',
      description: 'We review completed work together and explain accessible filter and maintenance next steps honestly.',
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#123b56]">Why Choose Pure Air California</h2>
          <p className="text-lg text-[#536b79] max-w-2xl mx-auto">
            Thoughtful air duct, dryer vent, and HVAC system cleaning across Greater Los Angeles with clear expectations from the first call.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Feature key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
