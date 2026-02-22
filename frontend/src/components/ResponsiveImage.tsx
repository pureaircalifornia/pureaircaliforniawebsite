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
  width,
  height,
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



