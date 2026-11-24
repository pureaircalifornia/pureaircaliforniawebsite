import { Link } from '@/components/CanonicalLink';
import { Phone, ShieldCheck } from 'lucide-react';
import BrandMark from './BrandMark';
import { business } from '@/config/business';

export default function AuthorBox({
  authorName,
  dateModified,
}: {
  authorName: string;
  dateModified?: string;
}) {
  const reviewedDate = dateModified
    ? new Date(`${dateModified}T12:00:00`).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <aside className="pac-author-box" aria-label="About the author and editorial standards">
      <BrandMark />
      <div>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700 mb-1">
          <ShieldCheck size={14} aria-hidden="true" />
          Pure Air California Technical &amp; Editorial Team · Los Angeles
        </span>
        <h2>Reviewed by {authorName}</h2>
        <p>
          Written by the Pure Air California field and client-relations team serving Los Angeles County
          and Ventura County. Guidance references public EPA, USFA, OSHA, and NFPA resources where applicable
          and never replaces an on-site system inspection or medical advice.
          {reviewedDate ? ` Last reviewed ${reviewedDate}.` : ''}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3">
          <a href={business.phoneHref} className="inline-flex items-center gap-1.5 font-semibold">
            <Phone size={15} aria-hidden="true" />
            Talk to PAC: {business.phone}
          </a>
          <Link to="/about/#information-standards">Our editorial standards →</Link>
          <Link to="/project-stories/">Documented LA projects →</Link>
        </div>
      </div>
    </aside>
  );
}
