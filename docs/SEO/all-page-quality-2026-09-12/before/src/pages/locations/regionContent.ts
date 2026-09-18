/**
 * Region-specific copy for the 54 city pages.
 *
 * WHY THIS EXISTS
 *
 * Measured against the built output, a city page was 961 visible words of which
 * only 278 (28.9%) appeared on no other city page. The remaining 71% was template
 * shared verbatim across all 54. That is the doorway-page shape, and it is the
 * reason "Crawled – currently not indexed" is the likely outcome for most of them:
 * Google indexes a page when it is worth its own slot, and 54 pages that are 71%
 * identical are not 54 slots' worth of content.
 *
 * The per-city data in data.ts is genuinely differentiated already — 54 distinct
 * localContext strings, 54 distinct challenge sets. The problem was that the
 * template drowned it. This file attacks the other side: it turns blocks that were
 * identical on all 54 pages into blocks that differ by region, so the corpus splits
 * into seven content families instead of one.
 *
 * WHAT IS SAFE TO WRITE HERE
 *
 * Everything below follows from geography and climate that can be checked on a map
 * or in a climate record: proximity to the coast, valley heat, canyon brush, slope,
 * freeway corridors, building age in designated historic districts. That is the
 * line. Do NOT add invented specifics — named buildings, housing-stock statistics,
 * customer counts per neighbourhood, or anything presented as local fact that is
 * not verifiable. The site has already had one clean-up of fabricated per-city
 * testimonials (see data/googleReviews.ts); this file must not reintroduce the
 * same problem in a different shape.
 *
 * Genuinely city-specific detail — what the crews actually find in a given
 * neighbourhood — belongs in `fieldNotes` on the city's entry in data.ts, written
 * by someone who has done the work there. That is the content this file cannot
 * substitute for.
 */

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
  coastal: {
    label: 'coastal',
    conditions:
      'Salt air is the defining factor on the coast. It corrodes coil fins, blower housings and any bare metal inside the system faster than inland air does, and the marine layer keeps duct interiors cool and damp for long stretches of the morning. Damp and dark is what lets mould establish inside a duct run rather than merely passing through it. Fine beach sand adds an abrasive load that standard filters do not stop.',
    faqs: [
      {
        q: 'Does living near the ocean change how often I should clean my air ducts?',
        a: 'Yes. Salt air corrodes system components faster than inland air, and marine layer humidity keeps duct interiors damp enough for mould to establish. Coastal properties generally benefit from a shorter interval than inland ones.',
      },
      {
        q: 'Can you tell the difference between mould and ordinary dust in a coastal duct?',
        a: 'Not reliably by eye, and neither can a homeowner — which is why guessing is expensive in both directions. We inspect before quoting. If what is in the system is dust and sand, that is a straightforward clean; if there is active growth, the system needs sanitising as well, and we will say so before starting rather than after.',
      },
    ],
    prioritySlug: '/services/air-duct-sanitizing',
    priorityReason:
      'Coastal humidity is the condition most likely to turn a dust problem into a growth problem, so sanitising matters more here than it does inland.',
    seasonal:
      'The marine layer is heaviest from late spring through midsummer, so systems that sit damp are worth looking at before that stretch rather than after it.',
  },

  westside: {
    label: 'Westside',
    conditions:
      'The Westside sits inside the 405 and 10 corridors, and freeway particulate is fine enough to pass straight through a standard filter and settle inside the ductwork, where it recirculates every time the system runs. Add a housing mix that runs from pre-war bungalows to new multi-family construction, and two properties on the same street can need quite different work.',
    faqs: [
      {
        q: 'Does living near the 405 or 10 affect my indoor air?',
        a: 'Freeway particulate is fine enough to pass through standard filters and settle inside ductwork, where it recirculates. Properties along the major Westside corridors typically show heavier deposits than the county average.',
      },
      {
        q: 'Will a better filter fix it on its own?',
        a: 'A higher-MERV filter helps going forward, but it does nothing about what is already lining the ducts — and fitting a filter that is too restrictive for the blower makes airflow worse, not better. Clean the system first, then match the filter to what the equipment can actually pull through.',
      },
    ],
    prioritySlug: '/services/residential-electrostatic-filter',
    priorityReason:
      'Where the incoming particulate load is high and constant, filtration is what keeps a cleaned system clean.',
    seasonal:
      'Traffic particulate is steady year-round here, so timing matters less than interval — what counts is not letting it run too long between cleans.',
  },

  foothill: {
    label: 'foothill',
    conditions:
      'Slope is the difference. Rather than dispersing, airborne particulate tends to be carried against the hillside and held there, and foothill properties sit close to open space that contributes brush dust through the dry months and ash during fire season. Both end up drawn into the system and stay there until the ductwork is cleaned.',
    faqs: [
      {
        q: 'Why do foothill homes accumulate more dust?',
        a: 'The slope traps particulate against it rather than letting it disperse, and nearby open space contributes brush dust and fire-season ash. Both end up in the system and stay there until it is cleaned.',
      },
      {
        q: 'Is it worth cleaning if a fire came near but the house was not damaged?',
        a: 'Usually yes, and this is the case people most often skip. Smoke and fine ash reach the intake whether or not the structure was touched, and once inside the ductwork they keep recirculating long after the outdoor air has cleared. An inspection will tell you whether it actually got in.',
      },
    ],
    prioritySlug: '/services/hvac-system-cleaning',
    priorityReason:
      'A heavy particulate load reaches the coil and blower, not just the ducts, so cleaning the whole system is what makes the difference here.',
    seasonal:
      'Late summer through the first serious rain is the heaviest stretch for brush dust and ash, so early autumn is a sensible time to look at the system.',
  },

  'urban-core': {
    label: 'urban core',
    conditions:
      'Density and shared systems define the work here. Where a building runs shared ventilation risers, odours, cooking exhaust and allergens move between units through the ductwork, and cleaning one apartment in isolation does not address it. Street-level traffic particulate is drawn in continuously, and access in occupied buildings usually has to be planned around tenants rather than around the crew.',
    faqs: [
      {
        q: 'Can air from other units reach my apartment through the ducts?',
        a: 'In buildings with shared ventilation risers, yes — odours, cooking exhaust and allergens can move between units through the system. Cleaning the shared components is what addresses it properly.',
      },
      {
        q: 'My building manager handles maintenance. Can I still book?',
        a: 'For anything inside your own unit, yes. For shared risers and the building-side equipment, the work has to be arranged with the building — we do a lot of that directly with property managers, and we are happy to talk to yours.',
      },
    ],
    prioritySlug: '/services/commercial-air-duct-cleaning',
    priorityReason:
      'Most work in the urban core involves shared or building-side systems, which is commercial work even when the occupant is a resident.',
    seasonal:
      'Occupied buildings are easiest to schedule outside peak heat, when systems are running hardest and tenants least want them off.',
  },

  'san-fernando-valley': {
    label: 'San Fernando Valley',
    conditions:
      'The Valley runs hotter than the basin for longer, and that is what drives the difference. Sustained summer heat keeps systems cycling for months rather than weeks, and every additional hour of runtime pulls more dust through the ductwork. Santa Ana conditions add a dry, dust-heavy load on top. The result is that Valley systems tend to reach the point of needing attention sooner than a coastal equivalent of the same age.',
    faqs: [
      {
        q: 'Does the Valley heat make air duct cleaning more important?',
        a: 'It does. Sustained summer heat keeps systems cycling for months, and every hour of runtime pulls more dust through the ductwork. Higher runtime means faster accumulation, so Valley systems tend to need attention sooner.',
      },
      {
        q: 'My system is struggling in summer. Is that a duct problem?',
        a: 'It can be, and it is worth finding out which before spending money. Restricted ducts and a loaded coil both reduce airflow and make a system work harder for less cooling. But so do a failing capacitor and low refrigerant, and those need an HVAC technician rather than us. An inspection will tell you which conversation you are having.',
      },
    ],
    prioritySlug: '/services/residential-dryer-vent-cleaning',
    priorityReason:
      'High ambient heat and long dryer runtimes make vent blockages both more likely and more dangerous here.',
    seasonal:
      'Spring is the useful window — before the cooling season starts rather than during it, when the system is already running daily.',
  },

  canyon: {
    label: 'canyon',
    conditions:
      'Canyon properties sit closest to brush, and that shapes both the routine load and the exceptional one. Through the dry months the system pulls in brush dust continuously; during and after a nearby fire it pulls in smoke and fine ash, which settle inside the ductwork and keep recirculating long after the outdoor air has cleared. Access roads are often narrow, which is a scheduling consideration rather than a technical one.',
    faqs: [
      {
        q: 'How does canyon wildfire smoke affect my HVAC system?',
        a: 'Smoke and fine ash are drawn into intakes and settle inside the ductwork, where they keep recirculating long after the air outside has cleared. After a nearby fire, a system inspection is worth doing even if surfaces look clean.',
      },
      {
        q: 'Should I run the system during a nearby fire?',
        a: 'Generally the advice is to keep it on recirculate with a good filter rather than pulling in outside air, and to have the system looked at once the event has passed. What you do not want is to run it drawing outside air in and then leave what it collected sitting in the ducts.',
      },
    ],
    prioritySlug: '/services/hvac-system-cleaning',
    priorityReason:
      'Smoke and ash reach the coil and blower as well as the duct runs, so a partial clean leaves the problem in place.',
    seasonal:
      'Fire season sets the timing. The most useful inspection is the one after a nearby event, not the one scheduled a year in advance.',
  },

  historic: {
    label: 'historic district',
    conditions:
      'Older housing stock brings older ductwork, and that changes how the work is done rather than whether it can be. Original systems may have limited or sealed access points, ducting materials that need careful handling, and layouts that were modified across several decades of renovation. The cleaning itself is routine; planning access without damaging original fabric is the part that takes experience.',
    faqs: [
      {
        q: 'Can older homes with original ductwork still be cleaned safely?',
        a: 'Usually yes, but it takes care. Original ducts may have limited or sealed access points and materials that need careful handling, so we inspect and plan access before any equipment goes in.',
      },
      {
        q: 'What if you find asbestos-containing material?',
        a: 'We stop, and we tell you. Duct insulation and tape in properties of a certain age can contain asbestos, and disturbing it is exactly the wrong response. That is licensed abatement work, not duct cleaning — we will not touch it, and we will not quote around it.',
      },
    ],
    prioritySlug: '/services/residential-air-duct-cleaning',
    priorityReason:
      'Older residential systems are the core of the work in historic districts, and access planning is what the job turns on.',
    seasonal:
      'Any time of year works. What matters more is booking an inspection first, since access on an older system is hard to quote sight-unseen.',
  },
};

/** Falls back to a neutral entry so a new region slug cannot crash the page. */
export const getRegionContent = (region?: string): RegionContent =>
  REGION_CONTENT[region ?? ''] ?? {
    label: 'Los Angeles',
    conditions:
      'Local conditions, the age of the building and how often the system runs all affect how quickly ductwork accumulates dust and allergens.',
    faqs: [],
    prioritySlug: '/services/residential-air-duct-cleaning',
    priorityReason: 'Residential duct cleaning is the most common work across Los Angeles County.',
    seasonal: 'Spring and early autumn are generally the easiest times to schedule.',
  };
