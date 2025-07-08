import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building, Home, Hotel, Utensils, GraduationCap, ShoppingBag, Factory, Phone } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

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
      </>
    )
  },
  'restaurants': {
    title: 'Restaurants & Food Service',
    description: 'Commercial kitchen exhaust and ventilation cleaning services.',
    icon: <Utensils className="h-6 w-6" />,
    content: (
      <>
        <p className="mb-4">Restaurants require specialized air quality solutions to handle grease, smoke, and cooking odors. Our services help maintain a clean, safe, and comfortable environment for both customers and staff.</p>
        
        <h3 className="text-xl font-semibold mb-2">Our Restaurant Services Include:</h3>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Kitchen exhaust hood cleaning</li>
          <li>Duct and fan cleaning</li>
          <li>Grease trap maintenance</li>
          <li>Make-up air unit cleaning</li>
          <li>NFPA 96 compliance services</li>
        </ul>
      </>
    )
  },
  'education': {
    title: 'Educational Institutions',
    description: 'Creating healthier learning environments in schools, colleges, and universities.',
    icon: <GraduationCap className="h-6 w-6" />,
    content: (
      <>
        <p className="mb-4">Educational facilities face unique air quality challenges. Our services help create healthier learning environments that can improve student performance and reduce absenteeism.</p>
        
        <h3 className="text-xl font-semibold mb-2">Our Education Services Include:</h3>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Classroom and facility air duct cleaning</li>
          <li>HVAC system maintenance</li>
          <li>Allergen and contaminant removal</li>
          <li>Indoor air quality testing</li>
          <li>Preventive maintenance programs</li>
        </ul>
      </>
    )
  },
  'retail': {
    title: 'Retail Spaces',
    description: 'Indoor air quality solutions for shopping centers and retail environments.',
    icon: <ShoppingBag className="h-6 w-6" />,
    content: (
      <>
        <p className="mb-4">Retail environments need to maintain excellent air quality to ensure customer comfort and employee well-being. Our services help create a pleasant shopping experience.</p>
        
        <h3 className="text-xl font-semibold mb-2">Our Retail Services Include:</h3>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Shopping mall air duct cleaning</li>
          <li>Retail store ventilation maintenance</li>
          <li>Odor control solutions</li>
          <li>Energy efficiency improvements</li>
          <li>Regular maintenance contracts</li>
        </ul>
      </>
    )
  },
  'manufacturing': {
    title: 'Manufacturing',
    description: 'Industrial air quality solutions for manufacturing facilities and warehouses.',
    icon: <Factory className="h-6 w-6" />,
    content: (
      <>
        <p className="mb-4">Manufacturing facilities often have unique air quality challenges due to industrial processes. Our specialized services help maintain clean air while ensuring compliance with regulations.</p>
        
        <h3 className="text-xl font-semibold mb-2">Our Manufacturing Services Include:</h3>
        <ul className="list-disc pl-5 mb-6 space-y-2">
          <li>Industrial ventilation cleaning</li>
          <li>Dust and fume extraction system maintenance</li>
          <li>Process exhaust cleaning</li>
          <li>Contaminant control solutions</li>
          <li>Compliance with OSHA and EPA regulations</li>
        </ul>
      </>
    )
  }
};

const IndustryPage = ({ industry }: { industry: string }) => {
  if (!industryData[industry as keyof typeof industryData]) {
    return (
      <div className="min-h-screen flex flex-col">
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

        {/* Related Services */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">We offer a comprehensive range of air quality services to meet your specific needs.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(industryData).slice(0, 3).map(([key, item]) => (
                <div key={key} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="text-brand-600 mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={`/industries/${key}`}>Learn More</Link>
                    </Button>
                  </div>
                </div>
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
