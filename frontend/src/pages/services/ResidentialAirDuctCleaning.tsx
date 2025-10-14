import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AirVent, Check } from 'lucide-react';
import ResponsiveImage from '@/components/ResponsiveImage';

const ResidentialAirDuctCleaning = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-brand-700 to-brand-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Residential Air Duct Cleaning</h1>
            <p className="text-xl mb-8">
              Professional air duct cleaning services to improve indoor air quality and HVAC efficiency in your home.
            </p>
            <Button size="lg" className="bg-white text-brand-700 hover:bg-gray-100">
              Get a Free Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Breathe Cleaner Air at Home</h2>
              <p className="text-lg text-gray-600 mb-6">
                Over time, dust, allergens, mold spores, and other contaminants accumulate in your home's air ducts, 
                circulating through your living spaces every time your HVAC system runs. Our professional air duct 
                cleaning service removes these pollutants, resulting in cleaner air and a healthier home environment.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Improved Indoor Air Quality</span> - Remove dust, allergens, and pollutants from your home's air</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Enhanced HVAC Efficiency</span> - Clean ducts allow your system to operate more efficiently, potentially reducing energy costs</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Reduced Allergy Symptoms</span> - Minimize irritants that can trigger allergies and respiratory issues</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                    <Check size={14} className="text-brand-600" />
                  </div>
                  <p><span className="font-medium">Extended Equipment Life</span> - Cleaner systems often last longer and require fewer repairs</p>
                </div>
              </div>
            </div>
            
            <div>
              <ResponsiveImage
                src="/images/services/residential-air-duct-cleaning-progress.jpg"
                alt="Professional technician cleaning residential air ducts"
                className="w-full h-64 md:h-96 rounded-lg shadow-lg"
                loading="lazy"
                width={700}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>

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
            <TabsList className="grid w-full grid-cols-5">
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

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about our residential air duct cleaning service.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">How often should I have my air ducts cleaned?</h3>
              <p className="text-gray-600">
                The National Air Duct Cleaners Association recommends having your air ducts cleaned every 3-5 years. 
                However, homes with pets, residents with allergies, recent renovations, or visible mold growth may 
                benefit from more frequent cleaning.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">How long does the cleaning process take?</h3>
              <p className="text-gray-600">
                A typical residential air duct cleaning for an average-sized home takes approximately 3-5 hours, 
                depending on the system size, level of contamination, and ease of access to all components.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Will air duct cleaning help my allergies?</h3>
              <p className="text-gray-600">
                Many customers report reduced allergy symptoms after professional air duct cleaning, as the process 
                removes accumulated dust, pollen, pet dander, and other allergens that would otherwise circulate 
                through your home.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Is your service safe for my home and family?</h3>
              <p className="text-gray-600">
                Yes, our air duct cleaning process is safe for your home and family. We use industry-approved equipment 
                and techniques, and our technicians are trained to minimize disruption and maintain cleanliness during 
                the service.
              </p>
            </div>
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
            <Button size="lg" variant="secondary">Get a Free Quote</Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white hover:bg-white hover:text-brand-600">
              <a href="tel:+12137924145">Call (213) 792-4145</a>
            </Button>
            <a href="tel:+12137924145" className="inline-block mt-2 text-brand-600 hover:text-brand-800 transition-colors font-medium">Call Now</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResidentialAirDuctCleaning;
