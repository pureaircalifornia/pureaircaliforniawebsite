import React, { useState } from 'react';
import { Building2, Home, Calculator, DollarSign } from 'lucide-react';

const PricingCalculator = () => {
  const [calculatorType, setCalculatorType] = useState<'residential' | 'commercial'>('residential');
  const [residentialData, setResidentialData] = useState({
    squareFootage: '',
    numberOfVents: '',
    systemAge: '',
    includesDryerVent: false
  });
  const [commercialData, setCommercialData] = useState({
    squareFootage: '',
    numberOfUnits: '',
    systemType: '',
    includesNegativeAir: false
  });

  const calculateResidentialPrice = () => {
    // Base price for residential
    let basePrice = 0;
    
    // Square footage pricing
    if (residentialData.squareFootage) {
      const sqft = parseInt(residentialData.squareFootage);
      if (sqft <= 2000) basePrice += 299;
      else if (sqft <= 3000) basePrice += 399;
      else if (sqft <= 4000) basePrice += 499;
      else basePrice += 599;
    }

    // Additional vents pricing
    if (residentialData.numberOfVents) {
      const vents = parseInt(residentialData.numberOfVents);
      if (vents > 10) basePrice += (vents - 10) * 10;
    }

    // System age adjustment
    if (residentialData.systemAge) {
      const age = parseInt(residentialData.systemAge);
      if (age > 10) basePrice += 50;
    }

    // Dryer vent add-on
    if (residentialData.includesDryerVent) {
      basePrice += 99;
    }

    return basePrice;
  };

  const calculateCommercialPrice = () => {
    // Base price for commercial
    let basePrice = 0;
    
    // Square footage pricing
    if (commercialData.squareFootage) {
      const sqft = parseInt(commercialData.squareFootage);
      if (sqft <= 5000) basePrice += 999;
      else if (sqft <= 10000) basePrice += 1499;
      else if (sqft <= 20000) basePrice += 2499;
      else basePrice += 3999;
    }

    // Number of units adjustment
    if (commercialData.numberOfUnits) {
      const units = parseInt(commercialData.numberOfUnits);
      if (units > 1) basePrice += (units - 1) * 200;
    }

    // System type adjustment
    if (commercialData.systemType === 'complex') {
      basePrice += 500;
    }

    // Negative air system add-on
    if (commercialData.includesNegativeAir) {
      basePrice += 299;
    }

    return basePrice;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Pricing Calculator</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Get an instant estimate for your air duct cleaning service. Our prices are competitive
          and reflect the premium quality of our services.
        </p>

        {/* Calculator Type Selector */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            className={`flex items-center gap-2 px-6 py-3 rounded-full ${
              calculatorType === 'residential'
                ? 'bg-brand-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setCalculatorType('residential')}
          >
            <Home className="w-5 h-5" />
            Residential
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-3 rounded-full ${
              calculatorType === 'commercial'
                ? 'bg-brand-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setCalculatorType('commercial')}
          >
            <Building2 className="w-5 h-5" />
            Commercial
          </button>
        </div>

        {/* Calculator Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          {calculatorType === 'residential' ? (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Square Footage</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={residentialData.squareFootage}
                  onChange={(e) =>
                    setResidentialData({ ...residentialData, squareFootage: e.target.value })
                  }
                  placeholder="Enter square footage"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Number of Vents</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={residentialData.numberOfVents}
                  onChange={(e) =>
                    setResidentialData({ ...residentialData, numberOfVents: e.target.value })
                  }
                  placeholder="Enter number of vents"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">System Age (years)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={residentialData.systemAge}
                  onChange={(e) =>
                    setResidentialData({ ...residentialData, systemAge: e.target.value })
                  }
                  placeholder="Enter system age"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="dryerVent"
                  checked={residentialData.includesDryerVent}
                  onChange={(e) =>
                    setResidentialData({
                      ...residentialData,
                      includesDryerVent: e.target.checked
                    })
                  }
                />
                <label htmlFor="dryerVent">Include Dryer Vent Cleaning</label>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Square Footage</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={commercialData.squareFootage}
                  onChange={(e) =>
                    setCommercialData({ ...commercialData, squareFootage: e.target.value })
                  }
                  placeholder="Enter square footage"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Number of HVAC Units</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={commercialData.numberOfUnits}
                  onChange={(e) =>
                    setCommercialData({ ...commercialData, numberOfUnits: e.target.value })
                  }
                  placeholder="Enter number of units"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">System Type</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg"
                  value={commercialData.systemType}
                  onChange={(e) =>
                    setCommercialData({ ...commercialData, systemType: e.target.value })
                  }
                >
                  <option value="">Select system type</option>
                  <option value="standard">Standard</option>
                  <option value="complex">Complex</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="negativeAir"
                  checked={commercialData.includesNegativeAir}
                  onChange={(e) =>
                    setCommercialData({
                      ...commercialData,
                      includesNegativeAir: e.target.checked
                    })
                  }
                />
                <label htmlFor="negativeAir">Include HEPA Negative Air System</label>
              </div>
            </div>
          )}

          {/* Price Display */}
          <div className="mt-8 p-6 bg-brand-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Estimated Price</h3>
                <p className="text-gray-600">Based on your inputs</p>
              </div>
              <div className="text-3xl font-bold text-brand-600">
                ${calculatorType === 'residential' ? calculateResidentialPrice() : calculateCommercialPrice()}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              This is an estimate. For an exact quote, contact our team.
            </p>
            <a
              href="tel:2137924145"
              className="inline-flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-full hover:bg-brand-700 transition-colors"
            >
              <Calculator className="w-5 h-5" />
              Get Exact Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator; 