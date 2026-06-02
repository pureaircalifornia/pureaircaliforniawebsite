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

// Lazy load landing pages
const LandingNature = React.lazy(() => import('./pages/LandingNature'));
const LandingDryerSafety = React.lazy(() => import('./pages/LandingDryerSafety'));
const LandingCompetitor = React.lazy(() => import('./pages/LandingCompetitor'));
const LandingCommercial = React.lazy(() => import('./pages/LandingCommercial'));
import ABTestRouter from './components/ABTestRouter';
import StickyServiceButton from './components/StickyServiceButton';
import GoogleAnalytics from './components/GoogleAnalytics';
import ExitIntentPopup from './components/ExitIntentPopup';
import SMSLeadWidget from './components/SMSLeadWidget';
import UrgencyBanner from './components/UrgencyBanner';

// Lazy loaded imports for optimal bundle splitting
const Locations = React.lazy(() => import('./pages/Locations'));
const LosAngeles = React.lazy(() => import('./pages/locations/LosAngeles'));
const LocationDetail = React.lazy(() => import('./pages/LocationDetail'));
const Services = React.lazy(() => import('./pages/Services'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Quote = React.lazy(() => import('./pages/Quote'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const HealthBenefits = React.lazy(() => import('./pages/HealthBenefits'));
const Pricing = React.lazy(() => import('./pages/Pricing'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));
const AirQualityCalculator = React.lazy(() => import('./pages/AirQualityCalculator'));
const Partnerships = React.lazy(() => import('./pages/Partnerships'));
const PropertyManagers = React.lazy(() => import('./pages/PropertyManagers'));
const Feedback = React.lazy(() => import('./pages/Feedback'));

// Lazy load individual service pages
const CommercialAirDuctCleaning = React.lazy(() => import('./pages/services/CommercialAirDuctCleaning'));
const ResidentialAirDuctCleaning = React.lazy(() => import('./pages/services/ResidentialAirDuctCleaning'));
const CommercialDryerVentCleaning = React.lazy(() => import('./pages/services/CommercialDryerVentCleaning'));
const ResidentialDryerVentCleaning = React.lazy(() => import('./pages/services/ResidentialDryerVentCleaning'));
const ResidentialElectrostaticFilter = React.lazy(() => import('./pages/services/ResidentialElectrostaticFilter'));
const CommercialElectrostaticFilter = React.lazy(() => import('./pages/services/CommercialElectrostaticFilter'));
const DryerVentMaintenanceProgram = React.lazy(() => import('./pages/services/DryerVentMaintenanceProgram'));
const HVACSystemCleaning = React.lazy(() => import('./pages/services/HVACSystemCleaning'));

// Lazy load industry pages
const HealthcareFacilities = React.lazy(() => import('./pages/industries/HealthcareFacilities'));
const Hospitality = React.lazy(() => import('./pages/industries/Hospitality'));
const Restaurants = React.lazy(() => import('./pages/industries/Restaurants'));
const Education = React.lazy(() => import('./pages/industries/Education'));
const Retail = React.lazy(() => import('./pages/industries/Retail'));
const Manufacturing = React.lazy(() => import('./pages/industries/Manufacturing'));
const CommercialRealEstate = React.lazy(() => import('./pages/industries/CommercialRealEstate'));

// Lazy load admin pages
const AdminLayout = React.lazy(() => import('./pages/admin').then(m => ({ default: m.AdminLayout })));
const AdminLogin = React.lazy(() => import('./pages/admin').then(m => ({ default: m.AdminLogin })));
const AdminDashboard = React.lazy(() => import('./pages/admin').then(m => ({ default: m.AdminDashboard })));
const LeadScanner = React.lazy(() => import('./pages/admin').then(m => ({ default: m.LeadScanner })));
const Prospects = React.lazy(() => import('./pages/admin').then(m => ({ default: m.Prospects })));
const LeadList = React.lazy(() => import('./pages/admin').then(m => ({ default: m.LeadList })));
const LeadDetail = React.lazy(() => import('./pages/admin').then(m => ({ default: m.LeadDetail })));
const CustomersList = React.lazy(() => import('./pages/admin').then(m => ({ default: m.CustomersList })));
const CustomerDetail = React.lazy(() => import('./pages/admin').then(m => ({ default: m.CustomerDetail })));
const AppointmentsList = React.lazy(() => import('./pages/admin').then(m => ({ default: m.AppointmentsList })));
const AppointmentForm = React.lazy(() => import('./pages/admin').then(m => ({ default: m.AppointmentForm })));
const InvoicesList = React.lazy(() => import('./pages/admin').then(m => ({ default: m.InvoicesList })));
const InvoiceDetail = React.lazy(() => import('./pages/admin').then(m => ({ default: m.InvoiceDetail })));
const Inbox = React.lazy(() => import('./pages/admin').then(m => ({ default: m.Inbox })));
const ReportsDashboard = React.lazy(() => import('./pages/admin').then(m => ({ default: m.ReportsDashboard })));
const Estimates = React.lazy(() => import('./pages/admin').then(m => ({ default: m.Estimates })));
const EstimateDetail = React.lazy(() => import('./pages/admin').then(m => ({ default: m.EstimateDetail })));
const Payments = React.lazy(() => import('./pages/admin').then(m => ({ default: m.Payments })));
const Documents = React.lazy(() => import('./pages/admin').then(m => ({ default: m.Documents })));
const Team = React.lazy(() => import('./pages/admin').then(m => ({ default: m.Team })));
const Settings = React.lazy(() => import('./pages/admin').then(m => ({ default: m.Settings })));
const CustomerForm = React.lazy(() => import('./pages/admin/CustomerForm'));

// Create query client
const queryClient = new QueryClient();

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <div className="relative">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-brand-700 animate-pulse shadow-lg" />
      <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-brand-700 animate-ping opacity-20" />
    </div>
    <p className="mt-4 text-sm font-medium text-gray-500 tracking-wide animate-pulse">Loading Pure Air California...</p>
  </div>
);

type RouteConfig = {
  path: string;
  element: React.ReactNode;
};

const routes: RouteConfig[] = [
  { path: "/", element: <ABTestRouter variantA={<EnhancedLanding />} variantB={<LandingNature />} testName="landing_page_2024" splitRatio={50} /> },
  { path: "/locations", element: <Locations /> },
  // Dedicated Los Angeles page (must come before dynamic :locationSlug)
  { path: "/locations/los-angeles", element: <LosAngeles /> },
  { path: "/locations/:locationSlug", element: <LocationDetail /> },
  { path: "/pricing", element: <Pricing /> },
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
  
  // B2B & Conversion Assets Let
  { path: "/air-quality-calculator", element: <AirQualityCalculator /> },
  { path: "/partners", element: <Partnerships /> },
  { path: "/property-managers", element: <PropertyManagers /> },

  // Tokenized customer feedback / review-routing (dynamic, noindex — do NOT add to prerender)
  { path: "/feedback/:token", element: <Feedback /> },
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

// Main website layout (NavBar is rendered by individual pages that need it)
const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen pb-24 md:pb-0 bg-gray-50 flex flex-col">
    <ScrollToTopOnRouteChange />
    <ScrollToTop />
    <UrgencyBanner />
    <main className="flex-grow">
      {children}
    </main>
    <StickyServiceButton />
    <SMSLeadWidget />
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
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Admin Login (no layout) */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Admin Portal Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="lead-scanner" element={<LeadScanner />} />
                  <Route path="prospects" element={<Prospects />} />
                  <Route path="leads" element={<LeadList />} />
                  <Route path="leads/:id" element={<LeadDetail />} />
                  <Route path="customers" element={<CustomersList />} />
                  <Route path="customers/new" element={<CustomerForm />} />
                  <Route path="customers/:id" element={<CustomerDetail />} />
                  <Route path="inbox" element={<Inbox />} />
                  <Route path="appointments" element={<AppointmentsList />} />
                  <Route path="appointments/new" element={<AppointmentForm />} />
                  <Route path="invoices" element={<InvoicesList />} />
                  <Route path="invoices/:id" element={<InvoiceDetail />} />
                  <Route path="reports" element={<ReportsDashboard />} />
                  <Route path="estimates" element={<Estimates />} />
                  <Route path="estimates/:id" element={<EstimateDetail />} />
                  <Route path="payments" element={<Payments />} />
                  <Route path="documents" element={<Documents />} />
                  <Route path="team" element={<Team />} />
                  <Route path="settings" element={<Settings />} />
                </Route>

                {/* Main Website Routes */}
                {routes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<MainLayout>{route.element}</MainLayout>}
                  />
                ))}

                {/* Catch-all 404 */}
                <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
