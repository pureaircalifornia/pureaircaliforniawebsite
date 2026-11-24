
import React from 'react';
import IndustryPageLayout from '@/components/IndustryPageLayout';
import { Check, Shield, Star, Building } from 'lucide-react';

const Education = () => {
  return (
    <IndustryPageLayout
      process={[
        { step: "Campus survey and procurement", detail: "We walk the site with facilities, scope the work building by building, and handle the purchase order, insurance certificates and vendor documentation districts require." },
        { step: "Scheduling into breaks", detail: "Work is planned into summer, winter or spring break, or weekends, so classrooms are back in normal use before students return." },
        { step: "Classroom and common-area systems", detail: "Ductwork, registers, coils and blowers are cleaned across classrooms, offices, gyms and cafeterias." },
        { step: "Low-disruption containment", detail: "Work areas are isolated so dust does not migrate into cleaned or occupied spaces, and equipment is removed at the end of each shift." },
        { step: "Reporting by building", detail: "Documentation is issued per building so facilities teams and district administrators have a clear record of what was completed where." },
      ]}
      faqs={[
        { question: "Why does duct cleaning matter in schools specifically?", answer: "Classrooms hold far more people per square foot than most buildings, and children breathe more air relative to body weight than adults. Dust, pollen and mold spores circulating through the HVAC system are a common trigger for asthma and allergy symptoms during the school day." },
        { question: "When can the work be scheduled?", answer: "Almost all campus work is done during summer break, winter and spring breaks, or on weekends, so classrooms are back in normal use before students return." },
        { question: "Can duct cleaning help with absenteeism?", answer: "Cleaner indoor air reduces exposure to the allergens and irritants that aggravate asthma, which is one of the leading causes of missed school days. Results vary by building and by what else is driving air quality on the site." },
        { question: "Do you work with school districts and private schools on purchase orders?", answer: "Yes. We handle district procurement paperwork, purchase orders and the insurance and vendor documentation that campuses require before work begins." },
      ]}
      seoTitle="School Air Duct Cleaning Los Angeles"
      seoDescription="Air duct cleaning for LA schools, colleges and universities. Reduce allergens and absenteeism, work scheduled around terms and breaks. Call (213) 792-4145."
      path="/industries/education"
      breadcrumbLabel="Education"
      serviceName="School and Campus Air Duct Cleaning"
      title="School Air Duct Cleaning in Los Angeles"
      subtitle="Creating healthier learning environments in schools, colleges, and universities."
      heroImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80"
    >
      {/* Overview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Better Air Quality for Better Learning Outcomes</h2>
            <p className="text-lg text-gray-600 mb-6">
              Research consistently shows that indoor air quality directly impacts student performance, attendance, and overall well-being. Pure Air California provides specialized air quality services designed specifically for educational institutions throughout Southern California.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              From K-12 schools to universities, our education-focused services help create healthier learning environments while improving energy efficiency and reducing operational costs.
            </p>
            <div className="mt-8 p-6 bg-brand-50 rounded-lg border border-brand-100">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex-shrink-0 flex items-center justify-center">
                  <Shield size={24} className="text-brand-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Student Health Focus</h3>
                  <p className="text-gray-600">
                    Our education-specific services are designed with student and staff health as the top priority. We use environmentally-friendly cleaning methods and can schedule services during breaks to minimize disruption to educational activities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services and Benefits Sections */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Education-Specific Services</h2>
          <p className="text-lg text-gray-600 mb-10 text-center max-w-3xl mx-auto">
            We provide comprehensive air quality solutions tailored for educational environments:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">HVAC and Air Duct Services</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Complete HVAC system cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Air duct inspection and cleaning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Mold remediation and prevention</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Antimicrobial treatment application</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Filtration and Indoor Air Quality</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>High-efficiency filter installation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Electrostatic filter systems</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Indoor air quality testing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-brand-600" />
                  <span>Allergen reduction strategies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Why Educational Institutions Trust Pure Air California</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <Building size={28} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Education Experience</h3>
              <p className="text-gray-600">
                We understand the unique challenges of educational facilities and work within your constraints and schedules.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <Shield size={28} className="text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safety Priority</h3>
              <p className="text-gray-600">
                All our technicians undergo background checks and follow strict protocols when working in educational settings.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <Star size={28} className="text-brand-600 fill-current" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Budget-Friendly Solutions</h3>
              <p className="text-gray-600">
                We understand educational budget constraints and provide cost-effective solutions that maximize your investment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </IndustryPageLayout>
  );
};

export default Education;
