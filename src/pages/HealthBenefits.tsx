
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import ProcessStep from '@/components/ProcessStep';
import QuoteForm from '@/components/QuoteForm';
import { Helmet } from 'react-helmet';

const HealthBenefits = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Health Benefits of Air Duct Cleaning | Pure Air California</title>
        <meta name="description" content="Discover how professional air duct cleaning can alleviate allergy symptoms, reduce asthma triggers, and improve overall health by enhancing your indoor air quality." />
        <meta name="keywords" content="air duct cleaning health benefits, allergy relief, asthma symptom reduction, indoor air quality, respiratory health, Los Angeles air quality improvement" />
      </Helmet>
      
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative py-24 bg-gradient-to-r from-[#0A3D7C] to-[#5BBDE4]">
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 font-heading">
              Breathe Easier With Professional Air Duct Cleaning
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Discover how clean air ducts can reduce allergens, ease asthma symptoms, and improve 
              your overall health and wellbeing through better indoor air quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-[#0A3D7C] hover:bg-gray-100">
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-heading font-bold mb-6">
                How Clean Air Ducts Improve Your Health
              </h2>
              
              <p className="text-lg text-gray-600 mb-6">
                Your home's air ducts are the pathways through which heated and cooled air travels. When these 
                ducts become filled with dust, allergens, pet dander, and other contaminants, these particles 
                are circulated throughout your home every time your HVAC system runs.
              </p>
              
              <p className="text-lg text-gray-600 mb-6">
                According to the EPA, indoor air can be 2-5 times more polluted than outdoor air. Since the average 
                American spends about 90% of their time indoors, the quality of the air you breathe at home has a 
                significant impact on your health and wellbeing.
              </p>
              
              <div className="mb-10">
                <h3 className="text-2xl font-heading font-semibold mb-4">Relief for Allergy Sufferers</h3>
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <p className="text-gray-600 mb-4">
                    For the estimated 50 million Americans who suffer from allergies, clean air ducts can provide 
                    significant relief by reducing exposure to common triggers:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center mt-1">
                        <Check size={14} className="text-[#0A3D7C]" />
                      </div>
                      <div>
                        <span className="font-medium">Pollen Reduction:</span> Clean air ducts help prevent the circulation 
                        of seasonal pollens that can trigger hay fever and other allergic reactions.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center mt-1">
                        <Check size={14} className="text-[#0A3D7C]" />
                      </div>
                      <div>
                        <span className="font-medium">Pet Dander Control:</span> Professional cleaning removes accumulated 
                        pet dander from your ductwork, reducing this common allergen throughout your home.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center mt-1">
                        <Check size={14} className="text-[#0A3D7C]" />
                      </div>
                      <div>
                        <span className="font-medium">Dust Mite Allergen Removal:</span> Dust mites and their waste products 
                        are a leading cause of allergic reactions. Air duct cleaning helps remove these microscopic allergens.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5BBDE4]/20 flex items-center justify-center mt-1">
                        <Check size={14} className="text-[#0A3D7C]" />
                      </div>
                      <div>
                        <span className="font-medium">Mold Spore Elimination:</span> Damp air ducts can harbor mold growth. 
                        Professional cleaning removes existing mold and helps prevent future infestations.
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <img 
                      src="https://images.unsplash.com/photo-1597345637412-9fd611e758e4" 
                      alt="Woman breathing clean air" 
                      className="rounded-xl shadow-md w-full h-auto"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <h4 className="text-xl font-heading font-semibold mb-3">Common Allergy Symptoms Reduced by Clean Air Ducts:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0A3D7C]"></div>
                        <span>Sneezing and runny nose</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0A3D7C]"></div>
                        <span>Itchy, watery eyes</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0A3D7C]"></div>
                        <span>Congestion and sinus pressure</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0A3D7C]"></div>
                        <span>Scratchy throat</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0A3D7C]"></div>
                        <span>Skin irritation and rashes</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0A3D7C]"></div>
                        <span>Headaches</span>
                      </li>
                    </ul>
                    <p className="mt-4 text-gray-600">
                      Many of our clients with allergies report significant improvement in their symptoms within days 
                      of having their air ducts professionally cleaned.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-10">
                <h3 className="text-2xl font-heading font-semibold mb-4">Asthma Management and Respiratory Health</h3>
                <p className="text-gray-600 mb-6">
                  For the 25 million Americans with asthma, including 7 million children, clean air ducts can play 
                  a crucial role in managing symptoms and reducing attacks. Asthma triggers commonly found in dirty 
                  air ducts include:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="font-heading font-semibold mb-3">Dust and Particulate Matter</h4>
                    <p className="text-gray-600">
                      Microscopic dust particles can irritate the bronchial tubes and trigger asthma attacks. 
                      Professional air duct cleaning removes these particles from your ventilation system.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="font-heading font-semibold mb-3">Mold and Mildew</h4>
                    <p className="text-gray-600">
                      Mold spores are potent asthma triggers. Air duct cleaning eliminates mold growth within your 
                      HVAC system, preventing these spores from being distributed throughout your home.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="font-heading font-semibold mb-3">Chemical Irritants</h4>
                    <p className="text-gray-600">
                      Cleaning products, VOCs, and other chemical residues can accumulate in air ducts. Removing these 
                      irritants helps reduce respiratory inflammation and asthma symptoms.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="font-heading font-semibold mb-3">Bacterial and Viral Pathogens</h4>
                    <p className="text-gray-600">
                      Viruses and bacteria that can trigger respiratory infections may circulate through dirty air ducts. 
                      Regular cleaning helps reduce these potential pathogens in your home.
                    </p>
                  </div>
                </div>
                
                <div className="bg-[#0A3D7C]/5 p-6 rounded-xl mb-6">
                  <h4 className="font-heading font-semibold mb-3">Research on Indoor Air Quality and Asthma</h4>
                  <p className="text-gray-600 mb-4">
                    According to the American Lung Association, improving indoor air quality is one of the most effective 
                    strategies for managing asthma. Studies have shown that reducing airborne triggers through measures like 
                    air duct cleaning can:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0A3D7C]"></div>
                      <span>Decrease the frequency and severity of asthma attacks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0A3D7C]"></div>
                      <span>Reduce the need for rescue medications</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0A3D7C]"></div>
                      <span>Improve lung function and breathing capacity</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0A3D7C]"></div>
                      <span>Decrease emergency room visits and hospitalizations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0A3D7C]"></div>
                      <span>Enhance overall quality of life for asthma sufferers</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mb-10">
                <h3 className="text-2xl font-heading font-semibold mb-4">Additional Health Benefits of Air Duct Cleaning</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
                    <div className="w-12 h-12 bg-[#5BBDE4]/20 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0A3D7C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                      </svg>
                    </div>
                    <h4 className="font-heading font-semibold mb-2">Reduced Odors</h4>
                    <p className="text-gray-600">
                      Eliminate persistent musty or stale odors by removing the source—contaminants in your air ducts.
                    </p>
                  </div>
                  <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
                    <div className="w-12 h-12 bg-[#5BBDE4]/20 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0A3D7C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h4 className="font-heading font-semibold mb-2">Improved Energy</h4>
                    <p className="text-gray-600">
                      Better sleep and reduced exposure to allergens and toxins can lead to increased energy levels.
                    </p>
                  </div>
                  <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
                    <div className="w-12 h-12 bg-[#5BBDE4]/20 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0A3D7C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                      </svg>
                    </div>
                    <h4 className="font-heading font-semibold mb-2">Enhanced Sleep</h4>
                    <p className="text-gray-600">
                      Clean air can lead to better quality sleep by reducing nighttime allergy symptoms and breathing issues.
                    </p>
                  </div>
                  <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
                    <div className="w-12 h-12 bg-[#5BBDE4]/20 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0A3D7C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h4 className="font-heading font-semibold mb-2">Immune Support</h4>
                    <p className="text-gray-600">
                      Reducing the burden on your immune system from constant allergen exposure can improve overall immunity.
                    </p>
                  </div>
                  <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
                    <div className="w-12 h-12 bg-[#5BBDE4]/20 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0A3D7C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h4 className="font-heading font-semibold mb-2">Mental Clarity</h4>
                    <p className="text-gray-600">
                      Better air quality can improve cognitive function and mental focus by ensuring proper oxygen flow.
                    </p>
                  </div>
                  <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
                    <div className="w-12 h-12 bg-[#5BBDE4]/20 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0A3D7C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                    </div>
                    <h4 className="font-heading font-semibold mb-2">Longer HVAC Life</h4>
                    <p className="text-gray-600">
                      Cleaner ducts mean less strain on your system, reducing the likelihood of health-impacting breakdowns.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-heading font-semibold mb-4">Our Comprehensive Cleaning Process</h3>
                <p className="text-gray-600 mb-6">
                  Pure Air California uses a thorough, multi-step air duct cleaning process designed to maximize health benefits:
                </p>
                
                <div className="space-y-6 mb-8">
                  <ProcessStep 
                    number={1} 
                    title="Inspection" 
                    description="We begin with a thorough inspection of your entire HVAC system to identify specific problem areas and contaminants."
                  />
                  <ProcessStep 
                    number={2} 
                    title="Negative Pressure Application" 
                    description="Our powerful vacuum equipment creates negative pressure in your ducts, preventing contaminants from spreading during cleaning."
                  />
                  <ProcessStep 
                    number={3} 
                    title="Agitation & Removal" 
                    description="We use specialized tools to dislodge contaminants from duct surfaces, which are then captured by our HEPA-filtered vacuum system."
                  />
                  <ProcessStep 
                    number={4} 
                    title="Sanitization (Optional)" 
                    description="For homes with mold or bacterial concerns, we offer EPA-approved sanitizing treatments to eliminate microorganisms."
                  />
                  <ProcessStep 
                    number={5} 
                    title="Final Inspection" 
                    description="We conduct a final inspection to ensure all ducts are thoroughly cleaned and ready to deliver cleaner air."
                    isLast
                  />
                </div>
                
                <div className="bg-[#0A3D7C]/5 p-6 rounded-xl">
                  <h4 className="font-heading font-semibold mb-3">When to Consider Air Duct Cleaning for Health Benefits</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0A3D7C]"></div>
                      <span>If you or family members have allergies, asthma, or other respiratory conditions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0A3D7C]"></div>
                      <span>After moving into a new home (especially if previous occupants had pets)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0A3D7C]"></div>
                      <span>Following home renovations or construction projects</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0A3D7C]"></div>
                      <span>If you've experienced water damage or mold issues</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0A3D7C]"></div>
                      <span>When dust builds up quickly after cleaning your home</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0A3D7C]"></div>
                      <span>If it's been more than 3-5 years since your last air duct cleaning</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <QuoteForm />
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-heading font-semibold text-xl mb-4">Client Success Stories</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="italic text-gray-600 mb-3">
                        "After years of struggling with seasonal allergies, I decided to try air duct cleaning. The difference was immediate—I'm breathing easier and sleeping better than I have in years."
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0A3D7C] flex items-center justify-center text-white font-medium">
                          RH
                        </div>
                        <div>
                          <div className="font-medium">Robert H.</div>
                          <div className="text-sm text-gray-500">Beverly Hills</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="italic text-gray-600 mb-3">
                        "My daughter's asthma attacks have decreased significantly since we had Pure Air California clean our ducts. As a mother, I'm incredibly grateful for the peace of mind."
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#5BBDE4] flex items-center justify-center text-white font-medium">
                          MT
                        </div>
                        <div>
                          <div className="font-medium">Maria T.</div>
                          <div className="text-sm text-gray-500">Malibu</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="italic text-gray-600 mb-3">
                        "I was skeptical about air duct cleaning, but after seeing how much dust and debris was removed from our system, I'm a believer. My morning congestion has disappeared completely!"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0A3D7C] flex items-center justify-center text-white font-medium">
                          DW
                        </div>
                        <div>
                          <div className="font-medium">David W.</div>
                          <div className="text-sm text-gray-500">Century City</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                  <div className="bg-[#0A3D7C] p-4 text-white">
                    <h3 className="font-heading font-semibold text-xl">Learn More About Air Quality</h3>
                  </div>
                  <div className="bg-white p-6">
                    <div className="space-y-3">
                      <Button asChild variant="ghost" className="w-full justify-start">
                        <Link to="/blog/clean-air-ducts-allergy-relief" className="text-left">
                          How Clean Air Ducts Improve Indoor Air Quality for Allergy Sufferers
                        </Link>
                      </Button>
                      <Button asChild variant="ghost" className="w-full justify-start">
                        <Link to="/blog/signs-air-ducts-need-cleaning" className="text-left">
                          5 Signs Your Air Ducts Need Cleaning
                        </Link>
                      </Button>
                      <Button asChild variant="ghost" className="w-full justify-start">
                        <Link to="/blog/hvac-efficiency-clean-air-ducts-save-money" className="text-left">
                          HVAC Efficiency: How Clean Air Ducts Save You Money
                        </Link>
                      </Button>
                      <Button asChild variant="ghost" className="w-full justify-start">
                        <Link to="/blog/air-duct-cleaning-process-what-to-expect" className="text-left">
                          The Air Duct Cleaning Process: What to Expect
                        </Link>
                      </Button>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/blog">View All Articles</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#0A3D7C] to-[#5BBDE4] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Ready to Breathe Cleaner, Healthier Air?
            </h2>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Schedule your professional air duct cleaning today and experience the difference 
              it can make for your health, comfort, and overall wellbeing.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-[#0A3D7C] hover:bg-gray-100">
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/contact">Contact Our Specialists</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HealthBenefits;
