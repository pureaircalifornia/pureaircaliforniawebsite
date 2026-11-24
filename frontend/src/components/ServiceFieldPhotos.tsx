import { Phone, ArrowUpRight } from 'lucide-react';
import { Link } from '@/components/CanonicalLink';
import { business } from '@/config/business';

export default function ServiceFieldPhotos() {
  return (
    <aside className="pac-field-photos" aria-label="A closer look at PAC field work">
      <span className="pac-eyebrow">INSIDE THE DUCTWORK</span>
      <h3>See what negative-pressure source removal addresses.</h3>
      <div className="pac-field-photo-grid">
        <figure>
          <img
            src="/images/pac/dirtyDuct.webp"
            alt="Accumulated dust and debris inside a galvanized air duct prior to negative-pressure source removal"
            width={600}
            height={450}
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            <strong>Before cleaning: inspect beyond the room grille.</strong> Looking inside accessible supply and return trunk lines confirms what has actually settled in the ductwork.
          </figcaption>
        </figure>
        <figure>
          <img
            src="/images/pac/duct-interior-clean-v2.webp"
            alt="Clean galvanized sheet-metal air duct interior after negative-pressure extraction"
            width={600}
            height={450}
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            <strong>After source removal: cleared air pathways.</strong> Mechanical agitation paired with negative-pressure containment extracts loose particulate from accessible runs.
          </figcaption>
        </figure>
      </div>
      <div className="flex flex-wrap items-center gap-5 mt-4">
        <a href={business.phoneHref} className="inline-flex items-center gap-2">
          <Phone size={18} aria-hidden="true" />
          Talk through your system with PAC: {business.phone}
        </a>
        <Link to="/pricing/" className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:underline">
          See starting prices &amp; scope details <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
