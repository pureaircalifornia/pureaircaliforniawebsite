import { ArrowDown, ArrowRight, ArrowUpRight, Check, Home, MapPin, Phone, Plus } from 'lucide-react';
import { Link } from '@/components/CanonicalLink';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SEOProvider from '@/components/SEOProvider';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import BookingLink from '@/components/BookingLink';
import { business } from '@/config/business';
import { serializeJsonLd } from '@/utils/seo/jsonLd.mjs';
import { quoteLink } from '@/utils/quoteContext.mjs';
import '../home-services.css';

const base = '/images/home-services/';
const estimateHref = quoteLink('/home-services/');
const services = [
  {
    name: 'Air duct cleaning',
    label: 'Residential air duct cleaning',
    path: '/services/residential-air-duct-cleaning/',
    image: 'flex-duct',
    alt: 'A close view inside flexible residential air ductwork from the PAC photo archive',
    tag: 'THE AIR THROUGH YOUR ROOMS · FROM $299',
    description:
      'Inspection-led cleaning of accessible supply and return ducts. Start with what is inside, then agree the right written scope for your home.',
    detail: 'Starting at $299 · Dust, debris & post-remodel concerns',
    position: 'center',
  },
  {
    name: 'Dryer vent cleaning',
    label: 'Residential dryer vent cleaning',
    path: '/services/residential-dryer-vent-cleaning/',
    image: 'vent-extraction',
    alt: 'Extraction hose connected at an exterior vent opening during PAC field work',
    tag: 'BEYOND THE LINT TRAP · FROM $149',
    description:
      'Care for the exhaust path behind your dryer. Discuss lint build-up, the vent route, exterior or roof access, and the connections included.',
    detail: 'Starting at $149 · Laundry exhaust & accessible vent runs',
    position: 'center 40%',
  },
  {
    name: 'Electrostatic filters',
    label: 'Home electrostatic filter cleaning',
    path: '/services/residential-electrostatic-filter/',
    image: 'filter-build-up',
    alt: 'Removed HVAC filter with visible accumulated debris in a PAC field photograph',
    tag: 'CARE FOR WHAT COLLECTS THE DUST',
    description:
      'Identify your filter type and the care it needs. Reusable electrostatic collector cells require a different approach from disposable filters.',
    detail: 'Inspection, return sizing & washable media care',
    position: 'center 42%',
  },
  {
    name: 'HVAC system cleaning',
    label: 'Home HVAC system cleaning',
    path: '/services/hvac-system-cleaning/',
    image: 'vacuum-equipment',
    alt: 'Professional vacuum equipment set up in an interior corridor for ventilation cleaning',
    tag: 'THE SYSTEM BEHIND YOUR COMFORT',
    description:
      'Look beyond the vents. Discuss accessible air-handler components, coils, blowers, and connected ductwork, with each included item clearly identified.',
    detail: 'A component-by-component written scope',
    position: 'center 65%',
  },
];

const photos = [
  {
    image: 'room-protection',
    title: 'Care for the room, too.',
    description: 'Furniture covered in preparation for work.',
    alt: 'Furniture and a table covered with protective sheeting in the PAC work archive',
    className: 'hs-photo-feature',
    position: 'center',
  },
  {
    image: 'dryer-lint',
    title: 'Look past the opening.',
    description: 'A close view of lint build-up inside a vent.',
    alt: 'Dense lint and debris visible inside a round ventilation opening',
    className: '',
    position: 'center',
  },
  {
    image: 'filter-build-up',
    title: 'See what has collected.',
    description: 'A removed filter with visible debris.',
    alt: 'Accumulated debris on a removed filter photographed during PAC field work',
    className: '',
    position: 'center 40%',
  },
  {
    image: 'protected-room',
    title: 'The details around the work.',
    description: 'A wider view of a protected interior.',
    alt: 'An interior work area with furniture protected by sheeting',
    className: 'hs-photo-wide',
    position: 'center 55%',
  },
];

