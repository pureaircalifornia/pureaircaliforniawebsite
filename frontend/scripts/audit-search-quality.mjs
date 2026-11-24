import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const build=path.join(root,'build');
const report=process.argv[2]||path.join(root,'../docs/SEO/all-page-quality-2026-09-12/search-quality.json');
const urls=[...fs.readFileSync(path.join(build,'sitemap.xml'),'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
const decode=s=>s.replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const attr=(tag,name)=>decode((tag.match(new RegExp('\\b'+name+'="([^"]*)"'))||[])[1]||'');
const pages=[],errors=[];
for(const url of urls){
 const route=new URL(url).pathname;
 const html=fs.readFileSync(path.join(build,route,'index.html'),'utf8');
 const metas=[...html.matchAll(/<meta\b[^>]*>/gi)].map(m=>m[0]);
 const meta=key=>metas.filter(m=>attr(m,'name')===key||attr(m,'property')===key).map(m=>attr(m,'content'));
 const nodes=[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].flatMap(m=>{const node=JSON.parse(m[1]);return Array.isArray(node)?node:node['@graph']||[node]});
 const issues=[];
 const check=(ok,message)=>{if(!ok)issues.push(message)};
 const image=meta('og:image')[0];
 check(meta('og:image').length===1&&!!image,'Expected one social image');
 check(meta('twitter:image')[0]===image,'Social image mismatch');
 check(!!meta('og:image:alt')[0]&&!!meta('twitter:image:alt')[0],'Missing social image description');
 if(image){const parsed=new URL(image);if(parsed.origin===new URL(url).origin)check(fs.existsSync(path.join(build,decodeURIComponent(parsed.pathname))),'Missing social image file: '+parsed.pathname)}
 for(const key of ['geo.position','ICBM','keywords'])check(meta(key).length===0,'Obsolete or misleading metadata: '+key);
 const web=nodes.filter(n=>['WebPage','AboutPage','ContactPage','CollectionPage'].includes(n['@type']));
 check(web.length===1,'Expected one page entity');
 const page=web[0];
 if(page){check(page['@id']===url+'#webpage'&&page.url===url,'Page identity mismatch');check(page.primaryImageOfPage?.url===image,'Page image mismatch');if(page.mainEntity)check(nodes.some(n=>n['@id']===page.mainEntity['@id']),'Missing referenced main entity')}
 check(nodes.filter(n=>n['@type']==='WebSite').length===1,'Duplicate or missing website entity');
 const articles=nodes.filter(n=>['Article','BlogPosting'].includes(n['@type']));
 const isBlog=route.startsWith('/blog/')&&route!=='/blog/';
 const isCase=route.startsWith('/case-studies/')&&route!=='/case-studies/';
 if(isBlog||isCase){check(articles.length===1,'Expected one article entity');const a=articles[0];if(a){check(a['@id']===url+'#article','Article identity mismatch');check(a.author?.['@type']==='Organization'&&a.author.name==='Pure Air California','Article author mismatch');check(a.image===image,'Article image mismatch');if(isBlog){check(a['@type']==='BlogPosting','Missing BlogPosting type');check(/^\d{4}-\d{2}-\d{2}$/.test(a.datePublished||''),'Invalid publication date');check(a.dateModified==='2026-09-12','Missing revision date');check(a.datePublished<=a.dateModified,'Revision predates publication');check(a.citation?.length>0,'Missing source citations');check(html.includes('datetime="2026-09-12"'),'Missing visible revision date');for(const source of a.citation||[])check(html.includes('href="'+source+'"'),'Source not visible: '+source)}}
 }else check(articles.length===0,'Unexpected article entity');
 const services=nodes.filter(n=>n['@type']==='Service'&&n['@id']===url+'#service');
 for(const service of services)check(service.provider?.['@id']==='https://www.pureaircalifornia.com/#business','Service provider identity mismatch');
 if(isBlog){for(const match of html.matchAll(/href="#(section-\d+)"/g))check(html.includes('id="'+match[1]+'"'),'Missing article section target: '+match[1]);const breadcrumbs=nodes.filter(n=>n['@type']==='BreadcrumbList');check(breadcrumbs.length===1,'Expected one article breadcrumb');check(breadcrumbs[0]?.itemListElement?.at(-1)?.item===url,'Breadcrumb destination mismatch')}
 const visible=decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<[^>]+>/g,' '));
 if(isBlog)check(!/Dr\. Sarah|25\s*[–-]\s*40%|8\s*[–-]\s*11%/.test(visible),'Retired unsupported article claim');
 errors.push(...issues.map(issue=>route+': '+issue));pages.push({route,article:articles.length,service:services.length,image,errors:issues});
}
fs.mkdirSync(path.dirname(report),{recursive:true});fs.writeFileSync(report,JSON.stringify({checkedAt:new Date().toISOString(),checked:pages.length,errors,pages},null,2));
console.log(JSON.stringify({checked:pages.length,errors,report},null,2));if(errors.length)process.exitCode=1;
