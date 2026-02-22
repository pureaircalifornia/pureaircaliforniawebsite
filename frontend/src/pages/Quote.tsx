import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { HelmetProvider } from 'react-helmet-async';
import PricingEstimator from '@/components/PricingEstimator';
import SEOProvider from '@/components/SEOProvider';

const QuotePage = () => {
  const pageTitle = "Get a Free Air Duct Cleaning Quote | Los Angeles | Pure Air California";
  const pageDescription = "Request your free air duct cleaning quote in Los Angeles. No obligation, same-day estimates available. Instant pricing! Call (213) 792-4145 or submit online.";

  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col">
        <SEOProvider
          title={pageTitle}
          description={pageDescription}
          keywords={["free air duct cleaning quote Los Angeles", "air duct cleaning estimate LA", "instant quote duct cleaning", "how much does air duct cleaning cost Los Angeles"]}
          path="/quote"
        />

        <NavBar alwaysOpaque />

        <main className="flex-grow bg-gray-50 py-16">
          <div className="container mx-auto px-4">

            {/* Urgent Call Banner */}
            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8 rounded-r-lg shadow-sm">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-green-800">Don't want to wait?</h2>
                  <p className="text-green-700">Get an instant guaranteed price over the phone right now.</p>
                </div>
                <a
                  href="tel:2137924145"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  Call (213) 792-4145
                </a>
              </div>
            </div>

            <PricingEstimator />
          </div>
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default QuotePage;