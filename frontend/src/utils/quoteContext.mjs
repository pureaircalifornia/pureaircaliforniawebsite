const services = new Set(['air-duct', 'dryer-vent', 'filter', 'other']);

export const propertyLabels = {
  home: 'Home / apartment',
  commercial: 'Business / commercial',
  managed: 'Managed property / HOA',
  estate: 'Private home / estate',
};

export const addonLabels = {
  'dryer-vent': 'Dryer vent cleaning',
  filter: 'Electrostatic filter check',
  'hvac-coil': 'HVAC coil & blower check',
  'wildfire-smoke': 'Post-wildfire smoke & ash inspection',
};

/**
 * Strict allowlist of Los Angeles & Ventura County location slugs served by Pure Air California.
 * Arbitrary URL parameters are ignored so untrusted strings never enter navigation or page copy.
 */
export const locationDirectory = {
  'los-angeles': { label: 'Los Angeles', zip: '90012' },
  'santa-monica': { label: 'Santa Monica', zip: '90401' },
  'beverly-hills': { label: 'Beverly Hills', zip: '90210' },
  glendale: { label: 'Glendale', zip: '91201' },
  malibu: { label: 'Malibu', zip: '90263' },
  'century-city': { label: 'Century City', zip: '90067' },
  hollywood: { label: 'Hollywood', zip: '90027' },
  'downtown-la': { label: 'Downtown LA', zip: '90012' },
  ventura: { label: 'Ventura', zip: '93001' },
  pasadena: { label: 'Pasadena', zip: '91101' },
  burbank: { label: 'Burbank', zip: '91501' },
  'studio-city': { label: 'Studio City', zip: '91604' },
  encino: { label: 'Encino', zip: '91316' },
  tarzana: { label: 'Tarzana', zip: '91356' },
  reseda: { label: 'Reseda', zip: '91335' },
  'canoga-park': { label: 'Canoga Park', zip: '91303' },
  'woodland-hills': { label: 'Woodland Hills', zip: '91364' },
  calabasas: { label: 'Calabasas', zip: '91302' },
  'valley-village': { label: 'Valley Village', zip: '91607' },
  'van-nuys': { label: 'Van Nuys', zip: '91401' },
  'panorama-city': { label: 'Panorama City', zip: '91402' },
  northridge: { label: 'Northridge', zip: '91324' },
  'sun-valley': { label: 'Sun Valley', zip: '91352' },
  'central-la': { label: 'Central LA', zip: '90004' },
  'pacific-palisades': { label: 'Pacific Palisades', zip: '90272' },
  brentwood: { label: 'Brentwood', zip: '90049' },
  'los-feliz': { label: 'Los Feliz', zip: '90027' },
  'culver-city': { label: 'Culver City', zip: '90230' },
  'west-hollywood': { label: 'West Hollywood', zip: '90046' },
  chatsworth: { label: 'Chatsworth', zip: '91311' },
  'laurel-canyon': { label: 'Laurel Canyon', zip: '90046' },
  fairfax: { label: 'Fairfax', zip: '90036' },
  larchmont: { label: 'Larchmont', zip: '90004' },
  koreatown: { label: 'Koreatown', zip: '90005' },
  'west-la': { label: 'West LA', zip: '90025' },
  westwood: { label: 'Westwood', zip: '90024' },
  'north-of-montana': { label: 'North of Montana', zip: '90402' },
  sawtelle: { label: 'Sawtelle', zip: '90025' },
  'beverly-glen': { label: 'Beverly Glen', zip: '90077' },
  'mid-wilshire': { label: 'Mid-Wilshire', zip: '90010' },
  'sherman-oaks': { label: 'Sherman Oaks', zip: '91403' },
  'encino-village': { label: 'Encino Village', zip: '91316' },
  'lake-balboa': { label: 'Lake Balboa', zip: '91406' },
  'valley-glen': { label: 'Valley Glen', zip: '91401' },
  'magnolia-park': { label: 'Magnolia Park', zip: '91505' },
  'toluca-lake': { label: 'Toluca Lake', zip: '91602' },
  'sherwood-forest': { label: 'Sherwood Forest', zip: '91325' },
  winnetka: { label: 'Winnetka', zip: '91306' },
  'granada-hills': { label: 'Granada Hills', zip: '91344' },
  'mission-hills': { label: 'Mission Hills', zip: '91345' },
  'porter-ranch': { label: 'Porter Ranch', zip: '91326' },
  'north-hollywood': { label: 'North Hollywood', zip: '91601' },
  'sepulveda-basin': { label: 'Sepulveda Basin', zip: '91406' },
  'hidden-hills': { label: 'Hidden Hills', zip: '91302' },
  'deer-lake-highlands': { label: 'Deer Lake Highlands', zip: '91352' },
};

