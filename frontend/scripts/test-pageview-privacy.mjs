import test from 'node:test';
import assert from 'node:assert/strict';
import { createPageViewGate } from '../src/utils/pageViewGate.mjs';
import { analyticsAllowed, advertisingAllowed, savePrivacyPreferences, CONSENT_KEY, AD_CONSENT_KEY } from '../src/utils/privacy.mjs';

function environment(href, session = new Map(), blocked = false) {
  const values = new Map([[CONSENT_KEY, 'granted'], [AD_CONSENT_KEY, 'granted']]);
  const url = new URL(href);
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: {} });
  globalThis.window = {
    location: { href, hostname: url.hostname, pathname: url.pathname, reload() {} },
    localStorage: { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) },
    sessionStorage: { getItem: key => { if (blocked) throw Error('blocked'); return session.get(key) ?? null; }, setItem: (key, value) => { if (blocked) throw Error('blocked'); session.set(key, value); } },
    dispatchEvent() {},
  };
  return session;
}

test('a route visit is counted once despite consent saves, but back navigation counts again', () => {
  const gate = createPageViewGate();
  gate.observe('/services/commercial-air-duct-cleaning/');
  assert.equal(gate.claim('/services/commercial-air-duct-cleaning/'), true);
  gate.observe('/services/commercial-air-duct-cleaning/');
  assert.equal(gate.claim('/services/commercial-air-duct-cleaning/'), false);
  gate.observe('/quote/');
  assert.equal(gate.claim('/quote/'), true);
  gate.observe('/services/commercial-air-duct-cleaning/');
  assert.equal(gate.claim('/services/commercial-air-duct-cleaning/'), true);
});

test('a canceled view can be claimed later; navigation without consent resets the visit', () => {
  const gate = createPageViewGate();
  gate.observe('/a/');
  gate.observe('/a/');
  assert.equal(gate.claim('/a/'), true);
  gate.observe('/b/'); // no consent, so no claim
  gate.observe('/a/');
  assert.equal(gate.claim('/a/'), true);
});

test('QA visits remain excluded across navigation and reload, without changing consent', () => {
  const session = environment('https://www.pureaircalifornia.com/?pac_qa=1');
  assert.equal(analyticsAllowed(), false);
  assert.equal(advertisingAllowed(), false);
  window.location.href = 'https://www.pureaircalifornia.com/quote/';
  assert.equal(analyticsAllowed(), false);
  environment('https://www.pureaircalifornia.com/quote/', session);
  assert.equal(analyticsAllowed(), false);
  assert.equal(window.localStorage.getItem(CONSENT_KEY), 'granted');
  environment('https://www.pureaircalifornia.com/');
  assert.equal(analyticsAllowed(), true);
});

test('blocked session storage still excludes a QA visit in the current document', () => {
  environment('https://www.pureaircalifornia.com/?pac_qa=1', new Map(), true);
  assert.equal(analyticsAllowed(), false);
  window.location.href = 'https://www.pureaircalifornia.com/quote/';
  assert.equal(analyticsAllowed(), false);
  environment('https://www.pureaircalifornia.com/', new Map(), true);
  assert.equal(analyticsAllowed(), true);
});

test('analytics-only choice never enables advertising, necessary-only denies both', () => {
  environment('https://www.pureaircalifornia.com/');
  savePrivacyPreferences({ analytics: true, advertising: false });
  assert.equal(analyticsAllowed(), true);
  assert.equal(advertisingAllowed(), false);
  savePrivacyPreferences({ analytics: false, advertising: false });
  assert.equal(analyticsAllowed(), false);
  assert.equal(advertisingAllowed(), false);
});
