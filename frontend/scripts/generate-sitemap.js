import { businessRoutes } from './business-routes.mjs';
import { isSearchIndexable } from '../src/utils/seo/searchPolicy.mjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://www.pureaircalifornia.com';
// Optional lastmod is added only from a visible editorial date after rendering.

// Helper to extract slugs dynamically from localized TS data files
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
        console.error(`Failed to extract slugs from ${relativePath}:`, e);
        return [];
    }
};

// All static routes in the application
const routes = [
    // Core Pages
    { path: '/', priority: '1.0', changefreq: 'daily', file: 'CinematicLanding' },
    { path: '/about', priority: '0.8', changefreq: 'monthly', file: 'About' },
    { path: '/contact', priority: '0.9', changefreq: 'monthly', file: 'Contact' },
    { path: '/quote', priority: '0.9', changefreq: 'monthly', file: 'Quote' },
    { path: '/pricing', priority: '0.9', changefreq: 'weekly', file: 'Pricing' },
    { path: '/services', priority: '0.9', changefreq: 'weekly', file: 'Services' },
    { path: '/home-services', priority: '0.9', changefreq: 'monthly', file: 'HomeServices' },
    { path: '/locations', priority: '0.9', changefreq: 'weekly', file: 'Locations' },
    // Dedicated Los Angeles hub. This is a standalone route rather than one of the
    // locations/data.ts slugs, so it has to be listed by hand — it was missing from
    // both the sitemap and the prerender list, which left the single most important
    // page on the site returning 404 to Google.
    { path: '/locations/los-angeles', priority: '1.0', changefreq: 'weekly', file: 'locations/LosAngeles' },
    { path: '/air-quality-calculator', priority: '0.7', changefreq: 'monthly', file: 'AirQualityCalculator' },
    { path: '/partners', priority: '0.6', changefreq: 'monthly', file: 'Partnerships' },
    { path: '/property-managers', priority: '0.8', changefreq: 'monthly', file: 'PropertyManagers' },
    { path: '/blog', priority: '0.8', changefreq: 'weekly', file: 'Blog' },
    { path: '/health-benefits', priority: '0.8', changefreq: 'monthly', file: 'HealthBenefits' },
    { path: '/privacy-policy', priority: '0.5', changefreq: 'yearly', file: 'PrivacyPolicy' },
    { path: '/terms-of-service', priority: '0.5', changefreq: 'yearly', file: 'TermsOfService' },

    // Service Pages
    { path: '/services/commercial-air-duct-cleaning', priority: '0.9', changefreq: 'weekly', file: 'services/CommercialAirDuctCleaning' },
    { path: '/services/residential-air-duct-cleaning', priority: '0.9', changefreq: 'weekly', file: 'services/ResidentialAirDuctCleaning' },
    { path: '/services/residential-dryer-vent-cleaning', priority: '0.9', changefreq: 'weekly', file: 'services/ResidentialDryerVentCleaning' },
    { path: '/services/commercial-dryer-vent-cleaning', priority: '0.9', changefreq: 'weekly', file: 'services/CommercialDryerVentCleaning' },
    { path: '/services/hvac-system-cleaning', priority: '0.9', changefreq: 'weekly', file: 'services/HVACSystemCleaning' },
    { path: '/services/dryer-vent-maintenance-program', priority: '0.8', changefreq: 'monthly', file: 'services/DryerVentMaintenanceProgram' },
    { path: '/services/residential-electrostatic-filter', priority: '0.8', changefreq: 'monthly', file: 'services/ResidentialElectrostaticFilter' },
    { path: '/services/commercial-electrostatic-filter', priority: '0.8', changefreq: 'monthly', file: 'services/CommercialElectrostaticFilter' },
    { path: '/services/air-duct-sanitizing', priority: '0.8', changefreq: 'monthly', file: 'services/AirDuctSanitizing' },
    { path: '/services/laundromat-dryer-vent-cleaning', priority: '0.8', changefreq: 'monthly', file: 'services/LaundromatDryerVentCleaning' },
    { path: '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles', priority: '0.9', changefreq: 'weekly', file: 'services/CommercialHoaAirDuctDryerVentCleaning' },
    { path: '/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles', priority: '0.9', changefreq: 'weekly', file: 'services/WildfireSmokeHillsideAirDuctCleaning' },

    // Industry hub + commercial case studies & project stories
    { path: '/industries', priority: '0.9', changefreq: 'monthly', file: 'Industries' },
    { path: '/case-studies', priority: '0.8', changefreq: 'monthly', file: 'CaseStudies' },
    { path: '/project-stories', priority: '0.9', changefreq: 'weekly', file: 'ProjectStories' },

    // Industry Pages
    { path: '/industries/healthcare', priority: '0.8', changefreq: 'monthly', file: 'industries/HealthcareFacilities' },
    { path: '/industries/hospitality', priority: '0.8', changefreq: 'monthly', file: 'industries/Hospitality' },
    { path: '/industries/restaurants', priority: '0.8', changefreq: 'monthly', file: 'industries/Restaurants' },
    { path: '/industries/education', priority: '0.8', changefreq: 'monthly', file: 'industries/Education' },
    { path: '/industries/retail', priority: '0.8', changefreq: 'monthly', file: 'industries/Retail' },
    { path: '/industries/manufacturing', priority: '0.8', changefreq: 'monthly', file: 'industries/Manufacturing' },
    { path: '/industries/commercial-real-estate', priority: '0.8', changefreq: 'monthly', file: 'industries/CommercialRealEstate' }
];

