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
  // Service-area centre point.
  //
  // The previous value (33.8256055, -118.641338) is a point in the Pacific Ocean
  // roughly 8 miles south-west of Palos Verdes — verified on Google Maps, where it
  // renders as open water with no landmarks. It was being published in the
  // LocalBusiness schema alongside addressLocality "Los Angeles", so the structured
  // data contradicted itself and put the business ~40km offshore. For a local
  // service business that is actively harmful: proximity is a primary local-ranking
  // input.
  //
  // These coordinates are Valley Village, which matches the business address of
  // record (PO Box 3842, Valley Village, CA 91617) and is inside the City of Los
  // Angeles, so addressLocality stays "Los Angeles". If the crew actually dispatches
  // from somewhere else, set that instead — and make the pin in the Google Business
  // Profile match.
  geo: { latitude: 34.1664, longitude: -118.3967 },
  priceRange: '$$',
  // REAL Google rating + review count, re-verified directly from the Google
  // Business Profile on 2026-09-02: 4.6 from 7 reviews (6x 5-star, 1x 2-star).
  // The previous 4.7 / 9 no longer matched the profile. These power the
  // LocalBusiness aggregateRating — they MUST match Google or the structured
  // data is non-compliant and the item loses rich-result eligibility.
  aggregateRating: { ratingValue: 4.6, reviewCount: 7 },
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
    'https://www.facebook.com/pureaircalifornia',
    'https://www.instagram.com/pureaircalifornia',
    'https://www.yelp.com/biz/pure-air-california-los-angeles-5',
    'https://twitter.com/pureaircalifornia',
  ],
} as const;

// Honest, conversion-focused proof line. Uses the verified 4.6 Google rating plus
// the owner-confirmed lifetime stats (NOT the 9 Google reviews, which read weak).
export const ratingDisplay = `4.6★ on Google · 448K+ customers · 40+ years`;
