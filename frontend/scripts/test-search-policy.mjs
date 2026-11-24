import test from 'node:test';
import assert from 'node:assert/strict';
import { isSearchIndexable, isPrivatePath } from '../src/utils/seo/searchPolicy.mjs';
import { serializeJsonLd } from '../src/utils/seo/jsonLd.mjs';
import { analyticsAllowed, safeAnalyticsUrl } from '../src/utils/privacy.mjs';
import { businessRoutes } from './business-routes.mjs';

test('all generated industry/city pages stay outside the search index', () => {
  assert.equal(businessRoutes.length, 486);
  for (const route of businessRoutes) assert.equal(isSearchIndexable(route), false, route);
});
test('service, industry and city hubs remain indexable', () => {
  for (const route of ['/', '/services/residential-air-duct-cleaning/', '/locations/los-angeles/', '/locations/culver-city/', '/industries/healthcare/', '/case-studies/nonprofit-housing-office-hvac/', '/blog/air-duct-cleaning-faq/']) assert.equal(isSearchIndexable(route), true, route);
});
test('private and campaign paths are excluded with or without trailing slashes', () => {
  for (const route of ['/admin', '/admin/', '/admin/customers/1', '/feedback/token', '/api/leads', '/404.html', '/compare/?source=ad']) assert.equal(isSearchIndexable(route), false, route);
  assert.equal(isPrivatePath('/administration-guide/'), false);
});
test('JSON-LD cannot close a script and retains the original data', () => {
  const input = { name: '</script><script>alert(1)</script>', detail: 'A < B & C' };
  const serialized = serializeJsonLd(input);
  assert.equal(serialized.includes('<'), false);
  assert.deepEqual(JSON.parse(serialized), input);
});
test('analytics URLs discard query strings, fragments and private paths', () => {
  assert.equal(safeAnalyticsUrl('https://www.pureaircalifornia.com/quote/?email=private@example.test#details'), 'https://www.pureaircalifornia.com/quote/');
  assert.equal(safeAnalyticsUrl('https://www.pureaircalifornia.com/feedback/private-token'), 'https://www.pureaircalifornia.com/');
  assert.equal(safeAnalyticsUrl('mailto:private@example.test'), '');
  assert.equal(safeAnalyticsUrl(''), '');
});

test('analytics stays off before consent, on private routes, during prerender and under GPC', () => {
  const windowDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'window');
  const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  let preference = null;
  const mockWindow = { location: { pathname: '/' }, localStorage: { getItem: () => preference }, __PRERENDERING__: false };
  try {
    Object.defineProperty(globalThis, 'window', { configurable: true, value: mockWindow });
    Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { globalPrivacyControl: false } });
    assert.equal(analyticsAllowed(), false);
    preference = 'granted';
    assert.equal(analyticsAllowed(), true);
    for (const pathname of ['/feedback/private-token', '/admin/customers/123', '/api/leads']) {
      mockWindow.location.pathname = pathname;
      assert.equal(analyticsAllowed(), false, pathname);
    }
    mockWindow.location.pathname = '/';
    mockWindow.__PRERENDERING__ = true;
    assert.equal(analyticsAllowed(), false);
    mockWindow.__PRERENDERING__ = false;
    navigator.globalPrivacyControl = true;
    assert.equal(analyticsAllowed(), false);
    navigator.globalPrivacyControl = false;
    preference = 'denied';
    assert.equal(analyticsAllowed(), false);
    mockWindow.localStorage.getItem = () => { throw new Error('Storage disabled'); };
    assert.equal(analyticsAllowed(), false);
  } finally {
    if (windowDescriptor) Object.defineProperty(globalThis, 'window', windowDescriptor); else delete globalThis.window;
    if (navigatorDescriptor) Object.defineProperty(globalThis, 'navigator', navigatorDescriptor); else delete globalThis.navigator;
  }
});
