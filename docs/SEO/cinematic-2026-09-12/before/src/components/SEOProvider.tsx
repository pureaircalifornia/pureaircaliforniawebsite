import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { seoConfig } from '@/utils/seo/seoConfig';


interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  path?: string;
  children?: React.ReactNode;
  disableDefaultSchema?: boolean;
  isLocalBusiness?: boolean;
  noIndex?: boolean;
  /** For blog/article pages — ISO 8601 date string */
  datePublished?: string;
  dateModified?: string;
  /** page type for og metadata */
  ogType?: 'website' | 'article';
}

// WebSite schema with Sitelinks SearchAction — rendered once globally.
// IMPORTANT: this is plain data, injected as a raw <script> directly inside
// <Helmet>. react-helmet-async only accepts native head elements as Helmet
// children — a custom component child throws "attempting to nest Helmet
// components" and crashes the whole render (and the prerender).
const websiteSchemaData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.pureaircalifornia.com/#website',
  name: 'Pure Air California',
  url: 'https://www.pureaircalifornia.com',
  description: 'NADCA-certified air duct and dryer vent cleaning in Los Angeles.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.pureaircalifornia.com/?s={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  },
  publisher: {
    '@type': 'Organization',
    '@id': 'https://www.pureaircalifornia.com/#organization',
    name: 'Pure Air California',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.pureaircalifornia.com/brand/72fdde68-6f0b-49b3-ae09-0c49f6d931dd.png',
      // Real dimensions of the logo file. These were 200x60, which did not
      // match the asset — an ImageObject that misreports its own size is
      // invalid structured data.
      width: 414,
      height: 151
    }
  }
};

const SEOProvider: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  path,
  children,
  disableDefaultSchema = false,
  isLocalBusiness = false,
  noIndex = false,
  datePublished,
  dateModified,
  ogType = 'website',
}) => {
  const location = useLocation();
  const { schema, keywords: configKeywords, siteUrl, defaultTitle, defaultDescription } = seoConfig;

  // Google truncates result titles at roughly 60 characters. Append the brand only
  // when it actually fits, instead of unconditionally — pages used to end up at
  // 80-110 characters, which cut the brand off anyway AND pushed the keyword out of
  // view. When it does not fit, the keyword-bearing title wins; Google still shows
  // the site name separately in the result.
  const TITLE_MAX = 60;
  const withBrand = (t: string) =>
    t.includes(seoConfig.siteName) || `${t} | ${seoConfig.siteName}`.length > TITLE_MAX
      ? t
      : `${t} | ${seoConfig.siteName}`;

  const dynamicTitle = title ? withBrand(title) : defaultTitle;
  const dynamicDescription = description || defaultDescription;

  // Generate dynamic keywords
  const dynamicKeywords = keywords
    ? [...keywords, ...configKeywords.primary, ...configKeywords.secondary]
    : [...configKeywords.primary, ...configKeywords.secondary];

  // Generate canonical URL. The server (Apache) serves prerendered routes from
  // /route/index.html, so it 301-redirects /route -> /route/. Canonical MUST match
  // the actually-served URL (with trailing slash) or Google logs a redirect hop and
  // a canonical mismatch. Root stays "/".
  const rawPath = path || location.pathname;
  const normalizedPath = rawPath === '/' ? '/' : rawPath.replace(/\/+$/, '') + '/';
  const canonicalUrl = `${siteUrl}${normalizedPath}`;

  // WebPage entity for this specific page
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': ogType === 'article' ? 'Article' : 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: dynamicTitle,
    description: dynamicDescription,
    isPartOf: { '@id': 'https://www.pureaircalifornia.com/#website' },
    inLanguage: 'en-US',
    // Identifies the most "answerable" parts of the page for voice assistants and
    // AI answer engines (GEO) — the headline and intro.
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2'],
    },
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(ogType === 'article' ? {
      publisher: {
        '@type': 'Organization',
        '@id': 'https://www.pureaircalifornia.com/#organization',
        name: 'Pure Air California',
      }
    } : {})
  };

  // Generate schema markup
  const generateSchema = (type: string) => {
    const configKey = type === 'Organization' ? 'organization' : type === 'LocalBusiness' ? 'localBusiness' : type;
    const schemaData = schema[configKey as keyof typeof schema];
    if (!schemaData) return null;
    const schemaWithUrl = {
      '@context': 'https://schema.org',
      ...schemaData,
      url: canonicalUrl
    };
    return JSON.stringify(schemaWithUrl);
  };

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{dynamicTitle}</title>
        <meta name="description" content={dynamicDescription} />
        <meta name="keywords" content={dynamicKeywords.join(', ')} />
        {/* max-image-preview:large is what allows large image thumbnails next to the
            result — it used to live in index.html and moved here when the duplicate
            static meta tags were removed. */}
        <meta
          name="robots"
          content={noIndex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"}
        />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:site_name" content="Pure Air California" />
        <meta property="og:title" content={dynamicTitle} />
        <meta property="og:description" content={dynamicDescription} />
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={image || seoConfig.defaultImage} />
        <meta property="og:locale" content="en_US" />
        {datePublished ? <meta property="article:published_time" content={datePublished} /> : null}
        {dateModified ? <meta property="article:modified_time" content={dateModified} /> : null}

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@pureaircalifornia" />
        <meta name="twitter:title" content={dynamicTitle} />
        <meta name="twitter:description" content={dynamicDescription} />
        <meta name="twitter:image" content={image || seoConfig.defaultImage} />

        {/* Geo / Local SEO meta tags */}
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="Los Angeles" />
        <meta name="geo.position" content="34.0522;-118.2437" />
        <meta name="ICBM" content="34.0522, -118.2437" />
      </Helmet>

      {/* JSON-LD is rendered in the body (NOT inside <Helmet>) on purpose: the
          Puppeteer prerender captures body-rendered <script> tags but drops
          Helmet-injected ones, so head-only schema never reached non-JS crawlers
          / AI answer engines. Google accepts JSON-LD anywhere in the document. */}

      {/* WebSite Schema — sitelinks search box signal */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchemaData) }} />

      {/* WebPage entity (carries speakable for voice/AI extraction) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      {/* Organization Schema */}
      {!disableDefaultSchema && generateSchema('Organization') ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: generateSchema('Organization') || ''
        }} />
      ) : null}

      {/* Local Business Schema */}
      {isLocalBusiness && generateSchema('LocalBusiness') ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: generateSchema('LocalBusiness') || ''
        }} />
      ) : null}

      {children}
    </>
  );
};

export default SEOProvider;
