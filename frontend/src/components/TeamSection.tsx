import React from 'react';
import { ShieldCheck, ClipboardCheck, Eye, MapPin } from 'lucide-react';
import { Link } from '@/components/CanonicalLink';
import { business } from '@/config/business';

const TeamSection = () => {
  const leadership = [
    {
      name: 'Lou Chanab',
      role: 'Founder & CEO',
      bio: 'Leads field standards, residential and commercial scoping, and on-site technical oversight across Greater Los Angeles.',
    },
    {
      name: 'Maya Chanab',
      role: 'VP Client Relations',
      bio: 'Coordinates scheduling, HOA and property-manager communication, vendor documentation, and walkthrough follow-up.',
    },
  ];

  const standards = [
    {
      icon: Eye,
      title: 'Inspection-Led Scope',
      description: 'We look at accessible ducts, registers, and exhaust routes before confirming what needs work.',
    },
    {
      icon: ClipboardCheck,
      title: 'Written Upfront Pricing',
      description: 'Every included component, exclusion, and price is confirmed in writing before cleaning starts.',
    },
    {
      icon: ShieldCheck,
      title: 'Room & Finish Protection',
      description: 'Floors, furnishings, and work paths are protected carefully across homes, estates, and occupied buildings.',
    },
    {
      icon: MapPin,
      title: 'Local Los Angeles Coverage',
      description: 'Serving homes, HOAs, and commercial buildings across Los Angeles County and parts of Ventura County.',
    },
  ];

  return (
    <section className="bg-gray-50 py-16" aria-labelledby="pac-team-heading">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 id="pac-team-heading" className="text-3xl font-bold mb-3 text-gray-900">
            Meet the Pure Air California Team
          </h2>
          <p className="text-gray-600">
            Direct communication from your first estimate conversation through your final walkthrough.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
          {leadership.map((member) => (
            <div key={member.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-brand-700" aria-hidden="true">
                  {member.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-1 text-gray-900">{member.name}</h3>
              <p className="text-brand-700 font-medium text-sm mb-3">{member.role}</p>
              <p className="text-gray-600 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-10">
          {standards.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-white rounded-xl p-5 border border-gray-100">
                <Icon className="w-5 h-5 text-brand-700 mb-3" aria-hidden="true" />
                <h3 className="font-semibold text-gray-900 mb-1.5">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link to="/about/" className="text-brand-700 font-semibold hover:underline mr-6">
            Read our mission &amp; standards →
          </Link>
          <a href={business.phoneHref} className="text-gray-900 font-semibold hover:text-brand-700">
            Call {business.phone}
          </a>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
