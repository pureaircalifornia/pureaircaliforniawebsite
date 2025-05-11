
import React, { useEffect, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import EnhancedLanding from "./pages/EnhancedLanding";
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
import EnhancedContact from "./pages/EnhancedContact";
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
  { path: "/", element: <EnhancedLanding /> },
  { path: "/locations", element: <Locations /> },
  
  // Location pages
  { path: "/locations/beverly-hills", element: <BeverlyHills /> },
  { path: "/locations/malibu", element: <Malibu /> },
  { path: "/locations/century-city", element: <CenturyCity /> },
  { path: "/locations/hollywood", element: <Hollywood /> },
  { path: "/locations/downtown-los-angeles", element: <DowntownLA /> },
  { path: "/locations/ventura", element: <Ventura /> },
  
  // Import all other location pages dynamically
  { path: "/locations/beverly-glen", element: React.lazy(() => import('./pages/locations/BeverlyGlen')) },
  { path: "/locations/brentwood", element: React.lazy(() => import('./pages/locations/Brentwood')) },
  { path: "/locations/burbank", element: React.lazy(() => import('./pages/locations/Burbank')) },
  { path: "/locations/calabasas", element: React.lazy(() => import('./pages/locations/Calabasas')) },
  { path: "/locations/central-la", element: React.lazy(() => import('./pages/locations/CentralLA')) },
  { path: "/locations/chatsworth", element: React.lazy(() => import('./pages/locations/Chatsworth')) },
  { path: "/locations/conga-park", element: React.lazy(() => import('./pages/locations/CongaPark')) },
  { path: "/locations/culver-city", element: React.lazy(() => import('./pages/locations/CulverCity')) },
  { path: "/locations/deer-lake-highlands", element: React.lazy(() => import('./pages/locations/DeerLakeHighlands')) },
  { path: "/locations/encino", element: React.lazy(() => import('./pages/locations/Encino')) },
  { path: "/locations/encino-village", element: React.lazy(() => import('./pages/locations/EncinoVillage')) },
  { path: "/locations/fairfax", element: React.lazy(() => import('./pages/locations/Fairfax')) },
  { path: "/locations/glendale", element: React.lazy(() => import('./pages/locations/Glendale')) },
  { path: "/locations/granada-hills", element: React.lazy(() => import('./pages/locations/GranadaHills')) },
  { path: "/locations/hidden-hills", element: React.lazy(() => import('./pages/locations/HiddenHills')) },
  { path: "/locations/koreatown", element: React.lazy(() => import('./pages/locations/Koreatown')) },
  { path: "/locations/lake-balboa", element: React.lazy(() => import('./pages/locations/LakeBalboa')) },
  { path: "/locations/larchmont", element: React.lazy(() => import('./pages/locations/Larchmont')) },
  { path: "/locations/laurel-canyon", element: React.lazy(() => import('./pages/locations/LaurelCanyon')) },
  { path: "/locations/los-feliz", element: React.lazy(() => import('./pages/locations/LosFeliz')) },
  { path: "/locations/magnolia-park", element: React.lazy(() => import('./pages/locations/MagnoliaPark')) },
  { path: "/locations/mid-wilshire", element: React.lazy(() => import('./pages/locations/MidWilshire')) },
  { path: "/locations/mission-hills", element: React.lazy(() => import('./pages/locations/MissionHills')) },
  { path: "/locations/north-hollywood", element: React.lazy(() => import('./pages/locations/NorthHollywood')) },
  { path: "/locations/north-of-montana", element: React.lazy(() => import('./pages/locations/NorthOfMontana')) },
  { path: "/locations/northridge", element: React.lazy(() => import('./pages/locations/Northridge')) },
  { path: "/locations/pacific-palisades", element: React.lazy(() => import('./pages/locations/PacificPalisades')) },
  { path: "/locations/panorama-city", element: React.lazy(() => import('./pages/locations/PanoramaCity')) },
  { path: "/locations/pasadena", element: React.lazy(() => import('./pages/locations/Pasadena')) },
  { path: "/locations/porter-ranch", element: React.lazy(() => import('./pages/locations/PorterRanch')) },
  { path: "/locations/reseda", element: React.lazy(() => import('./pages/locations/Reseda')) },
  { path: "/locations/sawtelle", element: React.lazy(() => import('./pages/locations/Sawtelle')) },
  { path: "/locations/sepulveda-basin", element: React.lazy(() => import('./pages/locations/SepulvedaBasin')) },
  { path: "/locations/sherman-oaks", element: React.lazy(() => import('./pages/locations/ShermanOaks')) },
  { path: "/locations/sherwood-forest", element: React.lazy(() => import('./pages/locations/SherwoodForest')) },
  { path: "/locations/studio-city", element: React.lazy(() => import('./pages/locations/StudioCity')) },
  { path: "/locations/sun-valley", element: React.lazy(() => import('./pages/locations/SunValley')) },
  { path: "/locations/tarzana", element: React.lazy(() => import('./pages/locations/Tarzana')) },
  { path: "/locations/toluca-lake", element: React.lazy(() => import('./pages/locations/TolucaLake')) },
  { path: "/locations/valley-glen", element: React.lazy(() => import('./pages/locations/ValleyGlen')) },
  { path: "/locations/valley-village", element: React.lazy(() => import('./pages/locations/ValleyVillage')) },
  { path: "/locations/van-nuys", element: React.lazy(() => import('./pages/locations/VanNuys')) },
  { path: "/locations/west-hollywood", element: React.lazy(() => import('./pages/locations/WestHollywood')) },
  { path: "/locations/west-los-angeles", element: React.lazy(() => import('./pages/locations/WestLosAngeles')) },
  { path: "/locations/westwood", element: React.lazy(() => import('./pages/locations/Westwood')) },
  { path: "/locations/winnetka", element: React.lazy(() => import('./pages/locations/Winnetka')) },
  { path: "/locations/woodland-hills", element: React.lazy(() => import('./pages/locations/WoodlandHills')) },
  
  // Services routes
  { path: "/services", element: <Services /> },
  { path: "/services/residential-air-duct-cleaning", element: <ResidentialAirDuctCleaning /> },
  { path: "/services/residential-dryer-vent-cleaning", element: <ResidentialDryerVentCleaning /> },
  { path: "/services/residential-electrostatic-filter", element: <ResidentialElectrostaticFilter /> },
  { path: "/services/commercial-air-duct-cleaning", element: <CommercialAirDuctCleaning /> },
  { path: "/services/commercial-dryer-vent-cleaning", element: <CommercialDryerVentCleaning /> },
  { path: "/services/commercial-electrostatic-filter", element: <CommercialElectrostaticFilter /> },
  { path: "/services/dryer-vent-maintenance-program", element: <DryerVentMaintenanceProgram /> },
  
  // Other main pages
  { path: "/about", element: <About /> },
  { path: "/quote", element: <Quote /> },
  { path: "/contact", element: <EnhancedContact /> },
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

// Loading component for Suspense fallback
const LoadingPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600 mx-auto mb-4"></div>
      <p className="text-lg font-medium text-gray-700">Loading...</p>
    </div>
  </div>
);

// Properly nest components to avoid hooks outside of React component context
const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            {routes.map((route) => (
              <Route 
                key={route.path} 
                path={route.path} 
                element={
                  React.isValidElement(route.element) 
                    ? route.element
                    : <Suspense fallback={<LoadingPage />}><route.element /></Suspense>
                }
              />
            ))}
          </Routes>
        </Suspense>
        <StickyServiceButton />
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
