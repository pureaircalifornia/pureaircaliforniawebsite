import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Slide configuration
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

// Default slides with high-quality images
const defaultSlides: HeroSlide[] = [
    {
        image: '/images/hero/hvac-technicians.jpg',
        alt: 'Professional HVAC cleaning technician team',
    },
    {
        image: '/images/hero/hvac-3d-render.jpg',
        alt: 'Advanced ventilation system technology',
    },
    {
        image: '/images/hero/hvac-closeup-1.jpg',
        alt: 'Detailed view of clean air duct system',
    },
    {
        image: '/images/hero/hero-foggy-mountains.jpg',
        alt: 'Fresh air standard we aim for',
    },
];

// Nature-themed slides
const natureSlides: HeroSlide[] = [
    {
        image: '/images/hero/hero-foggy-mountains.jpg',
        alt: 'Fresh misty mountain air - Pure Air California',
    },
    {
        image: '/images/hero/hero-river-forest.jpg',
        alt: 'Crystal clear river and forest air',
    },
    {
        image: '/images/hero/hero-mountain-landscape.jpg',
        alt: 'Expansive mountain landscape with clean air',
    },
    {
        image: '/images/hero/hero-misty-trees.jpg',
        alt: 'Misty forest trees representing fresh indoor air',
    },
    {
        image: '/images/hero/hero-coastal.jpg',
        alt: 'Fresh coastal breeze and clean air',
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
    const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

    const goToNext = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, [activeSlides.length]);

    const goToPrev = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
    }, [activeSlides.length]);

    const goToSlide = useCallback((index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    }, [currentIndex]);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;
        const timer = setInterval(goToNext, interval);
        return () => clearInterval(timer);
    }, [isAutoPlaying, interval, goToNext]);

    // Pause auto-play on hover
    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    // Preload next image
    useEffect(() => {
        const nextIndex = (currentIndex + 1) % activeSlides.length;
        const img = new Image();
        img.src = activeSlides[nextIndex].image;
    }, [currentIndex, activeSlides]);

    // Parallax Wipe Variants
    const slideVariants = {
        enter: (direction: number) => ({
            clipPath: direction > 0
                ? 'inset(0 0 0 100%)' // Enter from right (wipes left)
                : 'inset(0 100% 0 0)', // Enter from left (wipes right)
            scale: 1.2,
            filter: 'brightness(0.5)',
            zIndex: 1
        }),
        center: {
            clipPath: 'inset(0 0 0 0)',
            scale: 1,
            filter: 'brightness(1)',
            zIndex: 2,
            transition: {
                clipPath: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }, // Custom bezier for premium feel
                scale: { duration: 10, ease: "linear" }, // Subtle zoom
                filter: { duration: 1.2, ease: "easeOut" }
            }
        },
        exit: (direction: number) => ({
            scale: 1, // Keep scale slightly distinct
            filter: 'brightness(0.8)',
            zIndex: 0,
            transition: {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1]
            }
        })
    };

    return (
        <div
            className="absolute inset-0 overflow-hidden bg-slate-900"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 w-full h-full"
                >
                    <img
                        src={activeSlides[currentIndex].image}
                        alt={activeSlides[currentIndex].alt}
                        className="w-full h-full object-cover"
                        // @ts-ignore - React doesn't fully support fetchpriority yet in types
                        fetchpriority="high"
                        loading="eager"
                    />

                    {/* Integrated Overlay */}
                    <div className={`absolute inset-0 ${theme === 'nature'
                        ? 'bg-gradient-to-r from-emerald-900/60 via-slate-900/40 to-transparent'
                        : 'bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent'
                        }`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/30" />
                </motion.div>
            </AnimatePresence>

            {/* Premium Atmospheric Effects */}
            {theme === 'nature' ? (
                <>
                    <motion.div
                        className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-100/10 via-transparent to-transparent opacity-50 pointer-events-none"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 5, repeat: Infinity }}
                    />
                </>
            ) : (
                <div className="absolute inset-0 bg-[url('/images/texture-noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
            )}

            {/* Custom Overlay Content (passed as children) */}
            {overlayClassName && <div className={overlayClassName}></div>}

            {/* The actual text content is rendered by the parent, but we handle the background/slider here */}
            {children}

            {/* Navigation Controls */}
            {showControls && (
                <>
                    <button
                        onClick={goToPrev}
                        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all duration-300 group hover:scale-110"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all duration-300 group hover:scale-110"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </>
            )}

            {/* Slide Indicators */}
            {showIndicators && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                    {activeSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className="group relative py-2"
                            aria-label={`Go to slide ${index + 1}`}
                        >
                            <div className={`h-1 rounded-full transition-all duration-500 ${index === currentIndex
                                ? 'w-12 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]'
                                : 'w-6 bg-white/30 group-hover:bg-white/50'
                                }`} />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HeroSlider;
