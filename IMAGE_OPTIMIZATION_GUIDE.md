# Pure Air California - Image Optimization Guide

## Overview

Image optimization is crucial for web performance, SEO, user experience, and bandwidth costs. This guide provides step-by-step instructions for optimizing images for the Pure Air California website using modern tools and best practices.

**Why Image Optimization Matters**:
- **Performance**: Faster page load times improve user experience and SEO rankings
- **SEO**: Google considers page speed as a ranking factor
- **User Experience**: Users expect fast-loading pages, especially on mobile
- **Bandwidth Costs**: Smaller images reduce hosting and CDN costs
- **Accessibility**: Proper optimization ensures images load for users with slow connectionsnpn

## Recommended Tools

### Primary: vite-imagetools (v8.0.0+)
**Benefits**:
- Sharp-powered optimization (industry standard)
- Compile-time transforms for better performance
- Modern format support (WebP, AVIF)
- Responsive image generation
- Seamless Vite integration

### Alternative: unplugin-imagemin
**Benefits**:
- Cross-bundler compatibility
- Squoosh-based optimization
- Build-time optimization
- Good format support

### Manual Tools (for one-off optimizations)
- **TinyPNG**: Online compression service
- **Squoosh.app**: Google's web-based image optimizer
- **ImageOptim**: Desktop app for batch optimization

## Installation Instructions

### Option A - vite-imagetools (Recommended)

1. **Install the package**:
   ```bash
   npm install -D vite-imagetools
   ```

2. **Add to vite.config.ts**:
   ```typescript
   import { imagetools } from 'vite-imagetools';
   
   export default defineConfig({
     plugins: [
       react(),
       imagetools({
         defaultDirectives: (url) => {
           return new URLSearchParams({
             format: 'webp;jpg',
             quality: '80',
           });
         },
       }),
       // other plugins...
     ],
   });
   ```

### Option B - unplugin-imagemin

1. **Install the package**:
   ```bash
   npm install -D unplugin-imagemin
   ```

2. **Add to vite.config.ts**:
   ```typescript
   import { defineConfig } from 'vite';
   import { viteImagemin } from 'unplugin-imagemin/vite';
   
   export default defineConfig({
     plugins: [
       react(),
       viteImagemin({
         gifsicle: { optimizationLevel: 7 },
         mozjpeg: { quality: 80 },
         optipng: { optimizationLevel: 7 },
         svgo: {
           plugins: [
             { name: 'removeViewBox', active: false },
             { name: 'removeEmptyAttrs', active: false },
           ],
         },
       }),
       // other plugins...
     ],
   });
   ```

## Configuration Guidelines

### WebP Settings
- **Quality**: 80% (balance between file size and visual quality)
- **Compression Level**: 6 (default, good balance)
- **Progressive**: Enabled (better perceived performance)

### JPG Settings
- **Quality**: 85% (higher than WebP to maintain quality as fallback)
- **Progressive Encoding**: Enabled
- **Optimize**: Enabled

### PNG Settings
- **Quality**: 80-90% (PNG is lossless, but tools can optimize)
- **Compression Level**: 9 (maximum compression)
- **Optimize**: Enabled

### SVG Settings
- **Use SVGO**: Remove metadata, optimize paths
- **Remove Unused**: Colors, gradients, patterns
- **Minify**: Remove unnecessary whitespace

### Target File Sizes
| Image Type | Target Size | Notes |
|------------|-------------|-------|
| Hero Images | <300KB | Large, high-impact images |
| Content Images | <200KB | Standard content images |
| Thumbnails | <100KB | Small preview images |
| Icons/Logos | <50KB | Simple graphics and icons |

## Format Selection Strategy

### WebP (Primary Format)
- **Benefits**: 80-90% smaller than JPG, excellent quality
- **Browser Support**: 95%+ of modern browsers
- **Use For**: All raster images (photos, graphics)

### JPG (Fallback Format)
- **Benefits**: Universal browser support
- **Use For**: Fallback for WebP, photos without transparency
- **Avoid For**: Images requiring transparency

### PNG (Selective Use)
- **Benefits**: Supports transparency, lossless compression
- **Use For**: Images requiring transparency, logos with transparency
- **Avoid For**: Photos (use WebP/JPG instead)

### SVG (Vector Graphics)
- **Benefits**: Scalable, small file size for simple graphics
- **Use For**: Logos, icons, simple illustrations
- **Avoid For**: Complex graphics, photos

