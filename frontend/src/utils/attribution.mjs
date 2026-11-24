import { advertisingAllowed, ATTRIBUTION_KEY } from './privacy.mjs';
import { isPrivatePath } from './seo/searchPolicy.mjs';

export const ATTRIBUTION_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const clickKeys = ['gclid', 'gbraid', 'wbraid'];
const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
function safeValue(key, value) {
  if (typeof value !== 'string' || value.length > (clickKeys.includes(key) ? 256 : 100)) return undefined;
  if (clickKeys.includes(key)) return /^[A-Za-z0-9_.~-]{1,256}$/.test(value) ? value : undefined;
  // These deliberately prefixed ValueTrack identifiers are account IDs, not free text.
  if (key === 'utm_campaign' && /^pac_\d{1,20}$/.test(value)) return value;
  if (key === 'utm_content' && /^ag_\d{1,20}_ad_\d{1,20}$/.test(value)) return value;
  // Campaign parameters are labels, never arbitrary URLs, email addresses or phone numbers.
  return /^[A-Za-z][A-Za-z0-9 _-]{0,99}$/.test(value) && !/\d{7,}/.test(value) ? value : undefined;
}
export function sanitizeAttribution(input, now = Date.now()) {
  if (!input || input.ad_measurement_consent !== true) return undefined;
  const captured = Date.parse(input.captured_at);
  if (!Number.isFinite(captured) || captured > now + 60000 || now - captured > ATTRIBUTION_TTL_MS) return undefined;
  const landing = typeof input.landing_path === 'string' ? input.landing_path : '/';
  if (!/^\/[A-Za-z0-9/_-]*$/.test(landing) || landing.length > 200 || isPrivatePath(landing)) return undefined;
  const result = { landing_path: landing, captured_at: new Date(captured).toISOString(), ad_measurement_consent: true };
  for (const key of [...campaignKeys, ...clickKeys]) {
    const value = safeValue(key, input[key]);
    if (value) result[key] = value;
  }
  return [...campaignKeys, ...clickKeys].some(key => result[key]) ? result : undefined;
}
export function readAttribution(now = Date.now()) {
  try {
    if (!advertisingAllowed()) { window.localStorage.removeItem(ATTRIBUTION_KEY); return undefined; }
    const attribution = sanitizeAttribution(JSON.parse(window.localStorage.getItem(ATTRIBUTION_KEY) || 'null'), now);
    if (!attribution) window.localStorage.removeItem(ATTRIBUTION_KEY);
    return attribution;
  } catch { return undefined; }
}
export function captureAttribution(now = Date.now()) {
  if (!advertisingAllowed()) return readAttribution(now);
  const url = new URL(window.location.href);
  const data = { landing_path: url.pathname, captured_at: new Date(now).toISOString(), ad_measurement_consent: true };
  for (const key of [...campaignKeys, ...clickKeys]) data[key] = url.searchParams.get(key);
  const next = sanitizeAttribution(data, now);
  if (!next) return readAttribution(now);
  const current = readAttribution(now);
  const same = current && [...campaignKeys, ...clickKeys].every(key => current[key] === next[key]);
  if (same) return current;
  try { window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(next)); } catch { /* No persistence if unavailable. */ }
  return next;
}
export function safeAdvertisingUrl() {
  const url = new URL(window.location.href);
  const safe = new URL(url.origin + (isPrivatePath(url.pathname) ? '/' : url.pathname));
  if (advertisingAllowed()) for (const key of clickKeys) {
    const value = safeValue(key, url.searchParams.get(key));
    if (value) safe.searchParams.set(key, value);
  }
  return safe.href;
}
