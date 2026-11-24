import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import RelatedLinks from '@/components/RelatedLinks';

import PricingEstimator from '@/components/PricingEstimator';
import SEOProvider from '@/components/SEOProvider';

const QuotePage = () => {
  // Title already contains the site name, so SEOProvider leaves it alone rather
  // than appending the brand again and pushing it past the ~60 char SERP cutoff.
  const pageTitle = "Free Air Duct Cleaning Quote | Pure Air California";
  const pageDescription = "Get a free air duct cleaning quote in Los Angeles. No obligation, same-day estimates, upfront pricing. Call (213) 792-4145 or request your quote online.";

  return (
    
      <div className="min-h-screen flex flex-col">
        <SEOProvider
          title={pageTitle}
          description={pageDescription}
          keywords={["free air duct cleaning quote Los Angeles", "air duct cleaning estimate LA", "instant quote duct cleaning", "how much does air duct cleaning cost Los Angeles"]}
          path="/quote"
         isLocalBusiness />

        <NavBar alwaysOpaque />

        <main className="flex-grow bg-gray-50 py-16">
          <div className="container mx-auto px-4">

            {/* Page heading. This page previously shipped with no <h1> at all, so
                Google had no primary topic signal for the highest-intent URL on
                the site. */}
            <header className="max-w-3xl mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Get a Free Air Duct Cleaning Quote in Los Angeles
              </h1>
              <p className="text-lg text-gray-600">
                Tell us about your home or building and get an upfront price for air duct
                and dryer vent cleaning — no obligation and no surprise add-ons. Pure Air
                California is NADCA-certified, and we have cleaned ducts across Los Angeles
                for more than 40 years. Most quotes are returned the same day, and same-day
                service is often available across LA County.
              </p>
            </header>

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

            {/* Objection handling and expectation setting. This is the highest-intent
                page on the site and was the thinnest at 322 words. */}
            <div className="max-w-3xl mt-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">What happens after you request a quote</h2>
              <ol className="space-y-5 mb-12">
                {[
                  ['We call you back', 'Usually the same day. We ask about your property size, how many systems it has, and when the ducts were last cleaned — enough to give you a realistic range before anyone visits.'],
                  ['We confirm the price on site', 'A technician inspects the system and confirms the price before any work starts. If what we find changes the scope, you hear it then, not on the invoice.'],
                  ['You approve, then we work', 'Nothing proceeds without your say-so. The price we agree is the price you pay.'],
                  ['You see the results', 'We photograph the ductwork before and after, so you can see what came out rather than taking our word for it.'],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center" aria-hidden="true">{i + 1}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{t}</h3>
                      <p className="text-gray-600">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Common questions before booking</h2>
              <dl className="space-y-6">
                <div>
                  <dt className="text-lg font-semibold text-gray-900 mb-1">Is the estimate really free?</dt>
                  <dd className="text-gray-600">Yes, and there is no obligation attached to it. You can take the quote and do nothing with it.</dd>
                </div>
                <div>
                  <dt className="text-lg font-semibold text-gray-900 mb-1">How long does the work take?</dt>
                  <dd className="text-gray-600">For most Los Angeles homes, two to four hours. Larger homes, multiple systems and commercial properties take longer, and we tell you the expected window when you schedule.</dd>
                </div>
                <div>
                  <dt className="text-lg font-semibold text-gray-900 mb-1">Do I need to be home?</dt>
                  <dd className="text-gray-600">Someone needs to provide access and approve the work before it starts. After that you are free to carry on with your day.</dd>
                </div>
                <div>
                  <dt className="text-lg font-semibold text-gray-900 mb-1">Will the price change once you arrive?</dt>
                  <dd className="text-gray-600">Not without your agreement. If the inspection turns up something that changes the scope — an extra system, severe contamination — we explain it and requote before doing anything.</dd>
                </div>
                <div>
                  <dt className="text-lg font-semibold text-gray-900 mb-1">Do you serve my area?</dt>
                  <dd className="text-gray-600">We cover Los Angeles County and parts of Ventura County. If you are unsure, call and ask — the answer is usually yes.</dd>
                </div>
                <div>
                  <dt className="text-lg font-semibold text-gray-900 mb-1">Can you quote a commercial property?</dt>
                  <dd className="text-gray-600">Yes. Commercial jobs are scoped on site and scheduled around your operating hours, including evenings and weekends.</dd>
                </div>
              </dl>
            </div>
          </div>
        </main>

        <RelatedLinks heading="Learn more before you book" links={[{ label: 'Air duct cleaning cost in Los Angeles', path: '/pricing' }, { label: 'Residential air duct cleaning', path: '/services/residential-air-duct-cleaning' }, { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' }, { label: 'Commercial case studies', path: '/case-studies' }]} />

        <Footer />
      </div>
    
  );
};

export default QuotePage;