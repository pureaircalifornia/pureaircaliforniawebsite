import React from 'react';
import { canonicalUrl } from '@/utils/seo/canonicalUrl';

interface BreadcrumbItem {
    name: string;
    item: string; // URL
}

interface BreadcrumbSchemaProps {
    items: BreadcrumbItem[];
}

const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ items }) => {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: canonicalUrl(item.item)
        }))
    };

    return (
        <script type="application/ld+json">
            {JSON.stringify(schema)}
        </script>
    );
};

export default BreadcrumbSchema;
