import LeadLanding from '@/components/LeadLanding';
import { Link } from '@/components/CanonicalLink';

const faqs = [
  {
    question: 'Should I have my air ducts cleaned after Los Angeles wildfire smoke?',
    answer:
      'Start with an inspection of your system and any visible ash, soot, or damage. Smoke odor outdoors alone does not automatically mean every duct requires cleaning. Heavy ash or soot deposits, heat-damaged insulation, or structural smoke damage may require a qualified fire-restoration assessment. Duct cleaning is not an indoor-air safety clearance test.',
  },
  {
    question: 'Can duct cleaning remove every smoke odor or microscopic particle?',
    answer:
      'No contractor can honestly promise 100% particle or odor elimination from duct cleaning alone. Smoke settles into soft furnishings, drywall, attic insulation, and HVAC coils—not just ductwork. An inspection identifies accessible duct and air-handler buildup, filter upgrades, and conditions that belong with a restoration specialist.',
  },
  {
    question: 'How much does wildfire-smoke or hillside-home duct cleaning cost?',
    answer:
      'PAC’s standard residential air duct cleaning starts at $299 for eligible single-system scopes. Hillside, multi-zone, or smoke-affected homes require an individual property assessment because steep access, multiple air handlers, duct material, and coil/blower cleaning change the scope. You always review a written estimate before work begins.',
  },
  {
    question: 'Do you apply chemical sealants, encapsulants, or sanitizers automatically?',
    answer:
      'No. Mechanical source removal comes first. Any chemical treatment must be discussed separately with its EPA-registered product label, duct-material compatibility (EPA notes no biocides are registered for internally lined ducts), and limitations before you decide.',
  },
  {
    question: 'What should I do with my HVAC filter after nearby canyon wildfire smoke?',
    answer:
      'Check and replace loaded disposable filters promptly once air quality stabilizes, confirming the highest MERV rating your specific air handler safely supports without restricting airflow. During active smoke advisories, follow local public-health and EPA guidance rather than scheduling routine duct service.',
  },
];

