/**
 * Differentiation report for the 54 city pages.
 *
 * These pages carry the highest commercial intent on the site ("air duct cleaning
 * <neighbourhood>" is a query from someone ready to book), so getting them indexed
 * matters more than anything else in the sitemap. The obstacle is not crawling or
 * markup — it is that Google indexes a page when the page is worth its own slot,
 * and near-duplicate pages are not.
 *
 * So this measures the thing that actually decides it: how much of each page's text
 * appears on no other city page. Run it after a build.
 *
 *   npm run locations:report
 *
 * The unique share is computed over 6-word shingles of the visible text, with nav,
 * header and footer removed. A shingle counts as unique when it appears on exactly
 * one city page.
 *
 * Rough reading of the number:
 *   under 35%  — near-duplicate; indexation is unlikely and consolidation is the
 *                honest alternative to rewriting
 *   35-55%     — differentiated enough to be worth indexing, not yet strong
 *   over 55%   — reads as its own document
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BUILD = path.join(__dirname, '../build/locations');
const DATA = path.join(__dirname, '../src/pages/locations/data.ts');

if (!fs.existsSync(BUILD)) {
    console.error('No build found. Run `npm run build` first.');
    process.exit(1);
}

const visibleText = (html) =>
    html
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
        .replace(/<header[\s\S]*?<\/header>/gi, ' ')
        .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&[a-z#0-9]+;/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();

const cities = fs
    .readdirSync(BUILD, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== 'los-angeles')
    .map((d) => d.name)
    .filter((n) => fs.existsSync(path.join(BUILD, n, 'index.html')));

const words = {};
const shingles = {};
for (const c of cities) {
    const w = visibleText(fs.readFileSync(path.join(BUILD, c, 'index.html'), 'utf8'))
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, ' ')
        .split(/\s+/)
        .filter(Boolean);
    words[c] = w;
    const set = new Set();
    for (let i = 0; i + 6 <= w.length; i++) set.add(w.slice(i, i + 6).join(' '));
    shingles[c] = set;
}

const df = {};
for (const c of cities) for (const g of shingles[c]) df[g] = (df[g] || 0) + 1;

const rows = cities.map((c) => {
    let unique = 0;
    for (const g of shingles[c]) if (df[g] === 1) unique++;
    const total = shingles[c].size || 1;
    return { c, unique, total, pct: (100 * unique) / total, words: words[c].length };
});
rows.sort((a, b) => a.pct - b.pct);

const totUnique = rows.reduce((s, r) => s + r.unique, 0);
const totAll = rows.reduce((s, r) => s + r.total, 0);
const overall = (100 * totUnique) / totAll;

const band = (p) => (p < 35 ? 'WEAK  ' : p < 55 ? 'OK    ' : 'STRONG');

console.log('');
console.log('  City page differentiation — ' + cities.length + ' pages');
console.log('  ' + '-'.repeat(58));
console.log('  Overall unique text: ' + overall.toFixed(1) + '%   (' + (100 - overall).toFixed(1) + '% shared across city pages)');
console.log('  Average page length: ' + Math.round(rows.reduce((s, r) => s + r.words, 0) / rows.length) + ' words');
console.log('');

const weak = rows.filter((r) => r.pct < 35);
const ok = rows.filter((r) => r.pct >= 35 && r.pct < 55);
const strong = rows.filter((r) => r.pct >= 55);
console.log('  WEAK   (<35%, unlikely to be indexed): ' + weak.length);
console.log('  OK     (35-55%):                       ' + ok.length);
console.log('  STRONG (>55%):                         ' + strong.length);
console.log('');

console.log('  Weakest 15 — these are the ones to write fieldNotes for first:');
rows.slice(0, 15).forEach((r) => {
    console.log('    ' + band(r.pct) + ' ' + r.pct.toFixed(1).padStart(5) + '%  ' + r.c);
});

// Which entries still have no fieldNotes.
const src = fs.readFileSync(DATA, 'utf8');
const entries = [];
let i = 0;
while ((i = src.indexOf('slug: "', i)) !== -1) {
    const slug = src.slice(i + 7, src.indexOf('"', i + 7));
    const start = src.lastIndexOf('{', i);
    let depth = 0, end = start;
    for (let j = start; j < src.length; j++) {
        if (src[j] === '{') depth++;
        if (src[j] === '}') { depth--; if (!depth) { end = j; break; } }
    }
    entries.push({ slug, hasNotes: /fieldNotes:\s*"/.test(src.slice(start, end + 1)) });
    i = end;
}
const missing = entries.filter((e) => !e.hasNotes && e.slug !== 'los-angeles');
console.log('');
console.log('  fieldNotes written: ' + (entries.length - missing.length) + ' of ' + entries.length);
if (missing.length) {
    console.log('  Still empty: ' + missing.map((m) => m.slug).join(', '));
}

// Closest pairs — the ones most at risk of being treated as duplicates.
const jaccard = (a, b) => {
    let inter = 0;
    for (const g of shingles[a]) if (shingles[b].has(g)) inter++;
    return inter / (shingles[a].size + shingles[b].size - inter);
};
const pairs = [];
for (let a = 0; a < cities.length; a++)
    for (let b = a + 1; b < cities.length; b++)
        pairs.push([cities[a], cities[b], jaccard(cities[a], cities[b])]);
pairs.sort((x, y) => y[2] - x[2]);
console.log('');
console.log('  Most similar pairs (highest duplicate risk):');
pairs.slice(0, 6).forEach((p) => {
    console.log('    ' + (p[2] * 100).toFixed(1).padStart(5) + '%  ' + p[0] + '  <->  ' + p[1]);
});
console.log('');
