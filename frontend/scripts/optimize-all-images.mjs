#!/usr/bin/env node
/**
 * Pure Air California — Site-Wide Media Optimization Pipeline
 *
 * 1. Removes unreferenced `_backup/` directories under `public/images/` (after verifying zero src refs).
 * 2. Optimizes every active `.jpg`, `.jpeg`, `.png`, and oversized `.webp` / `.avif` asset in place
 *    preserving exact aspect ratios (and exact dimensions for width-suffixed variants & brand logos).
 * 3. Generates matching `.webp` siblings (plus `-640.webp` responsive variants for locations/heroes)
 *    and `.avif` siblings for hero / LCP assets.
 * 4. Verifies zero broken/invalid images across `public/images/` and `public/brand/`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FRONTEND_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(FRONTEND_DIR, 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const BRAND_DIR = path.join(PUBLIC_DIR, 'brand');

const DRY_RUN = process.argv.includes('--dry-run');
const CONCURRENCY = 6;

function walk(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, results);
    else results.push(full);
  }
  return results;
}

function relPublic(fullPath) {
  return '/' + path.relative(PUBLIC_DIR, fullPath).replace(/\\/g, '/');
}

function sumBytes(files) {
  return files.reduce((acc, f) => acc + (fs.existsSync(f) ? fs.statSync(f).size : 0), 0);
}

function assertBackupUnreferenced() {
  const srcFiles = [
    ...walk(path.join(FRONTEND_DIR, 'src')),
    path.join(FRONTEND_DIR, 'index.html'),
  ].filter(f => fs.existsSync(f));
  for (const f of srcFiles) {
    const txt = fs.readFileSync(f, 'utf8');
    if (txt.includes('_backup')) {
      throw new Error(`Refusing to delete _backup: referenced in ${f}`);
    }
  }
}

// Primary Hero / LCP assets that also receive `.avif` siblings
const AVIF_HERO_TARGETS = new Set([
  '/images/pac/losAngeles.webp',
  '/images/pac/rooftop-hvac-ductwork.webp',
  '/images/pac/commercial.webp',
  '/images/pac/homeInterior.webp',
  '/images/pac/duct-interior-clean-v2.webp',
  '/images/pac/duct-cleaning-interior-v2.webp',
  '/images/pac/laundromat.webp',
  '/images/pac/hvac.webp',
  '/images/pac/healthcare.webp',
  '/images/pac/hotel.webp',
  '/images/pac/industrial.webp',
  '/images/pac/office.webp',
  '/images/pac/dryer.webp',
  '/images/pac/spiral-duct-diffuser.webp',
  '/images/pac/duct-clear-archive-v3.webp',
  '/images/pac/socal-coastal-homes.webp',
  '/images/pac/dirtyDuct.webp',
  '/images/cinematic/california-sky-v1.webp',
  '/images/cinematic/los-angeles-v1.webp',
  '/images/industry-v2/property-management-1280.webp',
  '/images/industry-v2/restaurants-1280.webp',
  '/images/industry-v2/education-1280.webp',
  '/images/industry-v2/retail-1280.webp',
  '/images/visual-story/home-family-640.webp',
  '/images/visual-story/home-family-1280.webp',
  '/images/visual-story/home-family-1920.webp',
  '/images/visual-story/allergy-home-640.webp',
  '/images/visual-story/allergy-home-1280.webp',
  '/images/visual-story/allergy-home-1920.webp',
  '/images/visual-story/consultation-pac-v3-640.webp',
  '/images/visual-story/consultation-pac-v3-1280.webp',
  '/images/visual-story/consultation-pac-v3-1920.webp',
  '/images/breath/yosemite-stars-640.webp',
  '/images/breath/yosemite-stars-1440.webp',
  '/images/breath/yosemite-stars-1920.webp',
  '/images/breath/living-forest-640.webp',
  '/images/breath/living-forest-1440.webp',
  '/images/breath/living-forest-1920.webp',
  '/images/breath/cloud-sea-640.webp',
  '/images/breath/cloud-sea-1440.webp',
  '/images/breath/cloud-sea-1920.webp',
  '/images/journey-v2/la-skyline-cedric-480.webp',
  '/images/journey-v2/la-skyline-cedric-960.webp',
  '/images/journey-v2/la-skyline-cedric-1600.webp',
  '/images/services/residential-duct.jpg',
  '/images/blog/dryer-vent-safety-guide.jpg',
  '/images/hero/hvac-dryer-vent-realistic.png',
  '/images/hero/california-nature-v2.png',
  '/images/hero/hvac-technicians.webp',
  '/images/locations/century-city.jpg',
]);

// Key PageHero & feature JPG/PNG assets that also receive `-640.webp` responsive siblings
const RESPONSIVE_640_TARGETS = new Set([
  '/images/services/residential-duct.jpg',
  '/images/blog/dryer-vent-safety-guide.jpg',
  '/images/hero/hvac-dryer-vent-realistic.png',
  '/images/hero/california-nature-v2.png',
  '/images/hero/commercial-duct-v2.png',
  '/images/hero/residential-duct-v2.png',
  '/images/hero/dryer-vent-v2.png',
  '/images/health/woman-breathing-clean-air.jpg',
  '/images/health/woman-breathing.jpg',
]);

async function encodeWebpFast(inputBuf, { maxWidth, maxHeight, targetKB, startQ = 80, minQ = 68, resize = true }) {
  const buildPipe = () => {
    let pipe = sharp(inputBuf).rotate();
    if (resize && (maxWidth || maxHeight)) {
      pipe = pipe.resize({
        width: maxWidth || undefined,
        height: maxHeight || undefined,
        fit: 'inside',
        withoutEnlargement: true,
      });
    }
    return pipe;
  };
  let buf = await buildPipe().webp({ quality: startQ, effort: 4, smartSubsample: true }).toBuffer();
  if (buf.length / 1024 <= targetKB) return buf;
  const midQ = Math.max(minQ, startQ - 8);
  buf = await buildPipe().webp({ quality: midQ, effort: 4, smartSubsample: true }).toBuffer();
  if (buf.length / 1024 <= targetKB || midQ === minQ) return buf;
  return buildPipe().webp({ quality: minQ, effort: 4, smartSubsample: true }).toBuffer();
}

async function encodeAvifFast(inputBuf, { maxWidth, maxHeight, quality = 50, resize = true }) {
  let pipe = sharp(inputBuf).rotate();
  if (resize && (maxWidth || maxHeight)) {
    pipe = pipe.resize({
      width: maxWidth || undefined,
      height: maxHeight || undefined,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }
  return pipe.avif({ quality, effort: 2, chromaSubsampling: '4:2:0' }).toBuffer();
}

async function writeAtomic(filePath, buf) {
  if (DRY_RUN) return;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      fs.writeFileSync(filePath, buf);
      return;
    } catch (err) {
      if ((err.code === 'EPERM' || err.code === 'EBUSY') && attempt < 4) {
        await new Promise((r) => setTimeout(r, 100 * (attempt + 1)));
        continue;
      }
      throw err;
    }
  }
}

async function runPool(items, concurrency, worker) {
  let idx = 0;
  let done = 0;
  await Promise.all(
    Array.from({ length: concurrency }, async () => {
      while (idx < items.length) {
        const cur = items[idx++];
        await worker(cur);
        done++;
        if (done % 60 === 0 || done === items.length) {
          console.log(`Progress: ${done}/${items.length}`);
        }
      }
    })
  );
}

async function main() {
  // Remove any leftover temp files from interrupted runs
  for (const f of [...walk(IMAGES_DIR), ...walk(BRAND_DIR)]) {
    if (/\.tmp-\d+/.test(f)) {
      fs.unlinkSync(f);
    }
  }

  const startFiles = [...walk(IMAGES_DIR), ...walk(BRAND_DIR)];
  const startBytes = sumBytes(startFiles);
  console.log(`START SCAN: ${startFiles.length} files, ${(startBytes / 1024 / 1024).toFixed(2)} MB`);

  // Step 1: Remove unreferenced _backup directories & known 29-byte corrupt file
  assertBackupUnreferenced();
  const backupDirs = [
    path.join(IMAGES_DIR, 'services', '_backup'),
    path.join(IMAGES_DIR, 'hero', '_backup'),
  ];
  let deletedCount = 0;
  let deletedBytes = 0;
  for (const dir of backupDirs) {
    if (fs.existsSync(dir)) {
      const files = walk(dir);
      const bytes = sumBytes(files);
      deletedCount += files.length;
      deletedBytes += bytes;
      if (!DRY_RUN) fs.rmSync(dir, { recursive: true, force: true });
      console.log(`Removed backup dir ${relPublic(dir)} (${files.length} files, ${(bytes / 1024 / 1024).toFixed(2)} MB)`);
    }
  }
  const corruptFile = path.join(IMAGES_DIR, 'before-after', 'gallery-dirty-duct-2.jpg');
  if (fs.existsSync(corruptFile) && fs.statSync(corruptFile).size < 100) {
    deletedCount += 1;
    deletedBytes += fs.statSync(corruptFile).size;
    if (!DRY_RUN) fs.unlinkSync(corruptFile);
    console.log(`Removed corrupt 29-byte unreferenced file /images/before-after/gallery-dirty-duct-2.jpg`);
  }

  // Step 2: Process all active media files in parallel
  const activeFiles = [...walk(IMAGES_DIR), ...walk(BRAND_DIR)].filter(f =>
    ['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(path.extname(f).toLowerCase())
  );

  const stats = {
    inPlaceOptimized: 0,
    webpCreated: 0,
    webp640Created: 0,
    avifCreated: 0,
    skippedInvalid: [],
  };

  await runPool(activeFiles, CONCURRENCY, async (full) => {
    const ext = path.extname(full).toLowerCase();
    const rel = relPublic(full);
    const origBuf = fs.readFileSync(full);
    let meta;
    try {
      meta = await sharp(origBuf).metadata();
    } catch (e) {
      stats.skippedInvalid.push({ rel, err: e.message });
      return;
    }

    const isLocation = rel.startsWith('/images/locations/');
    const isBlog = rel.startsWith('/images/blog/');
    const isHealth = rel.startsWith('/images/health/');
    const isHero = rel.startsWith('/images/hero/');
    const isServices = rel.startsWith('/images/services/');
    const isClientLogo = rel.startsWith('/brand/clients/');
    const isMainLogo = rel === '/images/logo/pac-logo.png';
    const isBrandRoot = rel.startsWith('/brand/') && !isClientLogo;
    const isPac = rel.startsWith('/images/pac/');
    const hasWidthSuffix = /-(?:320|480|640|960|1280|1440|1600|1920)\.(?:webp|avif)$/i.test(rel);

    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      let maxW = 1600;
      let maxH = 1600;
      let webpTargetKB = 75;
      let jpgQ = 76;

      if (isMainLogo) {
        // verify-sitewide-heroes.cjs asserts exact 414x151 aspect ratio
        maxW = meta.width;
        maxH = meta.height;
      } else if (isClientLogo) {
        maxW = 480;
        maxH = 480;
        webpTargetKB = 18;
        jpgQ = 82;
      } else if (isBrandRoot) {
        maxW = meta.width;
        maxH = meta.height;
        webpTargetKB = 55;
        jpgQ = 80;
      } else if (isLocation) {
        maxW = 1024;
        maxH = 1024;
        webpTargetKB = 65;
        jpgQ = 76;
      } else if (isBlog || isHealth) {
        maxW = 1024;
        maxH = 1024;
        webpTargetKB = 65;
        jpgQ = 76;
      } else if (isHero || isServices) {
        maxW = 1600;
        maxH = 1600;
        webpTargetKB = 95;
        jpgQ = 78;
      } else {
        maxW = 1200;
        maxH = 1200;
        webpTargetKB = 70;
        jpgQ = 78;
      }

      // 2a. Optimize in-place preserving filename & extension
      let optimizedBuf;
      if (ext === '.png') {
        let pipe = sharp(origBuf).rotate();
        if (!isMainLogo && (meta.width > maxW || meta.height > maxH)) {
          pipe = pipe.resize({ width: maxW, height: maxH, fit: 'inside', withoutEnlargement: true });
        }
        const usePalette = !isMainLogo && origBuf.length > 40 * 1024;
        optimizedBuf = await pipe
          .png({
            compressionLevel: 9,
            effort: 8,
            palette: usePalette,
            quality: usePalette ? 80 : 100,
          })
          .toBuffer();
      } else {
        let pipe = sharp(origBuf).rotate();
        if (meta.width > maxW || meta.height > maxH) {
          pipe = pipe.resize({ width: maxW, height: maxH, fit: 'inside', withoutEnlargement: true });
        }
        optimizedBuf = await pipe
          .jpeg({ quality: jpgQ, mozjpeg: true, progressive: true })
          .toBuffer();
      }

      const resizedDown = meta.width > maxW || meta.height > maxH;
      if (optimizedBuf.length < origBuf.length || resizedDown) {
        await writeAtomic(full, optimizedBuf);
        stats.inPlaceOptimized++;
      }

      // 2b. Generate matching .webp sibling
      const shouldCreateWebp =
        !isBrandRoot &&
        !isMainLogo &&
        !rel.includes('placeholder') &&
        !rel.includes('72fdde68-');

      if (shouldCreateWebp) {
        const webpPath = full.replace(/\.(?:jpg|jpeg|png)$/i, '.webp');
        if (!fs.existsSync(webpPath)) {
          const webpBuf = await encodeWebpFast(origBuf, {
            maxWidth: maxW,
            maxHeight: maxH,
            targetKB: webpTargetKB,
            startQ: isClientLogo ? 84 : 80,
            minQ: isClientLogo ? 74 : 68,
            resize: true,
          });
          await writeAtomic(webpPath, webpBuf);
          stats.webpCreated++;
        }
      }

      // 2c. Generate -640.webp responsive variant for locations and key hero JPG/PNGs
      if ((isLocation || RESPONSIVE_640_TARGETS.has(rel)) && meta.width > 640) {
        const webp640Path = full.replace(/\.(?:jpg|jpeg|png)$/i, '-640.webp');
        if (!fs.existsSync(webp640Path)) {
          const webp640Buf = await encodeWebpFast(origBuf, {
            maxWidth: 640,
            maxHeight: 640,
            targetKB: 32,
            startQ: 78,
            minQ: 66,
            resize: true,
          });
          await writeAtomic(webp640Path, webp640Buf);
          stats.webp640Created++;
        }
      }

      // 2d. Generate .avif sibling for hero/LCP JPG/PNG targets
      if (AVIF_HERO_TARGETS.has(rel)) {
        const avifPath = full.replace(/\.(?:jpg|jpeg|png)$/i, '.avif');
        if (!fs.existsSync(avifPath)) {
          const avifBuf = await encodeAvifFast(origBuf, {
            maxWidth: maxW,
            maxHeight: maxH,
            quality: 50,
            resize: true,
          });
          const webpSib = full.replace(/\.(?:jpg|jpeg|png)$/i, '.webp');
          const webpSize = fs.existsSync(webpSib) ? fs.statSync(webpSib).size : Infinity;
          if (avifBuf.length < webpSize) {
            await writeAtomic(avifPath, avifBuf);
            stats.avifCreated++;
          }
        }
      }
      return;
    }

    if (ext === '.webp') {
      const kb = origBuf.length / 1024;
      let targetKB = 135;
      let maxDim = null;
      if (hasWidthSuffix) {
        if (meta.width <= 480) targetKB = 25;
        else if (meta.width <= 640) targetKB = 42;
        else if (meta.width <= 960) targetKB = 75;
        else if (meta.width <= 1280) targetKB = 105;
        else if (meta.width <= 1440) targetKB = 125;
        else targetKB = 140;
      } else if (isPac) {
        maxDim = 1600;
        targetKB = 130;
      } else if (isClientLogo || isBrandRoot) {
        targetKB = 25;
      } else {
        maxDim = 1600;
        targetKB = 130;
      }

      const needsResize = maxDim && (meta.width > maxDim || meta.height > maxDim);
      let finalSize = origBuf.length;
      if (kb > targetKB || needsResize) {
        const reencoded = await encodeWebpFast(origBuf, {
          maxWidth: maxDim,
          maxHeight: maxDim,
          targetKB,
          startQ: 78,
          minQ: 66,
          resize: Boolean(needsResize),
        });
        if (reencoded.length < origBuf.length * 0.96 || needsResize) {
          await writeAtomic(full, reencoded);
          finalSize = reencoded.length;
          stats.inPlaceOptimized++;
        }
      }

      if (AVIF_HERO_TARGETS.has(rel)) {
        const avifPath = full.replace(/\.webp$/i, '.avif');
        if (!fs.existsSync(avifPath)) {
          const avifBuf = await encodeAvifFast(origBuf, {
            maxWidth: maxDim,
            maxHeight: maxDim,
            quality: 50,
            resize: Boolean(needsResize),
          });
          if (avifBuf.length < finalSize * 0.95) {
            await writeAtomic(avifPath, avifBuf);
            stats.avifCreated++;
          }
        }
      }
      return;
    }

    if (ext === '.avif') {
      const kb = origBuf.length / 1024;
      const targetKB = meta.width >= 1400 ? 125 : meta.width >= 900 ? 60 : 20;
      if (kb > targetKB) {
        const reencoded = await encodeAvifFast(origBuf, {
          quality: 46,
          resize: false,
        });
        if (reencoded.length < origBuf.length * 0.92) {
          await writeAtomic(full, reencoded);
          stats.inPlaceOptimized++;
        }
      }
    }
  });

  // Step 3: Post-optimization verification & summary
  const afterFiles = [...walk(IMAGES_DIR), ...walk(BRAND_DIR)];
  const afterBytes = sumBytes(afterFiles);
  const manifest = [];
  let maxWebp = { rel: '', kb: 0 };
  let maxJpg = { rel: '', kb: 0 };
  let maxAvif = { rel: '', kb: 0 };
  const over200 = [];
  const broken = [];

  for (const full of afterFiles) {
    const ext = path.extname(full).toLowerCase();
    const rel = relPublic(full);
    const bytes = fs.statSync(full).size;
    const kb = +(bytes / 1024).toFixed(1);
    if (!['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext)) continue;
    try {
      const meta = await sharp(full).metadata();
      manifest.push({ rel, ext, kb, width: meta.width, height: meta.height });
      if (ext === '.webp' && kb > maxWebp.kb) maxWebp = { rel, kb };
      if ((ext === '.jpg' || ext === '.jpeg') && kb > maxJpg.kb) maxJpg = { rel, kb };
      if (ext === '.avif' && kb > maxAvif.kb) maxAvif = { rel, kb };
      if (kb > 200) over200.push({ rel, kb, width: meta.width, height: meta.height });
    } catch (e) {
      broken.push({ rel, err: e.message });
    }
  }

  if (process.env.MANIFEST_OUT) {
    fs.writeFileSync(process.env.MANIFEST_OUT, JSON.stringify(manifest, null, 2));
  }

  console.log('\n=== OPTIMIZATION COMPLETE ===');
  console.log(`AFTER: ${afterFiles.length} files, ${(afterBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log('STATS:', stats);
  console.log('LARGEST:', { maxWebp, maxJpg, maxAvif });
  console.log('FILES > 200KB:', over200.sort((a, b) => b.kb - a.kb));
  console.log('BROKEN/INVALID IMAGES:', broken);

  for (const keyRel of ['/images/logo/pac-logo.png', '/brand/pac-brandmark-v2.webp', '/brand/og-cinematic-v1.jpg']) {
    const rec = manifest.find(m => m.rel === keyRel);
    console.log('KEY ASSET CHECK:', rec);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
