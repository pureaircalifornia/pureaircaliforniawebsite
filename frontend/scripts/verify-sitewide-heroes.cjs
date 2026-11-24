const fs = require('node:fs');
const assert = require('node:assert/strict');
const puppeteer = require('puppeteer');

const base = process.env.AUDIT_BASE || 'http://127.0.0.1:4194';
const out = process.env.AUDIT_OUT || '../docs/cinematic-home-2026-09-24/sitewide-heroes';
fs.mkdirSync(out + '/screenshots', { recursive: true });

const allRoutes = [
  ...new Set(
    [...fs.readFileSync('public/sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((m) => new URL(m[1]).pathname)
      .concat([
        '/dryer-safety/',
        '/compare/',
        '/commercial-services/',
        '/services/residential-air-duct-cleaning/?property=estate',
      ])
  ),
];
const routes = process.env.AUDIT_ROUTES ? JSON.parse(process.env.AUDIT_ROUTES) : allRoutes;
const shouldScreenshot = (route) =>
  route === '/' ||
  route.startsWith('/services') ||
  route.startsWith('/industries') ||
  [
    '/about/',
    '/contact/',
    '/quote/',
    '/pricing/',
    '/property-managers/',
    '/partners/',
    '/project-stories/',
    '/case-studies/',
    '/dryer-safety/',
    '/compare/',
    '/locations/',
    '/locations/los-angeles/',
    '/locations/beverly-hills/',
    '/locations/santa-monica/',
    '/blog/',
  ].includes(route);

const path = require('node:path');
const buildRoot = path.resolve('build');
const fileCache = new Map();
const mimeMap = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

const results = [];
let cursor = 0;

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--disable-background-timer-throttling',
      '--disable-renderer-backgrounding',
      '--disable-backgrounding-occluded-windows',
    ],
  });
  try {
    await Promise.all(
      Array.from({ length: Number(process.env.AUDIT_WORKERS || 3) }, (_, i) => i).map(async () => {
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', (r) => {
          const url = r.url();
          if (url.startsWith('data:') || url.startsWith('blob:')) {
            r.continue();
            return;
          }
          if (!url.startsWith(base)) {
            r.abort();
            return;
          }
          const reqPath = decodeURIComponent(new URL(url).pathname);
          let fp = path.join(buildRoot, reqPath);
          if (fs.existsSync(fp) && fs.statSync(fp).isDirectory()) {
            fp = path.join(fp, 'index.html');
          }
          if (!fs.existsSync(fp) || !fs.statSync(fp).isFile()) {
            fp = path.join(buildRoot, '404.html');
            if (!fs.existsSync(fp)) fp = path.join(buildRoot, 'index.html');
          }
          if (!fileCache.has(fp)) fileCache.set(fp, fs.readFileSync(fp));
          const ext = path.extname(fp).toLowerCase();
          r.respond({
            status: 200,
            contentType: mimeMap[ext] || 'application/octet-stream',
            headers: { 'Cache-Control': 'public, max-age=3600' },
            body: fileCache.get(fp),
          });
        });
        while (cursor < routes.length) {
          const route = routes[cursor++];
          const result = { route, errors: [] };
          const onError = (e) => result.errors.push(e.message);
          page.on('pageerror', onError);
          try {
            await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
            await page.setViewport({ width: 390, height: 844 });
            await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 60000 });
            await new Promise((r) => setTimeout(r, 450));
            await page.waitForSelector('h1', { timeout: 30000 });
            await page.waitForFunction(() => {
              const img = document.querySelector('.pac-header .pac-original-logo');
              return img && img.complete && img.naturalWidth > 0;
            });
            await page.waitForFunction(
              () =>
                Array.from(document.querySelectorAll('.pac-coverage-photo img, .pac-film-scene-0 img')).every(
                  (i) => i.complete && i.naturalWidth > 0
                ),
              { timeout: 20000 }
            );
            await page.evaluate(async () => {
              for (const img of document.querySelectorAll('.pac-coverage-photo img, .pac-film-scene-0 img')) {
                if (img.decode) await img.decode().catch(() => {});
              }
            });

            const state = await page.evaluate(() => {
              const logo = document.querySelector('.pac-header .pac-original-logo');
              const lr = logo.getBoundingClientRect();
              const actions = document.querySelector('.pac-nav-actions').getBoundingClientRect();
              const heroImgs = Array.from(document.querySelectorAll('.pac-coverage-photo img'));
              return {
                h1: document.querySelectorAll('h1').length,
                h1Text: document.querySelector('h1')?.textContent?.trim() || '',
                hero: !!document.querySelector('.pac-coverage-hero'),
                cinema: !!document.querySelector('.pac-visual-film.is-enhanced, .pac-photo-journey'),
                heroImgCount: heroImgs.length,
                heroImgSrc: heroImgs[0]?.getAttribute('src') || '',
                broken: heroImgs.filter((i) => !i.naturalWidth).map((i) => i.src),
                legacyFourSlide: document.querySelectorAll('.pac-story-chapters, .pac-service-visual-story').length,
                hiddenIntroDetails: document.querySelectorAll('.pac-service-intro-details').length,
                logo: logo.getAttribute('src'),
                logoWidth: lr.width,
                logoOverlap: lr.right > actions.left + 1,
                logoRatio: lr.width / lr.height,
                overflow: document.documentElement.scrollWidth > innerWidth + 1,
              };
            });

            Object.assign(result, state);
            assert.equal(state.h1, 1, 'One heading');
            assert(state.h1Text.length > 5, 'Non-empty H1');
            assert.equal(state.logo, '/images/logo/pac-logo.png');
            assert(!state.logoOverlap, 'Logo overlaps navigation');
            assert(Math.abs(state.logoRatio - 414 / 151) < 0.02, 'Logo distorted');
            assert(!state.overflow, 'Mobile overflow');
            assert.deepEqual(state.broken, [], 'Broken hero images');
            assert.equal(state.legacyFourSlide, 0, 'Legacy 4-slide hero window still present');
            assert.equal(state.hiddenIntroDetails, 0, 'Hidden intro details still present');
            assert(state.hero || state.cinema, 'Missing hero');
            if (state.hero) {
              assert.equal(state.heroImgCount, 1, 'Single full-bleed hero image');
              for (const banned of ['/images/business/', 'building.webp', 'dryer-maintenance.jpg', 'dryerAppliance.webp']) {
                assert(!state.heroImgSrc.includes(banned), `Banned hero image ${banned} on ${route}`);
              }
            }

            await page.setViewport({ width: 1440, height: 960 });
            await page.evaluate(async () => {
              for (const img of document.querySelectorAll('.pac-coverage-photo img, .pac-film-scene-0 img')) {
                if (img.decode) await img.decode().catch(() => {});
              }
            });
            await new Promise((r) => setTimeout(r, 120));
            assert(
              !(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)),
              'Desktop overflow'
            );

            if (route === '/') {
              const scrollChapters = [];
              for (let ch = 0; ch < 8; ch++) {
                await page.evaluate((idx) => {
                  const el = document.querySelector('.pac-visual-film');
                  const stage = el.querySelector('.pac-film-stage');
                  const ratio = idx === 0 ? 0 : idx === 7 ? 1 : (idx + 0.25) / 8;
                  window.scrollTo({
                    top: window.scrollY + el.getBoundingClientRect().top + (el.offsetHeight - stage.clientHeight) * ratio,
                    behavior: 'instant',
                  });
                }, ch);
                await page.waitForFunction(
                  (idx) => document.querySelector('.pac-visual-film')?.dataset.activeChapter === String(idx),
                  { timeout: 5000 },
                  ch
                );
                await page.waitForFunction(
                  (idx) => {
                    const img = document.querySelector(`#air-chapter-${idx} img.pac-film-photo`);
                    return img && img.complete && img.naturalWidth > 0;
                  },
                  { timeout: 10000 },
                  ch
                );
                scrollChapters.push(ch);
                if ([0, 1, 2, 4, 6, 7].includes(ch)) {
                  await new Promise((r) => setTimeout(r, 120));
                  await page.screenshot({
                    path: `${out}/screenshots/home-chapter-${ch}-desktop.png`,
                  });
                }
              }
              assert.deepEqual(scrollChapters, [0, 1, 2, 3, 4, 5, 6, 7], 'All 8 homepage chapters scrolled');
              await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
              await new Promise((r) => setTimeout(r, 100));
            }

            if (shouldScreenshot(route)) {
              const slug = route.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '') || 'home';
              await page.screenshot({
                path: `${out}/screenshots/${slug}-desktop.png`,
              });
              await page.setViewport({ width: 390, height: 844 });
              await page.evaluate(() => window.scrollTo(0, 0));
              await new Promise((r) => setTimeout(r, 100));
              await page.screenshot({
                path: `${out}/screenshots/${slug}-mobile.png`,
              });
            }
          } catch (e) {
            result.errors.push(e.message);
            console.log('FAIL', route, e.message);
          } finally {
            page.off('pageerror', onError);
            results.push(result);
            fs.writeFileSync(
              out + '/audit.json',
              JSON.stringify({ total: routes.length, completed: results.length, results }, null, 2)
            );
            if (results.length % 25 === 0) console.log('Checked', results.length, '/', routes.length);
          }
        }
        await page.close();
      })
    );
  } finally {
    await browser.close();
  }
  console.log(
    JSON.stringify({
      total: results.length,
      failed: results.filter((r) => r.errors.length).length,
    })
  );
  process.exit(results.some((r) => r.errors.length) ? 1 : 0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
