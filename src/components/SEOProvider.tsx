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
        <title>{dynamicTitle}</title>
        <meta name="description" content={dynamicDescription} />
        {dynamicKeywords.map((keyword, index) => (
          <meta key={index} name="keywords" content={keyword} />
        ))}
        <meta property="og:title" content={dynamicTitle} />
        <meta property="og:description" content={dynamicDescription} />
        <meta property="og:image" content={image || seoConfig.defaultImage} />
        <link rel="canonical" href={canonicalUrl} />
        {generateSchema('Organization') && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: generateSchema('Organization')
          }} />
        )}
      </Helmet>
      {children}
    </>
  );

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
        <meta property="og:image" content={image || `${siteUrl}/logo.png`} />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dynamicTitle} />
        <meta name="twitter:description" content={dynamicDescription} />
        <meta name="twitter:image" content={image || `${siteUrl}/logo.png`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {generateSchema('organization')}
        </script>
        <script type="application/ld+json">
          {generateSchema('service')}
        </script>
        <script type="application/ld+json">
          {generateSchema('localBusiness')}
        </script>
      </Helmet>

      {/* Google Analytics */}
      <script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
      />
      <script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
              page_path: window.location.pathname,
            });
          `
        }}
      />

      {/* Bing Webmaster Tools */}
      <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />

      {/* Yandex Webmaster Tools */}
      <meta name="yandex-verification" content="YOUR_YANDEX_VERIFICATION_CODE" />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: seoConfig.siteName,
            url: seoConfig.siteUrl,
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${seoConfig.siteUrl}/search?q={search_term_string}`,
              },
              'query-input': 'required name=search_term_string'
            },
          }),
        }}
      />
    </>
  );
};

export default SEOProvider;
