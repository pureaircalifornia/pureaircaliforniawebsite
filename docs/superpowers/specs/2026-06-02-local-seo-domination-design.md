# Pure Air California — Local SEO Domination & Conversion Overhaul (Phase 1 Design)

**Date:** 2026-06-02
**Status:** Approved scope — Phase 1
**Goal:** Become the highest-ranked air duct cleaning company in Los Angeles local search, and convert far more of the traffic the site already gets.

---

## Context

The codebase is mature, not a skeleton:

- **Frontend** (`frontend/`): React + Vite SPA, prerendered via Puppeteer (`frontend/scripts/prerender.js`) at build time. 53 LA-area location pages (`frontend/src/pages/locations/data.ts` + `LocationDetail.tsx`), 8 service pages, 7 industry pages. SEO utilities in `frontend/src/utils/seo/`. Multi-step quote form (`EnhancedQuoteForm.tsx`), A/B routing, exit-intent popup.
- **Backend** (`backend/app/`): FastAPI + Mongo-style models. Full CRM: leads → customers → appointments → estimates → invoices → payments, plus Housecall Pro sync and a Google-Places prospecting + SendGrid email-outreach + drip engine.
- **Admin** (`admin/`): CRM portal.

**Diagnosis.** Conversion and ranking are weak for reasons of *tuning and off-codebase signals*, not missing features:

1. **Reviews are the #1 Map Pack ranking signal and the business has few.** Nothing in the CRM currently requests reviews from completed customers.
2. **No speed-to-lead.** Form submissions hit the DB + a FormSubmit email fallback (`frontend/src/utils/api.ts: submitFormWithBackend`), but the lead gets no instant auto-reply and the owner gets no instant structured alert.
3. **Homepage leads with brand fluff** (a "Words of Wisdom" quotes section) instead of proof. The hero shows generic trust chips but no star rating / review count above the fold.
4. **Schema/NAP are not a single source of truth**, so `aggregateRating`, `geo`, and `areaServed` signals are incomplete/inconsistent across pages — these are exactly what local ranking rewards.

### Decisions locked (from brainstorming)

- **First focus:** Local SEO / rank #1 in LA.
- **GBP status:** exists, few reviews → review generation is priority.
- **Review channel:** email-first, **SMS-ready** architecture (Twilio drops in later).
- **Page strategy (Phase 2):** deepen the existing 53 city pages + curated top service×city pages.

### Full strategy = 5 pillars

| Pillar | Theme | Phase |
|---|---|---|
| 1. Review Generation Engine (CRM) | reviews → ranking | **Phase 1** |
| 2. Local Page Depth + Service×City | traffic | Phase 2 |
| 3. Technical SEO Hardening | foundation | **Phase 1** (schema/NAP) + Phase 2 |
| 4. Homepage / Conversion (CRO) | convert traffic | **Phase 1** |
| 5. GBP + Citations Playbook | off-codebase | Phase 3 |

**This spec covers Phase 1 only.** Phases 2 and 3 get their own spec → plan → implementation cycles. Phase 1 is the prerequisite set: reviews + schema + NAP make the Phase 2 pages rank far better once they land.

---

## Phase 1 scope

### 1. Review Generation Engine (email, SMS-ready)

**Outcome:** every completed job automatically asks the customer for a Google review; happy customers are routed to Google in one tap; unhappy customers are offered a private service-recovery path (without being blocked from reviewing). Admin watches review volume climb.

**Backend (`backend/app/`):**

- **New model** `models/review_request.py` — `ReviewRequest` with: `id`, `customer_id`, `appointment_id`, `customer_name`, `customer_email`, `customer_phone`, `token` (opaque URL-safe), `channel` (`email` | `sms`), `status` (`pending` | `sent` | `clicked` | `feedback_submitted` | `reviewed`), `rating` (nullable int), `private_feedback` (nullable str), `created_at`, `sent_at`, `clicked_at`, `responded_at`.
- **New service** `services/review_engine.py`:
  - `ReviewChannel` protocol with `send(request, settings) -> bool`. Implementations: `EmailReviewChannel` (reuses the existing SendGrid path used by `services/email_outreach.py`) and a `SmsReviewChannel` **stub** that raises `NotImplementedError`/logs until Twilio creds exist. A factory selects the channel from settings (`SMS_ENABLED` flag, default off).
  - `create_and_send(appointment, customer)` — idempotent: one active request per appointment.
  - Compliance: copy asks **all** customers for honest feedback; the feedback page (below) always surfaces the Google CTA. We do not hide Google from low-raters; we additionally offer a private channel.
