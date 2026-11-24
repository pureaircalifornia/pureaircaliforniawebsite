import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from '@/components/CanonicalLink';
import { analyticsPreference, advertisingPreference, browserPrivacySignal, OPEN_PRIVACY_EVENT, savePrivacyPreferences } from '@/utils/privacy.mjs';
import { isPrivatePath } from '@/utils/seo/searchPolicy.mjs';

export default function PrivacyChoices() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [privacySignal, setPrivacySignal] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  const [customize, setCustomize] = useState(false);
  const panel = useRef<HTMLElement>(null);
  const focusOptions = useRef(false);
  useEffect(() => {
    if (customize && focusOptions.current) {
      panel.current?.querySelector<HTMLInputElement>('input[type="checkbox"]')?.focus();
      focusOptions.current = false;
    }
  }, [customize]);
  useEffect(() => {
    setPrivacySignal(browserPrivacySignal());
    const restore = () => { setAnalytics(analyticsPreference() === 'granted'); setAdvertising(advertisingPreference() === 'granted'); };
    restore();
    if (!window.__PRERENDERING__) setOpen((!analyticsPreference() || !advertisingPreference()) && !browserPrivacySignal());
    const show = () => { restore(); setCustomize(true); setOpen(true); requestAnimationFrame(() => panel.current?.focus()); };
    window.addEventListener(OPEN_PRIVACY_EVENT, show);
    return () => window.removeEventListener(OPEN_PRIVACY_EVENT, show);
  }, []);
  if (!open || isPrivatePath(pathname)) return null;
  const choose = (necessaryOnly = false) => { savePrivacyPreferences({ analytics: !necessaryOnly && analytics, advertising: !necessaryOnly && advertising }); setOpen(false); };
  const allowAnalyticsOnly = () => {
    savePrivacyPreferences({ analytics: true, advertising: false });
    setOpen(false);
  };
  return <section ref={panel} tabIndex={-1} aria-labelledby="privacy-choice-title" className="pac-privacy-choices" data-analytics-ignore>
    <h2 id="privacy-choice-title">Your privacy choices</h2>
    <p>{privacySignal ? 'Your browser privacy signal keeps optional measurement off.' : 'May we use Google Analytics cookies to understand visits and improve this site? Advertising measurement is a separate choice. Forms work either way.'} <Link to="/privacy-policy/">Privacy details</Link></p>
    {!privacySignal && customize && <fieldset id="pac-measurement-options"><legend>Optional measurement</legend><label><input type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)}/> Website analytics</label><label><input type="checkbox" checked={advertising} onChange={event => setAdvertising(event.target.checked)}/> Advertising measurement — connects ad visits with enquiries; no personalized ads</label></fieldset>}
    <div>
      <button type="button" onClick={() => choose(true)}>Use necessary only</button>
      {!privacySignal && (customize
        ? <button type="button" onClick={() => choose()}>Save my choices</button>
        : <button type="button" onClick={allowAnalyticsOnly}>Allow analytics only</button>)}
    </div>
    {!privacySignal && !customize && <button type="button" className="pac-privacy-customize" aria-expanded={customize} onClick={() => {
      focusOptions.current = true;
      setCustomize(true);
    }}>Customize choices</button>}
  </section>;
}
