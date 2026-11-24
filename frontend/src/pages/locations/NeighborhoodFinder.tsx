import { useId, useMemo, useState } from 'react';
import { Link } from '@/components/CanonicalLink';
import { ArrowUpRight, Compass, MapPin, Phone, Search, X } from 'lucide-react';
import { locationData, type LocationEntry } from './data';
import { buildLocationQuoteHref } from './locationSeo';
import { locationImageAlt } from '@/data/locationImageAlts';
import ResponsiveImage from '@/components/ResponsiveImage';
import { business } from '@/config/business';

export const REGION_FILTERS: Array<{ key: string; label: string }> = [
  { key: 'all', label: 'All LA Areas' },
  { key: 'westside', label: 'Westside' },
  { key: 'coastal', label: 'Coastal' },
  { key: 'urban-core', label: 'Central & Metro' },
  { key: 'san-fernando-valley', label: 'San Fernando Valley' },
  { key: 'foothill', label: 'Foothills' },
  { key: 'canyon', label: 'Hills & Canyons' },
  { key: 'historic', label: 'Historic Districts' },
];

export const REGION_LABELS: Record<string, string> = {
  westside: 'Westside',
  coastal: 'Coastal',
  'urban-core': 'Central & Metro LA',
  'san-fernando-valley': 'San Fernando Valley',
  foothill: 'Foothills & SGV',
  canyon: 'Hills & Canyons',
  historic: 'Historic Districts',
};

interface NeighborhoodFinderProps {
  /** 'cards' renders visual location cards (used on /locations/); 'compact' renders an instant quick-jump finder (used on /locations/los-angeles/). */
  variant?: 'cards' | 'compact';
  heading?: string;
  intro?: string;
}

