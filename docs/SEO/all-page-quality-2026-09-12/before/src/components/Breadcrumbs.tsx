import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { seoConfig } from '@/utils/seo/seoConfig';
import { canonicalUrl } from '@/utils/seo/canonicalUrl';

interface BreadcrumbOverride {
  label?: string;
}

/**
 * Breadcrumbs component with BreadcrumbList schema markup.
 * Provides visual navigation + structured data for Google rich results.
 */
const Breadcrumbs: React.FC<BreadcrumbOverride> = ({ label }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  if (pathSegments.length === 0) return null; // Don't show on homepage

  // Build breadcrumb items
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const isLast = index === pathSegments.length - 1;

    // Format segment into readable label
    let segmentLabel = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

    // Special label overrides
    if (segment === 'blog') segmentLabel = 'Blog';
    if (segment === 'services') segmentLabel = 'Services';
    if (segment === 'industries') segmentLabel = 'Industries';
    if (segment === 'locations') segmentLabel = 'Locations';
    if (segment === 'about') segmentLabel = 'About Us';
    if (segment === 'contact') segmentLabel = 'Contact';
    if (segment === 'quote') segmentLabel = 'Get a Quote';
    if (segment === 'health-benefits') segmentLabel = 'Health Benefits';

    // Use override label for the last item if provided
    if (isLast && label) segmentLabel = label;

    return { path, label: segmentLabel, isLast };
  });

  // Schema.org BreadcrumbList
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': canonicalUrl('/'),
      },
      ...breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 2,
        'name': item.label,
        'item': canonicalUrl(item.path),
      })),
    ],
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="py-3">
        <ol className="flex items-center flex-wrap gap-1 text-sm text-gray-500">
          <li>
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-brand-600 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
          </li>
          {breadcrumbItems.map((item) => (
            <li key={item.path} className="flex items-center gap-1">
              <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
              {item.isLast ? (
                <span className="text-gray-900 font-medium truncate max-w-[200px]">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-brand-600 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
