import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { analyticsAllowed, advertisingAllowed, savePrivacyPreferences, CONSENT_KEY, AD_CONSENT_KEY, ATTRIBUTION_KEY } from '../src/utils/privacy.mjs';
import { captureAttribution, readAttribution, safeAdvertisingUrl, sanitizeAttribution, ATTRIBUTION_TTL_MS } from '../src/utils/attribution.mjs';
import { acceptedReceipt, adsConfiguration, createLeadDispatcher } from '../src/utils/leadMeasurement.mjs';
import { quoteContext, quoteLink } from '../src/utils/quoteContext.mjs';

const id = '5ac9ffb3-303a-4c71-9b45-b4bddc4174ab';
const leadId = '6ac9ffb3-303a-4c71-9b45-b4bddc4174ab';
const now = Date.parse('2026-10-12T12:00:00Z');
function environment(href = 'https://www.pureaircalifornia.com/services/commercial-air-duct-cleaning/', gpc = false) {
  const values = new Map();
  const url = new URL(href);
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { globalPrivacyControl: gpc } });
  globalThis.window = { location: { href, hostname: url.hostname, pathname: url.pathname, reload() {} },
    localStorage: { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) },
    dispatchEvent() {} };
  return values;
}
function allowAds() { window.localStorage.setItem(AD_CONSENT_KEY, 'granted'); }
const input = { submission_id: id, name: 'Local test', email: 'local@example.test', phone: '2025550142', source: 'quote_form', service: 'Air duct cleaning' };
let apiSequence = 0;
async function api() {
  const result = await build({ entryPoints: ['src/utils/api.ts'], bundle: true, write: false, platform: 'node', format: 'esm', define: { 'import.meta.env': '{}' } });
  return import('data:text/javascript;base64,' + Buffer.from(result.outputFiles[0].text + `\n// fixture ${apiSequence++}`).toString('base64'));
}

