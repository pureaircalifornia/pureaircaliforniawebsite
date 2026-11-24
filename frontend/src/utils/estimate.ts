import type { LeadCreate } from './api';

export type EstimateService = 'air-duct' | 'dryer-vent' | 'filter' | 'other';
export type EstimateProperty =
  | 'Home / apartment'
  | 'Business / commercial'
  | 'Managed property / HOA'
  | 'Private home / estate';
export type EstimateAddon = 'dryer-vent' | 'filter' | 'hvac-coil' | 'wildfire-smoke';

export const estimateServices: Record<EstimateService, string> = {
  'air-duct': 'Air duct cleaning',
  'dryer-vent': 'Dryer vent cleaning',
  filter: 'Electrostatic filter care',
  other: 'HVAC / other service',
};

export const estimateServiceMeta: Record<
  EstimateService,
  { label: string; startingCue: string; summary: string }
> = {
  'air-duct': {
    label: 'Air duct cleaning',
    startingCue: 'Residential from $299',
    summary: 'Supply & return ductwork, registers, and accessible air-handler pathways.',
  },
  'dryer-vent': {
    label: 'Dryer vent cleaning',
    startingCue: 'Residential from $149',
    summary: 'Exhaust line lint removal from laundry connection to exterior wall or roof hood.',
  },
  filter: {
    label: 'Electrostatic filter care',
    startingCue: 'Written scope',
    summary: 'Washable custom-fit electrostatic filter sizing, replacement, or maintenance.',
  },
  other: {
    label: 'HVAC / other service',
    startingCue: 'Written scope',
    summary: 'Coil & blower hygiene, sanitizing assessment, or multi-component HVAC care.',
  },
};

export const estimateAddons: Record<
  EstimateAddon,
  { label: string; note: string; startingCue: string }
> = {
  'dryer-vent': {
    label: 'Dryer vent cleaning',
    note: 'Add exhaust lint clearing during the same visit',
    startingCue: 'From $149 residential',
  },
  filter: {
    label: 'Electrostatic filter check',
    note: 'Inspect, size, or service washable filter media',
    startingCue: 'Confirmed on site',
  },
  'hvac-coil': {
    label: 'HVAC coil & blower check',
    note: 'Visual review of accessible coil, pan & blower cabinet',
    startingCue: 'Confirmed on site',
  },
  'wildfire-smoke': {
    label: 'Post-wildfire smoke & ash inspection',
    note: 'Check returns, plenums & filters after LA smoke events',
    startingCue: 'Inspection-led scope',
  },
};

export type EstimateDetails = {
  property: EstimateProperty;
  service: EstimateService;
  sqft: string;
  unsure: boolean;
  zip: string;
  name: string;
  phone: string;
  email: string;
  organization: string;
  address: string;
  systems: string;
  access: string;
  timing: string;
  message: string;
  location?: string;
  addons?: EstimateAddon[];
};

export type PlanningGuide = {
  badge: string;
  headline: string;
  subline: string;
  costDrivers: string[];
  included: string[];
};

const ALWAYS_INCLUDED = [
  'Pre-service walkthrough of accessible ducts, vents & equipment',
  'Written scope and final price confirmed before work begins',
  'Floor, register, and work-area protection during service',
  'Post-service review with accessible before/after photos on request',
];

