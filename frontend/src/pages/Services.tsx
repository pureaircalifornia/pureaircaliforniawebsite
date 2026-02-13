import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ResponsiveImage from '@/components/ResponsiveImage';
import { Home, Building, Fan, Filter, AirVent, ShieldCheck, Wind, CheckCircle, ArrowRight } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import TrustBadges from '@/components/TrustBadges';
import SEOProvider from '@/components/SEOProvider';
import SchemaMarkup from '@/components/SchemaMarkup';
import { seoConfig } from '@/utils/seo/seoConfig';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

// Service card component
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  imageSrc?: string;
}

const ServiceCard = ({ title, description, icon, link, imageSrc }: ServiceCardProps) => (
  <div className="glass-card group hover:-translate-y-2 transition-all duration-300 h-full flex flex-col overflow-hidden border border-white/60">
    {imageSrc && (
      <div className="h-56 w-full relative overflow-hidden">
        <ResponsiveImage
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          width={400}
          height={300}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg">
          {icon}
        </div>
      </div>
    )}
    <div className="p-8 flex flex-col flex-grow">
      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">{title}</h3>
      <p className="text-slate-600 mb-6 flex-grow leading-relaxed">{description}</p>
      <Button asChild variant="outline" className="w-full mt-auto glass-premium border-brand-200 text-brand-700 hover:bg-brand-600 hover:text-white transition-all group/btn justify-between">
        <Link to={link}>
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </Button>
    </div>
  </div>
);

// Services data
const services = [
  {
    key: 'residential-air-duct-cleaning',
    title: 'Residential Air Duct Cleaning',
    description: 'Professional cleaning of your home\'s HVAC system to improve air quality and energy efficiency.',
    icon: <Home className="h-6 w-6 text-brand-600" />,
    link: '/services/residential-air-duct-cleaning',
    imageSrc: '/images/hero/residential-duct.jpg'
  },
  {
    key: 'commercial-air-duct-cleaning',
    title: 'Commercial Air Duct Cleaning',
    description: 'Professional air duct cleaning services for offices, retail spaces, restaurants, and all commercial properties.',
    icon: <Building className="h-6 w-6 text-brand-600" />,
    link: '/services/commercial-air-duct-cleaning',
    imageSrc: '/images/services/commercial-duct.jpg'
  },
  {
    key: 'residential-dryer-vent-cleaning',
    title: 'Residential Dryer Vent Cleaning',
    description: 'Prevent fire hazards and improve dryer efficiency with our professional dryer vent cleaning service.',
    icon: <Fan className="h-6 w-6 text-brand-600" />,
    link: '/services/residential-dryer-vent-cleaning',
    imageSrc: '/images/hero/hvac-dryer-vent-realistic.png'
  },
  {
    key: 'commercial-dryer-vent-cleaning',
    title: 'Commercial Dryer Vent Cleaning',
    description: 'Professional dryer vent cleaning for laundromats, multi-family housing, and commercial facilities.',
    icon: <Building className="h-6 w-6 text-brand-600" />,
    link: '/services/commercial-dryer-vent-cleaning',
    imageSrc: '/images/services/commercial-dryer-vent.png'
  },
  {
    key: 'residential-electrostatic-filter',
    title: 'Residential Electrostatic Filter',
    description: 'Advanced electrostatic air filter installation and maintenance for superior indoor air quality.',
    icon: <Filter className="h-6 w-6 text-brand-600" />,
    link: '/services/residential-electrostatic-filter',
    imageSrc: '/images/services/electrostatic-filter.jpg'
  },
  {
    key: 'commercial-electrostatic-filter',
    title: 'Commercial Electrostatic Filter',
    description: 'Advanced electrostatic air filter systems for commercial facilities seeking superior air quality.',
    icon: <Filter className="h-6 w-6 text-brand-600" />,
    link: '/services/commercial-electrostatic-filter',
    imageSrc: '/images/services/electrostatic-filter.jpg'
  },
  {
    key: 'dryer-vent-maintenance-program',
    title: 'Dryer Vent Maintenance Program',
    description: 'Professional dryer vent maintenance program with annual inspections and preventive cleaning.',
    icon: <ShieldCheck className="h-6 w-6 text-brand-600" />,
    link: '/services/dryer-vent-maintenance-program',
    imageSrc: '/images/services/dryer-vent-maintenance.png'
  },
  {
    key: 'hvac-system-cleaning',
    title: 'HVAC System Cleaning',
    description: 'Complete cleaning and maintenance for your heating and cooling system to improve efficiency.',
    icon: <AirVent className="h-6 w-6 text-brand-600" />,
    link: '/services/hvac-system-cleaning',
    imageSrc: '/images/services/hvac-system-cleaning.png'
  }
];

