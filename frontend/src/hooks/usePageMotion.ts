import { createContext, useContext } from 'react';

export const PageMotionContext = createContext({ enabled: false, paused: false, reduced: false, toggle: () => {} });
export const usePageMotion = () => useContext(PageMotionContext);
