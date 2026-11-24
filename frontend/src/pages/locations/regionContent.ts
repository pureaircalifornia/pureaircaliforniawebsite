/** Property-planning & regional HVAC guidance across Greater Los Angeles; never infer contamination solely from an address. */
export interface RegionFaq {
  q: string;
  a: string;
}

export interface RegionContent {
  /** Human-readable region heading label. */
  label: string;
  /** Short regional hook used for differentiated meta descriptions. */
  metaFocus: string;
  /** Regional climate, housing-stock, and ventilation realities in prose. */
  conditions: string;
  /** The service path that is commonly prioritized in this region. */
  prioritySlug: string;
  priorityReason: string;
  /** Seasonal timing & scheduling advice tailored to the region. */
  seasonal: string;
  /** Region-specific FAQs supplementing each city's unique FAQs. */
  faqs: RegionFaq[];
}

export const REGION_CONTENT: Record<string, RegionContent> = {
  coastal: {
    label: 'Coastal Communities',
    metaFocus: 'coastal homes, condos & HOA dryer vents',
    conditions:
      'Along the Pacific coast, morning marine layers and ocean air interact with attic duct insulation, exterior dryer vent hoods, and rooftop condensers. Because coastal proximity alone never proves internal duct buildup, an inspection-first visit checks accessible plenums, blower housings, and exhaust terminations before recommending cleaning.',
    prioritySlug: '/services/hvac-system-cleaning',
    priorityReason:
      'Start with an equipment and duct inspection covering supply trunks, return plenums, coils, and exterior exhaust caps.',
    seasonal:
      'Many coastal homeowners schedule duct and dryer vent inspections in spring before humid summer marine air meets peak cooling season, or after coastal remodeling projects.',
    faqs: [
      {
        q: 'Does coastal humidity or salt air automatically mean my air ducts need sanitizing?',
        a: 'No. Living near the coast does not automatically justify chemical sprays or antimicrobial treatments. Pure Air California inspects accessible plenums, grilles, and coils first, removes dry dust and lint mechanically with negative-pressure HEPA extraction, and recommends targeted treatments only when actual conditions warrant them.',
      },
    ],
  },
  westside: {
    label: 'The Westside',
    metaFocus: 'Westside homes, multi-zone estates & condos',
    conditions:
      'Westside properties range from multi-zone architectural estates and remodeled mid-century homes to high-density condominiums and creative office campuses near the I-405 and I-10 corridors. Multiple air handlers, later additions, and shared HOA chases mean accurate system counts and clear unit-vs-building boundaries drive an honest estimate.',
    prioritySlug: '/services/residential-air-duct-cleaning',
    priorityReason:
      'Map each independent HVAC air handler, guest-house unit, and dryer exhaust run before comparing written estimates.',
    seasonal:
      'Coordinate duct cleaning right after Westside remodels or tenant turnovers—once drywall sanding finishes and before furniture returns—to capture construction dust before it settles into returns.',
    faqs: [
      {
        q: 'How are multi-zone or multi-system Westside homes priced?',
        a: 'Pricing follows the number of independent HVAC air handlers and accessible duct runs—not just thermostat zones or square footage. Single-system residential air duct cleaning starts at $299, and we confirm multi-system counts and register totals in writing before starting work.',
      },
    ],
  },
  foothill: {
    label: 'Foothill Communities',
    metaFocus: 'foothill homes, wildfire smoke & canyon ash care',
    conditions:
      'Foothill corridors below the San Gabriel, Verdugo, and Santa Susana mountains experience seasonal Santa Ana downslope winds, foothill brush dust, and periodic regional wildfire smoke events. Attic return plenums, roof dryer terminations, and steep hillside access routes all shape how equipment is inspected and cleaned.',
    prioritySlug: '/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles',
    priorityReason:
      'Inspection-led extraction addresses attic duct dust, fine ash, and coil buildup while separating routine cleaning from structural smoke remediation.',
    seasonal:
      'Late fall after peak Santa Ana wind events—and spring ahead of summer cooling—are the most common windows for foothill HVAC filter, coil, and duct inspections.',
    faqs: [
      {
        q: 'When should foothill homeowners schedule an HVAC inspection after nearby wildfire smoke?',
        a: 'Wait until local air-quality advisories clear and property access is safe, then replace disposable filters and have accessible return ducts, plenums, and blower housings inspected. If ash entered the ductwork or smoke odor persists when the fan runs, mechanical HEPA source removal helps clear accessible deposits without relying on heavy fragrances.',
      },
    ],
  },
  'urban-core': {
    label: 'Central & Metro Los Angeles',
    metaFocus: 'high-rises, apartments, offices & HOA vents',
    conditions:
      'Dense Metro Los Angeles corridors sit alongside major freeways and feature a sharp mix of commercial towers, adaptive-reuse lofts, vintage apartment buildings, and modern mixed-use developments. Fine urban traffic particulate, long vertical dryer vent risers, loading-dock reservations, and HOA insurance certificates are routine parts of project planning.',
    prioritySlug: '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles',
    priorityReason:
      'Define tenant vs. base-building equipment boundaries, elevator/dock access, and COI paperwork alongside an itemized system list.',
    seasonal:
      'Commercial offices and HOA boards typically schedule building-wide dryer vent stacks and HVAC duct maintenance during off-peak business hours or annual preventive maintenance windows.',
    faqs: [
      {
        q: 'Can Pure Air California provide insurance documentation and coordinate with LA building management?',
        a: 'Yes. For managed condos, apartments, and commercial offices, we coordinate approved work hours, loading-dock or service-elevator rules, and property-manager vendor requirements before confirming your appointment.',
      },
    ],
  },
  'san-fernando-valley': {
    label: 'San Fernando Valley',
    metaFocus: 'Valley homes, heavy-AC ducts & dryer vents',
    conditions:
      'Triple-digit summer highs across the San Fernando Valley run residential and commercial air conditioners for months at a stretch, pulling airborne valley dust, yard pollen, and attic lint through long horizontal trunk lines and return chases. Post-war ranch remodels and backyard ADUs often add secondary units or spliced flex runs that deserve an explicit inspection.',
    prioritySlug: '/services/residential-air-duct-cleaning',
    priorityReason:
      'Heavy summer cooling cycles load return plenums, blower wheels, and attic ductwork faster—verify system count, ADUs, and dryer vent length upfront.',
    seasonal:
      'Spring (before summer triple-digit heatwaves) and autumn (after peak cooling season and Santa Ana winds) are ideal times to service San Fernando Valley HVAC ducts and dryer exhaust lines.',
    faqs: [
      {
        q: 'Why do San Fernando Valley attic ducts and dryer vents need periodic inspection?',
        a: 'Long cooling seasons keep blower fans circulating indoor dust for hundreds of hours each summer, while hot attic runs can expose aging tape seams or sagging flex ducts. Inspecting accessible trunks alongside annual dryer vent cleaning (starting at $149) keeps airflow unobstructed and reduces lint accumulation.',
      },
    ],
  },
  canyon: {
    label: 'Hills & Canyons',
    metaFocus: 'hillside canyon homes, multi-level ducts & vents',
    conditions:
      'Santa Monica Mountains and Verdugo canyon properties pair mature oak and chaparral foliage with multi-level hillside architecture, split-level duct chases, and narrow winding streets. Sharing parking clearance, gate codes, stair carry-ins, and equipment-closet locations upfront lets our technicians arrive properly rigged for hillside access.',
    prioritySlug: '/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles',
    priorityReason:
      'Plan truck staging, hose routing, and multi-level equipment access alongside thorough negative-pressure extraction.',
    seasonal:
      'Spring pollen season and post-autumn Santa Ana wind periods are the most useful checkpoints for hillside filtration, duct inspection, and exterior dryer vent checks.',
    faqs: [
      {
        q: 'Can you service hillside canyon homes with steep driveways or limited street parking?',
        a: 'Yes. Tell us about narrow lanes, steep driveways, gate codes, or multi-level stairs when requesting your estimate so we dispatch the right portable HEPA vacuum equipment and hose lengths without surprises on arrival.',
      },
    ],
  },
  historic: {
    label: 'Historic & Established Districts',
    metaFocus: '1920s–40s Spanish & Craftsman homes, ducts & vents',
    conditions:
      'Established Los Angeles neighborhoods feature 1920s–40s Spanish Colonial Revival, Craftsman, Tudor, and Art Deco homes and courtyard apartments where forced-air ductwork was often retrofitted through basements, crawlspaces, and tight plaster chases. Protecting original hardwood floors, plaster walls, and vintage floor or wall grilles requires careful tool selection matched to the actual duct material.',
    prioritySlug: '/services/residential-air-duct-cleaning',
    priorityReason:
      'Confirm duct material (rigid metal, lined plenum, or flex), vintage register fastening, and crawlspace/attic access before cleaning begins.',
    seasonal:
      'Schedule cleaning after plaster, floor-refinishing, or kitchen remodels—and ahead of winter heating start-up—so settled construction dust is extracted rather than recirculated.',
    faqs: [
      {
        q: 'How do you protect vintage plaster walls, hardwood floors, and original registers in older LA homes?',
        a: 'Our technicians use corner guards, drop cloths, and duct-appropriate agitation tools matched to rigid sheet metal or modern flex runs. Before removing painted or vintage grilles, we review fasteners with you so delicate finishes stay intact.',
      },
    ],
  },
};

export const getRegionContent = (region?: string): RegionContent =>
  REGION_CONTENT[region ?? ''] ?? {
    label: 'Greater Los Angeles',
    metaFocus: 'LA homes, condos & commercial HVAC systems',
    conditions:
      'Tell us the property type, equipment locations, and any access requirements. Every Pure Air California visit follows an inspection-first written scope matched to your actual system.',
    prioritySlug: '/services/residential-air-duct-cleaning',
    priorityReason: 'Review system count, accessible ductwork, and dryer exhaust routing before booking.',
    seasonal: 'Call (213) 792-4145 or request a free written estimate online to confirm availability.',
    faqs: [],
  };