export default function NeighborhoodFinder({
  variant = 'cards',
  heading = 'Find your Los Angeles neighborhood or ZIP code',
  intro = 'Filter by region or search any city, neighborhood, or 5-digit ZIP code to view local HVAC guidance or launch a pre-filled estimate.',
}: NeighborhoodFinderProps) {
  const inputId = useId();
  const [query, setQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState('all');

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = { all: locationData.length };
    for (const loc of locationData) {
      counts[loc.region] = (counts[loc.region] || 0) + 1;
    }
    return counts;
  }, []);

  const filteredLocations = useMemo<LocationEntry[]>(() => {
    const q = query.trim().toLowerCase();
    return locationData
      .filter((loc) => {
        if (activeRegion !== 'all' && loc.region !== activeRegion) return false;
        if (!q) return true;
        const haystack = [
          loc.name,
          loc.municipality,
          loc.county,
          REGION_LABELS[loc.region] || loc.region,
          loc.housingProfile,
          ...loc.zipCodes,
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(q);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [query, activeRegion]);

  const showCompactLimit = variant === 'compact' && !query.trim() && activeRegion === 'all';
  const displayed = showCompactLimit ? filteredLocations.slice(0, 12) : filteredLocations;

  return (
    <div className="pac-loc-finder">
      <div className="pac-loc-finder-header">
        <div>
          <span className="pac-eyebrow">INTERACTIVE SERVICE-AREA FINDER</span>
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>

        <div className="pac-loc-search-wrap">
          <label htmlFor={inputId} className="sr-only">
            Search Los Angeles neighborhood, city, or ZIP code
          </label>
          <div className="pac-loc-search-box">
            <Search size={19} aria-hidden="true" />
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search neighborhood or ZIP (e.g. 90210, Santa Monica, 91403)..."
              autoComplete="postal-code"
            />
            {query && (
              <button
                type="button"
                className="pac-loc-search-clear"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="pac-loc-region-tabs" role="group" aria-label="Filter locations by Los Angeles region">
        {REGION_FILTERS.map((region) => {
          const isActive = activeRegion === region.key;
          return (
            <button
              key={region.key}
              type="button"
              className={`pac-loc-region-pill ${isActive ? 'is-active' : ''}`}
              aria-pressed={isActive}
              onClick={() => setActiveRegion(region.key)}
            >
              <span>{region.label}</span>
              <span className="pac-loc-region-count">{regionCounts[region.key] || 0}</span>
            </button>
          );
        })}
      </div>

      <div className="pac-loc-status-bar" role="status" aria-live="polite">
        <span>
          Showing <strong>{displayed.length}</strong>
          {showCompactLimit ? ` featured of ${filteredLocations.length}` : ` of ${locationData.length}`} Los Angeles &amp; coastal service guides
          {query.trim() ? ` matching “${query.trim()}”` : ''}
        </span>
        {(query || activeRegion !== 'all') && (
          <button
            type="button"
            className="pac-loc-reset-btn"
            onClick={() => {
              setQuery('');
              setActiveRegion('all');
            }}
          >
            Reset filter
          </button>
        )}
      </div>

      {filteredLocations.length === 0 ? (
        <div className="pac-loc-empty">
          <h3>Don’t see “{query.trim()}” listed above? We likely still cover your address.</h3>
          <p>
            Pure Air California serves Greater Los Angeles—including Silver Lake, Venice, Marina del Rey, Altadena,
            San Gabriel Valley, Torrance, and South Bay corridors—in addition to our 54 dedicated neighborhood guides.
            Confirm your exact ZIP code in 60 seconds.
          </p>
          <div className="pac-loc-empty-actions">
            <Link
              to={buildLocationQuoteHref({ locationSlug: 'los-angeles', service: 'air-duct', property: 'home' })}
              className="pac-button"
            >
              Request an LA Estimate <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <a href={business.phoneHref} className="pac-loc-secondary-btn">
              <Phone size={16} aria-hidden="true" /> Call {business.phone}
            </a>
          </div>
        </div>
      ) : variant === 'cards' ? (
        <div className="pac-loc-card-grid">
          {displayed.map((location) => (
            <article key={location.slug} className="pac-loc-card">
              <Link to={`/locations/${location.slug}/`} className="pac-loc-card-media" aria-label={`Explore ${location.name} air duct cleaning guide`}>
                <ResponsiveImage
                  src={location.image}
                  alt={locationImageAlt(location.slug)}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="pac-loc-card-img"
                />
                <span className="pac-loc-card-badge">{REGION_LABELS[location.region] || location.region}</span>
              </Link>
              <div className="pac-loc-card-body">
                <div className="pac-loc-card-title-row">
                  <h3>
                    <Link to={`/locations/${location.slug}/`}>{location.name}</Link>
                  </h3>
                  <span className="pac-loc-card-zip">
                    <MapPin size={13} aria-hidden="true" />
                    {location.zipCodes.slice(0, 2).join(', ')}
                    {location.zipCodes.length > 2 ? ` +${location.zipCodes.length - 2}` : ''}
                  </span>
                </div>
                <p className="pac-loc-card-housing">{location.housingProfile}</p>
                <p className="pac-loc-card-desc">{location.description}</p>
                <div className="pac-loc-card-actions">
                  <Link to={`/locations/${location.slug}/`} className="pac-loc-card-guide-link">
                    <span>Local guide</span>
                    <Compass size={16} aria-hidden="true" />
                  </Link>
                  <Link
                    to={buildLocationQuoteHref({ locationSlug: location.slug, service: 'air-duct', property: 'home' })}
                    className="pac-loc-card-quote-link"
                  >
                    <span>Estimate</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <>
          <div className="pac-loc-compact-grid">
            {displayed.map((location) => (
              <div key={location.slug} className="pac-loc-compact-item">
                <div className="pac-loc-compact-main">
                  <Link to={`/locations/${location.slug}/`} className="pac-loc-compact-name">
                    {location.name}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                  <span className="pac-loc-compact-meta">
                    {REGION_LABELS[location.region] || location.region} · {location.zipCodes.slice(0, 3).join(', ')}
                    {location.zipCodes.length > 3 ? ` +${location.zipCodes.length - 3}` : ''}
                  </span>
                </div>
                <Link
                  to={buildLocationQuoteHref({ locationSlug: location.slug, service: 'air-duct', property: 'home' })}
                  className="pac-loc-compact-cta"
                  aria-label={`Get a free air duct cleaning estimate for ${location.name}`}
                >
                  Quote
                </Link>
              </div>
            ))}
          </div>
          {showCompactLimit && (
            <div className="pac-loc-compact-footer">
              <p>
                Type any neighborhood or ZIP code above—or browse all {locationData.length} areas grouped by region below.
              </p>
              <Link to="/locations/" className="pac-text-link">
                Open full visual service-area directory <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
