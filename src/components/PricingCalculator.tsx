import React, { useState, useEffect } from 'react';
import { Building2, Home, Calculator, DollarSign } from 'lucide-react';

const PricingCalculator = () => {
  const [propertyType, setPropertyType] = useState('residential');
  const [squareFootage, setSquareFootage] = useState(1500);
  const [numberOfVents, setNumberOfVents] = useState(10);
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  useEffect(() => {
    let basePrice = 0;
    if (propertyType === 'residential') {
      basePrice = 300;
      basePrice += Math.floor(squareFootage / 500) * 50;
      basePrice += numberOfVents * 15;
    } else if (propertyType === 'commercial') {
      basePrice = 500;
      basePrice += Math.floor(squareFootage / 500) * 75;
      basePrice += numberOfVents * 25;
    } else if (propertyType === 'high-end') {
      basePrice = 800;
      basePrice += Math.floor(squareFootage / 500) * 100;
      basePrice += numberOfVents * 35;
    }
    setEstimatedPrice(basePrice);
  }, [propertyType, squareFootage, numberOfVents]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Pricing Calculator</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Get an instant estimate for your air duct cleaning service. Our prices are competitive
          and reflect the premium quality of our services.
        </p>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Get an Estimate</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="high-end">High-End Residential</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Square Footage</label>
              <input
                type="number"
                value={squareFootage}
                onChange={(e) => setSquareFootage(Number(e.target.value))}
                className="w-full p-2 border rounded-md"
                min="500"
                step="500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Vents</label>
              <input
                type="number"
                value={numberOfVents}
                onChange={(e) => setNumberOfVents(Number(e.target.value))}
                className="w-full p-2 border rounded-md"
                min="1"
              />
            </div>
            <div className="pt-4">
              <p className="text-lg font-semibold">Estimated Price: ${estimatedPrice}</p>
              <p className="text-sm text-gray-500 mt-1">* Final price may vary based on inspection</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCalculator; 