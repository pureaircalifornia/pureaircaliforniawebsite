import React from 'react';
import PricingEstimator from './PricingEstimator';

const HomeQuoteForm = () => {
  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <PricingEstimator />
        </div>
      </div>
    </section>
  );
};

export default HomeQuoteForm;
