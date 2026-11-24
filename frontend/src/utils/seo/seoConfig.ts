import { business } from '@/config/business';
import { LA_WIKIDATA_AREAS } from './localSEO';

const SITE_URL = 'https://www.pureaircalifornia.com';
const LOGO_URL = `${SITE_URL}/brand/pac-brandmark-v2.webp`;

/**
 * Shared brand logo ImageObject matching the actual measured dimensions
 * of `public/brand/pac-brandmark-v2.webp` (420x213).
 */
const brandLogoObject = {
  '@type': 'ImageObject',
  '@id': `${SITE_URL}/#logo`,
  url: LOGO_URL,
  contentUrl: LOGO_URL,
  width: 420,
  height: 213,
  caption: business.legalName,
};

const sharedKnowsAbout = [
  'Residential and commercial air duct cleaning in Los Angeles',
  'Negative-pressure source-removal air duct cleaning',
  'EPA inspection-led air duct cleaning guidance',
  'Residential dryer vent lint removal and exhaust airflow inspection',
  'Commercial, apartment, and HOA multi-unit dryer vent maintenance',
  'Laundromat high-volume dryer exhaust manifold and riser cleaning',
  'HVAC evaporator coil, blower assembly, air handler, and plenum cleaning',
  'Washable electrostatic air filter collector-cell inspection and cleaning',
  'Post-wildfire smoke, ash, and renovation dust HVAC duct assessment',
  'Air duct sanitizing material compatibility assessment',
];

const coreOfferCatalog = {
  '@type': 'OfferCatalog',
  '@id': `${SITE_URL}/#offer-catalog`,
  name: 'Pure Air California Air Duct, Dryer Vent & HVAC Cleaning Services',
  itemListElement: [
    {
      '@type': 'Offer',
      url: `${SITE_URL}/services/residential-air-duct-cleaning/`,
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        minPrice: 299,
        priceCurrency: 'USD',
        description: 'Starting price for eligible residential air duct cleaning scopes in Greater Los Angeles. Final written estimate depends on system count, condition, access, and included components.',
      },
      itemOffered: {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/residential-air-duct-cleaning/#service`,
        name: 'Residential Air Duct Cleaning',
        url: `${SITE_URL}/services/residential-air-duct-cleaning/`,
        description: 'Inspection-led negative-pressure source removal for accessible supply and return ductwork, registers, and trunk lines in Los Angeles homes, condos, and apartments.',
      },
    },
    {
      '@type': 'Offer',
      url: `${SITE_URL}/services/residential-dryer-vent-cleaning/`,
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        minPrice: 149,
        priceCurrency: 'USD',
        description: 'Starting price for eligible residential dryer vent cleaning scopes in Greater Los Angeles. Final written estimate depends on vent length, routing, roof or wall termination, and access.',
      },
      itemOffered: {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/residential-dryer-vent-cleaning/#service`,
        name: 'Residential Dryer Vent Cleaning',
        url: `${SITE_URL}/services/residential-dryer-vent-cleaning/`,
        description: 'Full-path dryer exhaust lint removal and airflow check from the laundry room connection to the exterior wall or roof termination hood.',
      },
    },
    {
      '@type': 'Offer',
      url: `${SITE_URL}/services/commercial-air-duct-cleaning/`,
      itemOffered: {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/commercial-air-duct-cleaning/#service`,
        name: 'Commercial Air Duct Cleaning',
        url: `${SITE_URL}/services/commercial-air-duct-cleaning/`,
        description: 'Site-specific commercial HVAC and ventilation duct cleaning for Los Angeles offices, hotels, clinics, schools, restaurants, retail, and industrial buildings.',
      },
    },
    {
      '@type': 'Offer',
      url: `${SITE_URL}/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/`,
      itemOffered: {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/#service`,
        name: 'Commercial & HOA Air Duct & Dryer Vent Cleaning',
        url: `${SITE_URL}/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/`,
        description: 'Coordinated unit-by-unit and common-area HVAC duct and dryer exhaust maintenance for Los Angeles HOAs, apartment communities, and property managers.',
      },
    },
    {
      '@type': 'Offer',
      url: `${SITE_URL}/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles/`,
      itemOffered: {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles/#service`,
        name: 'Wildfire Smoke & Hillside Air Duct Assessment & Cleaning',
        url: `${SITE_URL}/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles/`,
        description: 'Post-smoke, ash, and renovation-dust HVAC duct assessment and source-removal cleaning tailored for Los Angeles hillside and canyon homes.',
      },
    },
    {
      '@type': 'Offer',
      url: `${SITE_URL}/services/commercial-dryer-vent-cleaning/`,
      itemOffered: {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/commercial-dryer-vent-cleaning/#service`,
        name: 'Commercial Dryer Vent Cleaning',
        url: `${SITE_URL}/services/commercial-dryer-vent-cleaning/`,
        description: 'Commercial dryer exhaust duct, riser, and manifold cleaning for hotels, multi-unit laundry rooms, athletic facilities, and managed buildings.',
      },
    },
    {
      '@type': 'Offer',
      url: `${SITE_URL}/services/laundromat-dryer-vent-cleaning/`,
      itemOffered: {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/laundromat-dryer-vent-cleaning/#service`,
        name: 'Laundromat Dryer Vent Cleaning',
        url: `${SITE_URL}/services/laundromat-dryer-vent-cleaning/`,
        description: 'High-volume laundromat dryer bank, common exhaust manifold, booster fan, and roof termination cleaning planned around store hours.',
      },
    },
    {
      '@type': 'Offer',
      url: `${SITE_URL}/services/hvac-system-cleaning/`,
      itemOffered: {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/hvac-system-cleaning/#service`,
        name: 'HVAC System Cleaning',
        url: `${SITE_URL}/services/hvac-system-cleaning/`,
        description: 'Component-level cleaning for accessible evaporator coils, blower assemblies, air handlers, plenums, and connected ductwork.',
      },
    },
    {
      '@type': 'Offer',
      url: `${SITE_URL}/services/dryer-vent-maintenance-program/`,
      itemOffered: {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/dryer-vent-maintenance-program/#service`,
        name: 'Dryer Vent Maintenance Program',
        url: `${SITE_URL}/services/dryer-vent-maintenance-program/`,
        description: 'Recurring dryer exhaust inspection and lint removal schedules for homes, HOAs, apartments, and commercial laundry rooms.',
      },
    },
    {
      '@type': 'Offer',
      url: `${SITE_URL}/services/residential-electrostatic-filter/`,
      itemOffered: {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/residential-electrostatic-filter/#service`,
        name: 'Residential Electrostatic Air Filter Service',
        url: `${SITE_URL}/services/residential-electrostatic-filter/`,
        description: 'Inspection, cleaning, and sizing review for compatible residential electrostatic and reusable HVAC air filters.',
      },
    },
    {
      '@type': 'Offer',
      url: `${SITE_URL}/services/commercial-electrostatic-filter/`,
      itemOffered: {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/commercial-electrostatic-filter/#service`,
        name: 'Commercial Electrostatic Air Filter Service',
        url: `${SITE_URL}/services/commercial-electrostatic-filter/`,
        description: 'Collector-cell inspection and scheduled filter maintenance for commercial and multi-unit HVAC systems in Los Angeles.',
      },
    },
    {
      '@type': 'Offer',
      url: `${SITE_URL}/services/air-duct-sanitizing/`,
      itemOffered: {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/air-duct-sanitizing/#service`,
        name: 'Air Duct Sanitizing Assessment',
        url: `${SITE_URL}/services/air-duct-sanitizing/`,
        description: 'Inspection-first assessment of duct material compatibility, product labels, and treatment limitations following mechanical source removal.',
      },
    },
  ],
};

