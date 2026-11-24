import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { isSearchIndexable } from '../src/utils/seo/searchPolicy.mjs';

const host = 'www.pureaircalifornia.com';
const key = '3a598c19b4e1423ca87889e414578bca';
const keyLocation = `https://${host}/${key}.txt`;
const sitemapPath = fileURLToPath(new URL('../build/sitemap.xml', import.meta.url));
const urlsFromXml = xml => [...xml.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)].map(match => match[1]);

try {
  const urlList = urlsFromXml(fs.readFileSync(sitemapPath, 'utf8'));
  if (!urlList.length || urlList.length > 10000 || new Set(urlList).size !== urlList.length) throw new Error('Invalid sitemap URL count');
  for (const value of urlList) {
    const url = new URL(value);
    if (url.hostname !== host || url.protocol !== 'https:' || url.search || url.hash || !isSearchIndexable(url.pathname)) throw new Error(`Ineligible sitemap URL: ${value}`);
  }
  if (process.argv.includes('--dry-run')) {
    console.log(`Dry run: ${urlList.length} canonical, indexable URLs; no notification sent.`);
  } else {
    const getText = async url => {
      const response = await fetch(url, { signal: AbortSignal.timeout(30000), cache: 'no-store' });
      if (!response.ok) throw new Error(`Live verification failed: HTTP ${response.status}`);
      return response.text();
    };
    const [liveXml, liveKey] = await Promise.all([getText(`https://${host}/sitemap.xml`), getText(keyLocation)]);
    if (liveKey.trim() !== key) throw new Error('Live ownership key does not match');
    if (JSON.stringify(urlsFromXml(liveXml).sort()) !== JSON.stringify([...urlList].sort())) throw new Error('Deploy and verify the built sitemap before notifying search engines');
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host, key, keyLocation, urlList }), signal: AbortSignal.timeout(30000),
    });
    if (![200, 202].includes(response.status)) throw new Error(`IndexNow rejected the notification: HTTP ${response.status}`);
    console.log(`IndexNow received ${urlList.length} URLs (HTTP ${response.status}). Receipt is not confirmation of indexing or ranking.`);
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
