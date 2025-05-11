import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Mail, Phone, MapPin, User, MessageSquare, ArrowRight, Shield, Clock } from 'lucide-react';

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  subject: string;
  message: string;
};

const EnhancedContactForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
          name: '',
          email: '',
          phone: '',
          address: '',
          subject: '',
          message: '',
        });
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const renderProgressBar = () => {
    return (
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Your Information</span>
          <span className="text-sm font-medium">Message Details</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-brand-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${(step / 2) * 100}%` }}
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
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="pl-10 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  placeholder="John Doe"
                  required
                  autoComplete="name"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500"><User className="h-5 w-5" /></span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500"><Mail className="h-5 w-5" /></span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <div className="relative">
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="pl-10 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  placeholder="(123) 456-7890"
                  required
                  autoComplete="tel"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500"><Phone className="h-5 w-5" /></span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Address (Optional)</label>
              <div className="relative">
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="pl-10 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  placeholder="123 Main St, Los Angeles, CA"
                  autoComplete="street-address"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500"><MapPin className="h-5 w-5" /></span>
                </div>
              </div>
            </div>
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
              <label className="block text-sm font-medium mb-2">Subject</label>
              <div className="relative">
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="pl-10 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  placeholder="How can we help you?"
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500"><MessageSquare className="h-5 w-5" /></span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Please provide details about your inquiry..."
                className="h-32 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the <a href="#" className="text-brand-600 hover:text-brand-500">Terms of Service</a> and <a href="#" className="text-brand-600 hover:text-brand-500">Privacy Policy</a>
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
        className="bg-white p-6 rounded-lg shadow-md text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
        <p className="text-gray-600 mb-4">
          Thank you for contacting Pure Air California. One of our representatives will get back to you shortly.
        </p>
        <div className="flex justify-center">
          <div className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-brand-700 bg-brand-100">
            <Clock className="mr-2 h-4 w-4" />
            <span>We typically respond within 24 hours</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Contact Us</h3>
        <div className="flex items-center gap-1 bg-brand-50 px-2 py-1 rounded text-xs font-medium text-brand-700">
          <Clock size={14} />
          <span>Takes ~1 min</span>
        </div>
      </div>
      
      {renderProgressBar()}
      
      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
        
        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
              className="px-4"
            >
              Back
            </Button>
          ) : (
            <div></div>
          )}
          
          {step < 2 ? (
            <Button 
              type="button" 
              onClick={nextStep} 
              disabled={!formData.name || !formData.email || !formData.phone}
              className="bg-brand-600 hover:bg-brand-700 px-4"
            >
              Next <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              type="submit" 
              className="bg-brand-600 hover:bg-brand-700 px-4"
              disabled={isSubmitting || !formData.subject || !formData.message}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-2">⟳</span> Sending...
                </>
              ) : (
                'Send Message'
              )}
            </Button>
          )}
        </div>
      </form>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Shield className="h-4 w-4 text-brand-600" />
          <span>Your information is secure and encrypted</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle className="h-4 w-4 text-brand-600" />
          <span>We'll respond to your inquiry within 24 hours</span>
        </div>
      </div>
    </div>
  );
};

export default EnhancedContactForm;