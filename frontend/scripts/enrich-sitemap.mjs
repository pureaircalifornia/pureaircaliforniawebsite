import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Use the final, rendered page metadata so image discovery cannot drift from
// route-specific content. Run after prerender and before the release SEO gate.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const build = path.join(root, 'build');
const sitemapFile = path.join(build, 'sitemap.xml');
const origin = 'https://www.pureaircalifornia.com';
const escapeXml = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
let images = 0;
let dates = 0;
let sitemap = fs.readFileSync(sitemapFile, 'utf8');
if (!sitemap.includes('xmlns:image=')) {
  sitemap = sitemap.replace('<urlset ', '<urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" ');
}
sitemap = sitemap.replace(/<url>[\s\S]*?<\/url>/g, entry => {
  const pageUrl = entry.match(/<loc>([^<]+)<\/loc>/)?.[1];
  if (!pageUrl || new URL(pageUrl).origin !== origin) throw new Error('Invalid sitemap URL');
  const html = fs.readFileSync(path.join(build, new URL(pageUrl).pathname, 'index.html'), 'utf8');
  const nodes = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .flatMap(match => { const schema = JSON.parse(match[1]); return schema['@graph'] || (Array.isArray(schema) ? schema : [schema]); });
  const page = nodes.find(node => node['@id'] === pageUrl + '#webpage');
  const image = page?.primaryImageOfPage?.contentUrl;
  if (!image) throw new Error(`Missing primary image: ${pageUrl}`);
  const imageUrl = new URL(image);
  if (imageUrl.origin !== origin || !fs.existsSync(path.join(build, decodeURIComponent(imageUrl.pathname)))) {
    throw new Error(`Primary image is not a deployed local asset: ${pageUrl}`);
  }
  images++;
  const modified = page?.dateModified;
  let datedEntry = entry.replace(/\s*<lastmod>[^<]*<\/lastmod>/g, '');
  // A build timestamp is not an editorial update. Require the page to display
  // the same explicit date as its WebPage metadata before including lastmod.
  if (modified) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(modified) || !html.includes(`dateTime="${modified}"`) && !html.includes(`datetime="${modified}"`)) {
      throw new Error(`Modification date lacks a matching visible date: ${pageUrl}`);
    }
    datedEntry = datedEntry.replace('</loc>', `</loc>\n    <lastmod>${modified}</lastmod>`);
    dates++;
  }
  return datedEntry.replace(/\s*<image:image>[\s\S]*?<\/image:image>/g, '')
    .replace('</url>', `  <image:image><image:loc>${escapeXml(image)}</image:loc></image:image>\n  </url>`);
});
fs.writeFileSync(sitemapFile, sitemap);
fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), sitemap);
console.log(`Sitemap enriched: ${images} verified primary images; ${dates} explicit editorial dates.`);
