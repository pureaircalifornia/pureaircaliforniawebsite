import { ArrowUpRight } from 'lucide-react';

const portalUrl = 'https://client.housecallpro.com/customer_portal/request-link?token=8e93a8aea4cd4a2f811d8b6e829db66b';

export default function CustomerPortalLink({ className = '' }: { className?: string }) {
  return <a href={portalUrl} className={className} target="_blank" rel="noopener noreferrer" aria-label="Customer portal (opens in a new tab)" data-pac-portal="housecall-pro">
    <span>Customer portal</span><ArrowUpRight size={15} aria-hidden="true" />
  </a>;
}
