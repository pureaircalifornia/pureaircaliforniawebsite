const fs = require('node:fs');
const assert = require('node:assert/strict');
const puppeteer = require('puppeteer');
const base = process.env.AUDIT_BASE || 'http://127.0.0.1:4186';
const out = '../docs/nature-refresh';
const report = [];
const routes = ['/', '/about/', '/health-benefits/', '/services/residential-air-duct-cleaning/', '/services/commercial-air-duct-cleaning/', '/industries/hospitality/', '/locations/santa-monica/', '/quote/'];
(async () => {
  const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']});
  try {
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', r => r.url().startsWith(base) || r.url().startsWith('data:') ? r.continue() : r.abort());
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    for (const width of [1440, 390]) {
      await page.setViewport({width, height: 960});
      for (const route of routes) {
        await page.goto(base + route, {waitUntil: 'networkidle0'});
        await page.waitForSelector('.pac-breath-pause');
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
        assert.equal(overflow, false, `Overflow ${route} ${width}`);
        assert.equal(await page.$$eval('h1', es => es.length), 1, `H1 ${route}`);
        assert.equal(await page.$$eval('.pac-breath-pause', es => es.length), 1);
        for (const selector of ['.pac-breath-mission', '.pac-everyday-air', '.pac-breath-pause']) {
          const element = await page.$(selector);
          if (!element) continue;
          await element.evaluate(e => e.scrollIntoView({behavior:'instant',block:'center'}));
          await page.waitForFunction(s => [...document.querySelectorAll(s+' img')].every(i => i.complete && i.naturalWidth > 0), {timeout:15000}, selector);
          if (route === '/') await element.screenshot({path:`${out}/${width}-${selector.slice(1)}.png`});
        }
        assert.equal(errors.length, 0, errors.join('\n'));
        report.push({route,width,overflow:false,images:'pass',runtime:'pass'});
      }
      await page.goto(base+'/',{waitUntil:'networkidle0'});
      await page.screenshot({path:`${out}/${width}-hero.png`});
      await page.click('.pac-hero-mission-link');
      await page.waitForFunction(()=>Math.abs(document.querySelector('#our-mission').getBoundingClientRect().top)<200);
      assert.equal(await page.evaluate(()=>location.hash),'#our-mission');
      await page.$eval('.pac-breath-mission .pac-text-link',e=>e.click());
      await page.waitForFunction(()=>location.pathname==='/about/' && location.hash==='#our-mission');
      await page.waitForSelector('#purpose-title');
      await page.waitForFunction(()=>{const r=document.querySelector('#our-mission')?.getBoundingClientRect();return r&&r.top>=0&&r.top<200});
      await page.$eval('.pac-breath-pause',e=>e.scrollIntoView({behavior:'instant',block:'center'}));
      await page.locator('.pac-breath-toggle').click();
      assert.equal(await page.$eval('.pac-breath-toggle',e=>e.getAttribute('aria-pressed')),'true');
      await page.waitForFunction(()=>getComputedStyle(document.querySelector('.pac-breath-orbit>span')).animationName==='pac-quiet-breath');
      await page.locator('.pac-breath-toggle').click();
      assert.equal(await page.$eval('.pac-breath-toggle',e=>e.getAttribute('aria-pressed')),'false');
      await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
      await page.waitForFunction(()=>!document.querySelector('.pac-breath-toggle'));
      assert.equal(await page.$eval('.pac-breath-orbit>span',e=>getComputedStyle(e).animationName),'none');
      await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'no-preference'}]);
      report.push({width,missionNavigation:'pass',breathingControls:'pass',reducedMotion:'pass'});
    }
    await page.setViewport({width:320,height:740});
    await page.goto(base+'/about/#our-mission',{waitUntil:'networkidle0'});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'320px overflow');
    report.push({width:320,overflow:false});
  } finally { await browser.close(); fs.writeFileSync(out+'/verification.json',JSON.stringify(report,null,2)); }
  console.log(JSON.stringify(report,null,2));
})().catch(e=>{console.error(e);process.exitCode=1});


