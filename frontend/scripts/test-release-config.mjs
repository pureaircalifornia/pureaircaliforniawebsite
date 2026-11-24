import test from 'node:test';
import assert from 'node:assert/strict';
import { build, resolveConfig } from 'vite';
import { assertProductionReleaseConfig } from './release-config.mjs';

const valid = {
  VITE_API_BASE_URL: 'https://pac-crm-backend.onrender.com/api',
  VITE_GOOGLE_ADS_ID: 'AW-1003912049',
  VITE_GOOGLE_ADS_LEAD_LABEL: 'PAI-CLX-2ZodEPH22d4D',
};
const production = { command: 'build', mode: 'production' };

test('production release accepts only the verified public measurement and receiver contract', () => {
  assert.doesNotThrow(() => assertProductionReleaseConfig(production, valid));
});

test('production release rejects missing, malformed, placeholder, or different Ads actions', () => {
  for (const key of ['VITE_GOOGLE_ADS_ID', 'VITE_GOOGLE_ADS_LEAD_LABEL']) {
    for (const value of [undefined, null, '', ' ', 123, 'placeholder', 'x'.repeat(10000), '😃', 'AW-123456789', 'DifferentValidLabel']) {
      assert.throws(() => assertProductionReleaseConfig(production, { ...valid, [key]: value }), new RegExp(key));
    }
  }
});

test('production release rejects the obsolete API, relative/local URLs and ambiguous endpoint variants', () => {
  for (const value of [undefined, null, '', '/api', 'http://localhost:8000/api', 'https://pureaircaliforniawebsite.onrender.com/api',
    'https://pac-crm-backend.onrender.com/api/', 'http://pac-crm-backend.onrender.com/api',
    'https://pac-crm-backend.onrender.com.evil.test/api', 'https://pac-crm-backend.onrender.com/api?token=never-print-this']) {
    assert.throws(() => assertProductionReleaseConfig(production, { ...valid, VITE_API_BASE_URL: value }), /VITE_API_BASE_URL/);
  }
});

test('guard errors identify configuration fields without leaking supplied values', () => {
  for (const value of [undefined, null, {}]) {
    assert.throws(() => assertProductionReleaseConfig(production, value), /VITE_API_BASE_URL/);
  }
  assert.throws(() => assertProductionReleaseConfig(production, { VITE_API_BASE_URL: 'never-print-this' }), error => {
    assert.match(error.message, /VITE_API_BASE_URL/);
    assert.match(error.message, /VITE_GOOGLE_ADS_ID/);
    assert.match(error.message, /VITE_GOOGLE_ADS_LEAD_LABEL/);
    assert.doesNotMatch(error.message, /never-print-this/);
    return true;
  });
});

