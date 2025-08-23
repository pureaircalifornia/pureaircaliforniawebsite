import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Shield, Clock, CheckCircle } from 'lucide-react';

type FormData = {
  service: string;
  propertyType: string;
  squareFootage: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  preferredDate: string;
};

const QuoteForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    service: '',
    propertyType: '',
    squareFootage: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
    preferredDate: '',
  });

  const services = [
    'Residential Air Duct Cleaning',
    'Commercial Air Duct Cleaning',
    'Dryer Vent Cleaning',
    'Electrostatic Filter Service',
  ];

  const propertyTypes = [
    'Single Family Home',
    'Apartment/Condo',
    'Office Building',
    'Restaurant',
    'Healthcare Facility',
    'Other Commercial',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create the email data object for the quote request
    const emailData = {
      to_email: 'lou@pureaircalifornia.com',
      service: formData.service,
      property_type: formData.propertyType,
      square_footage: formData.squareFootage,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      message: formData.message,
      preferred_date: formData.preferredDate,
      subject: `Quote Request: ${formData.service} - ${formData.name}`
    };
    
    // In a real implementation, you would send this data using EmailJS
    // For now, we'll just log it to the console
            // Quote form submitted successfully
    
    // Show success message or redirect to thank you page
    alert('Thank you for your quote request! We will contact you shortly.');
    
    // Reset form
    setStep(1);
    setFormData({
      service: '',
      propertyType: '',
      squareFootage: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      message: '',
      preferredDate: '',
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Service Type</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Property Type</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select property type</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Square Footage (approx.)</label>
              <Input
                type="text"
                name="squareFootage"
                value={formData.squareFootage}
                onChange={handleInputChange}
                placeholder="e.g., 2000"
                required
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Service Address</label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Preferred Service Date</label>
              <Input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Additional Notes</label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Any specific concerns or requirements?"
                className="h-32"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= num ? 'bg-brand-600 text-white' : 'bg-gray-200'
                }`}
              >
                {num}
              </div>
              {num < 3 && (
                <div
                  className={`h-1 w-24 ${
                    step > num ? 'bg-brand-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span>Service Details</span>
          <span>Contact Info</span>
          <span>Schedule</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {renderStep()}

        {/* Trust Indicators */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-brand-600" />
              <span>Secure Form</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-600" />
              <span>Quick Response</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-brand-600" />
              <span>No Obligation</span>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep((prev) => prev - 1)}
            >
              Previous
            </Button>
          )}
          {step < 3 ? (
            <Button
              type="button"
              className="ml-auto"
              onClick={() => setStep((prev) => prev + 1)}
            >
              Next
            </Button>
          ) : (
            <Button type="submit" className="ml-auto">
              Get Quote
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default QuoteForm;
