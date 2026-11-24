import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { seoConfig } from '@/utils/seo/seoConfig';
import { canonicalUrl as buildCanonicalUrl } from '@/utils/seo/canonicalUrl';
import { getPageHero } from '@/data/pageHeroes';
import { isSearchIndexable } from '@/utils/seo/searchPolicy.mjs';
import { serializeJsonLd as json } from '@/utils/seo/jsonLd.mjs';

export interface SEOBreadcrumbItem {
  name: string;
  item: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  /** Kept for caller compatibility; keyword lists are not emitted as ranking signals. */
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  path?: string;
  children?: React.ReactNode;
  disableDefaultSchema?: boolean;
  isLocalBusiness?: boolean;
  noIndex?: boolean;
  datePublished?: string;
  dateModified?: string;
  ogType?: 'website' | 'article';
  mainEntityId?: string;
  /** Explicit breadcrumb trail to emit as BreadcrumbList JSON-LD with `@id: <canonical>#breadcrumb`. */
  breadcrumbs?: SEOBreadcrumbItem[];
  /** Suppress automatic top-level BreadcrumbList generation if the page emits its own BreadcrumbSchema. */
  disableAutoBreadcrumb?: boolean;
  /** Optional per-route LCP hero preload hint in `<head>`. */
  preloadHero?: boolean;
}

const siteId = `${seoConfig.siteUrl}/#website`;
const organizationId = `${seoConfig.siteUrl}/#organization`;
const businessId = `${seoConfig.siteUrl}/#business`;

// Intentionally no SearchAction: the site has no search endpoint (`/search/` returns 410).
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': siteId,
  name: seoConfig.siteName,
  alternateName: 'PAC',
  url: `${seoConfig.siteUrl}/`,
  description: 'Inspection-led residential and commercial air duct, dryer vent, HVAC component, and electrostatic filter cleaning across Greater Los Angeles.',
  publisher: { '@id': organizationId },
  inLanguage: 'en-US',
};

const pageTypes: Record<string, string> = {
  '/about': 'AboutPage',
  '/contact': 'ContactPage',
  '/services': 'CollectionPage',
  '/home-services': 'CollectionPage',
  '/locations': 'CollectionPage',
  '/industries': 'CollectionPage',
  '/blog': 'CollectionPage',
  '/case-studies': 'CollectionPage',
  '/project-stories': 'CollectionPage',
};

/**
 * Top-level indexable routes that do not render a separate `<BreadcrumbSchema>` or `<Breadcrumbs>`
 * component. Auto-emitting their 2-level BreadcrumbList here guarantees 100% BreadcrumbList
 * coverage across all 118 inner sitemap pages with zero duplicates on pages that emit their own.
 */
const AUTO_TOP_LEVEL_BREADCRUMBS: Record<string, string> = {
  '/about': 'About Pure Air California',
  '/contact': 'Contact',
  '/quote': 'Free Estimate',
  '/services': 'Services',
  '/locations': 'Service Areas',
  '/air-quality-calculator': 'Indoor Air Care Checklist',
  '/partners': 'Referral Partnerships',
  '/privacy-policy': 'Privacy Policy',
  '/terms-of-service': 'Terms of Service',
};

