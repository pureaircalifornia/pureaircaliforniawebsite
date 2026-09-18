import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

// Supported by PAC service records; see docs/SEO/client-logos-2026-09-14.md.
const projects = [
  { name: 'Four Seasons', logo: '/brand/clients/four-seasons.svg', detail: 'Four Seasons Hotel Los Angeles', service: 'Guestroom ventilation, blower & coil cleaning', year: '2015', path: '/industries/hospitality/', linkLabel: 'Explore hotel air care', sector: 'Hospitality' },
  { name: 'Panera Bread', logo: '/brand/clients/panera-bread.png', detail: 'Pasadena café', service: 'Ventilation & HVAC component cleaning', year: '2018', path: '/industries/restaurants/', linkLabel: 'Explore restaurant air care', sector: 'Restaurants' },
  { name: 'YMCA', logo: '/brand/clients/ymca.png', detail: 'Westchester Family YMCA', service: 'Ventilation, blower & coil cleaning', year: '2015', path: '/services/commercial-air-duct-cleaning/', linkLabel: 'Explore commercial air care', sector: 'Community facilities' },
  { name: 'SoulCycle', logo: undefined, detail: 'Brentwood & Culver City studios', service: 'Dryer exhaust cleaning', year: '2018–2019', path: '/case-studies/soulcycle-westside-dryer-vents/', linkLabel: 'View project scope', sector: 'Fitness studios' },
  { name: 'Bassett Furniture', logo: '/brand/clients/bassett.svg', detail: 'Torrance showroom', service: 'Ventilation & HVAC cleaning', year: '2014', path: '/case-studies/bassett-torrance-showroom/', linkLabel: 'View project scope', sector: 'Retail' },
  { name: 'Taco Bell', logo: '/brand/clients/taco-bell.svg', detail: 'Canoga Park · JJC Foods LLC', service: 'Ventilation & HVAC cleaning', year: '2024', path: '/case-studies/taco-bell-canoga-park-hvac/', linkLabel: 'View project scope', sector: 'Restaurants' },
];

export default function CommercialProof() {
  return (
    <section className="pac-commercial-proof pac-section" aria-labelledby="pac-client-heading">
      <div className="pac-container">
        <div className="pac-section-heading">
          <div>
            <span className="pac-eyebrow">REAL PLACES. REAL PROJECTS.</span>
            <h2 id="pac-client-heading">Good company.<br /><em>Careful work.</em></h2>
          </div>
          <p>Hotels, cafés, fitness studios and neighborhood spaces. Meet some of the businesses and organizations PAC has helped care for across Greater Los Angeles.</p>
        </div>
        <ul className="pac-client-grid pac-client-expanded">
          {projects.map(project => (
            <li key={project.name}>
              <Link to={project.path} className="pac-client-card">
                <span className="pac-client-sector">{project.sector}</span>
                <div className="pac-client-identity">
                  {project.logo
                    ? <img src={project.logo} alt={project.name} width="180" height="80" loading="lazy" decoding="async" />
                    : <span>{project.name}</span>}
                </div>
                <h3>{project.detail}</h3>
                <p>{project.service}</p>
                <span className="pac-client-year">Project record · {project.year}</span>
                <span className="pac-text-link">{project.linkLabel}<ArrowUpRight size={16} aria-hidden="true" /></span>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/case-studies/nonprofit-housing-office-hvac/" className="pac-client-community">
          <div>
            <span className="pac-eyebrow">COMMUNITY & NONPROFIT</span>
            <h3>West Hollywood Community Housing Corporation</h3>
            <p>West Hollywood office · Four HVAC systems · 2026</p>
          </div>
          <span className="pac-text-link">View project scope<ArrowUpRight size={18} aria-hidden="true" /></span>
        </Link>
        <div className="pac-client-closing">
          <p className="pac-proof-note">Selected past projects at the locations shown. Names and logos identify those locations; they do not imply a current partnership or brand-wide endorsement.</p>
          <Link to="/case-studies/" className="pac-text-link">Explore our project stories<ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
