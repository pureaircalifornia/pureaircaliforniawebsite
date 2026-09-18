# Field notes worksheet — the 54 city pages

## Why this exists

The city pages are the highest commercial-intent pages on the site. Someone
searching "air duct cleaning Sherman Oaks" is closer to booking than anyone
searching anything else. Getting them indexed is worth more than any other SEO
work available.

The obstacle is measured, not theoretical. Run `npm run locations:report` after a
build:

```
Overall unique text: 30.4%   (69.6% shared across city pages)
WEAK (<35%, unlikely to be indexed): 54
```

Each city page is ~1,029 words, of which roughly 310 appear on no other city page.
The other ~700 are shared with the 53 siblings. Google indexes a page when it is
worth its own slot in the index; 54 pages that are ~70% the same text are not 54
slots' worth of content. That is what "Crawled – currently not indexed" means when
it happens to pages like these.

Everything that could be fixed in the template has been:

- region-specific conditions, FAQs and seasonal advice (7 regions, not 1 template)
- reviews rotated per city instead of the same four on all 54
- zip codes and neighbouring cities written out as prose
- every city now linked from the Los Angeles hub, not just 13 of them

That moved unique text from 28.9% to 30.4%, and the worst duplicate pair from
57.0% to 51.9%. Real, but small — because the remaining shared text is the offer,
the pricing, the reviews, the forms and the calls to action, and a service landing
page needs all of those. **Template work has hit its ceiling.**

## The arithmetic

To reach ~45% unique — the point where indexation becomes likely rather than
unlikely — each page needs roughly **150 more words that appear on no other page**.

That is two or three sentences per city. Not an article. 54 × 150 ≈ 8,000 words
total, and it is the only remaining lever that works.

## What NOT to write

This site has already been cleaned up once for invented per-city testimonials —
54 of them, with fake reviewer names attached to fake neighbourhoods. See
`src/data/googleReviews.ts`. Do not reintroduce that in another shape.

So: nothing invented. No statistics you have not seen, no "most homes in X are
from the 1950s" unless you know it, no customer counts per neighbourhood, no
claims about a neighbourhood you have not worked in.

If you have not worked a city enough to say anything true about it, leave it
blank. A blank entry falls back to the region copy, which is honest. A fabricated
one is the thing that got the domain in trouble.

## What to write

Two or three sentences per city, from actual jobs. The most useful material:

1. **What you actually find there.** "Most of the homes we do in Sherwood Forest
   are single-storey ranch houses with the original flexible duct in the crawl
   space, and it sags at the joins." That sentence cannot be written about
   anywhere else, which is exactly the point.

2. **A system type or layout that recurs.** Attic vs crawl space, package units on
   the roof, multi-zone estates, wall heaters, shared risers in a condo tower.

3. **An access quirk.** Narrow canyon roads, permit parking, HOA scheduling rules,
   buildings where the only access is through a closet.

4. **What the local conditions do in practice** — not the general theory, which
   the region copy already covers, but what you see. "Ash gets into the return
   before anyone notices, because it comes in through the attic vents rather than
   the intake."

5. **A job you remember there**, with no customer name and nothing identifying.

Write it the way you would say it to a customer standing in their hallway. It does
not need to be polished — awkward and specific beats smooth and generic, and I can
tidy the wording without touching the substance.

## How to fill it in

Add a `fieldNotes` line to the city's entry in `data.ts`:

```ts
{
  name: "Sherwood Forest",
  slug: "sherwood-forest",
  region: "san-fernando-valley",
  ...
  fieldNotes: "Most Sherwood Forest homes we service are single-storey ranch builds with the original flexible duct running through the crawl space, and after fifty years the joins sag enough to collect standing debris. Access is usually through the hallway closet rather than the attic, which makes the job quicker than the Valley average.",
}
```

Then `npm run build && npm run locations:report` to see the number move.

## Priority order

Start with the weakest pages — the report lists them. As of the last run:

```
valley-glen, encino-village, beverly-glen, valley-village, magnolia-park,
mission-hills, west-la, north-hollywood, beverly-hills, chatsworth,
malibu, encino, panorama-city, sepulveda-basin, sun-valley
```

The pairs at highest risk of being treated as duplicates of each other:

```
sherwood-forest <-> sun-valley        51.9%
sherman-oaks    <-> woodland-hills    51.4%
valley-glen     <-> van-nuys          51.0%
northridge      <-> toluca-lake       50.9%
magnolia-park   <-> panorama-city     50.5%
brentwood       <-> sawtelle          50.2%
```

Writing notes for **both** halves of a pair is worth more than writing for two
unrelated cities, because it separates two pages that currently look like the same
page to a crawler.

## The alternative, stated plainly

If the notes do not get written, the honest recommendation is the one from the
original audit: keep the 12–15 cities where the business actually concentrates,
give those real content, and fold the rest into `/locations/` as a served-areas
list. Fifteen pages that get indexed and rank will book more work than 54 that sit
in "Crawled – currently not indexed".

Fifty-four strong pages beat fifteen strong pages. Fifty-four weak pages lose to
fifteen strong ones. The deciding factor is whether the notes get written, and
that is a business decision rather than a technical one.
