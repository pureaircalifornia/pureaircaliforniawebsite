import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  CheckCircle,
  ArrowRight,
  Calculator,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Home,
  Building2,
  AlertCircle
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { submitFormWithBackend } from '@/utils/api';
import { useABVariant } from './ABTestRouter';
import { quoteFormSchema } from '@/utils/validation';

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
  const abVariant = useABVariant();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
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
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate step 1 fields
  const validateStep1 = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.service) errors.service = 'Please select a service';
    if (!formData.propertyType) errors.propertyType = 'Please select a property type';
    if (!formData.squareFootage) {
      errors.squareFootage = 'Please enter square footage';
    } else if (!/^\d+$/.test(formData.squareFootage)) {
      errors.squareFootage = 'Square footage must be a number';
    } else if (parseInt(formData.squareFootage) <= 0) {
      errors.squareFootage = 'Square footage must be greater than 0';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate step 2 fields
  const validateStep2 = (): boolean => {
    const errors: Record<string, string> = {};
    const phoneRegex = /^(\+1)?[\s.-]?\(?[0-9]{3}\)?[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name || formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (!formData.address || formData.address.length < 5) {
      errors.address = 'Please enter a valid address';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate step 3 fields
  const validateStep3 = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.preferredDate) {
      errors.preferredDate = 'Please select a preferred date';
    } else {
      const selectedDate = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.preferredDate = 'Date cannot be in the past';
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    let isValid = false;
    if (step === 1) isValid = validateStep1();
    else if (step === 2) isValid = validateStep2();
    else isValid = true;

    if (isValid) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setFormErrors({});
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Calculate price estimate based on service and square footage
  const priceEstimate = useMemo<PriceEstimate | null>(() => {
    if (!formData.service || !formData.squareFootage) return null;

    const sqft = parseInt(formData.squareFootage) || 0;
    if (sqft <= 0) return null;

    let basePrice = 0;
    const additionalFees: { name: string; amount: number }[] = [];

    // Base pricing by service type
    if (formData.service.includes('Residential Air Duct')) {
      basePrice = Math.max(199, sqft * 0.15);
      if (sqft > 2500) {
        additionalFees.push({ name: 'Large Home Premium', amount: 50 });
      }
    } else if (formData.service.includes('Commercial Air Duct')) {
      basePrice = Math.max(399, sqft * 0.12);
      additionalFees.push({ name: 'Commercial Rate', amount: 100 });
    } else if (formData.service.includes('Dryer Vent')) {
      basePrice = 149;
    } else if (formData.service.includes('Electrostatic')) {
      basePrice = 299;
    }

    // Property type adjustments
    if (formData.propertyType.includes('Restaurant')) {
      additionalFees.push({ name: 'Kitchen System Premium', amount: 150 });
    } else if (formData.propertyType.includes('Healthcare')) {
      additionalFees.push({ name: 'Medical-Grade Cleaning', amount: 200 });
    }

    const total = basePrice + additionalFees.reduce((sum, fee) => sum + fee.amount, 0);

    return { basePrice, additionalFees, total };
  }, [formData.service, formData.squareFootage, formData.propertyType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation before submit
    if (!validateStep3()) return;

    setIsSubmitting(true);

    // First, save to backend (primary storage)
    const backendResult = await submitFormWithBackend({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      service: formData.service,
      property_type: formData.propertyType,
      square_footage: formData.squareFootage,
      address: formData.address,
      preferred_date: formData.preferredDate,
      source: 'quote_form' as const,
    });

    // Then, try to send email notification (secondary)
    const emailData = {
      to_email: 'info@pureaircalifornia.com',
      service: formData.service,
      property_type: formData.propertyType,
      square_footage: formData.squareFootage,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      message: formData.message,
      preferred_date: formData.preferredDate,
      ab_variant: abVariant || 'Control',
      subject: `Enhanced Quote Request (${abVariant ? `Variant ${abVariant}` : 'Control'}): ${formData.service} - ${formData.name}`
    };

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_QUOTE_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const userId = import.meta.env.VITE_EMAILJS_USER_ID;

      if (serviceId && templateId && userId) {
        await emailjs.send(serviceId, templateId, emailData, userId);
      }
    } catch (emailError) {
      // Email notification failed, but lead is saved in backend
      // Silent fail - lead data is already saved
    }

    // GTM Conversion Event
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'generate_lead',
        service_type: formData.service,
        customer_type: formData.service.toLowerCase().includes('commercial') ? 'commercial' : 'residential',
        value: 50.00, // Estimated lead value
        currency: 'USD'
      });
    }

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
  };

  const renderProgressBar = () => {
    return (
      <div className="mb-6">
        <div className="flex justify-between mb-3 text-slate-600 font-bold uppercase tracking-widest text-[10px]">
          <span>Service</span>
          <span>Personal</span>
          <span>Details</span>
        </div>
        <div className="w-full bg-slate-200/50 rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="bg-sky-600 h-full"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          ></motion.div>
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
              <label className="block text-sm font-bold text-slate-700 mb-3">Service Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((service) => (
                  <div
                    key={service}
                    className={`glass-premium p-4 rounded-xl cursor-pointer transition-all border-white/50 ${formData.service === service ? 'ring-2 ring-sky-500 bg-sky-50/50' : 'hover:bg-white/60'} ${formErrors.service ? 'ring-2 ring-red-300' : ''}`}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, service }));
                      if (formErrors.service) setFormErrors(prev => ({ ...prev, service: '' }));
                    }}
                  >
                    <div className="flex items-center">
                      {service.includes('Residential') ? (
                        <Home className="mr-3 h-5 w-5 text-sky-600" />
                      ) : service.includes('Commercial') ? (
                        <Building2 className="mr-3 h-5 w-5 text-sky-600" />
                      ) : (
                        <CheckCircle className="mr-3 h-5 w-5 text-sky-600" />
                      )}
                      <span className="text-sm font-bold text-slate-800">{service}</span>
                    </div>
                  </div>
                ))}
              </div>
              {formErrors.service && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {formErrors.service}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Property Type</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                className={`w-full p-4 glass-premium rounded-xl border-white/50 focus:ring-2 focus:ring-sky-500 outline-none text-slate-800 font-medium ${formErrors.propertyType ? 'ring-2 ring-red-300' : ''}`}
                required
              >
                <option value="">Select property type</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {formErrors.propertyType && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {formErrors.propertyType}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Square Footage (approx.)</label>
              <Input
                type="text"
                name="squareFootage"
                value={formData.squareFootage}
                onChange={handleInputChange}
                placeholder="e.g., 2000"
                className={`p-6 glass-premium rounded-xl border-white/50 focus:ring-2 focus:ring-sky-500 text-slate-800 placeholder:text-slate-400 font-medium ${formErrors.squareFootage ? 'ring-2 ring-red-300' : ''}`}
                required
              />
              {formErrors.squareFootage && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {formErrors.squareFootage}
                </p>
              )}
            </div>

            {priceEstimate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 glass-premium rounded-2xl border-sky-100 bg-sky-50/30"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-sky-600 rounded-lg mr-3 shadow-lg">
                    <Calculator className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-bold text-slate-800">Dynamic Estimate</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Base Cleaning</span>
                    <span className="font-bold">${priceEstimate.basePrice.toFixed(2)}</span>
                  </div>

                  {priceEstimate.additionalFees.map((fee, index) => (
                    <div key={index} className="flex justify-between items-center text-slate-600">
                      <span>{fee.name}</span>
                      <span className="font-bold">${fee.amount.toFixed(2)}</span>
                    </div>
                  ))}

                  <div className="flex justify-between items-center pt-4 border-t border-sky-100 font-black text-lg text-slate-900">
                    <span>Estimated Total</span>
                    <span className="text-sky-600">${priceEstimate.total.toFixed(2)}</span>
                  </div>

                  <p className="text-[10px] text-slate-400 uppercase tracking-tighter mt-4 leading-tight">
                    *Final quote provided after on-site professional inspection.
                  </p>
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
                  className={`pl-10 focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${formErrors.name ? 'ring-2 ring-red-300' : ''}`}
                  placeholder="John Doe"
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500"><CheckCircle className="h-5 w-5" /></span>
                </div>
              </div>
              {formErrors.name && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {formErrors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`pl-10 focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${formErrors.email ? 'ring-2 ring-red-300' : ''}`}
                  placeholder="your@email.com"
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500"><Mail className="h-5 w-5" /></span>
                </div>
              </div>
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {formErrors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
              <div className="relative">
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`pl-10 focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${formErrors.phone ? 'ring-2 ring-red-300' : ''}`}
                  placeholder="(123) 456-7890"
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500"><Phone className="h-5 w-5" /></span>
                </div>
              </div>
              {formErrors.phone && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {formErrors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service Address</label>
              <div className="relative">
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`pl-10 focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${formErrors.address ? 'ring-2 ring-red-300' : ''}`}
                  placeholder="Your Street Address"
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500"><MapPin className="h-5 w-5" /></span>
                </div>
              </div>
              {formErrors.address && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {formErrors.address}
                </p>
              )}
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
                I agree to the <a href="/terms-of-service" className="text-brand-600 dark:text-brand-300 hover:text-brand-500 dark:hover:text-brand-500">Terms of Service</a> and <a href="/privacy-policy" className="text-brand-600 dark:text-brand-300 hover:text-brand-500 dark:hover:text-brand-500">Privacy Policy</a>
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
          <Clock className="mr-2 h-4 w-4" />
          <span>We typically respond within 2 hours during business hours</span>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-500 mb-3">Want immediate service?</p>
          <a
            href="tel:2137924145"
            className="inline-flex items-center gap-2 text-lg font-bold text-green-600 hover:text-green-700"
          >
            <Phone size={20} className="fill-current" />
            Call (213) 792-4145 Now
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="glass-premium p-8 rounded-3xl border-white/60 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Calculator size={80} />
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
        {renderProgressBar()}
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
        <div className="flex justify-between items-center gap-4 pt-4">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="bg-white/50 backdrop-blur-md border-white/50 text-slate-600 font-bold px-6 py-6 h-auto rounded-2xl hover:bg-white/80"
            >
              <ArrowRight className="rotate-180 mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="btn-premium flex-1 text-white font-black text-lg py-6 h-auto rounded-2xl shadow-xl hover:scale-[1.02]"
            >
              Continue to {step === 1 ? 'Personal Info' : 'Final Details'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="btn-premium flex-1 text-white font-black text-lg py-6 h-auto rounded-2xl shadow-xl hover:scale-[1.02]"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Generating Request...
                </span>
              ) : 'Submit Quote Request'}
            </Button>
          )}
        </div>

        {/* Trust Signals */}
        <div className="pt-4 mt-4 border-t border-slate-200/50">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
              </svg>
              <span>Secure & Private</span>
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-sky-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>NADCA Certified</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>We respond within 2 hours</span>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EnhancedQuoteForm;