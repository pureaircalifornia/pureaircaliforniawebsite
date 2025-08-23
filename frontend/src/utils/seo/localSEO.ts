export const localSEO = {
  // Local Business Information
  business: {
    name: 'Pure Air California',
    address: {
      streetAddress: '123 Main Street',
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      postalCode: '90001',
      addressCountry: 'US'
    },
    telephone: '+12137924145',
    email: 'lou@pureaircalifornia.com',
    openingHours: {
      monday: ['08:00-20:00'],
      tuesday: ['08:00-20:00'],
      wednesday: ['08:00-20:00'],
      thursday: ['08:00-20:00'],
      friday: ['08:00-20:00'],
      saturday: ['09:00-17:00'],
      sunday: ['09:00-17:00']
    },
    emergencyHours: {
      available: true,
      description: '24/7 emergency service available'
    },
    geo: {
      latitude: 34.0522,
      longitude: -118.2437
    },
    serviceRadius: {
      miles: 30,
      description: 'We serve all of Los Angeles County and surrounding areas'
    }
  },

  // Detailed Neighborhood Targeting
  neighborhoods: {
    losAngeles: {
      name: 'Los Angeles',
      neighborhoods: [
        {
          name: 'Downtown Los Angeles',
          keywords: [
            'downtown los angeles air duct cleaning',
            'commercial hvac maintenance downtown',
            'los angeles business district air quality'
          ],
          services: [
            'Commercial Air Duct Cleaning',
            'Office Building HVAC Maintenance',
            'Large Building Air Quality Solutions'
          ]
        },
        {
          name: 'Hollywood',
          keywords: [
            'hollywood air duct cleaning',
            'hollywood hills hvac maintenance',
            'entertainment industry air quality'
          ],
          services: [
            'Residential Air Duct Cleaning',
            'Luxury Home HVAC Maintenance',
            'Entertainment Industry Air Quality Solutions'
          ]
        },
        {
          name: 'Beverly Hills',
          keywords: [
            'beverly hills air duct cleaning',
            'luxury home hvac maintenance',
            'high-end property air quality'
          ],
          services: [
            'Luxury Home Air Duct Cleaning',
            'High-End Property HVAC Maintenance',
            'Luxury Property Air Quality Solutions'
          ]
        }
      ]
    },
    orangeCounty: {
      name: 'Orange County',
      cities: [
        {
          name: 'Irvine',
          keywords: [
            'irvine air duct cleaning',
            'business park hvac maintenance',
            'corporate office air quality'
          ],
          services: [
            'Corporate Air Duct Cleaning',
            'Business Park HVAC Maintenance',
            'Corporate Office Air Quality Solutions'
          ]
        },
        {
          name: 'Newport Beach',
          keywords: [
            'newport beach air duct cleaning',
            'coastal property hvac maintenance',
            'beachfront property air quality'
          ],
          services: [
            'Coastal Property Air Duct Cleaning',
            'Beachfront Property HVAC Maintenance',
            'Coastal Air Quality Solutions'
          ]
        }
      ]
    }
  },

  // Enhanced Local Citations
  citations: {
    googleMyBusiness: {
      id: 'YOUR_GMB_ID',
      url: 'https://g.page/pureaircalifornia',
      categories: [
        'Home Services',
        'HVAC Services',
        'Air Duct Cleaning'
      ],
      attributes: {
        '24_hour_service': true,
        'emergency_service': true,
        'local_business': true
      }
    },
    yelp: {
      id: 'YOUR_YELP_ID',
      url: 'https://www.yelp.com/biz/pure-air-california',
      categories: [
        'Home Services',
        'HVAC Services',
        'Air Duct Cleaning'
      ]
    },
    bbb: {
      id: 'YOUR_BBB_ID',
      url: 'https://www.bbb.org/pureaircalifornia',
      accreditation: true,
      rating: 'A+'
    },
    angiesList: {
      id: 'YOUR_ANGIES_LIST_ID',
      url: 'https://www.angieslist.com/pureaircalifornia',
      categories: [
        'Home Services',
        'HVAC Services',
        'Air Duct Cleaning'
      ]
    },
    localChambers: [
      {
        name: 'Los Angeles Chamber of Commerce',
        url: 'https://www.lachamber.com/pureaircalifornia'
      },
      {
        name: 'Orange County Chamber of Commerce',
        url: 'https://www.occhamber.com/pureaircalifornia'
      }
    ]
  },

  // Enhanced Local SEO Keywords
  keywords: {
    byNeighborhood: {
      'Downtown Los Angeles': [
        'downtown los angeles air duct cleaning',
        'commercial hvac maintenance downtown los angeles',
        'los angeles business district air quality',
        'downtown la air duct cleaning company',
        'business district hvac maintenance'
      ],
      'Hollywood': [
        'hollywood air duct cleaning',
        'hollywood hills hvac maintenance',
        'entertainment industry air quality',
        'hollywood air duct cleaning services',
        'hollywood hills air quality solutions'
      ],
      'Beverly Hills': [
        'beverly hills air duct cleaning',
        'luxury home hvac maintenance',
        'high-end property air quality',
        'beverly hills air duct cleaning company',
        'luxury property hvac maintenance services'
      ]
    },
    byService: {
      'Air Duct Cleaning': [
        'professional air duct cleaning los angeles',
        'commercial air duct cleaning services',
        'industrial air duct cleaning',
        'los angeles air duct cleaning company',
        'southern california air duct cleaning services'
      ],
      'Dryer Vent Cleaning': [
        'professional dryer vent cleaning',
        'fire prevention services',
        'laundry room maintenance',
        'los angeles dryer vent cleaning services',
        'southern california dryer vent maintenance'
      ],
      'Mold Removal': [
        'mold remediation services',
        'mold inspection los angeles',
        'indoor air quality testing',
        'los angeles mold removal services',
        'southern california mold remediation'
      ]
    }
  },

  // Enhanced Content Strategy
  content: {
    blogPosts: {
      monthly: 6,
      topics: [
        'Seasonal HVAC Maintenance Tips',
        'Common Air Quality Issues in Los Angeles',
        'DIY vs Professional Air Duct Cleaning',
        'Signs Your Air Ducts Need Cleaning',
        'Benefits of Regular HVAC Maintenance',
        'Neighborhood-Specific Air Quality Reports'
      ]
    },
    neighborhoodGuides: {
      monthly: 3,
      topics: [
        'Air Quality in Los Angeles Neighborhoods',
        'HVAC Maintenance Tips for Specific Areas',
        'Local Air Quality Regulations',
        'Neighborhood-Specific HVAC Maintenance Tips',
        'Local Air Quality Improvement Strategies'
      ]
    },
    localBusinessGuides: {
      monthly: 2,
      topics: [
        'Los Angeles Business HVAC Maintenance',
        'Commercial Air Quality Solutions',
        'Business District HVAC Maintenance Tips',
        'Corporate Office Air Quality Solutions',
        'Business Park HVAC Maintenance Best Practices'
      ]
    }
  },

  // Enhanced Local SEO Tracking
  metrics: {
    googleMyBusiness: {
      reviews: {
        target: 1000,
        averageRating: 4.9,
        monthlyReviews: 50
      },
      posts: {
        monthly: 8,
        engagementRate: 0.10,
        postTypes: [
          'Service Updates',
          'Customer Reviews',
          'Local Events',
          'Neighborhood News',
          'Special Offers'
        ]
      },
      localSearch: {
        impressions: {
          monthly: 20000,
          clickThroughRate: 0.20,
          neighborhoodImpressions: true
        },
        searchTerms: [
          'air duct cleaning near me',
          'los angeles air duct cleaning',
          'hollywood air duct cleaning',
          'beverly hills air duct cleaning',
          'orange county air duct cleaning'
        ]
      }
    },
    localRanking: {
      googleMaps: {
        ranking: 'Top 3',
        reviews: 1000,
        photos: 200,
        posts: 100
      },
      yelp: {
        ranking: 'Top 5',
        reviews: 500,
        photos: 100,
        checkins: 500
      },
      bbb: {
        rating: 'A+',
        accredited: true,
        complaints: 0,
        reviews: 200
      }
    }
  }
};
