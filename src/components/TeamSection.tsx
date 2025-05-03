import React from 'react';
import { Shield, Award, CheckCircle, Star } from 'lucide-react';

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Lou Chanab",
      role: "Owner",
      bio: "With over 25 years of experience in air duct cleaning, Lou leads our team with expertise and dedication to quality service."
    }
  ];

  const certifications = [
    {
      icon: Shield,
      title: 'NADCA Certified',
      description: 'National Air Duct Cleaners Association certification'
    },
    {
      icon: Award,
      title: 'EPA Certified',
      description: 'Environmental Protection Agency certification'
    },
    {
      icon: CheckCircle,
      title: 'Background Checked',
      description: 'All technicians undergo thorough background checks'
    },
    {
      icon: Star,
      title: 'Ongoing Training',
      description: 'Regular training on latest techniques and safety protocols'
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Expert Team</h2>
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-brand-600">
                {teamMembers[0].name.charAt(0)}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-center mb-1">{teamMembers[0].name}</h3>
            <p className="text-brand-600 text-center mb-4">{teamMembers[0].role}</p>
            <p className="text-gray-600 text-center">{teamMembers[0].bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection; 