import React, { Suspense, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { TooltipProvider } from '@radix-ui/react-tooltip';



import ScrollToTop from './components/ScrollToTop';
import BrandedLoading from './components/BrandedLoading';
import ContactDock from './components/ContactDock';
import PageMotionProvider from './components/PageMotionProvider';
import CinematicLanding from './pages/CinematicLanding';
import './cinematic.css';
import './pac-refinement.css';
import './breath.css';
import './stillness.css';
import './air-interiors.css';
import './business-pages.css';
import './coastal-refinement.css';
import './home-cinema.css';
import './brand-palette.css';
import './visual-home.css';
import './visual-navigation.css';
import './visual-service-story.css';
import './visual-breathing.css';
import './visual-actions.css';
import './booking.css';




// Lazy load landing pages

const LandingDryerSafety = React.lazy(() => import('./pages/LandingDryerSafety'));
const LandingCompetitor = React.lazy(() => import('./pages/LandingCompetitor'));
const LandingCommercial = React.lazy(() => import('./pages/LandingCommercial'));


import GoogleAnalytics from './components/GoogleAnalytics';
import PrivacyChoices from './components/PrivacyChoices';
import { installInteractionTracking } from './utils/interactionTracking';
import './privacy.css';




// Lazy loaded imports for optimal bundle splitting
const Locations = React.lazy(() => import('./pages/Locations'));
const LosAngeles = React.lazy(() => import('./pages/locations/LosAngeles'));
const LocationDetail = React.lazy(() => import('./pages/LocationDetail'));
const Services = React.lazy(() => import('./pages/Services'));
const HomeServices = React.lazy(() => import('./pages/HomeServices'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Quote = React.lazy(() => import('./pages/Quote'));
const BookingThankYou = React.lazy(() => import('./pages/BookingThankYou'));
const FreeInspection = React.lazy(() => import('./pages/FreeInspection'));
const Unsubscribe = React.lazy(() => import('./pages/Unsubscribe'));
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
const Industries = React.lazy(() => import('./pages/Industries'));
const CaseStudies = React.lazy(() => import('./pages/CaseStudies'));
const CaseStudyDetail = React.lazy(() => import('./pages/CaseStudyDetail'));
const ProjectStories = React.lazy(() => import('./pages/ProjectStories'));

// Lazy load individual service pages
const CommercialHoaAirDuctDryerVentCleaning = React.lazy(() => import('./pages/services/CommercialHoaAirDuctDryerVentCleaning'));
const WildfireSmokeHillsideAirDuctCleaning = React.lazy(() => import('./pages/services/WildfireSmokeHillsideAirDuctCleaning'));
const CommercialAirDuctCleaning = React.lazy(() => import('./pages/services/CommercialAirDuctCleaning'));
const ResidentialAirDuctCleaning = React.lazy(() => import('./pages/services/ResidentialAirDuctCleaning'));
const CommercialDryerVentCleaning = React.lazy(() => import('./pages/services/CommercialDryerVentCleaning'));
const ResidentialDryerVentCleaning = React.lazy(() => import('./pages/services/ResidentialDryerVentCleaning'));
const ResidentialElectrostaticFilter = React.lazy(() => import('./pages/services/ResidentialElectrostaticFilter'));
const CommercialElectrostaticFilter = React.lazy(() => import('./pages/services/CommercialElectrostaticFilter'));
const DryerVentMaintenanceProgram = React.lazy(() => import('./pages/services/DryerVentMaintenanceProgram'));
const HVACSystemCleaning = React.lazy(() => import('./pages/services/HVACSystemCleaning'));
const AirDuctSanitizing = React.lazy(() => import('./pages/services/AirDuctSanitizing'));
const LaundromatDryerVentCleaning = React.lazy(() => import('./pages/services/LaundromatDryerVentCleaning'));

// Lazy load industry pages
const HealthcareFacilities = React.lazy(() => import('./pages/industries/HealthcareFacilities'));
const Hospitality = React.lazy(() => import('./pages/industries/Hospitality'));
const Restaurants = React.lazy(() => import('./pages/industries/Restaurants'));
const Education = React.lazy(() => import('./pages/industries/Education'));
const Retail = React.lazy(() => import('./pages/industries/Retail'));
const Manufacturing = React.lazy(() => import('./pages/industries/Manufacturing'));
const CommercialRealEstate = React.lazy(() => import('./pages/industries/CommercialRealEstate'));
const BusinessLocation = React.lazy(() => import('./pages/BusinessLocation'));

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
const LoadingFallback = BrandedLoading;

type RouteConfig = {
  path: string;
  element: React.ReactNode;
};

const routes: RouteConfig[] = [
  { path: "/", element: <CinematicLanding /> },
  { path: "/locations", element: <Locations /> },
  // Dedicated Los Angeles page (must come before dynamic :locationSlug)
  { path: "/locations/los-angeles", element: <LosAngeles /> },
  { path: "/locations/:locationSlug", element: <LocationDetail /> },
  { path: "/pricing", element: <Pricing /> },
  { path: "/booking-thank-you", element: <BookingThankYou /> },
  // Outreach email destinations (noindex; prerendered so Apache serves them)
  { path: "/free-inspection", element: <FreeInspection /> },
  { path: "/unsubscribe", element: <Unsubscribe /> },
  { path: "/services", element: <Services /> },
  { path: "/home-services", element: <HomeServices /> },
  // Individual service pages
  { path: "/services/commercial-hoa-air-duct-dryer-vent-cleaning-los-angeles", element: <CommercialHoaAirDuctDryerVentCleaning /> },
  { path: "/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles", element: <WildfireSmokeHillsideAirDuctCleaning /> },
  { path: "/services/commercial-air-duct-cleaning", element: <CommercialAirDuctCleaning /> },
  { path: "/services/residential-dryer-vent-cleaning", element: <ResidentialDryerVentCleaning /> },
  { path: "/services/residential-electrostatic-filter", element: <ResidentialElectrostaticFilter /> },
  { path: "/services/commercial-electrostatic-filter", element: <CommercialElectrostaticFilter /> },
  { path: "/services/dryer-vent-maintenance-program", element: <DryerVentMaintenanceProgram /> },
  { path: "/services/hvac-system-cleaning", element: <HVACSystemCleaning /> },
  { path: "/services/air-duct-sanitizing", element: <AirDuctSanitizing /> },
  { path: "/services/laundromat-dryer-vent-cleaning", element: <LaundromatDryerVentCleaning /> },
  // Legacy service routes
  { path: "/services/residential-air-duct-cleaning", element: <ResidentialAirDuctCleaning /> },
  { path: "/services/commercial-dryer-vent-cleaning", element: <CommercialDryerVentCleaning /> },
  { path: "/services/electrostatic-filter-program", element: <Navigate to="/services/residential-electrostatic-filter" replace /> },
  // Industry pages
  { path: "/industries", element: <Industries /> },
  { path: "/industries/:businessSlug/:citySlug", element: <BusinessLocation /> },
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
  { path: "/case-studies", element: <CaseStudies /> },
  { path: "/case-studies/:slug", element: <CaseStudyDetail /> },
  { path: "/project-stories", element: <ProjectStories /> },
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

// One listener covers links and buttons, including nested icons and SPA content.
const PhoneClickTracking = () => {
  useEffect(() => installInteractionTracking(), []);
  return null;
};

// Main website layout (NavBar is rendered by individual pages that need it)
const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <PageMotionProvider>
  <div className="pac-site min-h-screen flex flex-col">
    <div id="main-content" tabIndex={-1} className="flex-grow">
      {children}
    </div>
    <ContactDock />
  </div>
  </PageMotionProvider>
);

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <PrivacyChoices />
            <PhoneClickTracking />
            <ScrollToTop />
            <Suspense fallback={<LoadingFallback />}>
              {/* Commit measurement with the loaded route, never its loading placeholder. */}
              <GoogleAnalytics />
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




