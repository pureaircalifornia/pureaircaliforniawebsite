import BrandMark from './BrandMark';
import { business } from '@/config/business';

export default function BrandedLoading() {
  return (
    <div className="pac-loading">
      <div className="pac-loading-content">
        <div className="pac-loading-mark"><BrandMark /><span className="pac-loading-sweep" aria-hidden="true" /></div>
        <div className="pac-loading-air" aria-hidden="true"><i /><i /><i /></div>
        <p role="status" aria-live="polite">A little fresh air is on the way.</p>
        <span className="pac-loading-caption">Loading your page…</span>
      </div>
      <a className="pac-loading-call" href={business.phoneHref}>Prefer to talk? Call {business.phone}</a>
    </div>
  );
}
