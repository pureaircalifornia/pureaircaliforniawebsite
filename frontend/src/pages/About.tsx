import { Link } from '@/components/CanonicalLink';
import { ArrowUpRight, ArrowDown, Phone, Check } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SEOProvider from '@/components/SEOProvider';
import PageHero from '@/components/PageHero';
import AirSymbol from '@/components/AirSymbol';
import { NaturePhoto } from '@/components/BreathMission';
import { business } from '@/config/business';

const visitStandards = [
  [
    'Inspection-first evaluation',
    'We look at accessible ducts, registers, and exhaust routes first—recommending cleaning when system conditions warrant it, in line with EPA homeowner guidance.',
  ],
  [
    'Written scope & price upfront',
    'Every included system, component, exclusion, and price is confirmed in writing before work begins. Eligible residential air duct scopes start at $299; dryer vents start at $149.',
  ],
  [
    'Care for floors, finishes & rooms',
    'From studio apartments to multi-zone hillside estates and commercial offices, we protect work paths, furnishings, and registers throughout the visit.',
  ],
  [
    'Documented commercial & HOA closeouts',
    'For property managers, HOA boards, and facilities teams across LA County, we provide COI documentation, phased scheduling, and unit-by-unit completion records.',
  ],
];

export default function About() {
  return (
    <div className="pac-about-page pac-mission-page">
      <SEOProvider
        title="About Pure Air California | Los Angeles Air Duct Care"
        description="Meet Pure Air California: inspection-first air duct, dryer vent & HVAC cleaning across Greater Los Angeles with written upfront scopes. Call (213) 792-4145."
        path="/about/"
        isLocalBusiness
      />
      <NavBar alwaysOpaque />
      <main>
        <div id="our-mission">
          <PageHero
            title={
              <>
                Everything begins
                <br />
                with <em>a breath.</em>
              </>
            }
            description="Before the day begins. Before everything you love. There is this. Discover why inspection-led care for the air in our Los Angeles homes and workplaces is the heart of Pure Air California."
            image="/images/breath/living-forest-1920.webp"
            alt="Sunlit mountain meadow and evergreen forest beneath a golden California sky"
            eyebrow="ABOUT PURE AIR CALIFORNIA · LOS ANGELES"
            caption="Inspection-first air duct, dryer vent, and HVAC cleaning led by trained local technicians across Greater Los Angeles."
            estimateHref="/quote/?service=air-duct&property=home#estimate-builder"
            estimateLabel="Request a free written estimate"
          />
        </div>

        <section className="pac-notice-section" id="notice-the-air" aria-labelledby="notice-title">
          <div className="pac-container pac-notice-grid">
            <div>
              <span className="pac-eyebrow">01 / SOMETHING INVISIBLE. SOMETHING ESSENTIAL.</span>
              <h2 id="notice-title">
                You are breathing.
                <br />
                <em>What are you breathing in?</em>
              </h2>
            </div>
            <div>
              <p className="pac-editorial-lead">
                Air is not simply the space around us. It is part of every moment we are alive.
              </p>
              <p>
                Cool against your skin. Moving through the trees. Quietly entering and leaving your lungs. It is easy to forget something that is always there.
              </p>
              <p>
                Now bring that attention indoors. Air has a quality. What moves through a room matters, even when we cannot see or smell it.
              </p>
              <a className="pac-text-link" href="#why-breath-matters">
                Why this matters <ArrowDown size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section
          className="pac-essential-section"
          id="why-breath-matters"
          aria-labelledby="essential-title"
        >
          <NaturePhoto
            name="cloud-sea"
            alt="Clouds stretching into the distance in the soft light of evening"
            className="pac-essential-photo"
          />
          <div className="pac-container pac-essential-content">
            <span className="pac-eyebrow">02 / THE BREATH THAT SUSTAINS US</span>
            <h2 id="essential-title">
              A lifetime of moments.
              <br />
              <em>Only minutes without oxygen.</em>
            </h2>
            <p>
              We can go far longer without food or water than without air. Our bodies need a continuous supply of oxygen. Without it, the brain can be harmed within minutes.
            </p>
            <p className="pac-essential-belief">
              Something this essential
              <br />
              should never be an afterthought.
            </p>
            <a
              className="pac-science-note"
              href="https://medlineplus.gov/ency/article/001435.htm"
              target="_blank"
              rel="noreferrer"
            >
              Why oxygen matters · MedlinePlus <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="pac-purpose-section pac-container" aria-labelledby="purpose-title">
          <span className="pac-eyebrow">03 / THIS IS OUR WHY</span>
          <h2 id="purpose-title">
            Care for the air.
            <br />
            <em>Care for the life it holds.</em>
          </h2>
          <p className="pac-purpose-statement">
            We believe breathing pure air is essential to our health and well-being. That belief is the reason Pure Air California exists.
          </p>
          <p>
            For the breath that begins the day. For the people gathered around your table. For all the ordinary moments that make a life. We want the air in the places you live and work across Greater Los Angeles to receive the attention it deserves.
          </p>
          <div className="pac-purpose-values">
            {[
              {
                kind: 'breath' as const,
                title: 'Attention to the unseen.',
                text: 'Our mission begins with awareness: the air pathways inside our homes and buildings deserve honest, careful inspection.',
              },
              {
                kind: 'leaf' as const,
                title: 'Respect for what sustains us.',
                text: 'Nature reminds us that air connects living things. We carry that sense of care into every residence and workplace we enter.',
              },
              {
                kind: 'care' as const,
                title: 'Care made practical.',
                text: 'Listen carefully. Explain clearly. Recommend work based on the actual condition of your system and confirm the written scope before work starts.',
              },
            ].map((value) => (
              <article key={value.kind}>
                <AirSymbol kind={value.kind} />
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pac-air-path-section" aria-labelledby="air-path-title">
          <div className="pac-container pac-air-path-grid">
            <div className="pac-air-path-photos">
              <NaturePhoto
                name="living-forest"
                alt="A sunlit mountain meadow and evergreen forest beneath an open sky"
              />
              <figure>
                <img
                  src="/images/pac/duct-interior-clean-v2.webp"
                  alt="Inside a clean galvanized metal air duct after source-removal cleaning"
                  width={700}
                  height={470}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>A closer look at the path your indoor air follows.</figcaption>
              </figure>
            </div>
            <div>
              <span className="pac-eyebrow">04 / FROM THE OPEN SKY TO THE PLACE YOU CALL HOME</span>
              <h2 id="air-path-title">
                Outside, a world of air.
                <br />
                <em>Inside, a path worth caring for.</em>
              </h2>
              <p>
                Your heating and cooling system moves air through a network of supply and return ducts into the rooms where life happens. Over time, remodel dust, lint, and debris can settle along that path.
              </p>
              <p>
                That is where our work begins: understanding your system, inspecting what needs attention, and carefully cleaning the agreed areas under negative pressure.
              </p>
              <p>
                Duct care is one part of indoor air care, alongside appropriate filtration, ventilation, and moisture control.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
                <Link className="pac-text-link" to="/services/residential-air-duct-cleaning/">
                  Residential air duct cleaning <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
                <Link className="pac-text-link" to="/services/commercial-air-duct-cleaning/">
                  Commercial air duct cleaning <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
                <Link className="pac-text-link" to="/pricing/">
                  Transparent LA pricing <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* On-Site Standards Across Los Angeles */}
        <section
          className="pac-notice-section"
          id="visit-standards"
          aria-labelledby="visit-standards-title"
        >
          <div className="pac-container">
            <span className="pac-eyebrow">05 / WHAT TO EXPECT ON EVERY VISIT</span>
            <h2 id="visit-standards-title">
              Practical standards.
              <br />
              <em>Zero guesswork at the door.</em>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {visitStandards.map(([heading, copy]) => (
                <article
                  key={heading}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Check size={19} className="text-brand-700 flex-shrink-0" aria-hidden="true" />
                    <span>{heading}</span>
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pac-mission-people pac-container" aria-labelledby="people-title">
          <div>
            <span className="pac-eyebrow">THE PEOPLE BEHIND THE PURPOSE</span>
            <h2 id="people-title">
              A conversation.
              <br />
              <em>A little human care.</em>
            </h2>
            <p>
              Have a question about your Los Angeles home, HOA, or commercial workplace? Tell us what you’ve noticed. We’ll help you understand the next step.
            </p>
          </div>
          <div className="pac-mission-names">
            <div>
              <span>LOU CHANAB</span>
              <p>Founder &amp; CEO</p>
            </div>
            <div>
              <span>MAYA CHANAB</span>
              <p>VP Client Relations</p>
            </div>
            <a className="pac-text-link" href={business.phoneHref}>
              Speak with the PAC team: {business.phone}{' '}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section
          className="pac-notice-section"
          id="information-standards"
          aria-labelledby="standards-title"
        >
          <div className="pac-container pac-notice-grid">
            <div>
              <span className="pac-eyebrow">HOW WE SHARE INFORMATION</span>
              <h2 id="standards-title">
                Clear information.
                <br />
                <em>Room for questions.</em>
              </h2>
            </div>
            <div>
              <p>
                Our service guides explain the work and the decisions to discuss before a visit. They are general information, not a diagnosis of your system or medical advice.
              </p>
              <p>
                Health and safety guidance links to its public sources. Our{' '}
                <Link to="/case-studies/">documented project notes</Link> and{' '}
                <Link to="/project-stories/">project stories</Link> distinguish recorded scopes from measured outcomes; we do not turn a cleaning visit into a promise of medical symptom relief, guaranteed energy savings, or code certification.
              </p>
              <p>
                Reviews shown on this website are a historical selection. Visit our{' '}
                <a
                  href={business.googleProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Business Profile
                </a>{' '}
                for our live Maps listing and full review history, or explore our{' '}
                <Link to="/locations/los-angeles/">Los Angeles service areas</Link>.
              </p>
              <p>
                Spotted an error or need a source clarified?{' '}
                <Link to="/contact/">Contact the PAC team</Link> and include the page and detail you would like us to check.
              </p>
            </div>
          </div>
        </section>

        <section className="pac-purpose-cta" aria-labelledby="purpose-cta-title">
          <div className="pac-container">
            <span className="pac-eyebrow">LET THAT AWARENESS BECOME CARE</span>
            <h2 id="purpose-cta-title">
              Your next breath matters.
              <br />
              <em>Let’s care for the air behind it.</em>
            </h2>
            <p>Start with a conversation about your Los Angeles space.</p>
            <div className="pac-actions">
              <a className="pac-button pac-button-light" href={business.phoneHref}>
                <Phone size={17} aria-hidden="true" /> Call {business.phone}
              </a>
              <Link
                className="pac-text-link"
                to="/quote/?service=air-duct&property=home#estimate-builder"
              >
                Request a free estimate <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