export function estimatePlanningGuide(
  data: Pick<EstimateDetails, 'property' | 'service' | 'systems' | 'sqft' | 'unsure' | 'access' | 'addons'>
): PlanningGuide {
  const addons = data.addons || [];
  const isHome = data.property === 'Home / apartment';
  const isEstate = data.property === 'Private home / estate';
  const isManaged = data.property === 'Managed property / HOA';
  const isCommercial = data.property === 'Business / commercial';
  const isMultiSystem = data.systems === '2' || data.systems === '3–5' || data.systems === '6 or more';
  const hasDryerAddon = addons.includes('dryer-vent') && data.service !== 'dryer-vent';
  const hasWildfire = addons.includes('wildfire-smoke');

  let badge = 'Written custom scope';
  let headline = 'Tailored written proposal';
  let subline =
    'Every Los Angeles building has different system counts and access points. We review your layout and confirm the exact scope and price in writing before starting.';

  if (isHome && data.service === 'air-duct') {
    badge = isMultiSystem ? 'Multi-system residential scope' : 'Published starting rate';
    headline = isMultiSystem
      ? 'Starts at $299 (1st eligible system)'
      : hasDryerAddon
        ? 'From $299 ducts + $149 dryer vent'
        : 'Starting at $299';
    subline = isMultiSystem
      ? `Single-system residential scopes start at $299; with ${data.systems} systems, we price each air handler and trunk line clearly in writing before work starts.`
      : 'Starting rate for eligible single-system Los Angeles residential scopes. Final scope and price are confirmed in writing after reviewing system layout and access.';
  } else if (isHome && data.service === 'dryer-vent') {
    badge = 'Published starting rate';
    headline = 'Starting at $149';
    subline =
      'Starting rate for eligible standard residential dryer exhaust runs. Length, bends, multi-story routing, and roof vs. wall termination determine the confirmed price.';
  } else if (isEstate) {
    badge = 'Estate & multi-zone scope';
    headline =
      data.service === 'dryer-vent'
        ? 'Starting at $149 · multi-laundry custom'
        : 'Residential from $299 · estate custom scope';
    subline =
      'Larger Los Angeles homes and estates often have multiple air handlers, guest houses, or specialized finishes. We map every system and coordinate directly with your household or estate manager.';
  } else if (isManaged) {
    badge = 'HOA & multi-unit proposal';
    headline = 'Bulk / multi-unit written quote';
    subline =
      'We separate HOA common-area vs. unit-owner scopes, plan resident notice schedules, and provide COI documentation before dispatch.';
  } else if (isCommercial) {
    badge = 'Commercial facility proposal';
    headline = 'Site-specific commercial quote';
    subline =
      'Priced by air handler count, rooftop or mechanical-room access, after-hours window, and closeout documentation requirements.';
  }

  const costDrivers: string[] = [];
  if (data.service === 'dryer-vent') {
    costDrivers.push('Exhaust run length, number of turns, and exterior wall vs. roof termination');
    costDrivers.push(
      isManaged || isCommercial
        ? 'Number of laundry stacks, rooftop boosters, and unit access scheduling'
        : 'Appliance clearance, transition duct condition, and multi-story ladder/roof access'
    );
  } else {
    costDrivers.push(
      data.systems
        ? `System count selected (${data.systems}) plus total supply & return vents served`
        : 'Number of HVAC air handlers/zones and total supply & return registers'
    );
    costDrivers.push(
      data.access
        ? `Equipment access noted (${data.access}) — attic, crawlspace, rooftop, or indoor closet`
        : 'Equipment access (attic, crawlspace, garage, closet, mechanical room, or rooftop)'
    );
  }

  if (hasWildfire) {
    costDrivers.push('Post-wildfire smoke/ash inspection of plenums, return boxes, and filter racks');
  } else if (isManaged || isCommercial) {
    costDrivers.push('Approved work windows (including off-hours), COI paperwork, and site parking/escort rules');
  } else {
    costDrivers.push('System condition (everyday dust, remodeling debris, or optional coil/blower care)');
  }

  if (addons.length > 0) {
    costDrivers.push(
      `Combined visit scope: ${addons.map((key) => estimateAddons[key].label).join(', ')}`
    );
  }

  return {
    badge,
    headline,
    subline,
    costDrivers,
    included: ALWAYS_INCLUDED,
  };
}

export function estimateLead(data: EstimateDetails): LeadCreate {
  const size = data.unsure || !data.sqft ? null : Number(data.sqft);
  const addonSummary = (data.addons || [])
    .filter((key): key is EstimateAddon => key in estimateAddons)
    .map((key) => estimateAddons[key].label)
    .join(', ');
  const locationText = data.location?.trim() || '';
  const zipText = data.zip.trim() ? `ZIP ${data.zip.trim()}` : '';

  return {
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    property_type: data.property,
    service: estimateServices[data.service],
    source: 'quote_form',
    ...(data.service === 'air-duct' && size !== null ? { square_footage: String(size) } : {}),
    address: [data.address.trim(), locationText, zipText].filter(Boolean).join(', '),
    message: [
      'Tailored estimate request. PAC must confirm the scope, price and appointment.',
      locationText ? `Area / neighborhood: ${locationText}` : '',
      `Organization: ${data.organization.trim() || 'Not provided'}`,
      `Systems / units: ${data.systems || 'Not sure'}`,
      `Access: ${data.access || 'Not sure'}`,
      `Preferred timing: ${data.timing || 'Flexible'}`,
      addonSummary ? `Requested add-ons: ${addonSummary}` : '',
      data.service === 'air-duct' && size === null ? 'Square footage: customer is not sure' : '',
      data.message.trim(),
    ]
      .filter(Boolean)
      .join('\n'),
  };
}
