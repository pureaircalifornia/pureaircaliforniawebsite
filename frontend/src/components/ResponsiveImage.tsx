import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface ResponsiveImageProps {
  src: string;
  alt: string;
  /** Mark true ONLY for the primary above-the-fold LCP image. Sets loading="eager" & fetchpriority="high". */
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  decoding?: 'async' | 'sync' | 'auto';
  className?: string;
  pictureClassName?: string;
  width?: number;
  height?: number;
  srcSet?: string;
  webpSrcSet?: string;
  avifSrcSet?: string;
  sizes?: string;
  style?: React.CSSProperties;
  /** Subtle placeholder background color shown behind opaque photos while loading. Set "none" to disable. */
  placeholderBg?: string;
  /** Disable automatic WebP <picture> source derivation for verified /images/{locations,blog,health} assets. */
  disableAutoPicture?: boolean;
}

// Guaranteed local SVG fallback if an image fails to load
const FALLBACK_PLACEHOLDER = '/placeholder.svg';

const LOCATION_ASSET_RE = /^(\/images\/locations\/[^/?#]+)\.(jpe?g|webp)$/i;
const SQUARE_LEGACY_RE = /^(\/images\/(?:blog|health)\/[^/?#]+)\.(jpe?g)$/i;
const OPAQUE_PHOTO_RE = /\.(?:jpe?g|webp|avif)(?:[?#]|$)/i;

/**
 * ResponsiveImage — Zero-CLS, modern <picture> image component.
 *
 * - Supports explicit AVIF & WebP <source> elements plus automatic responsive WebP
 *   upgrades for verified /images/locations, /images/blog, and /images/health assets.
 * - Always emits explicit width & height attributes to prevent Cumulative Layout Shift.
 * - Uses loading="eager" + fetchpriority="high" ONLY when `priority` (or explicit prop) is set;
 *   defaults to loading="lazy" + decoding="async" for offscreen images.
 * - Renders a clean, non-blocking placeholder background on opaque photos and safely falls
 *   back to /placeholder.svg on error.
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  priority = false,
  loading,
  fetchPriority,
  decoding = 'async',
  className,
  pictureClassName,
  style,
  width,
  height,
  srcSet,
  webpSrcSet,
  avifSrcSet,
  sizes = '(max-width: 768px) 100vw, 50vw',
  placeholderBg,
  disableAutoPicture = false,
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setHasError(false);
    setImageSrc(src);
    setIsLoaded(false);
  }, [src]);

  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [imageSrc]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setIsLoaded(true);
      setImageSrc(FALLBACK_PLACEHOLDER);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Resolve smart intrinsic defaults so callers that omit width/height still get zero CLS
  // with the true aspect ratio (1024x1024 for location/blog/health squares, 1200x800 otherwise).
  const locationMatch = !hasError && !disableAutoPicture ? LOCATION_ASSET_RE.exec(imageSrc) : null;
  const squareLegacyMatch = !hasError && !disableAutoPicture ? SQUARE_LEGACY_RE.exec(imageSrc) : null;

  const resolvedWidth = width ?? (locationMatch || squareLegacyMatch ? 1024 : 1200);
  const resolvedHeight = height ?? (locationMatch || squareLegacyMatch ? 1024 : 800);

  // Derive responsive WebP srcSet for verified directories when caller hasn't overridden it
  let resolvedSrcSet = hasError ? undefined : srcSet;
  let resolvedWebpSrcSet = hasError ? undefined : webpSrcSet;
  const resolvedAvifSrcSet = hasError ? undefined : avifSrcSet;

  if (!hasError && !disableAutoPicture && !resolvedWebpSrcSet && !resolvedSrcSet) {
    if (locationMatch) {
      const [, basePath, ext] = locationMatch;
      const responsiveWebp = `${basePath}-640.webp 640w, ${basePath}.webp 1024w`;
      if (ext.toLowerCase() === 'webp') {
        resolvedSrcSet = responsiveWebp;
      } else {
        resolvedWebpSrcSet = responsiveWebp;
      }
    } else if (squareLegacyMatch) {
      const [, basePath] = squareLegacyMatch;
      resolvedWebpSrcSet = `${basePath}.webp`;
    }
  }

  const effectiveLoading: 'lazy' | 'eager' = loading ?? (priority ? 'eager' : 'lazy');
  const effectiveFetchPriority: 'high' | 'low' | 'auto' | undefined =
    fetchPriority ?? (priority ? 'high' : undefined);

  // Show a soft placeholder background ONLY behind opaque photo formats until decoded
  const isOpaquePhoto =
    !hasError &&
    OPAQUE_PHOTO_RE.test(imageSrc) &&
    !imageSrc.startsWith('/brand/') &&
    !imageSrc.includes('/logo/');
  const resolvedBg =
    placeholderBg === 'none'
      ? undefined
      : !isLoaded && isOpaquePhoto
        ? placeholderBg || 'rgba(15, 23, 42, 0.06)'
        : undefined;

  const mergedStyle: React.CSSProperties | undefined =
    resolvedBg || style
      ? {
          ...(resolvedBg ? { backgroundColor: resolvedBg } : {}),
          ...style,
        }
      : undefined;

  // Use lowercase `fetchpriority` attribute for clean React 18 DOM compatibility (no console warning)
  const fetchPriorityAttr = effectiveFetchPriority
    ? ({ fetchpriority: effectiveFetchPriority } as Record<string, string>)
    : {};

  const imgElement = (
    <img
      ref={imgRef}
      src={imageSrc}
      srcSet={resolvedSrcSet}
      sizes={resolvedSrcSet || resolvedWebpSrcSet || resolvedAvifSrcSet ? sizes : undefined}
      style={mergedStyle}
      alt={alt}
      loading={effectiveLoading}
      {...fetchPriorityAttr}
      width={resolvedWidth}
      height={resolvedHeight}
      className={cn('w-full h-full object-cover transition-opacity duration-300', className)}
      decoding={decoding}
      onLoad={handleLoad}
      onError={handleError}
    />
  );

  if (!hasError && (resolvedAvifSrcSet || resolvedWebpSrcSet)) {
    return (
      <picture style={{ display: 'contents' }} className={pictureClassName}>
        {resolvedAvifSrcSet && (
          <source type="image/avif" srcSet={resolvedAvifSrcSet} sizes={sizes} />
        )}
        {resolvedWebpSrcSet && (
          <source type="image/webp" srcSet={resolvedWebpSrcSet} sizes={sizes} />
        )}
        {imgElement}
      </picture>
    );
  }

  return imgElement;
};

export default ResponsiveImage;
