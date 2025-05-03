import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import ProcessStep from '@/components/ProcessStep';
import { Button } from '@/components/ui/button';
import { AirVent, Home, Check, Star, ArrowRight, ShieldCheck, MapPin, ThumbsUp, Zap, BadgeDollarSign } from 'lucide-react';
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
      <TrustedBy />
      {/* Why Choose Us Section */}
      <section className="py-12 bg-white fade-in">
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
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Our Professional Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Pure Air California provides comprehensive air duct and ventilation cleaning services for 
              both residential and commercial properties throughout Los Angeles.
            </p>
          </div>
          
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
            <Button asChild variant="outline" className="group transition-all duration-200 hover:bg-brand-600 hover:text-white border-brand-600">
              <Link to="/services" className="flex items-center gap-2">
                View All Services 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <div className="border-t border-gray-100 my-8" />
      
      {/* Benefits Section */}
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
      
      {/* Quote Form Section */}
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
        </div>
      </section>
      <div className="border-t border-gray-100 my-8" />
      
      {/* Testimonials Section */}
      <section className="section-padding bg-white fade-in">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from our satisfied customers across Los Angeles who have experienced the Pure Air California difference.
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
        </div>
      </section>
      <div className="border-t border-gray-100 my-8" />
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 fade-in">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <FAQ />
        </div>
      </section>
      <div className="border-t border-gray-100 my-8" />
      
      {/* CTA Section */}
      <section className="py-16 bg-cta-pattern fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Ready to Experience Cleaner, Healthier Air?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Schedule your professional air duct or dryer vent cleaning today and breathe easier tomorrow. 
              Our expert technicians serve all areas of Los Angeles.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-brand-600 hover:bg-brand-700" asChild>
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-brand-500 text-brand-700 hover:bg-brand-50" asChild>
                <a href="tel:2137924145">Call (213) 792-4145</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
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
