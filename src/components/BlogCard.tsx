
import { CalendarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type BlogCardProps = {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  slug: string;
};

const BlogCard = ({ title, excerpt, date, image, category, slug }: BlogCardProps) => {
  return (
    <div className="blog-card flex flex-col h-full">
      <Link to={`/blog/${slug}`} className="block overflow-hidden h-48">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 mb-2">
          <span className="bg-[#5BBDE4]/20 text-[#0A3D7C] text-xs font-medium px-2.5 py-0.5 rounded">
            {category}
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <CalendarIcon size={12} />
            <span>{date}</span>
          </div>
        </div>
        <Link to={`/blog/${slug}`} className="block mb-2">
          <h3 className="font-heading font-semibold text-lg hover:text-[#0A3D7C] transition">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 flex-grow">{excerpt}</p>
        <Link 
          to={`/blog/${slug}`}
          className="text-[#0A3D7C] font-medium inline-flex items-center hover:underline mt-auto"
        >
          Read More
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
