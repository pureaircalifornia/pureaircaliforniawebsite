# Pure Air California Website

A modern, responsive website for Pure Air California, featuring comprehensive air duct cleaning services, team information, and customer resources.

## Image Asset Management

This project uses a comprehensive image optimization and organization system to ensure fast load times and excellent user experience.

### Image Folder Structure

All images are organized in `/frontend/public/images/` with the following subdirectories:
- `hero/` - Full-width hero section images
- `services/` - Service-related imagery
- `team/` - Team member photos and group shots
- `equipment/` - Equipment and tools photography
- `before-after/` - Before/after comparison images
- `process/` - Process step documentation
- `certifications/` - Certificates and trust indicators
- `locations/` - Location-specific photos
- `blog/` - Blog post images and infographics
- `customers/` - Customer testimonials and reviews
- `industries/` - Industry-specific service photos

Legacy folders for backward compatibility:
- `gallery/` - Main gallery images
- `gallery/Photos/` - Before/after photo collection
- `logo/` - Company and client logos

### Documentation

Detailed guides are available in the project root:
- **IMAGE_INVENTORY.md** - Complete inventory of all 205-259 required images with specifications and usage locations
- **IMAGE_NAMING_CONVENTIONS.md** - Naming standards and SEO best practices
- **IMAGE_OPTIMIZATION_GUIDE.md** - Step-by-step optimization workflow and tool configuration
- **IMAGE_COLLECTION_CHECKLIST.md** - Project management checklist for image collection

### Image Optimization

Images are automatically optimized during the build process using `vite-imagetools`:
- WebP format (80% quality) for modern browsers
- JPG fallback (85% quality) for older browsers
- Responsive variants for mobile, tablet, and desktop
- Target file size: <200KB per image
- Lazy loading for below-the-fold images

### Adding New Images

1. Place original high-resolution image in appropriate folder
2. Follow naming conventions from `IMAGE_NAMING_CONVENTIONS.md`
3. Run optimization workflow (see `IMAGE_OPTIMIZATION_GUIDE.md`)
4. Update `IMAGE_INVENTORY.md` with new entry
5. Ensure alt text is descriptive and SEO-friendly

### Image Requirements

- **Hero Images**: 1920x1080px minimum
- **Service Cards**: 600x400px
- **Team Portraits**: 400x400px (square)
- **Equipment Photos**: 700x500px
- **Before/After**: 800x600px
- **Process Steps**: 600x400px

For complete specifications, see `IMAGE_INVENTORY.md`.

## Development

### Prerequisites

- Node.js 20.x
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build

```bash
# Build for production
npm run build
```

### Image Optimization Setup

The project includes `vite-imagetools` for automatic image optimization:

```bash
# Images are automatically optimized during build
npm run build
```

For detailed image optimization instructions, see `IMAGE_OPTIMIZATION_GUIDE.md`.

## Project Structure

```
├── frontend/
│   ├── public/
│   │   └── images/          # Organized image assets
│   │       ├── hero/
│   │       ├── services/
│   │       ├── team/
│   │       └── ...
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   └── ...
│   └── package.json
├── backend/                 # Python backend (if applicable)
├── IMAGE_INVENTORY.md       # Complete image documentation
├── IMAGE_NAMING_CONVENTIONS.md
├── IMAGE_OPTIMIZATION_GUIDE.md
└── IMAGE_COLLECTION_CHECKLIST.md
```

## Contributing

When adding new images:
1. Follow the naming conventions in `IMAGE_NAMING_CONVENTIONS.md`
2. Optimize images according to `IMAGE_OPTIMIZATION_GUIDE.md`
3. Update the inventory in `IMAGE_INVENTORY.md`
4. Ensure all images meet quality standards

## Performance

This project prioritizes web performance through:
- Automatic image optimization
- Responsive image delivery
- Lazy loading implementation
- Modern format support (WebP)
- Target file sizes under 200KB

For performance monitoring and optimization details, see `IMAGE_OPTIMIZATION_GUIDE.md`.
