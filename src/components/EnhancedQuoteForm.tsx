import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Shield, Clock, CheckCircle, Calculator, Home, Building2, ArrowRight, Calendar, Mail, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

type PriceEstimate = {
  basePrice: number;
  additionalFees: { name: string; amount: number }[];
  total: number;
};

const EnhancedQuoteForm = () => {
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
  const [priceEstimate, setPriceEstimate] = useState<PriceEstimate | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  // Calculate price estimate based on form data
  useEffect(() => {
    if (formData.service && formData.propertyType && formData.squareFootage) {
      const sqft = parseInt(formData.squareFootage) || 0;
      let basePrice = 0;
      const additionalFees: { name: string; amount: number }[] = [];
      
      // Base price calculation
      if (formData.service === 'Residential Air Duct Cleaning') {
        basePrice = 299 + (sqft > 2000 ? (sqft - 2000) * 0.05 : 0);
      } else if (formData.service === 'Commercial Air Duct Cleaning') {
        basePrice = 499 + (sqft > 3000 ? (sqft - 3000) * 0.08 : 0);
      } else if (formData.service === 'Dryer Vent Cleaning') {
        basePrice = 149;
      } else if (formData.service === 'Electrostatic Filter Service') {
        basePrice = 249;
      }
      
      // Additional fees based on property type
      if (['Healthcare Facility', 'Restaurant'].includes(formData.propertyType)) {
        additionalFees.push({ name: 'Specialized Cleaning Protocol', amount: 150 });
      }
      
      if (sqft > 5000) {
        additionalFees.push({ name: 'Large Property Fee', amount: 200 });
      }
      
      // Calculate total
      const total = basePrice + additionalFees.reduce((sum, fee) => sum + fee.amount, 0);
      
      setPriceEstimate({
        basePrice,
        additionalFees,
        total
      });
    } else {
      setPriceEstimate(null);
    }
  }, [formData.service, formData.propertyType, formData.squareFootage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
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
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const renderProgressBar = () => {
    return (
      <div className="mb-6">
        <div className="flex justify-between mb-2 text-gray-700 dark:text-gray-300">
          <span className="text-sm font-medium">Service Details</span>
          <span className="text-sm font-medium">Personal Info</span>
          <span className="text-sm font-medium">Additional Details</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-brand-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((service) => (
                  <div 
                    key={service}
                    className={`border rounded-md p-3 cursor-pointer transition-all ${formData.service === service ? 'border-brand-600 bg-brand-50 dark:bg-brand-900 shadow-sm dark:shadow-lg' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
                    onClick={() => setFormData(prev => ({ ...prev, service }))}
                  >
                    <div className="flex items-center">
                      {service.includes('Residential') ? (
                        <Home className="mr-2 h-5 w-5 text-brand-600 dark:text-brand-300" />
                      ) : service.includes('Commercial') ? (
                        <Building2 className="mr-2 h-5 w-5 text-brand-600 dark:text-brand-300" />
                      ) : (
                        <CheckCircle className="mr-2 h-5 w-5 text-brand-600 dark:text-brand-300" />
                      )}
                      <span className="text-gray-700 dark:text-gray-300">{service}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Property Type</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              >
                <option value="">Select property type</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type} className="text-gray-900 dark:text-white">
                    {type}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Square Footage (approx.)</label>
              <Input
                type="text"
                name="squareFootage"
                value={formData.squareFootage}
                onChange={handleInputChange}
                placeholder="e.g., 2000"
                className="focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>
            
            {priceEstimate && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-brand-50 border border-brand-100 rounded-md"
              >
                <div className="flex items-center mb-2">
                  <Calculator className="mr-2 h-5 w-5 text-brand-600" />
                  <h4 className="font-medium text-brand-800">Price Estimate</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Base Price:</span>
                    <span>${priceEstimate.basePrice.toFixed(2)}</span>
                  </div>
                  
                  {priceEstimate.additionalFees.map((fee, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{fee.name}:</span>
                      <span>${fee.amount.toFixed(2)}</span>
                    </div>
                  ))}
                  
                  <div className="flex justify-between pt-2 border-t border-brand-100 font-medium">
                    <span>Estimated Total:</span>
                    <span>${priceEstimate.total.toFixed(2)}</span>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2">This is an estimate only. Final pricing may vary based on inspection.</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="pl-10 focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="John Doe"
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500"><CheckCircle className="h-5 w-5" /></span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="your@email.com"
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500"><Mail className="h-5 w-5" /></span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
              <div className="relative">
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="pl-10 focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="(123) 456-7890"
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500"><Phone className="h-5 w-5" /></span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service Address</label>
              <div className="relative">
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="pl-10 focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="123 Main St, Los Angeles, CA"
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500"><MapPin className="h-5 w-5" /></span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preferred Service Date</label>
              <div className="relative">
                <Input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  className="pl-10 focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500"><Calendar className="h-5 w-5" /></span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additional Information</label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Please share any additional details that might help us serve you better..."
                className="h-32 focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            
            {priceEstimate && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
                <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Service Summary</h4>
                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Service:</span> {formData.service}</li>
                  <li><span className="font-medium">Property Type:</span> {formData.propertyType}</li>
                  <li><span className="font-medium">Square Footage:</span> {formData.squareFootage}</li>
                  <li><span className="font-medium">Estimated Price:</span> ${priceEstimate.total.toFixed(2)}</li>
                </ul>
              </div>
            )}
            
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 dark:border-gray-600 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                I agree to the <a href="#" className="text-brand-600 dark:text-brand-300 hover:text-brand-500 dark:hover:text-brand-500">Terms of Service</a> and <a href="#" className="text-brand-600 dark:text-brand-300 hover:text-brand-500 dark:hover:text-brand-500">Privacy Policy</a>
              </label>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
      >
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-300" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-700 dark:text-gray-300">Quote Request Submitted!</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Thank you for your request. One of our specialists will contact you shortly to discuss your needs and provide a detailed quote.
        </p>
        <div className="flex justify-center">
          <div className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-brand-700 dark:text-brand-300 bg-brand-100 dark:bg-brand-900">
            <Clock className="mr-2 h-4 w-4" />
            <span>We typically respond within 2 hours during business hours</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {renderProgressBar()}
        {renderStep()}
        <div className="flex justify-between space-x-4">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <ArrowRight className="rotate-180 mr-2" />
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="bg-brand-600 dark:bg-brand-300 hover:bg-brand-700 dark:hover:bg-brand-500 text-white"
            >
              Next
              <ArrowRight className="ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-brand-600 dark:bg-brand-300 hover:bg-brand-700 dark:hover:bg-brand-500 text-white"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EnhancedQuoteForm;