const Services = () => {
  const pageTitle = "Air Duct & Dryer Vent Cleaning Services Los Angeles | Pure Air California";
  const pageDescription = "Professional air duct cleaning, dryer vent cleaning, HVAC cleaning & electrostatic filter services in Los Angeles. NADCA certified, licensed & insured. Free estimates! (213) 792-4145";
  const pageUrl = `${seoConfig.siteUrl}/services`;

  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <meta name="keywords" content="air duct cleaning services Los Angeles, dryer vent cleaning Los Angeles, electrostatic filters LA, HVAC cleaning Los Angeles, indoor air quality services, commercial duct cleaning LA, residential duct cleaning Los Angeles" />
          <meta name="robots" content="index, follow, max-image-preview:large" />
          <meta name="geo.region" content="US-CA" />
          <meta name="geo.placename" content="Los Angeles" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:url" content={pageUrl} />
          <meta property="og:site_name" content="Pure Air California" />
          <link rel="canonical" href={pageUrl} />
        </Helmet>
        <SEOProvider>
          <SchemaMarkup schema={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "url": pageUrl,
            "name": pageTitle,
            "description": pageDescription,
          }} />
          <SchemaMarkup schema={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": services.map((service, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Service",
                "name": service.title,
                "description": service.description,
                "url": `${seoConfig.siteUrl}${service.link}`
              }
            }))
          }} />
        </SEOProvider>

        <NavBar />

        <main className="flex-grow">
          {/* Hero Section */}
          <div className="relative py-24 lg:py-32 bg-slate-900 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <ResponsiveImage
                src="/images/hero/hvac-3d-render.jpg"
                alt="Advanced ventilation system technology"
                className="w-full h-full object-cover opacity-30 mix-blend-overlay"
                width={1920}
                height={1080}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/90 to-brand-900/80"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 font-medium text-sm mb-6 backdrop-blur-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Licensed, Bonded & Insured</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-8 font-heading tracking-tight" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(100,180,255,0.2), 0 0 60px rgba(100,180,255,0.1)' }}>
                  Premium <span className="text-sky-400 text-glow">Air Quality</span> Solutions
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                  Experience the difference of hospital-grade air duct cleaning.
                  Serving homes and businesses across Los Angeles with certified excellence.
                </p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                  <Button asChild size="lg" className="btn-premium text-white px-10 py-7 h-auto text-lg rounded-xl shadow-2xl">
                    <Link to="/quote">Get Your Free Quote</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="glass-premium border-white/20 text-white hover:bg-white/10 px-10 py-7 h-auto text-lg rounded-xl">
                    <Link to="/contact">Schedule Service</Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="py-12 bg-white border-b border-gray-100">
            <TrustBadges />
          </div>

          {/* Services Grid */}
          <section className="py-24 relative overflow-hidden bg-slate-50">
            <div className="absolute inset-0 bg-mesh opacity-40"></div>
            <div className="container mx-auto px-4 relative z-10">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 tracking-tight">
                    Our <span className="text-brand-600">Expert Services</span>
                  </h2>
                  <div className="w-24 h-1.5 bg-brand-600 mx-auto rounded-full mb-8"></div>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Comprehensive solutions engineered for cleaner, healthier indoor air.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <ScrollReveal key={service.key} animation="fadeInUp" delay={index * 0.1}>
                    <ServiceCard
                      title={service.title}
                      description={service.description}
                      icon={service.icon}
                      link={service.link}
                      imageSrc={service.imageSrc}
                    />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-24 bg-white relative">
            <div className="container mx-auto px-4">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 tracking-tight">
                    Why Choose Pure Air California?
                  </h2>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    The gold standard in air duct cleaning and indoor air quality services.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: <CheckCircle className="h-8 w-8 text-brand-600" />,
                    title: "Certified Experts",
                    desc: "NADCA certified technicians with extensive specialized training."
                  },
                  {
                    icon: <ShieldCheck className="h-8 w-8 text-brand-600" />,
                    title: "Safety First",
                    desc: "Comprehensive safety protocols and full insurance coverage."
                  },
                  {
                    icon: <Wind className="h-8 w-8 text-brand-600" />,
                    title: "Advanced Tech",
                    desc: "State-of-the-art HEPA filtration and negative pressure systems."
                  },
                  {
                    icon: <CheckCircle className="h-8 w-8 text-brand-600" />,
                    title: "Guaranteed",
                    desc: "100% satisfaction guarantee on all our premium services."
                  }
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.1} animation="fadeInUp">
                    <div className="text-center p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                      <div className="bg-brand-50 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-inner">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                      <p className="text-slate-600 font-medium">{item.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-gradient-to-br from-brand-900 to-slate-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-mesh opacity-10"></div>
            <div className="container mx-auto px-4 relative z-10 text-center">
              <ScrollReveal>
                <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                  Ready for <span className="text-sky-400">Pristine Air?</span>
                </h2>
                <p className="text-xl text-brand-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                  Contact Pure Air California today for professional air duct and dryer vent cleaning services.
                  Our certified technicians are ready to revolutionize your indoor air quality.
                </p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                  <Button asChild size="lg" className="btn-premium text-white px-10 py-7 h-auto text-lg rounded-xl shadow-xl">
                    <Link to="/quote">Get Free Quote</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="glass-premium border-white/20 text-white hover:bg-white/10 px-10 py-7 h-auto text-lg rounded-xl">
                    <Link to="/contact">Schedule Service</Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Services;
