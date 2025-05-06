import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
  imageSrc?: string;
  features?: string[];
}

const ServiceCard = ({
  title,
  description,
  icon,
  link,
  imageSrc,
  features = []
}: ServiceCardProps) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100 transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5 }}
      transition={{ 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {/* Top image if provided */}
      {imageSrc && (
        <div className="relative h-48 w-full overflow-hidden">
          <motion.img
            src={imageSrc}
            alt={title}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      <div className={`p-6 ${imageSrc ? 'pt-4' : ''}`}>
        <div className="mb-4 flex items-center gap-3">
          <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>

        <p className="mb-4 text-gray-600">{description}</p>

        {/* Features list with checkmarks */}
        {features.length > 0 && (
          <ul className="mb-6 space-y-2">
            {features.map((feature, index) => (
              <motion.li 
                key={index} 
                className="flex items-center gap-2 text-sm text-gray-600"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <svg
                  className="h-4 w-4 flex-shrink-0 text-brand-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {feature}
              </motion.li>
            ))}
          </ul>
        )}

        <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
          <Button
            variant="ghost"
            asChild
            className="group mt-2 w-full justify-between border border-gray-200 bg-gray-50 px-4 py-2 text-brand-600 hover:bg-brand-50 hover:text-brand-700"
          >
            <Link to={link} className="flex items-center justify-between">
              <span>Learn More</span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Gradient accent border on hover */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-400 to-brand-600"
        initial={{ scaleX: 0, originX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ServiceCard;
