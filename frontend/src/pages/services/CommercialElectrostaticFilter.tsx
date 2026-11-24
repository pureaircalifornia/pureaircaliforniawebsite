import ServiceDetailLayout from '@/components/ServiceDetailLayout';
const service = {
  "seoTitle": "Commercial Filter Service in Los Angeles",
  "seoDescription": "Help your building team stay on top of filter care. We discuss compatible filter media, access and maintenance needs for offices, businesses and managed pr",
  "path": "/services/commercial-electrostatic-filter",
  "h1": "Commercial Filter Service in Los Angeles",
  "intro": "Help your building team stay on top of filter care. We discuss compatible filter media, access and maintenance needs for offices, businesses and managed properties.",
  "serviceName": "Commercial Electrostatic Filters",
  "breadcrumbLabel": "Commercial Electrostatic Filters",
  "sections": [
    {
      "heading": "Start with an equipment and filter inventory",
      "body": "Different systems in the same building may need different filters. Share the number of units, filter dimensions and any existing maintenance instructions."
    },
    {
      "heading": "Plan service around access",
      "body": "Equipment rooms, roof access and occupied areas need coordination. We work with your site contact to establish an appropriate service window."
    },
    {
      "heading": "Maintain reusable media correctly",
      "body": "Where compatible washable media is installed, cleaning and drying should follow the manufacturer’s instructions. Damaged or unsuitable media may require replacement.",
      "bullets": [
        "Identify filter type and condition",
        "Confirm cleaning or replacement requirements",
        "Coordinate access with building staff"
      ]
    },
    {
      "heading": "Keep a record of maintenance needs",
      "body": "A practical maintenance plan helps your team know what was serviced and what needs follow-up. Ask us about an approach suited to your building and operating conditions."
    }
  ],
  "faqs": [
    {
      "question": "Do you service filters in multi-system buildings?",
      "answer": "Contact us with the unit count, filter types and access details. We will discuss a scope appropriate to the site."
    },
    {
      "question": "Are all electrostatic filters washable?",
      "answer": "No. Follow the specific filter manufacturer’s instructions. We confirm the type of media before discussing cleaning or replacement."
    },
    {
      "question": "Can filter service be combined with duct cleaning?",
      "answer": "Yes, we can discuss both in a property-specific scope. Compatibility, access and system condition determine the work required."
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
export default function CommercialElectrostaticFilter(){return <ServiceDetailLayout {...service}/>;}
