import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://www.pureaircalifornia.com';
const TODAY = new Date().toISOString().split('T')[0];

// All static routes in the application
const routes = [
    // Core Pages
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/about', priority: '0.8', changefreq: 'monthly' },
    { path: '/contact', priority: '0.9', changefreq: 'monthly' },
    { path: '/quote', priority: '0.9', changefreq: 'monthly' },
    { path: '/services', priority: '0.9', changefreq: 'weekly' },
    { path: '/locations', priority: '0.9', changefreq: 'weekly' },
    { path: '/blog', priority: '0.8', changefreq: 'weekly' },
    { path: '/health-benefits', priority: '0.8', changefreq: 'monthly' },
    { path: '/privacy-policy', priority: '0.5', changefreq: 'yearly' },
    { path: '/terms-of-service', priority: '0.5', changefreq: 'yearly' },

    // Service Pages
    { path: '/services/commercial-air-duct-cleaning', priority: '0.9', changefreq: 'weekly' },
    { path: '/services/residential-air-duct-cleaning', priority: '0.9', changefreq: 'weekly' },
    { path: '/services/residential-dryer-vent-cleaning', priority: '0.9', changefreq: 'weekly' },
    { path: '/services/commercial-dryer-vent-cleaning', priority: '0.9', changefreq: 'weekly' },
    { path: '/services/hvac-system-cleaning', priority: '0.9', changefreq: 'weekly' },
    { path: '/services/dryer-vent-maintenance-program', priority: '0.8', changefreq: 'monthly' },
    { path: '/services/residential-electrostatic-filter', priority: '0.8', changefreq: 'monthly' },
    { path: '/services/commercial-electrostatic-filter', priority: '0.8', changefreq: 'monthly' },

    // Industry Pages
    { path: '/industries/healthcare', priority: '0.8', changefreq: 'monthly' },
    { path: '/industries/hospitality', priority: '0.8', changefreq: 'monthly' },
    { path: '/industries/restaurants', priority: '0.8', changefreq: 'monthly' },
    { path: '/industries/education', priority: '0.8', changefreq: 'monthly' },
    { path: '/industries/retail', priority: '0.8', changefreq: 'monthly' },
    { path: '/industries/manufacturing', priority: '0.8', changefreq: 'monthly' },
    { path: '/industries/commercial-real-estate', priority: '0.8', changefreq: 'monthly' },

    // Landing Options
    { path: '/dryer-safety', priority: '0.7', changefreq: 'monthly' },
    { path: '/compare', priority: '0.7', changefreq: 'monthly' },
    { path: '/commercial-services', priority: '0.7', changefreq: 'monthly' },
];

// Locations (would ideally be dynamic, but hardcoding known ones for now)
const locationSlugs = [
    'los-angeles', 'beverly-hills', 'santa-monica', 'west-hollywood',
    'pasadena', 'long-beach', 'burbank', 'glendale', 'culver-city',
    'malibu', 'hollywood', 'downtown-la', 'brentwood', 'bel-air',
    'sherman-oaks', 'encino', 'studio-city', 'calabasas', 'torrance',
    'manhattan-beach', 'redondo-beach', 'hermosa-beach', 'venice',
    'marina-del-rey', 'playa-del-rey', 'el-segundo', 'inglewood'
];

locationSlugs.forEach(slug => {
    routes.push({
        path: `/locations/${slug}`,
        priority: '0.8',
        changefreq: 'monthly'
    });
});

const generateSitemap = () => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${DOMAIN}${route.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    const outputPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(outputPath, sitemap);
    console.log(`✅ Sitemap generated at ${outputPath} with ${routes.length} URLs`);
};

generateSitemap();
