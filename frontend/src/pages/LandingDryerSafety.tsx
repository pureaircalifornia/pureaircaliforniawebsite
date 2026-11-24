import { Link } from '@/components/CanonicalLink';
import { ArrowRight, Check, Flame, Phone } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SEOProvider from '@/components/SEOProvider';
import PageHero from '@/components/PageHero';
import CallbackForm from '@/components/CallbackForm';
import { business } from '@/config/business';
import { quoteLink } from '@/utils/quoteContext.mjs';

const warningSigns = [
  'Loads regularly take more than one full drying cycle to finish',
  'The dryer top or laundry closet feels unusually hot or humid during use',
  'Visible lint collects around the exterior wall hood or roof vent screen',
  'A faint hot or burning lint odor appears when the dryer runs',
  'It has been over a year (or unknown) since the full exhaust run was cleared',
];

export default function LandingDryerSafety() {
  return (
    <>
      <SEOProvider
        title="Dryer Vent Cleaning Los Angeles | Starting at $149 | Pure Air CA"
        description="Residential dryer vent cleaning in Los Angeles starts at $149. Clear compacted lint from laundry connection to exterior wall or roof hood."
        path="/dryer-safety/"
        noIndex
      />
      <NavBar />
      <main>
        <PageHero
          title={
            <>
              Dryer Vent Fire Prevention &amp;
              <br />
              <em>Exhaust Cleaning in Los Angeles.</em>
            </>
          }
          description="Clear compacted lint from the entire dryer exhaust run—from the laundry hookup to the exterior wall or roof termination—with residential scopes starting at $149."
          estimateHref={quoteLink('/dryer-safety/', '', {
            service: 'dryer-vent',
            property: 'home',
          })}
          estimateLabel="Get a dryer vent quote"
        />

        <div className="pac-container pac-campaign-grid">
          <article>
            <div className="pac-campaign-price-callout">
              <Flame size={20} aria-hidden="true" />
              <div>
                <strong>Residential dryer vent cleaning starts at $149</strong>
                <span>
                  Written scope confirmed before work begins · Homes, condos, HOAs &amp; laundromats
                </span>
              </div>
            </div>

            <section>
              <h2>5 signs your dryer vent needs inspection</h2>
              <ul className="pac-campaign-checklist">
                {warningSigns.map((sign) => (
                  <li key={sign}>
                    <Check size={16} aria-hidden="true" />
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2>Follow the entire exhaust path</h2>
              <p>
                Cleaning the lint trap inside your dryer only catches part of the fiber. The rest
                travels through the wall or ceiling duct—especially in multi-story Los Angeles homes
                and condos with vertical roof terminations. We clear the full accessible path and
                check airflow at the exterior hood.
              </p>
            </section>

            <section>
              <h2>Plan safe, ongoing care</h2>
              <p>
                We’ll note the vent length, transition hose condition, and exterior flap operation so
                you know how frequently your household or building should schedule routine clearing.
              </p>
            </section>

            <div className="pac-campaign-links">
              <Link
                className="pac-button"
                to={quoteLink('/dryer-safety/', '', { service: 'dryer-vent', property: 'home' })}
              >
                Open Estimate Builder <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link className="pac-text-link" to="/services/residential-dryer-vent-cleaning/">
                Explore dryer vent cleaning →
              </Link>
              <a
                className="pac-text-link"
                href={business.phoneHref}
                data-call-location="dryer-safety-body"
              >
                <Phone size={16} aria-hidden="true" /> {business.phone}
              </a>
            </div>
          </article>

          <CallbackForm
            source="quote_form"
            title="Request a dryer vent callback"
            initialService="Dryer vent cleaning"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
