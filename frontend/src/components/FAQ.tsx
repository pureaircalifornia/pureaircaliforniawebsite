import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const faqs = [
  {
    question: "How often should air ducts be cleaned?",
    answer: "The National Air Duct Cleaners Association recommends cleaning air ducts every 3 to 5 years. However, homes with pets, allergies, smokers, or recent renovations may benefit from more frequent cleaning."
  },
  {
    question: "How long does the air duct cleaning process take?",
    answer: "A typical air duct cleaning for an average-sized home takes about 3-5 hours, depending on the size of your home, number of vents, and the condition of your ductwork."
  },
  {
    question: "Will air duct cleaning reduce my energy bills?",
    answer: "Yes, clean air ducts can improve HVAC system efficiency, which can lead to reduced energy costs. When ducts are clogged with debris, your system works harder and uses more energy."
  },
  {
    question: "How can I tell if my air ducts need cleaning?",
    answer: "Signs include visible dust or debris coming from vents, increased dust settling on surfaces, uneven airflow, musty odors when the system runs, and unexplained respiratory issues."
  },
  {
    question: "Is air duct cleaning worth the investment?",
    answer: "Yes, professional air duct cleaning provides many benefits including improved indoor air quality, reduced allergens, increased HVAC efficiency, extended equipment life, and elimination of odors."
  }
];

const FAQSection = () => {
  const [ref, isInView] = useScrollAnimation();

  return (
    <section className="py-16 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our air duct and dryer vent cleaning services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="bg-white rounded-lg shadow-sm">
                <AccordionTrigger className="px-6 py-4 text-left font-medium hover:bg-gray-50 rounded-t-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
