import PageHero from '@/components/PageHero';
import { Link } from '@/components/CanonicalLink';
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  MessageSquare,
  Calculator,
  Building2,
  Home,
} from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SEOProvider from '@/components/SEOProvider';
import CallbackForm from '@/components/CallbackForm';
import BookingLink from '@/components/BookingLink';
import CustomerPortalLink from '@/components/CustomerPortalLink';
import { business } from '@/config/business';

export default function Contact() {
  const smsHref = `sms:${business.phoneE164}?&body=${encodeURIComponent(
    "Hi Pure Air California, I'd like to ask about air duct or dryer vent cleaning in Los Angeles."
  )}`;

  return (
    <>
      <SEOProvider
        title="Contact Pure Air California | Los Angeles Duct Cleaning"
        description="Talk to Pure Air California about air ducts, dryer vents and commercial HVAC cleaning in Los Angeles. Call (213) 792-4145 or request a call back."
        path="/contact/"
        isLocalBusiness
      />
      <NavBar />
      <PageHero
        title={
          <>
            Contact Pure Air California
            <br />
            <em>in Los Angeles.</em>
          </>
        }
        description="Speak directly with our Los Angeles team about residential air duct cleaning (from $299), dryer vent lint removal (from $149), HOA programs, or commercial HVAC scopes."
        compact
        meta={
          <div className="pac-hero-compact-actions">
            <a className="pac-button" href={business.phoneHref} data-call-location="contact-hero">
              <Phone size={17} aria-hidden="true" /> Call {business.phone}
            </a>
            <a className="pac-hero-compact-secondary" href="#contact-callback-form">
              Request a call back <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        }
      />

      <main className="pac-contact-page pac-container">
        <div className="pac-contact-grid">
          <div>
            <a
              className="pac-contact-method"
              href={business.phoneHref}
              data-call-location="contact-card"
            >
              <Phone size={24} aria-hidden="true" />
              <div>
                <span>CALL OUR LA TEAM</span>
                <strong>{business.phone}</strong>
                <p>Talk directly with Pure Air California for scope questions and scheduling.</p>
              </div>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>

            <a className="pac-contact-method" href={smsHref}>
              <MessageSquare size={24} aria-hidden="true" />
              <div>
                <span>TEXT US ON MOBILE</span>
                <strong>Send a quick text</strong>
                <p>Share your neighborhood, service needed, or a quick photo of your equipment.</p>
              </div>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>

            <a className="pac-contact-method" href={'mailto:' + business.email}>
              <Mail size={24} aria-hidden="true" />
              <div>
                <span>EMAIL SCOPE OR COI REQUESTS</span>
                <strong>{business.email}</strong>
                <p>Ideal for HOA proposals, vendor forms, building plans, and commercial inquiries.</p>
              </div>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>

            <div className="pac-contact-method">
              <MapPin size={24} aria-hidden="true" />
              <div>
                <span>GREATER LOS ANGELES SERVICE AREA</span>
                <strong>We come to your property.</strong>
                <p>
                  Serving Los Angeles County and parts of Ventura County.{' '}
                  <Link to="/locations/">Explore all 54 service areas.</Link>
                </p>
              </div>
            </div>

            <div className="pac-contact-quick-tools">
              <h2>Prefer to start online?</h2>
              <div className="pac-contact-tool-links">
                <Link className="pac-text-link" to="/quote/#estimate-builder">
                  <Calculator size={16} aria-hidden="true" />
                  <span>Open the Estimate Builder</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <BookingLink className="pac-text-link" service="residential" />
                <BookingLink className="pac-text-link" service="commercial" />
                <CustomerPortalLink className="pac-text-link" />
              </div>
            </div>

            <div className="pac-contact-help">
              <h2>
                <Home size={19} aria-hidden="true" /> Residential callers — what helps us quote fast
              </h2>
              <p>
                Share your ZIP code, approximate number of HVAC air handlers or thermostats, whether
                the dryer exits at a wall or roof, and what prompted your call (visible dust,
                remodeling, wildfire smoke, or slow drying cycles). See{' '}
                <Link to="/pricing/">Los Angeles starting prices</Link>.
              </p>
            </div>

            <div className="pac-contact-help">
              <h2>
                <Building2 size={19} aria-hidden="true" /> Commercial &amp; HOA projects
              </h2>
              <p>
                Tell us the building use, system or unit count, access rules (roof, mechanical room,
                loading, resident notices), COI requirements, and approved working hours. Explore{' '}
                <Link to="/property-managers/">HOA &amp; property management programs</Link> or{' '}
                <Link to="/industries/">commercial industries</Link>.
              </p>
            </div>
          </div>

          <CallbackForm source="contact_form" title="Prefer us to call you?" />
        </div>
      </main>
      <Footer />
    </>
  );
}
