# Pricing and page motion refinement

September 14, 2026

## Pricing
- Replaced the bedroom tiers, per-add-on prices, commercial square-footage tiers and oversized promotional claims with two existing entry prices: residential air duct cleaning starting at $299; residential dryer vent cleaning starting at $149.
- Commercial projects receive a tailored estimate; removed the prior contradictory $599/$600 commercial amounts.
- Kept final-scope conditions visible alongside starting amounts. No new prices or discounts were invented.
- Updated title, description and visible FAQ answers together; removed the old maximum-price schema. Native details keep FAQ answers in the DOM.
- The pricing page now follows a shorter visual sequence: starting point, business needs, estimate process, questions. Existing imagery is reused.

## Shared page experience
- PageMotionProvider adds modest scroll-responsive hero image movement and one-time section/figure transitions to public page templates. The homepage retains its existing AirJourney.
- Content is visible by default; the new observer never gates text, links or indexing. Prerender skips decorative motion. No new dependency or artificial loading delay.
- Pause/resume persists for the browser session, reduced-motion preferences are respected, and ScrollReveal shares the pause preference.
- Observers, RAF callbacks, animation handles and listeners are cleaned up on navigation or pause. Hero motion stops offscreen.
- Kept call/estimate dock and existing contextual internal links. Hero motion controls are separated from the contact dock.

## Verification
- ESLint and application TypeScript checks passed before the final offscreen-animation-state refinement.
- Pricing desktop/mobile screenshots reviewed. Only two starting-price rows remain, with no obsolete maxPrice schema.
- Five visible pricing FAQs match the five schema entries.
- Hero transform changed with scrolling. Pause removed the transform and persisted on a subsequent service route.
- At 390px, pricing, residential ducts, HVAC, hospitality, Brentwood, a blog article and quote routes have one H1, correct canonical paths, visible motion controls and phone links, and no horizontal overflow.
- Local source/dev preview only. No full production rebuild, deployment, search indexing or ranking validation was performed in this pass.

References reviewed: Google Search Central JavaScript/lazy-loading guidance; Motion's official repository; Beyond Fireship's scroll-animation demonstration. The implementation keeps content in HTML and uses existing browser capabilities.
- Final ESLint passed after the offscreen-state refinement. Browser verified the hero animation state becomes paused offscreen and native FAQ expansion works. Temporary viewport override was reset.
