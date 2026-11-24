
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, ArrowRight, Facebook, Twitter, Linkedin, Phone, Clock } from 'lucide-react';

import QuoteForm from '@/components/QuoteForm';
import { blogPosts } from './blog/post-data';
import { blogPosts as blogCatalog } from './blog/data';
import ResponsiveImage from '@/components/ResponsiveImage';
import SEOProvider from '@/components/SEOProvider';
import RelatedLinks from '@/components/RelatedLinks';
import { RELATED_BY_BLOG_CATEGORY } from '@/utils/internalLinks';
import SchemaMarkup from '@/components/SchemaMarkup';
import { seoConfig } from '@/utils/seo/seoConfig';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import TableOfContents from '@/components/TableOfContents';
import Breadcrumbs from '@/components/Breadcrumbs';
import AuthorBox from '@/components/AuthorBox';

// Map categories to relevant service pages for CTA cards
const categoryServiceMap: Record<string, { title: string; link: string; desc: string }> = {
  'Residential': { title: 'Residential Air Duct Cleaning', link: '/services/residential-air-duct-cleaning', desc: 'Protect your family with professional residential duct cleaning.' },
  'Commercial': { title: 'Commercial Air Duct Cleaning', link: '/services/commercial-air-duct-cleaning', desc: 'Boost productivity and reduce liability with commercial duct cleaning.' },
  'Health': { title: 'Health Benefits of Clean Air', link: '/health-benefits', desc: 'Learn how clean ducts improve your family\'s health.' },
  'Health Benefits': { title: 'Health Benefits of Clean Air', link: '/health-benefits', desc: 'Learn how clean ducts improve your family\'s health.' },
  'Safety': { title: 'Dryer Vent Cleaning', link: '/services/residential-dryer-vent-cleaning', desc: 'Prevent fires with professional dryer vent cleaning.' },
  'FAQ': { title: 'Get a Free Quote', link: '/quote', desc: 'Ready to breathe cleaner air? Get your free estimate today.' },
  'Maintenance': { title: 'Maintenance Program', link: '/services/dryer-vent-maintenance-program', desc: 'Keep your system running efficiently year-round.' },
  'Industrial': { title: 'HVAC System Cleaning', link: '/services/hvac-system-cleaning', desc: 'Industrial-grade HVAC cleaning for facility compliance.' },
  'Healthcare': { title: 'Healthcare Facilities', link: '/industries/healthcare', desc: 'Meet Joint Commission air quality standards.' },
  'Restaurant': { title: 'Restaurant Solutions', link: '/industries/restaurants', desc: 'Stay NFPA 96 compliant with kitchen exhaust cleaning.' },
  'Laundromat': { title: 'Commercial Dryer Vent Cleaning', link: '/services/commercial-dryer-vent-cleaning', desc: 'Reduce fire risk and save energy at your laundromat.' },
  'Hospitality': { title: 'Hospitality Solutions', link: '/industries/hospitality', desc: 'Improve guest satisfaction with superior air quality.' },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts[slug as keyof typeof blogPosts] : null;

  // Get dynamic related posts (same category, different slug)
  const getRelatedPosts = () => {
    if (!post) return [];
    return blogCatalog
      .filter(p => p.slug !== slug && (p.category === post.category || p.featured))
      .slice(0, 3);
  };

  const relatedPosts = getRelatedPosts();

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
  const serviceLink = categoryServiceMap[post.category] || categoryServiceMap['FAQ'];

  // Schema.org requires ISO 8601 for datePublished/dateModified. post-data.ts
  // stores the human-readable byline form ("February 28, 2026"), which Google
  // rejects — Search Console logged 10-12 unparsable items per day because of it.
  //
  // data.ts already holds a hand-written ISO date per slug, so prefer that. The
  // fallback formats from the date's LOCAL parts rather than toISOString(), which
  // shifts to UTC and can report the previous day when the build machine is on a
  // positive UTC offset.
  const isoDate = (() => {
    const catalogEntry = blogCatalog.find((p) => p.slug === slug);
    if (catalogEntry?.date && /^\d{4}-\d{2}-\d{2}$/.test(catalogEntry.date)) {
      return catalogEntry.date;
    }
    const parsed = new Date(post.date);
    if (Number.isNaN(parsed.getTime())) return undefined;
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())}`;
  })();

  // Estimate read time from content length
  const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // Meta description. The previous version sliced the first 160 characters of the
  // RAW HTML and stripped tags afterwards, so the opening `<p class="mb-4">` ate
  // part of the budget and every description ended mid-word. Strip first, collapse
  // whitespace, then cut on a word boundary.
  const metaDescription = (() => {
    const explicit = (post as { description?: string }).description;
    if (explicit) return explicit;
    const text = post.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (text.length <= 155) return text;
    const cut = text.slice(0, 155);
    return cut.slice(0, cut.lastIndexOf(' ')) + '…';
  })();

  // Short, SERP-safe title when the post defines one; otherwise the headline.
  const metaTitle = (post as { seoTitle?: string }).seoTitle || post.title;

  return (
    
      <div className="min-h-screen flex flex-col">
        <ReadingProgressBar />
        <SEOProvider
          title={metaTitle}
          description={metaDescription}
          path={`/blog/${slug}`}
        >
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
            ...(isoDate ? { "datePublished": isoDate, "dateModified": isoDate } : {}),
            "description": metaDescription,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": pageUrl
            },
            "wordCount": wordCount,
            "timeRequired": `PT${readTime}M`
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
            width={1200}
            height={600}
          />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <span className="bg-brand-600 text-white text-sm font-medium px-3 py-1 rounded">
                  {post.category}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mt-4 mb-2 font-heading">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-white/80">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <address className="not-italic inline">{post.author}</address>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <time dateTime={isoDate}>
                      {post.date}
                    </time>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{readTime} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="container mx-auto px-4">
          <Breadcrumbs label={post.title} />
        </div>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Article Content */}
              <article className="lg:col-span-2" itemScope itemType="https://schema.org/Article">
                <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
                  <Link to="/blog" className="flex items-center gap-2 text-brand-600 font-medium hover:underline mb-6">
                    <ArrowLeft size={16} />
                    Back to Blog
                  </Link>

                  <div
                    className="prose max-w-none lg:prose-lg prose-headings:font-heading prose-headings:text-gray-900 prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
                  />

                  {/* Service-Specific CTA Card */}
                  <div className="mt-10 p-6 bg-gradient-to-r from-brand-50 to-sky-50 rounded-2xl border border-brand-100">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          Ready to Take Action?
                        </h3>
                        <p className="text-gray-600">
                          {serviceLink.desc}
                        </p>
                      </div>
                      <div className="flex gap-3 flex-shrink-0">
                        <Button asChild className="btn-premium text-white font-bold">
                          <Link to={serviceLink.link} className="flex items-center gap-2">
                            {serviceLink.title}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button asChild variant="outline" className="border-brand-200">
                          <a href="tel:2137924145" className="flex items-center gap-2">
                            <Phone className="w-4 h-4 fill-current" />
                            Call Now
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Share & Author */}
                  <div className="border-t border-gray-200 mt-8 pt-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <span className="text-gray-600 font-medium">Share this article:</span>
                        <div className="flex gap-2 mt-2">
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on Facebook"
                          >
                            <Button variant="outline" size="icon" className="rounded-full w-10 h-10 p-0 text-blue-600 hover:bg-blue-50 border-blue-100">
                              <Facebook size={18} />
                            </Button>
                          </a>
                          <a
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(post.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on Twitter"
                          >
                            <Button variant="outline" size="icon" className="rounded-full w-10 h-10 p-0 text-sky-500 hover:bg-sky-50 border-sky-100">
                              <Twitter size={18} />
                            </Button>
                          </a>
                          <a
                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(post.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on LinkedIn"
                          >
                            <Button variant="outline" size="icon" className="rounded-full w-10 h-10 p-0 text-blue-700 hover:bg-blue-50 border-blue-100">
                              <Linkedin size={18} />
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <AuthorBox authorName={post.author} />
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Table of Contents */}
                  <TableOfContents contentHtml={post.content} />

                  {/* Quote Form */}
                  <QuoteForm />

                  {/* Dynamic Related Articles */}
                  {relatedPosts.length > 0 && (
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                      <h3 className="font-heading font-semibold text-lg mb-4">Related Articles</h3>
                      <div className="space-y-4">
                        {relatedPosts.map((related) => (
                          <div key={related.id} className="flex gap-3 group">
                            <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                              <ResponsiveImage
                                src={related.image}
                                alt={related.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                width={64}
                                height={64}
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm group-hover:text-brand-600 transition-colors line-clamp-2">
                                <Link to={`/blog/${related.slug}`}>
                                  {related.title}
                                </Link>
                              </h4>
                              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                <Calendar size={12} />
                                <time dateTime={related.date}>{new Date(related.date).toLocaleDateString()}</time>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4">
                        <Button asChild variant="outline" className="w-full">
                          <Link to="/blog">View All Articles</Link>
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Stronger CTA Card */}
                  <div className="bg-gradient-to-br from-brand-700 to-brand-800 rounded-xl p-6 text-white">
                    <h3 className="font-heading font-bold text-xl mb-2">
                      Get a Free Quote — Save Up to 20%
                    </h3>
                    <p className="text-brand-100 mb-4 text-sm">
                      Schedule your professional air duct cleaning today and enjoy cleaner air within 24 hours. Limited-time pricing for online bookings.
                    </p>
                    <div className="space-y-3">
                      <Button asChild size="lg" className="w-full bg-white text-brand-700 hover:bg-gray-100 font-bold">
                        <Link to="/quote">Get Your Free Quote →</Link>
                      </Button>
                      <Button asChild size="lg" variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 font-bold">
                        <a href="tel:2137924145" className="flex items-center justify-center gap-2">
                          <Phone className="w-4 h-4 fill-current" />
                          (213) 792-4145
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Category-keyed links to the commercial pages this post relates to,
            rather than a single generic CTA. */}
        <RelatedLinks
          heading="Where to go next"
          links={RELATED_BY_BLOG_CATEGORY[post.category] || RELATED_BY_BLOG_CATEGORY.default}
        />

        <Footer />
      </div>
    
  );
};

export default BlogPost;
