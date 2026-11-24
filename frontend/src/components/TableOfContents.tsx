import React, { useState, useEffect } from 'react';
import { List, ChevronRight } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Auto-generated Table of Contents for blog posts.
 * Parses HTML content for h2/h3 headings and creates a sticky sidebar ToC
 * with active section highlighting.
 */
const TableOfContents: React.FC<{ contentHtml: string }> = ({ contentHtml }) => {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Parse headings from HTML content
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

  // Assign IDs to actual DOM headings and observe them
  useEffect(() => {
    if (items.length === 0) return;

    const contentEl = document.querySelector('.prose');
    if (!contentEl) return;

    const headings = contentEl.querySelectorAll('h2, h3');
    headings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `section-${index}`;
      }
    });

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
  }, [items]);

  if (items.length < 3) return null; // Don't show for short articles


  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <List className="w-5 h-5 text-brand-600" />
        <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Table of Contents</h4>
      </div>
      <nav aria-label="Table of contents">
        <ol className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={"#" + item.id}
                className={`w-full text-left text-sm py-1.5 px-3 rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                  item.level === 3 ? 'pl-6' : ''
                } ${
                  activeId === item.id
                    ? 'bg-brand-50 text-brand-700 font-semibold'
                    : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'
                }`}
              >
                {activeId === item.id && (
                  <ChevronRight className="w-3 h-3 flex-shrink-0" />
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
