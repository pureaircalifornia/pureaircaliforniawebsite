import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { seoConfig } from '@/utils/seo/seoConfig';
import { canonicalUrl as buildCanonicalUrl } from '@/utils/seo/canonicalUrl';
import { getPageHero } from '@/data/pageHeroes';

interface SEOProps {
  title?: string;
  description?: string;
  /** Kept for caller compatibility; keyword lists are not emitted as ranking signals. */
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  path?: string;
  children?: React.ReactNode;
  disableDefaultSchema?: boolean;
  isLocalBusiness?: boolean;
  noIndex?: boolean;
  datePublished?: string;
  dateModified?: string;
  ogType?: 'website' | 'article';
  mainEntityId?: string;
}

const siteId = seoConfig.siteUrl + '/#website';
const organizationId = seoConfig.siteUrl + '/#organization';
const websiteSchema = {
  '@context': 'https://schema.org', '@type': 'WebSite', '@id': siteId,
  name: seoConfig.siteName, url: seoConfig.siteUrl + '/',
  description: 'Air duct and dryer vent cleaning for homes and businesses in Greater Los Angeles.',
  publisher: { '@id': organizationId }, inLanguage: 'en-US',
};
const pageTypes: Record<string, string> = {
  '/about': 'AboutPage', '/contact': 'ContactPage',
  '/services': 'CollectionPage', '/locations': 'CollectionPage',
  '/industries': 'CollectionPage', '/blog': 'CollectionPage', '/case-studies': 'CollectionPage',
};
const json = (value: unknown) => JSON.stringify(value).replace(/</g, '\u003c');

const SEOProvider: React.FC<SEOProps> = ({
  title, description, image, imageAlt, path, children,
  disableDefaultSchema = false, isLocalBusiness = false, noIndex = false,
  datePublished, dateModified, ogType = 'website', mainEntityId,
}) => {
  const location = useLocation();
  const route = (path || location.pathname).replace(/\/$/, '') || '/';
  const canonical = buildCanonicalUrl(route);
  const story = getPageHero(route);
  const titleWithBrand = title && !title.includes(seoConfig.siteName) &&
    (title + ' | ' + seoConfig.siteName).length <= 60
      ? title + ' | ' + seoConfig.siteName : title;
  const pageTitle = titleWithBrand || seoConfig.defaultTitle;
  const pageDescription = description || seoConfig.defaultDescription;
  const socialImage = new URL(image || story.image, seoConfig.siteUrl).href;
  const socialAlt = imageAlt || (image ? pageTitle : story.alt);
  // The page is a WebPage even when its main content is an Article.
  // The article template owns the single Article node and its author/dates.
  const pageSchema = {
    '@context': 'https://schema.org', '@type': pageTypes[route] || 'WebPage',
    '@id': canonical + '#webpage', url: canonical, name: pageTitle,
    description: pageDescription, isPartOf: { '@id': siteId },
    publisher: { '@id': organizationId }, inLanguage: 'en-US',
    primaryImageOfPage: {
      '@type': 'ImageObject', '@id': canonical + '#primaryimage',
      url: socialImage, contentUrl: socialImage, caption: socialAlt,
    },
    ...(mainEntityId ? { mainEntity: { '@id': mainEntityId } } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
  };
  return <>
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription}/>
      <meta name="robots" content={noIndex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}/>
      <link rel="canonical" href={canonical}/>
      <meta property="og:site_name" content={seoConfig.siteName}/>
      <meta property="og:title" content={pageTitle}/>
      <meta property="og:description" content={pageDescription}/>
      <meta property="og:type" content={ogType}/>
      <meta property="og:url" content={canonical}/>
      <meta property="og:image" content={socialImage}/>
      <meta property="og:image:alt" content={socialAlt}/>
      <meta property="og:locale" content="en_US"/>
      {ogType === 'article' && datePublished && <meta property="article:published_time" content={datePublished}/>}
      {ogType === 'article' && dateModified && <meta property="article:modified_time" content={dateModified}/>}
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content={pageTitle}/>
      <meta name="twitter:description" content={pageDescription}/>
      <meta name="twitter:image" content={socialImage}/>
      <meta name="twitter:image:alt" content={socialAlt}/>
    </Helmet>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:json(websiteSchema)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:json(pageSchema)}}/>
    {!disableDefaultSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{__html:json({'@context':'https://schema.org',...seoConfig.schema.organization})}}/>}
    {isLocalBusiness && <script type="application/ld+json" dangerouslySetInnerHTML={{__html:json(seoConfig.schema.localBusiness)}}/>}
    {children}
  </>;
};
export default SEOProvider;
