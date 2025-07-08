
import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 1,
    title: "Air Duct Cleaning FAQ",
    description: "Get answers to the most common questions about air duct cleaning services.",
    slug: "air-duct-cleaning-faq",
    date: "2024-01-15",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Dryer Vent Safety Guide",
    description: "Learn how to keep your home safe with proper dryer vent maintenance.",
    slug: "dryer-vent-safety-guide",
    date: "2024-02-03",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Commercial Indoor Air Quality Guide",
    description: "A comprehensive guide to improving indoor air quality in commercial spaces.",
    slug: "commercial-indoor-air-quality-guide",
    date: "2024-02-17",
    readTime: "10 min read"
  },
  {
    id: 4,
    title: "Health Benefits of Air Duct Cleaning",
    description: "Discover the health benefits of regular air duct cleaning for your home or office.",
    slug: "health-benefits-air-duct-cleaning",
    date: "2024-03-05",
    readTime: "6 min read"
  },
  {
    id: 5,
    title: "Importance of Regular Air Duct Cleaning",
    description: "Why you should schedule regular air duct cleaning to maintain good indoor air quality.",
    slug: "importance-of-regular-air-duct-cleaning",
    date: "2024-03-20",
    readTime: "8 min read"
  },
  {
    id: 6,
    title: "Clean Air Ducts for Allergy Relief",
    description: "How clean air ducts can help reduce allergies and respiratory issues at home.",
    slug: "clean-air-ducts-allergy-relief",
    date: "2024-04-10",
    readTime: "7 min read"
  },
  {
    id: 7,
    title: "Signs Your Air Ducts Need Cleaning",
    description: "Learn to recognize when your air ducts are due for a professional cleaning.",
    slug: "signs-air-ducts-need-cleaning",
    date: "2024-04-25",
    readTime: "5 min read"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Blog | Pure Air California</title>
        <meta
          name="description"
          content="Read our blog for tips, advice, and information about air duct cleaning, dryer vent maintenance, and indoor air quality."
        />
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Blog"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Pure Air California Blog
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Expert tips, advice, and information to help you maintain clean air in your home or business.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <ScrollReveal key={post.id} animation="fadeInUp" delay={0.1 * (post.id % 3)}>
                <Link to={`/blog/${post.slug}`} className="group">
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-sm text-gray-500 mb-2">{post.date} • {post.readTime}</div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{post.description}</p>
                      <div className="text-blue-600 font-medium">Read More →</div>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact Us for More Information</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
