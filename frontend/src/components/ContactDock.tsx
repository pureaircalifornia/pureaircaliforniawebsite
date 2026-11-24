import { useLocation } from 'react-router-dom';
import { Link } from '@/components/CanonicalLink';
import { Phone, ArrowUpRight } from 'lucide-react';
import { business } from '@/config/business';
import { quoteContext, quoteLink } from '@/utils/quoteContext.mjs';
import { isPrivatePath } from '@/utils/seo/searchPolicy.mjs';
import BookingLink from './BookingLink';

export default function ContactDock() {
  const { pathname, search } = useLocation();
  if (isPrivatePath(pathname)) return null;

  const normalized = pathname.replace(/\/$/, '') || '/';
  const onQuote = normalized === '/quote';
  const onThankYou = normalized === '/booking-thank-you';
  const context = quoteContext(pathname, search);
  const commercial = ['commercial', 'managed'].includes(context.property);
  const estimateHref = quoteLink(pathname, search);
  const estimateLabel = commercial ? 'Property quote' : 'Free estimate';

  return (
    <nav className="pac-contact-dock" aria-label="Contact Pure Air California">
      <a
        href={business.phoneHref}
        data-call-location="contact-dock"
        aria-label={`Call Pure Air California at ${business.phone}`}
      >
        <Phone size={17} aria-hidden="true" />
        <span>Call PAC</span>
      </a>
      {!onQuote && (
        <Link
          to={estimateHref}
          aria-label={
            context.locationLabel
              ? `${estimateLabel} for ${context.locationLabel}`
              : estimateLabel
          }
        >
          <span>{estimateLabel}</span>
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      )}
      {!onThankYou && (
        <BookingLink
          className="pac-dock-booking"
          service={commercial ? 'commercial' : 'residential'}
          compact
        />
      )}
    </nav>
  );
}
