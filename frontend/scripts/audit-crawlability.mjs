import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import puppeteer from 'puppeteer';

const build = path.resolve('build');
const origin = 'https://www.pureaircalifornia.com';
const routes = [...fs.readFileSync(path.join(build, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname);
const app = express();
app.use(express.static(build));
const server = app.listen(0, '127.0.0.1');
await new Promise(resolve => server.once('listening', resolve));
const base = process.env.AUDIT_ORIGIN || `http://127.0.0.1:${server.address().port}`;
const errors = [], pages = [], graph = new Map();
let browser;
try {
  browser = await puppeteer.launch({ headless: true });
  for (const javascript of [false, true]) {
    let nextRoute = 0;
    await Promise.all(Array.from({ length: 1 }, async () => {
      const page = await browser.newPage();
      await page.setCacheEnabled(false);
      await page.setViewport({ width: 1365, height: 900 });
      await page.setRequestInterception(true);
      page.on('request', request => {
        // Keep CSS and scripts; avoid analytics, maps, videos and image downloads.
        if (!request.url().startsWith(base + '/') || ['image', 'media', 'font'].includes(request.resourceType())) request.abort();
        else {
          const reqPath = decodeURIComponent(new URL(request.url()).pathname);
          let filePath = path.join(build, reqPath);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, 'index.html');
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const mime = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.xml': 'application/xml' }[ext] || 'application/octet-stream';
            request.respond({ status: 200, contentType: mime, body: fs.readFileSync(filePath) });
          } else {
            request.respond({ status: 404, contentType: 'text/html; charset=utf-8', body: 'Not found' });
          }
        }
      });
      await page.setJavaScriptEnabled(javascript);
      while (nextRoute < routes.length) {
        const route = routes[nextRoute++];
        const response = await page.goto(base + route, { waitUntil: 'load', timeout: 60000 });
        if (javascript) {
          await page.waitForFunction(() => document.querySelector('h1') && document.querySelector('link[rel="canonical"]'), { polling: 100, timeout: 15000 }).catch(error => {
            errors.push(`${route} (JavaScript on): content did not settle: ${error.message}`);
          });
          // Let mount effects settle without relying on analytics becoming idle.
          await new Promise(resolve => setTimeout(resolve, 150));
        }
        const result = await page.evaluate(() => {
          const main = document.querySelector('main') || document.querySelector('#main-content');
          const nodes = [...(main?.querySelectorAll('h1,h2,h3,p') || [])];
          const hidden = nodes.filter(node => {
            if (!node.textContent.trim() || node.closest('header,nav,[aria-hidden="true"],dialog,[role="dialog"]')) return false;
            // Native disclosures keep their full answer in HTML and are intentional.
            if (node.closest('details:not([open])') && !node.closest('summary')) return false;
            for (let el = node; el && el !== document.body; el = el.parentElement) {
              const style = getComputedStyle(el);
              if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0 || el.inert) return true;
            }
            return false;
          }).map(node => node.textContent.trim().slice(0, 100));
          return {
            words: (main?.textContent || '').trim().split(/\s+/).length,
            headings: [...document.querySelectorAll('h1')].map(n => n.textContent.trim()),
            canonical: document.querySelector('link[rel="canonical"]')?.href,
            noindex: /noindex/i.test(document.querySelector('meta[name="robots"]')?.content || ''),
            links: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')),
            hidden, scrollY,
          };
        });
        const label = `${route} (JavaScript ${javascript ? 'on' : 'off'})`;
        if (response.status() !== 200) errors.push(`${label}: HTTP ${response.status()}`);
        if (result.words < 80 || result.headings.length !== 1) errors.push(`${label}: ${result.words} content words, ${result.headings.length} H1 elements`);
        if (result.canonical !== origin + route || result.noindex) errors.push(`${label}: canonical/noindex failure`);
        if (result.hidden.length) errors.push(`${label}: hidden content: ${result.hidden.join(' | ')}`);
        if (result.scrollY !== 0) errors.push(`${label}: unexpectedly scrolled`);
        if (!javascript) graph.set(route, result.links.map(href => new URL(href, origin + route)).filter(url => url.origin === origin).map(url => url.pathname.endsWith('/') ? url.pathname : url.pathname + '/'));
        pages.push({ route, javascript, ...result });
        if (pages.length % 28 === 0) console.log(`Completed ${pages.length} of ${routes.length * 2} page checks.`);
      }
      await page.close();
    }));
    console.log(`Checked ${routes.length} pages without scrolling, JavaScript ${javascript ? 'on' : 'off'}.`);
  }
  const reachable = new Set(['/']), queue = ['/'];
  for (let i = 0; i < queue.length; i++) for (const next of graph.get(queue[i]) || []) if (graph.has(next) && !reachable.has(next)) { reachable.add(next); queue.push(next); }
  for (const route of routes) if (!reachable.has(route)) errors.push(`${route}: no crawlable HTML link path from homepage`);
  const report = process.env.AUDIT_REPORT || '../docs/SEO/crawl-without-scroll-2026-09-20/audit.json';
  fs.mkdirSync(path.dirname(report), { recursive: true });
  fs.writeFileSync(report, JSON.stringify({ checkedAt: new Date().toISOString(), base, routes: routes.length, reachable: reachable.size, errors, pages }, null, 2));
  console.log(JSON.stringify({ routes: routes.length, reachable: reachable.size, errors, report }, null, 2));
  if (errors.length) process.exitCode = 1;
} finally {
  await browser?.close();
  server.close();
}
