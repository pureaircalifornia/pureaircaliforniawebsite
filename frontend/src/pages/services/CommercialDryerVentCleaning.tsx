import ServiceDetailLayout from '@/components/ServiceDetailLayout';

const service = {
  seoTitle: 'Commercial Dryer Vent Cleaning Los Angeles | Pure Air CA',
  seoDescription:
    'Commercial dryer vent, riser & manifold cleaning in Los Angeles for apartments, hotels, gyms & laundromats. COI-ready written quotes. Call (213) 792-4145.',
  path: '/services/commercial-dryer-vent-cleaning',
  h1: 'Commercial Dryer Vent Cleaning in Los Angeles',
  intro:
    'Keep high-use commercial laundry operations safe, efficient, and on schedule with full-path dryer exhaust cleaning across Greater Los Angeles. We partner with multifamily property managers, HOA boards, hotels, fitness studios, and commercial operators to clear individual lines, shared manifolds, booster fans, and rooftop terminations.',
  serviceName: 'Commercial Dryer Vent Cleaning',
  breadcrumbLabel: 'Commercial Dryer Vent Cleaning',
  estimateLabel: 'Get a commercial dryer vent quote',
  heroReassurance: 'Multifamily · Hotels · Studios · COI documentation · Phased scheduling across LA County',
  coverageText:
    'Commercial dryer exhaust cleaning across Los Angeles County, including West Hollywood, Culver City, Century City, Santa Monica, Koreatown, and the San Fernando Valley.',
  quickFacts: [
    { label: 'Commercial pricing', value: 'Custom quote by dryer & riser count' },
    { label: 'B2B readiness', value: 'COI-ready · Unit-by-unit completion logs' },
    { label: 'Systems covered', value: 'Individual lines, shared risers & roof exits' },
  ],
  sections: [
    {
      heading: 'What is included in commercial dryer exhaust cleaning',
      body: 'Commercial dryers move far higher lint volumes through longer rigid ducts, shared manifolds, and roof exhaust caps than household machines. Every scope follows the complete accessible exhaust path—never just the front lint trap.',
      bullets: [
        'Machine-side transition connectors and accessible behind-dryer exhaust chases',
        'Individual branch ducts, vertical risers, and shared multi-dryer collection manifolds',
        'Accessible in-line lint traps, secondary lint boxes, and booster-fan housings',
        'Exterior wall louvers and rooftop termination hoods cleared and airflow-checked',
        'Written completion record organized by machine ID, laundry room, or unit number',
      ],
    },
    {
      heading: 'Signs your commercial laundry exhaust is restricted',
      body: 'High-cycle dryers in apartment communities, hotels, spas, and athletic studios accumulate dense lint rapidly. Addressing restriction early helps reduce excess heat, extended dry times, and unplanned machine downtime.',
      bullets: [
        'Longer drying cycles across multiple machines or persistent high-limit thermostat trips',
        'Excess heat, humidity, or lint dust building up inside the laundry room',
        'Visible lint escaping around duct joints, cleanout hatches, or roof caps',
        'No documented full-path exhaust cleaning record within the past 6–12 months for heavy-use rooms',
        'Upcoming property insurance review or annual multifamily preventative maintenance cycle',
      ],
    },
    {
      heading: 'Planning around occupied Los Angeles properties',
      body: 'Whether servicing a 40-unit Westside apartment building, a boutique hotel laundry, or a busy athletic studio like our documented SoulCycle Culver City and Brentwood projects, we plan downtime and access around your peak operating hours.',
      bullets: [
        'Phased machine-bank shutdowns so guests, residents, or staff retain laundry access',
        'Resident notice coordination and multi-unit access scheduling with property management',
        'Roof-hatch, mechanical-room, loading, and Certificate of Insurance (COI) setup before arrival',
        'Honest boundary: exhaust cleaning removes lint buildup—damaged ducts, electrical faults, or appliance repairs require a qualified repair trade',
      ],
    },
    {
      heading: 'What determines your commercial dryer vent estimate',
      body: 'Commercial laundry quotes depend on actual system layout rather than a residential per-vent rate. Share basic details up front and we will clarify whether an on-site walkthrough is needed before issuing a firm written quote.',
      bullets: [
        'Total number of dryers and whether runs are individual or tied into shared manifolds',
        'Run length, vertical riser height, cleanout hatch locations, and rooftop access',
        'Number of booster fans, secondary lint traps, and operating-hour constraints',
        'Desired closeout documentation (before/after photos, unit checklist, or recurring schedule)',
      ],
    },
    {
      heading: 'Ongoing maintenance intervals matched to real usage',
      body: 'A 20-machine commercial laundry room and a quiet condo building do not share the same lint-loading rate. After cleaning, we share what was found inside the ducts so your facility team can choose a practical quarterly, semi-annual, or annual maintenance rhythm.',
    },
  ],
  faqs: [
    {
      question: 'Can you clean multiple apartment dryer vents or shared risers in one project?',
      answer:
        'Yes. Tell us the unit count, whether machines exhaust individually or through shared stacks, and where vents terminate. We separate individual unit access from common-area riser work cleanly in writing.',
    },
    {
      question: 'What information helps you quote a commercial dryer vent project accurately?',
      answer:
        'Share your property city/ZIP, building type, number of dryers, exterior wall vs. roof termination details, preferred work window, and any COI or unit-by-unit reporting requirements.',
    },
    {
      question: 'Can you schedule work around hotel, studio, or resident laundry hours?',
      answer:
        'Yes. We coordinate early-morning, off-peak, or phased bank-by-bank windows with your site contact so essential laundry operations experience minimal interruption.',
    },
    {
      question: 'Does dryer vent cleaning replace appliance repair or fire-code certification?',
      answer:
        'No. Exhaust cleaning removes lint buildup from accessible vent runs and terminations. Dryer mechanical faults, gas/electrical service, duct replacement, and independent fire-code certifications are separate scopes.',
    },
    {
      question: 'Do you offer recurring maintenance plans for HOAs and commercial facilities?',
      answer:
        'Yes. Our Dryer Vent Maintenance Program sets scheduled inspections and cleanings tailored to your building’s actual machine usage and access rules.',
    },
  ],
  sources: [
    {
      label: 'U.S. Fire Administration (USFA): Clothes Dryer Fire Safety',
      url: 'https://www.usfa.fema.gov/downloads/pdf/publications/clothes_dryer_fire_safety_flyer.pdf',
    },
  ],
  relatedLinks: [
    {
      label: 'Commercial & HOA air duct + dryer vent care',
      path: '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/',
    },
    {
      label: 'Laundromat dryer vent cleaning',
      path: '/services/laundromat-dryer-vent-cleaning/',
    },
    {
      label: 'Scheduled dryer vent maintenance program',
      path: '/services/dryer-vent-maintenance-program/',
    },
    {
      label: 'Property managers & HOA services',
      path: '/property-managers/',
    },
    {
      label: 'SoulCycle Westside dryer exhaust case study',
      path: '/case-studies/soulcycle-westside-dryer-vents/',
    },
    {
      label: 'Commercial air duct cleaning',
      path: '/services/commercial-air-duct-cleaning/',
    },
  ],
};

export default function CommercialDryerVentCleaning() {
  return <ServiceDetailLayout {...service} />;
}
