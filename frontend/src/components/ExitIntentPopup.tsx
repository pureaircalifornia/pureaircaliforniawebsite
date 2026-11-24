import { Phone, ArrowRight } from 'lucide-react';
import { Link } from '@/components/CanonicalLink';
import { business } from '@/config/business';

/**
 * Legacy export retained for type-compatibility; Pure Air California does not use
 * intrusive exit-intent popups or unverified coupon discounts.
 */
const ExitIntentPopup = () => null;

export function InlineEstimateReminder() {
  return (
    <div className="p-6 rounded-2xl border border-slate-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <strong className="block text-slate-900 text-lg">Need a written scope for your LA property?</strong>
        <p className="text-slate-600 text-sm mt-1">
          Residential air duct cleaning from $299 · Dryer vents from $149 · Written confirmation before work begins.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Link className="pac-button" to="/quote/#estimate-builder">
          Free estimate <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <a className="pac-text-link" href={business.phoneHref}>
          <Phone size={15} aria-hidden="true" /> {business.phone}
        </a>
      </div>
    </div>
  );
}

export default ExitIntentPopup;