function sanitizeLocation(value) {
  if (!value || typeof value !== 'string') return '';
  const slug = value.trim().toLowerCase();
  return Object.hasOwn(locationDirectory, slug) ? slug : '';
}

function locationFromPath(pathname = '') {
  const locMatch = pathname.match(/^\/locations\/([a-z0-9-]+)\/?$/i);
  if (locMatch) return sanitizeLocation(locMatch[1]);
  const industryMatch = pathname.match(/^\/industries\/[a-z0-9-]+\/([a-z0-9-]+)\/?$/i);
  if (industryMatch) return sanitizeLocation(industryMatch[1]);
  return '';
}

function sanitizeAddons(raw, primaryService) {
  const list = Array.isArray(raw)
    ? raw
    : typeof raw === 'string'
      ? raw.split(',')
      : [];
  const seen = new Set();
  const result = [];
  for (const item of list) {
    const key = String(item || '').trim().toLowerCase();
    if (!Object.hasOwn(addonLabels, key)) continue;
    if (primaryService === 'dryer-vent' && key === 'dryer-vent') continue;
    if (primaryService === 'filter' && key === 'filter') continue;
    if (!seen.has(key)) {
      seen.add(key);
      result.push(key);
    }
  }
  return result;
}

export function quoteContext(pathname = '', search = '') {
  const params = new URLSearchParams(search);
  const serviceParam = params.get('service');
  const service = services.has(serviceParam)
    ? serviceParam
    : /dryer|laundromat/.test(pathname)
      ? 'dryer-vent'
      : /filter/.test(pathname)
        ? 'filter'
        : /hvac|sanitizing/.test(pathname)
          ? 'other'
          : 'air-duct';

  const propertyParam = params.get('property');
  const property = Object.hasOwn(propertyLabels, propertyParam)
    ? propertyParam
    : /property-managers|property-management|commercial-hoa/.test(pathname)
      ? 'managed'
      : /commercial|industries|laundromat|partners/.test(pathname)
        ? 'commercial'
        : 'home';

  const location = sanitizeLocation(params.get('location')) || locationFromPath(pathname);
  const locationInfo = location ? locationDirectory[location] : undefined;

  const addonsParam = params.get('addons');
  const addons = addonsParam !== null
    ? sanitizeAddons(addonsParam, service)
    : /wildfire|smoke/.test(pathname)
      ? ['wildfire-smoke']
      : [];

  return {
    service,
    property,
    propertyLabel: propertyLabels[property],
    location,
    locationLabel: locationInfo?.label || '',
    locationZip: locationInfo?.zip || '',
    addons,
  };
}

export function quoteLink(pathname = '', search = '', overrides = {}) {
  const base = quoteContext(pathname, search);
  const service = overrides && services.has(overrides.service) ? overrides.service : base.service;
  const property = overrides && Object.hasOwn(propertyLabels, overrides.property) ? overrides.property : base.property;
  const location = overrides && 'location' in overrides ? sanitizeLocation(overrides.location) : base.location;
  const addons = overrides && 'addons' in overrides
    ? sanitizeAddons(overrides.addons, service)
    : sanitizeAddons(base.addons, service);

  const query = [`service=${service}`, `property=${property}`];
  if (location) query.push(`location=${location}`);
  if (addons.length > 0) query.push(`addons=${addons.join(',')}`);
  return `/quote/?${query.join('&')}#estimate-builder`;
}
