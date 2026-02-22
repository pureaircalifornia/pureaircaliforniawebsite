import React from 'react';
import { Helmet } from 'react-helmet-async';
import SEOProvider from '@/components/SEOProvider';
import SchemaMarkup from '@/components/SchemaMarkup';
import { seoConfig } from '@/utils/seo/seoConfig';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Phone, Calendar, CheckCircle, ArrowRight, Shield, Award, Star, MapPin, Clock, Users } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { motion } from 'framer-motion';
import EnhancedTrustBadges from '@/components/EnhancedTrustBadges';
import EnhancedQuoteForm from '@/components/EnhancedQuoteForm';
import FeaturedServices from '@/components/FeaturedServices';
import ServiceArea from '@/components/ServiceArea';
import WhyChooseUs from '@/components/WhyChooseUs';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import HeroSlider from '@/components/HeroSlider';
import ReviewMarquee from '@/components/ReviewMarquee';
import AirQualityQuiz from '@/components/AirQualityQuiz';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const EnhancedLanding = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOProvider
        title="#1 Air Duct Cleaning Company in Los Angeles | Pure Air California | (213) 792-4145"
        description="Los Angeles' top-rated air duct & dryer vent cleaning company. NADCA certified, 1,200+ 5-star reviews, same-day service available. Free estimates! Call (213) 792-4145."
        keywords={["air duct cleaning Los Angeles", "best air duct cleaning company Los Angeles", "dryer vent cleaning Los Angeles", "HVAC cleaning Los Angeles", "air duct cleaning near me", "duct cleaning LA", "indoor air quality Los Angeles", "NADCA certified air duct cleaning"]}
        path="/"
        disableDefaultSchema // We will provide LocalBusiness schema explicitly
      >
        <SchemaMarkup
          schema={seoConfig.schema.localBusiness}
          showLocalBusiness={false} // Disable default LocalBusiness to avoid duplication with 'schema' prop
          showReviews={true}
          showServiceArea={true}
          showFAQ={true}
        />
      </SEOProvider>

      <NavBar />
      <main>
        {/* Enhanced Hero Section */}
        <div className="relative bg-gray-900 text-white min-h-screen flex items-center">
          {/* Hero Image Slider */}
          <HeroSlider theme="default" interval={6000} />

          {/* Hero content */}
          <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Breathe Easier with Professional Air Duct & Dryer Vent Cleaning
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl mb-8 text-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Improve your indoor air quality and energy efficiency with Pure Air California's expert cleaning services.
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Button asChild size="lg" className="btn-premium text-white text-lg font-bold px-8 py-6 h-auto shadow-2xl">
                    <a href="tel:2137924145" className="flex items-center gap-2">
                      <Phone className="mr-1 fill-current" size={24} />
                      <span>Call Now: (213) 792-4145</span>
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-md text-lg py-6 h-auto">
                    <Link to="/quote">
                      <ArrowRight className="mr-2" size={20} />
                      Get Free Quote
                    </Link>
                  </Button>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {[
                    { icon: Shield, label: "Licensed", sub: "Fully Insured" },
                    { icon: Star, label: "5-Star", sub: "Top Rated", color: "text-yellow-400" },
                    { icon: Award, label: "NADCA", sub: "Certified Pro" },
                    { icon: Clock, label: "Same-Day", sub: "Emergency" }
                  ].map((item, i) => (
                    <div key={i} className="glass-premium p-4 rounded-2xl flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300">
                      <item.icon className={`mb-2 ${item.color || 'text-sky-400'} group-hover:scale-110 transition-transform`} size={24} />
                      <span className="text-sm font-bold block text-white">{item.label}</span>
                      <p className="text-[10px] text-white/70 uppercase tracking-tighter">{item.sub}</p>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Hero Form */}
              <motion.div
                className="hidden lg:block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <EnhancedQuoteForm />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Benefits Banner with Premium Styling */}
        <div className="relative py-8 bg-slate-900 overflow-hidden border-y border-white/5">
          <div className="absolute inset-0 bg-mesh opacity-5"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {[
                { icon: Phone, label: "24/7 Emergency Service", color: "text-sky-400" },
                { icon: Calendar, label: "Flexible Scheduling", color: "text-blue-400" },
                { icon: CheckCircle, label: "100% Satisfaction", color: "text-green-400" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-center gap-3 glass-premium py-4 px-6 rounded-2xl border-white/5"
                  whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <item.icon size={24} className={item.color} />
                  <span className="font-bold tracking-tight text-white">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Trust Badges */}
        <EnhancedTrustBadges />

        {/* Dynamic Social Proof Marquee */}
        <ReviewMarquee />

        {/* Inspirational Quotes About Breath & Air */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sky-300 text-sm font-medium mb-4">
                  Words of Wisdom
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  The Importance of <span className="text-gradient-shine">Clean Air</span>
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Throughout history, great minds have recognized the vital connection between air quality and life itself
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote: "Breath is the bridge which connects life to consciousness, which unites your body to your thoughts.",
                  author: "Thich Nhat Hanh",
                  role: "Buddhist Monk & Peace Activist"
                },
                {
                  quote: "The quality of our breath expresses our inner feelings.",
                  author: "T.K.V. Desikachar",
                  role: "Yoga Master"
                },
                {
                  quote: "When you own your breath, nobody can steal your peace.",
                  author: "Ancient Proverb",
                  role: "Eastern Wisdom"
                },
                {
                  quote: "Clean air is a basic human right. Everyone deserves to breathe fresh, pure air.",
                  author: "World Health Organization",
                  role: "Global Health Authority"
                },
                {
                  quote: "The air we breathe, the water we drink, and the land we inhabit are not only critical elements in the quality of life, but are a reflection of the quality of our stewardship.",
                  author: "Gerald Ford",
                  role: "38th U.S. President"
                },
                {
                  quote: "A breath of fresh air can transform your entire day, your mood, and your outlook on life.",
                  author: "Deepak Chopra",
                  role: "Wellness Pioneer"
                }
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <motion.div
                    className="glass-premium p-8 rounded-3xl h-full flex flex-col justify-between group hover:scale-[1.02] transition-all duration-500 border border-white/10"
                    whileHover={{ y: -5 }}
                  >
                    <div>
                      <svg className="w-10 h-10 text-sky-400 mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-lg text-gray-200 italic leading-relaxed mb-6">
                        "{item.quote}"
                      </p>
                    </div>
                    <div className="border-t border-white/10 pt-4">
                      <p className="font-bold text-white">{item.author}</p>
                      <p className="text-sm text-sky-300">{item.role}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.4}>
              <div className="text-center mt-16">
                <p className="text-xl text-gray-300 mb-6">
                  Join thousands of families breathing cleaner, healthier air every day
                </p>
                <Button asChild size="lg" className="btn-premium text-white text-lg font-bold px-8 py-6 h-auto shadow-2xl">
                  <Link to="/quote" className="flex items-center gap-2">
                    <ArrowRight className="mr-1" size={20} />
                    Start Your Clean Air Journey
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Mobile Quote Form (visible only on mobile) */}
        <div className="lg:hidden py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-2xl font-bold text-center mb-6">Get Your Free Quote</h2>
              <EnhancedQuoteForm />
            </ScrollReveal>
          </div>
        </div>

        {/* Gamified Lead Gen: Air Quality Check */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Are you breathing clean air?</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">Take our quick 30-second assessment to find out if your home's air quality is putting your health at risk.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <AirQualityQuiz />
            </ScrollReveal>
          </div>
        </section>

        <FeaturedServices />

        {/* Interstitial Call CTA */}
        <section className="bg-brand-700 py-12 text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need an Estimate Right Now?</h2>
            <p className="text-xl mb-8 text-brand-100 max-w-2xl mx-auto">Skip the form and talk to a certified expert immediately. We provide free, accurate quotes over the phone.</p>
            <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-gray-100 font-bold text-lg px-8 py-6 h-auto shadow-lg hover:scale-105 transition-transform">
              <a href="tel:2137924145" className="flex items-center gap-2">
                <Phone className="fill-current" size={24} />
                Call (213) 792-4145
              </a>
            </Button>
          </div>
        </section>

        <WhyChooseUs />

        {/* Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Simple Process</h2>
              <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                Getting cleaner air in your home or business is easy with our straightforward process
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: 1,
                  title: 'Schedule a Free Quote',
                  desc: 'Fill out our simple form or give us a call to schedule your free, no-obligation locally-based quote.',
                  link: '/quote',
                  btnText: 'Get Started',
                  delay: 0.1
                },
                {
                  step: 2,
                  title: 'Professional Inspection',
                  desc: 'Our certified technicians will inspect your system and provide a detailed assessment and firm quote.',
                  link: '/services',
                  btnText: 'Our Approach',
                  delay: 0.2
                },
                {
                  step: 3,
                  title: 'Thorough Cleaning',
                  desc: 'We\'ll perform a comprehensive cleaning of your system using state-of-the-art NADCA-certified equipment.',
                  link: '/services',
                  btnText: 'Our Services',
                  delay: 0.3
                }
              ].map((item, i) => (
                <ScrollReveal key={i} delay={item.delay}>
                  <div className="glass-card p-10 relative group hover:scale-[1.02] transition-all duration-500 h-full flex flex-col">
                    <div className="absolute -top-5 -left-5 w-14 h-14 rounded-2xl bg-brand-600 text-white flex items-center justify-center text-2xl font-bold shadow-xl group-hover:rotate-12 transition-transform duration-500 z-20">
                      {item.step}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 mt-2 text-slate-900">{item.title}</h3>
                    <p className="text-slate-600 mb-8 leading-relaxed flex-grow">
                      {item.desc}
                    </p>
                    <Button asChild variant="link" className="p-0 text-brand-600 font-bold hover:text-brand-800 transition-colors w-fit group">
                      <Link to={item.link} className="inline-flex items-center">
                        {item.btnText}
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <ServiceArea />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default EnhancedLanding;
