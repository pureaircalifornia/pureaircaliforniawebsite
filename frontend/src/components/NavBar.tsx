import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from '@/components/CanonicalLink';
import { ArrowRight, ChevronDown, MapPin, Menu, Phone, X } from 'lucide-react';
import BrandMark from './BrandMark';
import BookingLink from './BookingLink';
import CustomerPortalLink from './CustomerPortalLink';
import { business } from '@/config/business';
import { serviceGroups } from '@/data/serviceNavigation';
import { quoteLink } from '@/utils/quoteContext.mjs';

const explore = [
  ['Service areas', '/locations/'],
  ['Pricing & estimates', '/pricing/'],
  ['Air care checklist', '/air-quality-calculator/'],
  ['Commercial industries', '/industries/'],
  ['Project stories', '/project-stories/'],
  ['Our mission', '/about/#our-mission'],
  ['About PAC', '/about/'],
  ['Air care journal', '/blog/'],
  ['Contact us', '/contact/'],
];

export default function NavBar(_props: { alwaysOpaque?: boolean }) {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [megaOpened, setMegaOpened] = useState(false);
  const [mobileOpened, setMobileOpened] = useState(false);
  const location = useLocation();
  const estimateHref = quoteLink(location.pathname, location.search);
  const header = useRef<HTMLElement>(null);
  const requestMenu = useRef<HTMLDetailsElement>(null);
  const megaMenu = useRef<HTMLDivElement>(null);
  const mobileMenu = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const serviceButton = useRef<HTMLButtonElement>(null);

  const normalizedPath = location.pathname.replace(/\/$/, '') || '/';
  const current = (to: string) => normalizedPath === (to.split('#')[0].replace(/\/$/, '') || '/');
  const inSection = (prefix: string) =>
    normalizedPath === prefix || normalizedPath.startsWith(prefix + '/');

  useEffect(() => {
    setOpen(false);
    setDropdown(false);
    if (requestMenu.current) requestMenu.current.open = false;
  }, [location.key]);

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) {
        setDropdown(false);
        setOpen(false);
        if (requestMenu.current) requestMenu.current.open = false;
      }
    };
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (requestMenu.current?.open) {
          requestMenu.current.open = false;
          requestMenu.current.querySelector('summary')?.focus();
        }
        if (open) {
          event.preventDefault();
          setOpen(false);
          menuButton.current?.focus();
        }
        if (dropdown) {
          event.preventDefault();
          setDropdown(false);
          serviceButton.current?.focus();
        }
      }
      if (open && event.key === 'Tab' && header.current) {
        const focusable = Array.from(
          header.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), summary, [tabindex="0"]'
          )
        ).filter((element) => element.getClientRects().length > 0 && !element.closest('[hidden]'));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    const media = window.matchMedia('(min-width: 901px)');
    const resize = () => {
      setOpen(false);
      setDropdown(false);
      if (requestMenu.current) requestMenu.current.open = false;
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', key);
    media.addEventListener('change', resize);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', key);
      media.removeEventListener('change', resize);
    };
  }, [open, dropdown]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previousMenuState = document.body.getAttribute('data-pac-menu-open');
    document.body.style.overflow = 'hidden';
    document.body.setAttribute('data-pac-menu-open', 'true');
    const focusFrame = window.requestAnimationFrame(() =>
      mobileMenu.current?.querySelector<HTMLAnchorElement>('.pac-mobile-category-choices a')?.focus({
        preventScroll: true,
      })
    );
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      if (previousMenuState === null) document.body.removeAttribute('data-pac-menu-open');
      else document.body.setAttribute('data-pac-menu-open', previousMenuState);
    };
  }, [open]);

  const onServiceTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (requestMenu.current) requestMenu.current.open = false;
      setMegaOpened(true);
      setDropdown(true);
      window.requestAnimationFrame(() => {
        megaMenu.current?.querySelector<HTMLAnchorElement>('a[href]')?.focus();
      });
    }
  };

  const onMegaMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    const links = Array.from(megaMenu.current?.querySelectorAll<HTMLAnchorElement>('a[href]') ?? []);
    if (!links.length) return;
    const idx = links.indexOf(document.activeElement as HTMLAnchorElement);
    event.preventDefault();
    if (event.key === 'Home') links[0]?.focus();
    else if (event.key === 'End') links[links.length - 1]?.focus();
    else if (event.key === 'ArrowDown') links[(idx + 1) % links.length]?.focus();
    else if (event.key === 'ArrowUp') links[(idx - 1 + links.length) % links.length]?.focus();
  };

  const navLink = (label: string, to: string) => (
    <Link key={to} to={to} aria-current={current(to) ? 'page' : undefined}>
      {label}
      <ArrowRight size={16} aria-hidden="true" />
    </Link>
  );

  return (
    <>
      <header ref={header} className={'pac-header pac-visual-header' + (open ? ' is-menu-open' : '')}>
        <a className="pac-skip-link" href="#site-content-start">
          Skip to content
        </a>
        <div className="pac-nav-inner pac-container">
          <Link className="pac-logo-link" to="/" aria-label="Pure Air California home">
            <BrandMark />
          </Link>
          <nav aria-label="Main navigation" className="pac-desktop-nav">
            <div
              className="pac-nav-dropdown"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node)) setDropdown(false);
              }}
            >
              <button
                ref={serviceButton}
                type="button"
                aria-expanded={dropdown}
                aria-controls="pac-services-menu"
                data-active={inSection('/services') ? 'true' : undefined}
                onKeyDown={onServiceTriggerKeyDown}
                onClick={() => {
                  if (requestMenu.current) requestMenu.current.open = false;
                  if (!dropdown) setMegaOpened(true);
                  setDropdown(!dropdown);
                }}
              >
                Our services <ChevronDown size={14} aria-hidden="true" />
              </button>
              <div
                ref={megaMenu}
                id="pac-services-menu"
                className="pac-dropdown-panel pac-service-menu pac-visual-mega-menu"
                hidden={!dropdown}
                onKeyDown={onMegaMenuKeyDown}
              >
                <div className="pac-mega-intro">
                  <span>What can we help you with?</span>
                  <Link to="/services/" aria-current={current('/services/') ? 'page' : undefined}>
                    All services <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
                <div className="pac-mega-groups">
                  {serviceGroups.map((group) => (
                    <section key={group.id} aria-labelledby={'mega-heading-' + group.id}>
                      <Link
                        className="pac-mega-photo"
                        style={{ display: 'block', padding: 0 }}
                        to={group.landingPath}
                        aria-label={group.title}
                      >
                        {(dropdown || megaOpened) && (
                          <img
                            src={group.image}
                            alt=""
                            style={{ objectPosition: group.imagePosition }}
                            loading="lazy"
                            decoding="async"
                            width={640}
                            height={360}
                          />
                        )}
                        <h2 id={'mega-heading-' + group.id}>{group.shortTitle}</h2>
                      </Link>
                      <div className="pac-mega-service-links">
                        {group.items.map((service) => (
                          <Link
                            key={service.path}
                            to={service.path}
                            aria-label={service.label}
                            aria-current={current(service.path) ? 'page' : undefined}
                          >
                            {(dropdown || megaOpened) ? (
                              <img
                                src={service.image}
                                alt=""
                                style={{ objectPosition: service.imagePosition }}
                                loading="lazy"
                                decoding="async"
                                width={80}
                                height={80}
                              />
                            ) : (
                              <span className="pac-mega-thumb-placeholder" aria-hidden="true" />
                            )}
                            <span>{service.shortLabel}</span>
                            <ArrowRight size={16} aria-hidden="true" />
                          </Link>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
                <div className="pac-menu-footer">
                  {navLink('Pricing & estimates', '/pricing/')}
                  {navLink('Air care checklist', '/air-quality-calculator/')}
                  {navLink('Project stories', '/project-stories/')}
                  {navLink('Talk to PAC', '/contact/')}
                </div>
              </div>
            </div>
            <Link
              className="pac-nav-audience"
              to="/home-services/"
              aria-current={current('/home-services/') ? 'page' : undefined}
            >
              For your home
            </Link>
            <Link
              className="pac-nav-audience"
              to="/industries/"
              aria-current={inSection('/industries') ? 'page' : undefined}
            >
              For your business
            </Link>
            <Link
              to="/locations/"
              aria-current={inSection('/locations') ? 'page' : undefined}
            >
              Service areas
            </Link>
            <Link
              className="pac-nav-pricing"
              to="/pricing/"
              aria-current={current('/pricing/') ? 'page' : undefined}
            >
              Pricing
            </Link>
            <details
              ref={requestMenu}
              className="pac-request-menu"
              onToggle={(event) => {
                if (event.currentTarget.open) setDropdown(false);
              }}
            >
              <summary className="pac-nav-booking">
                Request service <ChevronDown size={14} aria-hidden="true" />
              </summary>
              <div className="pac-request-options">
                <BookingLink className="pac-request-option" />
                <BookingLink service="commercial" className="pac-request-option" />
              </div>
            </details>
            <CustomerPortalLink className="pac-nav-portal" />
          </nav>
          <div className="pac-nav-actions">
            <Link
              to={estimateHref}
              className="pac-nav-estimate"
              aria-current={current('/quote/') ? 'page' : undefined}
            >
              Free estimate
            </Link>
            <a href={business.phoneHref} className="pac-button pac-nav-call">
              <Phone size={16} aria-hidden="true" />
              <span className="pac-desktop-call-label">{business.phone}</span>
              <span className="pac-mobile-call-label">Call PAC</span>
            </a>
            <button
              type="button"
              ref={menuButton}
              className="pac-menu-toggle"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-controls="pac-mobile-menu"
              aria-expanded={open}
              onClick={() => {
                if (!open) setMobileOpened(true);
                setOpen(!open);
              }}
            >
              {open ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
              <span>{open ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </div>
        <nav
          ref={mobileMenu}
          id="pac-mobile-menu"
          className="pac-mobile-menu pac-visual-mobile-menu"
          aria-label="Mobile navigation"
          hidden={!open}
        >
          <div className="pac-visual-menu-heading">
            <span className="pac-eyebrow">A LITTLE CARE STARTS HERE</span>
            <h2>What’s your space?</h2>
          </div>
          <div className="pac-mobile-requests">
            <BookingLink className="pac-mobile-booking" />
            <BookingLink service="commercial" className="pac-mobile-booking pac-commercial-request" />
          </div>
          <CustomerPortalLink className="pac-mobile-portal" />
          <div className="pac-mobile-category-choices" aria-label="Choose a service category">
            {serviceGroups.map((group) => (
              <Link
                key={group.id}
                to={group.landingPath}
                aria-label={group.title}
                aria-current={current(group.landingPath) ? 'page' : undefined}
              >
                {(open || mobileOpened) && (
                  <img
                    src={group.image}
                    alt=""
                    style={{ objectPosition: group.imagePosition }}
                    loading="lazy"
                    decoding="async"
                    width={200}
                    height={180}
                  />
                )}
                <strong>{group.shortTitle}</strong>
                <span aria-hidden="true">
                  <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
          {serviceGroups.map((group) => (
            <section
              key={group.id}
              id={'mobile-services-' + group.id}
              className="pac-mobile-services"
              aria-labelledby={'mobile-heading-' + group.id}
            >
              <h3 id={'mobile-heading-' + group.id}>
                <Link to={group.landingPath}>
                  {group.title} <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </h3>
              <div className="pac-mobile-service-grid">
                {group.items.map((service) => (
                  <Link
                    key={service.path}
                    to={service.path}
                    aria-label={service.label}
                    aria-current={current(service.path) ? 'page' : undefined}
                  >
                    {(open || mobileOpened) ? (
                      <img
                        src={service.image}
                        alt=""
                        style={{ objectPosition: service.imagePosition }}
                        loading="lazy"
                        decoding="async"
                        width={100}
                        height={100}
                      />
                    ) : (
                      <span className="pac-mega-thumb-placeholder" aria-hidden="true" />
                    )}
                    <span>{service.shortLabel}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>
          ))}
          <div className="pac-mobile-primary-links">
            <Link to="/services/" aria-current={current('/services/') ? 'page' : undefined}>
              All services <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/locations/" aria-current={inSection('/locations') ? 'page' : undefined}>
              <MapPin size={16} aria-hidden="true" /> Service areas
            </Link>
            <Link to="/pricing/" aria-current={current('/pricing/') ? 'page' : undefined}>
              Pricing &amp; estimates <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/contact/" aria-current={current('/contact/') ? 'page' : undefined}>
              Talk to us <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <details className="pac-mobile-more">
            <summary>
              Discover PAC <ChevronDown size={16} aria-hidden="true" />
            </summary>
            <div>
              {explore
                .filter(([, path]) => !['/locations/', '/pricing/', '/contact/'].includes(path))
                .map(([label, to]) => navLink(label, to))}
            </div>
          </details>
          <Link className="pac-button pac-mobile-quote" to={estimateHref}>
            Find my estimate <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <p className="pac-visual-menu-location">Serving Los Angeles &amp; surrounding communities</p>
        </nav>
      </header>
      <span id="site-content-start" tabIndex={-1} className="pac-content-anchor" />
    </>
  );
}
