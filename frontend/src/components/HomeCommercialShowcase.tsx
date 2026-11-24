import { Link } from '@/components/CanonicalLink';
import { ArrowUpRight, Plus } from 'lucide-react';
import logos from '@/data/commercialWorkLogos.json';
import './HomeCommercialShowcase.css';

type Logo = (typeof logos)[number];

function LogoGrid({ entries, label }: { entries: Logo[]; label: string }) {
  return <ul className="pac-work-logos" aria-label={label}>
    {entries.map(logo => <li key={logo.name} className={logo.inverse ? 'pac-work-logo pac-work-logo--dark' : 'pac-work-logo'}>
      <img src={logo.src} alt={logo.name} data-art={logo.art} width={180} height={76} loading="lazy" decoding="async" />
    </li>)}
  </ul>;
}

export default function HomeCommercialShowcase() {
  return <section className="pac-work-showcase" aria-labelledby="pac-work-heading">
    <div className="pac-container">
      <div className="pac-work-heading">
        <h2 id="pac-work-heading">A selection of our <em>commercial work.</em></h2>
        <Link to="/project-stories/" className="pac-text-link">Explore project stories <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
      <LogoGrid entries={logos.slice(0, 6)} label="Selected commercial work" />
      <details className="pac-work-more">
        <summary>Explore more commercial work <Plus size={17} aria-hidden="true" /></summary>
        <LogoGrid entries={logos.slice(6)} label="More commercial work" />
      </details>
      <p className="pac-work-note">Past work at selected locations. Logos belong to their respective owners and do not imply a current or brand-wide partnership.</p>
    </div>
  </section>;
}
