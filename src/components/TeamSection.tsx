import React from 'react';
import { Shield, Award, CheckCircle, Star } from 'lucide-react';

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'John Smith',
      role: 'Lead Technician',
      experience: '15+ years',
      certifications: ['NADCA Certified', 'EPA Certified'],
      image: '/team/john-smith.jpg'
    },
    {
      name: 'Sarah Johnson',
      role: 'Senior Technician',
      experience: '12+ years',
      certifications: ['NADCA Certified', 'IAQA Certified'],
      image: '/team/sarah-johnson.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'Commercial Specialist',
      experience: '10+ years',
      certifications: ['NADCA Certified', 'OSHA Certified'],
      image: '/team/michael-chen.jpg'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Quality Control Manager',
      experience: '8+ years',
      certifications: ['NADCA Certified', 'IICRC Certified'],
      image: '/team/emily-rodriguez.jpg'
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Expert Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet our team of certified professionals dedicated to providing the highest
            quality air duct cleaning services in Los Angeles.
          </p>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="h-64 bg-gray-200 relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white text-xl font-semibold">{member.name}</h3>
                  <p className="text-brand-200">{member.role}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <span>{member.experience} experience</span>
                </div>
                <div className="space-y-2">
                  {member.certifications.map((cert, certIndex) => (
                    <div
                      key={certIndex}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <CheckCircle className="w-4 h-4 text-brand-600" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-6 text-center"
              >
                <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{cert.title}</h3>
                <p className="text-gray-600">{cert.description}</p>
              </div>
            );
          })}
        </div>

        {/* Team Values */}
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Our Team Values</h3>
          <div className="space-y-4 text-gray-600">
            <p>
              Our team is built on a foundation of professionalism, expertise, and
              dedication to customer satisfaction. We believe in:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Continuous training and certification</li>
              <li>Strict adherence to safety protocols</li>
              <li>Attention to detail in every service</li>
              <li>Professional and courteous service</li>
              <li>Commitment to environmental responsibility</li>
            </ul>
            <p>
              Each team member undergoes regular training and certification to ensure
              they're up-to-date with the latest industry standards and techniques.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <a
            href="tel:2137924145"
            className="inline-flex items-center gap-2 bg-brand-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-brand-700 transition-colors"
          >
            Schedule with Our Experts
          </a>
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 