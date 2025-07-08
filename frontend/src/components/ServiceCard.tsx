
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

export interface ServiceCardProps {
  title: string;
  description: string;
  link?: string;
  icon?: LucideIcon;
  slug?: string; // Added to support the usage in some location pages
}

const ServiceCard = ({ title, description, link, icon: Icon, slug }: ServiceCardProps) => {
  const finalLink = link || (slug ? `/services/${slug}` : '#');
  
  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
      {Icon && <Icon className="h-10 w-10 text-blue-600 mb-4" />}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {(link || slug) && (
        <Link 
          to={finalLink}
          className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
        >
          Learn more
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default ServiceCard;
