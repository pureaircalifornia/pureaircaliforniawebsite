import React from 'react';
import { Link } from 'react-router-dom';
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
  if (!links.length) return null;

  return (
    <section className={`py-14 border-t border-gray-200 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{heading}</h2>
          {intro && <p className="text-lg text-gray-600 mb-6">{intro}</p>}

          {variant === 'grid' ? (
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {links.map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="block px-4 py-3 rounded-lg border border-gray-200 bg-white hover:border-brand-500 hover:text-brand-700 transition-colors font-medium"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="inline-flex items-center gap-2 text-lg text-brand-700 hover:text-brand-900 font-medium"
                  >
                    {l.label}
                    <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                  {l.note && <p className="text-gray-600 mt-1">{l.note}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default RelatedLinks;
