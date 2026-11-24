import { business } from '@/config/business';

/**
 * Verified Greater Los Angeles geographic entities with live-verified Wikidata identifiers.
 * Shared across HVACBusiness, Service, and local SEO structured data.
 * Never add unverified street addresses, branch offices, or unverified Q-IDs.
 */
export interface WikidataArea {
  '@type': 'AdministrativeArea' | 'City' | 'Place';
  name: string;
  sameAs?: string;
  containedInPlace?: {
    '@type': 'AdministrativeArea' | 'City' | 'State';
    name: string;
    sameAs?: string;
  };
}

const LA_CITY_REF = {
  '@type': 'City' as const,
  name: 'Los Angeles',
  sameAs: 'https://www.wikidata.org/wiki/Q65',
};

const CA_STATE_REF = {
  '@type': 'State' as const,
  name: 'California',
  sameAs: 'https://www.wikidata.org/wiki/Q99',
};

export const LA_WIKIDATA_AREAS: readonly WikidataArea[] = [
  {
    '@type': 'AdministrativeArea',
    name: 'Los Angeles County',
    sameAs: 'https://www.wikidata.org/wiki/Q104994',
    containedInPlace: CA_STATE_REF,
  },
  { '@type': 'City', name: 'Los Angeles', sameAs: 'https://www.wikidata.org/wiki/Q65', containedInPlace: CA_STATE_REF },
  { '@type': 'City', name: 'Beverly Hills', sameAs: 'https://www.wikidata.org/wiki/Q127856', containedInPlace: CA_STATE_REF },
  { '@type': 'City', name: 'Santa Monica', sameAs: 'https://www.wikidata.org/wiki/Q47164', containedInPlace: CA_STATE_REF },
  { '@type': 'City', name: 'Culver City', sameAs: 'https://www.wikidata.org/wiki/Q493378', containedInPlace: CA_STATE_REF },
  { '@type': 'City', name: 'Malibu', sameAs: 'https://www.wikidata.org/wiki/Q387047', containedInPlace: CA_STATE_REF },
  { '@type': 'City', name: 'Pasadena', sameAs: 'https://www.wikidata.org/wiki/Q485176', containedInPlace: CA_STATE_REF },
  { '@type': 'City', name: 'Glendale', sameAs: 'https://www.wikidata.org/wiki/Q485716', containedInPlace: CA_STATE_REF },
  { '@type': 'City', name: 'Burbank', sameAs: 'https://www.wikidata.org/wiki/Q39561', containedInPlace: CA_STATE_REF },
  { '@type': 'City', name: 'West Hollywood', sameAs: 'https://www.wikidata.org/wiki/Q846421', containedInPlace: CA_STATE_REF },
  { '@type': 'City', name: 'Torrance', sameAs: 'https://www.wikidata.org/wiki/Q489197', containedInPlace: CA_STATE_REF },
  { '@type': 'City', name: 'Long Beach', sameAs: 'https://www.wikidata.org/wiki/Q16739', containedInPlace: CA_STATE_REF },
  { '@type': 'City', name: 'Calabasas', sameAs: 'https://www.wikidata.org/wiki/Q629088', containedInPlace: CA_STATE_REF },
  { '@type': 'City', name: 'Hidden Hills', sameAs: 'https://www.wikidata.org/wiki/Q913346', containedInPlace: CA_STATE_REF },
  { '@type': 'City', name: 'Ventura', sameAs: 'https://www.wikidata.org/wiki/Q490434', containedInPlace: CA_STATE_REF },
  { '@type': 'Place', name: 'Brentwood, Los Angeles, CA', sameAs: 'https://www.wikidata.org/wiki/Q909975', containedInPlace: LA_CITY_REF },
  { '@type': 'Place', name: 'Century City, Los Angeles, CA', sameAs: 'https://www.wikidata.org/wiki/Q1054483', containedInPlace: LA_CITY_REF },
  { '@type': 'Place', name: 'Westwood, Los Angeles, CA', sameAs: 'https://www.wikidata.org/wiki/Q1199774', containedInPlace: LA_CITY_REF },
  { '@type': 'Place', name: 'Pacific Palisades, Los Angeles, CA', sameAs: 'https://www.wikidata.org/wiki/Q1370207', containedInPlace: LA_CITY_REF },
  { '@type': 'Place', name: 'Hollywood, Los Angeles, CA', sameAs: 'https://www.wikidata.org/wiki/Q34006', containedInPlace: LA_CITY_REF },
  { '@type': 'Place', name: 'Los Feliz, Los Angeles, CA', sameAs: 'https://www.wikidata.org/wiki/Q6682727', containedInPlace: LA_CITY_REF },
  { '@type': 'Place', name: 'Downtown Los Angeles, CA', sameAs: 'https://www.wikidata.org/wiki/Q995043', containedInPlace: LA_CITY_REF },
  { '@type': 'Place', name: 'Koreatown, Los Angeles, CA', sameAs: 'https://www.wikidata.org/wiki/Q872664', containedInPlace: LA_CITY_REF },
  { '@type': 'Place', name: 'Sherman Oaks, Los Angeles, CA', sameAs: 'https://www.wikidata.org/wiki/Q1015874', containedInPlace: LA_CITY_REF },
  { '@type': 'Place', name: 'Encino, Los Angeles, CA', sameAs: 'https://www.wikidata.org/wiki/Q1190590', containedInPlace: LA_CITY_REF },
  { '@type': 'Place', name: 'Woodland Hills, Los Angeles, CA', sameAs: 'https://www.wikidata.org/wiki/Q1337818', containedInPlace: LA_CITY_REF },
  { '@type': 'Place', name: 'Van Nuys, Los Angeles, CA', sameAs: 'https://www.wikidata.org/wiki/Q769446', containedInPlace: LA_CITY_REF },
  { '@type': 'Place', name: 'North Hollywood, Los Angeles, CA', sameAs: 'https://www.wikidata.org/wiki/Q1319697', containedInPlace: LA_CITY_REF },
  { '@type': 'Place', name: 'Studio City, Los Angeles, CA', sameAs: 'https://www.wikidata.org/wiki/Q3143067', containedInPlace: LA_CITY_REF },
  { '@type': 'Place', name: 'West Los Angeles, CA', sameAs: 'https://www.wikidata.org/wiki/Q2543669', containedInPlace: LA_CITY_REF },
  { '@type': 'Place', name: 'Sawtelle, Los Angeles, CA', sameAs: 'https://www.wikidata.org/wiki/Q7428691', containedInPlace: LA_CITY_REF },
  { '@type': 'Place', name: 'Mid-Wilshire, Los Angeles, CA', sameAs: 'https://www.wikidata.org/wiki/Q3312605', containedInPlace: LA_CITY_REF },
  { '@type': 'Place', name: 'Valley Village, Los Angeles, CA', sameAs: 'https://www.wikidata.org/wiki/Q7912296', containedInPlace: LA_CITY_REF },
  { '@type': 'Place', name: 'Canoga Park, Los Angeles, CA', sameAs: 'https://www.wikidata.org/wiki/Q2457268', containedInPlace: LA_CITY_REF },
  { '@type': 'Place', name: 'Chatsworth, Los Angeles, CA', sameAs: 'https://www.wikidata.org/wiki/Q1020942', containedInPlace: LA_CITY_REF },
  { '@type': 'Place', name: 'Northridge, Los Angeles, CA', sameAs: 'https://www.wikidata.org/wiki/Q2050326', containedInPlace: LA_CITY_REF },
] as const;

