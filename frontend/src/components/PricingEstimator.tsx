import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Home, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

type ServiceType = 'residential-air-duct' | 'commercial-air-duct' | 'dryer-vent' | 'electrostatic-filter' | '';

const PricingEstimator = () => {
  const [service, setService] = useState<ServiceType>('');
  const [squareFootage, setSquareFootage] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const services = [
    { id: 'residential-air-duct', label: 'Residential Air Duct Cleaning', icon: Home },
    { id: 'commercial-air-duct', label: 'Commercial Air Duct Cleaning', icon: Building2 },
    { id: 'dryer-vent', label: 'Dryer Vent Cleaning', icon: Home },
    { id: 'electrostatic-filter', label: 'Electrostatic Filter Service', icon: Home },
  ];

  const calculatePrice = (serviceType: ServiceType, sqft: number): number => {
    // Consistent pricing logic matching EnhancedQuoteForm.tsx
    switch (serviceType) {
      case 'residential-air-duct':
        return 299 + (sqft > 2000 ? (sqft - 2000) * 0.05 : 0);
      case 'commercial-air-duct':
        return 499 + (sqft > 3000 ? (sqft - 3000) * 0.08 : 0);
      case 'dryer-vent':
        return 149;
      case 'electrostatic-filter':
        return 249;
      default:
        return 0;
    }
  };

  const handleEstimate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!service) {
      setError('Please select a service type.');
      return;
    }

    const sqft = parseInt(squareFootage) || 0;
    if (sqft < 100) {
      setError('Please enter a valid square footage (minimum 100).');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate brief loading for UX
    setTimeout(() => {
      const price = calculatePrice(service, sqft);
      setEstimatedPrice(Math.round(price * 100) / 100);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 border rounded-lg shadow-lg bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Instant Price Estimator</h2>
      <form onSubmit={handleEstimate}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Service Type:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.id}
                  className={`border rounded-md p-3 cursor-pointer transition-all ${service === s.id
                      ? 'border-brand-600 bg-brand-50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300'
                    }`}
                  onClick={() => setService(s.id as ServiceType)}
                >
                  <div className="flex items-center">
                    <Icon className="mr-2 h-5 w-5 text-brand-600" />
                    <span className="text-gray-700 text-sm">{s.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="squareFootage" className="block text-sm font-medium text-gray-700 mb-1">
            Approximate Square Footage:
          </label>
          <Input
            id="squareFootage"
            type="number"
            value={squareFootage}
            onChange={(e) => setSquareFootage(e.target.value)}
            placeholder="e.g., 2000"
            min="100"
            required
            className="w-full"
          />
        </div>

        <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700" disabled={isLoading}>
          {isLoading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Calculating...</>
          ) : (
            'Get My Estimate'
          )}
        </Button>
      </form>

      {error && <div className="mt-4 text-red-500 text-center text-sm">{error}</div>}

      {estimatedPrice !== null && (
        <div className="mt-8 p-6 bg-brand-50 rounded-lg text-center border border-brand-100">
          <h3 className="text-xl font-semibold mb-2">Your Estimated Price:</h3>
          <p className="text-4xl font-bold text-brand-600">${estimatedPrice.toFixed(2)}</p>
          <p className="text-sm text-gray-600 mt-2">
            For {services.find(s => s.id === service)?.label} ({parseInt(squareFootage).toLocaleString()} sq. ft.)
          </p>
          <p className="text-xs text-gray-500 mt-4">
            This is an estimate only. Final pricing may vary based on inspection.
          </p>
          <div className="mt-6">
            <Button asChild className="bg-brand-600 hover:bg-brand-700">
              <Link to="/quote">Get Detailed Quote →</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingEstimator;