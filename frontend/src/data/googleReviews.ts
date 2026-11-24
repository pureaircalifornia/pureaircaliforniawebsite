/**
 * The real Google reviews for Pure Air California.
 *
 * Transcribed verbatim from the Google Business Profile
 * (CID 4164883086478915552) on 2 September 2026. This is the single source of
 * truth for review content anywhere on the site.
 *
 * RULES — please keep to them:
 *  1. Only add an entry that is a real, published review. Never invent one.
 *  2. Do not attach a review to a city, neighbourhood or service it does not
 *     mention. Google reviews carry no location, so claiming one is a
 *     fabrication even when the review itself is genuine.
 *  3. On 2 September 2026 the profile held 7 reviews (6 x 5-star, 1 x 2-star);
 *     these six are the five-star ones. By 22 November 2026 it held 8 (4.6
 *     average); the eighth has not been transcribed here yet. Selecting positive
 *     reviews for a carousel is ordinary marketing; misreporting the AGGREGATE is
 *     not — so `business.aggregateRating` must always reflect every review.
 *
 * These replaced 54 invented per-city testimonials and 6 invented marquee
 * testimonials that carried fake reviewer names and fake LA neighbourhoods.
 */

export interface GoogleReview {
  name: string;
  /** Relative recency as shown on the profile. */
  when: string;
  rating: 5;
  text: string;
}

export const googleReviews: GoogleReview[] = [
  {
    name: 'Veronica Feldstein',
    when: '7 months ago',
    rating: 5,
    text: 'I absolutely love this company. Lou was very attentive and even gave me a free estimate/inspection to see what was needed. He explained everything very thoroughly and I now have them come to my home every year since 2017. This is a family business and they take such care to make sure that I am serviced properly. My dog even loves him!',
  },
  {
    name: 'Tiffany Toney',
    when: '6 months ago',
    rating: 5,
    text: 'Absolutely love this place! I am so glad I found LOU — he is so kind and knowledgeable about his craft. I have been using him for years. My dogs even love him.',
  },
  {
    name: 'Elizabeth Bochina',
    when: '6 months ago',
    rating: 5,
    text: 'Lou did an amazing job! He drove to Lancaster for us and my air ducts are very very clean. Best pricing I found, and quality work.',
  },
  {
    name: 'Meghan Falcone',
    when: '5 years ago',
    rating: 5,
    text: 'Was in a jam when my air duct cleaning service no-showed. Called Pure Air and Elliott came out within an hour. He did a super thorough and professional job. I found him knowledgeable and the company very easy to work with. Will definitely use again!',
  },
  {
    name: 'LATP Media',
    when: '6 years ago',
    rating: 5,
    text: 'I needed some consulting on my air vent situation and they were extremely knowledgeable and professional, friendly and willing to explain different conditions that can take place in air vents. Very educational! And very helpful. Hard to find companies of this quality these days.',
  },
  {
    name: 'Célia B.',
    when: '7 years ago',
    rating: 5,
    text: 'I was quite impressed by their professionalism and sincere care for my health and well being. Recommending Lou and the team to all my friends and family!',
  },
];
