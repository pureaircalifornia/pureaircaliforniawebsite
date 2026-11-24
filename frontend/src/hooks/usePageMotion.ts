import { createContext, useContext } from 'react';

export const PageMotionContext = createContext({ enabled: false, paused: true, reduced: true, toggle: () => {} });
export const usePageMotion = () => useContext(PageMotionContext);
