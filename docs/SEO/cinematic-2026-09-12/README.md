# Pure Air California — cinematic website update

Status: implemented and verified locally on September 12, 2026. Not deployed to production. No search ranking improvement is claimed or measured.

## Review

September 12 browser feedback follow-up: original PAC logo restored; missing HVAC image and dark CTA heading repaired. See BROWSER-FIXES.md.

Local preview: http://127.0.0.1:4175/

The home page follows six scroll chapters: California sky, coastal nature, Los Angeles, dusty ductwork, Pure Air cleaning, and illustrated airflow into lungs. It uses optimized WebP imagery and native scroll-driven SVG/CSS effects, with a still view, chapter controls, and a skip link. The duct and lung scenes are illustrations, not customer results.

Branding now uses an evergreen/ivory palette, the original PAC logo, editorial typography, consistent navigation and footer, and direct call/estimate actions on mobile. Main residential, commercial, dryer vent, Los Angeles, and indoor-air-quality pages have revised content. Shared layout and SEO changes apply throughout the public routes. Existing articles and other individual service pages were not all rewritten.

## SEO and trust changes

- Preserve distinct page titles, descriptions, and canonical paths; normalize absolute canonical and social URLs.
- Keep one consistent business identity rather than representing each service area as a separate local branch.
- Remove unsupported self-serving LocalBusiness aggregate-rating markup, nonexistent site-search action, and sitewide image preloads.
- Keep meaningful public content visible in prerendered HTML, with crawlable service and location links.
- Replace randomized home-page content, artificial availability urgency, and unsupported medical/energy promises in the revised pages.
- Remove misleading before/after photography from the three rewritten service pages after visual asset inspection.
- Keep the existing legacy-spam/redirect cleanup rules intact.

The baseline audit already passed the basic metadata checks. This work improves content, business consistency, navigation, and presentation; it is not evidence that every previous page had broken metadata.

## Verification

- Production build: 113 of 113 routes prerendered; all 109 sitemap URLs have static HTML.
- Static audit: 109 pages checked, zero errors or warnings for unique titles/descriptions, one H1, canonical URL, indexability, JSON-LD parsing, and internal link destinations. See page-audit.json.
- TypeScript application type check passed.
- Targeted ESLint checks passed on the new UI and revised quote/service components.
- Six isolated lead-delivery regression cases passed: transport errors, HTTP rejection, application rejection, both email success formats, and saved lead with email failure. No real lead or test email was sent.
- Browser checks included desktop/mobile home, chapter navigation, still mode, mobile menu, service navigation, quote labels, and empty-form validation.
- Full-worktree diff check reports whitespace in unrelated pre-existing edits; these were left intact.

## Quote flow

Service selection now uses keyboard-accessible radio controls. Contact fields have labels and autocomplete. Failed delivery no longer displays success; the form recovers with a phone/retry message. Existing price formulas were retained. The shared delivery helper only reports success when a lead is saved or the email service explicitly accepts the request.

## Deployment and measurement

This repository contained extensive uncommitted work before this task. Before publishing, review the full deployment contents, particularly existing admin/backend changes. No production files, DNS, business listings, Search Console settings, or customer messages were changed.

After release: fetch the actual live HTML and assets; verify canonical/schema and mobile rendering; submit the sitemap and inspect the home, Los Angeles, and core service URLs in Search Console. Compare clicks, impressions, indexing and qualified enquiries against a dated baseline. Search positions require live indexing and measurement; they cannot be guaranteed by a local code change.

A historical March 6, 2026 Search Console export contains 36,100 crawled-not-indexed URLs, 3,316 redirects, 32 not-found URLs and 2 server errors. Existing server rules identify legacy spam URLs. This is historical evidence, not a current live diagnosis. Refresh the Search Console report to establish whether legacy indexing remains a problem.

## Files and build environment

Source: frontend/src/pages/CinematicLanding.tsx, frontend/src/components/AirJourney.tsx, frontend/src/cinematic.css, and related shared components. Page audit: page-audit.json. Build output log: production-build.log. Before-edit backups: before/.

The C: drive ran out of space during the build. Only generated frontend/build output was moved to D:/Pure Air California/pac-cinematic-build-2026-09-12, with a Windows directory junction at the original build path. Source files remain in the repository. A fresh checkout can build normally into its own frontend/build directory.

Re-run from frontend:

    node node_modules/typescript/bin/tsc --noEmit -p tsconfig.app.json
    node scripts/test-lead-delivery.cjs
    npm run build
    node scripts/audit-seo.mjs

## Skill availability

The requested Claude @animated-website skill was not installed and its exact SKILL.md source could not be obtained. The implementation is custom; it does not claim to use that unavailable skill. The imagegen skill was used for the original sky artwork.

## Research sources

- [Google: canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: review structured data](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
- [Google: AI search guidance](https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search)
- [Google: website testing](https://developers.google.com/search/docs/crawling-indexing/website-testing)
- [EPA: should you have ducts cleaned?](https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned)
- [GSAP: ScrollTrigger reference](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — animation reference; no GSAP dependency added.
