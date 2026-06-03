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
  // Service-area business: Google Business Profile hides the street address.
  address: {
    streetAddress: '',
    addressLocality: 'Los Angeles',
    addressRegion: 'CA',
    postalCode: '',
    addressCountry: 'US',
  },
  // Real coordinates from the Google Business Profile.
  geo: { latitude: 33.8256055, longitude: -118.641338 },
  priceRange: '$$',
  // REAL Google rating + review count (verified from GBP 2026-06-02). These power
  // the LocalBusiness schema's aggregateRating — they MUST match Google or the
  // structured data is non-compliant. Update as the review engine grows the count.
  aggregateRating: { ratingValue: 4.7, reviewCount: 9 },
  // CID-based deep link that reliably opens the GBP listing (verified). For a
  // true one-tap review prompt, replace with the exact "g.page/r/<id>/review"
  // link from the GBP dashboard → "Ask for reviews".
  googleReviewUrl: 'https://www.google.com/maps?cid=4164883086478915552',
  // GBP shows "Open 24 hours" (24/7 emergency service).
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' },
  ],
  categories: ['Air duct cleaning service', 'HVAC contractor', 'Dryer vent cleaning service'],
  sameAs: [
    'https://www.google.com/maps?cid=4164883086478915552',
    // TODO(owner): add Facebook, Instagram, Yelp profile URLs for stronger entity signals
  ],
} as const;

// Honest, conversion-focused proof line. Uses the verified 4.7 Google rating plus
// the owner-confirmed lifetime stats (NOT the 9 Google reviews, which read weak).
export const ratingDisplay = `4.7★ on Google · 448K+ customers · 40+ years`;
