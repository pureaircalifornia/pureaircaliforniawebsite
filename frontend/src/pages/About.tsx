import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Clock, CheckCircle, Award, Users, Building, Star, Phone, Mail, MapPin } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import ResponsiveImage from '@/components/ResponsiveImage';
import TestimonialCard from '@/components/TestimonialCard';
import SEOProvider from '@/components/SEOProvider';
import SchemaMarkup from '@/components/SchemaMarkup';
import { seoConfig } from '@/utils/seo/seoConfig';
import TrustedBy from '@/components/TrustedBy';


const About = () => {
  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>About Pure Air California | #1 NADCA Certified Air Duct Cleaning Los Angeles</title>
          <meta name="description" content="Learn about Pure Air California, Los Angeles' trusted air duct cleaning experts with over 40 years of experience. NADCA certified, licensed & insured with 184,000+ satisfied customers. Meet our team!" />
          <meta name="keywords" content="about pure air california, air duct cleaning company Los Angeles, NADCA certified Los Angeles, best air duct cleaning team LA, professional HVAC cleaning Los Angeles" />
          <meta name="robots" content="index, follow, max-image-preview:large" />
          <meta name="geo.region" content="US-CA" />
          <meta name="geo.placename" content="Los Angeles" />
          <meta property="og:title" content="About Pure Air California | NADCA Certified Air Duct Cleaning Experts" />
          <meta property="og:description" content="40+ years of experience in professional air duct cleaning. NADCA certified, fully insured, serving Los Angeles with excellence." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.pureaircalifornia.com/about" />
          <meta property="og:site_name" content="Pure Air California" />
          <link rel="canonical" href="https://www.pureaircalifornia.com/about" />
        </Helmet>
        <SEOProvider>
          <SchemaMarkup schema={seoConfig.schema.organization} />
          <SchemaMarkup schema={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://www.pureaircalifornia.com/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.pureaircalifornia.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }} />
        </SEOProvider>

        <NavBar />

        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-r from-brand-700 to-brand-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <ResponsiveImage
              src="/images/hero/hvac-technicians.jpg"
              alt="Professional air duct cleaning team"
              className="w-full h-full"
              loading="eager"
              width={1920}
              height={1080}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-700/90 to-brand-900/90 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-white/20 p-2 rounded-full">
                  <Building className="h-6 w-6" />
                </span>
                <span className="text-brand-200 font-medium">About Our Company</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(100,180,255,0.2), 0 0 60px rgba(100,180,255,0.1)' }}>About Pure Air California</h1>
              <p className="text-xl text-brand-100 mb-8 max-w-3xl">
                For over 40 years, Pure Air California has been Southern California's trusted name in professional air duct cleaning.
                We're committed to improving indoor air quality for homes and businesses throughout Los Angeles and surrounding areas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-gray-100">
                  <Link to="/contact">Contact Our Team</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-700">
                  <Link to="/services">Our Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Brands */}
        <TrustedBy />

        <main>
          <div className="container mx-auto px-4 py-16">

            {/* Company Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {[
                { label: 'Years of Experience', value: '40+' },
                { label: 'Happy Customers', value: '184,000+' },
                { label: 'Satisfaction Guarantee', value: '100%' },
                { label: 'Emergency Service', value: '24/7' }
              ].map((stat, i) => (
                <ScrollReveal key={i} animation="fadeInUp" delay={0.1 * (i + 1)}>
                  <div className="glass-premium p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl md:text-4xl font-bold text-brand-600 mb-2">{stat.value}</div>
                    <div className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Our Story */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <ScrollReveal animation="slideInLeft">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Pure Air California was founded over 40 years ago with a simple mission: to provide the highest quality air duct cleaning services
                    to Southern California residents and businesses. What started as a small family business has grown into one of the region's
                    most trusted air quality specialists.
                  </p>
                  <p className="text-lg text-gray-600 mb-6">
                    Our founder, Lou, recognized the critical importance of clean indoor air after witnessing firsthand how poor air quality
                    affected his family's health. This personal experience drives our commitment to excellence and customer satisfaction.
                  </p>
                  <p className="text-lg text-gray-600">
                    Today, we serve thousands of customers across Los Angeles, Orange County, and surrounding areas, maintaining the same
                    family values and attention to detail that made us successful from day one.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="slideInRight">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-brand-500 to-sky-500 rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>
                  <div className="relative glass-premium p-2 rounded-2xl overflow-hidden shadow-2xl">
                    <ResponsiveImage
                      src="/images/team/team-lou-founder-ceo.jpg"
                      alt="Pure Air California team at work"
                      className="w-full h-96 rounded-xl shadow-inner group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      width={400}
                      height={400}
                    />
                    <div className="absolute bottom-6 left-6 glass-premium backdrop-blur-md p-4 rounded-xl shadow-2xl border-white/40">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        <span className="font-bold text-slate-900">5.0 Rating</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-1">Based on 500+ reviews</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <ScrollReveal animation="fadeInUp">
                <div className="glass-card p-8 h-full">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900">
                    <div className="p-2 bg-brand-50 rounded-lg text-brand-600">
                      <Shield className="h-6 w-6" />
                    </div>
                    Our Mission
                  </h2>
                  <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                    To improve indoor air quality for homes and businesses throughout Southern California by providing professional,
                    reliable, and affordable air duct cleaning services that promote health, comfort, and energy efficiency.
                  </p>
                  <div className="space-y-4">
                    {[
                      'NADCA certified technicians',
                      'Fully licensed and insured',
                      'Advanced equipment and techniques',
                      '100% satisfaction guarantee'
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-slate-600 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fadeInUp" delay={0.2}>
                <div className="glass-card p-8 h-full">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900">
                    <div className="p-2 bg-brand-50 rounded-lg text-brand-600">
                      <Award className="h-6 w-6" />
                    </div>
                    Our Values
                  </h2>
                  <div className="space-y-6">
                    {[
                      {
                        title: 'Integrity',
                        icon: <Shield className="h-6 w-6" />,
                        desc: 'We conduct business with honesty and transparency, always putting our customers\' needs first.'
                      },
                      {
                        title: 'Excellence',
                        icon: <Users className="h-6 w-6" />,
                        desc: 'We strive for the highest standards in everything we do, from customer service to technical expertise.'
                      },
                      {
                        title: 'Reliability',
                        icon: <Clock className="h-6 w-6" />,
                        desc: 'We show up on time, complete our work efficiently, and stand behind our results.'
                      }
                    ].map((value, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/40 transition-colors duration-300">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-600">
                            {value.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 mb-1">{value.title}</h3>
                          <p className="text-slate-600 text-sm leading-relaxed">{value.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Team Section */}
            <div className="mb-16">
              <ScrollReveal animation="fadeInUp">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Our experienced professionals are dedicated to providing exceptional service and maintaining the highest standards of air quality.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: 'Lou',
                    role: 'Founder & CEO',
                    image: '/images/team/team-lou-founder-ceo.jpg',
                    desc: 'With over 40 years of experience in the air quality industry, Lou founded Pure Air California with a passion for helping families breathe cleaner air.',
                    delay: 0.1
                  },
                  {
                    name: 'Mike',
                    role: 'Lead Technician',
                    image: '/images/team/team-lead-technician.jpg',
                    desc: 'Mike brings 12 years of technical expertise and is NADCA certified. He leads our team in providing thorough and efficient cleaning services.',
                    delay: 0.2
                  },
                  {
                    name: 'Sarah',
                    role: 'Customer Relations',
                    image: '/images/team/team-customer-relations-manager.jpg',
                    desc: 'Sarah ensures every customer receives exceptional service from initial contact through project completion and follow-up.',
                    delay: 0.3
                  }
                ].map((member, i) => (
                  <ScrollReveal key={i} animation="fadeInUp" delay={member.delay}>
                    <div className="glass-card group h-full flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-500">
                      <div className="relative h-64 overflow-hidden">
                        <div className="absolute inset-0 bg-brand-900/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                        <ResponsiveImage
                          src={member.image}
                          alt={`${member.name}, ${member.role}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                          width={400}
                          height={400}
                        />
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                        <p className="text-brand-600 font-semibold text-sm mb-4 uppercase tracking-wider">{member.role}</p>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {member.desc}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Certifications & Awards */}
            <div className="bg-gray-50 rounded-xl p-8 mb-16">
              <ScrollReveal animation="fadeInUp">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">Certifications & Awards</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    We maintain the highest industry standards and are proud of our certifications and recognition.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <ScrollReveal animation="fadeInUp" delay={0.1}>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Award className="h-10 w-10 text-brand-600" />
                    </div>
                    <h3 className="font-semibold mb-2">NADCA Certified</h3>
                    <p className="text-sm text-gray-600">National Air Duct Cleaners Association certification for quality standards</p>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="fadeInUp" delay={0.2}>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Shield className="h-10 w-10 text-brand-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Fully Insured</h3>
                    <p className="text-sm text-gray-600">Comprehensive liability and workers compensation coverage</p>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="fadeInUp" delay={0.3}>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Star className="h-10 w-10 text-yellow-500" />
                    </div>
                    <h3 className="font-semibold mb-2">5-Star Rating</h3>
                    <p className="text-sm text-gray-600">Consistently rated 5 stars by our customers across all platforms</p>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="fadeInUp" delay={0.4}>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Building className="h-10 w-10 text-brand-600" />
                    </div>
                    <h3 className="font-semibold mb-2">BBB Accredited</h3>
                    <p className="text-sm text-gray-600">Better Business Bureau A+ rating for ethical business practices</p>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Testimonials */}
            <div className="mb-16">
              <ScrollReveal animation="fadeInUp">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Don't just take our word for it. Here's what our satisfied customers have to say about our services.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ScrollReveal animation="fadeInUp" delay={0.1}>
                  <TestimonialCard
                    name="David M."
                    location="Beverly Hills"
                    quote="Exceptional service! The team was professional, thorough, and respectful of our home. The difference in air quality was noticeable immediately."
                    rating={5}
                  />
                </ScrollReveal>

                <ScrollReveal animation="fadeInUp" delay={0.2}>
                  <TestimonialCard
                    name="Jennifer L."
                    location="Downtown LA"
                    quote="Professional, reliable, and reasonably priced. They cleaned our entire office building and the improvement in air quality was remarkable. Highly recommend!"
                    rating={5}
                  />
                </ScrollReveal>

                <ScrollReveal animation="fadeInUp" delay={0.3}>
                  <TestimonialCard
                    name="Robert K."
                    location="Santa Monica"
                    quote="Outstanding service from start to finish. The team was knowledgeable, efficient, and left our home spotless. My allergies have improved significantly!"
                    rating={5}
                  />
                </ScrollReveal>
              </div>
            </div>

            {/* Contact CTA */}
            <ScrollReveal animation="fadeInUp">
              <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-xl p-8 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Experience Pure Air?</h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                  Join thousands of satisfied customers who trust Pure Air California for their air duct cleaning needs.
                  Contact us today for a free consultation and quote.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-brand-700 hover:bg-gray-100">
                    <Link to="/quote">Get Free Quote</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-700">
                    <a href="tel:+12137924145">
                      <Phone className="w-4 h-4 mr-2 inline" />
                      (213) 792-4145
                    </a>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default About;

