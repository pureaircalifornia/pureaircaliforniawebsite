import { ClipboardList } from 'lucide-react';

// Native links preserve the supplied attribution and work without provider scripts.
export const BOOKING_URL = 'https://book.housecallpro.com/book/Pure-Air-California/41595344e7314e6ca990aa001be77af6?v2=true&attr=11314';
export const COMMERCIAL_QUOTE_URL = 'https://book.housecallpro.com/lead-form/Pure-Air-California/3caf59e03b3740eb9d8bfe02b158a49e';

type RequestLinkProps = { className?: string; service?: 'residential' | 'commercial'; compact?: boolean };

export default function BookingLink({ className = 'pac-button pac-book-online', service = 'residential', compact = false }: RequestLinkProps) {
  const commercial = service === 'commercial';
  const label = commercial ? 'Commercial quote' : compact ? 'Residential request' : 'Request residential service';
  return <a href={commercial ? COMMERCIAL_QUOTE_URL : BOOKING_URL} className={className} data-pac-booking="housecall-pro" data-pac-service={service}><ClipboardList size={17} aria-hidden="true" /><span>{label}</span></a>;
}
