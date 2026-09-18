/**
 * Single source of truth for homepage FAQ content.
 *
 * Consumed by BOTH the visible <FAQSection> and the FAQPage JSON-LD in
 * <SchemaMarkup>, so the structured data can never drift from what users see.
 * Google requires FAQ schema to match visible page content, and AI answer
 * engines (GEO) lose confidence when an answer differs between the page and
 * the schema. Keep answers factual and consistent with config/business.ts.
 */
export interface FAQ {
  question: string;
  answer: string;
}

export const homepageFaqs: readonly FAQ[] = [
  {
    question: "How often should air ducts be cleaned?",
    answer:
      "The National Air Duct Cleaners Association (NADCA) recommends cleaning air ducts every 3 to 5 years. In Los Angeles, wildfire smoke, smog, and year-round HVAC use mean every 2 to 3 years is common. Homes with pets, allergies, smokers, or recent renovations may benefit from more frequent cleaning.",
  },
  {
    question: "How long does the air duct cleaning process take?",
    answer:
      "A typical air duct cleaning for an average-sized home takes about 3 to 5 hours, depending on the size of your home, the number of vents, and the condition of your ductwork.",
  },
  {
    question: "Will air duct cleaning reduce my energy bills?",
    answer:
      "Yes. Clean air ducts improve HVAC system efficiency, which can lower energy costs. When ducts are clogged with debris, your system works harder and uses more energy to heat and cool your home.",
  },
  {
    question: "How can I tell if my air ducts need cleaning?",
    answer:
      "Common signs include visible dust or debris coming from vents, increased dust settling on surfaces, uneven airflow between rooms, musty odors when the system runs, and unexplained respiratory or allergy symptoms.",
  },
  {
    question: "Is air duct cleaning worth the investment?",
    answer:
      "Yes. Professional air duct cleaning improves indoor air quality, reduces allergens, increases HVAC efficiency, extends equipment life, and eliminates odors. Pure Air California is NADCA certified and provides free, no-obligation estimates.",
  },
];

/** FAQPage JSON-LD built from the same data the page renders. */
export function buildFaqSchema(faqs: readonly FAQ[] = homepageFaqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
