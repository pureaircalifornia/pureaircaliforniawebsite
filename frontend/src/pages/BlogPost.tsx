import { useParams } from 'react-router-dom';
import { Calendar, ArrowLeft, ArrowRight, ArrowUpRight, Facebook, Twitter, Linkedin, Phone, ExternalLink } from 'lucide-react';
import DOMPurify from 'dompurify';
import { getPageHero } from '@/data/pageHeroes';
import { canonicalUrl } from '@/utils/seo/canonicalUrl';
import PageHero from '@/components/PageHero';
import { Link } from '@/components/CanonicalLink';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import QuoteForm from '@/components/QuoteForm';
import { blogPosts } from './blog/post-data';
import { blogPosts as blogCatalog } from './blog/data';
import ResponsiveImage from '@/components/ResponsiveImage';
import SEOProvider from '@/components/SEOProvider';
import RelatedLinks from '@/components/RelatedLinks';
import { RELATED_BY_BLOG_CATEGORY } from '@/utils/internalLinks';
import SchemaMarkup from '@/components/SchemaMarkup';
import { seoConfig } from '@/utils/seo/seoConfig';
import { business } from '@/config/business';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import TableOfContents from '@/components/TableOfContents';
import Breadcrumbs from '@/components/Breadcrumbs';
import AuthorBox from '@/components/AuthorBox';

// Map all 13 blog categories to relevant service pages & tailored quote deep links
const categoryServiceMap: Record<
  string,
  { title: string; link: string; quoteHref: string; desc: string; priceCue: string }
> = {
  Residential: {
    title: 'Residential Air Duct Cleaning',
    link: '/services/residential-air-duct-cleaning/',
    quoteHref: '/quote/?service=air-duct&property=home#estimate-builder',
    desc: 'Inspection-led negative-pressure source removal for Los Angeles homes, condos, and estates.',
    priceCue: 'Starting at $299 for eligible residential scopes',
  },
  Commercial: {
    title: 'Commercial Air Duct Cleaning',
    link: '/services/commercial-air-duct-cleaning/',
    quoteHref: '/quote/?service=air-duct&property=commercial#estimate-builder',
    desc: 'Coordinate equipment lists, COI documentation, and after-hours scheduling for your LA building.',
    priceCue: 'Itemized building-specific written quote',
  },
  Health: {
    title: 'Air Duct Cleaning & Indoor Air Quality',
    link: '/health-benefits/',
    quoteHref: '/quote/?service=air-duct&property=home#estimate-builder',
    desc: 'Understand what source-removal cleaning, filtration, and moisture control can—and cannot—do.',
    priceCue: 'Inspection-led home duct cleaning from $299',
  },
  'Health Benefits': {
    title: 'Air Duct Cleaning & Indoor Air Quality',
    link: '/health-benefits/',
    quoteHref: '/quote/?service=air-duct&property=home#estimate-builder',
    desc: 'Understand what source-removal cleaning, filtration, and moisture control can—and cannot—do.',
    priceCue: 'Inspection-led home duct cleaning from $299',
  },
  Safety: {
    title: 'Residential Dryer Vent Cleaning',
    link: '/services/residential-dryer-vent-cleaning/',
    quoteHref: '/quote/?service=dryer-vent&property=home#estimate-builder',
    desc: 'Clear compacted lint from behind your dryer to the exterior wall or roof termination hood.',
    priceCue: 'Starting at $149 for eligible residential dryer vents',
  },
  FAQ: {
    title: 'Los Angeles Pricing & Estimate Guide',
    link: '/pricing/',
    quoteHref: '/quote/?service=air-duct&property=home#estimate-builder',
    desc: 'Compare starting prices, system-count factors, and our written scope guarantee.',
    priceCue: 'Air ducts from $299 · Dryer vents from $149',
  },
  Pricing: {
    title: 'Los Angeles Pricing & Estimate Guide',
    link: '/pricing/',
    quoteHref: '/quote/?service=air-duct&property=home#estimate-builder',
    desc: 'See how system count, vent access, and included components shape your written LA quote.',
    priceCue: 'Air ducts from $299 · Dryer vents from $149',
  },
  'Air Quality': {
    title: 'Wildfire Smoke & Hillside Duct Cleaning',
    link: '/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles/',
    quoteHref: '/quote/?service=air-duct&property=home&addons=wildfire-smoke#estimate-builder',
    desc: 'Inspection-first post-smoke, ash, and renovation-dust HVAC evaluation across LA hillside homes.',
    priceCue: 'Written inspection-first scope confirmed before work',
  },
  Maintenance: {
    title: 'Complete HVAC System Cleaning',
    link: '/services/hvac-system-cleaning/',
    quoteHref: '/quote/?service=other&property=home#estimate-builder',
    desc: 'Inspect and clean accessible evaporator coils, blowers, plenums, and connected ductwork.',
    priceCue: 'Component-by-component written scope',
  },
  Industrial: {
    title: 'Industrial & Warehouse Duct Cleaning',
    link: '/industries/manufacturing/',
    quoteHref: '/quote/?service=air-duct&property=commercial#estimate-builder',
    desc: 'Coordinate high-bay access, shift schedules, and safety boundaries with your facility team.',
    priceCue: 'Site-specific commercial written proposal',
  },
  Healthcare: {
    title: 'Healthcare & Clinic Air Duct Cleaning',
    link: '/industries/healthcare/',
    quoteHref: '/quote/?service=air-duct&property=commercial#estimate-builder',
    desc: 'Containment-aware ventilation cleaning coordinated with facility and infection-prevention teams.',
    priceCue: 'COI-ready · Off-hours clinic scheduling',
  },
  Restaurant: {
    title: 'Restaurant HVAC & Duct Cleaning',
    link: '/industries/restaurants/',
    quoteHref: '/quote/?service=air-duct&property=commercial#estimate-builder',
    desc: 'Dining-room comfort HVAC, plenum, blower, and coil care scheduled outside dining hours.',
    priceCue: 'Early-morning & post-close LA scheduling',
  },
  Laundromat: {
    title: 'Laundromat Dryer Vent Cleaning',
    link: '/services/laundromat-dryer-vent-cleaning/',
    quoteHref: '/quote/?service=dryer-vent&property=commercial#estimate-builder',
    desc: 'High-volume dryer bank, shared manifold trunk, booster fan, and roof termination cleaning.',
    priceCue: 'Phased bank-by-bank commercial scheduling',
  },
  Hospitality: {
    title: 'Hotel & Hospitality Ventilation Care',
    link: '/industries/hospitality/',
    quoteHref: '/quote/?service=air-duct&property=commercial#estimate-builder',
    desc: 'Phased guestroom fan-coil, corridor HVAC, and commercial laundry exhaust maintenance.',
    priceCue: 'Phased around guest occupancy & turnover',
  },
};

