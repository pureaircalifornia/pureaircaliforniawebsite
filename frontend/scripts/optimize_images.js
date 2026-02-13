import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.join(__dirname, '../public/images/sortanduse');
const TARGET_DIR = path.join(__dirname, '../public/images/hero');

const IMAGE_MAPPING = {
    'beautiful-shot-high-white-hilltops-mountains-covered-fog.jpg': 'hero-foggy-mountains.jpg',
    'jeremy-bishop-zCFt2Rzcv_c-unsplash.jpg': 'hero-river-forest.jpg',
    'martin-adams-pTCcJSBOTxY-unsplash.jpg': 'hero-mountain-landscape.jpg',
    'olga-subach-y3gVUyqD-MI-unsplash.jpg': 'hero-misty-trees.jpg',
    'rivage-yZmHFF-g-W0-unsplash.jpg': 'hero-coastal.jpg',
    '3d-rendering-ventilation-system (1).jpg': 'hvac-3d-render.jpg',
    'men-working-with-equipment-full-shot.jpg': 'hvac-technicians.jpg',
    'close-up-ventilation-system (1).jpg': 'hvac-closeup-1.jpg',
    'close-up-ventilation-system (2).jpg': 'hvac-dryer-vent.jpg',
    'Clean-air-duct-after1.jpg': 'residential-duct.jpg',
    'romantic-couple-home-attractive-young-woman-handsome-man-are-enjoying-spending-time.jpg': 'happy-home-couple.jpg',
    'close-up-ventilation-system (3).jpg': 'commercial-duct-cleaning-Main.jpg',
    'close-up-ventilation-system (4).jpg': 'commercial-dryer-vent-Main.jpg',
    'close-up-ventilation-system (7).jpg': 'commercial-filter-system-Main.jpg',
};

async function optimizeImages() {
    if (!fs.existsSync(TARGET_DIR)) {
        fs.mkdirSync(TARGET_DIR, { recursive: true });
    }

    console.log(`Processing images from ${SOURCE_DIR} to ${TARGET_DIR}...`);

    for (const [sourceName, targetName] of Object.entries(IMAGE_MAPPING)) {
        const sourcePath = path.join(SOURCE_DIR, sourceName);
        const targetPath = path.join(TARGET_DIR, targetName);

        if (fs.existsSync(sourcePath)) {
            try {
                console.log(`Optimizing ${sourceName} -> ${targetName}`);
                await sharp(sourcePath)
                    .resize(1920, 1080, { // Standard Hero size
                        fit: 'cover',
                        withoutEnlargement: true
                    })
                    .jpeg({ quality: 80, mozjpeg: true })
                    .toFile(targetPath);
                console.log(`✅ Success: ${targetName}`);
            } catch (error) {
                console.error(`❌ Error processing ${sourceName}:`, error);
            }
        } else {
            console.warn(`⚠️ Source file not found: ${sourceName}`);
        }
    }
}

optimizeImages();
