import { ReactNode, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from '@/components/CanonicalLink';
import { CalendarDays, Check, Phone } from 'lucide-react';
import { business } from '@/config/business';
import { getPageHero } from '@/data/pageHeroes';
import { usePageMotion } from '@/hooks/usePageMotion';
import { quoteLink } from '@/utils/quoteContext.mjs';

type Props = {
  title: ReactNode;
  description?: ReactNode;
  image?: string;
  srcSet?: string;
  alt?: string;
  eyebrow?: string;
  meta?: ReactNode;
  caption?: string;
  compact?: boolean;
  estimateHref?: string;
  estimateLabel?: string;
  reassurance?: string;
  estateStory?: boolean;
};

const FALLBACK_HERO = {
  image: '/images/coastal-v1/losAngeles-1440.webp',
  srcSet: '/images/coastal-v1/losAngeles-640.webp 640w, /images/coastal-v1/losAngeles-960.webp 960w, /images/coastal-v1/losAngeles-1440.webp 1440w',
  alt: 'Los Angeles cityscape across Pure Air California service neighborhoods',
};

const TRUST_CUES = [
  'Free written estimates',
  'Inspection-led scope',
  'Serving Greater Los Angeles',
] as const;

export default function PageHero(props: Props) {
  const { pathname, search } = useLocation();
  return (
    <HeroSection
      key={`${pathname}${props.estateStory ? '?estate' : ''}`}
      {...props}
      estimateHref={props.estimateHref || quoteLink(pathname, search)}
      pathname={pathname}
    />
  );
}

function HeroSection({
  title,
  description,
  image,
  srcSet,
  alt,
  eyebrow,
  meta,
  caption,
  compact = false,
  pathname,
  estimateHref = '/quote/#estimate-builder',
  estimateLabel = 'Get a free estimate',
  reassurance = 'Los Angeles & nearby communities · Clear written scope before work begins',
  estateStory = false,
}: Props & { pathname: string }) {
  const base = getPageHero(pathname);
  const motion = usePageMotion();
  const [failed, setFailed] = useState(false);

  const estateOverride = estateStory
    ? {
        image: '/images/services/residential-duct.webp',
        srcSet: '/images/services/residential-duct-640.webp 640w, /images/services/residential-duct.webp 1024w',
        alt: 'Luxury sunlit Los Angeles residence living room with architectural linear ceiling air diffuser',
        eyebrow: 'LARGE RESIDENCES & MULTI-ZONE ESTATES · LOS ANGELES',
        caption:
          'Multi-system HVAC coordination, room-by-room floor and furnishing protection, and discrete scheduling for larger Los Angeles homes.',
        position: 'center 42%',
      }
    : null;

  const resolvedImage = failed
    ? FALLBACK_HERO.image
    : image || estateOverride?.image || base.image;
  const resolvedSrcSet = failed
    ? FALLBACK_HERO.srcSet
    : image || estateOverride
      ? srcSet || estateOverride?.srcSet
      : base.srcSet;
  const resolvedAlt = failed
    ? FALLBACK_HERO.alt
    : alt || estateOverride?.alt || base.alt;
  const resolvedEyebrow = eyebrow || estateOverride?.eyebrow || base.eyebrow;
  const resolvedCaption = caption || estateOverride?.caption || base.caption;
  const resolvedPosition = estateOverride?.position || base.position || 'center';

  return (
    <section
      className={
        'pac-page-hero pac-coverage-hero ' +
        (compact ? 'is-compact ' : '') +
        (!motion.reduced ? 'pac-page-motion-on' : 'is-story-still')
      }
      aria-label="Page introduction"
    >
      <div className="pac-coverage-photo">
        <img
          src={resolvedImage}
          srcSet={resolvedSrcSet}
          sizes={resolvedSrcSet ? '100vw' : undefined}
          alt={resolvedAlt}
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
          {...{ fetchpriority: 'high' }}
          style={{ objectPosition: resolvedPosition }}
          onError={() => {
            if (!window.__PRERENDERING__ && !failed) setFailed(true);
          }}
        />
      </div>
      <div className="pac-coverage-shade" aria-hidden="true" />
      <svg
        className="pac-coverage-air"
        viewBox="0 0 1200 420"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M-40 300 C 230 220, 430 355, 720 265 C 930 205, 1060 225, 1240 165" />
        <path d="M-20 355 C 260 285, 510 390, 805 305 C 980 250, 1100 265, 1240 225" />
      </svg>

      <div className="pac-container pac-coverage-layout">
        <div className="pac-page-hero-content pac-coverage-copy">
          <span className="pac-eyebrow">{resolvedEyebrow}</span>
          <h1>{title}</h1>
          {description && (
            <div className="pac-page-hero-description pac-coverage-lead">
              {typeof description === 'string' ? <p>{description}</p> : description}
            </div>
          )}
          {meta && <div className="pac-page-hero-meta">{meta}</div>}
          {!compact && (
            <>
              <div className="pac-actions">
                {estimateHref.startsWith('#') ? (
                  <a href={estimateHref} className="pac-button">
                    <CalendarDays size={18} aria-hidden="true" />
                    {estimateLabel}
                  </a>
                ) : (
                  <Link to={estimateHref} className="pac-button">
                    <CalendarDays size={18} aria-hidden="true" />
                    {estimateLabel}
                  </Link>
                )}
                <a href={business.phoneHref} className="pac-coverage-call">
                  <Phone size={18} aria-hidden="true" />
                  {business.phone}
                </a>
              </div>
              <ul className="pac-coverage-trust" aria-label="Service standards">
                {TRUST_CUES.map((cue) => (
                  <li key={cue}>
                    <Check size={14} aria-hidden="true" />
                    <span>{cue}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {!compact && (
          <aside className="pac-coverage-note" aria-label="Service highlights">
            <span>Why It Matters</span>
            <p>{resolvedCaption}</p>
            {reassurance && <small>{reassurance}</small>}
          </aside>
        )}
      </div>
    </section>
  );
}
