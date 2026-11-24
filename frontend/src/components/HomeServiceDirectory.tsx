import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { serviceGroups, commercialMarkets } from '@/data/serviceNavigation';
import { business } from '@/config/business';

export default function HomeServiceDirectory() {
 return <section className="pac-service-directory pac-container" id="air-care" tabIndex={-1} aria-labelledby="air-care-heading">
  <div className="pac-directory-heading"><div><span className="pac-eyebrow">01 / FIND YOUR SERVICE</span><h2 id="air-care-heading">Air duct cleaning & more.<br/><em>For every kind of space.</em></h2></div><div><p>Air ducts, dryer vents, HVAC systems and filters. Find the right care for your Los Angeles home, business or building.</p><Link className="pac-text-link" to="/services/">Compare all services <ArrowRight size={18}/></Link></div></div>
  <nav className="pac-service-shortcuts" aria-label="Jump to a service group">{serviceGroups.map(group=><Link key={group.id} to={'#services-'+group.id}>{group.title}<span aria-hidden="true">↓</span></Link>)}</nav>
  <div className="pac-directory-grid">{serviceGroups.map((group,index)=><article className="pac-directory-card" key={group.id} id={'services-'+group.id} aria-labelledby={'heading-'+group.id}>
   <div className="pac-directory-photo"><img src={group.image} alt={group.alt} width={900} height={506} loading="lazy"/><span aria-hidden="true">0{index+1}</span></div>
   <div className="pac-directory-card-heading"><h3 id={'heading-'+group.id}>{group.title}</h3><p>{group.intro}</p></div>
   <ul>{group.items.map(service=><li key={service.path}><Link to={service.path}><span><strong>{service.label}</strong><small>{service.detail}</small></span><ArrowRight size={19} aria-hidden="true"/></Link></li>)}</ul>
  </article>)}</div>
  <div className="pac-directory-help"><div><strong>Not sure which service you need?</strong><p>Tell us what you’ve noticed. We’ll help you find the right starting point.</p></div><a className="pac-button" href={business.phoneHref}><Phone size={17}/> Talk to PAC</a><Link className="pac-text-link" to="/quote/">Request a free estimate <ArrowRight size={18}/></Link></div>
  <div className="pac-market-directory"><div className="pac-market-heading"><div><span className="pac-eyebrow">COMMERCIAL & MANAGED PROPERTIES</span><h3>Your kind of building.<br/>Our kind of attention.</h3></div><Link className="pac-text-link" to="/industries/">Explore all industries <ArrowRight size={18}/></Link></div><div className="pac-market-grid">{commercialMarkets.map(market=><Link to={market.path} key={market.path}><span><strong>{market.label}</strong><small>{market.detail}</small></span><ArrowRight size={18} aria-hidden="true"/></Link>)}</div></div>
 </section>;
}