test('real production Vite output sends only accepted consented leads to the exact configured Ads action', async () => {
  const previous = Object.fromEntries(Object.keys(valid).map(key => [key, process.env[key]]));
  const previousWindow = globalThis.window;
  const previousDocument = globalThis.document;
  const previousFetch = globalThis.fetch;
  const previousNavigator = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  try {
    Object.assign(process.env, valid);
    const result = await build({
      logLevel: 'silent', mode: 'production',
      build: { write: false, minify: false, lib: { entry: 'scripts/fixtures/release-entry.ts', formats: ['es'] },
        rollupOptions: { output: { manualChunks: () => undefined } } },
    });
    const bundle = (Array.isArray(result) ? result[0] : result).output.find(item => item.type === 'chunk' && item.isEntry);
    assert.ok(bundle, 'Production fixture must emit an executable entry');
    const events = [];
    let consent = false;
    globalThis.window = {
      location: { href: 'https://www.pureaircalifornia.com/quote/?property=estate', hostname: 'www.pureaircalifornia.com', pathname: '/quote/' },
      localStorage: { getItem: () => consent ? 'granted' : null },
      gtag: (...args) => events.push(args),
    };
    globalThis.document = { referrer: '' };
    Object.defineProperty(globalThis, 'navigator', { configurable: true, value: {} });
    const client = await import('data:text/javascript;base64,' + Buffer.from(bundle.code).toString('base64'));
    assert.deepEqual(client.getAdsConfiguration(), { id: valid.VITE_GOOGLE_ADS_ID, sendTo: `${valid.VITE_GOOGLE_ADS_ID}/${valid.VITE_GOOGLE_ADS_LEAD_LABEL}` });
    const submissionId = '5ac9ffb3-303a-4c71-9b45-b4bddc4174ab';
    let requestedUrl;
    globalThis.fetch = async (url) => {
      requestedUrl = url;
      return new Response(JSON.stringify({ accepted: true, submission_id: submissionId, id: submissionId }), { status: 201 });
    };
    const receipt = await client.createLead({ submission_id: submissionId, name: 'Fixture only', email: 'fixture@example.test', phone: '2025550142' });
    assert.equal(requestedUrl, valid.VITE_API_BASE_URL + '/leads');
    assert.equal(receipt.accepted, true);
    const accepted = { success: true, submission_id: submissionId, delivery_channel: 'backend' };
    client.trackAcceptedLead(accepted, 'quote_form', 'Air duct cleaning');
    assert.deepEqual(events, []);
    consent = true;
    client.trackAcceptedLead({ ...accepted, success: false }, 'quote_form', 'Air duct cleaning');
    assert.deepEqual(events, []);
    client.trackAcceptedLead(accepted, 'quote_form', 'Air duct cleaning');
    client.trackAcceptedLead(accepted, 'quote_form', 'Air duct cleaning');
    const conversions = events.filter(event => event[1] === 'conversion');
    assert.equal(conversions.length, 1);
    assert.equal(conversions[0][2].send_to, `${valid.VITE_GOOGLE_ADS_ID}/${valid.VITE_GOOGLE_ADS_LEAD_LABEL}`);
    assert.equal(conversions[0][2].transaction_id, submissionId);
    assert.equal(conversions[0][2].page_location, 'https://www.pureaircalifornia.com/quote/');
    assert.doesNotMatch(JSON.stringify(events), /fixture@example|2025550142/);
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
    globalThis.window = previousWindow;
    globalThis.document = previousDocument;
    globalThis.fetch = previousFetch;
    if (previousNavigator) Object.defineProperty(globalThis, 'navigator', previousNavigator);
    else delete globalThis.navigator;
  }
});

test('local development and isolated review builds do not require production configuration', () => {
  for (const context of [{ command: 'serve', mode: 'production' }, { command: 'serve', mode: 'development' },
    { command: 'build', mode: 'development' }, { command: 'build', mode: 'ads-review' }]) {
    assert.doesNotThrow(() => assertProductionReleaseConfig(context, {}));
  }
});

test('Vite validates effective build environment, including shell overrides, before bundling', async () => {
  const previous = Object.fromEntries(Object.keys(valid).map(key => [key, process.env[key]]));
  try {
    Object.assign(process.env, valid);
    const config = await resolveConfig({ logLevel: 'silent', mode: 'production' }, 'build');
    assert.equal(config.env.VITE_API_BASE_URL, valid.VITE_API_BASE_URL);
    assert.equal(config.env.VITE_GOOGLE_ADS_ID, valid.VITE_GOOGLE_ADS_ID);
    assert.equal(config.env.VITE_GOOGLE_ADS_LEAD_LABEL, valid.VITE_GOOGLE_ADS_LEAD_LABEL);
    process.env.VITE_GOOGLE_ADS_LEAD_LABEL = '';
    await assert.rejects(resolveConfig({ logLevel: 'silent', mode: 'production' }, 'build'), /VITE_GOOGLE_ADS_LEAD_LABEL/);
    process.env.VITE_GOOGLE_ADS_LEAD_LABEL = valid.VITE_GOOGLE_ADS_LEAD_LABEL;
    process.env.VITE_API_BASE_URL = 'https://pureaircaliforniawebsite.onrender.com/api';
    await assert.rejects(resolveConfig({ logLevel: 'silent', mode: 'production' }, 'build'), /VITE_API_BASE_URL/);
    await assert.doesNotReject(resolveConfig({ logLevel: 'silent', mode: 'ads-review' }, 'build'));
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