- **New router** `routers/reviews.py`:
  - `POST /api/reviews/request` (auth) — manually trigger a request for an appointment/customer.
  - `GET /api/reviews/feedback/{token}` (public) — resolve token → marks `clicked`, returns minimal customer context for the page.
  - `POST /api/reviews/feedback/{token}` (public) — body `{ rating, private_feedback? }`; stores rating; if `rating >= 4` response includes the Google review URL, else records private feedback and notifies the owner.
  - `GET /api/reviews/stats` (auth) — counts by status, conversion funnel, total Google review clicks.
- **Trigger:** in `routers/appointments.py`, when an `AppointmentUpdate` sets `status = completed`, fire `review_engine.create_and_send(...)` (best-effort, non-blocking, wrapped so a failure never blocks the status update).
- **Settings:** add `GOOGLE_REVIEW_URL`, `SMS_ENABLED` (bool, default false), `OWNER_NOTIFY_EMAIL` to `models/settings.py` / `config.py`.

**Frontend (`frontend/`):**

- **New public page** `pages/Feedback.tsx` at route `/feedback/:token` — clean, mobile-first. Loads token context, shows a 1–5 star prompt. 4–5★ → big "Leave us a Google review" button (opens `GOOGLE_REVIEW_URL`) + thank-you. 1–3★ → short private feedback textarea posting to the backend + "a manager will reach out" confirmation. No nav chrome; not in sitemap; `noindex`.

**Admin (`admin/`):**

- **Dashboard widget**: review funnel (sent → clicked → reviewed) + total reviews-driven count, reading `GET /api/reviews/stats`.

### 2. Speed-to-lead (instant auto-reply + owner alert)

**Outcome:** the instant a quote/contact form submits, the lead gets a branded auto-reply ("we got your request, we'll call within X minutes, here's our number") and the owner gets an instant structured alert email/SMS-ready.

- **Backend:** in `routers/leads.py` `POST /api/leads`, after persisting the lead, fire two best-effort sends via a small `services/lead_notifications.py` (reusing SendGrid): (a) customer auto-reply, (b) owner alert to `OWNER_NOTIFY_EMAIL` with all lead fields + a one-click `tel:` and `mailto:`. SMS-ready via the same channel abstraction as the review engine.
- **Frontend:** no UX change required; the existing `submitFormWithBackend` already calls `POST /api/leads`. Keep the FormSubmit fallback as a belt-and-suspenders until owner-alert email is confirmed working, then it can be retired.

### 3. Homepage / Conversion (CRO)

**Outcome:** above-the-fold proof and a tighter conversion path on `pages/EnhancedLanding.tsx`.

- **Hero:** add a star-rating + review-count proof line directly under the H1 (e.g., "★★★★★ 4.9 — 1,200+ verified reviews · NADCA Certified"). Sharpen the H1 toward the primary keyword + benefit. Keep phone CTA primary.
- **Reorder:** move social proof (`ReviewMarquee` / `EnhancedTrustBadges`) above the "Words of Wisdom" quotes block; demote or shorten the quotes block (low conversion value, currently occupies prime real estate right after the hero).
- **Speed-to-lead trust cue:** add a microcopy line near the form CTA ("We respond within 15 minutes during business hours").
- **Numbers come from a single source** (see §4) so the review count shown in the hero matches schema `aggregateRating` matches GBP.

### 4. NAP single-source + schema completion

**Outcome:** one canonical business-identity object that feeds every page's visible NAP, the footer, and all structured data — so Google sees perfectly consistent signals.

- **Frontend:** create `frontend/src/config/business.ts` (single source of truth): legal name, phone, address, geo (lat/lng), hours, `priceRange`, primary + secondary GBP categories, `areaServed` (the 53 cities), `aggregateRating` ({ value, count }), `sameAs` social/citation URLs, `GOOGLE_REVIEW_URL`.
- Refactor `utils/seo/seoConfig.ts`, `SchemaMarkup.tsx`, `Footer.tsx`, and the hero proof line to consume `business.ts` instead of inline literals.
- **Complete `LocalBusiness` schema**: `@type` `HVACBusiness`, `aggregateRating`, `geo`, `areaServed`, `openingHoursSpecification`, `priceRange`, `telephone`, `sameAs`. Ensure `Service` schema on each service page and `BreadcrumbList` + `FAQPage` where applicable. Validate against Google Rich Results expectations.

### 5. Verify prerender ships in production

**Outcome:** confirm Google actually receives rendered HTML for the money pages (home, services, the 53 locations).

- Run `cd frontend && npm run build` locally; confirm `frontend/build/locations/<slug>/index.html` files contain real rendered content (H1, body copy) and not an empty `#root`.
- Confirm the Vercel build command runs the prerender step and that Puppeteer succeeds in the Vercel build environment (it can fail silently due to missing system deps). If it fails on Vercel, document the fix (e.g., `@sparticuz/chromium` or a prerender service) — implementation TBD in plan, flagged as a risk.

