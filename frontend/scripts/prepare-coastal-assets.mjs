import sharp from 'sharp';
import { mkdir, stat, writeFile } from 'node:fs/promises';

// Versioned derivatives: preserve the original photographs and previous releases.
const sources = {
  coast: 'breath/coastal-breath-1440.webp',
  nature: 'pac/nature.webp',
  losAngeles: 'pac/losAngeles.webp',
  'duct-dust-archive-v3': 'pac/duct-dust-archive-v3.webp',
  'duct-clear-archive-v3': 'pac/duct-clear-archive-v3.webp',
  breath: 'pac/breath.webp',
  residential: 'pac/residential.webp',
  commercial: 'pac/commercial.webp',
  hvac: 'pac/hvac.webp',
  'living-forest': 'breath/living-forest-1440.webp',
  'coastal-breath': 'breath/coastal-breath-1440.webp',
  'california-palms': 'breath/california-palms-1440.webp',
  'trees-night': 'breath/trees-night-1440.webp',
  'quiet-mountains': 'breath/quiet-mountains-1440.webp',
  'sunlit-leaves': 'breath/sunlit-leaves-1440.webp',
  'ocean-pause': 'breath/ocean-pause-1440.webp',
};
const output = 'public/images/coastal-v1';
await mkdir(output, { recursive: true });
const report = [];
const manifest = {};
for (const [name, source] of Object.entries(sources)) {
  const original = `public/images/${source}`;
  const metadata = await sharp(original).metadata();
  manifest[name] = { width: metadata.width, height: metadata.height };
  for (const width of [320, 640, 960, 1440]) {
    const file = `${output}/${name}-${width}.webp`;
    await sharp(original).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 70, effort: 5 }).toFile(file);
    report.push({ name, width: Math.min(width, metadata.width), candidate: width, bytes: (await stat(file)).size, originalBytes: (await stat(original)).size });
  }
}
await writeFile('../docs/coastal-refinement-2026-09-22/image-sizes.json', JSON.stringify(report, null, 2));
await writeFile('src/data/coastalImages.json', JSON.stringify(manifest, null, 2));
console.log(`Generated ${report.length} responsive image derivatives; originals preserved.`);