export const seoConfig = {
  // Core SEO Settings
  siteName: 'Pure Air California',
  siteUrl: SITE_URL,
  defaultTitle: 'Air Duct Cleaning Los Angeles | Pure Air California',
  defaultDescription: 'Los Angeles air duct cleaning (from $299) & dryer vent cleaning (from $149) for homes, HOAs & businesses. Inspection-led scope. Call (213) 792-4145.',

  // Fallback brand mark image (420x213). Every indexable route resolves its own
  // high-resolution editorial og:image via `data/pageHeroes.ts` or page props.
  defaultImage: LOGO_URL,
  defaultImageWidth: 420,
  defaultImageHeight: 213,
  minWordCount: 300,
  headingDepth: 3,
  internalLinksPerPost: 3,
  imageAltTextRatio: 0.75,
  metaDescriptionLength: 155,

  // SEO Keywords by Category (internal reference only; never emitted as meta keywords)
  keywords: {
    primary: [
      'air duct cleaning Los Angeles',
      'air duct cleaning company Los Angeles',
      'dryer vent cleaning Los Angeles',
      'HVAC cleaning Los Angeles',
      'duct cleaning near me Los Angeles',
      'air duct cleaning cost Los Angeles',
    ],
    secondary: [
      'residential air duct cleaning Los Angeles',
      'commercial air duct cleaning Los Angeles',
      'HOA dryer vent cleaning Los Angeles',
      'wildfire smoke air duct cleaning Los Angeles',
      'laundromat dryer vent cleaning Los Angeles',
      'electrostatic air filter cleaning Los Angeles',
    ],
    longtail: [
      'how much does air duct cleaning cost Los Angeles',
      'air duct cleaning inspection Los Angeles',
      'air duct cleaning estimate Los Angeles',
      'air duct cleaning Beverly Hills',
      'air duct cleaning Santa Monica',
      'air duct cleaning Pasadena',
      'dryer vent fire prevention Los Angeles',
    ],
    locations: [
      'Los Angeles', 'Beverly Hills', 'Santa Monica', 'West Hollywood',
      'Pasadena', 'Long Beach', 'Burbank', 'Glendale', 'Culver City',
      'Malibu', 'Hollywood', 'Downtown LA', 'Brentwood', 'Pacific Palisades',
      'Sherman Oaks', 'Encino', 'Studio City', 'Calabasas', 'Torrance',
    ],
  },

  // Schema.org Knowledge Graph nodes with unified @id cross-linking.
  // Policy guardrails:
  // - NEVER emit self-serving AggregateRating on LocalBusiness/HVACBusiness.
  // - NEVER emit unverified streetAddress, exact geo coordinates, foundingDate, or 24/7 hours.
  schema: {
    organization: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: business.legalName,
      alternateName: ['PAC', 'Pure Air California Air Duct & Dryer Vent Cleaning'],
      url: `${SITE_URL}/`,
      logo: brandLogoObject,
      image: brandLogoObject,
      description: 'Inspection-led residential and commercial air duct cleaning, multi-unit HOA dryer vent maintenance, HVAC blower and coil cleaning, laundromat exhaust extraction, and electrostatic filter care across Greater Los Angeles.',
      slogan: 'Because every breath is part of a life. Air duct & dryer vent cleaning for Greater Los Angeles.',
      sameAs: business.sameAs,
      telephone: business.phoneE164,
      email: business.email,
      knowsAbout: sharedKnowsAbout,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: business.phoneE164,
          contactType: 'customer service',
          email: business.email,
          areaServed: { '@type': 'AdministrativeArea', name: 'Los Angeles County', sameAs: 'https://www.wikidata.org/wiki/Q104994' },
          availableLanguage: ['English'],
        },
        {
          '@type': 'ContactPoint',
          telephone: '+18778778745',
          contactType: 'customer service',
          contactOption: 'TollFree',
          areaServed: 'US-CA',
          availableLanguage: ['English'],
        },
      ],
    },

    service: {
      '@type': 'Service',
      '@id': `${SITE_URL}/services/#service`,
      name: 'Air Duct & Dryer Vent Cleaning in Los Angeles',
      serviceType: 'Air Duct Cleaning',
      description: 'Inspection-led air duct, dryer vent, HVAC component, and electrostatic filter cleaning for Los Angeles homes, HOAs, and commercial buildings.',
      areaServed: {
        '@type': 'City',
        name: 'Los Angeles',
        sameAs: 'https://www.wikidata.org/wiki/Q65',
      },
      provider: {
        '@id': `${SITE_URL}/#business`,
      },
      hasOfferCatalog: coreOfferCatalog,
    },

    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'HVACBusiness',
      '@id': `${SITE_URL}/#business`,
      name: business.legalName,
      alternateName: 'Pure Air California Air Duct & Dryer Vent Cleaning',
      description: 'Service-area air duct cleaning, dryer vent cleaning, HVAC coil and blower cleaning, and electrostatic filter service for residential, HOA, and commercial properties across Greater Los Angeles.',
      logo: brandLogoObject,
      image: `${SITE_URL}/images/pac/losAngeles.webp`,
      telephone: business.phoneE164,
      email: business.email,
      url: `${SITE_URL}/`,
      priceRange: business.priceRange,
      currenciesAccepted: 'USD',
      paymentAccepted: 'Cash, Credit Card, Check',
      address: {
        '@type': 'PostalAddress',
        streetAddress: business.address.streetAddress || undefined,
        addressLocality: business.address.addressLocality,
        addressRegion: business.address.addressRegion,
        postalCode: business.address.postalCode || undefined,
        addressCountry: business.address.addressCountry,
      },
      // Service-area business: no public street address, no geo pin, no unverified hours,
      // and no self-serving AggregateRating.
      areaServed: LA_WIKIDATA_AREAS,
      hasOfferCatalog: coreOfferCatalog,
      potentialAction: [
        {
          '@type': 'ReserveAction',
          name: 'Request a Free Air Duct Cleaning Estimate',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/quote/`,
            actionPlatform: [
              'https://schema.org/DesktopWebPlatform',
              'https://schema.org/MobileWebPlatform',
            ],
          },
          result: {
            '@type': 'Reservation',
            name: 'Property-Specific Air Duct & Dryer Vent Estimate',
          },
        },
        {
          '@type': 'CommunicateAction',
          name: 'Call Pure Air California',
          target: business.phoneHref,
        },
      ],
      sameAs: business.sameAs,
      parentOrganization: { '@id': `${SITE_URL}/#organization` },
      knowsAbout: sharedKnowsAbout,
      slogan: 'Because every breath is part of a life. Air duct & dryer vent cleaning for Greater Los Angeles.',
    },
  },

  // Content Optimization Settings
  content: {
    minWordCount: 300,
    headingDepth: 6,
    internalLinksPerPost: 3,
    imageAltTextRatio: 0.8,
    metaDescriptionLength: 155,
  },

  // Performance Benchmarks
  performance: {
    lighthouse: {
      performance: 90,
      accessibility: 90,
      'best-practices': 90,
      seo: 90,
      pwa: 85,
    },
    pageSpeed: {
      mobile: 90,
      desktop: 95,
    },
  },

  // Local SEO Settings
  local: {
    serviceAreas: [
      'Los Angeles', 'Beverly Hills', 'Santa Monica', 'West Hollywood',
      'Pasadena', 'Long Beach', 'Burbank', 'Glendale', 'Culver City',
      'Malibu', 'Hollywood', 'Downtown LA', 'Brentwood', 'Pacific Palisades',
      'Sherman Oaks', 'Encino', 'Studio City', 'Calabasas', 'Torrance',
      'Woodland Hills', 'North Hollywood', 'Van Nuys', 'Century City',
      'Westwood', 'Koreatown', 'Los Feliz', 'Ventura',
    ],
    availability: 'Call (213) 792-4145 to confirm appointment availability.',
  },

  // Page-specific SEO defaults (all titles <=60 chars, descriptions <=155 chars with terminal punctuation)
  pages: {
    home: {
      title: 'Air Duct Cleaning Los Angeles | Pure Air California',
      description: 'Los Angeles air duct cleaning (from $299) & dryer vent cleaning (from $149) for homes, HOAs & businesses. Inspection-led scope. Call (213) 792-4145.',
    },
    services: {
      title: 'Air Duct & Dryer Vent Cleaning Services | Pure Air CA',
      description: 'Explore residential and commercial duct cleaning, dryer vent care, HVAC component cleaning and filter services in Greater Los Angeles.',
    },
    residentialAirDuct: {
      title: 'Residential Air Duct Cleaning Los Angeles | From $299',
      description: 'Inspection-led home air duct cleaning in Los Angeles, Beverly Hills & Santa Monica. Starting at $299 for eligible scopes. Request a free estimate.',
    },
    commercialAirDuct: {
      title: 'Commercial Air Duct Cleaning Los Angeles | Pure Air CA',
      description: 'Coordinate commercial air duct cleaning around your Los Angeles building, equipment, access and work schedule. Request a site-specific estimate.',
    },
    residentialDryerVent: {
      title: 'Dryer Vent Cleaning Los Angeles | Pure Air California',
      description: 'Residential dryer vent cleaning in Los Angeles starting at $149 for eligible scopes. Full-path lint extraction and airflow check. Free estimate.',
    },
    commercialDryerVent: {
      title: 'Commercial Dryer Vent Cleaning LA | Pure Air California',
      description: 'Plan dryer exhaust cleaning for laundromats, hotels and managed properties in Los Angeles. Define equipment, access and documentation.',
    },
    locations: {
      title: 'Air Duct Cleaning Locations in LA County | Pure Air CA',
      description: 'Find PAC service-area guides across Greater Los Angeles. Explore local duct and dryer vent care and confirm coverage for your address.',
    },
    about: {
      title: 'About Pure Air California | Los Angeles Air Duct Care',
      description: 'Meet the local team behind Pure Air California. Inspection-led air duct and dryer vent care for homes and businesses across Greater Los Angeles.',
    },
    contact: {
      title: 'Contact Pure Air California | Los Angeles Duct Cleaning',
      description: 'Talk to Pure Air California about air ducts, dryer vents and commercial HVAC cleaning in Los Angeles. Call (213) 792-4145 or request a callback.',
    },
    quote: {
      title: 'Free Air Duct Cleaning Quote Los Angeles | Pure Air CA',
      description: 'Request a free air duct or dryer vent cleaning estimate in Los Angeles. Share your property, systems and access details, or call (213) 792-4145.',
    },
    healthBenefits: {
      title: 'Air Duct Cleaning & Indoor Air Quality: What to Know',
      description: 'Understand what duct cleaning can and cannot do for indoor air. Explore EPA guidance, filtration, ventilation and condition-based maintenance.',
    },
  },
};
