import React, { useId } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from '@/components/CanonicalLink';
import { ArrowRight } from 'lucide-react';
import type { LinkItem } from '@/utils/internalLinks';

interface RelatedLinksProps {
  heading: string;
  intro?: string;
  links: LinkItem[];
  /** "list" for a prose-style column, "grid" for a wider set such as nearby cities. */
  variant?: 'list' | 'grid';
  className?: string;
}

const normalizeDestination = (value: string): string => {
  const clean = value.split(/[?#]/)[0].replace(/\/+$/, '');
  return clean || '/';
};

/**
 * Contextual internal links rendered inside the page body.
 * Distinct from global nav/footer chrome so crawlers and visitors see clear
 * semantic relationships between services, LA locations, guides, and estimates.
 */
const RelatedLinks: React.FC<RelatedLinksProps> = ({
  heading,
  intro,
  links,
  variant = 'list',
  className = '',
}) => {
  const { pathname } = useLocation();
  const headingId = useId();
  const current = normalizeDestination(pathname);
  const seen = new Set<string>();
  const visibleLinks = links.filter((link) => {
    const destination = normalizeDestination(link.path);
    if (destination === current || seen.has(destination)) return false;
    seen.add(destination);
    return true;
  });

  if (!visibleLinks.length) return null;

  return (
    <section
      aria-labelledby={headingId}
      className={`py-14 border-t border-gray-200 ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 id={headingId} className="text-2xl md:text-3xl font-bold mb-3">
            {heading}
          </h2>
          {intro && <p className="text-lg text-gray-600 mb-6">{intro}</p>}

          <nav aria-labelledby={headingId}>
            <ul className={'pac-related-links pac-related-links--' + variant}>
              {visibleLinks.map((link) => (
                <li key={normalizeDestination(link.path)}>
                  <Link to={link.path}>
                    <span>
                      <strong>{link.label}</strong>
                      {link.note && <small>{link.note}</small>}
                    </span>
                    <ArrowRight size={19} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default RelatedLinks;
