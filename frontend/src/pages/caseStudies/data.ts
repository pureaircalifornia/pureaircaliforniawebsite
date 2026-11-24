/** Selected commercial records. Business names are included at the PAC owner’s request.
 * Never publish private contacts, billing data, residential identities or unverified outcomes. */

export interface CaseStudy {
  slug: string;
  /** Business or anonymized property descriptor. */
  client: string;
  title: string;
  year?: string;
  image?: string;
  imageAlt?: string;
  recordBased?: boolean;
  localLinks?: { label: string; path: string }[];
  seoTitle: string;
  seoDescription: string;
  vertical: string;
  location: string;
  /** Headline numbers pulled from the job record. */
  stats: { label: string; value: string }[];
  challenge: string[];
  approach: string[];
  outcome: string[];
  scope: string[];
  relatedService: { label: string; path: string };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'four-seasons-los-angeles-ventilation',
    client: 'Four Seasons Hotel Los Angeles',
    title: 'Guestroom Ventilation Care at Four Seasons Los Angeles',
    seoTitle: 'Four Seasons LA Ventilation Project | Pure Air California',
    seoDescription: 'PAC’s June 2015 service record documents a two-system guestroom ventilation, blower and interior coil cleaning scope at Four Seasons Hotel Los Angeles.',
    vertical: 'Hospitality', location: 'Los Angeles, CA', year: '2015', recordBased: true,
    image: '/images/pac/hotel.webp',
    imageAlt: 'PAC technicians at work; service archive image, not identified as this hotel project',
    stats: [{ label: 'Project year', value: '2015' }, { label: 'Recorded systems', value: '2' }, { label: 'Property type', value: 'Hotel' }],
    challenge: ['The hotel service record identifies two systems serving guestroom spaces.', 'For hospitality estimates, the guestroom systems and accessible components need to be identified individually.'],
    approach: ['The June 16, 2015 invoice records guestroom ventilation cleaning.', 'The recorded scope includes blower cleaning and interior coil cleaning, marked for two systems.'],
    outcome: ['The record documents a specific two-system scope at the Los Angeles hotel.', 'It does not establish work throughout the hotel or a current relationship with the Four Seasons brand.'],
    scope: ['Guestroom ventilation cleaning', 'Blower cleaning', 'Interior coil cleaning', 'Two-system recorded scope'],
    relatedService: { label: 'Hotel and hospitality air care', path: '/industries/hospitality/' },
  },
  {
    slug: 'westchester-ymca-ventilation',
    client: 'Westchester Family YMCA',
    title: 'Ventilation and HVAC Component Care in Westchester',
    seoTitle: 'Westchester YMCA HVAC Project | Pure Air California',
    seoDescription: 'Explore PAC’s April 2015 Westchester Family YMCA service record: ventilation, plenum, blower/HVAC unit and coil cleaning at the named facility.',
    vertical: 'Community / Recreation', location: 'Westchester, Los Angeles, CA', year: '2015', recordBased: true,
    image: '/images/pac/duct-interior-clean-v2.webp',
    imageAlt: 'Metal ventilation duct from the PAC field archive; not identified as this YMCA project',
    stats: [{ label: 'Project year', value: '2015' }, { label: 'Location', value: 'Westchester' }, { label: 'Scope', value: 'Ventilation + HVAC' }],
    challenge: ['The community-facility record lists ventilation and HVAC components together.', 'The scope matters: cleaning a visible grille alone is different from addressing the components identified in this project.'],
    approach: ['The April 29, 2015 invoice identifies selected ventilation and plenum cleaning.', 'The recorded work also includes blower/HVAC unit and coil cleaning.'],
    outcome: ['PAC’s archive documents work at the Westchester Family YMCA on the date shown.', 'No measured air-quality change, energy saving or organization-wide maintenance contract is claimed.'],
    scope: ['Selected ventilation cleaning', 'Plenum cleaning', 'Blower/HVAC unit cleaning', 'Coil cleaning'],
    relatedService: { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning/' },
  },
  {
    slug: 'panera-pasadena-ventilation',
    client: 'Panera Bread — Pasadena café',
    title: 'Ventilation and HVAC Care for a Pasadena Café',
    seoTitle: 'Pasadena Café HVAC Project | Pure Air California',
    seoDescription: 'PAC’s January 2018 Pasadena Panera Bread café record lists ventilation, plenum, blower/furnace box and coil cleaning. Explore the location-specific scope.',
    vertical: 'Restaurant / Café', location: 'Pasadena, CA', year: '2018', recordBased: true,
    image: '/images/pac/duct-interior-clean-v2.webp',
    imageAlt: 'Metal ventilation duct from the PAC field archive; not identified as this café project',
    stats: [{ label: 'Project year', value: '2018' }, { label: 'Location', value: 'Pasadena' }, { label: 'Property type', value: 'Café' }],
    challenge: ['The café project record lists ventilation and several HVAC components.', 'A food-service location can have separate comfort ventilation and cooking exhaust systems; the estimate must identify which is included.'],
    approach: ['The January 1, 2018 invoice records selected ventilation and plenum cleaning.', 'The named components include the blower/furnace box and coils.'],
    outcome: ['The record supports a location-specific ventilation and HVAC cleaning project.', 'The record is not presented as a kitchen hood fire-code inspection, electrostatic filter project or brand-wide endorsement.'],
    scope: ['Selected ventilation cleaning', 'Plenum cleaning', 'Blower/furnace box cleaning', 'Coil cleaning'],
    relatedService: { label: 'Restaurant air care', path: '/industries/restaurants/' },
    localLinks: [{ label: 'Pasadena air care', path: '/locations/pasadena/' }],
  },

  {
    slug: 'apartment-community-42-units',
    client: 'A Los Angeles property management company',
    title: '42-Unit Apartment Community: Full Property Ventilation Clean',
    seoTitle: 'Case Study: 42-Unit Apartment Duct Cleaning',
    seoDescription:
      'Ducts, dryer vents and parking garage exhaust cleaned across a 42-unit Los Angeles apartment community, with before-and-after documentation.',
    vertical: 'Multifamily / Property Management',
    location: 'Los Angeles, CA',
    stats: [
      { label: 'Units serviced', value: '42' },
      { label: 'Systems covered', value: '3' },
      { label: 'Documentation', value: 'Before & after, per area' },
    ],
    challenge: [
      'Forty-two occupied apartments meant the work had to move unit by unit without leaving residents without ventilation or laundry for any length of time.',
      'Three separate systems needed attention — in-unit air ducts, dryer vents, and the parking garage exhaust — each with different access requirements and different risks if left uncleaned.',
      'Dryer vent lint accumulation across a building of this size is a fire-risk issue, not a comfort issue, so it could not be treated as secondary to the duct work.',
      'The property manager needed evidence the work had actually been done in every unit, not a single summary invoice at the end.',
    ],
    approach: [
      'Scheduled the property in blocks so each occupied unit was offline for the shortest possible window and residents kept access to laundry throughout.',
      'Cleaned in-unit supply and return ductwork, including registers, plenums and the blower and furnace assemblies.',
      'Cleared each dryer vent run end to end and confirmed correct termination — long or crushed runs are the common failure point in multifamily buildings.',
      'Cleaned the parking garage exhaust system, which handles vehicle exhaust and is frequently the most neglected system on a residential property.',
      'Photographed every area before and after so the manager received per-area evidence rather than a single completion note.',
    ],
    outcome: [
      'All 42 units completed end to end, covering ductwork, dryer vents and garage exhaust.',
      'The property manager received a documented before-and-after report covering each serviced area, suitable for owner reporting and maintenance records.',
      'Dryer vent lint loading — the property’s most direct fire risk — was cleared building-wide rather than unit by unit on complaint.',
    ],
    scope: [
      'In-unit air duct cleaning × 42',
      'Dryer vent cleaning and termination check × 42',
      'Parking garage exhaust system cleaning',
      'Per-area before-and-after photographic documentation',
    ],
    relatedService: { label: 'Property managers & HOAs', path: '/property-managers' },
  },
{
  slug: "nonprofit-housing-office-hvac",
  "client": "West Hollywood Community Housing Corporation",
  "title": "Four HVAC Systems. One West Hollywood Office.",
  "seoTitle": "WHCHC Office HVAC Cleaning | West Hollywood",
  "seoDescription": "PAC’s April 2026 project record for West Hollywood Community Housing Corporation: four HVAC systems across a 3,137 sq ft office, with weekend scheduling.",
  "vertical": "Commercial Office / Nonprofit",
  "location": "West Hollywood, CA",
  "year": "2026",
  "image": "/images/pac/hvac.webp",
  "imageAlt": "HVAC service equipment; illustrative service photograph",
  "recordBased": true,
  "stats": [
    {
      "label": "Office area",
      "value": "3,137 sq ft"
    },
    {
      "label": "HVAC units",
      "value": "4"
    },
    {
      "label": "Scheduled window",
      "value": "Weekend"
    }
  ],
  "challenge": [
    "The first-floor office scope covered four HVAC units serving approximately 3,137 square feet.",
    "A multi-unit office needs a component-by-component scope so each system is accounted for."
  ],
  "approach": [
    "The project record scheduled work for April 11–12, 2026, with morning access.",
    "The invoice specifies cleaning, brushing and vacuuming the ventilation system, including four plenums.",
    "The listed scope includes four blower and furnace assemblies, interior and exterior coil cleaning, and filter replacement."
  ],
  "outcome": [
    "The April 2026 invoice records a four-system office project with the components and work window identified.",
    "The scope brings the ventilation pathway, HVAC components and filter replacement into one clearly defined office project."
  ],
  "scope": [
    "Ventilation-system cleaning across the first-floor office",
    "Plenum access and service × 4",
    "Blower and furnace box cleaning × 4",
    "Coil cleaning × 4",
    "20 × 20 × 1 filter replacement × 4"
  ],
  "relatedService": {
    "label": "Commercial air duct cleaning",
    "path": "/services/commercial-air-duct-cleaning/"
  },
  "localLinks": [
    {
      "label": "West Hollywood air duct cleaning",
      "path": "/locations/west-hollywood/"
    },
    { "label": "HVAC system cleaning", "path": "/services/hvac-system-cleaning/" },
    { "label": "Commercial electrostatic filters", "path": "/services/commercial-electrostatic-filter/" },
    { "label": "Residential air duct cleaning", "path": "/services/residential-air-duct-cleaning/" },
    { "label": "Commercial dryer vent cleaning", "path": "/services/commercial-dryer-vent-cleaning/"
    }
  ]
},
{
  slug: "soulcycle-westside-dryer-vents",
  "client": "SoulCycle — Brentwood & Culver City studios",
  "title": "Dryer Vent Care for Two Westside SoulCycle Studios",
  "seoTitle": "SoulCycle Dryer Vent Projects | Brentwood & Culver City",
  "seoDescription": "Past PAC dryer exhaust cleaning for SoulCycle studios in Culver City (2018) and Brentwood, Los Angeles (2019). See the location-specific service scope.",
  "vertical": "Fitness / Commercial Laundry",
  "location": "Brentwood & Culver City, CA",
  "year": "2018–2019",
  "image": "/images/pac/dryer.webp",
  "imageAlt": "Dryer exhaust connection with lint; illustrative service photograph",
  "recordBased": true,
  "stats": [
    {
      "label": "Studio locations",
      "value": "2"
    },
    {
      "label": "Recorded service",
      "value": "Dryer exhaust"
    },
    {
      "label": "Project years",
      "value": "2018–2019"
    }
  ],
  "challenge": [
    "Each studio had a clothes-dryer exhaust duct identified for cleaning. Dryer exhaust is separate from the HVAC system that heats and cools the studio.",
    "The two locations had separate service records, making the location and specific equipment important to the scope."
  ],
  "approach": [
    "The Culver City invoice records one dryer evacuation duct, with work dated July 13, 2018.",
    "The Brentwood invoice, dated January 21, 2019, records one dryer evacuation duct.",
    "The service focused on the laundry exhaust at each studio. Heating and cooling ductwork was outside this project scope."
  ],
  "outcome": [
    "The records establish past dryer-vent work at the Culver City and Brentwood studios.",
    "For a similar studio, start by identifying each dryer exhaust run separately from the heating and cooling system."
  ],
  "scope": [
    "Clothes-dryer exhaust duct cleaning: Culver City studio × 1",
    "Clothes-dryer exhaust duct cleaning: Brentwood studio × 1"
  ],
  "relatedService": {
    "label": "Commercial dryer vent cleaning",
    "path": "/services/commercial-dryer-vent-cleaning/"
  },
  "localLinks": [
    {
      "label": "Brentwood air care",
      "path": "/locations/brentwood/"
    },
    {
      "label": "Culver City air care",
      "path": "/locations/culver-city/"
    }
  ]
},
{
  slug: "taco-bell-canoga-park-hvac",
  "client": "Taco Bell location operated by JJC Foods LLC",
  "title": "Ventilation & HVAC Care for a Canoga Park Restaurant",
  "seoTitle": "Taco Bell HVAC Project | Canoga Park",
  "seoDescription": "A November 2024 PAC project record for a Taco Bell location in Canoga Park: ventilation ducts, plenum access, blower and coil cleaning.",
  "vertical": "Restaurant / HVAC",
  "location": "Canoga Park, CA",
  "year": "2024",
  "image": "/images/pac/commercial.webp",
  "imageAlt": "Commercial ventilation equipment; illustrative service photograph",
  "recordBased": true,
  "stats": [
    {
      "label": "Restaurant location",
      "value": "Canoga Park"
    },
    {
      "label": "Project year",
      "value": "2024"
    },
    {
      "label": "Service",
      "value": "Ducts & HVAC"
    }
  ],
  "challenge": [
    "The selected scope for this restaurant included ventilation ductwork and the HVAC components behind it.",
    "The project covered a single Canoga Park location operated by JJC Foods LLC."
  ],
  "approach": [
    "The November 5, 2024 invoice identifies an early-morning work window.",
    "The selected work includes cleaning, brushing and vacuuming the ventilation system, plus plenum access and treatment.",
    "Blower and furnace box cleaning and interior and exterior coil cleaning are also selected in the record."
  ],
  "outcome": [
    "The invoice documents the ventilation and HVAC scope for this single restaurant location operated by JJC Foods LLC.",
    "Ductwork, the blower assembly and coils were listed together so the project scope addressed several parts of the ventilation system."
  ],
  "scope": [
    "Ventilation-system cleaning, brushing and vacuuming",
    "Plenum access and service",
    "Blower and furnace box cleaning",
    "Interior and exterior coil cleaning"
  ],
  "relatedService": {
    "label": "Restaurant ventilation services",
    "path": "/industries/restaurants/"
  },
  "localLinks": [
    {
      "label": "Canoga Park air duct cleaning",
      "path": "/locations/canoga-park/"
    }
  ]
},
{
  slug: "bassett-torrance-showroom",
  "client": "Bassett Furniture — Torrance showroom",
  "title": "System-by-System Air Care for a Torrance Showroom",
  "seoTitle": "Bassett Furniture HVAC Project | Torrance",
  "seoDescription": "PAC’s 2014 Bassett Furniture showroom project in Torrance covered ventilation-system, plenum, blower and coil cleaning. Explore the recorded scope.",
  "vertical": "Retail / Showroom",
  "location": "Torrance, CA",
  "year": "2014",
  "image": "/images/pac/office.webp",
  "imageAlt": "Open commercial interior with ventilation; illustrative service photograph",
  "recordBased": true,
  "stats": [
    {
      "label": "Property",
      "value": "Showroom"
    },
    {
      "label": "Location",
      "value": "Torrance"
    },
    {
      "label": "Project year",
      "value": "2014"
    }
  ],
  "challenge": [
    "The showroom project called for a ventilation-system scope that included both ductwork and HVAC components."
  ],
  "approach": [
    "The 2014 showroom scope addressed the ventilation system alongside the blower and coil assemblies.",
    "Selected work included complete cleaning, brushing and vacuuming of the ventilation system, with plenum access and treatment.",
    "The scope also selected blower and furnace box cleaning and coil cleaning inside and out."
  ],
  "outcome": [
    "The project records identify whole-system work for the Torrance Bassett Furniture showroom.",
    "For a retail property, identifying the individual systems and components makes the proposed work easier to review."
  ],
  "scope": [
    "Ventilation-system cleaning",
    "Plenum access and service",
    "Blower and furnace box cleaning",
    "Interior and exterior coil cleaning"
  ],
  "relatedService": {
    "label": "Retail air duct cleaning",
    "path": "/industries/retail/"
  },
  "localLinks": [
    {
      "label": "Greater Los Angeles service areas",
      "path": "/locations/"
    }
  ]
},
];

export const getCaseStudy = (slug?: string) => caseStudies.find((c) => c.slug === slug);
