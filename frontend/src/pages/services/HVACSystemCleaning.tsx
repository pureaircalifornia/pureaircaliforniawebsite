import ServiceDetailLayout from '@/components/ServiceDetailLayout';
const service = {
  "seoTitle": "HVAC System Cleaning in Los Angeles",
  "seoDescription": "Give the system behind your comfort some attention. We help Los Angeles homeowners and businesses plan cleaning for accessible HVAC components, with the sc",
  "path": "/services/hvac-system-cleaning",
  "h1": "HVAC System Cleaning in Los Angeles",
  "intro": "Give the system behind your comfort some attention. We help Los Angeles homeowners and businesses plan cleaning for accessible HVAC components, with the scope agreed before work begins.",
  "serviceName": "HVAC System Cleaning",
  "breadcrumbLabel": "HVAC System Cleaning",
  "sections": [
    {
      "heading": "Start with the whole system",
      "body": "Ducts, filters, coils, blower assemblies and drain components work together. We discuss the condition of your system and identify which accessible components are included in the proposed service.",
      "bullets": [
        "Tell us about unusual dust, odors or airflow",
        "Identify the number and location of systems",
        "Confirm safe access and any equipment concerns"
      ]
    },
    {
      "heading": "Cleaning that fits your equipment",
      "body": "The right approach depends on the equipment, duct material and condition. Cleaning is planned around those details. Repairs, refrigerant work or damaged components may require a separate HVAC specialist."
    },
    {
      "heading": "A practical plan for commercial properties",
      "body": "For offices, retail, hospitality and shared buildings, we discuss access, occupant needs and suitable working hours. Contact the team about your site requirements before booking."
    },
    {
      "heading": "Keep good maintenance in the picture",
      "body": "Cleaning is one part of maintenance. Filters, ventilation, moisture control and timely repairs matter too. Ask which follow-up steps are appropriate for your system."
    }
  ],
  "faqs": [
    {
      "question": "What is included in HVAC system cleaning?",
      "answer": "The written scope identifies the accessible components to be cleaned, access requirements and any exclusions. Ask us about ducts, coils, blowers, filters and drain components when you call."
    },
    {
      "question": "How often should my system be cleaned?",
      "answer": "There is no single schedule for every system. Start with its condition, usage, filter maintenance and the equipment manufacturer’s guidance."
    },
    {
      "question": "Can you work around business hours?",
      "answer": "Tell us your operating hours and access constraints. We will discuss scheduling options and confirm availability before the work is booked."
    }
  ],
  "relatedLinks": [
    {
      "label": "All services",
      "path": "/services/"
    },
    {
      "label": "Commercial & industry services",
      "path": "/industries/"
    },
    {
      "label": "Los Angeles service guide",
      "path": "/locations/los-angeles/"
    },
    {
      "label": "Request a free estimate",
      "path": "/quote/"
    }
  ]
};
export default function HVACSystemCleaning(){return <ServiceDetailLayout {...service}/>;}
