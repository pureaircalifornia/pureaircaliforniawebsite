import React from 'react';
import { seoConfig } from '@/utils/seo/seoConfig';
import { serviceSchema } from '@/utils/seo/serviceSchema';
import { buildFaqSchema } from '@/data/faqs';

interface SchemaMarkupProps {
  serviceType?: 'airDuctCleaning' | 'dryerVentCleaning' | 'moldRemoval';
  schema?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Emit the site-wide LocalBusiness/HVACBusiness node.
   *
   * Defaults to FALSE, and must stay that way. Every business node carries the
   * same `@id` (".../#business") and an `aggregateRating`, so Google merges all
   * copies on a page into one entity. When this defaulted to true, any page using
   * <SchemaMarkup> more than once emitted the node repeatedly — location pages
   * emitted it four times — producing an entity with four aggregate ratings.
   * Search Console reports that as "Review has multiple aggregate ratings", and
   * the item becomes ineligible for rich results.
   *
   * The business entity should appear exactly once per page: either via
   * SEOProvider's `isLocalBusiness`, or by opting in here on ONE instance when the
   * page needs a customised version (as the location pages do).
   */
  showLocalBusiness?: boolean;
  showFAQ?: boolean;
  showReviews?: boolean;
  showServiceArea?: boolean;
}

const SchemaMarkup: React.FC<SchemaMarkupProps> = ({
  serviceType,
  schema,
  showLocalBusiness = false,
  showFAQ = false,
  showReviews = false,
  showServiceArea = false
}) => {
  const { localBusiness } = seoConfig.schema;
  const { local } = seoConfig;

  return (
    <>
      {/* Local Business Schema */}
      {showLocalBusiness && (
        <script type="application/ld+json">
          {JSON.stringify(localBusiness)}
        </script>
      )}

      {/* Service Schema */}
      {serviceType && serviceSchema[serviceType] && (
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema[serviceType])}
        </script>
      )}

      {/* Reviews / rating: intentionally NOT emitted as a standalone AggregateRating.
          A bare AggregateRating with no `itemReviewed` is invalid for rich results
          (Google: "Missing field itemReviewed"). The valid rating is carried nested
          inside the LocalBusiness/HVACBusiness schema (the `schema` prop / showLocalBusiness),
          which is the Google-recommended form. `showReviews` is kept for API compatibility. */}

      {/* FAQ Schema — generated from the same data the visible <FAQSection> renders,
          so the structured data always matches on-page content (Google requirement + GEO). */}
      {showFAQ && (
        <script type="application/ld+json">
          {JSON.stringify(buildFaqSchema())}
        </script>
      )}

      {/* Service Area Schema */}
      {showServiceArea && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Air Duct & Dryer Vent Cleaning',
            provider: {
              '@type': 'Organization',
              name: localBusiness.name
            },
            areaServed: local.serviceAreas.map(area => ({
              '@type': 'City',
              name: area,
              address: {
                '@type': 'PostalAddress',
                addressRegion: 'CA',
                addressCountry: 'US'
              }
            })),
            serviceType: 'Air Duct Cleaning, Dryer Vent Cleaning, Mold Removal'
          })}
        </script>
      )}

      {/* Custom Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </>
  );
};

export default SchemaMarkup;

