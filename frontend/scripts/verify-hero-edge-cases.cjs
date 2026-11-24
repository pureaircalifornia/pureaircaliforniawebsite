const puppeteer = require('puppeteer');
const fs = require('node:fs');
const assert = require('node:assert/strict');

const base = process.env.AUDIT_BASE || 'http://127.0.0.1:4195';

(async () => {
  const b = await puppeteer.launch({ headless: true });
  const out = '../docs/cinematic-home-2026-09-24/sitewide-heroes-final';
  fs.mkdirSync(out + '/screenshots', { recursive: true });
  try {
    const p = await b.newPage();

    // 1. Estate query parameter override on /services/residential-air-duct-cleaning?property=estate
    await p.setViewport({ width: 1440, height: 960 });
    await p.goto(base + '/services/residential-air-duct-cleaning/?property=estate', {
      waitUntil: 'domcontentloaded',
    });
    await p.waitForSelector('.pac-coverage-hero h1');
    const estateHero = await p.evaluate(() => ({
      h1: document.querySelector('h1')?.textContent || '',
      img: document.querySelector('.pac-coverage-photo img')?.getAttribute('src') || '',
    }));
    assert(estateHero.h1.includes('Estates'), 'Estate H1 should mention Estates');
    assert.equal(estateHero.img, '/images/pac/homeInterior.webp', 'Estate hero should use homeInterior.webp');

    // 2. Image error fallback on /pricing/ when primary hero image fails to load
    await p.goto(base + '/pricing/', { waitUntil: 'domcontentloaded' });
    await p.waitForSelector('.pac-coverage-photo img');
    await p.evaluate(() => {
      const i = document.querySelector('.pac-coverage-photo img');
      if (i) {
        i.removeAttribute('srcset');
        i.setAttribute('src', '/images/nonexistent-broken-hero.webp');
      }
    });
    await p.waitForFunction(() => {
      const i = document.querySelector('.pac-coverage-photo img');
      return i && i.complete && i.naturalWidth > 0 && i.getAttribute('src') === '/images/pac/losAngeles.webp';
    });
    assert(
      await p.evaluate(() => document.querySelector('h1').textContent.toLowerCase().includes('pricing'))
    );
    console.log('Hero edge cases passed: estate override + failed image fallback');
    fs.writeFileSync(
      out + '/edge-cases.json',
      JSON.stringify({ estateOverride: 'pass', failedOpeningImageFallback: 'pass' }, null, 2)
    );
  } finally {
    await b.close();
  }
})()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
