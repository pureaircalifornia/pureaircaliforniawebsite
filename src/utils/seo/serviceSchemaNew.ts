interface ServiceSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  provider: {
    '@type': string;
    name: string;
    sameAs: string[];
  };
  areaServed: string[];
  priceRange: string;
  serviceLocation: {
    '@type': string;
    name: string;
    address: {
      '@type': string;
      addressLocality: string;
      addressRegion: string;
      addressCountry: string;
    };
  };
  hasOfferCatalog: {
    '@type': string;
    name: string;
    itemListElement: Array<{
      '@type': string;
      name: string;
      description: string;
      price: string;
      priceCurrency: string;
      availability: string;
      itemOffered: {
        '@type': string;
        name: string;
      };
      serviceLocation: {
        '@type': string;
        name: string;
        address: {
          '@type': string;
          addressLocality: string;
          addressRegion: string;
          addressCountry: string;
        };
      };
    }>;
  };
  hasFeature: Array<{
    '@type': string;
    termCode: string;
    name: string;
    description: string;
  }>;
  serviceOutput: {
    '@type': string;
    termCode: string;
    name: string;
    description: string;
  };
  airDuctCleaning: ServiceSchema;
  dryerVentCleaning: ServiceSchema;
  moldRemoval: ServiceSchema;
}

