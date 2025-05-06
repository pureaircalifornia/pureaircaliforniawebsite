
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/index";
import NotFound from "./pages/NotFound";
import BeverlyHills from "./pages/locations/BeverlyHills";
import Malibu from "./pages/locations/Malibu";
import CenturyCity from "./pages/locations/CenturyCity";
import Hollywood from "./pages/locations/Hollywood";
import DowntownLA from "./pages/locations/DowntownLA";
import Ventura from "./pages/locations/Ventura";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import HealthBenefits from "./pages/HealthBenefits";
import Locations from "./pages/Locations";
import Services from "./pages/Services";
import About from "./pages/About";
import Quote from "./pages/Quote";
import Contact from "./pages/Contact";
import ResidentialAirDuctCleaning from "./pages/services/ResidentialAirDuctCleaning";
import ResidentialDryerVentCleaning from "./pages/services/ResidentialDryerVentCleaning";
import ResidentialElectrostaticFilter from "./pages/services/ResidentialElectrostaticFilter";
import CommercialAirDuctCleaning from "./pages/services/CommercialAirDuctCleaning";
import CommercialDryerVentCleaning from "./pages/services/CommercialDryerVentCleaning";
import CommercialElectrostaticFilter from "./pages/services/CommercialElectrostaticFilter";
import DryerVentMaintenanceProgram from "./pages/services/DryerVentMaintenanceProgram";
import HealthcareFacilities from "./pages/industries/HealthcareFacilities";
import Hospitality from "./pages/industries/Hospitality";
import Restaurants from "./pages/industries/Restaurants";
import Education from "./pages/industries/Education";
import Retail from "./pages/industries/Retail";
import Manufacturing from "./pages/industries/Manufacturing";
import { useEffect } from 'react';
import StickyServiceButton from '@/components/StickyServiceButton';

// Import blog components
import AirDuctCleaningFAQ from "./pages/blog/air-duct-cleaning-faq";
import DryerVentSafetyGuide from "./pages/blog/dryer-vent-safety-guide";
import CommercialIndoorAirQualityGuide from "./pages/blog/commercial-indoor-air-quality-guide";
import HealthBenefitsAirDuctCleaning from "./pages/blog/health-benefits-air-duct-cleaning";
import ImportanceOfRegularAirDuctCleaning from "./pages/blog/importance-of-regular-air-duct-cleaning";
import CleanAirDuctsAllergyRelief from "./pages/blog/clean-air-ducts-allergy-relief";
import SignsAirDuctsNeedCleaning from "./pages/blog/signs-air-ducts-need-cleaning";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Route configuration for cleaner app structure
const routes = [
  { path: "/", element: <Index /> },
  { path: "/locations", element: <Locations /> },
  { path: "/locations/beverly-hills", element: <BeverlyHills /> },
  { path: "/locations/malibu", element: <Malibu /> },
  { path: "/locations/century-city", element: <CenturyCity /> },
  { path: "/locations/hollywood", element: <Hollywood /> },
  { path: "/locations/downtown-los-angeles", element: <DowntownLA /> },
  { path: "/locations/ventura", element: <Ventura /> },
  { path: "/services", element: <Services /> },
  { path: "/services/residential-air-duct-cleaning", element: <ResidentialAirDuctCleaning /> },
  { path: "/services/residential-dryer-vent-cleaning", element: <ResidentialDryerVentCleaning /> },
  { path: "/services/residential-electrostatic-filter", element: <ResidentialElectrostaticFilter /> },
  { path: "/services/commercial-air-duct-cleaning", element: <CommercialAirDuctCleaning /> },
  { path: "/services/commercial-dryer-vent-cleaning", element: <CommercialDryerVentCleaning /> },
  { path: "/services/commercial-electrostatic-filter", element: <CommercialElectrostaticFilter /> },
  { path: "/services/dryer-vent-maintenance-program", element: <DryerVentMaintenanceProgram /> },
  { path: "/about", element: <About /> },
  { path: "/quote", element: <Quote /> },
  { path: "/contact", element: <Contact /> },
  { path: "/blog", element: <Blog /> },
  
  // Blog post specific routes
  { path: "/blog/air-duct-cleaning-faq", element: <AirDuctCleaningFAQ /> },
  { path: "/blog/dryer-vent-safety-guide", element: <DryerVentSafetyGuide /> },
  { path: "/blog/commercial-indoor-air-quality-guide", element: <CommercialIndoorAirQualityGuide /> },
  { path: "/blog/health-benefits-air-duct-cleaning", element: <HealthBenefitsAirDuctCleaning /> },
  { path: "/blog/importance-of-regular-air-duct-cleaning", element: <ImportanceOfRegularAirDuctCleaning /> },
  { path: "/blog/clean-air-ducts-allergy-relief", element: <CleanAirDuctsAllergyRelief /> },
  { path: "/blog/signs-air-ducts-need-cleaning", element: <SignsAirDuctsNeedCleaning /> },
  
  // Catch-all for other blog posts using the dynamic component
  { path: "/blog/:slug", element: <BlogPost /> },
  
  { path: "/health-benefits", element: <HealthBenefits /> },
  { path: "/industries/healthcare", element: <HealthcareFacilities /> },
  { path: "/industries/hospitality", element: <Hospitality /> },
  { path: "/industries/restaurants", element: <Restaurants /> },
  { path: "/industries/education", element: <Education /> },
  { path: "/industries/retail", element: <Retail /> },
  { path: "/industries/manufacturing", element: <Manufacturing /> },
  { path: "*", element: <NotFound /> }
];

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScrollToTop />
        <Toaster />
        <Sonner />
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
        <StickyServiceButton />
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
