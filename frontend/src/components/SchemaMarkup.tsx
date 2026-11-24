import React from 'react';
import { seoConfig } from '@/utils/seo/seoConfig';
import { serviceSchema } from '@/utils/seo/serviceSchema';
import { LA_WIKIDATA_AREAS } from '@/utils/seo/localSEO';
import { canonicalUrl } from '@/utils/seo/canonicalUrl';
import { serializeJsonLd } from '@/utils/seo/jsonLd.mjs';
import { buildFaqSchema } from '@/data/faqs';

interface SchemaMarkupProps {
  serviceType?: 'airDuctCleaning' | 'dryerVentCleaning' | 'moldRemoval';
  schema?: Record<string, unknown>;
  /**
   * Emit the site-wide HVACBusiness node (`@id: .../#business`).
   *
   * Defaults to FALSE so pages that use `<SEOProvider isLocalBusiness />` or render
   * `<SchemaMarkup>` multiple times never emit duplicate `#business` nodes.
   */
  showLocalBusiness?: boolean;
  showFAQ?: boolean;
  /** Kept for caller compatibility; self-serving AggregateRating is never emitted on LocalBusiness. */
  showReviews?: boolean;
  showServiceArea?: boolean;
}

/**
 * Ensure custom BreadcrumbList nodes passed via `<SchemaMarkup schema={...} />`
 * carry a matching `@id: <lastItem>#breadcrumb` so `WebPage.breadcrumb` resolves cleanly.
 */
function enrichCustomSchema(schema: Record<string, unknown>): Record<string, unknown> {
  if (schema['@type'] === 'BreadcrumbList' && !schema['@id'] && Array.isArray(schema.itemListElement)) {
    const items = schema.itemListElement as Array<{ item?: string }>;
    const last = items[items.length - 1]?.item;
    if (typeof last === 'string' && last) {
      return { ...schema, '@id': `${canonicalUrl(last)}#breadcrumb` };
    }
  }
  return schema;
}

const SchemaMarkup: React.FC<SchemaMarkupProps> = ({
  serviceType,
  schema,
  showLocalBusiness = false,
  showFAQ = false,
  showServiceArea = false,
}) => {
  const { localBusiness } = seoConfig.schema;

  return (
    <>
      {showLocalBusiness && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(localBusiness) }}
        />
      )}

      {serviceType && serviceSchema[serviceType] && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema[serviceType]) }}
        />
      )}

      {/* Self-serving LocalBusiness AggregateRating is intentionally never emitted. */}

      {showFAQ && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema()) }}
        />
      )}

      {showServiceArea && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              '@context': 'https://schema.org',
              '@type': 'Service',
              '@id': `${seoConfig.siteUrl}/locations/#service-area`,
              name: 'Air Duct & Dryer Vent Cleaning Across Greater Los Angeles',
              serviceType: 'Air Duct Cleaning, Dryer Vent Cleaning, HVAC System Cleaning',
              provider: { '@id': localBusiness['@id'] },
              areaServed: LA_WIKIDATA_AREAS,
            }),
          }}
        />
      )}

      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(enrichCustomSchema(schema)) }}
        />
      )}
    </>
  );
};

export default SchemaMarkup;
