import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

type TestimonialCardProps = {
  name: string;
  location: string;
  quote: string;
  rating: number;
  image?: string;
  date?: string;
  platform?: string;
  index?: number;
};

const TestimonialCard = ({ 
  name, 
  location, 
  quote, 
  rating, 
  image, 
  date = "Recent",
  platform = "Google",
  index = 0
}: TestimonialCardProps) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:shadow-xl flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* Quote Icon Decoration */}
      <div className="absolute -top-4 -right-4 opacity-5">
        <Quote size={100} />
      </div>

      <div className="z-10">
        {/* Header with User Info */}
        <div className="flex items-center gap-4 mb-4">
          <motion.div 
            className="relative w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shadow-md ring-2 ring-white"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {image ? (
              <img src={image} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-brand-600 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">{name.charAt(0)}</span>
              </div>
            )}
          </motion.div>
          
          <div className="flex-grow">
            <h4 className="font-semibold text-gray-900">{name}</h4>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{location}</p>
              <span className="text-xs text-gray-400">{date}</span>
            </div>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 + (i * 0.05) }}
            >
              <Star
                size={18}
                className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-200"}
              />
            </motion.div>
          ))}
          
          {platform && (
            <motion.span 
              className="ml-2 text-xs text-gray-400 self-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              via {platform}
            </motion.span>
          )}
        </div>
      </div>
      
      {/* Testimonial Quote */}
      <motion.blockquote 
        className="text-gray-600 mb-4 flex-grow relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="relative leading-relaxed">
          "{quote}"
        </p>
      </motion.blockquote>
      
      {/* Bottom Decorative Line */}
      <motion.div 
        className="h-1 w-16 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full mt-auto"
        initial={{ width: 0 }}
        animate={{ width: "4rem" }}
        transition={{ delay: 0.4, duration: 0.5 }}
      />
    </motion.div>
  );
};

export default TestimonialCard;
