import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Phone, AlertTriangle, ShieldCheck, Flame, Clock, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { motion } from 'framer-motion';
import EnhancedTrustBadges from '@/components/EnhancedTrustBadges';
import EnhancedQuoteForm from '@/components/EnhancedQuoteForm';
import ServiceArea from '@/components/ServiceArea';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';

const LandingDryerSafety = () => {
    // Track page view
    useEffect(() => {
        if (window.gtag) {
            window.gtag('event', 'page_view', {
                page_title: 'Dryer Vent Safety Landing Page',
                page_path: '/dryer-safety'
            });
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Helmet>
                <title>Prevent Dryer Fires | $99 Dryer Vent Cleaning Special | Pure Air California</title>
                <meta
                    name="description"
                    content="Don't risk a house fire! Professional dryer vent cleaning in Los Angeles for just $99. Same-day service available. Call (213) 792-4145 now."
                />
            </Helmet>

            <NavBar />

            <main>
                {/* Urgent Hero Section */}
                <div className="relative bg-slate-900 text-white min-h-[90vh] flex items-center overflow-hidden">
                    {/* Background with Fire/Safety Theme Overlay */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/70 z-10" />
                        <img
                            src="/images/dryer-vent-cleaning.jpg"
                            alt="Clogged dryer vent fire hazard"
                            className="w-full h-full object-cover opacity-40"
                        />
                    </div>

                    <div className="container mx-auto px-4 py-20 relative z-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="inline-flex items-center gap-2 bg-red-600/90 text-white px-4 py-2 rounded-full font-bold mb-6 animate-pulse"
                                >
                                    <AlertTriangle size={20} className="fill-white" />
                                    <span>WARNING: Fire Hazard Alert</span>
                                </motion.div>

                                <motion.h1
                                    className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    Is Your Clothes Dryer a <span className="text-orange-500">Ticking Time Bomb?</span>
                                </motion.h1>

                                <motion.p
                                    className="text-xl md:text-2xl text-gray-300 mb-8 max-w-xl"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Over 15,000 house fires are caused by clogged dryer vents every year. Protect your family today.
                                </motion.p>

                                <motion.div
                                    className="flex flex-col sm:flex-row gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white text-lg font-bold px-8 py-7 h-auto shadow-lg shadow-orange-900/50 rounded-xl hover:scale-105 transition-all">
                                        <a href="tel:2137924145" className="flex items-center gap-2">
                                            <Phone className="fill-current" size={24} />
                                            <span>Call for $99 Safety Check</span>
                                        </a>
                                    </Button>
                                    <div className="flex items-center gap-2 text-sm text-gray-400 mt-2 sm:mt-0">
                                        <Clock size={16} className="text-orange-500" />
                                        <span>Same-Day Service Available</span>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Hero Form */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-3xl"
                            >
                                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                                    <div className="bg-orange-600 p-4 text-center">
                                        <h3 className="text-xl font-bold text-white">Check Availability in Your Area</h3>
                                        <p className="text-orange-100 text-sm">Limited spots for $99 Special</p>
                                    </div>
                                    <div className="p-2">
                                        <EnhancedQuoteForm />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Safety Stats Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            {[
                                {
                                    icon: Flame,
                                    color: "text-red-600",
                                    bg: "bg-red-100",
                                    stat: "15,000+",
                                    label: "Annual Dryer Fires",
                                    desc: "Clogged vents are the #1 cause"
                                },
                                {
                                    icon: ShieldCheck,
                                    color: "text-green-600",
                                    bg: "bg-green-100",
                                    stat: "100%",
                                    label: "Peace of Mind",
                                    desc: "After our professional cleaning"
                                },
                                {
                                    icon: Clock,
                                    color: "text-blue-600",
                                    bg: "bg-blue-100",
                                    stat: "45 Min",
                                    label: "Average Service Time",
                                    desc: "Fast, efficient, and mess-free"
                                }
                            ].map((item, i) => (
                                <ScrollReveal key={i} delay={i * 0.1}>
                                    <div className="p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow group">
                                        <div className={`w-16 h-16 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                                            <item.icon className={item.color} size={32} />
                                        </div>
                                        <h3 className={`text-3xl font-black mb-2 ${item.color}`}>{item.stat}</h3>
                                        <h4 className="text-xl font-bold text-gray-800 mb-2">{item.label}</h4>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Warning Signs */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <ScrollReveal>
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                                5 Signs Your Dryer Vent is Clogged
                            </h2>
                        </ScrollReveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {[
                                "Clothes take more than one cycle to dry",
                                "Dryer is hot to the touch while running",
                                "Burning smell coming from the laundry room",
                                "Vent hood flap outside doesn't open",
                                "Visible lint buildup behind the dryer"
                            ].map((sign, i) => (
                                <ScrollReveal key={i} delay={i * 0.1}>
                                    <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm border border-orange-100">
                                        <div className="bg-orange-100 p-2 rounded-full">
                                            <AlertTriangle className="text-orange-600" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Warning Sign #{i + 1}</h4>
                                            <p className="text-gray-600">{sign}</p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                            {/* CTA Card in Grid */}
                            <div className="bg-orange-600 p-6 rounded-xl shadow-lg flex flex-col justify-center items-center text-center text-white transform hover:scale-105 transition-transform cursor-pointer">
                                <h4 className="font-bold text-xl mb-4">Notice Any of These?</h4>
                                <Button asChild variant="secondary" className="w-full font-bold">
                                    <a href="tel:2137924145">Call Now (213) 792-4145</a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <EnhancedTrustBadges />

                {/* Service Area Wrapper */}
                <ServiceArea />

                <FAQSection />

                <CTASection />
            </main>

            <Footer />
        </div>
    );
};

export default LandingDryerSafety;
