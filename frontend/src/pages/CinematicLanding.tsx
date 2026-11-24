import { useEffect } from 'react';
import { ArrowUpRight, Check, MapPin, ScanLine, Sparkles } from 'lucide-react';
import { Link } from '@/components/CanonicalLink';
import SEOProvider from '@/components/SEOProvider';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AirJourney from '@/components/AirJourney';
import HomeCommercialShowcase from '@/components/HomeCommercialShowcase';
import HomeServiceDirectory from '@/components/HomeServiceDirectory';
import BreathMission from '@/components/BreathMission';
import BreathingQuoteSection from '@/components/BreathingQuoteSection';
import Gallery from '@/components/Gallery';
import BookingLink from '@/components/BookingLink';
import { business } from '@/config/business';
import { homepageFaqs, buildFaqSchema } from '@/data/faqs';
import { serializeJsonLd } from '@/utils/seo/jsonLd.mjs';

const areas = [
  ['Beverly Hills', 'beverly-hills'],
  ['Santa Monica', 'santa-monica'],
  ['Brentwood', 'brentwood'],
  ['West Hollywood', 'west-hollywood'],
  ['Culver City', 'culver-city'],
  ['Century City', 'century-city'],
  ['Studio City', 'studio-city'],
  ['Sherman Oaks', 'sherman-oaks'],
  ['Pasadena', 'pasadena'],
  ['Burbank', 'burbank'],
  ['Glendale', 'glendale'],
  ['Encino', 'encino'],
  ['Malibu', 'malibu'],
  ['Downtown LA', 'downtown-la'],
  ['Pacific Palisades', 'pacific-palisades'],
  ['Woodland Hills', 'woodland-hills'],
] as const;

const processSteps = [
  {
    Icon: ScanLine,
    number: '01',
    title: 'See what needs care.',
    text: 'Inspect accessible ducts, understand attic or roof access, and agree on the written scope before work starts.',
    src: '/images/pac/realInspection.webp',
    alt: 'Field photograph of a ventilation opening being inspected before cleaning',
  },
  {
    Icon: Sparkles,
    number: '02',
    title: 'Clean the air pathways.',
    text: 'Protect surrounding finishes, loosen settled buildup, and collect debris under negative pressure suited to your system.',
    src: '/images/pac/duct-cleaning-interior-v2.webp',
    alt: 'Illustrated rotary brush cleaning inside a galvanized sheet-metal air duct',
  },
  {
    Icon: Check,
    number: '03',
    title: 'Look at the work together.',
    text: 'Review the completed scope, inspect accessible openings, and plan filter and dryer vent maintenance.',
    src: '/images/coastal-v1/duct-clear-archive-v3-960.webp',
    srcSet: '/images/coastal-v1/duct-clear-archive-v3-640.webp 640w, /images/coastal-v1/duct-clear-archive-v3-960.webp 960w',
    alt: 'Field photograph of a clear ventilation duct interior illuminated by a technician flashlight',
  },
] as const;

