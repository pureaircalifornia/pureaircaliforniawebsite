import ServiceDetailLayout from '@/components/ServiceDetailLayout';

const service = {
  seoTitle: 'Residential Electrostatic Air Filters LA | Pure Air CA',
  seoDescription:
    'Inspect, wash, or size compatible electrostatic & reusable HVAC air filters for Los Angeles homes. Protect airflow & air handlers. Call (213) 792-4145.',
  path: '/services/residential-electrostatic-filter',
  h1: 'Residential Electrostatic Air Filter Service in Los Angeles',
  intro:
    'Protect your home’s HVAC blower, coils, and ductwork with properly sized filtration that does not choke system airflow. Pure Air California inspects, cleans, and evaluates compatible washable electrostatic and reusable air filters for Los Angeles homes—matching exact return dimensions and manufacturer airflow specs.',
  serviceName: 'Residential Electrostatic Filters',
  breadcrumbLabel: 'Residential Electrostatic Filters',
  estimateLabel: 'Get a filter service estimate',
  heroReassurance: 'Exact return sizing · Airflow-safe recommendations · Washable media care across LA',
  coverageText:
    'Residential filtration inspection and service across Beverly Hills, Calabasas, Studio City, Pasadena, Santa Monica, and Greater Los Angeles.',
  quickFacts: [
    { label: 'System match', value: 'Sized to exact return & static-pressure limits' },
    { label: 'Reusable care', value: 'Collector-cell inspection & wash guidance' },
    { label: 'Pair with ducts', value: 'Available standalone or with duct cleaning' },
  ],
  sections: [
    {
      heading: 'What is included in our residential electrostatic filter service',
      body: 'An ill-fitting filter lets unfiltered dust bypass straight onto your evaporator coil, while an overly restrictive filter can strain your blower motor. We check your existing return slot, filter type, and manufacturer guidance before recommending cleaning or replacement.',
      bullets: [
        'Measurement of return grille or air-handler filter slot dimensions and frame seal',
        'Inspection of existing reusable electrostatic media or electronic air-cleaner collector cells',
        'Cleaning guidance or servicing for compatible washable filter frames and pre-filters',
        'Straightforward comparison of washable electrostatic media vs. properly rated pleated disposable filters for your unit',
        'Clear note when an HVAC contractor should verify static pressure before changing filter type',
      ],
    },
    {
      heading: 'Why filtration fit matters in Los Angeles homes',
      body: 'Los Angeles air carries a distinct mix of coastal dust, freeway particulate, seasonal pollen, Santa Ana wind fines, and periodic wildfire smoke. Keeping your return filter clean and snug in its track is the single most consistent everyday step for keeping dust out of newly cleaned ductwork.',
      bullets: [
        'Prevents dust bypass around gaps in older 1940s–1970s LA hallway return grilles',
        'Reduces lint and pet-hair loading on indoor evaporator coils and blower blades',
        'Helps keep airflow balanced during peak summer San Fernando Valley and basin cooling months',
      ],
    },
    {
      heading: 'Maintaining reusable & washable filters safely',
      body: 'Reusable electrostatic filters only perform well when cleaned on time and dried completely. Reinstalling a damp filter can introduce unwanted moisture into the return plenum.',
      bullets: [
        'Inspect washable media monthly during heavy AC or heating months—more often with pets or nearby dust',
        'Rinse in the reverse direction of airflow per the manufacturer’s instructions',
        'Allow washable filter frames to air-dry 100% completely before reinstalling',
        'Replace damaged frames, bent mesh, or worn gaskets that allow unfiltered air bypass',
      ],
    },
    {
      heading: 'Honest guidance on filtration, smoke & allergies',
      body: 'No single filter fits every HVAC unit, and no filter or duct cleaning guarantees allergy relief. Following EPA guidance on home air cleaners, pair properly sized HVAC filtration with source control, ventilation, and portable HEPA room cleaners when fine wildfire smoke (PM2.5) is a primary concern.',
    },
    {
      heading: 'Transparent pricing & pairing with air duct cleaning',
      body: 'Share your filter count, dimensions (printed on your current frame), and whether you already have an electrostatic/electronic unit or are evaluating one. Many LA homeowners bundle filter evaluation right into a residential air duct cleaning appointment (starting at $299) with all items quoted clearly in writing.',
    },
  ],
  faqs: [
    {
      question: 'Can every Los Angeles home HVAC system use an electrostatic air filter?',
      answer:
        'Not automatically. Filter compatibility depends on your return rack dimensions, blower static-pressure limits, and the HVAC manufacturer’s specifications. We verify sizing and airflow fit before recommending a change.',
    },
    {
      question: 'How often should a washable electrostatic filter be cleaned?',
      answer:
        'Most manufacturers recommend checking and rinsing washable filters every 30 to 60 days, or more often during heavy cooling months, renovations, or with indoor pets. Always let the filter dry completely before reinstalling.',
    },
    {
      question: 'Are washable electrostatic filters effective for Los Angeles wildfire smoke?',
      answer:
        'Standard passive washable electrostatic filters are designed primarily for larger airborne dust, lint, and dander—not microscopic wildfire smoke particles (PM2.5). For smoke events, EPA guidance recommends the highest MERV pleated filter your HVAC unit safely supports (such as MERV 13 if compatible) plus portable HEPA air cleaners.',
    },
    {
      question: 'Will upgrading my filter eliminate allergies or asthma symptoms?',
      answer:
        'No filter or cleaning service can promise medical symptom relief. Filtration helps reduce airborne particulate inside the HVAC loop alongside housekeeping, moisture control, and guidance from a healthcare professional.',
    },
    {
      question: 'Can you inspect or service my filter during an air duct cleaning visit?',
      answer:
        'Yes. Tell us your system count and current filter type when requesting your estimate so we can include filter inspection or servicing in your written scope.',
    },
  ],
  sources: [
    {
      label: 'EPA: Guide to Air Cleaners and Air Filters in the Home',
      url: 'https://www.epa.gov/indoor-air-quality-iaq/air-cleaners-and-air-filters-home',
    },
  ],
  relatedLinks: [
    { label: 'Residential air duct cleaning (from $299)', path: '/services/residential-air-duct-cleaning/' },
    { label: 'HVAC system & coil cleaning', path: '/services/hvac-system-cleaning/' },
    { label: 'Wildfire smoke & hillside duct assessment', path: '/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles/' },
    { label: 'Commercial electrostatic filter service', path: '/services/commercial-electrostatic-filter/' },
    { label: 'Air ducts, filtration & allergies guide', path: '/blog/clean-air-ducts-allergy-relief/' },
    { label: 'Pricing & written estimate guide', path: '/pricing/' },
  ],
};

export default function ResidentialElectrostaticFilter() {
  return <ServiceDetailLayout {...service} />;
}
