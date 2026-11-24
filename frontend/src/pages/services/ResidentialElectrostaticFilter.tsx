import ServiceDetailLayout from '@/components/ServiceDetailLayout';
const service = {
  "seoTitle": "Electrostatic Air Filter Service in Los Angeles",
  "seoDescription": "A filter should fit your HVAC system and your maintenance routine. Talk to PAC about inspecting, cleaning or replacing compatible electrostatic filter medi",
  "path": "/services/residential-electrostatic-filter",
  "h1": "Electrostatic Air Filter Service in Los Angeles",
  "intro": "A filter should fit your HVAC system and your maintenance routine. Talk to PAC about inspecting, cleaning or replacing compatible electrostatic filter media for your home.",
  "serviceName": "Residential Electrostatic Filters",
  "breadcrumbLabel": "Residential Electrostatic Filters",
  "sections": [
    {
      "heading": "Choose a filter that fits the system",
      "body": "Size, airflow requirements and equipment compatibility matter. We discuss the filter you have and the manufacturer’s guidance before recommending the next step."
    },
    {
      "heading": "Make maintenance easier to understand",
      "body": "Reusable filters need care according to their instructions. Ask about cleaning, drying and reinstallation so your filter is maintained correctly.",
      "bullets": [
        "Confirm filter dimensions and type",
        "Follow the manufacturer’s cleaning instructions",
        "Allow washable media to dry fully before reuse"
      ]
    },
    {
      "heading": "Look at more than the filter",
      "body": "A filter is one part of indoor air care. If you notice excessive dust, recurring odors or airflow changes, the wider system may need assessment."
    },
    {
      "heading": "Get clear advice before changing equipment",
      "body": "An electrostatic filter is not automatically the best choice for every home. We help you identify what is compatible and where an HVAC professional’s advice is needed."
    }
  ],
  "faqs": [
    {
      "question": "Can every home use an electrostatic filter?",
      "answer": "Compatibility depends on the system and filter specifications. Check sizing and airflow requirements before replacing your existing filter."
    },
    {
      "question": "How often should a reusable filter be cleaned?",
      "answer": "Follow the filter manufacturer’s instructions and inspect it based on use and conditions. There is no one interval that fits every home."
    },
    {
      "question": "Will a new filter eliminate allergies?",
      "answer": "No filter or cleaning service can promise that. Filtration is one part of indoor air management alongside ventilation and moisture control."
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
export default function ResidentialElectrostaticFilter(){return <ServiceDetailLayout {...service}/>;}