export default function WildfireSmokeHillsideAirDuctCleaning() {
  return (
    <LeadLanding
      path="/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles/"
      title="Wildfire & Hillside Duct Cleaning Los Angeles | PAC"
      description="Inspection-led air duct & HVAC assessment after wildfire smoke, canyon ash, or remodeling in Los Angeles hillside homes. Call PAC at (213) 792-4145."
      serviceName="Wildfire smoke and hillside residential air duct assessment and cleaning"
      eyebrow="Wildfire concerns & hillside homes"
      heading={
        <>
          Wildfire Smoke &amp; Hillside
          <br />
          <em>Air Duct Cleaning in Los Angeles.</em>
        </>
      }
      intro="Inspection-first HVAC and air duct assessment for Los Angeles hillside, canyon, and foothill homes affected by wildfire smoke, ash, Santa Ana dust, or renovation debris—with negative-pressure source removal and an honest written scope before work begins."
      quoteHref="/quote/?property=home&service=air-duct&addons=wildfire-smoke#estimate-builder"
      faqs={faqs}
    >
      <section>
        <span className="pac-eyebrow">START WITH YOUR HOME, NOT A FEAR-DRIVEN PACKAGE</span>
        <h2>
          Smoke exposure.
          <br />
          Canyon ash. Remodel dust.
          <br />
          <em>Inspected honestly first.</em>
        </h2>
        <p>
          Tell Pure Air California what happened, whether your HVAC ran during the event, what you can see at returns or registers, and where each air handler sits. Depending on what the inspection shows, the right next step may be negative-pressure duct cleaning, accessible blower and coil cleaning, a filter fit check, or a referral to a qualified fire-restoration professional.
        </p>
        <div className="pac-lead-cards">
          <article className="pac-lead-card">
            <h3>After wildfire smoke or canyon ash</h3>
            <p>
              Describe visible ash, soot around intakes or returns, persistent smoke odor, and any known exterior or attic damage. Never disturb suspected hazardous fire debris; follow local re-entry orders and involve certified restoration specialists when fire damage extends beyond ordinary HVAC dust.
            </p>
          </article>
          <article className="pac-lead-card">
            <h3>After remodeling or hillside construction</h3>
            <p>
              Drywall dust, concrete cutting, and woodwork fines easily pull into open return chases. Identify which rooms were remodeled and include accessible blower wheels, plenums, evaporator coils, and filter slots in the inspection scope.
            </p>
          </article>
        </div>
        <aside className="pac-lead-note">
          <strong>Duct cleaning is a maintenance step—not an indoor-air clearance certificate.</strong>
          <p>
            The EPA does not recommend routine duct cleaning for every home and notes duct cleaning has not been shown to prevent health problems. Review the{' '}
            <a
              href="https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned"
              target="_blank"
              rel="noreferrer"
            >
              EPA’s duct-cleaning guidance
            </a>{' '}
            and{' '}
            <a
              href="https://www.epa.gov/emergencies-iaq/wildfires-and-indoor-air-quality-iaq"
              target="_blank"
              rel="noreferrer"
            >
              EPA wildfire &amp; indoor air quality guidance
            </a>
            .
          </p>
        </aside>
      </section>

      <section>
        <span className="pac-eyebrow">LOS ANGELES HILLSIDE &amp; CANYON ACCESS</span>
        <h2>Built for steep driveways, multi-zone homes &amp; delicate finishes.</h2>
        <ul>
          <li>
            <strong>Steep driveways, gates &amp; stairs:</strong> Share parking constraints, exterior flights, and hose-run distances so we dispatch the right crew and protective runners.
          </li>
          <li>
            <strong>Multiple HVAC zones &amp; guest houses:</strong> List separate air handlers serving lower levels, primary suites, additions, or detached studios.
          </li>
          <li>
            <strong>Attic &amp; crawlspace ductwork:</strong> Describe hatch locations and duct types (sheet metal, flex, or lined duct) without entering unsafe spaces yourself.
          </li>
          <li>
            <strong>Architectural finishes:</strong> Flag custom plaster registers, wood ceilings, and delicate furnishings so every room is protected carefully before work starts.
          </li>
        </ul>
        <p>
          Coverage and equipment access are confirmed for your exact address before scheduling. Please keep gate codes and private occupancy notes out of public messages.
        </p>
      </section>

      <section>
        <span className="pac-eyebrow">WHAT TO EXPECT</span>
        <h2>Inspect. Define. Agree in writing.</h2>
        <ol>
          <li>
            <strong>Share what you have noticed.</strong> Your neighborhood, approximate system count, smoke/remodel timeline, and visible conditions help us prepare.
          </li>
          <li>
            <strong>Inspect accessible pathways &amp; components.</strong> We evaluate accessible supply/return ducts, air handlers, coils, and filter slots—and flag anything requiring a restoration trade.
          </li>
          <li>
            <strong>Confirm written scope &amp; pricing.</strong> Review included systems, access notes, exclusions, and optional add-ons before any cleaning starts.
          </li>
          <li>
            <strong>Walk through results &amp; filtration care.</strong> Review completed areas, accessible photos, and filter maintenance next steps.
          </li>
        </ol>
        <p>
          Standard residential air duct cleaning starts at $299 for eligible single-system scopes; dryer vent cleaning starts at $149. Hillside, multi-zone, or smoke-affected homes receive a tailored written quote after review.{' '}
          <Link to="/pricing/">See LA pricing &amp; scope details →</Link>
        </p>
      </section>

      <section>
        <h2>Hillside &amp; canyon communities we serve across Los Angeles.</h2>
        <p>
          Explore neighborhood planning guides covering canyon winds, steep access, older ductwork, and multi-system residences across Greater LA.
        </p>
        <div className="pac-lead-links">
          <Link to="/locations/los-angeles/">Los Angeles</Link>
          <Link to="/locations/pacific-palisades/">Pacific Palisades</Link>
          <Link to="/locations/malibu/">Malibu</Link>
          <Link to="/locations/brentwood/">Brentwood</Link>
          <Link to="/locations/pasadena/">Pasadena</Link>
          <Link to="/locations/los-feliz/">Los Feliz</Link>
          <Link to="/locations/sherman-oaks/">Sherman Oaks</Link>
          <Link to="/blog/air-duct-cleaning-after-wildfire-los-angeles/">Post-wildfire HVAC planning guide</Link>
          <Link to="/services/residential-air-duct-cleaning/">Residential air duct cleaning</Link>
          <Link to="/services/hvac-system-cleaning/">HVAC coils &amp; blowers</Link>
          <Link to="/services/residential-electrostatic-filter/">Electrostatic filters</Link>
        </div>
      </section>
    </LeadLanding>
  );
}
