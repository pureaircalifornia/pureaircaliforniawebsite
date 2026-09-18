const fs = require('fs');
const assert = require('node:assert/strict');
const puppeteer = require('puppeteer');
const out = '../docs/SEO/local-authority-2026-09-12';
const base = process.env.AUDIT_BASE || 'http://127.0.0.1:4175';
const results = [];
(async () => {
 fs.mkdirSync(out + '/screenshots', {recursive:true});
 const browser = await puppeteer.launch({headless:true,args:['--no-sandbox']});
 try {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', r => r.url().startsWith(base) || r.url().startsWith('data:') ? r.continue() : r.abort());
  for (const slug of ['brentwood','culver-city','century-city']) {
   await page.setViewport({width:1280,height:900});
   await page.goto(base + '/locations/' + slug + '/', {waitUntil:'networkidle2'});
   const data = await page.evaluate(() => {
    const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(el => {const data=JSON.parse(el.textContent);return data['@graph'] || [data]});
    return {schemas, text:document.body.innerText, iframes:[...document.querySelectorAll('iframe')].map(x=>x.src), h1:document.querySelectorAll('h1').length};
   });
   const service = data.schemas.find(s=>s['@type']==='Service' && s['@id']?.endsWith('#service'));
   assert.equal(service.areaServed['@type'],'Place');
   assert.equal(service.provider['@id'],'https://www.pureaircalifornia.com/#business');
   assert.ok(!JSON.stringify(service).includes('wikipedia'));
   if(slug!=='culver-city')assert.equal(service.areaServed.containedInPlace.name,'Los Angeles, California');
   assert.equal(data.h1,1);
   assert.ok(data.text.includes('For your home') && data.text.includes('For your business'));
   for(const faq of data.schemas.find(s=>s['@type']==='FAQPage').mainEntity){assert.ok(data.text.includes(faq.name));assert.ok(data.text.includes(faq.acceptedAnswer.text));}
   assert.ok(!data.iframes.some(src=>src.includes('key=&')));
   await page.$eval('.pac-local-guide',el=>el.scrollIntoView({behavior:'instant',block:'start'}));
   await page.screenshot({path:out+'/screenshots/'+slug+'-desktop.png'});
   await page.setViewport({width:390,height:844});
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
   await page.screenshot({path:out+'/screenshots/'+slug+'-mobile.png'});
   results.push({test:slug+' geography, FAQ and responsive layout',passed:true});
  }
  await page.goto(base+'/',{waitUntil:'networkidle2'});
  for(const slug of ['brentwood','culver-city','century-city'])assert.ok(await page.$('a[href="/locations/'+slug+'/"]'));
  assert.equal(await page.$$eval('.pac-client-card',els=>els.length),4);
  await page.$$eval('.pac-client-card img',els=>Promise.all(els.map(i=>{i.loading='eager';return i.decode()})));
  assert.ok(await page.$$eval('.pac-client-card img',els=>els.every(i=>i.naturalWidth>0)));
  await page.$eval('.pac-commercial-proof',el=>el.scrollIntoView({behavior:'instant',block:'start'}));
  await page.screenshot({path:out+'/screenshots/commercial-proof-mobile.png'});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
  await page.setViewport({width:1280,height:900});
  await page.$eval('.pac-commercial-proof',el=>el.scrollIntoView({behavior:'instant',block:'start'}));
  await page.screenshot({path:out+'/screenshots/commercial-proof-desktop.png'});
  results.push({test:'Home priority links and four commercial project cards',passed:true});
  for(const slug of ['soulcycle-westside-dryer-vents','taco-bell-canoga-park-hvac','bassett-torrance-showroom','nonprofit-housing-office-hvac']){
   await page.goto(base+'/case-studies/'+slug+'/',{waitUntil:'networkidle2'});
   assert.equal(await page.$$eval('h1',els=>els.length),1);
   assert.ok(await page.$('.pac-page-hero-photo'));
   assert.ok(await page.$('a[href^="tel:"]'));
   const text=await page.$eval('main',el=>el.innerText);
   assert.ok(text.includes('Scope of work') && text.includes('Project summary'));
   results.push({test:slug+' project page',passed:true});
  }
  const robots=fs.readFileSync('public/robots.txt','utf8');
  assert.equal((robots.match(/User-agent:/g)||[]).length,1);
  assert.ok(robots.includes('Disallow: /admin') && robots.includes('Disallow: /api/'));
  const sitemap=fs.readFileSync('public/sitemap.xml','utf8');
  for(const slug of ['soulcycle-westside-dryer-vents','taco-bell-canoga-park-hvac','bassett-torrance-showroom'])assert.ok(sitemap.includes('/case-studies/'+slug+'/'));
  results.push({test:'New project sitemap entries and universal crawler exclusions',passed:true});
 } finally {await browser.close(); fs.writeFileSync(out+'/local-authority-tests.json',JSON.stringify(results,null,2));}
 console.log(JSON.stringify({passed:results.length,results},null,2));
})().catch(error=>{console.error(error);process.exitCode=1;});
