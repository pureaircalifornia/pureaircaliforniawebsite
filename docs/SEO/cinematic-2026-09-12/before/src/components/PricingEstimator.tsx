import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Home, Building2, User, Mail, Phone, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { submitFormWithBackend } from '@/utils/api';

type ServiceType = 'residential-air-duct' | 'commercial-air-duct' | 'dryer-vent' | 'electrostatic-filter' | '';

const PricingEstimator = () => {
  const [service, setService] = useState<ServiceType | ''>('');
  const [squareFootage, setSquareFootage] = useState('');
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '' });
  const [stepTwoInfo, setStepTwoInfo] = useState({ address: '', preferredDate: '' });
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isStepTwoSubmitted, setIsStepTwoSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStepTwoLoading, setIsStepTwoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const services = [
    { id: 'commercial-air-duct', label: 'Commercial Air Duct Cleaning', icon: Building2 },
    { id: 'residential-air-duct', label: 'Residential Air Duct Cleaning', icon: Home },
    { id: 'dryer-vent', label: 'Dryer Vent Cleaning', icon: Home },
    { id: 'electrostatic-filter', label: 'Electrostatic Filter Service', icon: Home },
  ];

  const calculatePrice = (serviceType: ServiceType, sqft: number): number => {
    // Consistent pricing logic matching EnhancedQuoteForm.tsx
    switch (serviceType) {
      case 'residential-air-duct':
        return Math.max(299, sqft - 500);
      case 'commercial-air-duct':
        return Math.max(499, (sqft - 500) * 1.5);
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

    if (!contactInfo.name || !contactInfo.email || !contactInfo.phone) {
      setError('Please provide your name, email, and phone number.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const price = calculatePrice(service as ServiceType, sqft);
    const formattedPrice = Math.round(price * 100) / 100;

    // Hit the backend + FormSubmit
    await submitFormWithBackend({
      name: contactInfo.name,
      email: contactInfo.email,
      phone: contactInfo.phone,
      service: services.find(s => s.id === service)?.label || 'Unknown',
      square_footage: squareFootage,
      estimated_price: formattedPrice,
      source: 'quote_form',
      message: `User specifically requested an instant estimate for ${squareFootage} sqft.`
    });

    setEstimatedPrice(formattedPrice);
    setIsLoading(false);
  };

  const handleStepTwoSubmit = async () => {
    if (!stepTwoInfo.address || !stepTwoInfo.preferredDate) {
      setError('Please provide your service address and preferred date.');
      return;
    }

    setIsStepTwoLoading(true);
    setError(null);

    await submitFormWithBackend({
      name: contactInfo.name,
      email: contactInfo.email,
      phone: contactInfo.phone,
      service: services.find(s => s.id === service)?.label || 'Unknown',
      square_footage: squareFootage,
      estimated_price: estimatedPrice || 0,
      address: stepTwoInfo.address,
      preferred_date: stepTwoInfo.preferredDate,
      source: 'quote_form',
      message: `[STEP 2: BOOKING] Lead has completed the funnel and is ready to schedule! They saw the estimate of $${estimatedPrice}.`
    });

    setIsStepTwoLoading(false);
    setIsStepTwoSubmitted(true);
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

        <div className="mb-6">
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

        {/* Lead Capture Fields */}
        <div className="space-y-4 mb-8 pt-4 border-t border-gray-100">
          <h3 className="text-md font-semibold text-slate-800">Where should we secure your estimate?</h3>
          <div>
            <div className="relative">
              <Input
                type="text"
                value={contactInfo.name}
                onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Full Name"
                required
                className="pl-10"
              />
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div>
            <div className="relative">
              <Input
                type="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Email Address"
                required
                className="pl-10"
              />
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div>
            <div className="relative">
              <Input
                type="tel"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Phone Number"
                required
                className="pl-10"
              />
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
          </div>
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

      {estimatedPrice !== null && !isStepTwoSubmitted && (
        <div className="mt-8 p-6 bg-brand-50 rounded-lg border border-brand-100 relative overflow-hidden shadow-inner">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-2 text-slate-800">Your Estimated Price:</h3>
            <p className="text-5xl font-black text-brand-600 mb-2">${estimatedPrice.toFixed(2)}</p>
            <p className="text-sm text-gray-600">
              For {services.find(s => s.id === service)?.label} ({parseInt(squareFootage).toLocaleString()} sq. ft.)
            </p>
            <p className="text-sm text-green-700 font-bold mt-4 inline-flex items-center justify-center gap-1 bg-green-100 px-4 py-2 rounded-full shadow-sm border border-green-200">
              <CheckCircle className="w-4 h-4" />
              Initial Request Received
            </p>
            <p className="text-xs text-gray-500 mt-3 max-w-sm mx-auto">
              *This is an estimate only. Final pricing may vary based on an on-site professional inspection.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-center mb-6">
              <h4 className="font-bold text-lg text-slate-800 mb-1">Ready to book this service?</h4>
              <p className="text-sm text-slate-500">Provide your address and preferred date to finalize your quote and schedule service.</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Address
                </label>
                <Input
                  type="text"
                  value={stepTwoInfo.address}
                  onChange={(e) => setStepTwoInfo(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Street Address, City, Zip"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date
                </label>
                <Input
                  type="date"
                  value={stepTwoInfo.preferredDate}
                  onChange={(e) => setStepTwoInfo(prev => ({ ...prev, preferredDate: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            {error && <div className="mb-4 text-red-500 text-center text-sm">{error}</div>}

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button asChild variant="outline" className="flex-1 bg-white hover:bg-gray-50 text-slate-700">
                <a href="tel:2137924145" className="flex items-center justify-center font-bold">
                  <Phone className="w-4 h-4 mr-2" />
                  Call to Discuss
                </a>
              </Button>
              <Button
                onClick={handleStepTwoSubmit}
                disabled={isStepTwoLoading}
                className="flex-1 bg-brand-600 hover:bg-brand-700 shadow-md transform transition hover:-translate-y-0.5"
              >
                {isStepTwoLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Finalizing...</>
                ) : (
                  'Finalize Quote Request'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {isStepTwoSubmitted && (
        <div className="mt-8 p-8 bg-green-50 rounded-xl text-center border border-green-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 scale-110">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Quote Request Finalized!</h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Thank you for providing those details. Our team operates efficiently and will contact you shortly to confirm your {stepTwoInfo.preferredDate ? `preferred date of ${stepTwoInfo.preferredDate}` : 'appointment'}.
          </p>
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 shadow-md">
            <a href="tel:2137924145" className="flex items-center">
              <Phone className="w-5 h-5 mr-no2 text-green-200 mr-2" />
              (213) 792-4145
            </a>
          </Button>
        </div>
      )}
    </div>
  );
};

export default PricingEstimator;