test('measurement is denied by default, separate by purpose, and disabled for GPC/private/local', () => {
  environment(); assert.equal(analyticsAllowed(), false); assert.equal(advertisingAllowed(), false);
  window.localStorage.setItem(CONSENT_KEY, 'granted'); assert.equal(analyticsAllowed(), true); assert.equal(advertisingAllowed(), false);
  allowAds(); assert.equal(advertisingAllowed(), true);
  navigator.globalPrivacyControl = true; assert.equal(analyticsAllowed(), false); assert.equal(advertisingAllowed(), false);
  for (const href of ['http://localhost:4178/', 'http://127.0.0.1:4178/', 'https://www.pureaircalifornia.com/admin/', 'https://www.pureaircalifornia.com/feedback/private-token']) {
    environment(href); allowAds(); window.localStorage.setItem(CONSENT_KEY, 'granted');
    assert.equal(analyticsAllowed(), false); assert.equal(advertisingAllowed(), false);
  }
});
test('attribution requires advertising permission and rejects PII/arbitrary URL parameters', () => {
  environment('https://www.pureaircalifornia.com/services/commercial-air-duct-cleaning/?gclid=CaseSensitive-ID_123&utm_source=google&utm_campaign=pac_commercial&utm_term=person%40example.com&email=private%40example.com&phone=2135551234#private');
  assert.equal(captureAttribution(now), undefined); assert.equal(window.localStorage.getItem(ATTRIBUTION_KEY), null);
  allowAds(); const attribution = captureAttribution(now);
  assert.equal(attribution.gclid, 'CaseSensitive-ID_123'); assert.equal(attribution.utm_campaign, 'pac_commercial');
  assert.equal(attribution.utm_term, undefined); assert.equal(attribution.email, undefined); assert.equal(attribution.phone, undefined);
  assert.deepEqual(captureAttribution(now + 5000), attribution);
  assert.equal(safeAdvertisingUrl(), 'https://www.pureaircalifornia.com/services/commercial-air-duct-cleaning/?gclid=CaseSensitive-ID_123');
  assert.equal(sanitizeAttribution({ ...attribution, utm_term: 'call2135551234' }, now).utm_term, undefined);
  assert.equal(sanitizeAttribution({ ...attribution, landing_path: '/feedback/secret' }, now), undefined);
});
test('attribution expires at 30 days and is cleared on consent withdrawal/GPC', () => {
  environment('https://www.pureaircalifornia.com/?gclid=abc'); allowAds(); captureAttribution(now);
  assert.equal(readAttribution(now + ATTRIBUTION_TTL_MS + 1), undefined); assert.equal(window.localStorage.getItem(ATTRIBUTION_KEY), null);
  captureAttribution(now); savePrivacyPreferences({ analytics: true, advertising: false });
  assert.equal(window.localStorage.getItem(ATTRIBUTION_KEY), null); assert.equal(advertisingAllowed(), false);
  allowAds(); captureAttribution(now); navigator.globalPrivacyControl = true;
  assert.equal(readAttribution(now), undefined); assert.equal(window.localStorage.getItem(ATTRIBUTION_KEY), null);
});
test('withdrawal stays denied when storage writes fail, without reloading stale grants', () => {
  const store = environment(); allowAds(); window.localStorage.setItem(CONSENT_KEY, 'granted');
  window.__pacAnalyticsInitialized = true; let reloads = 0; window.location.reload = () => reloads++;
  window.localStorage.setItem = () => { throw new Error('blocked'); };
  window.localStorage.removeItem = () => { throw new Error('blocked'); };
  savePrivacyPreferences({ analytics: false, advertising: false });
  assert.equal(store.get(CONSENT_KEY), 'granted'); assert.equal(analyticsAllowed(), false); assert.equal(advertisingAllowed(), false); assert.equal(reloads, 0);
});
test('known prefixed ValueTrack IDs survive while arbitrary numeric labels do not', () => {
  environment('https://www.pureaircalifornia.com/?utm_campaign=pac_123456789012&utm_content=ag_123456789012_ad_987654321000&utm_term=commercial%20duct%20cleaning'); allowAds();
  const value = captureAttribution(now); assert.equal(value.utm_campaign, 'pac_123456789012'); assert.equal(value.utm_content, 'ag_123456789012_ad_987654321000');
  assert.equal(sanitizeAttribution({ ...value, utm_content: '2135551234' }, now).utm_content, undefined);
});
test('verified receipt requires acceptance and matching stable identifiers', () => {
  assert.equal(acceptedReceipt({ accepted: true, submission_id: id, id: leadId }, id), true);
  for (const receipt of [{}, { id: leadId }, { accepted: false, submission_id: id, id: leadId }, { accepted: true, submission_id: leadId, id: leadId }]) assert.equal(acceptedReceipt(receipt, id), false);
});
test('lead events deduplicate; only backend acceptance counts; no configuration or consent means no Ads', () => {
  const events = []; const dispatch = createLeadDispatcher(); const config = adsConfiguration('AW-12345678', 'AbCdEf12345');
  const args = { submissionId: id, deliveryChannel: 'backend', formType: 'quote_form', service: 'Air duct cleaning', analytics: true, advertising: true, config, gtag: (...values) => events.push(values) };
  dispatch(args); dispatch(args); assert.equal(events.length, 2);
  assert.equal(events[1][2].transaction_id, id); assert.equal(events[1][2].value, undefined);
  const fallbackEvents = []; createLeadDispatcher()({ ...args, deliveryChannel: 'email_fallback', gtag: (...v) => fallbackEvents.push(v) });
  assert.equal(fallbackEvents.length, 0);
  const denied = []; createLeadDispatcher()({ ...args, analytics: false, advertising: false, gtag: (...v) => denied.push(v) }); assert.equal(denied.length, 0);
  assert.equal(adsConfiguration('AW-1120420693', 'quoteSubmitLabel'), undefined); assert.equal(adsConfiguration('', ''), undefined);
  const missing = []; createLeadDispatcher()({ ...args, analytics: false, config: undefined, gtag: (...v) => missing.push(v) }); assert.equal(missing.length, 0);
  assert.doesNotThrow(() => createLeadDispatcher()({ ...args, gtag() { throw new Error('tag blocked'); } }));
});
test('service and commercial/managed/estate intent survive quote navigation, arbitrary presets ignored', () => {
  assert.equal(quoteLink('/services/commercial-dryer-vent-cleaning/'), '/quote/?service=dryer-vent&property=commercial#estimate-builder');
  assert.equal(quoteContext('/property-managers/').property, 'managed');
  assert.equal(quoteContext('/quote/', '?property=estate&service=air-duct').propertyLabel, 'Private home / estate');
  assert.equal(quoteContext('/quote/', '?property=__proto__&service=https://evil.test').property, 'home');
});
test('tailored quote requests never manufacture a price across property and service combinations', async () => {
  const result = await build({ entryPoints: ['src/utils/estimate.ts'], bundle: true, write: false, platform: 'node', format: 'esm' });
  const { estimateLead } = await import('data:text/javascript;base64,' + Buffer.from(result.outputFiles[0].text).toString('base64'));
  const data = { sqft: '1500', unsure: false, zip: '90049', name: ' Local Test ', phone: '2025550142', email: 'local@example.test', organization: 'Example', address: '', systems: '2', access: 'Rooftop', timing: 'Planning ahead', message: 'Confirm scope' };
  for (const property of ['Home / apartment', 'Business / commercial', 'Managed property / HOA', 'Private home / estate']) for (const service of ['air-duct', 'dryer-vent', 'filter', 'other']) {
    const lead = estimateLead({ ...data, property, service });
    assert.equal(lead.estimated_price, undefined); assert.equal(lead.property_type, property); assert.match(lead.message, /PAC must confirm the scope/); assert.match(lead.message, /Systems \/ units: 2/);
  }
});
test('submission draft retains UUID and payload on retry; edits receive a new UUID', async () => {
  environment(); const client = await api(); const first = client.prepareSubmission(input);
  const retry = client.prepareSubmission({ ...input }, first); assert.equal(retry, first);
  const changed = client.prepareSubmission({ ...input, message: 'Different scope' }, first); assert.notEqual(changed.payload.submission_id, first.payload.submission_id);
});
test('accepted backend lead returns receipt and never duplicates email notification', async () => {
  environment(); const client = await api(); const calls = [];
  globalThis.fetch = async (url, options) => { calls.push({ url, body: JSON.parse(options.body) }); return new Response(JSON.stringify({ accepted: true, submission_id: id, id: leadId }), { status: 201 }); };
  const result = await client.submitFormWithBackend(input);
  assert.equal(result.success, true); assert.equal(result.delivery_channel, 'backend'); assert.equal(calls.length, 1);
});
test('lost backend acknowledgement is reconciled by exact idempotent replay before email', async () => {
  environment(); const client = await api(); const calls = [];
  globalThis.fetch = async (url, options) => { calls.push({ url, body: options.body }); if (calls.length === 1) throw new Error('lost response'); return new Response(JSON.stringify({ accepted: true, submission_id: id, id: leadId }), { status: 201 }); };
  const result = await client.submitFormWithBackend(input);
  assert.equal(result.delivery_channel, 'backend'); assert.equal(calls.length, 2); assert.equal(calls[0].body, calls[1].body); assert.ok(calls.every(call => !call.url.includes('formsubmit')));
});
test('replay rejection cannot turn earlier uncertain persistence into a retryable failure', async () => {
  environment(); const client = await api(); const calls = [];
  globalThis.fetch = async (url, options) => { calls.push({ url, body: options.body }); if (calls.length === 1) throw new Error('lost acknowledgement'); return new Response(JSON.stringify({ detail: 'Too many requests' }), { status: 429 }); };
  const result = await client.submitFormWithBackend(input);
  assert.equal(result.acceptance_unknown, true); assert.equal(result.submission_id, id); assert.equal(calls.length, 2); assert.equal(calls[0].body, calls[1].body); assert.match(result.error, /may already be saved/);
});
test('midflight ad consent withdrawal stops an uncertain attributed request before replay', async () => {
  environment(); allowAds(); const client = await api(); const calls = [];
  const attribution = { captured_at: new Date().toISOString(), landing_path: '/', ad_measurement_consent: true, gclid: 'consented-click-id' };
  globalThis.fetch = async (url, options) => {
    calls.push({ url, body: JSON.parse(options.body) });
    window.localStorage.setItem(AD_CONSENT_KEY, 'denied');
    throw new Error('lost acknowledgement after consent withdrawal');
  };
  const result = await client.submitFormWithBackend({ ...input, attribution });
  assert.equal(calls.length, 1); assert.deepEqual(calls[0].body.attribution, attribution);
  assert.equal(result.success, false); assert.equal(result.acceptance_unknown, true);
  assert.equal(result.submission_id, id); assert.match(result.error, /may already be saved/);
  assert.ok(calls.every(call => !call.url.includes('formsubmit')));
});
test('SPA phone events use the current sanitized page instead of the initial page', async () => {
  environment(); window.localStorage.setItem(CONSENT_KEY, 'granted'); globalThis.document = { referrer: 'https://example.test/?email=private@example.test' };
  const result = await build({ entryPoints: ['src/utils/analytics.ts'], bundle: true, write: false, platform: 'node', format: 'esm' });
  const analytics = await import('data:text/javascript;base64,' + Buffer.from(result.outputFiles[0].text).toString('base64'));
  const events = []; window.gtag = (...values) => events.push(values);
  window.location.href = 'https://www.pureaircalifornia.com/quote/?property=estate&email=private@example.test#private'; window.location.pathname = '/quote/';
  analytics.trackPhoneCall('test'); assert.equal(events[0][2].page_location, 'https://www.pureaircalifornia.com/quote/'); assert.equal(events[0][2].page_referrer, 'https://example.test/');
});
test('failed local post cannot contact fallback or report success', async () => {
  environment('http://localhost:4178/'); const client = await api(); const urls = [];
  globalThis.fetch = async url => { urls.push(url); throw new Error('fixture network failure'); };
  const result = await client.submitFormWithBackend(input);
  assert.equal(result.success, false); assert.deepEqual(urls, ['/api/leads', '/api/leads']);
});
test('unverified receipts and unavailable backend are uncertain, with no cross-provider fallback', async () => {
  environment(); const client = await api(); let calls = 0;
  globalThis.fetch = async () => { calls++; return new Response(JSON.stringify({ success: false }), { status: 200 }); };
  assert.equal((await client.submitFormWithBackend(input)).success, false); assert.equal(calls, 1);
  calls = 0; globalThis.fetch = async () => { calls++; return new Response(JSON.stringify({ detail: 'Conflict' }), { status: 409 }); };
  assert.equal((await client.submitFormWithBackend(input)).success, false); assert.equal(calls, 1);
  calls = 0; globalThis.fetch = async () => { calls++; return new Response('not JSON', { status: 200 }); };
  assert.equal((await client.submitFormWithBackend(input)).success, false); assert.equal(calls, 1);
  calls = 0; globalThis.fetch = async () => { calls++; return new Response(JSON.stringify({ success: false }), { status: 503 }); };
  const unavailable = await client.submitFormWithBackend(input); assert.equal(unavailable.acceptance_unknown, true); assert.equal(calls, 2);
});
test('uncertain delivery preserves ID, removes withdrawn attribution, and never contacts email service', async () => {
  environment(); const client = await api(); const bodies = [];
  globalThis.fetch = async (url, options) => { assert.equal(url.includes('formsubmit'), false); bodies.push(JSON.parse(options.body)); return new Response('{}', { status: 503 }); };
  const result = await client.submitFormWithBackend({ ...input, attribution: { captured_at: new Date().toISOString(), landing_path: '/', ad_measurement_consent: true, gclid: 'old-id' } });
  assert.equal(result.success, false); assert.equal(result.acceptance_unknown, true); assert.equal(result.submission_id, id);
  assert.equal(bodies[0].attribution, undefined); assert.deepEqual(bodies[0], bodies[1]); assert.match(result.error, /may already be saved/);
});
