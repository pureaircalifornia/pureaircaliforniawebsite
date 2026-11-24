# Visual hero stories and guided estimate builder — 2026-09-14

Implemented locally in the React/Vite frontend.

- Shared PageHero has three contextual photographic chapters with short keyword captions, gentle image motion, manual chapter buttons and a pause control. Longer descriptions remain in accessible native details elements. Route headings and canonical metadata remain in place.
- Fixed illegible text: the animated image wrapper was above the existing negative-z-index contrast wash. Frames now sit at -3, wash at -2 and content at 1. Increased mobile chapter label size.
- Stories pause offscreen, when the document is hidden, on hover and on deliberate keyboard interaction. Reduced-motion preference and explicit pause produce still images. Route heading focus does not accidentally disable autoplay.
- Quote page provides a two-step visual estimate builder: property, service, ZIP and optional square footage; then preliminary result plus contact information. Optional organization, address, unit count, access, timing and notes support a more complete estimate request.
- Reused current PricingEstimator air-duct formulas: residential max(299, square feet - 500), commercial max(499, (square feet - 500) * 1.5). Residential dryer/filter entry prices remain 149/249. Managed properties, unsupported scopes and unknown duct sizes request a tailored review. No speculative surcharges.
- Submission uses the existing lead/email helper and only reports success when that helper confirms delivery. Optional details are included in the backend payload and notification message. Contact information is not needed to view the initial estimate; no data is submitted on step one.
- Header, mobile menu, contact dock and homepage estimate links lead directly to the builder anchor. Removed the redundant green call banner from Quote; persistent phone actions and the friendly photo/sidebar remain.

Validation:
- TypeScript and targeted ESLint passed before final link/copy adjustments; final checks rerun below.
- scripts/verify-estimate-stories.mjs passes 17 pricing cases, payload preservation and unknown-size handling, plus 57 configured route stories with three unique existing image paths and concise captions.
- Browser: desktop and 390px phone estimate layouts; residential 1,500 sqft = $1,000, commercial = $1,500, unknown size = tailored review; edit preserves input; optional details expand; one H1 and no horizontal overflow.
- Residential service hero: all three images loaded, route canonical preserved, autoplay advanced, pause and manual chapter selection worked. Contrast stacking visually confirmed on Quote and residential service.
- No test lead/email was sent. Production delivery, full production build and deployment are not verified here. C: has critically low free space, so a full build was not attempted.
- Final TypeScript and targeted ESLint checks passed. Service hero estimate link verified to land at the builder below the fixed header on a 390px viewport.
