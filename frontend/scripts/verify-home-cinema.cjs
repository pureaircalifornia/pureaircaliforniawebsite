const puppeteer = require('puppeteer');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const base = process.env.AUDIT_BASE || 'http://127.0.0.1:4194';
const out = process.env.AUDIT_OUT || '../docs/cinematic-home-2026-09-24';
fs.mkdirSync(`${out}/screenshots`, { recursive: true });
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const meditationOnly = process.argv.includes('--meditation-only');
const results = meditationOnly ? JSON.parse(fs.readFileSync(`${out}/verification.json`, 'utf8')).filter(item => item.width) : [];

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setRequestInterception(true);
    page.on('request', request => request.url().startsWith(base) || request.url().startsWith('data:') ? request.continue() : request.abort());
    for (const [width, height] of meditationOnly ? [] : [[1440, 960], [390, 844], [320, 740], [768, 1024], [844, 390]]) {
      console.log(`Checking ${width} x ${height}`);
      await page.setViewport({ width, height });
      await page.goto(base + '/', { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForSelector('.pac-film');
      if (height > 540) await page.waitForSelector('.pac-film.is-enhanced');
      assert.equal(await page.$$eval('h1', nodes => nodes.length), 1, 'One H1');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `Overflow ${width}`);
      for (let chapter = 0; chapter < 7; chapter++) {
        if (height > 540) {
          await page.click(`.pac-film-chapters button:nth-child(${chapter + 1})`);
          await page.waitForFunction(i => document.querySelector('.pac-film').dataset.activeChapter === String(i), {}, chapter);
        } else await page.$eval(`[data-scene="${chapter}"]`, el => el.scrollIntoView({ behavior: 'instant' }));
        await page.waitForFunction(i => { const img = document.querySelector(`[data-scene="${i}"] img`); return img.complete && img.naturalWidth > 0; }, {}, chapter);
        await wait(180);
        if (height > 540) {
          const layout = await page.$eval(`[data-scene="${chapter}"] .pac-film-copy`, el => {
            const rect = el.getBoundingClientRect();
            return { top: rect.top, bottom: rect.bottom, header: document.querySelector('.pac-header').getBoundingClientRect().bottom, controls: document.querySelector('.pac-film-controls').getBoundingClientRect().top };
          });
          assert.ok(layout.top >= layout.header - 1, `Copy behind header: ${width} chapter ${chapter} ${JSON.stringify(layout)}`);
          assert.ok(layout.bottom <= layout.controls + 1, `Copy overlaps controls: ${width} chapter ${chapter} ${JSON.stringify(layout)}`);
          assert.equal(await page.$$eval('.pac-film-scene', nodes => nodes.filter(el => !el.inert).length), 1, 'Only active scene is interactive');
        }
        if ([1440, 390].includes(width)) await page.screenshot({ path: `${out}/screenshots/${width}-chapter-${chapter}.png` });
      }
      if (height > 540) {
        await page.click('.pac-film-options button');
        await page.waitForFunction(() => document.querySelector('.pac-film').dataset.paused === 'true');
        assert.equal(await page.$eval('.pac-film-atoms', el => getComputedStyle(el).animationPlayState), 'paused');
        await page.click('.pac-film-options button');
        await page.click('.pac-film-chapters button:first-child');
        await page.waitForFunction(() => document.querySelector('.pac-film').dataset.activeChapter === '0');
        await page.evaluate(() => { const el = document.querySelector('.pac-film'); window.scrollTo(0, (el.offsetHeight - innerHeight) * .5); });
        await page.waitForFunction(() => document.querySelector('.pac-film').dataset.activeChapter === '3');
        results.push({ width, height, chapters: 7, layout: 'pass', scrolling: 'pass', pause: 'pass' });
      } else results.push({ width, height, chapters: 7, shortScreenStaticView: 'pass' });
      console.log(`Passed ${width} x ${height}`);
    }
    // Let the initial hero layout and route scroll restoration settle before scrolling.
    // Fresh navigation, without a click: visual guidance must start itself.
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.pac-film.is-enhanced');
    await wait(1200);
    await page.$eval('#breathing-moment', el => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
    await page.waitForFunction(() => document.querySelector('#breathing-moment').dataset.running === 'true');
    await page.waitForFunction(() => !document.querySelector('.pac-meditation-time').textContent.startsWith('0 /'), { timeout: 10000 });
    assert.ok(await page.$eval('.pac-meditation-time', el => !el.textContent.startsWith('0 /')), 'Autostart clock');
    await page.screenshot({ path: `${out}/screenshots/390-meditation.png` });
    await page.$eval('.pac-meditation-controls', el => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
    await page.click('.pac-meditation-controls button:first-child');
    await page.waitForFunction(() => document.querySelector('#breathing-moment').dataset.running === 'false');
    const stopped = await page.$eval('.pac-meditation-time', el => el.textContent);
    await wait(1200);
    assert.equal(await page.$eval('.pac-meditation-time', el => el.textContent), stopped, 'Pause freezes guidance');
    await page.click('.pac-meditation-controls button:first-child');
    await page.waitForFunction(() => document.querySelector('#breathing-moment').dataset.running === 'true');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForFunction(() => document.querySelector('#breathing-moment').dataset.running === 'false');
    results.push({ meditationAutostart: 'pass', pauseResume: 'pass', offscreenPause: 'pass' });

    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.waitForFunction(() => !document.querySelector('.pac-film.is-enhanced'));
    assert.equal(await page.$$eval('.pac-film-scene', nodes => nodes.filter(el => getComputedStyle(el).visibility === 'visible' && !el.inert).length), 7);
    assert.equal(await page.$eval('.pac-breath-orbit > span', el => getComputedStyle(el).animationName), 'none');
    results.push({ reducedMotion: 'pass', readableChapters: 7 });
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
    for (const route of ['/about/', '/services/residential-air-duct-cleaning/', '/quote/']) {
      await page.goto(base + route, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.pac-breath-pause');
      assert.equal(await page.$('.pac-film'), null, 'Homepage-only film');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, route);
      results.push({ route, sharedLayout: 'pass' });
    }
    assert.deepEqual(errors, [], 'Runtime errors');
    results.push({ runtimeErrors: errors });
  } finally {
    await browser.close();
    fs.writeFileSync(`${out}/verification.json`, JSON.stringify(results, null, 2));
  }
  console.log(JSON.stringify(results, null, 2));
})().catch(error => { console.error(error); process.exitCode = 1; });
