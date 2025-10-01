import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Send, CheckCircle, User, AtSign, MessageSquare, Star, HelpCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import TrustBadges from '@/components/TrustBadges';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer } from '@/components/ui/scroll-reveal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import '../index.css';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
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
      [id]: id === 'phone' ? formatPhone(value) : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('submitting');

    // Basic client-side validation
    const emailValid = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(formData.email);
    const phoneDigits = formData.phone.replace(/\D/g, '');
    const phoneValid = phoneDigits.length === 10;
    const nameValid = formData.firstName.trim().length > 1 && formData.lastName.trim().length > 1;
    const messageValid = formData.message.trim().length >= 10;

    if (!emailValid || !phoneValid || !nameValid || !messageValid) {
      setIsSubmitting(false);
      setFormStatus('error');
      toast({
        title: "Please check the form",
        description: !emailValid
          ? 'Enter a valid email address.'
          : !phoneValid
          ? 'Enter a valid 10-digit phone number.'
          : !nameValid
          ? 'Please provide your first and last name.'
          : 'Your message should be at least 10 characters.',
        variant: 'destructive'
      });
      return;
    }
    
    // Create the email data object
    const emailData = {
      to_email: 'lou@pureaircalifornia.com',
      from_name: `${formData.firstName} ${formData.lastName}`,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
      subject: 'New Contact Form Submission - Pure Air California'
    };
    
    // Send the email using EmailJS
    // Note: In a real implementation, you would need to:
    // 1. Install EmailJS: npm install @emailjs/browser
    // 2. Create an EmailJS account and get your service ID, template ID, and user ID
    // 3. Replace the placeholders below with your actual IDs
    
    // For now, we'll simulate the API call
    // In production, uncomment the EmailJS code and remove the setTimeout
    
    /* 
    import emailjs from '@emailjs/browser';
    
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      emailData,
      import.meta.env.VITE_EMAILJS_USER_ID
    )
    .then((response) => {
      // Email sent successfully
      setIsSubmitting(false);
      setFormStatus('success');
      
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for contacting us. We'll get back to you shortly.",
      });
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
        setFormStatus('idle');
      }, 2000);
    })
    .catch((error) => {
      // Error sending email
      setIsSubmitting(false);
      setFormStatus('error');
      
      toast({
        title: "Error Sending Message",
        description: "There was a problem sending your message. Please try again later.",
        variant: "destructive"
      });
    });
    */
    
    // Simulate API call (remove this in production)
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus('success');
      
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for contacting us. We'll get back to you shortly.",
      });
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
        setFormStatus('idle');
      }, 2000);
    }, 1500);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: "Phone",
      subtitle: "Give us a call",
      content: "(213) 792-4145",
      href: "tel:2137924145"
    },
    {
      icon: <Mail size={24} />,
      title: "Email",
      subtitle: "Send us a message",
              content: "lou@pureaircalifornia.com",
        href: "mailto:lou@pureaircalifornia.com"
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      subtitle: "Serving all of Los Angeles",
      content: "1550 N Poinsettia Pl, Los Angeles, CA 90046",
      href: "https://maps.google.com/?q=1550+N+Poinsettia+Pl,+Los+Angeles,+CA+90046"
    },
    {
      icon: <Clock size={24} />,
      title: "Business Hours",
      subtitle: "We're available",
      content: "Monday-Saturday: 8AM - 6PM"
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Contact Us | Pure Air California - Get Your Free Quote Today</title>
        <meta name="description" content="Contact Pure Air California for professional air duct cleaning services. Call (213) 792-4145 or request a free quote online. Serving Los Angeles and surrounding areas." />
        <meta name="keywords" content="contact pure air california, air duct cleaning quote, Los Angeles air duct cleaning, free estimate, professional air duct cleaning" />
        <meta property="og:title" content="Contact Us | Pure Air California" />
        <meta property="og:description" content="Contact Pure Air California for professional air duct cleaning services. Call (213) 792-4145 or request a free quote online." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pureairca.com/contact" />
        <link rel="canonical" href="https://pureairca.com/contact" />
      </Helmet>
      
      <NavBar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-brand-700 to-brand-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=2070&q=80"
            alt="Professional customer service team"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-700/90 to-brand-900/90 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 p-2 rounded-full">
                <MessageSquare className="h-6 w-6" />
              </span>
              <span className="text-brand-200 font-medium">Get in Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading">Contact Pure Air California</h1>
            <p className="text-xl text-brand-100 mb-8 max-w-3xl">
              Ready to improve your indoor air quality? Contact us today for a free consultation and quote. 
              Our team is standing by to help you breathe cleaner, healthier air.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-gray-100">
                <a href="tel:+12137924145">
                  <Phone className="w-4 h-4 mr-2 inline" />
                  Call (213) 792-4145
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-700">
                <a href="#contact-form">Send Message</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main>
        <div className="container mx-auto px-4 py-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div id="contact-form" className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Get Your Free Quote</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Honeypot */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    required
                    aria-required="true"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    required
                    aria-required="true"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    required
                    aria-required="true"
                    inputMode="email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    required
                    aria-required="true"
                    inputMode="tel"
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    required
                    aria-required="true"
                    placeholder="Briefly describe your project or needs"
                  />
                </div>

                <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white" aria-busy={isSubmitting}>
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Sending Message...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 justify-center">
                      <span>Send Message</span>
                      <Send size={18} />
                    </div>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Our Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-brand-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600">(213) 792-4145</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-brand-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">lou@pureaircalifornia.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-brand-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-gray-600">
                      1550 N Poinsettia Pl, Los Angeles, CA 90046
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-brand-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Hours</h3>
                    <p className="text-gray-600">
                      Monday-Saturday: 8AM - 6PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Areas Map */}
          <div className="mt-16">
            <ScrollReveal animation="fadeInUp">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Service Areas</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  We proudly serve Los Angeles and surrounding areas with professional air duct cleaning services.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-96 bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-brand-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Interactive Service Map</h3>
                  <p className="text-gray-600 mb-4">We serve all of Los Angeles County and surrounding areas</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>• Beverly Hills</div>
                    <div>• Santa Monica</div>
                    <div>• Pasadena</div>
                    <div>• Burbank</div>
                    <div>• Glendale</div>
                    <div>• West Hollywood</div>
                    <div>• Culver City</div>
                    <div>• And many more!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <ScrollReveal animation="fadeInUp">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Get quick answers to common questions about our air duct cleaning services.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-brand-600" />
                      How much does air duct cleaning cost?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Our air duct cleaning costs vary based on the size of your home and the complexity of your HVAC system. 
                    We provide free, no-obligation quotes for all our services. Contact us today for a personalized estimate.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-brand-600" />
                      How long does the cleaning process take?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Most residential air duct cleanings take 3-6 hours, depending on the size of your home and the number of vents. 
                    Commercial properties may take longer. We'll provide a detailed time estimate during your free consultation.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-brand-600" />
                      How often should air ducts be cleaned?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    The National Air Duct Cleaners Association (NADCA) recommends cleaning air ducts every 3-5 years for most homes. 
                    However, homes with pets, allergies, or recent renovations may need more frequent cleaning.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-brand-600" />
                      Do you offer emergency services?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Yes, we offer 24/7 emergency services for urgent air quality issues. Whether you're dealing with mold, 
                    severe contamination, or other emergencies, our team is available to help restore your indoor air quality.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-brand-600" />
                      Are your technicians certified and insured?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Absolutely. All our technicians are NADCA certified and we carry comprehensive liability insurance. 
                    We're fully licensed and bonded, giving you peace of mind that your property is protected.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Customer Testimonials */}
          <div className="mt-16">
            <ScrollReveal animation="fadeInUp">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Don't just take our word for it. Here's what our satisfied customers have to say about our services.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ScrollReveal animation="fadeInUp" delay={0.1}>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Professional service from start to finish. The team was punctual, thorough, and respectful of our home. 
                    The difference in air quality was immediate!"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=50&q=80"
                      alt="Customer"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">Michael R.</p>
                      <p className="text-sm text-gray-500">Beverly Hills</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fadeInUp" delay={0.2}>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Excellent customer service and fair pricing. They cleaned our entire office building and the improvement 
                    in air quality was remarkable. Highly recommended!"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=50&q=80"
                      alt="Customer"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">Sarah L.</p>
                      <p className="text-sm text-gray-500">Downtown LA</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fadeInUp" delay={0.3}>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Outstanding work! The team was knowledgeable, efficient, and left our home spotless. 
                    My family's allergies have improved significantly since the cleaning."
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=50&q=80"
                      alt="Customer"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">David K.</p>
                      <p className="text-sm text-gray-500">Santa Monica</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-16">
            <ScrollReveal animation="fadeInUp">
              <TrustBadges />
            </ScrollReveal>
          </div>
        </div>
      </main>
      
      {/* Sticky CTA Bar */}
      <div className="fixed bottom-4 inset-x-0 px-4 md:hidden z-40">
        <div className="bg-white shadow-lg rounded-full p-2 flex items-center justify-between border border-gray-200">
          <Button asChild className="bg-[#0A3D7C] hover:bg-[#072c5a] rounded-full px-6">
            <a href="tel:+12137924145">Call (213) 792-4145</a>
          </Button>
          <Button asChild variant="outline" className="rounded-full px-6">
            <a href="/quote">Get Free Quote</a>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
