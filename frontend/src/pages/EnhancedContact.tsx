import React from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import EnhancedContactForm from '@/components/EnhancedContactForm';
import EnhancedTrustBadges from '@/components/EnhancedTrustBadges';

const EnhancedContact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Contact Us | Pure Air California</title>
        <meta
          name="description"
          content="Contact Pure Air California for professional air duct and dryer vent cleaning services. Get in touch with our team today!"
        />
      </Helmet>
      <NavBar />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="/gallery/jason-hawke-fu7pSuUa2PE-unsplash (Large).jpg"
            alt="Contact Pure Air California"
            className="w-full h-full object-cover"
            loading="eager"
            width="1920"
            height="1080"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Contact Pure Air California
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Have questions or ready to schedule a service? Our team is here to help you breathe easier.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal>
              <div className="space-y-8">
                <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Whether you have questions about our services, want to schedule an appointment, or need a free quote, 
                  we're here to help. Reach out to us using any of the methods below.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-100 p-3 rounded-full">
                      <Phone className="text-brand-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Call Us</h3>
                      <p className="text-gray-600 mb-1">Our team is available to take your call</p>
                      <a href="tel:+12137924145" className="text-brand-600 font-medium text-lg hover:text-brand-700 transition-colors">
                        (213) 792-4145
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-100 p-3 rounded-full">
                      <Mail className="text-brand-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Email Us</h3>
                      <p className="text-gray-600 mb-1">Send us an email and we'll respond promptly</p>
                      <a href="mailto:info@pureaircalifornia.com" className="text-brand-600 font-medium hover:text-brand-700 transition-colors">
                        info@pureaircalifornia.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-100 p-3 rounded-full">
                      <MapPin className="text-brand-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Service Area</h3>
                      <p className="text-gray-600 mb-1">We serve the greater Los Angeles area</p>
                      <p className="text-gray-700">Los Angeles, Beverly Hills, Malibu, Santa Monica, and surrounding areas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-100 p-3 rounded-full">
                      <Clock className="text-brand-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Business Hours</h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        <p className="text-gray-700">Monday - Friday:</p>
                        <p className="text-gray-700">8:00 AM - 6:00 PM</p>
                        <p className="text-gray-700">Saturday:</p>
                        <p className="text-gray-700">9:00 AM - 4:00 PM</p>
                        <p className="text-gray-700">Sunday:</p>
                        <p className="text-gray-700">Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="text-green-600" size={20} />
                    <h3 className="text-lg font-semibold">Our Commitment to You</h3>
                  </div>
                  <p className="text-gray-600">
                    At Pure Air California, we're committed to providing exceptional service. We respond to all inquiries within 24 hours and offer flexible scheduling to accommodate your needs.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <EnhancedContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <EnhancedTrustBadges />

      <Footer />
    </div>
  );
};

export default EnhancedContact;