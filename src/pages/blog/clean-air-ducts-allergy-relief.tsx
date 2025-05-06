
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';

const CleanAirDuctsAllergyRelief = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="text-sm mb-6 text-gray-600">
            <Link to="/" className="hover:text-brand-600">Home</Link> / 
            <Link to="/blog" className="mx-2 hover:text-brand-600">Blog</Link> / 
            <span className="text-brand-600">How Clean Air Ducts Improve Indoor Air Quality for Allergy Sufferers</span>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">How Clean Air Ducts Improve Indoor Air Quality for Allergy Sufferers</h1>
            
            <div className="flex items-center gap-6 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>May 2, 2023</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>By Air Quality Expert</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={16} />
                <span>Allergies, Air Quality</span>
              </div>
            </div>
            
            <img 
              src="https://images.unsplash.com/photo-1599619585752-c3edb42a414c" 
              alt="Person with allergies" 
              className="w-full h-auto rounded-lg mb-8 object-cover"
              style={{ maxHeight: '400px' }}
            />
            
            <div className="prose max-w-none">
              <p className="text-lg mb-6">
                For the millions of Americans who suffer from allergies, finding relief can be a constant struggle. 
                While many focus on cleaning visible surfaces in their homes, they often overlook one of the most 
                significant contributors to poor indoor air quality: dirty air ducts.
              </p>
              
              <h2 className="text-2xl font-semibold mt-10 mb-4">The Hidden Allergen Reservoir in Your Home</h2>
              <p>
                Your home's air duct system serves as the respiratory system of your living space, circulating air 
                throughout every room. Over time, these ducts can accumulate significant amounts of:
              </p>
              <ul className="list-disc pl-6 my-4">
                <li>Dust and dust mites</li>
                <li>Pet dander</li>
                <li>Pollen</li>
                <li>Mold spores</li>
                <li>Insect remains</li>
                <li>Other microscopic allergens</li>
              </ul>
              <p>
                When your heating or cooling system activates, it can disturb these particles, sending them 
                circulating throughout your home's air. For allergy sufferers, this can trigger symptoms even when 
                indoors, where they should feel protected.
              </p>
              
              <h2 className="text-2xl font-semibold mt-10 mb-4">How Professional Cleaning Makes a Difference</h2>
              <p>
                Professional air duct cleaning removes the accumulated debris and allergens from your entire 
                HVAC system. Unlike routine dusting or vacuuming, which might only address visible surfaces, 
                professional cleaning reaches deep into your home's ventilation system to remove contaminants at their source.
              </p>
              <p>
                The process typically includes:
              </p>
              <ol className="list-decimal pl-6 my-4">
                <li>Inspection of ductwork</li>
                <li>Creation of negative pressure using specialized equipment</li>
                <li>Agitation of dust and debris</li>
                <li>Extraction of contaminants</li>
                <li>Cleaning of other HVAC components (registers, grilles, heat exchangers, etc.)</li>
              </ol>
              
              <h2 className="text-2xl font-semibold mt-10 mb-4">Measurable Benefits for Allergy Sufferers</h2>
              <p>
                Research has shown that proper air duct cleaning can significantly improve indoor air quality. 
                A study by the National Air Duct Cleaners Association (NADCA) found that HVAC system cleaning reduced 
                airborne particulates by an average of 75%.
              </p>
              <p>
                For allergy sufferers, this can translate to:
              </p>
              <ul className="list-disc pl-6 my-4">
                <li>Reduced frequency and severity of allergy symptoms</li>
                <li>Decreased need for allergy medications</li>
                <li>Better sleep quality</li>
                <li>Improved overall respiratory health</li>
                <li>Less dust accumulation on surfaces throughout the home</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-10 mb-4">Beyond Allergies: Additional Benefits</h2>
              <p>
                Clean air ducts don't just benefit allergy sufferers. They can also:
              </p>
              <ul className="list-disc pl-6 my-4">
                <li>Improve HVAC efficiency, potentially reducing energy costs</li>
                <li>Extend the life of your heating and cooling equipment</li>
                <li>Remove unpleasant odors</li>
                <li>Create a healthier environment for everyone in your home</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-10 mb-4">How Often Should You Clean Your Air Ducts?</h2>
              <p>
                For most homes, the EPA recommends air duct cleaning every 3-5 years. However, allergy sufferers 
                might benefit from more frequent cleanings, particularly if:
              </p>
              <ul className="list-disc pl-6 my-4">
                <li>You have pets that shed</li>
                <li>Your home is in an area with high pollen counts</li>
                <li>You've recently completed home renovations</li>
                <li>You notice visible dust blowing from vents</li>
                <li>There's been water damage or mold growth in your home</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-10 mb-4">Conclusion</h2>
              <p>
                For allergy sufferers, clean air ducts can make a significant difference in quality of life. 
                By removing the reservoir of allergens that can continuously circulate through your home, 
                professional air duct cleaning helps create a cleaner, healthier indoor environment.
              </p>
              <p>
                If you haven't had your air ducts cleaned recently and you struggle with allergies, 
                it may be time to consider this important home maintenance service.
              </p>
            </div>
            
            <div className="mt-12 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Ready to Breathe Easier?</h3>
              <p className="mb-4">
                Pure Air California offers professional air duct cleaning services specifically designed to 
                improve indoor air quality for allergy sufferers.
              </p>
              <Button asChild className="bg-brand-600 hover:bg-brand-700">
                <Link to="/quote" className="flex items-center gap-2">
                  Get a Free Quote
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
            
            {/* Related Articles */}
            <div className="mt-16">
              <h3 className="text-xl font-semibold mb-6">Related Articles</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <Link to="/blog/health-benefits-air-duct-cleaning" className="group">
                  <div className="border rounded-lg overflow-hidden h-full hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <h4 className="font-medium group-hover:text-brand-600 transition-colors">Health Benefits of Professional Air Duct Cleaning</h4>
                      <p className="text-sm text-gray-600 mt-2">Discover how clean air ducts can improve your overall health and wellbeing.</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/blog/signs-air-ducts-need-cleaning" className="group">
                  <div className="border rounded-lg overflow-hidden h-full hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <h4 className="font-medium group-hover:text-brand-600 transition-colors">Signs Your Air Ducts Need Cleaning</h4>
                      <p className="text-sm text-gray-600 mt-2">Learn to recognize when your air ducts are due for a professional cleaning.</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CleanAirDuctsAllergyRelief;
