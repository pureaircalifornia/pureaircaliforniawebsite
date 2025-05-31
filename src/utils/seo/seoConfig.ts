export const seoConfig = {
  // Core SEO Settings
  siteName: 'Pure Air California',
  siteUrl: 'https://www.pureaircalifornia.com',
  defaultTitle: 'Air Duct & Dryer Vent Cleaning in Los Angeles',
  defaultDescription: 'Professional air duct cleaning and dryer vent cleaning services in Los Angeles. NADCA certified, licensed & insured. Improve your indoor air quality today!',

  // Content Configuration
  defaultImage: '/gallery/jason-hawke-fu7pSuUa2PE-unsplash.jpg',
  minWordCount: 300,
  headingDepth: 3,
  internalLinksPerPost: 3,
  imageAltTextRatio: 0.75,
  metaDescriptionLength: 155,
  
  // SEO Keywords by Category
  keywords: {
    primary: [
      'air duct cleaning Los Angeles',
      'dryer vent cleaning Los Angeles',
      'HVAC cleaning services',
      'indoor air quality improvement',
      'mold removal services',
      'allergen reduction'
    ],
    secondary: [
      'professional air duct cleaning',
      'residential air duct cleaning',
      'commercial air duct cleaning',
      'dryer vent maintenance',
      'fire prevention services',
      'energy efficiency improvement'
    ],
    longtail: [
      'how to clean air ducts',
      'signs you need air duct cleaning',
      'benefits of air duct cleaning',
      'cost of air duct cleaning Los Angeles',
      'how often to clean air ducts',
      'air duct cleaning near me'
    ]
  },

  // Schema Markup Types
  schema: {
    organization: {
      '@type': 'Organization',
      '@id': 'https://www.pureaircalifornia.com/#organization',
      name: 'Pure Air California',
      url: 'https://www.pureaircalifornia.com',
      logo: 'https://www.pureaircalifornia.com/logo.png',
      sameAs: [
        'https://www.facebook.com/pureaircalifornia',
        'https://www.instagram.com/pureaircalifornia',
        'https://www.yelp.com/biz/pure-air-california'
      ]
    },
    service: {
      '@type': 'Service',
      name: 'Air Duct Cleaning',
      serviceType: 'Professional Service',
      description: 'Professional air duct cleaning services to improve indoor air quality and energy efficiency',
      areaServed: 'Los Angeles, California',
      provider: {
        '@type': 'Organization',
        name: 'Pure Air California'
      }
    },
    localBusiness: {
      '@type': 'LocalBusiness',
      '@id': 'https://www.pureaircalifornia.com/#business',
      name: 'Pure Air California',
      image: 'https://www.pureaircalifornia.com/logo.png',
      telephone: '+12137924145',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Main Street',
        addressLocality: 'Los Angeles',
        addressRegion: 'CA',
        postalCode: '90001',
        addressCountry: 'US'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 34.0522,
        longitude: -118.2437
      }
    }
  },

  // Content Optimization Settings
  content: {
    minWordCount: 300, // Minimum word count for blog posts
    headingDepth: 6, // Maximum heading depth
    internalLinksPerPost: 3, // Recommended number of internal links
    imageAltTextRatio: 0.8, // Minimum percentage of images with alt text
    metaDescriptionLength: 155 // Optimal meta description length
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
      'Los Angeles',
      'Beverly Hills',
      'Santa Monica',
      'West Hollywood',
      'Pasadena',
      'Long Beach'
    ],
    businessHours: {
      open: '08:00',
      close: '20:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    emergencyHours: {
      available: true,
      description: '24/7 emergency service available'
    }
  }
};
