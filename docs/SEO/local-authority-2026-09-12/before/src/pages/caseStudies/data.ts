/**
 * Commercial case studies.
 *
 * Every figure below comes from Pure Air California's own completed job records
 * (project reports and invoices). Clients are described by property type and
 * scope rather than by name: publishing a client's identity, or any of the
 * contact details that appear on the source invoices, needs that client's
 * written sign-off first. Once a client agrees to be named, swap `client` for
 * their name and add a quote — a named case study is considerably stronger.
 */

export interface CaseStudy {
  slug: string;
  /** Anonymised client descriptor. Replace with the real name once cleared. */
  client: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  vertical: string;
  location: string;
  /** Headline numbers pulled from the job record. */
  stats: { label: string; value: string }[];
  challenge: string[];
  approach: string[];
  outcome: string[];
  scope: string[];
  relatedService: { label: string; path: string };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'apartment-community-42-units',
    client: 'A Los Angeles property management company',
    title: '42-Unit Apartment Community: Full Property Ventilation Clean',
    seoTitle: 'Case Study: 42-Unit Apartment Duct Cleaning',
    seoDescription:
      'Ducts, dryer vents and parking garage exhaust cleaned across a 42-unit Los Angeles apartment community, with before-and-after documentation.',
    vertical: 'Multifamily / Property Management',
    location: 'Los Angeles, CA',
    stats: [
      { label: 'Units serviced', value: '42' },
      { label: 'Systems covered', value: '3' },
      { label: 'Documentation', value: 'Before & after, per area' },
    ],
    challenge: [
      'Forty-two occupied apartments meant the work had to move unit by unit without leaving residents without ventilation or laundry for any length of time.',
      'Three separate systems needed attention — in-unit air ducts, dryer vents, and the parking garage exhaust — each with different access requirements and different risks if left uncleaned.',
      'Dryer vent lint accumulation across a building of this size is a fire-risk issue, not a comfort issue, so it could not be treated as secondary to the duct work.',
      'The property manager needed evidence the work had actually been done in every unit, not a single summary invoice at the end.',
    ],
    approach: [
      'Scheduled the property in blocks so each occupied unit was offline for the shortest possible window and residents kept access to laundry throughout.',
      'Cleaned in-unit supply and return ductwork to NADCA standards, including registers, plenums and the blower and furnace assemblies.',
      'Cleared each dryer vent run end to end and confirmed correct termination — long or crushed runs are the common failure point in multifamily buildings.',
      'Cleaned the parking garage exhaust system, which handles vehicle exhaust and is frequently the most neglected system on a residential property.',
      'Photographed every area before and after so the manager received per-area evidence rather than a single completion note.',
    ],
    outcome: [
      'All 42 units completed end to end, covering ductwork, dryer vents and garage exhaust.',
      'The property manager received a documented before-and-after report covering each serviced area, suitable for owner reporting and maintenance records.',
      'Dryer vent lint loading — the property’s most direct fire risk — was cleared building-wide rather than unit by unit on complaint.',
    ],
    scope: [
      'In-unit air duct cleaning × 42',
      'Dryer vent cleaning and termination check × 42',
      'Parking garage exhaust system cleaning',
      'Per-area before-and-after photographic documentation',
    ],
    relatedService: { label: 'Property managers & HOAs', path: '/property-managers' },
  },
  {
    slug: 'nonprofit-housing-office-hvac',
    client: 'A West Hollywood affordable-housing nonprofit',
    title: 'Weekend HVAC Clean for an Occupied Nonprofit Office',
    seoTitle: 'Case Study: Weekend Office HVAC Cleaning',
    seoDescription:
      'A 3,137 sq ft West Hollywood office with four HVAC units cleaned across a single weekend, with zero disruption to weekday operations. Full scope and approach.',
    vertical: 'Commercial Office / Nonprofit',
    location: 'West Hollywood, CA',
    stats: [
      { label: 'Floor area', value: '3,137 sq ft' },
      { label: 'HVAC units', value: '4' },
      { label: 'Downtime', value: 'Zero weekday hours' },
    ],
    challenge: [
      'The office ran a full weekday schedule and could not lose working hours to the cleaning.',
      'Four separate HVAC units served the floor, each with its own plenum, blower, furnace box and coil assembly — a partial clean on any one of them would have left contaminated air circulating.',
      'As a nonprofit, the organisation needed a fixed, transparent price rather than an open-ended hourly arrangement.',
    ],
    approach: [
      'Scheduled the entire project across a single Saturday and Sunday so the office opened as normal on Monday.',
      'Cleaned, brushed and vacuumed the complete ventilation system across all four units.',
      'Installed access doors where needed and disinfected the ventilation system throughout, including all four plenums.',
      'Cleaned each blower assembly and furnace box, and cleaned all four coil assemblies inside and out — coils are where neglected systems lose most of their efficiency.',
      'Quoted the work as a single fixed price agreed before the job started.',
    ],
    outcome: [
      'All four HVAC units cleaned end to end across 3,137 square feet in one weekend.',
      'The office opened normally on Monday morning with no lost weekday hours.',
      'The organisation received a fixed price agreed up front, with no variation on completion.',
    ],
    scope: [
      'Complete cleaning, brushing and vacuuming of the ventilation system',
      'Access door installation and system disinfection, 4 plenums',
      'Blower and furnace box cleaning × 4',
      'Interior and exterior coil cleaning × 4',
    ],
    relatedService: { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' },
  },
];

export const getCaseStudy = (slug?: string) =>
  caseStudies.find((c) => c.slug === slug);
