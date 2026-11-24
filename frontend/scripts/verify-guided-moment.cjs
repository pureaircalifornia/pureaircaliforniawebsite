const puppeteer = require('puppeteer');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const base = process.env.AUDIT_BASE || 'http://127.0.0.1:4194';
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844 });
    await page.setRequestInterception(true);
    page.on('request', request => request.url().startsWith(base) || request.url().startsWith('data:') ? request.continue() : request.abort());
    await page.evaluateOnNewDocument(() => {
      window.__voiceCalls = [];
      window.__voiceCancels = 0;
      // CDP evaluation itself can grant activation. Model the two browser
      // states explicitly so test navigation cannot unlock speech by accident.
      Object.defineProperty(navigator, 'userActivation', { value: { get hasBeenActive() { return window.__testActivated === true; } } });
      Object.defineProperty(window, 'speechSynthesis', { value: {
        getVoices: () => [],
        speak: utterance => { window.__voiceCalls.push(utterance.text); utterance.onstart?.(); },
        cancel: () => window.__voiceCancels++,
      } });
    });
    await page.goto(base + '/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForSelector('.pac-film.is-enhanced');
    // Let the router's initial scroll restoration finish before moving to the
    // section. This is test navigation, not a visitor gesture.
    await new Promise(resolve => setTimeout(resolve, 1200));
    await page.$eval('#breathing-moment', element => element.scrollIntoView({ behavior: 'instant', block: 'center' }));
    await page.waitForFunction(() => document.querySelector('#breathing-moment').dataset.running === 'true').catch(async error => {
      console.log(await page.evaluate(() => ({ visibility: document.visibilityState, position: document.querySelector('#breathing-moment').getBoundingClientRect().toJSON(), scroll: scrollY, running: document.querySelector('#breathing-moment').dataset.running })));
      throw error;
    });
    await page.waitForFunction(() => document.querySelectorAll('.pac-meditation-controls button')[1].textContent.includes('Enable voice'));
    assert.equal(await page.evaluate(() => window.__voiceCalls.length), 0);
    await page.$eval('.pac-meditation-controls', element => element.scrollIntoView({ behavior: 'instant', block: 'center' }));
    await page.evaluate(() => { window.__testActivated = true; });
    await page.click('.pac-meditation-controls button:nth-child(2)');
    await page.waitForFunction(() => window.__voiceCalls.length > 0);
    await page.click('.pac-meditation-controls button:nth-child(2)');
    await page.waitForFunction(() => document.querySelectorAll('.pac-meditation-controls button')[1].getAttribute('aria-pressed') === 'false');
    console.log('Voice activation and mute passed; checking the full minute.');
    await page.waitForFunction(() => document.querySelector('#breathing-moment').dataset.complete === 'true', { timeout: 70000 });
    assert.equal(await page.$eval('#breathing-moment', element => element.dataset.running), 'false');
    await page.click('.pac-meditation-controls button:first-child');
    await page.waitForFunction(() => document.querySelector('#breathing-moment').dataset.running === 'true' && document.querySelector('#breathing-moment').dataset.complete === 'false');
    const report = { voiceGate: 'pass', voiceEnableMute: 'pass (mocked speech API)', automaticOneMinuteCompletion: 'pass', replay: 'pass', physicalAudio: 'not verified' };
    fs.writeFileSync('../docs/cinematic-home-2026-09-24/meditation-verification.json', JSON.stringify(report, null, 2));
    console.log(report);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
