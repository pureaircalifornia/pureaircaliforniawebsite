import businessCatalog from './businessCatalog.json';

export const serviceGroups = [
  {
    id: 'home', title: 'For your home', shortTitle: 'Home', intro: 'For the rooms you live in.', landingPath: '/home-services/',
    image: '/images/visual-story/home-family-640.webp', imagePosition: 'center 62%', alt: 'A family beside a blue couch in a sunlit living room',
    items: [
      { label: 'Residential air duct cleaning', shortLabel: 'Air duct cleaning', path: '/services/residential-air-duct-cleaning/', detail: 'See what’s inside your ducts.', image: '/images/services/residential-duct-640.webp', alt: 'Sunlit Los Angeles living room with architectural ceiling air diffuser', imagePosition: 'center 42%' },
      { label: 'Residential dryer vent cleaning', shortLabel: 'Dryer vent cleaning', path: '/services/residential-dryer-vent-cleaning/', detail: 'Clear the lint. Care for the vent.', image: '/images/blog/dryer-vent-safety-guide-640.webp', alt: 'Pure Air California technician cleaning an exterior residential dryer vent with a rotary brush', imagePosition: 'center 35%' },
      { label: 'Home electrostatic filters', shortLabel: 'Electrostatic filters', path: '/services/residential-electrostatic-filter/', detail: 'Care for your reusable filters.', image: '/images/visual-story/consultation-pac-v3-640.webp', alt: 'PAC technician reviewing an air filter with a homeowner', imagePosition: 'center 38%' },
      { label: 'Wildfire smoke & hillside ducts', shortLabel: 'Wildfire smoke & ash', path: '/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles/', detail: 'Canyon ash & remodel dust.', image: '/images/cinematic/california-sky-v1.webp', alt: 'Los Angeles hillside homes overlooking the Santa Monica Mountains and basin', imagePosition: 'center 45%' },
    ],
  },
  {
    id: 'business', title: 'For your business', shortTitle: 'Business', intro: 'For the places people work and gather.', landingPath: '/industries/',
    image: '/images/coastal-v1/commercial-640.webp', imagePosition: '65% center', alt: 'A technician inspecting an open commercial ventilation duct',
    items: [
      { label: 'Commercial air duct cleaning', shortLabel: 'Air duct cleaning', path: '/services/commercial-air-duct-cleaning/', detail: 'Offices, facilities & shared spaces.', image: '/images/coastal-v1/commercial-640.webp', alt: 'A technician inspecting commercial metal ductwork', imagePosition: '66% center' },
      { label: 'Commercial dryer vent cleaning', shortLabel: 'Dryer vent cleaning', path: '/services/commercial-dryer-vent-cleaning/', detail: 'Hotels & shared laundry rooms.', image: '/images/hero/hvac-dryer-vent-realistic-640.webp', alt: 'Exterior commercial and residential dryer exhaust termination hood', imagePosition: 'center' },
      { label: 'Commercial electrostatic filters', shortLabel: 'Electrostatic filters', path: '/services/commercial-electrostatic-filter/', detail: 'Collector-cell cleaning & care.', image: '/images/pac/spiral-duct-diffuser.webp', alt: 'Commercial spiral HVAC ductwork with linear supply diffuser', imagePosition: 'center' },
      { label: 'Laundromat dryer vent cleaning', shortLabel: 'Laundromat vents', path: '/services/laundromat-dryer-vent-cleaning/', detail: 'Care for busy laundry exhausts.', image: '/images/pac/laundromat.webp', alt: 'Rows of commercial laundry machines in a laundromat', imagePosition: 'center' },
      { label: 'Commercial & HOA air care', shortLabel: 'Commercial & HOA', path: '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/', detail: 'Multi-unit dryer & HVAC systems.', image: '/images/industry-v2/property-management-640.webp', alt: 'Multifamily apartment and HOA courtyard in Los Angeles', imagePosition: 'center 48%' },
    ],
  },
  {
    id: 'system-care', title: 'Complete system care', shortTitle: 'System care', intro: 'For the equipment behind your comfort.', landingPath: '/services/#system-care',
    image: '/images/pac/rooftop-hvac-ductwork.webp', imagePosition: 'center 45%', alt: 'Commercial rooftop HVAC unit and rectangular galvanized ductwork run',
    items: [
      { label: 'HVAC system cleaning', shortLabel: 'HVAC cleaning', path: '/services/hvac-system-cleaning/', detail: 'Equipment. Components. Connections.', image: '/images/pac/duct-cleaning-interior-v2.webp', alt: 'Rotary agitation brush cleaning inside a galvanized HVAC air duct', imagePosition: 'center' },
      { label: 'Dryer vent maintenance', shortLabel: 'Vent maintenance', path: '/services/dryer-vent-maintenance-program/', detail: 'Make ongoing care part of the plan.', image: '/images/pac/dryer.webp', alt: 'A dryer vent cleaning brush removing accumulated lint', imagePosition: 'center' },
      { label: 'Air duct sanitizing', shortLabel: 'Duct sanitizing', path: '/services/air-duct-sanitizing/', detail: 'Options after a system assessment.', image: '/images/pac/duct-interior-clean-v2.webp', alt: 'The inside of a spotless cleaned ventilation duct', imagePosition: 'center' },
    ],
  },
] as const;

export type ServiceGroup = typeof serviceGroups[number];
export type ServiceGroupId = ServiceGroup['id'];

export const commercialMarkets = businessCatalog.map(market => ({
  label: market.label, detail: market.intro, path: market.parentPath,
  image: market.image.replace('-1280.webp', '-640.webp'),
  alt: market.alt,
}));
