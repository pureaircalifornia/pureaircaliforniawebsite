import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the same extraction logic
const extractSlugs = (relativePath) => {
    try {
        const fullPath = path.join(__dirname, '../src/pages', relativePath);
        const content = fs.readFileSync(fullPath, 'utf-8');
        const slugRegex = /slug:\s*["']([^"']+)["']/g;
        const slugs = [];
        let match;
        while ((match = slugRegex.exec(content)) !== null) {
            slugs.push(match[1]);
        }
        return slugs;
    } catch (e) {
        return [];
    }
};

const routes = [
    '/', '/about', '/contact', '/quote', '/pricing', '/services', '/locations', '/blog',
    '/health-benefits', '/privacy-policy', '/terms-of-service',

    '/services/commercial-air-duct-cleaning', '/services/residential-air-duct-cleaning',
    '/services/residential-dryer-vent-cleaning', '/services/commercial-dryer-vent-cleaning',
    '/services/hvac-system-cleaning', '/services/dryer-vent-maintenance-program',
    '/services/residential-electrostatic-filter', '/services/commercial-electrostatic-filter',
    '/services/air-duct-sanitizing', '/services/laundromat-dryer-vent-cleaning',

    '/industries', '/case-studies',
    '/industries/healthcare', '/industries/hospitality', '/industries/restaurants',
    '/industries/education', '/industries/retail', '/industries/manufacturing',
    '/industries/commercial-real-estate',

    // Dedicated Los Angeles hub — the primary money page. It is a standalone route
    // (NOT one of the locations/data.ts slugs), so it must be listed explicitly or
    // it never gets a static file and Apache serves 404.html for it.
    '/locations/los-angeles',

    // Conversion / B2B assets that are real indexable pages
    '/air-quality-calculator', '/partners', '/property-managers',

    '/dryer-safety', '/compare', '/commercial-services', '/404'
];

const locationSlugs = extractSlugs('locations/data.ts');
locationSlugs.forEach(slug => routes.push(`/locations/${slug}`));

const caseStudySlugs = extractSlugs('caseStudies/data.ts');
caseStudySlugs.forEach(slug => routes.push(`/case-studies/${slug}`));

// Union BOTH blog sources, exactly as generate-sitemap.js does. data.ts is the
// listing catalogue and post-data.ts holds the article bodies; a post can be added
// to one and forgotten in the other. When this read data.ts alone, three posts that
// existed only in post-data.ts were written into the sitemap by generate-sitemap.js
// but never prerendered, so Apache answered 404.html for three URLs we had just
// told Google to crawl. Deriving both lists the same way makes that impossible.
const blogSlugs = [...new Set([
    ...extractSlugs('blog/data.ts'),
    ...extractSlugs('blog/post-data.ts'),
])];
blogSlugs.forEach(slug => routes.push(`/blog/${slug}`));

const BUILD_DIR = path.join(__dirname, '../build');
// Port 0 asks the OS for any free port. Hardcoding 3001 meant an unrelated local
// service on that port crashed the whole build with EADDRINUSE.
const PORT = 0;

// Collected by the per-route SEO sanity check below and reported at the end of the run.
// Errors are defects that de-index a page and FAIL the build; warnings are
// cosmetic (a title that will be visually truncated) and only get reported.
const seoErrors = [];
const seoWarnings = [];
let failed = false;

/**
 * Rewrite internal links to the trailing-slash form that Apache actually serves.
 *
 * React Router's <Link to="/quote"> emits href="/quote", but the server serves
 * /quote/index.html and 301-redirects /quote -> /quote/. That made ~3,700 of the
 * ~4,000 internal links on the site a redirect hop for Googlebot, which is what
 * "Page with redirect" in Search Console was counting.
 *
 * Doing this as a post-process on the prerendered HTML rather than editing 50
 * source files is safe here specifically because main.tsx mounts with
 * createRoot().render() and NOT hydrateRoot() — React discards this markup and
 * re-renders on mount, so there is no hydration mismatch. Crawlers and anyone who
 * clicks before JS loads get the canonical URL directly.
 */
const normalizeInternalLinks = (html) =>
    html.replace(/href="(\/[^"#?]*)"/g, (match, href) => {
        if (href === '/' || href.endsWith('/')) return match;
        if (/\.[a-zA-Z0-9]{2,5}$/.test(href)) return match;        // real files
        if (/^\/(admin|feedback)(\/|$)/.test(href)) return match;  // SPA-only routes
        return `href="${href}/"`;
    });

