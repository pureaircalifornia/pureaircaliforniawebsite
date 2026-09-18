import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react';

const chapters = [
  { label: 'The sky', title: 'Every breath has a beginning.', text: 'Follow the air. From the California sky to the place you call home.' },
  { label: 'Nature', title: 'Inspired by the air out here.', text: 'Open skies. Quiet canyons. A reminder to care for the spaces where we spend our days.' },
  { label: 'Los Angeles', title: 'Made for life in Los Angeles.', text: 'From the hills to the coast, our homes depend on the systems we rarely see.' },
  { label: 'Inside your ducts', title: 'What’s out of sight deserves attention.', text: 'Dust and debris can collect inside ductwork. An inspection shows what actually needs cleaning.' },
  { label: 'The clean', title: 'This is where Pure Air comes in.', text: 'Inspect. Loosen the buildup. Collect the debris. Careful cleaning, with a clear scope of work.' },
  { label: 'Your next breath', title: 'Back to what matters. You.', text: 'Clean ductwork is one part of a well-cared-for home, alongside filtration, ventilation and moisture control.' },
];
const clamp = (n: number) => Math.max(0, Math.min(1, n));

function Duct({ clean = false }: { clean?: boolean }) {
  return <svg className="pac-duct" viewBox="0 0 1000 700" fill="none" aria-hidden="true">
    <defs>
      <radialGradient id={clean ? 'duct-clean' : 'duct-dirty'}><stop stopColor={clean ? '#c9e8d9' : '#373c34'} /><stop offset=".3" stopColor={clean ? '#426d63' : '#37372d'} /><stop offset="1" stopColor="#0c211e" /></radialGradient>
      <linearGradient id="brush-color"><stop stopColor="#eaf1df" /><stop offset="1" stopColor="#638779" /></linearGradient>
    </defs>
    <rect width="1000" height="700" fill={`url(#${clean ? 'duct-clean' : 'duct-dirty'})`} />
    {[0,1,2,3,4,5,6,7].map(i => <rect key={i} x={30+i*54} y={25+i*36} width={940-i*108} height={650-i*72} rx={90-i*9} stroke={clean ? '#aad2c0' : '#a19778'} strokeOpacity={.18+i*.04} strokeWidth={2+i*.25} />)}
    <path d="M30 25 500 350 30 675M970 25 500 350 970 675" stroke={clean ? '#bfe8d7' : '#8b7c5d'} strokeOpacity=".2" />
    {!clean && Array.from({length:65},(_,i)=><circle key={i} cx={70+(i*139)%870} cy={70+(i*79)%580} r={2+(i%7)} fill="#c9b28d" opacity={.14+(i%5)*.07} />)}
    {clean && <g className="pac-air-lines" stroke="#d3f7e8" strokeWidth="2" opacity=".65"><path d="M20 440Q280 200 510 350T990 300"/><path d="M0 490Q280 250 510 390T1000 350"/><path d="M10 400Q270 160 510 305T1000 250"/></g>}
    {!clean && <g className="pac-cleaning-brush"><path d="M520 700V430" stroke="#819e93" strokeWidth="30"/><ellipse cx="520" cy="400" rx="160" ry="45" fill="url(#brush-color)"/>{Array.from({length:22},(_,i)=><path key={i} d={`M${380+i*13} 382v42`} stroke="#e5eadf" strokeWidth="4"/>)}<rect x="458" y="462" width="125" height="38" rx="8" fill="#edf2e6"/><text x="520" y="486" textAnchor="middle" fill="#153d32" fontSize="15" fontFamily="sans-serif">PURE AIR</text></g>}
  </svg>;
}

function Lungs() {
  return <svg className="pac-lungs" viewBox="0 0 560 560" fill="none" aria-hidden="true">
    <defs><radialGradient id="lung-light"><stop stopColor="#d4ecda" stopOpacity=".65"/><stop offset="1" stopColor="#689384" stopOpacity=".08"/></radialGradient></defs>
    <circle cx="280" cy="300" r="210" stroke="#c7dfce" strokeOpacity=".12"/><circle cx="280" cy="300" r="170" stroke="#c7dfce" strokeOpacity=".2"/>
    <g className="pac-lung-pair" stroke="#c2dfce" strokeWidth="1.5">
      <path d="M253 174C220 133 156 166 131 224C100 293 87 371 107 425C134 472 217 446 249 410C265 382 260 312 253 174Z" fill="url(#lung-light)"/>
      <path d="M307 174C340 133 404 166 429 224C460 293 473 371 453 425C426 472 343 446 311 410C295 382 300 312 307 174Z" fill="url(#lung-light)"/>
      <path d="M270 60V221L205 281M290 60V221L355 281" strokeWidth="7"/><path d="M204 280 171 243M206 278 171 351M208 280 231 364M356 280 389 243M354 278 389 351M352 280 329 364" strokeWidth="4"/>
      <path d="M171 351 143 386M171 351 193 405M231 364 225 403M171 243 165 211M389 351 417 386M389 351 367 405M329 364 335 403M389 243 395 211" strokeWidth="2"/>
    </g>
    <g className="pac-breath-particles" fill="#edf6da">{[0,1,2,3,4,5].map(i=><circle key={i} cx={280+(i%2?4:-4)} cy={70+i*26} r="3" opacity={.3+i*.1}/>)}</g>
  </svg>;
}

