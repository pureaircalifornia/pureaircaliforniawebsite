
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import QuoteForm from '@/components/QuoteForm';
import { blogPosts } from './blog/post-data';
import ResponsiveImage from '@/components/ResponsiveImage';
import SEOProvider from '@/components/SEOProvider';
import SchemaMarkup from '@/components/SchemaMarkup';
import { seoConfig } from '@/utils/seo/seoConfig';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts[slug as keyof typeof blogPosts] : null;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="mb-8">The article you're looking for doesn't exist or has been moved.</p>
            <Button asChild>
              <Link to="/blog">Return to Blog</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const pageUrl = `${seoConfig.siteUrl}/blog/${slug}`;

  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>{post.title} | Pure Air California Blog</title>
          <meta name="description" content={post.content.substring(0, 160).replace(/<[^>]*>/g, '')} />
          <meta name="keywords" content={`air duct cleaning, ${post.category.toLowerCase()}, indoor air quality, pure air california, los angeles, ${post.title.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').split(' ').join(', ')}`} />
          <meta name="robots" content="index, follow, max-image-preview:large" />
          <meta name="geo.region" content="US-CA" />
          <meta name="geo.placename" content="Los Angeles" />
          <meta property="og:title" content={`${post.title} | Pure Air California Blog`} />
          <meta property="og:description" content={post.content.substring(0, 160).replace(/<[^>]*>/g, '')} />
          <meta property="og:image" content={`${seoConfig.siteUrl}${post.image}`} />
          <meta property="og:url" content={pageUrl} />
          <meta property="og:type" content="article" />
          <meta property="og:site_name" content="Pure Air California" />
          <link rel="canonical" href={pageUrl} />
        </Helmet>
        <SEOProvider>
          <SchemaMarkup schema={{
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "image": `${seoConfig.siteUrl}${post.image}`,
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "publisher": seoConfig.schema.organization,
            "datePublished": post.date,
            "description": post.content.substring(0, 160).replace(/<[^>]*>/g, '')
          }} />
        </SEOProvider>

        <NavBar />

        {/* Featured Image */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <ResponsiveImage
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <span className="bg-[#5BBDE4] text-white text-sm font-medium px-3 py-1 rounded">
                  {post.category}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mt-4 mb-2 font-heading">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-white/80">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                  <Link to="/blog" className="flex items-center gap-2 text-[#0A3D7C] font-medium hover:underline mb-6">
                    <ArrowLeft size={16} />
                    Back to Blog
                  </Link>

                  <div
                    className="prose max-w-none lg:prose-lg prose-headings:font-heading prose-headings:text-gray-900"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
                  />

                  <div className="border-t border-gray-200 mt-8 pt-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <span className="text-gray-600">Share this article:</span>
                        <div className="flex gap-2 mt-2">
                          <Button variant="outline" size="icon" className="rounded-full w-8 h-8 p-0">
                            <Facebook size={16} />
                          </Button>
                          <Button variant="outline" size="icon" className="rounded-full w-8 h-8 p-0">
                            <Twitter size={16} />
                          </Button>
                          <Button variant="outline" size="icon" className="rounded-full w-8 h-8 p-0">
                            <Linkedin size={16} />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          <span className="text-gray-500 text-lg font-semibold">{post.author.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-medium">{post.author}</div>
                          <div className="text-sm text-gray-500">Author</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  <QuoteForm />

                  <div className="bg-[#0A3D7C] bg-opacity-5 rounded-xl p-6">
                    <h3 className="font-heading font-semibold text-xl mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden">
                          <ResponsiveImage
                            src="/images/blog/related-1.jpg"
                            alt="Dryer vent cleaning"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm hover:text-[#0A3D7C] transition">
                            <Link to="/blog/dryer-vent-cleaning-fire-prevention">
                              Dryer Vent Cleaning: A Critical Fire Prevention Measure
                            </Link>
                          </h4>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <Calendar size={12} />
                            <span>March 15, 2023</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden">
                          <ResponsiveImage
                            src="/images/blog/related-2.jpg"
                            alt="HVAC efficiency"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm hover:text-[#0A3D7C] transition">
                            <Link to="/blog/hvac-efficiency-clean-air-ducts-save-money">
                              HVAC Efficiency: How Clean Air Ducts Save You Money
                            </Link>
                          </h4>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <Calendar size={12} />
                            <span>March 3, 2023</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden">
                          <ResponsiveImage
                            src="/images/blog/related-3.jpg"
                            alt="Air duct cleaning process"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm hover:text-[#0A3D7C] transition">
                            <Link to="/blog/air-duct-cleaning-process-what-to-expect">
                              The Air Duct Cleaning Process: What to Expect
                            </Link>
                          </h4>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <Calendar size={12} />
                            <span>February 18, 2023</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/blog">View All Articles</Link>
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#0A3D7C] to-[#5BBDE4] rounded-xl p-6 text-white">
                    <h3 className="font-heading font-semibold text-xl mb-4">Breathe Cleaner Air Today</h3>
                    <p className="mb-6">Schedule your professional air duct cleaning service and experience the difference in your indoor air quality.</p>
                    <Button asChild size="lg" className="w-full bg-white text-[#0A3D7C] hover:bg-gray-100">
                      <Link to="/quote">Get a Free Quote</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default BlogPost;
