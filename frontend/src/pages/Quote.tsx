import React, { useState } from 'react';
import { Shield, Clock, CheckCircle, Phone, Mail, MapPin, Calendar, Building, Home, Send } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Quote = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceType: '',
    propertyType: '',
    squareFootage: '',
    preferredDate: '',
    message: '',
    urgency: 'standard'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Basic phone masking: (XXX) XXX-XXXX
    const formatPhone = (raw: string) => {
      const digits = raw.replace(/\D/g, '').slice(0, 10);
      const part1 = digits.slice(0, 3);
      const part2 = digits.slice(3, 6);
      const part3 = digits.slice(6, 10);
      if (digits.length > 6) return `(${part1}) ${part2}-${part3}`;
      if (digits.length > 3) return `(${part1}) ${part2}`;
      if (digits.length > 0) return `(${part1}`;
      return '';
    };

    setFormData(prev => ({
      ...prev,
      [name]: name === 'phone' ? formatPhone(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('submitting');

    // Basic client-side validation
    const emailValid = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(formData.email);
    const phoneDigits = formData.phone.replace(/\D/g, '');
    const phoneValid = phoneDigits.length === 10;
    const nameValid = formData.name.trim().length > 1;
    const addressValid = formData.address.trim().length > 5;
    const serviceValid = formData.serviceType.length > 0;
    const propertyValid = formData.propertyType.length > 0;

    if (!emailValid || !phoneValid || !nameValid || !addressValid || !serviceValid || !propertyValid) {
      setIsSubmitting(false);
      setFormStatus('error');
      toast({
        title: "Please check the form",
        description: !emailValid
          ? 'Enter a valid email address.'
          : !phoneValid
          ? 'Enter a valid 10-digit phone number.'
          : !nameValid
          ? 'Please provide your full name.'
          : !addressValid
          ? 'Please provide a valid property address.'
          : !serviceValid
          ? 'Please select a service type.'
          : 'Please select a property type.',
        variant: 'destructive'
      });
      return;
    }
    
    // Create the email data object
    const emailData = {
      to_email: 'lou@pureaircalifornia.com',
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      address: formData.address,
      service_type: formData.serviceType,
      property_type: formData.propertyType,
      square_footage: formData.squareFootage,
      urgency: formData.urgency,
      preferred_date: formData.preferredDate,
      message: formData.message,
      subject: `New Quote Request - ${formData.serviceType}`
    };
    
    try {
      // Check if environment variables are available
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const userId = import.meta.env.VITE_EMAILJS_USER_ID;
      
      if (!serviceId || !templateId || !userId) {
        throw new Error('EmailJS configuration missing. Please check your .env file.');
      }
      
      console.log('Sending email with EmailJS:', { serviceId, templateId, userId });
      console.log('Email data:', emailData);
      
      // Send email using EmailJS
      const result = await emailjs.send(serviceId, templateId, emailData, userId);
      console.log('Email sent successfully:', result);
      
      setIsSubmitting(false);
      setFormStatus('success');
      
      toast({
        title: "Quote Request Sent Successfully!",
        description: "Thank you for your request. We'll contact you within 24 hours with a detailed quote.",
      });
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          serviceType: '',
          propertyType: '',
          squareFootage: '',
          preferredDate: '',
          message: '',
          urgency: 'standard'
        });
        setFormStatus('idle');
      }, 2000);
      
    } catch (error) {
      console.error('Error sending email:', error);
      setIsSubmitting(false);
      setFormStatus('error');
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      toast({
        title: "Error Sending Request",
        description: `There was a problem sending your quote request: ${errorMessage}. Please try again or call us at (213) 792-4145.`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Get a Free Quote | Pure Air California</title>
        <meta name="description" content="Request a free quote for professional air duct cleaning, dryer vent cleaning, electrostatic filters, and HVAC system cleaning services. Fast response, competitive pricing." />
        <meta name="keywords" content="free quote, air duct cleaning quote, dryer vent cleaning quote, HVAC cleaning quote, electrostatic filter quote" />
        <meta property="og:title" content="Get a Free Quote | Pure Air California" />
        <meta property="og:description" content="Request a free quote for professional air duct cleaning, dryer vent cleaning, electrostatic filters, and HVAC system cleaning services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pureairca.com/quote" />
        <link rel="canonical" href="https://pureairca.com/quote" />
      </Helmet>

      <NavBar />
      
    {/* HERO SECTION */}
    <section className="relative bg-gradient-to-r from-brand-700 to-brand-500 text-white py-20 mb-[-60px]">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <Send size={48} className="text-white drop-shadow-lg" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get Your Free Quote</h1>
          <p className="text-xl md:text-2xl text-brand-100 mb-8">
            Fast, professional air duct & dryer vent cleaning. No obligation, no hassle.
          </p>

        </div>
      </div>
      {/* Optional: Decorative SVG or background pattern here */}
    </section>
    <div className="bg-gray-50 flex-grow pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow-lg rounded-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-3"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-3"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-3"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-700">
                      Property Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-3"
                      placeholder="Street address, city, state, zip"
                      required
                    />
                  </div>

                  {/* Service Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="serviceType" className="block mb-2 text-sm font-medium text-gray-700">
                        Service Type *
                      </label>
                      <select
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-3"
                        required
                      >
                        <option value="">Select a Service</option>
                        <optgroup label="Air Duct Cleaning">
                          <option value="Commercial Air Duct Cleaning">Commercial Air Duct Cleaning</option>
                          <option value="Residential Air Duct Cleaning">Residential Air Duct Cleaning</option>
                        </optgroup>
                        <optgroup label="Dryer Vent Services">
                          <option value="Residential Dryer Vent Cleaning">Residential Dryer Vent Cleaning</option>
                          <option value="Commercial Dryer Vent Cleaning">Commercial Dryer Vent Cleaning</option>
                          <option value="Dryer Vent Maintenance Program">Dryer Vent Maintenance Program</option>
                        </optgroup>
                        <optgroup label="Air Filtration">
                          <option value="Residential Electrostatic Filter">Residential Electrostatic Filter</option>
                          <option value="Commercial Electrostatic Filter">Commercial Electrostatic Filter</option>
                        </optgroup>
                        <optgroup label="HVAC Services">
                          <option value="HVAC System Cleaning">HVAC System Cleaning</option>
                        </optgroup>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="propertyType" className="block mb-2 text-sm font-medium text-gray-700">
                        Property Type *
                      </label>
                      <select
                        id="propertyType"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-3"
                        required
                      >
                        <option value="">Select Property Type</option>
                        <optgroup label="Residential">
                          <option value="Single Family Home">Single Family Home</option>
                          <option value="Apartment/Condo">Apartment/Condo</option>
                          <option value="Townhouse">Townhouse</option>
                          <option value="Multi-Family">Multi-Family</option>
                        </optgroup>
                        <optgroup label="Commercial">
                          <option value="Office Building">Office Building</option>
                          <option value="Retail Store">Retail Store</option>
                          <option value="Restaurant">Restaurant</option>
                          <option value="Healthcare Facility">Healthcare Facility</option>
                          <option value="Hotel/Motel">Hotel/Motel</option>
                          <option value="Manufacturing Facility">Manufacturing Facility</option>
                          <option value="Other Commercial">Other Commercial</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="squareFootage" className="block mb-2 text-sm font-medium text-gray-700">
                        Square Footage
                      </label>
                      <input
                        type="number"
                        id="squareFootage"
                        name="squareFootage"
                        value={formData.squareFootage}
                        onChange={handleInputChange}
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-3"
                        placeholder="e.g., 2000"
                      />
                    </div>
                    <div>
                      <label htmlFor="urgency" className="block mb-2 text-sm font-medium text-gray-700">
                        Service Urgency
                      </label>
                      <select
                        id="urgency"
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleInputChange}
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-3"
                      >
                        <option value="standard">Standard (1-2 weeks)</option>
                        <option value="rush">Rush (3-5 days)</option>
                        <option value="emergency">Emergency (Same day)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="preferredDate" className="block mb-2 text-sm font-medium text-gray-700">
                      Preferred Service Date
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-3"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                      Additional Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-3"
                      placeholder="Please describe your specific needs, concerns, or any special requirements..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white py-3 px-6 rounded-lg font-medium"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Sending Request...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 justify-center">
                        <span>Get Free Quote</span>
                        <Send size={18} />
                      </div>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="space-y-6">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Why Choose Us?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="text-brand-600 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-medium text-gray-800">Licensed & Insured</h4>
                      <p className="text-sm text-gray-600">Fully certified technicians with comprehensive coverage</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="text-brand-600 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-medium text-gray-800">Fast Response</h4>
                      <p className="text-sm text-gray-600">Quick turnaround times and flexible scheduling</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-brand-600 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-medium text-gray-800">Satisfaction Guaranteed</h4>
                      <p className="text-sm text-gray-600">100% satisfaction guarantee on all services</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="text-brand-600" size={18} />
                    <span className="text-gray-700">(213) 792-4145</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="text-brand-600" size={18} />
                    <span className="text-gray-700">lou@pureaircalifornia.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="text-brand-600" size={18} />
                    <span className="text-gray-700">Serving all of California</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="text-brand-600" size={18} />
                    <span className="text-gray-700">Mon-Fri: 8AM-6PM</span>
                  </div>
                </div>
              </div>

              <div className="bg-brand-50 border border-brand-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-brand-800">What to Expect</h3>
                <ul className="space-y-2 text-sm text-brand-700">
                  <li>• Free consultation and assessment</li>
                  <li>• Detailed written quote within 24 hours</li>
                  <li>• No hidden fees or surprises</li>
                  <li>• Professional service guarantee</li>
                  <li>• Follow-up support after service</li>
                </ul>
              </div>
            </div>
          </div>
          </div>
      </div>
    
     

      <Footer />
    </div>
  );
};

export default Quote;
