import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const archive = path.resolve(frontend, '../../../before and After');
const destination = path.join(frontend, 'public/images/home-services');
const sources = [
  ['room-protection', 'WhatsApp Image 2026-04-12 at 4.59.28 PM (2).jpeg'],
  ['protected-room', 'oWhatsApp Image 2026-04-14 at 7.58.58 PM.jpeg'],
  ['filter-build-up', 'WhatsApp Image 2026-04-12 at 4.55.11 PM.jpeg'],
  ['dryer-lint', 'WhatsApp Image 2026-04-12 at 5.04.35 PM.jpeg'],
  ['vacuum-equipment', 'WhatsApp Image 2026-04-14 at 7.58.54 PM.jpeg'],
  ['vent-extraction', 'Before and After APT/WhatsApp Image 2026-04-20 at 4.42.08 PM.jpeg'],
  ['flex-duct', 'Before and After APT/WhatsApp Image 2026-04-21 at 12.11.40 PM (2).jpeg'],
];

await fs.mkdir(destination, { recursive: true });
const manifest = [];
for (const [name, relative] of sources) {
  const input = path.join(archive, relative);
  const metadata = await sharp(input).metadata();
  const variants = [];
  for (const width of [480, 960]) {
    const output = `${name}-${width}.webp`;
    const info = await sharp(input).rotate().resize({ width }).webp({ quality: 78, effort: 5 }).toFile(path.join(destination, output));
    variants.push({ file: output, width: info.width, height: info.height, bytes: info.size });
  }
  manifest.push({ name, source: relative, originalWidth: metadata.width, originalHeight: metadata.height, variants });
}
// Reuse the existing site's lifestyle artwork as atmosphere, never project proof.
for (const width of [480, 960]) {
  await sharp(path.join(frontend, 'public/images/services/residential-duct.jpg'))
    .rotate().resize({ width }).webp({ quality: 82, effort: 5 })
    .toFile(path.join(destination, `home-interior-${width}.webp`));
}
// Keep source paths in local documentation, outside the published image directory.
const report = path.join(frontend, '../docs/home-services-2026-11-11');
await fs.mkdir(report, { recursive: true });
await fs.writeFile(path.join(report, 'photo-sources.json'), JSON.stringify({
  archive, photos: manifest,
  lifestyleImage: { source: 'frontend/public/images/services/residential-duct.jpg', use: 'Existing lifestyle artwork; not represented as a completed PAC project.' },
  note: 'Archive images are individual field observations, not a verified matched before/after comparison. No customer records or personal details are published.',
}, null, 2));
console.log(`Prepared ${sources.length} original archive photos and existing lifestyle artwork.`);
for (const entry of manifest) console.log(entry.name, entry.variants.map(v => `${v.width}w: ${Math.round(v.bytes / 1024)} KB`).join(', '));
