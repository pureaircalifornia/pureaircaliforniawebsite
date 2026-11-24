import fs from 'node:fs';
import puppeteer from 'puppeteer';

const output = '../docs/SEO/lead-growth-2026-10-13';
const routes = ['/project-stories/', '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/', '/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles/', ...['four-seasons-los-angeles-ventilation', 'westchester-ymca-ventilation', 'panera-pasadena-ventilation'].map(slug => `/case-studies/${slug}/`)];
const browser = await puppeteer.launch({headless:true});
const results = [], errors = [];
try {
  const page = await browser.newPage();
  page.on('pageerror', error => errors.push(String(error)));
  for (const width of [1440, 390, 320]) {
    await page.setViewport({width, height:900});
    for (const route of routes) {
      const response = await page.goto('http://127.0.0.1:4178' + route, {waitUntil:'networkidle0'});
      await page.evaluate(async () => { await document.fonts.ready; });
      const necessary = await page.$('.pac-privacy-choices > div > button:first-child');
      if (necessary) await necessary.click();
      const result = await page.evaluate(() => ({
        title: document.title,
        headingCount: document.querySelectorAll('h1').length,
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        robots: document.querySelector('meta[name="robots"]')?.content,
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        callLinks: [...document.querySelectorAll('main a[href^="tel:"]')].map(a=>a.getAttribute('href')),
        brokenImages: [...document.images].filter(i=>i.loading!=='lazy' && (!i.complete || !i.naturalWidth)).map(i=>i.src),
      }));
      results.push({route,width,status:response.status(),...result});
      if(response.status()!==200 || result.headingCount!==1 || result.overflow || result.brokenImages.length || /noindex/.test(result.robots || '') || result.canonical!=='https://www.pureaircalifornia.com'+route || !result.callLinks.length || result.callLinks.some(h=>!['tel:+12137924145','tel:2137924145'].includes(h))) errors.push({route,width,result});
      if(width!==320 && route===routes[1]) await page.screenshot({path:`${output}/commercial-${width}.png`,fullPage:true});
      if(route===routes[1]) {
        const summary=await page.$('.pac-lead-faq summary');
        await summary.click();
        try { await page.waitForFunction(()=>document.querySelector('.pac-lead-faq details')?.open,{timeout:1500}); }
        catch { errors.push(`FAQ failed to open at ${width}px`); await page.screenshot({path:`${output}/faq-failure-${width}.png`}); }
        await page.$eval('main a[href*="property=managed"]',a=>a.click());
        await page.waitForSelector('#estimate-builder');
        if(!page.url().includes('property=managed')) errors.push('Managed-property estimate routing failed');
      }
    }
  }
  const checklist = await fetch('http://127.0.0.1:4178/resources/hoa-facility-planning-checklist.txt');
  if(!checklist.ok || !(await checklist.text()).includes('213')) errors.push('Planning checklist missing');
} finally { await browser.close(); }
fs.writeFileSync(`${output}/browser-qa.json`,JSON.stringify({results,errors},null,2));
console.log(JSON.stringify({checks:results.length,errors},null,2));
if(errors.length) process.exitCode=1;