/**
 * Drop the Google Maps widget's rendered internals from the static HTML.
 *
 * Puppeteer captures the map AFTER it has painted, so the saved file froze ~55
 * <img> tiles from maps.googleapis.com — each one a signed, expiring tile URL with
 * the browser API key in the query string — plus a handful of transparent.png
 * spacers from maps.gstatic.com. None of it is content:
 *
 *   - the tile URLs carry session tokens and go stale, so they never render from
 *     the static file anyway;
 *   - they published the Maps browser key into the page source;
 *   - they were the only <img> tags on the site without alt text, which made a
 *     clean accessibility pass look like 61 failures;
 *   - and they inflated /contact/ to 68 KB of markup.
 *
 * main.tsx mounts with createRoot rather than hydrateRoot, so React discards this
 * markup and re-renders the map client-side regardless. Removing it is free.
 *
 * The same applies to the <script> tags the Maps SDK injects into <head> at
 * runtime — the loader plus its versioned chunks (/maps-api-v3/api/js/66/3d/…)
 * and JSONP tile requests. Those are strictly worse frozen than the images: they
 * pin a Maps build number that 404s as soon as Google rotates it, they carry a
 * `callback=_xdc_._fac5n1` handler that no longer exists on a fresh page load, and
 * they are the reason the browser API key appears in the page source at all. The
 * app's own Vite bundles are untouched — only maps.googleapis.com/maps.gstatic.com.
 */
const stripMapTiles = (html) =>
    html
        .replace(/<img\b[^>]*\bsrc="https:\/\/maps\.(?:googleapis|gstatic)\.com\/[^"]*"[^>]*>/gi, '')
        .replace(/<script\b[^>]*\bsrc="https:\/\/maps\.(?:googleapis|gstatic)\.com\/[^"]*"[^>]*>\s*<\/script>/gi, '');

