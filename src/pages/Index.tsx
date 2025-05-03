import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import ProcessStep from '@/components/ProcessStep';
import { Button } from '@/components/ui/button';
import { AirVent, Home, Check, Star, ArrowRight, ShieldCheck, MapPin, ThumbsUp, Zap, BadgeDollarSign, Shield, Award, Clock, Users, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import TrustedBy from '@/components/TrustedBy';
import { useState } from 'react';
import './index.css';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Trust Badges */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="w-5 h-5 text-brand-600" />
              <span className="text-sm font-medium">Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Award className="w-5 h-5 text-brand-600" />
              <span className="text-sm font-medium">NADCA Certified</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5 text-brand-600" />
              <span className="text-sm font-medium">24/7 Emergency Service</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-5 h-5 text-brand-600" />
              <span className="text-sm font-medium">500+ Happy Customers</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <BadgeCheck className="w-5 h-5 text-brand-600" />
              <span className="text-sm font-medium">100% Satisfaction Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      <TrustedBy />
      
      {/* Why Choose Us Section */}
      <section className="section-padding bg-white fade-in">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 font-heading">Why Choose Pure Air California?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <ShieldCheck size={40} className="text-brand-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2 font-heading">Licensed & Insured</h3>
              <p className="text-gray-600">Fully certified, licensed, and insured for your peace of mind.</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin size={40} className="text-brand-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2 font-heading">Local Experts</h3>
              <p className="text-gray-600">Serving Los Angeles for over 10 years with local knowledge and care.</p>
            </div>
            <div className="flex flex-col items-center">
              <ThumbsUp size={40} className="text-brand-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2 font-heading">Satisfaction Guarantee</h3>
              <p className="text-gray-600">We stand behind our work with a 100% satisfaction guarantee.</p>
            </div>
            <div className="flex flex-col items-center">
              <Zap size={40} className="text-brand-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2 font-heading">Fast Response</h3>
              <p className="text-gray-600">Quick scheduling and prompt service for your convenience.</p>
            </div>
            <div className="flex flex-col items-center">
              <BadgeDollarSign size={40} className="text-brand-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2 font-heading">Transparent Pricing</h3>
              <p className="text-gray-600">No hidden fees—just honest, upfront quotes every time.</p>
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
      
      {/* Services Section */}
      <section className="section-padding bg-gray-50 fade-in">
        <div className="container mx-auto">
          <h2 className="section-title text-center">Our Professional Services</h2>
          <p className="section-subtitle text-center">
            Pure Air California provides comprehensive air duct and ventilation cleaning services for 
            both residential and commercial properties throughout Los Angeles.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              title="Residential Air Duct Cleaning" 
              description="Improve your home's air quality, reduce allergens, and enhance HVAC efficiency with our thorough residential air duct cleaning services."
              icon={<Home size={32} />}
              link="/services/residential-air-duct-cleaning"
            />
            <ServiceCard 
              title="Commercial Air Duct Cleaning" 
              description="Create a healthier work environment with our commercial-grade air duct cleaning, designed specifically for offices, retail spaces, and more."
              icon={<AirVent size={32} />}
              link="/services/commercial-air-duct-cleaning"
            />
            <ServiceCard 
              title="Dryer Vent Cleaning" 
              description="Prevent fire hazards and improve dryer efficiency with our professional dryer vent cleaning services for homes and businesses."
              icon={<AirVent size={32} />}
              link="/services/residential-dryer-vent-cleaning"
            />
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="group transition-all duration-300 hover:bg-brand-600 hover:text-white border-brand-600 transform hover:-translate-y-0.5">
              <Link to="/services" className="flex items-center gap-2">
                View All Services 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <div className="border-t border-gray-100 my-8" />
      
      {/* Benefits Section with enhanced visuals */}
      <section className="section-padding fade-in">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                Why Clean Air Ducts Matter for Your Health
              </h2>
              
              <p className="text-lg text-gray-600 mb-8">
                Indoor air can be up to 5 times more polluted than outdoor air. Regular air duct cleaning 
                removes accumulated dust, allergens, and contaminants that circulate through your home or business.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Reduced Allergies & Asthma Symptoms</span> - Remove dust, pollen, and pet dander from your air circulation</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Improved HVAC Efficiency</span> - Clean ducts allow your system to work less, saving energy and money</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Extended Equipment Life</span> - Reduce wear and tear on your HVAC system with clean ducts</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Fire Prevention</span> - Regular dryer vent cleaning reduces fire risk from lint buildup</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Better Indoor Air Quality</span> - Breathe cleaner, fresher air throughout your entire home or business</p>
                </div>
              </div>
              
              <div className="mt-8">
                <Button asChild className="bg-brand-600 hover:bg-brand-700">
                  <Link to="/health-benefits">Learn More About Health Benefits</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1426604966848-d7adac402bff" 
                alt="Clean air in Los Angeles" 
                className="rounded-xl shadow-lg w-full h-auto" 
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-xs">
                <div className="flex items-center gap-2 mb-2">
                  <Star size={20} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-medium text-lg">4.9/5 Rating</span>
                </div>
                <p className="text-gray-600">
                  Based on over 500 verified customer reviews across Los Angeles
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="border-t border-gray-100 my-8" />
      
      {/* Quote Form Section with trust indicators */}
      <section className="section-padding bg-gradient-to-r from-brand-50 to-secondary_brand-50 fade-in">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                Get Your Free Quote Today
              </h2>
              
              <p className="text-lg text-gray-600 mb-8">
                Take the first step toward cleaner air and a healthier environment for your home or business. 
                Our expert team will provide a detailed, no-obligation quote for our services.
              </p>
              
              <div className="space-y-8 mb-8">
                <ProcessStep 
                  number={1} 
                  title="Request a Quote" 
                  description="Fill out our simple form with basic information about your property and needs."
                />
                <ProcessStep 
                  number={2} 
                  title="Get a Consultation" 
                  description="Our specialists will contact you to discuss your specific requirements."
                />
                <ProcessStep 
                  number={3} 
                  title="Receive Your Service" 
                  description="Schedule an appointment at your convenience for our team to perform the service."
                />
                <ProcessStep 
                  number={4} 
                  title="Enjoy Cleaner Air" 
                  description="Experience the difference that professional air duct cleaning makes."
                  isLast
                />
              </div>
            </div>
            
            <div>
              <QuoteForm />
              <p className="text-xs text-gray-500 mt-2 text-center">We never share your information. Your privacy is protected.</p>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur rounded-full px-6 py-3 shadow-sm">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">Your information is secure & confidential</span>
            </div>
          </div>
        </div>
      </section>
      <div className="border-t border-gray-100 my-8" />
      
      {/* Enhanced Testimonials Section */}
      <section className="section-padding bg-white fade-in">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <span className="text-xl font-semibold">4.9/5 Rating</span>
            </div>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">
              Join hundreds of satisfied customers who trust Pure Air California with their air quality needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Jennifer L."
              location="Beverly Hills"
              quote="Pure Air California made a huge difference in my home's air quality. As someone with allergies, I noticed an immediate improvement after their thorough cleaning."
              rating={5}
            />
            <TestimonialCard 
              name="Michael R."
              location="Malibu"
              quote="Professional, efficient, and detail-oriented. Their dryer vent cleaning likely prevented a serious fire hazard in our beach house. Highly recommend!"
              rating={5}
            />
            <TestimonialCard 
              name="Sarah T."
              location="Century City"
              quote="Our office building has never felt so fresh. The commercial cleaning service was minimally disruptive and incredibly effective. All our employees have noticed the difference."
              rating={5}
            />
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/testimonials" className="text-brand-600 hover:text-brand-700 font-medium inline-flex items-center gap-2">
              Read More Reviews
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* FAQ Section with enhanced styling */}
      <section className="py-16 bg-gray-50 fade-in">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <FAQ />
        </div>
      </section>
      <div className="border-t border-gray-100 my-8" />
      
      {/* CTA Section with trust badges */}
      <section className="py-16 bg-cta-pattern fade-in">
        <div className="container mx-auto text-center">
          <h2 className="section-title text-white">Ready to Experience Cleaner, Healthier Air?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Schedule your professional air duct or dryer vent cleaning today and breathe easier tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-brand-600 hover:bg-gray-100 transform hover:-translate-y-0.5 transition-all duration-300" asChild>
              <Link to="/quote">Get a Free Quote</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-600 transform hover:-translate-y-0.5 transition-all duration-300" asChild>
              <a href="tel:2137924145">Call (213) 792-4145</a>
            </Button>
          </div>
          
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2 text-white/90">
              <BadgeCheck className="w-5 h-5" />
              <span className="text-sm">100% Satisfaction Guaranteed</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 md:hidden z-50">
        <div className="flex justify-between gap-4">
          <Button className="w-1/2 bg-brand-600" asChild>
            <Link to="/quote">Get Quote</Link>
          </Button>
          <Button variant="outline" className="w-1/2" asChild>
            <a href="tel:2137924145">Call Now</a>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;

