import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  loading?: 'lazy' | 'eager';
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
}

/**
 * ResponsiveImage component that provides optimized images with WebP support and responsive variants
 * Uses vite-imagetools for automatic optimization and format generation
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  loading = 'lazy',
  className,
  width,
  height,
  sizes = '(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px'
}) => {
  // Allow direct passthrough for SVGs and placeholder.svg without imagetools
  const isSvg = /\.svg$/i.test(src);
  if (isSvg) {
    return (
      <img
        src={src}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
        className={cn('object-cover', className)}
        decoding="async"
      />
    );
  }

  // Extract base name without extension for imagetools-driven formats
  const baseName = src.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  
  return (
    <picture>
      {/* WebP source for modern browsers */}
      <source 
        srcSet={`${baseName}?w=640&format=webp 640w, ${baseName}?w=1024&format=webp 1024w, ${baseName}?w=1920&format=webp 1920w`}
        type="image/webp"
        sizes={sizes}
      />
      {/* JPG fallback for older browsers */}
      <source 
        srcSet={`${baseName}?w=640&format=jpg 640w, ${baseName}?w=1024&format=jpg 1024w, ${baseName}?w=1920&format=jpg 1920w`}
        type="image/jpeg"
        sizes={sizes}
      />
      {/* Fallback img element */}
      <img 
        src={`${baseName}?w=1920&format=jpg`}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
        className={cn('object-cover', className)}
        decoding="async"
      />
    </picture>
  );
};

export default ResponsiveImage;
