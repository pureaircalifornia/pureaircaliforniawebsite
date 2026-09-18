import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Phone, ArrowRight } from 'lucide-react';

declare global {
  interface Window {
    __PRERENDERING__?: boolean;
  }
}

/**
 * Availability banner.
 *
 * The slot count depends on the *viewer's* local hour, which a static file
 * cannot know. Previously the count was computed in an effect that Puppeteer
 * also ran during the prerender, so whatever hour the build happened to run at
 * got baked into all 107 static pages. The live site was serving — and Google
 * was indexing — "Only 1 dispatch slots remaining ... today" frozen from a build
 * days earlier: a specific scarcity claim that was both stale and ungrammatical.
 *
 * Now the count is only ever rendered on a real client. The prerendered snapshot
 * (what crawlers and no-JS visitors read) carries a generic, always-true phrase
 * instead of a frozen number.
 */
const UrgencyBanner = () => {
  const [slots, setSlots] = useState<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  /**
   * Publish the banner's real height as --pac-banner-h so the fixed NavBar can sit
   * directly beneath it.
   *
   * Both elements were pinned to top:0 and the banner's z-index (110) is above the
   * nav's (50), so the banner painted straight over the navigation and the menu
   * could not be reached. The height is measured rather than hardcoded because the
   * banner wraps to two rows on narrow screens.
   */
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const publish = () => {
      document.documentElement.style.setProperty(
        '--pac-banner-h',
        `${Math.round(el.getBoundingClientRect().height)}px`
      );
    };

    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    window.addEventListener('resize', publish);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', publish);
      document.documentElement.style.removeProperty('--pac-banner-h');
    };
  }, [slots]);

  useEffect(() => {
    // Never compute a number during the build-time prerender — it would be baked
    // into static HTML and served to everyone until the next deploy.
    if (typeof window !== 'undefined' && window.__PRERENDERING__) return;

    const hour = new Date().getHours();
    if (hour < 10) setSlots(4);
    else if (hour < 14) setSlots(3);
    else if (hour < 17) setSlots(2);
    else setSlots(1);
  }, []);

  return (
    <div
      ref={barRef}
      className="bg-red-600 text-white font-semibold py-2 px-4 sticky top-0 z-[110] shadow-md border-b border-red-700"
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center text-center gap-2 sm:gap-6 text-sm sm:text-base">
        <div className="flex items-center gap-2 animate-pulse">
          <AlertTriangle size={18} className="text-yellow-300" />
          <span className="tracking-wide">
            {slots === null ? (
              <>
                HIGH DEMAND:{' '}
                <span className="text-yellow-300 font-bold">Limited dispatch slots</span> remaining in
                Los Angeles today.
              </>
            ) : (
              <>
                HIGH DEMAND: Only{' '}
                <span className="text-yellow-300 font-bold">
                  {slots} dispatch {slots === 1 ? 'slot' : 'slots'}
                </span>{' '}
                remaining in Los Angeles today.
              </>
            )}
          </span>
        </div>

        <a
          href="tel:2137924145"
          className="flex items-center gap-2 bg-white text-red-600 px-4 py-1 rounded-full font-bold hover:bg-red-50 transition-colors shadow-sm"
        >
          <Phone size={14} className="fill-current" />
          Secure Your Slot
          <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
};

export default UrgencyBanner;
