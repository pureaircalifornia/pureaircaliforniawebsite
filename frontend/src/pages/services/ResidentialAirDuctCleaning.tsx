import ServiceDetailLayout from '@/components/ServiceDetailLayout';
import { useLocation } from 'react-router-dom';
import { Link } from '@/components/CanonicalLink';
import { quoteContext, quoteLink } from '@/utils/quoteContext.mjs';

const content = {
  seoTitle: 'Residential Air Duct Cleaning Los Angeles | From $299',
  seoDescription:
    'Inspection-led residential air duct cleaning across Los Angeles starting at $299. Clear dust & remodel debris with a written scope. Call (213) 792-4145.',
  path: '/services/residential-air-duct-cleaning',
  h1: 'Residential Air Duct Cleaning in Los Angeles',
  intro:
    'Care for the air pathways in your home with inspection-led, negative-pressure air duct cleaning for Los Angeles houses, condos, and estates. Starting at $299 for eligible scopes, we clear settled dust and renovation debris from accessible supply and return ductwork—with your full written scope and price confirmed before work begins.',
  serviceName: 'Residential Air Duct Cleaning',
  breadcrumbLabel: 'Residential Air Duct Cleaning',
  startingPrice: 299,
  startingPriceLabel: 'Starting at $299',
  startingPriceNote:
    'Eligible single-system residential scopes; final written price confirmed by system count, access, and duct condition.',
  quickFacts: [
    { label: 'Starting price', value: 'From $299 (eligible home scopes)' },
    { label: 'Scope policy', value: 'Inspection-led · Written upfront quote' },
    { label: 'LA neighborhoods', value: 'Westside, Valley, Metro & Coastal LA' },
  ],
  sections: [
    {
      heading: 'What is included in our inspection-led cleaning',
      body: 'Supply ducts carry conditioned air to your living spaces while return ducts bring indoor air back to the air handler. Before any hoses enter your home, we inspect accessible registers, trunk lines, and equipment access so your written estimate clearly states every included component and any separately priced HVAC items.',
      bullets: [
        'Pre-cleaning visual inspection of accessible registers, returns, and trunk connections',
        'Floor, furniture, and register-surround protection across work areas',
        'Mechanical agitation paired with negative-pressure vacuum extraction on accessible supply and return runs',
        'Cleaning of accessible registers and grilles in the agreed scope',
        'Optional add-on inspection for blower assemblies, plenums, evaporator coils, or dryer vents (itemized separately)',
      ],
    },
    {
      heading: 'Signs your Los Angeles home may warrant an inspection',
      body: 'Following EPA guidance, not every home needs routine duct cleaning on a rigid calendar. Instead, focus on observable conditions inside the home and system—such as visible debris blowing from vents, post-remodel dust, or persistent buildup inside accessible returns.',
      bullets: [
        'Recent remodeling, drywall sanding, flooring work, or home construction where the HVAC system was exposed',
        'Visible dust, lint, or loose debris released from supply registers when the system runs',
        'Moving into an older or previously occupied Los Angeles residence with unknown HVAC maintenance history',
        'Evidence of pests or rodent intrusion inside accessible ductwork or attic chases',
        'Heavy wildfire smoke, canyon ash, or Santa Ana wind dust intrusion around air intakes and returns',
      ],
    },
    {
      heading: 'Los Angeles housing stock & ductwork considerations',
      body: 'Los Angeles homes span 1920s Spanish and Craftsman bungalows, mid-century ranch homes, hillside multi-zone estates, and high-rise Westside condominiums. Duct material and layout directly shape the safe cleaning method: sheet-metal trunk lines, internally lined plenums, and flexible attic ducts require different tools and containment approaches.',
      bullets: [
        'Older LA sheet-metal and lined ducts: verified for seams, insulation integrity, and delicate architectural grilles',
        'Attic and crawlspace air handlers common in San Fernando Valley & Pasadena homes: checked for safe access and disconnected runs',
        'Condos and high-rises in Beverly Hills, Westwood, Century City & Downtown LA: coordinated around HOA rules, elevators, and work hours',
        'Honest boundary: duct cleaning removes accessible debris—it does not repair crushed ducts, fix sizing issues, or replace moisture remediation',
      ],
    },
    {
      heading: 'Transparent starting cost & what drives your written quote',
      body: 'Residential air duct cleaning starts at $299 for eligible single-system scopes, with every quote confirmed in writing before work starts. Square footage alone does not determine the work: the true cost drivers are the number of separate HVAC systems (air handlers), register count, attic or roof access, duct material, and whether coils, blowers, or dryer vents are added.',
      bullets: [
        'Number of separate HVAC air handlers / zones serving floors, additions, or guest houses',
        'Accessible supply and return register count and main trunk layout',
        'Attic, crawlspace, closet, or multi-story access conditions',
        'Separately itemized options: dryer vent cleaning (from $149), blower/coil cleaning, or reusable filter service',
      ],
    },
    {
      heading: 'How to prepare your home or condo for the visit',
      body: 'Simple preparation keeps the visit smooth and protects your finishes. Clear a safe path to your thermostat, air handler closet or attic hatch, and accessible room vents. For managed buildings, let us know about loading zones, parking permits, or vendor insurance paperwork in advance.',
      bullets: [
        'Keep pets in a separate comfortable room away from open access points and hoses',
        'Identify the thermostat, air handler location, and any recently renovated rooms',
        'Flag fragile plaster, custom linear diffusers, or delicate furniture near vents',
        'Confirm condo/HOA work hours, elevator reservations, or gate access beforehand',
      ],
    },
    {
      heading: 'After the cleaning: walkthrough & ongoing care',
      body: 'Before our technicians pack up, we walk through the completed scope, share accessible-condition observations or photos, and note any sections that could not be safely reached. Keep up with properly fitted HVAC filter changes and manufacturer equipment maintenance; if uneven airflow, odors, or moisture persist, we explain when a separate HVAC diagnostic is the smarter next step.',
    },
  ],
  faqs: [
    {
      question: 'How much does residential air duct cleaning cost in Los Angeles?',
      answer:
        'Eligible single-system residential scopes start at $299. Final pricing depends on how many HVAC systems serve your home, register count, duct material, access (attic, crawlspace, or condo closet), and whether you add HVAC coil/blower cleaning or dryer vent cleaning. You always receive a written scope and confirmed price before any work starts.',
    },
    {
      question: 'Does every home need air duct cleaning on a fixed schedule?',
      answer:
        'No. Following EPA guidance, duct cleaning should be decided by system condition rather than a blanket calendar. Recent remodeling, visible debris at registers, pest activity, or moving into an older home with unknown history are common reasons to inspect first.',
    },
    {
      question: 'How long does a home air duct cleaning appointment take?',
      answer:
        'Appointment length depends on the number of HVAC systems, vent count, layout, and access. A straightforward single-system home takes less time than a multi-zone hillside residence. We give you a realistic time window once we review your property details.',
    },
    {
      question: 'Can air duct cleaning cure allergies or fix weak room airflow?',
      answer:
        'Duct cleaning removes accumulated loose dust and debris from accessible ductwork, but it is not a medical treatment and cannot guarantee allergy relief. Similarly, while clearing heavy buildup helps the air pathway, weak airflow can also stem from clogged filters, leaky ducts, damper positions, or blower issues that require an HVAC repair technician.',
    },
    {
      question: 'Can an estate manager or house manager coordinate service for the homeowner?',
      answer:
        'Yes. Identify the person authorized to approve the written scope and the site contact providing entry. Share system counts (including guest houses), gate or parking logistics, delicate finishes, and what completion documentation the owner or manager needs.',
    },
  ],
  relatedLinks: [
    {
      label: 'Los Angeles pricing & written estimate guide',
      path: '/pricing/',
    },
    {
      label: 'Residential dryer vent cleaning (from $149)',
      path: '/services/residential-dryer-vent-cleaning/',
    },
    {
      label: 'Wildfire smoke & hillside air duct cleaning',
      path: '/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles/',
    },
    {
      label: 'Complete HVAC system cleaning (coils & blowers)',
      path: '/services/hvac-system-cleaning/',
    },
    {
      label: 'Residential electrostatic air filters',
      path: '/services/residential-electrostatic-filter/',
    },
    {
      label: 'Air duct cleaning & indoor air quality explained',
      path: '/health-benefits/',
    },
  ],
};

