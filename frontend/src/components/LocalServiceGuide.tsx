import { Link } from 'react-router-dom';
import { ArrowUpRight, Building2, Home, Check } from 'lucide-react';
import type { LocalGuide } from '@/data/localGuides';

export default function LocalServiceGuide({ guide }: { guide: LocalGuide }) {
  return <section className="pac-local-guide pac-section pac-container" aria-label={guide.name + ' property guide'}>
    <div className="pac-section-heading"><div><span className="pac-eyebrow">A PLAN FOR YOUR PROPERTY</span><h2>At home. At work.<br/><em>Right here in {guide.name}.</em></h2></div></div>
    <div className="pac-local-columns">
      <div><Home aria-hidden="true"/><h3>For your home</h3><p>{guide.home}</p><Link to="/services/residential-air-duct-cleaning/">Explore home duct cleaning <ArrowUpRight size={16}/></Link></div>
      <div><Building2 aria-hidden="true"/><h3>For your business</h3><p>{guide.commercial}</p><Link to="/services/commercial-air-duct-cleaning/">Explore commercial duct cleaning <ArrowUpRight size={16}/></Link></div>
    </div>
    <div className="pac-local-planning"><div><span className="pac-eyebrow">BEFORE WE VISIT</span><h3>A little planning.<br/>A smoother service day.</h3></div><ul>{guide.planning.map(item => <li key={item}><Check size={19} aria-hidden="true"/><span>{item}</span></li>)}</ul></div>
    {guide.project && <aside className="pac-local-project"><span className="pac-eyebrow">FROM OUR PROJECT RECORDS</span><p>{guide.project.text}</p><Link to={guide.project.path}>See the project scope <ArrowUpRight size={17}/></Link></aside>}
    <p className="pac-local-source">Local area reference: <a href={guide.source.url} target="_blank" rel="noreferrer">{guide.source.label}</a>. PAC serves this area; this is not a separate branch office.</p>
  </section>;
}
