
import React from 'react';
import IndustryPageLayout from '@/components/IndustryPageLayout';
import { Check, Shield, Star, Building, Warehouse } from 'lucide-react';

const CommercialRealEstate = () => {
    return (
        <IndustryPageLayout
            title="Air Quality Solutions for Commercial Real Estate"
            subtitle="Enhancing tenant satisfaction, property value, and system efficiency with professional air duct cleaning services."
            heroImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
        >
            {/* Overview Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6">Protecting Your Property Investment</h2>
                        <p className="text-lg text-gray-600 mb-6">
                            For commercial property managers and owners, maintaining superior indoor air quality is a key factor in tenant retention and building maintenance. Pure Air California provides comprehensive air duct cleaning services that protect your HVAC investment and create a healthier environment for your tenants.
                        </p>
                        <p className="text-lg text-gray-600 mb-6">
                            Our certified technicians work efficiently to minimize disruption to your tenants while delivering hospital-grade cleaning results for office buildings, retail centers, and multi-tenant facilities.
                        </p>
                        <div className="mt-8 p-6 bg-brand-50 rounded-lg border border-brand-100">
                            <div className="flex gap-4 items-start">
                                <div className="w-12 h-12 rounded-full bg-brand-100 flex-shrink-0 flex items-center justify-center">
                                    <Warehouse size={24} className="text-brand-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Multi-Tenant Solutions</h3>
                                    <p className="text-gray-600">
                                        We specialize in coordinating complex projects across multi-tenant properties, ensuring consistent air quality standards throughout the entire building while respecting individual tenant schedules and security requirements.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6 text-center">Benefits for Commercial Properties</h2>
                    <p className="text-lg text-gray-600 mb-10 text-center max-w-3xl mx-auto">
                        Investing in professional air duct cleaning delivers tangible ROI for commercial real estate:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                                <Check size={24} className="text-brand-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Tenant Satisfaction</h3>
                            <p className="text-gray-600">
                                Reduced dust, allergens, and odors lead to happier tenants and fewer complaints about building environment.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                                <Building size={24} className="text-brand-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Energy Savings</h3>
                            <p className="text-gray-600">
                                Clean HVAC systems run more efficiently, potentially lowering utility costs for common areas and tenant spaces.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                                <Shield size={24} className="text-brand-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Liability Reduction</h3>
                            <p className="text-gray-600">
                                Documented air quality maintenance helps protect property owners against sick building syndrome claims.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                                <Check size={24} className="text-brand-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Lease Appeal</h3>
                            <p className="text-gray-600">
                                Superior indoor air quality is a marketable feature that can help attract high-quality tenants.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                                <Star size={24} className="text-brand-600 fill-current" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Asset Protection</h3>
                            <p className="text-gray-600">
                                Removing debris and contaminants extends the lifespan of expensive commercial HVAC units.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                                <Building size={24} className="text-brand-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Turnover Readiness</h3>
                            <p className="text-gray-600">
                                Deep cleaning ducts during tenant turnover ensures a fresh start for new occupants.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6 text-center">Our CRE Services</h2>
                    <p className="text-lg text-gray-600 mb-10 text-center max-w-3xl mx-auto">
                        Tailored solutions for office buildings, retail centers, and property management portfolios:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Portfolio Maintenance</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2">
                                    <Check size={18} className="text-brand-600" />
                                    <span>Volume pricing for multiple properties</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check size={18} className="text-brand-600" />
                                    <span>Standardized service protocols</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check size={18} className="text-brand-600" />
                                    <span>Centralized billing and reporting</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check size={18} className="text-brand-600" />
                                    <span>Dedicated account management</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Technical Cleaning</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2">
                                    <Check size={18} className="text-brand-600" />
                                    <span>Main supply and return trunk lines</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check size={18} className="text-brand-600" />
                                    <span>VAV box and coil cleaning</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check size={18} className="text-brand-600" />
                                    <span>Diffuser and register sanitization</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check size={18} className="text-brand-600" />
                                    <span>Restroom exhaust system cleaning</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-10 text-center">Trusted by LA's Property Managers</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                                <Shield size={28} className="text-brand-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Fully Insured</h3>
                            <p className="text-gray-600">
                                We carry comprehensive liability and workers' compensation insurance to protect your property and our team.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                                <Building size={28} className="text-brand-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">After-Hours Service</h3>
                            <p className="text-gray-600">
                                We offer flexible scheduling, including nights and weekends, to perform work without disrupting business hours.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                                <Check size={28} className="text-brand-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Detailed Reporting</h3>
                            <p className="text-gray-600">
                                Receive comprehensive photo documentation and reports of work performed for your maintenance records.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </IndustryPageLayout>
    );
};

export default CommercialRealEstate;
