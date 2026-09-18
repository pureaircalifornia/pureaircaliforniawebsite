import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Home, Wind, Shield, Phone, Calculator, ArrowRight, Dog, MapPin, Search } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import RelatedLinks from '@/components/RelatedLinks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SEOProvider from '@/components/SEOProvider';
import { seoConfig } from '@/utils/seo/seoConfig';

const AirQualityCalculator = () => {
  const [step, setStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  const [answers, setAnswers] = useState({
    zipCode: '',
    homeAge: '',
    pets: '0',
    allergies: false,
    lastCleaned: 'never'
  });

  const [score, setScore] = useState<{ value: number; dangerLevel: string; color: string; advice: string } | null>(null);

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else calculateScore();
  };

  const calculateScore = () => {
    setIsCalculating(true);
    setTimeout(() => {
      let riskPoints = 0;
      
      // Basic heuristic for demo calculation
      if (answers.homeAge === '10+') riskPoints += 30;
      if (answers.homeAge === '5-10') riskPoints += 15;
      
      if (answers.pets === '1-2') riskPoints += 20;
      if (answers.pets === '3+') riskPoints += 35;
      
      if (answers.allergies) riskPoints += 40;
      
      if (answers.lastCleaned === 'never') riskPoints += 40;
      if (answers.lastCleaned === '3+') riskPoints += 25;
      if (answers.lastCleaned === '1-3') riskPoints += 10;
      
      // LA specific bump (Wildfires/Smog)
      if (answers.zipCode.startsWith('9')) riskPoints += 15;
      
      const normalizedScore = Math.min(100, riskPoints);
      
      let dangerLevel, color, advice;
      
      if (normalizedScore > 75) {
        dangerLevel = 'POOR - CRITICAL RISK';
        color = 'text-red-600';
        advice = 'Your home poses a significant respiratory risk. You have multiple aggravating factors including age, pets, and time since last service. Immediate deep extraction cleaning is highly recommended.';
      } else if (normalizedScore > 40) {
        dangerLevel = 'MODERATE RISK';
        color = 'text-amber-500';
        advice = 'Contaminants are likely circulating through your HVAC system. A professional cleaning will drastically improve efficiency and reduce allergens.';
      } else {
        dangerLevel = 'GOOD / LOW RISK';
        color = 'text-green-600';
        advice = 'Your system appears relatively healthy, but routine maintenance is key to preventing buildup. Keep up with filter changes!';
      }
      
      setScore({ value: normalizedScore, dangerLevel, color, advice });
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <SEOProvider 
        title="Indoor Air Quality Calculator | Pure Air California" 
        description="Calculate your home's indoor air quality risk score based on age, pets, and Los Angeles neighborhood zip code. Free interactive tool."
        path="/air-quality-calculator"
       isLocalBusiness />
      <NavBar />
      
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Indoor Air Quality Risk Calculator</h1>
            <p className="text-lg text-slate-600">Takes 30 seconds. See what you're really breathing inside your Los Angeles home.</p>
          </div>
          
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
            {/* Background Icon */}
            <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
              <Calculator size={200} />
            </div>

            {!score ? (
              <div className="relative z-10">
                  <div className="w-full bg-slate-100 h-2 rounded-full mb-8 overflow-hidden">
                    <motion.div 
                      className="h-full bg-brand-500"
                      initial={{ width: `${((step - 1) / 5) * 100}%` }}
                      animate={{ width: `${(step / 5) * 100}%` }}
                    />
                  </div>
                  
                  <div className="min-h-[250px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {step === 1 && (
                          <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3"><MapPin className="text-brand-500" /> Enter your LA Zip Code</h3>
                            <Input 
                              type="text" 
                              maxLength={5}
                              placeholder="e.g. 90046" 
                              className="text-2xl p-6 mb-4 text-center border-2 focus:border-brand-500"
                              value={answers.zipCode}
                              onChange={e => setAnswers({...answers, zipCode: e.target.value.replace(/\D/g, '')})}
                            />
                            <p className="text-sm text-slate-500 text-center">We use this to pull historical local smog and wildfire ash data.</p>
                          </div>
                        )}
                        
                        {step === 2 && (
                          <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3"><Home className="text-brand-500" /> How old is your home?</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              {['< 5', '5-10', '10+'].map(val => (
                                <button
                                  key={val}
                                  onClick={() => setAnswers({...answers, homeAge: val})}
                                  className={`p-6 rounded-2xl border-2 font-bold text-lg transition-all ${answers.homeAge === val ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 hover:border-brand-300 text-slate-700'}`}
                                >
                                  {val} Years
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {step === 3 && (
                          <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3"><Dog className="text-brand-500" /> Do you have pets?</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              {['0', '1-2', '3+'].map(val => (
                                <button
                                  key={val}
                                  onClick={() => setAnswers({...answers, pets: val})}
                                  className={`p-6 rounded-2xl border-2 font-bold text-lg transition-all ${answers.pets === val ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 hover:border-brand-300 text-slate-700'}`}
                                >
                                  {val}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {step === 4 && (
                          <div className="space-y-6">
                             <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3"><AlertTriangle className="text-brand-500" /> Anyone with allergies/asthma?</h3>
                             <div className="grid grid-cols-2 gap-4">
                              <button
                                onClick={() => setAnswers({...answers, allergies: true})}
                                className={`p-6 rounded-2xl border-2 font-bold text-lg transition-all ${answers.allergies === true ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 hover:border-brand-300 text-slate-700'}`}
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => setAnswers({...answers, allergies: false})}
                                className={`p-6 rounded-2xl border-2 font-bold text-lg transition-all ${answers.allergies === false ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 hover:border-brand-300 text-slate-700'}`}
                              >
                                No
                              </button>
                            </div>
                          </div>
                        )}

                        {step === 5 && (
                          <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3"><Wind className="text-brand-500" /> When were the ducts last cleaned?</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {[{l: '< 1 Year', v: '0-1'}, {l:'1-3 Years', v: '1-3'}, {l:'Over 3 Years', v: '3+'}, {l:'Never / Unsure', v: 'never'}].map(item => (
                                <button
                                  key={item.v}
                                  onClick={() => setAnswers({...answers, lastCleaned: item.v})}
                                  className={`p-4 xl:p-6 rounded-2xl border-2 font-bold text-lg transition-all ${answers.lastCleaned === item.v ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 hover:border-brand-300 text-slate-700'}`}
                                >
                                  {item.l}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-slate-100 flex justify-end">
                    <Button 
                      onClick={handleNext} 
                      disabled={step === 1 && answers.zipCode.length < 5 || isCalculating}
                      className="btn-premium px-8 py-6 text-lg rounded-xl flex items-center gap-2 font-bold text-white shadow-xl hover:scale-105 transition-transform w-full sm:w-auto"
                    >
                      {isCalculating ? (
                         <span className="flex items-center gap-2"><Search className="animate-pulse" /> Analyzing Data...</span>
                      ) : step === 5 ? 'Reveal My Air Quality Score' : 'Continue'}
                      {!isCalculating && step < 5 && <ArrowRight size={20} />}
                    </Button>
                  </div>
              </div>
            ) : (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="text-center relative z-10"
               >
                  <div className="mb-6">
                    <div className="text-sm font-bold text-slate-500 tracking-widest uppercase mb-2">Estimated Contamination Level</div>
                    <div className={`text-6xl md:text-8xl font-black ${score.color} mb-4`}>
                      {score.value}%
                    </div>
                    <div className={`inline-block px-6 py-2 rounded-full font-bold text-xl ${score.color.replace('text-', 'bg-').replace('600', '100')} ${score.color}`}>
                      {score.dangerLevel}
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-2xl p-6 text-left mb-8 border border-slate-100">
                    <h4 className="font-bold text-lg text-slate-800 mb-2 flex items-center gap-2"><Shield size={20} className="text-slate-600" /> Specialist Assessment</h4>
                    <p className="text-slate-600 leading-relaxed">{score.advice}</p>
                  </div>

                  <div className="bg-gradient-to-br from-brand-700 to-sky-900 rounded-3xl p-8 text-white shadow-2xl">
                     <h3 className="text-2xl font-bold mb-2">The "Godfather" Rescue Package</h3>
                     <p className="text-brand-100 mb-6">Claim your free HVAC system inspection ($150 value) and take $50 off your first deep duct extraction today.</p>
                     
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                       <Button asChild className="bg-white text-brand-800 hover:bg-slate-100 font-black text-lg py-6 h-auto px-8 rounded-xl shadow-xl hover:scale-105">
                         <a href="tel:2137924145" className="flex items-center gap-2"><Phone className="fill-current" /> Call (213) 792-4145</a>
                       </Button>
                     </div>
                  </div>
               </motion.div>
            )}
          </div>
        </div>

        {/* Explanatory content. The calculator alone left this page at 234 words —
            far too thin to rank for anything, and it gave a visitor no way to
            interpret their score. */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">What your score actually means</h2>
              <p className="text-lg text-slate-600 mb-6">
                This calculator weighs the factors that most reliably predict how quickly a home's
                ductwork accumulates dust, allergens and moisture: the age of the property, whether
                pets live there, how long it has been since the system was last serviced, and where in
                Los Angeles County the home sits. None of those are guesses — they are the same things
                a technician asks about before quoting a job.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
                <div className="border border-slate-200 rounded-xl p-5">
                  <h3 className="font-bold text-lg mb-2 text-green-700">Low risk</h3>
                  <p className="text-slate-600 text-sm">
                    Your system is likely in reasonable condition. A standard inspection every three to
                    five years is usually enough, alongside regular filter changes.
                  </p>
                </div>
                <div className="border border-slate-200 rounded-xl p-5">
                  <h3 className="font-bold text-lg mb-2 text-amber-700">Moderate risk</h3>
                  <p className="text-slate-600 text-sm">
                    Enough factors are stacking up that accumulation is likely measurable. An inspection
                    is worthwhile, particularly if anyone in the home has allergies or asthma.
                  </p>
                </div>
                <div className="border border-slate-200 rounded-xl p-5">
                  <h3 className="font-bold text-lg mb-2 text-red-700">High risk</h3>
                  <p className="text-slate-600 text-sm">
                    Several compounding factors are present. A professional inspection is the sensible
                    next step, and it is free — you will see photographs of your own ductwork either way.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-6 text-slate-900">Why these factors matter</h2>

              <h3 className="text-xl font-semibold mb-2 text-slate-900">Property age</h3>
              <p className="text-slate-600 mb-5">
                Older homes frequently still run their original ductwork. Systems built decades ago were
                not designed around modern filtration expectations, and in Los Angeles a great deal of
                the housing stock predates those standards entirely. Pre-war properties may also have
                sealed or undocumented access points, which is why inspection comes before cleaning.
              </p>

              <h3 className="text-xl font-semibold mb-2 text-slate-900">Pets in the home</h3>
              <p className="text-slate-600 mb-5">
                Dander is light enough to stay airborne and fine enough to pass through standard
                filtration, so it settles inside the duct run rather than being captured. Homes with
                multiple animals accumulate noticeably faster than homes without.
              </p>

              <h3 className="text-xl font-semibold mb-2 text-slate-900">Time since last service</h3>
              <p className="text-slate-600 mb-5">
                This is the single strongest predictor. Accumulation is cumulative and does not
                self-correct, so a system that has never been cleaned holds everything it has ever
                circulated. If you do not know when it was last done, assume it has not been.
              </p>

              <h3 className="text-xl font-semibold mb-2 text-slate-900">Where you live in LA County</h3>
              <p className="text-slate-600 mb-8">
                Location changes the load. Coastal properties contend with salt air and marine layer
                humidity; San Fernando Valley homes run their systems far longer through the summer;
                foothill and canyon properties take on wildfire ash and brush dust. Two identical houses
                in different parts of the county will not accumulate at the same rate.
              </p>

              <h2 className="text-3xl font-bold mb-6 text-slate-900">Common questions</h2>
              <dl className="space-y-5">
                <div>
                  <dt className="font-semibold text-lg text-slate-900 mb-1">Is this a substitute for an inspection?</dt>
                  <dd className="text-slate-600">
                    No. It is a prioritisation tool. Only a physical inspection shows the actual condition
                    of your ductwork, which is why we photograph it and show you.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-lg text-slate-900 mb-1">How often should air ducts be cleaned?</dt>
                  <dd className="text-slate-600">
                    For most Los Angeles homes, every three to five years is a reasonable interval. Pets,
                    allergies, recent construction, wildfire exposure or a system that has never been
                    cleaned all shorten it.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-lg text-slate-900 mb-1">Does duct cleaning help with allergies?</dt>
                  <dd className="text-slate-600">
                    It removes accumulated dust, dander and pollen from the system that circulates air
                    through your home, which reduces what gets recirculated. It is one part of indoor air
                    quality rather than a cure on its own.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>

      <RelatedLinks heading="Next steps" links={[{ label: 'Residential air duct cleaning', path: '/services/residential-air-duct-cleaning' }, { label: 'Air duct cleaning cost in Los Angeles', path: '/pricing' }, { label: 'Health benefits of clean air ducts', path: '/health-benefits' }, { label: 'Get a free quote', path: '/quote' }]} />

      <Footer />
    </div>
  );
};

export default AirQualityCalculator;
