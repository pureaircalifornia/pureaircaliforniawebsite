// Compatibility catalogue. Keep business names and claims in the maintained source.
import { industryContent } from '@/data/industryContent';
export const industryData = Object.fromEntries(Object.entries(industryContent).map(([slug, data]) => [slug, { title: data.label, description: data.intro, content: <p>{data.body}</p> }]));
