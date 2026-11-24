import ServiceDetailLayout from '@/components/ServiceDetailLayout';
import { Link } from '@/components/CanonicalLink';

const content = {
  seoTitle: 'Commercial Air Duct Cleaning Los Angeles | Pure Air CA',
  seoDescription:
    'Commercial air duct & HVAC cleaning across Los Angeles County. Site-specific written scopes, COI documentation & off-hours scheduling. Call (213) 792-4145.',
  path: '/services/commercial-air-duct-cleaning',
  h1: 'Commercial Air Duct Cleaning Across Los Angeles County',
  intro:
    'Keep your building’s HVAC ventilation clean, documented, and well maintained without disrupting tenants or daily operations. From offices, medical clinics, and hotels to retail showrooms and industrial spaces, Pure Air California delivers a building-specific written scope, COI documentation, and confirmed pricing before work begins.',
  estimateLabel: 'Get a commercial estimate',
  coverageText:
    'Commercial service across Los Angeles County—from Downtown LA, Century City, and the Westside to the San Fernando Valley, Pasadena, and the South Bay.',
  heroReassurance: 'All Los Angeles County · COI-ready · After-hours & weekend scheduling available',
  serviceName: 'Commercial Air Duct Cleaning',
  breadcrumbLabel: 'Commercial Air Duct Cleaning',
  quickFacts: [
    { label: 'Commercial pricing', value: 'Itemized building-specific written scope' },
    { label: 'B2B readiness', value: 'COI / vendor docs · Off-hours & phased' },
    { label: 'Coverage', value: 'All Los Angeles County & Ventura County' },
  ],
  sections: [
    {
      heading: 'What is included in a commercial ventilation scope',
      body: 'Commercial HVAC networks often combine rooftop package units, central air handlers, VAV boxes, and long supply/return trunk runs. Every proposal itemizes the exact zones and components included so facility managers and property owners can compare bids accurately.',
      bullets: [
        'Supply and return ductwork cleaning for specified air handlers and tenant zones',
        'Diffuser, register, and return grille removal, cleaning, and reinstallation',
        'Negative-pressure containment and workspace protection for occupied interiors',
        'Optional itemized add-ons: accessible air handlers, plenums, blower assemblies, evaporator coils, and filter banks',
        'Clear documentation of completed zones, access limitations, and follow-up maintenance notes',
      ],
    },
    {
      heading: 'Signs your Los Angeles facility needs a ventilation inspection',
      body: 'Commercial spaces experience heavier occupancy, tenant build-outs, and continuous HVAC runtime than residential homes. Schedule an assessment when building conditions point to duct or component buildup.',
      bullets: [
        'Recent tenant improvements (TI), drywall work, ceiling grid modifications, or floor resurfacing',
        'Visible dark dust streaks around ceiling diffusers or heavy lint/debris loading on return grilles',
        'Long-running rooftop package units or multi-tenant air handlers with no documented cleaning history',
        'Wildfire smoke infiltration, musty odors near air handlers, or uneven zone comfort complaints',
        'Preparing a commercial suite, clinic, or hospitality space for new occupancy or seasonal turnover',
      ],
    },
    {
      heading: 'Coordinating tenants, access & COI documentation in LA',
      body: 'Smooth commercial work starts with logistics. Before dispatch, we align with building engineers, property managers, and security teams on loading zones, freight elevators, roof hatches, after-hours entry, and vendor insurance certificates.',
      bullets: [
        'Certificate of Insurance (COI) and additional-insured paperwork coordinated prior to scheduling',
        'After-hours, early-morning, weekend, or phased floor-by-floor scheduling options',
        'Clear separation between landlord-controlled central systems and tenant-controlled units',
        'Honest boundary: duct cleaning is a defined maintenance task—not mechanical repair, air balancing, or code certification',
      ],
    },
    {
      heading: 'What shapes a commercial duct cleaning estimate',
      body: 'Residential flat-rate packages do not apply to commercial buildings. Your written estimate reflects unit count, ceiling height and lift requirements, duct configuration, contamination level, off-hours access constraints, and closeout reporting expectations.',
      bullets: [
        'Number and type of air handlers, rooftop package units, or fan-coil units',
        'Duct access (drop-tile ceilings, exposed spiral duct, mechanical rooms, or high-bay roofs)',
        'Phased or overnight scheduling requirements and escort logistics',
        'Closeout deliverables such as per-zone notes and before-and-after photography',
      ],
    },
    {
      heading: 'Industry-specific ventilation planning across LA County',
      body: 'An outpatient clinic, a hotel floor, a dining room, and a warehouse have completely different occupancy rules and air-system boundaries. For food-service properties, comfort HVAC ducts are scoped separately from kitchen grease hoods; for healthcare sites, work is coordinated with facility and infection-prevention staff.',
    },
    {
      heading: 'Closeout records that help your next maintenance cycle',
      body: 'Before closeout, we verify the agreed checklist with your site contact and flag inaccessible duct segments, worn filter frames, or mechanical issues that warrant an HVAC contractor. Organized per-unit records make future budgeting and vendor comparisons straightforward.',
    },
  ],
  faqs: [
    {
      question: 'Can commercial air duct cleaning be scheduled after hours or on weekends?',
      answer:
        'Yes. Share your building’s operating hours, quiet-hour policies, and security/escort requirements when requesting a quote. We confirm after-hours, early-morning, weekend, or phased availability before booking.',
    },
    {
      question: 'Do you provide Certificates of Insurance (COI) for LA commercial buildings?',
      answer:
        'Send your property management company’s vendor and COI wording requirements before approving the scope. We coordinate standard insurance documentation ahead of your scheduled work window.',
    },
    {
      question: 'Do you work with property managers, HOA boards, and multi-building portfolios?',
      answer:
        'Yes. We serve commercial offices, retail centers, hotels, schools, and multifamily HOA communities across Los Angeles County, separating common-area systems from individual tenant or resident units clearly in writing.',
    },
    {
      question: 'Does a commercial duct quote automatically include coils, blowers, or kitchen hoods?',
      answer:
        'No—each component is listed explicitly so you know exactly what you are paying for. Supply/return ductwork, air handlers/coils/blowers, commercial dryer vents, and filter programs are itemized clearly, and kitchen grease-hood certification is outside routine comfort-HVAC duct cleaning.',
    },
    {
      question: 'What details speed up an accurate commercial estimate?',
      answer:
        'Share your property city/ZIP, building type, approximate HVAC unit or zone count, ceiling/roof access notes, desired work window, and any closeout photo or documentation requirements.',
    },
  ],
  relatedLinks: [
    {
      label: 'Commercial & HOA air duct + dryer vent programs',
      path: '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/',
    },
    {
      label: 'Commercial dryer vent cleaning',
      path: '/services/commercial-dryer-vent-cleaning/',
    },
    {
      label: 'Property managers & HOA services',
      path: '/property-managers/',
    },
    {
      label: 'Commercial industries we serve',
      path: '/industries/',
    },
    {
      label: 'Documented LA commercial project stories',
      path: '/project-stories/',
    },
    {
      label: 'Complete HVAC system & coil cleaning',
      path: '/services/hvac-system-cleaning/',
    },
  ],
};

