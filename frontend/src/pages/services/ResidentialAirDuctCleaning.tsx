import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AirVent, Check, Phone, ArrowRight, Shield, Clock, Search, Zap, Star } from 'lucide-react';
import ResponsiveImage from '@/components/ResponsiveImage';
import HomeQuoteForm from '@/components/HomeQuoteForm';
import TestimonialCard from '@/components/TestimonialCard';
import SEOProvider from '@/components/SEOProvider';
import SchemaMarkup from '@/components/SchemaMarkup';
import { seoConfig } from '@/utils/seo/seoConfig';
import Gallery from '@/components/Gallery';
import HowToSchema from '@/components/HowToSchema';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

const ResidentialAirDuctCleaning = () => {
  const pageTitle = "Residential Air Duct Cleaning Los Angeles | Home HVAC Cleaning | Pure Air California";
  const pageDescription = "Expert residential air duct cleaning in Los Angeles. Remove dust, allergens & improve indoor air quality in your home. NADCA certified. Free estimates! Call (213) 792-4145.";
  const pageUrl = `${seoConfig.siteUrl}/services/residential-air-duct-cleaning`;

  const faqs = [
    {
      question: "How often should I have my air ducts cleaned?",
      answer: "The National Air Duct Cleaners Association (NADCA) recommends having your air ducts cleaned every 3-5 years. However, homes with pets, residents with allergies, recent renovations, or visible mold growth may benefit from more frequent cleaning (every 1-2 years)."
    },
    {
      question: "How long does the cleaning process take?",
      answer: "A typical residential air duct cleaning for an average-sized home takes approximately 3-5 hours. Larger homes or systems with significant contamination may take longer. We provide a firm time estimate during our initial assessment."
    },
    {
      question: "Will air duct cleaning help my allergies?",
      answer: "Absolutely. Our process removes accumulated dust, pollen, pet dander, and other allergens. Many of our customers report a noticeable reduction in allergy symptoms and respiratory irritation within 24 hours of our service."
    },
    {
      question: "Is your process noisy or messy?",
      answer: "We use high-powered, truck-mounted or portable HEPA vacuums that are designed to be relatively quiet. We use drop cloths and specialized containment strategies to ensure your home remains spotless throughout and after our visit."
    },
    {
      question: "Why should I choose Pure Air California over cheaper alternatives?",
      answer: "Many 'coupon' companies only do a surface cleaning. We are NADCA certified, fully insured, and use industrial-grade equipment to clean the entire system, including the furnace, blower motor, and coils—not just the vents."
    }
  ];

  const processSteps = [
    {
      name: "Initial Inspection",
      text: "Our technicians start by thoroughly examining your ductwork, vents, and HVAC system to assess the level of contamination and identify any potential issues that need addressing."
    },
    {
      name: "System Preparation",
      text: "We carefully prepare your home by covering furniture and flooring near vents. We then create negative pressure in the ductwork using professional-grade equipment to ensure that dust and debris are contained during the cleaning process."
    },
    {
      name: "Thorough Cleaning",
      text: "Using specialized tools, including rotary brushes and high-powered vacuum systems, we dislodge and remove accumulated dust, debris, and contaminants from your entire duct system, including supply and return ducts, registers, and diffusers."
    },
    {
      name: "Sanitizing Treatment",
      text: "Upon request, we can apply an EPA-approved sanitizing treatment to your cleaned ductwork to eliminate remaining bacteria, fungi, and mold spores, and help prevent future microbial growth."
    },
    {
      name: "Final Inspection & Cleanup",
      text: "After cleaning, our technicians perform a final inspection to ensure all ducts are thoroughly cleaned. We then replace all access panels, restore system components, and clean the work area."
    }
  ];

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Services', item: '/services' },
    { name: 'Residential Air Duct Cleaning', item: '/services/residential-air-duct-cleaning' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEOProvider
        title={pageTitle}
        description={pageDescription}
        path="/services/residential-air-duct-cleaning"
      >
        <BreadcrumbSchema items={breadcrumbs} />
        <HowToSchema
          name="Residential Air Duct Cleaning Process"
          description="Our professional 5-step air duct cleaning process ensures your home's air quality is restored."
          steps={processSteps}
          totalTime="PT4H"
        />
        <SchemaMarkup schema={{
          ...seoConfig.schema.service,
          name: "Residential Air Duct Cleaning",
          description: pageDescription,
        }} />
        <SchemaMarkup schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }} />
      </SEOProvider>

      <NavBar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-brand-700 to-brand-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(100,180,255,0.2), 0 0 60px rgba(100,180,255,0.1)' }}>Residential Air Duct Cleaning</h1>
            <p className="text-xl mb-8">
              Professional air duct cleaning services to improve indoor air quality and HVAC efficiency in your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 font-bold text-lg h-auto py-4 px-8" asChild>
                <a href="tel:2137924145" className="flex items-center gap-2">
                  <Phone className="fill-current" size={20} />
                  Call Now: (213) 792-4145
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg h-auto py-4" asChild>
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Health Benefits Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Health & Home Benefits</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Clean air ducts are vital for a healthy home environment. Here is how our service makes a difference.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Allergy Relief",
                icon: <Shield className="h-8 w-8 text-brand-600" />,
                desc: "Removes pollen, pet dander, and dust mites that trigger asthma and allergy symptoms."
              },
              {
                title: "Odor Removal",
                icon: <AirVent className="h-8 w-8 text-brand-600" />,
                desc: "Eliminates musty smells caused by mold growth and accumulated debris within the ductwork."
              },
              {
                title: "System Longevity",
                icon: <Clock className="h-8 w-8 text-brand-600" />,
                desc: "Reduces strain on your HVAC motor, potentially extending its life by several years."
              }
            ].map((benefit, i) => (
              <div key={i} className="glass-card p-8 hover:transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-inner flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-slate-900">Breathe Cleaner Air at Home</h2>
              <p className="text-lg text-slate-600 mb-6">
                Over time, dust, allergens, mold spores, and other contaminants accumulate in your home's air ducts,
                circulating through your living spaces every time your HVAC system runs. Our professional air duct
                cleaning service removes these pollutants, resulting in cleaner air and a healthier home environment.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { title: "Reduced Allergy Symptoms", desc: "Minimize irritants that can trigger respiratory issues" },
                  { title: "Improved Indoor Air Quality", desc: "Remove dust, allergens, and pollutants from your home's air" },
                  { title: "Enhanced HVAC Efficiency", desc: "Clean ducts allow your system to operate more efficiently" },
                  { title: "Extended Equipment Life", desc: "Cleaner systems often last longer and require fewer repairs" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-50 flex items-center justify-center">
                      <Check size={14} className="text-brand-600" />
                    </div>
                    <p className="text-slate-600"><span className="font-bold text-slate-900">{item.title}</span> - {item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-500 to-sky-500 rounded-2xl opacity-10 blur-2xl group-hover:opacity-20 transition-opacity"></div>
              <ResponsiveImage
                src="/images/hero/residential-duct-v2.png"
                alt="Professional residential air duct cleaning result"
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl relative z-10"
                loading="lazy"
                width={700}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>

      <HomeQuoteForm />

      <Gallery />

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Comprehensive Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We follow a thorough, systematic approach to ensure your home's air ducts are completely cleaned.
            </p>
          </div>

          <Tabs defaultValue="inspection" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto gap-2 bg-transparent">
              <TabsTrigger value="inspection">Inspection</TabsTrigger>
              <TabsTrigger value="preparation">Preparation</TabsTrigger>
              <TabsTrigger value="cleaning">Cleaning</TabsTrigger>
              <TabsTrigger value="sanitizing">Sanitizing</TabsTrigger>
              <TabsTrigger value="completion">Completion</TabsTrigger>
            </TabsList>

            <TabsContent value="inspection" className="p-6 bg-white rounded-md mt-4 shadow-sm">
              <div className="flex gap-6 items-start">
                <div className="text-4xl font-bold text-brand-600">01</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Initial Inspection</h3>
                  <p className="text-gray-600">
                    Our technicians start by thoroughly examining your ductwork, vents, and HVAC system to assess the level of
                    contamination and identify any potential issues that need addressing.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preparation" className="p-6 bg-white rounded-md mt-4 shadow-sm">
              <div className="flex gap-6 items-start">
                <div className="text-4xl font-bold text-brand-600">02</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">System Preparation</h3>
                  <p className="text-gray-600">
                    We carefully prepare your home by covering furniture and flooring near vents. We then
                    create negative pressure in the ductwork using professional-grade equipment to ensure
                    that dust and debris are contained during the cleaning process.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cleaning" className="p-6 bg-white rounded-md mt-4 shadow-sm">
              <div className="flex gap-6 items-start">
                <div className="text-4xl font-bold text-brand-600">03</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Thorough Cleaning</h3>
                  <p className="text-gray-600">
                    Using specialized tools, including rotary brushes and high-powered vacuum systems, we dislodge
                    and remove accumulated dust, debris, and contaminants from your entire duct system, including
                    supply and return ducts, registers, and diffusers.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sanitizing" className="p-6 bg-white rounded-md mt-4 shadow-sm">
              <div className="flex gap-6 items-start">
                <div className="text-4xl font-bold text-brand-600">04</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Sanitizing Treatment</h3>
                  <p className="text-gray-600">
                    Upon request, we can apply an EPA-approved sanitizing treatment to your cleaned ductwork to eliminate
                    remaining bacteria, fungi, and mold spores, and help prevent future microbial growth.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="completion" className="p-6 bg-white rounded-md mt-4 shadow-sm">
              <div className="flex gap-6 items-start">
                <div className="text-4xl font-bold text-brand-600">05</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Final Inspection & Cleanup</h3>
                  <p className="text-gray-600">
                    After cleaning, our technicians perform a final inspection to ensure all ducts are thoroughly cleaned.
                    We then replace all access panels, restore system components, and clean the work area, leaving your
                    home clean and your air system functioning optimally.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from satisfied homeowners who are breathing easier with Pure Air California.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="Sarah L."
              location="Los Angeles, CA"
              quote="The team was professional, efficient, and left my home spotless. The air quality is noticeably better, and my allergies have improved significantly. I highly recommend Pure Air California!"
              rating={5}
            />
            <TestimonialCard
              name="Mark R."
              location="Pasadena, CA"
              quote="I was impressed with the thoroughness of the cleaning. The technicians showed me before and after photos, and the difference was incredible. My HVAC system seems to be running more efficiently now too."
              rating={5}
            />
            <TestimonialCard
              name="Emily T."
              location="Santa Monica, CA"
              quote="Excellent service from start to finish. The booking process was easy, the team arrived on time, and they were very respectful of my home. I'm very happy with the results."
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about our residential air duct cleaning service.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Breathe Cleaner Air?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Schedule your professional residential air duct cleaning today and experience the difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 font-bold text-lg px-8 py-6 h-auto shadow-lg hover:scale-105 transition-transform" asChild>
              <a href="tel:2137924145" className="flex items-center gap-2">
                <Phone className="fill-current" size={24} />
                Call (213) 792-4145
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto" asChild>
              <Link to="/quote" className="flex items-center gap-2">
                Get a Free Quote
                <ArrowRight size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>

  );
};

export default ResidentialAirDuctCleaning;