async function prerender() {
    console.log('Starting prerender script...');

    // Capture the PRISTINE Vite shell before anything is written over it.
    //
    // Why this matters: we prerender '/' first and write the result back to
    // build/index.html. If the SPA fallback kept reading that file from disk, every
    // route after '/' would boot from the homepage's already-rendered HTML and
    // inherit its baked-in <title>, <link rel="canonical" href="/"> and og:* tags.
    // Any page that does not render its own Helmet tags then silently keeps the
    // homepage's metadata — which is exactly how all seven /industries/* pages ended
    // up canonicalised to the homepage and dropped from the index.
    // Serving the in-memory shell keeps every route booting from a clean head.
    const shellHtml = fs.readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf-8');

    // Start local server
    const app = express();
    app.use(express.static(BUILD_DIR, { index: false }));

    // Fallback to the pristine shell for SPA routing
    app.get('*', (req, res) => {
        res.type('html').send(shellHtml);
    });

    const server = app.listen(PORT, async () => {
        const port = server.address().port;
        console.log(`Server started on http://localhost:${port}`);

        try {
            const browser = await puppeteer.launch({ headless: "new" });
            const page = await browser.newPage();

            // Force a deterministic A/B assignment for the prerendered snapshot so the
            // static HTML that crawlers read is ALWAYS the canonical, indexable variant A.
            // Real visitors still get a random 50/50 split because their localStorage
            // starts empty — this only pins the build-time snapshot. Runs before any
            // page script on every navigation.
            await page.evaluateOnNewDocument(() => {
                try { localStorage.setItem('ab_landing_variant', 'A'); } catch (e) { /* no-op */ }

                // Marks this as the build-time render. Components whose output depends
                // on the *viewer's* clock must not compute a value here — Puppeteer runs
                // effects just like a real browser, so anything time-derived gets frozen
                // into the static HTML and served to every visitor and crawler until the
                // next deploy. See UrgencyBanner.
                window.__PRERENDERING__ = true;
            });

            for (const route of routes) {
                console.log(`Prerendering ${route}...`);
                await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle0' });
                
                // Wait for the app to render AND for react-helmet-async to have
                // flushed the head.
                //
                // Waiting on #root alone is a race: Helmet applies its tags in an
                // effect after mount, and on a lazily-loaded route the body can be
                // populated a tick before the head is. When that race was lost the
                // page was written out with no title, description or canonical at
                // all. Helmet stamps every tag it owns with data-rh, so waiting for
                // the canonical link is a direct signal that the head is ready.
                await page.waitForFunction(() => {
                    const root = document.querySelector('#root');
                    if (!root || root.innerHTML.length === 0) return false;
                    return !!document.querySelector('link[rel="canonical"][data-rh="true"]');
                }, { timeout: 20000 }).catch(() => {
                    seoErrors.push(`${route}: timed out waiting for React + Helmet to render — page written without head tags`);
                });
                
                // Grab the HTML
                const html = stripMapTiles(normalizeInternalLinks(await page.content()));

                // Per-route SEO sanity check. These are the failures that silently
                // de-index pages, so surface them at build time instead of finding
                // them in Search Console months later.
                if (route !== '/404') {
                    // Strip HTML comments first — commented-out markup is not real
                    // markup, and matching inside it produces nonsense findings.
                    const doc = html.replace(/<!--[\s\S]*?-->/g, '');

                    const expectedCanonical =
                        `https://www.pureaircalifornia.com${route === '/' ? '/' : route + '/'}`;
                    const canonical = (doc.match(/rel="canonical"\s+href="([^"]*)"/) || [])[1];
                    // Measure the DECODED title: "&amp;" is five characters in the
                    // markup but one on the results page, so the raw string
                    // over-reports length for any title containing an ampersand.
                    const title = ((doc.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1] || '')
                        .replace(/&amp;/g, '&')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&quot;/g, '"')
                        .replace(/&#39;/g, "'")
                        .replace(/&nbsp;/g, ' ');
                    const descCount = (doc.match(/<meta[^>]+name="description"/g) || []).length;
                    const h1Count = (doc.match(/<h1[\s>]/g) || []).length;

                    // Decode the description the same way the title is decoded above —
                    // "&amp;" is five characters in markup but one on the results page,
                    // so the raw string over-reports length for any description with an
                    // ampersand, and most of these have one.
                    const description = ((doc.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/) || [])[1] || '')
                        .replace(/&amp;/g, '&')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&quot;/g, '"')
                        .replace(/&#39;/g, "'")
                        .replace(/&nbsp;/g, ' ');

                    if (canonical !== expectedCanonical) {
                        seoErrors.push(`${route}: canonical is "${canonical}" but should be "${expectedCanonical}" — page is likely missing <SEOProvider>`);
                    }
                    if (descCount !== 1) {
                        seoErrors.push(`${route}: ${descCount} meta description tags (expected exactly 1)`);
                    }
                    if (h1Count !== 1) {
                        seoErrors.push(`${route}: ${h1Count} <h1> tags (expected exactly 1)`);
                    }
                    if (title.length > 60) {
                        seoWarnings.push(`${route}: title is ${title.length} chars, will be truncated in search results — "${title}"`);
                    }
                    // Descriptions past ~160 chars are cut off in the SERP, and the
                    // closing call to action is exactly what gets cut. 74 of 108 pages
                    // regressed past this before it was enforced here.
                    if (description.length > 160) {
                        seoWarnings.push(`${route}: meta description is ${description.length} chars, will be truncated in search results — "${description}"`);
                    }
                    // Structured-data dates must be ISO 8601. The blog previously emitted
                    // "February 28, 2026", which Search Console logged as unparsable
                    // every day for months before anyone noticed.
                    const badDates = (doc.match(/"date(?:Published|Modified)":"(?!\d{4}-\d{2}-\d{2})[^"]*"/g) || []);
                    if (badDates.length) {
                        seoErrors.push(`${route}: ${badDates.length} non-ISO-8601 schema date(s) — ${badDates[0]}`);
                    }
                }

                // Determine file path
                let routePath;
                if (route === '/') {
                    routePath = '/index.html';
                } else if (route === '/404') {
                    routePath = '/404.html';
                } else {
                    routePath = `${route}/index.html`;
                }
                const absolutePath = path.join(BUILD_DIR, routePath);
                
                // Ensure directory exists
                const dir = path.dirname(absolutePath);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                
                // Save HTML
                fs.writeFileSync(absolutePath, html);
                console.log(`✅ Saved ${routePath}`);
            }
            
            await browser.close();
        } catch (error) {
            console.error('Error during prerendering:', error);
            // Fail the build. Swallowing this used to ship a JS-only SPA with no
            // static HTML for crawlers while the build still reported success.
            failed = true;
        } finally {
            server.close();

            // Cross-check the sitemap against what actually landed on disk.
            //
            // generate-sitemap.js and this script build their route lists separately,
            // so they can drift. When they do, the sitemap advertises a URL that has
            // no static file and .htaccess answers 404.html — we hand Google a list of
            // pages and then 404 the ones that drifted. This is the check that catches
            // that class of bug regardless of which list is wrong.
            try {
                const sitemapPath = path.join(BUILD_DIR, 'sitemap.xml');
                if (fs.existsSync(sitemapPath)) {
                    const xml = fs.readFileSync(sitemapPath, 'utf8');
                    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
                        .map(m => m[1].replace('https://www.pureaircalifornia.com', ''));
                    const missing = locs.filter(loc => {
                        const rel = loc === '/' ? 'index.html' : path.join(loc, 'index.html');
                        return !fs.existsSync(path.join(BUILD_DIR, rel));
                    });
                    if (missing.length) {
                        seoErrors.push(
                            `sitemap.xml lists ${missing.length} URL(s) with no prerendered file — ` +
                            `Apache will serve 404.html for them: ${missing.join(', ')}`
                        );
                    } else {
                        console.log(`✅ All ${locs.length} sitemap URLs have a prerendered file.`);
                    }
                }
            } catch (e) {
                console.warn('⚠️  Could not cross-check sitemap against build output:', e.message);
            }

            if (seoErrors.length) {
                console.error(`\n❌ ${seoErrors.length} SEO defect(s) that would de-index pages:`);
                seoErrors.forEach(e => console.error(`   - ${e}`));
                failed = true;
            }
            if (seoWarnings.length) {
                console.warn(`\n⚠️  ${seoWarnings.length} SEO warning(s):`);
                seoWarnings.forEach(w => console.warn(`   - ${w}`));
            }
            if (!seoErrors.length && !seoWarnings.length) {
                console.log('\n✅ SEO checks passed for all prerendered routes.');
            }

            console.log(`Prerendering complete! ${routes.length} routes rendered.`);
            process.exit(failed ? 1 : 0);
        }
    });
}

prerender();
