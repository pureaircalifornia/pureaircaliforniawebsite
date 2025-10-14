import React from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Clock, CheckCircle, Award, Users, Building, Star, Phone, Mail, MapPin } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import ResponsiveImage from '@/components/ResponsiveImage';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>About Us | Pure Air California - Professional Air Duct Cleaning</title>
        <meta name="description" content="Learn about Pure Air California's 15+ years of experience in professional air duct cleaning. NADCA certified, fully insured, serving Los Angeles with excellence." />
        <meta name="keywords" content="about pure air california, air duct cleaning company, NADCA certified, Los Angeles air duct cleaning, professional team" />
        <meta property="og:title" content="About Us | Pure Air California" />
        <meta property="og:description" content="Learn about Pure Air California's 15+ years of experience in professional air duct cleaning. NADCA certified, fully insured, serving Los Angeles with excellence." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pureairca.com/about" />
        <link rel="canonical" href="https://pureairca.com/about" />
      </Helmet>
      
      <NavBar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-brand-700 to-brand-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <ResponsiveImage
            src="/images/hero/about-hero-team-group.jpg"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading">About Pure Air California</h1>
            <p className="text-xl text-brand-100 mb-8 max-w-3xl">
              For over 15 years, Pure Air California has been Southern California's trusted name in professional air duct cleaning. 
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

      <main>
        <div className="container mx-auto px-4 py-16">
          
          {/* Company Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <ScrollReveal animation="fadeInUp" delay={0.1}>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-600 mb-2">15+</div>
                <div className="text-gray-600">Years of Experience</div>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fadeInUp" delay={0.2}>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-600 mb-2">10,000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fadeInUp" delay={0.3}>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-600 mb-2">100%</div>
                <div className="text-gray-600">Satisfaction Guarantee</div>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fadeInUp" delay={0.4}>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-600 mb-2">24/7</div>
                <div className="text-gray-600">Emergency Service</div>
              </div>
            </ScrollReveal>
          </div>

          {/* Our Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <ScrollReveal animation="fadeInLeft">
            <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Pure Air California was founded in 2008 with a simple mission: to provide the highest quality air duct cleaning services 
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
            
            <ScrollReveal animation="fadeInRight">
              <div className="relative">
                <ResponsiveImage
                  src="/images/team/team-lou-founder-ceo.jpg"
                  alt="Pure Air California team at work"
                  className="w-full h-96 rounded-lg shadow-lg"
                  loading="lazy"
                  width={400}
                  height={400}
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-semibold">5.0 Rating</span>
                  </div>
                  <p className="text-sm text-gray-600">Based on 500+ reviews</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Our Mission & Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <ScrollReveal animation="fadeInUp">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Shield className="h-6 w-6 text-brand-600" />
                  Our Mission
                </h2>
                <p className="text-gray-600 mb-6">
                  To improve indoor air quality for homes and businesses throughout Southern California by providing professional, 
                  reliable, and affordable air duct cleaning services that promote health, comfort, and energy efficiency.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">NADCA certified technicians</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">Fully licensed and insured</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">Advanced equipment and techniques</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">100% satisfaction guarantee</span>
                  </div>
                </div>
            </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fadeInUp" delay={0.2}>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Award className="h-6 w-6 text-brand-600" />
                  Our Values
                </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-brand-600" />
                    </div>
                  </div>
                  <div>
                      <h3 className="font-semibold mb-2">Integrity</h3>
                      <p className="text-gray-600">We conduct business with honesty and transparency, always putting our customers' needs first.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-brand-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Excellence</h3>
                      <p className="text-gray-600">We strive for the highest standards in everything we do, from customer service to technical expertise.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-brand-600" />
                    </div>
                  </div>
                  <div>
                      <h3 className="font-semibold mb-2">Reliability</h3>
                      <p className="text-gray-600">We show up on time, complete our work efficiently, and stand behind our results.</p>
                    </div>
                  </div>
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
              <ScrollReveal animation="fadeInUp" delay={0.1}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <ResponsiveImage
                    src="/images/team/team-lou-founder-ceo.jpg"
                    alt="Lou, Founder & CEO"
                    className="w-full h-64"
                    loading="lazy"
                    width={400}
                    height={400}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Lou</h3>
                    <p className="text-brand-600 font-medium mb-3">Founder & CEO</p>
                    <p className="text-gray-600 text-sm">
                      With over 15 years of experience in the air quality industry, Lou founded Pure Air California 
                      with a passion for helping families breathe cleaner air.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fadeInUp" delay={0.2}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <ResponsiveImage
                    src="/images/team/team-lead-technician.jpg"
                    alt="Mike, Lead Technician"
                    className="w-full h-64"
                    loading="lazy"
                    width={400}
                    height={400}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Mike</h3>
                    <p className="text-brand-600 font-medium mb-3">Lead Technician</p>
                    <p className="text-gray-600 text-sm">
                      Mike brings 12 years of technical expertise and is NADCA certified. He leads our team 
                      in providing thorough and efficient cleaning services.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fadeInUp" delay={0.3}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <ResponsiveImage
                    src="/images/team/team-customer-relations-manager.jpg"
                    alt="Sarah, Customer Relations"
                    className="w-full h-64"
                    loading="lazy"
                    width={400}
                    height={400}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Sarah</h3>
                    <p className="text-brand-600 font-medium mb-3">Customer Relations Manager</p>
                    <p className="text-gray-600 text-sm">
                      Sarah ensures every customer receives exceptional service from initial contact 
                      through project completion and follow-up.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
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
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Exceptional service! The team was professional, thorough, and respectful of our home. 
                    The difference in air quality was noticeable immediately."
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=50&q=80"
                      alt="Customer"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">David M.</p>
                      <p className="text-sm text-gray-500">Beverly Hills</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fadeInUp" delay={0.2}>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Professional, reliable, and reasonably priced. They cleaned our entire office building 
                    and the improvement in air quality was remarkable. Highly recommend!"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=50&q=80"
                      alt="Customer"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  <div>
                      <p className="font-semibold">Jennifer L.</p>
                      <p className="text-sm text-gray-500">Downtown LA</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="fadeInUp" delay={0.3}>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Outstanding service from start to finish. The team was knowledgeable, efficient, 
                    and left our home spotless. My allergies have improved significantly!"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=50&q=80"
                      alt="Customer"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">Robert K.</p>
                      <p className="text-sm text-gray-500">Santa Monica</p>
                  </div>
                </div>
              </div>
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
  );
};

export default About;
