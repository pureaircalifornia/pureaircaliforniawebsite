
import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Clock, ArrowRight, Star } from 'lucide-react';
import ResponsiveImage from '@/components/ResponsiveImage';
import { blogPosts, categories } from './blog/data';
import SEOProvider from '@/components/SEOProvider';
import SchemaMarkup from '@/components/SchemaMarkup';
import { seoConfig } from '@/utils/seo/seoConfig';

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

  const pageTitle = "Blog | Pure Air California - Expert Air Quality Tips & Advice";
  const pageDescription = "Read our expert blog for tips, advice, and information about air duct cleaning, dryer vent maintenance, and indoor air quality. Stay informed about healthy air practices.";
  const pageUrl = `${seoConfig.siteUrl}/blog`;

  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <meta name="keywords" content="air duct cleaning blog Los Angeles, indoor air quality tips, dryer vent safety, HVAC maintenance LA, air quality advice" />
          <meta name="robots" content="index, follow, max-image-preview:large" />
          <meta name="geo.region" content="US-CA" />
          <meta name="geo.placename" content="Los Angeles" />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={pageUrl} />
          <meta property="og:site_name" content="Pure Air California" />
          <link rel="canonical" href={pageUrl} />
        </Helmet>
        <SEOProvider>
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
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(100,180,255,0.2), 0 0 60px rgba(100,180,255,0.1)' }}>
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

            <div className="mt-16 text-center">
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact Us for More Information</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Blog;
