import React from 'react';
import { Award, Shield, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ResponsiveImage from '@/components/ResponsiveImage';
import { Link } from 'react-router-dom';

interface AuthorProps {
  name: string;
  role?: string;
  certifications?: string[];
  bio?: string;
  avatarUrl?: string;
}

// Default author for E-E-A-T if none specifically matched
const defaultAuthor: AuthorProps = {
  name: 'Michael Rodriguez',
  role: 'Senior Air Quality Specialist',
  certifications: ['NADCA Certified ASCS', 'EPA Filter Verified'],
  bio: 'Michael has over 12 years of experience in HVAC hygiene and indoor air quality throughout Los Angeles. As a NADCA-certified Air Systems Cleaning Specialist, he ensures every project meets the highest industry standards.',
  avatarUrl: '/images/team/michael-rodriguez.jpg'
};

const authorDirectory: Record<string, AuthorProps> = {
  'Michael Rodriguez, NADCA Certified': defaultAuthor,
  'Hospitality Air Quality Consultant': {
    name: 'Sarah Jenkins',
    role: 'Commercial IAQ Consultant',
    certifications: ['NADCA Certified ASCS', 'CVI Certified'],
    bio: 'Sarah specializes in large-scale commercial duct systems for LA hotels, hospitals, and high-rises. She holds advanced NADCA certifications for commercial system inspection and cleaning.',
    avatarUrl: '/images/team/sarah-jenkins.jpg'
  },
  'Pure Air California Team': {
    name: 'Pure Air California Editorial Team',
    role: 'Indoor Air Quality Experts',
    certifications: ['Multiple NADCA Certifications', 'BBB A+ Rated'],
    bio: 'The editorial team at Pure Air California comprises industry veterans with decades of combined experience in HVAC hygiene, fire prevention, and indoor air quality in Southern California.',
    avatarUrl: '/brand/72fdde68-6f0b-49b3-ae09-0c49f6d931dd.png'
  }
};

const AuthorBox: React.FC<{ authorName: string }> = ({ authorName }) => {
  // Use exact match or default based on the string name
  const authorData = authorDirectory[authorName] || {
    name: authorName,
    role: 'Air Quality Specialist',
    certifications: ['Pure Air California Trained'],
    bio: `Author and air quality specialist for Pure Air California, providing expert insights on keeping Los Angeles homes and businesses clean and safe.`,
    avatarUrl: '/brand/72fdde68-6f0b-49b3-ae09-0c49f6d931dd.png'
  };

  return (
    <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm" itemScope itemType="https://schema.org/Person">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-24 h-24 shrink-0 rounded-full overflow-hidden border-4 border-slate-50 bg-slate-100 flex items-center justify-center">
          {authorData.avatarUrl ? (
            <img 
              src={authorData.avatarUrl} 
              alt={authorData.name}
              itemProp="image"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to initial
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = `<span class="text-3xl font-bold text-slate-400">${authorData.name.charAt(0)}</span>`;
              }}
            />
          ) : (
            <span className="text-3xl font-bold text-slate-400">{authorData.name.charAt(0)}</span>
          )}
        </div>
        
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
            <h3 className="text-2xl font-bold text-slate-900 m-0" itemProp="name">{authorData.name}</h3>
            <span className="text-sky-700 font-semibold text-sm bg-sky-50 px-3 py-1 rounded-full" itemProp="jobTitle">
              {authorData.role}
            </span>
          </div>

          <p className="text-slate-600 mb-4 leading-relaxed" itemProp="description">
            {authorData.bio}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {authorData.certifications?.map((cert, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded">
                <Shield size={12} className="text-emerald-500" />
                {cert}
              </span>
            ))}
          </div>
          
          <div className="flex items-center gap-4 text-sm font-semibold text-slate-700 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-1">
              <Award size={16} className="text-brand-600" />
              <span>Expert Contributor</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full" />
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-500 fill-current" />
              <span>Top Rated Team</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorBox;
