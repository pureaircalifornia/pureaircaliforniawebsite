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
}

const SEOProvider: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  path,
  children
}) => {
  const location = useLocation();
  const { schema, keywords: configKeywords, siteUrl, defaultTitle, defaultDescription } = seoConfig;

  // Generate dynamic title and description
  const dynamicTitle = title ? `${title} | ${seoConfig.siteName}` : defaultTitle;
  const dynamicDescription = description || defaultDescription;

  // Generate dynamic keywords
  const dynamicKeywords = keywords
    ? [...keywords, ...configKeywords.primary, ...configKeywords.secondary]
    : [...configKeywords.primary, ...configKeywords.secondary];

  // Generate canonical URL
  const canonicalUrl = `${siteUrl}${path || location.pathname}`;

  // Generate schema markup
  const generateSchema = (type: string) => {
    const schemaData = schema[type];
    if (!schemaData) return null;

    // Add URL and context
    const schemaWithUrl = {
      '@context': 'https://schema.org',
      '@type': schemaData['@type'],
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
        <meta name="robots" content="index, follow" />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={dynamicTitle} />
        <meta property="og:description" content={dynamicDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={image || seoConfig.defaultImage} />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dynamicTitle} />
        <meta name="twitter:description" content={dynamicDescription} />
        <meta name="twitter:image" content={image || seoConfig.defaultImage} />

        {/* Organization Schema */}
        {generateSchema('Organization') && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: generateSchema('Organization') || ''
          }} />
        )}
      </Helmet>
      {children}
    </>
  );
};

export default SEOProvider;
