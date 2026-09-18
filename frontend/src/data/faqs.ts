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
 { question: 'How much does air duct cleaning cost in Los Angeles?', answer: 'Your estimate depends on the number of HVAC systems, duct access, property size and the buildup found during inspection. Ask for a written scope covering supply ducts, return ducts, registers and any additional components. Pure Air California offers free estimates before you decide.' },
 { question: 'How do I know whether my ducts need cleaning?', answer: 'Heavy debris, particles coming from supply registers or pest contamination are reasons to arrange an inspection. A little dust on a return grille alone does not mean your whole system needs cleaning. Suspected mold needs proper assessment and the moisture source must be addressed.' },
 { question: 'How often should air ducts be cleaned?', answer: 'There is no universal schedule for every home. The EPA recommends cleaning as needed rather than routinely. The condition of the system matters more than a date on the calendar; ask for an inspection after renovation debris or a known contamination event.' },
 { question: 'Will cleaning cure allergies or lower every energy bill?', answer: 'Duct cleaning is not a medical treatment, and health improvements or energy savings cannot be guaranteed. Filtration, ventilation, moisture and other indoor pollution sources also matter. An HVAC assessment can help identify airflow or equipment problems.' },
 { question: 'Do you clean dryer vents and commercial systems too?', answer: 'Yes. We offer residential and commercial air duct cleaning, dryer vent cleaning, HVAC system cleaning and maintenance options across Greater Los Angeles. Tell us your property type and any access or scheduling requirements when you request an estimate.' }
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
