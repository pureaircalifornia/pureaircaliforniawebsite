import BreathingQuoteSection from './BreathingQuoteSection';
import { Link } from '@/components/CanonicalLink';
import { ArrowUpRight } from 'lucide-react';
import BrandMark from './BrandMark';
import BookingLink from './BookingLink';
import CustomerPortalLink from './CustomerPortalLink';
import { business } from '@/config/business';
import { OPEN_PRIVACY_EVENT } from '@/utils/privacy.mjs';

const groups = [
  {
    title: 'AIR CARE',
    links: [
      ['Home services', '/home-services/'],
      ['Residential air ducts', '/services/residential-air-duct-cleaning/'],
      ['Commercial air ducts', '/services/commercial-air-duct-cleaning/'],
      ['Dryer vent cleaning', '/services/residential-dryer-vent-cleaning/'],
      ['Commercial dryer vents', '/services/commercial-dryer-vent-cleaning/'],
      ['HVAC system cleaning', '/services/hvac-system-cleaning/'],
      ['Maintenance program', '/services/dryer-vent-maintenance-program/'],
      ['Home electrostatic filters', '/services/residential-electrostatic-filter/'],
      ['Commercial filters', '/services/commercial-electrostatic-filter/'],
      ['Air duct sanitizing', '/services/air-duct-sanitizing/'],
      ['Laundromat dryer vents', '/services/laundromat-dryer-vent-cleaning/'],
      ['Wildfire & hillside ducts', '/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles/'],
      ['Commercial & HOA air care', '/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/'],
    ],
  },
  {
    title: 'LOS ANGELES AREAS',
    links: [
      ['Los Angeles guide', '/locations/los-angeles/'],
      ['Beverly Hills', '/locations/beverly-hills/'],
      ['Santa Monica', '/locations/santa-monica/'],
      ['West Hollywood', '/locations/west-hollywood/'],
      ['Brentwood', '/locations/brentwood/'],
      ['Culver City', '/locations/culver-city/'],
      ['Century City', '/locations/century-city/'],
      ['Studio City', '/locations/studio-city/'],
      ['Sherman Oaks', '/locations/sherman-oaks/'],
      ['Pasadena', '/locations/pasadena/'],
      ['Burbank', '/locations/burbank/'],
      ['Glendale', '/locations/glendale/'],
      ['Malibu', '/locations/malibu/'],
      ['All 55 service areas', '/locations/'],
    ],
  },
  {
    title: 'FOR YOUR BUSINESS',
    links: [
      ['All industries', '/industries/'],
      ['Business care by location', '/industries/#business-locations'],
      ['Healthcare facilities', '/industries/healthcare/'],
      ['Commercial real estate', '/industries/commercial-real-estate/'],
      ['Restaurants', '/industries/restaurants/'],
      ['Hotels & hospitality', '/industries/hospitality/'],
      ['Schools & education', '/industries/education/'],
      ['Manufacturing', '/industries/manufacturing/'],
      ['Retail', '/industries/retail/'],
      ['Property managers & HOAs', '/property-managers/'],
      ['Referral partners', '/partners/'],
    ],
  },
  {
    title: 'RESOURCES & COMPANY',
    links: [
      ['Request a free estimate', '/quote/#estimate-builder'],
      ['Pricing & estimates', '/pricing/'],
      ['Air care checklist', '/air-quality-calculator/'],
      ['Air care journal', '/blog/'],
      ['Indoor air quality', '/health-benefits/'],
      ['Project stories', '/project-stories/'],
      ['Case studies', '/case-studies/'],
      ['Our mission', '/about/#our-mission'],
      ['Our story', '/about/'],
      ['Contact us', '/contact/'],
    ],
  },
] as const;

export default function Footer({ showBreathingMoment = true }: { showBreathingMoment?: boolean } = {}) {
  return (
    <>
      {showBreathingMoment && <BreathingQuoteSection />}
      <footer className="pac-footer">
        <div className="pac-container">
          <div className="pac-footer-top">
            <div>
              <span className="pac-eyebrow">CARE FOR THE AIR. CARE FOR THE PEOPLE.</span>
              <h2>
                For the spaces you love.<br />
                <em>And the people within.</em>
              </h2>
            </div>
            <div className="pac-footer-top-actions">
              <Link className="pac-button pac-button-light" to="/quote/#estimate-builder">
                Get a free estimate <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <a className="pac-footer-top-phone" href={business.phoneHref}>
                Call {business.phone} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="pac-footer-grid">
            <div className="pac-footer-brand">
              <Link to="/" aria-label="Pure Air California home">
                <BrandMark />
              </Link>
              <p className="pac-footer-purpose">Because every breath is part of a life.</p>
              <p>
                Inspection-led air duct &amp; dryer vent cleaning for homes, HOAs, and commercial buildings across Greater Los Angeles and Ventura County.
              </p>
              <a className="pac-footer-phone" href={business.phoneHref}>
                {business.phone}
              </a>
              <a href={'mailto:' + business.email}>{business.email}</a>
              <p>
                Service-area business · Los Angeles, California
                <br />
                Call to confirm coverage &amp; appointment availability.
              </p>
              <nav className="pac-footer-self-service" aria-label="Customer services">
                <BookingLink className="pac-footer-booking" />
                <BookingLink service="commercial" className="pac-footer-commercial" />
                <CustomerPortalLink className="pac-footer-portal" />
              </nav>
              <div className="pac-social-links">
                <a href={business.googleProfileUrl} target="_blank" rel="noreferrer">
                  Google Business Profile ↗
                </a>
                <a href={business.googleReviewUrl} target="_blank" rel="noreferrer">
                  Leave a review ↗
                </a>
                <a href="https://instagram.com/pureaircalifornia/" target="_blank" rel="noreferrer">
                  Instagram ↗
                </a>
                <a href="https://www.yelp.com/biz/pure-air-california-los-angeles-5" target="_blank" rel="noreferrer">
                  Yelp ↗
                </a>
              </div>
            </div>

            {groups.map((g) => (
              <div key={g.title}>
                <h3>{g.title}</h3>
                <ul>
                  {g.links.map(([label, to]) => (
                    <li key={to}>
                      <Link to={to}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pac-footer-bottom">
            <span>© {new Date().getFullYear()} {business.legalName}</span>
            <span>Thoughtful care. From the inside out.</span>
            <div>
              <Link to="/privacy-policy/">Privacy</Link>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event(OPEN_PRIVACY_EVENT))}
              >
                Privacy choices
              </button>
              <Link to="/terms-of-service/">Terms</Link>
              <a href="/llms.txt" target="_blank" rel="noreferrer">
                LLMs.txt
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