export default function CommercialAirDuctCleaning() {
  return (
    <ServiceDetailLayout {...content}>
      <section className="pac-section pac-container" aria-labelledby="commercial-project-heading">
        <div className="pac-section-heading">
          <div>
            <span className="pac-eyebrow">BUILT AROUND YOUR OPERATIONS</span>
            <h2 id="commercial-project-heading">
              Clear scope.
              <br />
              <em>Confident decisions.</em>
            </h2>
          </div>
          <p>Give your facilities team a practical plan for the work, the people, and the property.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <article>
            <h3 className="text-xl font-semibold mb-3">Know what you are approving</h3>
            <p className="text-gray-600 leading-relaxed">
              Identify the air handlers, supply and return ducts, accessible components, and exclusions in a written estimate. Approve the scope and price before cleaning starts.
            </p>
          </article>
          <article>
            <h3 className="text-xl font-semibold mb-3">Coordinate occupied spaces</h3>
            <p className="text-gray-600 leading-relaxed">
              Plan work areas, tenant notices, COI requirements, equipment access, and off-hours work windows with your site contact before setting the schedule.
            </p>
          </article>
          <article>
            <h3 className="text-xl font-semibold mb-3">Make the handoff useful</h3>
            <p className="text-gray-600 leading-relaxed">
              Agree on the completion records your team needs, including serviced areas, access limitations, and findings requiring a separate trade decision.
            </p>
          </article>
        </div>
        <div className="mt-10 border-t border-gray-200 pt-8">
          <h3 className="text-xl font-semibold mb-3">See how a real Los Angeles office scope was documented</h3>
          <p className="text-gray-600 leading-relaxed">
            PAC’s 2026 West Hollywood Community Housing Corporation office record covers four HVAC systems across 3,137 square feet scheduled over a weekend window. Review the recorded components and access planning when preparing your building’s system list.
          </p>
          <Link className="pac-text-link" to="/case-studies/nonprofit-housing-office-hvac/">
            Explore the four-system West Hollywood office project ↗
          </Link>
        </div>
      </section>
    </ServiceDetailLayout>
  );
}
