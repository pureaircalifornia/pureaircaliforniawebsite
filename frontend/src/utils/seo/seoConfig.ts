import { business } from '@/config/business';

export const seoConfig = {
  // Core SEO Settings
  siteName: 'Pure Air California',
  siteUrl: 'https://www.pureaircalifornia.com',
  defaultTitle: '#1 Air Duct Cleaning Los Angeles | Pure Air California',
  defaultDescription: 'Top-rated air duct & dryer vent cleaning in LA. NADCA certified. 448K+ happy customers over 40 years. Free estimates! Call (213) 792-4145.',

  // Content Configuration
  defaultImage: 'https://www.pureaircalifornia.com/gallery/jason-hawke-fu7pSuUa2PE-unsplash.jpg',
  minWordCount: 300,
  headingDepth: 3,
  internalLinksPerPost: 3,
  imageAltTextRatio: 0.75,
  metaDescriptionLength: 155,

  // SEO Keywords by Category
  keywords: {
    primary: [
      'air duct cleaning Los Angeles',
      'air duct cleaning company Los Angeles',
      'best air duct cleaning Los Angeles',
      'dryer vent cleaning Los Angeles',
      'HVAC cleaning Los Angeles',
      'duct cleaning near me Los Angeles'
    ],
    secondary: [
      'professional air duct cleaning LA',
      'residential air duct cleaning Los Angeles',
      'commercial air duct cleaning Los Angeles',
      'dryer vent cleaning near me',
      'indoor air quality Los Angeles',
      'mold removal air ducts LA'
    ],
    longtail: [
      'how much does air duct cleaning cost Los Angeles',
      'best air duct cleaning company near me',
      'air duct cleaning Los Angeles reviews',
      'NADCA certified air duct cleaning Los Angeles',
      'same day air duct cleaning Los Angeles',
      'affordable air duct cleaning Los Angeles CA',
      'air duct cleaning Beverly Hills',
      'air duct cleaning Santa Monica',
      'air duct cleaning Pasadena',
      'dryer vent fire prevention Los Angeles'
    ],
    locations: [
      'Los Angeles', 'Beverly Hills', 'Santa Monica', 'West Hollywood',
      'Pasadena', 'Long Beach', 'Burbank', 'Glendale', 'Culver City',
      'Malibu', 'Hollywood', 'Downtown LA', 'Brentwood', 'Bel Air',
      'Sherman Oaks', 'Encino', 'Studio City', 'Calabasas', 'Torrance'
    ]
  },

  // Schema Markup Types
  schema: {
    organization: {
      '@type': 'Organization',
      '@id': 'https://www.pureaircalifornia.com/#organization',
      name: 'Pure Air California',
      url: 'https://www.pureaircalifornia.com',
      logo: 'https://www.pureaircalifornia.com/lovable-uploads/72fdde68-6f0b-49b3-ae09-0c49f6d931dd.png',
      description: 'Los Angeles premier air duct and dryer vent cleaning company. NADCA certified professionals serving residential and commercial clients.',
      foundingDate: '2015',
      sameAs: [
        'https://www.facebook.com/pureaircalifornia',
        'https://www.instagram.com/pureaircalifornia',
        'https://www.yelp.com/biz/pure-air-california',
        'https://twitter.com/pureaircalifornia'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-213-792-4145',
        contactType: 'customer service',
        areaServed: 'US',
        availableLanguage: ['English', 'Spanish']
      }
    },
    service: {
      '@type': 'Service',
      name: 'Air Duct Cleaning Los Angeles',
      serviceType: 'Air Duct Cleaning',
      description: 'Professional NADCA-certified air duct cleaning services in Los Angeles. Improve indoor air quality, remove allergens, and boost HVAC efficiency.',
      areaServed: {
        '@type': 'City',
        name: 'Los Angeles',
        sameAs: 'https://en.wikipedia.org/wiki/Los_Angeles'
      },
      provider: {
        '@type': 'LocalBusiness',
        name: 'Pure Air California',
        telephone: '+1-213-792-4145'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Air Duct Cleaning Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Residential Air Duct Cleaning',
              description: 'Complete air duct cleaning for homes and apartments in Los Angeles'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Commercial Air Duct Cleaning',
              description: 'Professional air duct cleaning for businesses and commercial properties'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Dryer Vent Cleaning',
              description: 'Dryer vent cleaning to prevent fire hazards and improve efficiency'
            }
          }
        ]
      }
    },
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'HVACBusiness',
      '@id': 'https://www.pureaircalifornia.com/#business',
      name: business.legalName,
      alternateName: 'Pure Air California Air Duct Cleaning',
      image: 'https://www.pureaircalifornia.com/lovable-uploads/72fdde68-6f0b-49b3-ae09-0c49f6d931dd.png',
      telephone: business.phone,
      email: business.email,
      url: business.url,
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
      geo: {
        '@type': 'GeoCoordinates',
        latitude: business.geo.latitude,
        longitude: business.geo.longitude,
      },
      openingHoursSpecification: business.hours.map(h => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
      areaServed: [
        { '@type': 'City', name: 'Los Angeles' },
        { '@type': 'City', name: 'Beverly Hills' },
        { '@type': 'City', name: 'Santa Monica' },
        { '@type': 'City', name: 'Pasadena' },
        { '@type': 'City', name: 'Burbank' },
        { '@type': 'City', name: 'Glendale' },
        { '@type': 'City', name: 'Long Beach' },
        { '@type': 'City', name: 'West Hollywood' },
        { '@type': 'City', name: 'Culver City' },
        { '@type': 'City', name: 'Malibu' }
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: business.aggregateRating.ratingValue,
        reviewCount: business.aggregateRating.reviewCount,
        bestRating: '5',
        worstRating: '1',
      },
      sameAs: business.sameAs,
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'certification',
          name: 'NADCA Certified'
        }
      ],
      knowsAbout: [
        'Air Duct Cleaning',
        'Dryer Vent Cleaning',
        'HVAC Cleaning',
        'Indoor Air Quality',
        'Mold Remediation',
        'Allergen Removal'
      ],
      slogan: 'Breathe Easier with Pure Air California'
    }
  },

  // Content Optimization Settings
  content: {
    minWordCount: 300,
    headingDepth: 6,
    internalLinksPerPost: 3,
    imageAltTextRatio: 0.8,
    metaDescriptionLength: 155
  },

  // Performance Optimization
  performance: {
    lighthouse: {
      performance: 90,
      accessibility: 90,
      'best-practices': 90,
      seo: 90,
      pwa: 85
    },
    pageSpeed: {
      mobile: 90,
      desktop: 95
    }
  },

  // Local SEO Settings
  local: {
    serviceAreas: [
      'Los Angeles', 'Beverly Hills', 'Santa Monica', 'West Hollywood',
      'Pasadena', 'Long Beach', 'Burbank', 'Glendale', 'Culver City',
      'Malibu', 'Hollywood', 'Downtown LA', 'Brentwood', 'Bel Air',
      'Sherman Oaks', 'Encino', 'Studio City', 'Calabasas', 'Torrance',
      'Manhattan Beach', 'Redondo Beach', 'Hermosa Beach', 'Venice',
      'Marina del Rey', 'Playa del Rey', 'El Segundo', 'Inglewood'
    ],
    businessHours: {
      open: '08:00',
      close: '18:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    emergencyHours: {
      available: true,
      description: '24/7 emergency service available'
    }
  },

  // Page-specific SEO configurations
  pages: {
    home: {
      title: '#1 Air Duct Cleaning Los Angeles | Pure Air California',
      description: 'Stop breathing dirty air. LA\'s #1 NADCA-certified air duct & dryer vent cleaners. 448K+ happy customers. 40+ years experience. Get a Free Estimate!'
    },
    services: {
      title: '5-Star Air Duct & Dryer Vent Cleaning LA | Pure Air CA',
      description: 'Protect your family. Expert residential & commercial air duct & dryer vent cleaning in LA. NADCA certified, 40+ years experience. Free Quotes.'
    },
    residentialAirDuct: {
      title: 'Residential Air Duct Cleaning LA | Pure Air California',
      description: 'Remove severe dust, mold & allergens from your home\'s HVAC system. 448K+ LA homeowners trust our NADCA-certified experts. Book a free inspection!'
    },
    commercialAirDuct: {
      title: 'Commercial Air Duct Cleaning LA | Employee Health & Safety',
      description: 'Improve indoor air quality & HVAC efficiency for your LA business. 40+ years of commercial duct cleaning experience. Secure your free estimate.'
    },
    residentialDryerVent: {
      title: 'Dryer Vent Cleaning Los Angeles | Prevent Lint Fires',
      description: 'Is your dryer taking too long? Prevent dangerous blockages and lower energy bills with professional dryer vent cleaning in LA. Same-day service!'
    },
    commercialDryerVent: {
      title: 'Commercial Dryer Vent Cleaning LA | Code Compliance',
      description: 'Heavy-duty commercial dryer vent cleaning for laundromats, hotels & apartments in Los Angeles. Prevent fires and reduce drying times.'
    },
    locations: {
      title: 'Air Duct Cleaning Locations in LA County | Pure Air CA',
      description: 'Pure Air California serves all of Los Angeles County. Find 5-star air duct cleaning in Beverly Hills, Santa Monica, Pasadena, Burbank & more.'
    },
    about: {
      title: 'About Pure Air California | NADCA Air Duct Cleaning Experts',
      description: 'Meet Pure Air California, LA\'s trusted air duct cleaning experts. NADCA certified, 40+ years experience, and 448K+ satisfied customers.'
    },
    contact: {
      title: 'Contact Pure Air California | (213) 792-4145',
      description: 'Contact Pure Air California for top-rated air duct & dryer vent cleaning in Los Angeles. Call (213) 792-4145 or submit our form for a free quote!'
    },
    quote: {
      title: 'Get a Free Air Duct Cleaning Quote in LA | Pure Air CA',
      description: 'Claim your 100% free, no-obligation air duct or dryer vent estimate in Los Angeles. See why 448K+ customers trust Pure Air California.'
    },
    healthBenefits: {
      title: 'Health Benefits of Air Duct Cleaning | Indoor Air Quality',
      description: 'Discover the health benefits of professional air duct cleaning. Reduce allergies and asthma triggers. Improve your LA home\'s indoor air quality.'
    }
  }
};
