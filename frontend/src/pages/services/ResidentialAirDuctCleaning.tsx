import ServiceDetailLayout from '@/components/ServiceDetailLayout';

const content = {
  "seoTitle": "Residential Air Duct Cleaning Los Angeles",
  "seoDescription": "Air duct cleaning for Los Angeles homes, apartments and condos. Learn what is included, prepare for your visit and request a free estimate.",
  "path": "/services/residential-air-duct-cleaning",
  "h1": "Residential Air Duct Cleaning Los Angeles",
  "intro": "A considered clean for the ductwork behind your everyday comfort. Pure Air California helps Los Angeles homeowners understand their system and plan the right cleaning service.",
  "serviceName": "Residential Air Duct Cleaning",
  "breadcrumbLabel": "Residential Air Duct Cleaning",
  "sections": [
    {
      "heading": "Start with the condition of your system",
      "body": "A duct-cleaning appointment should begin with your property and the concern you want to address. Tell us about visible debris, recent building work, a known contamination issue or changes you have noticed at the vents. An inspection helps establish whether cleaning is appropriate and what parts of the system need attention."
    },
    {
      "heading": "Know what your air duct cleaning includes",
      "body": "Supply ducts carry conditioned air to rooms; return ducts bring air back to the HVAC system. Registers, grilles and the air handler are separate components that should be discussed in the estimate. Confirm exactly which parts are accessible and included before work starts.",
      "bullets": [
        "Number of HVAC systems and the ductwork connected to each",
        "Supply and return ducts, registers and grilles in the agreed scope",
        "How debris will be loosened and collected",
        "Any HVAC components or additional services quoted separately"
      ]
    },
    {
      "heading": "A cleaning plan that respects your home",
      "body": "Duct material and access affect the cleaning method. Flexible, lined and sheet-metal ducts do not all tolerate the same tools. Discuss existing damage, difficult access, delicate finishes and any special household requirements with the team. Cleaning cannot repair a disconnected duct or correct an underlying moisture problem."
    },
    {
      "heading": "How to prepare for the visit",
      "body": "Clear a safe path to the equipment and accessible vents. For an apartment or condo, check building rules, work hours and whether management permission is required. Tell us about parking restrictions, stairs, attic access or shared equipment so the visit can be planned properly.",
      "bullets": [
        "Keep pets away from the work area",
        "Identify the thermostat, equipment and access points",
        "Point out recently renovated rooms or known system issues",
        "Arrange property-management access when needed"
      ]
    },
    {
      "heading": "Air duct cleaning costs in Los Angeles",
      "body": "Property size alone does not determine the price. The number of systems, access, condition and included components affect the work. Request a property-specific written estimate and confirm how any additional work will be approved. The scope should be understandable before you decide to book."
    },
    {
      "heading": "After the cleaning",
      "body": "Review the completed scope and ask about any areas that could not be accessed. Keep up with the filter and maintenance guidance for your equipment. If you continue to notice an airflow issue, odor or moisture problem, discuss further assessment instead of assuming another cleaning will resolve it."
    }
  ],
  "faqs": [
    {
      "question": "Do I need duct cleaning on a fixed schedule?",
      "answer": "Not every home needs the same schedule. Base the decision on system condition and a documented reason for cleaning. Ask the technician what they found and why they recommend the proposed work."
    },
    {
      "question": "How long will my appointment take?",
      "answer": "The number of systems, access and amount of work affect the time required. Ask for a time estimate when your scope is confirmed and let us know about building access hours or other scheduling constraints."
    },
    {
      "question": "Can duct cleaning fix an airflow problem?",
      "answer": "Debris is one possible issue, but airflow also depends on filters, equipment, duct sizing and connections. Cleaning does not replace a system diagnosis or repair. Describe the rooms and conditions involved when you request an assessment."
    }
  ],
  "relatedLinks": [
    {
      "label": "Dryer vent cleaning",
      "path": "/services/residential-dryer-vent-cleaning/"
    },
    {
      "label": "HVAC system cleaning",
      "path": "/services/hvac-system-cleaning/"
    },
    {
      "label": "Los Angeles service guide",
      "path": "/locations/los-angeles/"
    },
    {
      "label": "Pricing and estimates",
      "path": "/pricing/"
    },
    {
      "label": "Indoor air quality explained",
      "path": "/health-benefits/"
    }
  ]
};

export default function ResidentialAirDuctCleaning() {
  return <ServiceDetailLayout {...content} />;
}
