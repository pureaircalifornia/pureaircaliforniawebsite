import { locationData } from '@/pages/locations/data';

/**
 * Internal linking helpers.
 *
 * Before this, 79 of 107 pages had no contextual outbound links at all — every
 * link on them came from the nav or footer. That leaves the site as a set of
 * leaf nodes hanging off global chrome, with no topical relationships for either
 * a crawler or a visitor to follow.
 *
 * These helpers build those relationships from data that already exists (a
 * location's region, a service's subject) rather than from a hand-maintained
 * list that would drift out of date as pages are added.
 */

export interface LinkItem {
  label: string;
  path: string;
  /** Optional one-line context shown under the link. */
  note?: string;
}

/**
 * Cities near `slug`, drawn from the same region.
 *
 * The starting offset is derived from the city's own index so that the 24 San
 * Fernando Valley pages don't all link to the same handful of neighbours —
 * otherwise a few cities would absorb every internal link and the rest would get
 * none. Deterministic, so the output is stable between builds.
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

/** Core service pages, phrased for the city they are being linked from. */
export const getServiceLinksForCity = (cityName: string, slug?: string): LinkItem[] => {
  // Three core services on every city page. These are the primary money pages and
  // the ones a visitor on a neighbourhood page is most likely to actually want.
  const core: LinkItem[] = [
    {
      label: `Residential air duct cleaning in ${cityName}`,
      path: '/services/residential-air-duct-cleaning',
    },
    {
      label: `Commercial air duct cleaning in ${cityName}`,
      path: '/services/commercial-air-duct-cleaning',
    },
    {
      label: `Dryer vent cleaning in ${cityName}`,
      path: '/services/residential-dryer-vent-cleaning',
    },
  ];

  // The remaining services, rotated by the city's index.
  //
  // This function previously returned a fixed list, which meant the same five
  // service pages were linked from all 54 city pages and the other five were linked
  // from none. Measured: the fixed five had 56-79 contextual inbound links each
  // while commercial-electrostatic-filter and laundromat-dryer-vent-cleaning had 3.
  // Internal authority was pooling in half the catalogue and starving the rest.
  //
  // Rotating spreads roughly 54x3 inbound links across seven pages instead of
  // concentrating them on two, and it keeps the set on any single page short enough
  // to read as a genuine recommendation rather than a link list.
  const rotating: LinkItem[] = [
    { label: `HVAC system cleaning in ${cityName}`, path: '/services/hvac-system-cleaning' },
    { label: `Air duct sanitizing in ${cityName}`, path: '/services/air-duct-sanitizing' },
    {
      label: `Commercial dryer vent cleaning in ${cityName}`,
      path: '/services/commercial-dryer-vent-cleaning',
    },
    {
      label: `Electrostatic air filters in ${cityName}`,
      path: '/services/residential-electrostatic-filter',
    },
    {
      label: `Commercial electrostatic filters in ${cityName}`,
      path: '/services/commercial-electrostatic-filter',
    },
    {
      label: `Dryer vent maintenance plans in ${cityName}`,
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
    { label: `What duct cleaning costs in ${cityName}`, path: '/pricing' },
  ];
};

/**
 * Industry pages to link from a city page.
 *
 * The seven industry pages are well written and 80.7% unique between them, but they
 * had 3-4 contextual inbound links each because nothing outside /industries/ pointed
 * at them. A restaurant owner searching from a neighbourhood page had no route to
 * the restaurant page at all.
 *
 * Rotated by city index for the same reason the service and blog links are: 54 pages
 * linking the same two industries is a footprint, 54 pages linking a rotating pair
 * distributes the authority and reads as editorial.
 */
/**
 * Service-area links for an industry page.
 *
 * The city pages link out to the industry pages, but the return path did not exist:
 * each industry page linked to /locations/los-angeles/ and nothing else. That left
 * the seven industry pages topically disconnected from the 54 city pages, and left a
 * commercial visitor with no route to anything local.
 *
 * Rotated by the industry's path so the seven pages list different cities rather
 * than repeating one block, and drawn from locationData so it cannot drift when a
 * location is added or removed.
 */
export const getAreaLinksForIndustry = (path: string, count = 8): LinkItem[] => {
  const seed = path.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const cities = locationData.filter((l) => l.slug !== 'los-angeles');
  const start = cities.length ? seed % cities.length : 0;
  const rotated = [...cities.slice(start), ...cities.slice(0, start)];
  return [
    { label: 'All of Los Angeles', path: '/locations/los-angeles' },
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
  ];
  const index = locationData.findIndex((l) => l.slug === slug);
  if (index < 0) return industries.slice(0, count);
  const start = index % industries.length;
  return [...industries.slice(start), ...industries.slice(0, start)].slice(0, count);
};

/** Related services for a given service page, keyed by its path. */
export const RELATED_SERVICES: Record<string, LinkItem[]> = {
  '/services/residential-air-duct-cleaning': [
    { label: 'Residential dryer vent cleaning', path: '/services/residential-dryer-vent-cleaning' },
    { label: 'HVAC system cleaning', path: '/services/hvac-system-cleaning' },
    { label: 'Air duct sanitizing', path: '/services/air-duct-sanitizing' },
    { label: 'Air duct cleaning cost in Los Angeles', path: '/pricing' },
    { label: 'About Pure Air California', path: '/about' },
    { label: 'Refer a customer to us', path: '/partners' },
  ],
  '/services/commercial-air-duct-cleaning': [
    { label: 'Commercial dryer vent cleaning', path: '/services/commercial-dryer-vent-cleaning' },
    { label: 'Healthcare facility duct cleaning', path: '/industries/healthcare' },
    { label: 'Restaurant kitchen exhaust cleaning', path: '/industries/restaurants' },
    { label: 'Office building duct cleaning', path: '/industries/commercial-real-estate' },
    { label: 'Manufacturing and industrial ventilation', path: '/industries/manufacturing' },
    { label: 'Commercial case studies', path: '/case-studies' },
    { label: 'Property managers and HOAs', path: '/property-managers' },
    { label: 'About Pure Air California', path: '/about' },
  ],
  '/services/residential-dryer-vent-cleaning': [
    { label: 'Dryer vent maintenance program', path: '/services/dryer-vent-maintenance-program' },
    { label: 'Residential air duct cleaning', path: '/services/residential-air-duct-cleaning' },
    { label: 'Dryer vent safety guide', path: '/blog/dryer-vent-safety-guide' },
  ],
  '/services/commercial-dryer-vent-cleaning': [
    { label: 'Laundromat dryer vent cleaning', path: '/services/laundromat-dryer-vent-cleaning' },
    { label: 'Dryer vent maintenance program', path: '/services/dryer-vent-maintenance-program' },
    { label: 'Hotel and hospitality air quality', path: '/industries/hospitality' },
    { label: 'Property managers and HOAs', path: '/property-managers' },
    { label: 'Commercial case studies', path: '/case-studies' },
  ],
  '/services/hvac-system-cleaning': [
    { label: 'Residential air duct cleaning', path: '/services/residential-air-duct-cleaning' },
    { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' },
    { label: 'Electrostatic air filters', path: '/services/residential-electrostatic-filter' },
    { label: 'Indoor air quality calculator', path: '/air-quality-calculator' },
  ],
  '/services/dryer-vent-maintenance-program': [
    { label: 'Residential dryer vent cleaning', path: '/services/residential-dryer-vent-cleaning' },
    { label: 'Laundromat dryer vent cleaning', path: '/services/laundromat-dryer-vent-cleaning' },
    { label: 'Property managers and HOAs', path: '/property-managers' },
  ],
  '/services/residential-electrostatic-filter': [
    { label: 'Commercial electrostatic filters', path: '/services/commercial-electrostatic-filter' },
    { label: 'HVAC system cleaning', path: '/services/hvac-system-cleaning' },
    { label: 'Health benefits of clean air', path: '/health-benefits' },
  ],
  '/services/commercial-electrostatic-filter': [
    { label: 'Residential electrostatic filters', path: '/services/residential-electrostatic-filter' },
    { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' },
    { label: 'Retail store air quality', path: '/industries/retail' },
    { label: 'School and campus duct cleaning', path: '/industries/education' },
    { label: 'Industries we serve', path: '/industries' },
  ],
};

/** Related content for each industry vertical. */
export const RELATED_BY_INDUSTRY: Record<string, LinkItem[]> = {
  '/industries/healthcare': [
    { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' },
    { label: 'HVAC system cleaning', path: '/services/hvac-system-cleaning' },
    { label: 'Hospital duct cleaning and air quality', path: '/blog/hospital-healthcare-air-duct-cleaning' },
    { label: 'All industries we serve', path: '/industries' },
    { label: 'Education facilities', path: '/industries/education' },
  ],
  '/industries/hospitality': [
    { label: 'Commercial dryer vent cleaning', path: '/services/commercial-dryer-vent-cleaning' },
    { label: 'Hotel air quality and guest satisfaction', path: '/blog/hotel-air-quality-guest-satisfaction' },
    { label: 'Commercial case studies', path: '/case-studies' },
    { label: 'All industries we serve', path: '/industries' },
    { label: 'Restaurants and food service', path: '/industries/restaurants' },
  ],
  '/industries/restaurants': [
    { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' },
    { label: 'Restaurant kitchen air duct dangers', path: '/blog/restaurant-kitchen-air-duct-cleaning' },
    { label: 'All industries we serve', path: '/industries' },
    { label: 'Hotels and hospitality', path: '/industries/hospitality' },
  ],
  '/industries/education': [
    { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' },
    { label: 'Health benefits of clean air ducts', path: '/health-benefits' },
    { label: 'All industries we serve', path: '/industries' },
    { label: 'Healthcare facilities', path: '/industries/healthcare' },
  ],
  '/industries/retail': [
    { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' },
    { label: 'Commercial electrostatic filters', path: '/services/commercial-electrostatic-filter' },
    { label: 'All industries we serve', path: '/industries' },
    { label: 'Commercial real estate', path: '/industries/commercial-real-estate' },
  ],
  '/industries/manufacturing': [
    { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' },
    { label: 'Industrial duct cleaning standards', path: '/blog/industrial-air-duct-cleaning-safety-efficiency' },
    { label: 'All industries we serve', path: '/industries' },
    { label: 'Retail spaces', path: '/industries/retail' },
  ],
  '/industries/commercial-real-estate': [
    { label: 'Property managers and HOAs', path: '/property-managers' },
    { label: '42-unit apartment community case study', path: '/case-studies/apartment-community-42-units' },
    { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' },
    { label: 'All industries we serve', path: '/industries' },
    { label: 'Manufacturing and industrial', path: '/industries/manufacturing' },
  ],
};

/**
 * Related pages for a blog post, chosen by its category so posts point at the
 * commercial page that matches their subject rather than a generic CTA.
 */
export const RELATED_BY_BLOG_CATEGORY: Record<string, LinkItem[]> = {
  Commercial: [
    { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' },
    { label: 'Industries we serve', path: '/industries' },
    { label: 'Commercial case studies', path: '/case-studies' },
  ],
  Safety: [
    { label: 'Residential dryer vent cleaning', path: '/services/residential-dryer-vent-cleaning' },
    { label: 'Dryer vent maintenance program', path: '/services/dryer-vent-maintenance-program' },
    { label: 'Laundromat dryer vent cleaning', path: '/services/laundromat-dryer-vent-cleaning' },
  ],
  Health: [
    { label: 'Health benefits of air duct cleaning', path: '/health-benefits' },
    { label: 'Residential air duct cleaning', path: '/services/residential-air-duct-cleaning' },
    { label: 'Indoor air quality calculator', path: '/air-quality-calculator' },
  ],
  FAQ: [
    { label: 'Air duct cleaning cost in Los Angeles', path: '/pricing' },
    { label: 'Residential air duct cleaning', path: '/services/residential-air-duct-cleaning' },
    { label: 'Get a free quote', path: '/quote' },
  ],
  default: [
    { label: 'Residential air duct cleaning', path: '/services/residential-air-duct-cleaning' },
    { label: 'Air duct cleaning cost in Los Angeles', path: '/pricing' },
    { label: 'Areas we serve across Los Angeles', path: '/locations' },
  ],
};

/**
 * A stable set of high-demand service areas, linked from service pages so those
 * pages point into the location cluster rather than only being pointed at.
 */
export const LA_AREA_LINKS: LinkItem[] = [
  { label: 'Air duct cleaning in Los Angeles', path: '/locations/los-angeles' },
  { label: 'Beverly Hills', path: '/locations/beverly-hills' },
  { label: 'Santa Monica', path: '/locations/santa-monica' },
  { label: 'Pasadena', path: '/locations/pasadena' },
  { label: 'Glendale', path: '/locations/glendale' },
  { label: 'Burbank', path: '/locations/burbank' },
  { label: 'Sherman Oaks', path: '/locations/sherman-oaks' },
  { label: 'Woodland Hills', path: '/locations/woodland-hills' },
  { label: 'All service areas', path: '/locations' },
];

/**
 * Blog articles to link from a city page.
 *
 * Measured before this existed: the 14 blog posts had a median of 2 contextual
 * inbound links each, while the primary service pages had 56-76. The articles were
 * effectively leaf nodes — reachable from /blog/ and little else.
 *
 * The 55 city pages are the natural place to fix that, but linking the same two
 * articles from all 55 would be a templated footprint rather than a topical signal.
 * So the starting offset is derived from the city's own index in locationData, the
 * same deterministic rotation getNearbyLocations uses: every city links to a
 * different slice, the inbound links spread evenly across the catalogue, and the
 * output is stable between builds.
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

/**
 * Evergreen articles worth linking from a city page. Deliberately a curated subset
 * rather than every post — the industry-specific pieces (laundromats, hospitals)
 * have no business being linked from a residential neighbourhood page.
 */
const CITY_LINKABLE_POSTS: LinkItem[] = [
  { label: 'Signs your air ducts need cleaning', path: '/blog/signs-air-ducts-need-cleaning' },
  { label: 'What air duct cleaning costs in Los Angeles', path: '/blog/air-duct-cleaning-cost-los-angeles' },
  { label: 'Cleaning air ducts after a wildfire', path: '/blog/air-duct-cleaning-after-wildfire-los-angeles' },
  { label: 'Air duct cleaning FAQ', path: '/blog/air-duct-cleaning-faq' },
  { label: 'Health benefits of air duct cleaning', path: '/blog/health-benefits-air-duct-cleaning' },
  { label: 'Clean air ducts and allergy relief', path: '/blog/clean-air-ducts-allergy-relief' },
  { label: 'Dryer vent safety guide', path: '/blog/dryer-vent-safety-guide' },
  { label: 'How often to clean your air ducts', path: '/blog/importance-of-regular-air-duct-cleaning' },
];