const faqData = [
  {
    question: "How often should I have my air ducts cleaned?",
    answer: "We recommend professional air duct cleaning every 2-3 years, or more frequently if you have pets, allergies, or recent renovations."
  },
  {
    question: "Is air duct cleaning safe for my HVAC system?",
    answer: "Yes, our certified technicians use industry-approved methods and equipment to safely clean your ducts without damaging your HVAC system."
  },
  {
    question: "How long does the cleaning process take?",
    answer: "Most residential air duct cleaning jobs are completed in 2-4 hours. Larger homes or commercial properties may take longer."
  },
  {
    question: "Will air duct cleaning help with allergies?",
    answer: "Yes, removing dust, pollen, and other allergens from your ductwork can significantly improve indoor air quality and reduce allergy symptoms."
  },
  {
    question: "Do you offer free quotes?",
    answer: "Absolutely! Contact us for a free, no-obligation quote for your air duct or dryer vent cleaning needs."
  }
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-4">
      {faqData.map((item, idx) => (
        <div key={idx} className="border rounded-lg bg-white shadow-sm">
          <button
            className="w-full text-left px-6 py-4 font-semibold text-lg flex justify-between items-center focus:outline-none"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            aria-expanded={openIndex === idx}
          >
            {item.question}
            <span className={`ml-2 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`}>▼</span>
          </button>
          {openIndex === idx && (
            <div className="px-6 pb-4 text-gray-700 animate-fade-in">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
