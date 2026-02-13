export const seoConfig = {
  // Core SEO Settings
  siteName: 'Pure Air California',
  siteUrl: 'https://www.pureaircalifornia.com',
  defaultTitle: '#1 Air Duct Cleaning Company in Los Angeles | Pure Air California | (213) 792-4145',
  defaultDescription: 'Los Angeles\' top-rated air duct & dryer vent cleaning company. NADCA certified, 1,200+ 5-star reviews, same-day service. Free estimates! Call (213) 792-4145.',

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
      '@type': 'HVACBusiness',
      '@id': 'https://www.pureaircalifornia.com/#business',
      name: 'Pure Air California',
      alternateName: 'Pure Air California Air Duct Cleaning',
      image: 'https://www.pureaircalifornia.com/lovable-uploads/72fdde68-6f0b-49b3-ae09-0c49f6d931dd.png',
      telephone: '+1-213-792-4145',
      email: 'info@pureaircalifornia.com',
      url: 'https://www.pureaircalifornia.com',
      priceRange: '$$',
      currenciesAccepted: 'USD',
      paymentAccepted: 'Cash, Credit Card, Check',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1550 N Poinsettia Pl',
        addressLocality: 'Los Angeles',
        addressRegion: 'CA',
        postalCode: '90046',
        addressCountry: 'US'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 34.0522,
        longitude: -118.2437
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '18:00'
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '09:00',
          closes: '17:00'
        }
      ],
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
        ratingValue: '4.9',
        reviewCount: '1247',
        bestRating: '5',
        worstRating: '1'
      },
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
      title: '#1 Air Duct Cleaning Company in Los Angeles | Pure Air California',
      description: 'Los Angeles\' top-rated air duct & dryer vent cleaning company. NADCA certified, 1,200+ 5-star reviews, same-day service. Free estimates! Call (213) 792-4145.'
    },
    services: {
      title: 'Air Duct & Dryer Vent Cleaning Services Los Angeles | Pure Air California',
      description: 'Professional air duct cleaning, dryer vent cleaning, HVAC cleaning & electrostatic filter services in Los Angeles. Licensed, insured & NADCA certified.'
    },
    residentialAirDuct: {
      title: 'Residential Air Duct Cleaning Los Angeles | Home HVAC Cleaning | Pure Air California',
      description: 'Expert residential air duct cleaning in Los Angeles. Remove dust, allergens & improve indoor air quality. NADCA certified. Free estimates! Call (213) 792-4145.'
    },
    commercialAirDuct: {
      title: 'Commercial Air Duct Cleaning Los Angeles | Office & Business HVAC | Pure Air California',
      description: 'Professional commercial air duct cleaning for Los Angeles businesses. Improve employee health & HVAC efficiency. NADCA certified. Free commercial quotes!'
    },
    residentialDryerVent: {
      title: 'Dryer Vent Cleaning Los Angeles | Fire Prevention | Pure Air California',
      description: 'Professional dryer vent cleaning in Los Angeles. Prevent dryer fires, reduce energy bills & improve drying time. Same-day service available. Call now!'
    },
    commercialDryerVent: {
      title: 'Commercial Dryer Vent Cleaning Los Angeles | Laundromat & Multi-Unit | Pure Air California',
      description: 'Commercial dryer vent cleaning for Los Angeles laundromats, hotels & multi-unit properties. Prevent fires & ensure code compliance. Free quotes!'
    },
    locations: {
      title: 'Air Duct Cleaning Locations | Los Angeles County Service Areas | Pure Air California',
      description: 'Pure Air California serves all of Los Angeles County. Find air duct cleaning services in Beverly Hills, Santa Monica, Pasadena, Burbank & more.'
    },
    about: {
      title: 'About Pure Air California | NADCA Certified Air Duct Cleaning Experts',
      description: 'Learn about Pure Air California, Los Angeles\' trusted air duct cleaning experts. NADCA certified, licensed & insured with 1,200+ 5-star reviews.'
    },
    contact: {
      title: 'Contact Pure Air California | Air Duct Cleaning Los Angeles | (213) 792-4145',
      description: 'Contact Pure Air California for air duct & dryer vent cleaning in Los Angeles. Call (213) 792-4145 or fill out our form for a free estimate today!'
    },
    quote: {
      title: 'Get a Free Air Duct Cleaning Quote | Los Angeles | Pure Air California',
      description: 'Request your free air duct cleaning quote in Los Angeles. No obligation, same-day estimates available. Call (213) 792-4145 or submit online!'
    },
    healthBenefits: {
      title: 'Health Benefits of Air Duct Cleaning | Indoor Air Quality | Pure Air California',
      description: 'Discover the health benefits of professional air duct cleaning. Reduce allergies, asthma triggers & improve indoor air quality in your Los Angeles home.'
    }
  }
};
