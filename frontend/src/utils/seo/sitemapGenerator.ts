import { canonicalUrl } from './canonicalUrl';
import { isSearchIndexable } from './searchPolicy.mjs';

/**
 * Runtime-safe sitemap metadata definitions aligned with `searchPolicy.mjs`
 * and `scripts/generate-sitemap.js`. The production `sitemap.xml` and
 * `robots.txt` files are generated exclusively by `scripts/generate-sitemap.js`
 * and enriched after prerendering by `scripts/enrich-sitemap.mjs`.
 */
export interface SitemapItem {
  loc: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
}

const CORE_ROUTES: ReadonlyArray<{ path: string; changefreq: SitemapItem['changefreq']; priority: number }> = [
  { path: '/', changefreq: 'daily', priority: 1.0 },
  { path: '/locations/los-angeles/', changefreq: 'weekly', priority: 1.0 },
  { path: '/services/', changefreq: 'weekly', priority: 0.9 },
  { path: '/home-services/', changefreq: 'monthly', priority: 0.9 },
  { path: '/pricing/', changefreq: 'weekly', priority: 0.9 },
  { path: '/quote/', changefreq: 'monthly', priority: 0.9 },
  { path: '/locations/', changefreq: 'weekly', priority: 0.9 },
  { path: '/industries/', changefreq: 'monthly', priority: 0.9 },
  { path: '/blog/', changefreq: 'weekly', priority: 0.8 },
  { path: '/about/', changefreq: 'monthly', priority: 0.8 },
  { path: '/contact/', changefreq: 'monthly', priority: 0.8 },
];

export function getCoreSitemapItems(): SitemapItem[] {
  return CORE_ROUTES
    .filter((route) => isSearchIndexable(route.path))
    .map((route) => ({
      loc: canonicalUrl(route.path),
      changefreq: route.changefreq,
      priority: route.priority,
    }));
}

export default getCoreSitemapItems;
