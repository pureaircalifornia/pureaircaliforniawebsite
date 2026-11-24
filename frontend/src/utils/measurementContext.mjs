import { sanitizeAttribution } from './attribution.mjs';
import { advertisingAllowed } from './privacy.mjs';
import { quoteContext } from './quoteContext.mjs';

export function normalizeMeasurement(data) {
  const properties = { 'Home / apartment': 'home', 'Business / commercial': 'commercial',
    'Managed property / HOA': 'managed', 'Private home / estate': 'estate' };
  const property = properties[data.property_type] || data.property_type;
  const service = /dryer/i.test(data.service_type || '') ? 'dryer-vent'
    : /filter/i.test(data.service_type || '') ? 'filter'
    : /air.?duct/i.test(data.service_type || '') ? 'air-duct'
    : data.service_type ? 'other' : undefined;
  return { ...data, property_type: ['home', 'commercial', 'managed', 'estate'].includes(property) ? property : undefined,
    service_type: service };
}

export function measurementContext() {
  const { pathname, search } = window.location;
  const relevant = /^\/(services|industries|property-managers|quote|pricing)(\/|$)/.test(pathname);
  const context = relevant ? quoteContext(pathname, search) : undefined;
  return { page_path: pathname, property_type: context?.property, service_type: context?.service };
}

// GA4's page_location is deliberately query-free. Supply only the already
// validated, consented campaign fields separately so acquisition is not lost.
export function currentCampaign() {
  if (!advertisingAllowed()) return undefined;
  const url = new URL(window.location.href);
  return sanitizeAttribution({ ...Object.fromEntries(url.searchParams), landing_path: url.pathname,
    captured_at: new Date().toISOString(), ad_measurement_consent: true });
}
export function campaignParameters(attribution = currentCampaign()) {
  if (!attribution) return {};
  return Object.fromEntries(Object.entries({ campaign_source: attribution.utm_source,
    campaign_medium: attribution.utm_medium, campaign_name: attribution.utm_campaign,
    campaign_term: attribution.utm_term, campaign_content: attribution.utm_content,
  }).filter(([, value]) => value));
}
