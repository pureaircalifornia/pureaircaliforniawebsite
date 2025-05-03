import React from 'react';
import QuoteForm from '@/components/QuoteForm';
import { Shield, Clock, CheckCircle } from 'lucide-react';

const Quote = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get Your Free Quote
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete the form below and we'll provide you with a detailed quote for your air duct cleaning needs.
          </p>
        </div>

        {/* Quote Form */}
        <div className="max-w-4xl mx-auto">
          <QuoteForm />
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-brand-600" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-brand-600" />
              <span>24/7 Emergency Service</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-brand-600" />
              <span>100% Satisfaction Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
