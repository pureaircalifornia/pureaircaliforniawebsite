import { useEffect, useRef, useState } from 'react';
import { Link } from '@/components/CanonicalLink';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Phone } from 'lucide-react';
import { business } from '@/config/business';

const archiveImage = (name: string, width: number, height: number) => ({
  src: `/images/journey-v2/${name}-960.webp`,
  srcSet: [480, 960, 1600].map(size => `/images/journey-v2/${name}-${size}.webp ${size}w`).join(', '),
  width,
  height,
});
const storyImage = (name: string) => ({
  src: `/images/visual-story/${name}-1280.webp`,
  srcSet: [640, 1280, 1920].map(size => `/images/visual-story/${name}-${size}.webp ${Math.min(size, 1672)}w`).join(', '),
  width: 1672,
  height: 941,
});
// Cover images must resolve the full bitmap width, including the cropped area on tall screens.
const photoSizes = (width: number, height: number) => {
  const ratio = width / height;
  return `(max-width: 900px) max(100vw, calc(${(100 * ratio).toFixed(2)}svh - ${(167 * ratio).toFixed(2)}px)), max(100vw, calc(${(100 * ratio).toFixed(2)}svh - ${(91 * ratio).toFixed(2)}px))`;
};
const chapters = [
  { label: 'A breath', title: '', text: '', photo: archiveImage('night', 2047, 1230), alt: 'The Milky Way above Yosemite, from the original Pure Air California website' },
  { label: 'Los Angeles', title: 'Our city. Your space.', text: 'Air duct and dryer vent care, from the canyons to the coast.', photo: archiveImage('la-skyline-cedric', 2400, 1350), alt: 'Palm trees silhouetted against downtown Los Angeles at golden hour' },
  { label: 'At home', title: 'Their world starts at home.', text: 'From the vent to the room, air moves through the spaces where your family lives.', photo: storyImage('home-family'), alt: 'A parent and baby playing beside a deep blue sofa, with a low wall air vent nearby; illustrative home scene' },
  { label: 'Allergies?', title: 'Sneezing a little too often?', text: 'Dust, pollen, pets, filters. Start by understanding what is in your home and your system.', photo: storyImage('allergy-home'), alt: 'A woman sneezing into a tissue on a blue sofa at home; illustrative allergy concern' },
  { label: 'Look inside', title: 'See what is out of sight.', text: 'Dust and debris can collect inside ductwork. A closer look comes first.', photo: archiveImage('dirty-wide', 1800, 1013), alt: 'Dust and debris coating the interior of a metal air duct' },
  { label: 'We clean', title: 'Inspect. Explain. Clean.', text: 'We agree the scope, loosen the buildup and collect the debris.', photo: archiveImage('cleaning', 1680, 945), alt: 'Illustrated rotary brush loosening debris inside a metal air duct' },
  { label: 'The result', title: 'The difference is inside.', text: 'Review the work. Understand your system. Plan its next care.', photo: archiveImage('ductwork', 1672, 941), alt: 'Illustration of the clear interior of a metal air duct after cleaning' },
  { label: 'Your people', title: 'For the life you live here.', text: 'Small moments. Familiar comforts. A home worth caring for.', photo: storyImage('home-family'), alt: 'A parent and baby enjoying a sunny living room with a blue couch; illustrative family scene' },
] as const;

