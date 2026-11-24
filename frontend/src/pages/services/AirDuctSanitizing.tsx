import React from 'react';
import ServiceDetailLayout from '@/components/ServiceDetailLayout';

const AirDuctSanitizing = () => (
  <ServiceDetailLayout
    seoTitle="Air Duct Sanitizing Los Angeles"
    seoDescription="EPA-registered antimicrobial air duct sanitizing in Los Angeles, applied after a full clean. Targets mold, bacteria and lingering odors. Call (213) 792-4145."
    path="/services/air-duct-sanitizing"
    breadcrumbLabel="Air Duct Sanitizing"
    serviceName="Air Duct Sanitizing"
    h1="Air Duct Sanitizing in Los Angeles"
    intro="An antimicrobial treatment applied after the ductwork has been properly cleaned — for systems with mold growth, persistent odors, or a history of moisture."
    sections={[
      {
        heading: 'Sanitizing is a second step, not a substitute for cleaning',
        body:
          'This is the part most people get wrong, and it is worth being direct about. Applying an antimicrobial to ductwork that is still full of dust accomplishes very little: the treatment coats the debris rather than the duct surface, and the debris is what the growth is living on. Sanitizing works as a follow-up to a thorough mechanical clean, never in place of one. If a company offers to sanitize without cleaning first, that is a reason to ask questions.',
        bullets: [
          'Mechanical cleaning first — brushing and HEPA-filtered vacuum extraction',
          'Inspection to confirm the ductwork is genuinely clean before treatment',
          'Antimicrobial applied to the duct surface itself',
          'Any moisture source identified, because sanitizing does not fix a leak',
        ],
      },
      {
        heading: 'When sanitizing is worth doing',
        body:
          'Not every system needs it. A reasonably maintained home with no moisture history and no odor complaint generally does not. It earns its place when there is an identified reason.',
        bullets: [
          'Visible mold growth confirmed inside the ductwork during inspection',
          'A water event — leak, flood, or a failed condensate line — that reached the system',
          'Persistent musty odor that returns after cleaning',
          'Coastal or high-humidity properties where duct interiors stay damp',
          'After a property has stood vacant, or before a new occupant moves in',
          'Allergy or asthma sufferers in the household seeking every available reduction',
        ],
      },
      {
        heading: 'What we use and why it matters',
        body:
          'We use EPA-registered antimicrobial products rated for use in HVAC systems, applied according to their label directions. That last part matters more than the brand: an HVAC-rated product used outside its labelled application is neither safe nor effective. We will tell you what is being applied and why before we apply it.',
      },
      {
        heading: 'Addressing the cause, not just the symptom',
        body:
          'Mold needs moisture. If the moisture source is still there — a leaking condensate pan, an uninsulated duct sweating in a hot attic, a marine-layer property with poor drainage — growth returns regardless of what was applied. Part of the inspection is identifying where the water is coming from, so you can address it rather than repeat the treatment every year.',
      },
    ]}
    faqs={[
      {
        question: 'Is duct sanitizing safe for children and pets?',
        answer:
          'The products we use are EPA-registered for HVAC application and are safe when applied to label directions. We advise keeping the property clear during application and for the dwell time stated on the label, after which normal occupancy resumes.',
      },
      {
        question: 'Do I need sanitizing, or just cleaning?',
        answer:
          'Most systems need cleaning alone. Sanitizing is warranted when there is an identified reason — confirmed mold, a water event, or a recurring odor. We will tell you honestly which applies after inspecting your system, and we do not add it by default.',
      },
      {
        question: 'How long does the treatment last?',
        answer:
          'That depends entirely on whether the underlying moisture source was resolved. Treat the cause and the result holds for years. Leave a leak or a chronic humidity problem in place and growth will return, which is why we look for the source rather than only treating the surface.',
      },
      {
        question: 'Will it get rid of the smell in my house?',
        answer:
          'If the odor originates in the ductwork — musty smells from growth, or odors absorbed into accumulated debris — then cleaning followed by sanitizing addresses the source. If the smell comes from elsewhere in the building, it will not, and we would rather establish that before you pay for the work.',
      },
      {
        question: 'How much does air duct sanitizing cost in Los Angeles?',
        answer:
          'It is quoted as an addition to the duct cleaning, priced on the size of the system and the extent of treatment required. You get a fixed price agreed before work begins. Call (213) 792-4145 for an estimate.',
      },
    ]}
    relatedLinks={[
      { label: 'Residential air duct cleaning', path: '/services/residential-air-duct-cleaning' },
      { label: 'HVAC system cleaning', path: '/services/hvac-system-cleaning' },
      { label: 'Health benefits of clean air ducts', path: '/health-benefits' },
    ]}
  />
);

export default AirDuctSanitizing;