---

## Architecture & boundaries

- **Channel abstraction** (`ReviewChannel` / notification sender) is the key seam: email now, SMS later, no caller changes. Both the review engine and lead notifications share it.
- **`business.ts`** is the single seam for identity/NAP/ratings across visible UI + schema.
- New backend pieces follow existing model/router/service layering; new collection `review_requests` follows the existing data-access pattern in `database.py`.
- Each unit is independently testable: review engine (given an appointment → creates+sends a request), feedback router (given a token + rating → routes correctly), lead notifications (given a lead → two sends fired), schema builder (given `business.ts` → valid JSON-LD).

## Data flow

```
Job completed (admin) ──> appointments router ──> review_engine.create_and_send
                                                       │
                                          EmailReviewChannel (SendGrid)
                                                       │
                                   customer email → /feedback/:token
                                                       │
                         rating>=4 ─> Google review URL      rating<4 ─> private feedback ─> owner alert

Website form submit ──> POST /api/leads ──> persist ──> lead_notifications
                                                          ├─ customer auto-reply
                                                          └─ owner instant alert
```

## Error handling

- All outbound sends (review, auto-reply, owner alert) are **best-effort and non-blocking**: a send failure logs but never blocks the core write (status update / lead creation). Validate at boundaries (Zod on the feedback POST client-side; Pydantic server-side). Tokens are opaque and single-purpose; feedback endpoints rate-limited.

## Testing

- **Backend (pytest):** review_request model; review_engine create/send with a fake channel; feedback router rating routing (>=4 vs <4); appointments-completed trigger fires the engine; lead_notifications fires two sends; reviews/stats aggregation. Target 80%+ on new modules.
- **Frontend:** `Feedback.tsx` renders both branches; `business.ts` consumed by schema builder produces valid JSON-LD (snapshot); hero proof line renders from `business.ts`.
- **Manual/E2E:** complete an appointment in admin → confirm review email → click token → submit 5★ → see Google CTA; submit 2★ → owner gets alert. Submit a website quote → confirm auto-reply + owner alert.

## Out of scope (Phase 1)

- Twilio/SMS live sending (architecture only).
- Location page content rewrite + service×city pages (Phase 2).
- GBP optimization + citation building deliverable (Phase 3).
- Any change to the prospecting/B2B outreach engine.

## Risks

- **Puppeteer prerender on Vercel** may be failing silently → would mean money pages aren't actually indexed. Highest-priority verification.
- **Review gating compliance** — design asks everyone and never hides Google; copy must be reviewed to stay within Google policy.
- **SendGrid sender reputation/auth** (SPF/DKIM) — auto-replies and review requests must come from an authenticated domain or they land in spam.

## Phase 1 verification findings (2026-06-02)

Recorded during implementation; these inform Phase 2:

1. **Prerender does NOT capture head-injected structured data / meta (PRE-EXISTING, high SEO impact).** JSON-LD schema and meta descriptions are injected at runtime by react-helmet. The committed pre-change `frontend/build/index.html` already contained **zero** `application/ld+json` blocks; the new `HVACBusiness` schema lives in the JS bundle and renders client-side only. Google executes JS and will eventually see it, but raw-HTML schema/meta is materially stronger and more reliable for local ranking. **Remediation (Phase 2):** either (a) capture helmet head output in `scripts/prerender.js` (the prerender currently snapshots `page.content()` but the helmet `<head>` tags are not reliably present — verify `react-helmet-async` is flushing before snapshot, or inject the schema as a static `<script>` in `index.html` template / via a vite plugin), or (b) move to true SSR/SSG (e.g. `vite-react-ssg`). Until fixed, confirm money pages still get the static `<title>`/body content (they do).
2. **Local dev disk exhaustion breaks the build (`ENOSPC`).** The dev machine's C: drive hit 0 GB free, which crashed the Puppeteer prerender mid-run. Reclaim with: remove `%TEMP%\puppeteer_dev_chrome_profile-*`, `npm cache clean --force`, and `frontend/node_modules/.vite`. Vercel's build env is independent, but **verify a Vercel deploy's "View Source" shows rendered `<h1>` content** to confirm prerender succeeds there (Puppeteer may need `@sparticuz/chromium` + `puppeteer-core` in CI).
3. **`business.ts` placeholders need owner values before go-live:** real `geo` lat/lng, business `hours`, `aggregateRating` (currently 4.9/1,200 — owner confirmed 448K+ customers / 40+ yrs, so review count is plausibly separate), `googleReviewUrl` (place-id), and `sameAs` profile URLs.
4. **Code verified:** all backend modules pass `pytest` (17 tests); frontend + admin pass `tsc --noEmit`. The `npm run build` (vite) step itself succeeds — only the disk-starved prerender post-step failed locally.
