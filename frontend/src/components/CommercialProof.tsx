import { Link } from '@/components/CanonicalLink';
import { ArrowUpRight } from 'lucide-react';

// PAC invoice-backed locations and dates; sources: docs/SEO/client-logos-2026-10-12.md.
const projects = [
  { name: 'Four Seasons', logo: 'four-seasons.svg', place: 'Los Angeles', detail: 'Four Seasons Hotel Los Angeles', service: 'Guestroom ventilation, blower & coil cleaning', year: '2015', path: '/project-stories/#case-study-01', linkLabel: 'Hotel case study' },
  { name: 'Sheraton', logo: 'sheraton.webp', place: 'Gateway Hotel', detail: 'Sheraton Gateway Hotel', year: '2024', path: '/industries/hospitality/', linkLabel: 'Hotel air care' },
  { name: 'Panera Bread', logo: 'panera-bread.webp', place: 'Pasadena', detail: 'Pasadena café', service: 'Ventilation & HVAC component cleaning', year: '2018', path: '/industries/restaurants/', linkLabel: 'Restaurant air care' },
  { name: 'The Groundlings', logo: 'groundlings.webp', place: 'Theatre & school', detail: 'Theatre main stage, administrative offices, school & Gary Austin Stage', year: '2026', path: '/services/commercial-air-duct-cleaning/', linkLabel: 'Commercial air care' },
  { name: 'SoulCycle', logo: 'soulcycle.svg', place: 'Westside studios', detail: 'Brentwood & Culver City studios', service: 'Dryer exhaust cleaning', year: '2018–2019', path: '/case-studies/soulcycle-westside-dryer-vents/', linkLabel: 'View project scope' },
  { name: 'YMCA', logo: 'ymca.webp', place: 'Westchester', detail: 'Westchester Family YMCA', service: 'Ventilation, blower & coil cleaning', year: '2015', path: '/project-stories/#case-study-03', linkLabel: 'Facility case study' },
  { name: 'Tender Greens', logo: 'tender-greens.webp', place: 'Century City', detail: 'Century City Westfield Mall', year: '2017', path: '/industries/restaurants/', linkLabel: 'Restaurant air care' },
  { name: 'Sunset Bronson Studios', logo: 'sunset-bronson.webp', place: 'Hollywood', detail: 'Sunset Bronson Studios', year: '2018', path: '/services/commercial-air-duct-cleaning/', linkLabel: 'Commercial air care' },
  { name: "Mount Saint Mary's", logo: 'mount-saint-marys.svg', place: 'Los Angeles', detail: "Mount St. Mary's College, now Mount Saint Mary's University", year: '2014', path: '/industries/education/', linkLabel: 'Campus air care' },
  { name: 'Wag Hotels', logo: 'wag-hotels.webp', place: 'Pet hospitality', detail: 'Wag Hotels', service: 'Dryer vent cleaning', year: '2025', path: '/services/commercial-dryer-vent-cleaning/', linkLabel: 'Commercial dryer care' },
  { name: 'Bassett Furniture', logo: 'bassett.svg', place: 'Torrance', detail: 'Torrance showroom', service: 'Ventilation & HVAC cleaning', year: '2014', path: '/case-studies/bassett-torrance-showroom/', linkLabel: 'View project scope' },
  { name: 'Taco Bell', logo: 'taco-bell.svg', place: 'Canoga Park', detail: 'Canoga Park · JJC Foods LLC', service: 'Ventilation & HVAC cleaning', year: '2024', path: '/case-studies/taco-bell-canoga-park-hvac/', linkLabel: 'View project scope' },
];

export default function CommercialProof() {
  return (
    <section className="pac-commercial-proof pac-client-wall" aria-labelledby="pac-client-heading">
      <div className="pac-container">
        <div className="pac-client-heading">
          <div>
            <span className="pac-eyebrow">PAST PROJECTS ACROSS LOS ANGELES</span>
            <h2 id="pac-client-heading">Clients we’ve cared for.</h2>
          </div>
          <Link to="/project-stories/" className="pac-text-link">
            Explore project stories &amp; case studies
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <ul className="pac-client-logo-grid">
          {projects.map((project) => (
            <li key={project.name}>
              <Link
                to={project.path}
                className="pac-client-logo-tile"
                aria-label={`${project.name} · ${project.place} · ${project.year} — ${project.linkLabel}`}
              >
                <span
                  className={
                    'pac-client-logo-art' +
                    (project.name === 'Sheraton'
                      ? ' pac-client-logo-art--sheraton'
                      : project.name === 'Wag Hotels'
                        ? ' pac-client-logo-art--inverse'
                        : '')
                  }
                >
                  <img
                    src={`/brand/clients/${project.logo}`}
                    alt={project.name}
                    width={180}
                    height={80}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <small>
                  {project.place}
                  <ArrowUpRight size={12} aria-hidden="true" />
                </small>
              </Link>
            </li>
          ))}
        </ul>
        <details className="pac-client-records pac-disclosure">
          <summary>See locations &amp; project years</summary>
          <ul className="pac-client-record-grid">
            {projects.map((project) => (
              <li key={project.name}>
                <strong>
                  {project.name} · {project.year}
                </strong>
                <span>
                  {project.detail}
                  {project.service ? ` · ${project.service}` : ''}
                </span>
                <br />
                <Link to={project.path}>{project.linkLabel}</Link>
              </li>
            ))}
            <li>
              <strong>West Hollywood Community Housing Corporation · 2026</strong>
              <span>West Hollywood office · Four HVAC systems</span>
              <br />
              <Link to="/case-studies/nonprofit-housing-office-hvac/">View project scope</Link>
            </li>
          </ul>
        </details>
        <p className="pac-client-note">
          Selected past projects at the locations shown. Logos identify those clients; they do not imply a current or brand-wide partnership.
        </p>
      </div>
    </section>
  );
}
