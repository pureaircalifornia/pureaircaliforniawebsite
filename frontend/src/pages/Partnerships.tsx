import PageHero from '@/components/PageHero';
import { Handshake, Banknote, Users, Phone, CheckCircle } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import RelatedLinks from '@/components/RelatedLinks';
import SEOProvider from '@/components/SEOProvider';
import EnhancedQuoteForm from '@/components/EnhancedQuoteForm';
import { business } from '@/config/business';

const Partnerships = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <SEOProvider
        title="HVAC & Plumber Referral Program | Pure Air CA"
        description="Partner with Pure Air California for Los Angeles air duct and dryer vent referrals. Agree clear project scope, customer handoff, and written terms."
        path="/partners/"
        isLocalBusiness
      />
      <NavBar />

      <main className="flex-grow">
        <PageHero
          title={
            <>
              HVAC, Plumbing &amp; Property
              <br />
              <em>Trade Partnerships in Los Angeles.</em>
            </>
          }
          description="Partner with Pure Air California to connect your residential and commercial clients with dedicated air duct cleaning, dryer exhaust lint removal, and HVAC hygiene—without risking your customer relationship."
        />

        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Plan a clear customer handoff
              </h2>
              <p className="text-lg text-slate-600">
                Discuss the work your client needs, how our teams communicate, and any COI or
                documentation requirements before arranging a referral.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  i: Banknote,
                  t: 'Written Referral Terms',
                  d: 'Confirm any referral fee, eligibility, and payment timing in a clear written agreement before referring work. Submitting the form starts the conversation.',
                },
                {
                  i: Handshake,
                  t: 'Respect for Your Relationship',
                  d: 'We stay strictly in our air duct and dryer vent lane—never competing with your HVAC service, plumbing, restoration, or property management relationship.',
                },
                {
                  i: Users,
                  t: 'Clear Project Scope & Records',
                  d: 'Agree equipment scope, access windows, COI requirements, and completion photos upfront so your client gets a seamless experience.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  data-static="true"
                  data-view="static"
                  data-once="true"
                  data-index={i}
                  className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-100 hover:shadow-xl hover:border-brand-200 transition-all group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <item.i className="w-8 h-8 text-brand-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.t}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-brand-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 pac-dot-pattern opacity-10 blur-sm mix-blend-overlay" />
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-white">
                Introduce a <span className="text-brand-300">Client or Project</span>
              </h2>
              <p className="text-xl text-brand-100 mb-8 leading-relaxed">
                Share your contact details and the type of project you want to coordinate. Our Los
                Angeles team will follow up directly about scope, availability, and written partner
                terms. Please obtain your customer’s permission before sharing their contact info.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Direct coordination with our Los Angeles scheduling team',
                  'Written scope & price approved by the client before work starts',
                  'Clear communication updates back to your team when requested',
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg font-medium text-brand-50">
                    <CheckCircle className="text-brand-400 shrink-0" aria-hidden="true" /> {text}
                  </li>
                ))}
              </ul>
              <a
                href={business.phoneHref}
                data-call-location="partners-section"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-900 font-semibold hover:bg-brand-50 transition-colors"
              >
                <Phone size={18} aria-hidden="true" /> Call partner desk · {business.phone}
              </a>
            </div>

            <div className="bg-white rounded-3xl p-2 shadow-2xl">
              <EnhancedQuoteForm
                title="Start a trade partnership"
                initialProperty="Business / commercial"
                initialMessage="Trade partner inquiry: "
              />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              How the Referral Program Works
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              HVAC technicians, plumbers, restoration pros, and real estate teams across Los Angeles
              regularly spot dirty ductwork or clogged dryer vents outside their core scope. Align
              with Pure Air California beforehand so you have a reliable, inspection-led partner you
              can trust with your reputation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2 text-slate-900">1. Share the project</h3>
                <p className="text-slate-600 text-sm">
                  Call or submit the form with property type, general scope, and who we should speak
                  with (with customer permission). Confirm written referral terms upfront.
                </p>
              </div>
              <div className="border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2 text-slate-900">2. Written scope &amp; booking</h3>
                <p className="text-slate-600 text-sm">
                  We confirm the included systems, access requirements, and written price with the
                  client before scheduling—no surprise upsells.
                </p>
              </div>
              <div className="border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2 text-slate-900">3. Clean completion</h3>
                <p className="text-slate-600 text-sm">
                  Agree upfront which completion updates or accessible photos should be shared back
                  with your team to close out your job smoothly.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-slate-900 mb-3">Who we partner with</h3>
            <ul className="space-y-3 text-lg text-slate-600 mb-8">
              <li>
                <strong className="text-slate-900">HVAC contractors</strong> — you repair, service,
                and replace equipment; we handle duct cleaning and dryer exhaust runs cleanly.
              </li>
              <li>
                <strong className="text-slate-900">Plumbers &amp; appliance technicians</strong> —
                long or roof-terminated dryer vents come up on laundry calls and need rotary
                cleaning tools.
              </li>
              <li>
                <strong className="text-slate-900">Restoration &amp; remediation firms</strong> —
                coordinate post-smoke or post-remodel duct inspections and source removal.
              </li>
              <li>
                <strong className="text-slate-900">Property managers &amp; realtors</strong> —
                turnover, pre-listing, and HOA stack cleanings scheduled reliably around closing or
                tenant dates.
              </li>
            </ul>
          </div>
        </section>
      </main>

      <RelatedLinks
        heading="Services you can refer"
        links={[
          { label: 'Residential air duct cleaning', path: '/services/residential-air-duct-cleaning/' },
          { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning/' },
          { label: 'HOA & property manager programs', path: '/property-managers/' },
          { label: 'Areas we serve across LA', path: '/locations/' },
        ]}
      />

      <Footer />
    </div>
  );
};

export default Partnerships;
