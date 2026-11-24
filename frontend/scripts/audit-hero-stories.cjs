const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const puppeteer = require('puppeteer');

const base = process.env.AUDIT_BASE || 'http://127.0.0.1:4175';
const out = '../docs/SEO/hero-review-2026-09-20';
const routes = [...new Set([...fs.readFileSync('public/sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname).concat(['/dryer-safety/', '/compare/', '/commercial-services/', '/404/']))];
const samples = new Set(['/', '/services/residential-air-duct-cleaning/', '/industries/hospitality/', '/locations/santa-monica/', '/locations/pasadena/', '/contact/']);
const results = [];
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  fs.mkdirSync(path.join(out, 'screenshots'), { recursive: true });
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  let cursor = 0;
  try {
    await Promise.all([0, 1, 2].map(async () => {
      const page = await browser.newPage();
      await page.setRequestInterception(true);
      page.on('request', request => request.url().startsWith(base) || request.url().startsWith('data:') ? request.continue() : request.abort());
      while (cursor < routes.length) {
        const route = routes[cursor++];
        const errors = [];
        const onError = error => errors.push(error.message);
        page.on('pageerror', onError);
        const result = { route, errors };
        try {
          await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
          await page.setViewport({ width: 1440, height: 1000 });
          await page.goto(base + route, { waitUntil: 'networkidle2', timeout: 45000 });
          await page.waitForSelector('h1');
          assert.equal(await page.$$eval('h1', nodes => nodes.length), 1, 'One H1');
          const hero = await page.$('.pac-story-hero');
          if (hero) {
            await page.waitForFunction(() => [...document.querySelectorAll('.pac-story-image')].every(img => img.complete && img.naturalWidth > 0), { timeout: 20000 });
            const chapters = await page.$$('.pac-story-chapters button');
            assert.equal(chapters.length, 4, 'Four visual chapters');
            // Every chapter must display the actual corresponding image.
            for (let i = 0; i < chapters.length; i++) {
              await chapters[i].click();
              await page.waitForFunction(index => document.querySelectorAll('.pac-story-frame')[index].classList.contains('is-active'), {}, i);
            }
            await page.locator('[aria-label="Play hero story"]').click();
            await page.waitForSelector('[aria-label="Pause hero story"]');
            await page.waitForFunction(() => document.querySelectorAll('.pac-story-frame')[0].classList.contains('is-active'));
            if (samples.has(route)) {
              // Leave the pointer on Play: this reproduced the original defect.
              await page.waitForFunction(() => document.querySelectorAll('.pac-story-frame')[1].classList.contains('is-active'), { timeout: 10000 });
            }
            await page.locator('[aria-label="Pause hero story"]').click();
            result.playback = 'all chapters, immediate play, pause passed';
            if (samples.has(route)) {
              const active = await page.$eval('.pac-story-frame.is-active img', image => image.currentSrc);
              await delay(6800);
              assert.equal(await page.$eval('.pac-story-frame.is-active img', image => image.currentSrc), active, 'Pause holds the frame');
              await page.focus('.pac-story-chapters button');
              await page.keyboard.press('Enter');
              await page.focus('.pac-story-play');
              await page.keyboard.press('Enter');
              await page.waitForSelector('[aria-label="Pause hero story"]');
              await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
              await page.waitForSelector('.is-story-still');
              await chapters[2].click();
              assert.equal(await page.$('.pac-story-play'), null, 'No unusable reduced-motion play button');
              result.accessibility = 'keyboard and reduced-motion chapters passed';
            }
          } else {
            assert.ok(route === '/' || route === '/404/', 'Expected a hero');
          }
          result.desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2);
          assert.equal(result.desktopOverflow, false, 'Desktop overflow');
          if (samples.has(route)) await page.screenshot({ path: path.join(out, 'screenshots', route.replaceAll('/', '_') + 'desktop.png') });
          await page.setViewport({ width: 390, height: 844 });
          await page.evaluate(() => { for (const img of document.images) img.loading = 'eager'; });
          await page.waitForFunction(() => [...document.images].every(img => img.complete), { timeout: 15000 }).catch(() => {});
          result.brokenImages = await page.$$eval('img', images => images.filter(img => !img.complete || !img.naturalWidth).map(img => img.currentSrc));
          assert.equal(result.brokenImages.length, 0, 'Broken page images');
          result.mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2);
          assert.equal(result.mobileOverflow, false, 'Mobile overflow');
          if (samples.has(route)) {
            await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
            await page.screenshot({ path: path.join(out, 'screenshots', route.replaceAll('/', '_') + 'mobile.png') });
          }
        } catch (error) { errors.push(error.message); }
        page.off('pageerror', onError);
        results.push(result);
        console.log(route, errors.length ? JSON.stringify(errors) : 'PASS');
      }
      await page.close();
    }));
  } finally {
    await browser.close();
    fs.writeFileSync(path.join(out, 'hero-audit.json'), JSON.stringify({ checkedAt: new Date().toISOString(), checked: results.length, failures: results.filter(result => result.errors.length).length, pages: results }, null, 2));
  }
  if (results.some(result => result.errors.length)) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