### AVIF (Future Implementation)
- **Benefits**: Even better compression than WebP
- **Browser Support**: Growing (Chrome, Firefox)
- **Consider For**: Future optimization (2025+)

## Responsive Image Strategy

### Breakpoints
- **Mobile**: 640px width
- **Tablet**: 1024px width  
- **Desktop**: 1920px width (original)

### Implementation with Picture Element
```html
<picture>
  <source 
    srcset="image-mobile.webp 640w, 
            image-tablet.webp 1024w, 
            image-desktop.webp 1920w" 
    type="image/webp"
    sizes="(max-width: 640px) 640px, 
           (max-width: 1024px) 1024px, 
           1920px">
  <source 
    srcset="image-mobile.jpg 640w, 
            image-tablet.jpg 1024w, 
            image-desktop.jpg 1920w" 
    type="image/jpeg"
    sizes="(max-width: 640px) 640px, 
           (max-width: 1024px) 1024px, 
           1920px">
  <img 
    src="image-desktop.jpg" 
    alt="Descriptive alt text" 
    loading="lazy"
    width="1920" 
    height="1080">
</picture>
```

### React Component Example
```typescript
interface ResponsiveImageProps {
  src: string;
  alt: string;
  loading?: 'lazy' | 'eager';
  className?: string;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  loading = 'lazy',
  className
}) => {
  const baseName = src.replace(/\.(jpg|jpeg|png)$/i, '');
  
  return (
    <picture>
      <source 
        srcSet={`${baseName}-mobile.webp 640w, ${baseName}-tablet.webp 1024w, ${baseName}.webp 1920w`}
        type="image/webp"
        sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px"
      />
      <source 
        srcSet={`${baseName}-mobile.jpg 640w, ${baseName}-tablet.jpg 1024w, ${baseName}.jpg 1920w`}
        type="image/jpeg"
        sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px"
      />
      <img 
        src={`${baseName}.jpg`}
        alt={alt}
        loading={loading}
        className={className}
      />
    </picture>
  );
};
```

## Optimization Workflow

### Step 1: Collect Original Images
- Gather high-resolution source images
- Ensure minimum dimensions for target use cases
- Organize by folder structure (see IMAGE_INVENTORY.md)

### Step 2: Resize to Target Dimensions
- **Hero Images**: 1920x1080px minimum
- **Service Cards**: 600x400px
- **Team Portraits**: 400x400px
- **Equipment Photos**: 700x500px
- **Before/After**: 800x600px
- **Process Steps**: 600x400px

### Step 3: Create Responsive Variants
- **Desktop**: Original size (e.g., 1920px width)
- **Tablet**: 1024px width (maintain aspect ratio)
- **Mobile**: 640px width (maintain aspect ratio)

### Step 4: Convert to WebP Format
- Use 80% quality setting
- Ensure browser compatibility fallback

### Step 5: Optimize JPG Fallback
- Use 85% quality setting
- Enable progressive encoding
- Optimize compression

### Step 6: Verify File Sizes
- Check each image is under target size
- Hero images: <300KB
- Content images: <200KB
- Thumbnails: <100KB

### Step 7: Add to Appropriate Folder
- Place in `/frontend/public/images/[category]/`
- Follow naming conventions (see IMAGE_NAMING_CONVENTIONS.md)

### Step 8: Update Inventory
- Add entry to IMAGE_INVENTORY.md
- Mark completion status
- Note file sizes and optimization details

## Lazy Loading Implementation

### Native Lazy Loading
```html
<!-- Above-the-fold images (load immediately) -->
<img src="hero-image.jpg" alt="Hero" loading="eager">

<!-- Below-the-fold images (load when needed) -->
<img src="content-image.jpg" alt="Content" loading="lazy">
```

### Intersection Observer (Advanced)
```typescript
const useLazyLoading = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return { isLoaded, imgRef };
};
```

## Alt Text Best Practices

### Good Alt Text Examples
- ✅ "NADCA certified technician cleaning residential air duct with rotary brush"
- ✅ "Before and after comparison showing air duct interior before and after cleaning"
- ✅ "Professional team of air duct cleaning specialists in branded uniforms"
- ✅ "Truck-mounted vacuum system with Pure Air California branding"

