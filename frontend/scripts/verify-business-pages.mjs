import fs from 'node:fs';
import puppeteer from 'puppeteer';
const catalog=JSON.parse(fs.readFileSync('src/data/businessCatalog.json','utf8'));
const out='../docs/business-location-review';
const browser=await puppeteer.launch({headless:true,args:['--no-sandbox']});
const page=await browser.newPage();const errors=[];const results=[];
page.on('pageerror',e=>errors.push(e.message));
await page.setRequestInterception(true);page.on('request',r=>{if(r.url().startsWith('http://127.0.0.1:4186')||r.url().startsWith('data:'))r.continue();else r.abort()});
const inspect=async(route,width)=>{
 await page.setViewport({width,height:844});await page.goto('http://127.0.0.1:4186'+route,{waitUntil:'domcontentloaded'});await page.waitForSelector('h1');
 await page.waitForFunction(()=>[...document.querySelectorAll('.pac-story-image')].every(i=>i.complete&&i.naturalWidth>0));
 const state=await page.evaluate(()=>({path:location.pathname,h1:document.querySelector('h1')?.textContent,title:document.title,overflow:document.documentElement.scrollWidth>innerWidth+1,overlay:!!document.querySelector('vite-error-overlay'),chapters:document.querySelectorAll('.pac-story-chapters button').length,form:document.querySelector('textarea')?.value,canonical:document.querySelector('link[rel="canonical"]')?.href,images:[...document.querySelectorAll('.pac-story-image')].map(i=>({src:i.getAttribute('src'),loaded:!!i.naturalWidth}))}));
 if(state.overflow||state.overlay||state.chapters!==3)errors.push(route+' layout/hero failure '+JSON.stringify(state));results.push({...state,width});return state;
};
try{
 for(const market of catalog){await inspect(market.parentPath,1152);await inspect(`/industries/${market.slug}/santa-monica/`,390);if(market.slug==='education'){await page.screenshot({path:out+'/santa-monica-mobile.png'});await page.setViewport({width:1152,height:778});await page.screenshot({path:out+'/santa-monica-desktop.png'});await page.$eval('.pac-business-enquiry',el=>el.scrollIntoView({behavior:'instant',block:'start'}));await new Promise(r=>setTimeout(r,1500));await page.screenshot({path:out+'/enquiry-desktop.png'});}}
 await inspect('/industries/commercial-real-estate/deer-lake-highlands/',320);
 await page.setViewport({width:1152,height:778});await page.goto('http://127.0.0.1:4186/industries/',{waitUntil:'domcontentloaded'});await page.waitForSelector('.pac-business-filters input');await new Promise(r=>setTimeout(r,1200));await page.select('.pac-business-filters select','education');await page.type('.pac-business-filters input','90401');
 const filtered=await page.$$eval('.pac-area-groups a',a=>a.map(x=>({text:x.textContent,href:x.getAttribute('href')})));if(filtered.length!==1||!filtered[0].href.includes('/education/santa-monica/'))errors.push('ZIP directory filtering failed');
 await page.$eval('.pac-area-groups a',el=>el.scrollIntoView({block:'center',behavior:'instant'}));await new Promise(r=>setTimeout(r,1200));await page.click('.pac-area-groups a');await page.waitForFunction(()=>location.pathname==='/industries/education/santa-monica/');await page.waitForSelector('textarea');if(!await page.$eval('textarea',el=>el.value.includes('Schools & education in Santa Monica')))errors.push('Prefill failed');
 if(await page.$eval('.pac-callback form',form=>form.checkValidity()))errors.push('Blank enquiry should not be valid');
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await new Promise(r=>setTimeout(r,1500));await page.click('[aria-label="Chapter 2: Room to breathe"]');const active=()=>page.$eval('.pac-story-chapters [aria-pressed="true"]',el=>el.getAttribute('aria-label'));if(!(await active()).includes('Chapter 2'))errors.push('Manual chapter failed');
 await page.click('[aria-label="Play hero story"]');if(!(await active()).includes('Chapter 3'))errors.push('Play chapter failed');await page.click('[aria-label="Pause hero story"]');const paused=await active();await new Promise(r=>setTimeout(r,6800));if(await active()!==paused)errors.push('Pause failed');
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);await page.reload({waitUntil:'domcontentloaded'});await page.waitForSelector('.pac-motion-note');if(await page.$('.pac-story-play'))errors.push('Reduced motion autoplay control present');
 await page.setViewport({width:1440,height:900});await page.goto('http://127.0.0.1:4186/industries/',{waitUntil:'domcontentloaded'});await page.waitForSelector('.pac-business-card');await page.screenshot({path:out+'/industries-desktop.png',fullPage:true});
 await page.goto('http://127.0.0.1:4186/industries/education/not-a-city/',{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>document.querySelector('meta[name="robots"]')?.content.includes('noindex'));
}catch(e){errors.push(page.url()+' '+e.stack);await page.screenshot({path:out+'/failure.png'})}finally{await browser.close()}
fs.writeFileSync(out+'/browser-audit.json',JSON.stringify({results,errors},null,2));console.log(JSON.stringify({pages:results.length,errors},null,2));if(errors.length)process.exitCode=1;
