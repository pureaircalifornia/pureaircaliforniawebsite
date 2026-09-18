import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://www.pureaircalifornia.com';
// A route's content date includes the data files used to render it.
// Do not manufacture freshness from the date this build happens to run.
const contentDependencies = {
    CinematicLanding: ['data/faqs.ts', 'components/CommercialProof.tsx', 'components/AirJourney.tsx'],
    LocationDetail: ['pages/locations/data.ts', 'pages/locations/regionContent.ts', 'data/localGuides.ts', 'components/LocalServiceGuide.tsx'],
    Locations: ['pages/locations/data.ts', 'components/WestsideGuides.tsx'],
    'locations/LosAngeles': ['components/WestsideGuides.tsx'],
    CaseStudies: ['pages/caseStudies/data.ts'],
    CaseStudyDetail: ['pages/caseStudies/data.ts'],
    Industries: ['components/CommercialProof.tsx'],
    Blog: ['pages/blog/data.ts', 'pages/blog/post-data.ts'],
    BlogPost: ['pages/blog/data.ts', 'pages/blog/post-data.ts'],
};
const getFileModDate = (filePath) => {
    const dependencies = ['pages/' + filePath + '.tsx', ...(contentDependencies[filePath] || [])];
    const timestamps = dependencies.map(file => path.join(__dirname, '../src', file))
        .filter(file => fs.existsSync(file)).map(file => fs.statSync(file).mtimeMs);
    return timestamps.length ? new Date(Math.max(...timestamps)).toISOString().split('T')[0] : null;
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
    ${getFileModDate(route.file) ? `<lastmod>${getFileModDate(route.file)}</lastmod>` : ''}
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    const outputPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(outputPath, sitemap);
    
    // Also generate an optimized robots.txt file right alongside sitemap
    // One group keeps the same exclusions for search and AI crawlers.
    // Specific Allow-only groups would override these Disallow rules.
    const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Disallow: /node_modules/
Disallow: /*.pdf$

Sitemap: ${DOMAIN}/sitemap.xml
`;

    const robotsPath = path.join(__dirname, '../public/robots.txt');
    fs.writeFileSync(robotsPath, robotsTxt);

    console.log(`✅ Sitemap generated at ${outputPath} with ${routes.length} URLs`);
    console.log(`✅ robots.txt generated at ${robotsPath}`);
};

generateSitemap();
