/** Property-planning guidance by region; never infer contamination from a neighborhood. */
export interface RegionFaq {
  q: string;
  a: string;
}

export interface RegionContent {
  /** One-line label used in headings and intro copy. */
  label: string;
  /** Region-specific FAQs. Rendered in addition to the cost/duration questions. */
  faqs: RegionFaq[];
  /** What conditions in this region do to a duct system, in prose. */
  conditions: string;
  /** The service that matters most here, and why. Drives ordering of the cards. */
  prioritySlug: string;
  priorityReason: string;
  /** Seasonal timing advice specific to the region. */
  seasonal: string;
}

export const REGION_CONTENT: Record<string, RegionContent> = {
  "coastal": {
    "label": "coastal",
    "conditions": "For a coastal property, describe the actual equipment condition and access. An address near the ocean is not, by itself, a reason to prescribe cleaning or a chemical treatment.",
    "prioritySlug": "/services/hvac-system-cleaning",
    "priorityReason": "Start with an inspection of the equipment and a clear component-by-component scope.",
    "seasonal": "Discuss your preferred appointment window and any building access restrictions before arranging the visit.",
    "faqs": [
      {
        "q": "What information should I provide for an estimate?",
        "a": "Start with an inspection of the equipment and a clear component-by-component scope. Tell us the address, property type and known access requirements."
      }
    ]
  },
  "westside": {
    "label": "Westside",
    "conditions": "For a Westside home or business, additions, tenant layouts and shared equipment can affect the scope. Describe your own property rather than assuming the same service suits every nearby building.",
    "prioritySlug": "/services/residential-air-duct-cleaning",
    "priorityReason": "Identify the system layout, access and included components before comparing estimates.",
    "seasonal": "For work around a renovation or tenant change, discuss timing with the property manager and other contractors.",
    "faqs": [
      {
        "q": "What information should I provide for an estimate?",
        "a": "Identify the system layout, access and included components before comparing estimates. Tell us the address, property type and known access requirements."
      }
    ]
  },
  "foothill": {
    "label": "foothill",
    "conditions": "For a foothill-area appointment, explain the route to the property and equipment. If a smoke or other contamination event prompted the request, describe the actual conditions so the appropriate assessment can be discussed.",
    "prioritySlug": "/services/hvac-system-cleaning",
    "priorityReason": "The right scope depends on equipment condition, access and the reason for the request.",
    "seasonal": "Following a smoke event, use current local safety guidance and confirm access is appropriate before scheduling a routine service.",
    "faqs": [
      {
        "q": "What information should I provide for an estimate?",
        "a": "The right scope depends on equipment condition, access and the reason for the request. Tell us the address, property type and known access requirements."
      }
    ]
  },
  "urban-core": {
    "label": "urban",
    "conditions": "In a managed building, the first questions are often about responsibility and access. Establish the boundary between tenant equipment and common systems before approving a cleaning scope.",
    "prioritySlug": "/services/commercial-air-duct-cleaning",
    "priorityReason": "A building-level equipment list helps define which systems are included.",
    "seasonal": "Coordinate the work window with the building’s operating hours, tenant notices and access arrangements.",
    "faqs": [
      {
        "q": "What information should I provide for an estimate?",
        "a": "A building-level equipment list helps define which systems are included. Tell us the address, property type and known access requirements."
      }
    ]
  },
  "san-fernando-valley": {
    "label": "San Fernando Valley",
    "conditions": "For a Valley property, begin with the number of HVAC systems and where the equipment is located. A house, workshop and multi-tenant building may require very different service plans even when they share a neighborhood.",
    "prioritySlug": "/services/hvac-system-cleaning",
    "priorityReason": "Equipment count and access are more useful for scoping than floor area alone.",
    "seasonal": "Keep equipment maintenance records available and confirm a work window that suits the occupants.",
    "faqs": [
      {
        "q": "What information should I provide for an estimate?",
        "a": "Equipment count and access are more useful for scoping than floor area alone. Tell us the address, property type and known access requirements."
      }
    ]
  },
  "canyon": {
    "label": "canyon",
    "conditions": "For a canyon-area property, discuss parking, steps, gates and the route to the equipment before the appointment. Access limitations should be understood while the work is quoted.",
    "prioritySlug": "/services/residential-air-duct-cleaning",
    "priorityReason": "Plan the equipment route and identify which duct sections can be reached.",
    "seasonal": "Confirm access instructions and any community work-hour rules before choosing a date.",
    "faqs": [
      {
        "q": "What information should I provide for an estimate?",
        "a": "Plan the equipment route and identify which duct sections can be reached. Tell us the address, property type and known access requirements."
      }
    ]
  },
  "historic": {
    "label": "established neighborhood",
    "conditions": "If a property has older finishes or has been remodeled, discuss duct material and access before work. The proposed method should suit the actual equipment and protect the surrounding space.",
    "prioritySlug": "/services/residential-air-duct-cleaning",
    "priorityReason": "Confirm the current layout and the materials involved rather than relying on the building’s age.",
    "seasonal": "Coordinate with occupants and any other planned property work so access and protection can be arranged.",
    "faqs": [
      {
        "q": "What information should I provide for an estimate?",
        "a": "Confirm the current layout and the materials involved rather than relying on the building’s age. Tell us the address, property type and known access requirements."
      }
    ]
  }
};

export const getRegionContent = (region?: string): RegionContent =>
  REGION_CONTENT[region ?? ''] ?? {
    label: 'Los Angeles',
    conditions:
      'Tell us the property type, equipment locations and any known access requirements. The service scope should follow the actual condition of the system.',
    faqs: [],
    prioritySlug: '/services/residential-air-duct-cleaning',
    priorityReason: 'Discuss the equipment and the areas you want assessed before choosing a cleaning scope.',
    seasonal: 'Call with your preferred work window to discuss appointment availability.',
  };
