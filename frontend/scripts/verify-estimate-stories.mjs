import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const loadTS = async path => import('data:text/javascript;base64,' + Buffer.from(ts.transpileModule(fs.readFileSync(path,'utf8'), {compilerOptions:{module:ts.ModuleKind.ES2022,target:ts.ScriptTarget.ES2022}}).outputText).toString('base64'));
const { preliminaryEstimate: price, estimateLead } = await loadTS('src/utils/estimate.ts');
const home='Home / apartment', commercial='Business / commercial';
for(const [property,service,size,expected] of [
 [home,'air-duct',100,299],[home,'air-duct',799,299],[home,'air-duct',800,300],[home,'air-duct',1500,1000],
 [commercial,'air-duct',100,499],[commercial,'air-duct',1500,1500],
 [home,'air-duct',null,null],[home,'air-duct',NaN,null],[home,'air-duct',-10,null],[home,'air-duct',100.2,null],[home,'air-duct',1000001,null],
 [home,'dryer-vent',null,149],[home,'filter',null,249],[commercial,'dryer-vent',null,null],[commercial,'filter',null,null],
 ['Managed property / HOA','air-duct',1500,null],[home,'other',1500,null]
]) assert.equal(price(property,service,size),expected);
const data={property:home,service:'air-duct',sqft:'1500',unsure:false,zip:'90049',name:' Test ',phone:'2135550100',email:'test@example.com',organization:'Example',address:'Test address',systems:'2',access:'Attic / crawlspace',timing:'Planning ahead',message:'Inspect access first.'};
const lead=estimateLead(data);
assert.equal(lead.estimated_price,1000);assert.equal(lead.square_footage,'1500');assert.equal(lead.name,'Test');assert.match(lead.address,/90049/);assert.match(lead.message,/Systems \/ units: 2/);assert.match(lead.message,/Attic/);assert.match(lead.message,/Planning ahead/);assert.match(lead.message,/Inspect access first/);
const unknown=estimateLead({...data,unsure:true});assert.equal(unknown.estimated_price,undefined);assert.equal(unknown.square_footage,undefined);
const dryer=estimateLead({...data,service:'dryer-vent'});assert.equal(dryer.estimated_price,149);assert.equal(dryer.square_footage,undefined);
const {getHeroChapters}=await loadTS('src/data/heroChapters.ts');
const {getPageHero}=await loadTS('src/data/pageHeroes.ts');
const heroSource=fs.readFileSync('src/data/pageHeroes.ts','utf8');
const routes=[...heroSource.matchAll(/"(\/[^"\n]+)":\s*\{/g)].map(x=>x[1]);
for(const path of routes){const chapters=getHeroChapters(path,getPageHero(path));assert.equal(chapters.length,3,path);assert.equal(new Set(chapters.map(x=>x.image)).size,3,path);for(const c of chapters){assert.ok(fs.existsSync('public'+c.image),c.image);assert.ok(c.alt.length>10);assert.ok(c.text.length<90);}}
console.log(`PASS: 17 estimate cases, lead payloads, and ${routes.length} route stories (distinct local images and short captions). No network requests made.`);
