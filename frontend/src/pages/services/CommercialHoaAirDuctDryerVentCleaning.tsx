import LeadLanding from '@/components/LeadLanding';
import { Link } from '@/components/CanonicalLink';

const faqs = [
  {
    question: 'How much does commercial or HOA air duct and dryer vent cleaning cost?',
    answer:
      'Commercial and multi-unit work is quoted for the specific property. Share the number of HVAC systems or dryer lines, building layout, access restrictions, and preferred work window. Your written proposal distinguishes individual units, shared risers/common equipment, optional components, and reporting deliverables. Residential starting prices do not set an HOA per-unit rate.',
  },
  {
    question: 'Can you schedule around residents, guests, or building operating hours?',
    answer:
      'Yes. Share your preferred work window, resident notice lead times, and building quiet-hour rules. We coordinate phased unit blocks, early-morning, or weekend scheduling with the authorized property manager before locking in dates.',
  },
  {
    question: 'What insurance (COI) and completion documentation can we request?',
    answer:
      'Send your vendor onboarding and Certificate of Insurance (COI) or additional-insured wording before approving a proposal. We confirm available coverage, per-unit checklists, before-and-after accessible photos, and exception logs in writing. Note that a cleaning report documents completed maintenance—it is not a fire-code certification or guarantee of insurer underwriting approval.',
  },
  {
    question: 'Do all apartment dryer vents and HOA systems need cleaning on the same schedule?',
    answer:
      'No. Intervals depend on usage intensity, vent run length, shared-riser geometry, and observed lint loading. High-use community laundry rooms often need more frequent attention than individual condo units. We recommend intervals based on actual inspection findings.',
  },
  {
    question: 'Can you separate individual unit charges from common-area HOA scopes?',
    answer:
      'Yes. We structure proposals clearly by common-area HVAC, shared exhaust stacks/roof exits, and accessible in-unit runs so HOA boards and property managers can allocate budgets and approvals accurately.',
  },
];

const programs = [
  [
    'HOAs & multifamily communities',
    'Coordinate unit-by-unit dryer lines, vertical risers, roof terminations, garage exhaust, and common-area HVAC with resident notices and clear manager reporting.',
    '/property-managers/',
  ],
  [
    'Offices, hotels & fitness studios',
    'Itemize supply and return ducts, accessible plenums, blowers, coils, and laundry exhaust around tenant, guest, security, and freight-elevator schedules.',
    '/services/commercial-air-duct-cleaning/',
  ],
  [
    'Shared laundry rooms & laundromats',
    'Map every dryer bank, shared manifold trunk, booster fan, and roof hood—with phased shutdown windows that keep laundry operations moving.',
    '/services/laundromat-dryer-vent-cleaning/',
  ],
  [
    'Recurring maintenance & filtration',
    'Pair scheduled dryer exhaust care with electrostatic collector-cell or filter maintenance logs across multi-building Los Angeles portfolios.',
    '/services/dryer-vent-maintenance-program/',
  ],
];