function inferImageMimeType(url: string): string | undefined {
  const clean = url.split(/[?#]/)[0].toLowerCase();
  if (clean.endsWith('.webp')) return 'image/webp';
  if (clean.endsWith('.avif')) return 'image/avif';
  if (clean.endsWith('.jpg') || clean.endsWith('.jpeg')) return 'image/jpeg';
  if (clean.endsWith('.png')) return 'image/png';
  return undefined;
}

const SEOProvider: React.FC<SEOProps> = ({
  title,
  description,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  path,
  children,
  disableDefaultSchema = false,
  isLocalBusiness = false,
  noIndex = false,
  datePublished,
  dateModified,
  ogType = 'website',
  mainEntityId,
  breadcrumbs,
  disableAutoBreadcrumb = false,
  preloadHero = false,
}) => {
  const location = useLocation();
  const route = (path || location.pathname).replace(/\/$/, '') || '/';
  const excludeFromSearch = noIndex || !isSearchIndexable(route);
  const canonical = buildCanonicalUrl(route);
  const story = getPageHero(route);
  const titleWithBrand =
    title &&
    !title.includes(seoConfig.siteName) &&
    (title + ' | ' + seoConfig.siteName).length <= 60
      ? title + ' | ' + seoConfig.siteName
      : title;
  const pageTitle = titleWithBrand || seoConfig.defaultTitle;
  const pageDescription = description || seoConfig.defaultDescription;
  const socialImage = new URL(image || story.image, seoConfig.siteUrl).href;
  const socialAlt = imageAlt || (image ? pageTitle : story.alt);
  const socialImageType = inferImageMimeType(socialImage);
  const resolvedWidth = imageWidth ?? (socialImage === seoConfig.defaultImage ? seoConfig.defaultImageWidth : undefined);
  const resolvedHeight = imageHeight ?? (socialImage === seoConfig.defaultImage ? seoConfig.defaultImageHeight : undefined);

  const autoLabel = !disableAutoBreadcrumb ? AUTO_TOP_LEVEL_BREADCRUMBS[route] : undefined;
  const effectiveBreadcrumbs: SEOBreadcrumbItem[] | undefined =
    breadcrumbs?.length
      ? breadcrumbs
      : autoLabel
        ? [
            { name: 'Home', item: '/' },
            { name: autoLabel, item: route },
          ]
        : undefined;

  const breadcrumbSchema = effectiveBreadcrumbs
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: effectiveBreadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: buildCanonicalUrl(crumb.item),
        })),
      }
    : undefined;

  // The page is a WebPage (or CollectionPage/AboutPage/ContactPage) even when its
  // main content is an Article or Service. Templates own their Article/Service node.
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': pageTypes[route] || 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: pageTitle,
    description: pageDescription,
    isPartOf: { '@id': siteId },
    publisher: { '@id': organizationId },
    about: { '@id': businessId },
    inLanguage: 'en-US',
    primaryImageOfPage: {
      '@type': 'ImageObject',
      '@id': `${canonical}#primaryimage`,
      url: socialImage,
      contentUrl: socialImage,
      caption: socialAlt,
      ...(resolvedWidth ? { width: resolvedWidth } : {}),
      ...(resolvedHeight ? { height: resolvedHeight } : {}),
    },
    ...(route !== '/' ? { breadcrumb: { '@id': `${canonical}#breadcrumb` } } : {}),
    ...(mainEntityId ? { mainEntity: { '@id': mainEntityId } } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
  };

  const heroPreloadHref = preloadHero && !image ? story.image : undefined;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="robots"
          content={
            excludeFromSearch
              ? 'noindex, follow'
              : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
          }
        />
        <link rel="canonical" href={canonical} />
        {heroPreloadHref && (
          <link
            rel="preload"
            as="image"
            href={heroPreloadHref}
            {...(story.srcSet ? { imageSrcSet: story.srcSet, imageSizes: '100vw' } : {})}
          />
        )}
        <meta property="og:site_name" content={seoConfig.siteName} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={socialImage} />
        <meta property="og:image:alt" content={socialAlt} />
        {socialImageType && <meta property="og:image:type" content={socialImageType} />}
        {resolvedWidth && <meta property="og:image:width" content={String(resolvedWidth)} />}
        {resolvedHeight && <meta property="og:image:height" content={String(resolvedHeight)} />}
        <meta property="og:locale" content="en_US" />
        {ogType === 'article' && datePublished && (
          <meta property="article:published_time" content={datePublished} />
        )}
        {ogType === 'article' && dateModified && (
          <meta property="article:modified_time" content={dateModified} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={socialImage} />
        <meta name="twitter:image:alt" content={socialAlt} />
      </Helmet>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: json(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: json(pageSchema) }}
      />
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          {...(!breadcrumbs?.length && autoLabel ? { 'data-pac-auto-breadcrumb': 'true' } : {})}
          dangerouslySetInnerHTML={{ __html: json(breadcrumbSchema) }}
        />
      )}
      {!disableDefaultSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: json({ '@context': 'https://schema.org', ...seoConfig.schema.organization }),
          }}
        />
      )}
      {isLocalBusiness && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: json(seoConfig.schema.localBusiness) }}
        />
      )}
      {children}
    </>
  );
};

export default SEOProvider;
