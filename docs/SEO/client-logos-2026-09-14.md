# Additional commercial client logos

September 14, 2026. Owner requested more logos from past business clients.

Three additional logos reuse PAC's existing asset library. No generated or reconstructed logos, dependencies, testimonials, invoices, contacts or billing details were added to the public site.

| Client shown | Local invoice filename in pureair-crm/gdrive_downloads | Published scope |
| --- | --- | --- |
| Four Seasons Hotel Los Angeles | Pure Air California Invoice  Four Seasons Hotel room 811 & 813.docx | June 16, 2015; guestroom ventilation, blower and interior coil cleaning. Two-system scope is marked X 2. |
| Panera Bread, Pasadena café | Pure Air California Invoice - Panera Bread Cafe Pasadena 2018.docx | January 1, 2018; selected ventilation, plenum, blower/furnace box and coil cleaning. |
| Westchester Family YMCA | Pure Air California Invoice Westchester YMCA.docx | April 29, 2015; selected ventilation, plenum, blower/HVAC unit and coil cleaning. |

CommercialProof is shared by the homepage and Industries hub. Six identity cards lead to clearly labeled service guides or existing project case studies; the WHCHC project remains a prominent full-width link. Existing Bassett, Taco Bell and SoulCycle evidence is documented in local-authority-2026-09-12/README.md.

The Four Seasons May 2024 file has incomplete dates and is not used for the new card. Proposals and unmatched Ford, USPS or WB logo assets were not treated as evidence of completed work. The available WB asset depicts the WB Television Network, not Warner Bros.

Design: a stationary responsive grid with full-color original logos, equal visual space, visible service dates, large link targets and keyboard focus. No autoplay marquee or additional animation work.

## Loading, visual service content and contact follow-up
- Replaced the generic Suspense blocks with the PAC SVG brandmark, CSS airflow/sweep and a direct phone link. No artificial loading delay or progress percentage. Reduced-motion CSS disables decorative movement.
- Added a persistent call/estimate dock across public pages; estimate-page dock keeps only the phone action. Admin routes remain outside the public layout.
- Added two existing PAC field photographs to the residential duct, commercial duct and HVAC service templates with contextual captions and a phone link.
- Kept homepage journey controls above the dock and added scroll/footer clearance.

## Validation
- TypeScript application check: tsc --noEmit -p tsconfig.app.json passed.
- ESLint on all six changed/new TSX files passed.
- Browser: all five client logo assets loaded on desktop, six commercial identity cards and the WHCHC link are present; no horizontal overflow at desktop or 390px mobile.
- Mobile: both real field photos loaded; call and estimate controls measured 48px tall; estimate link opened the quote form; Four Seasons card opened the hospitality guide.
- PAC loading component was visually reviewed at 390px using a temporary isolated fixture, which was removed after inspection.
- Local preview only; no deployment, customer call, form submission or ranking claim.