export default function AirJourney() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [still, setStill] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(media.matches);
    sync(); media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (still || reduced || !root.current) return;
    const element = root.current;
    let frame = 0;
    let previous = -1;
    const paint = () => {
      frame = 0;
      const bounds = element.getBoundingClientRect();
      const progress = clamp(-bounds.top / Math.max(1, element.offsetHeight - window.innerHeight));
      const position = progress * 5;
      element.style.setProperty('--journey-progress', String(progress));
      element.style.setProperty('--journey-zoom', String(1 + clamp(position) * .15));
      element.style.setProperty('--clean-progress', String(clamp((position - 3.3) / .7)));
      element.querySelectorAll<HTMLElement>('[data-scene]').forEach((scene, i) => {
        const opacity = clamp(1 - Math.abs(position - i));
        scene.style.opacity = String(opacity);
        scene.style.visibility = opacity === 0 ? 'hidden' : 'visible';
        const copy = scene.querySelector<HTMLElement>('.pac-scene-copy, .pac-hero-copy');
        if (copy) copy.style.opacity = String(clamp((opacity - .5) * 2));
      });
      const current = Math.round(position);
      if (current !== previous) { previous = current; setActive(current); }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    paint();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [still, reduced]);

  const goTo = (i: number) => {
    if (!root.current) return;
    const element = root.current;
    if (still || reduced) { document.getElementById(`air-chapter-${i}`)?.scrollIntoView({behavior:'auto', block:'center'}); return; }
    window.scrollTo({ top: window.scrollY + element.getBoundingClientRect().top + (element.offsetHeight-window.innerHeight)*i/5, behavior: 'instant' });
  };

  return <section ref={root} className={`pac-journey ${still || reduced ? 'is-still' : ''}`} aria-label="The journey of your air">
    <div className="pac-journey-stage">
      <div className="pac-scene pac-scene-sky" data-scene="0" id="air-chapter-0">
        <img className="pac-sky-image" src="/images/cinematic/california-sky-v1.webp" width="1920" height="1080" {...{ fetchpriority: "high" }} alt="Morning clouds above California hills with Los Angeles on the horizon" />
        <div className="pac-sky-wash" />
        <div className="pac-hero-copy pac-container">
          <span className="pac-eyebrow"><span className="pac-status-dot"/> LOS ANGELES, CALIFORNIA</span>
          <h1><span className="pac-seo-line">Air duct cleaning in Los Angeles</span>A better breath<br/>begins <em>at home.</em></h1>
          <p>Thoughtful air duct & dryer vent cleaning.<br/>For the spaces you love. And the people in them.</p>
          <div className="pac-actions"><Link className="pac-button" to="/quote/">Get your free estimate <ArrowUpRight size={18}/></Link><a className="pac-text-link" href="#air-care">Explore our services <ArrowDown size={16}/></a></div>
          <div className="pac-hero-note">Residential & commercial <span>•</span> Greater Los Angeles</div>
        </div>
        <div className="pac-hero-coordinate">34°03′ N &nbsp; 118°15′ W<br/><span>A LITTLE MORE ROOM TO BREATHE.</span></div>
      </div>
      {chapters.slice(1).map((chapter, index) => {
        const i = index + 1;
        return <div key={chapter.label} className={`pac-scene pac-scene-${i}`} data-scene={i} id={`air-chapter-${i}`}>
          {i === 1 && <img className="pac-scene-photo" src="/images/cinematic/nature-v1.webp" width="1600" height="1000" loading="lazy" alt="California coastal trees above a sunlit cove" />}
          {i === 2 && <img className="pac-scene-photo" src="/images/cinematic/los-angeles-v1.webp" width="1600" height="1000" loading="lazy" alt="The Los Angeles skyline" />}
          {i === 3 && <Duct />}
          {i === 4 && <><Duct clean/><div className="pac-clean-reveal"><Duct/></div></>}
          {i === 5 && <Lungs />}
          <div className="pac-scene-shade"/>
          <div className="pac-scene-copy pac-container"><span className="pac-eyebrow">0{i+1} / {chapter.label.toUpperCase()}</span><h2>{chapter.title}</h2><p>{chapter.text}</p>{i===5&&<Link className="pac-button pac-button-light" to="/quote/">Care for your home’s air <ArrowUpRight size={18}/></Link>}{i>=3&&<span className="pac-illustration-note">Illustration of airflow and duct care</span>}</div>
        </div>;
      })}
      <div className="pac-journey-controls pac-container">
        <div className="pac-chapters" aria-label="Air journey chapters">{chapters.map((c,i)=><button type="button" key={c.label} onClick={()=>goTo(i)} aria-label={`Chapter ${i+1}: ${c.label}`} aria-current={active===i?'step':undefined}><span>0{i+1}</span><span className="pac-chapter-label">{c.label}</span></button>)}</div>
        <div className="pac-journey-options"><button type="button" onClick={()=>setStill(!still)} aria-label={still ? "Resume scroll animation" : "Switch to still view"} aria-pressed={still} disabled={reduced}>{still || reduced?<Play size={14}/>:<Pause size={14}/>}<span>{still || reduced?'Still view':'Pause motion'}</span></button><a href="#air-care">Skip story <ArrowDown size={14}/></a></div>
      </div>
      <div className="pac-journey-progress"/>
    </div>
  </section>;
}
