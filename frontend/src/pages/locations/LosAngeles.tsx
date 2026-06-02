import React from 'react';
import SEOProvider from '@/components/SEOProvider';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Phone, Star, Shield, Award, Clock, CheckCircle, ArrowRight,
  MapPin, Users, Wind, Heart, ChevronRight, Zap
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { motion } from 'framer-motion';
import EnhancedTrustBadges from '@/components/EnhancedTrustBadges';
import EnhancedQuoteForm from '@/components/EnhancedQuoteForm';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';

// Los Angeles–specific neighborhoods served
const laNeighborhoods = [
  { name: 'Beverly Hills', zip: '90210', link: '/locations/beverly-hills' },
  { name: 'Hollywood', zip: '90028', link: '/locations/hollywood' },
  { name: 'Downtown LA', zip: '90012', link: '/locations/downtown-la' },
  { name: 'West Hollywood', zip: '90046', link: '/locations/west-hollywood' },
  { name: 'Brentwood', zip: '90049', link: '/locations/brentwood' },
  { name: 'Koreatown', zip: '90005', link: '/locations/koreatown' },
  { name: 'Los Feliz', zip: '90027', link: '/locations/los-feliz' },
  { name: 'Mid-Wilshire', zip: '90036', link: '/locations/mid-wilshire' },
  { name: 'Westwood', zip: '90024', link: '/locations/westwood' },
  { name: 'West LA', zip: '90025', link: '/locations/west-la' },
  { name: 'Pacific Palisades', zip: '90272', link: '/locations/pacific-palisades' },
  { name: 'Central LA', zip: '90004', link: '/locations/central-la' },
];

const services = [
  {
    title: 'Residential Air Duct Cleaning',
    desc: 'Full NADCA-standard deep cleaning of your home\'s entire duct system. We remove years of built-up dust, allergens, mold spores, and pet dander that standard vacuuming can\'t reach.',
    link: '/services/residential-air-duct-cleaning',
    icon: Wind,
    badge: 'Most Popular',
  },
  {
    title: 'Dryer Vent Cleaning',
    desc: 'Clogged dryer vents are the #1 cause of home fires in LA. Our certified technicians clear blockages and restore proper airflow — reducing drying time and fire risk.',
    link: '/services/residential-dryer-vent-cleaning',
    icon: Zap,
    badge: 'Fire Prevention',
  },
  {
    title: 'Commercial Air Duct Service',
    desc: 'From office towers to restaurants, our commercial division delivers OSHA-compliant duct cleaning for businesses across Los Angeles. After-hours scheduling available.',
    link: '/services/commercial-air-duct-cleaning',
    icon: Shield,
    badge: 'B2B Specialists',
  },
];

const whyUsList = [
  { title: 'NADCA Certified Technicians', desc: 'Every technician is trained to the National Air Duct Cleaners Association standard — the gold standard of the industry.' },
  { title: '448K+ Customers Served', desc: 'Over 40 years of trusted service to homeowners and businesses across Los Angeles County.' },
  { title: 'Same-Day Emergency Service', desc: 'Need it done today? We offer same-day scheduling across Los Angeles — just call (213) 792-4145.' },
  { title: 'Upfront, Transparent Pricing', desc: 'No hidden fees, no bait-and-switch tactics. You get a firm price before we start — guaranteed.' },
  { title: 'A+ BBB Accredited', desc: 'Fully licensed, bonded, and insured. Background-checked team. Your property and family are safe with us.' },
  { title: 'Eco-Friendly Methods', desc: 'We use HEPA-filtered vacuums and non-toxic sanitizers — safe for children, pets, and the environment.' },
];

const faqs = [
  {
    q: 'How much does air duct cleaning cost in Los Angeles?',
    a: 'Air duct cleaning in Los Angeles typically costs between $299–$599 for a standard residential property. The exact price depends on the number of vents, system size, and condition. Pure Air California provides free, no-obligation estimates — call (213) 792-4145 or use our online quote form.',
  },
  {
    q: 'How often should I have my air ducts cleaned in LA?',
    a: 'The EPA and NADCA recommend professional air duct cleaning every 3–5 years. However, in Los Angeles — with its higher smog levels, wildfire smoke seasons, and year-round HVAC use — many homeowners clean every 2–3 years, especially those with pets, allergies, or recent renovations.',
  },
  {
    q: 'Does air duct cleaning make a real difference in LA air quality?',
    a: 'Absolutely. Los Angeles air quality is already a challenge outdoors; your indoor HVAC system can actually make it worse if ducts are packed with dust, mold spores, or allergens. After cleaning, most customers notice reduced allergy symptoms, less dust settling on surfaces, and better airflow within 24 hours.',
  },
  {
    q: 'Are you NADCA certified and licensed in California?',
    a: 'Yes. Pure Air California is fully NADCA-certified, California state-licensed, bonded, and insured. We are also A+ accredited with the Better Business Bureau. Every technician passes background checks and ongoing NADCA training.',
  },
  {
    q: 'Do you serve all of Los Angeles?',
    a: 'Yes — we serve every neighborhood in the City of Los Angeles and surrounding LA County communities including Beverly Hills, Hollywood, Downtown LA, West Hollywood, Brentwood, Koreatown, Los Feliz, Culver City, and dozens more. Same-day appointments available.',
  },
];

const LocalBusinessSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    '@id': 'https://www.pureaircalifornia.com/#business',
    name: 'Pure Air California',
    description: 'Los Angeles #1 NADCA-certified air duct and dryer vent cleaning company serving all LA neighborhoods.',
    url: 'https://www.pureaircalifornia.com/locations/los-angeles',
    telephone: '+1-213-792-4145',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1550 N Poinsettia Pl',
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      postalCode: '90046',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 34.0522,
      longitude: -118.2437,
    },
    areaServed: {
      '@type': 'City',
      name: 'Los Angeles',
      sameAs: 'https://en.wikipedia.org/wiki/Los_Angeles',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '9',
      bestRating: '5',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '17:00',
      },
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: 'NADCA Certified',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
};

const LosAngeles = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOProvider
        title="Air Duct Cleaning Los Angeles | #1 NADCA Certified | Pure Air California"
        description="Los Angeles' #1 rated air duct & dryer vent cleaning company. NADCA certified professionals, 448K+ customers served over 40+ years, same-day service. Call (213) 792-4145 for a FREE estimate!"
        keywords={[
          'air duct cleaning Los Angeles',
          'air duct cleaning LA',
          'duct cleaning Los Angeles',
          'HVAC cleaning Los Angeles',
          'dryer vent cleaning Los Angeles',
          'air duct cleaning near me Los Angeles',
          'best air duct cleaning company Los Angeles',
          'NADCA certified air duct cleaning Los Angeles',
          'air duct cleaning cost Los Angeles',
          'same day air duct cleaning Los Angeles',
        ]}
        path="/locations/los-angeles"
        isLocalBusiness
      >
        <LocalBusinessSchema />
      </SEOProvider>

      <NavBar />

      <main>
        {/* Hero — Los Angeles Specific */}
        <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">
          {/* Background texture */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%">
              <pattern id="la-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#la-grid)" />
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />

          <div className="relative container mx-auto px-4 py-24 md:py-36">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                {/* Location chips */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mb-6"
                >
                  <div className="flex items-center gap-1.5 bg-sky-500/20 border border-sky-500/30 px-3 py-1.5 rounded-full">
                    <MapPin size={14} className="text-sky-400" />
                    <span className="text-sky-300 text-sm font-semibold">Serving All of Los Angeles</span>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-500/20 border border-yellow-500/30 px-3 py-1.5 rounded-full">
                    <Star size={13} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-yellow-300 text-sm font-semibold">4.7★ on Google</span>
                  </div>
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Los Angeles&apos;{' '}
                  <span className="text-sky-400">#1 Air Duct</span>
                  {' '}Cleaning Company
                </motion.h1>

                <motion.p
                  className="text-xl text-gray-300 mb-10 max-w-xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  NADCA-certified professionals serving every LA neighborhood. We remove years of dust, allergens, mold, and smog residue — so you breathe cleaner air starting today.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button asChild size="lg" className="btn-premium text-white text-lg font-bold px-8 py-6 h-auto shadow-2xl">
                    <a href="tel:2137924145" className="flex items-center gap-2">
                      <Phone className="fill-current" size={22} />
                      <span>Call (213) 792-4145</span>
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/25 text-white hover:bg-white/10 backdrop-blur-md text-lg py-6 h-auto">
                    <Link to="/quote" className="flex items-center gap-2">
                      <ArrowRight size={20} />
                      Get Free Estimate
                    </Link>
                  </Button>
                </motion.div>

                {/* Trust quick-hits */}
                <motion.div
                  className="grid grid-cols-2 lg:grid-cols-4 gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {[
                    { icon: Shield, label: 'Licensed & Insured', color: 'text-blue-400' },
                    { icon: Award, label: 'NADCA Certified', color: 'text-sky-400' },
                    { icon: Clock, label: 'Same-Day Service', color: 'text-teal-400' },
                    { icon: Heart, label: '100% Satisfaction', color: 'text-pink-400' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/8 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-center hover:border-white/20 transition-colors">
                      <item.icon size={22} className={`mx-auto mb-1.5 ${item.color}`} />
                      <p className="text-xs font-semibold text-white leading-tight">{item.label}</p>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Hero quote form */}
              <motion.div
                className="hidden lg:block"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="bg-white/5 backdrop-blur-xl border border-white/15 p-2 rounded-3xl shadow-2xl">
                  <div className="bg-sky-600 rounded-2xl p-4 text-center mb-0">
                    <h2 className="text-lg font-bold text-white">Get Your FREE LA Estimate</h2>
                    <p className="text-sky-100 text-sm">No obligation · Response within 1 hour</p>
                  </div>
                  <div className="p-2">
                    <EnhancedQuoteForm />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* LA-specific context section */}
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Why Los Angeles Homeowners Need Professional Duct Cleaning
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  LA's unique environment — year-round smog, wildfire smoke seasons, coastal humidity, and high pollen counts — creates a perfect storm for dirty air ducts. Unlike most U.S. cities, your HVAC system runs almost every month of the year, continuously circulating whatever is inside your ductwork through your living spaces.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Wind,
                  color: 'text-orange-500',
                  bg: 'bg-orange-50',
                  title: 'Wildfire Smoke Infiltration',
                  desc: 'Smoke particles from LA/Ventura county wildfires — including ultra-fine PM2.5 — enter HVAC systems and accumulate in ductwork, circulating long after fire season ends.',
                },
                {
                  icon: Users,
                  color: 'text-blue-600',
                  bg: 'bg-blue-50',
                  title: 'Smog & Urban Pollution',
                  desc: 'LA has the worst ozone pollution in the country. Without regular duct cleaning, your HVAC system becomes a reservoir for these airborne pollutants indoors.',
                },
                {
                  icon: Heart,
                  color: 'text-rose-500',
                  bg: 'bg-rose-50',
                  title: 'Allergens & Health Impact',
                  desc: 'Dust mites, mold spores, pet dander, and pollen accumulate fast in LA\'s warm climate. Clean air ducts can significantly reduce allergy and asthma flare-ups.',
                },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className={`${item.bg} rounded-2xl p-8 h-full border border-gray-100`}>
                    <item.icon size={36} className={`${item.color} mb-4`} />
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Air Duct Cleaning Services in Los Angeles
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Every service is carried out by our NADCA-certified technicians using professional truck-mounted equipment
                </p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                        <service.icon size={28} className="text-sky-600" />
                      </div>
                      <span className="text-xs font-bold text-sky-700 bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-full">
                        {service.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                    <p className="text-slate-600 leading-relaxed mb-6 flex-grow">{service.desc}</p>
                    <Button asChild variant="link" className="p-0 text-sky-600 hover:text-sky-800 font-bold group w-fit">
                      <Link to={service.link} className="flex items-center gap-1">
                        Learn More
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Why LA Trusts Pure Air California
                </h2>
                <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                  448K+ customers served over 40+ years across Los Angeles County
                </p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {whyUsList.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="flex gap-4 p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:border-sky-200 hover:bg-sky-50/40 transition-all duration-300">
                    <CheckCircle size={22} className="text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <EnhancedTrustBadges />

        {/* Neighborhoods */}
        <section className="py-20 bg-slate-950 text-white">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Serving Every Los Angeles <span className="text-sky-400">Neighborhood</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  We provide air duct cleaning services across all of Los Angeles — typically within 24 hours
                </p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
              {laNeighborhoods.map((n, i) => (
                <ScrollReveal key={i} delay={i * 0.04}>
                  <Link
                    to={n.link}
                    className="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 hover:border-sky-500/40 px-4 py-3 rounded-xl transition-all duration-200 group"
                  >
                    <div>
                      <p className="font-semibold text-white text-sm group-hover:text-sky-300 transition-colors">{n.name}</p>
                      <p className="text-xs text-gray-500">{n.zip}</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-600 group-hover:text-sky-400 transition-colors" />
                  </Link>
                </ScrollReveal>
              ))}
            </div>
            <div className="text-center">
              <Button asChild variant="outline" className="border-sky-500/40 text-sky-300 hover:bg-sky-500/10">
                <Link to="/locations" className="flex items-center gap-2">
                  <MapPin size={16} />
                  See All Service Locations
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
                Air Duct Cleaning in LA — Frequently Asked Questions
              </h2>
            </ScrollReveal>
            <div className="space-y-5">
              {faqs.map((faq, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <details className="group bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">
                    <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-slate-900 hover:bg-gray-100 transition-colors list-none">
                      <span>{faq.q}</span>
                      <ChevronRight size={20} className="text-sky-600 group-open:rotate-90 transition-transform shrink-0 ml-4" />
                    </summary>
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-gray-200 pt-4">
                      {faq.a}
                    </div>
                  </details>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile form */}
        <div className="lg:hidden py-10 bg-sky-50">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-2xl font-bold text-center mb-2 text-slate-900">Get Your Free LA Estimate</h2>
              <p className="text-center text-slate-600 mb-6">No obligation · Typically responded to within 1 hour</p>
              <EnhancedQuoteForm />
            </ScrollReveal>
          </div>
        </div>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default LosAngeles;
