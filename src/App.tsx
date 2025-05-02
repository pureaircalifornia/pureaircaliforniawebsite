
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
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
import ResidentialAirDuctCleaning from "./pages/services/ResidentialAirDuctCleaning";
import ResidentialDryerVentCleaning from "./pages/services/ResidentialDryerVentCleaning";
import ResidentialElectrostaticFilter from "./pages/services/ResidentialElectrostaticFilter";
import CommercialAirDuctCleaning from "./pages/services/CommercialAirDuctCleaning";
import CommercialDryerVentCleaning from "./pages/services/CommercialDryerVentCleaning";
import CommercialElectrostaticFilter from "./pages/services/CommercialElectrostaticFilter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/beverly-hills" element={<BeverlyHills />} />
          <Route path="/locations/malibu" element={<Malibu />} />
          <Route path="/locations/century-city" element={<CenturyCity />} />
          <Route path="/locations/hollywood" element={<Hollywood />} />
          <Route path="/locations/downtown-los-angeles" element={<DowntownLA />} />
          <Route path="/locations/ventura" element={<Ventura />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/residential-air-duct-cleaning" element={<ResidentialAirDuctCleaning />} />
          <Route path="/services/residential-dryer-vent-cleaning" element={<ResidentialDryerVentCleaning />} />
          <Route path="/services/residential-electrostatic-filter" element={<ResidentialElectrostaticFilter />} />
          <Route path="/services/commercial-air-duct-cleaning" element={<CommercialAirDuctCleaning />} />
          <Route path="/services/commercial-dryer-vent-cleaning" element={<CommercialDryerVentCleaning />} />
          <Route path="/services/commercial-electrostatic-filter" element={<CommercialElectrostaticFilter />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/health-benefits" element={<HealthBenefits />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
