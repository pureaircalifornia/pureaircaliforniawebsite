/**
 * Shared visible answers and FAQPage structured data.
 * Guardrails:
 * - Published starting prices match `/pricing/` ($299 residential air ducts, $149 dryer vents).
 * - Guidance stays EPA-aligned and inspection-led; never claim duct cleaning cures or prevents
 *   allergies, asthma, or medical conditions.
 * - Every homepage FAQ rendered from `homepageFaqs` matches its FAQPage JSON-LD verbatim.
 */
export interface FAQ {
  question: string;
  answer: string;
}

export const homepageFaqs: readonly FAQ[] = [
  {
    question: 'How much does air duct cleaning cost in Los Angeles?',
    answer:
      'Pure Air California residential air duct cleaning starts at $299 and residential dryer vent cleaning starts at $149 for eligible scopes. Your final written estimate depends on system count, attic or crawlspace access, duct condition, and the components included. Multi-system homes, commercial buildings, HOAs, and smoke-affected properties receive a property-specific written quote. Call (213) 792-4145 to discuss your space.',
  },
  {
    question: 'Should I have my air ducts inspected after wildfire smoke or ash in Los Angeles?',
    answer:
      'After nearby wildfire smoke or Santa Ana wind ash exposure, inspecting accessible returns, supply trunks, air handlers, and HVAC filters helps you see whether fine particulate settled inside the system. Smoke exposure alone does not automatically mean every duct requires cleaning, and mechanical cleaning is not a fire-restoration clearance or guaranteed odor removal. An inspection distinguishes routine accessible deposits from damaged insulation or specialist remediation.',
  },
  {
    question: 'How often should air ducts and dryer vents be cleaned in Southern California?',
    answer:
      'Following EPA guidance, residential air duct cleaning should be based on system condition rather than a rigid calendar—such as visible debris buildup, post-renovation dust, or pest contamination. Dryer vents are different: exhaust lint builds up with ongoing use and should be inspected and cleaned periodically based on household laundry volume, vent length, bends, and roof or wall termination to maintain airflow and reduce lint fire hazards.',
  },
  {
    question: 'How do I know whether my air ducts actually need cleaning?',
    answer:
      'Common reasons to schedule a duct inspection include visible debris or dust discharging from supply registers, fine drywall dust after remodeling, evidence of rodents or insects, or heavy buildup on accessible blower and coil surfaces. While cleaning removes settled particulate from ductwork, the EPA notes it has not been proven to prevent health problems or cure allergies or asthma—so proper filtration, moisture control, and source inspection always come first.',
  },
  {
    question: 'What is included in a duct cleaning visit, and how long does it take?',
    answer:
      'Every visit starts with checking accessible ductwork, equipment layout, and access points so you can confirm the exact written scope and price before work starts. Cleaning typically covers accessible supply and return ducts, registers, grilles, and agreed trunk or HVAC components using negative-pressure source removal, followed by a walkthrough of the completed work. Total appointment time depends on system count, building layout, and access, which we outline when scoping your visit.',
  },
  {
    question: 'Do you clean air ducts and dryer vents in Los Angeles apartments, condos, and HOAs?',
    answer:
      'Yes. We serve individual Los Angeles apartments and condominiums as well as entire multi-unit HOA buildings and managed residential portfolios. For individual units, we confirm whether ductwork or dryer exhaust serves only your unit or connects to shared building risers and coordinate parking, elevator, or management rules. For HOAs and property managers, we scope multi-unit dryer vent stacks and common-area HVAC systems with written schedules and completion records.',
  },
  {
    question: 'Does Pure Air California handle both residential and commercial HVAC cleaning?',
    answer:
      'Yes. Pure Air California serves Greater Los Angeles homes, hillside estates, offices, hotels, restaurants, laundromats, clinics, schools, retail showrooms, and industrial buildings. Documented past commercial scopes include Four Seasons Hotel Los Angeles guestroom ventilation, Westchester Family YMCA ductwork and coils, SoulCycle dryer exhaust in Culver City and Brentwood, and a four-system West Hollywood office HVAC project. Share your unit or system count, access requirements, and preferred work window for a tailored proposal.',
  },
  {
    question: 'What happens before cleaning starts, and how do I avoid vague quotes?',
    answer:
      'We discuss your property type, system count, access details, and what you have noticed before recommending any service. Before work begins, confirm in writing which supply and return ducts, registers, plenums, coils, or dryer lines are included, the total price, and any exclusions. Ask separately about optional treatments or additional findings so nothing is added without your written approval.',
  },
];

export function buildFaqSchema(faqs: readonly FAQ[] = homepageFaqs, id?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(id ? { '@id': id } : {}),
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
