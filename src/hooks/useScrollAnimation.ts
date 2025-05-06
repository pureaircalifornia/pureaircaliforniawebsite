import { useEffect, useRef, MutableRefObject } from 'react';
import { useInView } from 'framer-motion';

type ScrollAnimationOptions = {
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
  onEnter?: () => void;
  onExit?: () => void;
};

/**
 * Premium scroll animation hook for creating high-end animations
 * tied to scroll position and element visibility
 */
export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
): [MutableRefObject<T | null>, boolean] {
  const {
    threshold = 0.2,
    once = true,
    rootMargin = "0px",
    onEnter,
    onExit
  } = options;
  
  const ref = useRef<T | null>(null);
  const isInView = useInView(ref, {
    amount: threshold,
    once,
    margin: rootMargin
  });
  
  useEffect(() => {
    if (isInView && onEnter) {
      onEnter();
    } else if (!isInView && onExit) {
      onExit();
    }
  }, [isInView, onEnter, onExit]);
  
  return [ref, isInView];
}

export default useScrollAnimation; 