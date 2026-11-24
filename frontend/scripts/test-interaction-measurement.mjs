import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { campaignParameters, normalizeMeasurement } from '../src/utils/measurementContext.mjs';
import { sanitizeAttribution } from '../src/utils/attribution.mjs';
import fs from 'node:fs';
import vm from 'node:vm';

const bundle = await build({ entryPoints: ['src/utils/interactionTracking.ts'], bundle: true,
  write: false, platform: 'node', format: 'esm' });
const { installInteractionTracking } = await import('data:text/javascript;base64,' + Buffer.from(bundle.outputFiles[0].text).toString('base64'));

class Element {
  constructor(tagName, area = '') { this.tagName = tagName; this.area = area; }
  closest(selector) {
    if (selector === 'a,button,summary,[role="button"]') return this.control || this;
    if (selector.includes('analytics-ignore')) return this.ignore ? this : null;
    return selector === this.area ? this : null;
  }
}
class Anchor extends Element { constructor(href, area) { super('A', area); this.href = href; } }
class Button extends Element { constructor() { super('BUTTON', 'form'); this.type = 'submit'; } }
function setup({ consent = true, path = '/services/residential-air-duct-cleaning/?property=estate' } = {}) {
  const events = [], listeners = new Map();
  globalThis.Element = Element; globalThis.HTMLAnchorElement = Anchor; globalThis.HTMLButtonElement = Button;
  globalThis.window = { location: new URL('https://www.pureaircalifornia.com' + path),
    localStorage: { getItem: key => key === 'pac-analytics-consent' && consent ? 'granted' : null },
    gtag: (...args) => events.push(args), dataLayer: [] };
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: {} });
  globalThis.document = { referrer: 'https://example.com/?email=private@example.test',
    addEventListener: (name, callback) => listeners.set(name, callback),
    removeEventListener: (name, callback) => { if (listeners.get(name) === callback) listeners.delete(name); } };
  const cleanup = installInteractionTracking();
  return { events, cleanup, click: target => listeners.get('click')?.({ target }) };
}
test('nested estimate icon produces one CTA with estate context and no URL personal data', () => {
  const fixture = setup();
  const icon = new Element('svg'); icon.control = new Anchor('/quote/?property=estate&email=private@example.test#estimate-builder');
  fixture.click(icon);
  assert.equal(fixture.events.length, 1);
  assert.equal(fixture.events[0][1], 'cta_click');
  assert.equal(fixture.events[0][2].property_type, 'estate');
  assert.equal(fixture.events[0][2].destination_url, 'https://www.pureaircalifornia.com/quote/');
  assert.ok(!JSON.stringify(fixture.events).includes('private@'));
});
test('phone and email clicks are interactions and never Ads conversions', () => {
  const fixture = setup(); fixture.click(new Anchor('tel:2137924145')); fixture.click(new Anchor('mailto:private@example.test'));
  assert.deepEqual(fixture.events.map(event => event[1]), ['phone_click', 'email_click']);
  assert.ok(!JSON.stringify(fixture.events).includes('2137924145'));
  assert.ok(!JSON.stringify(fixture.events).includes('private@'));
});
test('denial, GPC and private routes suppress interaction measurement', () => {
  for (const config of [{consent:false},{path:'/feedback/private-token'},{path:'/admin/'}]) {
    const fixture = setup(config); fixture.click(new Button()); assert.equal(fixture.events.length,0);
  }
  const fixture = setup(); navigator.globalPrivacyControl = true; fixture.click(new Anchor('/quote/')); assert.equal(fixture.events.length,0);
});
test('SPA interactions reflect the current category, listener cleanup prevents duplicates', () => {
  const fixture = setup(); window.location = new URL('https://www.pureaircalifornia.com/property-managers/');
  fixture.click(new Anchor('/quote/')); assert.equal(fixture.events[0][2].property_type,'managed');
  fixture.cleanup(); fixture.click(new Anchor('/quote/')); assert.equal(fixture.events.length,1);
});
test('navigation, outbound links and buttons use distinct events; ignored controls stay private', () => {
  const fixture = setup(); fixture.click(new Anchor('/services/', 'nav')); fixture.click(new Anchor('https://example.com/?secret=hidden')); fixture.click(new Button());
  const ignored = new Button(); ignored.ignore = true; fixture.click(ignored);
  assert.deepEqual(fixture.events.map(event => event[1]), ['link_click','outbound_link','ui_click']);
  assert.equal(fixture.events[0][2].click_location,'navigation');
  assert.ok(!JSON.stringify(fixture.events).includes('hidden'));
});
test('campaign labels survive sanitization without disclosing click IDs or arbitrary fields to GA4', () => {
  const now = Date.now();
  const attribution = sanitizeAttribution({ad_measurement_consent:true,captured_at:new Date(now).toISOString(),landing_path:'/',
    utm_source:'google',utm_medium:'cpc',utm_campaign:'pac_123456789',utm_content:'ag_123_ad_456',utm_term:'person@example.test',gclid:'abc',email:'private@example.test'},now);
  assert.deepEqual(campaignParameters(attribution), {campaign_source:'google',campaign_medium:'cpc',campaign_name:'pac_123456789',campaign_content:'ag_123_ad_456'});
});
test('category values match between page, form and lead events', () => {
  for (const [label,key] of [['Private home / estate','estate'],['Managed property / HOA','managed'],['Business / commercial','commercial'],['Home / apartment','home']]) {
    assert.equal(normalizeMeasurement({property_type:label}).property_type,key);
    assert.equal(normalizeMeasurement({property_type:key}).property_type,key);
  }
  assert.equal(normalizeMeasurement({service_type:'Air duct cleaning'}).service_type,'air-duct');
  assert.equal(normalizeMeasurement({service_type:'Dryer vent cleaning'}).service_type,'dryer-vent');
  assert.equal(normalizeMeasurement({property_type:'private@example.test'}).property_type,undefined);
});
test('GTM transport loads only the approved Google ID once, without sending events itself', () => {
  const config = JSON.parse(fs.readFileSync('../docs/tracking-audit-2026-10-15/gtm-consent-transport.json','utf8').replace(/^\uFEFF/,''));
  const html = config.containerVersion.tag[0].parameter.find(p=>p.key==='html').value;
  for (const id of ['G-SK8BHVML0W','AW-1003912049','G-UNAPPROVED','https://example.test']) {
    const scripts = [];
    const context = vm.createContext({ window:{}, document:{querySelector:()=>null,createElement:()=>({}),head:{appendChild:s=>scripts.push(s)}},encodeURIComponent });
    const script = html.replace(/<\/?script>/g,'').replace('{{PAC - Google tag loader ID}}',JSON.stringify(id));
    vm.runInContext(script,context); vm.runInContext(script,context);
    assert.equal(scripts.length,['G-SK8BHVML0W','AW-1003912049'].includes(id)?1:0);
    if(scripts.length) assert.equal(scripts[0].src,'https://www.googletagmanager.com/gtag/js?id='+id);
  }
  const existing = vm.createContext({window:{},document:{querySelector:()=>({}),createElement:()=>{throw new Error('Duplicate loader');}},encodeURIComponent});
  vm.runInContext(html.replace(/<\/?script>/g,'').replace('{{PAC - Google tag loader ID}}',JSON.stringify('G-SK8BHVML0W')),existing);
  assert.equal(existing.window.__pacGoogleTransportLoaded,true);
});