const faqs = [
  {
    question: 'Which home air-care service should I start with?',
    answer:
      'Describe what you have noticed: visible debris at a register, dust after a remodel, a dryer taking longer than usual, or a filter that needs attention. PAC can discuss an inspection and help identify the appropriate service. Air duct cleaning and dryer vent cleaning address separate systems.',
  },
  {
    question: 'How much does home air duct or dryer vent cleaning cost in Los Angeles?',
    answer:
      'Eligible residential air duct cleaning scopes start at $299, and eligible residential dryer vent cleanings start at $149. The number of HVAC systems, duct or vent access, condition, and included components determine your written estimate, which is confirmed before work begins.',
  },
  {
    question: 'Does every home need routine air duct cleaning?',
    answer:
      'No single schedule fits every home. The condition of the system and the reason for cleaning matter. Visible contamination, substantial debris, or recent construction may warrant an assessment. Cleaning does not replace moisture correction, equipment repairs, or regular filter maintenance.',
  },
  {
    question: 'Can you coordinate service for a condo, apartment, or estate?',
    answer:
      'Discuss permission, parking, building work hours, and equipment access before scheduling. For a condo or apartment, confirm which systems belong to your unit and which are shared. For estates or homes with several HVAC systems, identify each system and the person authorized to approve the work.',
  },
  {
    question: 'Do I need to prepare my home before the visit?',
    answer:
      'Clear a safe route to accessible vents, the dryer, and HVAC equipment. Let PAC know about delicate finishes, pets, attic access, stairs, or gate arrangements. Confirm the agreed work areas and any furniture protection with the team before service.',
  },
  {
    question: 'Can cleaning guarantee better health or fix weak airflow?',
    answer:
      'Cleaning can remove accumulated debris from the areas included in the work. Health and airflow outcomes depend on many factors, so they cannot be guaranteed. Weak airflow, persistent odors, or moisture may need a separate HVAC assessment. PAC can discuss the scope and any limitations before you book.',
  },
];

const areas = [
  ['Los Angeles', 'los-angeles'],
  ['Santa Monica', 'santa-monica'],
  ['Beverly Hills', 'beverly-hills'],
  ['Malibu', 'malibu'],
  ['Pasadena', 'pasadena'],
  ['Studio City', 'studio-city'],
  ['Burbank', 'burbank'],
  ['Calabasas', 'calabasas'],
];

const catalog = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${business.url}/home-services/#services`,
  name: 'Home air-care services in Los Angeles',
  itemListElement: services.map((service, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: service.label,
    url: business.url + service.path,
  })),
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${business.url}/home-services/#faq`,
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

function FieldImage({
  name,
  alt,
  sizes = '(max-width: 650px) 100vw, 33vw',
  position,
}: {
  name: string;
  alt: string;
  sizes?: string;
  position?: string;
}) {
  return (
    <img
      src={`${base}${name}-960.webp`}
      srcSet={`${base}${name}-480.webp 480w, ${base}${name}-960.webp 960w`}
      sizes={sizes}
      alt={alt}
      width={960}
      height={1280}
      loading="lazy"
      decoding="async"
      style={{ objectPosition: position }}
    />
  );
}

