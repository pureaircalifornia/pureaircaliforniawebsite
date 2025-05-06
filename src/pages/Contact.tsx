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
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('submitting');
    
    // Simulate API call
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
      
      {/* Hero Section */}
      <motion.section 
        id="contact-hero" 
        className="pt-32 pb-16 bg-gradient-to-r from-brand-800 to-brand-900 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: Math.random() * 300 + 50,
                height: Math.random() * 300 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: Math.random() * 5 + 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Let's Start a Conversation
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 text-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              We're here to help! Reach out for questions, quotes, or to schedule your service.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>
      
      <TrustBadges />

      {/* Contact Info Section */}
      <section id="contact-info" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <ScrollReveal>
              <motion.div variants={containerVariants} initial="hidden" animate="visible">
                <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6">Get In Touch</motion.h2>
                <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-10">
                  We're available Monday through Saturday to answer your questions 
                  and help you schedule your air duct or dryer vent cleaning service.
                </motion.p>
                
                <StaggerContainer className="space-y-8">
                  {contactInfo.map((item, index) => (
                    <motion.div key={index} className="flex items-start gap-5" variants={itemVariants}>
                      <motion.div 
                        className="bg-brand-50 p-4 rounded-xl text-brand-600 shadow-sm"
                        whileHover={{ y: -5, backgroundColor: "#f0f9ff" }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                        <p className="text-gray-500 mb-1">{item.subtitle}</p>
                        {item.href ? (
                          <motion.a 
                            href={item.href} 
                            className="text-lg font-medium text-brand-600 hover:text-brand-700 transition-colors"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.content}
                          </motion.a>
                        ) : (
                          <p className="text-lg font-medium">{item.content}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </StaggerContainer>
              </motion.div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <motion.div 
                className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Background decoration */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-50 rounded-full opacity-50" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-brand-50 rounded-full opacity-50" />
                
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                    <MessageSquare size={24} className="text-brand-600" />
                    Send Us a Message
                  </h2>
                  
                  <form id="contact-form" onSubmit={handleSubmit} className="relative">
                    {formStatus === 'success' && (
                      <motion.div 
                        className="absolute inset-0 bg-white flex flex-col items-center justify-center z-10 rounded-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring" }}
                        >
                          <CheckCircle size={60} className="text-green-500 mb-4" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                        <p className="text-gray-600 text-center">
                          Thank you for contacting us. We'll get back to you shortly.
                        </p>
                      </motion.div>
                    )}
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="firstName" className="text-sm font-medium flex items-center gap-2">
                            <User size={16} className="text-gray-400" />
                            First Name
                          </label>
                          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                            <input
                              type="text"
                              id="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-300"
                              required
                            />
                          </motion.div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="lastName" className="text-sm font-medium flex items-center gap-2">
                            <User size={16} className="text-gray-400" />
                            Last Name
                          </label>
                          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                            <input
                              type="text"
                              id="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-300"
                              required
                            />
                          </motion.div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                          <AtSign size={16} className="text-gray-400" />
                          Email
                        </label>
                        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                          <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-300"
                            required
                          />
                        </motion.div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                          <Phone size={16} className="text-gray-400" />
                          Phone
                        </label>
                        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                          <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-300"
                            required
                          />
                        </motion.div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium flex items-center gap-2">
                          <MessageSquare size={16} className="text-gray-400" />
                          Message
                        </label>
                        <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                          <textarea
                            id="message"
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-300 resize-none"
                            required
                          ></textarea>
                        </motion.div>
                      </div>
                      
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          type="submit" 
                          className="w-full bg-brand-600 hover:bg-brand-700 text-white py-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-brand-500/20 transition-all duration-300"
                          disabled={isSubmitting}
                        >
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
                      </motion.div>
                    </div>
                  </form>
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
          
          {/* 100% Satisfaction Guarantee Badge */}
          <motion.div 
            className="flex justify-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.div 
              className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-full px-8 py-3 shadow-md"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <ShieldCheck size={28} className="text-green-600" />
              <span className="font-semibold text-green-700 font-heading text-lg">100% Satisfaction Guarantee</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Privacy Note */}
      <motion.section 
        className="py-12 bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <div className="container mx-auto px-4 max-w-2xl">
          <p className="text-sm text-gray-500 text-center">
            We prioritize your privacy. Your information is securely protected and never shared with third parties.
          </p>
        </div>
      </motion.section>
      
      <Footer />
    </div>
  );
};

export default Contact;
