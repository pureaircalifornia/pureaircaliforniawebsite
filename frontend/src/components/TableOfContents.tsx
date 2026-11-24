import React, { useState, useEffect } from 'react';
import { List, ChevronRight, ChevronDown } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Auto-generated Table of Contents for blog posts.
 * Parses HTML content for h2/h3 headings and creates either a sticky desktop sidebar ToC
 * or a compact collapsible mobile/inline ToC with active section highlighting.
 */
const TableOfContents: React.FC<{
  contentHtml: string;
  variant?: 'sidebar' | 'inline';
}> = ({ contentHtml, variant = 'sidebar' }) => {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(contentHtml, 'text/html');
    const headings = doc.querySelectorAll('h2, h3');
    const tocItems: TocItem[] = [];

    headings.forEach((heading, index) => {
      const id = heading.id || `section-${index}`;
      tocItems.push({
        id,
        text: heading.textContent?.trim() || '',
        level: heading.tagName === 'H2' ? 2 : 3,
      });
    });

    setItems(tocItems);
  }, [contentHtml]);

  useEffect(() => {
    if (items.length === 0) return;

    const contentEl = document.querySelector('.pac-journal-content');
    if (!contentEl) return;

    const headings = contentEl.querySelectorAll('h2, h3');
    headings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `section-${index}`;
      }
      heading.classList.add('scroll-mt-28');
    });

    if (variant !== 'sidebar') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items, variant]);

  if (items.length < 3) return null;

  if (variant === 'inline') {
    return (
      <details className="lg:hidden mb-8 rounded-xl border border-gray-200 bg-gray-50/80 p-4">
        <summary className="flex items-center justify-between gap-2 cursor-pointer font-bold text-gray-900 text-sm uppercase tracking-wider list-none">
          <span className="inline-flex items-center gap-2">
            <List className="w-4 h-4 text-brand-600" aria-hidden="true" />
            On This Page ({items.length} sections)
          </span>
          <ChevronDown className="w-4 h-4 text-gray-500" aria-hidden="true" />
        </summary>
        <nav aria-label="Article sections" className="mt-3 pt-3 border-t border-gray-200">
          <ol className="space-y-1.5">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`block text-sm py-1 px-2 rounded hover:bg-white hover:text-brand-700 text-gray-700 ${
                    item.level === 3 ? 'pl-5 text-xs' : 'font-medium'
                  }`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </details>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <List className="w-5 h-5 text-brand-600" aria-hidden="true" />
        <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Table of Contents</h4>
      </div>
      <nav aria-label="Table of contents">
        <ol className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`w-full text-left text-sm py-1.5 px-3 rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                  item.level === 3 ? 'pl-6' : ''
                } ${
                  activeId === item.id
                    ? 'bg-brand-50 text-brand-700 font-semibold'
                    : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'
                }`}
              >
                {activeId === item.id && (
                  <ChevronRight className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                )}
                <span className="line-clamp-2">{item.text}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default TableOfContents;
