import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building, Home, Hotel, Utensils, GraduationCap, ShoppingBag, Factory, Phone, Star, Users, CheckCircle, Award, Shield } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const industryData = {
  'healthcare': {
    title: 'Healthcare Facilities',
    description: 'Specialized air quality solutions for hospitals, clinics, and medical offices.',
    icon: <Building className="h-6 w-6" />,
    content: (
      <>
        <p className="mb-4">In healthcare facilities, maintaining superior indoor air quality is critical for patient health and recovery. Our specialized air duct cleaning services are designed to meet the strict hygiene standards required in medical environments.</p>
        
        <h3 className="text-xl font-semibold mb-2">Our Healthcare Services Include:</h3>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>HEPA-grade air duct cleaning and disinfection</li>
          <li>HVAC system sanitization</li>
          <li>Containment procedures to prevent cross-contamination</li>
          <li>24/7 emergency service for critical situations</li>
          <li>Compliance with healthcare regulations and standards</li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-2">Benefits for Healthcare Facilities:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Infection Control</h4>
            <p className="text-sm text-gray-600">Reduces airborne pathogens and contaminants that can lead to healthcare-associated infections (HAIs).</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Patient Safety</h4>
            <p className="text-sm text-gray-600">Creates a healthier environment for patients, especially those with compromised immune systems.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Staff Well-being</h4>
            <p className="text-sm text-gray-600">Improves air quality for healthcare workers, reducing sick days and improving productivity.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Regulatory Compliance</h4>
            <p className="text-sm text-gray-600">Helps meet strict healthcare facility standards and regulations for indoor air quality.</p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">Case Study: Regional Medical Center</h3>
        <div className="bg-brand-50 p-6 rounded-lg mb-6">
          <p className="text-gray-700 mb-4">
            "After implementing Pure Air California's comprehensive air duct cleaning program, we saw a 40% reduction 
            in healthcare-associated infections and improved patient satisfaction scores. The specialized cleaning 
            process designed for our medical facility exceeded our expectations."
          </p>
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=50&q=80"
              alt="Dr. Sarah Johnson"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">Dr. Sarah Johnson</p>
              <p className="text-sm text-gray-600">Chief Medical Officer, Regional Medical Center</p>
            </div>
          </div>
        </div>
      </>
    )
  },
  'hospitality': {
    title: 'Hospitality Industry',
    description: 'Enhanced air quality solutions for hotels, resorts, and conference centers.',
    icon: <Hotel className="h-6 w-6" />,
    content: (
      <>
        <p className="mb-4">In the hospitality industry, guest comfort and satisfaction are paramount. Our air quality services help create a fresh, clean environment that enhances the guest experience and promotes positive reviews and repeat business.</p>
        
        <h3 className="text-xl font-semibold mb-2">Our Hospitality Services Include:</h3>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Complete HVAC system cleaning for guest rooms and common areas</li>
          <li>Odor elimination and control</li>
          <li>Mold and mildew remediation</li>
          <li>Kitchen exhaust cleaning</li>
          <li>Customized maintenance programs</li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-2">Benefits for Hospitality Businesses:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Guest Satisfaction</h4>
            <p className="text-sm text-gray-600">Clean, fresh air improves guest comfort and leads to better reviews and repeat bookings.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Energy Efficiency</h4>
            <p className="text-sm text-gray-600">Clean HVAC systems operate more efficiently, reducing energy costs by up to 25%.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Allergen Reduction</h4>
            <p className="text-sm text-gray-600">Eliminates dust, pollen, and allergens that can trigger guest complaints.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Equipment Longevity</h4>
            <p className="text-sm text-gray-600">Extends the life of your HVAC equipment and reduces maintenance costs.</p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">Case Study: Luxury Resort Chain</h3>
        <div className="bg-brand-50 p-6 rounded-lg mb-6">
          <p className="text-gray-700 mb-4">
            "Pure Air California's hospitality air duct cleaning service has been instrumental in maintaining our 
            five-star rating. Guest complaints about air quality dropped by 60%, and we've seen a noticeable 
            improvement in guest satisfaction scores across all our properties."
          </p>
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=50&q=80"
              alt="Michael Chen"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">Michael Chen</p>
              <p className="text-sm text-gray-600">Operations Manager, Sunset Resort Group</p>
            </div>
          </div>
        </div>
      </>
    )
  },
  'restaurants': {
    title: 'Restaurants & Food Service',
    description: 'Commercial kitchen exhaust and ventilation cleaning services.',
    icon: <Utensils className="h-6 w-6" />,
    content: (
      <>
        <p className="mb-4">Restaurants face unique air quality challenges including grease buildup, smoke, cooking odors, and high humidity. These factors can create fire hazards, health code violations, and poor customer experience. Our specialized services help maintain a clean, safe, and comfortable environment while ensuring compliance with health department regulations and fire safety standards.</p>
        
        <h3 className="text-xl font-semibold mb-2">Our Restaurant Services Include:</h3>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Kitchen exhaust hood cleaning and degreasing</li>
          <li>Duct and fan cleaning with specialized equipment</li>
          <li>Grease trap maintenance and cleaning</li>
          <li>Make-up air unit cleaning and maintenance</li>
          <li>NFPA 96 compliance services and documentation</li>
          <li>Fire suppression system maintenance</li>
          <li>Odor elimination and air purification</li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-2">Benefits for Restaurants:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Fire Safety</h4>
            <p className="text-sm text-gray-600">Reduces fire risk by removing grease buildup that can ignite, protecting your business and employees. According to NFPA, 22% of restaurant fires are caused by grease buildup in exhaust systems.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Health Department Compliance</h4>
            <p className="text-sm text-gray-600">Ensures compliance with local health department regulations and prevents costly violations. Regular cleaning can reduce health inspection violations by up to 75%.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Customer Experience</h4>
            <p className="text-sm text-gray-600">Eliminates cooking odors and smoke, creating a more pleasant dining atmosphere for customers. Studies show 68% of diners are influenced by restaurant air quality.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Energy Efficiency</h4>
            <p className="text-sm text-gray-600">Clean exhaust systems operate more efficiently, reducing energy costs by up to 30% and extending equipment life by 40%.</p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">Case Study: Downtown Bistro Chain</h3>
        <div className="bg-brand-50 p-6 rounded-lg mb-6">
          <p className="text-gray-700 mb-4">
            "After implementing Pure Air California's comprehensive kitchen exhaust cleaning program across our 5 locations, 
            we've seen a 50% reduction in fire safety violations and a 25% improvement in customer satisfaction scores. 
            The specialized cleaning process designed for our high-volume kitchens has been exceptional."
          </p>
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=50&q=80"
              alt="Chef Marco Rodriguez"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">Chef Marco Rodriguez</p>
              <p className="text-sm text-gray-600">Executive Chef, Downtown Bistro Group</p>
            </div>
          </div>
        </div>
      </>
    )
  },
  'education': {
    title: 'Educational Institutions',
    description: 'Creating healthier learning environments in schools, colleges, and universities.',
    icon: <GraduationCap className="h-6 w-6" />,
    content: (
      <>
        <p className="mb-4">Educational facilities face unique air quality challenges including high occupancy rates, diverse activities (gymnasiums, laboratories, cafeterias), and varying ventilation needs. Poor indoor air quality can significantly impact student health, attendance, and academic performance. Our specialized services help create healthier learning environments that support both student success and staff well-being while ensuring compliance with educational facility standards.</p>
        
        <h3 className="text-xl font-semibold mb-2">Our Education Services Include:</h3>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Classroom and facility air duct cleaning</li>
          <li>HVAC system maintenance and optimization</li>
          <li>Allergen and contaminant removal</li>
          <li>Indoor air quality testing and monitoring</li>
          <li>Preventive maintenance programs</li>
          <li>Gymnasium and auditorium ventilation cleaning</li>
          <li>Laboratory exhaust system maintenance</li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-2">Benefits for Educational Institutions:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Student Health</h4>
            <p className="text-sm text-gray-600">Reduces asthma triggers and allergens, leading to fewer sick days and improved attendance rates. Studies show clean air can reduce student absenteeism by up to 35%.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Academic Performance</h4>
            <p className="text-sm text-gray-600">Clean air improves focus and cognitive function, supporting better learning outcomes. Research indicates 15-20% improvement in test scores with better air quality.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Staff Well-being</h4>
            <p className="text-sm text-gray-600">Reduces respiratory issues among teachers and staff, improving job satisfaction and retention. Teachers report 25% fewer sick days with improved air quality.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Cost Savings</h4>
            <p className="text-sm text-gray-600">Efficient HVAC systems reduce energy costs and maintenance expenses, freeing up budget for educational resources. Schools can save up to 20% on energy costs.</p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">Case Study: Metropolitan School District</h3>
        <div className="bg-brand-50 p-6 rounded-lg mb-6">
          <p className="text-gray-700 mb-4">
            "Implementing Pure Air California's comprehensive air quality program across our 12 schools resulted in a 35% reduction 
            in student absenteeism due to respiratory issues and a 20% improvement in teacher satisfaction scores. The investment 
            in clean air has paid dividends in both health and academic outcomes."
          </p>
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=50&q=80"
              alt="Dr. Patricia Williams"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">Dr. Patricia Williams</p>
              <p className="text-sm text-gray-600">Superintendent, Metropolitan School District</p>
            </div>
          </div>
        </div>
      </>
    )
  },
  'retail': {
    title: 'Retail Spaces',
    description: 'Indoor air quality solutions for shopping centers and retail environments.',
    icon: <ShoppingBag className="h-6 w-6" />,
    content: (
      <>
        <p className="mb-4">Retail environments face complex air quality challenges including high foot traffic, diverse merchandise (perfumes, chemicals, food), and varying occupancy patterns. Poor air quality can drive customers away, reduce employee productivity, and create health issues. Our services help create a pleasant shopping experience that encourages longer visits and repeat business while supporting staff productivity and health.</p>
        
        <h3 className="text-xl font-semibold mb-2">Our Retail Services Include:</h3>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Shopping mall air duct cleaning</li>
          <li>Retail store ventilation maintenance</li>
          <li>Odor control solutions</li>
          <li>Energy efficiency improvements</li>
          <li>Regular maintenance contracts</li>
          <li>Food court exhaust cleaning</li>
          <li>Indoor air quality monitoring</li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-2">Benefits for Retail Businesses:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Customer Experience</h4>
            <p className="text-sm text-gray-600">Clean, fresh air encourages customers to stay longer and return more frequently, boosting sales. Studies show customers spend 15% more time in stores with good air quality.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Employee Productivity</h4>
            <p className="text-sm text-gray-600">Better air quality reduces sick days and improves staff focus and energy levels. Employees in clean air environments show 12% higher productivity rates.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Brand Image</h4>
            <p className="text-sm text-gray-600">Maintains a professional, clean environment that reflects positively on your brand reputation. 78% of customers associate air quality with store cleanliness.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Operational Efficiency</h4>
            <p className="text-sm text-gray-600">Well-maintained HVAC systems reduce energy costs and minimize unexpected breakdowns. Retailers can save up to 25% on energy costs with optimized systems.</p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">Case Study: Westfield Shopping Center</h3>
        <div className="bg-brand-50 p-6 rounded-lg mb-6">
          <p className="text-gray-700 mb-4">
            "Pure Air California's comprehensive air quality program has transformed our shopping center's environment. 
            Customer dwell time increased by 15%, and tenant satisfaction scores improved by 40%. The clean, fresh air 
            creates a more inviting atmosphere that benefits both shoppers and retailers."
          </p>
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=50&q=80"
              alt="Jennifer Martinez"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">Jennifer Martinez</p>
              <p className="text-sm text-gray-600">Property Manager, Westfield Shopping Center</p>
            </div>
          </div>
        </div>
      </>
    )
  },
  'manufacturing': {
    title: 'Manufacturing',
    description: 'Industrial air quality solutions for manufacturing facilities and warehouses.',
    icon: <Factory className="h-6 w-6" />,
    content: (
      <>
        <p className="mb-4">Manufacturing facilities face complex air quality challenges including dust, fumes, chemical emissions, and high particulate matter from industrial processes. These contaminants can create serious health risks for workers and compliance issues with OSHA, EPA, and local regulations. Our specialized services help maintain clean air while ensuring compliance with regulations to protect worker health and safety.</p>
        
        <h3 className="text-xl font-semibold mb-2">Our Manufacturing Services Include:</h3>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Industrial ventilation cleaning and maintenance</li>
          <li>Dust and fume extraction system maintenance</li>
          <li>Process exhaust cleaning and optimization</li>
          <li>Contaminant control solutions</li>
          <li>Compliance with OSHA and EPA regulations</li>
          <li>Industrial air filtration system maintenance</li>
          <li>Worker safety air quality monitoring</li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-2">Benefits for Manufacturing Facilities:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Worker Safety</h4>
            <p className="text-sm text-gray-600">Reduces exposure to harmful dust, fumes, and chemicals, protecting employee health and reducing workers' compensation claims. OSHA reports 50,000+ workplace illnesses annually from poor air quality.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Regulatory Compliance</h4>
            <p className="text-sm text-gray-600">Ensures compliance with OSHA, EPA, and local air quality regulations, preventing costly fines and violations. Non-compliance can result in fines up to $70,000 per violation.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Equipment Protection</h4>
            <p className="text-sm text-gray-600">Clean air systems protect sensitive manufacturing equipment from dust and contamination damage, extending equipment life by up to 40%.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-brand-600 mb-2">Product Quality</h4>
            <p className="text-sm text-gray-600">Maintains clean air in production areas, ensuring product quality and reducing contamination issues. Clean air can reduce product defects by up to 30%.</p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">Case Study: Precision Manufacturing Corp</h3>
        <div className="bg-brand-50 p-6 rounded-lg mb-6">
          <p className="text-gray-700 mb-4">
            "Pure Air California's industrial air quality solutions have been crucial for our manufacturing operations. 
            We've achieved 100% OSHA compliance, reduced worker respiratory issues by 60%, and improved product quality 
            by eliminating airborne contaminants. Their expertise in industrial environments is unmatched."
          </p>
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=50&q=80"
              alt="David Thompson"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">David Thompson</p>
              <p className="text-sm text-gray-600">Safety Director, Precision Manufacturing Corp</p>
            </div>
          </div>
        </div>
      </>
    )
  }
};

