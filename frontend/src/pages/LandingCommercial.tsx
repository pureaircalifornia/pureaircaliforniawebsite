import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Building2, Briefcase, Users, CheckCircle, Phone, FileText, Settings, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import EnhancedQuoteForm from '@/components/EnhancedQuoteForm';
import EnhancedTrustBadges from '@/components/EnhancedTrustBadges';
import CTASection from '@/components/CTASection';

const LandingCommercial = () => {
    // Track page view
    useEffect(() => {
        if (window.gtag) {
            window.gtag('event', 'page_view', {
                page_title: 'Commercial Services Landing Page',
                page_path: '/commercial-services'
            });
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Helmet>
                <title>Commercial Air Duct Cleaning Los Angeles | Industrial & HIPAA Compliant | Pure Air CA</title>
                <meta
                    name="description"
                    content="Los Angeles' trusted partner for commercial HVAC restoration. Serving hospitals, schools, offices, and manufacturing since 1984. NADCA & OSHA compliant."
                />
            </Helmet>

            <NavBar />

            <main>
                {/* Industrial/Professional Hero */}
                <div className="relative bg-slate-900 text-white overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/60 z-10" />
                        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
                    </div>

                    <div className="container mx-auto px-4 py-24 relative z-20">
                        <div className="flex flex-col lg:flex-row gap-16">
                            <div className="lg:w-1/2">
                                <span className="text-brand-400 font-bold tracking-widest uppercase text-sm mb-4 block">Commercial & Industrial Division</span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                    Commercial HVAC Restoration Experts
                                </h1>
                                <p className="text-xl text-gray-300 mb-8 max-w-xl">
                                    Ensure OSHA compliance and optimal indoor air quality for your facility.
                                    We specialize in large-scale duct cleaning for hospitals, schools, and office buildings.
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-10">
                                    {[
                                        "NADCA Certified Technicians",
                                        "OSHA & HIPAA Compliant",
                                        "After-Hours Service Available",
                                        "Detailed Post-Project Reporting"
                                    ].map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <CheckCircle className="text-brand-500 shrink-0" size={20} />
                                            <span className="text-gray-200 text-sm font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700 text-white text-lg font-bold px-8 py-6 h-auto shadow-xl rounded-lg">
                                        <a href="tel:2137924145" className="flex items-center gap-2">
                                            <Phone className="fill-current" size={20} />
                                            <span>(213) 792-4145</span>
                                        </a>
                                    </Button>
                                    <Button asChild size="lg" variant="outline" className="border-gray-500 text-white hover:bg-white/10 text-lg py-6 h-auto rounded-lg">
                                        <a href="#proposal">Request Proposal</a>
                                    </Button>
                                </div>
                            </div>

                            <div className="lg:w-1/2" id="proposal">
                                <div className="bg-white rounded-lg shadow-xl overflow-hidden p-6 md:p-8">
                                    <h3 className="text-gray-900 text-2xl font-bold mb-2">Request Commercial Estimates</h3>
                                    <p className="text-gray-500 mb-6">Attach blueprints/specs or schedule a site walk.</p>
                                    <EnhancedQuoteForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Industries We Serve */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <ScrollReveal>
                            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Industries We Serve</h2>
                        </ScrollReveal>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: Building2, title: "Commercial Real Estate", desc: "Keep tenants happy and lease renewal rates high." },
                                { icon: Users, title: "Education & Schools", desc: "Create healthy learning environments for students." },
                                { icon: ShieldCheck, title: "Healthcare Facilities", desc: "Strict adherence to infection control protocols." },
                                { icon: Settings, title: "Industrial Manufacturing", desc: "Heavy-duty cleaning for complex exhaust systems." }
                            ].map((item, i) => (
                                <ScrollReveal key={i} delay={i * 0.1}>
                                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-full hover:border-brand-200 transition-colors">
                                        <item.icon className="text-brand-600 mb-4 h-10 w-10" />
                                        <h3 className="font-bold text-xl mb-3 text-gray-900">{item.title}</h3>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                <EnhancedTrustBadges />
                <CTASection />
            </main>

            <Footer />
        </div>
    );
};

export default LandingCommercial;
