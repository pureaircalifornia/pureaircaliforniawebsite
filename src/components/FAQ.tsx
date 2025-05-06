import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal, StaggerContainer } from '@/components/ui/scroll-reveal';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const faqCategories = {
  general: {
    name: 'General Questions',
    icon: <HelpCircle className="w-4 h-4" />,
    questions: [
      {
        question: "How often should I have my air ducts cleaned?",
        answer: "We recommend professional air duct cleaning every 2-3 years for most homes. However, homes with pets, residents with allergies, or those that have undergone recent renovations may benefit from more frequent cleaning. Regular cleaning helps maintain optimal indoor air quality and HVAC efficiency."
      },
      {
        question: "What are the signs that I need air duct cleaning?",
        answer: "Key signs include: visible dust coming from vents, increased allergy symptoms, musty odors, higher energy bills, uneven heating/cooling, and visible mold around vents. If you notice any of these signs, it's time to schedule a professional inspection."
      },
      {
        question: "How long does the cleaning process take?",
        answer: "A typical residential air duct cleaning takes 2-4 hours, depending on the size of your home and system complexity. Commercial properties may take longer based on the scope of work. We'll provide a specific time estimate during your consultation."
      }
    ]
  },
  service: {
    name: 'Our Services',
    icon: <MessageCircle className="w-4 h-4" />,
    questions: [
      {
        question: "What's included in your air duct cleaning service?",
        answer: "Our comprehensive service includes inspection, cleaning of all supply and return ducts, main trunk lines, registers, grilles, and the HVAC unit. We use professional-grade equipment including negative air machines and specialized brushes to ensure thorough cleaning."
      },
      {
        question: "Do you offer emergency services?",
        answer: "Yes, we provide 24/7 emergency services for urgent situations. Contact our emergency line at (213) 792-4145 for immediate assistance."
      },
      {
        question: "Are your technicians certified?",
        answer: "Yes, all our technicians are NADCA (National Air Duct Cleaners Association) certified and undergo regular training. We're fully licensed, bonded, and insured for your peace of mind."
      }
    ]
  },
  pricing: {
    name: 'Pricing & Payment',
    icon: <HelpCircle className="w-4 h-4" />,
    questions: [
      {
        question: "How much does air duct cleaning cost?",
        answer: "Pricing varies based on your system size, number of vents, and service requirements. We provide free, detailed quotes after assessing your specific needs. Contact us for a personalized estimate."
      },
      {
        question: "Do you offer any guarantees?",
        answer: "Yes, we offer a 100% satisfaction guarantee on all our services. If you're not completely satisfied, we'll return to address any concerns at no additional cost."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, cash, and checks. We also offer flexible financing options for larger projects."
      }
    ]
  },
  benefits: {
    name: 'Benefits & Results',
    icon: <HelpCircle className="w-4 h-4" />,
    questions: [
      {
        question: "What are the benefits of air duct cleaning?",
        answer: "Benefits include improved indoor air quality, reduced allergies and respiratory issues, better HVAC efficiency, lower energy bills, extended equipment life, and elimination of musty odors."
      },
      {
        question: "Will air duct cleaning help with allergies?",
        answer: "Yes, professional air duct cleaning can significantly reduce allergy symptoms by removing accumulated dust, pollen, pet dander, and other allergens from your HVAC system."
      },
      {
        question: "How long do the results last?",
        answer: "With proper maintenance and regular HVAC filter changes, the benefits of air duct cleaning typically last 2-3 years. Factors like pets, smoking, and construction can affect this timeframe."
      }
    ]
  }
};

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [faqRef, isFaqInView] = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    once: true,
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const toggleQuestion = (index: number) => {
    setOpenQuestions(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Clear search when changing categories
  useEffect(() => {
    if (searchQuery) {
      setSearchQuery('');
    }
  }, [activeCategory]);

  const filteredQuestions = searchQuery
    ? Object.values(faqCategories)
        .flatMap(category => category.questions)
        .filter(q => 
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : faqCategories[activeCategory as keyof typeof faqCategories].questions;

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto"
      ref={faqRef}
      initial="hidden"
      animate={isFaqInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Premium Search Bar */}
      <motion.div 
        className={`relative mb-8 transition-all duration-300 ${searchFocused ? 'scale-105' : 'scale-100'}`}
        variants={itemVariants}
      >
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className={`h-5 w-5 transition-colors duration-300 ${searchFocused ? 'text-brand-500' : 'text-gray-400'}`} />
        </div>
        
        {searchQuery && (
          <motion.button 
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
            onClick={() => setSearchQuery('')}
            whileTap={{ scale: 0.9 }}
          >
            <X className="h-5 w-5" />
          </motion.button>
        )}
        
        <motion.input
          type="text"
          placeholder="Search frequently asked questions..."
          className={`w-full pl-10 pr-10 py-4 border-2 rounded-xl focus:ring-0 shadow-sm transition-all duration-300 ${
            searchFocused 
              ? 'border-brand-500 shadow-lg shadow-brand-500/10' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </motion.div>

      {/* Category Tabs */}
      {!searchQuery && (
        <motion.div 
          className="flex flex-wrap gap-2 mb-8"
          variants={itemVariants}
        >
          {Object.entries(faqCategories).map(([key, { name, icon }], index) => (
            <motion.button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeCategory === key
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (index * 0.05) }}
            >
              <span>{icon}</span>
              {name}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* FAQ List */}
      <StaggerContainer className="space-y-4">
        {filteredQuestions.map((faq, index) => (
          <motion.div
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md bg-white"
            variants={itemVariants}
            layout
          >
            <motion.button
              onClick={() => toggleQuestion(index)}
              className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.8)" }}
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              <motion.div
                initial={false}
                animate={{ rotate: openQuestions.includes(index) ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={`rounded-full p-1 ${openQuestions.includes(index) ? 'bg-brand-50 text-brand-500' : 'text-gray-400'}`}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {openQuestions.includes(index) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <motion.div 
                    className="px-6 py-4 bg-gray-50 border-t border-gray-100"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </StaggerContainer>

      {/* No Results Message */}
      <AnimatePresence>
        {searchQuery && filteredQuestions.length === 0 && (
          <motion.div 
            className="text-center py-12 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <HelpCircle className="h-8 w-8 text-gray-400" />
            </motion.div>
            <motion.h3 
              className="text-lg font-medium text-gray-900 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              No matching questions found
            </motion.h3>
            <motion.p 
              className="text-gray-600 mb-6 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              We couldn't find any answers matching "{searchQuery}". Please try different keywords or contact us directly.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button asChild className="bg-brand-600 hover:bg-brand-700">
                <a href="/contact">Contact Our Support Team</a>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Bottom CTA */}
      {!searchQuery && filteredQuestions.length > 0 && (
        <ScrollReveal animation="fadeInUp" delay={0.5}>
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Can't find what you're looking for? We're here to help.
            </p>
            <Button asChild className="bg-brand-600 hover:bg-brand-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </ScrollReveal>
      )}
    </motion.div>
  );
};

export default FAQ; 