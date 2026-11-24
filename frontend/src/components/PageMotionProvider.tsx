import { ReactNode } from 'react';
import { PageMotionContext } from '@/hooks/usePageMotion';

export default function PageMotionProvider({ children }: { children: ReactNode }) {
  return <PageMotionContext.Provider value={{ enabled: false, paused: true, reduced: true, toggle: () => {} }}>{children}</PageMotionContext.Provider>;
}

