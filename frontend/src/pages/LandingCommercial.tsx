import { Link } from '@/components/CanonicalLink';
import { ArrowRight, Building2, Check, Phone } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SEOProvider from '@/components/SEOProvider';
import PageHero from '@/components/PageHero';
import CallbackForm from '@/components/CallbackForm';
import BookingLink from '@/components/BookingLink';
import { business } from '@/config/business';
import { quoteLink } from '@/utils/quoteContext.mjs';

const commercialPoints = [
  'Site-specific written proposals mapped by RTU, air handler, or multi-unit stack',
  'COI / certificate of insurance and vendor onboarding documentation prepared upfront',
  'Evening, weekend, or phased tenant work windows arranged subject to availability',
  'Zone-by-zone closeout notes and accessible before/after photos for facility records',
];

export default function LandingCommercial() {
  return (
    <>
      <SEOProvider
        title="Commercial Air Duct & HVAC Cleaning Los Angeles | Pure Air CA"
        description="Plan commercial air duct, dryer exhaust, and HVAC cleaning around your LA facility’s working hours, access rules, and COI requirements."
        path="/commercial-services/"
        noIndex
      />
      <NavBar />
      <main>
        <PageHero
          title={
            <>
              Commercial Air Duct &amp; HVAC
              <br />
              <em>Cleaning for Los Angeles Facilities.</em>
            </>
          }
          description="Plan air duct, dryer exhaust, and HVAC component cleaning around your facility’s operating hours, tenant schedules, and COI documentation requirements."
          estimateHref={quoteLink('/commercial-services/', '', {
            service: 'air-duct',
            property: 'commercial',
          })}
          estimateLabel="Request a commercial quote"
        />

        <div className="pac-container pac-campaign-grid">
          <article>
            <div className="pac-campaign-price-callout">
              <Building2 size={20} aria-hidden="true" />
              <div>
                <strong>Built for LA facility managers, HOAs &amp; hospitality</strong>
                <span>Offices · Restaurants · Hotels · Medical suites · Multifamily buildings</span>
              </div>
            </div>

            <section>
              <h2>Commercial operations readiness</h2>
              <ul className="pac-campaign-checklist">
                {commercialPoints.map((point) => (
                  <li key={point}>
                    <Check size={16} aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2>Start with your building layout</h2>
              <p>
                Tell us your building type, approximate number of rooftop or indoor air handlers,
                site access rules (loading docks, roof keys, security escorts), and preferred work
                hours. We’ll define whether a site walkthrough is helpful and deliver a clear written
                proposal.
              </p>
            </section>

            <section>
              <h2>Portfolio &amp; recurring maintenance</h2>
              <p>
                Managing multiple Los Angeles buildings or high-use laundry rooms? Ask about
                phased multi-site scheduling and recurring dryer exhaust maintenance programs.
              </p>
            </section>

            <div className="pac-campaign-links">
              <Link
                className="pac-button"
                to={quoteLink('/commercial-services/', '', {
                  service: 'air-duct',
                  property: 'commercial',
                })}
              >
                Open commercial estimator <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <BookingLink className="pac-text-link" service="commercial" />
              <Link className="pac-text-link" to="/industries/">
                Explore industries →
              </Link>
              <a
                className="pac-text-link"
                href={business.phoneHref}
                data-call-location="commercial-landing-body"
              >
                <Phone size={16} aria-hidden="true" /> {business.phone}
              </a>
            </div>
          </article>

          <CallbackForm
            source="quote_form"
            title="Request a commercial callback"
            initialProperty="Business / commercial"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