// Add Location Pages
businessRoutes.forEach(path => routes.push({path, priority: '0.7', changefreq: 'monthly', file: 'BusinessLocation'}));

const locationSlugs = extractSlugs('locations/data.ts');
locationSlugs.forEach(slug => {
    routes.push({
        path: `/locations/${slug}`,
        priority: '0.8',
        changefreq: 'monthly',
        file: 'LocationDetail'
    });
});

// Add Case Study Pages
const caseStudySlugs = extractSlugs('caseStudies/data.ts');
caseStudySlugs.forEach(slug => {
    routes.push({
        path: `/case-studies/${slug}`,
        priority: '0.8',
        changefreq: 'monthly',
        file: 'CaseStudyDetail'
    });
});

// Add Blog Pages
const blogSlugsData = extractSlugs('blog/data.ts');
const blogSlugsPostData = extractSlugs('blog/post-data.ts');
// Combine unique slugs
const blogSlugs = [...new Set([...blogSlugsData, ...blogSlugsPostData])];

blogSlugs.forEach(slug => {
    routes.push({
        path: `/blog/${slug}`,
        priority: '0.8',
        changefreq: 'weekly',
        file: 'BlogPost'
    });
});

const generateSitemap = () => {
    const indexableRoutes = routes.filter(route => isSearchIndexable(route.path));
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexableRoutes.map(route => `  <url>
    <loc>${DOMAIN}${route.path}${route.path.endsWith('/') ? '' : '/'}</loc>
  </url>`).join('\n')}
</urlset>`;

    const outputPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(outputPath, sitemap);
    
    // Named groups override the wildcard group; every group needs the same
    // private-path exclusions. Generate them together so a build cannot undo
    // a manually corrected public/robots.txt.
    const agents = ['*', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot',
        'Claude-SearchBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended', 'Bingbot'];
    const rules = 'Allow: /\nDisallow: /admin\nDisallow: /api/\nDisallow: /node_modules/\n';
    const robotsTxt = agents.map(agent => `User-agent: ${agent}\n${rules}`).join('\n')
        + `\nSitemap: ${DOMAIN}/sitemap.xml\n`;
    const robotsPath = path.join(__dirname, '../public/robots.txt');
    fs.writeFileSync(robotsPath, robotsTxt);

    console.log(`✅ Sitemap generated at ${outputPath} with ${indexableRoutes.length} URLs`);
    console.log(`✅ robots.txt generated at ${robotsPath}`);
};

generateSitemap();