export default function HomeServices() {
  return (
    <div className="hs-page">
      <SEOProvider
        title="Home Air Duct & Dryer Vent Cleaning Los Angeles | PAC"
        description="Air duct (from $299), dryer vent (from $149), filter & HVAC cleaning for Los Angeles homes. See PAC field photos & request a free written estimate."
        path="/home-services/"
        image={`${base}home-interior-960.webp`}
        imageAlt="A sunlit living room with a linear ceiling air vent"
        mainEntityId={`${business.url}/home-services/#services`}
        isLocalBusiness
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Home services', item: '/home-services/' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(catalog) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />
      <NavBar alwaysOpaque />
      <main>
        <section className="hs-hero" aria-labelledby="home-services-heading">
          <div className="pac-container hs-hero-grid">
            <div className="hs-hero-copy">
              <nav className="hs-breadcrumb" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">Home services</span>
              </nav>
              <span className="hs-eyebrow">
                <span aria-hidden="true" /> FOR YOUR HOME · LOS ANGELES
              </span>
              <h1 id="home-services-heading">
                Air duct &amp; dryer
                <br className="hs-desktop-break" /> vent cleaning.
                <br />
                <em>
                  For the home
                  <br className="hs-desktop-break" /> you love.
                </em>
              </h1>
              <p>
                Thoughtful care for your air ducts (starting at $299), dryer vents (starting at $149), filters, and HVAC system. A clear plan for the spaces you live in, from apartments to family homes and estates.
              </p>
              <div className="hs-actions">
                <Link className="hs-button" to={estimateHref}>
                  Get my home estimate <ArrowUpRight size={19} aria-hidden="true" />
                </Link>
                <a className="hs-phone" href={business.phoneHref}>
                  <Phone size={17} aria-hidden="true" />
                  {business.phone}
                </a>
              </div>
              <p className="hs-reassurance">
                <Check size={15} aria-hidden="true" /> Free estimate · Written scope before work begins ·{' '}
                <Link to="/pricing/" className="underline">
                  View LA pricing guide
                </Link>
              </p>
            </div>
            <div className="hs-hero-art">
              <img
                className="hs-interior"
                src={`${base}home-interior-960.webp`}
                srcSet={`${base}home-interior-480.webp 480w, ${base}home-interior-960.webp 960w`}
                sizes="(max-width: 800px) 100vw, 50vw"
                alt="A sunlit living room with a linear air vent above the seating area"
                width={960}
                height={960}
                loading="eager"
                {...{ fetchpriority: 'high' }}
              />
              <span className="hs-image-note">
                <Home size={16} aria-hidden="true" /> THE COMFORT OF HOME. THE CARE OF PAC.
              </span>
              <a className="hs-work-inset" href="#home-work">
                <img
                  src="/images/field/duct-cleaning-in-action-640.webp"
                  alt="Cleaning tool at work inside a dusty ventilation duct"
                  width={640}
                  height={400}
                  loading="lazy"
                />
                <span>
                  <small>A CLOSER LOOK</small>
                  <strong>
                    Real work.
                    <br />
                    Real attention.
                  </strong>
                  <span>
                    See our field photos <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </span>
              </a>
            </div>
          </div>
        </section>

        <nav className="hs-section-nav" aria-label="Home services page sections">
          <div className="pac-container">
            <a href="#home-care">Find your service</a>
            <a href="#home-work">Our work in pictures</a>
            <a href="#home-process">What to expect</a>
            <a href="#home-areas">Service areas</a>
            <a href="#home-questions">Your questions</a>
            <a href="#home-care" className="hs-nav-down" aria-label="Explore home services">
              <ArrowDown size={17} aria-hidden="true" />
            </a>
          </div>
        </nav>

        <section
          className="hs-services hs-section pac-container"
          id="home-care"
          aria-labelledby="home-care-heading"
        >
          <div className="hs-section-heading">
            <div>
              <span className="hs-eyebrow">HOME AIR CARE, CONSIDERED</span>
              <h2 id="home-care-heading">
                A little care.
                <br />
                <em>In all the right places.</em>
              </h2>
            </div>
            <p>
              Choose the system that needs attention. Each service begins with your home, the condition of the equipment, and a written scope you can understand.
            </p>
          </div>
          <div className="hs-service-grid">
            {services.map((service, index) => (
              <article className="hs-service-card" key={service.path}>
                <Link to={service.path} className="hs-service-photo" tabIndex={-1} aria-hidden="true">
                  <FieldImage
                    name={service.image}
                    alt={service.alt}
                    sizes="(max-width: 650px) 100vw, (max-width: 1100px) 50vw, 25vw"
                    position={service.position}
                  />
                  <span>0{index + 1}</span>
                  <span className="hs-photo-arrow">
                    <ArrowUpRight size={22} />
                  </span>
                </Link>
                <div className="hs-service-copy">
                  <span className="hs-card-kicker">{service.tag}</span>
                  <h3>
                    <Link to={service.path}>{service.name}</Link>
                  </h3>
                  <p>{service.description}</p>
                  <span className="hs-service-detail">{service.detail}</span>
                  <Link
                    to={service.path}
                    className="hs-service-link"
                    aria-label={`Explore ${service.label.toLowerCase()}`}
                  >
                    Explore service <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <aside className="hs-smoke-note">
            <div>
              <span className="hs-eyebrow">AFTER SMOKE, ASH OR A REMODEL</span>
              <h3>A different concern deserves a closer look.</h3>
              <p>
                Tell us about the event and the affected systems. Cleaning scope depends on what is present, the duct material, and safe access.
              </p>
            </div>
            <Link to="/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles/">
              Wildfire &amp; hillside home care <ArrowUpRight size={19} aria-hidden="true" />
            </Link>
          </aside>
        </section>

        <section className="hs-work hs-section" id="home-work" aria-labelledby="home-work-heading">
          <div className="pac-container">
            <div className="hs-section-heading">
              <div>
                <span className="hs-eyebrow">FROM THE PAC PHOTO ARCHIVE</span>
                <h2 id="home-work-heading">
                  The work you see.
                  <br />
                  <em>The care behind it.</em>
                </h2>
              </div>
              <div>
                <p>
                  Actual field photos: the preparation, the equipment, and the build-up inside the systems. A closer look at what goes into the work.
                </p>
                <a href="#home-process" className="hs-inline-link">
                  How we plan your service <ArrowRight size={18} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="hs-photo-grid">
              {photos.map((photo) => (
                <figure key={photo.image} className={photo.className}>
                  <FieldImage
                    name={photo.image}
                    alt={photo.alt}
                    sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 42vw"
                    position={photo.position}
                  />
                  <figcaption>
                    <strong>{photo.title}</strong>
                    <span>{photo.description}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="hs-photo-note">
              Individual photos from the PAC work archive. Conditions and service scope vary by property.
            </p>
          </div>
        </section>

        <section
          className="hs-process hs-section pac-container"
          id="home-process"
          aria-labelledby="home-process-heading"
        >
          <div className="hs-process-grid">
            <div className="hs-process-intro">
              <span className="hs-eyebrow">A GOOD PLAN COMES FIRST</span>
              <h2 id="home-process-heading">
                Your home.
                <br />
                Your questions.
                <br />
                <em>Our full attention.</em>
              </h2>
              <p>
                From the first conversation to the final walkthrough, know what is included and what comes next.
              </p>
              <Link className="hs-button" to={estimateHref}>
                Let’s plan your service <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <ol className="hs-process-steps">
              {[
                [
                  'Tell us about your home',
                  'Share your city, the service you need, the number of systems, and what you have noticed. Mention a recent remodel, access restrictions, or special finishes.',
                ],
                [
                  'Agree the scope before work',
                  'Confirm the accessible areas and components, the cleaning approach, price, and any limitations. Additional findings should be discussed before extra work is approved.',
                ],
                [
                  'Prepare, clean and review',
                  'Plan a safe work area and protection for the surroundings. Review the completed scope, any areas that could not be accessed, and the next care steps for your equipment.',
                ],
              ].map(([heading, text], index) => (
                <li key={heading}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{heading}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="hs-areas" id="home-areas" aria-labelledby="home-areas-heading">
          <div className="pac-container hs-areas-grid">
            <div>
              <span className="hs-eyebrow">
                <MapPin size={16} aria-hidden="true" /> CLOSE TO HOME
              </span>
              <h2 id="home-areas-heading">
                Los Angeles homes.
                <br />
                <em>Local attention.</em>
              </h2>
              <p>
                Residential air-care service across Los Angeles and nearby communities. Share your ZIP code, system details, and access needs to confirm coverage and scheduling.
              </p>
              <Link to="/locations/" className="hs-inline-link">
                Explore all service areas <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="hs-area-links">
              {areas.map(([label, slug]) => (
                <Link key={slug} to={`/locations/${slug}/`}>
                  {label}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          className="hs-faq hs-section pac-container"
          id="home-questions"
          aria-labelledby="home-questions-heading"
        >
          <div className="hs-faq-grid">
            <div>
              <span className="hs-eyebrow">BEFORE YOU BOOK</span>
              <h2 id="home-questions-heading">
                Good questions.
                <br />
                <em>Clear answers.</em>
              </h2>
              <p>Let’s make the next step feel simple.</p>
              <a href={business.phoneHref} className="hs-inline-link">
                <Phone size={17} aria-hidden="true" /> Talk to PAC
              </a>
            </div>
            <div>
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>
                    {faq.question}
                    <Plus size={19} aria-hidden="true" />
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
              <p className="hs-faq-source">
                For general guidance on when duct cleaning may be appropriate, see the{' '}
                <a href="https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned">
                  EPA’s homeowner guide
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="hs-final" aria-labelledby="home-next-heading">
          <div className="pac-container">
            <div>
              <span className="hs-eyebrow">LET’S TAKE CARE OF HOME</span>
              <h2 id="home-next-heading">
                A little more care.
                <br />
                <em>Starts right here.</em>
              </h2>
              <p>Tell us about your home. We’ll help you plan the next step.</p>
            </div>
            <div className="hs-final-actions">
              <Link className="hs-button" to={estimateHref}>
                Get my free home estimate <ArrowUpRight size={19} aria-hidden="true" />
              </Link>
              <BookingLink className="hs-inline-link" />
              <a className="hs-phone" href={business.phoneHref}>
                <Phone size={17} aria-hidden="true" />
                {business.phone}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
