import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from '@/components/CanonicalLink';
import { ArrowUpRight, Volume2, VolumeX, RotateCcw, Play, Pause } from 'lucide-react';
import { NaturePhoto } from './BreathMission';

const reflections = [
  { quote: 'Between one moment and the next, there is a breath. Make room for it.', image: 'quiet-mountains', alt: 'Layers of quiet mountain ridges fading into the mist' },
  { quote: 'The air we share connects us. Caring for it is a way of caring for each other.', image: 'sunlit-leaves', alt: 'Warm sunlight filtering through green leaves' },
  { quote: 'A home holds our everyday lives. Its air deserves a little love, too.', image: 'ocean-pause', alt: 'Gentle ocean waves beside a sandy beach and pier' },
  { quote: 'Behind every space are people. Behind our work is care for the air they share.', image: 'quiet-mountains', alt: 'Layers of quiet mountain ridges fading into the mist' },
];

export default function BreathingQuoteSection() {
  const { pathname } = useLocation();
  const root = useRef<HTMLElement>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const playRequest = useRef(0);
  const [reduced, setReduced] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [complete, setComplete] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [voiceBlocked, setVoiceBlocked] = useState(false);
  const [natural, setNatural] = useState(false);
  const total = natural ? 9.04 : 78;
  const phase = elapsed % 13 < 4 ? 'Breathe in' : 'Breathe out';
  const reminders = ['Let your shoulders soften.', 'Let the day slow down for a moment.', 'Notice the air, gently coming and going.', 'There is nothing you need to do right now.', 'Make a little room for yourself.', 'Take this quiet feeling with you.'];
  const reflectionLine = reminders[Math.min(5, Math.floor(elapsed / 13))];
  const index = pathname === '/' ? 0 : pathname.startsWith('/about') ? 1 : /commercial|industries|partners|property-managers|laundromat/.test(pathname) ? 3 : 2;
  const reflection = reflections[index];
  const breathScale = natural || reduced ? 1 : elapsed % 13 < 4 ? .78 + .3 * (elapsed % 13) / 4 : 1.08 - .3 * (elapsed % 13 - 4) / 9;

  const pause = useCallback(() => {
    playRequest.current += 1;
    audio.current?.pause();
    setRunning(false);
  }, []);
  const reset = useCallback(() => {
    pause();
    if (audio.current) audio.current.currentTime = 0;
    setElapsed(0); setComplete(false); setVoiceBlocked(false);
  }, [pause]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => { setReduced(media.matches); setNatural(media.matches); reset(); };
    sync(); media.addEventListener('change', sync);
    const visibility = () => { if (document.hidden) pause(); };
    document.addEventListener('visibilitychange', visibility);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) pause();
    });
    if (root.current) observer.observe(root.current);
    return () => {
      observer.disconnect(); media.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', visibility);
      pause();
    };
  }, [pause, reset]);
  useEffect(() => { reset(); }, [pathname, reset]);

  const start = async () => {
    const player = audio.current;
    if (!player || window.__PRERENDERING__) return;
    if (complete) { player.currentTime = 0; setElapsed(0); setComplete(false); }
    const request = ++playRequest.current;
    player.muted = !voiceOn;
    setVoiceBlocked(false);
    setRunning(true);
    try {
      await player.play();
      if (playRequest.current !== request) return;
      setRunning(true);
    } catch {
      if (playRequest.current === request) { setRunning(false); setVoiceBlocked(true); }
    }
  };

  return <section ref={root} id="breathing-moment" className={'pac-breath-pause pac-guided-moment pac-guided-reflection' + (reduced ? ' is-reduced-motion' : '')} aria-labelledby="breathing-reflection-heading" data-running={running} data-complete={complete}>
    <audio ref={audio} src={natural ? '/audio/breathing-allison/natural.mp3' : '/audio/breathing-allison/guided.mp3'} preload="none" muted={!voiceOn} onTimeUpdate={event => setElapsed(event.currentTarget.currentTime)} onEnded={() => { setRunning(false); setComplete(true); }} onPause={() => setRunning(false)} onError={() => { setRunning(false); setVoiceBlocked(true); }} />
    {pathname === '/' ? <img className="pac-breath-pause-photo" src="/images/journey-v2/rainbow-960.webp" srcSet="/images/journey-v2/rainbow-480.webp 480w, /images/journey-v2/rainbow-960.webp 900w" sizes="100vw" width={900} height={480} alt="A double rainbow over a blue glacier and mountain lake" loading="lazy" decoding="async" /> : <NaturePhoto name={reflection.image} alt={reflection.alt} className="pac-breath-pause-photo" />}
    <div className="pac-container pac-breath-pause-inner">
      <div className="pac-breath-reflection-copy"><span className="pac-eyebrow">A QUIET MOMENT, JUST FOR YOU</span><h2 id="breathing-reflection-heading">Imagine <em>two minutes</em>{' '}<br />without a breath.</h2><p className="pac-breath-notice-line">Now notice the one you are taking.</p><p className="pac-meditation-note">Relax your shoulders. Follow the gentle rhythm, or breathe naturally at your own comfortable pace.</p><p className="pac-breath-small-reflection">{reflection.quote}</p><Link className="pac-text-link" to="/about/#our-mission">Why we care about every breath <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
      <div className="pac-breath-practice" role="group" aria-label="Comfortable breathing guide">
        <div className="pac-breath-orbit" aria-hidden="true">{[0, 1, 2].map(layer => <span key={layer} style={{ animation: 'none', transform: 'none' }} />)}<em>{natural ? 'Breathe easily.' : complete ? 'Just be.' : elapsed === 0 && !running ? 'Make a little room.' : phase}<small>{natural ? 'At your own pace.' : complete ? 'A moment, well spent.' : !running ? 'Whenever you are ready.' : `${Math.max(1, Math.ceil((phase === 'Breathe in' ? 4 : 13) - elapsed % 13))} · gently`}</small></em></div>
        <p className="pac-meditation-cue">{natural ? 'Simply notice your natural breath.' : complete ? 'Carry a little calm into the rest of your day.' : reflectionLine}</p>
        <span className="pac-meditation-time">{complete ? 'Your quiet moment is complete' : natural ? 'A quiet moment · at your own pace' : `${Math.floor(Math.min(elapsed, total))} / ${total} seconds`}</span>
        <div className="pac-meditation-controls">
          <button type="button" className="pac-breath-toggle" onClick={running ? pause : start}>{running ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}{running ? 'Pause' : complete ? 'Begin again' : elapsed > 0 ? 'Resume' : 'Start quiet moment'}</button>
          <button type="button" className="pac-breath-toggle" onClick={reset}><RotateCcw size={14} aria-hidden="true" />Stop & reset</button>
          <button type="button" className="pac-breath-toggle" aria-pressed={voiceOn} onClick={() => setVoiceOn(value => !value)}>{voiceOn ? <Volume2 size={14} aria-hidden="true" /> : <VolumeX size={14} aria-hidden="true" />}{voiceOn ? 'Mute voice' : 'Enable voice'}</button>
          {!reduced && <button type="button" className="pac-breath-toggle" aria-pressed={natural} onClick={() => { reset(); setNatural(value => !value); }}>{natural ? 'Use guided rhythm' : 'Breathe at my own pace'}</button>}
        </div>
        {voiceBlocked && <p role="status" className="pac-meditation-note">Audio could not start. Please try Start again, or simply enjoy a quiet breath.</p>}
      </div>
    </div>
  </section>;
}
