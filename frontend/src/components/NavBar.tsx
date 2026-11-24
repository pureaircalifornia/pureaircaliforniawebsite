import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, Menu, Phone, X } from 'lucide-react';
import BrandMark from './BrandMark';
import { business } from '@/config/business';
import { serviceGroups } from '@/data/serviceNavigation';

const explore = [['Service areas','/locations/'],['Pricing & estimates','/pricing/'],['Commercial industries','/industries/'],['Project stories','/case-studies/'],['About PAC','/about/'],['Air care journal','/blog/'],['Contact us','/contact/']];
export default function NavBar(_props: {alwaysOpaque?: boolean}) {
 const [open,setOpen]=useState(false);
 const [dropdown,setDropdown]=useState(false);
 const location=useLocation();
 const header=useRef<HTMLElement>(null);
 const menuButton=useRef<HTMLButtonElement>(null);
 const serviceButton=useRef<HTMLButtonElement>(null);
 const current=(to:string)=>location.pathname.replace(/\/$/,'')===to.replace(/\/$/,'');
 useEffect(()=>{setOpen(false);setDropdown(false);},[location.key]);
 useEffect(()=>{
  const close=(e:PointerEvent)=>{if(!header.current?.contains(e.target as Node)){setDropdown(false);setOpen(false);}};
  const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){if(open){setOpen(false);menuButton.current?.focus()}if(dropdown){setDropdown(false);serviceButton.current?.focus()}}};
  const media=window.matchMedia('(min-width:901px)');
  const resize=()=>{setOpen(false);setDropdown(false)};
  document.addEventListener('pointerdown',close);document.addEventListener('keydown',key);media.addEventListener('change',resize);
  return()=>{document.removeEventListener('pointerdown',close);document.removeEventListener('keydown',key);media.removeEventListener('change',resize)};
 },[open,dropdown]);
 const navLink=(label:string,to:string)=><Link key={to} to={to} aria-current={current(to)?'page':undefined}>{label}<ArrowRight size={16} aria-hidden="true"/></Link>;
 return <><header ref={header} className="pac-header" onBlur={e=>{if(e.relatedTarget&&!e.currentTarget.contains(e.relatedTarget as Node)){setOpen(false);setDropdown(false)}}}>
  <a className="pac-skip-link" href={location.pathname+location.search+'#site-content-start'}>Skip to content</a>
  <div className="pac-nav-inner pac-container">
   <Link className="pac-logo-link" to="/" aria-label="Pure Air California home"><BrandMark/></Link>
   <nav aria-label="Main navigation" className="pac-desktop-nav">
    <div className="pac-nav-dropdown" onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setDropdown(false)}}>
     <button ref={serviceButton} type="button" aria-expanded={dropdown} aria-controls="pac-services-menu" onClick={()=>setDropdown(!dropdown)}>Our services <ChevronDown size={14} aria-hidden="true"/></button>
     <div id="pac-services-menu" className="pac-dropdown-panel pac-service-menu" hidden={!dropdown}>
      <div className="pac-service-menu-groups">{serviceGroups.map(group=><div key={group.id}><h2>{group.title}</h2>{group.items.map(s=>navLink(s.label,s.path))}</div>)}</div>
      <div className="pac-menu-footer">{navLink('Explore all services','/services/')}{navLink('Pricing & estimates','/pricing/')}{navLink('Not sure? Talk to PAC','/contact/')}</div>
     </div>
    </div>
    <Link to="/services/#home">For your home</Link><Link to="/industries/" aria-current={current('/industries/')?'page':undefined}>For your business</Link><Link to="/locations/" aria-current={current('/locations/')?'page':undefined}>Service areas</Link><Link to="/about/" aria-current={current('/about/')?'page':undefined}>About PAC</Link>
   </nav>
   <div className="pac-nav-actions"><Link to="/quote/#estimate-builder" className="pac-nav-estimate">Free estimate</Link><a href={business.phoneHref} className="pac-button pac-nav-call"><Phone size={16}/><span className="pac-desktop-call-label">{business.phone}</span><span className="pac-mobile-call-label">Call PAC</span></a><button type="button" ref={menuButton} className="pac-menu-toggle" aria-label={open?'Close menu':'Open menu'} aria-controls="pac-mobile-menu" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div>
  </div>
  <nav id="pac-mobile-menu" className="pac-mobile-menu pac-grouped-mobile-menu" aria-label="Mobile navigation" hidden={!open}>
   <div className="pac-mobile-menu-heading"><span>How can we help?</span><Link to="/services/">All services <ArrowRight size={16}/></Link></div>
   {serviceGroups.map(group=><details key={group.id} open={group.id==='home'}><summary>{group.title}<ChevronDown size={18} aria-hidden="true"/></summary><div>{group.items.map(s=>navLink(s.label,s.path))}</div></details>)}
   <div className="pac-mobile-explore">{explore.map(([label,to])=>navLink(label,to))}</div>
   <Link className="pac-button pac-mobile-quote" to="/quote/#estimate-builder">Request a free estimate <ArrowRight size={18}/></Link>
  </nav>
 </header><span id="site-content-start" tabIndex={-1} className="pac-content-anchor" /></>;
}

