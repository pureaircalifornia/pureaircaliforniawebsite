import type { LeadCreate } from './api';

export type EstimateService = 'air-duct' | 'dryer-vent' | 'filter' | 'other';
export type EstimateProperty = 'Home / apartment' | 'Business / commercial' | 'Managed property / HOA';
export const estimateServices: Record<EstimateService, string> = {
  'air-duct': 'Air duct cleaning', 'dryer-vent': 'Dryer vent cleaning',
  filter: 'Electrostatic filter care', other: 'HVAC / other service',
};
export type EstimateDetails = {
  property: EstimateProperty; service: EstimateService; sqft: string; unsure: boolean; zip: string;
  name: string; phone: string; email: string; organization: string; address: string;
  systems: string; access: string; timing: string; message: string;
};

/** Retains the current PricingEstimator formula; no invented access or equipment fees. */
export function preliminaryEstimate(property: EstimateProperty, service: EstimateService, sqft: number | null): number | null {
  if (property === 'Managed property / HOA' || service === 'other') return null;
  if (service === 'dryer-vent') return property === 'Home / apartment' ? 149 : null;
  if (service === 'filter') return property === 'Home / apartment' ? 249 : null;
  if (sqft === null || !Number.isFinite(sqft) || !Number.isInteger(sqft) || sqft < 100 || sqft > 1000000) return null;
  return property === 'Business / commercial' ? Math.max(499, (sqft - 500) * 1.5) : Math.max(299, sqft - 500);
}

export function estimateLead(data: EstimateDetails): LeadCreate {
  const size = data.unsure || !data.sqft ? null : Number(data.sqft);
  const amount = preliminaryEstimate(data.property, data.service, size);
  return {
    name: data.name.trim(), email: data.email.trim(), phone: data.phone.trim(),
    property_type: data.property, service: estimateServices[data.service], source: 'quote_form',
    ...(data.service === 'air-duct' && size !== null ? { square_footage: String(size) } : {}),
    ...(amount !== null ? { estimated_price: amount } : {}),
    address: [data.address.trim(), `ZIP ${data.zip}`].filter(Boolean).join(', '),
    message: [
      'Guided estimate request. Any displayed amount is preliminary, not a confirmed quote or booking.',
      `Planning estimate: ${amount === null ? 'PAC review requested' : `$${amount}`}`,
      `Organization: ${data.organization.trim() || 'Not provided'}`,
      `Systems / units: ${data.systems || 'Not sure'}`,
      `Access: ${data.access || 'Not sure'}`,
      `Preferred timing: ${data.timing || 'Flexible'}`,
      data.service === 'air-duct' && size === null ? 'Square footage: customer is not sure' : '',
      data.message.trim(),
    ].filter(Boolean).join('\n'),
  };
}
