import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSlide {
  image: string;
  alt: string;
  overlayGradient?: string;
}

interface HeroSliderProps {
  slides?: HeroSlide[];
  interval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  children?: React.ReactNode;
  overlayClassName?: string;
  theme?: 'default' | 'nature';
}

const defaultSlides: HeroSlide[] = [
  {
    image: '/images/coastal-v1/losAngeles-1440.webp',
    alt: 'Los Angeles cityscape across Pure Air California service areas',
  },
  {
    image: '/images/pac/duct-cleaning-interior-v2.webp',
    alt: 'Rotary brush cleaning inside a metal air duct',
  },
  {
    image: '/images/pac/duct-interior-clean-v2.webp',
    alt: 'Clean interior of a galvanized sheet-metal air duct',
  },
];

const natureSlides: HeroSlide[] = [
  {
    image: '/images/breath/living-forest-1440.webp',
    alt: 'Sunlit mountain forest and meadow beneath open California skies',
  },
  {
    image: '/images/breath/coastal-breath-1440.webp',
    alt: 'Fresh California coastline waves and clear sky',
  },
  {
    image: '/images/breath/cloud-sea-1440.webp',
    alt: 'Soft evening light across a sea of clouds',
  },
];

const HeroSlider: React.FC<HeroSliderProps> = ({
  slides,
  interval = 6000,
  showControls = true,
  showIndicators = true,
  children,
  overlayClassName,
  theme = 'default',
}) => {
  const activeSlides = slides || (theme === 'nature' ? natureSlides : defaultSlides);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  }, [activeSlides.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  }, [activeSlides.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(goToNext, interval);
    return () => window.clearInterval(timer);
  }, [isAutoPlaying, interval, goToNext]);

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-slate-900"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {activeSlides.map((slide, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={slide.image}
            className="absolute inset-0 w-full h-full transition-opacity duration-700"
            style={{ opacity: isActive ? 1 : 0, zIndex: isActive ? 1 : 0 }}
            aria-hidden={!isActive}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
              loading={index === 0 || isActive ? 'eager' : 'lazy'}
              decoding="async"
              {...{ fetchpriority: index === 0 ? 'high' : 'low' }}
              width={1440}
              height={960}
            />
            <div
              className={`absolute inset-0 ${
                theme === 'nature'
                  ? 'bg-gradient-to-r from-[#082e4d]/75 via-slate-900/45 to-transparent'
                  : 'bg-gradient-to-r from-[#082e4d]/85 via-slate-900/55 to-transparent'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#082e4d]/80 via-transparent to-slate-900/30" />
          </div>
        );
      })}

      {overlayClassName && <div className={overlayClassName} />}
      {children}

      {showControls && (
        <>
          <button
            type="button"
            onClick={goToPrev}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" aria-hidden="true" />
          </button>
        </>
      )}

      {showIndicators && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {activeSlides.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="py-2"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : undefined}
            >
              <div
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-12 bg-white' : 'w-6 bg-white/40 hover:bg-white/60'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSlider;
