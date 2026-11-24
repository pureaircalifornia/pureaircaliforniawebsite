import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const source = 'C:/Users/IMAGINE360/.codex/generated_images/01a12962-2ff1-78a2-98d6-bd0802a6cb5c';
const destination = path.resolve('public/images/visual-story');
await fs.mkdir(destination, { recursive: true });
const assets = [
  ['home-family', 'exec-5b81d26d-d95a-406b-8d61-5fd2438db5ea.png'],
  ['allergy-home', 'exec-7fb71474-f725-492d-ba0f-3a61f9de21e3.png'],
  ['consultation-pac-v2', 'exec-dfc05a1b-ead6-4c01-9f55-e7671bf6d22a.png'],
  ['consultation-pac-v3', 'exec-29053d8b-9d35-4179-8f2e-a74de45a3cb9.png'],
];
for (const [name, filename] of assets) {
  for (const width of [640, 1280, 1920]) {
    await sharp(path.join(source, filename)).resize({ width, withoutEnlargement: true }).webp({ quality: 84 }).toFile(path.join(destination, `${name}-${width}.webp`));
  }
}
for (const name of ['filter', 'commercialFilter']) {
  await sharp(path.resolve(`public/images/pac/${name}.webp`)).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(destination, `service-${name}-640.webp`));
}
console.log(`Prepared ${assets.length * 3} responsive visual story images.`);
