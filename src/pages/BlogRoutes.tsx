import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BlogPost from './BlogPost';

// Import blog post components
import ImportanceOfRegularAirDuctCleaning from './blog/importance-of-regular-air-duct-cleaning';
import AirDuctCleaningFAQ from './blog/air-duct-cleaning-faq';
import DryerVentSafetyGuide from './blog/dryer-vent-safety-guide';
import CommercialIndoorAirQualityGuide from './blog/commercial-indoor-air-quality-guide';
import HealthBenefitsAirDuctCleaning from './blog/health-benefits-air-duct-cleaning';

// Blog post content mapping
const BlogRoutes = () => {
  return (
    <Routes>
      <Route path="importance-of-regular-air-duct-cleaning" element={<ImportanceOfRegularAirDuctCleaning />} />
      <Route path="air-duct-cleaning-faq" element={<AirDuctCleaningFAQ />} />
      <Route path="dryer-vent-safety-guide" element={<DryerVentSafetyGuide />} />
      <Route path="commercial-indoor-air-quality-guide" element={<CommercialIndoorAirQualityGuide />} />
      <Route path="health-benefits-air-duct-cleaning" element={<HealthBenefitsAirDuctCleaning />} />
      
      {/* For all other blog posts, use the generic BlogPost component with the slug */}
      <Route path=":slug" element={<BlogPost />} />
    </Routes>
  );
};

export const blogPostComponents = {
  'importance-of-regular-air-duct-cleaning': ImportanceOfRegularAirDuctCleaning,
  'air-duct-cleaning-faq': AirDuctCleaningFAQ,
  'dryer-vent-safety-guide': DryerVentSafetyGuide,
  'commercial-indoor-air-quality-guide': CommercialIndoorAirQualityGuide,
  'health-benefits-air-duct-cleaning': HealthBenefitsAirDuctCleaning,
};

export default BlogRoutes; 