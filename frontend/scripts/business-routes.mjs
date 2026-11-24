import fs from 'node:fs';
const catalog=JSON.parse(fs.readFileSync(new URL('../src/data/businessCatalog.json',import.meta.url),'utf8'));
const source=fs.readFileSync(new URL('../src/pages/locations/data.ts',import.meta.url),'utf8');
const cities=[...source.matchAll(/slug:\s*["']([^"']+)["']/g)].map(match=>match[1]);
export const businessRoutes=catalog.flatMap(market=>cities.map(city=>'/industries/'+market.slug+'/'+city));
if(new Set(businessRoutes).size!==businessRoutes.length) throw new Error('Duplicate business routes');