export default function AirJourney() {
  const root = useRef<HTMLElement>(null);
  const chapterButtons = useRef<Array<HTMLButtonElement | null>>([]);
  const [enhanced, setEnhanced] = useState(false);
  // Scene fades stay off until one frame has painted the pinned film with its
  // hidden scenes already hidden. Without this, switching on the film fades all
  // eight stacked scenes out together and their text overlaps on first load.
  const [fadesReady, setFadesReady] = useState(false);
  const [active, setActive] = useState(0);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    if (window.__PRERENDERING__) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setEnhanced(!motion.matches);
    sync();
    motion.addEventListener('change', sync);
    return () => motion.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!enhanced) {
      setFadesReady(false);
      return;
    }
    let second = 0;
    const first = window.requestAnimationFrame(() => {
      second = window.requestAnimationFrame(() => setFadesReady(true));
    });
    return () => {
      window.cancelAnimationFrame(first);
      window.cancelAnimationFrame(second);
    };
  }, [enhanced]);

  useEffect(() => {
    const el = root.current;
    if (!el || !enhanced) return;
    const stage = el.querySelector<HTMLElement>('.pac-film-stage');
    if (!stage) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = el.getBoundingClientRect();
      const scrollable = Math.max(1, el.offsetHeight - stage.clientHeight);
      const progress = Math.min(1, Math.max(0, -box.top / scrollable));
      el.style.setProperty('--film-progress', progress.toFixed(3));
      setActive(Math.min(chapters.length - 1, Math.floor(progress * chapters.length)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [enhanced]);

  useEffect(() => {
    const el = root.current;
    if (!el || !enhanced) return;
    const scenes = Array.from(el.querySelectorAll<HTMLElement>('[data-scene]'));
    scenes.forEach((scene, index) => {
      const shown = active === index;
      scene.style.opacity = shown ? '1' : '0';
      scene.style.visibility = shown ? 'visible' : 'hidden';
      scene.inert = !shown;
      scene.setAttribute('aria-hidden', String(!shown));
    });
    return () => {
      scenes.forEach(scene => {
        scene.style.removeProperty('opacity');
        scene.style.removeProperty('visibility');
        scene.inert = false;
        scene.removeAttribute('aria-hidden');
      });
    };
  }, [enhanced, active]);

  useEffect(() => {
    const list = root.current?.querySelector<HTMLElement>('.pac-film-chapters');
    const selected = list?.children[active] as HTMLElement | undefined;
    if (list && selected) {
      list.scrollLeft = Math.max(0, selected.offsetLeft - list.offsetLeft - (list.clientWidth - selected.clientWidth) / 2);
    }
  }, [active]);

  const goTo = (index: number, announce = false) => {
    const clamped = Math.max(0, Math.min(chapters.length - 1, index));
    const el = root.current;
    if (!el) return;
    if (!enhanced) {
      el.querySelectorAll<HTMLElement>('[data-scene]')[clamped]?.scrollIntoView({ behavior: 'instant', block: 'start' });
      return;
    }
    const stage = el.querySelector<HTMLElement>('.pac-film-stage');
    if (stage) {
      const ratio = clamped === 0 ? 0 : clamped === chapters.length - 1 ? 1 : (clamped + 0.25) / chapters.length;
      window.scrollTo({
        top: window.scrollY + el.getBoundingClientRect().top + (el.offsetHeight - stage.clientHeight) * ratio,
        behavior: 'instant',
      });
    }
    setActive(clamped);
    if (announce) {
      setAnnouncement(`Chapter ${clamped + 1} of ${chapters.length}: ${chapters[clamped].label}`);
    }
  };

  const onSectionKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!enhanced) return;
    const tag = (event.target as HTMLElement | null)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const next = Math.min(chapters.length - 1, active + 1);
      goTo(next, true);
      if ((event.target as HTMLElement | null)?.closest('.pac-film-chapters')) {
        chapterButtons.current[next]?.focus();
      }
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const prev = Math.max(0, active - 1);
      goTo(prev, true);
      if ((event.target as HTMLElement | null)?.closest('.pac-film-chapters')) {
        chapterButtons.current[prev]?.focus();
      }
    } else if (event.key === 'Home' && (event.target as HTMLElement | null)?.closest('.pac-film-chapters')) {
      event.preventDefault();
      goTo(0, true);
      chapterButtons.current[0]?.focus();
    } else if (event.key === 'End' && (event.target as HTMLElement | null)?.closest('.pac-film-chapters')) {
      event.preventDefault();
      goTo(chapters.length - 1, true);
      chapterButtons.current[chapters.length - 1]?.focus();
    }
  };

  return <section
    ref={root}
    className={'pac-journey pac-film pac-visual-film' + (enhanced ? ' is-enhanced' + (fadesReady ? ' is-fade-ready' : '') : ' is-motion-reduced')}
    data-active-chapter={active}
    aria-label="See how air duct care fits into your life"
    onKeyDown={onSectionKeyDown}
  >
    <div className="pac-film-stage">
      <span className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</span>
      {chapters.map((chapter, i) => <article id={`air-chapter-${i}`} key={chapter.label} data-scene={i} className={`pac-film-scene pac-film-scene-${i}`}>
        <picture>
          {i === 0 && <source type="image/avif" srcSet="/images/journey-v2/night-480.avif 480w, /images/journey-v2/night-960.avif 960w, /images/journey-v2/night-1600.avif 1600w" sizes={photoSizes(chapter.photo.width, chapter.photo.height)} />}
          <img className="pac-film-photo" {...chapter.photo} sizes={photoSizes(chapter.photo.width, chapter.photo.height)} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" {...{ fetchpriority: i === 0 ? 'high' : 'low' }} alt={chapter.alt} />
        </picture>
        <div className="pac-film-shade" />
        <div className="pac-film-copy pac-container">
          <span className="pac-eyebrow">{i === 0 ? 'PURE AIR. FULLER LIVING.' : `${String(i + 1).padStart(2, '0')} / ${chapter.label}`}</span>
          {i === 0 ? <>
            <h1>Air duct cleaning in Los Angeles.<br /><em>A breath of pure air.</em></h1>
            <p className="pac-film-intro">For your home, office, and business.<br />Clear scope. Thoughtful care.</p>
            <div className="pac-actions">
              <Link className="pac-button" to="/quote/#estimate-builder">Get my free estimate <ArrowUpRight size={18} aria-hidden="true" /></Link>
              <a className="pac-film-phone" href={business.phoneHref}><Phone size={16} aria-hidden="true" /> {business.phone}</a>
            </div>
            <div className="pac-film-trust" aria-label="Service highlights">
              <span><Check size={13} aria-hidden="true" /> Free written estimates</span>
              <span><Check size={13} aria-hidden="true" /> Air ducts from $299</span>
              <span><Check size={13} aria-hidden="true" /> Dryer vents from $149</span>
              <span><Check size={13} aria-hidden="true" /> Greater Los Angeles</span>
            </div>
            <button className="pac-film-invitation" type="button" onClick={() => goTo(2, true)}><img src="/images/visual-story/home-family-640.webp" alt="" width={100} height={56} /><span><strong>Meet the air in your home</strong><small>Explore the visual story</small></span><ArrowRight size={20} aria-hidden="true" /></button>
          </> : <>
            <h2>{chapter.title}</h2><p>{chapter.text}</p>
            {i === 1 && <Link className="pac-text-link" to="/locations/los-angeles/">Explore Los Angeles coverage <ArrowUpRight size={16} aria-hidden="true" /></Link>}
            {i === 2 && <span className="pac-film-caption">Illustrated airflow · The same room. The air we share.</span>}
            {i === 3 && <><Link className="pac-text-link" to="/blog/clean-air-ducts-allergy-relief/">Understand allergies &amp; indoor air <ArrowUpRight size={16} aria-hidden="true" /></Link><span className="pac-film-caption">Duct cleaning is not proven to prevent or treat allergies. Filtration and source control matter, too.</span></>}
            {i === 5 && <><Link className="pac-text-link" to="/pricing/">See transparent starting prices <ArrowUpRight size={16} aria-hidden="true" /></Link><span className="pac-film-caption">Illustrated cleaning process.</span></>}
            {i === 6 && <Link className="pac-text-link" to="/quote/#estimate-builder">Build your free estimate <ArrowUpRight size={16} aria-hidden="true" /></Link>}
            {i === 7 && <div className="pac-actions"><Link className="pac-button" to="/services/residential-air-duct-cleaning/">Explore home air duct care <ArrowRight size={17} aria-hidden="true" /></Link><Link className="pac-text-link" to="/quote/#estimate-builder">Get my free estimate <ArrowUpRight size={16} aria-hidden="true" /></Link></div>}
          </>}
        </div>
      </article>)}
      {enhanced && <div className="pac-film-controls pac-container">
        <div className="pac-film-chapters" role="group" aria-label="Choose a visual story chapter (use Left and Right arrow keys)">
          {chapters.map((chapter, i) => (
            <button
              type="button"
              key={chapter.label}
              ref={el => { chapterButtons.current[i] = el; }}
              aria-label={`Chapter ${i + 1}: ${chapter.label}`}
              aria-current={active === i ? 'step' : undefined}
              onClick={() => goTo(i, true)}
            >
              <img src={chapter.photo.src} alt="" width={80} height={45} loading="lazy" />
              <span>{chapter.label}</span>
            </button>
          ))}
        </div>
        <div className="pac-film-options">
          <div className="pac-film-step-nav" aria-label="Chapter step navigation">
            <button
              type="button"
              className="pac-film-arrow"
              aria-label="Previous chapter"
              disabled={active === 0}
              onClick={() => goTo(active - 1, true)}
            >
              <ArrowLeft size={15} aria-hidden="true" />
            </button>
            <span className="pac-film-counter" aria-hidden="true">
              {String(active + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              className="pac-film-arrow"
              aria-label="Next chapter"
              disabled={active === chapters.length - 1}
              onClick={() => goTo(active + 1, true)}
            >
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
          <a href="#air-care">Find my service <ArrowDown size={16} aria-hidden="true" /></a>
        </div>
      </div>}
      {enhanced && <div className="pac-film-progress" aria-hidden="true" />}
    </div>
  </section>;
}
