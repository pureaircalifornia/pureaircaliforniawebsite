import type { LocationEntry } from './data';
import { getRegionContent } from './regionContent';
import { business } from '@/config/business';

const TITLE_OVERRIDES: Record<string, string> = {
  'downtown-la': 'Air Duct Cleaning Downtown Los Angeles',
  'west-la': 'Air Duct Cleaning West Los Angeles',
  'central-la': 'Air Duct Cleaning Central Los Angeles',
  'north-of-montana': 'Air Duct Cleaning North of Montana, Santa Monica',
  'magnolia-park': 'Air Duct Cleaning Magnolia Park, Burbank | PAC',
};

/**
 * Builds a high-CTR, strictly <=60-char page title with no awkward "LA CA" phrasing.
 * Note: SEOProvider appends " | Pure Air California" (+22 chars) when total <= 60.
 */
export function buildLocationTitle(location: LocationEntry): string {
  const override = TITLE_OVERRIDES[location.slug];
  if (override) return override;

  if (location.municipality === 'Los Angeles') {
    const base = `Air Duct Cleaning ${location.name}, Los Angeles`;
    // If SEOProvider won't have room for " | Pure Air California" (+22), append concise " | PAC" (+6) when it fits <= 60.
    if (base.length + 22 > 60 && base.length + 6 <= 60) {
      return `${base} | PAC`;
    }
    return base;
  }

  return `Air Duct Cleaning ${location.name}, CA`;
}

/**
 * Builds a unique, region-differentiated meta description <= 155 chars ending in punctuation,
 * incorporating transparent starting price ($299) and direct phone CTA.
 */
export function buildLocationDescription(location: LocationEntry): string {
  const region = getRegionContent(location.region);
  const phone = business.phone;
  const twoZips = location.zipCodes.slice(0, 2).join(', ');
  const oneZip = location.zipCodes[0] || '';

  const candidates = [
    twoZips
      ? `Air duct cleaning (from $299) & dryer vents in ${location.name} (${twoZips}): ${region.metaFocus}. Free quote: ${phone}.`
      : '',
    oneZip
      ? `Air duct cleaning (from $299) & dryer vents in ${location.name} (${oneZip}): ${region.metaFocus}. Free quote: ${phone}.`
      : '',
    `Air duct cleaning (from $299) & dryer vents in ${location.name}: ${region.metaFocus}. Call ${phone} for a free quote.`,
    `Air duct cleaning (from $299) & dryer vents in ${location.name}, CA. Inspection-led local service & free estimates: ${phone}.`,
  ].filter(Boolean);

  return candidates.find((text) => text.length <= 155) || candidates[candidates.length - 1];
}

/**
 * Builds a prefilled quote link conforming to the shared quoteContext.mjs contract:
 * /quote/?service=<service>&property=<property>[&location=<slug>][&addons=<csv>]#estimate-builder
 */
export function buildLocationQuoteHref(options: {
  locationSlug?: string;
  service?: 'air-duct' | 'dryer-vent' | 'filter' | 'other';
  property?: 'home' | 'commercial' | 'managed' | 'estate';
  addons?: Array<'dryer-vent' | 'filter' | 'hvac-coil' | 'wildfire-smoke'>;
}): string {
  const params = new URLSearchParams();
  params.set('service', options.service ?? 'air-duct');
  params.set('property', options.property ?? 'home');
  if (options.locationSlug) {
    params.set('location', options.locationSlug);
  }
  if (options.addons?.length) {
    params.set('addons', options.addons.join(','));
  }
  return `/quote/?${params.toString()}#estimate-builder`;
}
