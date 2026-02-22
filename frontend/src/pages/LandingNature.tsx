import React from 'react';
import { Helmet } from 'react-helmet-async';
import SEOProvider from '@/components/SEOProvider';
import SchemaMarkup from '@/components/SchemaMarkup';
import { seoConfig } from '@/utils/seo/seoConfig';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Phone, Calendar, CheckCircle, ArrowRight, Shield, Award, Star, Clock, Leaf, Wind, Heart } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { motion, AnimatePresence } from 'framer-motion';
import EnhancedTrustBadges from '@/components/EnhancedTrustBadges';
import EnhancedQuoteForm from '@/components/EnhancedQuoteForm';
import FeaturedServices from '@/components/FeaturedServices';
import ServiceArea from '@/components/ServiceArea';
import WhyChooseUs from '@/components/WhyChooseUs';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import HeroSlider from '@/components/HeroSlider';
import { useState, useEffect } from 'react';

// Inspirational breathing quotes
const breathingQuotes = [
    { text: "Breathe in the fresh. Breathe out the stress.", author: "Pure Air California" },
    { text: "Clean air isn't a luxury—it's a foundation for life.", author: "Dr. Andrew Weil" },
    { text: "The air we breathe shapes how we feel, think, and live.", author: "Environmental Health" },
    { text: "Every breath matters. Make each one count.", author: "Pure Air California" },
    { text: "Nature's greatest gift is the air we breathe.", author: "Wellness Wisdom" },
];



