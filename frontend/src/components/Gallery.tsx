import { useEffect, useRef, useState } from 'react';
import { Link } from '@/components/CanonicalLink';
import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2, X } from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';

const photos = [
  {
    src: '/images/field/pac-crew-at-work-1200.webp',
    srcSet: '/images/field/pac-crew-at-work-640.webp 640w, /images/field/pac-crew-at-work-1200.webp 1200w',
    title: 'Our crew on site.',
    text: 'Uniformed Pure Air California technicians protecting the workspace with sheeting before opening the register.',
    alt: 'Two uniformed Pure Air California technicians servicing a ceiling vent with protective sheeting covering nearby surfaces',
    position: '50% 24%',
  },
  {
    src: '/images/field/duct-cleaning-in-action-1200.webp',
    srcSet: '/images/field/duct-cleaning-in-action-640.webp 640w, /images/field/duct-cleaning-in-action-1200.webp 1200w',
    title: 'Source removal inside the duct.',
    text: 'Loosening and collecting accumulated dust directly inside the air pathway under negative pressure.',
    alt: 'Cleaning nozzle removing accumulated dust inside a round ventilation duct during PAC service',
    position: 'center',
  },
  {
    src: '/images/field/metal-air-path-1200.webp',
    srcSet: '/images/field/metal-air-path-640.webp 640w, /images/field/metal-air-path-1200.webp 1200w',
    title: 'A clear metal air path.',
    text: 'Field view down a clean galvanized round HVAC trunk line ready for steady airflow.',
    alt: 'Field photograph looking down a spotless galvanized sheet-metal air duct',
    position: 'center',
  },
  {
    src: '/images/field/collected-lint-1200.webp',
    srcSet: '/images/field/collected-lint-640.webp 640w, /images/field/collected-lint-1200.webp 1200w',
    title: 'Dryer lint extracted.',
    text: 'Compacted lint pulled from a restricted dryer exhaust run to restore ventilation and reduce heat buildup.',
    alt: 'Technician holding dense compacted dryer lint removed from an exhaust duct',
    position: 'center',
  },
];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastIndexRef = useRef<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    lastIndexRef.current = lightboxIndex;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setLightboxIndex(null);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        setLightboxIndex((i) => (i === null ? 0 : (i + 1) % photos.length));
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setLightboxIndex((i) => (i === null ? 0 : (i - 1 + photos.length) % photos.length));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      if (lastIndexRef.current !== null) {
        triggerRefs.current[lastIndexRef.current]?.focus();
      }
    };
  }, [lightboxIndex]);

  const activePhoto = lightboxIndex !== null ? photos[lightboxIndex] : null;

  return (
    <section className="pac-work-section pac-field-gallery" aria-labelledby="pac-field-heading">
      <div className="pac-container">
        <div className="pac-work-header">
          <span className="pac-eyebrow">A CLOSER LOOK AT PAC</span>
          <h2 id="pac-field-heading">The people. The work. The details.</h2>
          <p>Real field archive photographs from Pure Air California visits—showing how we protect your space and what collects behind the vent.</p>
        </div>

        <div className="pac-gallery-compare">
          <div className="pac-gallery-compare-copy">
            <span className="pac-eyebrow">INTERACTIVE FIELD COMPARISON</span>
            <h3>Drag to see inside the air path.</h3>
            <p>
              Household dust, lint, and renovation particulate settle out of sight along supply and return runs. Slide across two genuine PAC field archive photographs to contrast heavy interior buildup against clear sheet-metal ductwork.
            </p>
            <div className="pac-gallery-compare-actions">
              <Link className="pac-button" to="/quote/#estimate-builder">
                Request a free estimate <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <Link className="pac-text-link" to="/services/residential-air-duct-cleaning/">
                What air duct cleaning includes <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <BeforeAfterSlider
            beforeImage="/images/field/duct-cleaning-in-action-1200.webp"
            beforeSrcSet="/images/field/duct-cleaning-in-action-640.webp 640w, /images/field/duct-cleaning-in-action-1200.webp 1200w"
            afterImage="/images/field/metal-air-path-1200.webp"
            afterSrcSet="/images/field/metal-air-path-640.webp 640w, /images/field/metal-air-path-1200.webp 1200w"
            beforeLabel="Buildup inside duct"
            afterLabel="Clear metal ductwork"
            beforeAlt="PAC field photograph of heavy dust accumulation inside a round ventilation duct during cleaning"
            afterAlt="PAC field photograph looking down a spotless galvanized sheet-metal air duct"
            caption="Field archive comparison of two separate PAC job photographs (buildup during cleaning vs. clear galvanized ductwork). Results vary by duct type, age, and access."
          />
        </div>

        <div className="pac-work-grid">
          {photos.map((photo, index) => (
            <figure className="pac-work-card" key={photo.src}>
              <button
                type="button"
                ref={(el) => { triggerRefs.current[index] = el; }}
                className="pac-work-card-trigger"
                onClick={() => setLightboxIndex(index)}
                aria-label={`Inspect field photograph: ${photo.title}`}
              >
                <img
                  src={photo.src}
                  srcSet={photo.srcSet}
                  sizes="(max-width: 600px) 100vw, 50vw"
                  alt={photo.alt}
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: photo.position }}
                />
                <span className="pac-work-zoom" aria-hidden="true">
                  <Maximize2 size={15} />
                  <span>Inspect</span>
                </span>
              </button>
              <figcaption>
                <strong>{photo.title}</strong>
                {photo.text}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="pac-gallery-footer">
          <Link className="pac-text-link" to="/services/residential-air-duct-cleaning/">
            See what air duct cleaning includes <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          <Link className="pac-text-link" to="/case-studies/">
            Read Los Angeles case studies <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {activePhoto && lightboxIndex !== null && (
        <div
          className="pac-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Field photograph ${lightboxIndex + 1} of ${photos.length}: ${activePhoto.title}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) setLightboxIndex(null);
          }}
        >
          <div className="pac-lightbox-dialog">
            <div className="pac-lightbox-bar">
              <span>
                {String(lightboxIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')} · PAC Field Archive
              </span>
              <button
                ref={closeRef}
                type="button"
                className="pac-lightbox-close"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close photograph view"
              >
                <X size={20} aria-hidden="true" />
                <span>Close</span>
              </button>
            </div>
            <div className="pac-lightbox-media">
              <img
                src={activePhoto.src}
                srcSet={activePhoto.srcSet}
                sizes="92vw"
                alt={activePhoto.alt}
                width={1200}
                height={900}
              />
            </div>
            <div className="pac-lightbox-foot">
              <div>
                <strong>{activePhoto.title}</strong>
                <p>{activePhoto.text}</p>
              </div>
              <div className="pac-lightbox-nav">
                <button
                  type="button"
                  onClick={() => setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length)}
                  aria-label="Previous field photograph"
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIndex((lightboxIndex + 1) % photos.length)}
                  aria-label="Next field photograph"
                >
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
