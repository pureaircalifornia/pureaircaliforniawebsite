import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const build = path.join(root, 'build');
const report = process.argv[2] || path.join(root, '../docs/SEO/cinematic-2026-09-12/page-audit.json');
const origin = 'https://www.pureaircalifornia.com';
const urls = [...fs.readFileSync(path.join(build, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
const attr = (tag, name) =>
  decode((tag.match(new RegExp('\\b' + name + '="([^" ]*(?: [^"]*)?)"')) || [])[1] || '');

const pages = [];
const errors = [];
const warnings = [];
const titles = new Map();
const descriptions = new Map();

for (const url of urls) {
  const pathname = new URL(url).pathname;
  const file = path.join(build, pathname, 'index.html');
  if (!fs.existsSync(file)) {
    errors.push(url + ': missing static HTML');
    continue;
  }
  const html = fs.readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '');
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]);
  const desc = metas.filter((t) => attr(t, 'name') === 'description');
  const description = desc.length ? attr(desc[0], 'content') : '';
  const canonicals = [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((m) => m[0])
    .filter((t) => attr(t, 'rel') === 'canonical');
  const canonical = canonicals.length ? attr(canonicals[0], 'href') : '';
  const h1 = (html.match(/<h1[\s>]/gi) || []).length;
  const pageErrors = [];
  let schemaCount = 0;
  let breadcrumbCount = 0;

  if (!title) pageErrors.push('Missing title');
  if (desc.length !== 1 || !description) pageErrors.push('Expected one non-empty description');
  if (canonicals.length !== 1 || canonical !== url) pageErrors.push('Canonical mismatch: ' + canonical);
  if (h1 !== 1) pageErrors.push('Expected one H1, found ' + h1);
  if (metas.some((t) => attr(t, 'name') === 'robots' && attr(t, 'content').includes('noindex'))) {
    pageErrors.push('Sitemapped page is noindex');
  }

  for (const m of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(m[1]);
      schemaCount++;
      const nodes = Array.isArray(parsed) ? parsed : parsed['@graph'] || [parsed];
      for (const n of nodes) {
        if (n && n['@type'] === 'BreadcrumbList') breadcrumbCount++;
      }
    } catch {
      pageErrors.push('Invalid JSON-LD');
    }
  }
  if (!schemaCount) pageErrors.push('Missing structured data');

  // Verify og:image presence and local asset integrity
  const ogImages = metas.filter((t) => attr(t, 'property') === 'og:image');
  const ogImage = ogImages.length ? attr(ogImages[0], 'content') : '';
  if (!ogImage) {
    warnings.push(pathname + ': missing og:image');
  } else {
    try {
      const parsedImg = new URL(ogImage);
      if (
        parsedImg.origin === origin &&
        !fs.existsSync(path.join(build, decodeURIComponent(parsedImg.pathname)))
      ) {
        pageErrors.push('Missing og:image asset: ' + parsedImg.pathname);
      }
    } catch {
      warnings.push(pathname + ': invalid og:image URL (' + ogImage + ')');
    }
  }

  // Warn on missing BreadcrumbList on inner pages or duplicate BreadcrumbLists
  if (pathname !== '/' && breadcrumbCount === 0) {
    warnings.push(pathname + ': missing BreadcrumbList schema on inner page');
  } else if (breadcrumbCount > 1) {
    warnings.push(pathname + ': duplicate BreadcrumbList schema (' + breadcrumbCount + ')');
  }

  // Verify internal route destinations and same-page anchor fragments
  const brokenLinks = [];
  const brokenAnchors = [];
  const pageIds = new Set([...html.matchAll(/\bid="([^"]+)"/gi)].map((m) => decode(m[1])));

  for (const m of html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)) {
    const href = decode(m[1]);
    if (href.startsWith('#') && href.length > 1) {
      const targetId = href.slice(1);
      if (!pageIds.has(targetId)) brokenAnchors.push(href);
      continue;
    }
    if (!href.startsWith('/') || href.startsWith('//') || /^\/(admin|feedback)(\/|$)/.test(href)) continue;
    const destination = new URL(href, origin).pathname;
    if (path.extname(destination)) continue;
    if (!fs.existsSync(path.join(build, destination, 'index.html'))) brokenLinks.push(href);
  }
  if (brokenLinks.length) {
    pageErrors.push('Broken internal destinations: ' + [...new Set(brokenLinks)].join(', '));
  }
  if (brokenAnchors.length) {
    warnings.push(pathname + ': missing same-page anchor target (' + [...new Set(brokenAnchors)].join(', ') + ')');
  }

  if (title.length > 65) warnings.push(pathname + ': long title (' + title.length + ')');
  if (description.length > 165) warnings.push(pathname + ': long description (' + description.length + ')');
  if (titles.has(title)) pageErrors.push('Duplicate title with ' + titles.get(title));
  else titles.set(title, pathname);
  if (descriptions.has(description)) {
    warnings.push(pathname + ': duplicate description with ' + descriptions.get(description));
  } else {
    descriptions.set(description, pathname);
  }

  errors.push(...pageErrors.map((e) => pathname + ': ' + e));
  pages.push({
    path: pathname,
    title,
    description,
    canonical,
    h1,
    schemaCount,
    bytes: Buffer.byteLength(html),
    errors: pageErrors,
  });
}

const result = {
  checkedAt: new Date().toISOString(),
  sitemapPages: urls.length,
  checkedPages: pages.length,
  errors,
  warnings,
  pages,
};
fs.mkdirSync(path.dirname(report), { recursive: true });
fs.writeFileSync(report, JSON.stringify(result, null, 2));
console.log(JSON.stringify({ sitemapPages: urls.length, checkedPages: pages.length, errors, warnings, report }, null, 2));
if (errors.length) process.exitCode = 1;
