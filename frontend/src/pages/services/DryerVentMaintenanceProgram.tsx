import ServiceDetailLayout from '@/components/ServiceDetailLayout';

const service = {
  seoTitle: 'Dryer Vent Maintenance Program Los Angeles | Pure Air CA',
  seoDescription:
    'Scheduled dryer vent inspection & lint removal programs for Los Angeles HOAs, apartments, hotels & homes. Written schedules & logs. Call (213) 792-4145.',
  path: '/services/dryer-vent-maintenance-program',
  h1: 'Scheduled Dryer Vent Maintenance Programs in Los Angeles',
  intro:
    'Prevent dense lint buildup, overheating laundry rooms, and reactive emergency calls with a recurring dryer vent inspection and cleaning plan. Pure Air California builds practical, usage-based maintenance programs for Los Angeles HOAs, multifamily buildings, hotels, athletic studios, laundromats, and single-family homes.',
  serviceName: 'Dryer Vent Maintenance Program',
  breadcrumbLabel: 'Dryer Vent Maintenance',
  estimateLabel: 'Plan a maintenance schedule',
  heroReassurance: 'Annual, semi-annual & quarterly plans · Service logs · Homes, HOAs & commercial LA properties',
  coverageText:
    'Scheduled dryer vent maintenance across Los Angeles County, including Westwood, Santa Monica, Encino, Burbank, Sherman Oaks, and Downtown LA.',
  quickFacts: [
    { label: 'Program intervals', value: 'Quarterly, semi-annual or annual by usage' },
    { label: 'Documentation', value: 'Dated per-unit & riser service logs' },
    { label: 'Ideal for', value: 'HOAs, apartments, hotels, gyms & homes' },
  ],
  sections: [
    {
      heading: 'What each scheduled maintenance visit covers',
      body: 'Instead of waiting until drying cycles double or high-limit switches trip, a planned visit checks and clears the accessible exhaust pathway on a predictable timetable tailored to how heavily your dryers run.',
      bullets: [
        'Full-path mechanical lint extraction from accessible behind-dryer connectors to exterior terminations',
        'Clearing of exterior wall louvers, bird guards, or accessible rooftop exhaust caps',
        'Inspection of accessible booster fans, secondary lint boxes, and shared exhaust manifolds',
        'Visual check for crushed transition foil, loose clamps, or airflow restrictions needing repair',
        'Dated maintenance log identifying completed units, inaccessible lines, and recommended next interval',
      ],
    },
    {
      heading: 'Choosing the right interval for your LA property',
      body: 'A two-person condo household and a 50-unit apartment laundry room accumulate lint at completely different rates. After the initial inspection and cleaning, we help you pick a sensible schedule grounded in actual lint volume rather than unnecessary visits.',
      bullets: [
        'Single-family homes & individual condos: typically annual inspection/cleaning (more often for large households or long roof runs)',
        'Multifamily HOA common laundry rooms & boutique hotels: often semi-annual based on daily cycles',
        'High-volume laundromats, gyms, spas & pet-care facilities: quarterly or semi-annual depending on machine banks and lint loading',
      ],
    },
    {
      heading: 'Built for HOA boards & Los Angeles property managers',
      body: 'Coordinating multi-unit dryer vents across occupied buildings takes clear communication. We streamline recurring cycles so your management team has fewer resident headaches and cleaner owner records.',
      bullets: [
        'Advance resident notice planning and grouped unit-block access windows',
        'Clear separation between individual dwelling lines and shared building stacks or roof exits',
        'Certificate of Insurance (COI) kept aligned with your property management vendor requirements',
        'Unit-by-unit completion list noting any missed-access units for easy follow-up',
      ],
    },
    {
      heading: 'Transparent program pricing & written terms',
      body: 'Maintenance pricing is quoted per property based on total vent count, wall vs. roof access, shared manifolds or booster fans, and visit frequency. Single-unit residential cleanings start at $149; multi-unit and commercial programs receive an itemized written proposal with clear per-visit pricing before you commit.',
    },
    {
      heading: 'Daily safe habits between scheduled visits',
      body: 'Recurring duct service works hand in hand with everyday care. Keep machine lint screens clean before and after every cycle, avoid overloading dryers, and report sudden drying slowdowns right away—cleaning reduces lint hazards but does not replace appliance repair or safe dryer operation.',
    },
  ],
  faqs: [
    {
      question: 'Is a dryer vent maintenance program only for commercial buildings and HOAs?',
      answer:
        'No. Individual homeowners—especially those with long concealed vents, second-story roof exits, large families, or pets—can also set simple annual reminders and scheduled visits alongside our multifamily and commercial clients.',
    },
    {
      question: 'How is recurring dryer vent maintenance priced?',
      answer:
        'Pricing reflects the number of vents or dryer banks, routing complexity, rooftop or booster-fan access, and the agreed visit interval. Individual residential visits start at $149; HOA and commercial properties receive a written per-property proposal.',
    },
    {
      question: 'What documentation do HOA boards and property managers receive?',
      answer:
        'We provide dated completion records listing serviced units, shared exhaust lines or roof terminations covered, accessible-condition notes, and any units that could not be accessed or require separate mechanical repair.',
    },
    {
      question: 'Does a maintenance program guarantee a dryer will never have a fire?',
      answer:
        'No service can make an absolute guarantee. Scheduled exhaust cleaning addresses flammable lint buildup inside accessible vent runs; daily lint-screen care, safe venting materials, proper installation, and working appliance safeties are equally essential.',
    },
    {
      question: 'Can we combine annual HVAC or common-area duct checks with dryer vent maintenance?',
      answer:
        'Yes. Many Los Angeles HOAs and commercial facilities coordinate common-area HVAC or filter checks during the same scheduled building access window to simplify logistics.',
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
      label: 'Residential dryer vent cleaning (from $149)',
      path: '/services/residential-dryer-vent-cleaning/',
    },
    {
      label: 'Commercial dryer vent cleaning',
      path: '/services/commercial-dryer-vent-cleaning/',
    },
    {
      label: 'Commercial & HOA air duct + dryer vent care',
      path: '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/',
    },
    {
      label: 'Property managers & HOA services',
      path: '/property-managers/',
    },
    {
      label: 'Laundromat dryer vent cleaning',
      path: '/services/laundromat-dryer-vent-cleaning/',
    },
    {
      label: '42-unit LA apartment community case study',
      path: '/case-studies/apartment-community-42-units/',
    },
  ],
};

export default function DryerVentMaintenanceProgram() {
  return <ServiceDetailLayout {...service} />;
}
