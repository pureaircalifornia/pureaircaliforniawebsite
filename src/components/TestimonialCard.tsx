
import { Star } from "lucide-react";

type TestimonialCardProps = {
  name: string;
  location: string;
  quote: string;
  rating: number;
  image?: string;
};

const TestimonialCard = ({ name, location, quote, rating, image }: TestimonialCardProps) => {
  return (
    <div className="testimonial-card flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-500 text-lg font-semibold">{name.charAt(0)}</span>
          )}
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
          />
        ))}
      </div>
      
      <blockquote className="text-gray-600 italic flex-grow">
        "{quote}"
      </blockquote>
    </div>
  );
};

export default TestimonialCard;
