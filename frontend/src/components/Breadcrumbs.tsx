import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from '@/components/CanonicalLink';
import { ChevronRight, Home } from 'lucide-react';
import { canonicalUrl } from '@/utils/seo/canonicalUrl';
import { serializeJsonLd } from '@/utils/seo/jsonLd.mjs';

interface BreadcrumbOverride {
  label?: string;
}

const SEGMENT_LABELS: Record<string, string> = {
  blog: 'Blog',
  services: 'Services',
  'home-services': 'Home Services',
  industries: 'Industries',
  locations: 'Service Areas',
  'los-angeles': 'Los Angeles',
  about: 'About Us',
  contact: 'Contact',
  quote: 'Get a Quote',
  pricing: 'Pricing',
  'health-benefits': 'Indoor Air Quality',
  'property-managers': 'Property Managers & HOAs',
  'case-studies': 'Case Studies',
  'project-stories': 'Project Stories',
  'air-quality-calculator': 'Air Care Checklist',
  partners: 'Partnerships',
  'hvac-system-cleaning': 'HVAC System Cleaning',
  'downtown-la': 'Downtown LA',
  'west-la': 'West LA',
  'central-la': 'Central LA',
};

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

    let segmentLabel =
      SEGMENT_LABELS[segment] ||
      segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

    // Use override label for the last item if provided
    if (isLast && label) segmentLabel = label;

    return { path, label: segmentLabel, isLast };
  });

  // Schema.org BreadcrumbList linked to WebPage via #breadcrumb
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl(location.pathname)}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: canonicalUrl('/'),
      },
      ...breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: canonicalUrl(item.path),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schemaData) }}
      />
      <nav aria-label="Breadcrumb" className="py-3">
        <ol className="flex items-center flex-wrap gap-1 text-sm text-gray-500">
          <li>
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-brand-600 transition-colors"
            >
              <Home className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Home</span>
            </Link>
          </li>
          {breadcrumbItems.map((item) => (
            <li key={item.path} className="flex items-center gap-1">
              <ChevronRight className="w-3.5 h-3.5 text-gray-300" aria-hidden="true" />
              {item.isLast ? (
                <span aria-current="page" className="text-gray-900 font-medium truncate max-w-[240px]">
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
