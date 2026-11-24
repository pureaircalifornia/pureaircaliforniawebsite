/**
 * Business identity shared by visible copy and structured data.
 * Historical review figures are not a live feed and are not review rich-result markup.
 */
export const business = {
  legalName: 'Pure Air California',
  phone: '(213) 792-4145',
  phoneHref: 'tel:+12137924145',
  phoneE164: '+12137924145',
  tollFreePhone: '(877) 877-8745',
  tollFreePhoneHref: 'tel:8778778745',
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
  // Historical snapshot, checked 2026-11-22 against the live Maps listing (was 7
  // on 2026-09-02); never label this as a current count.
  // Self-serving LocalBusiness reviews are not eligible for Google review snippets.
  aggregateRating: { ratingValue: 4.6, reviewCount: 8 },
  reviewsVerifiedOn: '2026-11-22',
  googleProfileUrl: 'https://www.google.com/maps?cid=4164883086478915552',
  // CID-based deep link that reliably opens the GBP listing (verified). For a
  // true one-tap review prompt, replace with the exact "g.page/r/<id>/review"
  // link from the GBP dashboard → "Ask for reviews".
  googleReviewUrl: 'https://g.page/r/CeC3m8QZo8w5EBM/review',
  // Published availability is confirmed by phone; fixed hours are not verified.
  categories: [
    'Air duct cleaning service',
    'Dryer vent cleaning service',
    'HVAC contractor',
    'Mold remediation service',
    'Air conditioning contractor',
    'Heating contractor',
    'Cleaning service',
  ],
  sameAs: [
    'https://www.google.com/maps?cid=4164883086478915552',
    'https://www.facebook.com/AirDuctCleaningInLA',
    'https://instagram.com/pureaircalifornia/',
    'https://twitter.com/pureaircali',
    'https://www.yelp.com/biz/pure-air-california-los-angeles-5',
  ],
  // Founding year is intentionally omitted while legacy 1990/1993 claims are reconciled.
} as const;

// Avoid repeating the disputed lifetime statistics in shared display copy.
export const ratingDisplay = "Care for the air. Care for the people.";
