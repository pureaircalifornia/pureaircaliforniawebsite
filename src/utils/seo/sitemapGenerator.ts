import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { format } from 'date-fns';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SitemapItem {
  loc: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'always' | 'never';
  priority: number;
}

const generateSitemap = () => {
  const sitemapItems: SitemapItem[] = [
    {
      loc: 'https://www.pureaircalifornia.com',
      lastmod: format(new Date(), 'yyyy-MM-dd'),
      changefreq: 'daily',
      priority: 1.0
    },
    {
      loc: 'https://www.pureaircalifornia.com/services',
      lastmod: format(new Date(), 'yyyy-MM-dd'),
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: 'https://www.pureaircalifornia.com/locations',
      lastmod: format(new Date(), 'yyyy-MM-dd'),
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      loc: 'https://www.pureaircalifornia.com/blog',
      lastmod: format(new Date(), 'yyyy-MM-dd'),
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      loc: 'https://www.pureaircalifornia.com/about',
      lastmod: format(new Date(), 'yyyy-MM-dd'),
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: 'https://www.pureaircalifornia.com/contact',
      lastmod: format(new Date(), 'yyyy-MM-dd'),
      changefreq: 'monthly',
      priority: 0.7
    }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapItems
  .map(item => `
  <url>
    <loc>${item.loc}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>
`)
  .join('')}
</urlset>`;

  const sitemapPath = path.join(__dirname, '../../public/sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);

  // Also create a robots.txt
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://www.pureaircalifornia.com/sitemap.xml

# Google News
User-agent: Googlebot-News
Allow: /

# Bingbot
User-agent: bingbot
Allow: /

# Yandex
User-agent: Yandex
Allow: /

# Baidu
User-agent: Baiduspider
Allow: /

# Allow crawling of AMP pages
Allow: /amp

# Block specific directories
Disallow: /admin/
Disallow: /api/
Disallow: /node_modules/

# Block specific file types
Disallow: /*.js$
Disallow: /*.css$
Disallow: /*.json$

# Block specific URL patterns
Disallow: /*?*
Disallow: /*&*

# Block specific file extensions
Disallow: /*.pdf$
Disallow: /*.doc$
Disallow: /*.docx$
Disallow: /*.xls$
Disallow: /*.xlsx$

# Block specific URL parameters
Disallow: /*sort=
Disallow: /*filter=
Disallow: /*page=

# Allow specific directories
Allow: /blog/
Allow: /services/
Allow: /locations/
Allow: /about/
Allow: /contact/`;

  const robotsPath = path.join(__dirname, '../../public/robots.txt');
  fs.writeFileSync(robotsPath, robotsTxt);
};

export default generateSitemap;
