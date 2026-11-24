import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from '@/components/CanonicalLink';
import { blogPosts as catalog } from '@/pages/blog/data';

const featuredSlugs = [
  'air-duct-cleaning-cost-los-angeles',
  'signs-air-ducts-need-cleaning',
  'commercial-air-duct-cleaning-los-angeles-businesses',
];

const BlogSection = () => {
  const posts = featuredSlugs
    .map((slug) => catalog.find((item) => item.slug === slug))
    .filter((item): item is (typeof catalog)[number] => Boolean(item));

  return (
    <section className="bg-white py-16" aria-labelledby="latest-blog-heading">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 id="latest-blog-heading" className="text-3xl font-bold text-gray-900">
              Latest from the PAC Air Care Journal
            </h2>
            <p className="text-gray-600 mt-2">
              Practical Los Angeles guides on scope, pricing, dryer vent safety, and commercial HVAC planning.
            </p>
          </div>
          <Link to="/blog/" className="text-brand-700 font-semibold hover:underline inline-flex items-center gap-1">
            Browse all guides <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col">
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                <span className="inline-flex items-center gap-1">
                  <Calendar size={13} aria-hidden="true" />
                  <time dateTime={post.date}>{new Date(`${post.date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={13} aria-hidden="true" />
                  {post.readTime}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                <Link to={`/blog/${post.slug}/`} className="hover:text-brand-700">
                  {post.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-5 flex-1">{post.excerpt}</p>
              <Link
                to={`/blog/${post.slug}/`}
                className="text-brand-700 hover:text-brand-900 font-semibold inline-flex items-center gap-1"
              >
                Read guide <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
