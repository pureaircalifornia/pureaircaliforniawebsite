import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
}

// Use SVG placeholder which is guaranteed to work
const FALLBACK_PLACEHOLDER = '/placeholder.svg';

/**
 * ResponsiveImage component that provides optimized image display.
 * Includes robust error handling for broken images.
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  loading = 'lazy',
  fetchPriority,
  className,
  // Default intrinsic dimensions so the browser can reserve space and avoid a
  // layout shift. Most callers never passed these, which left 69 pages emitting
  // <img> with no width/height at all — a direct Cumulative Layout Shift cost.
  // The values only supply an aspect-ratio hint: the component's own
  // `w-full h-full object-cover` classes still control rendered size, so a
  // caller that knows the real dimensions should pass them and override these.
  width = 1200,
  height = 800,
  sizes = "(max-width: 768px) 100vw, 50vw",
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Reset state when src prop changes
  useEffect(() => {
    setHasError(false);
    setImageSrc(src);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(FALLBACK_PLACEHOLDER);
    }
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading={loading}
      {...(fetchPriority ? { fetchpriority: fetchPriority } as any : {})}
      width={width}
      height={height}
      sizes={sizes}
      className={cn('w-full h-full object-cover transition-opacity duration-300', className)}
      decoding={loading === 'eager' ? 'sync' : 'async'}
      onError={handleError}
    />
  );
};

export default ResponsiveImage;



