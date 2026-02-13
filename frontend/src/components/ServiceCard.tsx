
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import ResponsiveImage from '@/components/ResponsiveImage';

export interface ServiceCardProps {
  title: string;
  description: string;
  link?: string;
  icon?: LucideIcon;
  slug?: string;
  imageSrc?: string;
}

const ServiceCard = ({ title, description, link, icon: Icon, slug, imageSrc }: ServiceCardProps) => {
  const finalLink = link || (slug ? `/services/${slug}` : '#');

  return (
    <div className="glass-card group h-full flex flex-col overflow-hidden">
      <div className="relative h-56 w-full overflow-hidden bg-slate-900/10">
        <ResponsiveImage
          src={imageSrc || "/images/services/placeholder.jpg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          width={800}
          height={400}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {Icon && (
          <div className="absolute bottom-4 left-4 p-3 glass-premium rounded-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <Icon className="h-6 w-6 text-sky-400" />
          </div>
        )}
      </div>

      <div className="p-8 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold mb-3 text-slate-800 tracking-tight group-hover:text-sky-700 transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 mb-6 leading-relaxed flex-1">
          {description}
        </p>

        {(link || slug) && (
          <Link
            to={finalLink}
            className="inline-flex items-center font-bold text-sky-600 hover:text-sky-700 group/link transition-colors"
          >
            <span className="relative">
              Explore Service
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-200 scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left"></span>
            </span>
            <svg className="w-5 h-5 ml-2 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