export default function ResidentialAirDuctCleaning() {
  const { search } = useLocation();
  const estate = quoteContext(content.path, search).property === 'estate';
  return (
    <ServiceDetailLayout
      {...content}
      h1={estate ? 'Air Duct Cleaning for Los Angeles Homes & Estates' : content.h1}
      intro={
        estate
          ? 'One clear plan for the home you manage—from multiple HVAC systems to gate access, delicate finishes, and the owner’s preferred work windows. Coordinate the scope, written estimate, and completion records with PAC before service.'
          : content.intro
      }
      estimateLabel={estate ? 'Request an estate estimate' : 'Get a home cleaning estimate'}
      heroReassurance="Starting at $299 · Written scope confirmed before work · Beverly Hills, Santa Monica, Malibu & Greater LA"
      coverageText="Home and estate service across Beverly Hills, Santa Monica, Malibu, Bel Air, Hollywood Hills, Pasadena, and Greater Los Angeles."
      estateStory={estate}
    >
      <section className="pac-section pac-container" aria-labelledby="managed-home-heading">
        <div className="pac-section-heading">
          <div>
            <span className="pac-eyebrow">FOR HOMEOWNERS &amp; ESTATE TEAMS</span>
            <h2 id="managed-home-heading">
              Care for the details.
              <br />
              <em>Confidence in the plan.</em>
            </h2>
          </div>
          <p>
            Whether you own the home or manage it for someone else, know what will be cleaned, how access will work, and who approves the next step.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [
              'Map the systems',
              'List each air handler and the rooms or buildings it serves, including guest houses or separate wings when relevant. System count and access shape the estimate.',
            ],
            [
              'Confirm the right contact',
              'Name the homeowner or manager authorized to approve the work, plus the person meeting the team. Agree how any additional findings will be reviewed.',
            ],
            [
              'Plan access & timing',
              'Share gate, parking, and equipment-access arrangements, occupied rooms, and delicate finishes. Requested work windows are confirmed with PAC before service.',
            ],
            [
              'Agree the completion record',
              'Discuss the records the owner or manager needs, such as completed areas, accessible-condition photos, and any sections that could not be reached.',
            ],
          ].map(([heading, body]) => (
            <article key={heading}>
              <h3 className="text-xl font-semibold mb-3">{heading}</h3>
              <p className="text-gray-600 leading-relaxed">{body}</p>
            </article>
          ))}
        </div>
        <p className="mt-8">
          <Link className="pac-text-link" to={quoteLink(content.path, '?property=estate')}>
            Plan service for a managed home or estate →
          </Link>
        </p>
      </section>
    </ServiceDetailLayout>
  );
}
