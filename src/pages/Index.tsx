
import Hero from '@/components/Hero';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import ProcessStep from '@/components/ProcessStep';
import { Button } from '@/components/ui/button';
import { AirVent, Home, Check, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Services Section */}
      <section className="section-padding bg-gray-50">
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
              link="/services/residential"
            />
            <ServiceCard 
              title="Commercial Air Duct Cleaning" 
              description="Create a healthier work environment with our commercial-grade air duct cleaning, designed specifically for offices, retail spaces, and more."
              icon={<AirVent size={32} />}
              link="/services/commercial"
            />
            <ServiceCard 
              title="Dryer Vent Cleaning" 
              description="Prevent fire hazards and improve dryer efficiency with our professional dryer vent cleaning services for homes and businesses."
              icon={<AirVent size={32} />}
              link="/services/dryer-vent"
            />
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="group">
              <Link to="/services" className="flex items-center gap-2">
                View All Services 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="section-padding">
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
      
      {/* Quote Form Section */}
      <section className="section-padding bg-gradient-to-r from-brand-50 to-secondary_brand-50">
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
            
            <QuoteForm />
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="section-padding bg-white">
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
      
      {/* CTA Section */}
      <section className="py-16 bg-cta-pattern">
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
