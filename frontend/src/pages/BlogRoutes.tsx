
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BlogPost from './BlogPost';
import { blogPostComponents } from './blog-components';

// Import blog post components
import ImportanceOfRegularAirDuctCleaning from './blog/importance-of-regular-air-duct-cleaning';
import AirDuctCleaningFAQ from './blog/air-duct-cleaning-faq';
import DryerVentSafetyGuide from './blog/dryer-vent-safety-guide';
import CommercialIndoorAirQualityGuide from './blog/commercial-indoor-air-quality-guide';
import HealthBenefitsAirDuctCleaning from './blog/health-benefits-air-duct-cleaning';
import CleanAirDuctsAllergyRelief from './blog/clean-air-ducts-allergy-relief';
import SignsAirDuctsNeedCleaning from './blog/signs-air-ducts-need-cleaning';

// Blog routes component
const BlogRoutes = () => {
  return (
    <Routes>
      <Route path="importance-of-regular-air-duct-cleaning" element={<ImportanceOfRegularAirDuctCleaning />} />
      <Route path="air-duct-cleaning-faq" element={<AirDuctCleaningFAQ />} />
      <Route path="dryer-vent-safety-guide" element={<DryerVentSafetyGuide />} />
      <Route path="commercial-indoor-air-quality-guide" element={<CommercialIndoorAirQualityGuide />} />
      <Route path="health-benefits-air-duct-cleaning" element={<HealthBenefitsAirDuctCleaning />} />
      <Route path="clean-air-ducts-allergy-relief" element={<CleanAirDuctsAllergyRelief />} />
      <Route path="signs-air-ducts-need-cleaning" element={<SignsAirDuctsNeedCleaning />} />
      
      {/* For all other blog posts, use the generic BlogPost component with the slug */}
      <Route path=":slug" element={<BlogPost />} />
    </Routes>
  );
};

// Export the blog components mapping
export const blogPostComponents = {
  'importance-of-regular-air-duct-cleaning': ImportanceOfRegularAirDuctCleaning,
  'air-duct-cleaning-faq': AirDuctCleaningFAQ,
  'dryer-vent-safety-guide': DryerVentSafetyGuide,
  'commercial-indoor-air-quality-guide': CommercialIndoorAirQualityGuide,
  'health-benefits-air-duct-cleaning': HealthBenefitsAirDuctCleaning,
  'clean-air-ducts-allergy-relief': CleanAirDuctsAllergyRelief,
  'signs-air-ducts-need-cleaning': SignsAirDuctsNeedCleaning
};

export default BlogRoutes;