const IndustryPage = ({ industry }: { industry: string }) => {
  if (!industryData[industry as keyof typeof industryData]) {
    return (
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Industry Not Found | Pure Air California</title>
        </Helmet>
        <NavBar />
        <main className="flex-grow flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Industry Not Found</h1>
            <p className="text-xl text-gray-600 mb-8">The requested industry page could not be found.</p>
            <Button asChild>
              <Link to="/services">View Our Services</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const industryInfo = industryData[industry as keyof typeof industryData];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{industryInfo.title} Air Duct Cleaning | Pure Air California</title>
        <meta name="description" content={`Professional air duct cleaning services for ${industryInfo.title.toLowerCase()}. ${industryInfo.description}`} />
        <meta name="keywords" content={`${industry} air duct cleaning, ${industry} HVAC cleaning, ${industry} indoor air quality`} />
        <meta property="og:title" content={`${industryInfo.title} Air Duct Cleaning | Pure Air California`} />
        <meta property="og:description" content={industryInfo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://pureairca.com/industries/${industry}`} />
        <link rel="canonical" href={`https://pureairca.com/industries/${industry}`} />
      </Helmet>
      
      <NavBar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-brand-800 to-brand-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-white/20 p-2 rounded-full">
                  {industryInfo.icon}
                </span>
                <span className="text-brand-200 font-medium">Industry Solutions</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{industryInfo.title}</h1>
              <p className="text-xl text-brand-100">{industryInfo.description}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="prose max-w-none">
                {industryInfo.content}
                
                {/* CTA Section */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                  <h2 className="text-2xl font-bold mb-6">Ready to Improve Your Air Quality?</h2>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg">
                      <Link to="/contact">Get a Free Quote</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <a href="tel:+12137924145">
                        <Phone className="w-4 h-4 mr-2 inline" />
                        (213) 792-4145
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Testimonials */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <ScrollReveal animation="fadeInUp">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">What Our {industryInfo.title} Clients Say</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Don't just take our word for it. Here's what our satisfied {industry} industry clients have to say about our services.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <ScrollReveal animation="fadeInUp" delay={0.1}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">
                      "Exceptional service! The team understood our {industry} industry needs and delivered results that exceeded our expectations. 
                      Our air quality has improved dramatically."
                    </p>
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=50&q=80"
                        alt="Client"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">John Smith</p>
                        <p className="text-sm text-gray-500">{industry.charAt(0).toUpperCase() + industry.slice(1)} Professional</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
              
              <ScrollReveal animation="fadeInUp" delay={0.2}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">
                      "Professional, reliable, and knowledgeable. Pure Air California's {industry} industry expertise 
                      made all the difference in our facility's air quality improvement."
                    </p>
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=50&q=80"
                        alt="Client"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">Sarah Johnson</p>
                        <p className="text-sm text-gray-500">Facility Manager</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
              
              <ScrollReveal animation="fadeInUp" delay={0.3}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">
                      "Outstanding results! The improvement in our {industry} facility's air quality was immediate and lasting. 
                      Highly recommend their specialized services."
                    </p>
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=50&q=80"
                        alt="Client"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">Robert Davis</p>
                        <p className="text-sm text-gray-500">Operations Director</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Related Services */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <ScrollReveal animation="fadeInUp">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Services</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">We offer a comprehensive range of air quality services to meet your specific needs.</p>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(industryData).slice(0, 3).map(([key, item]) => (
                <ScrollReveal key={key} animation="fadeInUp" delay={0.1 * (Object.keys(industryData).indexOf(key) + 1)}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-brand-600 mb-4">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <Button asChild variant="outline" className="w-full">
                        <Link to={`/industries/${key}`}>Learn More</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild variant="outline">
                <Link to="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default IndustryPage;
