import React from 'react';
import { Leaf, ShieldCheck, Recycle, Wind } from 'lucide-react';
import { Link } from '@/components/CanonicalLink';
import { business } from '@/config/business';

const EnvironmentalImpact = () => {
  const practices = [
    {
      icon: Wind,
      title: 'Mechanical Source Removal First',
      description:
        'We prioritize negative-pressure vacuum containment and mechanical agitation rather than automatically spraying chemical treatments inside ductwork.',
    },
    {
      icon: Leaf,
      title: 'Careful, Label-Guided Treatments',
      description:
        'When an antimicrobial or odor treatment is ever discussed, we verify duct material compatibility and EPA-registered product labels before anything is applied.',
    },
    {
      icon: Recycle,
      title: 'Washable Filtration & Proper Disposal',
      description:
        'We inspect and service compatible reusable electrostatic filter media and bag extracted dust, construction debris, and lint for clean disposal.',
    },
    {
      icon: ShieldCheck,
      title: 'Inspection-Led Honesty',
      description:
        'Following EPA homeowner guidance, we recommend cleaning when visible buildup, renovation dust, or exhaust restriction justifies it—not on arbitrary upsell schedules.',
    },
  ];

  return (
    <section className="py-16 bg-white" aria-labelledby="responsible-care-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="responsible-care-heading" className="text-3xl font-bold mb-4">
            Responsible Air-Path Care
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Caring for indoor air means protecting both the people inside your Los Angeles property and the materials inside your HVAC system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {practices.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-brand-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto bg-brand-50 border border-brand-100 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-3 text-gray-900">
            Questions About Methods, Materials, or Products?
          </h3>
          <p className="text-gray-600 mb-6">
            Tell us about your duct material, equipment, and household sensitivities before scheduling. We review the full written scope before work starts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quote/?service=air-duct&property=home#estimate-builder"
              className="inline-flex items-center justify-center bg-brand-700 text-white px-7 py-3 rounded-lg font-semibold hover:bg-brand-800 transition-colors"
            >
              Request a Free Written Estimate
            </Link>
            <a
              href={business.phoneHref}
              className="inline-flex items-center justify-center border border-brand-700 text-brand-700 px-7 py-3 rounded-lg font-semibold hover:bg-white transition-colors"
            >
              Call {business.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnvironmentalImpact;