// Rotating quote component
const RotatingQuote = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % breathingQuotes.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-[100px] flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light italic text-white/90 mb-3 leading-relaxed">
                        "{breathingQuotes[currentIndex].text}"
                    </blockquote>
                    <cite className="text-sm text-emerald-300 font-medium not-italic">
                        — {breathingQuotes[currentIndex].author}
                    </cite>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const LandingNature = () => {
    // Track A/B variant for analytics
    useEffect(() => {
        if (window.gtag) {
            window.gtag('event', 'ab_test_view', {
                event_category: 'ab_test',
                event_label: 'landing_nature_variant',
                variant: 'B'
            });
        }
        // Store variant in session for consistency
        sessionStorage.setItem('ab_landing_variant', 'B');
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <SEOProvider
                title="Breathe Easier Today | Pure Air California | Professional Air Duct Cleaning LA"
                description="Breathe fresher, cleaner air in your home. Pure Air California offers expert air duct & dryer vent cleaning in Los Angeles. NADCA certified. Free estimates! (213) 792-4145"
                keywords={["breathe easier", "clean air home", "air duct cleaning Los Angeles", "fresh air Los Angeles", "indoor air quality", "healthy home air", "NADCA certified air duct cleaning"]}
                path="/"
                disableDefaultSchema
            >
                <SchemaMarkup
                    schema={seoConfig.schema.localBusiness}
                    showLocalBusiness={false}
                    showReviews={true}
                    showServiceArea={true}
                    showFAQ={true}
                />
            </SEOProvider>

            <NavBar />
            <main>
                {/* Nature-Inspired Hero Section */}
                <div className="relative min-h-screen flex items-center">
                    <HeroSlider theme="nature" interval={6000} />

                    <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="text-center lg:text-left">
                                {/* Rotating Breathing Quote */}
                                <div className="mb-8">
                                    <RotatingQuote />
                                </div>

                                {/* Main headline */}
                                <motion.h1
                                    className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-white"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    style={{ textShadow: '0 0 30px rgba(255,255,255,0.2), 0 0 60px rgba(100,200,150,0.15)' }}
                                >
                                    Professional Air Duct Cleaning for{' '}
                                    <span className="text-emerald-400">Healthier Living</span>
                                </motion.h1>

                                <motion.p
                                    className="text-lg md:text-xl mb-10 text-gray-200 max-w-xl mx-auto lg:mx-0"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    Transform your indoor environment. Remove allergens, dust, and pollutants
                                    to create a sanctuary of fresh, clean air for your family.
                                </motion.p>

                                {/* CTA Buttons */}
                                <motion.div
                                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                >
                                    <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold px-8 py-6 h-auto shadow-2xl rounded-full">
                                        <a href="tel:2137924145" className="flex items-center gap-2">
                                            <Phone className="fill-current" size={22} />
                                            <span>Call (213) 792-4145</span>
                                        </a>
                                    </Button>
                                    <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 backdrop-blur-md text-lg py-6 h-auto rounded-full">
                                        <Link to="/quote">
                                            <Wind className="mr-2" size={20} />
                                            Free Air Quality Quote
                                        </Link>
                                    </Button>
                                </motion.div>

                                {/* Nature-themed trust indicators */}
                                <motion.div
                                    className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                >
                                    {[
                                        { icon: Leaf, label: "Eco-Friendly", sub: "Green Methods" },
                                        { icon: Heart, label: "Health First", sub: "Family Safe" },
                                        { icon: Award, label: "NADCA", sub: "Certified" },
                                        { icon: Star, label: "5-Star", sub: "Reviews" }
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white/10 backdrop-blur-md p-4 rounded-2xl flex flex-col items-center text-center border border-white/10 group hover:bg-white/15 transition-all duration-300">
                                            <item.icon className="mb-2 text-emerald-400 group-hover:scale-110 transition-transform" size={24} />
                                            <span className="text-sm font-bold text-white block">{item.label}</span>
                                            <p className="text-[10px] text-gray-300 uppercase tracking-wider">{item.sub}</p>
                                        </div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Hero Form */}
                            <motion.div
                                className="hidden lg:block"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                <EnhancedQuoteForm />
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Benefits Banner - Nature Theme */}
                <div className="relative py-10 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <pattern id="leaves" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                <circle cx="10" cy="10" r="1" fill="white" opacity="0.3" />
                            </pattern>
                            <rect fill="url(#leaves)" width="100" height="100" />
                        </svg>
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                            {[
                                { icon: Wind, label: "Cleaner Air, Better Health", color: "text-emerald-300" },
                                { icon: Leaf, label: "Eco-Conscious Cleaning", color: "text-green-300" },
                                { icon: Heart, label: "Breathe with Confidence", color: "text-teal-300" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm py-5 px-6 rounded-2xl border border-white/10"
                                    whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.15)" }}
                                >
                                    <item.icon size={26} className={item.color} />
                                    <span className="font-semibold text-white tracking-tight">{item.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Enhanced Trust Badges */}
                <EnhancedTrustBadges />

                {/* Mobile Quote Form */}
                <div className="lg:hidden py-10 bg-gradient-to-br from-emerald-50 to-teal-50">
                    <div className="container mx-auto px-4">
                        <ScrollReveal>
                            <h2 className="text-2xl font-bold text-center mb-2 text-slate-900">Start Breathing Better Today</h2>
                            <p className="text-center text-slate-600 mb-6">Get your free air quality assessment</p>
                            <EnhancedQuoteForm />
                        </ScrollReveal>
                    </div>
                </div>

                <FeaturedServices />

                {/* Nature-themed CTA Section */}
                <section className="bg-gradient-to-r from-emerald-700 to-teal-700 py-14 text-white overflow-hidden relative">
                    <div className="absolute inset-0 opacity-10">
                        <motion.div
                            className="absolute inset-0"
                            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
                            style={{
                                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                                backgroundSize: '30px 30px'
                            }}
                        />
                    </div>
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <Leaf className="w-12 h-12 mx-auto mb-4 text-emerald-300" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Air Quality?</h2>
                        <p className="text-xl mb-8 text-emerald-100 max-w-2xl mx-auto">
                            Join thousands of Los Angeles families who've discovered the difference clean air makes.
                        </p>
                        <Button asChild size="lg" className="bg-white text-emerald-700 hover:bg-gray-100 font-bold text-lg px-10 py-6 h-auto shadow-xl rounded-full hover:scale-105 transition-transform">
                            <a href="tel:2137924145" className="flex items-center gap-2">
                                <Phone className="fill-current" size={24} />
                                Call (213) 792-4145
                            </a>
                        </Button>
                    </div>
                </section>

                <WhyChooseUs />

                {/* Process Section with Nature Theme */}
                <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
                    <div className="container mx-auto px-4">
                        <ScrollReveal>
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900">Your Path to Fresher Air</h2>
                            <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto mb-14">
                                A simple, stress-free process to healthier indoor living
                            </p>
                        </ScrollReveal>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {[
                                {
                                    step: 1,
                                    title: 'Free Consultation',
                                    desc: 'Tell us about your home and air quality concerns. We\'ll provide a no-obligation assessment and transparent quote.',
                                    icon: Phone,
                                    link: '/quote',
                                    delay: 0.1
                                },
                                {
                                    step: 2,
                                    title: 'Expert Care',
                                    desc: 'Our NADCA-certified technicians use eco-friendly methods to thoroughly clean your entire duct system.',
                                    icon: Leaf,
                                    link: '/services',
                                    delay: 0.2
                                },
                                {
                                    step: 3,
                                    title: 'Breathe Fresh',
                                    desc: 'Enjoy noticeably cleaner, fresher air throughout your home. Most customers feel the difference immediately.',
                                    icon: Wind,
                                    link: '/health-benefits',
                                    delay: 0.3
                                }
                            ].map((item, i) => (
                                <ScrollReveal key={i} delay={item.delay}>
                                    <div className="bg-white p-10 rounded-3xl shadow-lg relative group hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-emerald-100">
                                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform z-10">
                                            <item.icon size={24} />
                                        </div>
                                        <div className="text-center pt-6">
                                            <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider">Step {item.step}</span>
                                            <h3 className="text-2xl font-bold mt-2 mb-4 text-slate-900">{item.title}</h3>
                                            <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                                                {item.desc}
                                            </p>
                                            <Button asChild variant="link" className="p-0 text-emerald-600 font-bold hover:text-emerald-800 transition-colors group">
                                                <Link to={item.link} className="inline-flex items-center">
                                                    Learn More
                                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </Button>
                                        </div>
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

export default LandingNature;
