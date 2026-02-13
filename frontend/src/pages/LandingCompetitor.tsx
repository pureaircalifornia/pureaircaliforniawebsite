import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, X, Star, Shield, Award, Clock, ArrowRight, Phone } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import EnhancedQuoteForm from '@/components/EnhancedQuoteForm';
import EnhancedTrustBadges from '@/components/EnhancedTrustBadges';
import CTASection from '@/components/CTASection';

const LandingCompetitor = () => {
    // Track page view
    useEffect(() => {
        if (window.gtag) {
            window.gtag('event', 'page_view', {
                page_title: 'Competitor Comparison Landing Page',
                page_path: '/compare'
            });
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
            <Helmet>
                <title>Pure Air California vs. The Competition | Best Value Guarantee</title>
                <meta
                    name="description"
                    content="Don't get scammed by bait-and-switch offers. See why 1,200+ Los Angeles homeowners choose Pure Air California. NADCA Certified & Upfront Pricing."
                />
            </Helmet>

            <NavBar />

            <main>
                {/* Comparison Hero */}
                <div className="bg-slate-900 text-white pt-32 pb-20">
                    <div className="container mx-auto px-4 text-center">
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-sm font-bold mb-6">
                            1,200+ 5-Star Reviews
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Tired of Hidden Fees & <br className="hidden md:block" /> No-Show Contractors?
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                            Experience the Pure Air California difference. We provide honest, upfront pricing and certified expertise—no gimmicks, just clean air.
                        </p>
                    </div>
                </div>

                {/* The Comparison Table - Centerpiece */}
                <section className="py-12 -mt-16 container mx-auto px-4 relative z-10">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
                        <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
                            <div className="p-6 md:p-8 flex items-end">
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Features</span>
                            </div>
                            <div className="p-6 md:p-8 bg-brand-600 text-white text-center relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
                                <h3 className="font-black text-xl md:text-2xl">Pure Air CA</h3>
                                <div className="flex justify-center mt-2">
                                    <Star className="fill-yellow-400 text-yellow-400 h-5 w-5" />
                                    <Star className="fill-yellow-400 text-yellow-400 h-5 w-5" />
                                    <Star className="fill-yellow-400 text-yellow-400 h-5 w-5" />
                                    <Star className="fill-yellow-400 text-yellow-400 h-5 w-5" />
                                    <Star className="fill-yellow-400 text-yellow-400 h-5 w-5" />
                                </div>
                            </div>
                            <div className="p-6 md:p-8 text-center bg-gray-100 flex flex-col justify-center">
                                <h3 className="font-bold text-gray-600 text-lg md:text-xl">"The Other Guys"</h3>
                                <p className="text-xs text-gray-400 mt-1">Typical Discount Cleaner</p>
                            </div>
                        </div>

                        {/* Table Rows */}
                        {[
                            { feature: "NADCA Certified Pros", us: true, them: false },
                            { feature: "Upfront Pricing (No Surprise Fees)", us: true, them: false },
                            { feature: "Truck-Mounted Equipment", us: true, them: false },
                            { feature: "Background Checked Team", us: true, them: false },
                            { feature: "Before & After Photos Provided", us: true, them: true },
                            { feature: "1,200+ Verified 5-Star Reviews", us: true, them: false },
                            { feature: "Licensed, Bonded & Insured", us: true, them: "Maybe?" },
                        ].map((row, i) => (
                            <div key={i} className={`grid grid-cols-3 border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-gray-50 transition-colors`}>
                                <div className="p-4 md:p-6 flex items-center font-medium text-gray-800 text-sm md:text-base">
                                    {row.feature}
                                </div>
                                <div className="p-4 md:p-6 flex justify-center items-center bg-brand-50/30 border-x border-brand-100">
                                    <div className="bg-green-100 p-1.5 rounded-full">
                                        <Check className="text-green-600 h-6 w-6" strokeWidth={3} />
                                    </div>
                                </div>
                                <div className="p-4 md:p-6 flex justify-center items-center">
                                    {row.them === true ? (
                                        <div className="bg-green-100 p-1.5 rounded-full opacity-50">
                                            <Check className="text-green-600 h-5 w-5" />
                                        </div>
                                    ) : row.them === "Maybe?" ? (
                                        <span className="text-gray-400 font-bold italic">?</span>
                                    ) : (
                                        <div className="bg-red-100 p-1.5 rounded-full">
                                            <X className="text-red-500 h-5 w-5" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        <div className="p-8 bg-gray-50 text-center">
                            <h3 className="text-2xl font-bold mb-4">Ready to experience the best?</h3>
                            <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-lg px-8 py-6 h-auto shadow-xl rounded-full">
                                <a href="tel:2137924145" className="flex items-center gap-2">
                                    <Phone className="fill-current" size={20} />
                                    Call for a Free Quote
                                </a>
                            </Button>
                        </div>
                    </div>
                </section>

                <div className="bg-gray-50 pb-20 pt-10">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold mb-4">Don't Settle for Less Than Perfect Air</h2>
                            <p className="text-gray-600">Get a guaranteed quote today.</p>
                        </div>
                        <EnhancedQuoteForm />
                    </div>
                </div>

                <EnhancedTrustBadges />
                <CTASection />
            </main>

            <Footer />
        </div>
    );
};

export default LandingCompetitor;
