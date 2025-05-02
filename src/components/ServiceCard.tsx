
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ServiceCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  className?: string;
  imageUrl?: string;
};

const ServiceCard = ({ title, description, icon, link, className, imageUrl }: ServiceCardProps) => {
  return (
    <div 
      className={cn(
        "service-card flex flex-col h-full transition-all duration-300 overflow-hidden",
        imageUrl ? "relative" : "",
        className
      )}
    >
      {imageUrl && (
        <div className="absolute inset-0 z-0 opacity-10">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      
      <div className="relative z-10">
        <div className="mb-4 text-brand-600">
          {icon}
        </div>
        
        <h3 className="text-xl font-heading font-semibold mb-3">{title}</h3>
        
        <p className="text-gray-600 mb-6">{description}</p>
        
        <div className="mt-auto">
          <Button asChild variant="outline" className="hover:bg-brand-50 hover:text-brand-700 border-brand-200">
            <Link to={link}>
              Learn More
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
