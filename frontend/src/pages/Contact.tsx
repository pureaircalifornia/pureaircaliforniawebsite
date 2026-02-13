import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Send, CheckCircle, User, AtSign, MessageSquare, Star, HelpCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import TrustBadges from '@/components/TrustBadges';
import { motion } from 'framer-motion';
import { ScrollReveal, StaggerContainer } from '@/components/ui/scroll-reveal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ResponsiveImage from '@/components/ResponsiveImage';
import TestimonialCard from '@/components/TestimonialCard';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import '../index.css';
import SEOProvider from '@/components/SEOProvider';
import SchemaMarkup from '@/components/SchemaMarkup';
import { seoConfig } from '@/utils/seo/seoConfig';
import { submitFormWithBackend } from '@/utils/api';

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    // First, save to backend (primary storage)
    await submitFormWithBackend({
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      source: 'contact_form',
    });

    // Then, try to send email notification (secondary)
    const emailData = {
      to_email: 'info@pureaircalifornia.com',
      from_name: `${formData.firstName} ${formData.lastName}`,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
      subject: 'New Contact Form Submission - Pure Air California'
    };

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const userId = import.meta.env.VITE_EMAILJS_USER_ID;

      if (serviceId && templateId && userId) {
        await emailjs.send(serviceId, templateId, emailData, userId);
      }
    } catch (emailError) {
      // Email notification failed, but lead is saved in backend
    }

    // Always show success since lead is saved to backend
    setIsSubmitting(false);
    setFormStatus('success');

    toast({
      title: "Message Sent Successfully",
      description: "Thank you for contacting us. We'll get back to you shortly.",
    });

    // Track conversion
    if (window.gtag) {
      window.gtag('event', 'generate_lead', {
        event_category: 'form',
        event_label: 'contact_form'
      });
    }

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
    <HelmetProvider>
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Contact Pure Air California | Air Duct Cleaning Los Angeles | (213) 792-4145</title>
          <meta name="description" content="Contact Pure Air California for air duct & dryer vent cleaning in Los Angeles. Call (213) 792-4145 or fill out our form for a free estimate today! NADCA certified." />
          <meta name="keywords" content="contact pure air california, air duct cleaning quote Los Angeles, Los Angeles air duct cleaning phone, free estimate duct cleaning LA, professional air duct cleaning contact" />
          <meta name="robots" content="index, follow, max-image-preview:large" />
          <meta name="geo.region" content="US-CA" />
          <meta name="geo.placename" content="Los Angeles" />
          <meta property="og:title" content="Contact Pure Air California | Air Duct Cleaning Los Angeles" />
          <meta property="og:description" content="Contact Pure Air California for professional air duct cleaning services. Call (213) 792-4145 or request a free quote online." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.pureaircalifornia.com/contact" />
          <meta property="og:site_name" content="Pure Air California" />
          <link rel="canonical" href="https://www.pureaircalifornia.com/contact" />
        </Helmet>
        <SEOProvider>
          <SchemaMarkup schema={{
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "url": "https://www.pureaircalifornia.com/contact",
            "name": "Contact Us | Pure Air California",
            "description": "Contact Pure Air California for professional air duct cleaning services in Los Angeles.",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.pureaircalifornia.com/contact"
            }
          }} />
        </SEOProvider>

        <NavBar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-r from-brand-700 to-brand-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <ResponsiveImage
              src="/images/hero/contact-hero-office-exterior.jpg"
              alt="Professional customer service team"
              className="w-full h-full"
              loading="eager"
              width={1920}
              height={1080}
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(100,180,255,0.2), 0 0 60px rgba(100,180,255,0.1)' }}>Contact Pure Air California</h1>
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
              <div id="contact-form" className="glass-premium p-8 rounded-2xl shadow-2xl border-white/40">
                <h2 className="text-2xl font-bold mb-6 text-slate-900">Get Your Free Quote</h2>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Honeypot */}
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none"
                        required
                        placeholder="John"
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none"
                        required
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none"
                        required
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none"
                        required
                        placeholder="(213) 792-4145"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Your Message</label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none resize-none"
                      required
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <Button type="submit" className="w-full btn-premium py-6 rounded-xl text-lg font-bold shadow-xl" aria-busy={isSubmitting}>
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
              <div className="flex flex-col gap-6">
                {[
                  {
                    icon: <Phone className="h-6 w-6" />,
                    title: 'Phone',
                    content: '(213) 792-4145',
                    sub: 'Available 8AM - 8PM',
                    link: 'tel:2137924145',
                    color: 'bg-brand-50 text-brand-600'
                  },
                  {
                    icon: <Mail className="h-6 w-6" />,
                    title: 'Email',
                    content: 'info@pureaircalifornia.com',
                    sub: 'Response within 2 hours',
                    link: 'mailto:info@pureaircalifornia.com',
                    color: 'bg-sky-50 text-sky-600'
                  },
                  {
                    icon: <MapPin className="h-6 w-6" />,
                    title: 'Office',
                    content: '1550 N Poinsettia Pl, Los Angeles, CA 90046',
                    sub: 'Serving entire LA area',
                    link: 'https://maps.google.com/?q=1550+N+Poinsettia+Pl,+Los+Angeles,+CA+90046',
                    color: 'bg-amber-50 text-amber-600'
                  },
                  {
                    icon: <Clock className="h-6 w-6" />,
                    title: 'Hours',
                    content: 'Mon-Sat: 8AM - 6PM',
                    sub: 'Emergency 24/7 coverage',
                    color: 'bg-green-50 text-green-600'
                  }
                ].map((item, i) => (
                  <ScrollReveal key={i} animation="fadeInUp" delay={i * 0.1}>
                    <div className="glass-card p-6 flex items-center gap-6 hover:scale-[1.02] transition-transform duration-300">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner ${item.color}`}>
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">{item.title}</h3>
                        {item.link ? (
                          <a href={item.link} className="text-xl font-bold text-slate-900 hover:text-brand-600 transition-colors">
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-xl font-bold text-slate-900">{item.content}</p>
                        )}
                        <p className="text-sm text-slate-500 font-medium mt-1">{item.sub}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Service Areas Map */}
            <div className="mt-16">
              <ScrollReveal animation="fadeInUp">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-slate-900">Our Service Areas</h2>
                  <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                    We proudly serve Los Angeles and surrounding areas with professional air duct cleaning services.
                  </p>
                </div>
              </ScrollReveal>

              <div className="glass-premium p-4 rounded-2xl shadow-2xl overflow-hidden border-white/40">
                <ServiceAreaMap />
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

              <div className="relative">
                <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden opacity-10">
                  <ResponsiveImage
                    src="/images/hero/happy-home-couple.jpg"
                    alt="Happy homeowners"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
                  <ScrollReveal animation="fadeInUp" delay={0.1}>
                    <TestimonialCard
                      name="Michael R."
                      location="Beverly Hills"
                      quote="Professional service from start to finish. The team was punctual, thorough, and respectful of our home. The difference in air quality was immediate!"
                      rating={5}
                    />
                  </ScrollReveal>

                  <ScrollReveal animation="fadeInUp" delay={0.2}>
                    <TestimonialCard
                      name="Sarah L."
                      location="Downtown LA"
                      quote="Excellent customer service and fair pricing. They cleaned our entire office building and the improvement in air quality was remarkable. Highly recommended!"
                      rating={5}
                    />
                  </ScrollReveal>

                  <ScrollReveal animation="fadeInUp" delay={0.3}>
                    <TestimonialCard
                      name="David K."
                      location="Santa Monica"
                      quote="Outstanding work! The team was knowledgeable, efficient, and left our home spotless. My family's allergies have improved significantly since the cleaning."
                      rating={5}
                    />
                  </ScrollReveal>
                </div>
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



        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Contact;
