import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from 'lucide-react';
import BrandMark from './BrandMark';
import { business } from '@/config/business';

const services = [
 ['Residential air duct cleaning','/services/residential-air-duct-cleaning/'],
 ['Commercial air duct cleaning','/services/commercial-air-duct-cleaning/'],
 ['Dryer vent cleaning','/services/residential-dryer-vent-cleaning/'],
 ['Commercial dryer vents','/services/commercial-dryer-vent-cleaning/'],
 ['HVAC system cleaning','/services/hvac-system-cleaning/'],
 ['All services','/services/'],
];
export default function NavBar(_props: {alwaysOpaque?: boolean}) {
 const [open,setOpen]=useState(false);
 const [dropdown,setDropdown]=useState(false);
 const location=useLocation();
 const header=useRef<HTMLElement>(null);
 const menuButton=useRef<HTMLButtonElement>(null);
 useEffect(()=>{setOpen(false);setDropdown(false);},[location.pathname]);
 useEffect(()=>{
  const close=(e:MouseEvent)=>{if(!header.current?.contains(e.target as Node)){setDropdown(false);setOpen(false);}};
  const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){setOpen(false);setDropdown(false);if(open)menuButton.current?.focus();else if(dropdown)header.current?.querySelector<HTMLButtonElement>('button[aria-controls="pac-services-menu"]')?.focus();}};
  document.addEventListener('pointerdown',close);document.addEventListener('keydown',key);
  return()=>{document.removeEventListener('pointerdown',close);document.removeEventListener('keydown',key);};
 },[open,dropdown]);
 return <><header ref={header} className="pac-header">
  <a className="pac-skip-link" href={`${location.pathname}${location.search}#site-content-start`}>Skip to content</a>
  <div className="pac-nav-inner pac-container">
   <Link className="pac-logo-link" to="/" aria-label="Pure Air California home"><BrandMark/></Link>
   <nav aria-label="Main navigation" className="pac-desktop-nav">
    <div className="pac-nav-dropdown" onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setDropdown(false);}}>
     <button type="button" aria-expanded={dropdown} aria-controls="pac-services-menu" onClick={()=>setDropdown(!dropdown)}>Our services <ChevronDown size={13}/></button>
     <div id="pac-services-menu" className="pac-dropdown-panel" hidden={!dropdown}>{services.map(([label,to])=><Link key={to} to={to}>{label}<ArrowUpRight size={15}/></Link>)}</div>
    </div>
    <Link to="/services/residential-air-duct-cleaning/">For your home</Link><Link to="/industries/">For your business</Link><Link to="/locations/">Service areas</Link><Link to="/about/">About PAC</Link>
   </nav>
   <div className="pac-nav-actions"><Link to="/quote/" className="pac-nav-estimate">Free estimate</Link><a href={business.phoneHref} className="pac-button pac-nav-call"><Phone size={16}/><span className="pac-desktop-call-label">{business.phone}</span><span className="pac-mobile-call-label">Call PAC</span></a><button type="button" ref={menuButton} className="pac-menu-toggle" aria-label={open?'Close menu':'Open menu'} aria-controls="pac-mobile-menu" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div>
  </div>
  <nav id="pac-mobile-menu" className="pac-mobile-menu" aria-label="Mobile navigation" hidden={!open}>
   {services.map(([label,to])=><Link key={to} to={to}>{label}<ArrowUpRight size={16}/></Link>)}
   <Link to="/locations/">Service areas</Link><Link to="/about/">Our story</Link><Link to="/pricing/">Pricing</Link><Link to="/industries/">Commercial & industry services</Link><Link to="/blog/">Air care journal</Link><Link to="/contact/">Contact</Link><a href={business.phoneHref}>Call {business.phone}</a>
  </nav>
 </header><span id="site-content-start" tabIndex={-1} className="pac-content-anchor" /></>;
}
