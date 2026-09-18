import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, ShieldCheck, ClipboardCheck, ArrowRight, Phone, Clock, FileText, CheckCircle } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import RelatedLinks from '@/components/RelatedLinks';
import { Button } from '@/components/ui/button';
import SEOProvider from '@/components/SEOProvider';
import EnhancedQuoteForm from '@/components/EnhancedQuoteForm';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

const PropertyManagers = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <SEOProvider 
        title="HOA & Property Manager Duct Cleaning LA" 
        description="Priority duct-cleaning vendor for LA property managers and HOAs. Bulk unit pricing, multi-family specialists, compliance reporting. (213) 792-4145."
        path="/property-managers"
       isLocalBusiness />
      <NavBar />
      
      <main className="flex-grow pt-24 pb-20">
        {/* LA PM Hero */}
        <section className="container mx-auto px-4 mb-20 text-center max-w-5xl">
           <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-bold tracking-widest text-xs mb-8 uppercase">
             <Building2 size={16} /> Enterprise Vendor Program
           </span>
           <h1 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 leading-tight">
             The Preferred <span className="text-brand-600">Duct Cleaning Vendor</span> for Los Angeles PMs & HOAs
           </h1>
           <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
             Turn-key multi-family cleanings, guaranteed resident compliance, and aggressive bulk-pricing packages. We take the headache out of ventilation maintenance.
           </p>

           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild className="btn-premium px-8 py-6 h-auto text-lg rounded-xl font-bold shadow-xl">
                 <a href="tel:2137924145" className="flex items-center gap-2"><Phone className="fill-current" /> Call PM Hotline: (213) 792-4145</a>
              </Button>
           </div>
        </section>

        {/* Visual Proof Section */}
        <section className="container mx-auto px-4 mb-24 max-w-6xl">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                 <h2 className="text-3xl font-bold text-slate-900 mb-6 drop-shadow-sm">Protect Your Residents & Avoid Fire Hazards</h2>
                 <p className="text-lg text-slate-600 mb-6 font-medium">Clogged dryer vents in multi-family buildings are the leading cause of residential fires. Poor HVAC ducts lead to tenant complaints and rapid system failures.</p>
                 <ul className="space-y-4">
                   {[
                     "Before & After photographic proof for every unit.",
                     "Fully licensed, bonded, and insured ($2M+ General Liability).",
                     "NADCA Certified to handle complex multi-story runs.",
                     "Seamless resident scheduling & notification workflows."
                   ].map((text, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="text-green-500 mt-1 shrink-0" />
                        <span className="text-slate-700 font-semibold">{text}</span>
                      </li>
                   ))}
                 </ul>
              </div>
              <div className="relative">
                 <BeforeAfterSlider 
                   beforeImage="https://images.unsplash.com/photo-1621293954908-907159247fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                   afterImage="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                   beforeLabel="Tenant Mold/Fire Hazard"
                   afterLabel="Code Compliant & Safe"
                 />
                 <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100">
                    <ShieldCheck className="text-brand-600 w-10 h-10" />
                    <div>
                      <div className="font-bold text-slate-900">100% Guaranteed</div>
                      <div className="text-xs text-slate-500 font-medium">Code Compliant Delivery</div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Feature Grid */}
        <section className="bg-white py-24 border-y border-slate-200">
           <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {i: Clock, t: 'Off-Hours Scheduling', d: 'We work around your building\'s requirements, including nights and weekends to minimize tenant disruption.'},
                  {i: ClipboardCheck, t: 'Unit-by-Unit Reporting', d: 'We provide a comprehensive digital report detailing the exact state and service record of every unit serviced.'},
                  {i: FileText, t: 'Net-30 Enterprise Terms', d: 'Approved HOAs and Management Companies qualify for flexible invoicing and net-30 payment terms.'}
                ].map((item, i) => (
                   <div key={i} className="text-center p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-lg transition-all">
                      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <item.i className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{item.t}</h3>
                      <p className="text-slate-600 font-medium">{item.d}</p>
                   </div>
                ))}
              </div>
           </div>
        </section>

        {/* Depth for a high-value B2B page that was previously 446 words — too thin
            to rank for the HOA and property-management terms it targets. */}
        <section className="container mx-auto px-4 mt-24 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            What Multifamily Duct Cleaning Actually Involves
          </h2>
          <p className="text-lg text-slate-600 mb-6">
            A managed property is not one large house. Work has to move through occupied units
            without leaving residents without ventilation or laundry, and it has to cover the
            shared systems that never appear on a unit-by-unit maintenance request — parking
            garage exhaust, corridor ventilation and shared laundry vents among them.
          </p>

          <h3 className="text-2xl font-semibold text-slate-900 mb-3">The three systems on most properties</h3>
          <ul className="space-y-4 text-lg text-slate-600 mb-8">
            <li>
              <strong className="text-slate-900">In-unit ductwork.</strong> Supply and return runs,
              registers, plenums and the blower and furnace assemblies. This is what residents notice
              — dust on vents, stale air, allergy complaints that do not resolve.
            </li>
            <li>
              <strong className="text-slate-900">Dryer vents.</strong> The one that matters most.
              Lint accumulation in long or crushed vent runs is a fire risk, not a comfort issue, and
              in shared laundry rooms it builds far faster than in a single-family home. Vents are
              also frequently improperly terminated in older buildings.
            </li>
            <li>
              <strong className="text-slate-900">Shared and garage exhaust.</strong> Parking garage
              exhaust handles vehicle emissions and is the single most neglected system on most
              residential properties, because no individual resident ever reports it.
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-900 mb-3">How we schedule occupied buildings</h3>
          <p className="text-lg text-slate-600 mb-6">
            Units are taken in blocks so each one is offline for the shortest possible window and
            residents keep access to laundry throughout. We handle resident notification with your
            office, and work evenings or weekends where a property needs it.
          </p>

          <h3 className="text-2xl font-semibold text-slate-900 mb-3">Documentation you can pass upward</h3>
          <p className="text-lg text-slate-600 mb-6">
            Every serviced area is photographed before and after, so what you receive is per-area
            evidence rather than a single completion note on an invoice. That matters when you are
            reporting to an owner or a board, and when a resident asks whether their unit was done.
          </p>

          <h3 className="text-2xl font-semibold text-slate-900 mb-3">Pricing across a portfolio</h3>
          <p className="text-lg text-slate-600 mb-4">
            Bulk unit pricing is quoted per property based on unit count, system type and access,
            and agreed as a fixed price before work begins. For managers running several buildings,
            we sequence locations on a consistent schedule with unified reporting.
          </p>
          <p className="text-lg text-slate-600">
            <Link to="/case-studies/apartment-community-42-units" className="text-brand-700 font-semibold hover:text-brand-900">
              See how this worked across a 42-unit apartment community →
            </Link>
          </p>
        </section>

        {/* PM Form CTA */}
        <section className="container mx-auto px-4 mt-24">
           <div className="max-w-4xl mx-auto">
             <div className="text-center mb-10">
               <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Request a Bulk Quote</h2>
               <p className="text-lg text-slate-600 font-medium">Skip the queue. Connect directly with our enterprise management team.</p>
             </div>
             <EnhancedQuoteForm />
           </div>
        </section>
      </main>
      
      <RelatedLinks heading="Related for property professionals" links={[{ label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning' }, { label: 'Commercial dryer vent cleaning', path: '/services/commercial-dryer-vent-cleaning' }, { label: 'Commercial real estate', path: '/industries/commercial-real-estate' }, { label: '42-unit apartment case study', path: '/case-studies/apartment-community-42-units' }]} />

      <Footer />
    </div>
  );
};

export default PropertyManagers;
