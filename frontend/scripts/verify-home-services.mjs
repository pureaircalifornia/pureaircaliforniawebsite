import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const origin = (process.env.BASE_URL || 'http://127.0.0.1:5184').replace(/\/$/, '');
const live = !/^https?:\/\/(?:localhost|127\.0\.0\.1)(?::|\/|$)/.test(origin);
const output = path.resolve(process.env.PAC_AUDIT_DIR || path.join(frontend, `../docs/home-services-2026-11-11/${live ? 'live-browser' : 'local-browser'}`));
await fs.mkdir(output, { recursive: true });

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
page.setDefaultTimeout(20000);
page.setDefaultNavigationTimeout(60000);
const results = { origin, checkedAt: new Date().toISOString(), viewports: [], journeys: [], runtimeErrors: [], brokenAssets: [], blockedMutations: [], screenshots: [] };
let failure;
page.on('pageerror', error => results.runtimeErrors.push(error.message));
page.on('response', response => {
  if (response.url().startsWith(origin + '/') && response.status() >= 400 && /\/(?:assets|images|brand)\//.test(new URL(response.url()).pathname)) {
    results.brokenAssets.push({ status: response.status(), url: response.url() });
  }
});
await page.setRequestInterception(true);
await page.evaluateOnNewDocument(() => {
  try { sessionStorage.setItem('pac-measurement-qa', '1'); } catch { /* Consent is still denied through the real UI. */ }
});
page.on('request', request => {
  if (!['GET', 'HEAD', 'OPTIONS'].includes(request.method())) {
    results.blockedMutations.push({ method: request.method(), url: request.url() });
    request.abort();
  } else request.continue();
});

async function goto(route, selector = 'h1') {
  const response = await page.goto(origin + route, { waitUntil: 'domcontentloaded' });
  // Chromium can resolve an identical URL as a same-document navigation (null),
  // or validate its cached Vite shell with 304. Content and route still must match.
  if (response) assert.ok(response.ok() || response.status() === 304, `HTTP ${response.status()} for ${route}`);
  assert.equal(new URL(page.url()).pathname, new URL(route, origin).pathname, `Expected route ${route}`);
  await page.waitForSelector(selector, { visible: true });
  const necessary = await page.$('button::-p-text(Use necessary only)');
  if (necessary) await necessary.click();
  await page.evaluate(() => document.fonts.ready);
}

async function screenshot(filename, selector) {
  const target = selector ? await page.$(selector) : page;
  assert.ok(target, `Screenshot target ${selector}`);
  const file = path.join(output, filename);
  await target.screenshot({ path: file, ...(selector ? {} : { fullPage: false }) });
  results.screenshots.push(file);
}

async function expectHomeJourney(label, trigger) {
  await trigger();
  await page.waitForFunction(() => location.pathname === '/home-services/');
  await page.waitForSelector('#home-services-heading', { visible: true });
  results.journeys.push({ label, path: new URL(page.url()).pathname, passed: true });
}

