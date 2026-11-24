import React, { useState } from 'react';
import { Search, Calendar, Clock, ArrowRight, ArrowUpRight, Star, Phone, X, BookOpen } from 'lucide-react';
import { getPageHero } from '@/data/pageHeroes';
import { canonicalUrl } from '@/utils/seo/canonicalUrl';
import PageHero from '@/components/PageHero';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@/components/CanonicalLink';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ResponsiveImage from '@/components/ResponsiveImage';
import { blogPosts, categories } from './blog/data';
import SEOProvider from '@/components/SEOProvider';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';
import { business } from '@/config/business';

const quickServiceLinks = [
  {
    title: 'Residential Air Duct Cleaning',
    detail: 'Starting at $299 · Inspection-led negative-pressure source removal',
    path: '/services/residential-air-duct-cleaning/',
  },
  {
    title: 'Residential Dryer Vent Cleaning',
    detail: 'Starting at $149 · Behind-dryer connection to exterior wall or roof hood',
    path: '/services/residential-dryer-vent-cleaning/',
  },
  {
    title: 'Wildfire Smoke & Hillside Ducts',
    detail: 'Post-smoke ash, soot & renovation-dust HVAC inspection across LA canyons',
    path: '/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles/',
  },
  {
    title: 'Commercial & HOA Air Care',
    detail: 'COI-ready multi-unit dryer vent stacks & commercial building HVAC scopes',
    path: '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/',
  },
  {
    title: 'Transparent LA Pricing Guide',
    detail: 'Compare starting prices, system-count factors & written estimate checklists',
    path: '/pricing/',
  },
  {
    title: 'Greater Los Angeles Coverage',
    detail: 'Explore 54 neighborhood service guides from the Westside to the Valleys',
    path: '/locations/los-angeles/',
  },
];

