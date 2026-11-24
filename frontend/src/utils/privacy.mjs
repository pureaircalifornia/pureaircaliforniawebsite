import { isPrivatePath } from './seo/searchPolicy.mjs';

export const CONSENT_KEY = 'pac-analytics-consent';
export const AD_CONSENT_KEY = 'pac-ad-measurement-consent';
export const ATTRIBUTION_KEY = 'pac-ad-attribution-v1';
export const CONSENT_EVENT = 'pac-privacy-change';
export const OPEN_PRIVACY_EVENT = 'pac-open-privacy';
// A blocked storage write must never undo the choice made in this page.
const memoryPreferences = new WeakMap();
const qaWindows = new WeakSet();
// A tab-scoped switch for owner/developer checks, never a visitor identifier.
// Open ?pac_qa=1 before testing. Closing the tab ends the exclusion.
export function measurementQaMode() {
  if (typeof window === 'undefined') return false;
  if (qaWindows.has(window)) return true;
  try {
    if (new URL(window.location.href).searchParams.get('pac_qa') === '1') {
      qaWindows.add(window);
      try { window.sessionStorage.setItem('pac-measurement-qa', '1'); } catch { /* In-memory exclusion still applies. */ }
      return true;
    }
    if (window.sessionStorage?.getItem('pac-measurement-qa') === '1') {
      qaWindows.add(window);
      return true;
    }
  } catch { /* Storage can be unavailable; normal consent gates still apply. */ }
  return false;
}
function preference(key) {
  if (typeof window === 'undefined') return null;
  const memory = memoryPreferences.get(window);
  if (memory && key in memory) return memory[key];
  try { return window.localStorage.getItem(key); } catch { return null; }
}

export function browserPrivacySignal() {
  return typeof navigator !== 'undefined' && navigator.globalPrivacyControl === true;
}

export function analyticsPreference() {
  return preference(CONSENT_KEY);
}
export function advertisingPreference() {
  return preference(AD_CONSENT_KEY);
}

export function measurementEnvironmentAllowed() {
  return typeof window !== 'undefined' && !window.__PRERENDERING__ &&
    !['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname) &&
    !isPrivatePath(window.location.pathname) && !browserPrivacySignal() && !measurementQaMode();
}
export const analyticsAllowed = () => measurementEnvironmentAllowed() && analyticsPreference() === 'granted';
export const advertisingAllowed = () => measurementEnvironmentAllowed() && advertisingPreference() === 'granted';

export function safeAnalyticsUrl(value, base) {
  try {
    const url = new URL(value, base);
    if (!/^https?:$/.test(url.protocol)) return '';
    return url.origin + (isPrivatePath(url.pathname) ? '/' : url.pathname);
  } catch { return ''; }
}

export function consentState() {
  return {
    analytics_storage: analyticsAllowed() ? 'granted' : 'denied',
    ad_storage: advertisingAllowed() ? 'granted' : 'denied',
    ad_user_data: advertisingAllowed() ? 'granted' : 'denied',
    ad_personalization: 'denied',
  };
}
export function savePrivacyPreferences({ analytics, advertising }) {
  const previousAnalytics = analyticsAllowed();
  const previousAdvertising = advertisingAllowed();
  const permitted = !browserPrivacySignal();
  const choices = { [CONSENT_KEY]: analytics && permitted ? 'granted' : 'denied', [AD_CONSENT_KEY]: advertising && permitted ? 'granted' : 'denied' };
  memoryPreferences.set(window, choices);
  let persisted = true;
  for (const [key, value] of Object.entries(choices)) {
    try { window.localStorage.setItem(key, value); } catch {
      persisted = false;
      if (value === 'denied') { try { window.localStorage.removeItem(key); } catch { /* In-memory denial remains authoritative. */ } }
    }
  }
  if (persisted) memoryPreferences.delete(window);
  if (!advertising || !permitted) { try { window.localStorage.removeItem(ATTRIBUTION_KEY); } catch { /* Read gate remains denied. */ } }
  if (typeof window.gtag === 'function') { try { window.gtag('consent', 'update', consentState()); } catch { /* A blocked tag cannot override the user's choice. */ } }
  window.dispatchEvent(new Event(CONSENT_EVENT));
  const withdrawing = (previousAnalytics && !analyticsAllowed()) || (previousAdvertising && !advertisingAllowed());
  let reloadSafe = persisted;
  if (!persisted) {
    try { reloadSafe = Object.entries(choices).every(([key, value]) => value !== 'denied' || window.localStorage.getItem(key) !== 'granted'); } catch { reloadSafe = false; }
  }
  if (window.__pacAnalyticsInitialized && withdrawing && reloadSafe) window.location.reload();
}
export function saveAnalyticsPreference(granted) {
  savePrivacyPreferences({ analytics: granted, advertising: advertisingPreference() === 'granted' });
}
