import { ReactNode, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Phone, Pause, Play } from 'lucide-react';
import { business } from '@/config/business';
import { getPageHero } from '@/data/pageHeroes';
import { getHeroChapters } from '@/data/heroChapters';
import { usePageMotion } from '@/hooks/usePageMotion';

type Props = { title: ReactNode; description?: ReactNode; image?: string; alt?: string; eyebrow?: string; meta?: ReactNode; caption?: string; compact?: boolean };
export default function PageHero(props: Props) {
  const { pathname } = useLocation();
  return <HeroStory key={pathname} {...props} pathname={pathname} />;
}
function HeroStory({ title, description, image, alt, eyebrow, meta, caption, compact = false, pathname }: Props & { pathname: string }) {
  const base = getPageHero(pathname);
  const chapters = getHeroChapters(pathname, { ...base, image: image || base.image, alt: alt || base.alt, caption: caption || base.caption });
  const motion = usePageMotion();
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState<number[]>([]);
  const [failed, setFailed] = useState<number[]>([]);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [manual, setManual] = useState(false);
  const autoplay = motion.enabled && !manual;
  const running = autoplay && inView && visible && !hovered;

  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);

  useEffect(() => {
    if (!running || window.__PRERENDERING__) return;
    const next = [1, 2, 3].map(offset => (active + offset) % chapters.length).find(index => index !== active && ready.includes(index) && !failed.includes(index));
    if (next === undefined) return;
    const timer = window.setTimeout(() => setActive(next), 6500);
    return () => window.clearTimeout(timer);
  }, [active, chapters.length, failed, ready, running]);

  const displayed = ready.includes(active) && !failed.includes(active) ? active : ready.find(index => !failed.includes(index)) ?? 0;
  const choose = (index: number) => { setManual(true); setActive(index); };
  const toggle = () => {
    if (!motion.enabled) { setManual(false); motion.toggle(); }
    else if (manual) setManual(false);
    else motion.toggle();
  };
  return (
    <section ref={root} className={'pac-page-hero pac-story-hero ' + (compact ? 'is-compact ' : '') + (running ? 'is-story-running ' : '') + (motion.enabled ? 'pac-page-motion-on' : 'is-story-still')} aria-label="Page introduction" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={event => { if ((event.target as HTMLElement).closest('a,button,summary,input,select,textarea') && !(event.target as HTMLElement).closest('.pac-story-play')) setManual(true); }}>
      <div className="pac-story-frames">
        {chapters.map((chapter, index) => <div key={chapter.image + index} aria-hidden={displayed !== index} className={'pac-story-frame ' + (displayed === index ? 'is-active' : '')}>
          <img className="pac-story-image" src={chapter.image} alt={chapter.alt} width={1800} height={1100} loading={index === 0 ? 'eager' : 'lazy'} {...{ fetchpriority: index === 0 ? 'high' : 'low' }} style={{ objectPosition: chapter.position || 'center' }} onLoad={() => setReady(value => value.includes(index) ? value : [...value, index])} onError={() => setFailed(value => value.includes(index) ? value : [...value, index])} />
        </div>)}
      </div>
      <div className="pac-page-hero-wash" />
      <div className="pac-hero-air-trail" aria-hidden="true"><span /><span /><span /></div>
      <div className="pac-container pac-page-hero-content">
        <span className="pac-eyebrow">{eyebrow || base.eyebrow}</span>
        <h1>{title}</h1>
        {description && <details className="pac-hero-details"><summary>{pathname.startsWith('/services') ? 'Service details' : 'Explore the details'}</summary><div className="pac-page-hero-description">{description}</div></details>}
        {meta && <div className="pac-page-hero-meta">{meta}</div>}
        {!compact && <div className="pac-actions"><a href={business.phoneHref} className="pac-button pac-button-light"><Phone size={18} aria-hidden="true" /> Call {business.phone}</a><Link to="/quote/#estimate-builder" className="pac-text-link">Build my estimate <ArrowUpRight size={17} aria-hidden="true" /></Link></div>}
        <div className="pac-story-console" role="group" aria-label="Visual story chapters">
          <div className="pac-story-caption" aria-live={manual ? 'polite' : 'off'} aria-atomic="true">
            <span className="pac-story-kicker">0{displayed + 1} / {chapters[displayed].label}</span>
            <p>{chapters[displayed].text}</p>
          </div>
          <div className="pac-story-navigation">
            <div className="pac-story-chapters">{chapters.map((chapter, index) => <button key={chapter.label} type="button" aria-label={`Chapter ${index + 1}: ${chapter.label}`} aria-pressed={displayed === index} disabled={failed.includes(index)} onClick={() => choose(index)}><span className="pac-story-chapter-line" aria-hidden="true" /><span>0{index + 1}</span><span>{chapter.label}</span></button>)}</div>
            <button type="button" className="pac-page-motion-control pac-story-play" onClick={toggle} disabled={motion.reduced} aria-label={autoplay ? 'Pause hero story' : 'Play hero story'}>
              {autoplay ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}<span>{motion.reduced ? 'Still view' : autoplay ? 'Pause' : 'Play'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

