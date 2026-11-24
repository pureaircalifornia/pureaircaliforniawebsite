import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import puppeteer from 'puppeteer';

// Read-only QA of our own website. No form submissions or third-party requests.
const output = fileURLToPath(new URL('../../docs/ads-refinement-2026-10-15/', import.meta.url));
const root = process.env.PAC_QA_BUILD_DIR ? path.resolve(process.env.PAC_QA_BUILD_DIR) : fileURLToPath(new URL('../build/', import.meta.url));
const app = express();
app.use(express.static(root));
const server = await new Promise(resolve => {
  const active = app.listen(0, '127.0.0.1', () => resolve(active));
});
const origin = `http://127.0.0.1:${server.address().port}`;
const routes = [
  ['commercial', '/services/commercial-air-duct-cleaning/', 'commercial', 'Get a commercial estimate', 'Los Angeles County'],
  ['managed', '/property-managers/', 'managed', 'Get a property estimate', 'LA County'],
  ['home', '/services/residential-air-duct-cleaning/', 'home', 'Get a home cleaning estimate', 'Beverly Hills'],
  ['estate', '/services/residential-air-duct-cleaning/?property=estate', 'estate', 'Request an estate estimate', 'One clear plan for the home you manage'],
];
const results = [], errors = [];
const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', request => request.url().startsWith(origin) || request.url().startsWith('data:') ? request.continue() : request.abort());
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  for (const [name, route, property, cta, wording] of routes) {
    for (const [width, height] of [[1440, 1000], [390, 844]]) {
      await page.setViewport({ width, height });
      await page.goto(origin + route, { waitUntil: 'networkidle0', timeout: 60000 });
      await page.waitForFunction(value => document.body.textContent.includes(value), {}, wording);
      await page.evaluate(() => [...document.querySelectorAll('.pac-privacy-choices button')].find(button => button.textContent === 'Use necessary only')?.click());
      const result = await page.evaluate(() => ({
        h1: [...document.querySelectorAll('h1')].map(node => node.textContent),
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        quoteLinks: [...document.querySelectorAll('a[href*="/quote/"]')].map(a => ({ text: a.textContent, href: a.getAttribute('href') })),
        heroImages: [...document.querySelectorAll('.pac-service-visual-story img')].map(img => ({src: img.getAttribute('src'), loaded: img.complete && img.naturalWidth > 0})),
      }));
      result.name = name; result.width = width;
      if (result.h1.length !== 1 || result.overflow) errors.push({name, width, issue: 'Heading or overflow', result});
      const expected = `/quote/?service=air-duct&property=${property}#estimate-builder`;
      if (!result.quoteLinks.some(a => a.text.includes(cta) && a.href === expected)) errors.push({name, width, issue:'CTA intent mismatch'});
      if (result.canonical !== 'https://www.pureaircalifornia.com' + route.split('?')[0]) errors.push({name, width, issue:'Canonical mismatch'});
      if (name === 'estate' && !result.heroImages.some(img => img.src.includes('homeInterior.webp') && img.loaded)) errors.push({name, width, issue:'Estate visual missing'});
      await page.screenshot({ path: path.join(output, `${name}-${width}.png`) });
      results.push(result);
    }
  }
  await fs.writeFile(path.join(output, 'landing-browser-qa.json'), JSON.stringify({ checkedAt:new Date().toISOString(), results, errors }, null, 2));
  console.log(JSON.stringify({views:results.length,errors},null,2));
} finally {
  await browser.close();
  server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
}
await fs.writeFile(path.join(output, 'landing-browser-qa.json'), JSON.stringify({ checkedAt:new Date().toISOString(), results, errors }, null, 2));
console.log(JSON.stringify({views:results.length,errors},null,2));
if(errors.length) process.exitCode = 1;
