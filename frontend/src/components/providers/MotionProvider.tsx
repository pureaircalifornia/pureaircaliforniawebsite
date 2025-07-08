import React, { ReactNode } from 'react';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { pageTransition } from '@/lib/animation';

interface MotionProviderProps {
  children: ReactNode;
}

/**
 * MotionProvider wraps the app with Framer Motion capabilities
 * and handles page transitions
 */
export function MotionProvider({ children }: MotionProviderProps) {
  const location = useLocation();
  
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait">
        <m.div
          key={location.pathname}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pageTransition}
          className="min-h-screen flex flex-col"
        >
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
}

export default MotionProvider; 