import React from 'react';
import { seoConfig } from '@/utils/seo/seoConfig';
import { serviceSchema } from '@/utils/seo/serviceSchema';

interface SchemaMarkupProps {
  serviceType?: 'airDuctCleaning' | 'dryerVentCleaning' | 'moldRemoval';
  schema?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  showLocalBusiness?: boolean;
  showFAQ?: boolean;
  showReviews?: boolean;
  showServiceArea?: boolean;
}

const SchemaMarkup: React.FC<SchemaMarkupProps> = ({
  serviceType,
  schema,
  showLocalBusiness = true,
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

      {/* Reviews Schema */}
      {showReviews && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AggregateRating',
            '@id': 'https://pureaircalifornia.com/#aggregateRating',
            ratingValue: localBusiness.aggregateRating.ratingValue,
            reviewCount: localBusiness.aggregateRating.reviewCount,
            bestRating: localBusiness.aggregateRating.bestRating,
            worstRating: localBusiness.aggregateRating.worstRating,
            ratingExplanation: `Based on ${localBusiness.aggregateRating.reviewCount}+ customer reviews on Google`
          })}
        </script>
      )}

      {/* FAQ Schema */}
      {showFAQ && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How often should I clean my air ducts?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We recommend cleaning your air ducts every 3-5 years, depending on your home\'s specific needs. Homes with pets, allergies, or recent renovations may benefit from more frequent cleaning.'
                }
              },
              {
                '@type': 'Question',
                name: 'How long does air duct cleaning take?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A typical residential air duct cleaning takes about 2-4 hours, depending on the size of your system and the level of contamination.'
                }
              },
              {
                '@type': 'Question',
                name: 'Is air duct cleaning worth it?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, professional air duct cleaning can significantly improve indoor air quality, reduce allergy symptoms, lower energy bills by improving HVAC efficiency, and extend the lifespan of your system.'
                }
              }
            ]
          })}
        </script>
      )}

      {/* Service Area Schema */}
      {showServiceArea && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ServiceArea',
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

