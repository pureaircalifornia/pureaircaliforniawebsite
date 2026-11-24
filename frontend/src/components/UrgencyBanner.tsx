import { Phone, ArrowRight } from 'lucide-react';
import { Link } from '@/components/CanonicalLink';
import { business } from '@/config/business';

/**
 * Transparent LA service notice bar.
 * Deliberately free of fabricated scarcity counters or fake urgency claims.
 */
const UrgencyBanner = () => {
  return (
    <div className="bg-[#0a3d7c] text-white font-medium py-2 px-4 border-b border-[#12486a]">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center text-center gap-2 sm:gap-5 text-sm">
        <span>
          Serving Greater Los Angeles · Residential air ducts from $299 · Dryer vents from $149
        </span>
        <div className="flex items-center gap-3">
          <Link
            to="/quote/#estimate-builder"
            className="inline-flex items-center gap-1.5 bg-white text-[#0a3d7c] px-3.5 py-1 rounded-full font-semibold hover:bg-[#edf7f7] transition-colors"
          >
            Free written estimate <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <a
            href={business.phoneHref}
            className="inline-flex items-center gap-1.5 text-white underline underline-offset-4 font-semibold"
          >
            <Phone size={14} aria-hidden="true" /> {business.phone}
          </a>
        </div>
      </div>
    </div>
  );
};

export default UrgencyBanner;
