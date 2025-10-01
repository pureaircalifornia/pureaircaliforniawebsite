
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Clock, ArrowRight, Star } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "Air Duct Cleaning FAQ",
    description: "Get answers to the most common questions about air duct cleaning services.",
    slug: "air-duct-cleaning-faq",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "FAQ",
    featured: true,
    excerpt: "Everything you need to know about air duct cleaning, from cost to frequency and benefits.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Dryer Vent Safety Guide",
    description: "Learn how to keep your home safe with proper dryer vent maintenance.",
    slug: "dryer-vent-safety-guide",
    date: "2024-02-03",
    readTime: "7 min read",
    category: "Safety",
    featured: false,
    excerpt: "Protect your home from fire hazards with proper dryer vent maintenance and cleaning.",
    image: "https://images.unsplash.com/photo-1597345637412-9fd611e758e4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Commercial Indoor Air Quality Guide",
    description: "A comprehensive guide to improving indoor air quality in commercial spaces.",
    slug: "commercial-indoor-air-quality-guide",
    date: "2024-02-17",
    readTime: "10 min read",
    category: "Commercial",
    featured: true,
    excerpt: "Complete guide to improving indoor air quality in offices, retail spaces, and other commercial buildings.",
    image: "https://images.unsplash.com/photo-1551639325-8f2e71afa1fc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Health Benefits of Air Duct Cleaning",
    description: "Discover the health benefits of regular air duct cleaning for your home or office.",
    slug: "health-benefits-air-duct-cleaning",
    date: "2024-03-05",
    readTime: "6 min read",
    category: "Health",
    featured: false,
    excerpt: "How clean air ducts can improve your health and reduce respiratory issues.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Importance of Regular Air Duct Cleaning",
    description: "Why you should schedule regular air duct cleaning to maintain good indoor air quality.",
    slug: "importance-of-regular-air-duct-cleaning",
    date: "2024-03-20",
    readTime: "8 min read",
    category: "Maintenance",
    featured: false,
    excerpt: "Learn why regular air duct cleaning is essential for maintaining healthy indoor air quality.",
    image: "https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Clean Air Ducts for Allergy Relief",
    description: "How clean air ducts can help reduce allergies and respiratory issues at home.",
    slug: "clean-air-ducts-allergy-relief",
    date: "2024-04-10",
    readTime: "7 min read",
    category: "Health",
    featured: false,
    excerpt: "Reduce allergy symptoms and improve respiratory health with professional air duct cleaning.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    title: "Signs Your Air Ducts Need Cleaning",
    description: "Learn to recognize when your air ducts are due for a professional cleaning.",
    slug: "signs-air-ducts-need-cleaning",
    date: "2024-04-25",
    readTime: "5 min read",
    category: "Maintenance",
    featured: false,
    excerpt: "Know when it's time to schedule professional air duct cleaning for your home or business.",
    image: "https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc0?auto=format&fit=crop&w=800&q=80"
  }
];

const categories = ["All", "FAQ", "Safety", "Commercial", "Health", "Maintenance"];

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

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Blog | Pure Air California - Expert Air Quality Tips & Advice</title>
        <meta
          name="description"
          content="Read our expert blog for tips, advice, and information about air duct cleaning, dryer vent maintenance, and indoor air quality. Stay informed about healthy air practices."
        />
        <meta name="keywords" content="air duct cleaning blog, indoor air quality tips, dryer vent safety, HVAC maintenance, air quality advice" />
        <meta property="og:title" content="Blog | Pure Air California" />
        <meta property="og:description" content="Expert tips, advice, and information to help you maintain clean air in your home or business." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pureairca.com/blog" />
        <link rel="canonical" href="https://pureairca.com/blog" />
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
                      <img
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
                      <img
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
  );
};

export default Blog;
