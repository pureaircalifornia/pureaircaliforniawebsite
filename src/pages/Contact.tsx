import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import TrustBadges from '@/components/TrustBadges';
import '../index.css';

const Contact = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you'd send the form data to a server here
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll get back to you shortly.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <section id="contact-hero" className="pt-32 pb-16 bg-gradient-to-r from-brand-700 to-brand-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl mb-8">
              We're here to help! Reach out for questions, quotes, or to schedule your service.
            </p>
          </div>
        </div>
      </section>
      <TrustBadges />

      {/* Contact Info Section */}
      <section id="contact-info" className="py-12 bg-white fade-in">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-lg text-gray-600 mb-8">
                We're available Monday through Saturday to answer your questions 
                and help you schedule your air duct or dryer vent cleaning service.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-100 p-3 rounded-full text-brand-600">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600 mb-1">Give us a call</p>
                    <a 
                      href="tel:2137924145" 
                      className="text-lg font-medium text-brand-600 hover:underline"
                    >
                      (213) 792-4145
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-brand-100 p-3 rounded-full text-brand-600">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Email</h3>
                    <p className="text-gray-600 mb-1">Send us a message</p>
                    <a 
                      href="mailto:info@pureaircalifornia.com" 
                      className="text-lg font-medium text-brand-600 hover:underline"
                    >
                      info@pureaircalifornia.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-brand-100 p-3 rounded-full text-brand-600">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Location</h3>
                    <p className="text-gray-600 mb-1">Serving all of Los Angeles</p>
                    <p className="text-lg font-medium">1550 N Poinsettia Pl, Los Angeles, CA 90046</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-brand-100 p-3 rounded-full text-brand-600">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Business Hours</h3>
                    <p className="text-gray-600 mb-1">We're available</p>
                    <p className="text-lg font-medium">Monday-Saturday: 8AM - 6PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Send Us a Message</h2>
              <form id="contact-form" onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                      required
                    ></textarea>
                  </div>
                  
                  <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
          {/* 100% Satisfaction Guarantee Badge */}
          <div className="flex justify-center mt-10">
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-full px-6 py-2 shadow-sm">
              <ShieldCheck size={24} className="text-green-600" />
              <span className="font-semibold text-green-700 font-heading">100% Satisfaction Guarantee</span>
            </div>
          </div>
        </div>
      </section>
      <div className="border-t border-gray-100 my-8" />
      {/* Contact Form Section */}
      <section id="contact-form" className="py-12 bg-gray-50 fade-in">
        <div className="container mx-auto px-4 max-w-2xl">
          <p className="text-xs text-gray-500 mt-2 text-center">We never share your information. Your privacy is protected.</p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