function splitHtmlForMidArticleCta(sanitizedHtml: string): [string, string | null] {
  const matches = [...sanitizedHtml.matchAll(/<h2\b[^>]*>/gi)];
  if (matches.length < 3) {
    return [sanitizedHtml, null];
  }
  const splitIndex = matches[2].index ?? -1;
  if (splitIndex <= 0) {
    return [sanitizedHtml, null];
  }
  return [sanitizedHtml.slice(0, splitIndex), sanitizedHtml.slice(splitIndex)];
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts[slug as keyof typeof blogPosts] : null;

  const getRelatedPosts = () => {
    if (!post) return [];
    return blogCatalog
      .filter((p) => p.slug !== slug && (p.category === post.category || p.featured))
      .slice(0, 3);
  };

  const relatedPosts = getRelatedPosts();

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <SEOProvider
          title="Article not found | Pure Air California"
          description="This article could not be found. Browse the Pure Air California journal for air duct and dryer vent cleaning guides."
          noIndex
        />
        <NavBar alwaysOpaque />
        <main className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="mb-8">The article you&apos;re looking for doesn&apos;t exist or has been moved.</p>
            <Button asChild>
              <Link to="/blog/">Return to Blog</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const pageUrl = canonicalUrl(`/blog/${slug}`);
  const serviceLink = categoryServiceMap[post.category] || categoryServiceMap.FAQ;

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

  const formattedModifiedDate = post.dateModified
    ? new Date(`${post.dateModified}T12:00:00`).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'September 12, 2026';

  const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const metaDescription = (() => {
    const catalogEntry = blogCatalog.find((p) => p.slug === slug);
    const explicit = catalogEntry?.description || (post as { description?: string }).description;
    if (explicit) return explicit;
    const text = post.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (text.length <= 155) return text;
    const cut = text.slice(0, 155);
    return cut.slice(0, cut.lastIndexOf(' ')) + '…';
  })();

  const metaTitle = (post as { seoTitle?: string }).seoTitle || post.title;
  const sanitizedContent = DOMPurify.sanitize(post.content);
  const [firstHalfHtml, secondHalfHtml] = splitHtmlForMidArticleCta(sanitizedContent);

  return (
    <div className="min-h-screen flex flex-col">
      <ReadingProgressBar />
      <SEOProvider
        title={metaTitle}
        description={metaDescription}
        path={`/blog/${slug}/`}
        image={post.image}
        imageAlt={post.imageAlt}
        ogType="article"
        datePublished={isoDate}
        dateModified={post.dateModified}
        mainEntityId={`${pageUrl}#article`}
      >
        <SchemaMarkup
          schema={{
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            '@id': `${pageUrl}#article`,
            headline: post.title,
            image: `${seoConfig.siteUrl}${post.image}`,
            articleSection: post.category,
            inLanguage: 'en-US',
            author: {
              '@type': 'Organization',
              '@id': `${seoConfig.siteUrl}/#organization`,
              name: post.author,
              url: canonicalUrl('/about'),
            },
            publisher: seoConfig.schema.organization,
            ...(isoDate ? { datePublished: isoDate } : {}),
            dateModified: post.dateModified,
            citation: post.sources.map((source) => source.url),
            description: metaDescription,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${pageUrl}#webpage`,
            },
            wordCount,
            timeRequired: `PT${readTime}M`,
          }}
        />
      </SEOProvider>

      <NavBar alwaysOpaque />

      <main className="flex-grow">
        {/* Featured Hero */}
        <PageHero
          title={post.title}
          image={post.image}
          alt={post.imageAlt}
          compact
          meta={
            <span>
              By <Link to="/about/">{post.author}</Link> · Reviewed{' '}
              <time dateTime={post.dateModified}>{formattedModifiedDate}</time>
              <br />
              <span className="pac-publication-date">
                Originally published <time dateTime={isoDate}>{post.date}</time> · {readTime} min read ·{' '}
                {post.category}
              </span>
            </span>
          }
        />

        {/* Breadcrumb */}
        <div className="container mx-auto px-4">
          <Breadcrumbs label={post.title} />
        </div>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Article Content */}
              <article className="lg:col-span-2">
                <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
                  <Link
                    to="/blog/"
                    className="inline-flex items-center gap-2 text-brand-700 font-semibold hover:underline mb-6"
                  >
                    <ArrowLeft size={16} aria-hidden="true" />
                    Back to All Guides
                  </Link>

                  {/* Mobile / Tablet Inline Table of Contents */}
                  <TableOfContents contentHtml={post.content} variant="inline" />

                  <div className="pac-journal-content prose max-w-none lg:prose-lg prose-headings:font-heading prose-headings:text-gray-900 prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
                    <div dangerouslySetInnerHTML={{ __html: firstHalfHtml }} />

                    {/* Non-intrusive Mid-Article Contextual LA Estimate Callout */}
                    {secondHalfHtml && (
                      <aside
                        className="not-prose my-8 rounded-xl border border-brand-200 bg-brand-50/70 p-5 md:p-6"
                        aria-label="Los Angeles estimate planning callout"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                              LOS ANGELES SCOPE &amp; PRICING CHECK
                            </span>
                            <h3 className="text-lg font-bold text-gray-900 mt-1">
                              Planning {serviceLink.title.toLowerCase()}?
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {serviceLink.priceCue}. Review your exact written scope and price before any work starts.
                            </p>
                          </div>
                          <div className="flex flex-wrap sm:flex-nowrap gap-2.5 flex-shrink-0">
                            <Button asChild size="sm" className="bg-brand-700 hover:bg-brand-800 text-white font-semibold">
                              <Link to={serviceLink.quoteHref}>
                                Build Estimate <ArrowUpRight className="w-3.5 h-3.5 ml-1" aria-hidden="true" />
                              </Link>
                            </Button>
                            <Button asChild size="sm" variant="outline" className="border-brand-300 text-brand-800">
                              <Link to={serviceLink.link}>Explore Service</Link>
                            </Button>
                          </div>
                        </div>
                      </aside>
                    )}

                    {secondHalfHtml && <div dangerouslySetInnerHTML={{ __html: secondHalfHtml }} />}
                  </div>

                  {/* Verified Public Guidance Sources Box */}
                  {post.sources && post.sources.length > 0 && (
                    <aside
                      className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5"
                      aria-label="Referenced public guidance"
                    >
                      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-2.5">
                        Referenced Public Guidance &amp; Standards
                      </h3>
                      <ul className="space-y-1.5 text-sm">
                        {post.sources.map((source) => (
                          <li key={source.url}>
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-brand-700 font-medium hover:underline"
                            >
                              <span>{source.label}</span>
                              <ExternalLink size={13} aria-hidden="true" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </aside>
                  )}

                  {/* End-of-Article Service-Specific CTA Card */}
                  <div className="mt-10 p-6 bg-gradient-to-r from-brand-50 to-sky-50 rounded-2xl border border-brand-100">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                          NEXT STEP FOR YOUR LOS ANGELES PROPERTY
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 mt-1 mb-1">
                          {serviceLink.title}
                        </h3>
                        <p className="text-gray-600 mb-1">{serviceLink.desc}</p>
                        <p className="text-xs font-semibold text-brand-800">{serviceLink.priceCue}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 min-w-0 flex-shrink-0">
                        <Button asChild className="btn-premium text-white font-bold">
                          <Link to={serviceLink.quoteHref} className="flex items-center gap-2">
                            Get a Free Estimate
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </Link>
                        </Button>
                        <Button asChild variant="outline" className="border-brand-200">
                          <a href={business.phoneHref} className="flex items-center gap-2">
                            <Phone className="w-4 h-4 fill-current" aria-hidden="true" />
                            {business.phone}
                          </a>
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-brand-100/80 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-brand-800">
                      <Link to={serviceLink.link} className="hover:underline">
                        View {serviceLink.title.toLowerCase()} details →
                      </Link>
                      <Link to="/pricing/" className="hover:underline">
                        Compare LA starting prices →
                      </Link>
                      <Link to="/locations/los-angeles/" className="hover:underline">
                        Check Los Angeles service areas →
                      </Link>
                    </div>
                  </div>

                  {/* Share & Author */}
                  <div className="border-t border-gray-200 mt-8 pt-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <span className="text-gray-600 font-medium text-sm">Share this guide:</span>
                        <div className="flex gap-2 mt-2">
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on Facebook"
                          >
                            <Button
                              variant="outline"
                              size="icon"
                              className="rounded-full w-10 h-10 p-0 text-blue-600 hover:bg-blue-50 border-blue-100"
                            >
                              <Facebook size={18} aria-hidden="true" />
                            </Button>
                          </a>
                          <a
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(post.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on Twitter"
                          >
                            <Button
                              variant="outline"
                              size="icon"
                              className="rounded-full w-10 h-10 p-0 text-sky-500 hover:bg-sky-50 border-sky-100"
                            >
                              <Twitter size={18} aria-hidden="true" />
                            </Button>
                          </a>
                          <a
                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(post.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on LinkedIn"
                          >
                            <Button
                              variant="outline"
                              size="icon"
                              className="rounded-full w-10 h-10 p-0 text-blue-700 hover:bg-blue-50 border-blue-100"
                            >
                              <Linkedin size={18} aria-hidden="true" />
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <AuthorBox authorName={post.author} dateModified={post.dateModified} />
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Table of Contents (Desktop) */}
                  <div className="hidden lg:block">
                    <TableOfContents contentHtml={post.content} variant="sidebar" />
                  </div>

                  {/* Truthful Transparent LA Estimate Card */}
                  <div className="bg-gradient-to-br from-brand-700 to-brand-800 rounded-xl p-6 text-white shadow-sm">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                      LOS ANGELES WRITTEN ESTIMATES
                    </span>
                    <h3 className="font-heading font-bold text-xl mt-1 mb-2">
                      Confirm Your Scope Before Work Begins
                    </h3>
                    <p className="text-brand-100 mb-4 text-sm leading-relaxed">
                      Eligible residential air duct cleaning starts at $299; dryer vent cleaning starts at $149. Share your system count and neighborhood for a clear written quote.
                    </p>
                    <div className="space-y-3">
                      <Button
                        asChild
                        size="lg"
                        className="w-full bg-white text-brand-700 hover:bg-gray-100 font-bold"
                      >
                        <Link to={serviceLink.quoteHref}>Build Your Free Estimate →</Link>
                      </Button>
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="w-full border-white/30 text-white hover:bg-white/10 font-bold"
                      >
                        <a href={business.phoneHref} className="flex items-center justify-center gap-2">
                          <Phone className="w-4 h-4 fill-current" aria-hidden="true" />
                          {business.phone}
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Quote Form */}
                  <QuoteForm />

                  {/* Dynamic Related Articles */}
                  {relatedPosts.length > 0 && (
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                      <h3 className="font-heading font-semibold text-lg mb-4">Related LA Guides</h3>
                      <div className="space-y-4">
                        {relatedPosts.map((related) => (
                          <div key={related.id} className="flex gap-3 group">
                            <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                              <ResponsiveImage
                                src={related.image}
                                alt={getPageHero(`/blog/${related.slug}/`).alt}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                width={64}
                                height={64}
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm group-hover:text-brand-600 transition-colors line-clamp-2">
                                <Link to={`/blog/${related.slug}/`}>{related.title}</Link>
                              </h4>
                              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                <Calendar size={12} aria-hidden="true" />
                                <time dateTime={related.date}>
                                  {new Date(`${related.date}T12:00:00`).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                </time>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4">
                        <Button asChild variant="outline" className="w-full">
                          <Link to="/blog/">View All {blogCatalog.length} Guides</Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Category-keyed links to the commercial/service pages this post relates to */}
        <RelatedLinks
          heading="Where to go next"
          links={RELATED_BY_BLOG_CATEGORY[post.category] || RELATED_BY_BLOG_CATEGORY.default}
        />
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
