import PageHero from '@/components/PageHero';
import SEOProvider from '@/components/SEOProvider';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import RelatedLinks from '@/components/RelatedLinks';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Phone, Check } from 'lucide-react';
import { business } from '@/config/business';

// Retain the existing advertised entry prices. Final scope is quoted individually.
const startingPrices = [
  { name: 'Home air duct cleaning', amount: '$299', note: 'Starting price for eligible residential scopes. System count, condition and access affect the final estimate.', path: '/services/residential-air-duct-cleaning/', image: 'residential', alt: 'Technician cleaning a ceiling duct opening' },
  { name: 'Home dryer vent cleaning', amount: '$149', note: 'Starting price for eligible residential dryer vent scopes. Vent length, routing and access affect the final estimate.', path: '/services/residential-dryer-vent-cleaning/', image: 'dryerAppliance', alt: 'Clothes dryer and exhaust connection in a laundry area' },
];
const faqs = [
  { question: 'How much does air duct cleaning cost in Los Angeles?', answer: 'PAC residential air duct cleaning starts at $299 for eligible scopes. Your final estimate depends on the number of systems, duct access, condition and components included. We confirm the scope and price before work begins.' },
  { question: 'How much does residential dryer vent cleaning cost?', answer: 'PAC residential dryer vent cleaning starts at $149 for eligible scopes. The vent route, length, termination and access affect the final price. Tell us about your property so we can prepare an estimate.' },
  { question: 'Does the starting price cover every home?', answer: 'No. Starting prices are a guide, not a fixed package for every property. Larger, multi-system or difficult-access projects need an individual estimate. Ask which components are included and how additional work would be approved.' },
  { question: 'How are commercial projects priced?', answer: 'Commercial work receives a tailored estimate based on the building, equipment, access and scheduling requirements. Share your property type, location and system count if known. We will discuss whether a site visit is needed.' },
  { question: 'Can I request more than one service?', answer: 'Yes. Tell us if you need air ducts, dryer vents, filters or HVAC components assessed during the same visit. We will outline the relevant services and confirm the combined scope and price.' },
];

export default function Pricing() {
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) };
  return (
    <div className="pac-pricing-page min-h-screen flex flex-col">
      <SEOProvider title="Air Duct Cleaning Cost Los Angeles | Starting at $299" description="Los Angeles home air duct cleaning starts at $299; dryer vent cleaning starts at $149. Explore your options and request a property-specific free estimate." path="/pricing" isLocalBusiness />
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'Pricing & estimates', item: '/pricing/' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <NavBar />
      <main>
        <PageHero title={<>Air duct cleaning prices.<br />Made simple.</>} image="/images/pac/consultation.webp" alt="A service professional discussing paperwork with a homeowner" description="Air duct cleaning costs in Los Angeles depend on your system and the care it needs. Start here, then let’s work out the details together." eyebrow="Pricing & free estimates" />
        <section className="pac-section pac-price-intro" aria-labelledby="starting-prices-heading">
          <div className="pac-container">
            <div className="pac-section-heading"><div><span className="pac-eyebrow">01 / A SIMPLE STARTING POINT</span><h2 id="starting-prices-heading">Good care.<br /><em>Clearly explained.</em></h2></div><p>A starting point for planning. We’ll confirm what your property needs and put the scope and price in writing before work begins.</p></div>
            <div className="pac-starting-prices">{startingPrices.map(service => (
              <Link to={service.path} key={service.path} className="pac-price-row">
                <img src={'/images/pac/' + service.image + '.webp'} alt={service.alt} width="360" height="280" loading="lazy" />
                <div><h3>{service.name}</h3><p>{service.note}</p><span className="pac-text-link">Explore the service <ArrowUpRight size={17} aria-hidden="true" /></span></div>
                <div className="pac-price-start"><span>Starting at</span><strong>{service.amount}</strong></div>
              </Link>
            ))}</div>
            <p className="pac-price-note">Starting prices are not a fixed quote. Your written estimate defines the included work and any additional charges for your property.</p>
          </div>
        </section>
        <section className="pac-price-business pac-section" aria-labelledby="commercial-estimate-heading">
          <div className="pac-container pac-price-business-grid">
            <figure><img src="/images/pac/commercial.webp" alt="Technician inspecting metal ductwork in a commercial building" width="1000" height="800" loading="lazy" /><figcaption>Care planned around your building and your people.</figcaption></figure>
            <div><span className="pac-eyebrow">02 / YOUR BUSINESS. YOUR SCOPE.</span><h2 id="commercial-estimate-heading">A plan that fits<br /><em>your operation.</em></h2><p>Offices, restaurants, hotels and managed properties each need a different approach. We’ll talk through the systems, access and timing, then prepare a tailored commercial estimate.</p><Link className="pac-button" to="/quote/">Discuss your project <ArrowUpRight size={18} aria-hidden="true" /></Link><Link className="pac-text-link" to="/industries/">Explore the industries we serve <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
          </div>
        </section>
        <section className="pac-section"><div className="pac-container pac-price-plan"><div><span className="pac-eyebrow">03 / BEFORE WE BEGIN</span><h2>A clear scope.<br /><em>A comfortable decision.</em></h2><p>Start with your city, property type and the service you’re considering. You don’t need to know all the technical details.</p><a className="pac-text-link" href={business.phoneHref}><Phone size={18} aria-hidden="true" />Talk to PAC · {business.phone}</a></div><ol>{[
          ['Tell us about your space', 'Share what you’ve noticed and any access or scheduling needs.'],
          ['Understand the work', 'We discuss the systems and components to include, and whether an inspection is needed.'],
          ['Review your estimate', 'Confirm the price and scope. Any additional work should be agreed before it begins.'],
        ].map(([title, body], i) => <li key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{body}</p></div><Check size={18} aria-hidden="true" /></li>)}</ol></div></section>
        <section className="pac-section pac-price-faq"><div className="pac-container pac-faq-grid"><div><span className="pac-eyebrow">A FEW GOOD QUESTIONS</span><h2>Before<br /><em>you book.</em></h2><p>Simple answers to help you plan.</p></div><div className="pac-faq-list">{faqs.map(f => <details key={f.question}><summary>{f.question}</summary><p>{f.answer}</p></details>)}</div></div></section>
      </main>
      <RelatedLinks heading="Find the right care for your space" links={[{ label: 'Residential air duct cleaning', path: '/services/residential-air-duct-cleaning/' }, { label: 'Dryer vent cleaning', path: '/services/residential-dryer-vent-cleaning/' }, { label: 'Commercial air duct cleaning', path: '/services/commercial-air-duct-cleaning/' }, { label: 'Request a free estimate', path: '/quote/' }]} />
      <Footer />
    </div>
  );
}

