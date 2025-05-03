import React from 'react';
import { Calendar, Leaf, Shield, TrendingUp } from 'lucide-react';

const BlogSection = () => {
  const articles = [
    {
      title: 'Spring Cleaning: Why Your Air Ducts Need Attention',
      excerpt: 'Learn why spring is the perfect time for air duct cleaning and how it can improve your indoor air quality.',
      category: 'Seasonal Tips',
      date: 'March 15, 2024',
      icon: Calendar,
      readTime: '5 min read'
    },
    {
      title: 'The Impact of Clean Air Ducts on Energy Efficiency',
      excerpt: 'Discover how clean air ducts can reduce your energy bills and improve your HVAC system performance.',
      category: 'Energy Savings',
      date: 'March 10, 2024',
      icon: Leaf,
      readTime: '4 min read'
    },
    {
      title: 'Commercial Air Duct Maintenance: Best Practices',
      excerpt: 'Essential maintenance tips for commercial properties to ensure optimal air quality and system performance.',
      category: 'Commercial',
      date: 'March 5, 2024',
      icon: Shield,
      readTime: '6 min read'
    },
    {
      title: 'Latest Trends in Air Duct Cleaning Technology',
      excerpt: 'Explore the newest innovations in air duct cleaning equipment and techniques.',
      category: 'Industry News',
      date: 'March 1, 2024',
      icon: TrendingUp,
      readTime: '5 min read'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Resources & Insights</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Stay informed with our latest articles about air duct maintenance, seasonal tips,
          and industry updates to keep your indoor air quality at its best.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((article, index) => {
            const Icon = article.icon;
            return (
              <article
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon className="w-5 h-5 text-brand-600" />
                    <span className="text-sm font-medium text-brand-600">{article.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t">
                  <a
                    href="#"
                    className="text-brand-600 font-medium hover:text-brand-700 transition-colors"
                  >
                    Read More →
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-full hover:bg-brand-700 transition-colors"
          >
            View All Articles
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection; 