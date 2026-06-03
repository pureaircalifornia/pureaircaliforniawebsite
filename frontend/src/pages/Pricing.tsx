import React, { useState } from 'react';
import SEOProvider from '@/components/SEOProvider';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { motion } from 'framer-motion';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import {
  Phone, Check, AlertTriangle, ChevronRight, Shield, Award,
  Home, Building2, Wind, Zap, Info, Star, ArrowRight, CheckCircle
} from 'lucide-react';

// ─── Pricing Data ────────────────────────────────────────────────────────────

const residentialPricing = [
  {
    size: 'Studio / 1-Bed',
    sqft: 'Under 800 sq ft',
    vents: '6–10 vents',
    price: '$299–$349',
    popular: false,
    includes: ['All supply & return vents', 'Main trunk cleaning', 'HEPA vacuum capture', 'Final airflow test'],
  },
  {
    size: '2–3 Bedroom',
    sqft: '800–1,800 sq ft',
    vents: '10–18 vents',
    price: '$349–$449',
    popular: true,
    includes: ['All supply & return vents', 'Main trunk line cleaning', 'Blower motor inspection', 'HEPA capture', 'Sanitizing available', 'Final airflow test'],
  },
  {
    size: '4+ Bedroom / Large Home',
    sqft: '1,800–3,500 sq ft',
    vents: '18–30+ vents',
    price: '$449–$599',
    popular: false,
    includes: ['Full system cleaning', 'Multi-trunk lines', 'Blower motor & coil inspection', 'HEPA capture', 'Sanitizing treatment included', 'Before & after photos', 'Final report'],
  },
];

const addOns = [
  { name: 'EPA Sanitizing Treatment', price: '$75–$150', desc: 'Kills bacteria, mold spores, fungi. Applied throughout duct system after cleaning.' },
  { name: 'Dryer Vent Cleaning (combo)', price: '$99 add-on', desc: 'When bundled with duct cleaning. Standalone dryer vent cleaning is $149–$249.' },
  { name: 'Electrostatic Filter Replacement', price: '$149–$249', desc: 'Upgraded, washable electrostatic filter — lower lifetime cost than disposables.' },
  { name: 'Mold Inspection & Testing', price: '$149', desc: 'Air sample testing to identify mold species and concentration levels.' },
  { name: 'HVAC Coil Cleaning', price: '$199–$349', desc: 'Evaporator and condenser coil cleaning for maximum HVAC efficiency.' },
];

const faqs = [
  {
    q: 'How much does air duct cleaning cost in Los Angeles?',
    a: 'Air duct cleaning in Los Angeles typically costs $299–$599 for residential properties. The exact price depends on home size, vent count, and contamination level. Larger homes or those with significant mold/debris may cost more. Pure Air California provides free, no-obligation on-site estimates before any work begins.'
  },
  {
    q: 'Why do some companies charge only $49 or $99?',
    a: 'Extremely cheap prices (under $150) are typically bait-and-switch tactics. These companies arrive, do a minimal surface cleaning of accessible vents, and then pressure sell you expensive add-ons ranging from $500–$2,000. The California Attorney General has warned consumers about this practice. Legitimate NADCA-certified cleaning (including full system access, negative pressure vacuum, and all components) costs $299+ for most homes.'
  },
  {
    q: 'What is included in your standard pricing?',
    a: 'Every Pure Air California service includes: inspection of the full duct system, negative air pressure setup to contain contaminants, cleaning of all supply and return air vents, main trunk line cleaning, HEPA-filtered vacuum extraction, and a final airflow verification test. We do not charge extra for register covers, basic tools, or travel within greater LA.'
  },
  {
    q: 'Do you offer free estimates?',
    a: 'Yes. We provide 100% free, no-obligation quotes by phone or online. For large homes or commercial properties, we recommend a brief on-site assessment so we can give you a firm price with no surprises. Call (213) 792-4145 or submit our online form.'
  },
  {
    q: 'Can I bundle dryer vent cleaning with air duct cleaning?',
    a: 'Yes — bundling dryer vent cleaning with your air duct service saves you $50. Standalone dryer vent cleaning is $149–$249. Combined with an air duct cleaning appointment, it\'s only a $99 add-on.'
  },
  {
    q: 'Do you have financing or payment plans?',
    a: 'We accept all major credit cards, cash, check, and Venmo. For commercial clients, we offer net-30 billing. Contact us if you need to discuss payment options for larger jobs — we are happy to work with you.'
  },
  {
    q: 'How much does commercial air duct cleaning cost?',
    a: 'Commercial air duct cleaning is priced per square footage and system complexity. Small commercial spaces (under 5,000 sq ft) typically start at $600. Larger office buildings, restaurants, or multi-unit properties receive custom quotes based on a site assessment. We offer after-hours scheduling to minimize business disruption.'
  },
];

