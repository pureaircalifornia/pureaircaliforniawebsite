import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Send, CheckCircle, User, AtSign, MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import TrustBadges from '@/components/TrustBadges';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer } from '@/components/ui/scroll-reveal';
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
      to_email: 'info@pureaircalifornia.com',
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
      'YOUR_SERVICE_ID', // replace with your EmailJS service ID
      'YOUR_TEMPLATE_ID', // replace with your EmailJS template ID
      emailData,
      'YOUR_USER_ID' // replace with your EmailJS user ID
    )
    .then((response) => {
      console.log('Email sent successfully:', response);
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
      console.error('Error sending email:', error);
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
      content: "info@pureaircalifornia.com",
      href: "mailto:info@pureaircalifornia.com"
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
      <NavBar />
      <main>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              
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
                    <p className="text-gray-600">info@pureaircalifornia.com</p>
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
