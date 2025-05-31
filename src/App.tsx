import React, { Suspense, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import SEOProvider from './components/SEOProvider';
import { seoConfig } from './utils/seo/seoConfig';
import NavBar from './components/NavBar';
import ScrollToTop from './components/ScrollToTop';
import EnhancedLanding from './pages/EnhancedLanding';
import Locations from './pages/Locations';
import LocationDetail from './pages/LocationDetail.tsx'; // Import LocationDetail component
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import IndustryPage from './pages/IndustryPage.tsx';

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
  element: React.ReactNode;
};

const routes: RouteConfig[] = [
  { path: "/", element: <EnhancedLanding /> },
  { path: "/locations", element: <Locations /> },
  { path: "/locations/:locationSlug", element: <LocationDetail /> },
  { path: "/services", element: <Services /> },
  // Service detail pages
  { path: "/services/residential-air-duct-cleaning", element: <Services service="residential-air-duct-cleaning" /> },
  { path: "/services/commercial-air-duct-cleaning", element: <Services service="commercial-air-duct-cleaning" /> },
  { path: "/services/residential-dryer-vent-cleaning", element: <Services service="residential-dryer-vent-cleaning" /> },
  { path: "/services/commercial-dryer-vent-cleaning", element: <Services service="commercial-dryer-vent-cleaning" /> },
  { path: "/services/dryer-vent-maintenance-program", element: <Services service="dryer-vent-maintenance-program" /> },
  { path: "/services/residential-electrostatic-filter", element: <Services service="residential-electrostatic-filter" /> },
  { path: "/services/commercial-electrostatic-filter", element: <Services service="commercial-electrostatic-filter" /> },
  // Industry pages
  { path: "/industries/healthcare", element: <IndustryPage industry="healthcare" /> },
  { path: "/industries/hospitality", element: <IndustryPage industry="hospitality" /> },
  { path: "/industries/restaurants", element: <IndustryPage industry="restaurants" /> },
  { path: "/industries/education", element: <IndustryPage industry="education" /> },
  { path: "/industries/retail", element: <IndustryPage industry="retail" /> },
  { path: "/industries/manufacturing", element: <IndustryPage industry="manufacturing" /> },
  // Other pages
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/blog", element: <Blog /> },
  { path: "/blog/:slug", element: <BlogPost /> },
  { path: "/404", element: <NotFound /> },
  // Catch all other routes and redirect to home or show 404
  { path: "*", element: <Navigate to="/" replace /> }
];

// Component to handle scroll restoration
const ScrollToTopOnRouteChange = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <SEOProvider>
              <div className="min-h-screen bg-gray-50">
                <NavBar />
                <ScrollToTopOnRouteChange />
                <ScrollToTop />
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    {routes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
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