### Bad Alt Text Examples
- ❌ "Image of cleaning"
- ❌ "Photo"
- ❌ "Picture"
- ❌ "Team photo"
- ❌ "Before and after"

### Alt Text Guidelines
1. **Be descriptive and specific** (125 characters or less)
2. **Include relevant keywords naturally**
3. **Describe what's in the image, not just the subject**
4. **Don't start with "Image of" or "Picture of"**
5. **Consider the context and surrounding content**
6. **Use proper capitalization and punctuation**

## Performance Metrics

### Target Metrics
- **Largest Contentful Paint (LCP)**: <2.5 seconds
- **Cumulative Layout Shift (CLS)**: <0.1
- **First Input Delay (FID)**: <100ms
- **Image Load Time**: <1 second for above-the-fold images

### Measuring Performance
1. **Chrome DevTools Lighthouse**
   - Run performance audit
   - Check image optimization suggestions
   - Monitor Core Web Vitals

2. **PageSpeed Insights**
   - Test mobile and desktop performance
   - Get specific optimization recommendations
   - Monitor real-world performance data

3. **WebPageTest**
   - Detailed performance analysis
   - Waterfall charts for image loading
   - Comparison with competitors

## Testing Checklist

### Browser Compatibility
- [ ] Images load correctly in Chrome
- [ ] Images load correctly in Firefox
- [ ] Images load correctly in Safari
- [ ] Images load correctly in Edge

### Format Support
- [ ] WebP format serves to supporting browsers
- [ ] JPG fallback works in older browsers
- [ ] No broken images in any browser

### Responsive Behavior
- [ ] Responsive variants load at correct breakpoints
- [ ] Images scale properly on mobile devices
- [ ] No layout shift during image load

### Performance
- [ ] Lazy loading functions properly
- [ ] File sizes meet targets (<200KB)
- [ ] Images are sharp and clear at all sizes
- [ ] No layout shift during image load

### Accessibility
- [ ] Alt text is present and descriptive
- [ ] Images are accessible to screen readers
- [ ] Color contrast is adequate for overlays

## Maintenance Schedule

### Monthly Tasks
- Review image performance metrics
- Check for unused images in build
- Monitor Core Web Vitals scores

### Quarterly Tasks
- Audit for unused images
- Optimize further if needed
- Review and update optimization tools

### Annual Tasks
- Re-evaluate optimization tools and techniques
- Update format support (consider AVIF)
- Review and update naming conventions

### As Needed Tasks
- Optimize new images before adding to site
- Update inventory documentation
- Test new optimization tools

## Common Issues and Solutions

### Issue: Images Too Large (>200KB)
**Solutions**:
- Increase compression quality setting
- Reduce dimensions if appropriate
- Crop unnecessary areas
- Consider using WebP format

### Issue: Images Look Blurry
**Solutions**:
- Reduce compression quality
- Use higher resolution source
- Check responsive variant sizes
- Ensure proper scaling in CSS

### Issue: WebP Not Loading
**Solutions**:
- Verify browser support
- Ensure JPG fallback is present
- Check file paths and naming
- Test in different browsers

### Issue: Slow Page Load
**Solutions**:
- Implement lazy loading
- Reduce number of images per page
- Optimize further (lower quality)
- Use CDN for image delivery

### Issue: Layout Shift During Load
**Solutions**:
- Set explicit width and height attributes
- Use CSS aspect-ratio property
- Reserve space for images
- Load critical images with higher priority

## Resources and References

### Documentation
- [vite-imagetools documentation](https://www.npmjs.com/package/vite-imagetools)
- [unplugin-imagemin documentation](https://www.npmjs.com/package/unplugin-imagemin)
- [WebP format guide](https://developers.google.com/speed/webp)
- [Image optimization best practices](https://web.dev/fast/#optimize-your-images)

### Tools
- [Squoosh.app](https://squoosh.app/) - Google's image optimizer
- [TinyPNG](https://tinypng.com/) - Online compression service
- [ImageOptim](https://imageoptim.com/) - Desktop optimization app
- [SVGO](https://github.com/svg/svgo) - SVG optimizer

### Testing Tools
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Performance Monitoring
- [Core Web Vitals](https://web.dev/vitals/)
- [Web Vitals extension](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma)
- [Real User Monitoring](https://web.dev/user-centric-performance-metrics/)

---

*This optimization guide ensures fast, accessible, and SEO-friendly images across the Pure Air California website while maintaining visual quality and user experience.*