export default function CinematicLanding() {
  useEffect(() => {
    if (window.__PRERENDERING__) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          if (typeof entry.target.animate === 'function') {
            const animation = entry.target.animate(
              [
                { opacity: 0.78, transform: 'translateY(18px)' },
                { opacity: 1, transform: 'translateY(0)' },
              ],
              { duration: 650, easing: 'cubic-bezier(.22, 1, .36, 1)' }
            );
            animations.add(animation);
            animation.onfinish = () => animations.delete(animation);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const targets = document.querySelectorAll(
      '.pac-home-main .pac-breath-mission-copy, .pac-home-main .pac-process-step, .pac-home-main .pac-local-grid > div, .pac-home-main .pac-work-card'
    );
    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return (
    <>
      <SEOProvider
        title="Air Duct Cleaning Los Angeles | Pure Air California"
        description="Los Angeles air duct cleaning (from $299) & dryer vent cleaning (from $149) for homes, HOAs & businesses. Inspection-led scope. Call (213) 792-4145."
        path="/"
        isLocalBusiness
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema()) }}
      />
      <NavBar />

      <main className="pac-home-main">
        <AirJourney />
        <HomeCommercialShowcase />
        <HomeServiceDirectory />

        <div className="pac-proof-strip" role="region" aria-label="Service standards and starting pricing">
          <div className="pac-container">
            <span>CARE YOU CAN FEEL GOOD ABOUT</span>
            <span><Check size={16} aria-hidden="true" /> Free written estimates</span>
            <span><Check size={16} aria-hidden="true" /> Inspection-led scope</span>
            <Link to="/pricing/" className="pac-proof-price-link">
              Air ducts from $299 · Dryer vents from $149 <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <a href={business.googleProfileUrl} target="_blank" rel="noreferrer">
              Read our Google reviews <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        <section className="pac-process-section" aria-labelledby="pac-process-heading">
          <div className="pac-container pac-process-grid">
            <div className="pac-process-intro">
              <span className="pac-eyebrow">02 / A CLEARER PROCESS</span>
              <h2 id="pac-process-heading">
                Out of sight.<br /><em>Never overlooked.</em>
              </h2>
              <p>
                You should know what’s being cleaned, why it matters, and what it will cost. We start with your system, not a one-size-fits-all package.
              </p>
              <div className="pac-actions">
                <Link className="pac-button" to="/quote/#estimate-builder">
                  Build your estimate <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
                <Link className="pac-text-link" to="/air-quality-calculator/">
                  Take the air care checklist <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
              <figure className="pac-process-photo">
                <img
                  src="/images/pac/duct-cleaning-interior-v2.webp"
                  alt="A rotary brush cleaning the interior of a metal air duct"
                  width={900}
                  height={620}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <span>THE DETAILS MATTER</span>
                  <strong>A closer look at the air path.</strong>
                  <Link to="/services/hvac-system-cleaning/">
                    Explore HVAC system cleaning <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </figcaption>
              </figure>
            </div>
            <div className="pac-process-steps">
              {processSteps.map((step) => {
                const StepIcon = step.Icon;
                return (
                  <div className="pac-process-step pac-visual-process-step" key={step.number}>
                    <div className="pac-process-step-picture">
                      <img
                        src={step.src}
                        srcSet={'srcSet' in step ? step.srcSet : undefined}
                        sizes={'srcSet' in step ? '(max-width: 480px) 120px, 160px' : undefined}
                        alt={step.alt}
                        width={600}
                        height={400}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="pac-step-number">{step.number}</span>
                    </div>
                    <div>
                      <StepIcon size={22} strokeWidth={1.4} aria-hidden="true" />
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="pac-section pac-container pac-local-grid" aria-labelledby="pac-local-heading">
          <div className="pac-local-image">
            <img
              src="/images/coastal-v1/losAngeles-1440.webp"
              srcSet="/images/coastal-v1/losAngeles-640.webp 640w, /images/coastal-v1/losAngeles-960.webp 960w, /images/coastal-v1/losAngeles-1440.webp 1440w"
              sizes="(max-width: 700px) 100vw, 48vw"
              alt="Downtown Los Angeles skyline, part of Pure Air California's Greater Los Angeles service area"
              width={1440}
              height={960}
              loading="lazy"
              decoding="async"
            />
            <span><MapPin size={16} aria-hidden="true" /> LOS ANGELES. OUR PLACE, TOO.</span>
          </div>
          <div>
            <span className="pac-eyebrow">03 / ROOTED IN CALIFORNIA</span>
            <h2 id="pac-local-heading">
              From the canyons<br /><em>to the coast.</em>
            </h2>
            <p>
              Historic homes. Hillside retreats. Apartments and commercial properties across the basin. Every Los Angeles building is different, and thoughtful service starts with understanding yours.
            </p>
            <p>
              Explore local air duct cleaning, dryer vent care, wildfire smoke recovery, and commercial services across Greater Los Angeles.
            </p>
            <div className="pac-area-links">
              {areas.map(([label, slug]) => (
                <Link key={slug} to={'/locations/' + slug + '/'}>
                  {label}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              ))}
            </div>
            <div className="pac-actions">
              <Link className="pac-text-link" to="/locations/los-angeles/">
                Explore the Los Angeles service guide <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link className="pac-text-link" to="/locations/">
                All 55 service areas <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <BreathMission />
        <BreathingQuoteSection />
        <Gallery />

        <section className="pac-estimate-band" aria-labelledby="pac-estimate-heading">
          <div className="pac-container">
            <div>
              <span className="pac-eyebrow">GOOD CARE STARTS WITH A CONVERSATION</span>
              <h2 id="pac-estimate-heading">Let’s talk about your space.</h2>
              <p>
                Tell us about the property, number of systems, and anything you’ve noticed. We’ll help you find the right next step with a written estimate before work begins.
              </p>
            </div>
            <div className="pac-booking-band-actions">
              <BookingLink />
              <BookingLink service="commercial" />
              <a className="pac-button" href={business.phoneHref}>
                Call {business.phone} <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <Link className="pac-text-link" to="/pricing/">
                Understand cleaning costs <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="pac-section pac-container pac-faq-grid" aria-labelledby="pac-faq-heading">
          <div>
            <span className="pac-eyebrow">04 / A FEW GOOD QUESTIONS</span>
            <h2 id="pac-faq-heading">
              A little clarity.<br /><em>A lot of comfort.</em>
            </h2>
            <p>Honest, transparent answers before you book air duct or dryer vent cleaning in Los Angeles.</p>
            <div className="pac-faq-links">
              <a className="pac-text-link" href={business.phoneHref}>
                Talk to us {business.phone} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <Link className="pac-text-link" to="/blog/">
                Read the LA air care journal <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="pac-faq-list">
            {homepageFaqs.map((f) => (
              <details key={f.question}>
                <summary>
                  <span>{f.question}</span>
                  <span className="pac-faq-plus" aria-hidden="true">+</span>
                </summary>
                <p>{f.answer}</p>
              </details>
            ))}
            <p className="pac-source-note">
              Learn more in the{' '}
              <a
                href="https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned"
                target="_blank"
                rel="noreferrer"
              >
                EPA’s guide to air duct cleaning
              </a>
              .
            </p>
          </div>
        </section>
      </main>

      <Footer showBreathingMoment={false} />
    </>
  );
}
