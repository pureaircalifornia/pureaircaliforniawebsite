import { usePageMotion } from '@/hooks/usePageMotion';

import React, { ReactNode } from 'react';
import { motion, Variants, HTMLMotionProps, useReducedMotion } from 'framer-motion';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import * as animations from '@/lib/animation';

export interface ScrollRevealProps extends Omit<HTMLMotionProps<"div">, "animate" | "initial" | "exit" | "variants"> {
  children: ReactNode;
  animation?: 'fadeIn' | 'fadeInUp' | 'slideInLeft' | 'slideInRight' | 'scaleUp' | 'float' | 'pulse';
  delay?: number;
  duration?: number;
  threshold?: number;
  margin?: string;
  once?: boolean;
  className?: string;
}

/**
 * ScrollReveal component that creates premium scroll-triggered animations
 */
export function ScrollReveal({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration,
  threshold = 0.2,
  margin = "0px",
  once = true,
  className,
  ...props
}: ScrollRevealProps) {
  const reducedMotion = useReducedMotion();
  const { paused } = usePageMotion();
  const showImmediately = paused || reducedMotion || (typeof window !== "undefined" && window.__PRERENDERING__);
  const [ref, isInView] = useScrollAnimation<HTMLDivElement>({
    threshold,
    rootMargin: margin,
    once
  });

  const getAnimationVariant = (): Variants => {
    const animationKey = animation as keyof typeof animations;
    const selectedAnimation = animations[animationKey] as Variants;
    
    if (!selectedAnimation) {
      return animations.fadeInUp;
    }
    
    // Apply custom duration if provided
    if (duration && typeof selectedAnimation.visible === 'object') {
      return {
        ...selectedAnimation,
        visible: {
          ...selectedAnimation.visible,
          transition: {
            ...selectedAnimation.visible.transition,
            duration
          }
        }
      };
    }
    
    return selectedAnimation;
  };

  return (
    <motion.div
      ref={ref}
      initial={showImmediately ? false : "hidden"}
      animate={showImmediately ? { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0, repeat: 0 } } : isInView ? "visible" : "hidden"}
      exit={showImmediately ? undefined : "exit"}
      variants={getAnimationVariant()}
      className={cn(className)}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * A container component that staggers the animations of its children
 */
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  ...props
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
} & Omit<HTMLMotionProps<"div">, "animate" | "initial" | "variants">) {
  const reducedMotion = useReducedMotion();
  const { paused } = usePageMotion();
  const showImmediately = paused || reducedMotion || (typeof window !== "undefined" && window.__PRERENDERING__);
  const [ref, isInView] = useScrollAnimation<HTMLDivElement>();
  
  const staggerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay
      }
    }
  };
  
  return (
    <motion.div
      ref={ref}
      initial={showImmediately ? false : "hidden"}
      animate={showImmediately ? { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0, repeat: 0 } } : isInView ? "visible" : "hidden"}
      variants={staggerVariants}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;

