
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

export interface ServiceCardProps {
  title: string;
  description: string;
  link: string;
  icon?: LucideIcon;
}

const ServiceCard = ({ title, description, link, icon: Icon }: ServiceCardProps) => {
  return (
    <div className="p-6 border rounded-lg shadow-md flex flex-col">
      {Icon && <Icon className="h-8 w-8 text-blue-600 mb-4" />}
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-gray-600 flex-grow">{description}</p>
      <Button asChild variant="link" className="mt-4 p-0">
        <Link to={link}>Learn More</Link>
      </Button>
    </div>
  );
};

export default ServiceCard;
