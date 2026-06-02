/**
 * Single source of truth for business identity (NAP), ratings, and GBP data.
 * Consumed by visible UI (hero, footer) AND JSON-LD schema so Google sees
 * perfectly consistent local signals. Update ratings here and everywhere updates.
 */
export const business = {
  legalName: 'Pure Air California',
  phone: '(213) 792-4145',
  phoneHref: 'tel:2137924145',
  email: 'lou@pureaircalifornia.com',
  url: 'https://www.pureaircalifornia.com',
  // TODO(owner): confirm real street address / suite
  address: {
    streetAddress: '', // GBP service-area business may hide street; keep city/region
    addressLocality: 'Los Angeles',
    addressRegion: 'CA',
    postalCode: '',
    addressCountry: 'US',
  },
  geo: { latitude: 34.0522, longitude: -118.2437 }, // TODO(owner): real coords
  priceRange: '$$',
  // TODO(owner): real aggregate from GBP
  aggregateRating: { ratingValue: 4.9, reviewCount: 1200 },
  googleReviewUrl: 'https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID', // TODO(owner)
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '19:00' },
    { days: ['Saturday'], opens: '08:00', closes: '17:00' },
  ],
  categories: ['Air duct cleaning service', 'HVAC contractor', 'Dryer vent cleaning service'],
  sameAs: [
    // TODO(owner): GBP, Facebook, Instagram, Yelp URLs
  ],
} as const;

export const ratingDisplay = `${business.aggregateRating.ratingValue} ★ · ${business.aggregateRating.reviewCount.toLocaleString()}+ reviews`;
