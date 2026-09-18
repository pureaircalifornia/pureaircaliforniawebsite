import { useLocation, useNavigationType } from 'react-router-dom';
import { useEffect, useRef } from 'react';

/** Restore browsing position and wait for lazy pages before following section links. */
export default function ScrollToTop() {
 const location = useLocation();
 const navigationType = useNavigationType();
 const positions = useRef(new Map<string, number>());
 useEffect(() => {
  const previous = window.history.scrollRestoration;
  window.history.scrollRestoration = 'manual';
  return () => { window.history.scrollRestoration = previous; };
 }, []);
 useEffect(() => {
  const positionCache = positions.current;
  let frame = 0;
  let completed = false;
  let observing = false;
  let id = '';
  try { id = decodeURIComponent(location.hash.slice(1)); } catch { id = ''; }
  const positionKey = location.key + location.pathname + location.hash;
  const saved = navigationType === 'POP' ? positionCache.get(positionKey) : undefined;
  const remember = () => { if (completed) positionCache.set(positionKey, window.scrollY); };
  const focus = (element: HTMLElement) => {
   if (!element.hasAttribute('tabindex')) element.setAttribute('tabindex', '-1');
   element.focus({ preventScroll: true });
  };
  const restore = () => {
   const target = id ? document.getElementById(id) : document.querySelector<HTMLElement>('#root h1');
   if (!target || !target.getClientRects().length || completed) return;
   observer.disconnect();
   // Lazy route content and the homepage scroll scene need a layout frame first.
   frame = requestAnimationFrame(() => {
    frame = requestAnimationFrame(() => {
     if (saved !== undefined) window.scrollTo({top:saved,behavior:'instant'});
     else if (id) { target.scrollIntoView({block:'start',behavior:'instant'}); focus(target); }
     else { window.scrollTo({top:0,behavior:'instant'}); if(navigationType !== 'POP') focus(target); }
     completed = true; remember();
    });
   });
  };
  const observer = new MutationObserver(restore);
  restore();
  if (!frame) { observer.observe(document.getElementById('root') || document.body,{childList:true,subtree:true}); observing = true; }
  const timeout = window.setTimeout(() => {
   if (observing) observer.disconnect();
   if (!frame && !completed) { window.scrollTo({top:saved ?? 0,behavior:'instant'}); completed = true; remember(); }
  },5000);
  window.addEventListener('scroll',remember,{passive:true});
  return () => {
   window.removeEventListener('scroll',remember); observer.disconnect(); cancelAnimationFrame(frame); clearTimeout(timeout);
   if (positionCache.size > 100) positionCache.delete(positionCache.keys().next().value!);
  };
 },[location.key,location.pathname,location.hash,navigationType]);
 return null;
}
