import { Link, useLocation } from 'react-router-dom';
import { Phone, ArrowUpRight } from 'lucide-react';
import { business } from '@/config/business';

export default function ContactDock() {
  const { pathname } = useLocation();
  // The estimate form already provides the next step on this page.
  const onQuote = pathname.replace(/\/$/, '') === '/quote';
  return (
    <nav className="pac-contact-dock" aria-label="Contact Pure Air California">
      <a href={business.phoneHref}><Phone size={18} aria-hidden="true" /><span>Call {business.phone}</span></a>
      {!onQuote && <Link to="/quote/#estimate-builder">Free estimate<ArrowUpRight size={18} aria-hidden="true" /></Link>}
    </nav>
  );
}

