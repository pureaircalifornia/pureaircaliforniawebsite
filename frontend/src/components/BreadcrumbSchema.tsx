import React from 'react';
import { canonicalUrl } from '@/utils/seo/canonicalUrl';
import { serializeJsonLd } from '@/utils/seo/jsonLd.mjs';

interface BreadcrumbItem {
  name: string;
  item: string; // Path or URL
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ items }) => {
  if (!items.length) return null;
  const lastUrl = canonicalUrl(items[items.length - 1].item);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${lastUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.item),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
};

export default BreadcrumbSchema;
