import PageHero from '@/components/PageHero';
import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, Banknote, Users, ArrowRight, Phone, CheckCircle } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import RelatedLinks from '@/components/RelatedLinks';
import { Button } from '@/components/ui/button';
import SEOProvider from '@/components/SEOProvider';
import EnhancedQuoteForm from '@/components/EnhancedQuoteForm';

const Partnerships = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <SEOProvider 
        title="HVAC & Plumber Referral Program | Pure Air CA" 
        description="Referral partnerships for LA air conditioning contractors, plumbers and roofers. Earn 10% cash back on duct cleaning jobs. Call (213) 792-4145."
        path="/partners"
       isLocalBusiness />
      <NavBar />
      
      <main className="flex-grow">
        {/* Header */}
        <PageHero title="Good people. Better together." description="Partner with Pure Air California to connect your Los Angeles customers with thoughtful air duct, dryer vent and HVAC care."/>

        {/* Benefits Grid */}
        <section className="py-20 bg-white">
           <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                 <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why LA Contractors Trust Us</h2>
                 <p className="text-lg text-slate-600">We respect your client relationships. We handle the dirty ductwork; you look like a hero for recommending the best.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                 {[
                   {i: Banknote, t: '10-15% Cash Payouts', d: 'Average payouts range from $50 to $1,500 depending on the residential or commercial scale.'},
                   {i: Handshake, t: 'Zero Poaching Policy', d: 'We strictly provide air duct hygiene and filtration. We NEVER attempt to sell AC units, furnaces, or plumbing jobs.'},
                   {i: Users, t: 'NADCA Certified Elite', d: 'Don\'t risk your reputation on fly-by-night operators. We hold advanced NADCA certifications protecting your brand.'}
                 ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:shadow-xl hover:border-brand-200 transition-all group"
                    >
                       <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <item.i className="w-8 h-8 text-brand-600" />
                       </div>
                       <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.t}</h3>
                       <p className="text-slate-600 leading-relaxed font-medium">{item.d}</p>
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* Affiliate Lead Form */}
        <section className="py-20 bg-brand-900 text-white relative overflow-hidden">
           <div className="absolute inset-0 pac-dot-pattern opacity-10 blur-sm mix-blend-overlay"></div>
           <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                 <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-white drop-shadow-md">Send Us <span className="text-brand-300">A Lead Now</span></h2>
                 <p className="text-xl text-brand-100 mb-8 leading-relaxed">
                   Drop your contact info below. Our Partnership Director will call you within 60 seconds during business hours to set up your affiliate profile and log your first referral.
                 </p>
                 <ul className="space-y-4 mb-8">
                   {[
                     "Same-Day Dispatch for emergency referrals",
                     "White-label or direct communication options",
                     "Transparent payout tracking"
                   ].map((text, i) => (
                      <li key={i} className="flex items-center gap-3 text-lg font-medium text-brand-50">
                        <CheckCircle className="text-brand-400 shrink-0" /> {text}
                      </li>
                   ))}
                 </ul>
              </div>

              <div className="bg-white rounded-3xl p-2 shadow-2xl">
                 <EnhancedQuoteForm />
              </div>
           </div>
        </section>

        {/* Depth for a B2B page previously at 451 words. */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              How the Referral Program Works
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Most HVAC contractors, plumbers and restoration firms in Los Angeles run into duct and
              dryer vent work they are not set up to do — it needs different equipment, different
              certification and a crew that does it every day. Rather than turn the job down or
              subcontract it blind, you can hand it to us and keep the relationship with your customer.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2 text-slate-900">1. Send the lead</h3>
                <p className="text-slate-600 text-sm">
                  Call or submit the details. We only need the property type, the scope and the best
                  contact — no paperwork on your side.
                </p>
              </div>
              <div className="border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2 text-slate-900">2. We quote and schedule</h3>
                <p className="text-slate-600 text-sm">
                  We contact your customer directly, quote the work at a fixed price and schedule it
                  around whatever you already have booked on site.
                </p>
              </div>
              <div className="border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2 text-slate-900">3. You stay informed</h3>
                <p className="text-slate-600 text-sm">
                  You are told when the work is done and what was found, so nothing about the job
                  reaches your customer before it reaches you.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-slate-900 mb-3">Who this suits</h3>
            <ul className="space-y-3 text-lg text-slate-600 mb-8">
              <li><strong className="text-slate-900">HVAC contractors</strong> — you replace and service equipment; we handle the duct system it connects to.</li>
              <li><strong className="text-slate-900">Plumbers and appliance technicians</strong> — dryer vent runs come up constantly on laundry calls and are rarely in scope.</li>
              <li><strong className="text-slate-900">Restoration and remediation firms</strong> — post-fire and post-water work almost always leaves contamination in the ductwork.</li>
              <li><strong className="text-slate-900">Property managers and realtors</strong> — pre-listing and turnover work on a schedule that fits the transaction.</li>
            </ul>

            <h3 className="text-2xl font-semibold text-slate-900 mb-3">Why contractors send us work</h3>
            <p className="text-lg text-slate-600">
              We are NADCA-certified, licensed and insured, and we have been working in Los Angeles
              since 1993. We do not sell adjacent services that compete with yours, so a referral is
              not a route for someone else to take over your customer relationship.
            </p>
          </div>
        </section>
      </main>
      
      <RelatedLinks heading="Services you can refer" links={[{ label: 'Residential air duct cleaning', path: '/services/residential-air-duct-cleaning' }, { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' }, { label: 'Dryer vent cleaning', path: '/services/residential-dryer-vent-cleaning' }, { label: 'Areas we serve', path: '/locations' }]} />

      <Footer />
    </div>
  );
};

export default Partnerships;
