import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Pause, Play, Phone } from 'lucide-react';
import { business } from '@/config/business';

const chapters = [
 { label: 'Open sky', title: '', text: '', image: 'sky', alt: 'Sunlight and clouds in a clear blue sky' },
 { label: 'California', title: 'A little closer to nature.', text: 'From open skies to quiet valleys, air connects every place we love.', image: 'nature', alt: 'Sunlit California valley with trees and granite mountains' },
 { label: 'Los Angeles', title: 'Into the places we share.', text: 'Our homes. Our workplaces. The places where Los Angeles lives, works and welcomes people.', image: 'losAngeles', alt: 'Los Angeles skyline beyond Griffith Observatory' },
 { label: 'Inside the system', title: 'The part you rarely see.', text: 'Air moves through your ductwork every day. Dust and debris can collect along the way. An inspection helps us understand what needs attention.', image: 'dirtyDuct', alt: 'Photograph looking into ductwork with accumulated debris' },
 { label: 'The PAC difference', title: 'That’s where we come in.', text: 'We inspect, agree on the scope, and clean with care. Real people looking after your home or business.', image: 'cleanDuct', alt: 'Photograph looking down a clean metal air duct' },
 { label: 'Your next breath', title: 'For the people inside.', text: 'A cared-for system is part of a comfortable space—alongside good filtration, ventilation and moisture control.', image: 'breath', alt: 'Conceptual visualization of a person breathing with translucent lungs and airways' },
];
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => { const t = clamp(value); return t*t*(3-2*t); };

export default function AirJourney() {
 const root = useRef<HTMLElement>(null);
 const [active,setActive] = useState(0);
 const [still,setStill] = useState(false);
 const [reduced,setReduced] = useState(false);
 useEffect(()=>{const query=window.matchMedia('(prefers-reduced-motion: reduce)');const sync=()=>setReduced(query.matches);sync();query.addEventListener('change',sync);return()=>query.removeEventListener('change',sync);},[]);
 useEffect(()=>{
  if(still||reduced||!root.current)return;
  const el=root.current;
  const scenes=Array.from(el.querySelectorAll<HTMLElement>('[data-scene]'));
  const motes=Array.from(el.querySelectorAll<HTMLElement>('.pac-air-mote'));
  let frame=0,current=-1,target=0,last=0,chapter=-1;
  const measure=()=>{const box=el.getBoundingClientRect();target=clamp(-box.top/Math.max(1,el.offsetHeight-window.innerHeight))*5;};
  const paint=(time:number)=>{
   const dt=Math.min(48,time-last||16);last=time;
   current=current<0?target:current+(target-current)*(1-Math.exp(-dt/85));
   if(Math.abs(current-target)<.0005)current=target;
   el.style.setProperty('--journey-progress',String(current/5));
   scenes.forEach((scene,i)=>{
    const blend=i===0?1:smooth((current-i+.75)/1.1);
    const visible=current<i+1.75&&current>i-1.1;
    scene.style.opacity=String(blend);scene.style.visibility=visible?'visible':'hidden';
    scene.style.setProperty('--scene-depth',String(clamp((current-i+1)/2)));
    const copy=scene.querySelector<HTMLElement>('.pac-hero-copy,.pac-scene-copy');
    if(copy)copy.style.opacity=String(1-smooth((Math.abs(current-i)-.2)/.45));
    scene.inert=Math.round(current)!==i;
   });
   motes.forEach((mote,i)=>{const p=current-i*.025;const x=70+Math.sin(p*1.7)*9;const y=42+Math.sin(p*2.1)*14;mote.style.transform='translate3d('+x+'vw,'+y+'svh,0)';mote.style.opacity=String((1-i/10)*.78);});
   const next=Math.round(current);if(next!==chapter){chapter=next;setActive(next);}
   frame=current!==target?requestAnimationFrame(paint):0;
  };
  const schedule=()=>{measure();if(!frame)frame=requestAnimationFrame(paint);};
  schedule();window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);scenes.forEach(scene=>{scene.inert=false;});};
 },[still,reduced]);
 const goTo=(i:number)=>{const el=root.current;if(!el)return;if(still||reduced){el.querySelectorAll<HTMLElement>('[data-scene]')[i]?.scrollIntoView({behavior:'instant',block:'start'});return;}window.scrollTo({top:window.scrollY+el.getBoundingClientRect().top+(el.offsetHeight-window.innerHeight)*i/5,behavior:'instant'});};
 return <section ref={root} className={'pac-journey pac-photo-journey '+(still||reduced?'is-still':'')} aria-label="Follow the air: the Pure Air California story">
  <div className="pac-journey-stage">
   {chapters.map((chapter,i)=><div key={chapter.label} id={'air-chapter-'+i} data-scene={i} className={'pac-scene pac-scene-'+(i===0?'sky':i)}>
    <img className="pac-story-photo" src={'/images/pac/'+chapter.image+'.webp'} width={1800} height={1013} loading={i===0?'eager':'lazy'} {...(i===0?{fetchpriority:'high'}:{})} alt={chapter.alt}/>
    <div className="pac-story-shade"/>
    {i===0?<div className="pac-hero-copy pac-container"><span className="pac-eyebrow">GOOD PEOPLE. CLEANER SYSTEMS. PURE AIR.</span><h1><span className="pac-seo-line">Air duct cleaning in Los Angeles</span>A breath of fresh air.<br/><em>For every space.</em></h1><p>Friendly, professional air duct & dryer vent cleaning.<br/>From the home you love to the business you run.</p><div className="pac-actions"><a className="pac-button" href={business.phoneHref}><Phone size={18}/> Let's talk · {business.phone}</a><Link className="pac-text-link" to="/quote/#estimate-builder">Request a free estimate <ArrowUpRight size={18}/></Link></div><div className="pac-hero-note">Homes · Businesses · Property managers</div></div>:<div className="pac-scene-copy pac-container"><span className="pac-eyebrow">0{i+1} / {chapter.label}</span><h2>{chapter.title}</h2><p>{chapter.text}</p>{i===4&&<div className="pac-cleaning-inset"><img src="/images/pac/residential.webp" alt="Technician using a hose to clean ceiling ductwork" width={320} height={180} loading="lazy"/><span>Inspection. Careful cleaning. Clear communication.</span></div>}{i===5&&<><a className="pac-button pac-button-light" href={business.phoneHref}><Phone size={18}/> Talk to the PAC team</a><span className="pac-illustration-note">Conceptual breathing visualization</span></>}</div>}
   </div>)}
   <div className="pac-air-trail" aria-hidden="true">{Array.from({length:9},(_,i)=><span key={i} className="pac-air-mote"/>)}</div>
   <div className="pac-journey-controls pac-container"><div className="pac-chapters" aria-label="Air journey chapters">{chapters.map((c,i)=><button type="button" key={c.label} onClick={()=>goTo(i)} aria-label={'Chapter '+(i+1)+': '+c.label} aria-current={active===i?'step':undefined}><span>0{i+1}</span><span className="pac-chapter-label">{c.label}</span></button>)}</div><div className="pac-journey-options"><button type="button" onClick={()=>setStill(!still)} aria-label={still?'Resume scroll animation':'Switch to still view'} aria-pressed={still} disabled={reduced}>{still||reduced?<Play size={15}/>:<Pause size={15}/>}<span>{still||reduced?'Still view':'Pause motion'}</span></button><a href="#air-care">Explore services <ArrowDown size={15}/></a></div></div><div className="pac-journey-progress"/>
  </div>
 </section>;
}

