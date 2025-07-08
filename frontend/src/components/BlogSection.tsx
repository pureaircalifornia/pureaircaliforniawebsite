import React from 'react';
import { Calendar, Leaf, Shield, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogSection = () => {
  const blogPosts = [
    {
      title: "The Importance of Regular Air Duct Cleaning",
      excerpt: "Learn why regular air duct cleaning is essential for your health and HVAC system efficiency.",
      link: "/blog/importance-of-regular-air-duct-cleaning",
      date: "March 15, 2024"
    },
    {
      title: "Signs Your Air Ducts Need Cleaning",
      excerpt: "Discover the common indicators that your air ducts require professional cleaning.",
      link: "/blog/signs-your-air-ducts-need-cleaning",
      date: "March 10, 2024"
    },
    {
      title: "Commercial Air Duct Cleaning: A Business Essential",
      excerpt: "Why businesses in Los Angeles need regular air duct maintenance.",
      link: "/blog/commercial-air-duct-cleaning-business-essential",
      date: "March 5, 2024"
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Latest from Our Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.title} className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <p className="text-sm text-gray-500 mb-4">{post.date}</p>
              <Link 
                to={post.link}
                className="text-brand-600 hover:text-brand-700 font-medium"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection; 