const scamWarnings = [
  'Prices advertised under $100 for the full service',
  'No NADCA certification or license shown on the website',
  'Refusing to provide a written price before starting work',
  'Company not found on Google with real reviews',
  'High-pressure upselling after arrival ("we found mold everywhere")',
  'No physical LA-area address or traceable business history',
];

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Pricing', item: '/pricing' },
];

const PricingSchema = () => {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a }
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'PriceSpecification',
      name: 'Residential Air Duct Cleaning Los Angeles',
      minPrice: '299',
      maxPrice: '599',
      priceCurrency: 'USD',
      description: 'Professional NADCA-certified residential air duct cleaning in Los Angeles. Price varies by home size, vent count, and contamination level. Free estimates available.',
      eligibleRegion: {
        '@type': 'City',
        name: 'Los Angeles',
        sameAs: 'https://en.wikipedia.org/wiki/Los_Angeles'
      }
    }
  ];

  return (
    <>
      {schema.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
    </>
  );
};

const Pricing = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOProvider
        title="Air Duct Cleaning Cost Los Angeles 2026 | Transparent Pricing"
        description="Honest, transparent air duct cleaning prices in Los Angeles. Residential: $299–$599. Dryer vent: $149–$249. NADCA certified. No bait-and-switch. Free estimates. Call (213) 792-4145."
        keywords={[
          'air duct cleaning cost Los Angeles',
          'how much does air duct cleaning cost Los Angeles',
          'air duct cleaning price Los Angeles',
          'cheap air duct cleaning Los Angeles',
          'dryer vent cleaning cost Los Angeles',
          'air duct cleaning pricing 2026',
          'NADCA air duct cleaning price',
          'average cost air duct cleaning LA',
        ]}
        path="/pricing"
        isLocalBusiness
      >
        <BreadcrumbSchema items={breadcrumbs} />
        <PricingSchema />
      </SEOProvider>

      <NavBar />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-24">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-500/30 px-4 py-2 rounded-full mb-6"
            >
              <Shield size={16} className="text-sky-400" />
              <span className="text-sky-300 text-sm font-semibold">Upfront Pricing — No Surprises</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-black mb-6 text-white max-w-3xl mx-auto leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Air Duct Cleaning Cost in{' '}
              <span className="text-sky-400">Los Angeles</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Transparent, honest pricing from LA&apos;s #1 NADCA-certified company.
              The price you see is the price you pay.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button asChild size="lg" className="btn-premium text-white font-bold px-8 py-6 h-auto">
                <a href="tel:2137924145" className="flex items-center gap-2">
                  <Phone className="fill-current" size={20} />
                  Call for a Free Estimate
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/25 text-white hover:bg-white/10 py-6 h-auto">
                <Link to="/quote" className="flex items-center gap-2">
                  <ArrowRight size={18} />
                  Get Online Quote
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Residential Pricing Tables */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <Home size={28} className="text-sky-600" />
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Residential Air Duct Cleaning</h2>
              </div>
              <p className="text-lg text-slate-600 mb-12 max-w-2xl">
                All residential prices include a full-system clean — not just the visible vents. We use HEPA-filtered truck-mounted or high-powered portable vacuums on every job.
              </p>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {residentialPricing.map((tier, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className={`relative flex flex-col rounded-3xl border-2 p-8 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1
                    ${tier.popular
                      ? 'border-sky-500 shadow-xl shadow-sky-100 bg-gradient-to-b from-sky-50 to-white'
                      : 'border-gray-200 bg-white'
                    }`}>
                    {tier.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sky-600 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                        🏠 Most Common in LA
                      </div>
                    )}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{tier.size}</h3>
                      <p className="text-sm text-slate-500">{tier.sqft} · {tier.vents}</p>
                    </div>
                    <div className="mb-6 pb-6 border-b border-gray-100">
                      <span className="text-4xl font-black text-sky-700">{tier.price}</span>
                      <p className="text-xs text-slate-500 mt-1">Final price confirmed before work begins</p>
                    </div>
                    <ul className="space-y-3 flex-grow mb-8">
                      {tier.includes.map((item, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-slate-600">
                          <CheckCircle size={16} className="text-sky-500 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className={tier.popular ? 'bg-sky-600 hover:bg-sky-700 text-white w-full' : 'w-full'} variant={tier.popular ? 'default' : 'outline'}>
                      <a href="tel:2137924145" className="flex items-center justify-center gap-2">
                        <Phone size={16} />
                        Get This Price
                      </a>
                    </Button>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Note */}
            <ScrollReveal>
              <div className="mt-8 bg-blue-50 border border-blue-200 p-5 rounded-2xl flex gap-3 max-w-3xl mx-auto">
                <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-blue-800 text-sm leading-relaxed">
                  <strong>Pricing factors:</strong> Final price may vary based on vent count, accessibility (high ceilings, crawl spaces), contamination level (mold, heavy debris), and number of HVAC systems. We confirm the exact price before starting. No work begins without your approval.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Commercial Pricing */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <Building2 size={28} className="text-sky-600" />
                <h2 className="text-3xl font-bold text-slate-900">Commercial Air Duct Cleaning</h2>
              </div>
              <p className="text-lg text-slate-600 mb-10">
                Commercial pricing is based on your building&apos;s square footage, system complexity, and scheduling needs. We offer after-hours and weekend service to minimize disruption.
              </p>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { type: 'Small Office / Retail', size: 'Under 5,000 sq ft', price: 'From $599', note: 'Single HVAC system' },
                { type: 'Mid-Size Commercial', size: '5,000–20,000 sq ft', price: 'Custom Quote', note: 'Multi-zone systems' },
                { type: 'Large Facility / Industrial', size: '20,000+ sq ft', price: 'Custom Quote', note: 'After-hours scheduling' },
              ].map((tier, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-sky-200 transition-all">
                    <Building2 size={24} className="text-sky-600 mb-3" />
                    <h3 className="font-bold text-slate-900 mb-1">{tier.type}</h3>
                    <p className="text-sm text-slate-500 mb-3">{tier.size}</p>
                    <p className="text-2xl font-black text-sky-700 mb-1">{tier.price}</p>
                    <p className="text-xs text-slate-400">{tier.note}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal>
              <div className="mt-8 text-center">
                <Button asChild size="lg" variant="outline" className="border-sky-500 text-sky-700">
                  <Link to="/services/commercial-air-duct-cleaning" className="flex items-center gap-2">
                    Commercial Services Details
                    <ChevronRight size={18} />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Dryer Vent + Add-ons */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <Zap size={28} className="text-orange-500" />
                <h2 className="text-3xl font-bold text-slate-900">Dryer Vent Cleaning & Add-Ons</h2>
              </div>
              <p className="text-slate-600 mb-10 text-lg">
                Dryer vent cleaning is the #1 way to prevent home fires in LA. Bundle it with your duct cleaning for maximum savings.
              </p>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <ScrollReveal>
                <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-slate-900">Dryer Vent Cleaning</h3>
                    <span className="text-sm font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-lg">Fire Prevention</span>
                  </div>
                  <p className="text-2xl font-black text-orange-700 mb-1">$149–$249</p>
                  <p className="text-sm text-slate-500 mb-1">Standalone service</p>
                  <p className="text-sm font-bold text-green-700 mb-4">Save $50 when bundled with duct cleaning</p>
                  <ul className="space-y-2">
                    {['Full vent line inspection', 'Rotary brush deep clean', 'Airflow velocity test', 'Lint blockage removal', 'Cap & termination check'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check size={14} className="text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
              <div className="space-y-4">
                {addOns.map((addon, i) => (
                  <ScrollReveal key={i} delay={i * 0.06}>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-start gap-4 hover:border-sky-200 hover:bg-sky-50/40 transition-all">
                      <Wind size={18} className="text-sky-500 shrink-0 mt-0.5" />
                      <div className="flex-grow">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-semibold text-slate-900 text-sm">{addon.name}</h4>
                          <span className="text-sky-700 font-bold text-sm whitespace-nowrap">{addon.price}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{addon.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Scam Warning */}
        <section className="py-16 bg-red-50 border-y border-red-100">
          <div className="container mx-auto px-4 max-w-3xl">
            <ScrollReveal>
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                  <AlertTriangle size={24} className="text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Beware of Air Duct Cleaning Scams in LA</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Los Angeles has a well-documented problem with fraudulent air duct cleaning companies.
                    The California Attorney General has issued warnings about bait-and-switch pricing tactics.
                    Watch for these red flags:
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {scamWarnings.map((warning, i) => (
                  <div key={i} className="flex items-start gap-2.5 bg-white border border-red-100 rounded-xl p-4">
                    <span className="text-red-500 mt-0.5">⚠</span>
                    <p className="text-sm text-slate-700">{warning}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-5 flex gap-3">
                <Award size={22} className="text-green-600 shrink-0 mt-0.5" />
                <p className="text-green-800 text-sm leading-relaxed">
                  <strong>Pure Air California is NADCA certified, BBB A+ rated, and has served 448K+ customers over 40+ years.</strong> We show you our price before we start. Always.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Reviews trust bar */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {[
                { label: '4.7★ on Google', icon: Star, color: 'text-yellow-500' },
                { label: '448K+ Customers Served', icon: CheckCircle, color: 'text-green-500' },
                { label: 'NADCA Certified', icon: Award, color: 'text-blue-500' },
                { label: 'A+ BBB Accredited', icon: Shield, color: 'text-sky-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon size={22} className={item.color} />
                  <span className="font-semibold text-slate-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
                Pricing FAQs — Air Duct Cleaning in LA
              </h2>
            </ScrollReveal>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between text-left p-6 font-semibold text-slate-900 hover:bg-gray-50 transition-colors"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span>{faq.q}</span>
                      <ChevronRight
                        size={20}
                        className={`text-sky-600 shrink-0 ml-4 transition-transform ${openFaq === i ? 'rotate-90' : ''}`}
                      />
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-gray-100 pt-4 text-sm">
                        {faq.a}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-sky-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Your Free LA Estimate?
              </h2>
              <p className="text-xl text-sky-100 mb-10 max-w-xl mx-auto">
                No obligation. No surprise fees. Your price is confirmed before we start.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-sky-700 hover:bg-sky-50 font-bold px-8 py-6 h-auto shadow-xl">
                  <a href="tel:2137924145" className="flex items-center gap-2">
                    <Phone className="fill-current" size={22} />
                    (213) 792-4145
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 py-6 h-auto">
                  <Link to="/quote" className="flex items-center gap-2">
                    Get Online Quote
                    <ArrowRight size={18} />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
