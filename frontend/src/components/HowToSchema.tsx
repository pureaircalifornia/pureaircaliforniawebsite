import React from 'react';
import { seoConfig } from '@/utils/seo/seoConfig';
import { canonicalUrl } from '@/utils/seo/canonicalUrl';
import { serializeJsonLd } from '@/utils/seo/jsonLd.mjs';

export interface HowToStepInput {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

interface HowToSchemaProps {
  name: string;
  description: string;
  steps: HowToStepInput[];
  path?: string;
  id?: string;
  image?: string;
  totalTime?: string; // ISO 8601 duration format (e.g. PT2H)
  estimatedCost?: { value: string; currency?: string };
  supply?: string[];
  tool?: string[];
}

const resolveAssetUrl = (value?: string): string | undefined => {
  if (!value) return undefined;
  return new URL(value, seoConfig.siteUrl).href;
};

const HowToSchema: React.FC<HowToSchemaProps> = ({
  name,
  description,
  steps,
  path,
  id,
  image,
  totalTime,
  estimatedCost,
  supply,
  tool,
}) => {
  if (!steps.length) return null;

  const resolvedId = id || (path ? `${canonicalUrl(path)}#howto` : undefined);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    ...(resolvedId ? { '@id': resolvedId } : {}),
    name,
    description,
    inLanguage: 'en-US',
    ...(image ? { image: resolveAssetUrl(image) } : {}),
    ...(totalTime ? { totalTime } : {}),
    ...(estimatedCost
      ? {
          estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: estimatedCost.currency || 'USD',
            value: estimatedCost.value,
          },
        }
      : {}),
    ...(supply?.length
      ? {
          supply: supply.map((item) => ({
            '@type': 'HowToSupply',
            name: item,
          })),
        }
      : {}),
    ...(tool?.length
      ? {
          tool: tool.map((item) => ({
            '@type': 'HowToTool',
            name: item,
          })),
        }
      : {}),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image ? { image: resolveAssetUrl(step.image) } : {}),
      ...(step.url ? { url: canonicalUrl(step.url) } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
    />
  );
};

export default HowToSchema;
