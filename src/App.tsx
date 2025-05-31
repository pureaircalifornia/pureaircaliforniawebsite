import React, { Suspense, lazy, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import SEOProvider from './components/SEOProvider';
import { seoConfig } from './utils/seo/seoConfig';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';

// Create query client
const queryClient = new QueryClient();

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
);

type RouteConfig = {
  path: string;
  element: JSX.Element;
};

const routes: RouteConfig[] = [
  { path: "/", element: <Suspense fallback={<LoadingFallback />}>
    <>{lazy(() => import('./pages/EnhancedLanding'))}</>
  </Suspense> },
  { path: "/locations", element: <Suspense fallback={<LoadingFallback />}>
    <>{lazy(() => import('./pages/Locations'))}</>
  </Suspense> },
  { path: "/services", element: <Suspense fallback={<LoadingFallback />}>
    <>{lazy(() => import('./pages/Services'))}</>
  </Suspense> },
  { path: "/about", element: <Suspense fallback={<LoadingFallback />}>
    <>{lazy(() => import('./pages/About'))}</>
  </Suspense> },
  { path: "/contact", element: <Suspense fallback={<LoadingFallback />}>
    <>{lazy(() => import('./pages/Contact'))}</>
  </Suspense> },
  { path: "/blog", element: <Suspense fallback={<LoadingFallback />}>
    <>{lazy(() => import('./pages/Blog'))}</>
  </Suspense> },
  { path: "/blog/:slug", element: <Suspense fallback={<LoadingFallback />}>
    <>{lazy(() => import('./pages/BlogPost'))}</>
  </Suspense> },
  { path: "/404", element: <Suspense fallback={<LoadingFallback />}>
    <>{lazy(() => import('./pages/NotFound'))}</>
  </Suspense> },
  { path: "*", element: <Suspense fallback={<LoadingFallback />}>
    <>{lazy(() => import('./pages/NotFound'))}</>
  </Suspense> }
];

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <SEOProvider>
              <div className="min-h-screen bg-gray-50">
                <Navigation />
                <ScrollToTop />
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    {routes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={<Suspense fallback={<LoadingFallback />}>{route.element}</Suspense>}
                      />
                    ))}
                  </Routes>
                </Suspense>
              </div>
            </SEOProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
