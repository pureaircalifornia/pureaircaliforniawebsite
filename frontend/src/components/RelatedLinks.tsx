import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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

/**
 * Contextual internal links rendered in the page body.
 *
 * Deliberately separate from the nav and footer: links that appear on every page
 * carry no topical signal, whereas a link from a Burbank page to the residential
 * duct cleaning page tells a crawler something specific about how the two relate.
 */
const RelatedLinks = ({
  heading,
  intro,
  links,
  variant = 'list',
  className = '',
}: RelatedLinksProps) => {
  const { pathname } = useLocation();
  const seen = new Set<string>();
  const visibleLinks = links.filter(link => {
    const destination = link.path.replace(/\/$/, '');
    if (destination === pathname.replace(/\/$/, '') || seen.has(destination)) return false;
    seen.add(destination);
    return true;
  });
  if (!visibleLinks.length) return null;

  return (
    <section className={`py-14 border-t border-gray-200 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{heading}</h2>
          {intro && <p className="text-lg text-gray-600 mb-6">{intro}</p>}

          <ul className={'pac-related-links pac-related-links--' + variant}>
            {visibleLinks.map(link => <li key={link.path}>
              <Link to={link.path}><span><strong>{link.label}</strong>{link.note && <small>{link.note}</small>}</span><ArrowRight size={19} aria-hidden="true"/></Link>
            </li>)}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RelatedLinks;