test('owned HCP destinations are distinct outbound interactions, never accepted leads', () => {
  const fixture = setup({path:'/'});
  const destinations = [
    ['https://book.housecallpro.com/book/Pure-Air-California/41595344e7314e6ca990aa001be77af6?v2=true&attr=11314&email=private@example.test','residential'],
    ['https://book.housecallpro.com/lead-form/Pure-Air-California/3caf59e03b3740eb9d8bfe02b158a49e','commercial'],
    ['https://client.housecallpro.com/customer_portal/request-link?token=8e93a8aea4cd4a2f811d8b6e829db66b','customer_portal'],
  ];
  for(const [url,type] of destinations){
    const anchor = new Anchor(url); fixture.click(anchor);
    const event=fixture.events.at(-1);
    assert.equal(event[1],'outbound_link'); assert.equal(event[2].request_type,type);
    assert.equal(event[2].request_channel,'housecall_pro');
    assert(!event[2].destination_url.includes('?')); assert.equal(anchor.href,url);
  }
  assert.equal(fixture.events.length,3);
  assert(!JSON.stringify(fixture.events).includes('private@'));
  assert(!JSON.stringify(fixture.events).includes('generate_lead'));
  fixture.click(new Anchor('https://book.housecallpro.com/book/another-business/example'));
  assert.equal(fixture.events.at(-1)[2].request_type,undefined);
  fixture.click(new Anchor('https://book.housecallpro.com.example.test/book/Pure-Air-California/41595344e7314e6ca990aa001be77af6'));
  assert.equal(fixture.events.at(-1)[2].request_type,undefined);
});
test('hosted request measurement respects denial, GPC, and one-listener cleanup',()=>{
  const href='https://book.housecallpro.com/lead-form/Pure-Air-California/3caf59e03b3740eb9d8bfe02b158a49e';
  const denied=setup({consent:false});denied.click(new Anchor(href));assert.equal(denied.events.length,0);
  const gpc=setup();navigator.globalPrivacyControl=true;gpc.click(new Anchor(href));assert.equal(gpc.events.length,0);
  const fixture=setup();fixture.click(new Anchor(href));fixture.cleanup();fixture.click(new Anchor(href));assert.equal(fixture.events.length,1);
});
