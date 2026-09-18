# PAC local search and commercial proof — September 12, 2026

## Delivered
- Preserved the homepage AirJourney animation and original PAC brandmark.
- Added practical Brentwood, Culver City and Century City guides for both residential and commercial visitors, with visible FAQs and matching FAQ schema.
- Corrected the shared location template: a service has an areaServed Place and a stable PAC provider identity. Removed fabricated Wikipedia city URLs; Brentwood and Century City explicitly belong to Los Angeles. No separate branch offices are invented.
- Added priority Westside links to the homepage and illustrated guide cards to both location hubs.
- Added four commercial project cards to the homepage and industry hub. Bassett and Taco Bell use the existing logo assets; SoulCycle and WHCHC use ordinary text names.
- Added three new case-study URLs and updated the WHCHC office project. Dates and locations are visible, and scope is limited to what the selected invoice items support.
- Simplified robots.txt to one group so named AI crawlers do not bypass admin/API exclusions. Public pages remain crawlable.
- Sitemap lastmod includes relevant content data dependencies, rather than only the page component timestamp or the date of the build.

## Invoice evidence and boundaries
Reviewed local PAC service records; full extraction stays outside the website repository at D:/Pure Air California/pac-private-research-2026-09-12/invoice-extracts.json.

| Business / location | Record | Supported scope |
|---|---|---|
| SoulCycle, Culver City | July 2018 DOCX | One clothes-dryer exhaust duct; HVAC template options unselected |
| SoulCycle, Brentwood | January 2019 DOCX | One clothes-dryer exhaust duct; service location distinguished from billing location |
| Bassett Furniture, Torrance | August and September 2014 DOCX invoices | Same showroom project: ventilation, plenums, blower/furnace box and coils |
| Taco Bell operated by JJC Foods LLC, Canoga Park | November 2024 DOCX | Ventilation, plenum, blower/furnace box and coil scope at one location |
| West Hollywood Community Housing Corporation | April 2026 PDF | 3,137 sq ft office, four HVAC systems, component cleaning and filters; weekend work window |

No residential names, private contacts, invoice amounts or invoice documents are published. No invented testimonials, measured performance gains, endorsements or chain-wide contracts. Illustrative service photos on project pages are labeled as service imagery. Other available logos were not added without matching project evidence.

## Search and geographic references reviewed
- Google AI features: https://developers.google.com/search/docs/appearance/ai-features
- Google LocalBusiness structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Bing IndexNow: https://www.bing.com/webmasters/help/indexnow-0z209wby
- Bing AI Performance: https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview
- Brentwood community plan: https://planning.lacity.gov/plans-policies/community-plan-area/brentwood-pacific-palisades
- West Los Angeles / Century City community plan: https://planning.lacity.gov/plans-policies/community-plan-area/west-los-angeles
- Culver City Hayden Tract plan: https://www.culvercity.org/City-Hall/City-Departments/Planning-and-Development/Advance-Planning-Division/Hayden-Tract-Specific-Plan

The implementation emphasizes accessible factual text, clear entity relationships, visible evidence and internal navigation. Google does not require a special AI file or special schema for AI features. No new dependency or speculative GEO metadata was added.

## Validation
- TypeScript and selected ESLint checks passed.
- Nine focused browser checks passed: priority geography, FAQ parity, mobile overflow, homepage links and logo loading, four named project routes, sitemap inclusion and crawler rules.
- Screenshots are in screenshots/.
- Full production build and rendered SEO audit: see production-build.log and page-audit.json (final result appended below after completion).

## Publication and measurement
These are local source/build changes, not a live deployment. After publishing, verify the live canonicals and sitemap, request priority-URL indexing in Google Search Console and Bing Webmaster Tools, and track calls plus query/page performance. Keep the real Google Business Profile accurate; do not create neighborhood branch listings without actual eligible offices. Bing AI Performance can help measure citations once available in the property's account. No rank or citation improvement has been claimed from local tests.

Additional review fixes: removed approximate area-center coordinates from LocalBusiness schema. Prerender now blocks third-party requests and waits for actual React/Helmet content rather than global network idleness; a remote request had caused a build navigation timeout.

Final review evidence: 14/14 representative desktop/mobile routes passed the UI audit with one H1, working imagery, phone links, valid hash targets and no horizontal overflow. The new link inventory check found no missing destinations. Shared location identity verification covers all 54 location routes.

Final production results: build succeeded, 116/116 routes rendered; all 112 indexable pages passed the SEO audit with zero errors and zero warnings. All 54 rendered location identity checks passed. Two existing metadata-length warnings remain on noindex campaign pages (/compare and /commercial-services); these are outside the indexable sitemap. No deployment or indexing submission was performed.

Code review completed locally: checked source changes against the before/ snapshots, route destinations, schema identity consistency, selected invoice scopes, asset sizes (both client SVGs below 7 KB), responsive styling and build failure handling. No new dependencies were introduced.
