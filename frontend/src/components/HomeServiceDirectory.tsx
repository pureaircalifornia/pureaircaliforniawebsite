import { Link } from '@/components/CanonicalLink';
import { ArrowRight, Phone } from 'lucide-react';
import { serviceGroups, commercialMarkets } from '@/data/serviceNavigation';
import { business } from '@/config/business';

export default function HomeServiceDirectory() {
  return <section className="pac-service-directory pac-visual-directory pac-container" id="air-care" tabIndex={-1} aria-labelledby="air-care-heading">
    <div className="pac-directory-heading">
      <div><span className="pac-eyebrow">FIND YOUR CARE</span><h2 id="air-care-heading">Your space.<br /><em>A little more care.</em></h2></div>
      <div><p>Air ducts, dryer vents, HVAC &amp; filters.<br />Choose your space to find your service.</p><Link className="pac-text-link" to="/services/">See all services <ArrowRight size={18} aria-hidden="true" /></Link></div>
    </div>
    <nav className="pac-visual-category-grid" aria-label="Choose your space">
      {serviceGroups.map(group => <Link key={group.id} id={'care-choice-' + group.id} className="pac-visual-category" to={group.landingPath} aria-label={group.title}>
        <img src={group.image} alt="" style={{ objectPosition: group.imagePosition }} loading="lazy" decoding="async" width={640} height={360} />
        <span className="pac-category-copy"><strong>{group.shortTitle}</strong><small>{group.intro}</small></span>
        <span className="pac-category-check" style={{ opacity: 1, transform: 'none' }} aria-hidden="true"><ArrowRight size={15} /></span>
      </Link>)}
    </nav>
    {serviceGroups.map(group => <section id={'services-' + group.id} key={group.id} aria-labelledby={'services-heading-' + group.id} className="pac-visual-service-panel">
      <div className="pac-visual-service-heading"><h3 id={'services-heading-' + group.id}><Link to={group.landingPath}>{group.title}</Link></h3><span>{group.items.length} ways we can help</span></div>
      <div className={'pac-directory-service-grid pac-directory-service-grid--' + group.items.length}>
        {group.items.map(service => <Link className="pac-visual-service-card" key={service.path} to={service.path} aria-label={service.label}>
          <div className="pac-visual-service-photo"><img src={service.image} alt={service.alt} style={{ objectPosition: service.imagePosition }} loading="lazy" decoding="async" width={640} height={400} /><span className="pac-visual-card-action" aria-hidden="true"><ArrowRight size={22} /></span></div>
          <div className="pac-visual-service-copy"><h4>{service.shortLabel}</h4><p>{service.detail}</p><span>Explore service</span></div>
        </Link>)}
      </div>
    </section>)}
    <div className="pac-directory-help">
      <div>
        <strong>Let’s find the right care.</strong>
        <p>Home air ducts start at $299 · Dryer vents start at $149 · Commercial scopes tailored on site.</p>
      </div>
      <a className="pac-button" href={business.phoneHref}><Phone size={17} aria-hidden="true" /> Talk to PAC</a>
      <Link className="pac-text-link" to="/quote/#estimate-builder">Build my estimate <ArrowRight size={18} aria-hidden="true" /></Link>
      <Link className="pac-text-link" to="/air-quality-calculator/">Air care checklist <ArrowRight size={17} aria-hidden="true" /></Link>
    </div>
    <div className="pac-market-directory pac-visual-markets"><div className="pac-market-heading"><div><span className="pac-eyebrow">BUSINESSES &amp; MANAGED PROPERTIES</span><h3>Every building has a story.</h3></div><Link className="pac-text-link" to="/industries/">Find your industry <ArrowRight size={18} aria-hidden="true" /></Link></div><div className="pac-visual-market-grid">{commercialMarkets.map(market => <Link to={market.path} key={market.path}><img src={market.image} alt="" loading="lazy" decoding="async" width={400} height={260} /><span><strong>{market.label}</strong><ArrowRight size={18} aria-hidden="true" /></span></Link>)}</div></div>
  </section>;
}
