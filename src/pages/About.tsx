
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Users, Trophy, Building, Home } from 'lucide-react';

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
              Los Angeles' trusted air quality specialists since 2010, dedicated to creating healthier indoor environments.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-4">
                Pure Air California was founded in 2010 by Daniel Martinez, a former HVAC technician who recognized 
                the critical importance of air duct cleaning for both system efficiency and indoor air quality.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                After witnessing firsthand how neglected air ducts were contributing to poor indoor air quality and 
                respiratory issues for many Los Angeles residents, Daniel set out to create a company dedicated to 
                providing superior air quality solutions.
              </p>
              <p className="text-lg text-gray-600">
                What began as a small, family-owned business has grown into one of Los Angeles' most trusted air quality 
                service providers, with a team of certified technicians serving both residential and commercial clients 
                throughout Southern California. Despite our growth, we remain committed to our founding principles of 
                quality workmanship, exceptional customer service, and creating healthier indoor environments.
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

      {/* Mission & Values */}
      <section className="py-16 bg-gray-50">
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our experienced team of professionals is dedicated to improving indoor air quality across Los Angeles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="mb-4 relative">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80" 
                  alt="Daniel Martinez, Founder & CEO" 
                  className="rounded-full w-40 h-40 object-cover mx-auto" 
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Daniel Martinez</h3>
              <p className="text-brand-600 font-medium mb-3">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                Former HVAC technician with over 20 years of industry experience. Certified Air Systems Cleaning Specialist.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80" 
                  alt="Maria Gonzalez, Operations Director" 
                  className="rounded-full w-40 h-40 object-cover mx-auto" 
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Maria Gonzalez</h3>
              <p className="text-brand-600 font-medium mb-3">Operations Director</p>
              <p className="text-gray-600 text-sm">
                Oversees all service operations, ensuring quality and consistency in every project we undertake.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=400&h=400&q=80" 
                  alt="Robert Chen, Technical Director" 
                  className="rounded-full w-40 h-40 object-cover mx-auto" 
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Robert Chen</h3>
              <p className="text-brand-600 font-medium mb-3">Technical Director</p>
              <p className="text-gray-600 text-sm">
                Mechanical engineer specializing in HVAC systems and indoor air quality solutions for over 15 years.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=400&q=80" 
                  alt="Sophia Williams, Customer Service Manager" 
                  className="rounded-full w-40 h-40 object-cover mx-auto" 
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Sophia Williams</h3>
              <p className="text-brand-600 font-medium mb-3">Customer Service Manager</p>
              <p className="text-gray-600 text-sm">
                Dedicated to ensuring an exceptional experience for every client from first contact through service completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gray-50">
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
                  Over a decade of experience serving thousands of satisfied customers across Los Angeles County.
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
          </div>
        </div>
      </section>

      {/* Community Involvement */}
      <section className="py-16 bg-gray-50">
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
              Call (310) 555-1234
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