export default function CommercialHoaAirDuctDryerVentCleaning() {
  return (
    <LeadLanding
      path="/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/"
      title="Commercial & HOA Duct Cleaning Los Angeles | PAC"
      description="Commercial HVAC & HOA dryer vent cleaning across Los Angeles. COI-ready proposals, resident coordination & written scopes. Call (213) 792-4145."
      serviceName="Commercial and HOA air duct and dryer vent cleaning"
      eyebrow="Commercial & HOA air care"
      heading={
        <>
          Commercial &amp; HOA Air Duct
          <br />
          <em>and Dryer Vent Cleaning in Los Angeles.</em>
        </>
      }
      intro="Coordinate multi-unit dryer vent stacks, common-area HVAC ductwork, and commercial ventilation cleaning across Greater Los Angeles—with COI documentation, resident notice planning, unit-by-unit closeout records, and a clear written scope before work begins."
      quoteHref="/quote/?property=managed&service=air-duct#estimate-builder"
      faqs={faqs}
    >
      <section>
        <span className="pac-eyebrow">CARE FOR THE WHOLE PROPERTY</span>
        <h2>
          Commercial &amp; HOA cleaning,
          <br />
          <em>with every unit and system accounted for.</em>
        </h2>
        <p>
          Pure Air California provides inspection-led air duct, dryer exhaust, HVAC component, and electrostatic filter cleaning for Los Angeles HOA boards, multifamily portfolios, and commercial buildings. Start with your building layout, equipment count, and access rules—we deliver a board-ready written scope before work is scheduled.
        </p>
        <div className="pac-lead-cards">
          {programs.map(([title, text, path]) => (
            <article className="pac-lead-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
              <Link className="pac-text-link" to={path}>
                Explore this service →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section>
        <span className="pac-eyebrow">LESS GUESSWORK BEFORE DISPATCH</span>
        <h2>Four steps to a board-ready proposal.</h2>
        <ol>
          <li>
            <strong>Share the building profile.</strong> Send your LA city/ZIP, property type, approximate unit or HVAC system count, and whether dryer vents are individual or shared stacks.
          </li>
          <li>
            <strong>Map access, COI &amp; authority.</strong> Confirm resident-entry notices, roof/mechanical-room keys, parking/loading, and Certificate of Insurance wording.
          </li>
          <li>
            <strong>Approve an itemized written scope.</strong> Review included components, exclusions, phased work windows, optional add-ons, and confirmed pricing before work begins.
          </li>
          <li>
            <strong>Receive organized closeout records.</strong> Get unit-by-unit completion notes, accessible-condition photos, and a clear list of inaccessible lines or mechanical items needing a separate trade.
          </li>
        </ol>
        <div className="flex flex-wrap gap-6 mt-4">
          <a className="pac-text-link" href="/resources/hoa-facility-planning-checklist.txt" download>
            Download the HOA &amp; facility planning checklist ↓
          </a>
          <Link className="pac-text-link" to="/quote/?property=managed&service=dryer-vent#estimate-builder">
            Request an HOA dryer vent quote →
          </Link>
        </div>
      </section>

      <section>
        <span className="pac-eyebrow">DOCUMENTED LA EXPERIENCE</span>
        <h2>Commercial &amp; multifamily scopes you can review.</h2>
        <p>
          Our documented Los Angeles work includes a 42-unit apartment community full-property clean, guestroom ventilation and coil work at Four Seasons Hotel Los Angeles, dryer exhaust cleaning at SoulCycle’s Brentwood and Culver City studios, and a four-system West Hollywood office scope. Each project page states its exact recorded components and date.
        </p>
        <div className="pac-lead-links">
          <Link to="/case-studies/apartment-community-42-units/">42-unit apartment community</Link>
          <Link to="/case-studies/four-seasons-los-angeles-ventilation/">Four Seasons guestroom systems</Link>
          <Link to="/case-studies/soulcycle-westside-dryer-vents/">SoulCycle dryer exhaust</Link>
          <Link to="/case-studies/nonprofit-housing-office-hvac/">West Hollywood office HVAC</Link>
          <Link to="/project-stories/">All project stories</Link>
        </div>
      </section>

      <section>
        <h2>Serving managed buildings across Greater Los Angeles.</h2>
        <p>
          Whether managing a mid-rise HOA in Westwood or Century City, a multifamily complex in Sherman Oaks, or a commercial portfolio in Downtown LA, give us your vent routing and access constraints so your quote matches the building—not a generic template.
        </p>
        <div className="pac-lead-links">
          <Link to="/locations/los-angeles/">Los Angeles</Link>
          <Link to="/locations/century-city/">Century City</Link>
          <Link to="/locations/westwood/">Westwood</Link>
          <Link to="/locations/sherman-oaks/">Sherman Oaks</Link>
          <Link to="/locations/culver-city/">Culver City</Link>
          <Link to="/industries/commercial-real-estate/">Offices &amp; CRE</Link>
          <Link to="/services/commercial-dryer-vent-cleaning/">Commercial dryer vents</Link>
          <Link to="/pricing/">Pricing &amp; estimates</Link>
        </div>
      </section>
    </LeadLanding>
  );
}