export const serviceSchema: ServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Air Duct Cleaning',
  description: 'Professional air duct cleaning services to improve indoor air quality and energy efficiency',
  provider: {
    '@type': 'Organization',
    name: 'Breathe Pure California Air',
    sameAs: [
      'https://www.facebook.com/breathepurecaliforniaair',
      'https://www.instagram.com/breathepurecaliforniaair',
      'https://www.linkedin.com/company/breathepurecaliforniaair'
    ]
  },
  areaServed: ['Los Angeles County', 'Orange County', 'Riverside County', 'San Bernardino County'],
  priceRange: '$$$',
  serviceLocation: {
    '@type': 'Place',
    name: 'Breathe Pure California Air',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      addressCountry: 'US'
    }
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Air Duct Cleaning Services',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Standard Air Duct Cleaning',
        description: 'Thorough cleaning of air ducts, vents, and registers',
        price: '199.99',
        priceCurrency: 'USD',
        availability: 'http://schema.org/InStock',
        itemOffered: {
          '@type': 'Service',
          name: 'Standard Air Duct Cleaning'
        },
        serviceLocation: {
          '@type': 'Place',
          name: 'Customer Location',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Los Angeles',
            addressRegion: 'CA',
            addressCountry: 'US'
          }
        }
      },
      {
        '@type': 'Offer',
        name: 'Premium Air Duct Cleaning',
        description: 'Comprehensive cleaning with antimicrobial treatment',
        price: '299.99',
        priceCurrency: 'USD',
        availability: 'http://schema.org/InStock',
        itemOffered: {
          '@type': 'Service',
          name: 'Premium Air Duct Cleaning'
        },
        serviceLocation: {
          '@type': 'Place',
          name: 'Customer Location',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Los Angeles',
            addressRegion: 'CA',
            addressCountry: 'US'
          }
        }
      }
    ]
  },
  hasFeature: [
    {
      '@type': 'DefinedTerm',
      termCode: 'CERTIFIED',
      name: 'Certified Technicians',
      description: 'All technicians are NADCA certified'
    },
    {
      '@type': 'DefinedTerm',
      termCode: '24HRSERVICE',
      name: '24/7 Emergency Service',
      description: 'Available for urgent air duct cleaning needs'
    }
  ],
  serviceOutput: {
    '@type': 'DefinedTerm',
    termCode: 'CLEANED_AIR_DUCTS',
    name: 'Cleaned Air Ducts',
    description: 'Thoroughly cleaned and sanitized air duct system'
  },
  airDuctCleaning: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Air Duct Cleaning',
    description: 'Professional air duct cleaning services to improve indoor air quality and energy efficiency',
    provider: {
      '@type': 'Organization',
      name: 'Breathe Pure California Air',
      sameAs: [
        'https://www.facebook.com/breathepurecaliforniaair',
        'https://www.instagram.com/breathepurecaliforniaair',
        'https://www.linkedin.com/company/breathepurecaliforniaair'
      ]
    },
    areaServed: ['Los Angeles County', 'Orange County', 'Riverside County', 'San Bernardino County'],
    priceRange: '$$$',
    serviceLocation: {
      '@type': 'Place',
      name: 'Breathe Pure California Air',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Los Angeles',
        addressRegion: 'CA',
        addressCountry: 'US'
      }
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Air Duct Cleaning Services',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Standard Air Duct Cleaning',
          description: 'Thorough cleaning of air ducts, vents, and registers',
          price: '199.99',
          priceCurrency: 'USD',
          availability: 'http://schema.org/InStock',
          itemOffered: {
            '@type': 'Service',
            name: 'Standard Air Duct Cleaning'
          },
          serviceLocation: {
            '@type': 'Place',
            name: 'Customer Location',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Los Angeles',
              addressRegion: 'CA',
              addressCountry: 'US'
            }
          }
        },
        {
          '@type': 'Offer',
          name: 'Premium Air Duct Cleaning',
          description: 'Comprehensive cleaning with antimicrobial treatment',
          price: '299.99',
          priceCurrency: 'USD',
          availability: 'http://schema.org/InStock',
          itemOffered: {
            '@type': 'Service',
            name: 'Premium Air Duct Cleaning'
          },
          serviceLocation: {
            '@type': 'Place',
            name: 'Customer Location',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Los Angeles',
              addressRegion: 'CA',
              addressCountry: 'US'
            }
          }
        }
      ]
    },
    hasFeature: [
      {
        '@type': 'DefinedTerm',
        termCode: 'CERTIFIED',
        name: 'Certified Technicians',
        description: 'All technicians are NADCA certified'
      },
      {
        '@type': 'DefinedTerm',
        termCode: '24HRSERVICE',
        name: '24/7 Emergency Service',
        description: 'Available for urgent air duct cleaning needs'
      }
    ],
    serviceOutput: {
      '@type': 'DefinedTerm',
      termCode: 'CLEANED_AIR_DUCTS',
      name: 'Cleaned Air Ducts',
      description: 'Thoroughly cleaned and sanitized air duct system'
    }
  },
  dryerVentCleaning: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Dryer Vent Cleaning',
    description: 'Professional dryer vent cleaning services to prevent fires and improve efficiency',
    provider: {
      '@type': 'Organization',
      name: 'Breathe Pure California Air',
      sameAs: [
        'https://www.facebook.com/breathepurecaliforniaair',
        'https://www.instagram.com/breathepurecaliforniaair',
        'https://www.linkedin.com/company/breathepurecaliforniaair'
      ]
    },
    areaServed: ['Los Angeles County', 'Orange County', 'Riverside County', 'San Bernardino County'],
    priceRange: '$$$',
    serviceLocation: {
      '@type': 'Place',
      name: 'Breathe Pure California Air',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Los Angeles',
        addressRegion: 'CA',
        addressCountry: 'US'
      }
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Dryer Vent Cleaning Services',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Standard Dryer Vent Cleaning',
          description: 'Complete cleaning of dryer vent system',
          price: '99.99',
          priceCurrency: 'USD',
          availability: 'http://schema.org/InStock',
          itemOffered: {
            '@type': 'Service',
            name: 'Standard Dryer Vent Cleaning'
          },
          serviceLocation: {
            '@type': 'Place',
            name: 'Customer Location',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Los Angeles',
              addressRegion: 'CA',
              addressCountry: 'US'
            }
          }
        },
        {
          '@type': 'Offer',
          name: 'Premium Dryer Vent Cleaning',
          description: 'Comprehensive cleaning with vent inspection',
          price: '149.99',
          priceCurrency: 'USD',
          availability: 'http://schema.org/InStock',
          itemOffered: {
            '@type': 'Service',
            name: 'Premium Dryer Vent Cleaning'
          },
          serviceLocation: {
            '@type': 'Place',
            name: 'Customer Location',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Los Angeles',
              addressRegion: 'CA',
              addressCountry: 'US'
            }
          }
        }
      ]
    },
    hasFeature: [
      {
        '@type': 'DefinedTerm',
        termCode: 'CERTIFIED',
        name: 'Certified Technicians',
        description: 'All technicians are NADCA certified'
      },
      {
        '@type': 'DefinedTerm',
        termCode: '24HRSERVICE',
        name: '24/7 Emergency Service',
        description: 'Available for urgent dryer vent cleaning needs'
      }
    ],
    serviceOutput: {
      '@type': 'DefinedTerm',
      termCode: 'CLEANED_DRYER_VENT',
      name: 'Cleaned Dryer Vent',
      description: 'Thoroughly cleaned and clear dryer vent system'
    }
  },
  moldRemoval: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Mold Removal',
    description: 'Professional mold remediation and indoor air quality improvement services',
    provider: {
      '@type': 'Organization',
      name: 'Breathe Pure California Air',
      sameAs: [
        'https://www.facebook.com/breathepurecaliforniaair',
        'https://www.instagram.com/breathepurecaliforniaair',
        'https://www.linkedin.com/company/breathepurecaliforniaair'
      ]
    },
    areaServed: ['Los Angeles County', 'Orange County', 'Riverside County', 'San Bernardino County'],
    priceRange: '$$$',
    serviceLocation: {
      '@type': 'Place',
      name: 'Breathe Pure California Air',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Los Angeles',
        addressRegion: 'CA',
        addressCountry: 'US'
      }
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Mold Removal Services',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Standard Mold Removal',
          description: 'Professional mold remediation and cleanup',
          price: '299.99',
          priceCurrency: 'USD',
          availability: 'http://schema.org/InStock',
          itemOffered: {
            '@type': 'Service',
            name: 'Standard Mold Removal'
          },
          serviceLocation: {
            '@type': 'Place',
            name: 'Customer Location',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Los Angeles',
              addressRegion: 'CA',
              addressCountry: 'US'
            }
          }
        },
        {
          '@type': 'Offer',
          name: 'Premium Mold Removal',
          description: 'Comprehensive mold remediation with air quality testing',
          price: '499.99',
          priceCurrency: 'USD',
          availability: 'http://schema.org/InStock',
          itemOffered: {
            '@type': 'Service',
            name: 'Premium Mold Removal'
          },
          serviceLocation: {
            '@type': 'Place',
            name: 'Customer Location',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Los Angeles',
              addressRegion: 'CA',
              addressCountry: 'US'
            }
          }
        }
      ]
    },
    hasFeature: [
      {
        '@type': 'DefinedTerm',
        termCode: 'CERTIFIED',
        name: 'Certified Technicians',
        description: 'All technicians are NADCA certified'
      },
      {
        '@type': 'DefinedTerm',
        termCode: '24HRSERVICE',
        name: '24/7 Emergency Service',
        description: 'Available for urgent mold remediation needs'
      }
    ],
    serviceOutput: {
      '@type': 'DefinedTerm',
      termCode: 'MOLD_FREE_ENVIRONMENT',
      name: 'Mold-Free Environment',
      description: 'Safe and healthy environment free from mold contamination'
    }
  }
};
