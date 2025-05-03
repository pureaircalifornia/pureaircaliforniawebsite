import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const faqCategories = {
  general: {
    name: 'General Questions',
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

  const toggleQuestion = (index: number) => {
    setOpenQuestions(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredQuestions = searchQuery
    ? Object.values(faqCategories)
        .flatMap(category => category.questions)
        .filter(q => 
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : faqCategories[activeCategory as keyof typeof faqCategories].questions;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search frequently asked questions..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Tabs */}
      {!searchQuery && (
        <div className="flex flex-wrap gap-2 mb-8">
          {Object.entries(faqCategories).map(([key, { name }]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === key
                  ? 'bg-brand-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredQuestions.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              {openQuestions.includes(index) ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                openQuestions.includes(index)
                  ? 'max-h-96 opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 py-4 bg-gray-50">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {searchQuery && filteredQuestions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">
            No matching questions found. Please try a different search term or{' '}
            <a href="/contact" className="text-brand-600 hover:underline">
              contact us
            </a>{' '}
            directly.
          </p>
        </div>
      )}
    </div>
  );
};

export default FAQ; 