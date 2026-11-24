import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, MailCheck, Phone, Wind } from 'lucide-react';
import { Link } from '@/components/CanonicalLink';
import SEOProvider from '@/components/SEOProvider';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import CustomerPortalLink from '@/components/CustomerPortalLink';
import { business } from '@/config/business';

const prepSteps = [
  {
    title: 'Clear quick access to equipment',
    detail:
      'Leave roughly 2–3 feet of clear floor space near your furnace, air handler closet, attic hatch, or laundry hookup.',
  },
  {
    title: 'Note parking, gates & building rules',
    detail:
      'Have gate codes, driveway/permit instructions, or condo concierge check-in details ready so arrival goes smoothly.',
  },
  {
    title: 'Keep pets comfortable',
    detail:
      'Doors stay briefly ajar while hoses and vacuums are set up—a quiet room keeps curious pets relaxed.',
  },
  {
    title: 'Flag priority vents or concerns',
    detail:
      'Point out any specific rooms with dust, remodeling debris, smoke odors, or slow-drying laundry during the initial walkthrough.',
  },
];

export default function BookingThankYou() {
  const [quietMoment, setQuietMoment] = useState(false);
  // This page is a public destination, not proof of a completed transaction.
  // Do not emit a lead, booking or purchase event on page entry.
  return (
    <>
      <SEOProvider
        title="Thank You & Next Steps | Pure Air California"
        description="Your next steps and quick visit preparation checklist after requesting air duct or dryer vent service with Pure Air California in Los Angeles."
        path="/booking-thank-you/"
        noIndex
      />
      <NavBar />
      <main className="pac-booking-thanks">
        <section className="pac-container pac-booking-welcome" aria-labelledby="booking-thanks-title">
          <div className="pac-booking-welcome-copy">
            <span className="pac-eyebrow">PURE AIR. THOUGHTFUL CARE.</span>
            <h1 id="booking-thanks-title">
              Thank you.
              <br />
              <em>Take a quiet moment.</em>
            </h1>
            <p className="pac-booking-lead">
              We’re glad you chose Pure Air California for your space. Check your Housecall Pro
              email or text confirmation for your submitted request details and updates.
            </p>
            <p>
              If an exact arrival window hasn’t been confirmed yet, our Los Angeles team will reach
              out directly to finalize scope and timing. Need to update access notes or ask a
              question? Give us a call anytime.
            </p>
            <div className="pac-booking-thanks-actions">
              <a
                className="pac-button"
                href={business.phoneHref}
                data-call-location="booking-thank-you"
              >
                <Phone size={17} aria-hidden="true" /> Call {business.phone}
              </a>
              <CustomerPortalLink className="pac-text-link" />
            </div>
          </div>

          <div className="pac-booking-pause" data-running={quietMoment}>
            <div className="pac-booking-orbit" aria-hidden="true">
              <span />
              <span />
              <Wind size={38} strokeWidth={1.2} />
            </div>
            <h2>A little room to breathe.</h2>
            <p>Relax your shoulders. Breathe naturally, at your own comfortable pace.</p>
            <button
              type="button"
              className="pac-button pac-booking-pause-button"
              aria-pressed={quietMoment}
              onClick={() => setQuietMoment((value) => !value)}
            >
              {quietMoment ? 'Finish quiet moment' : 'Take a quiet moment'}
            </button>
            <small>No sound. No need to follow a rhythm.</small>
          </div>
        </section>

        <section className="pac-container pac-booking-prep" aria-labelledby="booking-prep-heading">
          <div className="pac-booking-prep-head">
            <span className="pac-eyebrow">VISIT PREPARATION CHECKLIST</span>
            <h2 id="booking-prep-heading">Four quick things before your technician arrives</h2>
            <p>
              Nothing heavy required—just a few small steps that make your walkthrough faster and
              protect your home.
            </p>
          </div>
          <ol className="pac-booking-prep-grid">
            {prepSteps.map((step, index) => (
              <li key={step.title}>
                <div className="pac-booking-prep-top">
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>0{index + 1}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="pac-container pac-booking-next" aria-labelledby="booking-next-heading">
          <div>
            <MailCheck size={24} aria-hidden="true" />
            <h2 id="booking-next-heading">Keep your confirmation handy.</h2>
            <p>
              Your Housecall Pro confirmation email/SMS is the authoritative record of what you
              submitted and any confirmed appointment window. Visiting this page alone does not
              confirm a service date or payment.
            </p>
          </div>
          <div>
            <h3>Written scope before work starts</h3>
            <p>
              When our technician arrives, we walk through accessible vents and equipment with you
              and confirm the exact written scope and price before any cleaning begins.
            </p>
            <Link className="pac-text-link" to="/services/">
              Explore our services <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <div className="pac-container pac-booking-return">
          <Link to="/">Back to Pure Air California</Link>
          <p>
            Need to share parking, gate, or property details? <Link to="/contact/">Contact us</Link>{' '}
            or call <a href={business.phoneHref}>{business.phone}</a>.
          </p>
        </div>
      </main>
      <Footer showBreathingMoment={false} />
    </>
  );
}
