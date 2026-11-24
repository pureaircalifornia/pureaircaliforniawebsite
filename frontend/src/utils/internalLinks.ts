import { locationData } from '@/pages/locations/data';

/**
 * Contextual internal linking helpers that distribute PageRank and topical
 * relevance cleanly across:
 *   Homepage <-> Core LA Services <-> /locations/los-angeles/ <->
 *   54 LA Neighborhoods <-> Industries & Case Studies <-> Blog Guides <->
 *   /pricing/ & /quote/.
 *
 * All rotations are deterministic by index/seed so builds stay stable and
 * avoid repetitive footprints across sibling city/industry pages.
 */

export interface LinkItem {
  label: string;
  path: string;
  /** Optional one-line context shown under the link. */
  note?: string;
}

const normalizePath = (value: string): string => {
  const clean = value.split(/[?#]/)[0].replace(/\/+$/, '');
  return clean || '/';
};

/**
 * High-authority Los Angeles pillar & conversion hubs for cross-cluster linking.
 */
export const CORE_LA_HUB_LINKS: LinkItem[] = [
  { label: 'Los Angeles air duct & dryer vent guide', path: '/locations/los-angeles', note: 'Local coverage, micro-climates & access planning' },
  { label: 'Home air duct & dryer vent services', path: '/home-services', note: 'Residential cleaning options for LA homes & condos' },
  { label: 'Los Angeles pricing guide', path: '/pricing', note: 'Starting at $299 air ducts · $149 dryer vents' },
  { label: 'Indoor air care checklist', path: '/air-quality-calculator', note: 'Check whether an HVAC or dryer vent inspection makes sense' },
  { label: 'Indoor air quality & HVAC journal', path: '/blog', note: 'Practical LA guides on costs, wildfire smoke & safety' },
  { label: 'Request a free written estimate', path: '/quote', note: 'Property-specific scope before any work starts' },
];

/**
 * Cities near `slug`, drawn first from the same LA region then rotated across
 * neighboring regions so all 54 neighborhood pages receive balanced link equity.
 */
export const getNearbyLocations = (slug: string, count = 6): LinkItem[] => {
  const self = locationData.find((l) => l.slug === slug);
  if (!self) return [];

  const sameRegion = locationData.filter(
    (l) => l.slug !== slug && (l as { region?: string }).region === (self as { region?: string }).region
  );
  const others = locationData.filter(
    (l) => l.slug !== slug && (l as { region?: string }).region !== (self as { region?: string }).region
  );

  const selfIndex = locationData.findIndex((l) => l.slug === slug);
  const rotate = <T,>(arr: T[], by: number) =>
    arr.length ? arr.slice(by % arr.length).concat(arr.slice(0, by % arr.length)) : arr;

  const pool = [...rotate(sameRegion, selfIndex), ...rotate(others, selfIndex)];

  return pool.slice(0, count).map((l) => ({
    label: l.name,
    path: `/locations/${l.slug}`,
  }));
};

/** Core and rotating specialized service links phrased for a specific city page. */
export const getServiceLinksForCity = (cityName: string, slug?: string): LinkItem[] => {
  const core: LinkItem[] = [
    {
      label: `Residential air duct cleaning in ${cityName}`,
      path: '/services/residential-air-duct-cleaning',
      note: 'Starting at $299 for eligible residential scopes',
    },
    {
      label: `Residential dryer vent cleaning in ${cityName}`,
      path: '/services/residential-dryer-vent-cleaning',
      note: 'Starting at $149 for eligible residential scopes',
    },
    {
      label: `Commercial air duct cleaning in ${cityName}`,
      path: '/services/commercial-air-duct-cleaning',
    },
    {
      label: `HVAC system cleaning in ${cityName}`,
      path: '/services/hvac-system-cleaning',
    },
  ];

  // Rotate specialized services deterministically across the 54 city pages so
  // every service page receives steady contextual equity without boilerplate.
  const rotating: LinkItem[] = [
    {
      label: `Wildfire smoke & hillside duct assessment in ${cityName}`,
      path: '/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles',
    },
    {
      label: `Commercial & HOA duct & dryer vent care in ${cityName}`,
      path: '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles',
    },
    {
      label: `Commercial dryer vent cleaning in ${cityName}`,
      path: '/services/commercial-dryer-vent-cleaning',
    },
    {
      label: `Air duct sanitizing assessment in ${cityName}`,
      path: '/services/air-duct-sanitizing',
    },
    {
      label: `Residential electrostatic air filters in ${cityName}`,
      path: '/services/residential-electrostatic-filter',
    },
    {
      label: `Commercial electrostatic air filters in ${cityName}`,
      path: '/services/commercial-electrostatic-filter',
    },
    {
      label: `Scheduled dryer vent maintenance in ${cityName}`,
      path: '/services/dryer-vent-maintenance-program',
    },
    {
      label: `Laundromat dryer vent cleaning in ${cityName}`,
      path: '/services/laundromat-dryer-vent-cleaning',
    },
  ];

  const index = slug ? locationData.findIndex((l) => l.slug === slug) : -1;
  const start = index >= 0 ? index % rotating.length : 0;
  const picked = [...rotating.slice(start), ...rotating.slice(0, start)].slice(0, 3);

  return [
    ...core,
    ...picked,
    { label: 'Greater Los Angeles air duct service guide', path: '/locations/los-angeles' },
    { label: `Air duct & dryer vent pricing for ${cityName}`, path: '/pricing' },
    { label: `Request a free estimate in ${cityName}`, path: '/quote' },
  ];
};

/**
 * Service-area links for an industry or commercial page, always anchored by
 * the Los Angeles pillar hub plus rotated neighborhood hubs.
 */
export const getAreaLinksForIndustry = (path: string, count = 8): LinkItem[] => {
  const seed = path.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const cities = locationData.filter((l) => l.slug !== 'los-angeles');
  const start = cities.length ? seed % cities.length : 0;
  const rotated = [...cities.slice(start), ...cities.slice(0, start)];
  return [
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    ...rotated.slice(0, Math.max(0, count - 1)).map((l) => ({
      label: l.name,
      path: `/locations/${l.slug}`,
    })),
  ];
};

export const getIndustryLinksForCity = (slug: string, count = 2): LinkItem[] => {
  const industries: LinkItem[] = [
    { label: 'Restaurants and commercial kitchens', path: '/industries/restaurants' },
    { label: 'Hotels and hospitality', path: '/industries/hospitality' },
    { label: 'Healthcare and medical offices', path: '/industries/healthcare' },
    { label: 'Schools and education', path: '/industries/education' },
    { label: 'Retail spaces', path: '/industries/retail' },
    { label: 'Manufacturing and industrial', path: '/industries/manufacturing' },
    { label: 'Offices and commercial real estate', path: '/industries/commercial-real-estate' },
    { label: 'Property managers and HOAs', path: '/property-managers' },
  ];
  const index = locationData.findIndex((l) => l.slug === slug);
  if (index < 0) return industries.slice(0, count);
  const start = index % industries.length;
  return [...industries.slice(start), ...industries.slice(0, start)].slice(0, count);
};

/**
 * Related services, guides, and hubs for ALL 12 service pages, keyed by
 * normalized path without trailing slash.
 */
export const RELATED_SERVICES: Record<string, LinkItem[]> = {
  '/services/residential-air-duct-cleaning': [
    { label: 'Home services overview', path: '/home-services' },
    { label: 'Residential dryer vent cleaning', path: '/services/residential-dryer-vent-cleaning' },
    { label: 'HVAC system cleaning', path: '/services/hvac-system-cleaning' },
    { label: 'Wildfire smoke & hillside duct assessment', path: '/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles' },
    { label: 'Air duct sanitizing assessment', path: '/services/air-duct-sanitizing' },
    { label: 'Los Angeles air duct cleaning guide', path: '/locations/los-angeles' },
    { label: 'Air duct cleaning cost in Los Angeles (from $299)', path: '/pricing' },
    { label: 'Indoor air care checklist', path: '/air-quality-calculator' },
    { label: 'Air duct cleaning FAQ', path: '/blog/air-duct-cleaning-faq' },
    { label: 'Is air duct cleaning worth it?', path: '/blog/is-air-duct-cleaning-worth-it' },
    { label: 'How to avoid vague duct cleaning quotes in LA', path: '/blog/avoid-air-duct-cleaning-scams-los-angeles' },
    { label: '7 questions before booking duct cleaning in LA', path: '/blog/signs-los-angeles-air-ducts-need-cleaning-2026' },
  ],
  '/services/commercial-air-duct-cleaning': [
    { label: 'Commercial & HOA air duct & dryer vent cleaning', path: '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles' },
    { label: 'Commercial dryer vent cleaning', path: '/services/commercial-dryer-vent-cleaning' },
    { label: 'HVAC system cleaning', path: '/services/hvac-system-cleaning' },
    { label: 'Commercial electrostatic air filters', path: '/services/commercial-electrostatic-filter' },
    { label: 'Property managers and HOAs', path: '/property-managers' },
    { label: 'Commercial industries we serve', path: '/industries' },
    { label: 'Los Angeles commercial service guide', path: '/locations/los-angeles' },
    { label: 'Commercial case studies', path: '/case-studies' },
    { label: 'HVAC & trade referral partnerships', path: '/partners' },
    { label: 'Commercial air duct cleaning guide for LA businesses', path: '/blog/commercial-air-duct-cleaning-los-angeles-businesses' },
    { label: 'Commercial indoor air quality guide', path: '/blog/commercial-indoor-air-quality-guide' },
    { label: 'Request a commercial estimate', path: '/quote' },
  ],
  '/services/residential-dryer-vent-cleaning': [
    { label: 'Home services overview', path: '/home-services' },
    { label: 'Dryer vent maintenance program', path: '/services/dryer-vent-maintenance-program' },
    { label: 'Residential air duct cleaning', path: '/services/residential-air-duct-cleaning' },
    { label: 'Los Angeles dryer vent & pricing guide (from $149)', path: '/pricing' },
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    { label: 'Indoor air care checklist', path: '/air-quality-calculator' },
    { label: 'Dryer vent safety checklist for homeowners', path: '/blog/dryer-vent-safety-guide' },
    { label: 'Air duct cleaning FAQ', path: '/blog/air-duct-cleaning-faq' },
    { label: 'Request a free estimate', path: '/quote' },
  ],
  '/services/commercial-dryer-vent-cleaning': [
    { label: 'Commercial & HOA air duct & dryer vent cleaning', path: '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles' },
    { label: 'Laundromat dryer vent cleaning', path: '/services/laundromat-dryer-vent-cleaning' },
    { label: 'Dryer vent maintenance program', path: '/services/dryer-vent-maintenance-program' },
    { label: 'Property managers and HOAs', path: '/property-managers' },
    { label: 'Hotel and hospitality ventilation', path: '/industries/hospitality' },
    { label: 'SoulCycle Westside dryer vent projects', path: '/case-studies/soulcycle-westside-dryer-vents' },
    { label: '42-unit apartment community case study', path: '/case-studies/apartment-community-42-units' },
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    { label: 'Laundromat dryer vent cleaning planning guide', path: '/blog/laundromat-dryer-vent-cleaning-safety' },
    { label: 'Request a commercial estimate', path: '/quote' },
  ],
  '/services/hvac-system-cleaning': [
    { label: 'Residential air duct cleaning', path: '/services/residential-air-duct-cleaning' },
    { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' },
    { label: 'Residential electrostatic air filters', path: '/services/residential-electrostatic-filter' },
    { label: 'Air duct sanitizing assessment', path: '/services/air-duct-sanitizing' },
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    { label: 'Pricing & scope guide', path: '/pricing' },
    { label: 'Indoor air care checklist', path: '/air-quality-calculator' },
    { label: 'HVAC maintenance vs. air duct cleaning', path: '/blog/importance-of-regular-air-duct-cleaning' },
    { label: 'Westchester YMCA HVAC project record', path: '/case-studies/westchester-ymca-ventilation' },
    { label: 'Request a free estimate', path: '/quote' },
  ],
  '/services/dryer-vent-maintenance-program': [
    { label: 'Residential dryer vent cleaning', path: '/services/residential-dryer-vent-cleaning' },
    { label: 'Commercial dryer vent cleaning', path: '/services/commercial-dryer-vent-cleaning' },
    { label: 'Commercial & HOA air duct & dryer vent cleaning', path: '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles' },
    { label: 'Laundromat dryer vent cleaning', path: '/services/laundromat-dryer-vent-cleaning' },
    { label: 'Property managers and HOAs', path: '/property-managers' },
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    { label: 'Pricing & estimates', path: '/pricing' },
    { label: 'Dryer vent safety guide', path: '/blog/dryer-vent-safety-guide' },
    { label: 'Hotel ventilation and laundry exhaust guide', path: '/blog/hotel-air-quality-guest-satisfaction' },
  ],
  '/services/residential-electrostatic-filter': [
    { label: 'Home services overview', path: '/home-services' },
    { label: 'Commercial electrostatic air filters', path: '/services/commercial-electrostatic-filter' },
    { label: 'HVAC system cleaning', path: '/services/hvac-system-cleaning' },
    { label: 'Residential air duct cleaning', path: '/services/residential-air-duct-cleaning' },
    { label: 'Indoor air quality: what to know', path: '/health-benefits' },
    { label: 'Indoor air care checklist', path: '/air-quality-calculator' },
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    { label: 'Air duct cleaning & allergies: what to know', path: '/blog/clean-air-ducts-allergy-relief' },
    { label: 'Request a free estimate', path: '/quote' },
  ],
  '/services/commercial-electrostatic-filter': [
    { label: 'Residential electrostatic air filters', path: '/services/residential-electrostatic-filter' },
    { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' },
    { label: 'HVAC system cleaning', path: '/services/hvac-system-cleaning' },
    { label: 'Retail store air duct cleaning', path: '/industries/retail' },
    { label: 'School and campus ventilation', path: '/industries/education' },
    { label: 'Commercial real estate & offices', path: '/industries/commercial-real-estate' },
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    { label: 'Commercial indoor air quality guide', path: '/blog/commercial-indoor-air-quality-guide' },
    { label: 'Request a commercial estimate', path: '/quote' },
  ],
  '/services/air-duct-sanitizing': [
    { label: 'Residential air duct cleaning', path: '/services/residential-air-duct-cleaning' },
    { label: 'Wildfire smoke & hillside duct assessment', path: '/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles' },
    { label: 'HVAC system cleaning', path: '/services/hvac-system-cleaning' },
    { label: 'Indoor air quality: evidence and limits', path: '/health-benefits' },
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    { label: 'Pricing & written scope guide', path: '/pricing' },
    { label: 'Air duct cleaning and health: evidence & limits', path: '/blog/health-benefits-air-duct-cleaning' },
    { label: 'Air duct cleaning FAQ', path: '/blog/air-duct-cleaning-faq' },
    { label: 'Request a scope review', path: '/quote' },
  ],
  '/services/laundromat-dryer-vent-cleaning': [
    { label: 'Commercial dryer vent cleaning', path: '/services/commercial-dryer-vent-cleaning' },
    { label: 'Dryer vent maintenance program', path: '/services/dryer-vent-maintenance-program' },
    { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' },
    { label: 'Property managers and HOAs', path: '/property-managers' },
    { label: 'SoulCycle Westside dryer exhaust projects', path: '/case-studies/soulcycle-westside-dryer-vents' },
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    { label: 'Laundromat dryer vent cleaning planning guide', path: '/blog/laundromat-dryer-vent-cleaning-safety' },
    { label: 'Request a commercial estimate', path: '/quote' },
  ],
  '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles': [
    { label: 'Property managers and HOAs', path: '/property-managers' },
    { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' },
    { label: 'Commercial dryer vent cleaning', path: '/services/commercial-dryer-vent-cleaning' },
    { label: 'Dryer vent maintenance program', path: '/services/dryer-vent-maintenance-program' },
    { label: '42-unit apartment community case study', path: '/case-studies/apartment-community-42-units' },
    { label: 'WHCHC West Hollywood office HVAC project', path: '/case-studies/nonprofit-housing-office-hvac' },
    { label: 'Offices & commercial real estate', path: '/industries/commercial-real-estate' },
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    { label: 'Commercial duct cleaning planning in LA', path: '/blog/commercial-air-duct-cleaning-los-angeles-businesses' },
    { label: 'Request an HOA or commercial proposal', path: '/quote' },
  ],
  '/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles': [
    { label: 'Residential air duct cleaning', path: '/services/residential-air-duct-cleaning' },
    { label: 'Home services overview', path: '/home-services' },
    { label: 'HVAC system cleaning', path: '/services/hvac-system-cleaning' },
    { label: 'Air duct sanitizing assessment', path: '/services/air-duct-sanitizing' },
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    { label: 'After wildfire smoke: planning HVAC assessment in LA', path: '/blog/air-duct-cleaning-after-wildfire-los-angeles' },
    { label: 'Air duct cleaning cost in Los Angeles', path: '/blog/air-duct-cleaning-cost-los-angeles' },
    { label: 'Indoor air care checklist', path: '/air-quality-calculator' },
    { label: 'Pricing & scope guide', path: '/pricing' },
    { label: 'Request a hillside duct assessment', path: '/quote' },
  ],
};

/** Helper supporting either with or without trailing slash. */
export const getRelatedServices = (path: string): LinkItem[] =>
  RELATED_SERVICES[normalizePath(path)] || CORE_LA_HUB_LINKS;

/** Related content for each industry vertical & B2B hub. */
export const RELATED_BY_INDUSTRY: Record<string, LinkItem[]> = {
  '/property-managers': [
    { label: 'Commercial & HOA air duct & dryer vent cleaning', path: '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles' },
    { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' },
    { label: 'Commercial dryer vent cleaning', path: '/services/commercial-dryer-vent-cleaning' },
    { label: 'Dryer vent maintenance program', path: '/services/dryer-vent-maintenance-program' },
    { label: 'HVAC system cleaning', path: '/services/hvac-system-cleaning' },
    { label: '42-unit apartment community case study', path: '/case-studies/apartment-community-42-units' },
    { label: 'WHCHC West Hollywood office HVAC project', path: '/case-studies/nonprofit-housing-office-hvac' },
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    { label: 'HVAC & trade referral partnerships', path: '/partners' },
  ],
  '/industries/healthcare': [
    { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' },
    { label: 'HVAC system cleaning', path: '/services/hvac-system-cleaning' },
    { label: 'Commercial electrostatic air filters', path: '/services/commercial-electrostatic-filter' },
    { label: 'Healthcare duct cleaning planning guide', path: '/blog/hospital-healthcare-air-duct-cleaning' },
    { label: 'Los Angeles commercial service guide', path: '/locations/los-angeles' },
    { label: 'Commercial case studies', path: '/case-studies' },
    { label: 'All industries we serve', path: '/industries' },
    { label: 'Education facilities', path: '/industries/education' },
  ],
  '/industries/hospitality': [
    { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' },
    { label: 'Commercial dryer vent cleaning', path: '/services/commercial-dryer-vent-cleaning' },
    { label: 'Dryer vent maintenance program', path: '/services/dryer-vent-maintenance-program' },
    { label: 'Four Seasons Hotel LA ventilation record', path: '/case-studies/four-seasons-los-angeles-ventilation' },
    { label: 'Hotel ventilation & laundry exhaust guide', path: '/blog/hotel-air-quality-guest-satisfaction' },
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    { label: 'All industries we serve', path: '/industries' },
    { label: 'Restaurants and food service', path: '/industries/restaurants' },
  ],
  '/industries/restaurants': [
    { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' },
    { label: 'HVAC system cleaning', path: '/services/hvac-system-cleaning' },
    { label: 'Panera Bread Pasadena HVAC record', path: '/case-studies/panera-pasadena-ventilation' },
    { label: 'Taco Bell Canoga Park HVAC record', path: '/case-studies/taco-bell-canoga-park-hvac' },
    { label: 'Restaurant HVAC vs. kitchen exhaust guide', path: '/blog/restaurant-kitchen-air-duct-cleaning' },
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    { label: 'All industries we serve', path: '/industries' },
    { label: 'Hotels and hospitality', path: '/industries/hospitality' },
  ],
  '/industries/education': [
    { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' },
    { label: 'HVAC system cleaning', path: '/services/hvac-system-cleaning' },
    { label: 'Westchester Family YMCA HVAC record', path: '/case-studies/westchester-ymca-ventilation' },
    { label: 'Indoor air quality: what to know', path: '/health-benefits' },
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    { label: 'All industries we serve', path: '/industries' },
    { label: 'Healthcare facilities', path: '/industries/healthcare' },
  ],
  '/industries/retail': [
    { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' },
    { label: 'Commercial electrostatic air filters', path: '/services/commercial-electrostatic-filter' },
    { label: 'Bassett Furniture Torrance showroom record', path: '/case-studies/bassett-torrance-showroom' },
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    { label: 'All industries we serve', path: '/industries' },
    { label: 'Commercial real estate', path: '/industries/commercial-real-estate' },
  ],
  '/industries/manufacturing': [
    { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' },
    { label: 'HVAC system cleaning', path: '/services/hvac-system-cleaning' },
    { label: 'Industrial duct cleaning planning guide', path: '/blog/industrial-air-duct-cleaning-safety-efficiency' },
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    { label: 'All industries we serve', path: '/industries' },
    { label: 'Retail spaces', path: '/industries/retail' },
  ],
  '/industries/commercial-real-estate': [
    { label: 'Property managers and HOAs', path: '/property-managers' },
    { label: 'Commercial & HOA air duct & dryer vent cleaning', path: '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles' },
    { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' },
    { label: 'WHCHC West Hollywood office HVAC project', path: '/case-studies/nonprofit-housing-office-hvac' },
    { label: '42-unit apartment community case study', path: '/case-studies/apartment-community-42-units' },
    { label: 'Commercial air duct cleaning guide for LA businesses', path: '/blog/commercial-air-duct-cleaning-los-angeles-businesses' },
    { label: 'Commercial indoor air quality guide', path: '/blog/commercial-indoor-air-quality-guide' },
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    { label: 'HVAC & trade referral partnerships', path: '/partners' },
  ],
};

/**
 * Related pages for a blog post, chosen by category so every editorial guide
 * funnels readers directly into matching LA services, local hubs, and `/quote/`.
 */
export const RELATED_BY_BLOG_CATEGORY: Record<string, LinkItem[]> = {
  Commercial: [
    { label: 'Commercial air duct cleaning in Los Angeles', path: '/services/commercial-air-duct-cleaning' },
    { label: 'Commercial & HOA duct & dryer vent care', path: '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles' },
    { label: 'Property managers and HOAs', path: '/property-managers' },
    { label: 'Commercial industries we serve', path: '/industries' },
    { label: 'Commercial case studies', path: '/case-studies' },
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    { label: 'Request a commercial estimate', path: '/quote' },
  ],
  Safety: [
    { label: 'Residential dryer vent cleaning (from $149)', path: '/services/residential-dryer-vent-cleaning' },
    { label: 'Dryer vent maintenance program', path: '/services/dryer-vent-maintenance-program' },
    { label: 'Laundromat dryer vent cleaning', path: '/services/laundromat-dryer-vent-cleaning' },
    { label: 'Wildfire smoke & hillside duct assessment', path: '/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles' },
    { label: 'Los Angeles pricing guide', path: '/pricing' },
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    { label: 'Request a free estimate', path: '/quote' },
  ],
  Health: [
    { label: 'Air duct cleaning & indoor air quality: what to know', path: '/health-benefits' },
    { label: 'Residential air duct cleaning in Los Angeles', path: '/services/residential-air-duct-cleaning' },
    { label: 'Wildfire smoke & hillside duct assessment', path: '/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles' },
    { label: 'Residential electrostatic air filters', path: '/services/residential-electrostatic-filter' },
    { label: 'Indoor air care checklist', path: '/air-quality-calculator' },
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    { label: 'Request a free estimate', path: '/quote' },
  ],
  FAQ: [
    { label: 'Air duct cleaning cost in Los Angeles (from $299)', path: '/pricing' },
    { label: 'Residential air duct cleaning', path: '/services/residential-air-duct-cleaning' },
    { label: 'Home services overview', path: '/home-services' },
    { label: 'Indoor air care checklist', path: '/air-quality-calculator' },
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    { label: 'All LA indoor air quality guides', path: '/blog' },
    { label: 'Request a free written estimate', path: '/quote' },
  ],
  Pricing: [
    { label: 'Air duct & dryer vent pricing in Los Angeles', path: '/pricing' },
    { label: 'Residential air duct cleaning (from $299)', path: '/services/residential-air-duct-cleaning' },
    { label: 'Residential dryer vent cleaning (from $149)', path: '/services/residential-dryer-vent-cleaning' },
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    { label: 'Request a property-specific estimate', path: '/quote' },
  ],
  'Air Quality': [
    { label: 'Wildfire smoke & hillside duct assessment', path: '/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles' },
    { label: 'Residential air duct cleaning', path: '/services/residential-air-duct-cleaning' },
    { label: 'Indoor air quality: evidence and limits', path: '/health-benefits' },
    { label: 'Indoor air care checklist', path: '/air-quality-calculator' },
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    { label: 'Request a free estimate', path: '/quote' },
  ],
  Residential: [
    { label: 'Home air duct & dryer vent services', path: '/home-services' },
    { label: 'Residential air duct cleaning (from $299)', path: '/services/residential-air-duct-cleaning' },
    { label: 'Residential dryer vent cleaning (from $149)', path: '/services/residential-dryer-vent-cleaning' },
    { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
    { label: 'Los Angeles pricing guide', path: '/pricing' },
    { label: 'Request a free estimate', path: '/quote' },
  ],
  Maintenance: [
    { label: 'HVAC system cleaning', path: '/services/hvac-system-cleaning' },
    { label: 'Residential air duct cleaning', path: '/services/residential-air-duct-cleaning' },
    { label: 'Dryer vent maintenance program', path: '/services/dryer-vent-maintenance-program' },
    { label: 'Indoor air care checklist', path: '/air-quality-calculator' },
    { label: 'Los Angeles pricing guide', path: '/pricing' },
    { label: 'Request a free estimate', path: '/quote' },
  ],
  default: [
    { label: 'Residential air duct cleaning in Los Angeles', path: '/services/residential-air-duct-cleaning' },
    { label: 'Home services overview', path: '/home-services' },
    { label: 'Los Angeles air duct cleaning guide', path: '/locations/los-angeles' },
    { label: 'Air duct cleaning cost in Los Angeles', path: '/pricing' },
    { label: 'All service areas across LA County', path: '/locations' },
    { label: 'All LA HVAC & air quality guides', path: '/blog' },
    { label: 'Request a free estimate', path: '/quote' },
  ],
};

/**
 * High-demand Greater Los Angeles service areas for linking from core service
 * and authority pages back into the local neighborhood cluster.
 */
export const LA_AREA_LINKS: LinkItem[] = [
  { label: 'Los Angeles service guide', path: '/locations/los-angeles' },
  { label: 'Beverly Hills', path: '/locations/beverly-hills' },
  { label: 'Santa Monica', path: '/locations/santa-monica' },
  { label: 'Brentwood', path: '/locations/brentwood' },
  { label: 'Culver City', path: '/locations/culver-city' },
  { label: 'West Hollywood', path: '/locations/west-hollywood' },
  { label: 'Pasadena', path: '/locations/pasadena' },
  { label: 'Glendale', path: '/locations/glendale' },
  { label: 'Burbank', path: '/locations/burbank' },
  { label: 'Sherman Oaks', path: '/locations/sherman-oaks' },
  { label: 'Studio City', path: '/locations/studio-city' },
  { label: 'Woodland Hills', path: '/locations/woodland-hills' },
  { label: 'All Greater Los Angeles areas', path: '/locations' },
];

/**
 * Evergreen blog guides rotated deterministically across the 54 city pages so
 * every LA guide receives steady contextual inbound links.
 */
export const getBlogLinksForCity = (slug: string, count = 3): LinkItem[] => {
  const index = locationData.findIndex((l) => l.slug === slug);
  if (index < 0 || !CITY_LINKABLE_POSTS.length) return [];

  const start = index % CITY_LINKABLE_POSTS.length;
  const rotated = [
    ...CITY_LINKABLE_POSTS.slice(start),
    ...CITY_LINKABLE_POSTS.slice(0, start),
  ];
  return rotated.slice(0, count);
};

const CITY_LINKABLE_POSTS: LinkItem[] = [
  { label: 'Air duct cleaning cost in Los Angeles: quote guide', path: '/blog/air-duct-cleaning-cost-los-angeles' },
  { label: 'After wildfire smoke: planning HVAC assessment in LA', path: '/blog/air-duct-cleaning-after-wildfire-los-angeles' },
  { label: 'Air duct cleaning FAQ: scope, timing & cost', path: '/blog/air-duct-cleaning-faq' },
  { label: 'Is air duct cleaning worth it? Decide from the scope', path: '/blog/is-air-duct-cleaning-worth-it' },
  { label: 'Los Angeles duct cleaning: 7 questions before booking', path: '/blog/signs-los-angeles-air-ducts-need-cleaning-2026' },
  { label: 'Choosing a duct cleaner in LA: avoid vague quotes', path: '/blog/avoid-air-duct-cleaning-scams-los-angeles' },
  { label: '5 reasons to have your air ducts inspected', path: '/blog/signs-air-ducts-need-cleaning' },
  { label: 'Dryer vent safety: a homeowner checklist', path: '/blog/dryer-vent-safety-guide' },
  { label: 'Home air duct cleaning in Los Angeles: planning guide', path: '/blog/residential-air-duct-cleaning-los-angeles' },
  { label: 'HVAC maintenance vs. air duct cleaning', path: '/blog/importance-of-regular-air-duct-cleaning' },
  { label: 'Air duct cleaning and health: evidence and limits', path: '/blog/health-benefits-air-duct-cleaning' },
  { label: 'Air duct cleaning and allergies: what to know', path: '/blog/clean-air-ducts-allergy-relief' },
  { label: 'Commercial duct cleaning in LA: planning the scope', path: '/blog/commercial-air-duct-cleaning-los-angeles-businesses' },
  { label: 'Commercial indoor air quality: a manager guide', path: '/blog/commercial-indoor-air-quality-guide' },
  { label: 'Indoor air quality & HVAC journal', path: '/blog' },
  { label: 'Indoor air care checklist', path: '/air-quality-calculator' },
];
