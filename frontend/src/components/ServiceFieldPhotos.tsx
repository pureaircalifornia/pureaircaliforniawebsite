import { Phone } from 'lucide-react';
import { business } from '@/config/business';

export default function ServiceFieldPhotos() {
  return (
    <aside className="pac-field-photos" aria-label="A closer look at PAC field work">
      <span className="pac-eyebrow">FROM THE PAC PHOTO LIBRARY</span>
      <h3>A closer look. A clearer plan.</h3>
      <div className="pac-field-photo-grid">
        <figure>
          <img src="/images/pac/realInspection.webp" alt="PAC field photograph looking inside a ventilation opening" width="600" height="450" loading="lazy" />
          <figcaption><strong>Look beyond the grille.</strong>The inside of your system helps us understand what needs attention.</figcaption>
        </figure>
        <figure>
          <img src="/images/pac/realEquipment.webp" alt="Air-system cleaning equipment with hoses from the PAC project library" width="600" height="450" loading="lazy" />
          <figcaption><strong>Prepare for your space.</strong>Access, duct material and system condition help shape the cleaning plan.</figcaption>
        </figure>
      </div>
      <a href={business.phoneHref}><Phone size={18} aria-hidden="true" />Talk through your project with PAC</a>
    </aside>
  );
}