/**
 * Truthful Greater Los Angeles local SEO configuration derived solely from
 * verified business identity in `@/config/business`.
 * Service-area business: no public storefront street address, no unverified
 * 24/7 hours, and no fabricated ratings or directory accreditations.
 */
export const localSEO = {
  business: {
    name: business.legalName,
    url: business.url,
    telephone: business.phoneE164,
    phoneDisplay: business.phone,
    email: business.email,
    address: {
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      addressCountry: business.address.addressCountry,
    },
    availabilityNote: 'Confirm appointment availability and service coverage directly by phone or online estimate request.',
    serviceRegion: 'Greater Los Angeles, Los Angeles County, and parts of Ventura County, California',
  },

  serviceAreas: LA_WIKIDATA_AREAS.map(({ name, sameAs }) => ({
    name,
    ...(sameAs ? { sameAs } : {}),
  })),

  /** Verified public profiles matching `business.sameAs`. */
  citations: {
    googleBusinessProfile: {
      url: business.googleProfileUrl,
      reviewUrl: business.googleReviewUrl,
      categories: [...business.categories],
    },
    sameAs: [...business.sameAs],
  },

  /** Regional Los Angeles topic clusters for internal planning and copy alignment. */
  regions: {
    westsideAndCoastal: {
      label: 'Westside & Coastal',
      areas: ['Santa Monica', 'Beverly Hills', 'Brentwood', 'Pacific Palisades', 'Malibu', 'Culver City', 'Century City', 'Westwood', 'West LA', 'Sawtelle'],
    },
    centralAndMetro: {
      label: 'Central & Metro Los Angeles',
      areas: ['Downtown LA', 'Hollywood', 'West Hollywood', 'Los Feliz', 'Koreatown', 'Mid-Wilshire', 'Larchmont', 'Fairfax', 'Laurel Canyon', 'Central LA'],
    },
    sanFernandoValley: {
      label: 'San Fernando Valley',
      areas: ['Sherman Oaks', 'Studio City', 'Encino', 'Burbank', 'Glendale', 'Woodland Hills', 'Calabasas', 'Valley Village', 'North Hollywood', 'Van Nuys', 'Northridge', 'Tarzana', 'Reseda', 'Canoga Park', 'Chatsworth', 'Porter Ranch', 'Granada Hills', 'Toluca Lake', 'Hidden Hills'],
    },
    foothillsAndVentura: {
      label: 'San Gabriel Foothills & Ventura',
      areas: ['Pasadena', 'Ventura'],
    },
  },
} as const;
