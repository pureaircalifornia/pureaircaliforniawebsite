import ServiceDetailLayout from '@/components/ServiceDetailLayout';

const content = {
  "seoTitle": "Commercial Air Duct Cleaning Los Angeles",
  "seoDescription": "Plan commercial air duct cleaning in Los Angeles. Coordinate system scope, building access and scheduling for offices, retail and managed properties.",
  "path": "/services/commercial-air-duct-cleaning",
  "h1": "Commercial Air Duct Cleaning Los Angeles",
  "intro": "Air care that works with your building. Pure Air California helps Los Angeles businesses and property managers plan duct cleaning around system requirements, access and daily operations.",
  "serviceName": "Commercial Air Duct Cleaning",
  "breadcrumbLabel": "Commercial Air Duct Cleaning",
  "sections": [
    {
      "heading": "Begin with a building-specific scope",
      "body": "Commercial buildings can contain multiple air handlers, zones and duct configurations. Share the building type, system count, plans if available and the concern prompting the request. A useful proposal distinguishes the ductwork being cleaned from equipment maintenance or repairs."
    },
    {
      "heading": "Coordinate the people and the space",
      "body": "Plan access with building management, tenants and facilities staff. Discuss work areas, occupancy, loading access, parking and where equipment can be placed. If particular work hours are required, raise those constraints before the appointment is confirmed.",
      "bullets": [
        "Building contact and access arrangements",
        "Systems and zones included in the scope",
        "Tenant or occupant coordination",
        "Documentation and contractor requirements"
      ]
    },
    {
      "heading": "Understand what is included",
      "body": "Ask whether the proposal covers supply ducts, returns, registers, grilles and specific HVAC components. Make sure it identifies inaccessible sections and how additional findings will be handled. Agree on the work and approval process before cleaning begins."
    },
    {
      "heading": "Different properties need different plans",
      "body": "An office, restaurant, school and hospitality property can have very different occupancy and operational needs. Duct cleaning should be coordinated with the building’s maintenance plan and any applicable facility procedures. A standard cleaning appointment should not be treated as certification of code compliance."
    },
    {
      "heading": "Review the completed work",
      "body": "Agree in advance on the closeout information your facility needs, such as the completed scope, access limitations and follow-up recommendations. Discuss whether any filters, equipment or damaged duct sections need separate attention. A clear record helps the next maintenance decision."
    },
    {
      "heading": "Commercial duct cleaning estimates in Los Angeles",
      "body": "System quantity, duct access, building size, contamination and scheduling all affect the work. Request an estimate for your building rather than relying on a residential package. Include the ZIP code, facility type and best site contact when you get in touch."
    }
  ],
  "faqs": [
    {
      "question": "Can the work be scheduled around business operations?",
      "answer": "Share your operating hours and access restrictions when requesting the estimate. We will discuss availability and an appropriate work plan before confirming an appointment."
    },
    {
      "question": "Do you work with property managers and HOAs?",
      "answer": "Yes. We offer service options for managed and shared properties. Confirm which systems serve individual units and which are common-area responsibilities so approvals and access can be coordinated."
    },
    {
      "question": "Does the estimate include HVAC equipment cleaning?",
      "answer": "It depends on the agreed scope. Ask which components are included and which would be quoted separately. Duct cleaning, equipment maintenance and repairs are related but distinct tasks."
    }
  ],
  "relatedLinks": [
    {
      "label": "Industries we serve",
      "path": "/industries/"
    },
    {
      "label": "Property managers and HOAs",
      "path": "/property-managers/"
    },
    {
      "label": "HVAC system cleaning",
      "path": "/services/hvac-system-cleaning/"
    },
    {
      "label": "Commercial dryer vent cleaning",
      "path": "/services/commercial-dryer-vent-cleaning/"
    },
    {
      "label": "Los Angeles service coverage",
      "path": "/locations/los-angeles/"
    }
  ]
};

export default function CommercialAirDuctCleaning() {
  return <ServiceDetailLayout {...content} />;
}
