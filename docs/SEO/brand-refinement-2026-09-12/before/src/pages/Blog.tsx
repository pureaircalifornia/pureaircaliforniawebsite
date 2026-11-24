
import React, { useState } from 'react';

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Clock, ArrowRight, Star, Phone } from 'lucide-react';
import ResponsiveImage from '@/components/ResponsiveImage';
import { blogPosts, categories } from './blog/data';
import SEOProvider from '@/components/SEOProvider';
import SchemaMarkup from '@/components/SchemaMarkup';
import { seoConfig } from '@/utils/seo/seoConfig';
import Breadcrumbs from '@/components/Breadcrumbs';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  const pageTitle = "Air Duct Cleaning Blog | Pure Air California";
  const pageDescription = "Expert advice on air duct cleaning, dryer vent maintenance and indoor air quality from Pure Air California's NADCA-certified team in Los Angeles.";
  const pageUrl = `${seoConfig.siteUrl}/blog`;

  return (
    
      <div className="min-h-screen flex flex-col">
        <SEOProvider title={pageTitle} description={pageDescription}>
          <SchemaMarkup schema={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": pageUrl,
            "name": pageTitle,
            "description": pageDescription,
            "publisher": seoConfig.schema.organization
          }} />
          <SchemaMarkup schema={{
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Blog",
            "description": pageDescription,
            "url": pageUrl,
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": blogPosts.map((post, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `${seoConfig.siteUrl}/blog/${post.slug}`
              }))
            }
          }} />
        </SEOProvider>
        <NavBar />

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gray-900 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-30">
            <ResponsiveImage
              src="/images/blog/blog-hero.jpg"
              alt="Blog"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading drop-shadow-lg">
                Pure Air California Blog
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Expert tips, advice, and information to help you maintain clean air in your home or business.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="container mx-auto px-4">
          <Breadcrumbs />
        </div>

        {/* Featured Posts */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Articles</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our most popular and informative articles about air quality and HVAC maintenance.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <ScrollReveal key={post.id} animation="fadeInUp" delay={0.1 * index}>
                  <Link to={`/blog/${post.slug}`} className="group">
                    <Card className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <div className="relative">
                        <ResponsiveImage
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-brand-600 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.readTime}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3 group-hover:text-brand-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        <div className="flex items-center text-brand-600 font-medium group-hover:gap-2 transition-all">
                          Read More
                          <ArrowRight className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-brand-600 hover:bg-brand-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* All Blog Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {selectedCategory === "All" ? "All Articles" : `${selectedCategory} Articles`}
              </h2>
              <p className="text-lg text-gray-600">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <ScrollReveal key={post.id} animation="fadeInUp" delay={0.1 * (index % 3)}>
                  <Link to={`/blog/${post.slug}`} className="group">
                    <Card className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <div className="relative">
                        <ResponsiveImage
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary">{post.category}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.readTime}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3 group-hover:text-brand-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{post.description}</p>
                        <div className="flex items-center text-brand-600 font-medium group-hover:gap-2 transition-all">
                          Read More
                          <ArrowRight className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-500 mb-4">
                  <Search className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                  <p>Try adjusting your search terms or category filter.</p>
                </div>
              </div>
            )}

            {/* High-Conversion CTA */}
            <div className="mt-16 bg-gradient-to-r from-brand-700 to-brand-800 rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Stop Breathing Dirty Air Today</h2>
              <p className="text-brand-100 text-lg mb-6 max-w-2xl mx-auto">
                Join the 448,000+ customers we have served since 1993. Get a free, no-obligation quote in under 2 minutes — or call for immediate service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-gray-100 font-bold text-lg px-8 py-6 h-auto shadow-lg">
                  <Link to="/quote">Get Your Free Quote →</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold text-lg px-8 py-6 h-auto">
                  <a href="tel:2137924145" className="flex items-center gap-2">
                    <Phone className="w-5 h-5 fill-current" />
                    (213) 792-4145
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    
  );
};

export default Blog;
