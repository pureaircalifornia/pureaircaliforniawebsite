import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Users, Trophy, Building, Home, Shield, Star, Briefcase, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import TrustBadges from '@/components/TrustBadges';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-brand-700 to-brand-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Pure Air California</h1>
            <p className="text-xl mb-8">
              Los Angeles' trusted air quality specialists since 1995, dedicated to creating healthier indoor environments.
            </p>
          </div>
        </div>
      </section>
      <TrustBadges />

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-4">
                Pure Air California was founded in 1995 by Lou Chanab, an air duct cleaning expert with over 25 years of experience who recognized the critical importance of air duct cleaning for both system efficiency and indoor air quality.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                After witnessing firsthand how neglected air ducts were contributing to poor indoor air quality and respiratory issues for many Los Angeles residents, Lou set out to create a company dedicated to providing superior air quality solutions.
              </p>
              <p className="text-lg text-gray-600">
                What began as a small, family-owned business has grown into one of Los Angeles' most trusted air quality service providers, with a team of certified technicians serving both residential and commercial clients throughout Southern California. Despite our growth, we remain committed to our founding principles of quality workmanship, exceptional customer service, and creating healthier indoor environments.
              </p>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800" 
                alt="Pure Air California team" 
                className="rounded-lg shadow-lg w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Discretion & High-Profile Clients Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Discretion & Professionalism</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We understand that privacy and professionalism are essential, especially for our high-profile clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-6">
                <Shield size={28} className="text-brand-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Discrete Service</h3>
              <p className="text-gray-600 mb-4">
                We pride ourselves on providing discrete, unobtrusive service for all our clients. Our team understands the importance of 
                privacy, particularly for high-profile residential and commercial properties throughout Los Angeles and Southern California.
              </p>
              <p className="text-gray-600">
                From Hollywood celebrities to Fortune 500 executives, we've earned the trust of discerning clients who value both quality 
                service and complete confidentiality. Our technicians are trained to maintain the utmost professionalism and discretion 
                at all times.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-6">
                <Star size={28} className="text-brand-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">High-Profile Clientele</h3>
              <p className="text-gray-600 mb-4">
                For over two decades, we've been the trusted air quality partner for many of Southern California's most prestigious 
                residences, businesses, and institutions. Our client list includes luxury hotels, private estates in Beverly Hills and 
                Malibu, major studios, and corporate headquarters.
              </p>
              <p className="text-gray-600">
                We understand the unique needs of high-profile properties, from enhanced security protocols to flexible scheduling 
                that minimizes disruption. No matter how prominent the client, we deliver the same exceptional service with the 
                confidentiality and respect that every customer deserves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At Pure Air California, everything we do is guided by our commitment to improving the quality of life 
              through cleaner indoor air.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                  <Trophy size={24} className="text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Quality Excellence</h3>
                <p className="text-gray-600">
                  We never compromise on the quality of our work. Using the most advanced equipment and techniques, 
                  we deliver thorough cleaning that exceeds industry standards.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                  <Users size={24} className="text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Customer First</h3>
                <p className="text-gray-600">
                  Our customers' satisfaction and well-being are our top priorities. We listen to your concerns, 
                  respect your property, and deliver services that address your specific needs.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                  <Home size={24} className="text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Environmental Responsibility</h3>
                <p className="text-gray-600">
                  We're committed to environmentally sustainable practices, from the eco-friendly products we use 
                  to our energy-efficient service methods and waste reduction efforts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our experienced team of professionals is dedicated to improving indoor air quality across Los Angeles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="mb-4 relative">
                <img 
                  src="/logo/VectorWiki-8ZQSp__four-seasons-hotels-and-resorts.svg" 
                  alt="Lou Chanab, Owner" 
                  className="rounded-full w-40 h-40 object-cover mx-auto bg-brand-100" 
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Lou Chanab</h3>
              <p className="text-brand-600 font-medium mb-3">Owner</p>
              <p className="text-gray-600 text-sm">
                With over 25 years of experience in air duct cleaning, Lou leads our team with expertise and dedication to quality service.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 relative">
                <img 
                  src="/logo/VectorWiki-WfVlH__ford-logo-flat.svg" 
                  alt="Elliot Bermudez, Senior Technician" 
                  className="rounded-full w-40 h-40 object-cover mx-auto bg-brand-100" 
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Elliot Bermudez</h3>
              <p className="text-brand-600 font-medium mb-3">Senior Technician</p>
              <p className="text-gray-600 text-sm">
                Elliot's extensive experience and technical expertise make him our most trusted senior technician.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 relative">
                <img 
                  src="/logo/VectorWiki-N35KO__taco-bell.svg" 
                  alt="Jeamy Montez, Lead Technician" 
                  className="rounded-full w-40 h-40 object-cover mx-auto bg-brand-100" 
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Jeamy Montez</h3>
              <p className="text-brand-600 font-medium mb-3">Lead Technician</p>
              <p className="text-gray-600 text-sm">
                Jeamy's attention to detail and commitment to excellence ensure every job meets our high standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Certifications & Memberships</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We maintain the highest industry standards through continuous training and professional certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <Trophy size={28} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">NADCA Certified</h3>
              <p className="text-gray-600">
                All our technicians are certified by the National Air Duct Cleaners Association, the leading industry association for air duct cleaning professionals.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <Trophy size={28} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">ASCS Certified</h3>
              <p className="text-gray-600">
                Our team includes certified Air Systems Cleaning Specialists who have demonstrated advanced knowledge in HVAC system cleaning.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <Trophy size={28} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Indoor Air Quality Association</h3>
              <p className="text-gray-600">
                We're active members of the IAQA, keeping up with the latest research and best practices for improving indoor air quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Pure Air California</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              What sets us apart from other air quality service providers in Los Angeles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 max-w-5xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                  <Check size={20} className="text-brand-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Proven Track Record</h3>
                <p className="text-gray-600">
                  Three decades of experience serving thousands of satisfied customers across Los Angeles County.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                  <Check size={20} className="text-brand-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Advanced Equipment</h3>
                <p className="text-gray-600">
                  We invest in the latest cleaning technology and equipment for superior results and efficiency.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                  <Check size={20} className="text-brand-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Comprehensive Services</h3>
                <p className="text-gray-600">
                  One-stop solution for all your air quality needs, from residential to complex commercial systems.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                  <Check size={20} className="text-brand-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
                <p className="text-gray-600">
                  Clear, detailed quotes with no hidden fees or surprise charges when the work is complete.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                  <Check size={20} className="text-brand-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Fully Insured & Bonded</h3>
                <p className="text-gray-600">
                  Your property is protected with our comprehensive insurance coverage and professional guarantees.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                  <Check size={20} className="text-brand-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Satisfaction Guarantee</h3>
                <p className="text-gray-600">
                  We stand behind our work with a 100% satisfaction guarantee on all services we provide.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                  <Check size={20} className="text-brand-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Emergency Services</h3>
                <p className="text-gray-600">
                  Available 24/7 for urgent air quality issues, with rapid response times and immediate solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Sectors */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide specialized air quality solutions for a wide range of commercial and industrial sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Link to="/industries/healthcare" className="group">
              <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                <Building size={32} className="text-brand-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Healthcare Facilities</h3>
                <p className="text-gray-600 mb-4">
                  Specialized air quality services for hospitals, clinics, and medical offices.
                </p>
                <span className="text-brand-600 font-medium group-hover:underline">Learn more →</span>
              </div>
            </Link>
            
            <Link to="/industries/hospitality" className="group">
              <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                <Building size={32} className="text-brand-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Hospitality</h3>
                <p className="text-gray-600 mb-4">
                  Enhanced air quality solutions for hotels, resorts, and conference centers.
                </p>
                <span className="text-brand-600 font-medium group-hover:underline">Learn more →</span>
              </div>
            </Link>
            
            <Link to="/industries/restaurants" className="group">
              <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                <Building size={32} className="text-brand-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Restaurants</h3>
                <p className="text-gray-600 mb-4">
                  Commercial kitchen exhaust and ventilation cleaning services.
                </p>
                <span className="text-brand-600 font-medium group-hover:underline">Learn more →</span>
              </div>
            </Link>
            
            <Link to="/industries/education" className="group">
              <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                <Building size={32} className="text-brand-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Educational Institutions</h3>
                <p className="text-gray-600 mb-4">
                  Creating healthier learning environments in schools, colleges, and universities.
                </p>
                <span className="text-brand-600 font-medium group-hover:underline">Learn more →</span>
              </div>
            </Link>
            
            <Link to="/industries/retail" className="group">
              <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                <Building size={32} className="text-brand-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Retail Spaces</h3>
                <p className="text-gray-600 mb-4">
                  Indoor air quality solutions for shopping centers and retail environments.
                </p>
                <span className="text-brand-600 font-medium group-hover:underline">Learn more →</span>
              </div>
            </Link>
            
            <Link to="/industries/manufacturing" className="group">
              <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                <Building size={32} className="text-brand-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Manufacturing</h3>
                <p className="text-gray-600 mb-4">
                  Industrial air quality solutions for manufacturing facilities and warehouses.
                </p>
                <span className="text-brand-600 font-medium group-hover:underline">Learn more →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Involvement */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Community Involvement</h2>
              <p className="text-lg text-gray-600">
                We're proud to give back to the Los Angeles community that has supported our growth over the years.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Building size={32} className="text-brand-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Clean Air for Schools Program</h3>
                <p className="text-gray-600">
                  Our volunteer initiative provides free air duct cleaning services to underserved schools in the Los Angeles area, 
                  helping to create healthier learning environments for students.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Home size={32} className="text-brand-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Breathe Easy Foundation</h3>
                <p className="text-gray-600">
                  We partner with local health organizations to provide free air quality services to low-income families 
                  with members suffering from respiratory conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Breathe Cleaner Air?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Experience the Pure Air California difference. Contact our team today to schedule your service.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary">Get a Free Quote</Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white hover:text-brand-600">
              Call (213) 792-4145
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
