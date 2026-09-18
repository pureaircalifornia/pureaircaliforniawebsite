import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://www.pureaircalifornia.com';
const TODAY = new Date().toISOString().split('T')[0];

// Helper to get file modification date if possible
const getFileModDate = (filePath) => {
    try {
        const fullPath = path.join(__dirname, '../src/pages', filePath + '.tsx');
        if (fs.existsSync(fullPath)) {
            const stats = fs.statSync(fullPath);
            return stats.mtime.toISOString().split('T')[0];
        }
    } catch (e) {
        // Ignore errors, return TODAY fallback
    }
    return TODAY;
};

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

    // Industry hub + commercial case studies
    { path: '/industries', priority: '0.9', changefreq: 'monthly', file: 'Industries' },
    { path: '/case-studies', priority: '0.8', changefreq: 'monthly', file: 'CaseStudies' },

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
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${DOMAIN}${route.path}${route.path.endsWith('/') ? '' : '/'}</loc>
    <lastmod>${route.file ? getFileModDate(route.file) : TODAY}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    const outputPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(outputPath, sitemap);
    
    // Also generate an optimized robots.txt file right alongside sitemap
    const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /node_modules/
Disallow: /*.pdf$

# Google News
User-agent: Googlebot-News
Allow: /

# Specifically allow major LLM/AI crawlers for AI Search visibility (GEO)
# OpenAI (training, live ChatGPT browsing, and ChatGPT Search)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

# Perplexity
User-agent: PerplexityBot
Allow: /

# Anthropic / Claude
User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

# Google AI Overviews / Gemini grounding
User-agent: Google-Extended
Allow: /

# Apple Intelligence
User-agent: Applebot-Extended
Allow: /

# Common Crawl (feeds many open LLMs)
User-agent: CCBot
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml`;

    const robotsPath = path.join(__dirname, '../public/robots.txt');
    fs.writeFileSync(robotsPath, robotsTxt);

    console.log(`✅ Sitemap generated at ${outputPath} with ${routes.length} URLs`);
    console.log(`✅ robots.txt generated at ${robotsPath}`);
};

generateSitemap();
