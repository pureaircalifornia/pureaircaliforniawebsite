import assert from 'node:assert/strict';
import fs from 'node:fs';
import { build } from 'esbuild';
const loadTS = async path => {
 const result = await build({ entryPoints:[path], bundle:true, write:false, platform:'node', format:'esm' });
 return import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
};
const { estimateLead } = await loadTS('src/utils/estimate.ts');
const home='Home / apartment';
const data={property:home,service:'air-duct',sqft:'1500',unsure:false,zip:'90049',name:' Test ',phone:'2135550100',email:'test@example.com',organization:'Example',address:'Test address',systems:'2',access:'Attic / crawlspace',timing:'Planning ahead',message:'Inspect access first.'};
const lead=estimateLead(data);
assert.equal(lead.estimated_price,undefined);assert.equal(lead.square_footage,'1500');assert.equal(lead.name,'Test');assert.match(lead.address,/90049/);assert.match(lead.message,/Systems \/ units: 2/);assert.match(lead.message,/Attic/);assert.match(lead.message,/Planning ahead/);assert.match(lead.message,/Inspect access first/);
const unknown=estimateLead({...data,unsure:true});assert.equal(unknown.estimated_price,undefined);assert.equal(unknown.square_footage,undefined);
const dryer=estimateLead({...data,service:'dryer-vent'});assert.equal(dryer.estimated_price,undefined);assert.equal(dryer.square_footage,undefined);
let estimateCases=0;
for(const property of [home,'Business / commercial','Managed property / HOA','Private home / estate']) for(const service of ['air-duct','dryer-vent','filter','other']) { const request=estimateLead({...data,property,service}); assert.equal(request.estimated_price,undefined); assert.match(request.message,/PAC must confirm the scope/); assert.equal(request.property_type,property); estimateCases++; }
const {getHeroChapters}=await loadTS('src/data/heroChapters.ts');
const {getPageHero}=await loadTS('src/data/pageHeroes.ts');
const heroSource=fs.readFileSync('src/data/pageHeroes.ts','utf8');
const routes=[...heroSource.matchAll(/"(\/[^"\n]+)":\s*\{/g)].map(x=>x[1]);
for(const path of routes){const chapters=getHeroChapters(path,getPageHero(path));assert.ok(chapters.length>=3,path);assert.equal(new Set(chapters.map(x=>x.image)).size,chapters.length,path);for(const c of chapters){assert.ok(fs.existsSync('public'+c.image),c.image);assert.ok(c.alt.length>10);assert.ok(c.text.trim().length>0, path+' needs a readable caption');}}
console.log(`PASS: ${estimateCases} tailored estimate cases, lead payloads, and ${routes.length} route stories (distinct local images and nonempty captions). No network requests made.`);
