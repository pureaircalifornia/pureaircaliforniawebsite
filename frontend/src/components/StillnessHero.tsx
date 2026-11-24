import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Pause, Play } from 'lucide-react';

const landscapes = [
  { name: 'yosemite-stars', label: 'Under the stars', alt: 'A luminous Milky Way stretching above Yosemite granite peaks and evergreen trees' },
  { name: 'cloud-sea', label: 'Above the clouds', alt: 'Soft pink evening light falling across a vast sea of clouds' },
  { name: 'living-forest', label: 'Among the trees', alt: 'Sunlight across an evergreen mountain forest and an open meadow beneath sweeping clouds' },
];
const moments = [
  { title: 'Arrive here.', text: 'Let your shoulders soften. Let your breath come and go naturally.' },
  { title: 'Notice the air.', text: 'The air around you becomes part of every breath. Feel its touch. Notice its movement.' },
  { title: 'Carry this with you.', text: 'Something so essential to life deserves our attention. Wherever we breathe.' },
];

export default function StillnessHero() {
  const root = useRef<HTMLElement>(null);
  const pickerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [landscape, setLandscape] = useState(0);
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [failed, setFailed] = useState<number[]>([]);
  const finished = step === moments.length;
  const moment = moments[Math.min(step, moments.length - 1)];

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener('change', sync);
    const stop = () => { if (document.hidden) setPlaying(false); };
    document.addEventListener('visibilitychange', stop);
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) setPlaying(false); }, { threshold: 0.1 });
    if (root.current) observer.observe(root.current);
    return () => {
      media.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', stop);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!playing || step < 0 || finished) return;
    const timer = window.setTimeout(() => {
      setStep(value => value + 1);
      if (step === moments.length - 1) setPlaying(false);
    }, 9000);
    return () => window.clearTimeout(timer);
  }, [playing, step, finished]);

  const toggle = () => {
    if (step < 0 || finished) { setStep(0); setPlaying(true); }
    else setPlaying(value => !value);
  };
  const next = () => { setPlaying(false); setStep(value => Math.min(value + 1, moments.length)); };
  const visibleLandscape = failed.includes(landscape) ? landscapes.findIndex((_, index) => !failed.includes(index)) : landscape;

  const onPickerKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const total = landscapes.length;
    const target =
      event.key === 'Home' ? 0 :
      event.key === 'End' ? total - 1 :
      event.key === 'ArrowRight' ? (visibleLandscape + 1) % total :
      (visibleLandscape - 1 + total) % total;
    if (!failed.includes(target)) {
      setLandscape(target);
      setPlaying(false);
      pickerRefs.current[target]?.focus();
    }
  };

  return <section ref={root} id="our-mission" className={'pac-stillness-hero' + (playing && !reduced ? ' is-playing' : '')} aria-labelledby="stillness-title">
    <div className="pac-stillness-landscapes">{landscapes.map((scene, index) => {
      const isInitial = index === 0;
      const isActive = visibleLandscape === index;
      return (
        <img
          key={scene.name}
          src={`/images/breath/${scene.name}-1920.webp`}
          srcSet={`/images/breath/${scene.name}-640.webp 640w, /images/breath/${scene.name}-1440.webp 1440w, /images/breath/${scene.name}-1920.webp 1920w`}
          sizes="100vw"
          alt={scene.alt}
          aria-hidden={!isActive}
          className={isActive ? 'is-active' : ''}
          width={1920}
          height={1154}
          loading={isInitial || isActive ? 'eager' : 'lazy'}
          decoding="async"
          {...{ fetchpriority: isInitial ? 'high' : 'low' }}
          onError={() => setFailed(value => value.includes(index) ? value : [...value, index])}
        />
      );
    })}</div>
    <div className="pac-stillness-shade" />
    <div className="pac-container pac-stillness-content">
      <span className="pac-eyebrow">BEFORE ANYTHING ELSE / A MOMENT FOR YOU</span>
      <h1 id="stillness-title">Everything begins<br />with <em>a breath.</em></h1>
      <p className="pac-stillness-intro">Before the day begins. Before the words.<br />Before everything you love. There is this.</p>
      <div className="pac-stillness-invitation">
        <div className="pac-stillness-orbit" aria-hidden="true"><i /><i /><i /></div>
        <div className="pac-stillness-guidance" aria-live="polite" aria-atomic="true"><strong>{step < 0 ? 'Let the world wait a moment.' : finished ? 'A small pause. A little more awareness.' : moment.title}</strong><p>{step < 0 ? 'Look at the sky. Settle in. There is nothing to do but breathe.' : finished ? 'Keep breathing at your own pace. Stay as long as you like.' : moment.text}</p></div>
      </div>
      <div className="pac-stillness-actions"><button type="button" className="pac-stillness-toggle" onClick={toggle} aria-pressed={playing}>{playing ? <Pause size={16} /> : <Play size={16} />}{step < 0 ? 'Take a quiet moment' : finished ? 'Begin again' : playing ? 'Pause this moment' : 'Continue this moment'}</button>{step >= 0 && !finished && <button type="button" className="pac-stillness-next" onClick={next}>Next reflection <ArrowRight size={15} /></button>}</div>
      <div className="pac-stillness-bottom">
        <div className="pac-landscape-picker" role="group" aria-label="Choose your landscape" onKeyDown={onPickerKeyDown}>
          {landscapes.map((scene, index) => (
            <button
              type="button"
              key={scene.name}
              ref={el => { pickerRefs.current[index] = el; }}
              aria-pressed={visibleLandscape === index}
              disabled={failed.includes(index)}
              onClick={() => { setLandscape(index); setPlaying(false); }}
            >
              {scene.label}
            </button>
          ))}
        </div>
        <a href="#notice-the-air" className="pac-stillness-continue">Follow your next breath <ArrowDown size={16} /></a>
      </div>
    </div>
  </section>;
}