const formatDisplayDate = (isoDate: string) =>
  new Date(`${isoDate}T12:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const normalizedQuery = searchTerm.trim().toLowerCase();

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      !normalizedQuery ||
      post.title.toLowerCase().includes(normalizedQuery) ||
      post.description.toLowerCase().includes(normalizedQuery) ||
      post.excerpt.toLowerCase().includes(normalizedQuery) ||
      post.category.toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const spotlightGuide =
    blogPosts.find((p) => p.slug === 'air-duct-cleaning-cost-los-angeles') || featuredPosts[0];

  const pageTitle = 'Los Angeles Air Duct & Dryer Vent Blog | Pure Air CA';
  const pageDescription =
    'Practical Los Angeles guides on air duct cleaning costs, dryer vent fire safety, wildfire smoke HVAC recovery, and commercial scopes. Read the PAC journal.';

  return (
    <div className="min-h-screen flex flex-col">
      <SEOProvider
        title={pageTitle}
        description={pageDescription}
        path="/blog/"
        mainEntityId={`${canonicalUrl('/blog')}#articles`}
      >
        <SchemaMarkup
          schema={{
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            '@id': `${canonicalUrl('/blog')}#articles`,
            name: 'PAC air care journal',
            itemListElement: blogPosts.map((post, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: post.title,
              url: canonicalUrl(`/blog/${post.slug}`),
            })),
          }}
        />
      </SEOProvider>
      <NavBar alwaysOpaque />

      <main className="flex-grow">
        {/* Hero Section */}
        <PageHero
          title={
            <>
              Los Angeles Air Duct, Dryer Vent
              <br />
              <em>&amp; Indoor Air Quality Journal.</em>
            </>
          }
          description="Practical homeowner and facility guides on air duct cleaning costs, dryer fire prevention, wildfire smoke recovery, and commercial HVAC maintenance across Los Angeles."
          estimateHref="/quote/?service=air-duct&property=home#estimate-builder"
          estimateLabel="Get a free written estimate"
        />

        {/* Breadcrumb */}
        <div className="container mx-auto px-4">
          <Breadcrumbs />
        </div>

        {/* Start Here: Spotlight LA Homeowner Guide */}
        {spotlightGuide && (
          <section className="pt-10 pb-6 bg-white" aria-label="Essential Los Angeles homeowner guide">
            <div className="container mx-auto px-4">
              <div className="rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-sky-50 p-6 md:p-8 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-5 overflow-hidden rounded-xl">
                    <ResponsiveImage
                      src={spotlightGuide.image}
                      alt={getPageHero(`/blog/${spotlightGuide.slug}/`).alt}
                      className="w-full h-60 object-cover rounded-xl"
                      width={640}
                      height={400}
                    />
                  </div>
                  <div className="lg:col-span-7">
                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
                      <Badge className="bg-brand-700 text-white">
                        <BookOpen className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
                        Essential LA Homeowner &amp; Buyer Guide
                      </Badge>
                      <Badge variant="outline" className="border-brand-200 text-brand-800">
                        {spotlightGuide.category}
                      </Badge>
                      <span className="text-xs text-gray-500 inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {spotlightGuide.readTime}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                      <Link
                        to={`/blog/${spotlightGuide.slug}/`}
                        className="hover:text-brand-700 transition-colors"
                      >
                        {spotlightGuide.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-5">
                      {spotlightGuide.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      <Button asChild className="bg-brand-700 hover:bg-brand-800 text-white font-semibold">
                        <Link to={`/blog/${spotlightGuide.slug}/`}>
                          Read the LA Cost &amp; Quote Guide <ArrowRight className="h-4 w-4 ml-1.5" aria-hidden="true" />
                        </Link>
                      </Button>
                      <Link
                        to="/pricing/"
                        className="text-brand-700 font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        See published starting prices ($299 / $149) <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Search & Category Filter Bar */}
        <section
          className="py-8 bg-white border-y border-gray-200 sticky top-[72px] z-20 backdrop-blur-md bg-white/95"
          aria-label="Filter and search articles"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto mb-5 relative">
              <label htmlFor="blog-search-input" className="sr-only">
                Search Los Angeles air duct and dryer vent articles
              </label>
              <Search
                className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <Input
                id="blog-search-input"
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search guides by topic (e.g., cost, wildfire smoke, dryer vent, HOA, allergies)..."
                className="pl-10 pr-10 h-11 rounded-full border-gray-300 focus-visible:ring-brand-600"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => {
                const count =
                  category === 'All'
                    ? blogPosts.length
                    : blogPosts.filter((p) => p.category === category).length;
                const isSelected = selectedCategory === category;
                return (
                  <Button
                    key={category}
                    size="sm"
                    variant={isSelected ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={isSelected}
                    className={
                      isSelected
                        ? 'bg-brand-700 hover:bg-brand-800 text-white rounded-full'
                        : 'rounded-full text-gray-700 hover:text-brand-700'
                    }
                  >
                    {category} <span className="ml-1.5 text-xs opacity-75">({count})</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Posts (shown when All & no search active) */}
        {selectedCategory === 'All' && !normalizedQuery && (
          <section className="py-14 bg-gray-50" aria-labelledby="featured-guides-heading">
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <span className="pac-eyebrow">START WITH THE ESSENTIALS</span>
                <h2 id="featured-guides-heading" className="text-3xl font-bold mt-2 mb-3">
                  Featured Planning Guides
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Most-read guides for Los Angeles homeowners, HOA boards, and commercial facility teams.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <ScrollReveal key={post.id} animation="fadeInUp" delay={0.08 * index}>
                    <Link to={`/blog/${post.slug}/`} className="group block h-full">
                      <Card className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden border-gray-200">
                        <div className="relative">
                          <ResponsiveImage
                            src={post.image}
                            alt={getPageHero(`/blog/${post.slug}/`).alt}
                            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                            width={640}
                            height={400}
                          />
                          <div className="absolute top-4 left-4 flex gap-2">
                            <Badge className="bg-brand-700 text-white">
                              <Star className="h-3 w-3 mr-1" aria-hidden="true" />
                              Featured
                            </Badge>
                            <Badge variant="secondary" className="bg-white/95 text-gray-800">
                              {post.category}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" aria-hidden="true" />
                              <time dateTime={post.date}>{formatDisplayDate(post.date)}</time>
                            </div>
                            <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-800">
                              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                              {post.readTime}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-brand-700 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                          <div className="flex items-center text-brand-700 font-semibold group-hover:gap-2 transition-all">
                            Read Guide
                            <ArrowRight
                              className="h-4 w-4 ml-1 group-hover:ml-2 transition-all"
                              aria-hidden="true"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Blog Posts */}
        <section className="py-16" aria-labelledby="all-articles-heading">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <h2 id="all-articles-heading" className="text-3xl font-bold text-gray-900">
                  {selectedCategory === 'All' ? 'All Journal Articles' : `${selectedCategory} Guides`}
                </h2>
                <p className="text-gray-600 mt-1">
                  Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                  {searchTerm ? ` matching "${searchTerm}"` : ''}
                </p>
              </div>
              {(selectedCategory !== 'All' || searchTerm) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchTerm('');
                  }}
                >
                  Reset filters
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <ScrollReveal key={post.id} animation="fadeInUp" delay={0.06 * (index % 3)}>
                  <Link to={`/blog/${post.slug}/`} className="group block h-full">
                    <Card className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden border-gray-200 flex flex-col">
                      <div className="relative">
                        <ResponsiveImage
                          src={post.image}
                          alt={getPageHero(`/blog/${post.slug}/`).alt}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          width={640}
                          height={400}
                        />
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="bg-white/95 text-gray-900 font-medium">
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                            <time dateTime={post.date}>{formatDisplayDate(post.date)}</time>
                          </div>
                          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                            <Clock className="h-3 w-3" aria-hidden="true" />
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-brand-700 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-5 flex-1 leading-relaxed">{post.description}</p>
                        <div className="flex items-center text-brand-700 font-semibold group-hover:gap-2 transition-all">
                          Read Guide
                          <ArrowRight
                            className="h-4 w-4 ml-1 group-hover:ml-2 transition-all"
                            aria-hidden="true"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
                <Search className="h-12 w-12 mx-auto mb-3 text-gray-400" aria-hidden="true" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">No matching guides found</h3>
                <p className="text-gray-600 mb-5">
                  Try clearing your search term or switching back to All categories.
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchTerm('');
                  }}
                >
                  Show all {blogPosts.length} articles
                </Button>
              </div>
            )}

            {/* Internal Links to Core LA Services */}
            <div className="mt-16 pt-14 border-t border-gray-200">
              <div className="max-w-2xl mb-8">
                <span className="pac-eyebrow">FROM GUIDES TO ACTION</span>
                <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-2 text-gray-900">
                  Explore Pure Air California Services in Los Angeles
                </h2>
                <p className="text-gray-600">
                  Ready to apply what you read? Compare our inspection-led residential and commercial service scopes across Greater Los Angeles.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickServiceLinks.map((service) => (
                  <Link
                    key={service.path}
                    to={service.path}
                    className="group rounded-xl border border-gray-200 bg-white p-5 hover:border-brand-300 hover:shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-brand-700 flex items-center justify-between gap-2 mb-1.5">
                        <span>{service.title}</span>
                        <ArrowUpRight size={17} aria-hidden="true" className="text-brand-600 flex-shrink-0" />
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{service.detail}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Trustworthy LA Estimate CTA */}
            <div className="mt-14 bg-gradient-to-r from-brand-700 to-brand-800 rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Plan Your Los Angeles Air Duct or Dryer Vent Visit
              </h2>
              <p className="text-brand-100 text-lg mb-6 max-w-2xl mx-auto">
                Residential air duct cleaning starts at $299 and dryer vent cleaning starts at $149 for eligible scopes. Request a free written estimate with your scope and price confirmed before work starts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-brand-700 hover:bg-gray-100 font-bold text-lg px-8 py-6 h-auto shadow-lg"
                >
                  <Link to="/quote/?service=air-duct&property=home#estimate-builder">
                    Build Your Free Estimate →
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 font-bold text-lg px-8 py-6 h-auto"
                >
                  <a href={business.phoneHref} className="flex items-center gap-2">
                    <Phone className="w-5 h-5 fill-current" aria-hidden="true" />
                    {business.phone}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
