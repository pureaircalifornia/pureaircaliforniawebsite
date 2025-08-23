import React from 'react';
import { localSEO } from '@/utils/seo/localSEO';
import { serviceSchema } from '@/utils/seo/serviceSchema';

interface SchemaMarkupProps {
  serviceType?: 'airDuctCleaning' | 'dryerVentCleaning' | 'moldRemoval';
}

const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ serviceType }) => {
  return (
    <>
      {/* Local Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: localSEO.business.name,
          image: 'https://www.pureaircalifornia.com/logo.png',
          '@id': 'https://www.pureaircalifornia.com/#business',
          url: 'https://www.pureaircalifornia.com',
          telephone: localSEO.business.telephone,
          address: {
            '@type': 'PostalAddress',
            streetAddress: localSEO.business.address.streetAddress,
            addressLocality: localSEO.business.address.addressLocality,
            addressRegion: localSEO.business.address.addressRegion,
            postalCode: localSEO.business.address.postalCode,
            addressCountry: localSEO.business.address.addressCountry
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: localSEO.business.geo.latitude,
            longitude: localSEO.business.geo.longitude
          },
          openingHoursSpecification: Object.entries(localSEO.business.openingHours).map(([day, hours]) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
            opens: hours[0].split('-')[0],
            closes: hours[0].split('-')[1]
          })),
          sameAs: localSEO.citations.googleMyBusiness.url,
          priceRange: '$$',
          currenciesAccepted: 'USD',
          paymentAccepted: 'Cash, Credit Card, Debit Card'
        })}
      </script>

      {/* Service Schema */}
      {serviceType && (
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema[serviceType])}
        </script>
      )}

      {/* Reviews Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AggregateRating',
          '@id': 'https://www.pureaircalifornia.com/#aggregateRating',
          ratingValue: 4.9,
          reviewCount: 500,
          bestRating: 5,
          worstRating: 1,
          ratingExplanation: 'Based on 500+ customer reviews'
        })}
      </script>

      {/* FAQ Schema */}
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
                text: 'We recommend cleaning your air ducts every 3-5 years, depending on your home\'s specific needs.'
              }
            },
            {
              '@type': 'Question',
              name: 'How long does air duct cleaning take?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A typical residential air duct cleaning takes about 2-4 hours, depending on the size of your system.'
              }
            },
            {
              '@type': 'Question',
              name: 'Is air duct cleaning worth it?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, air duct cleaning can improve indoor air quality, reduce energy costs, and extend the life of your HVAC system.'
              }
            }
          ]
        })}
      </script>

      {/* Service Area Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ServiceArea',
          provider: {
            '@type': 'Organization',
            name: localSEO.business.name
          },
          areaServed: localSEO.serviceAreas.map(area => ({
            '@type': 'Place',
            name: area.name,
            address: {
              '@type': 'PostalAddress',
              addressRegion: 'CA',
              addressCountry: 'US'
            }
          })),
          serviceType: 'Air Duct Cleaning, Dryer Vent Cleaning, Mold Removal'
        })}
      </script>
    </>
  );
};

export default SchemaMarkup;
