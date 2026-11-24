import ServiceDetailLayout from '@/components/ServiceDetailLayout';

const AirDuctSanitizing = () => (
  <ServiceDetailLayout
    seoTitle="Air Duct Sanitizing Assessment Los Angeles | Pure Air CA"
    seoDescription="Inspection-first air duct sanitizing & odor assessment in Los Angeles. EPA-aligned material checks, product labels & written scopes. Call (213) 792-4145."
    path="/services/air-duct-sanitizing"
    breadcrumbLabel="Air Duct Sanitizing"
    serviceName="Air Duct Sanitizing Assessment"
    h1="Air Duct Sanitizing & Odor Assessment in Los Angeles"
    intro="Start with an honest, inspection-first evaluation of your ductwork before considering any antimicrobial or odor-control treatment. Pure Air California prioritizes mechanical source removal first, checks duct material compatibility, and shares EPA-registered product labels and clear limitations before anything is applied."
    estimateLabel="Request a sanitizing assessment"
    heroReassurance="Inspection-first · Mechanical cleaning before treatments · EPA-aligned material checks across LA"
    coverageText="Inspection-led duct assessment across Los Angeles, Santa Monica, Glendale, Los Feliz, Calabasas, and surrounding communities."
    quickFacts={[
      { label: 'EPA-aligned policy', value: 'Never bundled automatically; label-verified' },
      { label: 'First step', value: 'Source removal & moisture-source check' },
      { label: 'Written breakdown', value: 'Inspection, cleaning & options itemized' },
    ]}
    sections={[
      {
        heading: 'A treatment needs a documented reason—never an automatic upsell',
        body: 'Sanitizing should never be forced into a routine duct cleaning visit. The EPA notes that the benefits and potential adverse effects of applying chemical biocides inside residential air ducts have not been fully established. A musty smell, a recent move, or an allergy concern alone does not automatically justify chemical fogging.',
        bullets: [
          'Share the exact odor, moisture history, or event prompting your request',
          'Ask what was actually observed inside the system, where it is located, and which duct surface is affected',
          'Prioritize physical source removal, moisture correction, or component replacement before considering any treatment',
        ],
      },
      {
        heading: 'Verify duct material compatibility & EPA product labels',
        body: 'EPA registration of a product does not authorize its use inside every HVAC system. Any proposed application must match the exact EPA product label, surface type (bare sheet metal vs. lined duct), and ventilation/re-entry instructions. EPA guidance specifically states that no chemical biocides are registered for use on internally insulated (fiberglass-lined) air ducts.',
        bullets: [
          'Request the exact product name, EPA registration number, and written label directions',
          'Verify whether your ductwork is bare galvanized sheet metal, flexible duct, or internally insulated duct board',
          'Confirm required ventilation times, occupancy precautions for sensitive individuals/pets, and exclusions in writing',
        ],
      },
      {
        heading: 'Coastal marine moisture, condensation & suspected mold in LA',
        body: 'In coastal Los Angeles communities (Santa Monica, Venice, Malibu, South Bay) or homes with poorly insulated attic plenums and clogged AC condensate drains, excess moisture is often the real driver behind musty HVAC odors. Neither cleaning nor chemical spraying can fix an active water leak or condensation issue.',
        bullets: [
          'Identify and repair condensate drain clogs, roof leaks, or sweating plenum insulation first',
          'Understand that wet or visibly contaminated porous insulation typically requires replacement rather than spraying',
          'Involve a qualified environmental assessor or mold remediation specialist when widespread moisture damage is suspected',
        ],
      },
      {
        heading: 'Transparent pricing & separate written line items',
        body: 'We price inspection, mechanical air duct cleaning (starting at $299 for eligible residential scopes), and any separately discussed odor or surface treatment as distinct line items. You review every option, ask questions, and approve only the work that makes technical sense for your property.',
      },
    ]}
    faqs={[
      {
        question: 'Is air duct sanitizing necessary with every air duct cleaning?',
        answer:
          'No. Sanitizing should never be an automatic add-on. Mechanical source removal clears loose dust and debris; any antimicrobial or odor product should only be discussed when a specific, compatible bare-metal condition warrants it.',
      },
      {
        question: 'Can you spray sanitizer inside flexible ducts or fiberglass-lined plenums?',
        answer:
          'EPA guidance states that no chemical biocides are registered for use on internally insulated air ducts. We verify duct material first—wet or contaminated insulation generally needs replacement rather than chemical treatment.',
      },
      {
        question: 'Can you guarantee a treatment is safe for children, pets, or chemical sensitivities?',
        answer:
          'No contractor should make a blanket safety promise. Required precautions, ventilation periods, and re-entry steps depend on the specific product label. Always review the label beforehand and consult a physician for individual health sensitivities.',
      },
      {
        question: 'Will air duct sanitizing cure allergies, asthma, or permanently remove odors?',
        answer:
          'No. Duct sanitizing is not medical treatment and cannot promise symptom relief or permanent odor removal. Odors often originate from condensate drains, damp building materials, pets, or smoke-soaked furnishings outside the ducts.',
      },
      {
        question: 'How is an air duct sanitizing assessment priced in Los Angeles?',
        answer:
          'Your written estimate breaks out mechanical duct cleaning (from $299 for eligible residential systems), any HVAC coil/drain-pan cleaning, and any separately evaluated treatment clearly before work starts. Call (213) 792-4145 to talk through your system.',
      },
    ]}
    sources={[
      {
        label: 'EPA: Should You Have the Air Ducts in Your Home Cleaned?',
        url: 'https://www.epa.gov/indoor-air-quality-iaq/should-you-have-air-ducts-your-home-cleaned',
      },
    ]}
    relatedLinks={[
      { label: 'Residential air duct cleaning (from $299)', path: '/services/residential-air-duct-cleaning/' },
      { label: 'HVAC system & coil cleaning', path: '/services/hvac-system-cleaning/' },
      { label: 'Wildfire smoke & hillside duct assessment', path: '/services/wildfire-smoke-hillside-air-duct-cleaning-los-angeles/' },
      { label: 'Air duct cleaning & indoor air quality', path: '/health-benefits/' },
      { label: 'How to avoid vague duct-cleaning quotes in LA', path: '/blog/avoid-air-duct-cleaning-scams-los-angeles/' },
      { label: 'Pricing & written estimate guide', path: '/pricing/' },
    ]}
  />
);

export default AirDuctSanitizing;
