const assert = require('node:assert/strict');
const fs = require('node:fs');
const puppeteer = require('puppeteer');
const output = '../docs/air-interiors-review';
const base = process.env.PAC_PREVIEW_URL || 'http://127.0.0.1:4186';

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const results = [];
  try {
    for (const [width, height, reduced] of [[1152, 778, false], [1440, 960, false], [390, 844, false], [320, 740, false], [1152, 778, true]]) {
      const page = await browser.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.setViewport({ width, height });
      if (reduced) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
      await page.goto(base, { waitUntil: 'networkidle0' });
      for (const chapter of [3, 4, 5]) {
        if (width > 700 && !reduced) {
          await page.click(`.pac-chapters button:nth-child(${chapter + 1})`);
          await page.waitForFunction(i => Number(document.querySelector(`#air-chapter-${i} .pac-scene-copy`).style.opacity) > .99 && Number(document.querySelector(`#air-chapter-${i}`).style.opacity) > .999, {}, chapter);
        } else {
          await page.$eval(`#air-chapter-${chapter}`, node => node.scrollIntoView({ behavior: 'instant', block: 'start' }));
          await page.evaluate(() => window.scrollBy(0, -85));
        }
        const selector = `#air-chapter-${chapter} img`;
        await page.waitForFunction(s => [...document.querySelectorAll(s)].every(img => img.complete && img.naturalWidth > 0), { timeout: 15000 }, selector);
        const src = await page.$eval(selector, image => image.getAttribute('src'));
        assert(src.endsWith(chapter === 3 ? 'duct-dust-archive-v3.webp' : chapter === 4 ? 'duct-clear-archive-v3.webp' : 'breath.webp'));
        if (chapter !== 5) {
          assert(await page.$eval(selector, img => {
            const bounds = img.getBoundingClientRect();
            const scene = img.closest('[data-scene]').getBoundingClientRect();
            return Math.abs(bounds.width - scene.width) < 2 && Math.abs(bounds.height - scene.height) < 2 && getComputedStyle(img).objectFit === 'cover';
          }), 'Duct photograph must cover the whole hero');
        }
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Horizontal overflow');
        await page.screenshot({ path: `${output}/chapter-${chapter + 1}-${width}${reduced ? '-reduced' : ''}.png` });
      }
      assert.equal(await page.$('img[src*="duct-interior-clean-v2"]'), null, 'Generated duct image removed');
      assert.equal(await page.$('.pac-system-photo'), null, 'Inset duct panels removed');
      assert.equal(await page.$eval('#air-chapter-5 .pac-hero-mission-link', a => a.getAttribute('href')), '/about/#our-mission');
      assert.equal(await page.$eval('#air-chapter-5 .pac-button', a => a.getAttribute('href')), 'tel:2137924145');
      assert.deepEqual(errors, []);
      results.push({ width, height, reduced, chapters: 'Images loaded; links correct; no horizontal overflow or runtime errors' });
      await page.close();
    }
    fs.writeFileSync(`${output}/verification.json`, JSON.stringify({ base, results }, null, 2));
    console.log(JSON.stringify(results, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
