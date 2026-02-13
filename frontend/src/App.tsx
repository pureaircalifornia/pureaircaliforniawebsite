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
import LandingNature from './pages/LandingNature';
import LandingDryerSafety from './pages/LandingDryerSafety';
import LandingCompetitor from './pages/LandingCompetitor';
import LandingCommercial from './pages/LandingCommercial';
import ABTestRouter from './components/ABTestRouter';
import Locations from './pages/Locations';
import LocationDetail from './pages/LocationDetail';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Quote from './pages/Quote';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';
import HealthBenefits from './pages/HealthBenefits';
import StickyServiceButton from './components/StickyServiceButton';
import GoogleAnalytics from './components/GoogleAnalytics';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ExitIntentPopup from './components/ExitIntentPopup';

// Import individual service pages
import CommercialAirDuctCleaning from './pages/services/CommercialAirDuctCleaning';
import ResidentialAirDuctCleaning from './pages/services/ResidentialAirDuctCleaning';
import CommercialDryerVentCleaning from './pages/services/CommercialDryerVentCleaning';
import ResidentialDryerVentCleaning from './pages/services/ResidentialDryerVentCleaning';
import ResidentialElectrostaticFilter from './pages/services/ResidentialElectrostaticFilter';
import CommercialElectrostaticFilter from './pages/services/CommercialElectrostaticFilter';
import DryerVentMaintenanceProgram from './pages/services/DryerVentMaintenanceProgram';
import HVACSystemCleaning from './pages/services/HVACSystemCleaning';

// Import industry pages
import HealthcareFacilities from './pages/industries/HealthcareFacilities';
import Hospitality from './pages/industries/Hospitality';
import Restaurants from './pages/industries/Restaurants';
import Education from './pages/industries/Education';
import Retail from './pages/industries/Retail';
import Manufacturing from './pages/industries/Manufacturing';
import CommercialRealEstate from './pages/industries/CommercialRealEstate';

// Import admin pages
import {
  AdminLayout,
  AdminLogin,
  AdminDashboard,
  LeadList,
  LeadDetail,
  CustomersList,
  CustomerDetail,
  AppointmentsList,
  InvoicesList,
  ReportsDashboard,
} from './pages/admin';

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
  { path: "/", element: <ABTestRouter variantA={<EnhancedLanding />} variantB={<LandingNature />} testName="landing_page_2024" splitRatio={50} /> },
  { path: "/locations", element: <Locations /> },
  { path: "/locations/:locationSlug", element: <LocationDetail /> },
  { path: "/services", element: <Services /> },
  // Individual service pages
  { path: "/services/commercial-air-duct-cleaning", element: <CommercialAirDuctCleaning /> },
  { path: "/services/residential-dryer-vent-cleaning", element: <ResidentialDryerVentCleaning /> },
  { path: "/services/residential-electrostatic-filter", element: <ResidentialElectrostaticFilter /> },
  { path: "/services/commercial-electrostatic-filter", element: <CommercialElectrostaticFilter /> },
  { path: "/services/dryer-vent-maintenance-program", element: <DryerVentMaintenanceProgram /> },
  { path: "/services/hvac-system-cleaning", element: <HVACSystemCleaning /> },
  // Legacy service routes
  { path: "/services/residential-air-duct-cleaning", element: <ResidentialAirDuctCleaning /> },
  { path: "/services/commercial-dryer-vent-cleaning", element: <CommercialDryerVentCleaning /> },
  { path: "/services/electrostatic-filter-program", element: <Navigate to="/services/residential-electrostatic-filter" replace /> },
  // Industry pages
  { path: "/industries/healthcare", element: <HealthcareFacilities /> },
  { path: "/industries/hospitality", element: <Hospitality /> },
  { path: "/industries/restaurants", element: <Restaurants /> },
  { path: "/industries/education", element: <Education /> },
  { path: "/industries/retail", element: <Retail /> },
  { path: "/industries/manufacturing", element: <Manufacturing /> },
  { path: "/industries/commercial-real-estate", element: <CommercialRealEstate /> },
  // Health benefits page
  { path: "/health-benefits", element: <HealthBenefits /> },
  // Other pages
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/quote", element: <Quote /> },
  { path: "/blog", element: <Blog /> },
  { path: "/blog/:slug", element: <BlogPost /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/terms-of-service", element: <TermsOfService /> },
  { path: "/404", element: <NotFound /> },
  // Targeted Ad Landing Pages
  { path: "/dryer-safety", element: <LandingDryerSafety /> },
  { path: "/compare", element: <LandingCompetitor /> },
  { path: "/commercial-services", element: <LandingCommercial /> },
];

// Component to handle scroll restoration
const ScrollToTopOnRouteChange = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Global listener for phone clicks
    const handlePhoneClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.href.startsWith('tel:')) {
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'phone_call_click',
            link_url: target.href,
            link_text: target.innerText
          });
        }
      }
    };

    document.addEventListener('click', handlePhoneClick);
    return () => document.removeEventListener('click', handlePhoneClick);
  }, [pathname]);

  return null;
};

// Main website layout with NavBar
const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-50">
    <NavBar />
    <ScrollToTopOnRouteChange />
    <ScrollToTop />
    {children}
    <StickyServiceButton />
    <ExitIntentPopup />
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <GoogleAnalytics />
            <SEOProvider>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  {/* Admin Login (no layout) */}
                  <Route path="/admin/login" element={<AdminLogin />} />

                  {/* Admin Portal Routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="leads" element={<LeadList />} />
                    <Route path="leads/:id" element={<LeadDetail />} />
                    <Route path="customers" element={<CustomersList />} />
                    <Route path="customers/:id" element={<CustomerDetail />} />
                    <Route path="appointments" element={<AppointmentsList />} />
                    <Route path="invoices" element={<InvoicesList />} />
                    <Route path="reports" element={<ReportsDashboard />} />
                    {/* Placeholder routes for other admin sections */}
                    <Route path="estimates" element={<div className="p-6"><h1 className="text-2xl font-bold">Estimates</h1><p className="text-gray-600 mt-2">Coming soon...</p></div>} />
                    <Route path="payments" element={<div className="p-6"><h1 className="text-2xl font-bold">Payments</h1><p className="text-gray-600 mt-2">Coming soon...</p></div>} />
                    <Route path="documents" element={<div className="p-6"><h1 className="text-2xl font-bold">Documents</h1><p className="text-gray-600 mt-2">Coming soon...</p></div>} />
                    <Route path="team" element={<div className="p-6"><h1 className="text-2xl font-bold">Team</h1><p className="text-gray-600 mt-2">Coming soon...</p></div>} />
                    <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p className="text-gray-600 mt-2">Coming soon...</p></div>} />
                  </Route>

                  {/* Main Website Routes */}
                  {routes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={<MainLayout>{route.element}</MainLayout>}
                    />
                  ))}

                  {/* Catch-all redirect */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </SEOProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
