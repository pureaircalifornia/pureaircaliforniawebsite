import puppeteer from 'puppeteer';
import fs from 'node:fs';
import assert from 'node:assert/strict';

// Exercises public controls only. Never submits a lead or clicks a paid ad.
const category = process.env.PAC_QA_CATEGORY || 'estate';
const routes = { estate: '/services/residential-air-duct-cleaning/?property=estate', home: '/services/residential-air-duct-cleaning/', commercial: '/services/commercial-air-duct-cleaning/', managed: '/property-managers/' };
assert.ok(Object.hasOwn(routes, category));
const out = `../docs/tracking-audit-2026-10-15/live-measurement-${category}.json`;
const browser = await puppeteer.launch({ headless: true });
const report = { checkedAt: new Date().toISOString(), requests: [], checks: [], errors: [] };
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960 });
  page.on('response', response => {
    const url = new URL(response.url());
    if (/google-analytics\.com|analytics\.google\.com|googletagmanager\.com|googleadservices\.com/.test(url.hostname)) {
      const body = response.request().postData() || '';
      report.requests.push({ host: url.hostname, path: url.pathname, status: response.status(),
        tag: url.searchParams.get('id') || url.searchParams.get('tid'),
        event: url.searchParams.get('en'),
        batchEvents: [...body.matchAll(/(?:^|[&\n])en=([^&\n]+)/g)].map(m => m[1]) });
    }
  });
  await page.goto('https://www.pureaircalifornia.com' + routes[category], { waitUntil: 'networkidle2' });
  await page.waitForSelector('.pac-privacy-choices');
  assert.equal(report.requests.length, 0, 'Optional Google requests must be absent before consent');
  report.checks.push('No Google measurement requests before consent');
  await page.$$eval('.pac-privacy-choices button', buttons => buttons.find(b => b.textContent === 'Customize choices').click());
  for (const checkbox of await page.$$('.pac-privacy-choices input[type=checkbox]')) await checkbox.click();
  await page.$$eval('.pac-privacy-choices button', buttons => buttons.find(b => b.textContent === 'Save my choices').click());
  await page.waitForFunction(() => window.__pacGoogleTransportLoaded === true, { timeout: 30000 });
  await page.waitForFunction(() => performance.getEntriesByType('resource').some(r => r.name.includes('/gtag/js?id=')), { timeout: 30000 });
  report.checks.push('Published GTM bridge loads Google tag after consent');
  const before = await page.evaluate(() => window.dataLayer.filter(x => x.event === 'cta_click').length);
  await page.$$eval('a[href^="/quote"]', (links, category) => {
    const link = links.find(a => a.href.includes('property=' + category));
    if (!link) throw new Error('Category estimate link missing');
    link.click();
  }, category);
  await page.waitForFunction(() => location.pathname.startsWith('/quote'));
  await new Promise(resolve => setTimeout(resolve, 8000));
  const state = await page.evaluate(() => ({
    route: location.pathname + location.search,
    events: window.dataLayer.filter(x => x.event && !x.event.startsWith('gtm.')),
    commands: window.dataLayer.filter(x => x[0] === 'event').map(x => ({ name: x[1], parameters: x[2] })),
    scripts: [...document.scripts].map(s => s.src).filter(s => s.includes('googletagmanager.com')),
  }));
  assert.equal(state.events.filter(x => x.event === 'cta_click').length - before, 1);
  assert.equal(state.events.findLast(x => x.event === 'cta_click').property_type, category);
  assert.ok(state.route.includes('property=' + category));
  assert.equal(state.commands.filter(x => x.name === 'page_view').length, 2);
  assert.equal(state.commands.filter(x => /^(generate_lead|conversion)$/.test(x.name)).length, 0);
  assert.equal(state.scripts.filter(s => s.includes('/gtm.js?id=GTM-W8QH56V2')).length, 1);
  report.state = state;
  // Google can load a destination library for each configured GA4/Ads ID.
  const tagIds = state.scripts.filter(s => s.includes('/gtag/js?id=')).map(s => new URL(s).searchParams.get('id'));
  assert.equal(new Set(tagIds).size, tagIds.length, 'Each Google destination library should load at most once');
  report.checks.push(`${category} CTA fires once and carries category into quote`);
  report.checks.push('Exactly two manual pageviews across landing and SPA quote navigation; no fake lead or conversion');
  const receivedEvents = report.requests.filter(r => r.path === '/g/collect' && r.status === 204).flatMap(r => [r.event, ...r.batchEvents].filter(Boolean));
  assert.equal(receivedEvents.filter(e => e === 'page_view').length, 2, 'GA4 must acknowledge both pageviews without duplication');
  assert.equal(receivedEvents.filter(e => e === 'cta_click').length, 1, 'GA4 must acknowledge the CTA once');
  report.checks.push('One GTM loader; each Google destination library loads once; GA4 acknowledges both pageviews and the CTA');
  report.state = state;
} catch (error) {
  report.errors.push(error.stack);
  process.exitCode = 1;
} finally {
  await browser.close();
  fs.writeFileSync(out, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ checks: report.checks, errors: report.errors, requests: report.requests }, null, 2));
}
