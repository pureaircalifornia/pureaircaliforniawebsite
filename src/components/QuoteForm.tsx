import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Shield, BadgeCheck, Clock } from 'lucide-react';

const QuoteForm = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: '',
    propertyType: '',
    propertySize: '',
    concerns: [],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      concerns: checked 
        ? [...prev.concerns, value]
        : prev.concerns.filter(concern => concern !== value)
    }));
  };

  const validateStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return formData.serviceType && formData.propertyType;
      case 2:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      default:
        return true;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Quote Request Received!",
      description: "We'll contact you shortly to discuss your needs.",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= num ? 'bg-brand-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {num}
              </div>
              <span className="text-xs mt-1 text-gray-600">
                {num === 1 ? 'Service' : num === 2 ? 'Details' : 'Contact'}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full rounded">
            <div 
              className="absolute top-0 left-0 h-full bg-brand-600 rounded transition-all duration-300"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Service Selection */}
        <div className={`transition-all duration-300 ${step === 1 ? 'block' : 'hidden'}`}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Service Type*</label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                required
              >
                <option value="">Select a service</option>
                <option value="residential">Residential Air Duct Cleaning</option>
                <option value="commercial">Commercial Air Duct Cleaning</option>
                <option value="dryer">Dryer Vent Cleaning</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Property Type*</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                required
              >
                <option value="">Select property type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="office">Office Building</option>
                <option value="commercial">Commercial Space</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Property Size (sq ft)</label>
              <input
                type="number"
                name="propertySize"
                value={formData.propertySize}
                onChange={handleInputChange}
                placeholder="e.g., 1500"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Main Concerns</label>
              <div className="space-y-2">
                {['Dust', 'Allergies', 'Odors', 'Energy Efficiency', 'Mold'].map((concern) => (
                  <label key={concern} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={concern.toLowerCase()}
                      checked={formData.concerns.includes(concern.toLowerCase())}
                      onChange={handleCheckboxChange}
                      className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                    />
                    <span>{concern}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Contact Information */}
        <div className={`transition-all duration-300 ${step === 2 ? 'block' : 'hidden'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name*</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name*</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone*</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Step 3: Schedule */}
        <div className={`transition-all duration-300 ${step === 3 ? 'block' : 'hidden'}`}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Preferred Date</label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Preferred Time</label>
              <select
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              >
                <option value="">Select a time</option>
                <option value="morning">Morning (8AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 4PM)</option>
                <option value="evening">Evening (4PM - 6PM)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Additional Notes</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                placeholder="Any special instructions or concerns?"
              />
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="px-6"
            >
              Back
            </Button>
          )}
          
          {step < 3 ? (
            <Button
              type="button"
              onClick={() => validateStep(step) && setStep(step + 1)}
              className={`px-6 ml-auto ${!validateStep(step) ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!validateStep(step)}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              className="px-6 ml-auto"
            >
              Submit Quote Request
            </Button>
          )}
        </div>
      </form>

      {/* Trust Indicators */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-brand-600" />
            <span>Secure Form</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-4 h-4 text-brand-600" />
            <span>No Obligation</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-600" />
            <span>Quick Response</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
