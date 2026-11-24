import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { PageMotionContext } from '@/hooks/usePageMotion';

export default function PageMotionProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const reduced = !!useReducedMotion();
  const [paused, setPaused] = useState(() => {
    try { return sessionStorage.getItem('pac-page-motion') === 'paused'; } catch { return false; }
  });
  const enabled = !reduced && !paused;

  useEffect(() => {
    if (window.__PRERENDERING__) return;
    try { sessionStorage.setItem('pac-page-motion', paused ? 'paused' : 'on'); } catch { /* Storage is optional. */ }
  }, [paused]);

  useEffect(() => {
    // The homepage keeps its existing AirJourney controls and choreography.
    if (!enabled || pathname === '/' || window.__PRERENDERING__) return;
    const root = document.getElementById('main-content');
    if (!root || !('IntersectionObserver' in window)) return;
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        // Content is visible by default, even if JS, observers or motion fail.
        if (typeof entry.target.animate !== 'function') continue;
        const animation = entry.target.animate([
          { transform: 'translateY(12px)', opacity: 0.86 },
          { transform: 'translateY(0)', opacity: 1 },
        ], { duration: 650, easing: 'cubic-bezier(.2,.65,.3,1)' });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, { threshold: 0.12 });
    root.querySelectorAll('main h2, main figure, .pac-price-row, .pac-client-card, .pac-field-photo-grid').forEach(node => observer.observe(node));

    const hero = root.querySelector<HTMLElement>('.pac-page-hero');
    const photo = hero?.querySelector<HTMLElement>('.pac-page-hero-photo');
    let frame = 0;
    let heroVisible = true;
    const update = () => {
      frame = 0;
      if (!hero || !photo || !heroVisible) return;
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
      photo.style.transform = `translate3d(0, ${progress * 24}px, 0) scale(1.08)`;
    };
    const schedule = () => { if (!frame && heroVisible) frame = requestAnimationFrame(update); };
    const heroObserver = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      hero?.style.setProperty('--pac-hero-animation-state', heroVisible ? 'running' : 'paused');
      if (heroVisible) schedule();
    });
    if (hero && photo) {
      heroObserver.observe(hero);
      schedule();
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
    }
    return () => {
      observer.disconnect();
      heroObserver.disconnect();
      animations.forEach(animation => animation.cancel());
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      photo?.style.removeProperty('transform');
      hero?.style.removeProperty('--pac-hero-animation-state');
    };
  }, [enabled, pathname]);

  return <PageMotionContext.Provider value={{ enabled, paused, reduced, toggle: () => setPaused(value => !value) }}>{children}</PageMotionContext.Provider>;
}

