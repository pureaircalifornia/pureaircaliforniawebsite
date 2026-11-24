import LeadLanding from '@/components/LeadLanding';
import { Link } from '@/components/CanonicalLink';
import { caseStudies } from './caseStudies/data';
import { business } from '@/config/business';
import { serializeJsonLd } from '@/utils/seo/jsonLd.mjs';

const projects = caseStudies.filter((study) => study.recordBased);
const anchors: Record<string, string> = {
  'four-seasons-los-angeles-ventilation': 'case-study-01',
  'soulcycle-westside-dryer-vents': 'case-study-02',
  'westchester-ymca-ventilation': 'case-study-03',
  'taco-bell-canoga-park-hvac': 'case-study-04',
  'bassett-torrance-showroom': 'case-study-05',
};

export default function ProjectStories() {
  const list = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${business.url}/project-stories/#projects`,
    name: 'Selected Pure Air California project records',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: project.title,
      url: `${business.url}/case-studies/${project.slug}/`,
    })),
  };

  return (
    <LeadLanding
      path="/project-stories/"
      title="Los Angeles Project Stories | Pure Air California"
      description="Explore documented PAC ventilation, HVAC and dryer vent projects at Los Angeles hotels, studios, cafés and offices. Call (213) 792-4145."
      eyebrow="Project stories"
      heading={
        <>
          Los Angeles Air Duct, Dryer Vent
          <br />
          <em>&amp; HVAC Project Stories.</em>
        </>
      }
      intro="Explore documented ventilation, HVAC, and commercial dryer exhaust projects across Los Angeles hotels, athletic studios, restaurants, offices, and multifamily properties."
      quoteHref="/quote/?service=air-duct&property=commercial#estimate-builder"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(list) }}
      />
      <section>
        <span className="pac-eyebrow">THE PLACE. THE SYSTEM. THE SCOPE.</span>
        <h2>
          Los Angeles projects,
          <br />
          <em>in their own detail.</em>
        </h2>
        <p>
          These summaries draw on PAC’s dated service records. Each identifies the location and components in the recorded scope. They describe selected past projects, not current contracts or brand-wide partnerships.
        </p>
        <div className="pac-lead-cards">
          {projects.map((project) => (
            <article
              className="pac-lead-card"
              id={anchors[project.slug] || project.slug}
              key={project.slug}
            >
              <span className="pac-eyebrow">
                {project.year} · {project.vertical}
              </span>
              <h3>{project.client}</h3>
              <p>{project.location}</p>
              <ul>
                {project.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link className="pac-text-link" to={`/case-studies/${project.slug}/`}>
                Read the {project.client} project →
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section>
        <h2>Planning something similar?</h2>
        <p>
          Start with the systems your property needs assessed. A studio dryer exhaust, a hotel air handler, a 42-unit apartment building, and a restaurant’s comfort ventilation each call for a different scope. Tell us your location, equipment, and preferred work window.
        </p>
        <div className="pac-lead-links">
          <Link to="/case-studies/">All case studies (including 42-unit apartment)</Link>
          <Link to="/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/">
            Commercial &amp; HOA planning
          </Link>
          <Link to="/services/commercial-air-duct-cleaning/">Commercial air ducts</Link>
          <Link to="/services/commercial-dryer-vent-cleaning/">Commercial dryer vents</Link>
          <Link to="/property-managers/">Property managers &amp; HOAs</Link>
          <Link to="/industries/">Industries we serve</Link>
          <Link to="/locations/los-angeles/">Los Angeles coverage</Link>
        </div>
      </section>
    </LeadLanding>
  );
}
