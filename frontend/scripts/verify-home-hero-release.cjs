const puppeteer = require('puppeteer');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const base = process.env.PAC_HERO_URL || 'http://127.0.0.1:4198/';
const out = '../docs/home-hero-photo-2026-09-27';
(async () => {
 fs.mkdirSync(out, {recursive:true});
 const browser = await puppeteer.launch({headless:true});
 const results=[];
 try {
  for (const [width,height,touch] of [[320,568,true],[390,844,true],[768,1024,true],[1024,768,true],[844,390,true],[667,375,true],[1440,900,false],[1920,1080,false]]) {
   const page=await browser.newPage(); const errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.setViewport({width,height,isMobile:touch,hasTouch:touch});
   await page.goto(base,{waitUntil:'networkidle2'});
   await page.waitForSelector('.pac-film.is-enhanced');
   const move=async i=>{
    await page.evaluate(i=>{const el=document.querySelector('.pac-film');const stage=el.querySelector('.pac-film-stage');window.scrollTo({top:scrollY+el.getBoundingClientRect().top+(el.offsetHeight-stage.clientHeight)*(i===6?1:i/6.35),behavior:'instant'});},i);
    await page.waitForFunction(i=>document.querySelector('.pac-film').dataset.activeChapter===String(i),{},i);
   };
   for(const i of [0,1,2,3,4,5,6,5,4,3,2,1,0]){
    await move(i);
    const fit=await page.evaluate(i=>{
     const el=document.querySelector(`#air-chapter-${i} .pac-film-copy`);const r=el.getBoundingClientRect();
     const controls=document.querySelector('.pac-film-controls').getBoundingClientRect();const dock=document.querySelector('.pac-contact-dock');const d=dock.getBoundingClientRect();return {top:r.top,bottom:r.bottom,controls:controls.top,dockOverlap:getComputedStyle(dock).display!=='none'&&controls.bottom>d.top+1,overflow:document.documentElement.scrollWidth>innerWidth+1};
    },i);
    assert(!fit.dockOverlap,JSON.stringify({width,height,i,fit}));
    assert(!fit.overflow,JSON.stringify({width,height,i,fit}));
    assert(fit.bottom<=fit.controls+2,JSON.stringify({width,height,i,fit}));
   }
   const client=await page.createCDPSession();
   if(touch){for(let swipe=0;swipe<2;swipe++){await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:width*.75,y:height*.8}]});for(let step=1;step<=12;step++){await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:width*.75,y:height*(.8-step*.05)}]});await new Promise(r=>setTimeout(r,20));}await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await new Promise(r=>setTimeout(r,250));}}
   else {await page.mouse.move(width*.7,height*.6);await page.mouse.wheel({deltaY:height*1.4});}
   await page.waitForFunction(()=>Number(document.querySelector('.pac-film').dataset.activeChapter)>0);
   await move(1);
   await page.waitForFunction(()=>{const i=document.querySelector('#air-chapter-1 img');return i.complete&&i.naturalWidth>0});
   const photo=await page.$eval('#air-chapter-1 img',i=>i.currentSrc);
   assert(photo.includes('la-skyline-cedric'));
   await page.screenshot({path:`${out}/${base.startsWith('https')?'live':'local'}-${width}x${height}.png`});
   await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
   await page.waitForSelector('.pac-film:not(.is-enhanced)');
   assert.equal(await page.$$eval('.pac-film-scene',s=>s.filter(e=>getComputedStyle(e).visibility!=='hidden'&&!e.inert).length),7);
   assert.deepEqual(errors,[]);
   results.push({width,height,touch,forwardReverse:'passed',nativeScroll:'passed',photo,reducedMotion:'passed'});
   console.log(width,height,'passed');await page.close();
  }
 } finally {await browser.close();fs.writeFileSync(`${out}/${base.startsWith('https')?'live':'local'}-scroll-checks.json`,JSON.stringify(results,null,2));}
})().catch(e=>{console.error(e);process.exit(1)});


