import { Link } from '@/components/CanonicalLink';
import { ArrowUpRight, Building2, Home, Check, Plus, MapPin } from 'lucide-react';
import type { LocalGuide } from '@/data/localGuides';
import { buildLocationQuoteHref } from '@/pages/locations/locationSeo';

export default function LocalServiceGuide({
  guide,
  citySlug,
}: {
  guide: LocalGuide;
  citySlug?: string;
}) {
  const homeFirstSentence = guide.home.match(/^.*?[.!?](?:\s|$)/)?.[0].trim() || guide.home;
  const homeRest = guide.home.replace(/^.*?[.!?](?:\s|$)/, '').trim();
  const commercialFirstSentence = guide.commercial.match(/^.*?[.!?](?:\s|$)/)?.[0].trim() || guide.commercial;
  const commercialRest = guide.commercial.replace(/^.*?[.!?](?:\s|$)/, '').trim();

  return (
    <section className="pac-local-guide pac-section pac-container" aria-label={guide.name + ' property guide'}>
      <div className="pac-section-heading">
        <div>
          <span className="pac-eyebrow">A PLAN FOR YOUR PROPERTY</span>
          <h2>
            At home. At work.
            <br />
            <em>Right here in {guide.name}.</em>
          </h2>
        </div>
      </div>
      <div className="pac-local-columns">
        <article className="pac-local-visual-card">
          <img
            src="/images/visual-story/home-family-640.webp"
            alt="A bright furnished home with a blue couch"
            width={800}
            height={500}
            loading="lazy"
            decoding="async"
          />
          <div>
            <Home aria-hidden="true" />
            <h3>For your home</h3>
            <p>{homeFirstSentence}</p>
            {homeRest && (
              <details>
                <summary>
                  Home service details <Plus size={16} aria-hidden="true" />
                </summary>
                <p>{homeRest}</p>
              </details>
            )}
            <Link to="/services/residential-air-duct-cleaning/">
              Explore home duct cleaning (from $299) <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/services/residential-dryer-vent-cleaning/">
              Explore home dryer vent cleaning (from $149) <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link to={buildLocationQuoteHref({ locationSlug: citySlug, service: 'air-duct', property: 'home' })}>
              Build a {guide.name} home estimate <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </article>
        <article className="pac-local-visual-card">
          <img
            src="/images/pac/office.webp"
            alt="Open workplace with visible ventilation ductwork"
            width={800}
            height={500}
            loading="lazy"
            decoding="async"
          />
          <div>
            <Building2 aria-hidden="true" />
            <h3>For your business</h3>
            <p>{commercialFirstSentence}</p>
            {commercialRest && (
              <details>
                <summary>
                  Business service details <Plus size={16} aria-hidden="true" />
                </summary>
                <p>{commercialRest}</p>
              </details>
            )}
            <Link to="/services/commercial-air-duct-cleaning/">
              Explore commercial duct cleaning <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles/">
              Explore HOA &amp; multi-unit vent care <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link to={buildLocationQuoteHref({ locationSlug: citySlug, service: 'air-duct', property: 'commercial' })}>
              Request a {guide.name} commercial quote <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </article>
      </div>
      <div className="pac-local-planning">
        <div>
          <span className="pac-eyebrow">BEFORE WE VISIT</span>
          <h3>
            A little planning.
            <br />A smoother service day.
          </h3>
          <div className="pac-local-planning-icons" aria-hidden="true">
            <span>
              <MapPin size={23} />
              Access
            </span>
            <span>
              <Home size={23} />
              Your space
            </span>
            <span>
              <Check size={23} />
              A clear plan
            </span>
          </div>
        </div>
        <details open>
          <summary>
            Your {guide.name} visit checklist <Plus size={20} aria-hidden="true" />
          </summary>
          <ul>
            {guide.planning.map((item) => (
              <li key={item}>
                <Check size={19} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </details>
      </div>
      {guide.project && (
        <aside className="pac-local-project">
          <span className="pac-eyebrow">FROM OUR PROJECT RECORDS</span>
          <p>{guide.project.text}</p>
          <Link to={guide.project.path}>
            See the project scope <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </aside>
      )}
      <p className="pac-local-source">
        Local area reference:{' '}
        <a href={guide.source.url} target="_blank" rel="noreferrer">
          {guide.source.label}
        </a>
        . Pure Air California serves this area as a service-area business; this is not a separate branch office.
      </p>
    </section>
  );
}