try {
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewport({ width, height: width >= 768 ? 900 : 844, deviceScaleFactor: 1 });
    await goto('/home-services/', '#home-services-heading');
    await page.evaluate(async () => {
      const images = [...document.querySelectorAll('.hs-page > main img')];
      for (const image of images) {
        image.scrollIntoView({ block: 'center', behavior: 'instant' });
        image.loading = 'eager';
      }
      await Promise.all(images.map(async image => {
        await Promise.race([
          image.decode().catch(() => {}),
          new Promise(resolve => setTimeout(resolve, 15000)),
        ]);
      }));
      scrollTo({ top: 0, behavior: 'instant' });
    });
    const state = await page.evaluate(() => {
      const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(script => {
        const data = JSON.parse(script.textContent);
        return Array.isArray(data) ? data : data['@graph'] || [data];
      });
      const visibleOverflow = [...document.querySelectorAll('.hs-page > main *')].filter(element => {
        const rectangle = element.getBoundingClientRect();
        return rectangle.width > 0 && (rectangle.right > innerWidth + 1 || rectangle.left < -1);
      }).map(element => ({ tag: element.tagName, class: element.className?.baseVal ?? element.className, right: Math.round(element.getBoundingClientRect().right) })).slice(0, 12);
      return {
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        h1Count: document.querySelectorAll('h1').length,
        title: document.title,
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        robots: document.querySelector('meta[name="robots"]')?.content,
        brokenImages: [...document.querySelectorAll('.hs-page > main img')].filter(image => !image.complete || !image.naturalWidth).map(image => image.currentSrc || image.src),
        missingImageDescriptions: [...document.querySelectorAll('.hs-page > main img')].filter(image => !image.alt.trim()).map(image => image.src),
        types: schemas.map(schema => schema['@type']),
        itemList: schemas.find(schema => schema['@type'] === 'ItemList')?.itemListElement,
        visibleOverflow,
      };
    });
    results.viewports.push(state);
    assert.equal(state.h1Count, 1, `${width}px: one H1`);
    assert.ok(state.scrollWidth <= width + 1, `${width}px: no horizontal document overflow; ${JSON.stringify(state.visibleOverflow)}`);
    assert.deepEqual(state.brokenImages, [], `${width}px: all page photos load`);
    assert.deepEqual(state.missingImageDescriptions, [], `${width}px: descriptive image alternatives`);
    assert.equal(state.canonical, 'https://www.pureaircalifornia.com/home-services/');
    assert.ok(/^index,/.test(state.robots), 'Indexable robots metadata');
    assert.ok(state.types.includes('CollectionPage'), 'CollectionPage structured data');
    assert.ok(state.types.includes('BreadcrumbList'), 'Breadcrumb structured data');
    assert.equal(state.itemList?.length, 4, 'Four home services in structured data');
    if (width === 1440 || width === 390) {
      await screenshot(`home-services-${width}-hero.png`);
      await screenshot(`home-services-${width}-gallery.png`, '#home-work');
      const file = path.join(output, `home-services-${width}-full.png`);
      await page.screenshot({ path: file, fullPage: true });
      results.screenshots.push(file);
    }
  }

  await page.setViewport({ width: 1440, height: 900 });
  await goto('/home-services/', '#home-services-heading');
  const summary = await page.$('#home-questions details:first-of-type summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => document.querySelector('#home-questions details').open);
  await page.keyboard.press('Space');
  await page.waitForFunction(() => !document.querySelector('#home-questions details').open);
  results.journeys.push({ label: 'FAQ opens with Enter and closes with Space', passed: true });

  await goto('/services/');
  await expectHomeJourney('Desktop For your home navigation', () => page.click('nav[aria-label="Main navigation"] a.pac-nav-audience[href="/home-services/"]'));

  await goto('/industries/');
  await page.click('button[aria-controls="pac-services-menu"]');
  await page.waitForSelector('#pac-services-menu:not([hidden])', { visible: true });
  await expectHomeJourney('Desktop mega-menu Home category', () => page.click('#pac-services-menu a[aria-label="For your home"]'));

  await page.setViewport({ width: 390, height: 844 });
  await goto('/services/');
  await page.click('button[aria-controls="pac-mobile-menu"]');
  await page.waitForSelector('#pac-mobile-menu:not([hidden])', { visible: true });
  await screenshot('home-services-mobile-menu.png');
  await expectHomeJourney('Mobile Home category tile', () => page.click('#pac-mobile-menu .pac-mobile-category-choices a[aria-label="For your home"]'));

  await page.setViewport({ width: 1440, height: 900 });
  await goto('/');
  const homeTile = await page.$('.pac-visual-category[aria-label="For your home"]');
  assert.ok(homeTile, 'Homepage Home category tile exists');
  await homeTile.scrollIntoView();
  await expectHomeJourney('Homepage Home category tile', () => homeTile.click());

  await page.click('.hs-hero .hs-button');
  await page.waitForSelector('#estimate-builder', { visible: true });
  const estimate = await page.evaluate(() => ({
    path: location.pathname,
    service: new URLSearchParams(location.search).get('service'),
    property: new URLSearchParams(location.search).get('property'),
    hash: location.hash,
    selected: [...document.querySelectorAll('#estimate-builder input[type="radio"]:checked')].map(input => input.closest('label').textContent.trim()),
  }));
  assert.equal(estimate.path, '/quote/');
  assert.equal(estimate.service, 'air-duct');
  assert.equal(estimate.property, 'home');
  assert.equal(estimate.hash, '#estimate-builder');
  assert.ok(estimate.selected.includes('Home / apartment'), 'Residential property selected');
  assert.ok(estimate.selected.some(label => /Air duct cleaning/i.test(label)), 'Air duct service selected');
  results.journeys.push({ label: 'Home estimate preserves residential service context', ...estimate, passed: true });
  assert.deepEqual(results.brokenAssets, [], 'No failed same-origin image or bundle requests');
  assert.deepEqual(results.runtimeErrors, [], 'No JavaScript runtime errors');
  assert.deepEqual(results.blockedMutations, [], 'No data submissions or mutating requests');
} catch (error) {
  failure = error;
  results.failure = error.stack || error.message;
  await page.screenshot({ path: path.join(output, 'failure.png'), fullPage: false }).catch(() => {});
} finally {
  await browser.close();
  await fs.writeFile(path.join(output, 'browser-results.json'), JSON.stringify(results, null, 2));
}
console.log(JSON.stringify({ origin, output, viewports: results.viewports.length, journeys: results.journeys.length, failure: failure?.message, runtimeErrors: results.runtimeErrors, brokenAssets: results.brokenAssets }, null, 2));
if (failure) process.exitCode = 1;
