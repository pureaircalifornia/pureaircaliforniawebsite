import ServiceDetailLayout from '@/components/ServiceDetailLayout';

const service = {
  seoTitle: 'HVAC System & Coil Cleaning Los Angeles | Pure Air CA',
  seoDescription:
    'Inspect & clean accessible HVAC coils, blowers, plenums, air handlers & ducts in Los Angeles homes and commercial buildings. Call (213) 792-4145.',
  path: '/services/hvac-system-cleaning',
  h1: 'HVAC System Cleaning in Los Angeles',
  intro:
    'Care for the entire air-handling pathway—not just room grilles. Pure Air California inspects and cleans accessible evaporator coils, blower assemblies, supply and return plenums, air-handler cabinets, and connected ductwork for Los Angeles homes and commercial buildings, with every component itemized in writing beforehand.',
  serviceName: 'HVAC System Cleaning',
  breadcrumbLabel: 'HVAC System Cleaning',
  estimateLabel: 'Get an HVAC cleaning estimate',
  heroReassurance: 'Coils · Blowers · Plenums · Ductwork · Written component-by-component scope across LA',
  coverageText:
    'Residential and commercial HVAC component cleaning across Los Angeles, Pasadena, Woodland Hills, Encino, Brentwood, Santa Monica, and LA County.',
  quickFacts: [
    { label: 'Scope clarity', value: 'Every coil, blower & plenum itemized' },
    { label: 'Approach', value: 'Inspection-first · Safe for equipment' },
    { label: 'Property types', value: 'LA homes, estates & commercial units' },
  ],
  sections: [
    {
      heading: 'What is included in whole-system HVAC cleaning',
      body: 'Air ducts are only one part of your heating and cooling loop. Dust and fine debris that bypass an ill-fitting filter collect on the blower wheel, evaporator coil fins, drain pan, and plenum walls. We inspect accessible components first and itemize every part included in your written scope.',
      bullets: [
        'Accessible supply and return ductwork plus room registers and grilles',
        'Supply and return plenum interiors and accessible air-handler cabinet surfaces',
        'Accessible blower wheel, housing, and furnace-box compartment cleaning',
        'Accessible interior/exterior evaporator coil surface cleaning where safe access exists',
        'Filter-slot inspection and drain-pan visual check (repairs or refrigerant work quoted separately by an HVAC repair contractor)',
      ],
    },
    {
      heading: 'Signs your HVAC components deserve a closer look',
      body: 'In Los Angeles’s long cooling season—especially across the San Fernando Valley, San Gabriel Valley, and inland basins—air handlers run for months at a time. Inspect the internal components when everyday operation points to buildup.',
      bullets: [
        'Heavy dust coating visible on blower blades, return plenum walls, or filter rack ledges',
        'Recent home remodeling, drywall work, or commercial tenant build-out while the system operated',
        'Musty or dusty odors coming directly from the air handler closet or attic unit when cooling starts',
        'Wildfire smoke residue or heavy Santa Ana wind dust bypassing older disposable filters',
        'Equipment that has operated for years with missed or poorly sealed air filters',
      ],
    },
    {
      heading: 'Residential & commercial LA equipment considerations',
      body: 'Los Angeles properties range from attic split-system furnaces and tight condo heat-pump closets to commercial rooftop package units (RTUs) and multi-zone office air handlers. Our documented four-system West Hollywood office project and Canoga Park restaurant scope both combined ductwork with plenum, blower, and coil care.',
      bullets: [
        'Attic & crawlspace split systems: verified for safe hatch access, lighting, and duct insulation condition',
        'Commercial RTUs & mechanical rooms: coordinated with building engineering, roof access, and COI rules',
        'Equipment safety boundary: mechanical repairs, capacitor/motor swaps, refrigerant charging, and electrical diagnostics belong to a licensed HVAC repair technician',
      ],
    },
    {
      heading: 'What shapes an HVAC system cleaning quote',
      body: 'Because whole-system cleaning goes beyond basic duct runs, pricing depends on the number of air handlers, whether coil panels are accessible without cutting refrigerant lines, duct configuration, and commercial after-hours needs. Every component is broken out clearly in writing so you can choose the exact scope that fits your budget.',
    },
    {
      heading: 'Keep routine equipment maintenance & filtration aligned',
      body: 'Cleaning complements—and does not replace—annual mechanical tune-ups, condensate drainage checks, and properly sized air filters. After service, we walk through what was cleaned, note any worn filter rails or inaccessible sections, and share practical care intervals for your system.',
    },
  ],
  faqs: [
    {
      question: 'How is HVAC system cleaning different from standard air duct cleaning?',
      answer:
        'Standard air duct cleaning focuses on the supply and return ductwork and grilles. Whole-system HVAC cleaning adds accessible internal air-handler components—such as plenums, blower assemblies, and accessible evaporator coils—clearly itemized in your written scope.',
    },
    {
      question: 'Can you clean coils inside a sealed attic unit or commercial rooftop unit?',
      answer:
        'Accessibility varies by unit design and installation. During inspection, we verify whether panels and coil faces can be reached safely without disturbing sealed refrigerant lines or voiding equipment warranties, and tell you honestly before any work begins.',
    },
    {
      question: 'How often should an HVAC system be cleaned in Los Angeles?',
      answer:
        'There is no universal calendar schedule. Base cleaning on actual observed buildup, heavy cooling-season runtime, renovations, smoke events, and filter maintenance—rather than automatic annual packages.',
    },
    {
      question: 'Can HVAC cleaning be scheduled after business hours for LA commercial spaces?',
      answer:
        'Yes. Share your operating hours, rooftop/mechanical-room access rules, and COI requirements when requesting an estimate so we can confirm early-morning, evening, or weekend scheduling.',
    },
    {
      question: 'Does HVAC system cleaning fix warm air, leaks, or broken blowers?',
      answer:
        'No. Cleaning removes accessible dust and debris, but refrigerant leaks, failing motors, thermostat faults, or duct sizing problems require diagnosis and repair by a mechanical HVAC repair technician.',
    },
  ],
  sources: [
    {
      label: 'ENERGY STAR: Heating & Cooling Maintenance Checklist',
      url: 'https://www.energystar.gov/saveathome/heating-cooling/maintenance-checklist',
    },
    {
      label: 'EPA: Should You Have the Air Ducts in Your Home Cleaned?',
      url: 'https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned',
    },
  ],
  relatedLinks: [
    {
      label: 'Residential air duct cleaning (from $299)',
      path: '/services/residential-air-duct-cleaning/',
    },
    {
      label: 'Commercial air duct cleaning',
      path: '/services/commercial-air-duct-cleaning/',
    },
    {
      label: 'Residential electrostatic air filters',
      path: '/services/residential-electrostatic-filter/',
    },
    {
      label: 'Wildfire smoke & hillside duct assessment',
      path: '/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles/',
    },
    {
      label: 'West Hollywood 4-system office HVAC case study',
      path: '/case-studies/nonprofit-housing-office-hvac/',
    },
    {
      label: 'Pricing & written estimate guide',
      path: '/pricing/',
    },
  ],
};

export default function HVACSystemCleaning() {
  return <ServiceDetailLayout {...service} />;
}
