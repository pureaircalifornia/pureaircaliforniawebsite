import { Link } from '@/components/CanonicalLink';
import { ArrowRight, Check, Phone, ShieldCheck } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SEOProvider from '@/components/SEOProvider';
import PageHero from '@/components/PageHero';
import CallbackForm from '@/components/CallbackForm';
import { business } from '@/config/business';

const comparisonRows = [
  {
    factor: 'Pricing transparency',
    pac: 'Published starting rates ($299 residential ducts / $149 dryer vents) + written scope approved before work starts.',
    coupon: 'Advertised $49–$99 teaser often covers only limited vents before steep on-site add-ons.',
  },
  {
    factor: 'What is included',
    pac: 'Clarifies exact system count, supply & return runs, registers, and optional add-ons up front.',
    coupon: 'Frequently excludes return trunks, main plenums, or second systems until equipment arrives.',
  },
  {
    factor: 'Approval for extra work',
    pac: 'Any newly discovered buildup or extra system is explained and approved in writing first.',
    coupon: 'High-pressure upsells for unverified treatments or vague “deep clean” tiers.',
  },
  {
    factor: 'Documentation & walkthrough',
    pac: 'Accessible before/after photos on request plus honest notes on any unreachable duct runs.',
    coupon: 'Little or no documentation of what was actually cleaned inside the trunk lines.',
  },
];

export default function LandingCompetitor() {
  return (
    <>
      <SEOProvider
        title="How to Compare Air Duct Cleaning Quotes in LA | Pure Air CA"
        description="Compare air duct cleaning estimates in Los Angeles. See what separates written inspection-led scope from low-ball coupon ads before you book."
        path="/compare/"
        noIndex
      />
      <NavBar />
      <main>
        <PageHero
          title={
            <>
              How to Compare Air Duct Cleaning
              <br />
              <em>Quotes in Los Angeles.</em>
            </>
          }
          description="Compare Los Angeles air duct cleaning estimates apples-to-apples—know what to ask about system counts, written scope, and hidden coupon upsells before you book."
        />

        <div className="pac-container pac-campaign-grid">
          <article>
            <div className="pac-campaign-price-callout">
              <ShieldCheck size={20} aria-hidden="true" />
              <div>
                <strong>Written scope before equipment comes off the truck</strong>
                <span>Residential ducts from $299 · Dryer vents from $149 · Zero hidden upsells</span>
              </div>
            </div>

            <section>
              <h2>Inspection-led written scope vs. low-ball coupon ads</h2>
              <div className="pac-lead-table">
                <table>
                  <thead>
                    <tr>
                      <th>What to check</th>
                      <th>Pure Air California</th>
                      <th>Typical $49–$99 coupon offer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr key={row.factor}>
                        <th>{row.factor}</th>
                        <td>{row.pac}</td>
                        <td>{row.coupon}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2>3 questions to ask any Los Angeles duct cleaner</h2>
              <ul className="pac-campaign-checklist">
                <li>
                  <Check size={16} aria-hidden="true" />
                  <span>
                    <strong>How many systems and vents does this quote include?</strong> Confirm
                    whether return ducts, main trunk lines, and second air handlers are included.
                  </span>
                </li>
                <li>
                  <Check size={16} aria-hidden="true" />
                  <span>
                    <strong>Will I see the final price in writing before work starts?</strong>{' '}
                    Never agree to open-ended per-foot or “surprise sanitization” charges mid-job.
                  </span>
                </li>
                <li>
                  <Check size={16} aria-hidden="true" />
                  <span>
                    <strong>Will you document accessible work?</strong> Ask for a walkthrough and
                    accessible photos rather than vague verbal assurances.
                  </span>
                </li>
              </ul>
            </section>

            <div className="pac-campaign-links">
              <Link className="pac-button" to="/quote/#estimate-builder">
                Build a transparent estimate <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link className="pac-text-link" to="/pricing/">
                Read the LA pricing guide →
              </Link>
              <a
                className="pac-text-link"
                href={business.phoneHref}
                data-call-location="compare-body"
              >
                <Phone size={16} aria-hidden="true" /> {business.phone}
              </a>
            </div>
          </article>

          <CallbackForm source="quote_form" title="Ask us to review your scope" />
        </div>
      </main>
      <Footer />
    </>
  );
}
